import type { ScenarioNode } from "@/types/content";

export function HouseholdScene({ compact = false, variant }: { compact?: boolean; variant?: ScenarioNode["illustration"] }) {
  return (
    <figure className={`scene-frame${compact ? " compact-scene" : ""}`} data-variant={variant} role="img" aria-label="Illustration of Amina, a family member, and a Community Health Promoter near their home, with a path towards a health facility">
      <span className="scene-sun" />
      <span className="scene-hill" />
      <span className="scene-house" />
      <span className="scene-path" />
      <span className="person person-one"><span /></span>
      <span className="person person-two" />
      <span className="person person-three" />
      <span className="scene-facility" />
      <span className="scene-vehicle" />
      <span className="scene-bag" />
      <span className="scene-conversation" />
    </figure>
  );
}
