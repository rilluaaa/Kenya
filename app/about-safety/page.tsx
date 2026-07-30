import type { Metadata } from "next";
import { DeviceMobile, FirstAid, LockKey, Translate } from "@phosphor-icons/react/dist/ssr";
import { safetyContent } from "@/data/tools";

export const metadata: Metadata = { title: "Safety and privacy" };

const sections = [
  { icon: FirstAid, title: safetyContent.title, points: safetyContent.points },
  { icon: LockKey, title: "Private by design", points: ["Progress and plans are stored on the current device.", "The prototype does not send data to a server.", "Do not enter medical histories, diagnoses, or an exact residential address.", "Clearing browser data can remove saved progress."] },
  { icon: Translate, title: "Content review", points: ["English prototype copy is not clinically approved.", "Kiswahili medical content is not supplied and is not guessed.", "The language switch shows English fallback marked as awaiting review.", "Structured content files allow approved wording to replace prototype text."] },
];

export default function SafetyPage() {
  return <section className="page-wrap page-section"><p className="eyebrow">Safety and privacy</p><h1 className="page-heading">Know what this prototype can do</h1><p className="lede mt-4">Use it to support preparation and conversation, never to decide that someone is medically safe.</p><div className="mt-8 grid gap-4">{sections.map(({ icon: Icon, title, points }) => <article className="card" key={title}><div className="flex gap-4 items-start"><span className="card-icon shrink-0"><Icon size={27} weight="bold" /></span><div><h2 className="text-xl font-bold">{title}</h2><ul className="mt-3 grid gap-2">{points.map((point) => <li className="flex gap-2" key={point}><DeviceMobile className="mt-1 shrink-0" size={18} aria-hidden="true" /><span className="muted">{point}</span></li>)}</ul></div></div></article>)}</div></section>;
}
