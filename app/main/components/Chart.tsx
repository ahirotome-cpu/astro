'use client';

import React from "react";
import { ZodiacBasePlanetType } from "../../types";
import { basePlanets } from "../../constants";
import { aspectColors, elementColors, planetSymbols, signElements, zodiacSigns } from "../constants";
import { calculateAspects, formatData, polarToCartesian } from "../utils";
import { ChartProps } from "./types";

export const Chart: React.FC<ChartProps> = ({
  size = 700,
  data,
}) => {
  const { planets, houses } = formatData(data)

  const cx = size / 2;
  const cy = size / 2;

  const outerR = size * 0.48;
  const innerR = size * 0.42;
  const planetR = size * 0.38;
  const houseR = size * 0.35;
  const aspectR = size * 0.30;

  const aspects = calculateAspects(planets);
  aspects.sort((a, b) => a.orb - b.orb);
  const strongAspects = aspects.filter(a => a.orb < 3);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>

      {/* фон */}
      <circle cx={cx} cy={cy} r={outerR} fill="#fafafa" />

      {/* кольца */}
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#222" />
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="#999" />
      <circle cx={cx} cy={cy} r={houseR} fill="none" stroke="#999" />
      <circle cx={cx} cy={cy} r={aspectR} fill="none" stroke="#ddd" />

      {Array.from({ length: 12 }).map((_, i) => {
        const start = i * 30;
        const end = start + 30;

        const p1 = polarToCartesian(cx, cy, outerR, start);
        const p2 = polarToCartesian(cx, cy, outerR, end);

        const p3 = polarToCartesian(cx, cy, innerR, end);
        const p4 = polarToCartesian(cx, cy, innerR, start);

        const path = `
    M ${p1.x} ${p1.y}
    A ${outerR} ${outerR} 0 0 0 ${p2.x} ${p2.y}
    L ${p3.x} ${p3.y}
    A ${innerR} ${innerR} 0 0 1 ${p4.x} ${p4.y}
    Z
  `;

        return (
          <path
            key={"sector-" + i}
            d={path}
            fill={elementColors[signElements[i]]}
            stroke="none"
          />
        );
      })}


      {/* знаки */}
      {zodiacSigns.map((sign, i) => {
        const mid = i * 30 + 15;
        const { x, y } = polarToCartesian(cx, cy, outerR - 20, mid);

        return (
          <text
            key={i}
            x={x}
            y={y}
            fontSize={16}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {sign}
          </text>
        );
      })}


      {/* линии домов */}
      {houses.map((h) => {
        const { x, y } = polarToCartesian(cx, cy, innerR, h.degree);

        return (
          <line
            key={h.number}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="#555"
            strokeWidth={1}
          />
        );
      })}

      {/* номера домов */}
      {houses.map((h) => {
        const next = data.houses[(h.number % 12)];

        const midDeg =
          ((h.degree + next.degree + (h.degree > next.degree ? 360 : 0)) / 2) % 360;

        const { x, y } = polarToCartesian(cx, cy, houseR, midDeg);

        return (
          <g key={"label-" + h.number}>
            {/* номер */}
            <text
              x={x}
              y={y + 1}
              fontSize={10}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#333"
            >
              {h.number}
            </text>
          </g>
        );
      })}

      {/* планеты */}
      {planets.filter(p => basePlanets.includes(p.name as ZodiacBasePlanetType)).map((p, i) => {
        // 👇 минимальный анти-оверлап
        const offset = (i % 3) * 6;

        const { x, y } = polarToCartesian(
          cx,
          cy,
          planetR + offset,
          p.degree
        );

        return (
          <g key={p.name + i}>
            <circle cx={x} cy={y} r={3} fill="#000" />
            <text
              x={x}
              y={y - 8}
              fontSize={12}
              textAnchor="middle"
            >
              {planetSymbols[p.name as ZodiacBasePlanetType] ?? p.name}
            </text>
          </g>
        );
      })}

      {/* границы знаков */}
      {Array.from({ length: 12 }).map((_, i) => {
        const deg = i * 30;

        const p1 = polarToCartesian(cx, cy, innerR, deg);
        const p2 = polarToCartesian(cx, cy, outerR, deg);

        return (
          <line
            key={"sign-line-" + i}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke="#ccc"
            strokeWidth={1}
          />
        );
      })}

      {aspects.map((a, i) => {
        const p1 = planets[a.from];
        const p2 = planets[a.to];

        const c1 = polarToCartesian(cx, cy, aspectR, p1.degree);
        const c2 = polarToCartesian(cx, cy, aspectR, p2.degree);

        return (
          <line
            key={i}
            x1={c1.x}
            y1={c1.y}
            x2={c2.x}
            y2={c2.y}
            stroke={aspectColors[a.type]}
            strokeWidth={1}
            opacity={0.8}
          />
        );
      })}
    </svg>
  );
};