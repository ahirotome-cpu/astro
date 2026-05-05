'use client';

import styles from './main.module.css';
import { Chart } from './components/Chart';
import { Tabs } from './components/Tabs';
import { Form } from './components/Form';

export default function MainPage() {
  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.firstBlock}>
          <Form />
          <Chart />
        </div>
        <Tabs/>
      </div>
    </main>
  );
}