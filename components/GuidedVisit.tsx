"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, ListChecks, Trash } from "@phosphor-icons/react";
import { useApp } from "@/components/AppContext";
import { StatusSelector } from "@/components/StatusSelector";
import { guidedVisitQuestions } from "@/data/tools";
import { isGuidedVisit, readJson, removeStoredValue, STORAGE_KEYS, writeJson } from "@/lib/storage";
import type { VisitStatus } from "@/types/content";

export function GuidedVisit() {
  const { mode, hydrated, setMode } = useApp();
  const [index, setIndex] = useState(0);
  const [statuses, setStatuses] = useState<Record<string, VisitStatus>>({});
  const [summary, setSummary] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [saveError, setSaveError] = useState(false);
  useEffect(() => { const saved = readJson(STORAGE_KEYS.guidedVisit, isGuidedVisit); if (saved) setStatuses(saved); }, []);
  if (!hydrated) return <div className="skeleton" style={{ height: 420 }} />;
  if (mode !== "chp") return <div className="empty-state"><ListChecks size={44} /><h1 className="section-heading mt-4">For Community Health Promoters</h1><p className="lede">This guided conversation is only shown in Community Health Promoter mode. It does not create a clinical record.</p><button className="btn btn-primary" onClick={() => setMode("chp")}>Switch to CHP mode</button><Link href="/choose-mode" className="btn btn-quiet ml-2">Review modes</Link></div>;
  const question = guidedVisitQuestions[index];
  const setStatus = (status: VisitStatus) => { const next = { ...statuses, [question.id]: status }; setStatuses(next); setSaveError(!writeJson(STORAGE_KEYS.guidedVisit, next)); };
  const clear = () => { const removed = removeStoredValue(STORAGE_KEYS.guidedVisit); setStatuses({}); setIndex(0); setSummary(false); setConfirmClear(false); setSaveError(!removed); };
  if (summary) {
    const grouped = {
      Confirmed: guidedVisitQuestions.filter((item) => statuses[item.id] === "confirmed"),
      "Still needed": guidedVisitQuestions.filter((item) => statuses[item.id] === "incomplete" || statuses[item.id] === "unsure" || !statuses[item.id]),
      "Follow-up": guidedVisitQuestions.filter((item) => statuses[item.id] === "follow-up"),
    };
    return <><div className="card" style={{ background: "var(--green-soft)" }}><span className="status-label"><CheckCircle size={20} weight="fill" />Visit summary</span><h1 className="page-heading mt-3">A clear handover for the next conversation</h1><p className="lede mt-3">Anonymous statuses only. This is not a clinical record.</p></div><div className="summary-columns mt-6">{Object.entries(grouped).map(([title, items]) => <section className="card" key={title}><h2 className="text-xl font-bold">{title}</h2>{items.length ? <ul className="mt-3 grid gap-2">{items.map((item) => <li key={item.id}>{item.topic}</li>)}</ul> : <p className="muted mt-3">No items in this group.</p>}</section>)}</div><div className="button-row mt-6"><button className="btn btn-secondary" onClick={() => { setSummary(false); setIndex(0); }}><ArrowLeft size={19} /> Review answers</button><button className="btn btn-danger" onClick={() => setConfirmClear(true)}><Trash size={19} /> Clear this visit</button></div>{confirmClear && <div className="feedback-panel mt-4"><strong>Clear all visit progress?</strong><p>This removes the anonymous status summary from this device.</p><div className="button-row mt-3"><button className="btn btn-danger" onClick={clear}>Yes, clear visit</button><button className="btn btn-quiet" onClick={() => setConfirmClear(false)}>Keep summary</button></div></div>}</>;
  }
  return <div className="workspace"><aside className="workspace-aside"><p className="eyebrow">Guided Household Visit</p><h1 className="page-heading mt-3">A conversation, not a clinical record</h1><p className="lede mt-4">Use each prompt with the family. Save only anonymous progress on this device.</p><div className="review-note mt-6">Do not enter a name, diagnosis, medical history, or address.</div></aside><section className="workspace-main card"><div className="flex justify-between gap-4"><div><p className="status-label">Topic {index + 1} of {guidedVisitQuestions.length}</p><h2 className="section-heading mt-2">{question.topic}</h2></div><span className="level">{Object.keys(statuses).length}/{guidedVisitQuestions.length}</span></div><p className="text-lg font-semibold mt-7">{question.question}</p><div className="reflection-panel mt-4"><strong>Optional follow-up</strong><p className="mt-1">{question.followUp}</p></div><div className="mt-6"><StatusSelector value={statuses[question.id]} onChange={setStatus} /></div>{saveError && <p className="error-text mt-4" role="alert">This browser could not save visit progress.</p>}<div className="button-row mt-8"><button className="btn btn-quiet" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}><ArrowLeft size={19} /> Back</button><button className="btn btn-primary" onClick={() => index === guidedVisitQuestions.length - 1 ? setSummary(true) : setIndex((value) => value + 1)} disabled={!statuses[question.id]}>{index === guidedVisitQuestions.length - 1 ? "Create summary" : <>Next topic <ArrowRight size={19} /></>}</button></div></section></div>;
}
