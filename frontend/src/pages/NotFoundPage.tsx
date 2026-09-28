import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-2xl mb-4">
        404
      </div>
      <h1 className="text-2xl font-bold mb-2">Government Resource Not Found</h1>
      <p className="text-slate-400 text-sm max-w-md mb-6">
        The requested official module or document path does not exist or has been relocated.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-md"
      >
        <Home className="w-4 h-4" />
        <span>Return to Main Portal</span>
      </Link>
    </div>
  );
};
