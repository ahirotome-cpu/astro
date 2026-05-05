'use client';

import React, { useEffect, useState } from "react";
import { ZodiacBasePlanetType } from "../../../types";
import { basePlanets, planetIcons } from "./constants";
import { elementColors, signElements } from "./constants";
import { calculateAspects, polarToCartesian } from "./utils";
import { signIcons } from "./constants";
import styles from './chart.module.css';
import clsx from "clsx";
import { HousesResponseTypeData } from "@/app/api/chart/houses/route";
import { PlanetResponseTypeData } from "@/app/api/chart/planets/route";

export const Chart: React.FC = () => {
  const [houses, setHouses] = useState<HousesResponseTypeData[]>([]);
  const [planets, setPlanets] = useState<PlanetResponseTypeData[]>([]);

  const [windowWidth, setWindowWidth] = useState(1400)
  const [mounted, setMounted] = useState(false);

  const isMobile = windowWidth < 560
  const size = isMobile ? windowWidth - 40 : 520
  const iconSize = isMobile ? 16 : 24

  const cx = size / 2;
  const cy = size / 2;

  const outerR = size * 0.48;
  const innerR = size * 0.40;
  const houseR = size * 0.30;
  const aspectR = size * 0.25;

  const onlyBasePlanets = planets.filter(p => basePlanets.includes(p.planet.en as ZodiacBasePlanetType))
  const aspects = calculateAspects(onlyBasePlanets, true);
  aspects.sort((a, b) => a.orb - b.orb);
  const asc = houses[0];
  const rotation = asc ? asc.degree : 0;

  useEffect(() => {
    setWindowWidth(document.documentElement.clientWidth)
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const h = localStorage.getItem('houses');
    const p = localStorage.getItem('planets');

    setHouses(h ? JSON.parse(h) : []);
    setPlanets(p ? JSON.parse(p) : []);
  }, []);

  if (!mounted) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={styles.chart}
      data-mode="ui"
    >
      {/* кольца */}
      <circle cx={cx} cy={cy} r={outerR} fill="none" className={styles.outerCircle} />
      <circle cx={cx} cy={cy} r={innerR} fill="none" className={styles.innerCircle} />
      <circle cx={cx} cy={cy} r={houseR} fill="none" className={styles.houseCircle} />
      <circle cx={cx} cy={cy} r={aspectR} fill="none" className={styles.aspectCircle} />

      {/* градусные риски */}
      {Array.from({ length: 360 }).map((_, i) => {
        const deg = i - rotation;
        const isMajor = i % 30 === 0;
        const isMedium = i % 10 === 0;
        const isSmall = i % 5 === 0;

        let tickLength = 4;
        if (isMajor) tickLength = 12;
        else if (isMedium) tickLength = 8;
        else if (isSmall) tickLength = 6;

        const p1 = polarToCartesian(cx, cy, innerR, deg);
        const p2 = polarToCartesian(cx, cy, innerR - tickLength, deg);

        return (
          <line
            key={"tick-" + i}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            className={clsx(
              styles.tick,
              isMajor && styles.major,
              isMedium && styles.medium,
              isSmall && styles.small
            )}
          />
        );
      })}

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
            className={styles.sector}
            fill={elementColors[signElements[i]]}
          />
        );
      })}

      {/* знаки */}
      {signIcons.map((icon, i) => {
        const mid = i * 30 + 15 - rotation;
        const { x, y } = polarToCartesian(cx, cy, outerR - iconSize, mid);
        const Icon = icon;

        return (
          <g
            key={i}
            transform={`translate(${x - iconSize / 2}, ${y - iconSize / 2})`}
          >
            <Icon width={iconSize} height={iconSize} />
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
            key={h.House}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            className={styles.houseLine}
          />
        );
      })}

      {/* номера домов */}
      {houses.map((h) => {
        const next = houses[h.House % 12];

        const midDeg =
          ((h.degree + next.degree + (h.degree > next.degree ? 360 : 0)) / 2) %
          360 -
          rotation;

        const { x, y } = polarToCartesian(
          cx,
          cy,
          houseR - (iconSize * 2) / 3,
          midDeg
        );

        return (
          <text
            key={"label-" + h.House}
            x={x}
            y={y}
            fontSize={isMobile ? 10 : 12}
            textAnchor="middle"
            dominantBaseline="middle"
            className={styles.houseLabel}
          >
            {h.House}
          </text>
        );
      })}

      {/* планеты */}
      {(() => {
        const usedAngles: Record<string, number> = {};

        return onlyBasePlanets
          .map((p, i) => {
            const baseAngle = p.fullDegree - rotation;

            const key = Math.round(baseAngle / 3);
            const index = usedAngles[key] ?? 0;
            usedAngles[key] = index + 1;

            const r = innerR + index * 10;

            const { x, y } = polarToCartesian(cx, cy, r, baseAngle);

            const Icon = planetIcons[p.planet.en as ZodiacBasePlanetType];

            const dx = cx - x;
            const dy = cy - y;
            const len = Math.sqrt(dx * dx + dy * dy);

            const ux = dx / len;
            const uy = dy / len;

            const iconOffset = 20;

            const iconX = x + ux * iconOffset;
            const iconY = y + uy * iconOffset;

            const p1 = polarToCartesian(cx, cy, innerR, baseAngle);
            const p2 = polarToCartesian(cx, cy, innerR - 8, baseAngle);

            return (
              <g key={i} className={styles.planetWrapper}>
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  className={styles.planetTick}
                />

                {Icon && (
                  <g
                    className={styles.planetIcon}
                    transform={`translate(${iconX - iconSize / 2}, ${iconY - iconSize / 2})`}
                  >
                    <Icon width={iconSize} height={iconSize} />
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
            className={styles.signLine}
          />
        );
      })}

      {/* аспекты */}
      {aspects.map((a, i) => {
        const p1 = a.from;
        const p2 = a.to;

        const c1 = polarToCartesian(cx, cy, aspectR, p1.fullDegree - rotation);
        const c2 = polarToCartesian(cx, cy, aspectR, p2.fullDegree - rotation);

        const aspectClass =
          a.type === "trine" || a.type === "sextile"
            ? styles.harmony
            : a.type === "square" || a.type === "opposition"
              ? styles.tension
              : styles.neutral;

        return (
          <line
            key={i}
            x1={c1.x}
            y1={c1.y}
            x2={c2.x}
            y2={c2.y}
            className={clsx(styles.aspect, aspectClass)}
          />
        );
      })}
    </svg>
  );
};