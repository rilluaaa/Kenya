import { ArrowDownRight } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { assetPath } from "../assetPath";
import { useAccessibility } from "../context/AccessibilityContext";
import { pageCopy } from "../data/content";

export function HeroScene({ onStart }: { onStart: () => void }) {
  const { reduceMotion } = useAccessibility();

  return (
    <section id="opening" className="hero-scene" aria-labelledby="hero-title">
      <div className="hero-copy">
        <motion.p
          className="eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {pageCopy.hero.eyebrow}
        </motion.p>
        <motion.h1
          id="hero-title"
          aria-label={pageCopy.hero.title}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>{pageCopy.hero.titleLineOne}</span>
          <span>{pageCopy.hero.titleLineTwo}</span>
        </motion.h1>
        <motion.p
          className="hero-support"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {pageCopy.hero.body}
        </motion.p>
        <motion.button
          type="button"
          className="button button-primary hero-button"
          onClick={onStart}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          {pageCopy.hero.action}
          <ArrowDownRight size={22} weight="bold" aria-hidden="true" />
        </motion.button>
      </div>
      <motion.figure
        className="hero-visual"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, clipPath: "inset(8% 8% 8% 8% round 28px)" }
        }
        animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0px)" }}
        transition={{ duration: 1.05, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={assetPath("family-home-night.webp")}
          alt="Amina and Nia sit together at home at night with their prepared bag and family planning cards nearby"
          width="1586"
          height="992"
          fetchPriority="high"
        />
        <figcaption>{pageCopy.hero.caption}</figcaption>
      </motion.figure>
    </section>
  );
}
