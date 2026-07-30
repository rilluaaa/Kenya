"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, WarningCircle } from "@phosphor-icons/react";
import { useApp } from "@/components/AppContext";
import { StoryScene } from "@/components/StoryScene";
import { aminaScenario } from "@/data/scenarios";
import { applyStateChanges, calculateOutcome, initialScenarioState, transportChangeMessage } from "@/lib/scenario";
import { isScenarioState, removeStoredValue, STORAGE_KEYS, writeJson } from "@/lib/storage";
import type { ScenarioState } from "@/types/content";

type HistoryEntry = { nodeId: string; state: ScenarioState };
type SavedScenario = { nodeId: string; state: ScenarioState; history: HistoryEntry[] };

function isSavedScenario(value: unknown): value is SavedScenario {
  if (!value || typeof value !== "object") return false;
  const saved = value as Partial<SavedScenario>;
  return typeof saved.nodeId === "string" && isScenarioState(saved.state) && Array.isArray(saved.history) && saved.history.every((item) => Boolean(item) && typeof item === "object" && typeof item.nodeId === "string" && isScenarioState(item.state));
}

export function ScenarioPlayer() {
  const { mode, hydrated } = useApp();
  const router = useRouter();
  const [nodeId, setNodeId] = useState(aminaScenario.startNode);
  const [scenarioState, setScenarioState] = useState(initialScenarioState);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [sceneStartState, setSceneStartState] = useState(initialScenarioState);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [feedbackShown, setFeedbackShown] = useState(false);
  const [consequence, setConsequence] = useState("");
  const [reflection, setReflection] = useState("");
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.scenario);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (isSavedScenario(parsed) && aminaScenario.nodes.some((node) => node.id === parsed.nodeId)) {
        setNodeId(parsed.nodeId); setScenarioState(parsed.state); setSceneStartState(parsed.state); setHistory(parsed.history);
      }
    } catch { setSaveError(true); }
  }, []);

  const node = useMemo(() => aminaScenario.nodes.find((item) => item.id === nodeId), [nodeId]);
  const nodeIndex = node ? aminaScenario.nodes.findIndex((item) => item.id === node.id) : -1;

  if (!hydrated) return <div className="page-wrap page-section"><div className="skeleton" style={{ height: 420 }} /></div>;
  if (!mode) return <section className="page-wrap page-section"><div className="empty-state"><h1 className="section-heading">Choose a learning mode first</h1><p className="lede">The same scene uses a different prompt for families and Community Health Promoters.</p><Link href="/choose-mode" className="btn btn-primary">Choose my mode</Link></div></section>;
  if (!node) return <section className="page-wrap page-section"><div className="empty-state"><WarningCircle size={44} /><h1 className="section-heading mt-4">This story scene is unavailable</h1><p className="lede">Saved progress did not match the current story. Restart to continue safely.</p><button className="btn btn-primary" onClick={() => { setNodeId(aminaScenario.startNode); setScenarioState(initialScenarioState); setHistory([]); }}>Restart story</button></div></section>;

  const persist = (nextNodeId: string, nextState: ScenarioState, nextHistory: HistoryEntry[]) => {
    const ok = writeJson(STORAGE_KEYS.scenario, { nodeId: nextNodeId, state: nextState, history: nextHistory });
    setSaveError(!ok);
  };

  const choose = (optionId: string) => {
    if (feedbackShown) return;
    const option = node.options.find((item) => item.id === optionId);
    if (!option) return;
    if (node.interaction === "multi") {
      setSelectedIds((current) => current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId]);
      return;
    }
    const nextState = applyStateChanges(scenarioState, option.changes);
    setScenarioState(nextState); setSelectedIds([optionId]); setConsequence(option.consequence); setReflection(option.reflection); setFeedbackShown(true);
  };

  const reviewMulti = () => {
    const selected = node.options.filter((item) => selectedIds.includes(item.id));
    const nextState = selected.reduce((current, option) => applyStateChanges(current, option.changes), scenarioState);
    setScenarioState({ ...nextState, preparednessScore: nextState.preparednessScore + Math.min(3, selected.length) });
    setConsequence(`${selected.length} practical ${selected.length === 1 ? "item is" : "items are"} now part of the family plan.`);
    setReflection("Keep selected items together and replace this prototype list with locally approved programme wording.");
    setFeedbackShown(true);
  };

  const continueStory = () => {
    if (node.interaction === "summary") {
      const result = calculateOutcome(scenarioState);
      if (!writeJson(STORAGE_KEYS.result, result)) { setSaveError(true); return; }
      removeStoredValue(STORAGE_KEYS.scenario);
      router.push("/results");
      return;
    }
    if (!node.nextNode) return;
    const nextHistory = [...history, { nodeId: node.id, state: sceneStartState }];
    persist(node.nextNode, scenarioState, nextHistory);
    setHistory(nextHistory); setNodeId(node.nextNode); setSceneStartState(scenarioState); setSelectedIds([]); setFeedbackShown(false); setConsequence(""); setReflection("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    const previous = history.at(-1);
    if (!previous) return;
    const nextHistory = history.slice(0, -1);
    setNodeId(previous.nodeId); setScenarioState(previous.state); setSceneStartState(previous.state); setHistory(nextHistory); setSelectedIds([]); setFeedbackShown(false); setConsequence(""); setReflection("");
    persist(previous.nodeId, previous.state, nextHistory);
  };

  return (
    <section className="page-wrap page-section">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <div><p className="eyebrow">Amina&apos;s Birth Plan</p><h1 className="section-heading">{node.sceneTitle}</h1></div>
        <span className="muted font-semibold">Scene {nodeIndex + 1} of {aminaScenario.nodes.length}</span>
      </div>
      <div className="progress-track" aria-label={`Scene ${nodeIndex + 1} of ${aminaScenario.nodes.length}`}>{aminaScenario.nodes.map((item, index) => <span className="progress-node" data-complete={index <= nodeIndex} key={item.id} />)}</div>
      {saveError && <p className="review-note mt-4" role="alert">Progress could not be saved on this device. You may continue, but this story could restart after closing the page.</p>}
      <div className="mt-6"><StoryScene key={node.id} node={node} mode={mode} selectedIds={selectedIds} feedbackShown={feedbackShown} consequence={consequence} reflection={reflection} contextualMessage={node.id === "circumstances-change" ? transportChangeMessage(scenarioState) : undefined} onSelect={choose} onReviewMulti={reviewMulti} onContinue={continueStory} /></div>
      <div className="mt-5 no-print"><button type="button" className="btn btn-quiet" onClick={goBack} disabled={history.length === 0}><ArrowLeft size={19} /> Previous scene</button></div>
    </section>
  );
}
