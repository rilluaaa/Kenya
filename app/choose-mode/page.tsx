import type { Metadata } from "next";
import { ModeSelector } from "@/components/ModeSelector";

export const metadata: Metadata = { title: "Choose your mode" };

export default function ChooseModePage() {
  return <section className="page-wrap page-section"><p className="eyebrow">Two ways to use the guide</p><h1 className="page-heading">Who are you learning with?</h1><p className="lede mt-4">You can change this later. Your choice only changes which prompts and tools are most prominent.</p><div className="mt-8"><ModeSelector /></div></section>;
}
