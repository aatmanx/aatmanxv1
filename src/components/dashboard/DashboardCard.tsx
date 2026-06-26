import type { ReactNode } from "react";

export function DashboardCard({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-border bg-card/40 backdrop-blur ${className}`}>
      <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
        {icon}
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between py-2.5 border-b border-border/60 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground sm:text-right max-w-[65%]">{value ?? "—"}</span>
    </div>
  );
}
