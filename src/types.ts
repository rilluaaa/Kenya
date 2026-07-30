export type ReadinessStatus =
  "still-to-decide" | "discussed" | "ready" | "needs-backup";

export type PlanStatus = "ready" | "needs-discussion" | "not-arranged";

export type ReadinessId =
  "what-we-need" | "getting-there" | "who-we-contact" | "who-does-what";

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
