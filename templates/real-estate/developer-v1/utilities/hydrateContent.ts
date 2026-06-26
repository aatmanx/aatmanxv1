import type { SiteContent, ContentOverrides } from "../constants/types";
import { siteContent as defaultContent } from "../constants/siteContent";

type ProfileLike = {
  businessName?: string;
  tagline?: string;
  description?: string;
  location?: { city?: string; state?: string; primary?: string };
  contact?: { phone?: string; email?: string; address?: string; whatsapp?: string };
  branding?: { logoText?: string };
  propertyInfo?: Record<string, unknown>;
  services?: string[];
};

function deepMerge<T extends Record<string, unknown>>(base: T, overrides: Partial<T>): T {
  const result = { ...base };
  for (const key of Object.keys(overrides) as (keyof T)[]) {
    const val = overrides[key];
    if (val && typeof val === "object" && !Array.isArray(val)) {
      result[key] = deepMerge(
        (base[key] ?? {}) as Record<string, unknown>,
        val as Record<string, unknown>,
      ) as T[keyof T];
    } else if (val !== undefined) {
      result[key] = val as T[keyof T];
    }
  }
  return result;
}

function replacePlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/\{\{([^}]+)\}\}/g, (_, key: string) => values[key.trim()] ?? text);
}

function applyProfileValues(content: SiteContent, profile: ProfileLike): SiteContent {
  const values: Record<string, string> = {
    businessName: profile.businessName ?? "Your Business Name",
    tagline: profile.tagline ?? "Your Tagline Here",
    establishedYear: "2000",
    logoText: profile.branding?.logoText ?? (profile.businessName ?? "BRAND").slice(0, 12).toUpperCase(),
    "hero.eyebrow": "Premium Real Estate Developer",
    "hero.title": profile.businessName ? `Welcome to ${profile.businessName}` : "Where Address Becomes Identity.",
    "hero.subtitle": profile.description ?? "Crafted residences and commercial landmarks.",
    "hero.primaryCta.label": "Explore Projects",
    "hero.secondaryCta.label": "Book a Site Visit",
    "contact.address": profile.contact?.address ?? profile.location?.primary ?? "",
    "contact.phone": profile.contact?.phone ?? "",
    "contact.email": profile.contact?.email ?? "",
    "contact.whatsapp": profile.contact?.whatsapp ?? profile.contact?.phone ?? "",
    "contact.hours": "Mon – Sat · 10:00 AM – 7:00 PM",
    "about.title": `About ${profile.businessName ?? "Us"}`,
    "about.intro": profile.description ?? "",
    "seo.title": `${profile.businessName ?? "Real Estate Developer"} — Official Website`,
    "seo.description": profile.description ?? "",
  };

  const json = JSON.stringify(content);
  const hydrated = JSON.parse(replacePlaceholders(json, values)) as SiteContent;
  return hydrated;
}

export function hydrateContent(
  profile: ProfileLike,
  aiContent?: Record<string, unknown>,
  overrides?: ContentOverrides,
): SiteContent {
  let content = structuredClone(defaultContent);

  content = applyProfileValues(content, profile);

  if (aiContent?.homepage_content) {
    const home = aiContent.homepage_content as Record<string, unknown>;
    if (home.hero) content.hero = deepMerge(content.hero as unknown as Record<string, unknown>, home.hero as Record<string, unknown>) as SiteContent["hero"];
    if (home.whyChooseUs) content.whyChooseUs = deepMerge(content.whyChooseUs as unknown as Record<string, unknown>, home.whyChooseUs as Record<string, unknown>) as SiteContent["whyChooseUs"];
  }

  if (aiContent?.about_page) {
    content.about = deepMerge(content.about as unknown as Record<string, unknown>, aiContent.about_page as Record<string, unknown>) as SiteContent["about"];
  }

  if (aiContent?.property_descriptions && Array.isArray(aiContent.property_descriptions)) {
    const projects = aiContent.property_descriptions as SiteContent["projects"];
    content.projects = projects.map((p, i) => ({
      ...content.projects[i],
      ...p,
      slug: p.slug ?? content.projects[i]?.slug ?? `project-${i}`,
    }));
  }

  if (aiContent?.seo_metadata) {
    content.seo = deepMerge(
      (content.seo ?? {}) as unknown as Record<string, unknown>,
      aiContent.seo_metadata as Record<string, unknown>,
    ) as SiteContent["seo"];
  }

  if (aiContent?.faqs && Array.isArray(aiContent.faqs)) {
    content.faqs = aiContent.faqs as SiteContent["faqs"];
  }

  if (overrides) {
    content = deepMerge(content as unknown as Record<string, unknown>, overrides as Record<string, unknown>) as SiteContent;
  }

  return content;
}

export { defaultContent };
