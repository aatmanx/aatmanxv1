import { ArrowLeft, ArrowRight, Loader2, Send } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
  backDisabled?: boolean;
  nextDisabled?: boolean;
  saving?: boolean;
  isLast?: boolean;
  hideNext?: boolean;
  error?: string | null;
  children?: ReactNode;
};

export function QuestionnaireFooter({ onBack, onNext, backDisabled, nextDisabled, saving, isLast, hideNext, error, children }: Props) {
  if (hideNext && !children) return null;

  return (
    <div className="rounded-2xl border border-foreground/15 bg-foreground/[0.055] p-3 shadow-[0_24px_80px_-50px_var(--color-accent)] backdrop-blur-2xl">
      {children}
      {error && (
        <div className="px-2 pb-2 text-xs text-destructive" role="alert">
          {error}
        </div>
      )}
      {!hideNext && (
        <div className="flex items-center justify-between border-t border-foreground/10 pt-3">
          <button
            type="button"
            onClick={onBack}
            disabled={backDisabled || saving}
            aria-label="Go back"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-background/20 text-muted-foreground transition hover:text-foreground disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled || saving}
            className="inline-flex items-center gap-2 rounded-full border border-accent/70 bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-foreground/90 disabled:opacity-40"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : isLast ? <Send className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            {isLast ? "finish" : "next"}
          </button>
        </div>
      )}
    </div>
  );
}
