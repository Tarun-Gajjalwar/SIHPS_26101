import React from 'react';
import {
  BarChart3,
  Users2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Award,
  Calendar,
  Building2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

export const LearnerPerformancePage: React.FC = () => {
  const cohortStats = [
    { department: 'NSSO (Survey)', avgScore: 78, officers: 42 },
    { department: 'Price Statistics (CPI)', avgScore: 84, officers: 28 },
    { department: 'CSO (National Accounts)', avgScore: 72, officers: 35 },
    { department: 'Field Operations (FOD)', avgScore: 81, officers: 65 },
    { department: 'Economic Statistics (IIP)', avgScore: 76, officers: 24 },
  ];

  const recentAttempts = [
    {
      id: '1',
      officer: 'Rahul Sharma',
      designation: 'Assistant Director (NSSO)',
      quiz: 'National Statistical Cadre Competency Assessment',
      score: '85/100',
      percentage: 85,
      passed: true,
      date: '28 Sep 2024, 11:30 AM'
    },
    {
      id: '2',
      officer: 'Sunita Meena',
      designation: 'Statistical Officer (CSO)',
      quiz: 'CPI Compilation Guidelines & Base Year Weighting',
      score: '90/100',
      percentage: 90,
      passed: true,
      date: '28 Sep 2024, 10:15 AM'
    },
    {
      id: '3',
      officer: 'Amit Verma',
      designation: 'Junior Statistical Officer (FOD)',
      quiz: 'Household Survey Sampling Design Vol. 4',
      score: '55/100',
      percentage: 55,
      passed: false,
      date: '27 Sep 2024, 04:45 PM'
    },
    {
      id: '4',
      officer: 'Pooja Iyer',
      designation: 'Assistant Director (NAD)',
      quiz: 'National Accounts Statistics: GVA & Deflator',
      score: '78/100',
      percentage: 78,
      passed: true,
      date: '27 Sep 2024, 02:20 PM'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Learner Cohort Performance Analytics</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time tracking of assessment outcomes, division-wide proficiency, and intervention effectiveness.
          </p>
        </div>
      </div>

      {/* Division Performance Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-1">Average Score by MoSPI Division</h2>
        <p className="text-xs text-slate-500 mb-6">Aggregate evaluation benchmarks across departments</p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cohortStats} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis dataKey="department" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                {cohortStats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.avgScore >= 80 ? '#10b981' : entry.avgScore >= 75 ? '#3b82f6' : '#f59e0b'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Attempts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Recent Assessment Logs
          </span>
          <span className="text-xs text-slate-400">All Cadre Submissions</span>
        </div>

        <div className="divide-y divide-slate-100">
          {recentAttempts.map((attempt) => (
            <div
              key={attempt.id}
              className="p-4 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span>{attempt.officer}</span>
                  <span className="text-[11px] font-normal text-slate-400">
                    ({attempt.designation})
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">{attempt.quiz}</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900">{attempt.score}</div>
                  <div className="text-[10px] text-slate-400">{attempt.date}</div>
                </div>

                <span className={`text-xs font-semibold ${attempt.passed ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {attempt.passed ? 'Passed' : 'Deficit Identified'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
