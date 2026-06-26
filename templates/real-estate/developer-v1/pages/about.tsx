import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "../components/site/SiteShell";
import { PageHeader } from "../components/site/PageHeader";
import { Section, SectionHeading } from "../components/site/Section";
import { siteContent } from "../constants/siteContent";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — {{businessName}}" },
      { name: "description", content: siteContent.about.intro },
      { property: "og:title", content: "About {{businessName}}" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const a = siteContent.about;
  return (
    <SiteShell>
      <PageHeader eyebrow="About Us" title={a.title} subtitle={a.intro} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="eyebrow">Our Story</div>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{a.story}</p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div className="border-l-2 border-gold pl-5">
                <div className="eyebrow">Mission</div>
                <p className="mt-2 text-foreground">{a.mission}</p>
              </div>
              <div className="border-l-2 border-gold pl-5">
                <div className="eyebrow">Vision</div>
                <p className="mt-2 text-foreground">{a.vision}</p>
              </div>
            </div>
          </div>
          <div className="border border-border bg-cream p-8">
            <div className="eyebrow">By the numbers</div>
            <div className="mt-6 space-y-6">
              {a.stats.map((s) => (
                <div key={s.label} className="flex items-end justify-between border-b border-border pb-4 last:border-0">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className="font-serif text-3xl text-foreground">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-cream">
        <SectionHeading eyebrow="Leadership" title="The people behind the buildings." />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {a.leadership.map((m) => (
            <div key={m.name} className="border border-border bg-background p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream font-serif text-2xl text-foreground">
                {m.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="mt-6 font-serif text-xl text-foreground">{m.name}</h3>
              <div className="text-xs uppercase tracking-[0.18em] text-gold">{m.role}</div>
              <p className="mt-4 text-sm text-muted-foreground">{m.bio}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
