import type { TemplateCategory, TemplateManifest } from "./templateMetadata";
import { buildImportPath, buildTemplatePath } from "./templateMetadata";

function manifest(
  templateId: string,
  name: string,
  category: TemplateCategory,
  description: string,
  features: string[],
): TemplateManifest {
  const rootPath = buildTemplatePath("real-estate", templateId);
  return {
    id: `real-estate/${templateId}`,
    name,
    industry: "real-estate",
    category,
    version: "1.0.0",
    status: "placeholder",
    description,
    supportedFeatures: features,
    pages: ["home", "about", "properties", "contact"],
    components: ["hero", "property-grid", "team", "contact-form", "footer"],
    rootPath,
    importPath: buildImportPath("real-estate", templateId),
  };
}

/**
 * Central registry of all Aatmanx templates.
 * Populated from template.json manifests in each template folder.
 */
export const TEMPLATE_REGISTRY: TemplateManifest[] = [
  manifest(
    "agency-v1",
    "Real Estate Agency",
    "agency",
    "Brokerage and agency websites with property listings, team showcase, and lead capture.",
    ["property listings", "team profiles", "contact forms", "site visit booking", "testimonials"],
  ),
  manifest(
    "developer-v1",
    "Property Developer",
    "developer",
    "Developer and builder sites highlighting projects, timelines, and investment opportunities.",
    ["project showcase", "timeline", "floor plans", "lead capture", "investor CTA"],
  ),
  manifest(
    "luxury-v1",
    "Luxury Real Estate",
    "luxury",
    "High-end property marketing with editorial layouts and premium visual storytelling.",
    ["luxury listings", "editorial hero", "private showings", "concierge contact", "video backgrounds"],
  ),
  manifest(
    "commercial-v1",
    "Commercial Real Estate",
    "commercial",
    "Commercial property platforms for offices, retail, and industrial assets.",
    ["commercial listings", "space calculator", "tenant inquiry", "location maps", "brochure downloads"],
  ),
  manifest(
    "management-v1",
    "Property Management",
    "management",
    "Property management company sites with service pages and tenant portals.",
    ["service pages", "tenant portal link", "maintenance requests", "owner login", "FAQ"],
  ),
];

export function getTemplateById(id: string): TemplateManifest | undefined {
  return TEMPLATE_REGISTRY.find((t) => t.id === id || t.id.endsWith(`/${id}`));
}

export function getTemplatesByCategory(category: TemplateCategory): TemplateManifest[] {
  return TEMPLATE_REGISTRY.filter((t) => t.category === category);
}

export function getTemplatesByIndustry(industry: string): TemplateManifest[] {
  return TEMPLATE_REGISTRY.filter((t) => t.industry === industry);
}

export function resolveTemplateForCategory(category: TemplateCategory): TemplateManifest {
  const match = TEMPLATE_REGISTRY.find((t) => t.category === category);
  return match ?? TEMPLATE_REGISTRY[0];
}
