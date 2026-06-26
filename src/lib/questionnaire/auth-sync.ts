import { supabase } from "@/integrations/supabase/client";
import type { QuestionnaireAnswers, QuestionnaireState } from "./types";
import { clearState, createInitialState, loadState } from "./storage";
import {
  completeQuestionnaire,
  getLatestCompletedQuestionnaire,
  getLatestQuestionnaireForUser,
  hasUserCompletedQuestionnaire,
} from "./persistence";
import { runWebsiteGenerationPipeline } from "@/services/ai/pipeline";
import type { RealEstateWebsiteProfile } from "./types";

export type PersistResult = {
  businessId: string;
  questionnaireId: string;
  websiteId: string;
};

/**
 * For authenticated users: merge anonymous draft into DB, then discard local storage.
 * Returns null when there is nothing to merge or DB already has completed data.
 */
export async function syncAuthenticatedDraft(userId: string): Promise<PersistResult | null> {
  const localDraft = loadState();

  const alreadyComplete = await hasUserCompletedQuestionnaire(userId);
  if (alreadyComplete) {
    if (localDraft) clearState();
    return null;
  }

  if (!localDraft?.answers.business_type) {
    return null;
  }

  const completedState: QuestionnaireState = {
    ...localDraft,
    status: "completed",
  };

  const result = await completeQuestionnaire(completedState, userId);
  clearState();

  void runWebsiteGenerationPipeline({
    questionnaireId: result.questionnaireId,
    websiteId: result.websiteId,
    profile: result.generatedJson as RealEstateWebsiteProfile,
  }).catch(() => {
    /* pipeline runs in background — dashboard reflects status via polling */
  });

  return {
    businessId: result.businessId,
    questionnaireId: result.questionnaireId,
    websiteId: result.websiteId,
  };
}

/**
 * Load questionnaire state from Supabase for authenticated users.
 * Database is the single source of truth when logged in.
 */
export async function loadQuestionnaireFromDatabase(
  userId: string,
): Promise<QuestionnaireState | null> {
  const row = await getLatestQuestionnaireForUser(userId);
  if (!row) return null;

  return {
    version: 2,
    sessionId: row.session_id,
    industry: row.industry ?? "real-estate",
    stepIndex: row.current_step_index ?? 0,
    answers: (row.answers_json ?? {}) as QuestionnaireAnswers,
    status: row.status as QuestionnaireState["status"],
    templateCategory: row.template_category ?? undefined,
    questionnaireId: row.id,
    updatedAt: row.updated_at ?? new Date().toISOString(),
  };
}

/**
 * Ensures authenticated session never reads stale localStorage for dashboard data.
 */
export async function prepareAuthenticatedSession(userId: string): Promise<void> {
  await syncAuthenticatedDraft(userId);

  const dbCompleted = await getLatestCompletedQuestionnaire(userId);
  if (dbCompleted && loadState()) {
    clearState();
  }
}

export async function resolveQuestionnaireInit(userId: string | null): Promise<{
  state: QuestionnaireState;
  redirectTo: "/questionnaire/complete" | "/dashboard" | null;
}> {
  if (!userId) {
    const local = loadState();
    if (local?.status === "completed") {
      return { state: local, redirectTo: "/questionnaire/complete" };
    }
    return { state: local ?? createInitialState(), redirectTo: null };
  }

  await syncAuthenticatedDraft(userId);

  const dbState = await loadQuestionnaireFromDatabase(userId);
  if (dbState?.status === "completed") {
    clearState();
    return { state: dbState, redirectTo: "/dashboard" };
  }

  if (dbState) {
    clearState();
    return { state: dbState, redirectTo: null };
  }

  clearState();
  return { state: createInitialState(), redirectTo: null };
}

export async function persistOnboardingToDatabase(userId: string): Promise<PersistResult | null> {
  return syncAuthenticatedDraft(userId);
}
