import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useRequireAuth } from "@/lib/auth/guards";

export const Route = createFileRoute("/editor")({
  component: EditorPage,
});

function EditorPage() {
  const { loading } = useRequireAuth({ redirectTo: "/login" });
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <header className="border-b border-border px-6 h-14 flex items-center justify-between">
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">← dashboard</Link>
        <span className="text-xs text-muted-foreground">// website_editor</span>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold tracking-tighter">Website Editor</h1>
        <p className="mt-4 text-sm text-muted-foreground">Your AI-generated website will appear here once generation completes.</p>
        <button onClick={() => navigate({ to: "/dashboard" })} className="mt-8 rounded-md border border-accent/70 bg-foreground text-background px-4 py-2 text-sm font-semibold">
          back to dashboard
        </button>
      </main>
    </div>
  );
}
