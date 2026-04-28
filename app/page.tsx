'use client';

import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  return (
    <main className={styles.container}>
      <h1>Узнай, какие у тебя отношения</h1>

      <button className={styles.button} onClick={() => router.push('/main')}>
        Разобрать мои отношения
      </button>
    </main>
  );
}