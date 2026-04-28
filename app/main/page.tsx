'use client';

import { useCallback, useState } from 'react';
import styles from './main.module.css';
import { FormResponseType } from './types';
import { Chart } from './components/Chart';
import { Description } from './components/Description';
import { Form } from './components/Form';

export default function MainPage() {
  const [formData, setFormData] = useState<FormResponseType>({ planets: [], houses: [] })

  const handleSubmitForm = useCallback(({ houses, planets }: FormResponseType) => {
    setFormData({ houses, planets })
  }, [])

  return (
    <main className={styles.page}>
      <Chart data={formData} />
      <div className={styles.card}>
        <h1 className={styles.title}>Данные рождения</h1>
        <Form onChange={handleSubmitForm} />
        <Description formData={formData}></Description>
      </div>
    </main>
  );
}