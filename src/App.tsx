import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserTypeSelection from './components/UserTypeSelection';
import VictimDashboard from './components/VictimDashboard';
import VolunteerDashboard from './components/VolunteerDashboard';
import DonorDashboard from './components/DonorDashboard';
import { UserTypeProvider } from './contexts/UserTypeContext';

function App() {
  return (
    <UserTypeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UserTypeSelection />} />
          <Route path="/victim" element={<VictimDashboard />} />
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          <Route path="/donor" element={<DonorDashboard />} />
        </Routes>
      </Router>
    </UserTypeProvider>
  );
}

export default App;