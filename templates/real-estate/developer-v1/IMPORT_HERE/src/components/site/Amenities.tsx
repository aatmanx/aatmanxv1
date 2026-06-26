import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { Section, SectionHeading } from "./Section";
import interior from "@/assets/interior-1.jpg";

export function Amenities() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <img
            src={interior}
            alt="Luxury amenities"
            loading="lazy"
            width={1280}
            height={896}
            className="w-full object-cover"
          />
          <div className="absolute -bottom-6 -right-6 hidden bg-gold p-6 lg:block">
            <div className="font-serif text-4xl text-gold-foreground">40+</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gold-foreground/80">
              World-class amenities
            </div>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Amenities"
            title="Designed for the way you actually live."
            subtitle="From the sky-deck infinity pool to the spa, every amenity is curated for everyday excellence."
          />
          <div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border">
            {siteContent.amenities.map((a) => {
              const Icon = (Icons[a.icon as keyof typeof Icons] as LucideIcon) || Icons.Sparkles;
              return (
                <div key={a.name} className="bg-background p-5">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.4} />
                  <div className="mt-3 font-serif text-base text-foreground">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
