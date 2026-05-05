import { useEffect } from "react";
import { FormState } from "./types";
import { useForm } from "react-hook-form";
import styles from './form.module.css';
import mainStyles from '../../main.module.css';
import { TIMEZONES } from "./constants";
import { PlanetResponseTypeData } from "@/app/api/chart/planets/route";
import { HousesResponseTypeData } from "@/app/api/chart/houses/route";

export const Form = () => {
  const { setValue, register, handleSubmit } = useForm<FormState>({
    defaultValues: {
      name: '',
      day: 0,
      month: 0,
      year: 0,
      hour: 0,
      minute: 0,
      timezone: 0,
      latitude: 0,
      longitude: 0
    }
  })

  const handleSubmitForm = async (formFields: FormState) => {
    for (const [key, value] of Object.entries(formFields)) {
      localStorage.setItem(key, value)
    }
    const housesResponse = await fetch('/api/chart/houses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formFields)
    });
    const planetsResponse = await fetch('/api/chart/planets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formFields)
    });

    const houses: HousesResponseTypeData[] = await housesResponse.json();
    const planets: PlanetResponseTypeData[] = await planetsResponse.json();

    localStorage.setItem('planets', JSON.stringify(planets))
    localStorage.setItem('houses', JSON.stringify(houses))
  };

  useEffect(() => {
    const keys: (keyof FormState)[] = ['day', 'month', 'year', 'hour', 'minute', 'timezone', 'latitude', 'longitude']
    keys.map(item => {
      const value = localStorage.getItem(item);
      if (value) {
        setValue(item, Number(value))
      }
    })
  }, [])

  return <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
    <h2 className={mainStyles.title}>Натальная карта</h2>
    <h3 className={mainStyles.subtitle}>Введите данные для расчета</h3>
    <div className={styles.inputWrap}>
      <p className={styles.label}>Имя</p>
      <input className={styles.input} placeholder="Имя" {...register("name")} />
    </div>
    <div className={styles.formRow}>
      <div className={styles.inputWrap}>
        <p className={styles.label}>День</p>
        <input className={styles.input} placeholder="День" type="number" {...register("day", { valueAsNumber: true })} />
      </div>
      <div className={styles.inputWrap}>
        <p className={styles.label}>Месяц</p>
        <input className={styles.input} placeholder="Месяц" type="number" {...register("month", { valueAsNumber: true })} />
      </div>
      <div className={styles.inputWrap}>
        <p className={styles.label}>Год</p>
        <input className={styles.input} placeholder="Год" type="number" {...register("year", { valueAsNumber: true })} />
      </div>
    </div>
    <div className={styles.formRow}>
      <div className={styles.inputWrap}>
        <p className={styles.label}>Часы</p>
        <input className={styles.input} placeholder="Часы" type="number" {...register("hour", { valueAsNumber: true })} />
      </div>
      <div className={styles.inputWrap}>
        <p className={styles.label}>Минуты</p>
        <input className={styles.input} placeholder="Минуты" type="number" {...register("minute", { valueAsNumber: true })} />
      </div>
      <div className={styles.selectWrapper}>
        <p className={styles.label}>Тайм-зона</p>
        <select className={styles.select}  {...register("timezone", { valueAsNumber: true })}  >
          {TIMEZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className={styles.formRow}>
      <div className={styles.inputWrap}>
        <p className={styles.label}>Широта</p>
        <input className={styles.input} placeholder="Широта" type="number" step="any" {...register("latitude", { valueAsNumber: true })} />
      </div>
      <div className={styles.inputWrap}>
        <p className={styles.label}>Долгота</p>
        <input className={styles.input} placeholder="Долгота" type="number" step="any" {...register("longitude", { valueAsNumber: true })} />
      </div>
    </div>
    <button className={styles.button} type='submit'>
      Рассчитать
    </button>
  </form>
}