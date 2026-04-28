import { ZodiacBasePlanetType, ZodiacSignType } from "../types";
import { AspectType, ElementType } from "./types";

export const TIMEZONES = [
  { value: -12, label: 'UTC -12' },
  { value: -11, label: 'UTC -11' },
  { value: -10, label: 'UTC -10' },
  { value: -9, label: 'UTC -9' },
  { value: -8, label: 'UTC -8' },
  { value: -7, label: 'UTC -7' },
  { value: -6, label: 'UTC -6' },
  { value: -5, label: 'UTC -5' },
  { value: -4, label: 'UTC -4' },
  { value: -3, label: 'UTC -3' },
  { value: -2, label: 'UTC -2' },
  { value: -1, label: 'UTC -1' },
  { value: 0, label: 'UTC 0 (GMT)' },
  { value: 1, label: 'UTC +1' },
  { value: 2, label: 'UTC +2' },
  { value: 3, label: 'UTC +3' },
  { value: 4, label: 'UTC +4' },
  { value: 5, label: 'UTC +5' },
  { value: 6, label: 'UTC +6' },
  { value: 7, label: 'UTC +7' },
  { value: 8, label: 'UTC +8' },
  { value: 9, label: 'UTC +9' },
  { value: 10, label: 'UTC +10' },
  { value: 11, label: 'UTC +11' },
  { value: 12, label: 'UTC +12' },
];

export const rulers: { [key in ZodiacSignType]: ZodiacBasePlanetType } = {
  Aries: "Mars",
  Taurus: "Venus",
  Gemini: "Mercury",
  Cancer: "Moon",
  Leo: "Sun",
  Virgo: "Mercury",
  Libra: "Venus",
  Scorpio: "Pluto",
  Sagittarius: "Jupiter",
  Capricorn: "Saturn",
  Aquarius: "Uranus",
  Pisces: "Neptune",
};

export const elementColors = {
  fire: "#ffe5e5",   // мягкий красный
  earth: "#e8f5e9",  // мягкий зелёный
  air: "#e3f2fd",    // мягкий голубой
  water: "#ede7f6",  // мягкий фиолетовый
};

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

export const planetSymbols: Record<ZodiacBasePlanetType, string> = {
  Sun: "☉",
  Moon: "☽",
  Mercury: "☿",
  Venus: "♀",
  Mars: "♂",
  Jupiter: "♃",
  Saturn: "♄",
  Uranus: "♅",
  Neptune: "♆",
  Pluto: "♇",
};

export const zodiacSigns = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

export const aspectColors: Record<AspectType, string> = {
  conjunction: "#999",
  opposition: "#e53935",
  square: "#fb8c00",
  trine: "#43a047",
  sextile: "#1e88e5",
};

export const aspectConfig = [
  { type: "conjunction", angle: 0, orb: 8 },
  { type: "sextile", angle: 60, orb: 4 },
  { type: "square", angle: 90, orb: 6 },
  { type: "trine", angle: 120, orb: 6 },
  { type: "opposition", angle: 180, orb: 8 },
] as const;