import { RadarAxes } from "@/lib/bread/axes";
import { RADAR_AXIS_LABELS, RADAR_AXIS_ORDER } from "@/lib/bread/axisLabels";

export interface RadarSeriesInput {
  label: string;
  values: RadarAxes;
  color: string;
  /** 只有主角食譜（通常是使用者正在編輯的那個）才填色，參考線只畫外框，避免兩片色塊互相蓋住看不清楚。*/
  fill?: boolean;
}

interface RadarChartProps {
  series: RadarSeriesInput[];
  size?: number;
}

const RING_FRACTIONS = [0.25, 0.5, 0.75, 1];

/** 五角形每個頂點的座標：從正上方開始，順時針依軸數量平分角度。*/
function polarPoint(cx: number, cy: number, radius: number, index: number, count: number): [number, number] {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
}

export function RadarChart({ series, size = 320 }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.34; // 外圈留一點空間給軸標籤文字
  const axisCount = RADAR_AXIS_ORDER.length;

  const ringPolygons = RING_FRACTIONS.map((fraction) =>
    RADAR_AXIS_ORDER.map((_, i) => polarPoint(cx, cy, maxRadius * fraction, i, axisCount).join(",")).join(" "),
  );

  const spokes = RADAR_AXIS_ORDER.map((_, i) => polarPoint(cx, cy, maxRadius, i, axisCount));

  const seriesPolygons = series.map((s) => ({
    ...s,
    points: RADAR_AXIS_ORDER.map((axisKey, i) =>
      polarPoint(cx, cy, (s.values[axisKey] / 100) * maxRadius, i, axisCount),
    ),
  }));

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="風味雷達圖">
        {ringPolygons.map((points, i) => (
          <polygon key={i} points={points} fill="none" stroke="var(--chart-gridline)" strokeWidth={1} />
        ))}
        {spokes.map(([x, y], i) => (
          <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--chart-gridline)" strokeWidth={1} />
        ))}
        {RADAR_AXIS_ORDER.map((axisKey, i) => {
          const [x, y] = polarPoint(cx, cy, maxRadius + 22, i, axisCount);
          return (
            <text
              key={axisKey}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={12}
              fill="var(--chart-text-secondary)"
            >
              {RADAR_AXIS_LABELS[axisKey].title}
            </text>
          );
        })}
        {seriesPolygons.map((s) => (
          <g key={s.label}>
            <polygon
              points={s.points.map((p) => p.join(",")).join(" ")}
              fill={s.fill ? s.color : "none"}
              fillOpacity={0.1}
              stroke={s.color}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {s.points.map(([x, y], i) => {
              const axisKey = RADAR_AXIS_ORDER[i];
              return (
                <circle key={i} cx={x} cy={y} r={4} fill={s.color} stroke="var(--chart-surface)" strokeWidth={2}>
                  <title>
                    {s.label} · {RADAR_AXIS_LABELS[axisKey].title}: {Math.round(s.values[axisKey])}
                  </title>
                </circle>
              );
            })}
          </g>
        ))}
      </svg>

      {/* 兩個以上的系列才需要圖例（單一系列時，標題已經說明畫的是什麼）*/}
      {series.length >= 2 && (
        <ul className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: "var(--chart-text-secondary)" }}>
          {series.map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
