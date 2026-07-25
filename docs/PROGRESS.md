# Progress Snapshot

> This is a **live snapshot**, not a log — overwrite the "Current state" section at the end of each
> work session instead of appending to it. For static repo layout/commands/domain model, see `CLAUDE.md`.
> For permanent history of *why* things changed, use commit messages. **For the backlog of
> planned-but-not-done work, see GitHub Issues** (`gh issue list --repo aila8913/Breadverse`), not this file.

_Last updated: 2026-07-25 (session: **#31 done — focaccia split into two cards via the full pipeline**.
Executed `bread-card`'s P3 ("averaging two breads makes a bread that doesn't exist"). `佛卡夏.md` → renamed
**`佛卡夏（熱那亞）.md`** (BV-008, traditional 55–65% hydration) and a brand-new **`佛卡夏（現代高水版）.md`**
(BV-009, 75–95%) written by the three-stage pipeline (web-enabled writer → independent reviewer → `bread-vocab`
converge). The two share a `#family/佛卡夏` tag and a **sourced provenance edge** both directions (2006
Lahey/Bittman no-knead → 2017–2020 Samin Nosrat / Bon Appétit brought high-hydration into home baking — P1's
allowed sourced-causal-edge exception, not a hand-written comparison). **`classicBreads.ts`'s single wrong
`focaccia`/`hydration:85` slot is now two honest stars** — `focaccia-genovese` (h60) + `focaccia-modern` (h82);
both consumers `.map` over the array and `page.tsx`'s `.find` is null-guarded, so no id was hardcoded. Review
caught two writer errors: a fudged Bon Appétit hydration (~95% written as "80%+" to keep a tidy range → range
widened to 75–95, confirmed still ONE bread) and a flipped grain axis (`#麥種/低` → `/高`; grainStructure 0=全麥,
100=純白, so white flour is HIGH). `vocabulary.md` converged to **nine cards**: two new stars `盤底鋪油`
(4th oil position) + `底部油煎`. **New finding filed as #36** (richness axis records oil *amount*, not
*position* — and position is what decides the outcome); card + code carry only a pointer to it, not the
analysis (N2). Uncommitted at session end, on branch `docs/split-focaccia-p3`.)_

