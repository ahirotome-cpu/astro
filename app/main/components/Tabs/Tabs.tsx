import React, { useCallback, useState } from 'react'
import { tabs } from './constants'
import styles from './tabs.module.css'
import mainStyles from '../../main.module.css'
import clsx from 'clsx'
import { IData, Prompt, Tab, TabType } from './types'
import { getPrompt } from './utils'

export const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType | null>(null);
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
    setActiveTab(type);
    const data = JSON.parse(localStorage.getItem(type) || 'null');
    if (data) {
      setData(data)
    } else {
      const houses = JSON.parse(localStorage.getItem('houses') || 'null');
      const planets = JSON.parse(localStorage.getItem('planets') || 'null');
      if (houses && planets) {
        const prompt = getPrompt({ type, houses, planets })
        if (prompt) {
          generateText(type, prompt)
        }
      }
    }
  }, [])

  const renderSection = ({ title, description }: { title: string, description: string }) => {
    return <section className={styles.section} key={title}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <ul className={styles.list}>
        <p className={mainStyles.text}>{description}</p>
      </ul>
    </section>
  }

  return <div className={styles.tabs}>
    <h2 className={mainStyles.title}>Все темы</h2>
    <h3 className={mainStyles.subtitle}>Выберите сферу жизни для анализа</h3>
    <div className={styles.tabsRow}>{tabs.map(tab => {
      const Icon = tab.icon
      return <div className={clsx(styles.tab, activeTab === tab.type && styles.activeTab)} key={tab.id} onClick={handleClickTab(tab)}>
        <Icon />
        <p className={styles.tabText}>{tab.name}</p>
      </div>
    }
    )}
    </div>
    {data ? <div className={styles.textBlock}>
      <div className={styles.header}>
        <h1 className={mainStyles.title}>{data.title}</h1>
        <p className={mainStyles.text}>{data.description}</p>
      </div>
      {data.texts?.map(item => renderSection(item))}
    </div> : <p className={mainStyles.text}>Этот раздел еще не готов</p>}
  </div>
}