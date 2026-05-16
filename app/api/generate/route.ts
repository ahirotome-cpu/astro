import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { data, theme } = await req.json();

  // const model = 'openrouter/free'
  // const model = 'meta-llama/llama-3.2-3b-instruct:free'
  const model = 'openai/gpt-oss-120b:free'

  const content = `
Собери один цельный, логически связный текст из данных абзацев объемом около 700 слов.

Требования:
- если одна и та же идея встречается несколько раз — оставь один раз, переформулировав при необходимости
- не используй английские слова
- проверь орфографию и стиль (сделай текст профессиональным, как у астролога)

ИСХОДНЫЕ ДАННЫЕ:
${data}

Нужно собрать текст на тему ${theme}. Если в исходных данных затронуто несколько тем, используй только те части которые соответствует заданной теме.

Верни результат в виде текста с markdown-разметкой. Без таблиц. Не больше трех списков в тексте. Без нумерации пунктов и списков. 
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": `${process.env.APP}`,
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
    console.log("generate text error:", err);
  }
}