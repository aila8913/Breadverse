"use client";

import { useEffect, useMemo, useState } from "react";
import { Bread3DMap } from "@/components/Bread3DMap";
import { RadarChart, RadarSeriesInput } from "@/components/RadarChart";
import { computeRadarAxes } from "@/lib/bread/axes";
import { RADAR_AXIS_LABELS, RADAR_AXIS_ORDER } from "@/lib/bread/axisLabels";
import { CLASSIC_BREADS } from "@/lib/bread/classicBreads";
import { INGREDIENT_DB } from "@/lib/bread/ingredients";
import { computeBakersPercentages } from "@/lib/bread/percentage";
import { deleteRecipe, loadRecipes, upsertRecipe } from "@/lib/bread/storage";
import { FermentationType, KneadStyle, Recipe, RecipeLine, RecipeMethod } from "@/lib/bread/types";

const FERMENTATION_OPTIONS: { value: FermentationType; label: string }[] = [
  { value: "commercial-fast", label: "商業酵母．快速發酵" },
  { value: "commercial-overnight", label: "商業酵母．冷藏隔夜" },
  { value: "levain", label: "天然酸種" },
  { value: "old-dough", label: "老麵法" },
];

const KNEAD_OPTIONS: { value: KneadStyle; label: string }[] = [
  { value: "no-knead", label: "免揉摺疊" },
  { value: "stretch-fold", label: "拉摺法" },
  { value: "short-knead", label: "短時間攪拌" },
  { value: "full-gluten-window", label: "完全擴展（拉出薄膜）" },
];

const BLANK_LINES: RecipeLine[] = [{ ingredientId: "bread-flour", grams: 500 }];
const BLANK_METHOD: RecipeMethod = { fermentationType: "commercial-fast", fermentationHours: 3, kneadStyle: "stretch-fold" };

