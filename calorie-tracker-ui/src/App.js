import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { LogEntry } from './pages/LogEntry';
import { History } from './pages/History';
import { Profile } from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <Link to="/">Dashboard</Link> |{" "}
          <Link to="/log">Log Food</Link> |{" "}
          <Link to="/history">History</Link> |{" "}
          <Link to="/profile">Profile</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/log" element={<LogEntry />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
