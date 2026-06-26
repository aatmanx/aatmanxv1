import heroBuilding from "@/assets/hero-building.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import interior1 from "@/assets/interior-1.jpg";
import construction from "@/assets/construction.jpg";

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
};

export const siteContent: SiteContent = {
  businessName: "Meridian Estates",
  tagline: "Crafting Landmarks. Building Legacies.",
  established: "2004",
  logoText: "MERIDIAN",
  hero: {
    eyebrow: "Premium Real Estate Developer",
    title: "Where Address Becomes\u00a0Identity.",
    subtitle:
      "A collection of meticulously crafted residences and commercial landmarks designed for those who measure life in details.",
    image: heroBuilding,
    primaryCta: { label: "Explore Projects", href: "/projects" },
    secondaryCta: { label: "Book a Site Visit", href: "/site-visit" },
    stats: [
      { label: "Years of Excellence", value: "20+" },
      { label: "Projects Delivered", value: "48" },
      { label: "Happy Families", value: "12,500+" },
      { label: "Sq. Ft. Developed", value: "18M" },
    ],
  },
  whyChooseUs: {
    title: "Built on Trust. Defined by Detail.",
    subtitle:
      "Two decades of uncompromising standards across design, construction and delivery.",
    items: [
      {
        title: "On-Time Possession",
        description:
          "Every project handed over on schedule, backed by RERA-compliant timelines.",
        icon: "Clock",
      },
      {
        title: "Premium Construction",
        description:
          "Earthquake-resistant RCC structures with German and Italian finishes.",
        icon: "ShieldCheck",
      },
      {
        title: "Award-Winning Design",
        description:
          "Recognised by CNBC Awaaz and Realty+ for architectural excellence.",
        icon: "Award",
      },
      {
        title: "Transparent Pricing",
        description:
          "No hidden costs. Detailed cost-sheets and clear payment schedules.",
        icon: "FileCheck",
      },
      {
        title: "Dedicated Relationship Manager",
        description:
          "A single point of contact from booking through registration and beyond.",
        icon: "Users",
      },
      {
        title: "Lifetime After-Sales",
        description:
          "Five-year structural warranty and lifetime support from our care team.",
        icon: "HeartHandshake",
      },
    ],
  },
  amenities: [
    { name: "Infinity Pool", icon: "Waves", description: "Sky-deck infinity pool" },
    { name: "Clubhouse", icon: "Building2", description: "40,000 sq.ft. clubhouse" },
    { name: "Smart Gym", icon: "Dumbbell", description: "Technogym equipment" },
    { name: "Landscaped Gardens", icon: "Trees", description: "8 acres of green" },
    { name: "Kids' Play Area", icon: "Baby", description: "Themed play zones" },
    { name: "Co-working Lounge", icon: "Briefcase", description: "Work-from-home spaces" },
    { name: "Spa & Wellness", icon: "Sparkles", description: "Steam, sauna and spa" },
    { name: "24x7 Security", icon: "ShieldCheck", description: "Biometric & CCTV" },
  ],
  testimonials: [
    {
      name: "Aarav & Priya Mehta",
      role: "Homeowners",
      project: "Meridian Skyline",
      quote:
        "From the first meeting to the day we received our keys, Meridian made us feel like family. The build quality is genuinely world-class.",
    },
    {
      name: "Rohan Kapoor",
      role: "Investor",
      project: "Meridian Heights",
      quote:
        "I've invested in three Meridian projects. On-time delivery, transparent paperwork and outstanding appreciation. They've earned my trust.",
    },
    {
      name: "Dr. Anjali Rao",
      role: "Homeowner",
      project: "Meridian Greens",
      quote:
        "The attention to detail in the amenities and finishes is unmatched. Our family loves every corner of this community.",
    },
  ],
  about: {
    title: "Twenty Years of Crafting India's Skylines.",
    intro:
      "Meridian Estates is a second-generation real estate developer with 20 years of building integrity-led communities across the country.",
    story:
      "Founded in 2004 with a single residential tower in Pune, Meridian Estates has grown into one of the country's most respected developers — with 48 delivered projects, over 12,500 homes handed over, and a reputation built one keychain at a time. Our work spans premium residences, integrated townships and Grade-A commercial campuses, all united by a single principle: build only what we would proudly live in.",
    mission:
      "To craft homes and workspaces that elevate everyday life through thoughtful design, honest construction and uncompromising service.",
    vision:
      "To be the most trusted name in Indian real estate — the developer that families and investors choose for generations.",
    stats: [
      { label: "Projects Delivered", value: "48" },
      { label: "Cities", value: "7" },
      { label: "Sq. Ft. Built", value: "18M" },
      { label: "Customer Satisfaction", value: "97%" },
    ],
    leadership: [
      {
        name: "Vikram Shah",
        role: "Founder & Chairman",
        bio: "A civil engineer with 35 years in construction, Vikram founded Meridian on a single principle: build it like it's your own home.",
      },
      {
        name: "Anika Shah",
        role: "Managing Director",
        bio: "Wharton MBA leading Meridian's expansion into integrated townships and sustainable commercial campuses.",
      },
      {
        name: "Karan Iyer",
        role: "Chief Design Officer",
        bio: "Award-winning architect (AA London) responsible for Meridian's signature design language.",
      },
    ],
  },
  projects: [
    {
      slug: "meridian-skyline",
      name: "Meridian Skyline",
      tagline: "Sky-touching residences on Worli seafront.",
      location: "Worli, Mumbai",
      type: "Premium Residences",
      status: "Ongoing",
      startingPrice: "₹ 4.85 Cr*",
      configurations: ["3 BHK", "4 BHK", "Penthouse"],
      area: "1,850 – 4,200 sq.ft.",
      possession: "Dec 2026",
      reraId: "P51800012345",
      heroImage: project1,
      gallery: [project1, interior1, heroBuilding, construction],
      overview:
        "Rising 52 storeys above the Worli seafront, Meridian Skyline is a collection of 220 residences with uninterrupted Arabian Sea views, a sky-deck infinity pool and India's tallest residential clubhouse.",
      highlights: [
        "52 storeys, 220 residences",
        "Uninterrupted sea views from every home",
        "Sky-deck infinity pool on the 50th floor",
        "Italian marble flooring as standard",
        "Private deck for every residence",
        "RERA registered: P51800012345",
      ],
      amenities: [
        "Infinity Pool",
        "Clubhouse",
        "Smart Gym",
        "Spa & Wellness",
        "Co-working Lounge",
        "24x7 Security",
      ],
      floorPlans: [
        { name: "3 BHK Classic", area: "1,850 sq.ft.", price: "₹ 4.85 Cr*" },
        { name: "4 BHK Signature", area: "2,650 sq.ft.", price: "₹ 7.20 Cr*" },
        { name: "Penthouse", area: "4,200 sq.ft.", price: "On request" },
      ],
      masterPlanImage: heroBuilding,
      locationAdvantages: [
        { label: "Bandra-Worli Sea Link", distance: "2 min" },
        { label: "Worli Metro Station", distance: "5 min" },
        { label: "Nehru Centre", distance: "7 min" },
        { label: "Mumbai International Airport", distance: "25 min" },
        { label: "BKC", distance: "15 min" },
      ],
      constructionStatus: [
        { label: "Excavation", percent: 100 },
        { label: "Foundation", percent: 100 },
        { label: "Structure", percent: 68 },
        { label: "Finishing", percent: 22 },
      ],
      brochureUrl: "#",
      mapEmbedUrl:
        "https://www.openstreetmap.org/export/embed.html?bbox=72.81%2C19.01%2C72.83%2C19.02&layer=mapnik",
    },
    {
      slug: "meridian-greens",
      name: "Meridian Greens",
      tagline: "Garden villas in the heart of Whitefield.",
      location: "Whitefield, Bengaluru",
      type: "Luxury Villas",
      status: "Ready to Move",
      startingPrice: "₹ 3.20 Cr*",
      configurations: ["4 BHK Villa", "5 BHK Villa"],
      area: "3,200 – 5,400 sq.ft.",
      possession: "Ready",
      reraId: "PRM/KA/RERA/1251/308/PR/180712/000123",
      heroImage: project2,
      gallery: [project2, interior1, project1],
      overview:
        "A gated community of 64 garden villas set across 18 acres of landscaped greens, with private pools, a Greg Norman-designed 9-hole pitch and a 40,000 sq.ft. clubhouse.",
      highlights: [
        "64 villas across 18 acres",
        "Private pool with every villa",
        "Greg Norman-designed 9-hole pitch",
        "40,000 sq.ft. clubhouse",
        "EV charging in every garage",
      ],
      amenities: [
        "Clubhouse",
        "Infinity Pool",
        "Smart Gym",
        "Landscaped Gardens",
        "Kids' Play Area",
        "24x7 Security",
      ],
      floorPlans: [
        { name: "4 BHK Villa", area: "3,200 sq.ft.", price: "₹ 3.20 Cr*" },
        { name: "5 BHK Villa", area: "5,400 sq.ft.", price: "₹ 5.80 Cr*" },
      ],
      masterPlanImage: project2,
      locationAdvantages: [
        { label: "ITPL Tech Park", distance: "10 min" },
        { label: "Phoenix Marketcity", distance: "12 min" },
        { label: "Whitefield Metro", distance: "8 min" },
        { label: "International School", distance: "5 min" },
      ],
      constructionStatus: [
        { label: "Structure", percent: 100 },
        { label: "Finishing", percent: 100 },
        { label: "Handover", percent: 100 },
      ],
      brochureUrl: "#",
      mapEmbedUrl:
        "https://www.openstreetmap.org/export/embed.html?bbox=77.74%2C12.96%2C77.76%2C12.98&layer=mapnik",
    },
    {
      slug: "meridian-one",
      name: "Meridian One",
      tagline: "Grade-A commercial campus in Cyberhub.",
      location: "Gurugram, NCR",
      type: "Commercial Office Space",
      status: "Upcoming",
      startingPrice: "₹ 18,500 / sq.ft.",
      configurations: ["Office Suites", "Full Floors", "Retail"],
      area: "850 – 50,000 sq.ft.",
      possession: "Q3 2027",
      reraId: "RC/REP/HARERA/GGM/2024/12345",
      heroImage: project3,
      gallery: [project3, heroBuilding],
      overview:
        "A LEED Platinum certified Grade-A commercial campus comprising two glass towers, ground-level retail, and a green plaza connecting directly to Cyberhub.",
      highlights: [
        "LEED Platinum pre-certified",
        "Two towers, 1.4M sq.ft.",
        "9 m floor-to-floor",
        "Direct Cyberhub connectivity",
        "Triple-basement parking",
      ],
      amenities: [
        "Co-working Lounge",
        "Smart Gym",
        "Landscaped Gardens",
        "24x7 Security",
        "Spa & Wellness",
      ],
      floorPlans: [
        { name: "Boutique Suite", area: "850 sq.ft.", price: "₹ 1.57 Cr*" },
        { name: "Half Floor", area: "12,000 sq.ft.", price: "On request" },
        { name: "Full Floor", area: "50,000 sq.ft.", price: "On request" },
      ],
      masterPlanImage: project3,
      locationAdvantages: [
        { label: "Cyberhub", distance: "0 min — direct access" },
        { label: "Rapid Metro", distance: "3 min" },
        { label: "NH-48", distance: "2 min" },
        { label: "IGI Airport", distance: "20 min" },
      ],
      constructionStatus: [
        { label: "Approvals", percent: 100 },
        { label: "Excavation", percent: 35 },
        { label: "Structure", percent: 0 },
      ],
      brochureUrl: "#",
      mapEmbedUrl:
        "https://www.openstreetmap.org/export/embed.html?bbox=77.08%2C28.49%2C77.10%2C28.51&layer=mapnik",
    },
  ],
  constructionUpdates: [
    {
      id: "u-2026-06",
      date: "June 2026",
      title: "Skyline crosses 35th floor",
      projectName: "Meridian Skyline",
      description:
        "The structural team completed the 35th-floor slab this month, with façade glazing now underway up to the 28th floor. All works on schedule for Dec 2026 handover.",
      completionPercent: 68,
      images: [construction, heroBuilding],
    },
    {
      id: "u-2026-05",
      date: "May 2026",
      title: "Clubhouse interiors begin at Skyline",
      projectName: "Meridian Skyline",
      description:
        "Italian marble installation has begun across the podium clubhouse, with the lap pool shell now structurally complete.",
      completionPercent: 62,
      images: [interior1, construction],
    },
    {
      id: "u-2026-04",
      date: "April 2026",
      title: "Meridian One excavation underway",
      projectName: "Meridian One",
      description:
        "Triple-basement excavation has reached 14 metres. Diaphragm wall installation is 60% complete.",
      completionPercent: 30,
      images: [construction],
    },
    {
      id: "u-2026-03",
      date: "March 2026",
      title: "Skyline crosses 30th floor",
      projectName: "Meridian Skyline",
      description:
        "Structural works crossed the 30th floor with finishing works initiated on lower floors.",
      completionPercent: 58,
      images: [construction, heroBuilding],
    },
  ],
  contact: {
    address:
      "Meridian House, 14th Floor, Senapati Bapat Marg, Lower Parel, Mumbai 400013",
    phone: "+91 22 6100 4000",
    whatsapp: "+919876543210",
    email: "sales@meridianestates.example",
    hours: "Mon – Sat · 10:00 AM – 7:00 PM",
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=72.82%2C19.00%2C72.84%2C19.02&layer=mapnik",
    socials: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
  siteVisitSettings: {
    availableDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    timeSlots: [
      "10:00 AM",
      "11:30 AM",
      "1:00 PM",
      "2:30 PM",
      "4:00 PM",
      "5:30 PM",
    ],
    note: "Our relationship manager will confirm your slot within 2 hours. Pickup and drop available for Mumbai bookings.",
  },
};

export const findProject = (slug: string) =>
  siteContent.projects.find((p) => p.slug === slug);
