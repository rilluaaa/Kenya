import {
  Bag,
  Car,
  CaretDown,
  PhoneCall,
  UsersThree,
} from "@phosphor-icons/react";
import { useState } from "react";
import { pageCopy, planItems } from "../data/content";
import type { FamilyPlan, PlanStatus } from "../types";
import { PlanSummaryCard } from "./PlanSummaryCard";

const groupDetails = {
  journey: {
    ...pageCopy.plan.groups.journey,
    Icon: Car,
  },
  people: {
    ...pageCopy.plan.groups.people,
    Icon: UsersThree,
  },
  contacts: {
    ...pageCopy.plan.groups.contacts,
    Icon: PhoneCall,
  },
  items: {
    ...pageCopy.plan.groups.items,
    Icon: Bag,
  },
};

const statusOptions: Array<{ value: PlanStatus; label: string }> = [
  { value: "ready", label: "Ready" },
  { value: "needs-discussion", label: "Needs discussion" },
  { value: "not-arranged", label: "Not yet arranged" },
];

export function FamilyPlanBuilder({
  plan,
  onChange,
}: {
  plan: FamilyPlan;
  onChange: (id: string, value: Partial<FamilyPlan[string]>) => void;
}) {
  const [openGroups, setOpenGroups] = useState<string[]>(["journey"]);

  function toggleGroup(group: string) {
    setOpenGroups((current) =>
      current.includes(group)
        ? current.filter((item) => item !== group)
        : [...current, group],
    );
  }

  return (
    <div className="plan-builder-layout">
      <div className="plan-groups">
        {(Object.keys(groupDetails) as Array<keyof typeof groupDetails>).map(
          (group) => {
            const details = groupDetails[group];
            const open = openGroups.includes(group);
            const items = planItems.filter((item) => item.group === group);
            return (
              <section className="plan-group" key={group}>
                <button
                  type="button"
                  className="plan-group-trigger"
                  onClick={() => toggleGroup(group)}
                  aria-expanded={open}
                >
                  <span className="plan-group-icon" aria-hidden="true">
                    <details.Icon size={27} weight="duotone" />
                  </span>
                  <span>
                    <strong>{details.title}</strong>
                    <small>{details.body}</small>
                  </span>
                  <CaretDown
                    size={22}
                    weight="bold"
                    className={open ? "rotate" : ""}
                    aria-hidden="true"
                  />
                </button>
                {open ? (
                  <div className="plan-fields">
                    {items.map((item) => (
                      <div className="plan-field" key={item.id}>
                        <label htmlFor={`plan-${item.id}`}>{item.label}</label>
                        <input
                          id={`plan-${item.id}`}
                          value={plan[item.id].value}
                          onChange={(event) =>
                            onChange(item.id, { value: event.target.value })
                          }
                          placeholder={item.prompt}
                          autoComplete="off"
                        />
                        <div
                          className="plan-status-options"
                          role="group"
                          aria-label={`Status for ${item.label}`}
                        >
                          {statusOptions.map((option) => (
                            <button
                              type="button"
                              key={option.value}
                              data-status={option.value}
                              className={
                                plan[item.id].status === option.value
                                  ? "selected"
                                  : ""
                              }
                              aria-pressed={
                                plan[item.id].status === option.value
                              }
                              onClick={() =>
                                onChange(item.id, { status: option.value })
                              }
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>
            );
          },
        )}
      </div>
      <PlanSummaryCard plan={plan} />
    </div>
  );
}
