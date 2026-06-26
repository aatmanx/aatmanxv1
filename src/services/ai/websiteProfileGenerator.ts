import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import type { RealEstateWebsiteProfile } from "@/lib/questionnaire/types";
import { generateAllContent } from "./contentGenerator";
import { buildWebsiteProfilePrompt } from "./prompts";
import { getOpenAiClient, withRetry } from "./client";
import { getAiConfig, isAiConfigured } from "./config";
import { aiLog } from "./logger";
import { selectTemplate } from "./selectTemplate";
import type {
  AiGenerationStatus,
  AiGenerationTask,
  WebsiteProfileGenerationInput,
  WebsiteProfileGenerationResult,
} from "./types";

function buildPendingStatus(tasks: AiGenerationTask[]): AiGenerationStatus {
  const allTasks: AiGenerationTask[] = [
    "homepage_content",
    "about_page",
    "property_descriptions",
    "seo_metadata",
    "faqs",
    "blog_content",
  ];

  const status = {} as AiGenerationStatus;
  for (const task of allTasks) {
    status[task] = tasks.includes(task) ? "pending" : "skipped";
  }
  return status;
}

export async function generateWebsiteProfile(
  input: WebsiteProfileGenerationInput,
): Promise<WebsiteProfileGenerationResult> {
  if (!isAiConfigured()) {
    return {
      profile: input.profile,
      generatedContent: {},
      status: buildPendingStatus(input.tasks),
    };
  }

  const generatedContent: Partial<Record<AiGenerationTask, unknown>> = {};
  const status = buildPendingStatus(input.tasks);

  for (const task of input.tasks) {
    status[task] = "processing";
    const results = await generateAllContent([{ task, profile: input.profile }]);
    const result = results[0];

    if (result.status === "completed") {
      generatedContent[task] = result.content;
      status[task] = "completed";
    } else {
      status[task] = "failed";
      aiLog.error(`Task ${task} failed`, { error: result.error });
    }
  }

  let profile = input.profile;

  try {
    const client = getOpenAiClient();
    const config = getAiConfig();
    if (client) {
      const response = await withRetry(() =>
        client.chat.completions.create({
          model: config.model ?? "gpt-4o-mini",
          messages: [
            { role: "system", content: "Return valid JSON only." },
            { role: "user", content: buildWebsiteProfilePrompt(input.profile) },
          ],
          response_format: { type: "json_object" },
        }),
      );
      const text = response.choices[0]?.message?.content;
      if (text) {
        const enhancements = JSON.parse(text) as Partial<RealEstateWebsiteProfile>;
        profile = { ...profile, ...enhancements };
      }
    }
  } catch (error) {
    aiLog.warn("Profile enhancement skipped", {
      error: error instanceof Error ? error.message : String(error),
    });
  }

  return { profile, generatedContent, status };
}

export async function markProfileProcessing(questionnaireId: string): Promise<void> {
  await supabase
    .from("questionnaires")
    .update({ status: "processing", updated_at: new Date().toISOString() })
    .eq("id", questionnaireId);
}

export async function markProfileGenerated(
  questionnaireId: string,
  aiStatus: AiGenerationStatus,
  generatedContent: Record<string, unknown>,
): Promise<void> {
  await supabase
    .from("questionnaires")
    .update({
      status: "generated",
      ai_generation_status: aiStatus as unknown as Json,
      generated_json: generatedContent as unknown as Json,
      updated_at: new Date().toISOString(),
    })
    .eq("id", questionnaireId);
}

export { selectTemplate, getTemplateCategoryFromBusinessType } from "./selectTemplate";
