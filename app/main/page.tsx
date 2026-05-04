'use client';

import { useCallback, useState } from 'react';
import styles from './main.module.css';
import { Chart } from './components/Chart/Chart';
import { Description } from './components/Description';
import { Form } from './components/Form';
import { FormResponseType } from './components/types';
import { Tabs } from './components/Tabs';

export default function MainPage() {
  const [formData, setFormData] = useState<FormResponseType>({ planets: [], houses: [] })

  const handleSubmitForm = useCallback(({ houses, planets }: FormResponseType) => {
    setFormData({ houses, planets })
  }, [])

  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.firstBlock}>
          <Form onChange={handleSubmitForm} />
          <Chart data={formData} />
        </div>
        <Tabs/>
        {/* <Description formData={formData}></Description> */}
      </div>
    </main>
  );
}