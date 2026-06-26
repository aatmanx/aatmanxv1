import { supabase } from "@/integrations/supabase/client";
import {
  persistOnboardingToDatabase,
  syncAuthenticatedDraft,
  type PersistResult,
} from "@/lib/questionnaire/auth-sync";

export type { PersistResult };

export { persistOnboardingToDatabase, syncAuthenticatedDraft };

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

/** @deprecated Use syncAuthenticatedDraft — kept for backward compatibility */
export async function getPendingOnboardingForUser(userId: string) {
  return syncAuthenticatedDraft(userId);
}
