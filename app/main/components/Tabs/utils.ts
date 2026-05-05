import { HousesResponseTypeData } from "@/app/api/chart/houses/route";
import { Prompt, TabType } from "./types";
import { PlanetResponseTypeData } from "@/app/api/chart/planets/route";
import { ZodiacHouseType } from "@/app/types";
import { allPlanetsInSigns, moonInSigns, ruler7InHouseText, sevenHouseSignText } from "./texts";
import { rulers } from "./constants";

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

export const getPrompt = ({ type, houses, planets }: {
  type: TabType,
  houses: HousesResponseTypeData[],
  planets: PlanetResponseTypeData[]
}): Prompt => {
  switch (type) {
    case TabType.RELATIONS: {
      const house = houses.find((item) => item.House === 7)
      const sevenHouseSign = house?.zodiac_sign.name.en
      const houseRuler = sevenHouseSign ? rulers[sevenHouseSign] : null
      const ruler = planets.find((item) => item.planet.en === houseRuler)
      const rulerPlanetDegree = ruler?.fullDegree;
      const rulerSign = ruler?.zodiac_sign?.name?.en
      const rulerHouse = rulerPlanetDegree ? findPlanetHouse(rulerPlanetDegree, houses) : undefined;
      const moon = planets.find((item) => item.planet.en === "Moon");
      const moonSign = moon?.zodiac_sign?.name?.en
      const sevenHouseText = sevenHouseSign ? sevenHouseSignText[sevenHouseSign] : ['']
      const rulerText = rulerHouse ? ruler7InHouseText[rulerHouse] : ['']
      const rulerSignText = houseRuler && rulerSign ? allPlanetsInSigns[houseRuler][rulerSign] : ['']
      const moonInSignText = moonSign ? moonInSigns[moonSign] : ['']
      const data = `7 дом в ${sevenHouseSign}: ${sevenHouseText}. 
      Управитель 7 дома ${ruler} в ${rulerHouse} доме: ${rulerText}.
      Управитель 7 дома в знаке ${rulerSign}: ${rulerSignText}.
      Луна в знаке ${moonSign}: ${moonInSignText}`
      const format = `{
  "title": string,
  "core": string,
  "behavior": string[],
  "tension": string[],
  "why": string,
  "insight": string
}`

      return { data, format }
    }
    default: {
      return { data: '', format: '' }
    }
  }
}