import type { QuestionnaireConfig } from "../types";

export const placeholderQuestionnaire: QuestionnaireConfig = {
  id: "placeholder",
  categoryLabel: "General Business",
  questions: [
    {
      key: "primary_goal",
      title: "What is the primary goal of your website?",
      type: "single-select",
      allOptions: [
        "Generate leads",
        "Showcase services",
        "Build brand awareness",
        "Sell products online",
        "Provide information",
      ],
    },
    {
      key: "target_audience",
      title: "Who is your target audience?",
      type: "multi-select-all",
      allOptions: [
        "Local customers",
        "National customers",
        "International customers",
        "Business clients (B2B)",
        "Individual consumers (B2C)",
      ],
    },
    {
      key: "website_sections",
      title: "Which sections would you like on your website?",
      type: "multi-select-all",
      allOptions: [
        "Homepage",
        "About Us",
        "Services",
        "Products",
        "Testimonials",
        "Contact",
        "Blog",
        "FAQ",
      ],
    },
    {
      key: "design_style",
      title: "What visual style best represents your brand?",
      type: "multi-select-expandable",
      initialOptions: ["Clean & Minimal", "Modern & Bold", "Professional & Corporate", "Creative & Unique", "Other"],
      allOptions: ["Clean & Minimal", "Modern & Bold", "Professional & Corporate", "Creative & Unique", "Elegant & Premium"],
    },
    {
      key: "design_preferences",
      title: "Design & Branding Preferences",
      type: "design-preferences",
      initialOptions: ["Clean & Minimal", "Modern & Contemporary", "Corporate & Professional", "Bold & High-Converting", "Other"],
      allOptions: ["Dark Theme", "Light Theme", "Premium & Elegant"],
    },
    {
      key: "business_assets",
      title: "Upload any business assets for your website.",
      type: "file-upload",
      uploadCategories: ["Company Logo", "Brand Guidelines", "Product Images", "Team Photos", "Marketing Materials"],
    },
    {
      key: "key_features",
      title: "Which features are most important for your website?",
      type: "multi-select-all",
      allOptions: [
        "Contact forms",
        "Live chat / WhatsApp",
        "Online booking",
        "Photo gallery",
        "Blog / news",
        "Testimonials",
        "Social media integration",
      ],
    },
    {
      key: "website_features",
      title: "Prioritize website experiences",
      type: "feature-timeline",
      timelineSteps: [
        {
          key: "visual_experience",
          title: "Visual Experience",
          options: ["Large hero section", "Image galleries", "Video backgrounds", "Animations", "Minimal layout"],
        },
        {
          key: "lead_generation",
          title: "Lead Generation",
          options: ["Contact form", "WhatsApp button", "Callback request", "Newsletter signup", "Quote request"],
        },
        {
          key: "trust_credibility",
          title: "Trust & Credibility",
          options: ["Testimonials", "Client logos", "Certifications", "Case studies", "Team profiles"],
        },
        {
          key: "content_marketing",
          title: "Content & Marketing",
          options: ["Blog", "Resources", "FAQs", "News updates", "Downloadable brochures"],
        },
        {
          key: "premium_features",
          title: "Premium Features",
          options: ["Advanced search", "Interactive maps", "Live chat", "Multi-language", "Member portal"],
        },
      ],
    },
  ],
};
