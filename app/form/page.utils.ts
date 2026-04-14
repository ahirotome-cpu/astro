import { HousesResponseTypeData } from "../api/chart/houses/route";
import { ZodiacHouseType } from "../types";

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