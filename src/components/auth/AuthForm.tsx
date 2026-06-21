import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Loader2, MailCheck } from "lucide-react";

type Mode = "signin" | "signup" | "forgot";

type Props = {
  mode: Mode;
  nextPath?: string;
  onSuccess?: () => void | Promise<void>;
  allowUnverifiedContinue?: boolean;
  footer?: React.ReactNode;
};

export function AuthForm({ mode: initialMode, nextPath = "/dashboard", onSuccess, allowUnverifiedContinue, footer }: Props) {
  const [mode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/verify-email?next=${encodeURIComponent(nextPath)}` },
        });
        if (error) throw error;

        if (data.session) {
          await onSuccess?.();
          return;
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (!signInError) {
          await onSuccess?.();
          return;
        }

        if (allowUnverifiedContinue) {
          setInfo("Account created. Sign in to continue — email verification can be done later.");
        } else {
          setInfo("Verification link sent. Check your inbox, then sign in.");
        }
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setInfo("Password reset link sent. Open it from your inbox to set a new password.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await onSuccess?.();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const titles = { signin: "sign in", signup: "create account", forgot: "reset password" };
  const subtitles = {
    signin: "Access your dashboard and deployed sites.",
    signup: "Create your account to save your questionnaire and generate your website.",
    forgot: "We'll send a secure link to your email.",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex items-center justify-center px-6">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          aatman
        </Link>

        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-8">
          <h1 className="text-2xl font-bold tracking-tight">{titles[mode]}</h1>
          <p className="mt-2 text-xs text-muted-foreground">{subtitles[mode]}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-[11px] text-muted-foreground">email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-foreground/60 transition"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>
            {mode !== "forgot" && (
              <div>
                <label className="text-[11px] text-muted-foreground">password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-foreground/60 transition"
                  placeholder="••••••••"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
              </div>
            )}

            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive" role="alert">
                {error}
              </div>
            )}
            {info && (
              <div className="rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground">{info}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-foreground text-background py-3 text-sm font-semibold hover:bg-foreground/90 transition disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  $ {mode === "signin" ? "sign_in()" : mode === "signup" ? "create_account()" : "send_reset_link()"}
                  {mode === "forgot" ? <MailCheck className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </>
              )}
            </button>
          </form>

          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
