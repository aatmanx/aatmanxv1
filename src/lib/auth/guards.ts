import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

type AuthGuardOptions = {
  redirectTo?: string;
  requireVerified?: boolean;
};

export function useRequireAuth(options: AuthGuardOptions = {}) {
  const { redirectTo = "/login", requireVerified = false } = options;
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      if (!data.session) {
        navigate({ href: `${redirectTo}?next=${encodeURIComponent(window.location.pathname)}`, replace: true });
        return;
      }

      const verified = Boolean(data.session.user.email_confirmed_at);
      if (requireVerified && !verified) {
        navigate({ href: `/verify-email?next=${encodeURIComponent(window.location.pathname)}`, replace: true });
        return;
      }

      setUserId(data.session.user.id);
      setEmail(data.session.user.email ?? null);
      setEmailVerified(verified);
      setLoading(false);
    };

    check();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) {
        navigate({ href: redirectTo, replace: true });
      } else {
        setUserId(session.user.id);
        setEmail(session.user.email ?? null);
        setEmailVerified(Boolean(session.user.email_confirmed_at));
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate, redirectTo, requireVerified]);

  return { userId, email, emailVerified, loading };
}

export function getSafeNextPath(defaultPath = "/dashboard"): string {
  if (typeof window === "undefined") return defaultPath;
  const next = new URLSearchParams(window.location.search).get("next") || defaultPath;
  return next.startsWith("/") && !next.startsWith("//") ? next : defaultPath;
}

export async function isEmailVerified(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return Boolean(data.session?.user.email_confirmed_at);
}
