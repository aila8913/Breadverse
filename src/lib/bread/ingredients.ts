import { IngredientDef } from "./types";

/**
 * 食材資料庫。waterRatio 是「有效含水量拆解」的核心：
 * 使用者輸入牛奶、雞蛋的克數時，App 會依這裡的比例自動拆成水分和固形物，
 * 而不是把整包牛奶都當成「非水」食材，這樣算出來的含水率（hydration）才準確。
 */
export const INGREDIENT_DB: IngredientDef[] = [
  { id: "bread-flour", nameZh: "高筋麵粉", nameEn: "Bread Flour", category: "flour", waterRatio: 0, refinementIndex: 100 },
  { id: "ap-flour", nameZh: "中筋麵粉", nameEn: "All-purpose Flour", category: "flour", waterRatio: 0, refinementIndex: 90 },
  { id: "whole-wheat-flour", nameZh: "全麥麵粉", nameEn: "Whole Wheat Flour", category: "flour", waterRatio: 0, refinementIndex: 20 },
  { id: "rye-flour", nameZh: "裸麥粉", nameEn: "Rye Flour", category: "flour", waterRatio: 0, refinementIndex: 10 },

  { id: "water", nameZh: "水", nameEn: "Water", category: "liquid", waterRatio: 1 },
  { id: "milk", nameZh: "牛奶", nameEn: "Milk", category: "liquid", waterRatio: 0.87 },

  { id: "whole-egg", nameZh: "全蛋", nameEn: "Whole Egg", category: "egg", waterRatio: 0.75 },
  { id: "egg-yolk", nameZh: "蛋黃", nameEn: "Egg Yolk", category: "egg", waterRatio: 0.5 },
  { id: "egg-white", nameZh: "蛋白", nameEn: "Egg White", category: "egg", waterRatio: 0.88 },

  { id: "butter", nameZh: "奶油", nameEn: "Butter", category: "fat", waterRatio: 0.16 },
  { id: "vegetable-oil", nameZh: "植物油", nameEn: "Vegetable Oil", category: "fat", waterRatio: 0 },

  { id: "sugar", nameZh: "糖", nameEn: "Sugar", category: "sweetener", waterRatio: 0 },
  { id: "salt", nameZh: "鹽", nameEn: "Salt", category: "salt", waterRatio: 0 },

  { id: "instant-yeast", nameZh: "即溶酵母", nameEn: "Instant Yeast", category: "leavening", waterRatio: 0 },
  { id: "fresh-yeast", nameZh: "新鮮酵母", nameEn: "Fresh Yeast", category: "leavening", waterRatio: 0.7 },

  {
    id: "levain-100",
    nameZh: "100%含水酸種",
    nameEn: "100% Hydration Levain",
    category: "starter",
    waterRatio: 0,
    flourRatioInStarter: 0.5,
  },
  {
    id: "old-dough",
    nameZh: "老麵",
    nameEn: "Old Dough (Pâte Fermentée)",
    category: "starter",
    waterRatio: 0,
    flourRatioInStarter: 0.6,
  },
];

export function getIngredient(id: string): IngredientDef {
  const found = INGREDIENT_DB.find((i) => i.id === id);
  if (!found) throw new Error(`找不到食材定義：${id}`);
  return found;
}
