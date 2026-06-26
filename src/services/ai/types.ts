import type { RealEstateWebsiteProfile } from "@/lib/questionnaire/types";

export type AiGenerationTask =
  | "homepage_content"
  | "about_page"
  | "property_descriptions"
  | "seo_metadata"
  | "faqs"
  | "blog_content";

export type AiTaskStatus = "pending" | "processing" | "completed" | "failed" | "skipped";

export type AiGenerationStatus = Record<AiGenerationTask, AiTaskStatus>;

export type WebsiteProfileGenerationInput = {
  profile: RealEstateWebsiteProfile;
  tasks: AiGenerationTask[];
};

export type WebsiteProfileGenerationResult = {
  profile: RealEstateWebsiteProfile;
  generatedContent: Partial<Record<AiGenerationTask, unknown>>;
  status: AiGenerationStatus;
};

export type ContentGenerationInput = {
  profile: RealEstateWebsiteProfile;
  task: AiGenerationTask;
  context?: Record<string, unknown>;
};

export type ContentGenerationResult = {
  task: AiGenerationTask;
  content: unknown;
  status: "completed" | "failed";
  error?: string;
};

export type TemplateSelectionInput = {
  templateCategory: RealEstateWebsiteProfile["template_category"];
  websiteStyle: string;
  colorStyle: string;
  websiteGoal: string;
};

export type TemplateSelectionResult = {
  templateId: string;
  templateCategory: string;
  variant: string;
  confidence: number;
  rationale: string;
};

export interface AiServiceConfig {
  provider: "openai" | "anthropic" | "mock";
  apiKey?: string;
  model?: string;
}

export const DEFAULT_AI_CONFIG: AiServiceConfig = {
  provider: "mock",
};
