import type { Metadata } from "next";
import { ScenarioPlayer } from "@/components/ScenarioPlayer";

export const metadata: Metadata = { title: "Amina's Birth Plan" };
export default function AminaScenarioPage() { return <ScenarioPlayer />; }
