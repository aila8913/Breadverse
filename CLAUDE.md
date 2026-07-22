# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

Early-stage learning project — **Breadverse (麵包星系地圖)**, a visual bread-recipe app. Given a recipe's
ingredient weights and method, it computes five normalized "flavor axes" (hydration, richness, grain
structure, fermentation time, gluten development). Two visualizations consume these axes: a 2D radar chart
per recipe (`RadarChart.tsx`), and a freely-rotatable **3D scatter map** (`Bread3DMap.tsx`, React Three
Fiber + drei) with any 3 of the 5 axes assignable to X/Y/Z, plotting saved recipes against classic-bread
reference points (baguette, focaccia, brioche, ...).

The user is learning full-stack development through building this, at a sophomore Information Management
student level. See "Collaboration style" below.

## Product philosophy (read this before proposing features or trade-offs)

Breadverse is, by the user's own definition, an **emotional (感性) product first, a technical one second**.
When experience and engineering pull in different directions, experience wins:

- The 3D galaxy map is the product's **soul and WOW point** — the name 麵包星系地圖 is a promise it
  fulfills. It is a place to *browse and be amazed*; the 2D radar is the place to *read* one recipe. Do
  not propose replacing the 3D map with something "more practical" (that mistake was made once and
  corrected). Its interaction feel is core investment, not polish.
- The first TA is the user herself: health-focused (low richness is a hard floor; sourdough/long
  fermentation is a bonus). Personal goals become **presets/lenses over the axis values**, defaulting to
  show-everything — the app never judges a bread.
- Filters in the galaxy **dim/shrink non-matching stars rather than hiding them** — night-sky metaphor:
  every bread keeps its place in the universe; a lens only changes which stars shine for *you*.
- Prefer star/galaxy language in UI copy and design discussion (亮星/暗星, 星座, 宇宙) over spreadsheet
  language (篩選條件, 資料點).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript 5.9, single package (no monorepo)
- Tailwind CSS 4
- 3D rendering: `three` + `@react-three/fiber` + `@react-three/drei` (the 3D map, `OrbitControls` for
  free rotation, `<Html>` for hover tooltips anchored to 3D points)
- Storage: **browser localStorage only** — no backend/DB yet. Deliberate choice: this is a solo-use app for
  now; a shared/community backend is explicitly a "someday, lowest priority" idea, not something to build
  toward prematurely.
- Package manager: pnpm, but **not on PATH on this machine** — use `corepack pnpm <cmd>` (see
  Volley-Tactics-Board's env notes for the same quirk; same fix applies here).

## Repo layout

```
src/app/            Next.js App Router pages (page.tsx has the recipe form + wiring)
src/components/      React components (UI layer — everything here may import from lib/bread)
  RadarChart.tsx     hand-rolled SVG radar chart, no charting library
  Bread3DMap.tsx      React Three Fiber 3D scatter map, free axis selection + OrbitControls
src/lib/bread/       core domain logic, framework-agnostic (no React/Next imports)
  types.ts           Ingredient / Recipe / RecipeMethod types
  ingredients.ts     seed ingredient DB, incl. per-ingredient water-content ratios
  percentage.ts      baker's percentage + true hydration + richness calculations
  axes.ts            combines percentage.ts output + method fields into the 5 radar axes
  axisLabels.ts       Chinese axis titles + the fixed axis order shared by every chart/table
  classicBreads.ts   reference coordinates for classic breads (map background layer)
  storage.ts         localStorage read/write for saved recipes
```

## Core domain model (read this before touching `lib/bread`)

Three of the five radar axes (`hydration`, `richness`, `grainStructure`) are **derived** from ingredient
gram amounts via `percentage.ts`/`axes.ts`. The other two (`fermentationTime`, `glutenDevelopment`) are
**not derivable from weight** — they come from `RecipeMethod` (fermentation type/hours, knead style), which
the user records directly per recipe. Don't try to back-derive these two from ingredients; that was a
deliberate modeling decision, not an oversight.

`ingredients.ts`'s `waterRatio` is what makes hydration "true"/"effective" hydration rather than naive
baker's percentage — milk, eggs, and butter all contribute water that a naive "flour/water/salt/yeast only"
calculation would miss.

## Commands

- `corepack pnpm dev` — run the dev server
- `corepack pnpm build` — production build
- `corepack pnpm typecheck` — typecheck (`tsc --noEmit`)
- `corepack pnpm lint` — ESLint

No test framework is set up yet (no vitest/jest). Core `lib/bread` logic has been manually verified via a
throwaway script (run with `corepack pnpm dlx tsx <file>` since Node's native TS type-stripping doesn't
resolve extensionless relative imports), not via an automated suite — add one before this logic grows much
further.

## Current gaps (don't assume otherwise)

- `classicBreads.ts` values are hand-estimated placeholders, not derived from real recipes — expect to
  tune them once a few real recipes have been logged.
- `Bread3DMap.tsx` hardcodes its point colors as literal hex (`#2a78d6`/`#898781`) instead of the
  `var(--chart-...)` custom properties the rest of the app uses — **Three.js's color parser can't read
  CSS custom properties** (it's not going through the DOM/CSSOM), so the 3D scene doesn't currently
  re-theme for dark mode the way the 2D chart/DOM chrome does.
- `Recipe.version` is always hardcoded to `"v1.0"` on save — recipe versioning (v1.0 → v1.1) is a later
  "Baking Journal" phase, not implemented yet.

## Bread cards (`docs/cards/*.md`) — always go through the skills

The cards are a **hand-authored seed dataset** for the graph the app doesn't have yet, not documentation.
Three skills own them; do not write or edit a card without them:

- **`bread-card`** — the authoring pipeline. Cards are written by a **fresh agent with web access**
  (`sonnet-engineer` has none), then reviewed by a **second, independent** agent, then converged.
- **`bread-history`** — verification standard for L1 origin/name claims. Food history is a
  high-misinformation domain; every claim carries a confidence level and its earliest source.
- **`bread-vocab`** — converging `outcome`/`technique` endpoints into shared nodes.

Three rules that get violated if you skip the skills:

1. **Each card starts from a blank page.** No cross-card comparison sentences inside a card
   ("法棍靠法律、它靠故事"). Real cross-card links must *emerge* from vocabulary convergence, where
   they are evidence — written by hand they are just the author's framing.
2. **L1 does not pick a `#命名/xx` category before researching.** Those tags are a byproduct of
   convergence, never the outline.
3. **One bread with genuinely different methods gets separate cards**, not an averaged one.
   Averaging two breads produces a bread that doesn't exist (this is exactly what went wrong with
   `classicBreads.ts`'s focaccia: 85% vs the traditional 55–65%).

## Collaboration style

The user is using this project to learn full-stack development end-to-end, not just to ship features:

- When running git or other shell commands, briefly explain what the command does and why.
- When writing non-trivial code, add comments explaining the *why* / underlying concept, pitched at a
  sophomore Information Management student level — assume basic programming knowledge but not deep
  familiarity with the specific tool/pattern in use.
- Don't skip past architectural decisions silently — say why, briefly, when a non-obvious choice is made.
