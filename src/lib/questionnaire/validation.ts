import type { QuestionConfig, QuestionnaireAnswers, TeamMember } from "./types";

export function getEffectiveAnswer(question: QuestionConfig, answers: QuestionnaireAnswers): unknown {
  if (answers[question.key] !== undefined && answers[question.key] !== null) {
    return answers[question.key];
  }
  return question.defaultValue;
}

export function isQuestionAnswered(question: QuestionConfig, answers: QuestionnaireAnswers): boolean {
  if (question.required === false) return true;

  const val = getEffectiveAnswer(question, answers);

  switch (question.type) {
    case "text":
    case "textarea":
      return typeof val === "string" && val.trim().length > 0;

    case "single-select":
      return typeof val === "string" && val.length > 0;

    case "multi-select":
      return Array.isArray(val) && val.length > 0;

    case "file-upload": {
      if (!val || typeof val !== "object") return false;
      const files = val as Record<string, unknown[]>;
      return Object.values(files).some((arr) => Array.isArray(arr) && arr.length > 0);
    }

    case "repeatable": {
      const members = val as TeamMember[] | undefined;
      if (!members || members.length === 0) return false;
      const requiredFields = question.repeatableFields?.filter((f) => f.required && f.type === "text") ?? [];
      return members.every((member) =>
        requiredFields.every((field) => {
          const fieldVal = member[field.key as keyof TeamMember];
          return typeof fieldVal === "string" && fieldVal.trim().length > 0;
        }),
      );
    }

    default:
      return val != null;
  }
}

export function clampStepIndex(stepIndex: number, answers: QuestionnaireAnswers, getVisible: (a: QuestionnaireAnswers) => QuestionConfig[]): number {
  const visible = getVisible(answers);
  return Math.min(Math.max(0, stepIndex), Math.max(0, visible.length - 1));
}

export function getValidationError(question: QuestionConfig, answers: QuestionnaireAnswers): string | null {
  if (isQuestionAnswered(question, answers)) return null;

  switch (question.type) {
    case "text":
    case "textarea":
      return "This field is required.";
    case "single-select":
      return "Please select an option.";
    case "multi-select":
      return "Please select at least one option.";
    case "file-upload":
      return "Please upload at least one file.";
    case "repeatable":
      return "Please add at least one entry with required fields filled.";
    default:
      return "This question requires an answer.";
  }
}
