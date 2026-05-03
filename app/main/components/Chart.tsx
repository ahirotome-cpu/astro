'use client';

import React, { useEffect, useState } from "react";
import { ZodiacBasePlanetType } from "../../types";
import { basePlanets } from "../../constants";
import { aspectColors, elementColors, signElements } from "../constants";
import { calculateAspects, formatData, planetIcons, polarToCartesian } from "./utils";
import { ChartProps } from "./types";
import { signIcons } from "./constants";

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const [size, setSize] = useState(570);
  const { planets, houses } = formatData(data)

  const cx = size / 2;
  const cy = size / 2;

  const outerR = size * 0.48;
  const innerR = size * 0.42;
  const planetR = size * 0.38;
  const houseR = size * 0.30;
  const aspectR = size * 0.25;

  const aspects = calculateAspects(planets);
  aspects.sort((a, b) => a.orb - b.orb);
  const strongAspects = aspects.filter(a => a.orb < 3);
  const asc = houses[0];

  useEffect(() => {
    const windowWidth = document.documentElement.clientWidth;
    let newSize;

    if (windowWidth < 560) {
      newSize = windowWidth - 40;
    } else if (windowWidth < 1024) {
      newSize = 520;
    } else {
      newSize = 570
    }

    setSize(newSize);
  }, []);

  const rotation = asc ? asc.degree : 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* кольца */}
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#222" />
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="#999" />
      <circle cx={cx} cy={cy} r={houseR} fill="none" stroke="#999" />
      <circle cx={cx} cy={cy} r={aspectR} fill="none" stroke="#999" />

      {/* сектора */}
      {Array.from({ length: 12 }).map((_, i) => {
        const start = i * 30 - rotation;
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
          />
        );
      })}

      {/* знаки */}
      {signIcons.map((icon, i) => {
        const mid = i * 30 + 15 - rotation;
        const { x, y } = polarToCartesian(cx, cy, outerR - 20, mid);

        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            <g transform="translate(-12, -12)">
              {icon({})}
            </g>
          </g>
        );
      })}

      {/* линии домов */}
      {houses.map((h) => {
        const deg = h.degree - rotation;

        const p1 = polarToCartesian(cx, cy, aspectR, deg);
        const p2 = polarToCartesian(cx, cy, innerR, deg);

        return (
          <line
            key={h.number}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke="#999"
          />
        );
      })}

      {/* номера домов */}
      {houses.map((h) => {
        const next = houses[h.number % 12];

        const midDeg =
          ((h.degree + next.degree + (h.degree > next.degree ? 360 : 0)) / 2) %
          360 -
          rotation;

        const { x, y } = polarToCartesian(cx, cy, houseR - 15, midDeg);

        return (
          <text
            key={"label-" + h.number}
            x={x}
            y={y}
            fontSize={12}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#333"
          >
            {h.number}
          </text>
        );
      })}

      {/* планеты */}
      {(() => {
        const usedAngles: Record<string, number> = {};

        return planets
          .filter(p => basePlanets.includes(p.name as ZodiacBasePlanetType))
          .map((p, i) => {
            const baseAngle = p.degree - rotation;

            const key = Math.round(baseAngle / 3);
            const index = usedAngles[key] ?? 0;
            usedAngles[key] = index + 1;

            const r = innerR + index * 10;

            const { x, y } = polarToCartesian(cx, cy, r, baseAngle);

            const Icon = planetIcons[p.name as ZodiacBasePlanetType];

            // 👉 направление к центру
            const dx = cx - x;
            const dy = cy - y;
            const len = Math.sqrt(dx * dx + dy * dy);

            // нормализация (вектор внутрь круга)
            const ux = dx / len;
            const uy = dy / len;

            // смещение внутрь (на 10–14px — подбирается визуально)
            const iconOffset = 20;

            const iconX = x + ux * iconOffset;
            const iconY = y + uy * iconOffset;

            return (
              <g key={i}>
                {/* точка на орбите */}
                <circle cx={x} cy={y} r={3} fill="#000" />

                {/* иконка внутри */}
                {Icon && (
                  <g transform={`translate(${iconX}, ${iconY})`}>
                    <g transform="translate(-12, -12)">
                      <Icon width={24} height={24} />
                    </g>
                  </g>
                )}
              </g>
            );
          });
      })()}

      {/* границы знаков */}
      {Array.from({ length: 12 }).map((_, i) => {
        const deg = i * 30 - rotation;

        const p1 = polarToCartesian(cx, cy, innerR, deg);
        const p2 = polarToCartesian(cx, cy, outerR, deg);

        return (
          <line
            key={"sign-line-" + i}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke="#999"
          />
        );
      })}

      {/* аспекты */}
      {strongAspects.map((a, i) => {
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