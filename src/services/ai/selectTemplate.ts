import type { TemplateSelectionInput, TemplateSelectionResult } from "./types";
import { resolveTemplateForCategory } from "@/services/templates/templateRegistry";

const STYLE_VARIANT_MAP: Record<string, string> = {
  "Modern Corporate": "corporate-v1",
  "Luxury Premium": "luxury-v1",
  "Minimal Clean": "minimal-v1",
  "Bold Sales Focused": "sales-v1",
  "High-End International": "international-v1",
};

/**
 * Maps questionnaire answers to a template ID for website generation.
 * Integrates with the template registry at templates/real-estate/.
 */
export async function selectTemplate(input: TemplateSelectionInput): Promise<TemplateSelectionResult> {
  const manifest = resolveTemplateForCategory(input.templateCategory);
  const variant = STYLE_VARIANT_MAP[input.websiteStyle] ?? "default-v1";

  return {
    templateId: manifest.id,
    templateCategory: input.templateCategory,
    variant,
    confidence: 1.0,
    rationale: `Selected ${manifest.id} (${manifest.name}) based on business type (${input.templateCategory}) and style preference (${input.websiteStyle}). Website goal: ${input.websiteGoal}.`,
  };
}

export function getTemplateCategoryFromBusinessType(businessType: string): string {
  const map: Record<string, string> = {
    "Property Developer / Builder": "developer",
    "Real Estate Agency / Brokerage": "agency",
    "Luxury Real Estate Firm": "luxury",
    "Commercial Real Estate": "commercial",
    "Property Management Company": "management",
    "Independent Realtor": "agency",
  };
  return map[businessType] ?? "agency";
}
