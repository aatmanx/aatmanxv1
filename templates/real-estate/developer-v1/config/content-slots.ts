/**
 * Content slot definitions for AI injection.
 * Each slot maps to a section of the developer-v1 template.
 */
export const CONTENT_SLOTS = [
  {
    id: "hero",
    label: "Hero",
    fields: ["hero.eyebrow", "hero.title", "hero.subtitle", "hero.stats", "hero.primaryCta", "hero.secondaryCta", "hero.image"],
  },
  {
    id: "about",
    label: "About",
    fields: ["about.title", "about.intro", "about.story", "about.mission", "about.vision", "about.stats", "about.leadership"],
  },
  {
    id: "projects",
    label: "Projects",
    fields: ["projects"],
    repeatable: true,
  },
  {
    id: "amenities",
    label: "Amenities",
    fields: ["amenities"],
    repeatable: true,
  },
  {
    id: "gallery",
    label: "Gallery",
    fields: ["projects[].gallery"],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    fields: ["testimonials"],
    repeatable: true,
  },
  {
    id: "contact",
    label: "Contact",
    fields: ["contact.address", "contact.phone", "contact.whatsapp", "contact.email", "contact.hours", "contact.socials"],
  },
  {
    id: "footer",
    label: "Footer",
    fields: ["businessName", "tagline", "established", "logoText"],
  },
  {
    id: "seo",
    label: "SEO",
    fields: ["seo.title", "seo.description", "seo.keywords", "seo.ogTitle", "seo.ogDescription"],
  },
  {
    id: "faq",
    label: "FAQ",
    fields: ["faqs"],
    repeatable: true,
  },
  {
    id: "cta",
    label: "CTA",
    fields: ["hero.primaryCta", "hero.secondaryCta"],
  },
  {
    id: "construction",
    label: "Construction Updates",
    fields: ["constructionUpdates"],
    repeatable: true,
  },
  {
    id: "siteVisit",
    label: "Site Visit",
    fields: ["siteVisitSettings.availableDays", "siteVisitSettings.timeSlots", "siteVisitSettings.note"],
  },
] as const;

export type ContentSlotId = (typeof CONTENT_SLOTS)[number]["id"];
