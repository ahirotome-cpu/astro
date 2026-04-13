import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { year, month, date, hours, minutes, latitude, longitude, timezone } = body;

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

  const data = await response.json();

  return NextResponse.json({
    result: data?.output || "Ошибка генерации"
  });
}