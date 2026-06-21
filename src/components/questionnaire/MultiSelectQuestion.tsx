import { Check, Plus, X } from "lucide-react";
import { useState } from "react";
import type { MultiSelectAnswer } from "@/lib/questionnaire/types";

type Props = {
  title: string;
  subtitle?: string;
  initialOptions: string[];
  allOptions: string[];
  value: MultiSelectAnswer;
  onChange: (value: MultiSelectAnswer) => void;
  allowCustom?: boolean;
};

export function MultiSelectExpandable({ title, subtitle, initialOptions, allOptions, value, onChange, allowCustom = true }: Props) {
  const [expanded, setExpanded] = useState(value.selected.includes("Other"));
  const [customInput, setCustomInput] = useState("");

  const displayOptions = expanded ? [...new Set([...allOptions, ...initialOptions.filter((o) => o !== "Other")])] : initialOptions;

  const toggle = (option: string) => {
    if (option === "Other") {
      setExpanded(true);
      if (!value.selected.includes("Other")) {
        onChange({ ...value, selected: [...value.selected, "Other"] });
      }
      return;
    }
    const selected = value.selected.includes(option)
      ? value.selected.filter((s) => s !== option)
      : [...value.selected.filter((s) => s !== "Other"), option];
    onChange({ ...value, selected });
  };

  const addCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed || value.custom.includes(trimmed)) return;
    onChange({ ...value, custom: [...value.custom, trimmed], selected: [...value.selected.filter((s) => s !== "Other"), trimmed] });
    setCustomInput("");
  };

  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-accent">category intake</div>
      <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tighter leading-[1.05]">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">{subtitle}</p>}

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {displayOptions.map((option) => {
          const isSelected = value.selected.includes(option) || value.custom.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              aria-pressed={isSelected}
              className={`flex min-h-[72px] items-center justify-between rounded-xl border px-5 py-4 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isSelected
                  ? "border-accent/80 bg-accent/10 text-foreground shadow-[0_0_35px_-20px_var(--color-accent)]"
                  : "border-foreground/10 bg-foreground/[0.03] text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              <span>{option}</span>
              {isSelected && <Check className="h-4 w-4 shrink-0 text-accent" />}
            </button>
          );
        })}
      </div>

      {value.custom.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {value.custom.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-xs">
              {c}
              <button
                type="button"
                onClick={() => onChange({ ...value, custom: value.custom.filter((x) => x !== c), selected: value.selected.filter((x) => x !== c) })}
                aria-label={`Remove ${c}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {allowCustom && expanded && (
        <div className="mt-6 flex gap-2 max-w-md">
          <input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustom())}
            placeholder="Add custom option..."
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent/60"
          />
          <button type="button" onClick={addCustom} className="inline-flex items-center gap-1 rounded-md border border-accent/70 bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/90">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      )}
    </div>
  );
}

export function MultiSelectAll({ title, subtitle, options, value, onChange }: { title: string; subtitle?: string; options: string[]; value: MultiSelectAnswer; onChange: (v: MultiSelectAnswer) => void }) {
  const [customInput, setCustomInput] = useState("");
  const showCustomInput = value.selected.includes("Custom Sections");

  const toggle = (option: string) => {
    const selected = value.selected.includes(option) ? value.selected.filter((s) => s !== option) : [...value.selected, option];
    onChange({ ...value, selected });
  };

  const addCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed || value.custom.includes(trimmed)) return;
    onChange({ ...value, custom: [...value.custom, trimmed] });
    setCustomInput("");
  };

  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-accent">category intake</div>
      <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tighter leading-[1.05]">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const isSelected = value.selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              aria-pressed={isSelected}
              className={`flex min-h-[64px] items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                isSelected ? "border-accent/80 bg-accent/10 shadow-[0_0_35px_-20px_var(--color-accent)]" : "border-foreground/10 bg-foreground/[0.03] hover:border-accent/40"
              }`}
            >
              <span>{option}</span>
              {isSelected && <Check className="h-4 w-4 text-accent" />}
            </button>
          );
        })}
      </div>

      {value.custom.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {value.custom.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-xs">
              {c}
              <button type="button" onClick={() => onChange({ ...value, custom: value.custom.filter((x) => x !== c) })}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {showCustomInput && (
        <div className="mt-6 flex gap-2 max-w-md">
          <input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustom())}
            placeholder="Custom section name..."
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent/60"
          />
          <button type="button" onClick={addCustom} className="inline-flex items-center gap-1 rounded-md border border-accent/70 bg-foreground px-4 py-2 text-sm font-semibold text-background">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      )}
    </div>
  );
}

export function SingleSelect({ title, subtitle, options, value, onChange }: { title: string; subtitle?: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
              value === option ? "border-accent/80 bg-accent/10" : "border-foreground/10 bg-foreground/[0.03] hover:border-accent/40"
            }`}
          >
            <span className={`h-4 w-4 shrink-0 rounded-full border-2 ${value === option ? "border-accent bg-accent" : "border-muted-foreground"}`} />
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function emptyMultiSelect(): MultiSelectAnswer {
  return { selected: [], custom: [] };
}
