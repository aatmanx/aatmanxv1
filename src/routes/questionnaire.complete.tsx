import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { persistOnboardingToDatabase } from "@/lib/auth/persist-onboarding";
import { loadState } from "@/lib/questionnaire/storage";
import { BUSINESS_CATEGORIES } from "@/lib/questionnaire/types";

export const Route = createFileRoute("/questionnaire/complete")({
  head: () => ({
    meta: [
      { title: "Questionnaire complete — aatman" },
      { name: "description", content: "Your website intake is ready. Create an account to generate your site." },
    ],
  }),
  component: CompletePage,
});

const CHECKLIST = [
  "Business Information Captured",
  "Website Structure Ready",
  "AI Analysis Ready",
  "Website Generation Ready",
];

function CompletePage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const state = loadState();

  const categoryLabel = BUSINESS_CATEGORIES.find((c) => c.id === state?.businessProfile.category)?.label ?? state?.businessProfile.category;

  useEffect(() => {
    const tryPersist = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session && state?.businessProfile.category) {
        setSaving(true);
        try {
          await persistOnboardingToDatabase(data.session.user.id);
          navigate({ to: "/dashboard", replace: true });
          return;
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to save questionnaire");
        } finally {
          setSaving(false);
        }
      }
      if (!state?.businessProfile.category) {
        navigate({ to: "/questionnaire", replace: true });
        return;
      }
      setChecking(false);
    };
    tryPersist();
  }, [navigate, state?.businessProfile.category]);

  if (checking || saving) {
    return (
      <div className="min-h-screen bg-void text-foreground flex flex-col items-center justify-center gap-4 font-mono">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
        <p className="text-sm text-muted-foreground">{saving ? "Saving your questionnaire..." : "Loading..."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-foreground font-mono overflow-hidden">
      <div className="fixed inset-0 grid-bg opacity-15 [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_72%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
        <Link to="/" className="absolute left-6 top-8 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_18px_var(--color-accent)]" />
          aatman
        </Link>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent/60 bg-accent/10 shadow-[0_0_60px_-20px_var(--color-accent)]">
          <Sparkles className="h-7 w-7 text-accent" />
        </div>

        <div className="mt-8 text-[11px] uppercase tracking-[0.3em] text-accent">questionnaire complete</div>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tighter">Your website blueprint is ready.</h1>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-md">
          We&apos;ve captured everything needed to generate a production-grade website for{" "}
          <span className="text-foreground">{state?.businessProfile.business_name || "your business"}</span>
          {categoryLabel && <> in <span className="text-foreground">{categoryLabel}</span></>}.
        </p>

        <ul className="mt-10 w-full max-w-sm space-y-3 text-left">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3 text-sm">
              <Check className="h-4 w-4 shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>

        {error && (
          <div className="mt-6 w-full max-w-sm rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs text-destructive">{error}</div>
        )}

        <div className="mt-12 w-full max-w-sm space-y-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Create account to generate your website</p>
          <button
            onClick={() => navigate({ href: "/signup?next=/questionnaire/complete" })}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-accent/70 bg-foreground px-6 py-3.5 text-sm font-semibold text-background hover:bg-foreground/90 transition shadow-[0_0_40px_-15px_var(--color-accent)]"
          >
            Sign Up & Generate <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate({ href: "/login?next=/questionnaire/complete" })}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card/40 px-6 py-3 text-sm text-foreground hover:border-accent/40 transition"
          >
            Already have an account? Log in
          </button>
        </div>

        <p className="mt-8 text-[10px] text-muted-foreground max-w-xs">
          Your answers are saved locally. Creating an account permanently stores them and starts website generation — no need to refill the questionnaire.
        </p>
      </div>
    </div>
  );
}
