/*
THESIS: A family gradually puts one shared birth-preparation plan on the table. It refuses the quiz and dashboard patterns common to health education.
OWN-WORLD: Forest and paper fields, terracotta action, tactile illustrated scenes, compact editorial sans type, and handled-paper decisions.
STORY: The family prepares, checks assumptions, follows Amina through changing circumstances, sees consequences, and records a practical plan.
FIRST VIEWPORT: Amina and Nia at home at night fill the right side. A single urgent question and action sit low on the left.
FORM: A continuous illustrated story with decision cards and scene transitions, grounded in the supplied six-image visual set.
*/
import {
  ArrowCounterClockwise,
  ArrowRight,
  LockKey,
} from "@phosphor-icons/react";
import { assetPath } from "./assetPath";
import { useEffect, useMemo, useState } from "react";
import { AssumptionCard } from "./components/AssumptionCard";
import { CharacterPerspective } from "./components/CharacterPerspective";
import { FamilyPlanBuilder } from "./components/FamilyPlanBuilder";
import { HeroScene } from "./components/HeroScene";
import { ProgressNavigation } from "./components/ProgressNavigation";
import { ReadinessCard } from "./components/ReadinessCard";
import { ReadinessProgress } from "./components/ReadinessProgress";
import { StoryDecision } from "./components/StoryDecision";
import { StoryOutcome } from "./components/StoryOutcome";
import { StorySection } from "./components/StorySection";
import { Button, MedicalReviewNotice, SectionIntro } from "./components/ui";
import {
  firstDecisionChoices,
  pageCopy,
  planItems,
  readinessCards,
  transportChoicesWithBackup,
  transportChoicesWithoutBackup,
} from "./data/content";
import type { FamilyPlan, ReadinessId, ReadinessStatus } from "./types";

const defaultReadiness: Record<ReadinessId, ReadinessStatus> = {
  "what-we-need": "still-to-decide",
  "getting-there": "still-to-decide",
  "who-we-contact": "still-to-decide",
  "who-does-what": "still-to-decide",
};

function createEmptyPlan(): FamilyPlan {
  return Object.fromEntries(
    planItems.map((item) => [
      item.id,
      { value: "", status: "not-arranged" as const },
    ]),
  );
}

type SessionState = {
  readiness: Record<ReadinessId, ReadinessStatus>;
  firstDecision: string | null;
  transportDecision: string | null;
  plan: FamilyPlan;
};

const storageKey = "ready-together-session";

