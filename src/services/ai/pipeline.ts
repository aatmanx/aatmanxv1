import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import type { RealEstateWebsiteProfile } from "@/lib/questionnaire/types";
import { hydrateTemplate, loadTemplate } from "@/services/templates/templateLoader";
import { aiLog } from "./logger";
import { generateWebsiteProfile, markProfileGenerated, markProfileProcessing } from "./websiteProfileGenerator";
import { selectTemplate } from "./selectTemplate";
import type { AiGenerationTask } from "./types";

export type PipelineInput = {
  questionnaireId: string;
  websiteId: string;
  profile: RealEstateWebsiteProfile;
  tasks?: AiGenerationTask[];
};

export type PipelineResult = {
  success: boolean;
  templateId?: string;
  error?: string;
};

const DEFAULT_TASKS: AiGenerationTask[] = [
  "homepage_content",
  "about_page",
  "property_descriptions",
  "seo_metadata",
  "faqs",
];

export async function runWebsiteGenerationPipeline(input: PipelineInput): Promise<PipelineResult> {
  const tasks = input.tasks ?? DEFAULT_TASKS;

  try {
    aiLog.info("Starting website generation pipeline", { questionnaireId: input.questionnaireId });

    await markProfileProcessing(input.questionnaireId);
    await supabase.from("websites").update({ status: "generating" }).eq("id", input.websiteId);

    const aiResult = await generateWebsiteProfile({ profile: input.profile, tasks });
    await markProfileGenerated(input.questionnaireId, aiResult.status, {
      ...(input.profile as unknown as Record<string, unknown>),
      aiContent: aiResult.generatedContent,
    });

    const templateSelection = await selectTemplate({
      templateCategory: input.profile.template_category,
      websiteStyle: input.profile.branding?.websiteStyle ?? "",
      colorStyle: input.profile.branding?.colorStyle ?? "",
      websiteGoal: input.profile.websiteGoal ?? "",
    });

    await supabase
      .from("questionnaires")
      .update({
        template_selection: {
          templateId: templateSelection.templateId,
          category: templateSelection.templateCategory,
          confidence: templateSelection.confidence,
          rationale: templateSelection.rationale,
        } as unknown as Json,
      })
      .eq("id", input.questionnaireId);

    const hydrated = await hydrateTemplate(
      templateSelection.templateId,
      input.profile as unknown as Record<string, unknown>,
      aiResult.generatedContent as Record<string, unknown>,
    );

    if (hydrated) {
      await supabase
        .from("websites")
        .update({
          status: "ready",
          website_json: {
            profile: input.profile,
            aiContent: aiResult.generatedContent,
            template: hydrated.manifest,
          } as unknown as Json,
        })
        .eq("id", input.websiteId);
    } else {
      await supabase.from("websites").update({ status: "draft" }).eq("id", input.websiteId);
    }

    aiLog.info("Pipeline complete", { templateId: templateSelection.templateId });
    return { success: true, templateId: templateSelection.templateId };
  } catch (error) {
    aiLog.error("Pipeline failed", { error: error instanceof Error ? error.message : String(error) });
    await supabase.from("websites").update({ status: "draft" }).eq("id", input.websiteId);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Pipeline failed",
    };
  }
}

export async function triggerPipelineForWebsite(
  userId: string,
  websiteId: string,
): Promise<PipelineResult> {
  const { data: website, error } = await supabase
    .from("websites")
    .select("*, questionnaires(id, generated_json)")
    .eq("id", websiteId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !website) {
    return { success: false, error: "Website not found" };
  }

  const profile = (website.website_json as { profile?: RealEstateWebsiteProfile })?.profile;
  const questionnaireId = website.questionnaire_id;

  if (!profile || !questionnaireId) {
    return { success: false, error: "Missing profile or questionnaire" };
  }

  return runWebsiteGenerationPipeline({ questionnaireId, websiteId, profile });
}

export { loadTemplate };
