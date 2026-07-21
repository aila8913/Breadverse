# Progress Snapshot

> This is a **live snapshot**, not a log — overwrite the "Current state" section at the end of each
> work session instead of appending to it. For static repo layout/commands/domain model, see `CLAUDE.md`.
> For permanent history of *why* things changed, use commit messages. **For the backlog of
> planned-but-not-done work, see GitHub Issues** (`gh issue list --repo aila8913/Breadverse`), not this file.

_Last updated: 2026-07-21 (session: **no product code — an external-precedent study session**. Read
Marble (withmarble.com, its `/curriculum` knowledge graph, and the open-sourced
[os-taxonomy](https://github.com/withmarbleapp/os-taxonomy) — 1,590 micro-topics as pure JSON) as a
precedent for organizing domain knowledge. Filed **#22–#24**. Headline: the user extended #14's "代價"
edge type — **cost has no unit yet**. 「揉更久」is simultaneously *time* and *skill*, and those are not
interchangeable; so cost needs currencies (time / skill / equipment), and **difficulty becomes a derived
node metric** (the sum of incoming edge costs, mirroring Marble's computed `centrality`) rather than a
hand-assigned star rating. Difficulty being currency-split is what lets #7's lens grow a second dimension.
Also noted: our edges lack `strength` (hard/soft) and don't treat the `--` text as a first-class `reason`
field, and `classicBreads.ts` vs `docs/cards/*.md` disagree in provenance with no `source`/`confidence` to
make that visible. No prior conclusions overturned. See the earlier 2026-07-17 entry below for the
pattern-language work, and the 2026-07-16 model-shape gate, which still stands.)_

_2026-07-17 (session: **no product code — a documentation/analysis session**. Consulted
fable-advisor for a **pattern-language analysis** of the whole app in Christopher Alexander's six-part
frame (Context / Forces / Problem / Solution / Resulting Context), saved as `docs/pattern-language.md`
(shipped in PR #20). It collapses the philosophy scattered across CLAUDE.md / this file / memory into
**8 named patterns** grouped into two chains — an **emotional-universe chain** (P1 3D galaxy is the soul
→ P2 filters dim stars, never hide → P6 sliders annotate, never score) and a **rigorous-model chain**
(P3 hybrid modeling → P4 true hydration → P8 framework-free domain core). Headline insight: **the five
axes are the single seam where the two chains meet** — to the model they're a projection of a graph, to
the galaxy they're star coordinates — so the #15 refactor's real risk is tearing that seam. That warning
is filed as a comment on #15. No issues opened/closed — every insight already mapped to an existing one.
The 2026-07-16 model-shape gate (below) still stands and still gates most work.)_

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
- **Bread cards** (`docs/cards/法棍.md`, `布里歐.md`, `潘娜朵尼.md` — committed in `2400708`):
  pure-text md, no artifact/visual treatment (the user explicitly rejected that). Written in a notation
  the user designed: `#軸/程度` tags with exact figures in the annotation, `+` for element addition, `--`
  for links, `!` for L5 hand-knowledge, coordinate **ranges** (not points — range width *is* the fuzz).
  These are **not documentation** — the user's annotation says the notation exists "希望給系統更好的讀取
  資料", i.e. **the cards are a hand-authored seed dataset for a graph the app doesn't have yet.** Every
  fact in them was fetched and is sourced at the bottom of each card; `classicBreads.ts`'s hand-estimated
  values were *not* trusted as input.
- No test framework installed. The calc layer was sanity-checked with a one-off script (this session and
  last), not automated tests — worth adding before the logic grows further.
- **Pattern-language doc** (`docs/pattern-language.md`, committed in `40768ca` / PR #20): the design
  rationale behind the product philosophy, in Alexander's frame — 8 patterns, two chains, and the
  five-axis seam. Read it before proposing structural changes; it explains *why* the current shape holds.
- **Edge schema** (`docs/edge-schema.md`, issue #23): the data shape for the cards' `--` links —
  `kind`/`strength`/`reason`/hyperedge `from`, plus all 14 existing card edges encoded as a validation
  pass. **Spec only; nothing in `src/` implements it yet** (that's #15). Read it before touching #19 or #22.
- Git: repo initialized 2026-07-06; currently on `master`, working tree clean. Remote:
  `https://github.com/aila8913/Breadverse.git`.

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
  盒子長怎樣"). If it holds, the five axes become a projection and #16 stops being a bug. **Before doing
  this, read the seam warning** (comment on #15, derived in `docs/pattern-language.md`): the five axes are
  where the emotional-universe chain and the rigorous-model chain meet, so the new graph model must still
  project a stable "view for the galaxy" or `Bread3DMap` / `RadarChart` break.
- #16 (fermentation saturates at 100 — panettone ≡ a 24h sourdough), #17 (no axis is a *result*), #18
  (`RecipeMethod` has no equipment field at all, and 水合 has no home in `kneadStyle`) — all wait on #15.
- #19 (constellations: L1-only cross-card links, e.g. viennoiserie-for-the-rich vs pain-for-the-people)
  is independent of the *#14→#15* chain. Its schema prerequisite (#23) is now **done** — but doing #23
  surfaced a worse blocker: **the cards contain zero cross-card edges**, so #19 is short of content, not
  of fields. More cards first.

**From the 2026-07-21 Marble study — a second small chain, all about edges:**

> **#23 (edge schema) precedes #22 (cost currencies) precedes the difficulty lens in #7.**

- **#22 — 代價 needs currencies; difficulty is derived, not assigned.** Extends #14's三型別: 「代價」is a
  quantity with no unit. Split into `time` / `skill` (the cards' `!` marks) / `equipment` (#18), then
  compute difficulty from incoming edge costs instead of hand-rating stars. Currency-split difficulty is
  what makes "我今天只有 2 小時" and "我是新手但不趕時間" two different star maps over one dataset.
  **Caveat found while doing #23: the three cards contain exactly _one_ 代價 edge.** Designing a currency
  system on a single sample is premature — write more cards first.
- **#23 — DONE (spec only, no code): `docs/edge-schema.md`.** Edges get `kind` (#14's three types) +
  `strength` (hard/soft) + `reason` + a `from` **array** (the cards' `+` is a hyperedge). Validated by
  encoding all 14 `--` edges in the three cards — every one fit, no field was missing. `types.ts` was
  deliberately **not** touched: that's #15, still behind the model-shape gate.
  Three findings that came out of the encoding, not out of the design:
  - Endpoints are **four** kinds, not just axes: `axis` / `bread` / `outcome` / `technique`. This dissolves
    #14's "懸空的邊" — panettone's `-- pasta madre` edges do have a source, it just isn't an axis.
  - Panettone's incoming edges are **all hard**; baguette's only `soft` edge is the shaping one. The cards'
    prose ("物理給的模糊空間≈0" vs "翻車了還是麵包") is now a machine-visible fact — a first sketch of #22's
    derived difficulty.
  - **There is not a single cross-card edge in the data.** #19's constellations are missing *content*, not
    a schema. That reorders #19: write more cards before building the constellation view.
- **#24 — extract the knowledge layer to `data/*.json` with `source` + `confidence`.** Not urgent, but it
  changes how `classicBreads.ts` should be written today: cards cite sources per number, `classicBreads`
  cites nothing, and that difference is currently invisible from the code. With `confidence`, the galaxy
  can honestly render guessed stars hazier.

Older backlog, unaffected: #1–#4 (3D map interaction feedback), #7 (health preset — but see #17: it
currently has to use richness as a proxy because nutrition isn't an axis), #8 (normalization math — #16 is
a concrete instance of it), #9 (five-axis ontology — #15 reopens it), #10 (tests), #11 (dark-mode 3D
colors — Three.js can't read `var(--...)`), #12 (recipe versioning; `version` is still hardcoded `"v1.0"`).

**Design rules established this session that aren't issues** (they belong in `CLAUDE.md` / memory):
sliders are **annotated, not scored** — no green "correct" zone, no red "wrong" zone; **the app has no
fail state** (the same belief as "filters dim stars, never hide them"); 知識的嚴謹 yes, 規訓的嚴謹 no;
在卡片裡，不重要 ≠ 刪掉 — the story layer goes last but stays complete.
