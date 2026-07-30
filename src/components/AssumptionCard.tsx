import { ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { assumptionResponseLabels, assumptions } from "../data/content";
import { Button, MedicalReviewNotice } from "./ui";

export function AssumptionCard({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const topicRef = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useAccessibility();
  const current = assumptions[index];
  const isLast = index === assumptions.length - 1;

  useEffect(() => {
    if (!choice) return;

    const frame = requestAnimationFrame(() => revealRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [choice]);

  useEffect(() => {
    if (index === 0) return;

    const timeout = window.setTimeout(
      () => topicRef.current?.focus(),
      reduceMotion ? 0 : 450,
    );
    return () => window.clearTimeout(timeout);
  }, [index, reduceMotion]);

  function advance() {
    if (isLast) {
      onComplete();
      return;
    } else {
      setIndex((value) => value + 1);
    }
    setChoice(null);
  }

  return (
    <div className="assumption-shell">
      <div
        ref={topicRef}
        className="assumption-topic"
        tabIndex={-1}
        aria-label={`${current.topic}: ${current.statement}`}
      >
        {current.topic}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="assumption-card"
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -22 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="assumption-statement">“{current.statement}”</p>
          {!choice ? (
            <div className="assumption-choices" aria-label="Choose a response">
              {assumptionResponseLabels.map((option) => (
                <Button
                  key={option}
                  variant="secondary"
                  onClick={() => setChoice(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          ) : (
            <motion.div
              ref={revealRef}
              className="assumption-reveal"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              tabIndex={-1}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="your-answer">You chose: {choice}</p>
              <p>{current.explanation}</p>
              <Button onClick={advance}>
                {isLast ? "Continue the story" : "Next statement"}
                <ArrowRight size={20} weight="bold" aria-hidden="true" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      <MedicalReviewNotice />
    </div>
  );
}
