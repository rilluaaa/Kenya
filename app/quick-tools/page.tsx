import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CardsThree, ClipboardText, ListChecks } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = { title: "Quick tools" };

const tools = [
  { href: "/quick-tools/birth-plan", icon: ClipboardText, title: "Build a Birth Plan", text: "Create, save, print, and share an anonymous practical plan." },
  { href: "/quick-tools/learning-cards", icon: CardsThree, title: "Learning Cards", text: "Use short visual prompts for a family conversation." },
  { href: "/guided-visit", icon: ListChecks, title: "Guided Household Visit", text: "A structured conversation flow for Community Health Promoters." },
];

export default function QuickToolsPage() {
  return <section className="page-wrap page-section"><p className="eyebrow">Quick tools</p><h1 className="page-heading">Useful during a real conversation</h1><p className="lede mt-4">Everything stays on this device. No account or personal medical record is created.</p><div className="tools-grid mt-8">{tools.map(({ href, icon: Icon, title, text }) => <Link href={href} className="card card-action" key={href}><span className="card-icon"><Icon size={27} weight="bold" /></span><h2 className="text-xl font-bold mt-6">{title}</h2><p className="muted mt-2">{text}</p><span className="status-label mt-6">Open tool <ArrowRight size={18} /></span></Link>)}</div></section>;
}
