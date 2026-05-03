import { HousesResponseTypeData } from "@/app/api/chart/houses/route";
import { PlanetResponseTypeData } from "@/app/api/chart/planets/route";
import { ZodiacPlanetType, ZodiacHouseType, ZodiacSignType } from "@/app/types";

export interface FormResponseType {
  houses: HousesResponseTypeData[],
  planets: PlanetResponseTypeData[]
}

export interface DescriptionProps {
  formData: FormResponseType
}

export type ChartProps = {
  data: FormResponseType;
};

export type Planet = {
  name: ZodiacPlanetType;
  degree: number;
};

export type House = {
  number: ZodiacHouseType;
  degree: number;
  signNumber: number
  normDegree: number
};

export type ChartData = {
  planets: Planet[];
  houses: House[];
};