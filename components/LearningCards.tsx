"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, HouseLine, Path, PhoneCall, UsersThree } from "@phosphor-icons/react";
import { AudioButton } from "@/components/AudioButton";
import { learningCards } from "@/data/tools";

const icons = { house: HouseLine, road: Path, people: UsersThree, phone: PhoneCall, home: HouseLine };

export function LearningCards() {
  const [index, setIndex] = useState(0);
  const card = learningCards[index];
  const Icon = icons[card.illustration as keyof typeof icons];
  return <div className="learning-shell"><div className="learning-card"><div><div className="card-illustration"><Icon size={72} weight="duotone" /></div><p className="eyebrow mt-6">{card.category}</p><h1 className="section-heading mt-2">{card.title}</h1><p className="lede mt-3">{card.text}</p><div className="reflection-panel mt-5"><strong>Talk about it</strong><p className="mt-1">{card.question}</p></div></div><div className="mt-6"><AudioButton transcript="Audio is not included in this prototype. A reviewed recording and matching transcript can be added to the content data." /><div className="button-row mt-4 justify-between"><button className="btn btn-quiet" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}><ArrowLeft size={19} /> Previous</button><button className="btn btn-primary" onClick={() => setIndex((value) => Math.min(learningCards.length - 1, value + 1))} disabled={index === learningCards.length - 1}>Next card <ArrowRight size={19} /></button></div></div></div><div className="card-dots" aria-label={`Card ${index + 1} of ${learningCards.length}`}>{learningCards.map((item, itemIndex) => <span key={item.id} className="card-dot" data-active={itemIndex === index} />)}</div><p className="review-note mt-5">Prototype learning wording awaits qualified Kenyan clinical review.</p></div>;
}
