import { useEffect, useState } from "react";
import { sectionLinks } from "../data/content";
import { AccessibilityControls } from "./AccessibilityControls";

export function ProgressNavigation() {
  const [activeId, setActiveId] = useState(sectionLinks[0].id);

  useEffect(() => {
    const targets = sectionLinks
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.2, 0.45] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const activeIndex = sectionLinks.findIndex((item) => item.id === activeId);
  const activeLabel = sectionLinks[Math.max(activeIndex, 0)].label;

  return (
    <header className="journey-nav">
      <a
        className="brand"
        href="#opening"
        aria-label="Ready Together, back to beginning"
      >
        <span className="brand-mark" aria-hidden="true">
          RT
        </span>
        <span>Ready Together</span>
      </a>
      <nav aria-label="Story sections">
        {sectionLinks.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={item.id === activeId ? "active" : ""}
            aria-current={item.id === activeId ? "location" : undefined}
          >
            {item.label}
          </a>
        ))}
        <span className="mobile-stage" aria-live="polite">
          {activeLabel}
        </span>
      </nav>
      <AccessibilityControls />
    </header>
  );
}