function newLine(): RecipeLine {
  return { ingredientId: INGREDIENT_DB[0].id, grams: 0 };
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [lines, setLines] = useState<RecipeLine[]>(BLANK_LINES);
  const [method, setMethod] = useState<RecipeMethod>(BLANK_METHOD);
  const [compareId, setCompareId] = useState<string>("");

  // localStorage 只存在瀏覽器裡，Next.js 的伺服器端渲染階段拿不到，
  // 所以要放在 useEffect（只在瀏覽器執行）裡讀取一次，不能直接在 render 時呼叫。
  // 這是掛載時讀取一次外部儲存，不是要持續同步的訂閱 —— 之後的更新都是透過
  // handleSave/handleDelete 主動呼叫 setRecipes，不需要 useSyncExternalStore 那種機制。
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecipes(loadRecipes());
  }, []);

  const percentageResult = useMemo(() => {
    try {
      return { ok: true as const, data: computeBakersPercentages(lines) };
    } catch (err) {
      return { ok: false as const, error: (err as Error).message };
    }
  }, [lines]);

  const axes = useMemo(() => {
    if (!percentageResult.ok) return null;
    return computeRadarAxes({ lines, method });
  }, [lines, method, percentageResult.ok]);

  const compareBread = CLASSIC_BREADS.find((b) => b.id === compareId) ?? null;

  const radarSeries: RadarSeriesInput[] = [];
  if (axes) {
    radarSeries.push({ label: name.trim() || "目前配方", values: axes, color: "var(--chart-series-1)", fill: true });
  }
  if (compareBread) {
    radarSeries.push({ label: compareBread.name, values: compareBread.axes, color: "var(--chart-reference)" });
  }

  function updateLine(index: number, patch: Partial<RecipeLine>) {
    setLines((prev) => prev.map((line, i) => (i === index ? { ...line, ...patch } : line)));
  }

  function removeLine(index: number) {
    setLines((prev) => prev.filter((_, i) => i !== index));
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setLines(BLANK_LINES);
    setMethod(BLANK_METHOD);
  }

  function handleSave() {
    if (!name.trim() || !percentageResult.ok) return;

    const existing = editingId ? recipes.find((r) => r.id === editingId) : undefined;
    const recipe: Recipe = {
      id: existing?.id ?? crypto.randomUUID(),
      name: name.trim(),
      version: existing?.version ?? "v1.0", // 版本紀錄是之後「烘焙日記」階段的功能，先固定 v1.0
      lines,
      method,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    };

    upsertRecipe(recipe);
    setRecipes(loadRecipes());
    setEditingId(recipe.id);
  }

  function handleLoad(recipe: Recipe) {
    setEditingId(recipe.id);
    setName(recipe.name);
    setLines(recipe.lines);
    setMethod(recipe.method);
  }

  function handleDelete(id: string) {
    deleteRecipe(id);
    setRecipes(loadRecipes());
    if (editingId === id) resetForm();
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-10">
      <header>
        <h1 className="text-2xl font-semibold">Breadverse 麵包星系地圖</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          輸入食材克數，即時看到烘焙百分比和五維風味雷達圖。
        </p>
      </header>

      <Bread3DMap recipes={recipes} draftName={name} draftAxes={axes} />

      <div className="grid gap-10 md:grid-cols-2">
        {/* 左：食譜輸入表單 */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="recipe-name" className="text-sm font-medium">
              食譜名稱
            </label>
            <input
              id="recipe-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：週末法棍"
              className="rounded border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">食材（克）</span>
              <button
                type="button"
                onClick={() => setLines((prev) => [...prev, newLine()])}
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                + 新增食材
              </button>
            </div>

            {lines.map((line, index) => (
              <div key={index} className="flex items-center gap-2">
                <select
                  value={line.ingredientId}
                  onChange={(e) => updateLine(index, { ingredientId: e.target.value })}
                  className="flex-1 rounded border border-neutral-300 bg-transparent px-2 py-1.5 text-sm dark:border-neutral-700"
                >
                  {INGREDIENT_DB.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.nameZh}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={0}
                  value={line.grams}
                  onChange={(e) => updateLine(index, { grams: Number(e.target.value) })}
                  className="w-24 rounded border border-neutral-300 bg-transparent px-2 py-1.5 text-sm dark:border-neutral-700"
                />
                <button
                  type="button"
                  onClick={() => removeLine(index)}
                  aria-label="移除這個食材"
                  className="px-2 text-neutral-400 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}

            {!percentageResult.ok && <p className="text-sm text-red-500">{percentageResult.error}</p>}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium">製作方法</span>
            <div className="flex flex-col gap-1">
              <label htmlFor="fermentation-type" className="text-xs text-neutral-500 dark:text-neutral-400">
                發酵方式
              </label>
              <select
                id="fermentation-type"
                value={method.fermentationType}
                onChange={(e) => setMethod((m) => ({ ...m, fermentationType: e.target.value as FermentationType }))}
                className="rounded border border-neutral-300 bg-transparent px-2 py-1.5 text-sm dark:border-neutral-700"
              >
                {FERMENTATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="fermentation-hours" className="text-xs text-neutral-500 dark:text-neutral-400">
                總發酵時間（小時，含冷藏熟成）
              </label>
              <input
                id="fermentation-hours"
                type="number"
                min={0}
                value={method.fermentationHours}
                onChange={(e) => setMethod((m) => ({ ...m, fermentationHours: Number(e.target.value) }))}
                className="w-24 rounded border border-neutral-300 bg-transparent px-2 py-1.5 text-sm dark:border-neutral-700"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="knead-style" className="text-xs text-neutral-500 dark:text-neutral-400">
                揉麵手法
              </label>
              <select
                id="knead-style"
                value={method.kneadStyle}
                onChange={(e) => setMethod((m) => ({ ...m, kneadStyle: e.target.value as KneadStyle }))}
                className="rounded border border-neutral-300 bg-transparent px-2 py-1.5 text-sm dark:border-neutral-700"
              >
                {KNEAD_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={!name.trim() || !percentageResult.ok}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              {editingId ? "更新食譜" : "儲存食譜"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded border border-neutral-300 px-4 py-2 text-sm dark:border-neutral-700"
              >
                另存為新食譜
              </button>
            )}
          </div>
        </section>

        {/* 右：雷達圖 + 烘焙百分比表 */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="compare-classic" className="text-sm font-medium">
              對照經典麵包
            </label>
            <select
              id="compare-classic"
              value={compareId}
              onChange={(e) => setCompareId(e.target.value)}
              className="rounded border border-neutral-300 bg-transparent px-2 py-1.5 text-sm dark:border-neutral-700"
            >
              <option value="">不對照</option>
              {CLASSIC_BREADS.map((bread) => (
                <option key={bread.id} value={bread.id}>
                  {bread.name}
                </option>
              ))}
            </select>
          </div>

          {axes ? (
            <RadarChart series={radarSeries} />
          ) : (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">加入麵粉後才能算雷達圖。</p>
          )}

          {/* 表格版本：雷達圖的資料一定要有一個可以直接讀數字的表格版本，不能只靠圖形顏色。*/}
          {axes && (
            <table className="text-sm">
              <thead>
                <tr className="text-left text-neutral-500 dark:text-neutral-400">
                  <th className="pr-4 font-normal">軸</th>
                  <th className="pr-4 font-normal">{name.trim() || "目前配方"}</th>
                  {compareBread && <th className="font-normal">{compareBread.name}</th>}
                </tr>
              </thead>
              <tbody>
                {RADAR_AXIS_ORDER.map((key) => (
                  <tr key={key}>
                    <td className="pr-4">{RADAR_AXIS_LABELS[key].title}</td>
                    <td className="pr-4 tabular-nums">{Math.round(axes[key])}</td>
                    {compareBread && <td className="tabular-nums">{Math.round(compareBread.axes[key])}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {percentageResult.ok && (
            <div>
              <p className="mb-1 text-sm font-medium">烘焙百分比（以總麵粉重為 100%）</p>
              <table className="w-full text-sm">
                <tbody>
                  {percentageResult.data.lines.map((line, i) => (
                    <tr key={i}>
                      <td className="py-0.5 text-neutral-500 dark:text-neutral-400">
                        {INGREDIENT_DB.find((ing) => ing.id === line.ingredientId)?.nameZh}
                      </td>
                      <td className="py-0.5 text-right tabular-nums">{line.bakersPercent.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* 已儲存的食譜 */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">已儲存的食譜</h2>
        {recipes.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">還沒有存過任何食譜。</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                className="flex items-center justify-between rounded border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700"
              >
                <span>
                  {recipe.name} <span className="text-neutral-400">{recipe.version}</span>
                </span>
                <span className="flex gap-3">
                  <button type="button" onClick={() => handleLoad(recipe)} className="text-blue-600 hover:underline dark:text-blue-400">
                    載入
                  </button>
                  <button type="button" onClick={() => handleDelete(recipe.id)} className="text-red-500 hover:underline">
                    刪除
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
