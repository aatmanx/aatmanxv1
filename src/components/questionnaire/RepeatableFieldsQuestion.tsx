import { FileImage, Plus, Trash2, Upload, UserPlus } from "lucide-react";
import { useCallback, useState } from "react";
import { saveFileToIndexedDB } from "@/lib/questionnaire/file-store";
import type { RepeatableFieldConfig, TeamMember } from "@/lib/questionnaire/types";

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
  sectionTitle: string;
  title: string;
  subtitle?: string;
  fields: RepeatableFieldConfig[];
  value: TeamMember[];
  onChange: (value: TeamMember[]) => void;
};

function emptyMember(): TeamMember {
  return {
    id: crypto.randomUUID(),
    name: "",
    designation: "",
    phone: "",
    email: "",
    photo: null,
  };
}

export function RepeatableFieldsQuestion({ sectionTitle, title, subtitle, fields, value, onChange }: Props) {
  const members = value.length > 0 ? value : [emptyMember()];

  const updateMember = (id: string, patch: Partial<TeamMember>) => {
    onChange(members.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  };

  const addMember = () => onChange([...members, emptyMember()]);

  const removeMember = (id: string) => {
    if (members.length === 1) {
      onChange([emptyMember()]);
      return;
    }
    onChange(members.filter((m) => m.id !== id));
  };

  const handlePhoto = useCallback(
    async (id: string, file: File) => {
      const local_key = await saveFileToIndexedDB(file, "team-photo");
      const preview = URL.createObjectURL(file);
      updateMember(id, {
        photo: {
          id: crypto.randomUUID(),
          category: "team-photo",
          name: file.name,
          type: file.type,
          size: file.size,
          local_key,
          preview,
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [members],
  );

  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-accent">{sectionTitle}</div>
      <h1 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tighter leading-[1.05]">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">{subtitle}</p>}

      <div className="mt-10 space-y-6">
        {members.map((member, index) => (
          <div key={member.id} className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Team member {index + 1}</span>
              <button
                type="button"
                onClick={() => removeMember(member.id)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => {
                if (field.type === "file") {
                  const photo = member.photo as FileMeta | null | undefined;
                  return (
                    <div key={field.key} className="sm:col-span-2">
                      <label className="text-xs text-muted-foreground">{field.label}</label>
                      <label className="mt-2 flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-foreground/15 hover:border-accent/40 transition">
                        {photo?.preview ? (
                          <img src={photo.preview} alt="" className="h-20 w-20 rounded-full object-cover" />
                        ) : (
                          <>
                            <Upload className="h-5 w-5 text-muted-foreground" />
                            <span className="mt-2 text-xs text-muted-foreground">Upload photo</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePhoto(member.id, file);
                          }}
                        />
                      </label>
                    </div>
                  );
                }

                return (
                  <div key={field.key}>
                    <label className="text-xs text-muted-foreground">
                      {field.label}
                      {field.required && <span className="text-accent"> *</span>}
                    </label>
                    <input
                      type="text"
                      value={(member[field.key as keyof TeamMember] as string) ?? ""}
                      onChange={(e) => updateMember(member.id, { [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addMember}
          className="inline-flex items-center gap-2 rounded-xl border border-dashed border-accent/40 px-5 py-3 text-sm text-accent hover:bg-accent/5 transition"
        >
          <UserPlus className="h-4 w-4" /> Add another team member
        </button>
      </div>
    </div>
  );
}

export function FileUploadQuestion({
  sectionTitle,
  title,
  subtitle,
  categories,
  value,
  onChange,
}: {
  sectionTitle: string;
  title: string;
  subtitle?: string;
  categories: string[];
  value: Record<string, FileMeta[]>;
  onChange: (value: Record<string, FileMeta[]>) => void;
}) {
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
    onChange({ ...value, [category]: (value[category] ?? []).filter((f) => f.id !== id) });
  };

  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-accent">{sectionTitle}</div>
      <h1 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tighter leading-[1.05]">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">{subtitle}</p>}

      <div className="mt-10 space-y-6">
        {categories.map((category) => {
          const files = value[category] ?? [];
          return (
            <div key={category} className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{category}</span>
                <span className="text-[10px] text-muted-foreground">
                  {files.length} file{files.length !== 1 ? "s" : ""}
                </span>
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
                  accept="image/*,application/pdf,video/mp4,video/webm,.xlsx,.xls,.csv"
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
                      <button
                        type="button"
                        onClick={() => removeFile(category, f.id)}
                        className="p-1 text-muted-foreground hover:text-destructive"
                        aria-label="Remove file"
                      >
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
