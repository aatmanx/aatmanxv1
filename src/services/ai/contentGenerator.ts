import { getOpenAiClient, withRetry } from "./client";
import { getAiConfig, isAiConfigured } from "./config";
import { buildSystemPrompt, buildTaskPrompt } from "./prompts";
import { aiLog } from "./logger";
import type { ContentGenerationInput, ContentGenerationResult } from "./types";

function parseJsonResponse(raw: string): unknown {
  const trimmed = raw.trim();
  const jsonMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const content = jsonMatch ? jsonMatch[1].trim() : trimmed;
  return JSON.parse(content);
}

async function callOpenAi(prompt: string): Promise<unknown> {
  const client = getOpenAiClient();
  const config = getAiConfig();
  if (!client) throw new Error("OpenAI client not configured");

  const response = await withRetry(() =>
    client.chat.completions.create({
      model: config.model ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    }),
  );

  const text = response.choices[0]?.message?.content;
  if (!text) throw new Error("Empty response from OpenAI");
  return parseJsonResponse(text);
}

export async function generateContent(input: ContentGenerationInput): Promise<ContentGenerationResult> {
  if (!isAiConfigured()) {
    return {
      task: input.task,
      content: null,
      status: "failed",
      error: "AI provider not configured. Set OPENAI_API_KEY in .env to enable content generation.",
    };
  }

  try {
    aiLog.info(`Generating content for task: ${input.task}`);
    const prompt = buildTaskPrompt(input.task, input.profile, input.context);
    const content = await callOpenAi(prompt);

    return { task: input.task, content, status: "completed" };
  } catch (error) {
    aiLog.error(`Content generation failed for ${input.task}`, {
      error: error instanceof Error ? error.message : String(error),
    });
    return {
      task: input.task,
      content: null,
      status: "failed",
      error: error instanceof Error ? error.message : "Content generation failed",
    };
  }
}

export async function generateAllContent(
  inputs: ContentGenerationInput[],
): Promise<ContentGenerationResult[]> {
  return Promise.all(inputs.map(generateContent));
}
