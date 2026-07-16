# Progress Snapshot

> This is a **live snapshot**, not a log — overwrite the "Current state" section at the end of each
> work session instead of appending to it. For static repo layout/commands/domain model, see `CLAUDE.md`.
> For permanent history of *why* things changed, use commit messages. **For the backlog of
> planned-but-not-done work, see GitHub Issues** (`gh issue list --repo aila8913/Breadverse`), not this file.

_Last updated: 2026-07-16 (session: **no code written — this was a modeling session**, and it ended by
finding that the five axes may be the wrong shape of model. Consulted an advisor panel (Hamelman /
Modernist Bread / ChainBaker) on ingredient function, verified the user's guessed oil→yeast linkage (it's
4 steps: oil coats starch → amylase can't reach it → no sugar → yeast starves, plus a second path where oil
coats yeast cells directly), and found a real contradiction between flavor and health on the same slider
(ChainBaker: butter wins volume + flavor at 10% fat held constant / 2025 JAMA Internal Medicine, n=221,054:
butter highest intake = 15% higher mortality, plant oils = 16% lower). Co-derived a **five-layer model** with
the user — L1 命名 (culture's named regions; the arrow is nominal, not causal) / L2 參數 (the sliders) /
L3 結果 (mouthfeel, flavor, staling, nutrition) / L4 勾稽 (how params become results) / L5 手 (tacit
knowledge; **never a slider**) — plus an explanation layer (the 7 disciplines) that lives on the *edges*,
not as nodes. Then wrote three bread cards in the user's own notation (`docs/cards/`, uncommitted) as a
seed dataset, and annotating them surfaced six issues (#14–#19). Headline: the user's annotation
`//#上色 #快 #烘焙溫度 #低` implies results and equipment are nodes too — which makes **the five axes a
*view* of a graph, not the model itself** (#15).)_

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
- **Bread cards** (`docs/cards/法棍.md`, `布里歐.md`, `潘娜朵尼.md` — **uncommitted as of this writing**):
  pure-text md, no artifact/visual treatment (the user explicitly rejected that). Written in a notation
  the user designed: `#軸/程度` tags with exact figures in the annotation, `+` for element addition, `--`
  for links, `!` for L5 hand-knowledge, coordinate **ranges** (not points — range width *is* the fuzz).
  These are **not documentation** — the user's annotation says the notation exists "希望給系統更好的讀取
  資料", i.e. **the cards are a hand-authored seed dataset for a graph the app doesn't have yet.** Every
  fact in them was fetched and is sourced at the bottom of each card; `classicBreads.ts`'s hand-estimated
  values were *not* trusted as input.
- No test framework installed. The calc layer was sanity-checked with a one-off script (this session and
  last), not automated tests — worth adding before the logic grows further.
- Git: repo initialized 2026-07-06; currently on branch `product-identity` with **PR #13 open**
  (philosophy/README/marketing page). Remote: `https://github.com/aila8913/Breadverse.git`.

## Next up

See `gh issue list --repo aila8913/Breadverse` for the live backlog.

**The model may be the wrong shape, and that now gates most other work.** The 2026-07-16 session filed
#14–#19 with an explicit dependency chain — respect it rather than picking whichever looks easiest:

> **#14 blocks #15, and #15 blocks #16 / #17 / #18.**

- **#14 — do this one first; it's the only one of the six that's unblocked.** The card notation's `--`
  currently carries three different meanings (因果 / 代價 / 前提), so no machine can read it. The stated
  method is **count before naming**: pull every `--` out of `docs/cards/*.md` and see how many kinds
  actually occur, *then* name them. Until edges have types, reification has nowhere to go and `+`
  (a hyperedge — two sources, one edge, which neither RDF nor property graphs support natively) has
  nothing to hang on.
- **#15 — the structural one. Don't touch `types.ts` before #14 has an answer** ("先知道要放什麼，再決定
  盒子長怎樣"). If it holds, the five axes become a projection and #16 stops being a bug.
- #16 (fermentation saturates at 100 — panettone ≡ a 24h sourdough), #17 (no axis is a *result*), #18
  (`RecipeMethod` has no equipment field at all, and 水合 has no home in `kneadStyle`) — all wait on #15.
- #19 (constellations: L1-only cross-card links, e.g. viennoiserie-for-the-rich vs pain-for-the-people)
  is independent of the chain and is the one that feeds the 3D galaxy directly.

Older backlog, unaffected: #1–#4 (3D map interaction feedback), #7 (health preset — but see #17: it
currently has to use richness as a proxy because nutrition isn't an axis), #8 (normalization math — #16 is
a concrete instance of it), #9 (five-axis ontology — #15 reopens it), #10 (tests), #11 (dark-mode 3D
colors — Three.js can't read `var(--...)`), #12 (recipe versioning; `version` is still hardcoded `"v1.0"`).

**Design rules established this session that aren't issues** (they belong in `CLAUDE.md` / memory):
sliders are **annotated, not scored** — no green "correct" zone, no red "wrong" zone; **the app has no
fail state** (the same belief as "filters dim stars, never hide them"); 知識的嚴謹 yes, 規訓的嚴謹 no;
在卡片裡，不重要 ≠ 刪掉 — the story layer goes last but stays complete.
