import React, { useState, useEffect } from 'react';
import {
  Building,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Send
} from 'lucide-react';
import api from '../../services/api';

export const NsstaProgrammesPage: React.FC = () => {
  const [programmes, setProgrammes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nominatedIds, setNominatedIds] = useState<string[]>([]);
  const [nominatingId, setNominatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const fetchProgrammes = async () => {
    setLoading(true);
    try {
      const res = await api.get('/nssta');
      if (res.data?.success) {
        setProgrammes(res.data.data || []);
      }
    } catch {
      setProgrammes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNominate = (progId: string) => {
    setNominatingId(progId);
    setTimeout(() => {
      setNominatedIds((prev) => [...prev, progId]);
      setNominatingId(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">NSSTA Training Programmes</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            National Statistical Systems Training Academy (Greater Noida, Uttar Pradesh) residential & hybrid courses.
          </p>
        </div>
      </div>

      {/* Campus Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-300">
            Cadre Capacity Building Initiative
          </div>
          <h2 className="text-lg font-bold">NSSTA Greater Noida Academic Calendar 2024-25</h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Specialized training programs designed for ISS probationers, in-service officers, and international participants from SAARC and African statistical institutes.
          </p>
        </div>
        <div className="text-xs text-slate-300 bg-white/10 px-4 py-3 rounded-xl border border-white/10 shrink-0">
          <div className="flex items-center gap-1.5 font-bold text-white mb-1">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span>Campus Location</span>
          </div>
          <p className="text-[11px]">Plot No. 22, Knowledge Park-II, Greater Noida, UP</p>
        </div>
      </div>

      {/* Programmes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programmes.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs">
            Loading NSSTA academic schedule...
          </div>
        ) : (
          programmes.map((prog) => {
            const isNominated = nominatedIds.includes(prog.id);
            const isNominating = nominatingId === prog.id;

            return (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-purple-300 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                      {prog.mode || 'Residential (On-Campus)'}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {prog.duration || '2 Weeks'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        Target: <strong className="text-slate-800">{prog.targetAudience || 'ISS & SSS Officers'}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        Schedule: <strong className="text-slate-800">{prog.schedule || 'Upcoming Batch'}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Competencies */}
                  {prog.competencies && prog.competencies.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {prog.competencies.map((c: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-purple-50 text-purple-700"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Venue: {prog.venue || 'NSSTA Main Auditorium'}
                  </span>

                  {isNominated ? (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Nomination Submitted</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleNominate(prog.id)}
                      disabled={isNominating}
                      className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-xs font-semibold shadow-xs transition flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Send className="w-3 h-3" />
                      <span>{isNominating ? 'Submitting...' : 'Request Cadre Nomination'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
