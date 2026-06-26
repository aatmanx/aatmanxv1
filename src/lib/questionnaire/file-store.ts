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

type FileMeta = {
  id: string;
  category: string;
  name: string;
  type: string;
  size: number;
  local_key?: string;
  storage_path?: string;
  url?: string;
};

const FILE_ANSWER_KEYS = ["logo_upload", "media_uploads", "team_members"];

async function uploadFileMeta(
  userId: string,
  fileMeta: FileMeta,
  questionKey: string,
): Promise<FileMeta> {
  if (!fileMeta.local_key) return fileMeta;

  const stored = await getFileFromIndexedDB(fileMeta.local_key);
  if (!stored) return fileMeta;

  const { supabase } = await import("@/integrations/supabase/client");
  const path = `${userId}/${questionKey}/${crypto.randomUUID()}-${stored.name}`;
  const { error } = await supabase.storage.from("questionnaire-assets").upload(path, stored.blob, {
    contentType: stored.type,
    upsert: false,
  });

  if (error) return fileMeta;

  const { data: urlData } = supabase.storage.from("questionnaire-assets").getPublicUrl(path);
  await deleteFileFromIndexedDB(fileMeta.local_key);

  return {
    ...fileMeta,
    local_key: undefined,
    storage_path: path,
    url: urlData.publicUrl,
  };
}

async function uploadFileRecord(
  userId: string,
  record: Record<string, FileMeta[]>,
  questionKey: string,
): Promise<Record<string, FileMeta[]>> {
  const updated: Record<string, FileMeta[]> = {};
  for (const [category, files] of Object.entries(record)) {
    updated[category] = await Promise.all(files.map((f) => uploadFileMeta(userId, f, questionKey)));
  }
  return updated;
}

export async function uploadAllPendingFiles(
  userId: string,
  answers: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const result = { ...answers };

  for (const key of FILE_ANSWER_KEYS) {
    const value = answers[key];
    if (!value) continue;

    if (key === "team_members" && Array.isArray(value)) {
      result[key] = await Promise.all(
        value.map(async (member) => {
          const m = member as { photo?: FileMeta | null; [k: string]: unknown };
          if (m.photo?.local_key) {
            const uploaded = await uploadFileMeta(userId, m.photo, key);
            return { ...m, photo: uploaded };
          }
          return member;
        }),
      );
      continue;
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      result[key] = await uploadFileRecord(userId, value as Record<string, FileMeta[]>, key);
    }
  }

  return result;
}

export function emptyFileAssets(): Record<string, never> {
  return {};
}
