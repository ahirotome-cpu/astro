import { HousesResponseTypeData } from "@/app/api/chart/houses/route";
import { Prompt, TabType } from "./types";
import { PlanetResponseTypeData } from "@/app/api/chart/planets/route";
import { ZodiacHouseType } from "@/app/types";
import { allPlanetsInSigns, eightHouseSignText, moonInSigns, ruler2InHouseText, ruler7InHouseText, secondHouseSignText, sevenHouseSignText, venusInSigns } from "./texts";
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
}): Prompt | null => {
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
      "insight": string }`

            const structure = `
    title: Заголовок
    description: Короткое описание
    texts: [{title: "Как человек ведёт себя в отношениях", description: текст с ответом},
    {title: "Где возникает напряжение", description: текст с ответом},
    {title: "Почему это происходит", description: текст с ответом},
    {title: "Ключевой инсайт", description: текст с ответом}]
    `

      return { data, structure }
    }
    case TabType.FINANCE: {
      const secondHouse = houses.find((item) => item.House === 2)
      const secondHouseSign = secondHouse?.zodiac_sign.name.en

      const secondHouseRulerName = secondHouseSign ? rulers[secondHouseSign] : null
      const secondHouseRuler = planets.find((item) => item.planet.en === secondHouseRulerName)

      const rulerDegree = secondHouseRuler?.fullDegree
      const rulerSign = secondHouseRuler?.zodiac_sign?.name?.en
      const rulerHouse = rulerDegree ? findPlanetHouse(rulerDegree, houses) : undefined

      const eightHouse = houses.find((item) => item.House === 8)
      const eightHouseSign = eightHouse?.zodiac_sign.name.en

      const venus = planets.find((item) => item.planet.en === "Venus")
      const venusSign = venus?.zodiac_sign?.name?.en

      const secondHouseText = secondHouseSign ? secondHouseSignText[secondHouseSign] : ['']
      const rulerHouseText = rulerHouse ? ruler2InHouseText[rulerHouse] : ['']
      const rulerSignText = secondHouseRulerName && rulerSign
        ? allPlanetsInSigns[secondHouseRulerName][rulerSign]
        : ['']

      const eightHouseText = eightHouseSign ? eightHouseSignText[eightHouseSign] : ['']
      const venusText = venusSign ? venusInSigns[venusSign] : ['']

      const data = `
      2 дом в ${secondHouseSign}: ${secondHouseText}.
      Управитель 2 дома ${secondHouseRulerName} в ${rulerHouse} доме: ${rulerHouseText}.
      Управитель 2 дома в знаке ${rulerSign}: ${rulerSignText}.      
      8 дом в ${eightHouseSign}: ${eightHouseText}.      
      Венера в знаке ${venusSign}: ${venusText}.
      `
      const structure = `
    title: Заголовок
    description: Короткое описание
    texts: [{title: "Откуда приходят деньги", description: текст с ответом},
    {title: "Как тратятся деньги", description: текст с ответом},
    {title: "Как взаимодействует с общими ресурсами и деньгами партнеров", description: текст с ответом},
    {title: "Общая картина", description: текст с ответом}]
    `
      return { data, structure }
    }
    default: {
      return null
    }
  }
}