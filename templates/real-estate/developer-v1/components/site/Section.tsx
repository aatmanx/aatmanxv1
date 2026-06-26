import { cn } from "../../utilities/utils";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-muted-foreground md:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
