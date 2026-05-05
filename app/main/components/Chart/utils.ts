import { PlanetResponseTypeData } from "@/app/api/chart/planets/route";
import { strongAspectConfig, aspectConfig } from "./constants";
import { Aspect } from "./types";

export function calculateAspects(planets: PlanetResponseTypeData[], isStrong?: boolean): Aspect[] {
  const aspectOrbs = isStrong ? strongAspectConfig : aspectConfig
  const aspects: Aspect[] = [];

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      let angle = Math.abs(planets[i].fullDegree - planets[j].fullDegree);

      if (angle > 180) {
        angle = 360 - angle;
      }

      for (const config of aspectOrbs) {
        const diff = Math.abs(angle - config.angle);

        if (diff <= config.orb) {
          aspects.push({
            from: planets[i],
            to: planets[j],
            type: config.type,
            orb: diff,
          });
          break;
        }
      }
    }
  }

  return aspects;
}

export const toRad = (deg: number) => (deg * Math.PI) / 180;

export const polarToCartesian = (
  cx: number,
  cy: number,
  r: number,
  deg: number
) => {
  const angle = toRad(180 - deg);
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
};
