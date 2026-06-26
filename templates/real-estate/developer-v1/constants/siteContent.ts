import type { SiteContent } from "./types";

const heroBuilding = "/templates/real-estate/developer-v1/assets/hero-building.jpg";
const project1 = "/templates/real-estate/developer-v1/assets/project-1.jpg";
const project2 = "/templates/real-estate/developer-v1/assets/project-2.jpg";
const project3 = "/templates/real-estate/developer-v1/assets/project-3.jpg";
const interior1 = "/templates/real-estate/developer-v1/assets/interior-1.jpg";
const construction = "/templates/real-estate/developer-v1/assets/construction.jpg";

/**
 * Default placeholder content — all business-specific values are generic.
 * AI hydration replaces these via utilities/hydrateContent.ts at generation time.
 */
export const siteContent: SiteContent = {
  businessName: "{{businessName}}",
  tagline: "{{tagline}}",
  established: "{{establishedYear}}",
  logoText: "{{logoText}}",
  hero: {
    eyebrow: "{{hero.eyebrow}}",
    title: "{{hero.title}}",
    subtitle: "{{hero.subtitle}}",
    image: heroBuilding,
    primaryCta: { label: "{{hero.primaryCta.label}}", href: "/projects" },
    secondaryCta: { label: "{{hero.secondaryCta.label}}", href: "/site-visit" },
    stats: [
      { label: "{{hero.stats.0.label}}", value: "{{hero.stats.0.value}}" },
      { label: "{{hero.stats.1.label}}", value: "{{hero.stats.1.value}}" },
      { label: "{{hero.stats.2.label}}", value: "{{hero.stats.2.value}}" },
      { label: "{{hero.stats.3.label}}", value: "{{hero.stats.3.value}}" },
    ],
  },
  whyChooseUs: {
    title: "{{whyChooseUs.title}}",
    subtitle: "{{whyChooseUs.subtitle}}",
    items: [
      { title: "{{whyChooseUs.items.0.title}}", description: "{{whyChooseUs.items.0.description}}", icon: "Clock" },
      { title: "{{whyChooseUs.items.1.title}}", description: "{{whyChooseUs.items.1.description}}", icon: "ShieldCheck" },
      { title: "{{whyChooseUs.items.2.title}}", description: "{{whyChooseUs.items.2.description}}", icon: "Award" },
      { title: "{{whyChooseUs.items.3.title}}", description: "{{whyChooseUs.items.3.description}}", icon: "FileCheck" },
      { title: "{{whyChooseUs.items.4.title}}", description: "{{whyChooseUs.items.4.description}}", icon: "Users" },
      { title: "{{whyChooseUs.items.5.title}}", description: "{{whyChooseUs.items.5.description}}", icon: "HeartHandshake" },
    ],
  },
  amenities: [
    { name: "{{amenities.0.name}}", icon: "Waves", description: "{{amenities.0.description}}" },
    { name: "{{amenities.1.name}}", icon: "Building2", description: "{{amenities.1.description}}" },
    { name: "{{amenities.2.name}}", icon: "Dumbbell", description: "{{amenities.2.description}}" },
    { name: "{{amenities.3.name}}", icon: "Trees", description: "{{amenities.3.description}}" },
    { name: "{{amenities.4.name}}", icon: "Baby", description: "{{amenities.4.description}}" },
    { name: "{{amenities.5.name}}", icon: "Briefcase", description: "{{amenities.5.description}}" },
    { name: "{{amenities.6.name}}", icon: "Sparkles", description: "{{amenities.6.description}}" },
    { name: "{{amenities.7.name}}", icon: "ShieldCheck", description: "{{amenities.7.description}}" },
  ],
  testimonials: [
    {
      name: "{{testimonials.0.name}}",
      role: "{{testimonials.0.role}}",
      project: "{{testimonials.0.project}}",
      quote: "{{testimonials.0.quote}}",
    },
    {
      name: "{{testimonials.1.name}}",
      role: "{{testimonials.1.role}}",
      project: "{{testimonials.1.project}}",
      quote: "{{testimonials.1.quote}}",
    },
    {
      name: "{{testimonials.2.name}}",
      role: "{{testimonials.2.role}}",
      project: "{{testimonials.2.project}}",
      quote: "{{testimonials.2.quote}}",
    },
  ],
  about: {
    title: "{{about.title}}",
    intro: "{{about.intro}}",
    story: "{{about.story}}",
    mission: "{{about.mission}}",
    vision: "{{about.vision}}",
    stats: [
      { label: "{{about.stats.0.label}}", value: "{{about.stats.0.value}}" },
      { label: "{{about.stats.1.label}}", value: "{{about.stats.1.value}}" },
      { label: "{{about.stats.2.label}}", value: "{{about.stats.2.value}}" },
      { label: "{{about.stats.3.label}}", value: "{{about.stats.3.value}}" },
    ],
    leadership: [
      { name: "{{about.leadership.0.name}}", role: "{{about.leadership.0.role}}", bio: "{{about.leadership.0.bio}}" },
      { name: "{{about.leadership.1.name}}", role: "{{about.leadership.1.role}}", bio: "{{about.leadership.1.bio}}" },
      { name: "{{about.leadership.2.name}}", role: "{{about.leadership.2.role}}", bio: "{{about.leadership.2.bio}}" },
    ],
  },
  projects: [
    {
      slug: "{{projects.0.slug}}",
      name: "{{projects.0.name}}",
      tagline: "{{projects.0.tagline}}",
      location: "{{projects.0.location}}",
      type: "{{projects.0.type}}",
      status: "Ongoing",
      startingPrice: "{{projects.0.startingPrice}}",
      configurations: ["{{projects.0.configurations.0}}", "{{projects.0.configurations.1}}"],
      area: "{{projects.0.area}}",
      possession: "{{projects.0.possession}}",
      reraId: "{{projects.0.reraId}}",
      heroImage: project1,
      gallery: [project1, interior1, heroBuilding, construction],
      overview: "{{projects.0.overview}}",
      highlights: ["{{projects.0.highlights.0}}", "{{projects.0.highlights.1}}", "{{projects.0.highlights.2}}"],
      amenities: ["{{projects.0.amenities.0}}", "{{projects.0.amenities.1}}"],
      floorPlans: [
        { name: "{{projects.0.floorPlans.0.name}}", area: "{{projects.0.floorPlans.0.area}}", price: "{{projects.0.floorPlans.0.price}}" },
      ],
      masterPlanImage: heroBuilding,
      locationAdvantages: [
        { label: "{{projects.0.locationAdvantages.0.label}}", distance: "{{projects.0.locationAdvantages.0.distance}}" },
      ],
      constructionStatus: [
        { label: "{{projects.0.constructionStatus.0.label}}", percent: 100 },
        { label: "{{projects.0.constructionStatus.1.label}}", percent: 50 },
      ],
      brochureUrl: "#",
      mapEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=77.5%2C12.9%2C77.7%2C13.0&layer=mapnik",
    },
    {
      slug: "{{projects.1.slug}}",
      name: "{{projects.1.name}}",
      tagline: "{{projects.1.tagline}}",
      location: "{{projects.1.location}}",
      type: "{{projects.1.type}}",
      status: "Ready to Move",
      startingPrice: "{{projects.1.startingPrice}}",
      configurations: ["{{projects.1.configurations.0}}"],
      area: "{{projects.1.area}}",
      possession: "{{projects.1.possession}}",
      heroImage: project2,
      gallery: [project2, interior1, project1],
      overview: "{{projects.1.overview}}",
      highlights: ["{{projects.1.highlights.0}}"],
      amenities: ["{{projects.1.amenities.0}}"],
      floorPlans: [{ name: "{{projects.1.floorPlans.0.name}}", area: "{{projects.1.floorPlans.0.area}}", price: "{{projects.1.floorPlans.0.price}}" }],
      masterPlanImage: project2,
      locationAdvantages: [{ label: "{{projects.1.locationAdvantages.0.label}}", distance: "{{projects.1.locationAdvantages.0.distance}}" }],
      constructionStatus: [{ label: "Handover", percent: 100 }],
      brochureUrl: "#",
      mapEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=77.7%2C12.9%2C77.8%2C13.0&layer=mapnik",
    },
    {
      slug: "{{projects.2.slug}}",
      name: "{{projects.2.name}}",
      tagline: "{{projects.2.tagline}}",
      location: "{{projects.2.location}}",
      type: "{{projects.2.type}}",
      status: "Upcoming",
      startingPrice: "{{projects.2.startingPrice}}",
      configurations: ["{{projects.2.configurations.0}}"],
      area: "{{projects.2.area}}",
      possession: "{{projects.2.possession}}",
      heroImage: project3,
      gallery: [project3, heroBuilding],
      overview: "{{projects.2.overview}}",
      highlights: ["{{projects.2.highlights.0}}"],
      amenities: ["{{projects.2.amenities.0}}"],
      floorPlans: [{ name: "{{projects.2.floorPlans.0.name}}", area: "{{projects.2.floorPlans.0.area}}", price: "{{projects.2.floorPlans.0.price}}" }],
      masterPlanImage: project3,
      locationAdvantages: [{ label: "{{projects.2.locationAdvantages.0.label}}", distance: "{{projects.2.locationAdvantages.0.distance}}" }],
      constructionStatus: [{ label: "{{projects.2.constructionStatus.0.label}}", percent: 35 }],
      brochureUrl: "#",
      mapEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=77.0%2C28.4%2C77.2%2C28.6&layer=mapnik",
    },
  ],
  constructionUpdates: [
    {
      id: "{{constructionUpdates.0.id}}",
      date: "{{constructionUpdates.0.date}}",
      title: "{{constructionUpdates.0.title}}",
      projectName: "{{constructionUpdates.0.projectName}}",
      description: "{{constructionUpdates.0.description}}",
      completionPercent: 68,
      images: [construction, heroBuilding],
    },
    {
      id: "{{constructionUpdates.1.id}}",
      date: "{{constructionUpdates.1.date}}",
      title: "{{constructionUpdates.1.title}}",
      projectName: "{{constructionUpdates.1.projectName}}",
      description: "{{constructionUpdates.1.description}}",
      completionPercent: 62,
      images: [interior1, construction],
    },
  ],
  contact: {
    address: "{{contact.address}}",
    phone: "{{contact.phone}}",
    whatsapp: "{{contact.whatsapp}}",
    email: "{{contact.email}}",
    hours: "{{contact.hours}}",
    mapEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=72.82%2C19.00%2C72.84%2C19.02&layer=mapnik",
    socials: [
      { label: "Instagram", href: "{{contact.socials.instagram}}" },
      { label: "LinkedIn", href: "{{contact.socials.linkedin}}" },
      { label: "YouTube", href: "{{contact.socials.youtube}}" },
    ],
  },
  siteVisitSettings: {
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    timeSlots: ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"],
    note: "{{siteVisitSettings.note}}",
  },
  seo: {
    title: "{{seo.title}}",
    description: "{{seo.description}}",
    keywords: ["{{seo.keywords.0}}", "{{seo.keywords.1}}"],
    ogTitle: "{{seo.ogTitle}}",
    ogDescription: "{{seo.ogDescription}}",
  },
  faqs: [
    { question: "{{faqs.0.question}}", answer: "{{faqs.0.answer}}" },
    { question: "{{faqs.1.question}}", answer: "{{faqs.1.answer}}" },
  ],
};

export type { Project } from "./types";

export const findProject = (slug: string) => siteContent.projects.find((p) => p.slug === slug);

/** Mutable content store — hydrated at website generation time */
let activeContent: SiteContent = siteContent;

export function getSiteContent(): SiteContent {
  return activeContent;
}

export function setSiteContent(content: SiteContent): void {
  activeContent = content;
}
