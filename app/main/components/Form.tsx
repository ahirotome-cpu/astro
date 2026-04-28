import { useEffect } from "react";
import { FormResponseType, FormState, } from "../types";
import { useForm } from "react-hook-form";
import styles from '../main.module.css';
import { TIMEZONES } from "../constants";
import { PlanetResponseTypeData } from "@/app/api/chart/planets/route";
import { HousesResponseTypeData } from "@/app/api/chart/houses/route";

export const Form = ({ onChange }: { onChange: (data: FormResponseType) => void }) => {
  const { setValue, register, handleSubmit } = useForm<FormState>({
    defaultValues: {
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

    onChange({ houses, planets })
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

  return <form onSubmit={handleSubmit(handleSubmitForm)}>
    <div className={styles.grid}>
      <input placeholder="День" type="number" {...register("day")} />
      <input placeholder="Месяц" type="number" {...register("month")} />
      <input placeholder="Год" type="number" {...register("year")} />
      <input placeholder="Часы" type="number" {...register("hour")} />
      <input placeholder="Минуты" type="number" {...register("minute")} />
      <div className={styles.selectWrapper}>
        <select className={styles.select}  {...register("timezone")}  >
          <option value="">Выберите тайм-зону</option>
          {TIMEZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>
      <input placeholder="Широта" type="number" step="any" {...register("latitude")} />
      <input placeholder="Долгота" type="number" step="any" {...register("longitude")} />
    </div>
    <button className={styles.button} type='submit'>
      Рассчитать
    </button>
  </form>
}