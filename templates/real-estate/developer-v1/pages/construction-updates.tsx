import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "../components/site/SiteShell";
import { PageHeader } from "../components/site/PageHeader";
import { Section } from "../components/site/Section";
import { siteContent } from "../constants/siteContent";

export const Route = createFileRoute("/construction-updates")({
  head: () => ({
    meta: [
      { title: "Construction Updates — {{businessName}}" },
      { name: "description", content: "Monthly construction progress with photos and completion percentages across all {{businessName}} projects." },
      { property: "og:title", content: "Construction Updates" },
      { property: "og:url", content: "/construction-updates" },
    ],
    links: [{ rel: "canonical", href: "/construction-updates" }],
  }),
  component: UpdatesPage,
});

function UpdatesPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Construction Updates"
        title="Progress, in the open."
        subtitle="Monthly photo updates and completion milestones — because trust starts with transparency."
      />
      <Section>
        <ol className="relative border-l border-border md:ml-6">
          {siteContent.constructionUpdates.map((u) => (
            <li key={u.id} className="mb-16 pl-8 md:pl-12">
              <span className="absolute -left-2 mt-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold ring-4 ring-background" />
              <div className="text-xs uppercase tracking-[0.22em] text-gold">{u.date}</div>
              <h3 className="mt-2 font-serif text-2xl text-foreground md:text-3xl">{u.title}</h3>
              <div className="mt-1 text-sm text-muted-foreground">{u.projectName}</div>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground">{u.description}</p>

              <div className="mt-6 max-w-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-[0.18em] text-muted-foreground">Project Completion</span>
                  <span className="text-gold">{u.completionPercent}%</span>
                </div>
                <div className="mt-2 h-1 w-full bg-muted">
                  <div className="h-full bg-gold" style={{ width: `${u.completionPercent}%` }} />
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {u.images.map((src, i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={src} alt={`${u.title} ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </SiteShell>
  );
}
