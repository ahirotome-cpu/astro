import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { sevenHouseText, rulerText, rulerSignText, moonInSignText } = await req.json();

  const model = 'openrouter/free'
  const content = `Ты собираешь интерпретацию отношений из готовых смысловых блоков.
    Твоя задача:
    - объединить данные в понятный текст
    - объяснить как эти факторы проявляются в отношениях
    - показать внутренние противоречия и динамику
    СТИЛЬ:
    - простой язык
    - конкретные формулировки
    ВХОДНЫЕ ДАННЫЕ:
    ${sevenHouseText}
    ${rulerText}
    ${rulerSignText}
    ${moonInSignText}
    ЗАДАЧА:
    Собери цельный текст про человека в отношениях.`

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Astro App"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "user", content }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    return NextResponse.json(result);
  } catch (err) {
    console.log("generate text error:", JSON.stringify(err, null, 2));
  }
}