import React from 'react'
import { tabs } from './tabs.constants'
import styles from './tabs.module.css'
import mainStyles from '../../main.module.css'

export const Tabs = () => {
  return <div className={styles.tabs}>
    <h2 className={mainStyles.title}>Все темы</h2>
    <h3 className={mainStyles.subtitle}>Выберите сферу жизни для анализа</h3>
    <div className={styles.tabsRow}>{tabs.map(tab => {
      const Icon = tab.icon
        return <div className={styles.tab}>
        <Icon/>
        <p className={styles.tabText}>{tab.name}</p>
      </div>
      }
    )}</div>
  </div>
}