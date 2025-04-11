import React, { useEffect, useState } from 'react';

export function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/history');
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        console.error(err);
        alert('Could not load history from mock backend');
      }
    };

    fetchHistory();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Food Log History</h2>
      <ul>
        {history.map((entry, i) => (
          <li key={i}>
            <strong>{entry.date}</strong>: {entry.food} - {entry.calories} cal
          </li>
        ))}
      </ul>
    </div>
  );
}
