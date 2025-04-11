import React, { useState } from 'react';

export function Profile() {
  const [profile, setProfile] = useState({
    age: '',
    weight: '',
    height: '',
    sex: 'male',
    activity: 'moderate',
    goal: 'maintain',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestData = {
      age: parseFloat(profile.age),
      weight: parseFloat(profile.weight),
      height: parseFloat(profile.height),
      sex: profile.sex,
      activity: profile.activity,
      goal: profile.goal
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/profile', {
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
      alert(`Saved profile.\n
        Age: ${result.age}\n
        Weight: ${result.weight}\n
        Height: ${result.height}\n
        Sex: ${result.sex}\n
        Activity: ${result.activity}\n
        Goal: ${result.goal}\n
        `);
    } catch (err) {
      console.error(err);
      alert('Failed to log entry (mock)');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        {['age', 'weight', 'height'].map((field) => (
          <div key={field} style={{ marginBottom: '1rem' }}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label><br />
            <input
              type="number"
              name={field}
              value={profile[field]}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        ))}
        <div style={{ marginBottom: '1rem' }}>
          <label>Sex:</label><br />
          <select name="sex" value={profile.sex} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Activity Level:</label><br />
          <select name="activity" value={profile.activity} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly active</option>
            <option value="moderate">Moderately active</option>
            <option value="active">Very active</option>
            <option value="super">Super active</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Goal:</label><br />
          <select name="goal" value={profile.goal} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
            <option value="lose">Lose weight</option>
            <option value="maintain">Maintain weight</option>
            <option value="gain">Gain weight</option>
          </select>
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Save Profile</button>
      </form>
    </div>
  );
}
