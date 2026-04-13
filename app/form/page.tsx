'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { TIMEZONES } from './page.constants';

export default function FormPage() {
  const [form, setForm] = useState({
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    timezone: '',
    lat: '',
    lon: ''
  });

  const [result, setResult] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Данные рождения</h1>

        <div className={styles.grid}>
          <input name="day" placeholder="День" type="number" onChange={handleChange} />
          <input name="month" placeholder="Месяц" type="number" onChange={handleChange} />
          <input name="year" placeholder="Год" type="number" onChange={handleChange} />

          <input name="hour" placeholder="Часы" type="number" onChange={handleChange} />
          <input name="minute" placeholder="Минуты" type="number" onChange={handleChange} />

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

          <input name="lat" placeholder="Широта" type="number" step="any" onChange={handleChange} />
          <input name="lon" placeholder="Долгота" type="number" step="any" onChange={handleChange} />
        </div>

        <button className={styles.button} onClick={handleClick}>
          Рассчитать
        </button>

        {result && <div className={styles.result}>{result}</div>}
      </div>
    </main>
  );
}