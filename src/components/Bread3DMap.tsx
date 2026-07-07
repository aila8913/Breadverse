"use client";

import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Line, OrbitControls, Text } from "@react-three/drei";
import { computeRadarAxes, RadarAxes } from "@/lib/bread/axes";
import { RADAR_AXIS_LABELS, RADAR_AXIS_ORDER } from "@/lib/bread/axisLabels";
import { CLASSIC_BREADS } from "@/lib/bread/classicBreads";
import { Recipe } from "@/lib/bread/types";

type AxisKey = keyof RadarAxes;
type Vec3 = [number, number, number];

interface MapPoint {
  id: string;
  label: string;
  axes: RadarAxes;
  color: string;
}

/** 場景座標範圍：每個軸的 0~100 分映射到 -HALF ~ +HALF，原點是場景正中央。*/
const SCENE_SIZE = 6;
const HALF = SCENE_SIZE / 2;

/**
 * Three.js 的顏色是自己的解析器（不是走 DOM CSSOM），沒辦法讀 `var(--chart-series-1)`
 * 這種 CSS 自訂屬性，所以這裡要用實際的 hex 值，跟 globals.css 裡的淺色模式數值保持一致。
 */
const RECIPE_COLOR = "#2a78d6";
const REFERENCE_COLOR = "#898781";

function valueToScenePos(value: number): number {
  return (value / 100) * SCENE_SIZE - HALF;
}

const AXIS_DIRECTIONS: Record<"x" | "y" | "z", Vec3> = {
  x: [1, 0, 0],
  y: [0, 1, 0],
  z: [0, 0, 1],
};

interface AxisSelectProps {
  label: string;
  value: AxisKey;
  onChange: (value: AxisKey) => void;
}

function AxisSelect({ label, value, onChange }: AxisSelectProps) {
  return (
    <label className="flex flex-col gap-1 text-xs text-neutral-500 dark:text-neutral-400">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as AxisKey)}
        className="rounded border border-neutral-300 bg-transparent px-2 py-1 text-sm text-neutral-900 dark:border-neutral-700 dark:text-neutral-100"
      >
        {RADAR_AXIS_ORDER.map((key) => (
          <option key={key} value={key}>
            {RADAR_AXIS_LABELS[key].title}
          </option>
        ))}
      </select>
    </label>
  );
}

function AxisGuide({ axisKey, axis }: { axisKey: AxisKey; axis: "x" | "y" | "z" }) {
  const direction = AXIS_DIRECTIONS[axis];
  const start: Vec3 = direction.map((v) => -v * HALF) as Vec3;
  const end: Vec3 = direction.map((v) => v * HALF) as Vec3;
  const labelPos: Vec3 = direction.map((v) => v * (HALF + 0.5)) as Vec3;

  return (
    <>
      <Line points={[start, end]} color="#898781" lineWidth={1} />
      <Text position={labelPos} fontSize={0.28} color="#898781" anchorX="center" anchorY="middle">
        {RADAR_AXIS_LABELS[axisKey].title}
      </Text>
    </>
  );
}

function Point({ point, axisKeys }: { point: MapPoint; axisKeys: [AxisKey, AxisKey, AxisKey] }) {
  const [hovered, setHovered] = useState(false);
  const position: Vec3 = [
    valueToScenePos(point.axes[axisKeys[0]]),
    valueToScenePos(point.axes[axisKeys[1]]),
    valueToScenePos(point.axes[axisKeys[2]]),
  ];

  return (
    <group position={position}>
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[hovered ? 0.16 : 0.11, 16, 16]} />
        <meshStandardMaterial color={point.color} />
      </mesh>
      {hovered && (
        <Html distanceFactor={9} style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap rounded bg-neutral-900/85 px-2 py-1 text-xs text-white">
            {point.label} · {axisKeys.map((k) => `${RADAR_AXIS_LABELS[k].title} ${Math.round(point.axes[k])}`).join(" / ")}
          </div>
        </Html>
      )}
    </group>
  );
}

interface Bread3DMapProps {
  recipes: Recipe[];
  draftName: string;
  draftAxes: RadarAxes | null;
}

export function Bread3DMap({ recipes, draftName, draftAxes }: Bread3DMapProps) {
  const [xKey, setXKey] = useState<AxisKey>("grainStructure");
  const [yKey, setYKey] = useState<AxisKey>("fermentationTime");
  const [zKey, setZKey] = useState<AxisKey>("richness");
  const axisKeys: [AxisKey, AxisKey, AxisKey] = [xKey, yKey, zKey];

  const recipePoints: MapPoint[] = useMemo(() => {
    const saved = recipes.map((r) => ({
      id: r.id,
      label: r.name,
      axes: computeRadarAxes(r),
      color: RECIPE_COLOR,
    }));
    if (!draftAxes) return saved;
    return [...saved, { id: "__draft__", label: draftName.trim() || "目前配方", axes: draftAxes, color: RECIPE_COLOR }];
  }, [recipes, draftAxes, draftName]);

  const classicPoints: MapPoint[] = CLASSIC_BREADS.map((bread) => ({
    id: bread.id,
    label: bread.name,
    axes: bread.axes,
    color: REFERENCE_COLOR,
  }));

  const allPoints = [...classicPoints, ...recipePoints];

  return (
    <section className="flex flex-col gap-4 rounded border border-neutral-300 p-4 dark:border-neutral-700">
      <div className="flex flex-wrap gap-4">
        <AxisSelect label="X 軸" value={xKey} onChange={setXKey} />
        <AxisSelect label="Y 軸" value={yKey} onChange={setYKey} />
        <AxisSelect label="Z 軸" value={zKey} onChange={setZKey} />
      </div>

      <div style={{ height: 420 }}>
        <Canvas camera={{ position: [7, 5.5, 7], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <AxisGuide axisKey={xKey} axis="x" />
          <AxisGuide axisKey={yKey} axis="y" />
          <AxisGuide axisKey={zKey} axis="z" />
          {allPoints.map((point) => (
            <Point key={point.id} point={point} axisKeys={axisKeys} />
          ))}
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>

      <ul className="flex flex-wrap gap-4 text-sm text-neutral-500 dark:text-neutral-400">
        <li className="flex items-center gap-2">
          <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--chart-series-1)" }} />
          你的食譜
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--chart-reference)" }} />
          經典麵包參考
        </li>
      </ul>

      {/* 表格版本：3D 圖可以很酷，但座標讀值一定要有非圖形的版本可以看 */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-500 dark:text-neutral-400">
            <th className="pr-4 font-normal">名稱</th>
            <th className="pr-4 font-normal">{RADAR_AXIS_LABELS[xKey].title}</th>
            <th className="pr-4 font-normal">{RADAR_AXIS_LABELS[yKey].title}</th>
            <th className="font-normal">{RADAR_AXIS_LABELS[zKey].title}</th>
          </tr>
        </thead>
        <tbody>
          {allPoints.map((point) => (
            <tr key={point.id}>
              <td className="py-0.5 pr-4">{point.label}</td>
              <td className="py-0.5 pr-4 tabular-nums">{Math.round(point.axes[xKey])}</td>
              <td className="py-0.5 pr-4 tabular-nums">{Math.round(point.axes[yKey])}</td>
              <td className="py-0.5 tabular-nums">{Math.round(point.axes[zKey])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
