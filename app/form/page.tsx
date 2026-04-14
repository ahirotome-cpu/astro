'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { findPlanetHouse } from './page.utils';
import { allPlanetsInSigns, moonInSigns, ruler7InHouseText, sevenHouseSignText } from '../texts';
import { ZodiacHouseType, ZodiacPlanetType, ZodiacSignType } from '../types';
import { rulers, TIMEZONES } from './page.constants';

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
    const housesResponse = await fetch('/api/chart/houses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const planetsResponse = await fetch('/api/chart/planets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const houses = await housesResponse.json();
    const planets = await planetsResponse.json();

    const house = houses?.find((item: { House: ZodiacHouseType; }) => item.House === 7)
    const houseSign: ZodiacSignType = house.zodiac_sign.name.en
    const houseRuler = rulers[houseSign]
    const rulerPlanet = planets?.find((item: { planet: { en: ZodiacPlanetType }; }) => item.planet.en === houseRuler)
    const rulerPlanetDegree = rulerPlanet?.fullDegree;
    const rulerPlanetSign: ZodiacSignType = rulerPlanet.zodiac_sign?.name?.en
    const rulerPlanetHouse: ZodiacHouseType | 0 = findPlanetHouse(rulerPlanetDegree, houses);
    const moon = planets.find((item: { planet: { en: ZodiacPlanetType; }; }) => item.planet.en === "Moon");
    const moonSign: ZodiacSignType = moon.zodiac_sign?.name?.en

    const sevenHouseText = sevenHouseSignText[houseSign]
    const rulerText = ruler7InHouseText[rulerPlanetHouse]
    const rulerSignText = allPlanetsInSigns[houseRuler][rulerPlanetSign]
    const moonInSignText = moonInSigns[moonSign]

    const textResponse = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sevenHouseText, rulerText, rulerSignText, moonInSignText })
    });

    const data = await textResponse.json();
    setResult(data);
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