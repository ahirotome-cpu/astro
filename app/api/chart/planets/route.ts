import { ZodiacPlanetType, ZodiacSignType } from "@/app/types";
import { NextResponse } from "next/server";

export interface PlanetResponseTypeData {
  planet: {
    en: ZodiacPlanetType;
  };
  fullDegree: number;
  normDegree: number;
  isRetro: "true" | "false" | "True" | "False";
  zodiac_sign: {
    number: number;
    name: {
      en: ZodiacSignType;
    };
  };
};

interface ResponseType {
  output: PlanetResponseTypeData[]
}

export async function POST(req: Request): Promise<NextResponse<PlanetResponseTypeData[]> | undefined> {
  const body = await req.json();
  const { year, month, date, hours, minutes, latitude, longitude, timezone } = body;

  try {

    const response = await fetch(
      "https://json.freeastrologyapi.com/western/planets",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.FREE_ASTROLOGY_API_KEY}`,
        },
        body: JSON.stringify({
          year,
          month,
          date,
          hours,
          minutes,
          seconds: 0,
          latitude,
          longitude,
          timezone,
          config: {
            observation_point: "topocentric",
            ayanamsha: "tropical",
            house_system: "Placidus",
            language: "en",
          },
        }),
      }
    );

    const data: ResponseType = await response.json();

    return NextResponse.json(data?.output);
  }
  catch (err) {
    console.log("Planet response error:", JSON.stringify(err, null, 2));
  }
}