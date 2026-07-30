"use client";

import { ArrowRight, Check, MapPin, Sun, UserCircle } from "@phosphor-icons/react";
import { AudioButton } from "@/components/AudioButton";
import { HouseholdScene } from "@/components/HouseholdScene";
import type { ScenarioNode, UserMode } from "@/types/content";

type StorySceneProps = {
  node: ScenarioNode;
  mode: UserMode;
  selectedIds: string[];
  feedbackShown: boolean;
  consequence: string;
  reflection: string;
  contextualMessage?: string;
  onSelect: (id: string) => void;
  onReviewMulti: () => void;
  onContinue: () => void;
};

export function StoryScene({ node, mode, selectedIds, feedbackShown, consequence, reflection, contextualMessage, onSelect, onReviewMulti, onContinue }: StorySceneProps) {
  const isMulti = node.interaction === "multi";
  const isSummary = node.interaction === "summary";
  return (
    <div className="workspace">
      <aside className="workspace-aside" aria-label="Story setting">
        <HouseholdScene compact variant={node.illustration} />
        <div className="mt-5">
          <div className="flex gap-4 flex-wrap muted text-sm font-semibold">
            <span className="inline-flex items-center gap-1"><MapPin size={18} />{node.location}</span>
            <span className="inline-flex items-center gap-1"><Sun size={18} />{node.time}</span>
          </div>
          <p className="mt-4">{node.narration}</p>
          {node.dialogue && <blockquote className="dialogue"><strong className="inline-flex items-center gap-1"><UserCircle size={19} />{node.dialogue.speaker}</strong><p className="mt-1">“{node.dialogue.text}”</p></blockquote>}
        </div>
      </aside>
      <div className="workspace-main">
        <section className="card" aria-labelledby="scene-question">
          <h2 id="scene-question" className="section-heading">{node.questions[mode]}</h2>
          {node.modeText?.[mode] && <p className="muted mt-2">{node.modeText[mode]}</p>}
          {contextualMessage && <p className="review-note mt-4">{contextualMessage}</p>}
          {!isSummary && (
            <div className="decision-list" role={isMulti ? "group" : "radiogroup"} aria-label={node.questions[mode]}>
              {node.options.map((option) => {
                const selected = selectedIds.includes(option.id);
                return <button key={option.id} type="button" className="decision-option" data-selected={selected} onClick={() => onSelect(option.id)} disabled={feedbackShown} role={isMulti ? "checkbox" : "radio"} aria-checked={selected}><span className="option-marker"><Check size={15} weight="bold" /></span><span>{option.label}</span></button>;
              })}
            </div>
          )}
          {isMulti && !feedbackShown && <button type="button" className="btn btn-primary mt-4" onClick={onReviewMulti} disabled={selectedIds.length === 0}>Review selected items</button>}
          {feedbackShown && <><div className="feedback-panel" role="status"><strong>What happens next</strong><p className="mt-1">{consequence}</p></div><div className="reflection-panel"><strong>Learning reflection</strong><p className="mt-1">{reflection}</p></div></>}
          {(feedbackShown || isSummary) && <button type="button" className="btn btn-primary mt-5" onClick={onContinue}>{isSummary ? "See my result" : <>Continue story <ArrowRight size={19} weight="bold" /></>}</button>}
          <div className="mt-5"><AudioButton transcript={node.audioText} /></div>
        </section>
      </div>
    </div>
  );
}
