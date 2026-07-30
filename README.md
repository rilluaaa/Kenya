# Care Begins at Home

A complete mobile-first educational MVP for practical maternal and newborn health preparation in Kenya. It supports women and families, and Community Health Promoters. It does not include clinical, hospital, student, or medical-professional modes.

> The content is a prototype. Qualified Kenyan maternal-health and localisation professionals must review it before any real-world public use.

## What the MVP includes

- A responsive landing page and two-mode selection.
- A content-driven, eight-scene version of **Amina's Birth Plan** with meaningful branching and mode-specific prompts.
- Descriptive results across preparedness, communication, shared planning, and timely action.
- A locally saved Birth Plan Builder with edit, print, browser share, copy, and confirmed reset.
- Tappable Learning Cards.
- A Community Health Promoter Guided Household Visit with anonymous status summary and clear control.
- English UI with a Kiswahili fallback mode marked as awaiting professional review.
- PWA manifest, runtime service worker caching, offline indicator, and offline fallback.
- Loading, empty, invalid-data, unavailable-feature, storage-failure, and translation-fallback states.

## Target users

1. Women and Families
2. Community Health Promoters

The product focuses on planning, communication, and household decisions before or after facility care. It does not diagnose, collect medical records, or decide that a person is safe.

## Local setup

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Pushes to `main` are built and deployed to GitHub Pages by `.github/workflows/deploy-pages.yml`.
The production site is available at [https://rilluaaa.github.io/Kenya/](https://rilluaaa.github.io/Kenya/).

## Commands

```bash
npm run dev        # local development
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm test           # Vitest logic tests
npm run build      # production build
npm start          # run the production build
```

## Main routes

- `/`
- `/choose-mode`
- `/scenarios`
- `/scenarios/amina-birth-plan`
- `/quick-tools`
- `/quick-tools/birth-plan`
- `/quick-tools/learning-cards`
- `/guided-visit`
- `/results`
- `/about-safety`

## Project structure

```text
app/                 Next.js App Router pages
components/          Reusable product and interaction components
data/                Editable prototype content
lib/                 Scenario, storage, completion, and translation logic
public/              Manifest, icons, service worker, and offline fallback
tests/               Core logic tests
types/               Shared TypeScript content schema
PRODUCT.md           Durable product constraints
DESIGN.md            Durable design system
```

## Scenario content model

The schema is defined in `types/content.ts`. Each scenario node supports an ID, scene title, location, time, illustration reference, narration, dialogue, audio text alternative, decisions, consequences, learning reflection, state changes, next node, mode-specific questions, and clinical-review metadata.

`data/scenarios.ts` contains Amina's story. Runtime logic is in `lib/scenario.ts`; the UI engine is in `components/ScenarioPlayer.tsx` and `components/StoryScene.tsx`.

## Add a scenario

1. Create a `Scenario` object using the schema in `types/content.ts`.
2. Give every node a unique ID and a valid `nextNode`.
3. Provide both `family` and `chp` questions.
4. Add `reviewed`, `reviewNotes`, `sourceReference`, `locale`, and `version` metadata.
5. Add the card to `scenarioCards` and a route that supplies the scenario to the player.
6. Add tests for state changes, branches, and outcomes.

Never publish draft medical wording without local clinical review.

## Add a translation

Core UI keys live in `lib/i18n.ts`. Add the locale to the `Locale` type, provide a complete dictionary, and add it to the language selector. Scenario and tool content carries its own locale and review metadata.

Do not guess medical translations. Use English fallback and mark the locale as awaiting review until a qualified translator and Kenyan maternal-health reviewer approve it.

## PWA and offline behaviour

`public/manifest.webmanifest` provides installability metadata and project-generated placeholder icons. In production, `AppProvider` registers `public/sw.js`. The worker precaches core routes and stores successful GET responses for later use. A dedicated offline page is returned for navigation requests that are not already cached.

Service workers are not registered during development. Test PWA behaviour using a production build on `localhost` or HTTPS. The core application remains usable if service-worker registration fails.

## Privacy approach

- No accounts, backend, analytics, tracking, advertising, or external synchronisation.
- Mode, scenario progress, the latest result, an anonymous plan, and anonymous visit statuses use browser local storage.
- Saved data is validated before use. Invalid data is ignored rather than crashing the application.
- The Birth Plan avoids medical history, diagnosis, and exact address fields.
- Clearing browser data may remove progress.

## Medical-content review process

Every clinical or programme content object carries review metadata. Before public use:

1. Replace prototype wording with approved Kenyan programme content.
2. Set `reviewed` only after qualified professional approval.
3. Record the source reference, version, review notes, and locale.
4. Review all branches, consequences, audio, text alternatives, and translations together.
5. Run the full test and accessibility checks after content changes.

## Known MVP limitations

- Only Amina's Birth Plan is playable; two planned stories are intentionally marked coming soon.
- No clinical or Kiswahili content has been professionally reviewed.
- Audio controls expose transcript placeholders; recorded audio is not included.
- PWA icons are project-generated SVG placeholders and should be replaced with final brand assets.
- Local storage is device-specific and is not synchronised or encrypted.
- The service worker provides practical basic caching, not a guaranteed offline copy of every page before it has loaded.
