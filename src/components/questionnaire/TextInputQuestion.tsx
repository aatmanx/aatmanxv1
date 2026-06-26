type Props = {
  sectionTitle: string;
  title: string;
  subtitle?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function TextInputQuestion({ sectionTitle, title, subtitle, placeholder, value, onChange, error }: Props) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-accent">{sectionTitle}</div>
      <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tighter leading-[1.05]">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">{subtitle}</p>}
      <div className="mt-10 max-w-xl">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-background px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-accent/50 ${
            error ? "border-destructive" : "border-border"
          }`}
        />
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </div>
    </div>
  );
}
