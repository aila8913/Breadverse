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
  // 佛卡夏拆成兩顆星（#31）：以前只有一筆 hydration:85，等於把「傳統熱那亞（55–65%）」和
  // 「現代高水版（75–95%）」平均成一顆，畫在了宇宙裡沒有任何一款佛卡夏存在的位置。兩者做法不同
  // （水位差一整級、發酵長短不同），照 bread-card 的 P3 該是兩款麵包，不是一筆數值誤差。
  // 注意 richness 兩顆一樣（20）：豐富度軸只算得到麵團內的油，算不到現代版大量鋪在盤底和表面的油，
  // 所以這根軸目前分不出兩者——這是軸的破洞，不是填錯（見 issue #36）。
  {
    id: "focaccia-genovese",
    name: "佛卡夏（熱那亞） Focaccia Genovese",
    axes: { hydration: 60, richness: 20, grainStructure: 90, fermentationTime: 45, glutenDevelopment: 60 },
  },
  {
    id: "focaccia-modern",
    name: "佛卡夏（現代高水版） Modern Focaccia",
    axes: { hydration: 82, richness: 20, grainStructure: 90, fermentationTime: 58, glutenDevelopment: 62 },
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
