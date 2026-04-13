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
  console.log(data?.output?.Houses.map((item: { House: any; zodiac_sign: { name: { en: any; }; }; }) => ({ house: item?.House, name: item?.zodiac_sign?.name?.en })))

  return NextResponse.json({
    result: `${data?.output?.Houses?.[7]?.zodiac_sign?.name?.en}` || "Ошибка генерации"
  });
}