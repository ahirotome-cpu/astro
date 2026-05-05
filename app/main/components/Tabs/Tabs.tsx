import React, { useCallback, useEffect, useState } from 'react'
import { tabs } from './constants'
import styles from './tabs.module.css'
import mainStyles from '../../main.module.css'
import clsx from 'clsx'
import { IData, Prompt, Tab, TabType } from './types'
import { getPrompt } from './utils'

export const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [data, setData] = useState<IData | null>(null)

  const generateText = async (type: TabType, prompt: Prompt) => {
    const textResponse = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prompt)
    });

    const data = await textResponse.json();
    setData(data)
    localStorage.setItem(type, JSON.stringify(data))
  }

  const handleClickTab = useCallback(({ id, type }: Tab) => () => {
    const data = JSON.parse(localStorage.getItem(type) || 'null');
    if (data) {
      setData(data)
    } else {
      const houses = JSON.parse(localStorage.getItem('houses') || 'null');
      const planets = JSON.parse(localStorage.getItem('planets') || 'null');
      if (houses && planets) {
        setActiveTab(id);
        const prompt = getPrompt({ type, houses, planets })
        generateText(type, prompt)
      }
    }
  }, [])

  return <div className={styles.tabs}>
    <h2 className={mainStyles.title}>Все темы</h2>
    <h3 className={mainStyles.subtitle}>Выберите сферу жизни для анализа</h3>
    <div className={styles.tabsRow}>{tabs.map(tab => {
      const Icon = tab.icon
      return <div className={clsx(styles.tab, activeTab === tab.id && styles.activeTab)} key={tab.id} onClick={handleClickTab(tab)}>
        <Icon />
        <p className={styles.tabText}>{tab.name}</p>
      </div>
    }
    )}
    </div>
    {data && <div className={styles.textBlock}>
      <div className={styles.header}>
        <h1 className={mainStyles.title}>{data.title}</h1>
        <p className={mainStyles.text}>{data.core}</p>
      </div>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Как ты ведёшь себя в отношениях
        </h2>
        <ul className={styles.list}>
          {data.behavior?.map((item, i) => (
            <li key={i} className={styles.listItem}>
              <span className={styles.bullet}>•</span>
              <span className={mainStyles.text}>{item}</span>
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
              <span className={mainStyles.text}>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Почему это происходит
        </h2>
        <p className={mainStyles.text}>{data.why}</p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Ключевой инсайт
        </h2>
        <p className={mainStyles.text}>{data.insight}</p>
      </section>
    </div>}
  </div>
}