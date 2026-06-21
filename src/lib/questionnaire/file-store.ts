const DB_NAME = "aatman-questionnaire-files";
const STORE_NAME = "files";
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
}

export type StoredFile = {
  id: string;
  category: string;
  name: string;
  type: string;
  size: number;
  blob: Blob;
};

export async function saveFileToIndexedDB(file: File, category: string): Promise<string> {
  const id = crypto.randomUUID();
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put({ id, category, name: file.name, type: file.type, size: file.size, blob: file });
    tx.oncomplete = () => resolve(id);
    tx.onerror = () => reject(tx.error);
  });
}

export async function getFileFromIndexedDB(id: string): Promise<StoredFile | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(id);
    request.onsuccess = () => resolve((request.result as StoredFile) ?? null);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteFileFromIndexedDB(id: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function uploadPendingFiles(
  userId: string,
  answers: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const assets = answers.business_assets as Record<string, Array<{ id: string; local_key?: string; name: string; type: string; size: number; category: string }>> | undefined;
  if (!assets) return answers;

  const { supabase } = await import("@/integrations/supabase/client");
  const updated: Record<string, unknown[]> = {};

  for (const [category, files] of Object.entries(assets)) {
    updated[category] = [];
    for (const fileMeta of files) {
      if (fileMeta.local_key) {
        const stored = await getFileFromIndexedDB(fileMeta.local_key);
        if (stored) {
          const path = `${userId}/${crypto.randomUUID()}-${stored.name}`;
          const { error } = await supabase.storage.from("questionnaire-assets").upload(path, stored.blob, {
            contentType: stored.type,
            upsert: false,
          });
          if (!error) {
            const { data: urlData } = supabase.storage.from("questionnaire-assets").getPublicUrl(path);
            updated[category].push({
              id: fileMeta.id,
              category: fileMeta.category,
              name: fileMeta.name,
              type: fileMeta.type,
              size: fileMeta.size,
              storage_path: path,
              url: urlData.publicUrl,
            });
            await deleteFileFromIndexedDB(fileMeta.local_key);
          }
        }
      } else {
        updated[category].push(fileMeta);
      }
    }
  }

  return { ...answers, business_assets: updated };
}
