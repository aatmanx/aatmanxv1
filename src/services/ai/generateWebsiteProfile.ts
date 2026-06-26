import type {
  WebsiteProfileGenerationInput,
  WebsiteProfileGenerationResult,
  AiGenerationStatus,
  AiGenerationTask,
} from "./types";

/**
 * Generates a complete website profile blueprint from questionnaire data.
 * Placeholder — wire to OpenAI when API keys are configured.
 */
export async function generateWebsiteProfile(
  input: WebsiteProfileGenerationInput,
): Promise<WebsiteProfileGenerationResult> {
  const status = buildPendingStatus(input.tasks);

  return {
    profile: input.profile,
    generatedContent: {},
    status,
  };
}

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

export async function markProfileProcessing(questionnaireId: string): Promise<void> {
  // Future: update questionnaires.status = 'processing' via Supabase
  void questionnaireId;
}

export async function markProfileGenerated(questionnaireId: string): Promise<void> {
  // Future: update questionnaires.status = 'generated' via Supabase
  void questionnaireId;
}
