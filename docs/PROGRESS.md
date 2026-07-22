# Progress Snapshot

> This is a **live snapshot**, not a log — overwrite the "Current state" section at the end of each
> work session instead of appending to it. For static repo layout/commands/domain model, see `CLAUDE.md`.
> For permanent history of *why* things changed, use commit messages. **For the backlog of
> planned-but-not-done work, see GitHub Issues** (`gh issue list --repo aila8913/Breadverse`), not this file.

_Last updated: 2026-07-22 (session: **no product code — five bread cards written as a seed dataset**.
BV-004/005 (巧巴達/免揉麵包) then BV-006/007/008 (酸種鄉村/可頌/佛卡夏), plus the `bread-vocab` skill.
Method: main session researches and cites every fact (`sonnet-engineer` has no web access), agent
structures the card, Opus reviews. **Cross-card edges 0 → 10, so #19 is unblocked.** Headline findings:
`glutenDevelopment` is a **second axis broken the same way** `fermentationTime` is (both measure input,
every L3 measures output, nothing connects them — feeds #15); **richness records how much fat but never
where it sits**, and croissant falsifies brioche's supposedly-hard 「油 shorten 麵筋」 edge by having
*more* butter and *higher* gluten — the edge isn't wrong, it has an unwritten precondition the schema
can't hold; the dataset's **first negative edge** (sourdough's acid cuts gluten) shows fermentation↔gluten
is an inverted U, not monotonic; and `classicBreads.ts`'s focaccia is **~20 points off** (85 vs a
traditional 55–65). See the entry below for the Marble study this batch was built on.)_

_2026-07-21 (session: **no product code — an external-precedent study session**. Read
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
- **Bread cards** (`docs/cards/` — 法棍/布里歐/潘娜朵尼 in `2400708`; **巧巴達 BV-004 + 免揉麵包 BV-005**,
  then **酸種鄉村 BV-006 + 可頌 BV-007 + 佛卡夏 BV-008**, all added 2026-07-21 — eight of a planned ten):
  pure-text md, no artifact/visual treatment (the user explicitly rejected that). Written in a notation
  the user designed: `#軸/程度` tags with exact figures in the annotation, `+` for element addition, `--`
  for links, `!` for L5 hand-knowledge, coordinate **ranges** (not points — range width *is* the fuzz).
  These are **not documentation** — the user's annotation says the notation exists "希望給系統更好的讀取
  資料", i.e. **the cards are a hand-authored seed dataset for a graph the app doesn't have yet.** Every
  fact in them was fetched and is sourced at the bottom of each card; `classicBreads.ts`'s hand-estimated
  values were *not* trusted as input.
  **BV-004/005 were written to generate cross-card edges** (there were zero). They produced three, plus
  two findings worth more than the cards themselves:
  - **`glutenDevelopment` is a second broken axis, and it breaks the same way `fermentationTime` did.**
    It is a plain alias for `kneadStyle` (`KNEAD_SCORE[...]`), so no-knead scores 10 and ciabatta 40 while
    both actually reach 60–75. Filed as a comment on #17. One broken axis was a special case; two broken
    the same way (**every axis measures input, every L3 measures output, nothing connects them**) is a
    model-shape problem — feeds #15.
  - **#22 now has three samples and they oppose each other**: no-knead is *time-expensive, skill-cheap*;
    ciabatta is the clean mirror (*skill-expensive, time-cheap*); brioche is value-unchanged-cost-raised.
    That mirror pair is the strongest argument yet that difficulty cannot collapse to one star rating.
  - **Cross-card (constellation) edges have no `kind`.** #14's 因果/代價/前提 were counted from
    *intra*-card edges only, so bread↔bread edges fall outside all three. Two instances exist now — per
    #14's own rule (**先數再命名**) that is not yet enough to name a fourth type. Revisit after the
    remaining eight cards.
  - Two new naming sources appeared: `#命名/商業` (a registered trademark, 1982) and `#命名/媒體`.

  **BV-006/007/008 (the second batch) produced four more findings, two of which hit `src/` directly:**
  - **`classicBreads.ts`'s focaccia entry is wrong by ~20 points.** It carries `hydration: 85`, but
    traditional focaccia genovese is **55–65%** (Del Conte 65, Hazan 66.7); 85 is a modern high-hydration
    adaptation. The star is plotted in the wrong place today. Flagged on the card; **not fixed in code**
    (that's a #24/#8 change, and the file's other five entries have never been audited either).
  - **Richness records *how much* fat, never *where* the fat is — and the "where" is what decides the
    outcome.** Brioche mixes it into the dough (shortens gluten), croissant locks it in cold layers
    (gluten stays high *despite more butter than brioche*), focaccia pours it on the surface (never touches
    gluten at all). All three read as one number. **Croissant is the falsifying case for brioche's
    supposedly-hard edge 「油 shorten 麵筋」** — that edge isn't wrong, it has an unwritten precondition
    (*the fat must be mixed in*), and `edge-schema.md` has **nowhere to put a precondition**. That is a
    third judgment case beyond 「這張卡錯了 / 換個看法而已」 — feeds #23 and #15.
  - **The first negative edge in the dataset**: 酸種鄉村's `#發酵/極高 -- 酸活化蛋白酶，切斷麵筋 -- #麵筋`.
    Every other edge so far reads "more → more". **Fermentation vs gluten is an inverted U, not monotonic**,
    and the two axes are currently computed as independent bars that cannot fight. Compounds #16.
  - **#22 gains a fourth currency: temperature control** (croissant's lamination collapses the moment the
    butter warms). Time / skill / equipment / **temperature** — and the same card shows richness's cost
    depends on fat *placement*, not fat *quantity*.
  - Cross-card edges: **3 → 10.** #19 now has content. Two new naming sources: `#命名/生產條件`
    (the village's shared oven set the loaf size and the sourness — 酸種鄉村) and `#命名/傳說`
    (croissant's shape-tells-you-the-fat "law", which the CNBPF says does not exist — the *disproved* kind;
    pairs with brioche's fake story as fake-law vs fake-story). Focaccia adds a twist to `#命名/法律`:
    **the famous one has no protection and the protected one (Focaccia di Recco col formaggio, EU
    2015/39) is a different food entirely** — and unlike the Décret Pain, an IGP regulates *place*, not
    *recipe*.
- **`bread-vocab` skill** (`.claude/skills/bread-vocab/SKILL.md`): the rubric for deciding whether two
  `outcome`/`technique` endpoints are the same node. Stance: **judge by mechanism (製程原理), not by
  sensory wording** — a working baker's frame. Seven rules; the load-bearing ones are R5 (a continuum is
  one node with two poles, so 老化快/放得久 merge and the cards connect), R6 (`polarity: quality|defect`,
  which does **not** conflict with no-fail-state — the craft may name defects, the app never scores the
  baker), and R7 (**when unsure, do not merge** — merging is hard to undo, splitting is cheap).
  It also records the decision **not** to use ML for this: at a few dozen terms a human is more accurate,
  and externally-trained labels would normalize away the user's own wording, which is the product's value.
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
  is independent of the *#14→#15* chain. Its schema prerequisite (#23) is **done**, and the content
  blocker it surfaced (**zero cross-card edges**) is now cleared: eight cards carry **10** of them.
  **#19 is unblocked** — the constellations are in the data, waiting for a view. Two remaining cards
  (from the ten-card plan: 貝果 / 白吐司 / 德式裸麥 / 史多倫 / 酒釀桂圓 — pick two) would also settle
  whether bread↔bread edges need a fourth `kind`.

**From the 2026-07-21 Marble study — a second small chain, all about edges:**

> **#23 (edge schema) precedes #22 (cost currencies) precedes the difficulty lens in #7.**

- **#22 — 代價 needs currencies; difficulty is derived, not assigned.** Extends #14's三型別: 「代價」is a
  quantity with no unit. Split into `time` / `skill` (the cards' `!` marks) / `equipment` (#18), then
  compute difficulty from incoming edge costs instead of hand-rating stars. Currency-split difficulty is
  what makes "我今天只有 2 小時" and "我是新手但不趕時間" two different star maps over one dataset.
  **Update (BV-006/007/008): a fourth currency — _temperature control_ (croissant), plus the finding that
  richness's cost depends on where the fat sits, not how much there is.**
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
