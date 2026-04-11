'use client';

import { useState } from 'react';

export default function FormPage() {
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');

  const handleClick = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date })
    });

    const data = await res.json();
    setResult(data.result);
  };

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

      <button onClick={handleClick} style={{ marginTop: '20px' }}>
        Рассчитать
      </button>

      {result && (
        <p style={{ marginTop: '30px' }}>
          {result}
        </p>
      )}
    </main>
  );
}