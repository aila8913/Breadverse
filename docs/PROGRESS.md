# Progress Snapshot

> This is a **live snapshot**, not a log — overwrite the "Current state" section at the end of each
> work session instead of appending to it. For static repo layout/commands/domain model, see `CLAUDE.md`.
> For permanent history of *why* things changed, use commit messages once this repo is under git.

_Last updated: 2026-07-07 (session: built the first real UI on top of the domain layer from the prior
session. Shipped a recipe form (ingredient lines + method fields) wired live to
`computeBakersPercentages`/`computeRadarAxes`, plus a 2D `RadarChart` (SVG, hand-rolled per the dataviz
skill's mark/color specs) with an optional classic-bread comparison overlay. Then pivoted per user
feedback: tried a "健康指標" (health score) panel highlighting 3 derived metrics (whole-grain %,
fermentation-naturalness, leanness), but the user asked for something more ambitious — a freely-rotatable
**3D scatter map** (`Bread3DMap.tsx`, React Three Fiber + drei) plotting saved recipes + classic-bread
references in 3D space, with all 3 axes freely selectable from the 5 radar axes (not fixed to the health
metrics). The health panel was removed (`health.ts`/`HealthPanel.tsx` deleted) since the 3D map superseded
it. `git init` was done in the previous session; this session's work is being committed and pushed to
`https://github.com/aila8913/Breadverse.git` for the first time.)_

## Current state

- **Project scaffolded**: `breadverse/` is a plain Next.js 16 (App Router) + TypeScript + Tailwind app.
  Not a monorepo — single package, no backend.
- **Storage decision**: localStorage only for now (`src/lib/bread/storage.ts`). No backend/DB. A future
  shared/community feature was explicitly named "someday, lowest priority" by the user — not being
  designed toward yet.
- **Domain/calculation layer** (`src/lib/bread/`): `types.ts`, `ingredients.ts` (effective-hydration
  decomposition), `percentage.ts` (baker's %, true hydration, richness), `axes.ts` (`computeRadarAxes`,
  now taking a `RadarInput` = `Pick<Recipe, "lines" | "method">` rather than a full `Recipe`, so the form
  can preview axes before a recipe is saved/has an id), `axisLabels.ts` (Chinese labels + axis order,
  shared by every chart/table), `classicBreads.ts` (hand-estimated reference coordinates — not derived
  from real data yet).
- **UI, first pass, done**:
  - `src/app/page.tsx` — recipe entry form (ingredient picker + gram lines, fermentation/knead method
    fields), live baker's-percentage table, save/load/delete against `localStorage` (`storage.ts`).
  - `src/components/RadarChart.tsx` — hand-rolled SVG pentagon radar (no charting library), supports a
    second "reference" series (muted gray, no fill) for comparing against a classic bread. Has a
    table-view twin (accessibility requirement per the dataviz skill).
  - `src/components/Bread3DMap.tsx` — **the current centerpiece.** React Three Fiber + drei `Canvas`,
    `OrbitControls` for free rotation, three independent axis-select dropdowns (any of the 5 radar axes on
    X/Y/Z), plots saved recipes (blue) + classic-bread references (gray) + the live in-progress draft as
    points in 3D space, hover tooltips via `<Html>`, plus a table-view twin. **Known gap:** point colors
    are hardcoded light-mode hex (`#2a78d6`/`#898781`) because Three.js's color parser can't read CSS
    `var(--...)` custom properties — the 3D scene doesn't yet re-theme for dark mode the way the 2D
    radar/DOM chrome does.
- No test framework installed. The calc layer was sanity-checked with a one-off script (this session and
  last), not automated tests — worth adding before the logic grows further.
- Git: repo initialized last session; this session's commit is the first one pushed to a real GitHub
  remote (`https://github.com/aila8913/Breadverse.git`).

## Next up (not started)

- Dark-mode-aware colors for the 3D map (read the CSS custom properties via `getComputedStyle`/a
  `prefers-color-scheme` listener, since Three.js can't consume `var(--...)` directly).
- Recipe versioning (v1.0/v1.1/...) + crumb-shot photo upload (Baking Journal) — later phase per original
  spec; `version` is currently always hardcoded to `"v1.0"`.
- Consider whether the 2D `RadarChart` and the 3D map should both stay, or whether one should become the
  primary "explore" view and the other a secondary/detail view.
