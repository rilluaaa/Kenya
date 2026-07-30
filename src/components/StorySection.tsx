import type { ReactNode } from "react";

export function StorySection({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`story-section ${className}`}>
      {children}
    </section>
  );
}
