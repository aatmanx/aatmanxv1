import { Link } from "@tanstack/react-router";
import { siteContent } from "../../constants/siteContent";
import { Section, SectionHeading } from "./Section";

export function ConstructionProgress() {
  const updates = siteContent.constructionUpdates.slice(0, 3);
  return (
    <Section className="bg-primary text-primary-foreground">
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="eyebrow">Live Updates</div>
          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">
            Construction Progress, In the Open.
          </h2>
          <p className="mt-4 text-primary-foreground/70">
            Monthly site updates with photos and completion percentages — because trust starts with transparency.
          </p>
        </div>
        <Link
          to="/construction-updates"
          className="hidden text-xs font-medium uppercase tracking-[0.2em] text-gold hover:text-gold/80 md:inline"
        >
          All Updates →
        </Link>
      </div>

      <div className="mt-12 grid gap-px bg-primary-foreground/10 md:grid-cols-3">
        {updates.map((u) => (
          <div key={u.id} className="bg-primary p-8">
            <div className="text-xs uppercase tracking-[0.2em] text-gold">{u.date}</div>
            <h3 className="mt-3 font-serif text-xl">{u.title}</h3>
            <p className="mt-2 text-sm text-primary-foreground/70">{u.projectName}</p>
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-primary-foreground/60">Completion</span>
                <span className="text-gold">{u.completionPercent}%</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden bg-primary-foreground/15">
                <div
                  className="h-full bg-gold"
                  style={{ width: `${u.completionPercent}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
