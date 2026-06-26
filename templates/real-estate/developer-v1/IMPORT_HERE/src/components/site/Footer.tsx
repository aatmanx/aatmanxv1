import { Link } from "@tanstack/react-router";
import { siteContent } from "@/data/siteContent";

export function Footer() {
  const c = siteContent.contact;
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-serif text-3xl tracking-tight">
            {siteContent.logoText}
          </div>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            {siteContent.tagline} A second-generation developer trusted by 12,500+ families since {siteContent.established}.
          </p>
        </div>

        <div>
          <div className="eyebrow !text-primary-foreground/60">Explore</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/projects" className="text-primary-foreground/80 hover:text-gold">Projects</Link></li>
            <li><Link to="/construction-updates" className="text-primary-foreground/80 hover:text-gold">Construction Updates</Link></li>
            <li><Link to="/about" className="text-primary-foreground/80 hover:text-gold">About Us</Link></li>
            <li><Link to="/site-visit" className="text-primary-foreground/80 hover:text-gold">Book Site Visit</Link></li>
            <li><Link to="/contact" className="text-primary-foreground/80 hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow !text-primary-foreground/60">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>{c.address}</li>
            <li><a href={`tel:${c.phone}`} className="hover:text-gold">{c.phone}</a></li>
            <li><a href={`mailto:${c.email}`} className="hover:text-gold">{c.email}</a></li>
            <li>{c.hours}</li>
          </ul>
          <div className="mt-4 flex gap-4 text-xs uppercase tracking-[0.2em]">
            {c.socials.map((s) => (
              <a key={s.label} href={s.href} className="text-primary-foreground/60 hover:text-gold">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-6 text-xs text-primary-foreground/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {siteContent.businessName}. All rights reserved.</span>
          <span>RERA registered developer. Images and renders are indicative.</span>
        </div>
      </div>
    </footer>
  );
}
