"use client";

import type { VisitStatus } from "@/types/content";

const options: Array<{ id: VisitStatus; label: string }> = [
  { id: "confirmed", label: "Confirmed" }, { id: "incomplete", label: "Incomplete" }, { id: "unsure", label: "Unsure" }, { id: "follow-up", label: "Follow-up needed" },
];

export function StatusSelector({ value, onChange }: { value?: VisitStatus; onChange: (value: VisitStatus) => void }) {
  return <div className="status-selector" role="radiogroup" aria-label="Conversation status">{options.map((option) => <button type="button" role="radio" aria-checked={value === option.id} className="status-button" data-selected={value === option.id} key={option.id} onClick={() => onChange(option.id)}>{option.label}</button>)}</div>;
}
