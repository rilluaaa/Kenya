"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowClockwise, ArrowRight, CheckCircle, Flag, ListChecks } from "@phosphor-icons/react";
import { isScenarioResult, readJson, removeStoredValue, STORAGE_KEYS } from "@/lib/storage";
import type { ScenarioResult } from "@/types/content";

export function ResultsView() {
  const [result, setResult] = useState<ScenarioResult | null | undefined>(undefined);
  useEffect(() => { setResult(readJson(STORAGE_KEYS.result, isScenarioResult)); }, []);
  if (result === undefined) return <div className="skeleton" style={{ height: 420 }} />;
  if (!result) return <div className="empty-state"><ListChecks size={44} /><h1 className="section-heading mt-4">No recent story result</h1><p className="lede">Complete Amina&apos;s Birth Plan to see how the household decisions connected.</p><Link href="/scenarios/amina-birth-plan" className="btn btn-primary">Start the story</Link></div>;
  return (
    <>
      <div className="card" style={{ background: "var(--green-soft)" }}><span className="status-label"><CheckCircle size={20} weight="fill" />Story complete</span><h1 className="page-heading mt-4">{result.outcome}</h1><p className="lede mt-3">This describes the preparation in the learning story. It is not a medical grade or prediction.</p></div>
      <section className="mt-8" aria-labelledby="dimensions-heading"><h2 id="dimensions-heading" className="section-heading">Four parts of the plan</h2><div className="score-grid mt-4">{Object.entries(result.dimensions).map(([name, value]) => <div className="score-item" key={name}><strong>{name}</strong><span className="level" data-level={value}>{value}</span></div>)}</div></section>
      <section className="workspace mt-8">
        <div className="card"><h2 className="text-xl font-bold">What you handled well</h2><ul className="mt-4 grid gap-3">{result.strengths.map((strength) => <li className="flex gap-2" key={strength}><CheckCircle className="shrink-0 mt-1" size={21} color="var(--green)" weight="fill" /><span>{strength}</span></li>)}</ul></div>
        <div className="card" style={{ background: "var(--clay-soft)" }}><h2 className="text-xl font-bold">One priority to improve</h2><p className="mt-3">{result.priority}</p></div>
      </section>
      <section className="mt-8"><h2 className="section-heading">Your decision journey</h2><div className="journey">{result.journey.map((item, index) => <div className="journey-item" key={item}><span className="journey-node">{index + 1}</span><span>{item}</span></div>)}</div></section>
      <div className="button-row mt-8 no-print"><Link href="/scenarios/amina-birth-plan" className="btn btn-secondary" onClick={() => removeStoredValue(STORAGE_KEYS.scenario)}><ArrowClockwise size={19} /> Replay scenario</Link><Link href="/quick-tools/birth-plan" className="btn btn-primary">Open birth plan <ArrowRight size={19} /></Link><Link href="/scenarios" className="btn btn-quiet"><Flag size={19} /> All stories</Link></div>
    </>
  );
}
