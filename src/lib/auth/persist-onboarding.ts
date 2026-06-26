import { supabase } from "@/integrations/supabase/client";
import { clearState, loadState } from "../questionnaire/storage";
import { completeQuestionnaire } from "../questionnaire/persistence";

export type PersistResult = {
  businessId: string;
  questionnaireId: string;
  websiteId: string;
};

export async function persistOnboardingToDatabase(userId: string): Promise<PersistResult | null> {
  const state = loadState();
  if (!state?.answers.business_type) return null;

  const completedState = { ...state, status: "completed" as const };
  const result = await completeQuestionnaire(completedState, userId);
  clearState();

  return {
    businessId: result.businessId,
    questionnaireId: result.questionnaireId,
    websiteId: result.websiteId,
  };
}

export async function triggerWebsiteGeneration(websiteId: string): Promise<void> {
  await supabase.from("websites").update({ status: "generating" }).eq("id", websiteId);
}

export async function getUserWebsites(userId: string) {
  const { data, error } = await supabase
    .from("websites")
    .select("*, businesses(category, business_name), questionnaires(status, template_category, progress_percent)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getPendingOnboardingForUser(userId: string) {
  const state = loadState();
  if (state?.answers.business_type) {
    return persistOnboardingToDatabase(userId);
  }
  return null;
}
