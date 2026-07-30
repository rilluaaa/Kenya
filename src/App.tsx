/*
THESIS: A family reveals one part of a shared preparation story at a time. Nothing ahead appears until the current conversation is complete.
OWN-WORLD: Forest and paper fields, terracotta action, tactile illustrated scenes, compact editorial sans type, and handled-paper decisions.
STORY: The family prepares, checks assumptions, listens to each other, makes two decisions, sees the consequence, and records a practical plan.
FIRST VIEWPORT: Amina and Nia at home at night fill the right side. A single urgent question and action sit low on the left.
FORM: A gated, single-scene story. Each action replaces the current scene with the next, with no preview of future content.
*/
import {
  ArrowCounterClockwise,
  ArrowRight,
  LockKey,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { assetPath } from "./assetPath";
import { AssumptionCard } from "./components/AssumptionCard";
import { CharacterPerspective } from "./components/CharacterPerspective";
import { FamilyPlanBuilder } from "./components/FamilyPlanBuilder";
import { HeroScene } from "./components/HeroScene";
import { ProgressNavigation } from "./components/ProgressNavigation";
import { StoryDecision } from "./components/StoryDecision";
import { StoryOutcome } from "./components/StoryOutcome";
import { StorySection } from "./components/StorySection";
import { Button, MedicalReviewNotice, SectionIntro } from "./components/ui";
import { useAccessibility } from "./context/AccessibilityContext";
import {
  firstDecisionChoices,
  pageCopy,
  planItems,
  storyStages,
  transportChoicesWithBackup,
  transportChoicesWithoutBackup,
} from "./data/content";
import type { FamilyPlan } from "./types";

function createEmptyPlan(): FamilyPlan {
  return Object.fromEntries(
    planItems.map((item) => [
      item.id,
      { value: "", status: "not-arranged" as const },
    ]),
  );
}

type SessionState = {
  stage: number;
  firstDecision: string | null;
  transportDecision: string | null;
  plan: FamilyPlan;
};

const storageKey = "ready-together-session";
const lastStage = storyStages.length - 1;

function validStage(value: unknown) {
  return typeof value === "number" && Number.isInteger(value)
    ? Math.min(Math.max(value, 0), lastStage)
    : 0;
}

export default function App() {
  const [stage, setStage] = useState(0);
  const [firstDecision, setFirstDecision] = useState<string | null>(null);
  const [transportDecision, setTransportDecision] = useState<string | null>(
    null,
  );
  const [plan, setPlan] = useState<FamilyPlan>(createEmptyPlan);
  const [restored, setRestored] = useState(false);
  const stageMainRef = useRef<HTMLElement>(null);
  const { reduceMotion } = useAccessibility();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const state = JSON.parse(saved) as Partial<SessionState>;
        const restoredFirstDecision =
          typeof state.firstDecision === "string" ? state.firstDecision : null;
        const restoredTransportDecision =
          typeof state.transportDecision === "string"
            ? state.transportDecision
            : null;
        let restoredStage = validStage(state.stage);

        if (restoredStage >= 5 && !restoredFirstDecision) restoredStage = 4;
        if (restoredStage >= 6 && !restoredTransportDecision) restoredStage = 5;

        setStage(restoredStage);
        setFirstDecision(restoredFirstDecision);
        setTransportDecision(restoredTransportDecision);
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
      stage,
      firstDecision,
      transportDecision,
      plan,
    };
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }, [firstDecision, plan, restored, stage, transportDecision]);

  useEffect(() => {
    if (!restored) return;
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(frame);
  }, [restored, stage]);

  const hasBackup = firstDecision === "review-plan";
  const transportChoices = hasBackup
    ? transportChoicesWithBackup
    : transportChoicesWithoutBackup;

  const preparedOutcome = useMemo(
    () =>
      firstDecision === "review-plan" &&
      (transportDecision === "backup-transport" ||
        transportDecision === "support-person"),
    [firstDecision, transportDecision],
  );

  function goToStage(nextStage: number) {
    setStage(Math.min(Math.max(nextStage, 0), lastStage));
  }

  function updatePlan(id: string, next: Partial<FamilyPlan[string]>) {
    setPlan((current) => ({
      ...current,
      [id]: { ...current[id], ...next },
    }));
  }

  function chooseFirstDecision(choiceId: string) {
    setFirstDecision(choiceId);
    setTransportDecision(null);
  }

  function retryDecision() {
    setFirstDecision(null);
    setTransportDecision(null);
    goToStage(4);
  }

  function restartStory() {
    setFirstDecision(null);
    setTransportDecision(null);
    goToStage(0);
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

  let stageContent: ReactNode;

  switch (stage) {
    case 0:
      stageContent = <HeroScene onStart={() => goToStage(1)} />;
      break;

    case 1:
      stageContent = (
        <StorySection id="readiness" className="readiness-section">
          <div className="section-container preparation-stage-layout">
            <div className="preparation-stage-copy">
              <SectionIntro
                title={pageCopy.readiness.title}
                body={pageCopy.readiness.body}
              />
              <Button onClick={() => goToStage(2)}>
                Continue the story
                <ArrowRight size={20} weight="bold" aria-hidden="true" />
              </Button>
            </div>
            <figure className="scene-frame preparation-scene">
              <img
                src={assetPath("readiness-table.webp")}
                alt="A family reviews a prepared bag, phone, contacts, transport choices, and a map together"
                width="1586"
                height="992"
              />
              <figcaption>{pageCopy.readiness.caption}</figcaption>
            </figure>
          </div>
        </StorySection>
      );
      break;

    case 2:
      stageContent = (
        <StorySection id="assumptions" className="assumption-section">
          <div className="section-container assumption-layout">
            <SectionIntro
              title={pageCopy.assumptions.title}
              body={pageCopy.assumptions.body}
              inverse
            />
            <AssumptionCard onComplete={() => goToStage(3)} />
          </div>
        </StorySection>
      );
      break;

    case 3:
      stageContent = (
        <StorySection id="story" className="character-section">
          <div className="character-scene">
            <img
              src={assetPath("community-plan-wide.webp")}
              alt="Amina and Nia sit with Community Health Promoter Wanjiku to discuss a family plan"
              width="1586"
              height="992"
            />
          </div>
          <div className="section-container character-content">
            <SectionIntro
              title={pageCopy.character.title}
              body={pageCopy.character.body}
            />
            <CharacterPerspective />
            <div className="character-advance">
              <Button onClick={() => goToStage(4)}>
                Continue the story
                <ArrowRight size={20} weight="bold" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </StorySection>
      );
      break;

    case 4:
      stageContent = (
        <StorySection id="first-decision" className="decision-section">
          <div className="decision-image-panel">
            <img
              src={assetPath("amina-evening.webp")}
              alt="Amina tells Nia that something feels different while they sit at home in the evening"
              width="1586"
              height="992"
            />
          </div>
          <div className="decision-panel">
            <StoryDecision
              title={pageCopy.firstDecision.title}
              body={pageCopy.firstDecision.body}
              choices={firstDecisionChoices}
              selectedId={firstDecision}
              onSelect={chooseFirstDecision}
              onContinue={() => goToStage(5)}
            />
            <MedicalReviewNotice />
          </div>
        </StorySection>
      );
      break;

    case 5:
      stageContent = (
        <StorySection id="transport" className="transport-section">
          <div className="transport-backdrop" aria-hidden="true">
            <img
              src={assetPath("transport-challenge.webp")}
              alt=""
              width="1586"
              height="992"
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
              onContinue={() => goToStage(6)}
              continueLabel={pageCopy.transport.action}
            />
          </div>
        </StorySection>
      );
      break;

    case 6:
      stageContent = (
        <StorySection id="outcome" className="outcome-section">
          <div className="section-container">
            <StoryOutcome
              prepared={preparedOutcome}
              onRetry={retryDecision}
              onBuildPlan={() => goToStage(7)}
            />
          </div>
        </StorySection>
      );
      break;

    case 7:
      stageContent = (
        <StorySection id="plan" className="plan-section">
          <div className="plan-scene" aria-hidden="true">
            <img
              src={assetPath("planning-objects.webp")}
              alt=""
              width="1586"
              height="992"
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
            <div className="plan-stage-actions">
              <Button onClick={() => goToStage(8)}>
                Finish the story
                <ArrowRight size={20} weight="bold" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </StorySection>
      );
      break;

    default:
      stageContent = (
        <>
          <StorySection id="closing" className="closing-section">
            <div className="closing-image" aria-hidden="true">
              <img
                src={assetPath("family-planning.webp")}
                alt=""
                width="1586"
                height="992"
              />
            </div>
            <div className="closing-copy">
              <h2>{pageCopy.closing.title}</h2>
              <p>{pageCopy.closing.body}</p>
              <div className="closing-actions">
                <Button onClick={() => goToStage(7)}>
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
          <footer className="site-footer">
            <strong>Ready Together</strong>
            <p>{pageCopy.footer}</p>
          </footer>
        </>
      );
  }

  const activeStage = storyStages[stage];

  return (
    <div className="app-shell">
      <ProgressNavigation
        label={activeStage.label}
        current={stage + 1}
        total={storyStages.length}
        onRestart={restartStory}
      />
      <main
        ref={stageMainRef}
        className="stage-main"
        tabIndex={-1}
        aria-label={`${activeStage.label}, ${stage + 1} of ${storyStages.length}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeStage.id}
            className="stage-transition"
            initial={
              reduceMotion ? false : { opacity: 0, x: 24, filter: "blur(5px)" }
            }
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, x: -20, filter: "blur(4px)" }
            }
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() =>
              stageMainRef.current?.focus({ preventScroll: true })
            }
          >
            {stageContent}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
