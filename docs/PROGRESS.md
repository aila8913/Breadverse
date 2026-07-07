# Progress Snapshot

> This is a **live snapshot**, not a log — overwrite the "Current state" section at the end of each
> work session instead of appending to it. For static repo layout/commands/domain model, see `CLAUDE.md`.
> For permanent history of *why* things changed, use commit messages once this repo is under git.

_Last updated: 2026-07-07 (session: scaffolded the Next.js project and built the core domain/calculation
layer — `src/lib/bread/{types,ingredients,percentage,axes,classicBreads,storage}.ts`. Verified the math
manually with a baguette-style and a brioche-style example recipe via a throwaway `tsx` script (deleted
after use) — numbers landed in the expected quadrants (lean/low-richness vs rich/high-richness). No UI
built yet.)_

## Current state

- **Project scaffolded**: `breadverse/` is a plain Next.js 16 (App Router) + TypeScript + Tailwind app,
  created via `create-next-app`. Not a monorepo — single package, no backend. Not yet a git repo.
- **Storage decision**: localStorage only for now (`src/lib/bread/storage.ts`). No backend/DB. A future
  shared/community feature was explicitly named "someday, lowest priority" by the user — not being
  designed toward yet.
- **Domain/calculation layer done** (`src/lib/bread/`):
  - `types.ts` — `IngredientDef`, `Recipe`, `RecipeMethod`, etc.
  - `ingredients.ts` — seed ingredient DB (flours, water, milk, eggs, butter/oil, sugar, salt, yeast,
    levain/old-dough), each with a `waterRatio` for effective-hydration decomposition.
  - `percentage.ts` — `computeBakersPercentages` (flour-basis baker's %), `computeTrueHydration`,
    `computeRichness`.
  - `axes.ts` — `computeRadarAxes`, combining the three percentage-derived axes with two
    method-derived axes (fermentation time from yeast/starter type + hours; gluten development from
    knead style) into the 5-axis `RadarAxes` shape used by both the radar chart and the scatter map.
  - `classicBreads.ts` — hand-estimated reference coordinates for baguette/focaccia/brioche/bagel/
    sourdough/shokupan, for the map's background layer. **Not derived from real data — expect to revisit.**
- **No UI yet.** `src/app/page.tsx` is still the default `create-next-app` scaffold. Nothing renders a
  recipe form, radar chart, or scatter map yet.
- No test framework installed. The calc layer was sanity-checked with a one-off script, not automated
  tests — worth adding before the logic grows further.

## Next up (not started)

- Recipe entry form (ingredient picker + gram inputs) wired to `computeBakersPercentages`/`computeRadarAxes`.
- Radar chart component for a single recipe.
- Scatter map component with switchable X/Y axes, classic breads plotted as reference points, saved
  recipes plotted as user "stars".
- Recipe versioning + crumb-shot photo upload (Baking Journal) — later phase per original spec.
