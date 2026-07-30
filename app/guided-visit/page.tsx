import type { Metadata } from "next";
import { GuidedVisit } from "@/components/GuidedVisit";

export const metadata: Metadata = { title: "Guided Household Visit" };
export default function GuidedVisitPage() { return <section className="page-wrap page-section"><GuidedVisit /></section>; }
