import { Plus, X } from "lucide-react";
import type { BusinessProfile, SocialLink } from "@/lib/questionnaire/types";

const COUNTRY_CODES = ["+91", "+1", "+44", "+61", "+971", "+65", "+81", "+49"];

const SOCIAL_PLATFORMS = ["Facebook", "Instagram", "LinkedIn", "YouTube", "X (Twitter)", "Custom Link"];

type Props = {
  profile: Partial<BusinessProfile>;
  errors: Record<string, string>;
  onChange: (updates: Partial<BusinessProfile>) => void;
};

export function BusinessInfoForm({ profile, errors, onChange }: Props) {
  const addSocialLink = (platform: string) => {
    const links = profile.social_links ?? [];
    if (links.some((l) => l.platform === platform)) return;
    onChange({ social_links: [...links, { platform, url: "" }] });
  };

  const updateSocialLink = (index: number, url: string) => {
    const links = [...(profile.social_links ?? [])];
    links[index] = { ...links[index], url };
    onChange({ social_links: links });
  };

  const removeSocialLink = (index: number) => {
    const links = [...(profile.social_links ?? [])];
    links.splice(index, 1);
    onChange({ social_links: links });
  };

  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-accent">step 02</div>
      <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tighter leading-[1.05]">Business Information</h1>
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">
        Provide your business details so we can personalize your website and prepare your business profile.
      </p>

      <div className="mt-10 space-y-6 max-w-2xl">
        <Field label="Business Name" required error={errors.business_name}>
          <input
            value={profile.business_name ?? ""}
            onChange={(e) => onChange({ business_name: e.target.value })}
            placeholder="Enter your business name"
            className={inputClass(errors.business_name)}
            aria-invalid={Boolean(errors.business_name)}
          />
        </Field>

        <Field label="Business Tagline / Slogan" error={errors.tagline}>
          <input
            value={profile.tagline ?? ""}
            onChange={(e) => onChange({ tagline: e.target.value })}
            placeholder="Enter your business slogan (optional)"
            className={inputClass()}
          />
        </Field>

        <Field label="Business Description" required error={errors.description}>
          <textarea
            value={profile.description ?? ""}
            onChange={(e) => onChange({ description: e.target.value.slice(0, 500) })}
            placeholder="Briefly describe your business, products, services, and what makes you unique."
            rows={4}
            className={`${inputClass(errors.description)} resize-none min-h-28`}
            aria-invalid={Boolean(errors.description)}
          />
          <div className="mt-1 text-[10px] text-muted-foreground text-right">{(profile.description ?? "").length}/500</div>
        </Field>

        <Field label="Contact Email" required error={errors.email}>
          <input
            type="email"
            value={profile.email ?? ""}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="you@company.com"
            className={inputClass(errors.email)}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>

        <Field label="Contact Number" required error={errors.phone}>
          <div className="flex gap-2">
            <select
              value={profile.phone_country_code ?? "+91"}
              onChange={(e) => onChange({ phone_country_code: e.target.value })}
              className={`${inputClass()} w-24 shrink-0`}
              aria-label="Country code"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="tel"
              value={profile.phone ?? ""}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="Phone number"
              className={`${inputClass(errors.phone)} flex-1`}
              aria-invalid={Boolean(errors.phone)}
            />
          </div>
        </Field>

        <Field label="Business Address" required error={errors.address}>
          <textarea
            value={profile.address ?? ""}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Full business address"
            rows={2}
            className={`${inputClass(errors.address)} resize-none`}
            aria-invalid={Boolean(errors.address)}
          />
        </Field>

        <Field label="Website Domain Preference">
          <div className="flex items-center gap-0 rounded-md border border-border bg-background overflow-hidden focus-within:border-accent/60">
            <input
              value={profile.domain_preference ?? ""}
              onChange={(e) => onChange({ domain_preference: e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase() })}
              placeholder="examplebusiness"
              className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
            />
            <span className="px-3 py-2.5 text-xs text-muted-foreground border-l border-border bg-card/40">.aatman.app</span>
          </div>
        </Field>

        <div>
          <label className="text-[11px] text-muted-foreground">Social Media Links (optional)</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {SOCIAL_PLATFORMS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => addSocialLink(p)}
                className="inline-flex items-center gap-1 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5 text-[11px] text-muted-foreground hover:border-accent/40 hover:text-foreground transition"
              >
                <Plus className="h-3 w-3" /> {p}
              </button>
            ))}
          </div>
          {(profile.social_links ?? []).length > 0 && (
            <div className="mt-4 space-y-3">
              {(profile.social_links ?? []).map((link: SocialLink, i: number) => (
                <div key={`${link.platform}-${i}`} className="flex gap-2">
                  <span className="shrink-0 w-28 truncate text-[11px] text-muted-foreground pt-2.5">{link.platform}</span>
                  <input
                    value={link.url}
                    onChange={(e) => updateSocialLink(i, e.target.value)}
                    placeholder="https://"
                    className={`${inputClass()} flex-1`}
                  />
                  <button type="button" onClick={() => removeSocialLink(i)} className="shrink-0 p-2 text-muted-foreground hover:text-destructive" aria-label="Remove link">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] text-muted-foreground">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-[11px] text-destructive" role="alert">{error}</p>}
    </div>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-md border ${error ? "border-destructive/60" : "border-border"} bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent/60 transition`;
}
