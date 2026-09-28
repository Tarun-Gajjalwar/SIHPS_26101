import React from 'react';
import { Link } from 'react-router-dom';
import { GovEmblem } from '../components/common/GovEmblem';
import { ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fff] text-black flex flex-col font-sans">
      {/* Main Navigation */}
      <header className="border-b border-black/10 bg-[#fff] sticky top-0 z-30 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GovEmblem size={40} mono />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-black tracking-tight">StatSaksham</span>
              </div>
              <p className="text-[10px] text-black font-medium hidden sm:block">
                National Cadre Skill Intelligence & Learning Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-black hover:opacity-70 px-3 py-2 transition-opacity"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 bg-black hover:bg-black/85 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
            >
              <span>Access Portal</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-tight">
            Future-Ready Intelligence for <br className="hidden sm:inline" />
            National Statistical Operations
          </h1>

          <p className="mt-6 text-sm sm:text-base text-black max-w-2xl mx-auto leading-relaxed">
            StatSaksham bridges national statistical standards, Cadre Competency frameworks, and
            iGOT Karmayogi learning paths. Empowering ISS officers, analysts, and field supervisors
            with real-time skill gap analytics.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black hover:bg-black/85 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all group"
            >
              <span>Launch Demo System</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 py-6 bg-[#fff] text-black text-xs shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <GovEmblem size={28} mono />
            <span className="text-black font-semibold">StatSaksham Platform</span>
            <span className="text-black">· MoSPI Innovation</span>
          </div>
         
        </div>
      </footer>
    </div>
  );
};
