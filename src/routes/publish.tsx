import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useRequireAuth } from "@/lib/auth/guards";

export const Route = createFileRoute("/publish")({
  component: PublishPage,
});

function PublishPage() {
  const { loading } = useRequireAuth({ redirectTo: "/login", requireVerified: true });
  const navigate = useNavigate();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-5 w-5 animate-spin" /></div>;
  return (
    <div className="min-h-screen bg-background font-mono px-6 py-10 max-w-lg mx-auto text-center">
      <Link to="/dashboard" className="text-sm text-muted-foreground float-left">← dashboard</Link>
      <h1 className="mt-16 text-3xl font-bold">Publish Website</h1>
      <p className="mt-4 text-sm text-muted-foreground">Email verification is required to publish websites to production.</p>
      <button onClick={() => navigate({ to: "/dashboard" })} className="mt-8 rounded-md border border-accent/70 bg-foreground text-background px-4 py-2 text-sm font-semibold">
        back to dashboard
      </button>
    </div>
  );
}
