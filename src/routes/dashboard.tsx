import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut, Plus, Globe, CircleCheck, ArrowUpRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useRequireAuth } from "@/lib/auth/guards";
import { getUserWebsites } from "@/lib/auth/persist-onboarding";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — aatman" },
      { name: "description", content: "Manage your deployed business sites in the aatman dashboard." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userId, email, loading: authLoading } = useRequireAuth({ redirectTo: "/login" });

  const { data: websites, isLoading: sitesLoading } = useQuery({
    queryKey: ["websites", userId],
    queryFn: () => getUserWebsites(userId!),
    enabled: Boolean(userId),
  });

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  if (authLoading || sitesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const siteList = websites ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-foreground" />
            <span className="font-semibold">aatman</span>
            <span className="text-muted-foreground hidden sm:inline">/ dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-muted-foreground">{email}</span>
            <button onClick={handleSignOut} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/40 px-3 py-1.5 text-xs hover:bg-card transition">
              <LogOut className="h-3.5 w-3.5" /> sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="text-xs text-muted-foreground">// welcome_back</div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tighter">{email?.split("@")[0] ?? "operator"}</h1>
            <p className="mt-2 text-sm text-muted-foreground">Your websites, generations and analytics — in one place.</p>
          </div>
          <button onClick={() => navigate({ to: "/questionnaire" })} className="inline-flex items-center gap-2 rounded-md border border-accent/70 bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:bg-foreground/90 transition">
            <Plus className="h-4 w-4" /> new site
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {[
            { l: "websites", v: String(siteList.length) },
            { l: "generating", v: String(siteList.filter((s) => s.status === "generating").length) },
            { l: "published", v: String(siteList.filter((s) => s.status === "published").length) },
            { l: "ready", v: String(siteList.filter((s) => s.status === "ready").length) },
          ].map((s) => (
            <div key={s.l} className="bg-background p-6">
              <div className="text-3xl font-bold tracking-tighter">{s.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card/40 backdrop-blur">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Globe className="h-3.5 w-3.5" /> your_sites
            </div>
          </div>
          {siteList.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Sparkles className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">No websites yet. Complete the questionnaire to generate your first site.</p>
              <button onClick={() => navigate({ to: "/questionnaire" })} className="mt-6 inline-flex items-center gap-2 rounded-md border border-accent/70 bg-foreground text-background px-4 py-2 text-sm font-semibold">
                start questionnaire
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {siteList.map((site) => {
                const biz = site.businesses as { business_name?: string; category?: string } | null;
                return (
                  <li key={site.id} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <CircleCheck className={`h-4 w-4 shrink-0 ${site.status === "published" || site.status === "ready" ? "text-accent" : "text-muted-foreground animate-pulse"}`} />
                      <div className="min-w-0">
                        <div className="text-sm truncate">{site.slug ? `${site.slug}.aatman.app` : biz?.business_name ?? "Untitled"}</div>
                        <div className="text-[11px] text-muted-foreground">{biz?.category ?? site.status}</div>
                      </div>
                    </div>
                    <button onClick={() => navigate({ to: "/editor", search: { id: site.id } })} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                      open <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
