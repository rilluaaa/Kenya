import type { Metadata } from "next";
import { LearningCards } from "@/components/LearningCards";

export const metadata: Metadata = { title: "Learning Cards" };
export default function LearningCardsPage() { return <section className="page-wrap page-section"><LearningCards /></section>; }
