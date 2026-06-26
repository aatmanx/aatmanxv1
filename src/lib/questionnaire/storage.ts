import type { QuestionnaireState } from "./types";
import { getDefaultAnswers } from "./json-generator";
import { getVisibleQuestions } from "./questions/real-estate-questions";
import { clampStepIndex } from "./validation";

const STORAGE_KEY = "aatman.questionnaire.v2";
const LEAVE_GUARD_KEY = "aatman.questionnaire.dirty";

export function createInitialState(): QuestionnaireState {
  return {
    version: 2,
    sessionId: crypto.randomUUID(),
    industry: "real-estate",
    stepIndex: 0,
    answers: getDefaultAnswers(),
    status: "draft",
    updatedAt: new Date().toISOString(),
  };
}

export function normalizeLoadedState(state: QuestionnaireState): QuestionnaireState {
  const answers = { ...getDefaultAnswers(), ...state.answers };
  const stepIndex = clampStepIndex(state.stepIndex, answers, getVisibleQuestions);
  return { ...state, answers, stepIndex };
}

export function loadState(): QuestionnaireState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuestionnaireState;
    if (parsed.version !== 2) return null;
    return normalizeLoadedState(parsed);
  } catch {
    return null;
  }
}

export function saveState(state: QuestionnaireState): void {
  if (typeof window === "undefined") return;
  const next = { ...state, updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  localStorage.setItem(LEAVE_GUARD_KEY, "1");
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEAVE_GUARD_KEY);
}

export function hasUnsavedProgress(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(LEAVE_GUARD_KEY) === "1";
}

export function setupLeaveGuard(enabled: boolean): () => void {
  if (typeof window === "undefined") return () => undefined;

  const handler = (e: BeforeUnloadEvent) => {
    if (!enabled || !hasUnsavedProgress()) return;
    e.preventDefault();
    e.returnValue = "";
  };

  window.addEventListener("beforeunload", handler);
  return () => window.removeEventListener("beforeunload", handler);
}

export function deriveStatus(stepIndex: number, totalSteps: number, isComplete: boolean): QuestionnaireState["status"] {
  if (isComplete) return "completed";
  if (stepIndex > 0) return "in_progress";
  return "draft";
}
