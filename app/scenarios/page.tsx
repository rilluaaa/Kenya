import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, LockSimple } from "@phosphor-icons/react/dist/ssr";
import { scenarioCards } from "@/data/scenarios";

export const metadata: Metadata = { title: "Learning stories" };

export default function ScenariosPage() {
  return (
    <section className="page-wrap page-section">
      <p className="eyebrow">Learning stories</p><h1 className="page-heading">Practise decisions before they are needed</h1>
      <p className="lede mt-4">Each story shows what happens next, explains the practical effect, and gives a short reflection.</p>
      <div className="scenario-grid mt-8">
        {scenarioCards.map((scenario) => {
          const available = scenario.status === "Available";
          const body = (
            <article className={`card ${available ? "card-action" : ""} h-full`} style={!available ? { background: "var(--sand)" } : undefined}>
              <span className="status-label">{available ? <Clock size={18} /> : <LockSimple size={18} />}{available ? scenario.duration : scenario.status}</span>
              <h2 className="section-heading mt-5">{scenario.title}</h2>
              <div className="topic-list">{scenario.topics.map((topic) => <span className="topic" key={topic}>{topic}</span>)}</div>
              {available && <span className="status-label mt-8">Open story <ArrowRight size={18} /></span>}
              {!available && <p className="muted mt-6">This planned story is intentionally unavailable in the MVP.</p>}
            </article>
          );
          return available ? <Link href={`/scenarios/${scenario.id}`} key={scenario.id}>{body}</Link> : <div key={scenario.id} aria-disabled="true">{body}</div>;
        })}
      </div>
    </section>
  );
}
