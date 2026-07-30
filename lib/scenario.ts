import type { OutcomeLevel, ScenarioNode, ScenarioResult, ScenarioState, StateChanges, UserMode } from "@/types/content";

export const initialScenarioState: ScenarioState = {
  facilityPlanConfirmed: false,
  primaryTransportConfirmed: false,
  backupTransportConfirmed: false,
  supportPersonConfirmed: false,
  contactPlanConfirmed: false,
  preparationItemsSelected: [],
  familyAgreementLevel: 0,
  timelyActionScore: 0,
  communicationScore: 0,
  preparednessScore: 0,
};

export function applyStateChanges(state: ScenarioState, changes: StateChanges): ScenarioState {
  const numeric = ["familyAgreementLevel", "timelyActionScore", "communicationScore", "preparednessScore"] as const;
  const next = { ...state };
  for (const key of numeric) {
    if (typeof changes[key] === "number") next[key] = Math.max(0, state[key] + changes[key]!);
  }
  for (const key of ["facilityPlanConfirmed", "primaryTransportConfirmed", "backupTransportConfirmed", "supportPersonConfirmed", "contactPlanConfirmed"] as const) {
    if (typeof changes[key] === "boolean") next[key] = changes[key]!;
  }
  if (changes.preparationItemsSelected) {
    next.preparationItemsSelected = Array.from(new Set([...state.preparationItemsSelected, ...changes.preparationItemsSelected]));
  }
  return next;
}

function level(score: number, strongAt: number, developingAt: number): OutcomeLevel {
  if (score >= strongAt) return "Strong";
  if (score >= developingAt) return "Developing";
  return "Needs attention";
}

export function calculateOutcome(state: ScenarioState): ScenarioResult {
  const planSignals = [state.facilityPlanConfirmed, state.primaryTransportConfirmed, state.backupTransportConfirmed, state.contactPlanConfirmed].filter(Boolean).length;
  const prepared = state.preparednessScore + planSignals + Math.min(2, state.preparationItemsSelected.length);
  const shared = state.familyAgreementLevel + (state.supportPersonConfirmed ? 2 : 0);
  const total = prepared + state.communicationScore + shared + state.timelyActionScore;

  const strengths: string[] = [];
  if (planSignals >= 3) strengths.push("You made the practical plan easy for the household to name.");
  if (state.communicationScore >= 4) strengths.push("You used listening and shared review to keep people involved.");
  if (state.backupTransportConfirmed) strengths.push("The backup transport decision helped when the first option changed.");
  if (strengths.length < 2) strengths.push("You identified actions the family can make more specific.");
  if (strengths.length < 2) strengths.push("You kept the conversation focused on practical preparation.");

  let priority = "Confirm a backup transport option and who will make contact.";
  if (!state.facilityPlanConfirmed) priority = "Agree on and record the planned place of care.";
  else if (!state.contactPlanConfirmed) priority = "Name the person responsible for making the transport contact.";
  else if (state.preparationItemsSelected.length < 2) priority = "Complete a locally reviewed practical preparation checklist.";

  return {
    outcome: total >= 22 ? "Strong preparation" : total >= 13 ? "Partially prepared" : "Important gaps remain",
    dimensions: {
      Preparedness: level(prepared, 8, 4),
      Communication: level(state.communicationScore, 6, 3),
      "Shared planning": level(shared, 4, 2),
      "Timely action": level(state.timelyActionScore, 5, 2),
    },
    strengths: strengths.slice(0, 2),
    priority,
    journey: [
      state.facilityPlanConfirmed ? "Place agreed" : "Place still open",
      state.primaryTransportConfirmed ? "Main transport named" : "Transport still open",
      state.backupTransportConfirmed ? "Backup ready" : "Backup missing",
      state.contactPlanConfirmed ? "Contact role clear" : "Contact role open",
    ],
    completedAt: new Date().toISOString(),
  };
}

export function getModeQuestion(node: ScenarioNode, mode: UserMode): string {
  return node.questions[mode];
}

export function transportChangeMessage(state: ScenarioState): string {
  return state.backupTransportConfirmed
    ? "Your earlier backup decision gives the family a clear next option."
    : "No backup was recorded, so the family must now agree on a new option and who will make contact.";
}
