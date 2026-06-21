import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { getSafeNextPath } from "@/lib/auth/guards";
import { persistOnboardingToDatabase } from "@/lib/auth/persist-onboarding";
import { AuthForm } from "@/components/auth/AuthForm";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — aatman" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [nextPath, setNextPath] = useState("/dashboard");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setNextPath(getSafeNextPath("/dashboard"));
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ href: getSafeNextPath("/dashboard"), replace: true });
      else setChecking(false);
    });
  }, [navigate]);

  const handleSuccess = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      navigate({ href: `/login?next=${encodeURIComponent(nextPath)}`, replace: true });
      return;
    }
    try {
      await persistOnboardingToDatabase(data.session.user.id);
    } catch {
      /* ignore if no pending onboarding */
    }
    navigate({ href: nextPath, replace: true });
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <AuthForm
      mode="signup"
      nextPath={nextPath}
      onSuccess={handleSuccess}
      allowUnverifiedContinue
      footer={
        <div className="text-center text-xs text-muted-foreground">
          already have one?{" "}
          <Link to="/login" search={{ next: nextPath }} className="text-foreground underline-offset-2 hover:underline">
            sign in
          </Link>
        </div>
      }
    />
  );
}
