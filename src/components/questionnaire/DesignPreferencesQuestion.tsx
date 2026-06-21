import { Check, Plus, X } from "lucide-react";
import { useState } from "react";
import { emptyMultiSelect } from "./MultiSelectQuestion";
import type { ColorScheme, MultiSelectAnswer } from "@/lib/questionnaire/types";

type DesignAnswer = {
  colors: ColorScheme;
  visual_style: MultiSelectAnswer;
  animation: string;
};

type Props = {
  title: string;
  initialStyleOptions: string[];
  allStyleOptions: string[];
  value: DesignAnswer;
  onChange: (value: DesignAnswer) => void;
};

const DEFAULT_COLORS: ColorScheme = { primary: "#7c3aed", secondary: "#1e1e1e", accent: "#a78bfa" };

export function DesignPreferencesQuestion({ title, initialStyleOptions, allStyleOptions, value, onChange }: Props) {
  const colors = value.colors ?? DEFAULT_COLORS;
  const visualStyle = value.visual_style ?? emptyMultiSelect();
  const animation = value.animation ?? "";

  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-accent">category intake</div>
      <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tighter leading-[1.05]">{title}</h1>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Preferred Brand Colour Scheme</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {(["primary", "secondary", "accent"] as const).map((key) => (
              <div key={key} className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4">
                <label className="text-[11px] text-muted-foreground capitalize">{key} colour</label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="color"
                    value={colors[key]}
                    onChange={(e) => onChange({ ...value, colors: { ...colors, [key]: e.target.value } })}
                    className="h-12 w-12 cursor-pointer rounded-lg border border-border bg-transparent"
                    aria-label={`${key} color`}
                  />
                  <input
                    type="text"
                    value={colors[key]}
                    onChange={(e) => onChange({ ...value, colors: { ...colors, [key]: e.target.value } })}
                    className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-xs font-mono uppercase"
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
                <div className="mt-3 h-8 rounded-md border border-border/50" style={{ backgroundColor: colors[key] }} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Visual Style</h2>
          <VisualStylePicker
            initialOptions={initialStyleOptions}
            allOptions={allStyleOptions}
            value={visualStyle}
            onChange={(v) => onChange({ ...value, colors, visual_style: v, animation })}
          />
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Animation Preference</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {["Minimal", "Moderate", "Premium Interactive Effects", "No Preference"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ ...value, colors, visual_style: visualStyle, animation: opt })}
                aria-pressed={animation === opt}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  animation === opt ? "border-accent/80 bg-accent/10" : "border-foreground/10 bg-foreground/[0.03] hover:border-accent/40"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function defaultDesignAnswer(): DesignAnswer {
  return { colors: DEFAULT_COLORS, visual_style: emptyMultiSelect(), animation: "" };
}

function VisualStylePicker({
  initialOptions,
  allOptions,
  value,
  onChange,
}: {
  initialOptions: string[];
  allOptions: string[];
  value: MultiSelectAnswer;
  onChange: (v: MultiSelectAnswer) => void;
}) {
  const [expanded, setExpanded] = useState(value.selected.includes("Other"));
  const [customInput, setCustomInput] = useState("");
  const displayOptions = expanded ? [...new Set([...allOptions, ...initialOptions.filter((o) => o !== "Other")])] : initialOptions;

  const toggle = (option: string) => {
    if (option === "Other") {
      setExpanded(true);
      if (!value.selected.includes("Other")) onChange({ ...value, selected: [...value.selected, "Other"] });
      return;
    }
    const selected = value.selected.includes(option) ? value.selected.filter((s) => s !== option) : [...value.selected.filter((s) => s !== "Other"), option];
    onChange({ ...value, selected });
  };

  const addCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed || value.custom.includes(trimmed)) return;
    onChange({ ...value, custom: [...value.custom, trimmed], selected: [...value.selected.filter((s) => s !== "Other"), trimmed] });
    setCustomInput("");
  };

  return (
    <div className="mt-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {displayOptions.map((option) => {
          const isSelected = value.selected.includes(option) || value.custom.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`flex min-h-[64px] items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                isSelected ? "border-accent/80 bg-accent/10" : "border-foreground/10 bg-foreground/[0.03] hover:border-accent/40"
              }`}
            >
              <span>{option}</span>
              {isSelected && <Check className="h-4 w-4 text-accent" />}
            </button>
          );
        })}
      </div>
      {expanded && (
        <div className="mt-4 flex gap-2 max-w-md">
          <input value={customInput} onChange={(e) => setCustomInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustom())} placeholder="Custom style..." className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm" />
          <button type="button" onClick={addCustom} className="inline-flex items-center gap-1 rounded-md border border-accent/70 bg-foreground px-4 py-2 text-sm font-semibold text-background">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      )}
      {value.custom.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.custom.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-xs">
              {c}
              <button type="button" onClick={() => onChange({ ...value, custom: value.custom.filter((x) => x !== c), selected: value.selected.filter((x) => x !== c) })}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
