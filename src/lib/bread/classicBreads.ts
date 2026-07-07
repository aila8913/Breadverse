import { RadarAxes } from "./axes";

/**
 * 經典麵包的「官方座標」，作為星系地圖的背景參考點。
 * 這些數值是依經驗估計的參考值，不是精算結果 —— 之後可以依實際測試配方微調。
 */
export interface ClassicBreadReference {
  id: string;
  name: string;
  axes: RadarAxes;
}

export const CLASSIC_BREADS: ClassicBreadReference[] = [
  {
    id: "baguette",
    name: "法棍 Baguette",
    axes: { hydration: 68, richness: 2, grainStructure: 95, fermentationTime: 45, glutenDevelopment: 90 },
  },
  {
    id: "focaccia",
    name: "佛卡夏 Focaccia",
    axes: { hydration: 85, richness: 15, grainStructure: 90, fermentationTime: 40, glutenDevelopment: 60 },
  },
  {
    id: "brioche",
    name: "布里歐 Brioche",
    axes: { hydration: 55, richness: 90, grainStructure: 95, fermentationTime: 20, glutenDevelopment: 95 },
  },
  {
    id: "bagel",
    name: "貝果 Bagel",
    axes: { hydration: 55, richness: 10, grainStructure: 95, fermentationTime: 30, glutenDevelopment: 90 },
  },
  {
    id: "sourdough",
    name: "鄉村酸種 Sourdough",
    axes: { hydration: 75, richness: 5, grainStructure: 60, fermentationTime: 90, glutenDevelopment: 70 },
  },
  {
    id: "shokupan",
    name: "吐司 Shokupan",
    axes: { hydration: 65, richness: 45, grainStructure: 95, fermentationTime: 25, glutenDevelopment: 100 },
  },
];
