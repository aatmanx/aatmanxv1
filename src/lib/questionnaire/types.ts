export type SocialLink = {
  platform: string;
  url: string;
};

export type BusinessProfile = {
  category: string;
  business_name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  phone_country_code: string;
  address: string;
  domain_preference: string;
  social_links: SocialLink[];
};

export type ColorScheme = {
  primary: string;
  secondary: string;
  accent: string;
};

export type FileAsset = {
  id: string;
  category: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  storage_path?: string;
  local_key?: string;
};

export type MultiSelectAnswer = {
  selected: string[];
  custom: string[];
};

export type FeatureTimelineAnswer = Record<string, string[]>;

export type QuestionnaireAnswers = Record<string, unknown>;

export type OnboardingPhase = "category" | "business-info" | "category-questions";

export type OnboardingState = {
  version: 1;
  sessionId: string;
  phase: OnboardingPhase;
  stepIndex: number;
  featureTimelineStep?: number;
  businessProfile: Partial<BusinessProfile>;
  questionnaireAnswers: QuestionnaireAnswers;
  updatedAt: string;
};

export type CategoryDefinition = {
  id: string;
  label: string;
  icon: string;
  questionnaireId: string;
};

export const BUSINESS_CATEGORIES: CategoryDefinition[] = [
  { id: "real-estate", label: "Real Estate", icon: "Building2", questionnaireId: "real-estate" },
  { id: "education", label: "Education & Training", icon: "GraduationCap", questionnaireId: "placeholder" },
  { id: "manufacturing", label: "Manufacturing", icon: "Factory", questionnaireId: "placeholder" },
  { id: "packaging", label: "Packaging", icon: "Package", questionnaireId: "placeholder" },
  { id: "fashion", label: "Clothing & Fashion Brand", icon: "Shirt", questionnaireId: "placeholder" },
  { id: "sports", label: "Sports Academy & Institutions", icon: "Trophy", questionnaireId: "placeholder" },
  { id: "legal", label: "Legal Services & Advocates", icon: "Scale", questionnaireId: "placeholder" },
  { id: "consumer-goods", label: "Consumer Goods & Durables", icon: "ShoppingBag", questionnaireId: "placeholder" },
  { id: "healthcare", label: "Healthcare & Clinics", icon: "HeartPulse", questionnaireId: "placeholder" },
  { id: "restaurants", label: "Restaurants & Cafes", icon: "UtensilsCrossed", questionnaireId: "placeholder" },
  { id: "technology", label: "Technology & IT Services", icon: "Cpu", questionnaireId: "placeholder" },
  { id: "other", label: "Other", icon: "MoreHorizontal", questionnaireId: "placeholder" },
];

export const EMPTY_BUSINESS_PROFILE: Partial<BusinessProfile> = {
  category: "",
  business_name: "",
  tagline: "",
  description: "",
  email: "",
  phone: "",
  phone_country_code: "+91",
  address: "",
  domain_preference: "",
  social_links: [],
};

export type QuestionType =
  | "multi-select-expandable"
  | "single-select"
  | "multi-select-all"
  | "design-preferences"
  | "file-upload"
  | "feature-timeline"
  | "composite-objective";

export type QuestionConfig = {
  key: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  initialOptions?: string[];
  allOptions?: string[];
  sections?: Array<{
    key: string;
    title: string;
    type: "single" | "multi-expandable";
    options?: string[];
    initialOptions?: string[];
    allOptions?: string[];
  }>;
  uploadCategories?: string[];
  timelineSteps?: Array<{ key: string; title: string; options: string[] }>;
  required?: boolean;
};

export type QuestionnaireConfig = {
  id: string;
  categoryLabel: string;
  questions: QuestionConfig[];
};
