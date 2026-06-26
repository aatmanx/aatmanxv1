import { MapPin } from "lucide-react";
import { Section, SectionHeading } from "./Section";

const advantages = [
  { label: "Prime micro-markets", description: "Worli, Whitefield, Gurugram and 4 more high-growth corridors." },
  { label: "Connectivity-first", description: "All projects within 10 minutes of metro or expressway access." },
  { label: "Top schools nearby", description: "Pre-vetted neighbourhoods near tier-1 international schools." },
  { label: "Future-ready", description: "Locations chosen for 5-year infrastructure investment, not yesterday's pricing." },
];

export function LocationAdvantages() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Location Advantages"
        title="The address matters more than the brochure."
        subtitle="We buy land where the city is going — not where it has been."
      />
      <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        {advantages.map((a) => (
          <div key={a.label} className="bg-background p-8">
            <MapPin className="h-5 w-5 text-gold" strokeWidth={1.4} />
            <h3 className="mt-4 font-serif text-lg text-foreground">{a.label}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
