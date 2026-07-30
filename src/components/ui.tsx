import type { ButtonHTMLAttributes } from "react";
import { SealCheck } from "@phosphor-icons/react";
import { reviewNotice } from "../data/content";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) {
  return (
    <button className={`button button-${variant} ${className}`} {...props} />
  );
}

export function MedicalReviewNotice() {
  return (
    <aside className="review-notice" aria-label="Content review notice">
      <SealCheck size={19} weight="bold" aria-hidden="true" />
      <p>{reviewNotice}</p>
    </aside>
  );
}

export function SectionIntro({
  title,
  body,
  eyebrow,
  inverse = false,
}: {
  title: string;
  body?: string;
  eyebrow?: string;
  inverse?: boolean;
}) {
  return (
    <header
      className={`section-intro ${inverse ? "section-intro-inverse" : ""}`}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </header>
  );
}
