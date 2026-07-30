import { Moon, Sun, TextAa, Wind } from "@phosphor-icons/react";
import { useAccessibility } from "../context/AccessibilityContext";

export function AccessibilityControls() {
  const {
    theme,
    largeText,
    reduceMotion,
    toggleTheme,
    toggleLargeText,
    toggleMotion,
  } = useAccessibility();

  return (
    <div className="accessibility-controls" aria-label="Accessibility controls">
      <button
        type="button"
        className={largeText ? "is-active" : ""}
        onClick={toggleLargeText}
        aria-pressed={largeText}
        aria-label={largeText ? "Use standard text size" : "Use larger text"}
      >
        <TextAa size={20} weight="bold" aria-hidden="true" />
      </button>
      <button
        type="button"
        className={reduceMotion ? "is-active" : ""}
        onClick={toggleMotion}
        aria-pressed={reduceMotion}
        aria-label={reduceMotion ? "Allow motion" : "Reduce motion"}
      >
        <Wind size={20} weight="bold" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Use night palette" : "Use day palette"}
      >
        {theme === "light" ? (
          <Moon size={20} weight="fill" aria-hidden="true" />
        ) : (
          <Sun size={20} weight="fill" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
