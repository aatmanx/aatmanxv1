import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "../components/site/SiteShell";
import { PageHeader } from "../components/site/PageHeader";
import { Section } from "../components/site/Section";
import { SiteVisitForm } from "../components/site/SiteVisitForm";
import { siteContent } from "../constants/siteContent";
import { CalendarCheck, Car, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/site-visit")({
  head: () => ({
    meta: [
      { title: "Book a Site Visit — {{businessName}}" },
      { name: "description", content: "Schedule a complimentary site visit to any {{businessName}} project. Pickup and drop available." },
      { property: "og:title", content: "Book a Site Visit" },
      { property: "og:url", content: "/site-visit" },
    ],
    links: [{ rel: "canonical", href: "/site-visit" }],
  }),
  component: SiteVisitPage,
});

const perks = [
  { icon: CalendarCheck, title: "Slot confirmed in 2 hours", desc: "Your relationship manager will call to confirm." },
  { icon: Car, title: "Pickup & drop available", desc: "Complimentary across Mumbai, Bengaluru and Gurugram." },
  { icon: ShieldCheck, title: "No-pressure tour", desc: "Walk the site, see the finishes, take your time." },
];

function SiteVisitPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Site Visit"
        title="See it for yourself."
        subtitle="Tell us when, and we'll take care of the rest."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="space-y-8">
              {perks.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <p.icon className="mt-1 h-6 w-6 shrink-0 text-gold" strokeWidth={1.4} />
                  <div>
                    <div className="font-serif text-lg text-foreground">{p.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 border border-border bg-cream p-6">
              <div className="eyebrow">Available</div>
              <p className="mt-2 text-sm text-foreground">
                {siteContent.siteVisitSettings.availableDays.join(" · ")}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {siteContent.siteVisitSettings.timeSlots.join(" · ")}
              </p>
            </div>
          </div>
          <div className="border border-border bg-background p-8 md:p-10">
            <SiteVisitForm />
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
