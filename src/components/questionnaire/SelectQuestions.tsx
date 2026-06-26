import type { ReactNode } from "react";
import { Check } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  sectionTitle: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

export function MultiSelectQuestion({ title, subtitle, sectionTitle, options, value, onChange }: Props) {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <QuestionLayout sectionTitle={sectionTitle} title={title} subtitle={subtitle}>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = value.includes(option);
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
    </QuestionLayout>
  );
}

type SingleProps = {
  title: string;
  subtitle?: string;
  sectionTitle: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function SingleSelectQuestion({ title, subtitle, sectionTitle, options, value, onChange }: SingleProps) {
  return (
    <QuestionLayout sectionTitle={sectionTitle} title={title} subtitle={subtitle}>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={isSelected}
              className={`flex min-h-[72px] items-center gap-3 rounded-xl border px-5 py-4 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isSelected
                  ? "border-accent/80 bg-accent/10 text-foreground shadow-[0_0_35px_-20px_var(--color-accent)]"
                  : "border-foreground/10 bg-foreground/[0.03] text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              <span
                className={`h-4 w-4 shrink-0 rounded-full border-2 ${isSelected ? "border-accent bg-accent" : "border-muted-foreground"}`}
              />
              {option}
            </button>
          );
        })}
      </div>
    </QuestionLayout>
  );
}

function QuestionLayout({
  sectionTitle,
  title,
  subtitle,
  children,
}: {
  sectionTitle: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-accent">{sectionTitle}</div>
      <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tighter leading-[1.05]">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">{subtitle}</p>}
      {children}
    </div>
  );
}
