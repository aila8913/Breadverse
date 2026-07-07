import { getIngredient } from "./ingredients";
import { RecipeLine } from "./types";
import type { IngredientDef } from "./types";

export interface LinePercentage {
  ingredientId: string;
  grams: number;
  /** 傳統烘焙百分比：這個食材重量 / 總麵粉重量 * 100 */
  bakersPercent: number;
}

export interface PercentageResult {
  totalFlourGrams: number;
  totalDoughGrams: number;
  lines: LinePercentage[];
}

/** 這個食材對「總麵粉重」的貢獻：純麵粉全額計入，老麵/酸種只計入其中的麵粉部分。*/
function flourContribution(ing: IngredientDef, grams: number): number {
  if (ing.category === "flour") return grams;
  if (ing.category === "starter") return grams * (ing.flourRatioInStarter ?? 0.5);
  return 0;
}

function totalFlourGrams(lines: RecipeLine[]): number {
  return lines.reduce((sum, line) => sum + flourContribution(getIngredient(line.ingredientId), line.grams), 0);
}

/** 傳統烘焙百分比：麵粉基準法。以「總麵粉重（含老麵中的麵粉）」為 100%，換算其餘食材。*/
export function computeBakersPercentages(lines: RecipeLine[]): PercentageResult {
  const flourGrams = totalFlourGrams(lines);
  if (flourGrams <= 0) {
    throw new Error("配方裡沒有任何麵粉（或含麵粉的老麵），無法計算烘焙百分比");
  }

  return {
    totalFlourGrams: flourGrams,
    totalDoughGrams: lines.reduce((sum, line) => sum + line.grams, 0),
    lines: lines.map((line) => ({
      ingredientId: line.ingredientId,
      grams: line.grams,
      bakersPercent: (line.grams / flourGrams) * 100,
    })),
  };
}

/**
 * 真實含水率（effective hydration）：不只算「水」這個食材，
 * 還把牛奶、雞蛋、奶油裡拆解出來的水分也算進去，這樣算出來的數字才能拿來跟
 * 其他食譜比較「到底哪個比較濕潤」。
 */
export function computeTrueHydration(lines: RecipeLine[]): number {
  const flourGrams = totalFlourGrams(lines);
  if (flourGrams <= 0) return 0;

  const waterGrams = lines.reduce((sum, line) => {
    const ing = getIngredient(line.ingredientId);
    if (ing.category === "starter") {
      const starterFlour = line.grams * (ing.flourRatioInStarter ?? 0.5);
      return sum + (line.grams - starterFlour); // 老麵裡非麵粉的部分視為水
    }
    return sum + line.grams * ing.waterRatio;
  }, 0);

  return (waterGrams / flourGrams) * 100;
}

/**
 * 豐富度（richness）：脂肪、糖，以及蛋裡的固形物部分，相對麵粉重的比例。
 * 數值愈高代表愈「富麵團」（像布里歐），愈低代表愈「瘦麵團」（像法棍）。
 */
export function computeRichness(lines: RecipeLine[]): number {
  const flourGrams = totalFlourGrams(lines);
  if (flourGrams <= 0) return 0;

  const richnessGrams = lines.reduce((sum, line) => {
    const ing = getIngredient(line.ingredientId);
    if (ing.category === "fat" || ing.category === "sweetener") {
      return sum + line.grams;
    }
    if (ing.category === "egg") {
      return sum + line.grams * (1 - ing.waterRatio); // 蛋的固形物（蛋白質+脂肪）部分
    }
    return sum;
  }, 0);

  return (richnessGrams / flourGrams) * 100;
}
