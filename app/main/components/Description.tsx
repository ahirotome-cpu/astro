import { useState } from "react";
import { IData } from "../types";
import { getDescriptionData } from "../utils";
import { DescriptionProps } from "./types";
import styles from '../main.module.css'

export const Description: React.FC<DescriptionProps> = ({ formData }) => {
  const [data, setData] = useState<IData | null>(null);

  const handleResponse = async () => {
    const descriptionData = getDescriptionData(formData)
    const textResponse = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(descriptionData)
    });

    const data = await textResponse.json();
    setData(data)
  }

  return !data ?
      <button className={styles.button} onClick={handleResponse}>
        Получить разбор отношений
      </button> : <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.core}>{data.core}</p>
        </div>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Как ты ведёшь себя в отношениях
          </h2>
          <ul className={styles.list}>
            {data.behavior?.map((item, i) => (
              <li key={i} className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Где возникает напряжение
          </h2>
          <ul className={styles.list}>
            {data.tension?.map((item, i) => (
              <li key={i} className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Почему это происходит
          </h2>
          <p className={styles.text}>{data.why}</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Ключевой инсайт
          </h2>
          <p className={styles.text}>{data.insight}</p>
        </section>
      </div>
}