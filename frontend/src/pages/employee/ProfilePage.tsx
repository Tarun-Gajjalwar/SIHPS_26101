import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth.store';
import {
  User,
  Building2,
  Mail,
  Phone,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import api from '../../services/api';

export const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get('/profile/me');
      if (res.data?.success) {
        setProfile(res.data.data);
      }
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const prof = profile || user?.profile || {};
  const competencies = profile?.competencies || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Officer ID Card Header */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="h-28 bg-gradient-to-r from-blue-800 via-indigo-900 to-slate-900 p-6 flex justify-between items-start text-white">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
              Government of India • Official Cadre Record
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Officer</span>
          </span>
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-2xl bg-slate-900 text-white border-4 border-white shadow-lg flex items-center justify-center text-3xl font-black">
                {prof.firstName?.[0] || 'R'}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900">
                    {prof.firstName} {prof.lastName}
                  </h1>
                </div>
                <p className="text-xs text-slate-500">
                  {prof.designation || 'Assistant Director'} • {prof.department?.name || 'NSSO'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Officer ID
              </span>
              <div className="text-xs font-mono font-bold text-slate-800">
                {prof.employeeId || 'ISS-2018-042'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{prof.phone || '+91 98765 43210'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Experience: {prof.experience || 6} Years</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Role: {prof.jobRole?.title || 'Survey Statistician'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Competencies Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Assessed Cadre Competency Portfolio
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {competencies.length} Competencies Recorded
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {competencies.map((comp: any) => (
            <div key={comp.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-800">{comp.competency?.name}</div>
                <div className="text-[11px] text-slate-400">
                  Domain: {comp.competency?.category} • Code: {comp.competency?.code}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-slate-400 text-[10px]">Evaluated Level:</span>
                  <div className="font-black text-slate-900">{comp.currentLevel} / 5.0</div>
                </div>
                <span className={`text-xs font-semibold ${comp.currentLevel >= comp.requiredLevel ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {comp.currentLevel >= comp.requiredLevel ? 'Benchmark Met' : 'Gap Exists'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
