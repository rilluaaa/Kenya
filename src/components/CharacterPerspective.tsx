import { ChatsCircle } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type KeyboardEvent } from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { perspectives } from "../data/content";
import type { PerspectiveId } from "../types";

export function CharacterPerspective() {
  const [active, setActive] = useState<PerspectiveId>("amina");
  const { reduceMotion } = useAccessibility();
  const perspective = perspectives.find((item) => item.id === active)!;

  function moveTab(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight")
      nextIndex = (currentIndex + 1) % perspectives.length;
    if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + perspectives.length) % perspectives.length;
    }
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = perspectives.length - 1;
    if (nextIndex === currentIndex) return;

    event.preventDefault();
    const next = perspectives[nextIndex];
    setActive(next.id);
    requestAnimationFrame(() => {
      document.getElementById(`perspective-tab-${next.id}`)?.focus();
    });
  }

  return (
    <div className="perspective-panel">
      <div
        className="perspective-tabs"
        role="tablist"
        aria-label="Family perspectives"
      >
        {perspectives.map((item, index) => (
          <button
            key={item.id}
            id={`perspective-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={active === item.id}
            aria-controls={`perspective-panel-${item.id}`}
            tabIndex={active === item.id ? 0 : -1}
            className={active === item.id ? "active" : ""}
            onClick={() => setActive(item.id)}
            onKeyDown={(event) => moveTab(event, index)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.blockquote
          id={`perspective-panel-${perspective.id}`}
          key={perspective.id}
          role="tabpanel"
          aria-labelledby={`perspective-tab-${perspective.id}`}
          tabIndex={0}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.38 }}
        >
          <ChatsCircle size={34} weight="duotone" aria-hidden="true" />
          <p>“{perspective.thought}”</p>
          <footer>
            <strong>{perspective.name}</strong>
            <span>{perspective.role}</span>
          </footer>
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
}
