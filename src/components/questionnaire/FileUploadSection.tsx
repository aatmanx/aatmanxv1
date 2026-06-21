import { FileImage, Plus, Trash2, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { saveFileToIndexedDB } from "@/lib/questionnaire/file-store";

type FileMeta = {
  id: string;
  category: string;
  name: string;
  type: string;
  size: number;
  local_key?: string;
  preview?: string;
};

type Props = {
  title: string;
  categories: string[];
  value: Record<string, FileMeta[]>;
  onChange: (value: Record<string, FileMeta[]>) => void;
};

export function FileUploadSection({ title, categories, value, onChange }: Props) {
  const [dragOver, setDragOver] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (category: string, files: FileList | File[]) => {
      const list = Array.from(files);
      const existing = value[category] ?? [];
      const added: FileMeta[] = [];

      for (const file of list) {
        const local_key = await saveFileToIndexedDB(file, category);
        const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
        added.push({
          id: crypto.randomUUID(),
          category,
          name: file.name,
          type: file.type,
          size: file.size,
          local_key,
          preview,
        });
      }

      onChange({ ...value, [category]: [...existing, ...added] });
    },
    [value, onChange],
  );

  const removeFile = (category: string, id: string) => {
    const files = (value[category] ?? []).filter((f) => f.id !== id);
    onChange({ ...value, [category]: files });
  };

  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-accent">category intake</div>
      <h1 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tighter leading-[1.05]">{title}</h1>

      <div className="mt-10 space-y-6">
        {categories.map((category) => {
          const files = value[category] ?? [];
          return (
            <div key={category} className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category}</span>
                <span className="text-[10px] text-muted-foreground">{files.length} file{files.length !== 1 ? "s" : ""}</span>
              </div>

              <label
                className={`mt-4 flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition ${
                  dragOver === category ? "border-accent bg-accent/5" : "border-foreground/15 hover:border-accent/40"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(category);
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(null);
                  if (e.dataTransfer.files.length) handleFiles(category, e.dataTransfer.files);
                }}
              >
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="mt-2 text-xs text-muted-foreground">Drag & drop or click to upload</span>
                <Plus className="mt-1 h-4 w-4 text-accent" />
                <input
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={(e) => e.target.files && handleFiles(category, e.target.files)}
                  accept="image/*,application/pdf,video/mp4,video/webm"
                />
              </label>

              {files.length > 0 && (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {files.map((f) => (
                    <li key={f.id} className="flex items-center gap-3 rounded-lg border border-border bg-background/50 p-2">
                      {f.preview ? (
                        <img src={f.preview} alt="" className="h-10 w-10 rounded object-cover" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                          <FileImage className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs">{f.name}</div>
                        <div className="text-[10px] text-muted-foreground">{(f.size / 1024).toFixed(1)} KB</div>
                      </div>
                      <button type="button" onClick={() => removeFile(category, f.id)} className="p-1 text-muted-foreground hover:text-destructive" aria-label="Remove file">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function emptyFileAssets(): Record<string, never> {
  return {};
}
