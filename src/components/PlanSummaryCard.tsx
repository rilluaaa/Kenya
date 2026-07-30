import { DownloadSimple, Printer, SealCheck } from "@phosphor-icons/react";
import { useState } from "react";
import { planItems, planStatusLabels } from "../data/content";
import type { FamilyPlan } from "../types";
import { Button } from "./ui";

export function PlanSummaryCard({ plan }: { plan: FamilyPlan }) {
  const [message, setMessage] = useState<string | null>(null);
  const hasEntries = planItems.some(
    (item) =>
      plan[item.id]?.value.trim() || plan[item.id]?.status !== "not-arranged",
  );

  function downloadPlan() {
    try {
      const lines = [
        "READY TOGETHER - OUR FAMILY PLAN",
        "",
        ...planItems.map((item) => {
          const entry = plan[item.id];
          return `${item.label}: ${entry.value.trim() || "Not recorded"} (${planStatusLabels[entry.status]})`;
        }),
        "",
        "This plan does not contain medical advice. Contact an appropriate health professional for medical support.",
      ];
      const blob = new Blob([lines.join("\n")], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ready-together-family-plan.txt";
      link.click();
      URL.revokeObjectURL(url);
      setMessage("Your plan file has been downloaded.");
    } catch {
      setMessage(
        "The download could not start. Try printing the plan instead.",
      );
    }
  }

  function printPlan() {
    try {
      window.print();
      setMessage("The print window is ready.");
    } catch {
      setMessage(
        "Printing is not available in this browser. You can take a screenshot of the summary.",
      );
    }
  }

  return (
    <aside className="plan-summary" aria-labelledby="summary-title">
      <div className="summary-heading">
        <span className="summary-mark" aria-hidden="true">
          <SealCheck size={30} weight="fill" />
        </span>
        <div>
          <p>Ready Together</p>
          <h3 id="summary-title">Our family plan</h3>
        </div>
      </div>

      {!hasEntries ? (
        <div className="summary-empty">
          <p>Your plan will take shape here as your family adds details.</p>
        </div>
      ) : (
        <dl>
          {planItems.map((item) => {
            const entry = plan[item.id];
            return (
              <div key={item.id}>
                <dt>{item.label}</dt>
                <dd>{entry.value.trim() || "Not recorded"}</dd>
                <span data-status={entry.status}>
                  {planStatusLabels[entry.status]}
                </span>
              </div>
            );
          })}
        </dl>
      )}

      <p className="summary-privacy">
        Saved only in this browser session. Do not enter personal medical
        information.
      </p>
      <div className="summary-actions no-print">
        <Button onClick={downloadPlan}>
          <DownloadSimple size={20} weight="bold" aria-hidden="true" />
          Download plan
        </Button>
        <Button variant="secondary" onClick={printPlan}>
          <Printer size={20} weight="bold" aria-hidden="true" />
          Print
        </Button>
      </div>
      {message ? (
        <p className="summary-message" role="status">
          {message}
        </p>
      ) : null}
    </aside>
  );
}
