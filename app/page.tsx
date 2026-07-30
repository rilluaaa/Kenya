/*
THESIS: A household plan becomes a visible path, replacing the category's institutional hero and generic feature grid.
OWN-WORLD: Sunlit paper, forest-green actions, restrained clay accents, grounded handbook cards, and original community illustration.
STORY: A family sees that preparation is shared, chooses a mode, practises decisions, and leaves with a usable plan.
FIRST VIEWPORT: Direct value statement and actions sit left of a full household-to-care scene on desktop; mobile stacks action before illustration.
FORM: Practical family handbook with a household journey path. This was the user's selected direction, staged as a true desktop workspace and a one-step mobile flow.
*/
import Link from "next/link";
import { ArrowRight, ChatCircleText, ClipboardText, Path, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { HouseholdScene } from "@/components/HouseholdScene";
import { SafetyNotice } from "@/components/SafetyNotice";

const features = [
  { icon: Path, title: "Learn through realistic stories", text: "See how one household decision can change what happens later." },
  { icon: ClipboardText, title: "Build a practical family plan", text: "Record clear roles, transport options, contacts, and remaining actions." },
  { icon: ChatCircleText, title: "Use tools during household visits", text: "Guide a conversation without creating a clinical record." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Interactive family learning</p>
            <h1 className="page-heading">Care begins at home.</h1>
            <p className="lede">Practise the decisions that help mothers and newborns receive the right care at the right time.</p>
            <div className="button-row">
              <Link className="btn btn-primary" href="/choose-mode">Start learning <ArrowRight size={20} weight="bold" /></Link>
              <Link className="btn btn-secondary" href="/quick-tools">Explore quick tools</Link>
            </div>
          </div>
          <HouseholdScene />
        </div>
      </section>

      <section className="page-wrap page-section" aria-labelledby="how-heading">
        <h2 id="how-heading" className="section-heading">A plan your household can use</h2>
        <p className="lede">Short activities turn conversation into practical next steps.</p>
        <div className="feature-list" style={{ marginTop: "1.5rem" }}>
          {features.map(({ icon: Icon, title, text }) => (
            <article className="feature-row" key={title}>
              <span className="feature-icon"><Icon size={23} weight="bold" /></span>
              <div><h3 className="text-lg font-bold">{title}</h3><p className="muted">{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap page-section" aria-labelledby="mode-preview-heading">
        <h2 id="mode-preview-heading" className="section-heading">Choose how you are using the guide</h2>
        <div className="mode-grid" style={{ marginTop: "1.5rem" }}>
          <article className="card">
            <span className="card-icon"><UsersThree size={26} weight="bold" /></span>
            <h3 className="text-xl font-bold mt-6">Women and Families</h3>
            <p className="muted mt-2">Explore practical decisions about preparation, family support, and seeking help.</p>
          </article>
          <article className="card" style={{ background: "var(--sand)" }}>
            <span className="card-icon"><ChatCircleText size={26} weight="bold" /></span>
            <h3 className="text-xl font-bold mt-6">Community Health Promoters</h3>
            <p className="muted mt-2">Use guided conversations and visual tools during household visits.</p>
          </article>
        </div>
      </section>

      <section className="page-wrap page-section"><SafetyNotice /></section>
    </>
  );
}
