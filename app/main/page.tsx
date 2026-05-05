'use client';

import { useEffect, useState } from 'react';
import styles from './main.module.css';
import { Chart } from './components/Chart/Chart';
import { Form } from './components/Form';
import { FormResponseType } from './components/types';
import { Tabs } from './components/Tabs';

export default function MainPage() {
  const [formData, setFormData] = useState<FormResponseType>({ planets: [], houses: [] })

  useEffect(() => {
    const houses = JSON.parse(localStorage.getItem('houses') || 'null');    
    const planets = JSON.parse(localStorage.getItem('planets') || 'null');
    if(houses && planets) {
      setFormData({ houses, planets })
    }
  }, [])

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.firstBlock}>
          <Form />
          <Chart data={formData} />
        </div>
        <Tabs/>
      </div>
    </main>
  );
}