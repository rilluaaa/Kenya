import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useAccessibility } from "../context/AccessibilityContext";
import type { StoryChoice } from "../types";
import { Button } from "./ui";

export function StoryDecision({
  title,
  body,
  choices,
  selectedId,
  onSelect,
  onContinue,
  continueLabel,
}: {
  title: string;
  body: string;
  choices: StoryChoice[];
  selectedId: string | null;
  onSelect: (choiceId: string) => void;
  onContinue?: () => void;
  continueLabel?: string;
}) {
  const { reduceMotion } = useAccessibility();
  const selected = choices.find((choice) => choice.id === selectedId);

  return (
    <div className="story-decision">
      <div className="decision-copy">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <div className="decision-options" role="group" aria-label={title}>
        {choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            className={selectedId === choice.id ? "selected" : ""}
            onClick={() => onSelect(choice.id)}
            aria-pressed={selectedId === choice.id}
          >
            <span>{choice.label}</span>
            {selectedId === choice.id ? (
              <CheckCircle size={24} weight="fill" aria-hidden="true" />
            ) : (
              <ArrowRight size={22} weight="bold" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected ? (
          <motion.div
            className="decision-consequence"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
          >
            <p>{selected.consequence}</p>
            {onContinue ? (
              <Button onClick={onContinue}>
                {continueLabel ?? "Continue the story"}
                <ArrowRight size={20} weight="bold" aria-hidden="true" />
              </Button>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
