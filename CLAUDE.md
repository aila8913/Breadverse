# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

Early-stage learning project — **Breadverse (麵包星系地圖)**, a visual bread-recipe app. Given a recipe's
ingredient weights and method, it computes five normalized "flavor axes" (hydration, richness, grain
structure, fermentation time, gluten development) and plots them as a radar chart per recipe, and as points
on a 2D scatter map (any two axes as X/Y) so recipes can be compared against each other and against
classic breads (baguette, focaccia, brioche, ...).

The user is learning full-stack development through building this, at a sophomore Information Management
student level. See "Collaboration style" below.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript 5.9, single package (no monorepo)
- Tailwind CSS 4
- Storage: **browser localStorage only** — no backend/DB yet. Deliberate choice: this is a solo-use app for
  now; a shared/community backend is explicitly a "someday, lowest priority" idea, not something to build
  toward prematurely.
- Package manager: pnpm, but **not on PATH on this machine** — use `corepack pnpm <cmd>` (see
  Volley-Tactics-Board's env notes for the same quirk; same fix applies here).

## Repo layout

```
src/app/            Next.js App Router pages
src/lib/bread/       core domain logic, framework-agnostic (no React/Next imports)
  types.ts           Ingredient / Recipe / RecipeMethod types
  ingredients.ts     seed ingredient DB, incl. per-ingredient water-content ratios
  percentage.ts      baker's percentage + true hydration + richness calculations
  axes.ts            combines percentage.ts output + method fields into the 5 radar axes
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
- `corepack pnpm exec tsc --noEmit` — typecheck (no dedicated `typecheck` script yet)
- `corepack pnpm lint` — ESLint

No test framework is set up yet (no vitest/jest). Core `lib/bread` logic has been manually verified via a
throwaway script (run with `corepack pnpm dlx tsx <file>` since Node's native TS type-stripping doesn't
resolve extensionless relative imports), not via an automated suite — add one before this logic grows much
further.

## Current gaps (don't assume otherwise)

- No UI yet for recipe entry, radar chart, or scatter map — only the calculation layer (`src/lib/bread/`)
  exists so far. `src/app/page.tsx` is still the default Next.js scaffold page.
- No git repo initialized yet in this folder.
- `classicBreads.ts` values are hand-estimated placeholders, not derived from real recipes — expect to
  tune them once a few real recipes have been logged.

## Collaboration style

The user is using this project to learn full-stack development end-to-end, not just to ship features:

- When running git or other shell commands, briefly explain what the command does and why.
- When writing non-trivial code, add comments explaining the *why* / underlying concept, pitched at a
  sophomore Information Management student level — assume basic programming knowledge but not deep
  familiarity with the specific tool/pattern in use.
- Don't skip past architectural decisions silently — say why, briefly, when a non-obvious choice is made.
