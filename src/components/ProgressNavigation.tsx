import { AccessibilityControls } from "./AccessibilityControls";

export function ProgressNavigation({
  label,
  current,
  total,
  onRestart,
}: {
  label: string;
  current: number;
  total: number;
  onRestart: () => void;
}) {
  return (
    <header className="journey-nav">
      <button
        type="button"
        className="brand"
        onClick={onRestart}
        aria-label="Ready Together, restart from the beginning"
      >
        <span className="brand-mark" aria-hidden="true">
          RT
        </span>
        <span>Ready Together</span>
      </button>
      <div className="journey-stage" aria-live="polite" aria-atomic="true">
        <strong>{label}</strong>
        <span>
          {current} / {total}
        </span>
      </div>
      <AccessibilityControls />
    </header>
  );
}
