import { Link } from "@tanstack/react-router";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/siteContent";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group block overflow-hidden bg-card transition-shadow hover:shadow-[var(--shadow-elegant)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={project.heroImage}
          alt={project.name}
          loading="lazy"
          width={1280}
          height={896}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-background/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground">
          {project.status}
        </span>
      </div>
      <div className="border border-t-0 border-border p-6">
        <div className="eyebrow">{project.type}</div>
        <h3 className="mt-2 font-serif text-2xl text-foreground">{project.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {project.location}
        </p>
        <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Starting</div>
            <div className="font-serif text-xl text-foreground">{project.startingPrice}</div>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-gold">
            View Details <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
