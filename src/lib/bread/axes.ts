import { getIngredient } from "./ingredients";
import { computeRichness, computeTrueHydration } from "./percentage";
import { FermentationType, KneadStyle, RecipeLine, RecipeMethod } from "./types";

/**
 * 只取雷達軸計算真正需要的欄位（食材清單 + 製作方法），不要求完整的 Recipe
 * （id/name/version/createdAt）。這樣表單畫面在使用者還沒按下「儲存」之前，
 * 就能用同一顆函式即時預覽雷達圖，不用先捏造一個假的 id/createdAt。
 */
export interface RadarInput {
  lines: RecipeLine[];
  method: RecipeMethod;
}

/**
 * 風味雷達圖的五個軸，每個都正規化到 0~100，方便畫在同一張雷達圖上比較。
 * hydration / richness / grainStructure 是從食材克數「算出來」的；
 * fermentationTime / glutenDevelopment 是從製作方法「記錄」的，沒辦法從重量反推。
 */
export interface RadarAxes {
  hydration: number; // 0 乾硬 ~ 100 極濕潤
  richness: number; // 0 瘦麵團 ~ 100 富麵團
  grainStructure: number; // 0 全麥/裸麥 ~ 100 純白高筋
  fermentationTime: number; // 0 快速發酵 ~ 100 長時熟成
  glutenDevelopment: number; // 0 免揉摺疊 ~ 100 完全擴展
}

const FERMENTATION_BASE_SCORE: Record<FermentationType, number> = {
  "commercial-fast": 10,
  "commercial-overnight": 40,
  levain: 80,
  "old-dough": 60,
};

const KNEAD_SCORE: Record<KneadStyle, number> = {
  "no-knead": 10,
  "stretch-fold": 40,
  "short-knead": 65,
  "full-gluten-window": 100,
};

function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, value));
}

/** 依麵粉種類的精緻度（refinementIndex）加權平均，算出「麥種結構」軸。*/
function computeGrainStructure(lines: RecipeLine[]): number {
  const flourLines = lines.filter((line) => getIngredient(line.ingredientId).refinementIndex !== undefined);
  const totalGrams = flourLines.reduce((sum, line) => sum + line.grams, 0);
  if (totalGrams === 0) return 100; // 沒有標記精緻度的麵粉時，預設當作純白麵粉

  const weighted = flourLines.reduce((sum, line) => {
    const ing = getIngredient(line.ingredientId);
    return sum + line.grams * (ing.refinementIndex ?? 100);
  }, 0);

  return weighted / totalGrams;
}

/** 發酵時間軸：菌種類型決定基礎分數，熟成時數再往上微調（每 24 小時最多加 20 分）。*/
function computeFermentationTime(method: RecipeMethod): number {
  const base = FERMENTATION_BASE_SCORE[method.fermentationType];
  const hourBonus = clamp((method.fermentationHours / 24) * 20, 0, 20);
  return clamp(base + hourBonus);
}

export function computeRadarAxes(recipe: RadarInput): RadarAxes {
  return {
    hydration: clamp(computeTrueHydration(recipe.lines)),
    richness: clamp(computeRichness(recipe.lines)),
    grainStructure: clamp(computeGrainStructure(recipe.lines)),
    fermentationTime: computeFermentationTime(recipe.method),
    glutenDevelopment: KNEAD_SCORE[recipe.method.kneadStyle],
  };
}
