export type PlanStatus = "ready" | "needs-discussion" | "not-arranged";

export type PerspectiveId = "amina" | "supporter" | "promoter";

export type StoryChoice = {
  id: string;
  label: string;
  consequence: string;
};

export type PlanItem = {
  id: string;
  label: string;
  prompt: string;
  group: "journey" | "people" | "contacts" | "items";
};

export type PlanEntry = {
  value: string;
  status: PlanStatus;
};

export type FamilyPlan = Record<string, PlanEntry>;
