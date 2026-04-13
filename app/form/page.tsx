'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { TIMEZONES } from './page.constants';

export default function FormPage() {
  const [form, setForm] = useState({
    date: 0,
    month: 0,
    year: 0,
    hours: 0,
    minutes: 0,
    timezone: 0,
    latitude: 0,
    longitude: 0
  });

  const [result, setResult] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleClick = async () => {
    const res = await fetch('/api/chart/houses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    console.log(data) 
    // setResult(data.result);
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Данные рождения</h1>

        <div className={styles.grid}>
          <input name="date" placeholder="День" type="number" onChange={handleChange} />
          <input name="month" placeholder="Месяц" type="number" onChange={handleChange} />
          <input name="year" placeholder="Год" type="number" onChange={handleChange} />

          <input name="hours" placeholder="Часы" type="number" onChange={handleChange} />
          <input name="minutes" placeholder="Минуты" type="number" onChange={handleChange} />

          <div className={styles.selectWrapper}>
            <select
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Выберите тайм-зону</option>
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          <input name="latitude" placeholder="Широта" type="number" step="any" onChange={handleChange} />
          <input name="longitude" placeholder="Долгота" type="number" step="any" onChange={handleChange} />
        </div>

        <button className={styles.button} onClick={handleClick}>
          Рассчитать
        </button>

        {result && <div className={styles.result}>{result}</div>}
      </div>
    </main>
  );
}