import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WorkshopSchedule from './components/WorkshopSchedule';
import UserDashboard from './components/UserDashboard';
import AttendanceTracker from './components/AttendanceTracker';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main workshop schedule page */}
          <Route path="/" element={<WorkshopSchedule />} />
          <Route path="/workshops" element={<WorkshopSchedule />} />
          
          {/* User dashboard */}
          <Route path="/dashboard" element={<UserDashboard />} />
          
          {/* Attendance tracking */}
          <Route path="/attendance" element={<AttendanceTracker />} />
          
          {/* Analytics dashboard */}
          <Route path="/analytics" element={<AnalyticsDashboard workshops={[]} />} />
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
