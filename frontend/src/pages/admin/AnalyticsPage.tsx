import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users2,
  Calendar,
  Building,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const trendData = [
    { month: 'Apr 2024', competencyIndex: 2.9, igotCompletions: 45 },
    { month: 'May 2024', competencyIndex: 3.1, igotCompletions: 95 },
    { month: 'Jun 2024', competencyIndex: 3.2, igotCompletions: 140 },
    { month: 'Jul 2024', competencyIndex: 3.3, igotCompletions: 210 },
    { month: 'Aug 2024', competencyIndex: 3.4, igotCompletions: 280 },
    { month: 'Sep 2024', competencyIndex: 3.5, igotCompletions: 342 },
  ];

  const domainDeficits = [
    { domain: 'Survey Sampling', deficitCount: 14 },
    { domain: 'Python & Automation', deficitCount: 42 },
    { domain: 'CPI & Price Indices', deficitCount: 18 },
    { domain: 'National Accounts', deficitCount: 26 },
    { domain: 'Time Series Modeling', deficitCount: 31 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">National Statistical System Analytics</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Macro-level evaluation of competency development, training adoption, and institutional capability growth.
          </p>
        </div>
      </div>

      {/* Grid of 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competency Index Trend Line */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Cadre Competency Progression (2024)</h2>
              <p className="text-xs text-slate-500">6-Month longitudinal growth following iGOT interventions</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              +20.6% Growth
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis domain={[2.5, 4.0]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="competencyIndex"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain Deficit Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Critical Skill Gaps by Statistical Domain</h2>
              <p className="text-xs text-slate-500">Number of officers with measured capability deficits</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainDeficits} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="domain" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="deficitCount" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
