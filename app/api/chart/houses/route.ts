import { ZodiacHouseType, ZodiacSignType } from "@/app/types";
import { NextResponse } from "next/server";

export interface HousesResponseTypeData {
  House: ZodiacHouseType,
  degree: number,
  normDegree: number,
  zodiac_sign: {
    number: number,
    name: {
      en: ZodiacSignType
    }
  }
}

interface ResponseType {
  output: { Houses: HousesResponseTypeData[] }
}

export async function POST(req: Request): Promise<NextResponse<HousesResponseTypeData[]> | undefined> {
  const body = await req.json();
  const { year, month, day, hour, minute, latitude, longitude, timezone } = body;

  try {
    const response = await fetch(
      "https://json.freeastrologyapi.com/western/houses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.FREE_ASTROLOGY_API_KEY}`,
        },
        body: JSON.stringify({
          year,
          month,
          date: day,
          hours: hour,
          minutes: minute,
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
    return NextResponse.json(data?.output.Houses);
  } catch (err) {
    console.log("House response error:", JSON.stringify(err, null, 2));
  }
}