export type IngredientCategory =
  | "flour" // 麵粉類：提供麩質結構，是烘焙百分比 100% 的計算基準
  | "liquid" // 水、牛奶等液體
  | "egg" // 蛋（全蛋/蛋黃/蛋白）
  | "fat" // 奶油、油脂
  | "sweetener" // 糖
  | "salt" // 鹽
  | "leavening" // 酵母、泡打粉
  | "starter" // 老麵、酸種 — 本身就是「麵粉+水」的混合物
  | "other";

export interface IngredientDef {
  id: string;
  nameZh: string;
  nameEn: string;
  category: IngredientCategory;
  /** 這個食材本身重量中，有效含水量所佔比例（0~1）。例如牛奶 0.87、全蛋 0.75。*/
  waterRatio: number;
  /** 僅麵粉類食材使用：精緻度 0（全麥/裸麥，高纖低筋）~ 100（高筋白麵粉），用來算「麥種結構」軸。*/
  refinementIndex?: number;
  /** 僅老麵/酸種類食材使用：其重量中麵粉所佔比例，其餘視為水。*/
  flourRatioInStarter?: number;
}

export interface RecipeLine {
  ingredientId: string;
  grams: number;
}

export type FermentationType =
  | "commercial-fast" // 商業酵母快速發酵
  | "commercial-overnight" // 商業酵母冷藏隔夜
  | "levain" // 天然酸種
  | "old-dough"; // 老麵法

export type KneadStyle =
  | "no-knead" // 免揉摺疊
  | "stretch-fold" // 拉摺法
  | "short-knead" // 短時間攪拌
  | "full-gluten-window"; // 完全擴展（拉出薄膜）

export interface RecipeMethod {
  fermentationType: FermentationType;
  /** 總發酵時間（主發+後發，含冷藏熟成），單位：小時 */
  fermentationHours: number;
  kneadStyle: KneadStyle;
}

export interface Recipe {
  id: string;
  name: string;
  version: string; // 例如 "v1.0"、"v1.1"
  lines: RecipeLine[];
  method: RecipeMethod;
  createdAt: string;
  note?: string;
}
