import { Link } from "@tanstack/react-router";
import { siteContent } from "@/data/siteContent";
import { ProjectCard } from "./ProjectCard";
import { Section, SectionHeading } from "./Section";

export function FeaturedProjects() {
  const projects = siteContent.projects.slice(0, 3);
  return (
    <Section>
      <div className="flex items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Signature Developments"
          title="Featured Projects"
          subtitle="Hand-picked residences and commercial landmarks currently open for booking."
        />
        <Link
          to="/projects"
          className="hidden text-xs font-medium uppercase tracking-[0.2em] text-gold hover:text-gold/80 md:inline"
        >
          View All →
        </Link>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Section>
  );
}
