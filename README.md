# Ready Together

Ready Together is a responsive, story-driven maternal and newborn health learning prototype for families in Kenya. It is designed for two or more family members to use together on one phone at home.

## Run locally

Requirements: Node.js 20 or later and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Project structure

```text
src/
  components/              Reusable story, decision, plan, and accessibility UI
  context/                 Theme, text-size, and reduced-motion preferences
  data/content.ts          Editable educational copy, choices, explanations, and checklist data
  App.tsx                  Story flow and branching state
  styles.css               Tailwind entry plus the responsive visual system
public/images/             Optimized WebP story illustrations
PRODUCT.md                 Durable product context
DESIGN.md                  Visual design-system contract
.impeccable/               Design-system sidecar and route brief
```

## Replace medically reviewed content

Edit `src/data/content.ts`. The scene labels, assumption statements, explanations, story choices, consequences, checklist items, and professional-review notice are stored as structured data rather than embedded in presentation components.

Before public use:

1. Ask qualified Kenyan maternal-health professionals to review every statement and recommended action.
2. Replace the placeholder review notice only after that review is complete.
3. Keep the experience non-diagnostic. Do not add medical history fields or automated conclusions.
4. Add Kiswahili as a separate locale data module with the same object shapes. Keep components locale-neutral.

## Replace images

Keep the existing filenames to replace artwork without changing code:

- `family-home-night.webp`: opening scene
- `readiness-table.webp`: preparation overview
- `community-plan-wide.webp`: family and Community Health Promoter
- `amina-evening.webp`: first story decision
- `transport-challenge.webp`: unavailable-driver scene
- `planning-objects.webp`: family-plan backdrop
- `journey-health-facility.webp`: story outcome
- `family-planning.webp`: closing family-plan review

Use WebP where possible, preserve the current 1586 × 992 aspect ratio for story scenes, and keep each image below roughly 400 KB for low-bandwidth phones.

## Privacy and persistence

The prototype has no backend. Readiness choices, story choices, and plan entries are saved to `sessionStorage` only. They disappear when the browser session ends. “Play the story again” resets the story decisions while preserving the family plan. The downloadable plan is created locally in the browser.

## Accessibility

The experience renders one scene at a time and moves focus to each newly revealed scene. It also includes semantic headings and landmarks, keyboard-operable controls, visible focus, large touch targets, manual text-size and motion controls, system reduced-motion support, light and dark palettes, responsive image crops, and print styling for the plan summary.
