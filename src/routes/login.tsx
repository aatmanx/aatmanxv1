import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { getSafeNextPath } from "@/lib/auth/guards";
import { persistOnboardingToDatabase } from "@/lib/auth/persist-onboarding";
import { AuthForm } from "@/components/auth/AuthForm";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — aatman" }] }),
  component: LoginPage,
});

function LoginPage() {
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
    if (!data.session) return;
    try {
      await persistOnboardingToDatabase(data.session.user.id);
    } catch {
      /* questionnaire may already be saved */
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
      mode="signin"
      nextPath={nextPath}
      onSuccess={handleSuccess}
      footer={
        <div className="text-center text-xs text-muted-foreground">
          no account?{" "}
          <Link to="/signup" search={{ next: nextPath }} className="text-foreground underline-offset-2 hover:underline">
            create one
          </Link>
          <span className="mx-2 text-border">/</span>
          <Link to="/forgot-password" className="text-foreground underline-offset-2 hover:underline">
            forgot password
          </Link>
        </div>
      }
    />
  );
}
