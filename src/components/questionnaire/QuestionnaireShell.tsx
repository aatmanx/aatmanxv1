import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Props = {
  progressPercent: number;
  stepLabel: string;
  stepKey?: string;
  totalSteps: number;
  currentStep: number;
  children: ReactNode;
  footer?: ReactNode;
};

export function QuestionnaireShell({ progressPercent, stepLabel, stepKey, totalSteps, currentStep, children, footer }: Props) {
  return (
    <div className="min-h-screen bg-void text-foreground font-mono overflow-hidden">
      <div className="fixed inset-0 grid-bg opacity-15 [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_72%)]" />
      <header className="relative z-10 mx-auto flex h-20 w-full max-w-5xl items-center justify-between px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_18px_var(--color-accent)]" />
          aatman
        </Link>
        <div className="text-[11px] text-muted-foreground tabular-nums">
          {String(currentStep).padStart(2, "0")}/{String(totalSteps).padStart(2, "0")}
        </div>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-5xl grid-rows-[auto_1fr_auto] gap-3 px-6 pb-6">
        <div className="space-y-3">
          <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500 ease-out shadow-[0_0_20px_-5px_var(--color-accent)]"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>{stepLabel}</span>
            <span>{progressPercent}% complete</span>
          </div>
          {stepKey && <div className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">{stepKey}</div>}
        </div>

        <section className="aatman-scrollbar min-h-0 overflow-y-auto py-6 sm:py-10">{children}</section>

        {footer}
      </main>
    </div>
  );
}
