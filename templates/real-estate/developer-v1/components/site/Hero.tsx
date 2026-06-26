import { Link } from "@tanstack/react-router";
import { siteContent } from "../../constants/siteContent";

export function Hero() {
  const h = siteContent.hero;
  return (
    <section className="relative -mt-16 md:-mt-20">
      <div className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <img
          src={h.image}
          alt={h.title}
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

        <div className="relative z-10 flex h-full items-end pb-20 md:pb-28">
          <div className="container-x">
            <div className="max-w-3xl text-white">
              <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
                {h.eyebrow}
              </div>
              <h1 className="mt-4 font-serif text-4xl leading-[1.05] md:text-7xl">
                {h.title}
              </h1>
              <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
                {h.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={h.primaryCta.href}
                  className="inline-flex items-center bg-gold px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-gold-foreground transition-colors hover:bg-gold/90"
                >
                  {h.primaryCta.label}
                </Link>
                <Link
                  to={h.secondaryCta.href}
                  className="inline-flex items-center border border-white/40 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-foreground"
                >
                  {h.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-background">
        <div className="container-x grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          {h.stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="font-serif text-3xl text-foreground md:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
