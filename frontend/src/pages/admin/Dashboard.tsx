import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users2,
  TrendingUp,
  AlertTriangle,
  Award,
  Building,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import api from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>({
    totalUsers: 1249,
    avgCompetency: 3.6,
    criticalGaps: 192,
    igotCompletions: 342,
    nsstaNominations: 64,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/analytics/dashboard');
        if (res.data?.success && res.data.data) {
          const d = res.data.data;
          setStats({
            totalUsers: d.totalEmployees || 1249,
            avgCompetency: d.avgCompetencyScore || 3.6,
            criticalGaps: d.criticalSkillGaps || 192,
            igotCompletions: 342,
            nsstaNominations: 64,
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchStats();
  }, []);

  const departmentReadiness = [
    { name: 'NSSO (Survey Division)', readiness: 82, officers: 52 },
    { name: 'Price Statistics (PSD)', readiness: 88, officers: 26 },
    { name: 'National Accounts (CSO)', readiness: 74, officers: 31 },
    { name: 'Field Operations (FOD)', readiness: 79, officers: 68 },
    { name: 'Economic Statistics (ESD)', readiness: 85, officers: 22 },
  ];

  const competencyDistribution = [
    { name: 'Expert (Level 5)', value: 18, color: '#10b981' },
    { name: 'Advanced (Level 4)', value: 45, color: '#3b82f6' },
    { name: 'Proficient (Level 3)', value: 58, color: '#06b6d4' },
    { name: 'Working (Level 2)', value: 21, color: '#f59e0b' },
    { name: 'Novice (Level 1)', value: 6, color: '#f43f5e' },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Workforce Skill Intelligence Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Ministry-wide competency tracking, cadre restructuring analytics, and training deployment across Indian Statistical Service (ISS) & SSS cadres.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/workforce"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition"
            >
              <Users2 className="w-4 h-4" />
              <span>Workforce Heatmap</span>
            </Link>
            <Link
              to="/admin/emerging-skills"
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-blue-300 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Future Skills Forecast</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Cadre Strength</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{stats.totalUsers}</span>
            <span className="text-xs text-slate-500">Active Officers</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">ISS & SSS Personnel Tracked</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cadre Competency Index</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{stats.avgCompetency}</span>
            <span className="text-xs text-slate-500">/ 5.0 (Proficient)</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">+0.4 gain over last quarter</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Critical Skill Gaps</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{stats.criticalGaps}</span>
            <span className="text-xs text-rose-600 font-semibold">Priority Interventions</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Targeted by NSSTA Academies</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">iGOT Completions</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{stats.igotCompletions}</span>
            <span className="text-xs text-slate-500">Certificates Earned</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Mission Karmayogi integration</p>
        </div>
      </div>

      {/* Main Charts: Department Readiness + Competency Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Department Readiness Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">MoSPI Division Readiness Benchmark</h2>
              <p className="text-xs text-slate-500">Percentage of officers meeting or exceeding cadre requirements</p>
            </div>
            <Link
              to="/admin/analytics"
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
            >
              Details →
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentReadiness}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fill: '#475569', fontSize: 11 }}
                  width={150}
                />
                <Tooltip />
                <Bar dataKey="readiness" fill="#3b82f6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competency Level Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">Overall Cadre Proficiency Distribution</h2>
            <p className="text-xs text-slate-500 mb-4">Officer breakdown across 5-tier competency levels</p>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={competencyDistribution}
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {competencyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {competencyDistribution.map((lvl) => (
                <div key={lvl.name} className="flex items-center gap-2 text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lvl.color }}></span>
                  <span className="text-slate-600 truncate">{lvl.name}:</span>
                  <strong className="text-slate-900">{lvl.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <Link
              to="/admin/workforce"
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Users2 className="w-4 h-4 text-blue-400" />
              <span>Explore Full Competency Heatmap</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
