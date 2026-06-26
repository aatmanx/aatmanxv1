import { supabase } from "@/integrations/supabase/client";
import { getLatestCompletedQuestionnaire } from "@/lib/questionnaire/persistence";

export type DashboardData = {
  questionnaire: Awaited<ReturnType<typeof getLatestCompletedQuestionnaire>>;
  website: Awaited<ReturnType<typeof getPrimaryWebsite>> | null;
  business: { business_name?: string; category?: string; description?: string; address?: string } | null;
};

export async function getPrimaryWebsite(userId: string) {
  const { data, error } = await supabase
    .from("websites")
    .select("*, businesses(business_name, category, description, address)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const questionnaire = await getLatestCompletedQuestionnaire(userId);
  const website = await getPrimaryWebsite(userId);
  const business = website?.businesses as DashboardData["business"];

  return { questionnaire, website, business };
}
