import type { AiServiceConfig } from "./types";

function readEnv(key: string): string | undefined {
  if (typeof process !== "undefined" && process.env?.[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== "undefined" && import.meta.env?.[key]) {
    return import.meta.env[key] as string;
  }
  return undefined;
}

export function getAiConfig(): AiServiceConfig {
  const apiKey = readEnv("OPENAI_API_KEY");

  if (apiKey) {
    return {
      provider: "openai",
      apiKey,
      model: readEnv("OPENAI_MODEL") ?? "gpt-4o-mini",
    };
  }

  return { provider: "mock" };
}

export function isAiConfigured(): boolean {
  return Boolean(getAiConfig().apiKey);
}
