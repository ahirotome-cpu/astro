import { ZodiacBasePlanetType } from "@/app/types";
import { ElementType } from "./types";
import { FC, SVGProps } from "react";
import { SunIcon, MoonIcon, MercuryIcon, VenusIcon, MarsIcon, JupiterIcon, SaturnIcon, UranusIcon, NeptuneIcon, PlutoIcon, AquariusIcon, AriesIcon, CancerIcon, CapricornIcon, GeminiIcon, LeoIcon, LibraIcon, PiscesIcon, SagittariusIcon, ScorpioIcon, TaurusIcon, VirgoIcon } from "../../assets/icons";

export const signElements: ElementType[] = [
  "fire",  // ♈
  "earth", // ♉
  "air",   // ♊
  "water", // ♋
  "fire",  // ♌
  "earth", // ♍
  "air",   // ♎
  "water", // ♏
  "fire",  // ♐
  "earth", // ♑
  "air",   // ♒
  "water", // ♓
];

export const elementColors = {
  fire: "#ffe5e5",   // мягкий красный
  earth: "#e8f5e9",  // мягкий зелёный
  air: "#e3f2fd",    // мягкий голубой
  water: "#ede7f6",  // мягкий фиолетовый
};

export const basePlanets: ZodiacBasePlanetType[] = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"]

export const planetIcons: Record<ZodiacBasePlanetType, FC<SVGProps<SVGSVGElement>>> = {
  Sun: SunIcon,
  Moon: MoonIcon,
  Mercury: MercuryIcon,
  Venus: VenusIcon,
  Mars: MarsIcon,
  Jupiter: JupiterIcon,
  Saturn: SaturnIcon,
  Uranus: UranusIcon,
  Neptune: NeptuneIcon,
  Pluto: PlutoIcon,
};

export const aspectConfig = [
  { type: "conjunction", angle: 0, orb: 8 },
  { type: "sextile", angle: 60, orb: 4 },
  { type: "square", angle: 90, orb: 6 },
  { type: "trine", angle: 120, orb: 6 },
  { type: "opposition", angle: 180, orb: 8 },
] as const;

export const strongAspectConfig = [
  { type: "conjunction", angle: 0, orb: 6 },
  { type: "sextile", angle: 60, orb: 4 },
  { type: "square", angle: 90, orb: 6 },
  { type: "trine", angle: 120, orb: 6 },
  { type: "opposition", angle: 180, orb: 6 },
] as const;

export const signIcons = [AriesIcon, TaurusIcon, GeminiIcon, CancerIcon, LeoIcon, VirgoIcon, LibraIcon, ScorpioIcon, SagittariusIcon, CapricornIcon, AquariusIcon, PiscesIcon]
