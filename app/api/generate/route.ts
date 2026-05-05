import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { data, structure } = await req.json();

  // const model = 'openrouter/free'
  // const model = 'meta-llama/llama-3.2-3b-instruct:free'
  const model = 'openai/gpt-oss-120b:free'
  const format = `{
      "title": string, 
      "description": string, 
      "texts": {"title": string, "description": string}[]
    }`

  const content = `
Ты создаёшь интерпретацию отношений на основе астрологических факторов.

ТВОЯ ЗАДАЧА:
Собрать короткий, точный и узнаваемый текст, в котором человек видит себя.

СТИЛЬ:
- пиши просто и по делу, без эзотерики и пафоса
- описывай поведение, чувства и реакции, а не абстрактные идеи
- не используй ярлыки и типологии
- не звучи как диагноз или оценка
- пиши естественно, как будто человек узнаёт себя в тексте
- избегай сложных и перегруженных формулировок
- не используй английские слова
- проверяй орфографию

ОГРАНИЧЕНИЯ:
- не используй сложные метафоры
- избегай слов с сильной негативной окраской ("пустота", "вакуум", "должен")
- избегай неудачных или двусмысленных формулировок, которые могут восприниматься негативно или неуместно

СТРУКТУРА: ${structure}
ИСХОДНЫЕ ДАННЫЕ: ${data}

Собери финальный текст по структуре.

ФОРМАТ: ${format}

ПРАВИЛА:
- ничего кроме JSON не возвращай
- не добавляй комментарии
- не используй Markdown
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
    const parsed = JSON.parse(result);
    const json = {
      title: parsed.title ?? "",
      description: parsed.description ?? "",
      texts: parsed.texts ?? []
    };

    return NextResponse.json(json);
  } catch (err) {
    console.log("generate text error:", err);
  }
}