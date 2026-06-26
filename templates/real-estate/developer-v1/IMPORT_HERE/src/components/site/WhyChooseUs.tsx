import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { Section, SectionHeading } from "./Section";

export function WhyChooseUs() {
  const { whyChooseUs } = siteContent;
  return (
    <Section className="bg-cream">
      <SectionHeading
        eyebrow="Why Meridian"
        title={whyChooseUs.title}
        subtitle={whyChooseUs.subtitle}
        align="center"
      />
      <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.items.map((item) => {
          const Icon = (Icons[item.icon as keyof typeof Icons] as LucideIcon) || Icons.Sparkles;
          return (
            <div key={item.title} className="bg-background p-8 md:p-10">
              <Icon className="h-7 w-7 text-gold" strokeWidth={1.4} />
              <h3 className="mt-5 font-serif text-xl text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