_2026-07-25 (session: **no product code — #33 card structure cleanup, pure cut-and-move, no research**.
Applied `bread-card`'s N1/N2 to the eight cards. **N1**: removed the「你的濾鏡」section from all seven cards
that still had one (潘娜朵尼 was already clean); the one line worth keeping — 可頌's「濾鏡只決定哪幾顆為你
發亮，不決定哪幾顆存在」— was moved to `pattern-language.md` Pattern 2 as product-voice copy, not deleted.
**N2**: removed the two `KNEAD_SCORE` critique blocks (免揉麵包, 巧巴達) and folded them into one comment on
**#17** (they are the same finding: `glutenDevelopment` is named like an output but implemented as an input —
the formula gives no-knead 10 / ciabatta 40 while both actually reach 60–75). Each card's L2 keeps a one-line
pointer (「見 issue #17」) instead of the deleted `⚠️ 見下` — a pointer explaining *why the number looks like
this* is data; the analysis is not. Both acceptance greps in #33 now return empty. **One residual left for #30**:
免揉麵包 still has an「issue #22 的乾淨實例…法棍反過來」line — same N2/P1 nature but outside #33's scope and
tangled with an L1 rewrite, so it goes with the #30 L1 pass. Uncommitted at session end.)_

_2026-07-22 下午 (session: **no product code — the card-authoring process itself got rebuilt**.
PR #27 merged; #28 was auto-closed by GitHub when its base branch was deleted and **cannot be reopened**
(`Cannot change the base branch of a closed pull request`), so it was rebased and re-filed as **#29**, merged.
Then the user rejected the current card-writing method wholesale and specified a new one, now encoded as
**two new skills**: `bread-history` (food-origin verification — evidence tiers A–E, six failure modes,
a technology-date gate table, four confidence levels) and `bread-card` (a **three-stage pipeline**:
a fresh web-capable agent researches+writes → a **second, independent** agent re-verifies without seeing
the first one's sources → `bread-vocab` converges). Ran it end-to-end on BV-003 潘娜朵尼 as a single-card
trial. **The headline is not the card, it's the process failure it exposed**: the user had already written
「每張卡片是獨立的」 as an inline note on BV-002 back in the first card batch, and the following six cards
violated it anyway — **feedback that lives only on a card does not reach the next execution**, which is
exactly why it is now a skill plus a CLAUDE.md section. Three new issues (#30 #31 #32), decisions recorded
on #7 and #16. **BV-003 went 148 → 72 lines.** See the entry below for the batch this was built on.)_

_2026-07-22 上午 (session: **no product code — five bread cards written as a seed dataset**.
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
  then **酸種鄉村 BV-006 + 可頌 BV-007 + 佛卡夏**, all added 2026-07-21; **佛卡夏 split into BV-008 熱那亞
  + BV-009 現代高水版 on 2026-07-25 (#31)** — nine cards now):
  pure-text md, no artifact/visual treatment (the user explicitly rejected that). Written in a notation
  the user designed: `#軸/程度` tags with exact figures in the annotation, `+` for element addition, `--`
  for links, `!` for L5 hand-knowledge, coordinate **ranges** (not points — range width *is* the fuzz).
  These are **not documentation** — the user's annotation says the notation exists "希望給系統更好的讀取
  資料", i.e. **the cards are a hand-authored seed dataset for a graph the app doesn't have yet.** Every
  fact in them was fetched and is sourced at the bottom of each card; `classicBreads.ts`'s hand-estimated
  values were *not* trusted as input.
  **All eight cards had the「你的濾鏡」lens section removed (2026-07-25, #33)** — a lens is a computation over
  the data, not data; it now lives only in the app layer (#7) and its product-voice example in
  `pattern-language.md` P2.
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
  - **`classicBreads.ts`'s focaccia entry — FIXED 2026-07-25 (#31).** It used to carry a single
    `hydration: 85`, which averaged the traditional genovese (**55–65%**, Del Conte 65 / Hazan 66.7) with
    a modern high-hydration adaptation into a star plotted where no focaccia exists. Now two entries:
    `focaccia-genovese` (h60) + `focaccia-modern` (h82). **The file's other five entries are still
    hand-estimated and unaudited** (that audit remains #8/#24).
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
- **Vocabulary table** (`docs\vocabulary.md`, 2026-07-22; **BV-009 merged in 2026-07-25**): the raw
  `outcome`/`technique` endpoint strings across BV-001…009, converged to **46 nodes** by applying the
  `bread-vocab` rules. BV-009 added two stars: `盤底鋪油` (a 4th oil-position technique) and `底部油煎`
  (an outcome — focaccia now sits at both ends of 殼脆度). `id` for machines, `label`+`aka` preserve every card's original
  wording verbatim — **not one card was edited**. Three things it exposed:
  - **Only 9 of 24 outcome nodes are actually reachable by an edge**; the other 15 live in L3 prose with
    nothing pointing at them. The five flavor stars (乳脂香/蛋黃香/麥香/橄欖油香/堅果調) have **zero**
    incoming edges even though every cause is known. The cards record results without recording causes.
  - **Converging generated constellation lines that were invisible before**: `老化速度` now links
    BV-001/002/003/006 *with two opposing mechanisms* (fat locks water vs acid inhibits mold); `整形`
    links five cards and will be the most expensive node in #22's derived difficulty; `蒸氣` connects
    BV-001's steam oven to BV-005's lidded dutch oven (**two cards solving one problem**).
  - **Two endpoints are not nodes at all** — `12–18 小時` is a *value* and `#麵筋 的「達成成本」↑` is a
    *cost*; both got forced into endpoint position because the schema has nowhere else to put them. With
    croissant's unwritten precondition, **`edge-schema.md` is missing three fields: `cost` / `value` /
    `precondition`.** → #22, #23
  - **All five judgment calls were settled the same day** and are recorded *with their background and
    counter-examples* in §5, so they don't get re-litigated. Two set precedent beyond their own case:
    - **The table is deliberately flat — grouping uses `tags`, never a parent node.** Bread taxonomy
      isn't a clean tree (`lievito-madre` is both 預發酵種 and 天然酵種); a hierarchy would force it to
      pick one parent. Reach for `tags` first from here on.
    - **R3 merges "different reference layers of one thing", not "cause and countermeasure".**
      `油混入麵團` (physics: fat blocks gluten linking) stays separate from `加油時機` (the human
      response: develop gluten first, then add cold butter). Decisive reason: **#22 hangs cost on stars,
      and physics costs nothing** — merging would attach a skill cost to a node that can't have one.
  - Process note: the user is a **complete beginner at baking** (≠ her dev level) and asked to be given
    background before being asked to decide. `bread-vocab`'s discipline #2 now requires: plain-language
    meaning → **a counter-example that settles it** → consequences → recommendation → *then* ask. The
    factual half ("is this the same mechanism?") is the assistant's job, not hers.
- **Card-authoring skills** (`.claude/skills/`, 2026-07-22 下午 — **read these before touching any card**;
  they are also summarized in `CLAUDE.md` so they cannot be missed):
  - **`bread-card`** — the pipeline and the card spec. Three principles: **P1 every card starts from a
    blank page** (no cross-card comparison sentences *inside* a card — real cross-card links must *emerge*
    from vocabulary convergence, where they are evidence rather than the author's framing); **P2 L1 does
    not pick a `#命名/xx` tag before researching** (same logic as「詞彙表是卡片的副產物」); **P3 one bread
    with genuinely different methods gets separate cards** — *averaging two breads produces a bread that
    doesn't exist*, which is precisely what happened to focaccia. Plus **N1** (the「你的濾鏡」section does
    not belong in a card — a lens is a computation over the data, and hand-writing the answer means the
    card can only ever have one lens), **N2** (project-level findings go to Issues, not cards), and
    **W1–W5** (time labels on every L5 step; explicit subjects; causality written 因為…所以…; use the
    card's own `--` notation instead of meta-prose explaining editorial decisions; **real units, not
    normalized scores**).
  - **`bread-history`** — origin/history verification. Evidence tiers **A** (contemporaneous primary:
    dialect dictionaries, guild/tax records, manuscripts, gazette texts) down to **E** (recipe blogs,
    brand sites — **zero weight**, and a brand's own origin story is marketing, not a source). Six failure
    modes: H1 folk etymology / H2 invented tradition / H3 marketing myth / **H4 anachronism** (the
    strongest tool — a dated technology-gate table: cheap sugar ~1801+, industrial yeast ~1860s, roller
    milling ~1870–80s, domestic refrigeration ~1920–30s…; a claim needing a technology that didn't exist
    yet is dead without needing a counter-source) / H5 single-source echo / **H6 a real custom hijacked by
    a fake origin**. Output: every claim carries `確證 / 可能 / 流傳但無據 / 已否證` **plus its earliest
    source** — and a debunking must state *why*, since a reason can be overturned by a later card but a
    verdict cannot. **This is where #24's `source`/`confidence` first lands.**
  - ⚠️ **Do not write or edit cards in the main session.** The main session has read the other cards and
    will import their framing. That is what P1 exists to prevent.
- **BV-003 潘娜朵尼 rewritten** (2026-07-22 下午, **148 → 72 lines**) as the first pipeline trial:
  - The three-agent run worked, **and the review caught real errors in both directions**: the reviewer
    found five factual mistakes (a 1599 ledger quantity, a dictionary edition off by 25 years, an
    unsupported etymology candidate, a wrong article number, and「小麥」smuggled in from an 18th-century
    paraphrase of a 15th-century Latin line that never mentions grain) — **and the writer, re-checking,
    correctly rejected one of the reviewer's own corrections** (the reviewer dated a manuscript to the
    1470s; its author died in 1464). Neither agent was right by default.
  - **The user's verdict on the 65-line L1 was「其他我大概都沒興趣看下去」.** The single line she did want
    was the 1814 dictionary's sensory description (奶油、糖、葡萄乾) — **concrete, imaginable**. Rule
    derived: *do the verification in full, write it short; verification effort goes into not being wrong,
    not into displaying the process.*
  - **The story layer's bar is `確證`, not「好聽」.** Shown a story block labelled「收在這裡是因為好聽，
    不是因為可信」, she replied「**那就刪掉**」— so anything that can only reach `流傳但無據` is deleted by
    default. 「特色」(ingredients / how to eat / how it keeps) is *fact*, not story, and stays.
  - Answered baking question, now recorded in `vocabulary.md`: **`輕盈度` is density, not total weight** —
    a panettone weighs ~1 kg yet is the lightest bread in the set, because it proofs to roughly the size
    of a small basketball. Using total weight would make it simultaneously the heaviest and the lightest.
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
- Git: repo initialized 2026-07-06; on `master`, synced with origin. Remote:
  `https://github.com/aila8913/Breadverse.git`. **Stacked-PR gotcha learned the hard way:** merging the
  lower PR and deleting its branch **auto-closes the PR stacked on it, and a closed PR's base cannot be
  changed** — so retarget the upper PR to `master` *first* (`gh pr edit <n> --base master`), then merge
  the lower one. Recovery is a rebase (git skips the patch-identical commit) plus re-filing.

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

**From the 2026-07-22 下午 process rebuild — the card backlog:**

- **#30 — retrofit the eight cards' L1s.** Six exact cross-card comparison lines are listed in the issue,
  plus the requirement that every historical claim carry a confidence level and its earliest source.
  **BV-003 is already done** and is the worked example. Run it through `bread-card`, not by hand.
- **#31 — DONE 2026-07-25 (pending ship on `docs/split-focaccia-p3`).** Focaccia split into BV-008 熱那亞
  + BV-009 現代高水版, `#family/佛卡夏` tag, sourced provenance edge, `classicBreads.ts` split into two stars,
  vocab converged. Will close via the PR merge.
- **#36 — NEW 2026-07-25: richness axis records oil _amount_, not _position_.** Surfaced writing BV-009 —
  the same "richness can't see where the fat sits" hole that brioche/croissant/focaccia collectively expose
  (see the BV-006/007/008 finding above), now with a 4th data point (focaccia pours oil on the pan *and*
  surface, invisible to the axis). Waits on #15's model shape, same as #17.
- **#32 — 模糊空間 and 容錯 are two independent quantities**, moved out of BV-003 under N2. Panettone is
  the clean counter-example (legal latitude loose, physical latitude ≈ 0) and **the one place where
  「怎麼翻車都能吃」fails** — that doesn't make the belief wrong, it marks its boundary. Feeds #22:
  if difficulty is computed from incoming edge costs, **physical latitude is the cost source, legal
  latitude is not**; mixing them under-rates panettone.
- **#16 has a direction now: store fermentation in real hours, not a 0–100 score.** BV-003's L2 already
  reads `72–120 小時`. Consequences recorded on the issue: the axes stop sharing a unit, so the radar/3D
  views need a display-layer mapping (log scale is the natural pick, **but that's a drawing decision, not
  a data decision** — which is exactly #15's「軸是 view」), and **the data must store the true value** or
  changing the mapping later means recomputing everything.
- **#7 gains a rule: lenses are never hand-written into cards.** The old「你的濾鏡」sections are a
  pre-computed answer for one lens; a second lens (#22's difficulty) would fight them.
  **Seven cards still carry that section, and two more carry project-critique blocks** (免揉麵包、巧巴達) —
  that structural cleanup is pure cutting/moving, distinct from #30's research work.

Older backlog, unaffected: #1–#4 (3D map interaction feedback), #7 (health preset — but see #17: it
currently has to use richness as a proxy because nutrition isn't an axis), #8 (normalization math — #16 is
a concrete instance of it), #9 (five-axis ontology — #15 reopens it), #10 (tests), #11 (dark-mode 3D
colors — Three.js can't read `var(--...)`), #12 (recipe versioning; `version` is still hardcoded `"v1.0"`).

**Design rules established this session that aren't issues** (they belong in `CLAUDE.md` / memory):
sliders are **annotated, not scored** — no green "correct" zone, no red "wrong" zone; **the app has no
fail state** (the same belief as "filters dim stars, never hide them"); 知識的嚴謹 yes, 規訓的嚴謹 no;
在卡片裡，不重要 ≠ 刪掉 — the story layer goes last but stays complete.
