import { ArrowRight, Check } from "lucide-react";
import type { FeatureTimelineAnswer } from "@/lib/questionnaire/types";

type Step = { key: string; title: string; options: string[] };

type Props = {
  title: string;
  steps: Step[];
  currentStep: number;
  value: FeatureTimelineAnswer;
  onChange: (value: FeatureTimelineAnswer) => void;
  onStepChange: (step: number) => void;
  onFinish: () => void;
};

export function FeatureTimelineQuestion({ title, steps, currentStep, value, onChange, onStepChange, onFinish }: Props) {
  const step = steps[currentStep];
  const selected = value[step.key] ?? [];

  const toggle = (option: string) => {
    const next = selected.includes(option) ? selected.filter((s) => s !== option) : [...selected, option];
    onChange({ ...value, [step.key]: next });
  };

  const isLast = currentStep === steps.length - 1;

  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-accent">category intake</div>
      <h1 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tighter leading-[1.05]">{title}</h1>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s.key} className="flex shrink-0 items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition ${
                i < currentStep ? "border-accent bg-accent/20 text-accent" : i === currentStep ? "border-accent bg-accent text-accent-foreground" : "border-foreground/20 text-muted-foreground"
              }`}
            >
              {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`hidden text-xs sm:inline ${i === currentStep ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</span>
            {i < steps.length - 1 && <div className="mx-1 h-px w-6 bg-foreground/20" />}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight">{step.title}</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {step.options.map((option) => {
            const isSelected = selected.includes(option);
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
      </div>

      <div className="mt-8 flex justify-end">
        {isLast ? (
          <button
            type="button"
            onClick={onFinish}
            className="inline-flex items-center gap-2 rounded-full border border-accent/70 bg-foreground px-6 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90"
          >
            Finish <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onStepChange(currentStep + 1)}
            className="inline-flex items-center gap-2 rounded-full border border-accent/70 bg-foreground px-6 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export function emptyFeatureTimeline(): FeatureTimelineAnswer {
  return {};
}
