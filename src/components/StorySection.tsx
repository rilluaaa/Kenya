import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useAccessibility } from "../context/AccessibilityContext";

export function StorySection({
  id,
  children,
  className = "",
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  const { reduceMotion } = useAccessibility();

  return (
    <motion.section
      id={id}
      aria-labelledby={labelledBy}
      className={`story-section ${className}`}
      initial={reduceMotion ? false : { opacity: 0.72, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
