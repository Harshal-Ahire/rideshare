import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LogIn, User } from 'lucide-react';

import Home from './pages/Home';
import BookRide from './pages/BookRide';
import RideTracking from './pages/RideTracking';
import Profile from './pages/Profile';

import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Button from './components/Button';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function LoginView() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) login(email);
  };

  return (
    <div className="flex-1 bg-light flex items-center justify-center p-4">
      <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-2xl w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-dark">Welcome back</h2>
          <p className="text-xs text-gray-400 font-medium">Verify credentials to unlock core mapping resources</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex items-center border border-gray-200 focus-within:border-dark transition-all rounded-xl bg-light px-4 py-3.5">
            <User className="text-gray-400 mr-3 shrink-0" size={18} />
            <input type="email" placeholder="Enter registration email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent w-full text-sm font-semibold focus:outline-none" required />
          </div>
          <Button type="submit" variant="brand" className="w-full py-4 font-bold shadow-lg shadow-brand/10">
            <LogIn size={16} /> Authenticate Session
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white pb-[60px] md:pb-0">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/book" element={<ProtectedRoute><BookRide /></ProtectedRoute>} />
              <Route path="/track" element={<ProtectedRoute><RideTracking /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
    </AuthProvider>
  );
}