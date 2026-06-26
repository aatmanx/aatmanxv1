export type Project = {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  type: string;
  status: "Ongoing" | "Upcoming" | "Ready to Move" | "Completed";
  startingPrice: string;
  configurations: string[];
  area: string;
  possession: string;
  reraId?: string;
  heroImage: string;
  gallery: string[];
  overview: string;
  highlights: string[];
  amenities: string[];
  floorPlans: { name: string; area: string; price: string; image?: string }[];
  masterPlanImage: string;
  locationAdvantages: { label: string; distance: string }[];
  constructionStatus: { label: string; percent: number }[];
  brochureUrl: string;
  mapEmbedUrl: string;
};

export type ConstructionUpdate = {
  id: string;
  date: string;
  title: string;
  projectName: string;
  description: string;
  completionPercent: number;
  images: string[];
};

export type SiteContent = {
  businessName: string;
  tagline: string;
  established: string;
  logoText: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    stats: { label: string; value: string }[];
  };
  whyChooseUs: {
    title: string;
    subtitle: string;
    items: { title: string; description: string; icon: string }[];
  };
  amenities: { name: string; icon: string; description: string }[];
  testimonials: {
    name: string;
    role: string;
    quote: string;
    project: string;
  }[];
  about: {
    title: string;
    intro: string;
    story: string;
    mission: string;
    vision: string;
    stats: { label: string; value: string }[];
    leadership: { name: string; role: string; bio: string }[];
  };
  projects: Project[];
  constructionUpdates: ConstructionUpdate[];
  contact: {
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
    hours: string;
    mapEmbedUrl: string;
    socials: { label: string; href: string }[];
  };
  siteVisitSettings: {
    availableDays: string[];
    timeSlots: string[];
    note: string;
  };
  seo?: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
  };
  faqs?: { question: string; answer: string }[];
};

export type ContentOverrides = Partial<SiteContent> & {
  aiContent?: Record<string, unknown>;
};
