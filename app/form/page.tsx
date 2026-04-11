'use client';

import { useState } from 'react';

export default function FormPage() {
  const [date, setDate] = useState('');

  return (
    <main style={{ padding: '40px' }}>
      <h1>Введите дату рождения</h1>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginTop: '20px', padding: '10px' }}
      />

      <br />

      <button style={{ marginTop: '20px' }}>
        Рассчитать
      </button>
    </main>
  );
}