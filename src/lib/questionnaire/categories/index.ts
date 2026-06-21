import type { QuestionnaireConfig } from "./types";
import { realEstateQuestionnaire } from "./real-estate";
import { placeholderQuestionnaire } from "./placeholder";

const registry: Record<string, QuestionnaireConfig> = {
  "real-estate": realEstateQuestionnaire,
  placeholder: placeholderQuestionnaire,
};

export function getQuestionnaireForCategory(categoryId: string): QuestionnaireConfig {
  if (categoryId === "real-estate") return realEstateQuestionnaire;
  return placeholderQuestionnaire;
}

export function getTotalSteps(config: QuestionnaireConfig): number {
  return 2 + config.questions.length;
}

export function getProgressPercent(
  phase: "category" | "business-info" | "category-questions",
  stepIndex: number,
  totalCategoryQuestions: number,
): number {
  const total = 2 + totalCategoryQuestions;
  let completed = 0;
  if (phase === "category") completed = 0;
  else if (phase === "business-info") completed = 1;
  else completed = 2 + stepIndex;
  return Math.round((completed / total) * 100);
}

export { registry };
