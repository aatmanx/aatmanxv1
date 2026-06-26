import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { siteContent } from "../../constants/siteContent";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Enter a valid email").max(200),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time slot"),
  project: z.string().optional(),
  message: z.string().max(500).optional(),
});

export function SiteVisitForm({ defaultProject }: { defaultProject?: string }) {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = schema.safeParse(Object.fromEntries(fd.entries()));
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thank you! Our team will confirm your slot shortly.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name" name="name" required placeholder="Your name" />
        <Field label="Phone" name="phone" type="tel" required placeholder="+91" />
      </div>
      <Field label="Email" name="email" type="email" required placeholder="you@example.com" />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Preferred Date" name="date" type="date" required min={today} />
        <div>
          <Label>Preferred Time</Label>
          <select name="time" required className={inputCls} defaultValue="">
            <option value="" disabled>Select a slot</option>
            {siteContent.siteVisitSettings.timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label>Project of Interest</Label>
        <select name="project" defaultValue={defaultProject ?? ""} className={inputCls}>
          <option value="">Any / Not sure</option>
          {siteContent.projects.map((p) => (
            <option key={p.slug} value={p.name}>{p.name} — {p.location}</option>
          ))}
        </select>
      </div>

      <div>
        <Label>Message (optional)</Label>
        <textarea name="message" rows={4} maxLength={500} className={inputCls} placeholder="Anything we should know?" />
      </div>

      <p className="text-xs text-muted-foreground">{siteContent.siteVisitSettings.note}</p>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex items-center justify-center bg-primary px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/85 disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Confirm Booking"}
      </button>
    </form>
  );
}

const inputCls =
  "mt-2 w-full border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{children}</label>;
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label>{label}</Label>
      <input {...rest} className={inputCls} />
    </div>
  );
}
