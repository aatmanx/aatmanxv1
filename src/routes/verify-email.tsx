import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MailCheck, RefreshCw } from "lucide-react";
import { getSafeNextPath } from "@/lib/auth/guards";

export const Route = createFileRoute("/verify-email")({
  head: () => ({ meta: [{ title: "Verify email — aatman" }] }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const nextPath = getSafeNextPath("/dashboard");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ href: "/login", replace: true });
        return;
      }
      setEmail(data.session.user.email ?? null);
      setVerified(Boolean(data.session.user.email_confirmed_at));
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user.email_confirmed_at) {
        setVerified(true);
        setTimeout(() => navigate({ href: nextPath, replace: true }), 1500);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, nextPath]);

  const resend = async () => {
    if (!email) return;
    setResending(true);
    setMessage(null);
    const { error } = await supabase.auth.resend({ type: "signup", email, options: { emailRedirectTo: `${window.location.origin}/verify-email?next=${encodeURIComponent(nextPath)}` } });
    setResending(false);
    setMessage(error ? error.message : "Verification email sent. Check your inbox.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex items-center justify-center px-6">
      
      <div className="relative w-full max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          aatman
        </Link>
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-8">
          <MailCheck className="mx-auto h-10 w-10 text-accent" />
          <h1 className="mt-6 text-2xl font-bold tracking-tight">{verified ? "Email verified" : "Verify your email"}</h1>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            {verified
              ? "Your email is verified. Redirecting..."
              : `We sent a verification link to ${email}. Email verification is required for publishing, billing, and account recovery — but you can still generate your website.`}
          </p>
          {!verified && (
            <>
              <button onClick={resend} disabled={resending} className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-xs hover:bg-muted transition disabled:opacity-50">
                {resending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
                resend verification
              </button>
              <button onClick={() => navigate({ href: nextPath })} className="mt-4 block w-full text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline">
                Continue without verifying →
              </button>
            </>
          )}
          {message && <p className="mt-4 text-xs text-muted-foreground">{message}</p>}
        </div>
      </div>
    </div>
  );
}
