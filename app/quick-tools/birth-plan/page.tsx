import type { Metadata } from "next";
import { BirthPlanBuilder } from "@/components/BirthPlanBuilder";

export const metadata: Metadata = { title: "Birth Plan Builder" };
export default function BirthPlanPage() { return <section className="page-wrap page-section"><BirthPlanBuilder /></section>; }
