import { ArrowCounterClockwise, ArrowRight } from "@phosphor-icons/react";
import { assetPath } from "../assetPath";
import { pageCopy } from "../data/content";
import { Button } from "./ui";

export function StoryOutcome({
  prepared,
  onRetry,
  onBuildPlan,
}: {
  prepared: boolean;
  onRetry: () => void;
  onBuildPlan: () => void;
}) {
  const copy = prepared ? pageCopy.outcome.prepared : pageCopy.outcome.open;

  return (
    <div className="outcome-shell" data-path={prepared ? "prepared" : "open"}>
      <div className="outcome-copy">
        <p className="outcome-label">{copy.label}</p>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
        <div className="outcome-actions">
          <Button variant="secondary" onClick={onRetry}>
            <ArrowCounterClockwise size={20} weight="bold" aria-hidden="true" />
            Try another decision
          </Button>
          <Button onClick={onBuildPlan}>
            Build our family plan
            <ArrowRight size={20} weight="bold" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <figure className="outcome-image">
        <img
          src={assetPath("journey-health-facility.webp")}
          alt="Amina and her family walk toward a health facility with their prepared bags"
          width="1586"
          height="992"
          loading="lazy"
        />
      </figure>
    </div>
  );
}
