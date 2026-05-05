import { PlanetResponseTypeData } from "@/app/api/chart/planets/route";

export type ElementType = "fire" | "earth" | "air" | "water";

export type AspectType =
  | "conjunction" // 0°
  | "sextile"     // 60°
  | "square"      // 90°
  | "trine"       // 120°
  | "opposition"; // 180°

export type Aspect = {
  from: PlanetResponseTypeData;
  to: PlanetResponseTypeData;
  type: AspectType;
  orb: number; 
};