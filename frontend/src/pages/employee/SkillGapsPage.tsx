import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  BookOpen,
  Building,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export const SkillGapsPage: React.FC = () => {
  const [skillGaps, setSkillGaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);

  useEffect(() => {
    fetchSkillGaps();
  }, []);

  const fetchSkillGaps = async () => {
    setLoading(true);
    try {
      const res = await api.get('/skill-gaps/my');
      if (res.data?.success) {
        setSkillGaps(res.data.data || []);
      }
    } catch {
      setSkillGaps([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRecalculate = async () => {
    setRecalculating(true);
    try {
      await api.post('/skill-gaps/recalculate');
      await fetchSkillGaps();
    } catch (e) {
      console.error(e);
    } finally {
      setRecalculating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Official Skill Gap Diagnostics</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Comparative analysis between evaluated official competencies and designated MoSPI cadre requirements.
          </p>
        </div>

        <button
          onClick={handleRecalculate}
          disabled={recalculating}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${recalculating ? 'animate-spin' : ''}`} />
          <span>{recalculating ? 'Running AI Engine...' : 'Re-evaluate Capability Gaps'}</span>
        </button>
      </div>

      {/* Info banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-900 text-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Intervention Priority Protocol</p>
          <p className="text-amber-800 text-[11px] mt-0.5 leading-relaxed">
            StatSaksham flags gaps with deficit ≥ 1.0 as high priority. Mandatory completion of the recommended iGOT / NSSTA course is encouraged prior to promotional review.
          </p>
        </div>
      </div>

      {/* Gaps List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Active Identified Gaps ({skillGaps.length})
          </span>
          <span className="text-xs text-slate-500">Ranked by Deficit Severity</span>
        </div>

        <div className="divide-y divide-slate-100">
          {skillGaps.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">No Critical Skill Gaps Detected!</p>
              <p className="text-slate-400 mt-1">Your competencies satisfy all current role benchmarks.</p>
            </div>
          ) : (
            skillGaps.map((gap) => (
              <div
                key={gap.id}
                className="p-5 hover:bg-slate-50/80 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {gap.competency?.name || 'Competency'}
                    </span>
                    <span className={`text-[10px] font-bold ${gap.gapScore >= 1.5 ? 'text-rose-700' : 'text-amber-700'}`}>
                      Deficit: -{gap.gapScore}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      [{gap.competency?.code}]
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                    {gap.reason || 'Assessment scores indicate a deficit between observed ability and required job standard.'}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span>Priority: <strong className="text-slate-700">{gap.priority === 1 ? 'Urgent (Level 1)' : 'Standard (Level 2)'}</strong></span>
                    <span>•</span>
                    <span>Domain: <strong className="text-slate-700">{gap.competency?.category}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to="/employee/learning-path"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
                  >
                    <span>Follow Pathway</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
