import type { BirthPlan, Locale, ScenarioResult, ScenarioState, UserMode, VisitStatus } from "@/types/content";

export const STORAGE_KEYS = {
  mode: "care-home:mode",
  locale: "care-home:locale",
  scenario: "care-home:scenario-amina",
  result: "care-home:latest-result",
  birthPlan: "care-home:birth-plan",
  guidedVisit: "care-home:guided-visit",
} as const;

export function readJson<T>(key: string, validate: (value: unknown) => value is T): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return validate(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeJson(key: string, value: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStoredValue(key: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export const isUserMode = (value: unknown): value is UserMode => value === "family" || value === "chp";
export const isLocale = (value: unknown): value is Locale => value === "en" || value === "sw";

export function isScenarioState(value: unknown): value is ScenarioState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<ScenarioState>;
  return [
    state.facilityPlanConfirmed,
    state.primaryTransportConfirmed,
    state.backupTransportConfirmed,
    state.supportPersonConfirmed,
    state.contactPlanConfirmed,
  ].every((item) => typeof item === "boolean") &&
    Array.isArray(state.preparationItemsSelected) &&
    [state.familyAgreementLevel, state.timelyActionScore, state.communicationScore, state.preparednessScore].every(
      (item) => typeof item === "number" && Number.isFinite(item),
    );
}

export function isBirthPlan(value: unknown): value is BirthPlan {
  if (!value || typeof value !== "object") return false;
  const plan = value as Partial<BirthPlan>;
  return [
    plan.nickname,
    plan.placeOfCare,
    plan.mainTransport,
    plan.backupTransport,
    plan.transportContact,
    plan.supportPerson,
    plan.importantContact,
    plan.remainingActions,
    plan.updatedAt,
  ].every((item) => typeof item === "string") && Array.isArray(plan.items) && plan.items.every((item) => typeof item === "string");
}

export function isScenarioResult(value: unknown): value is ScenarioResult {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<ScenarioResult>;
  const allowedOutcomes = ["Strong preparation", "Partially prepared", "Important gaps remain"];
  const allowedLevels = ["Strong", "Developing", "Needs attention"];
  const dimensions = result.dimensions;
  return allowedOutcomes.includes(result.outcome ?? "") &&
    Boolean(dimensions) &&
    [dimensions?.Preparedness, dimensions?.Communication, dimensions?.["Shared planning"], dimensions?.["Timely action"]].every((item) => allowedLevels.includes(item ?? "")) &&
    Array.isArray(result.strengths) && result.strengths.every((item) => typeof item === "string") &&
    typeof result.priority === "string" &&
    Array.isArray(result.journey) && result.journey.every((item) => typeof item === "string") &&
    typeof result.completedAt === "string" && !Number.isNaN(Date.parse(result.completedAt));
}

export function isGuidedVisit(value: unknown): value is Record<string, VisitStatus> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every((item) => ["confirmed", "incomplete", "unsure", "follow-up"].includes(item as string));
}
