import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ComplaintForm from './components/ComplaintForm';
import ComplaintStatus from './components/ComplaintStatus';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/complaint" element={<ComplaintForm />} />
          <Route path="/status" element={<ComplaintStatus />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;