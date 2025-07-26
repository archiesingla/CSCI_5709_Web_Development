import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const DoctorRegister = lazy(() => import('./pages/DoctorRegister'));
const PatientRegister = lazy(() => import('./pages/PatientRegister'));
const Login = lazy(() => import('./pages/Login'));
const DoctorDashboard = lazy(() => import('./pages/DoctorDashboard'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/doctor" element={<DoctorRegister />} />
          <Route path="/register/patient" element={<PatientRegister />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
