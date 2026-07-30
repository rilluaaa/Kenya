"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, FloppyDisk, PencilSimple, Printer, ShareNetwork, Trash } from "@phosphor-icons/react";
import { birthPlanSteps, preparationItems } from "@/data/tools";
import { birthPlanToText, emptyBirthPlan, getBirthPlanCompletion } from "@/lib/birth-plan";
import { isBirthPlan, readJson, removeStoredValue, STORAGE_KEYS, writeJson } from "@/lib/storage";
import type { BirthPlan } from "@/types/content";

export function BirthPlanBuilder() {
  const [plan, setPlan] = useState<BirthPlan>(emptyBirthPlan);
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [summary, setSummary] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    const saved = readJson(STORAGE_KEYS.birthPlan, isBirthPlan);
    if (saved) { setPlan(saved); setStarted(true); }
  }, []);

  const current = birthPlanSteps[step];
  const completion = useMemo(() => getBirthPlanCompletion(plan), [plan]);
  const update = (key: keyof BirthPlan, value: string | string[]) => setPlan((existing) => ({ ...existing, [key]: value }));
  const save = (nextPlan = plan) => {
    const withDate = { ...nextPlan, updatedAt: new Date().toISOString() };
    setPlan(withDate);
    const ok = writeJson(STORAGE_KEYS.birthPlan, withDate);
    setStorageError(!ok); setMessage(ok ? "Plan saved on this device." : "This browser could not save the plan.");
    return ok;
  };
  const next = () => { save(); if (step === birthPlanSteps.length - 1) setSummary(true); else setStep((value) => value + 1); };
  const share = async () => {
    const text = birthPlanToText(plan);
    try {
      if (navigator.share) await navigator.share({ title: "Family birth plan", text });
      else { await navigator.clipboard.writeText(text); setMessage("Plan copied as plain text."); }
    } catch { setMessage("Sharing was cancelled or unavailable. Your saved plan was not changed."); }
  };
  const reset = () => { const removed = removeStoredValue(STORAGE_KEYS.birthPlan); setPlan(emptyBirthPlan); setStep(0); setSummary(false); setStarted(false); setResetConfirm(false); setStorageError(!removed); setMessage(removed ? "Plan cleared from this device." : "The plan was cleared from this screen, but browser storage could not be updated."); };

  if (!started) return <div className="empty-state"><ClipboardArt /><h1 className="section-heading mt-4">No saved plan yet</h1><p className="lede">Create an anonymous practical plan in eight short steps. You can return and edit it later on this device.</p><button className="btn btn-primary" onClick={() => setStarted(true)}>Build a plan <ArrowRight size={19} /></button></div>;

  if (summary) return (
    <div className="workspace">
      <aside className="workspace-aside"><p className="eyebrow">Family plan</p><h1 className="page-heading mt-3">Ready to review together</h1><p className="lede mt-4">{completion.complete} of {completion.total} planning sections have information.</p>{completion.missing.length > 0 && <div className="review-note mt-5"><strong>Still to confirm</strong><ul className="mt-2 list-disc pl-5">{completion.missing.map((item) => <li key={item}>{item}</li>)}</ul></div>}</aside>
      <div className="workspace-main card">
        <div className="flex justify-between items-start gap-4"><div><h2 className="section-heading">{plan.nickname || "Anonymous family plan"}</h2><p className="muted">Saved only on this device</p></div><button className="btn btn-quiet no-print" onClick={() => { setSummary(false); setStep(0); }}><PencilSimple size={19} /> Edit</button></div>
        <dl className="mt-6 grid gap-4">{[
          ["Planned place of care", plan.placeOfCare], ["Main transport", plan.mainTransport], ["Backup transport", plan.backupTransport], ["Person arranging transport", plan.transportContact], ["Support person", plan.supportPerson], ["Important contact", plan.importantContact], ["Prepared items", plan.items.join(", ")], ["Remaining actions", plan.remainingActions],
        ].map(([label, value]) => <div key={label}><dt className="font-bold">{label}</dt><dd className="muted">{value || "Still to confirm"}</dd></div>)}</dl>
        <div className="button-row mt-7 no-print"><button className="btn btn-primary" onClick={share}><ShareNetwork size={19} /> Share or copy</button><button className="btn btn-secondary" onClick={() => window.print()}><Printer size={19} /> Print</button><button className="btn btn-danger" onClick={() => setResetConfirm(true)}><Trash size={19} /> Reset</button></div>
        {resetConfirm && <div className="feedback-panel no-print"><strong>Clear this plan?</strong><p className="mt-1">This removes the plan from this device and cannot be undone.</p><div className="button-row mt-3"><button className="btn btn-danger" onClick={reset}>Yes, clear plan</button><button className="btn btn-quiet" onClick={() => setResetConfirm(false)}>Keep plan</button></div></div>}
        {message && <p className={storageError ? "error-text mt-4" : "review-note mt-4"} role="status">{message}</p>}
      </div>
    </div>
  );

  return (
    <div className="workspace">
      <aside className="workspace-aside"><p className="eyebrow">Build a Birth Plan</p><h1 className="page-heading mt-3">One useful decision at a time</h1><p className="lede mt-4">Use a nickname only if it helps identify this private plan. Do not enter medical history or an exact address.</p><div className="mt-6"><label className="field"><span className="font-bold">Optional plan nickname</span><input value={plan.nickname} onChange={(event) => update("nickname", event.target.value)} placeholder="Example: Our family plan" /></label></div><div className="mt-7"><strong>Plan at a glance</strong><dl className="mt-3 grid gap-3"><div><dt className="helper">Place of care</dt><dd className="font-semibold">{plan.placeOfCare || "Not yet added"}</dd></div><div><dt className="helper">Transport</dt><dd className="font-semibold">{plan.mainTransport || "Not yet added"}</dd></div><div><dt className="helper">Support person</dt><dd className="font-semibold">{plan.supportPerson || "Not yet added"}</dd></div></dl></div></aside>
      <div className="workspace-main card">
        <div className="flex justify-between gap-4"><div><p className="status-label">Step {step + 1} of {birthPlanSteps.length}</p><h2 className="section-heading mt-2">{current.title}</h2></div><span className="level">{completion.complete}/{completion.total} filled</span></div>
        <div className="progress-track mt-4" style={{ gridTemplateColumns: `repeat(${birthPlanSteps.length}, 1fr)` }}>{birthPlanSteps.map((item, index) => <span className="progress-node" data-complete={index <= step} key={item.id} />)}</div>
        <div className="mt-7">
          {current.type === "checklist" ? <fieldset className="field"><legend>{current.prompt}</legend><p className="helper">{current.helper}</p><div className="check-grid mt-3">{preparationItems.map((item) => <label className="check-card" key={item.id}><input type="checkbox" checked={plan.items.includes(item.label)} onChange={() => update("items", plan.items.includes(item.label) ? plan.items.filter((value) => value !== item.label) : [...plan.items, item.label])} /><span>{item.label}</span></label>)}</div></fieldset> : <label className="field"><span>{current.prompt}</span>{current.type === "textarea" ? <textarea value={String(plan[current.id as keyof BirthPlan])} onChange={(event) => update(current.id as keyof BirthPlan, event.target.value)} /> : <input value={String(plan[current.id as keyof BirthPlan])} onChange={(event) => update(current.id as keyof BirthPlan, event.target.value)} />}<span className="helper">{current.helper}</span></label>}
        </div>
        <div className="button-row mt-8"><button className="btn btn-quiet" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}><ArrowLeft size={19} /> Back</button><button className="btn btn-primary" onClick={next}>{step === birthPlanSteps.length - 1 ? <><Check size={19} /> View summary</> : <>Save and continue <ArrowRight size={19} /></>}</button><button className="btn btn-secondary" onClick={() => save()}><FloppyDisk size={19} /> Save</button></div>
        {message && <p className={storageError ? "error-text mt-4" : "review-note mt-4"} role="status">{message}</p>}
      </div>
    </div>
  );
}

function ClipboardArt() { return <span className="card-icon" style={{ marginInline: "auto" }}><Copy size={28} weight="bold" /></span>; }
