import type { TemplateManifest } from "./templateMetadata";
import { getTemplateById } from "./templateRegistry";

export type TemplateLoadResult = {
  manifest: TemplateManifest;
  /** Future: parsed pages, components, and assets from the converted template */
  pages: Record<string, unknown>;
  components: Record<string, unknown>;
  assets: Record<string, string>;
  sampleData: Record<string, unknown> | null;
  /** Whether Lovable code has been pasted into IMPORT_HERE */
  hasImportedCode: boolean;
  /** Whether Cursor conversion has produced reusable template artifacts */
  isConverted: boolean;
};

/**
 * Loads a template from the filesystem registry.
 * Placeholder — will read template.json, pages/, components/, and assets/ at runtime or build time.
 */
export async function loadTemplate(templateId: string): Promise<TemplateLoadResult | null> {
  const manifest = getTemplateById(templateId);
  if (!manifest) return null;

  return {
    manifest,
    pages: {},
    components: {},
    assets: {},
    sampleData: null,
    hasImportedCode: false,
    isConverted: manifest.status === "converted" || manifest.status === "production",
  };
}

/**
 * Future: load template manifest directly from template.json on disk.
 */
export async function loadTemplateManifestFromPath(rootPath: string): Promise<TemplateManifest | null> {
  void rootPath;
  return null;
}

/**
 * Future: hydrate template with questionnaire profile + AI-generated content.
 */
export async function hydrateTemplate(
  templateId: string,
  profile: Record<string, unknown>,
  generatedContent: Record<string, unknown>,
): Promise<TemplateLoadResult | null> {
  const loaded = await loadTemplate(templateId);
  if (!loaded) return null;

  void profile;
  void generatedContent;

  return loaded;
}
