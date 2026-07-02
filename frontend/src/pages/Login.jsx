import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    // Simulating quick token verification delay
    setTimeout(() => {
      login(email);
      setIsLoading(false);
      navigate('/book');
    }, 1200);
  };

  return (
    <div className="flex-1 bg-light/50 flex items-center justify-center p-4 min-h-[calc(100vh-69px)]">
      <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-2xl w-full max-w-sm space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand to-dark" />
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-light flex items-center justify-center text-dark mx-auto mb-3 border border-gray-100">
            <ShieldCheck size={24} className="text-brand" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-dark">Welcome back</h2>
          <p className="text-xs text-gray-400 font-medium">Verify credentials to unlock core transit mapping resources</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">Email address</label>
            <div className="relative flex items-center border border-gray-200 focus-within:border-dark transition-all rounded-xl bg-light px-4 py-3.5">
              <User className="text-gray-400 mr-3 shrink-0" size={18} />
              <input type="email" placeholder="Enter registration email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent w-full text-sm font-semibold focus:outline-none placeholder-gray-400 text-dark" required disabled={isLoading} />
            </div>
          </div>

          <Button type="submit" variant="brand" className="w-full py-4 font-bold shadow-lg shadow-brand/10 flex items-center justify-center gap-2" disabled={isLoading}>
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={16} /> <span>Authenticate Session</span>
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-[10px] text-gray-400 px-4">
          By signing in, you authorize data handshakes configured with mock system location arrays.
        </p>
      </div>
    </div>
  );
}