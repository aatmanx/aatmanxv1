import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useRequireAuth } from "@/lib/auth/guards";

export const Route = createFileRoute("/websites")({
  component: WebsitesPage,
});

function WebsitesPage() {
  const { loading } = useRequireAuth({ redirectTo: "/login" });
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-5 w-5 animate-spin" /></div>;
  return (
    <div className="min-h-screen bg-background font-mono px-6 py-10">
      <Link to="/dashboard" className="text-sm text-muted-foreground">← dashboard</Link>
      <h1 className="mt-8 text-3xl font-bold">Websites</h1>
      <p className="mt-2 text-sm text-muted-foreground">Manage all your generated websites from the dashboard.</p>
    </div>
  );
}
