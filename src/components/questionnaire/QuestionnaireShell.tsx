import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  progressPercent: number;
  stepLabel: string;
  stepKey?: string;
  totalSteps: number;
  currentStep: number;
  children: ReactNode;
  footer?: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  backDisabled?: boolean;
  nextDisabled?: boolean;
  showNav?: boolean;
  syncing?: boolean;
  nextLabel?: string;
  nextLoading?: boolean;
};

export function QuestionnaireShell({
  progressPercent,
  stepLabel,
  stepKey,
  totalSteps,
  currentStep,
  children,
  footer,
  onBack,
  onNext,
  backDisabled,
  nextDisabled,
  showNav = true,
  syncing = false,
  nextLabel = "next",
  nextLoading = false,
}: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      {/* Sticky top bar with nav arrows — always reachable without scrolling */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_18px_var(--color-accent)]" />
            aatman
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex sm:items-center sm:gap-3 text-[11px] text-muted-foreground tabular-nums">
              <span className="font-semibold text-accent">{progressPercent}%</span>
              <span>{String(currentStep).padStart(2, "0")}/{String(totalSteps).padStart(2, "0")} · {stepLabel}</span>
              {syncing && <span className="text-[10px] text-accent/70">saving…</span>}
            </div>
            {showNav && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onBack}
                  disabled={backDisabled}
                  aria-label="Previous question"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/40 text-muted-foreground transition hover:text-foreground hover:border-accent/40 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  disabled={nextDisabled || nextLoading}
                  aria-label={nextLabel === "finish" ? "Finish questionnaire" : "Next question"}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-accent/70 bg-foreground px-4 text-xs font-semibold text-background transition hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {nextLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                      saving…
                    </span>
                  ) : (
                    <>
                      {nextLabel}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 w-full bg-foreground/5">
          <div
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="sm:hidden text-[11px] text-muted-foreground mb-4 tabular-nums">
          {String(currentStep).padStart(2, "0")}/{String(totalSteps).padStart(2, "0")} · {stepLabel}
        </div>
        {stepKey && (
          <div className="mb-3 text-[10px] text-muted-foreground/60 uppercase tracking-widest">{stepKey}</div>
        )}
        <section>{children}</section>
        {footer && <div className="mt-12">{footer}</div>}
      </main>
    </div>
  );
}
