import { Quote } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { Section, SectionHeading } from "./Section";

export function Testimonials() {
  return (
    <Section className="bg-cream">
      <SectionHeading
        eyebrow="Homeowner Stories"
        title="Trusted by 12,500 families. And counting."
        align="center"
      />
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {siteContent.testimonials.map((t) => (
          <figure key={t.name} className="flex flex-col border border-border bg-background p-8">
            <Quote className="h-7 w-7 text-gold" strokeWidth={1.2} />
            <blockquote className="mt-5 flex-1 font-serif text-xl leading-snug text-foreground">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6 border-t border-border pt-5">
              <div className="font-medium text-foreground">{t.name}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t.role} · {t.project}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
