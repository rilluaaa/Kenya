import type { BirthPlan } from "@/types/content";

export const emptyBirthPlan: BirthPlan = {
  nickname: "",
  placeOfCare: "",
  mainTransport: "",
  backupTransport: "",
  transportContact: "",
  supportPerson: "",
  importantContact: "",
  items: [],
  remainingActions: "",
  updatedAt: "",
};

export function getBirthPlanCompletion(plan: BirthPlan): { complete: number; total: number; missing: string[] } {
  const fields: Array<[keyof BirthPlan, string]> = [
    ["placeOfCare", "Planned place of care"], ["mainTransport", "Main transport"], ["backupTransport", "Backup transport"],
    ["transportContact", "Person arranging transport"], ["supportPerson", "Support person"], ["importantContact", "Important contact"],
    ["remainingActions", "Remaining actions"],
  ];
  const missing = fields.filter(([key]) => !String(plan[key]).trim()).map(([, label]) => label);
  if (plan.items.length === 0) missing.push("Practical preparation checklist");
  return { complete: 8 - missing.length, total: 8, missing };
}

export function birthPlanToText(plan: BirthPlan): string {
  return [
    "CARE BEGINS AT HOME - FAMILY BIRTH PLAN",
    plan.nickname ? `Plan name: ${plan.nickname}` : "Anonymous plan",
    `Planned place of care: ${plan.placeOfCare || "Still to confirm"}`,
    `Main transport: ${plan.mainTransport || "Still to confirm"}`,
    `Backup transport: ${plan.backupTransport || "Still to confirm"}`,
    `Person arranging transport: ${plan.transportContact || "Still to confirm"}`,
    `Support person: ${plan.supportPerson || "Still to confirm"}`,
    `Important contact: ${plan.importantContact || "Still to confirm"}`,
    `Prepared items: ${plan.items.length ? plan.items.join(", ") : "Still to confirm"}`,
    `Remaining actions: ${plan.remainingActions || "None recorded"}`,
    "Education prototype only. This plan does not replace professional assessment.",
  ].join("\n");
}
