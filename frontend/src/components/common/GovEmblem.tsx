import React from 'react';

interface GovEmblemProps {
  size?: number;
  className?: string;
  mono?: boolean;
}

export const GovEmblem: React.FC<GovEmblemProps> = ({ size = 32, className = '', mono = false }) => {
  if (mono) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`inline-flex items-center justify-center rounded-lg bg-black text-white p-1 relative overflow-hidden ${className}`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="24" cy="24" r="18" fill="black" stroke="white" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="7" stroke="white" strokeWidth="1.5" />
          <line x1="24" y1="17" x2="24" y2="31" stroke="white" strokeWidth="1" />
          <line x1="17" y1="24" x2="31" y2="24" stroke="white" strokeWidth="1" />
          <line x1="19" y1="19" x2="29" y2="29" stroke="white" strokeWidth="1" />
          <line x1="19" y1="29" x2="29" y2="19" stroke="white" strokeWidth="1" />
          <circle cx="24" cy="24" r="2" fill="white" />
          <path d="M14 10C17 9 31 9 34 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 38C17 39 31 39 34 38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 shadow-sm border border-indigo-700/50 p-1 relative overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="24" cy="24" r="22" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="24" cy="24" r="18" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
        {/* Ashoka Chakra spokes stylized */}
        <circle cx="24" cy="24" r="7" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="24" y1="17" x2="24" y2="31" stroke="#38BDF8" strokeWidth="1" />
        <line x1="17" y1="24" x2="31" y2="24" stroke="#38BDF8" strokeWidth="1" />
        <line x1="19" y1="19" x2="29" y2="29" stroke="#38BDF8" strokeWidth="1" />
        <line x1="19" y1="29" x2="29" y2="19" stroke="#38BDF8" strokeWidth="1" />
        <circle cx="24" cy="24" r="2" fill="#F8FAFC" />
        {/* Top saffron bar */}
        <path d="M14 10C17 9 31 9 34 10" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
        {/* Bottom green bar */}
        <path d="M14 38C17 39 31 39 34 38" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};
