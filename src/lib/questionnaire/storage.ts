import type { OnboardingState } from "./types";
import { EMPTY_BUSINESS_PROFILE } from "./types";

const STORAGE_KEY = "aatman.onboarding.v1";
const LEAVE_GUARD_KEY = "aatman.onboarding.dirty";

export function getSessionId(): string {
  const existing = loadState()?.sessionId;
  if (existing) return existing;
  return crypto.randomUUID();
}

export function createInitialState(): OnboardingState {
  return {
    version: 1,
    sessionId: crypto.randomUUID(),
    phase: "category",
    stepIndex: 0,
    featureTimelineStep: 0,
    businessProfile: { ...EMPTY_BUSINESS_PROFILE },
    questionnaireAnswers: {},
    updatedAt: new Date().toISOString(),
  };
}

export function loadState(): OnboardingState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OnboardingState;
    if (parsed.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveState(state: OnboardingState): void {
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

export function markDirty(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LEAVE_GUARD_KEY, "1");
  }
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

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  return /^[\d\s\-()+ ]{6,}$/.test(phone.trim());
}

export function validateBusinessProfile(profile: Partial<import("./types").BusinessProfile>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!profile.business_name?.trim()) errors.business_name = "Business name is required";
  if (!profile.description?.trim()) errors.description = "Description is required";
  else if (profile.description.length > 500) errors.description = "Description must be 500 characters or less";
  if (!profile.email?.trim()) errors.email = "Email is required";
  else if (!isValidEmail(profile.email)) errors.email = "Enter a valid email address";
  if (!profile.phone?.trim()) errors.phone = "Phone number is required";
  else if (!isValidPhone(profile.phone)) errors.phone = "Enter a valid phone number";
  if (!profile.address?.trim()) errors.address = "Address is required";
  return errors;
}
