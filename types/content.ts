export type UserMode = "family" | "chp";
export type Locale = "en" | "sw";

export type ReviewMeta = {
  reviewed: boolean;
  reviewNotes: string;
  sourceReference: string;
  locale: Locale;
  version: string;
};

export type ScenarioState = {
  facilityPlanConfirmed: boolean;
  primaryTransportConfirmed: boolean;
  backupTransportConfirmed: boolean;
  supportPersonConfirmed: boolean;
  contactPlanConfirmed: boolean;
  preparationItemsSelected: string[];
  familyAgreementLevel: number;
  timelyActionScore: number;
  communicationScore: number;
  preparednessScore: number;
};

export type StateChanges = Partial<Omit<ScenarioState, "preparationItemsSelected">> & {
  preparationItemsSelected?: string[];
};

export type DecisionOption = {
  id: string;
  label: string;
  consequence: string;
  reflection: string;
  changes: StateChanges;
};

export type ScenarioNode = ReviewMeta & {
  id: string;
  sceneTitle: string;
  location: string;
  time: string;
  illustration: "visit" | "facility" | "transport" | "items" | "conversation" | "change" | "action" | "reflection";
  narration: string;
  dialogue?: { speaker: string; text: string };
  audioText: string;
  questions: Record<UserMode, string>;
  options: DecisionOption[];
  nextNode?: string;
  modeText?: Partial<Record<UserMode, string>>;
  interaction?: "single" | "multi" | "summary";
};

export type Scenario = ReviewMeta & {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  startNode: string;
  nodes: ScenarioNode[];
};

export type OutcomeLevel = "Strong" | "Developing" | "Needs attention";

export type ScenarioResult = {
  outcome: "Strong preparation" | "Partially prepared" | "Important gaps remain";
  dimensions: Record<"Preparedness" | "Communication" | "Shared planning" | "Timely action", OutcomeLevel>;
  strengths: string[];
  priority: string;
  journey: string[];
  completedAt: string;
};

export type BirthPlan = {
  nickname: string;
  placeOfCare: string;
  mainTransport: string;
  backupTransport: string;
  transportContact: string;
  supportPerson: string;
  importantContact: string;
  items: string[];
  remainingActions: string;
  updatedAt: string;
};

export type VisitStatus = "confirmed" | "incomplete" | "unsure" | "follow-up";
