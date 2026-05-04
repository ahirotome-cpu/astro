import React, { useCallback, useState } from 'react'
import { tabs } from './constants'
import styles from './tabs.module.css'
import mainStyles from '../../main.module.css'
import clsx from 'clsx'

export const Tabs:React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const handleClickTab = useCallback((id: number) => () => {
    setActiveTab(id)
  }, [])

  return <div className={styles.tabs}>
    <h2 className={mainStyles.title}>Все темы</h2>
    <h3 className={mainStyles.subtitle}>Выберите сферу жизни для анализа</h3>
    <div className={styles.tabsRow}>{tabs.map(tab => {
      const Icon = tab.icon
      return <div className={clsx(styles.tab, activeTab === tab.id && styles.activeTab)} key={tab.id} onClick={handleClickTab(tab.id)}>
        <Icon />
        <p className={styles.tabText}>{tab.name}</p>
      </div>
    }
    )}</div>
  </div>
}