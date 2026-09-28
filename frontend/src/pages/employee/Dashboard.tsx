import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import {
  Award,
  AlertTriangle,
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  GraduationCap,
  Building2,
  CheckCircle2,
  Brain,
  Target,
  BarChart2,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';
import api from '../../services/api';

export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [profileData, setProfileData] = useState<any>(null);
  const [skillGaps, setSkillGaps] = useState<any[]>([]);
  const [competencies, setCompetencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [userRes, gapsRes, compRes] = await Promise.allSettled([
        api.get('/users/me'),
        api.get('/skill-gaps/my'),
        api.get('/competencies/my'),
      ]);

      if (userRes.status === 'fulfilled' && userRes.value.data?.success) {
        setProfileData(userRes.value.data.data?.profile);
      }
      if (gapsRes.status === 'fulfilled' && gapsRes.value.data?.success) {
        setSkillGaps(gapsRes.value.data.data || []);
      }
      if (compRes.status === 'fulfilled' && compRes.value.data?.success) {
        setCompetencies(compRes.value.data.data || []);
      }
    } catch (e) {
      console.error('Error fetching dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  const radarData = [
    { subject: 'Survey Design', current: 3.8, target: 4.5 },
    { subject: 'Sampling Theory', current: 3.5, target: 4.0 },
    { subject: 'Python Analytics', current: 2.8, target: 4.0 },
    { subject: 'SQL & Databases', current: 3.9, target: 4.0 },
    { subject: 'National Accounts', current: 4.2, target: 4.5 },
    { subject: 'Data Governance', current: 3.0, target: 3.5 },
  ];

  const profile = profileData || user?.profile;
  const officerName = profile ? `${profile.firstName} ${profile.lastName}` : 'Officer';
  const designation = profile?.designation || 'Statistical Data Analyst';
  const departmentName = profile?.department?.name || 'Economic Statistics Division';

  return (
    <div className="space-y-6">
      {/* Officer Welcome Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        {/* Abstract decorative circles */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl" />
        <div className="absolute right-32 -bottom-12 w-32 h-32 bg-amber-500/15 rounded-full blur-xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {officerName}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 mt-1 max-w-xl">
              {designation} · {departmentName}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/employee/assessments"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Take AI Assessment</span>
            </Link>
            <Link
              to="/employee/ai-assistant"
              className="inline-flex items-center gap-2 bg-indigo-700/60 hover:bg-indigo-700 text-white font-medium text-xs px-4 py-2.5 rounded-xl border border-indigo-500/40 transition-all"
            >
              <Brain className="w-4 h-4 text-indigo-300" />
              <span>Skill Advisor</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Average Competency</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">3.6</span>
            <span className="text-xs text-slate-400">/ 5.0</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+0.4 from last quarter</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Skill Gaps</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {skillGaps.length > 0 ? skillGaps.length : 3}
            </span>
            <span className="text-xs text-amber-600 font-medium">Require Training</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            1 Critical · 2 Moderate
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">iGOT Learning Hours</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">42.5</span>
            <span className="text-xs text-slate-400">hours</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-medium">
            85% of annual cadre goal met
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">NSSTA Nominations</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">1</span>
            <span className="text-xs text-purple-600 font-medium">Upcoming Batch</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Applied Time Series · Oct 2024
          </div>
        </div>
      </div>

      {/* Main Grid: Competency Radar + Critical Skill Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Official Statistical Competency Profile
              </h3>
              <p className="text-xs text-slate-500">
                Current proficiency vs. MoSPI benchmark for your current cadre
              </p>
            </div>
            <Link
              to="/employee/competencies"
              className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 9 }} />
                <Radar
                  name="Current Score"
                  dataKey="current"
                  stroke="#4F46E5"
                  fill="#4F46E5"
                  fillOpacity={0.4}
                />
                <Radar
                  name="MoSPI Target"
                  dataKey="target"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.15}
                  strokeDasharray="3 3"
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs mt-2 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
              <span className="text-slate-600">Officer Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-slate-600">Cadre Benchmark</span>
            </div>
          </div>
        </div>

        {/* Priority Skill Gaps */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Priority Skill Gaps
                </h3>
                <p className="text-xs text-slate-500">
                  AI-identified capability deficits requiring intervention
                </p>
              </div>
              <Link
                to="/employee/skill-gaps"
                className="text-xs text-indigo-600 font-semibold hover:underline"
              >
                All Gaps
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="text-xs font-bold text-slate-800">Python for Official Statistics</span>
                  </div>
                  <span className="text-xs font-bold text-rose-600">Gap: -1.2</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Cadre target is 4.0; current assessed level is 2.8. Impedes survey pipeline automation.
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px]">
                  <span className="text-indigo-600 font-semibold">Recommended: iGOT Python Course</span>
                  <Link
                    to="/employee/igot-courses"
                    className="inline-flex items-center gap-1 text-slate-700 hover:text-indigo-600 font-medium"
                  >
                    <span>Enroll</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-xs font-bold text-slate-800">Data Governance & DPDP Act</span>
                  </div>
                  <span className="text-xs font-bold text-amber-600">Gap: -0.5</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Essential for compliance with new digital personal data protection mandates.
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px]">
                  <span className="text-indigo-600 font-semibold">Recommended: NSSTA Workshop</span>
                  <Link
                    to="/employee/nssta-programmes"
                    className="inline-flex items-center gap-1 text-slate-700 hover:text-indigo-600 font-medium"
                  >
                    <span>Nominate</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              to="/employee/learning-path"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-xl transition-all"
            >
              <span>View Complete Personalized Roadmap</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Learning Modules Strip */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Targeted Training Recommendations
            </h3>
            <p className="text-xs text-slate-500">
              Directly mapped to address your assessed competency deltas
            </p>
          </div>
          <Link
            to="/employee/igot-courses"
            className="text-xs text-indigo-600 font-semibold hover:underline"
          >
            Browse All Courses
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">
                iGOT Karmayogi
              </span>
              <span className="text-[10px] text-slate-500">12 Hours</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
              Advanced Survey Sampling Techniques
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Stratified, cluster, and multi-stage sampling for NSS & PLFS national surveys.
            </p>
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/60">
              <span className="text-xs font-semibold text-emerald-700">Statistical</span>
              <Link to="/employee/igot-courses" className="text-xs font-bold text-indigo-600 hover:underline">
                Start Module →
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">
                NSSTA Greater Noida
              </span>
              <span className="text-[10px] text-slate-500">5-Day Physical</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
              Time Series Analysis & Forecasting
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Hands-on macroeconomic forecasting models for GDP and Price Index construction.
            </p>
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/60">
              <span className="text-xs font-semibold text-amber-700">Economic</span>
              <Link to="/employee/nssta-programmes" className="text-xs font-bold text-indigo-600 hover:underline">
                View Details →
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                Self-Paced AI Quiz
              </span>
              <span className="text-[10px] text-slate-500">15 Mins</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
              Index Numbers & CPI Compilation
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Laspeyres, Paasche, and Fisher index calculations and base year revisions.
            </p>
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/60">
              <span className="text-xs font-semibold text-indigo-700">Diagnostic</span>
              <Link to="/employee/quizzes" className="text-xs font-bold text-indigo-600 hover:underline">
                Take Quiz →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
