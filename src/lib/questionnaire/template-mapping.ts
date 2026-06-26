import type { TemplateCategory } from "./types";

const BUSINESS_TYPE_TO_TEMPLATE: Record<string, TemplateCategory> = {
  "Property Developer / Builder": "developer",
  "Real Estate Agency / Brokerage": "agency",
  "Luxury Real Estate Firm": "luxury",
  "Commercial Real Estate": "commercial",
  "Property Management Company": "management",
  "Independent Realtor": "agency",
};

export function mapBusinessTypeToTemplate(businessType: string): TemplateCategory {
  return BUSINESS_TYPE_TO_TEMPLATE[businessType] ?? "agency";
}

export function buildTemplateSelection(templateCategory: TemplateCategory) {
  return { template_category: templateCategory };
}
