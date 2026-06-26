import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteContent } from "../../constants/siteContent";
import { Section, SectionHeading } from "./Section";

export function ContactSection() {
  const c = siteContent.contact;
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Get in Touch"
            title="Speak to our relationship team."
            subtitle="A senior advisor will reach out within 2 working hours."
          />
          <div className="mt-10 space-y-6">
            <ContactRow icon={MapPin} label="Office">{c.address}</ContactRow>
            <ContactRow icon={Phone} label="Call">
              <a href={`tel:${c.phone}`} className="hover:text-gold">{c.phone}</a>
            </ContactRow>
            <ContactRow icon={Mail} label="Email">
              <a href={`mailto:${c.email}`} className="hover:text-gold">{c.email}</a>
            </ContactRow>
            <ContactRow icon={Clock} label="Hours">{c.hours}</ContactRow>
          </div>
        </div>
        <div className="aspect-[4/3] w-full overflow-hidden border border-border">
          <iframe
            title="Office location"
            src={c.mapEmbedUrl}
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.4} />
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="mt-1 text-foreground">{children}</div>
      </div>
    </div>
  );
}