function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  const [readiness, setReadiness] = useState(defaultReadiness);
  const [firstDecision, setFirstDecision] = useState<string | null>(null);
  const [transportDecision, setTransportDecision] = useState<string | null>(
    null,
  );
  const [plan, setPlan] = useState<FamilyPlan>(createEmptyPlan);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const state = JSON.parse(saved) as Partial<SessionState>;
        if (state.readiness)
          setReadiness({ ...defaultReadiness, ...state.readiness });
        if (typeof state.firstDecision === "string")
          setFirstDecision(state.firstDecision);
        if (typeof state.transportDecision === "string") {
          setTransportDecision(state.transportDecision);
        }
        if (state.plan) setPlan({ ...createEmptyPlan(), ...state.plan });
      }
    } catch {
      sessionStorage.removeItem(storageKey);
    } finally {
      setRestored(true);
    }
  }, []);

  useEffect(() => {
    if (!restored) return;
    const state: SessionState = {
      readiness,
      firstDecision,
      transportDecision,
      plan,
    };
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }, [firstDecision, plan, readiness, restored, transportDecision]);

  const hasBackup = readiness["getting-there"] === "ready";
  const transportChoices = hasBackup
    ? transportChoicesWithBackup
    : transportChoicesWithoutBackup;

  const preparedOutcome = useMemo(() => {
    const discussedAreas = Object.values(readiness).filter(
      (status) => status === "ready" || status === "discussed",
    ).length;
    return (
      discussedAreas >= 3 &&
      firstDecision === "review-plan" &&
      (transportDecision === "backup-transport" ||
        transportDecision === "support-person")
    );
  }, [firstDecision, readiness, transportDecision]);

  function updatePlan(id: string, next: Partial<FamilyPlan[string]>) {
    setPlan((current) => ({
      ...current,
      [id]: { ...current[id], ...next },
    }));
  }

  function retryDecision() {
    setFirstDecision(null);
    setTransportDecision(null);
    scrollTo("first-decision");
  }

  function restartStory() {
    setReadiness(defaultReadiness);
    setFirstDecision(null);
    setTransportDecision(null);
    scrollTo("opening");
  }

  if (!restored) {
    return (
      <main
        className="restore-screen"
        aria-busy="true"
        aria-label="Restoring your session"
      >
        <div className="restore-mark" />
        <div className="restore-line" />
        <div className="restore-line short" />
      </main>
    );
  }

  return (
    <div className="app-shell">
      <ProgressNavigation />
      <main>
        <HeroScene onStart={() => scrollTo("readiness")} />

        <StorySection id="readiness" className="readiness-section">
          <div className="section-container">
            <SectionIntro
              title={pageCopy.readiness.title}
              body={pageCopy.readiness.body}
            />
            <ReadinessProgress readiness={readiness} />
            <div className="readiness-layout">
              <figure className="scene-frame preparation-scene">
                <img
                  src={assetPath("readiness-table.webp")}
                  alt="A family reviews a prepared bag, phone, contacts, transport choices, and a map together"
                  width="1586"
                  height="992"
                  loading="lazy"
                />
                <figcaption>{pageCopy.readiness.caption}</figcaption>
              </figure>
              <div className="readiness-cards">
                {readinessCards.map((card) => (
                  <ReadinessCard
                    key={card.id}
                    {...card}
                    status={readiness[card.id]}
                    onStatusChange={(status) =>
                      setReadiness((current) => ({
                        ...current,
                        [card.id]: status,
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </StorySection>

        <StorySection id="assumptions" className="assumption-section">
          <div className="section-container assumption-layout">
            <SectionIntro
              title={pageCopy.assumptions.title}
              body={pageCopy.assumptions.body}
              inverse
            />
            <AssumptionCard />
          </div>
        </StorySection>

        <StorySection id="story" className="character-section">
          <div className="character-scene">
            <img
              src={assetPath("community-plan-wide.webp")}
              alt="Amina and Nia sit with Community Health Promoter Wanjiku to discuss a family plan"
              width="1586"
              height="992"
              loading="lazy"
            />
          </div>
          <div className="section-container character-content">
            <SectionIntro
              title={pageCopy.character.title}
              body={pageCopy.character.body}
            />
            <CharacterPerspective />
          </div>
        </StorySection>

        <StorySection id="first-decision" className="decision-section">
          <div className="decision-image-panel">
            <img
              src={assetPath("amina-evening.webp")}
              alt="Amina tells Nia that something feels different while they sit at home in the evening"
              width="1586"
              height="992"
              loading="lazy"
            />
          </div>
          <div className="decision-panel">
            <StoryDecision
              title={pageCopy.firstDecision.title}
              body={pageCopy.firstDecision.body}
              choices={firstDecisionChoices}
              selectedId={firstDecision}
              onSelect={setFirstDecision}
              onContinue={() => scrollTo("transport")}
            />
            <MedicalReviewNotice />
          </div>
        </StorySection>

        <StorySection id="transport" className="transport-section">
          <div className="transport-backdrop" aria-hidden="true">
            <img
              src={assetPath("transport-challenge.webp")}
              alt=""
              width="1586"
              height="992"
              loading="lazy"
            />
          </div>
          <div className="section-container transport-content">
            <p className="transport-kicker">{pageCopy.transport.kicker}</p>
            <StoryDecision
              title={
                hasBackup
                  ? pageCopy.transport.withBackupTitle
                  : pageCopy.transport.withoutBackupTitle
              }
              body={
                hasBackup
                  ? pageCopy.transport.withBackupBody
                  : pageCopy.transport.withoutBackupBody
              }
              choices={transportChoices}
              selectedId={transportDecision}
              onSelect={setTransportDecision}
              onContinue={() => scrollTo("outcome")}
              continueLabel={pageCopy.transport.action}
            />
          </div>
        </StorySection>

        <StorySection id="outcome" className="outcome-section">
          <div className="section-container">
            {transportDecision ? (
              <StoryOutcome
                prepared={preparedOutcome}
                onRetry={retryDecision}
                onBuildPlan={() => scrollTo("plan")}
              />
            ) : (
              <div className="outcome-pending">
                <h2>{pageCopy.outcome.pendingTitle}</h2>
                <p>{pageCopy.outcome.pendingBody}</p>
                <Button onClick={() => scrollTo("transport")}>
                  Return to the decision
                  <ArrowRight size={20} weight="bold" aria-hidden="true" />
                </Button>
              </div>
            )}
          </div>
        </StorySection>

        <StorySection id="plan" className="plan-section">
          <div className="plan-scene" aria-hidden="true">
            <img
              src={assetPath("planning-objects.webp")}
              alt=""
              width="1586"
              height="992"
              loading="lazy"
            />
          </div>
          <div className="section-container plan-content">
            <SectionIntro
              eyebrow={pageCopy.plan.eyebrow}
              title={pageCopy.plan.title}
              body={pageCopy.plan.body}
            />
            <div className="privacy-note">
              <LockKey size={21} weight="bold" aria-hidden="true" />
              <p>{pageCopy.plan.privacy}</p>
            </div>
            <FamilyPlanBuilder plan={plan} onChange={updatePlan} />
          </div>
        </StorySection>

        <StorySection id="closing" className="closing-section">
          <div className="closing-image" aria-hidden="true">
            <img
              src={assetPath("family-planning.webp")}
              alt=""
              width="1586"
              height="992"
              loading="lazy"
            />
          </div>
          <div className="closing-copy">
            <h2>{pageCopy.closing.title}</h2>
            <p>{pageCopy.closing.body}</p>
            <div className="closing-actions">
              <Button onClick={() => scrollTo("plan")}>
                Review our plan
                <ArrowRight size={20} weight="bold" aria-hidden="true" />
              </Button>
              <Button variant="secondary" onClick={restartStory}>
                <ArrowCounterClockwise
                  size={20}
                  weight="bold"
                  aria-hidden="true"
                />
                Play the story again
              </Button>
            </div>
            <MedicalReviewNotice />
          </div>
        </StorySection>
      </main>
      <footer className="site-footer">
        <strong>Ready Together</strong>
        <p>{pageCopy.footer}</p>
      </footer>
    </div>
  );
}
