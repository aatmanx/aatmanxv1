import type { ContentGenerationInput, ContentGenerationResult } from "./types";

/**
 * Generates individual content blocks (homepage, about, SEO, etc.).
 * Placeholder — connect to OpenAI completion API in production.
 */
export async function generateContent(input: ContentGenerationInput): Promise<ContentGenerationResult> {
  return {
    task: input.task,
    content: null,
    status: "failed",
    error: "AI provider not configured. Set OPENAI_API_KEY to enable content generation.",
  };
}

export async function generateAllContent(
  inputs: ContentGenerationInput[],
): Promise<ContentGenerationResult[]> {
  return Promise.all(inputs.map(generateContent));
}
