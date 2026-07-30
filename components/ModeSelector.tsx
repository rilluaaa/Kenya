"use client";

import { useRouter } from "next/navigation";
import { ChatCircleText, Check, UsersThree } from "@phosphor-icons/react";
import { useApp } from "@/components/AppContext";
import type { UserMode } from "@/types/content";

const modes = [
  { id: "family" as const, icon: UsersThree, title: "I am learning with my family", description: "Explore practical decisions about birth preparation, family support, and seeking help." },
  { id: "chp" as const, icon: ChatCircleText, title: "I am supporting a family", description: "Use guided conversations and visual tools during household visits." },
];

export function ModeSelector() {
  const { mode, setMode } = useApp();
  const router = useRouter();
  const choose = (nextMode: UserMode) => { setMode(nextMode); router.push(nextMode === "chp" ? "/guided-visit" : "/scenarios"); };
  return (
    <div className="mode-grid">
      {modes.map(({ id, icon: Icon, title, description }) => (
        <button key={id} type="button" className="card card-action mode-card" data-selected={mode === id} onClick={() => choose(id)}>
          <span className="card-icon">{mode === id ? <Check size={27} weight="bold" /> : <Icon size={27} weight="bold" />}</span>
          <span><strong className="text-xl block">{title}</strong><span className="muted block mt-2">{description}</span></span>
          <span className="status-label">{mode === id ? "Selected. Choose again to continue" : "Choose this mode"}</span>
        </button>
      ))}
    </div>
  );
}
