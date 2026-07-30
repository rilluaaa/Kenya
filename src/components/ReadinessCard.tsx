import {
  Bag,
  Car,
  CaretDown,
  PhoneCall,
  UsersThree,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { readinessStatusLabels } from "../data/content";
import type { ReadinessId, ReadinessStatus } from "../types";

const icons = {
  "what-we-need": Bag,
  "getting-there": Car,
  "who-we-contact": PhoneCall,
  "who-does-what": UsersThree,
};

export function ReadinessCard({
  id,
  title,
  short,
  topics,
  status,
  onStatusChange,
}: {
  id: ReadinessId;
  title: string;
  short: string;
  topics: string[];
  status: ReadinessStatus;
  onStatusChange: (status: ReadinessStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const { reduceMotion } = useAccessibility();
  const Icon = icons[id];

  return (
    <article className="readiness-card" data-state={status}>
      <button
        type="button"
        className="readiness-card-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="readiness-icon" aria-hidden="true">
          <Icon size={29} weight="duotone" />
        </span>
        <span className="readiness-card-copy">
          <strong>{title}</strong>
          <small>{short}</small>
        </span>
        <span className="readiness-current">
          {readinessStatusLabels[status]}
        </span>
        <CaretDown
          className={open ? "rotate" : ""}
          size={22}
          weight="bold"
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="readiness-card-detail"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul>
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <fieldset>
              <legend>Where is your family with this?</legend>
              <div className="state-options">
                {(Object.keys(readinessStatusLabels) as ReadinessStatus[]).map(
                  (option) => (
                    <button
                      type="button"
                      key={option}
                      className={status === option ? "selected" : ""}
                      onClick={() => onStatusChange(option)}
                      aria-pressed={status === option}
                    >
                      {readinessStatusLabels[option]}
                    </button>
                  ),
                )}
              </div>
            </fieldset>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
