---
name: Care Begins at Home
description: A beautiful practical family handbook for shared health preparation
colors:
  primary: "#174F3A"
  primary-strong: "#103C2C"
  accent: "#B9573F"
  paper: "#FFFDF7"
  sand: "#F3E9D7"
  ink: "#17342A"
  muted: "#596B63"
  line: "#D7D2C5"
  focus: "#F0B83F"
  illustration-sun: "#E9B85D"
  illustration-hill: "#9EB49A"
  illustration-house: "#DFB277"
  illustration-path: "#D9BC8D"
  illustration-skin-deep: "#6F402E"
  illustration-clay-light: "#D47C61"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 780
    lineHeight: 1.06
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  title:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 750
    lineHeight: 1.1
  label:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 780
    lineHeight: 1.2
rounded:
  detail: "4px"
  illustration: "10px"
  mark: "11px"
  small: "12px"
  control: "14px"
  surface: "16px"
  pill: "999px"
spacing:
  compact: "8px"
  regular: "16px"
  section: "32px"
---

# Design System: Care Begins at Home

## Overview

**Creative North Star: "The Family Action Map"**

The interface borrows from the practical materials of a household visit: an illustrated community map, a plan written together, and clear cards that can be placed, checked, and revisited. It is expressive enough to feel human but always behaves like a dependable tool.

The design rejects hospital-dashboard chrome and ornamental nostalgia. Strong type, direct language, large controls, and a path motif keep the task legible in bright daylight and on narrow screens. On desktop, task and context form a genuine two-column workspace.

**Key Characteristics:**
- Community scenes drawn as simple, original layered illustration.
- One clear primary action per view.
- Warm surfaces anchored by deep green and restrained terracotta.
- Motion explains progress and consequence, never decorates idle screens.

## Colors

The committed earth-and-forest palette follows the brief, with terracotta reserved for learning emphasis rather than alarm.

**The Calm Signal Rule.** Red is reserved for genuine errors. Terracotta never impersonates an emergency state.

## Typography

**Display Font:** System UI workhorse stack
**Body Font:** System UI workhorse stack

**Character:** Familiar, highly legible, and sturdy on common Android and desktop devices. Weight and size provide warmth and hierarchy without an institutional voice.

**The Spoken Aloud Rule.** Every label should sound natural when read during a household conversation.

## Layout

The phone layout is a single clear column with persistent safe-area-aware bottom navigation. At 900px and above, stories and tools become a two-column workspace: context and illustration on the left, the active decision or form on the right. Spacing follows a 4/8/12/16/24/32 rhythm.

## Elevation & Depth

Surfaces separate through tone, borders, and spacing. Soft green-tinted shadows appear only where a card is actionable or currently lifted above the path.

**The Grounded Surface Rule.** Nothing floats without communicating interaction or current focus.

## Shapes

Cards and fields use 16px corners; buttons use 14px corners rather than pills. Circles are reserved for people, progress nodes, and single-icon controls.

## Components

### Buttons
- **Shape:** Tactile rectangle with 14px corners and a minimum 48px height.
- **Primary:** Homestead green with off-white text.
- **Hover / Focus:** Darkens on hover, moves down one pixel on press, and receives a high-contrast double focus ring.

### Cards / Containers
- **Corner Style:** Grounded 16px corners.
- **Background:** Sunlit Paper or Woven Sand.
- **Shadow Strategy:** Tinted shadow only for actionable cards.
- **Border:** One subtle Dust Line border when needed.

### Inputs / Fields
- **Style:** White or paper field, visible border, 14px corners, label above.
- **Focus:** Deep green border and external focus ring.
- **Error / Disabled:** Text and icon cues accompany colour.

### Navigation
- **Style:** Compact desktop header and four-item mobile bottom navigation. Active state uses both shape and text weight.

### Journey Path

A connected sequence of numbered nodes shows story position and cause-and-effect without presenting an exam score.

## Do's and Don'ts

### Do:
- **Do** make every decision and plan step operable with a 44px or larger target.
- **Do** pair icons and colour with plain text status.
- **Do** keep the household path motif useful as a progress and journey device.

### Don't:
- **Don't** use glass, neon, frightening imagery, or clinical dashboard patterns.
- **Don't** present educational outcomes as medical success or failure.
- **Don't** use long unbroken text, tiny metadata, decorative motion, or stereotypes.
