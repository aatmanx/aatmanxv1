import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { clearState, loadState } from "../questionnaire/storage";
import type { BusinessProfile, FileAsset, OnboardingState } from "../questionnaire/types";
import { uploadPendingFiles } from "../questionnaire/file-store";

export type PersistResult = {
  businessId: string;
  submissionId: string;
  websiteId: string;
};

function buildBusinessProfile(state: OnboardingState): BusinessProfile {
  const p = state.businessProfile;
  return {
    category: p.category ?? "",
    business_name: p.business_name ?? "",
    tagline: p.tagline ?? "",
    description: p.description ?? "",
    email: p.email ?? "",
    phone: p.phone ?? "",
    phone_country_code: p.phone_country_code ?? "+91",
    address: p.address ?? "",
    domain_preference: p.domain_preference ?? "",
    social_links: p.social_links ?? [],
  };
}

export async function persistOnboardingToDatabase(userId: string): Promise<PersistResult | null> {
  const state = loadState();
  if (!state?.businessProfile.category) return null;

  const profile = buildBusinessProfile(state);
  const answersWithFiles = await uploadPendingFiles(userId, state.questionnaireAnswers);

  const { data: business, error: bizError } = await supabase
    .from("businesses")
    .insert({
      user_id: userId,
      category: profile.category,
      business_name: profile.business_name,
      tagline: profile.tagline || null,
      description: profile.description,
      email: profile.email,
      phone: `${profile.phone_country_code} ${profile.phone}`.trim(),
      address: profile.address,
      domain_preference: profile.domain_preference || null,
      social_links: profile.social_links as unknown as Json,
    })
    .select("id")
    .single();

  if (bizError || !business) throw new Error(bizError?.message ?? "Failed to save business");

  const aiAnalysis = buildAiAnalysisPayload(profile, answersWithFiles);

  const { data: submission, error: subError } = await supabase
    .from("questionnaire_submissions")
    .upsert(
      {
        user_id: userId,
        business_id: business.id,
        session_id: state.sessionId,
        category: profile.category,
        business_profile: profile as unknown as Json,
        answers_json: answersWithFiles as unknown as Json,
        status: "saved",
        ai_analysis: aiAnalysis as unknown as Json,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "session_id" },
    )
    .select("id")
    .single();

  if (subError || !submission) throw new Error(subError?.message ?? "Failed to save questionnaire");

  const slug = profile.domain_preference?.trim() || profile.business_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);

  const { data: website, error: webError } = await supabase
    .from("websites")
    .insert({
      user_id: userId,
      business_id: business.id,
      submission_id: submission.id,
      slug,
      website_json: { blueprint: aiAnalysis } as unknown as Json,
      status: "generating",
    })
    .select("id")
    .single();

  if (webError || !website) throw new Error(webError?.message ?? "Failed to create website");

  clearState();
  return { businessId: business.id, submissionId: submission.id, websiteId: website.id };
}

function buildAiAnalysisPayload(profile: BusinessProfile, answers: Record<string, unknown>) {
  return {
    business_profile: profile,
    category: profile.category,
    questionnaire_answers: answers,
    website_blueprint: {
      structure: answers.website_sections ?? answers.website_features,
      content_strategy: {
        objective: (answers.objective_and_strengths as { primary_objective?: string })?.primary_objective,
        strengths: (answers.objective_and_strengths as { key_strengths?: { selected: string[]; custom: string[] } })?.key_strengths,
        emphasis: answers.business_emphasis,
      },
      design_strategy: answers.design_preferences,
      generation_instructions: {
        features: answers.website_features,
        assets: answers.business_assets,
        offerings: answers.offerings ?? answers.business_type,
      },
    },
    generated_at: new Date().toISOString(),
  };
}

export async function triggerWebsiteGeneration(websiteId: string): Promise<void> {
  await supabase.from("websites").update({ status: "generating" }).eq("id", websiteId);
}

export async function getUserWebsites(userId: string) {
  const { data, error } = await supabase
    .from("websites")
    .select("*, businesses(category, business_name), questionnaire_submissions(category, status)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getPendingOnboardingForUser(userId: string) {
  const state = loadState();
  if (state?.businessProfile.category) {
    return persistOnboardingToDatabase(userId);
  }
  return null;
}
