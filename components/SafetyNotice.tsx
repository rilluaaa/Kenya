import { Info } from "@phosphor-icons/react/dist/ssr";

export function SafetyNotice({ compact = true }: { compact?: boolean }) {
  return (
    <aside className="safety-notice" aria-label="Medical safety notice">
      <Info size={24} weight="bold" aria-hidden="true" />
      <div>
        <strong>{compact ? "Education only" : "This prototype supports learning, not diagnosis"}</strong>
        <p className="muted">It does not replace assessment by a qualified healthcare professional. Urgent concerns need the appropriate local health service.</p>
      </div>
    </aside>
  );
}
