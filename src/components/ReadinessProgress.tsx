import {
  Check,
  ChatCircleDots,
  CircleNotch,
  Path,
} from "@phosphor-icons/react";
import { readinessCards, readinessStatusLabels } from "../data/content";
import type { ReadinessId, ReadinessStatus } from "../types";

const statusIcons = {
  "still-to-decide": CircleNotch,
  discussed: ChatCircleDots,
  ready: Check,
  "needs-backup": Path,
};

export function ReadinessProgress({
  readiness,
}: {
  readiness: Record<ReadinessId, ReadinessStatus>;
}) {
  const started = Object.values(readiness).filter(
    (status) => status !== "still-to-decide",
  ).length;

  const summary =
    started === 0
      ? "Ready to begin the conversation"
      : started < 3
        ? "The conversation has started"
        : started < 4
          ? "Most parts have been discussed"
          : "A shared plan is taking shape";

  return (
    <div className="readiness-progress" aria-live="polite">
      <p>{summary}</p>
      <div className="readiness-strip">
        {readinessCards.map((card) => {
          const Icon = statusIcons[readiness[card.id]];
          return (
            <span key={card.id} data-state={readiness[card.id]}>
              <Icon size={17} weight="bold" aria-hidden="true" />
              <span className="sr-only">{card.title}: </span>
              {readinessStatusLabels[readiness[card.id]]}
            </span>
          );
        })}
      </div>
    </div>
  );
}
