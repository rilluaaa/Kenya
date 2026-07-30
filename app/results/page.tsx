import type { Metadata } from "next";
import { ResultsView } from "@/components/ResultsView";

export const metadata: Metadata = { title: "Story result" };
export default function ResultsPage() { return <section className="page-wrap page-section"><ResultsView /></section>; }
