import React, { useCallback, useState } from 'react'
import { tabs } from './constants'
import styles from './tabs.module.css'
import mainStyles from '../../main.module.css'
import clsx from 'clsx'
import { Prompt, Tab, TabType } from './types'
import { getPrompt } from './utils'
import ReactMarkdown from 'react-markdown'

export const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType | null>(null);
  const [data, setData] = useState<string>('Этот раздел еще не готов')

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

  const handleClickTab = useCallback(({ type }: Tab) => () => {
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

  return <div className={styles.tabs}>
    <h2 className={mainStyles.title}>Все темы</h2>
    <h3 className={mainStyles.subtitle}>Выберите сферу жизни для анализа</h3>
    <div className={styles.tabsRow}>{tabs.map(tab => {
      const Icon = tab.icon
      return <div className={clsx(styles.tab, activeTab === tab.type && styles.activeTab)} key={tab.type} onClick={handleClickTab(tab)}>
        <Icon />
        <p className={styles.tabText}>{tab.name}</p>
      </div>
    }
    )}
    </div>
    <div className={styles.markdown}><ReactMarkdown>{data}</ReactMarkdown></div>
  </div>
}