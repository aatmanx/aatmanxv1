type Props = {
  sectionTitle: string;
  title: string;
  subtitle?: string;
  placeholder?: string;
  example?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function TextareaQuestion({ sectionTitle, title, subtitle, placeholder, example, value, onChange, error }: Props) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-accent">{sectionTitle}</div>
      <h1 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tighter leading-[1.05]">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">{subtitle}</p>}
      {example && (
        <p className="mt-3 text-xs text-muted-foreground">
          Example: <span className="text-foreground/80">{example}</span>
        </p>
      )}
      <div className="mt-10 max-w-2xl">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={6}
          className={`w-full resize-y rounded-xl border bg-background px-5 py-4 text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent/50 ${
            error ? "border-destructive" : "border-border"
          }`}
        />
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </div>
    </div>
  );
}
