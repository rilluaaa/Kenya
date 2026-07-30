import { beforeEach, describe, expect, it } from "vitest";
import { aminaScenario } from "@/data/scenarios";
import { applyStateChanges, calculateOutcome, getModeQuestion, initialScenarioState, transportChangeMessage } from "@/lib/scenario";
import { isBirthPlan, isScenarioResult, isScenarioState, readJson, removeStoredValue } from "@/lib/storage";
import { emptyBirthPlan, getBirthPlanCompletion } from "@/lib/birth-plan";

class LocalStorageMock {
  private store = new Map<string, string>();
  getItem(key: string) { return this.store.get(key) ?? null; }
  setItem(key: string, value: string) { this.store.set(key, String(value)); }
  removeItem(key: string) { this.store.delete(key); }
  clear() { this.store.clear(); }
  key(index: number) { return Array.from(this.store.keys())[index] ?? null; }
  get length() { return this.store.size; }
}

Object.defineProperty(window, "localStorage", { value: new LocalStorageMock(), configurable: true });

describe("scenario engine", () => {
  it("applies branching state updates without replacing unrelated state", () => {
    const updated = applyStateChanges(initialScenarioState, { backupTransportConfirmed: true, preparednessScore: 3 });
    expect(updated.backupTransportConfirmed).toBe(true);
    expect(updated.preparednessScore).toBe(3);
    expect(updated.facilityPlanConfirmed).toBe(false);
  });

  it("changes the later transport consequence based on an earlier decision", () => {
    expect(transportChangeMessage(initialScenarioState)).toContain("No backup");
    expect(transportChangeMessage({ ...initialScenarioState, backupTransportConfirmed: true })).toContain("clear next option");
  });

  it("calculates distinct preparation outcomes", () => {
    expect(calculateOutcome(initialScenarioState).outcome).toBe("Important gaps remain");
    const strong = { ...initialScenarioState, facilityPlanConfirmed: true, primaryTransportConfirmed: true, backupTransportConfirmed: true, contactPlanConfirmed: true, supportPersonConfirmed: true, preparationItemsSelected: ["a", "b", "c"], familyAgreementLevel: 4, timelyActionScore: 6, communicationScore: 7, preparednessScore: 7 };
    expect(calculateOutcome(strong).outcome).toBe("Strong preparation");
  });

  it("serves mode-specific questions from the same scene", () => {
    const node = aminaScenario.nodes[0];
    expect(getModeQuestion(node, "family")).not.toBe(getModeQuestion(node, "chp"));
    expect(getModeQuestion(node, "chp")).toContain("begin");
  });
});

describe("local data validation", () => {
  beforeEach(() => window.localStorage.clear());
  it("rejects malformed scenario data and invalid JSON", () => {
    expect(isScenarioState({ facilityPlanConfirmed: true })).toBe(false);
    window.localStorage.setItem("broken", "{not json");
    expect(readJson("broken", isScenarioState)).toBeNull();
  });
  it("accepts only complete birth-plan shapes", () => {
    expect(isBirthPlan(emptyBirthPlan)).toBe(true);
    expect(isBirthPlan({ ...emptyBirthPlan, items: "not-an-array" })).toBe(false);
  });
  it("rejects incomplete persisted results before the results view uses them", () => {
    expect(isScenarioResult({ outcome: "Strong preparation", strengths: [], priority: "x" })).toBe(false);
    expect(isScenarioResult(calculateOutcome(initialScenarioState))).toBe(true);
  });
  it("turns blocked storage removal into a safe false result", () => {
    Object.defineProperty(window, "localStorage", { value: { removeItem: () => { throw new Error("blocked"); } }, configurable: true });
    expect(removeStoredValue("care-home:test")).toBe(false);
    Object.defineProperty(window, "localStorage", { value: new LocalStorageMock(), configurable: true });
  });
});

describe("birth-plan completion", () => {
  it("reports missing sections and reaches full completion", () => {
    expect(getBirthPlanCompletion(emptyBirthPlan).complete).toBe(0);
    const complete = { ...emptyBirthPlan, placeOfCare: "Facility", mainTransport: "Driver", backupTransport: "Neighbour", transportContact: "Brother", supportPerson: "Aunt", importantContact: "Saved contact", items: ["Documents"], remainingActions: "Review together" };
    expect(getBirthPlanCompletion(complete)).toEqual({ complete: 8, total: 8, missing: [] });
  });
});
