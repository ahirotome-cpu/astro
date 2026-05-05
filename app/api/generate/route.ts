import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {data, format} = await req.json();

  // const model = 'openrouter/free'
  // const model = 'meta-llama/llama-3.2-3b-instruct:free'
  const model = 'openai/gpt-oss-120b:free'

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
- сократи исходный материал примерно на 50%
- убери повторы
- делай короткие абзацы
- не используй сложные метафоры
- не пиши советы списком
- избегай слов с сильной негативной окраской ("пустота", "вакуум", "должен")
- избегай неудачных или двусмысленных формулировок, которые могут восприниматься негативно или неуместно

СТРУКТУРА:

1. Заголовок (короткая фраза, без ярлыков)
2. Короткое описание (2–3 предложения с ключевым внутренним конфликтом)

3. Как человек ведёт себя в отношениях
- 3–5 конкретных паттернов

4. Где возникает напряжение
- 3–5 конкретных ситуаций/триггеров

5. Почему это происходит
- 1 короткий абзац с внутренним конфликтом

6. Ключевой инсайт
- 1 абзац, без банальных советов

---

ИСХОДНЫЕ ДАННЫЕ: ${data}

---

Собери финальный текст по структуре.
Не объясняй астрологию.
Не копируй формулировки из исходных данных.

ФОРМАТ: ${format}

ПРАВИЛА:
- ничего кроме JSON не возвращай
- не добавляй комментарии
- не используй Markdown
- массивы = только короткие пункты
- все строки должны быть короткими и простыми
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
      core: parsed.core ?? "",
      behavior: Array.isArray(parsed.behavior) ? parsed.behavior : [],
      tension: Array.isArray(parsed.tension) ? parsed.tension : [],
      why: parsed.why ?? "",
      insight: parsed.insight ?? "",
    };

    return NextResponse.json(json);
  } catch (err) {
    console.log("generate text error:", err);
  }
}