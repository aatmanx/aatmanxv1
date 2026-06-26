import type { RealEstateWebsiteProfile } from "@/lib/questionnaire/types";
import { generateContent } from "./contentGenerator";
import type { AiGenerationTask, ContentGenerationResult } from "./types";

export type SectionId =
  | "hero"
  | "about"
  | "projects"
  | "amenities"
  | "gallery"
  | "testimonials"
  | "contact"
  | "footer"
  | "seo"
  | "faq"
  | "cta"
  | "construction"
  | "siteVisit";

const SECTION_TASK_MAP: Record<SectionId, AiGenerationTask | AiGenerationTask[]> = {
  hero: "homepage_content",
  about: "about_page",
  projects: "property_descriptions",
  amenities: "homepage_content",
  gallery: "property_descriptions",
  testimonials: "homepage_content",
  contact: "homepage_content",
  footer: "homepage_content",
  seo: "seo_metadata",
  faq: "faqs",
  cta: "homepage_content",
  construction: "property_descriptions",
  siteVisit: "homepage_content",
};

export async function generateSection(
  sectionId: SectionId,
  profile: RealEstateWebsiteProfile,
): Promise<ContentGenerationResult> {
  const taskOrTasks = SECTION_TASK_MAP[sectionId];
  const task = Array.isArray(taskOrTasks) ? taskOrTasks[0] : taskOrTasks;

  return generateContent({
    task,
    profile,
    context: { sectionId },
  });
}

export async function generateAllSections(
  profile: RealEstateWebsiteProfile,
  sections: SectionId[],
): Promise<Record<SectionId, ContentGenerationResult>> {
  const results = await Promise.all(
    sections.map(async (sectionId) => {
      const result = await generateSection(sectionId, profile);
      return [sectionId, result] as const;
    }),
  );

  return Object.fromEntries(results) as Record<SectionId, ContentGenerationResult>;
}

export { SECTION_TASK_MAP };
