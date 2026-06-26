import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { siteContent } from "@/data/siteContent";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/construction-updates", label: "Updates" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl tracking-tight text-foreground">
            {siteContent.logoText}
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:inline">
            Estates
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-foreground/80 transition-colors hover:text-gold"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${siteContent.contact.phone}`}
            className="flex items-center gap-2 text-sm text-foreground/80 hover:text-gold"
          >
            <Phone className="h-4 w-4" />
            {siteContent.contact.phone}
          </a>
          <Link
            to="/site-visit"
            className="inline-flex items-center justify-center bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Book Visit
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-sm text-foreground/80 hover:bg-muted"
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/site-visit"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center bg-primary px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground"
            >
              Book Site Visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
