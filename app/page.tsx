import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <h1>Узнай, какие у тебя отношения</h1>

      <button className={styles.button}>
        Разобрать мои отношения
      </button>
    </main>
  );
}