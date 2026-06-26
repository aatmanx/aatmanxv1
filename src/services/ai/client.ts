import OpenAI from "openai";
import { getAiConfig } from "./config";
import { aiLog } from "./logger";

let client: OpenAI | null = null;

export function getOpenAiClient(): OpenAI | null {
  const config = getAiConfig();
  if (config.provider !== "openai" || !config.apiKey) {
    return null;
  }

  if (!client) {
    client = new OpenAI({ apiKey: config.apiKey });
    aiLog.info("OpenAI client initialized");
  }

  return client;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  delayMs = 1000,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      aiLog.warn(`Attempt ${attempt}/${maxAttempts} failed`, { error });
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, delayMs * attempt));
      }
    }
  }

  throw lastError;
}
