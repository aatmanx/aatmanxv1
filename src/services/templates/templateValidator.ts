import {
  REQUIRED_TEMPLATE_DIRS,
  REQUIRED_TEMPLATE_FILES,
  type TemplateManifest,
  type TemplateValidationResult,
} from "./templateMetadata";

/**
 * Validates a template manifest and folder structure.
 * Placeholder — future version will scan the filesystem under templates/.
 */
export function validateTemplateManifest(manifest: TemplateManifest): TemplateValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!manifest.id) errors.push("Template id is required");
  if (!manifest.name) errors.push("Template name is required");
  if (!manifest.industry) errors.push("Template industry is required");
  if (!manifest.category) errors.push("Template category is required");
  if (!manifest.rootPath) errors.push("Template rootPath is required");
  if (!manifest.importPath) errors.push("Template importPath is required");

  if (manifest.pages.length === 0) warnings.push("No pages defined in manifest");
  if (manifest.components.length === 0) warnings.push("No components defined in manifest");
  if (manifest.status === "placeholder") warnings.push("Template is still a placeholder");

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validates expected files and directories for a template folder.
 * Used after Lovable paste and after Cursor conversion.
 */
export function validateTemplateFolderStructure(
  presentFiles: string[],
  presentDirs: string[],
): TemplateValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const file of REQUIRED_TEMPLATE_FILES) {
    if (!presentFiles.includes(file)) {
      errors.push(`Missing required file: ${file}`);
    }
  }

  for (const dir of REQUIRED_TEMPLATE_DIRS) {
    if (!presentDirs.includes(dir)) {
      errors.push(`Missing required directory: ${dir}/`);
    }
  }

  const hasImportContent = presentFiles.some((f) => f.startsWith("IMPORT_HERE/") && f !== "IMPORT_HERE/.gitkeep");
  if (!hasImportContent) {
    warnings.push("IMPORT_HERE/ has no pasted Lovable code yet");
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function assertValidTemplate(manifest: TemplateManifest): void {
  const result = validateTemplateManifest(manifest);
  if (!result.valid) {
    throw new Error(`Invalid template manifest: ${result.errors.join(", ")}`);
  }
}
