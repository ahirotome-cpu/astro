import { PlanetResponseTypeData } from "../api/chart/planets/route";
import {  ZodiacBasePlanetType, ZodiacPlanetType, ZodiacSignType } from "../types";

export interface FormState {
  name: string;
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  timezone: number;
  latitude: number;
  longitude: number;
};

export interface IData {
  title: string,
  core: string,
  behavior: string[],
  tension: string[],
  why: string,
  insight: string
}




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
  orb: number; // насколько отклонение
};


export interface DescriptionDataType {
  sevenHouseSign?: ZodiacSignType,
  sevenHouseText: string[],
  rulerText: string[],
  rulerSignText: string[],
  moonInSignText: string[],
  rulerHouse?: number,
  rulerSign?: ZodiacSignType,
  ruler?: PlanetResponseTypeData ,
  moonSign?: ZodiacSignType
}
