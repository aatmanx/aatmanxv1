import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteShell } from "../components/site/SiteShell";
import { Section, SectionHeading } from "../components/site/Section";
import { SiteVisitForm } from "../components/site/SiteVisitForm";
import { findProject, siteContent, type Project } from "../constants/siteContent";
import { Check, Download, MapPin, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = findProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.project;
    return {
      meta: [
        { title: p ? `${p.name} — ${p.location} | {{businessName}}` : "Project" },
        { name: "description", content: p?.tagline ?? "" },
        { property: "og:title", content: p?.name ?? "Project" },
        { property: "og:description", content: p?.tagline ?? "" },
        { property: "og:image", content: p?.heroImage ?? "" },
        { property: "og:url", content: `/projects/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
    };
  },
  component: ProjectDetails,
  notFoundComponent: () => (
    <SiteShell>
      <Section>
        <h1 className="font-serif text-4xl">Project not found</h1>
        <Link to="/projects" className="mt-6 inline-block text-gold">← Back to projects</Link>
      </Section>
    </SiteShell>
  ),
});

function ProjectDetails() {
  const { project: p } = Route.useLoaderData() as { project: Project };

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative -mt-16 md:-mt-20">
        <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
          <img src={p.heroImage} alt={p.name} className="absolute inset-0 h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
          <div className="container-x relative z-10 flex h-full items-end pb-12 md:pb-20">
            <div className="text-white">
              <span className="bg-gold px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gold-foreground">
                {p.status}
              </span>
              <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">{p.name}</h1>
              <p className="mt-3 max-w-2xl text-lg text-white/85">{p.tagline}</p>
              <p className="mt-2 flex items-center gap-1 text-sm text-white/70">
                <MapPin className="h-4 w-4" /> {p.location}
              </p>
            </div>
          </div>
        </div>
        {/* Key stats bar */}
        <div className="border-b border-border bg-background">
          <div className="container-x grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
            <Stat label="Starting" value={p.startingPrice} />
            <Stat label="Configurations" value={p.configurations.join(" · ")} />
            <Stat label="Carpet Area" value={p.area} />
            <Stat label="Possession" value={p.possession} />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Section>
        <SectionHeading eyebrow="Gallery" title="A closer look." />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {p.gallery.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden bg-muted">
              <img src={src} alt={`${p.name} ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </Section>

      {/* Overview + Highlights */}
      <Section className="bg-cream">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="eyebrow">Overview</div>
            <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">About {p.name}</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{p.overview}</p>
            {p.reraId && (
              <p className="mt-6 border border-border bg-background p-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                RERA ID: <span className="text-foreground">{p.reraId}</span>
              </p>
            )}
          </div>
          <div>
            <div className="eyebrow">Key Highlights</div>
            <ul className="mt-6 space-y-3">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Amenities */}
      <Section>
        <SectionHeading eyebrow="Amenities" title="Lifestyle, redefined." />
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3 lg:grid-cols-4">
          {p.amenities.map((a) => (
            <div key={a} className="bg-background p-6">
              <div className="font-serif text-base text-foreground">{a}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Floor Plans */}
      <Section className="bg-cream">
        <SectionHeading eyebrow="Floor Plans" title="Choose your home." />
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
          {p.floorPlans.map((fp) => (
            <div key={fp.name} className="bg-background p-8">
              <div className="font-serif text-xl text-foreground">{fp.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{fp.area}</div>
              <div className="mt-6 border-t border-border pt-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Starting</div>
                <div className="font-serif text-2xl text-foreground">{fp.price}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Master Plan */}
      <Section>
        <SectionHeading eyebrow="Master Plan" title="The whole community at a glance." />
        <div className="mt-10 overflow-hidden border border-border">
          <img src={p.masterPlanImage} alt="Master plan" loading="lazy" className="w-full object-cover" />
        </div>
      </Section>

      {/* Location */}
      <Section className="bg-cream">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading eyebrow="Location" title="In the middle of everything." />
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {p.locationAdvantages.map((l) => (
                <li key={l.label} className="flex items-center justify-between py-4">
                  <span className="text-foreground">{l.label}</span>
                  <span className="text-sm text-gold">{l.distance}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-[4/3] overflow-hidden border border-border bg-muted">
            <iframe title="Project location" src={p.mapEmbedUrl} loading="lazy" className="h-full w-full" />
          </div>
        </div>
      </Section>

      {/* Construction Status */}
      <Section>
        <SectionHeading eyebrow="Construction Status" title="Live progress." />
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-4">
          {p.constructionStatus.map((c) => (
            <div key={c.label} className="bg-background p-6">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.label}</div>
              <div className="mt-3 font-serif text-3xl text-foreground">{c.percent}%</div>
              <div className="mt-3 h-1 w-full bg-muted">
                <div className="h-full bg-gold" style={{ width: `${c.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA: brochure + form */}
      <Section className="bg-primary text-primary-foreground">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="eyebrow">Take it home</div>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">
              Download the brochure, or book a visit.
            </h2>
            <p className="mt-4 text-primary-foreground/70">
              Get detailed floor plans, specifications and price sheets sent to your inbox.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={p.brochureUrl} className="inline-flex items-center gap-2 bg-gold px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-gold-foreground hover:bg-gold/90">
                <Download className="h-4 w-4" /> Download Brochure
              </a>
              <a href={`tel:${siteContent.contact.phone}`} className="inline-flex items-center gap-2 border border-primary-foreground/30 px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-primary-foreground hover:text-primary">
                <Phone className="h-4 w-4" /> Call Sales
              </a>
            </div>
            <div className="mt-10 space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold" /> {siteContent.contact.phone}</div>
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold" /> {siteContent.contact.email}</div>
            </div>
          </div>
          <div className="bg-background p-8 text-foreground md:p-10">
            <h3 className="font-serif text-2xl">Book your site visit</h3>
            <p className="mt-2 text-sm text-muted-foreground">A relationship manager will confirm your slot within 2 hours.</p>
            <div className="mt-6">
              <SiteVisitForm defaultProject={p.name} />
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1 font-serif text-lg text-foreground">{value}</div>
    </div>
  );
}
