import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { GovEmblem } from '../components/common/GovEmblem';
import {
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  UserCheck,
  GraduationCap,
  Sparkles,
  Building2
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('employee@statintel.demo');
  const [password, setPassword] = useState('demo123');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setLocalError(err.response?.data?.message || 'Login failed. Please check credentials.');
    }
  };

  const handleQuickLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setLocalError(null);
    clearError();
    try {
      await login(demoEmail, 'demo123');
      navigate('/dashboard');
    } catch (err: any) {
      setLocalError(err.response?.data?.message || 'Demo login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#fff] text-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative font-sans">
      {/* Header bar branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link to="/" className="inline-flex items-center gap-3 mb-4">
          <GovEmblem size={48} mono />
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-black tracking-tight">StatSaksham</span>
            </div>
            <p className="text-[11px] text-black font-medium">
              Official Statistical System Intelligence Portal
            </p>
          </div>
        </Link>
        <h2 className="text-xl font-bold tracking-tight text-black">
          Sign In to Cadre Portal
        </h2>
       
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-[#fff] py-8 px-6 rounded-2xl sm:px-10 border border-black/15 shadow-sm">
          {/* Quick Demo Login Switcher */}
          <div className="mb-6 bg-[#fff] border border-black/15 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                Quick 1-Click Demo Login
              </span>
              <span className="text-[10px] text-black/60 font-mono">pw: demo123</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('employee@statintel.demo')}
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#fff] border border-black/20 hover:border-black transition-all text-center group cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-black mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-black">Analyst</span>
                <span className="text-[9px] text-black/60">Employee</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('trainer@statintel.demo')}
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#fff] border border-black/20 hover:border-black transition-all text-center group cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-black mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-black">Faculty</span>
                <span className="text-[9px] text-black/60">Trainer</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin@statintel.demo')}
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#fff] border border-black/20 hover:border-black transition-all text-center group cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-black mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-black">Director</span>
                <span className="text-[9px] text-black/60">Admin</span>
              </button>
            </div>
          </div>

          {(localError || error) && (
            <div className="mb-4 bg-black/5 border border-black/20 rounded-lg p-3 flex items-start gap-2.5 text-xs text-black">
              <AlertCircle className="w-4 h-4 shrink-0 text-black mt-0.5" />
              <span>{localError || error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-black mb-1">
                MoSPI Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="employee@statintel.demo"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#fff] border border-black/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-black mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#fff] border border-black/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  defaultChecked
                  className="h-3.5 w-3.5 accent-black rounded border-black/30"
                />
                <label htmlFor="remember-me" className="ml-2 block text-[11px] text-black">
                  Remember officer session
                </label>
              </div>
            
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-black hover:bg-black/85 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to StatSaksham</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-black/10 pt-4 text-center">
            <Link
              to="/"
              className="text-xs font-semibold text-black hover:underline transition-colors"
            >
              ← Back to Public Portal
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
