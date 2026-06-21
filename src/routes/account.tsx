import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useRequireAuth } from "@/lib/auth/guards";

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

function AccountPage() {
  const { email, loading } = useRequireAuth({ redirectTo: "/login" });
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-5 w-5 animate-spin" /></div>;
  return (
    <div className="min-h-screen bg-background font-mono px-6 py-10 max-w-lg">
      <Link to="/dashboard" className="text-sm text-muted-foreground">← dashboard</Link>
      <h1 className="mt-8 text-3xl font-bold">Account</h1>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between"><dt className="text-muted-foreground">email</dt><dd>{email}</dd></div>
      </dl>
    </div>
  );
}
