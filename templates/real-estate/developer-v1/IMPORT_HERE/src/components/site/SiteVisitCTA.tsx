import { Link } from "@tanstack/react-router";
import hero from "@/assets/hero-building.jpg";

export function SiteVisitCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <img
        src={hero}
        alt=""
        loading="lazy"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-primary/85" />
      <div className="container-x relative z-10 text-center text-primary-foreground">
        <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
          Experience it in person
        </div>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight md:text-5xl">
          Walk the site. See the finishes. Meet the team.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
          Schedule a complimentary site visit. Pickup and drop available across Mumbai, Bengaluru and Gurugram.
        </p>
        <Link
          to="/site-visit"
          className="mt-8 inline-flex items-center bg-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-gold-foreground transition-colors hover:bg-gold/90"
        >
          Book Your Site Visit
        </Link>
      </div>
    </section>
  );
}
