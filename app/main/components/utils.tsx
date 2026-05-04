import { HousesResponseTypeData } from "@/app/api/chart/houses/route";
import { sevenHouseSignText, ruler7InHouseText, allPlanetsInSigns, moonInSigns } from "@/app/texts";
import { ZodiacBasePlanetType, ZodiacHouseType, ZodiacPlanetType } from "@/app/types";
import { aspectConfig, rulers, strongAspectConfig } from "../constants";
import { Aspect, DescriptionDataType } from "../types";
import { ChartData, FormResponseType } from "./types";
import { SunIcon, MoonIcon, VenusIcon, JupiterIcon, SaturnIcon, UranusIcon, NeptuneIcon, PlutoIcon, MercuryIcon, MarsIcon } from "../assets/icons";
import { FC, SVGProps } from "react";
import { PlanetResponseTypeData } from "@/app/api/chart/planets/route";

export const findPlanetHouse = (planetDegree: number, houses: HousesResponseTypeData[]): ZodiacHouseType => {
  for (let i = 0; i < houses.length; i++) {
    const current = houses[i];
    const next = houses[(i + 1) % houses.length];

    const start = current.degree;
    const end = next.degree;

    if (start < end) {
      if (planetDegree >= start && planetDegree < end) {
        return current.House;
      }
    }
    else {
      if (planetDegree >= start || planetDegree < end) {
        return current.House;
      }
    }
  }
  throw new Error('planet house not found')
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
          console.log(planets[i], planets[j], config.type, diff)
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


export const formatData = (data: FormResponseType): ChartData => {
  const formattedHouses = data.houses.map(house => ({ number: house.House, degree: house.degree, signNumber: house.zodiac_sign.number, normDegree: house.normDegree }));
  const formattedPlanets = data.planets.map(planet => ({ name: planet.planet.en, degree: planet.fullDegree }));

  return { houses: formattedHouses, planets: formattedPlanets }
}

export const getDescriptionData = (data: FormResponseType): DescriptionDataType => {
  const { houses, planets } = data;

  const house = houses.find((item: { House: ZodiacHouseType; }) => item.House === 7)
  const sevenHouseSign = house?.zodiac_sign.name.en
  const houseRuler = sevenHouseSign ? rulers[sevenHouseSign] : null
  const ruler = planets.find((item: { planet: { en: ZodiacPlanetType }; }) => item.planet.en === houseRuler)
  const rulerPlanetDegree = ruler?.fullDegree;
  const rulerSign = ruler?.zodiac_sign?.name?.en
  const rulerHouse = rulerPlanetDegree ? findPlanetHouse(rulerPlanetDegree, houses) : undefined;
  const moon = planets.find((item: { planet: { en: ZodiacPlanetType; }; }) => item.planet.en === "Moon");
  const moonSign = moon?.zodiac_sign?.name?.en
  const sevenHouseText = sevenHouseSign ? sevenHouseSignText[sevenHouseSign] : ['']
  const rulerText = rulerHouse ? ruler7InHouseText[rulerHouse] : ['']
  const rulerSignText = houseRuler && rulerSign ? allPlanetsInSigns[houseRuler][rulerSign] : ['']
  const moonInSignText = moonSign ? moonInSigns[moonSign] : ['']

  return {
    sevenHouseSign, sevenHouseText, rulerText, rulerSignText, moonInSignText, rulerHouse, rulerSign, ruler, moonSign
  }
}



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