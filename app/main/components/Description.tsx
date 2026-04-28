import { useEffect, useState } from "react";
import { DescriptionDataType, IData } from "../types";
import { getDescriptionData } from "../utils";
import { DescriptionProps } from "./types";

export const Description: React.FC<DescriptionProps> = ({ formData }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IData>({
    title: '',
    core: '',
    behavior: [],
    tension: [],
    why: '',
    insight: ''
  });

  const handleResponse = async (descriptionData: DescriptionDataType) => {
    const textResponse = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(descriptionData)
    });

    const data = await textResponse.json();
    setData(data)
  }

  useEffect(() => {
    const descriptionData = getDescriptionData(formData)
    handleResponse(descriptionData)
  }, [])

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl shadow-lg border border-neutral-200 bg-white p-6 space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-xl font-semibold leading-snug">
          {data.title}
        </h1>
        <p className="text-sm text-neutral-500">
          {data.core}
        </p>
      </div>

      {/* Behavior */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-neutral-800">
          Как ты ведёшь себя в отношениях
        </h2>
        <ul className="space-y-2 text-sm text-neutral-700">
          {data.behavior?.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-neutral-400">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tension */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-neutral-800">
          Где возникает напряжение
        </h2>
        <ul className="space-y-2 text-sm text-neutral-700">
          {data.tension?.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-neutral-400">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-neutral-800">
          Почему это происходит
        </h2>
        <p className="text-sm text-neutral-700 leading-relaxed">
          {data.why}
        </p>
      </section>

      {/* Insight */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-neutral-800">
          Ключевой инсайт
        </h2>
        <p className="text-sm text-neutral-700 leading-relaxed">
          {data.insight}
        </p>
      </section>
    </div>
  );
}