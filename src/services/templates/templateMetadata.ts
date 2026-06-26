/**
 * Template metadata types for the Aatmanx template system.
 * Templates live in /templates/{industry}/{template-id}/ at the project root.
 */

export type TemplateCategory = "agency" | "developer" | "luxury" | "commercial" | "management";

export type TemplateStatus = "placeholder" | "import_pending" | "converted" | "production";

export type TemplateManifest = {
  id: string;
  name: string;
  industry: string;
  category: TemplateCategory;
  version: string;
  status: TemplateStatus;
  description: string;
  supportedFeatures: string[];
  pages: string[];
  components: string[];
  /** Relative path from project root, e.g. templates/real-estate/agency-v1 */
  rootPath: string;
  /** Where Lovable exports should be pasted before conversion */
  importPath: string;
};

export type TemplateValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export const REQUIRED_TEMPLATE_FILES = [
  "README.md",
  "IMPORT_HERE.md",
  "template.json",
  "sample-data.json",
] as const;

export const REQUIRED_TEMPLATE_DIRS = ["components", "pages", "assets"] as const;

export const TEMPLATE_ROOT = "templates";

export function buildTemplatePath(industry: string, templateId: string): string {
  return `${TEMPLATE_ROOT}/${industry}/${templateId}`;
}

export function buildImportPath(industry: string, templateId: string): string {
  return `${TEMPLATE_ROOT}/${industry}/${templateId}/IMPORT_HERE`;
}
