import { RadarAxes } from "./axes";

/** 畫雷達圖/表格時，固定的軸順序 —— 兩邊都照這個順序畫，圖表跟表格才會對得起來。*/
export const RADAR_AXIS_ORDER: (keyof RadarAxes)[] = [
  "hydration",
  "richness",
  "grainStructure",
  "fermentationTime",
  "glutenDevelopment",
];

export const RADAR_AXIS_LABELS: Record<keyof RadarAxes, { title: string; low: string; high: string }> = {
  hydration: { title: "含水度", low: "乾硬", high: "極濕潤" },
  richness: { title: "豐富度", low: "瘦麵團", high: "富麵團" },
  grainStructure: { title: "麥種結構", low: "全麥/裸麥", high: "純白高筋" },
  fermentationTime: { title: "發酵時間", low: "快速發酵", high: "長時熟成" },
  glutenDevelopment: { title: "麵筋擴展", low: "免揉摺疊", high: "完全擴展" },
};
