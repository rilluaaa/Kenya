"use client";

import { useState } from "react";
import { SpeakerHigh, X } from "@phosphor-icons/react";

export function AudioButton({ transcript }: { transcript: string }) {
  const [open, setOpen] = useState(false);
  return <div><button type="button" className="btn btn-quiet" onClick={() => setOpen((value) => !value)} aria-expanded={open}><SpeakerHigh size={20} /> Audio transcript</button>{open && <div className="review-note mt-3" role="region" aria-label="Audio transcript"><div className="flex items-start justify-between gap-3"><p>{transcript}</p><button type="button" aria-label="Close transcript" className="shrink-0" onClick={() => setOpen(false)}><X size={22} /></button></div></div>}</div>;
}
