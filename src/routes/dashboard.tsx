import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  ClipboardList,
  Globe,
  LayoutTemplate,
  Loader2,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useRequireAuth } from "@/lib/auth/guards";
import { getDashboardData } from "@/lib/dashboard/queries";
import { prepareAuthenticatedSession } from "@/lib/questionnaire/auth-sync";
import { DashboardCard, InfoRow } from "@/components/dashboard/DashboardCard";
import {
  ProgressTimeline,
  WebsiteStatusBadge,
  WelcomeCard,
} from "@/components/dashboard/DashboardSections";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — aatman" },
      { name: "description", content: "Manage your real estate website project in the aatman dashboard." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userId, email, loading: authLoading } = useRequireAuth({ redirectTo: "/login" });

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", userId],
    queryFn: async () => {
      await prepareAuthenticatedSession(userId!);
      return getDashboardData(userId!);
    },
    enabled: Boolean(userId),
  });

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  if (authLoading || isLoading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const answers = (data.questionnaire?.answers_json as Record<string, unknown>) ?? {};
  const profile = data.website?.website_json as { profile?: Record<string, unknown> } | null;
  const automation = (answers.ai_auto_generate as string[]) ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
            <span className="font-semibold">aatman</span>
            <span className="text-muted-foreground hidden sm:inline">/ dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-muted-foreground">{email}</span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/40 px-3 py-1.5 text-xs hover:bg-card transition"
            >
              <LogOut className="h-3.5 w-3.5" /> sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 sm:py-10 space-y-6">
        <WelcomeCard email={email} data={data} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <DashboardCard title="Business Information" icon={<Building2 className="h-3.5 w-3.5 text-muted-foreground" />}>
              <InfoRow label="Business name" value={data.business?.business_name as string} />
              <InfoRow label="Business type" value={answers.business_type as string} />
              <InfoRow label="Primary location" value={answers.primary_location as string} />
              <InfoRow label="Website goal" value={answers.website_goal as string} />
              <InfoRow label="Description" value={(answers.business_description as string)?.slice(0, 120)} />
            </DashboardCard>

            <DashboardCard title="Questionnaire Summary" icon={<ClipboardList className="h-3.5 w-3.5 text-muted-foreground" />}>
              {data.questionnaire ? (
                <>
                  <InfoRow label="Status" value={data.questionnaire.status} />
                  <InfoRow label="Progress" value={`${data.questionnaire.progress_percent}%`} />
                  <InfoRow label="Completed" value={data.questionnaire.completed_at ? new Date(data.questionnaire.completed_at).toLocaleDateString() : undefined} />
                  <InfoRow label="Services" value={(answers.services as string[])?.join(", ")} />
                  <InfoRow label="Property types" value={(answers.property_types as string[])?.join(", ")} />
                  <InfoRow label="AI automation" value={automation.join(", ")} />
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No completed questionnaire yet.</p>
              )}
            </DashboardCard>
          </div>

          <div className="space-y-6">
            <DashboardCard title="Industry" icon={<Sparkles className="h-3.5 w-3.5 text-muted-foreground" />}>
              <InfoRow label="Industry" value={data.questionnaire?.industry ?? "real-estate"} />
              <InfoRow label="Category" value={data.business?.category} />
            </DashboardCard>

            <DashboardCard title="Template Category" icon={<LayoutTemplate className="h-3.5 w-3.5 text-muted-foreground" />}>
              <InfoRow label="Category" value={data.questionnaire?.template_category} />
              <InfoRow label="Website style" value={answers.website_style as string} />
              <InfoRow label="Color style" value={answers.color_style as string} />
            </DashboardCard>

            <DashboardCard title="Website Status" icon={<Globe className="h-3.5 w-3.5 text-muted-foreground" />}>
              <div className="flex items-center justify-between mb-4">
                <WebsiteStatusBadge data={data} />
                {data.website?.slug && (
                  <span className="text-xs text-muted-foreground">{data.website.slug}.aatman.app</span>
                )}
              </div>
              <InfoRow label="DB status" value={data.website?.status} />
              <InfoRow label="Profile ready" value={profile?.profile ? "Yes" : "No"} />
            </DashboardCard>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <DashboardCard title="Progress Timeline" icon={<Sparkles className="h-3.5 w-3.5 text-muted-foreground" />}>
            <ProgressTimeline data={data} />
          </DashboardCard>

          <DashboardCard title="Account Settings" icon={<Settings className="h-3.5 w-3.5 text-muted-foreground" />}>
            <InfoRow label="Email" value={email} />
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/account" className="text-xs rounded-md border border-border px-3 py-2 hover:border-accent/40 transition">
                Account settings
              </Link>
              <Link to="/billing" className="text-xs rounded-md border border-border px-3 py-2 hover:border-accent/40 transition">
                Billing
              </Link>
              {data.website && (
                <button
                  onClick={() => navigate({ to: "/editor", search: { id: data.website!.id } })}
                  className="text-xs rounded-md border border-accent/50 px-3 py-2 hover:bg-accent/10 transition"
                >
                  Open editor
                </button>
              )}
            </div>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
}
