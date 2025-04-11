import React, { useEffect, useState } from 'react';
import { API } from '../apiConfig';

export function Dashboard() {
    const [dashboard, setDashboard] = useState([]);

    const target = dashboard.targetCalories || 1; // avoid divide-by-zero
    const consumed = dashboard.consumedCalories || 0;

    const percentage = (consumed / target) * 100;
    const delta = Math.abs(percentage - 100);

    let progressColor = 'blue';

    if (delta >= 70) {
    progressColor = 'red';
    } else if (delta >= 30) {
    progressColor = 'yellow';
    }


    useEffect(() => {
    const fetchDashboard = async () => {
        try {
            const response = await fetch(API.dashboard);
            if (!response.ok) {
                throw new Error('Failed to fetch dashboard');
            }
            const data = await response.json();
            setDashboard(data);
        } catch (err) {
            console.error(err);
            alert('Could not load dashboard data from mock backend');
        }
    };

    fetchDashboard();
    }, []);

    return (
    <div>
        <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
            <h2>Dashboard</h2>
            <p><strong>Calories consumed today:</strong> {dashboard.consumedCalories}</p>
            <p><strong>Daily target:</strong> {dashboard.targetCalories}</p>
            <p><strong>Remaining:</strong> {dashboard.targetCalories - dashboard.consumedCalories}</p>
        </div>
        <div style={{ margin: '1.5rem 0' }}>
        <label style={{marginLeft: '60px'}}><strong>Progress toward goal:</strong></label>
        <div style={{
            background: '#eee',
            height: '25px',
            width: '90%',
            borderRadius: '10px',
            overflow: 'hidden',
            marginTop: '0.5rem',
            margin: '0 auto'
        }}>
        <div style={{
            height: '100%',
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: progressColor,
            transition: 'width 0.3s ease-in-out'
        }} />
        </div>
            <p style={{marginLeft: '60px'}}>{Math.round(percentage)}% of goal consumed</p>
        </div>
    </div>
    );
}
