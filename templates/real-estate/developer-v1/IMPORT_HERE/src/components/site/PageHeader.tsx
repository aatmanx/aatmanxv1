export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-border bg-cream pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="container-x max-w-4xl">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
