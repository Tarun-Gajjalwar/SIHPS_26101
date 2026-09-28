import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { GovEmblem } from './GovEmblem';
import {
  Bell,
  LogOut,
  Search,
  User as UserIcon,
  Shield,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
   

      {/* Main Header Bar */}
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <GovEmblem size={40} className="transition-transform group-hover:scale-105" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-slate-900 tracking-tight">StatSaksham</span>
            </div>
          </div>
        </Link>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search competencies, ISS cadres, iGOT courses, NSSTA modules..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800">Notifications</h4>
                  <span className="text-[10px] text-indigo-600 font-semibold cursor-pointer">Mark all as read</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs mt-2">
                  <div className="py-2">
                    <p className="font-semibold text-slate-800">New NSSTA Training Nominated</p>
                    <p className="text-slate-500 text-[11px]">Applied Time Series & Forecasting (Begins 15 Oct)</p>
                  </div>
                  <div className="py-2">
                    <p className="font-semibold text-slate-800">AI Competency Diagnostic</p>
                    <p className="text-slate-500 text-[11px]">Your periodic cadre assessment is due this month.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User profile capsule */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs border border-indigo-200">
                {user?.profile?.firstName ? user.profile.firstName[0] : (user?.email ? user.email[0].toUpperCase() : 'U')}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                  {user?.profile ? `${user.profile.firstName} ${user.profile.lastName}` : (user?.email?.split('@')[0] || 'User')}
                </div>
                <div className="text-[10px] text-slate-500 capitalize">
                  {user?.role?.toLowerCase() || 'Official'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-800">
                    {user?.profile ? `${user.profile.firstName} ${user.profile.lastName}` : user?.email}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                  <div className="mt-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {user?.role || 'EMPLOYEE'}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    My Workspace
                  </Link>
                  <Link
                    to="/employee/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <Shield className="w-4 h-4 text-slate-400" />
                    Cadre & Department Profile
                  </Link>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
