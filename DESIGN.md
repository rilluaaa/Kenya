---
name: Ready Together
description: A warm, tactile family preparation story for maternal and newborn health.
colors:
  forest: "#173F35"
  forest-deep: "#102E28"
  terracotta: "#B65032"
  terracotta-deep: "#8E3B25"
  sage: "#899879"
  ochre: "#D8A43B"
  ochre-bright: "#E2B75E"
  paper: "#F6EDDA"
  paper-deep: "#E8D7B8"
  charcoal: "#26312D"
  night-ink: "#0B211D"
  white-ink: "#FFF9EE"
typography:
  display:
    fontFamily: "Archivo Variable, Arial, sans-serif"
    fontSize: "clamp(3.3rem, 5.2vw, 5.2rem)"
    fontWeight: 650
    lineHeight: 0.93
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Archivo Variable, Arial, sans-serif"
    fontSize: "clamp(2.7rem, 6vw, 5.8rem)"
    fontWeight: 680
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo Variable, Arial, sans-serif"
    fontSize: "clamp(1.3rem, 2vw, 1.9rem)"
    fontWeight: 650
    lineHeight: 1.3
  body:
    fontFamily: "Atkinson Hyperlegible, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Atkinson Hyperlegible, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.02em"
  label-small:
    fontFamily: "Atkinson Hyperlegible, Arial, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1.1
rounded:
  hairline: "2px"
  detail: "4px"
  xs: "8px"
  sm: "12px"
  control: "14px"
  panel: "22px"
  scene: "30px"
  organic: "110px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.white-ink}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  card:
    backgroundColor: "{colors.white-ink}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.panel}"
    padding: "24px"
---

# Design System: Ready Together

## Overview

**Creative North Star: "The Family Planning Table"**

The interface behaves like a family gradually placing decisions, contacts, and responsibilities onto one shared table. Tactile paper surfaces and full-width illustrated scenes make preparation feel human and collective, while strong editorial type keeps every step legible on a small phone.

The supplied screen-printed illustration set is visual authority. Interface texture is quieter than the artwork, with restrained grain, broad color fields, and a single terracotta action color.

**Key Characteristics:**

- Full-bleed illustrated story scenes with deliberate crops.
- Large, compact sans-serif headlines and highly legible body copy.
- Decision cards that feel placed and handled, not scored.
- Day-to-night narrative pacing inside one coherent material world.

## Colors

Forest carries trust and structure; terracotta is reserved for primary action; sage and ochre indicate discussion and attention without right-or-wrong judgment; paper tones keep long reading calm.

**The Action Color Rule.** Terracotta is the only primary interactive accent. Ochre and sage communicate state but never compete as primary buttons.

## Typography

**Display Font:** Archivo Variable (with Arial fallback)

**Body Font:** Atkinson Hyperlegible (with Arial fallback)

**Character:** Archivo provides compact editorial authority without making public-health content feel institutional. Atkinson Hyperlegible supports shared-phone reading and ambiguous letter recognition.

## Layout

The story uses a mobile-first single column. On desktop, scenes become asymmetric editorial spreads with 12-column placement, oversized image crops, and quiet margins. Each decision collapses to one focused mobile screen with content above thumb-reachable controls. Primary containers cap at 1440px.

## Elevation & Depth

Depth comes from overlapping paper planes, tinted ambient shadows, and image crops. Cards remain flat at rest; hover and selected states lift by no more than 3px. Pure black shadows and luminous glows are not used.

## Shapes

Buttons use 14px corners, decision surfaces use 22px, and major image scenes use 30px. These three roles remain consistent. Organic clipped backgrounds may use asymmetric radii, but controls never become pills.

## Components

### Buttons

Terracotta primary buttons use warm white text, a 14px radius, visible forest focus ring, and a small pressed translation. Secondary buttons use a forest outline on paper.

### Cards / Containers

Decision cards use warm white or sage-tinted paper, one quiet border, and 22px corners. Selected states change the surface and border together and always include an icon plus text.

### Inputs / Fields

Labels always sit above fields. Inputs use paper-white surfaces, charcoal text, 14px corners, and a high-contrast forest focus outline.

### Navigation

The compact top bar shows the product name, a word-based journey state, and accessibility controls. It remains one line on desktop and reduces to essential controls on mobile.

## Do's and Don'ts

### Do:

- **Do** let the illustrations carry emotional tone and environment.
- **Do** show readiness through language such as Ready, Discussed, Needs discussion, and Needs a backup.
- **Do** keep all consequences supportive and reversible.
- **Do** preserve generous tap targets and visible focus.

### Don't:

- **Don't** use scores, countdowns, red-versus-green correctness, or celebratory game effects.
- **Don't** add unsupported cultural motifs outside the supplied illustrations.
- **Don't** turn scenes into small decorative thumbnails or dashboard tiles.
- **Don't** use glass, neon, medical stock photography, or charity-campaign tropes.
