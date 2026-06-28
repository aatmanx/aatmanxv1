import { getOpenAiApiKey, getOpenAiModel } from "@/lib/env";
import type { AiServiceConfig } from "./types";

export function getAiConfig(): AiServiceConfig {
  const apiKey = getOpenAiApiKey();

  if (apiKey) {
    return {
      provider: "openai",
      apiKey,
      model: getOpenAiModel(),
    };
  }

  return { provider: "mock" };
}

export function isAiConfigured(): boolean {
  return Boolean(getAiConfig().apiKey);
}
