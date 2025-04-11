import React, { useState } from 'react';

export function LogEntry() {
  const [food, setFood] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('grams');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestData = {
      food,
      amount: parseFloat(amount),
      unit,
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error('Mock backend failed');
      }
  
      const result = await response.json();
      console.log('Mock response:', result);
      alert(`Logged ${result.food} - Estimated calories: ${result.calories}`);
    } catch (err) {
      console.error(err);
      alert('Failed to log entry (mock)');
    }
  };
  
  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Log Entry</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Food Name:</label><br />
          <input
            type="text"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Amount:</label><br />
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Unit:</label><br />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="grams">grams</option>
            <option value="ml">ml</option>
            <option value="oz">oz</option>
            <option value="cups">cups</option>
            <option value="servings">servings</option>
          </select>
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Search & Log
        </button>
      </form>
    </div>
  );
}
