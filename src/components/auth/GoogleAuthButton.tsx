import { Globe } from "lucide-react";

type Props = {
  mode?: "signin" | "signup";
  disabled?: boolean;
};

/**
 * Google OAuth placeholder — wire to supabase.auth.signInWithOAuth({ provider: 'google' }) in production.
 */
export function GoogleAuthButton({ mode = "signin", disabled }: Props) {
  const label = mode === "signup" ? "Sign up with Google" : "Sign in with Google";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        // Placeholder — no OAuth provider configured yet
      }}
      className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card/40 px-4 py-3 text-sm text-muted-foreground transition hover:border-accent/40 hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
      title="Google sign-in coming soon"
    >
      <Globe className="h-4 w-4" />
      {label}
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">soon</span>
    </button>
  );
}
