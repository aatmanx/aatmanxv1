import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "../components/site/SiteShell";
import { PageHeader } from "../components/site/PageHeader";
import { ProjectCard } from "../components/site/ProjectCard";
import { siteContent } from "../constants/siteContent";
import { Section } from "../components/site/Section";
import { useState } from "react";
import { cn } from "../utilities/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — {{businessName}}" },
      {
        name: "description",
        content:
          "Explore all on-going, upcoming and ready-to-move projects by {{businessName}} across Mumbai, Bengaluru and Gurugram.",
      },
      { property: "og:title", content: "Projects — {{businessName}}" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

const filters = ["All", "Ongoing", "Upcoming", "Ready to Move"] as const;

function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const projects = siteContent.projects.filter(
    (p) => filter === "All" || p.status === filter,
  );

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Our Portfolio"
        title="Projects that define addresses."
        subtitle="A curated portfolio of residences, villas and commercial landmarks — every one of them built with the same standard."
      />
      <Section>
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors",
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-gold hover:text-gold",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
