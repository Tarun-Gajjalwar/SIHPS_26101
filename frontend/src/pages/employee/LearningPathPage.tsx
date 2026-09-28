import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock,
  PlayCircle,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Building,
  Award
} from 'lucide-react';
import api from '../../services/api';

export const LearningPathPage: React.FC = () => {
  const [learningPath, setLearningPath] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchPath();
  }, []);

  const fetchPath = async () => {
    setLoading(true);
    try {
      const res = await api.get('/learning-paths/my');
      if (res.data?.success) {
        setLearningPath(res.data.data);
      }
    } catch {
      setLearningPath(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (itemId: string, status: string) => {
    try {
      await api.patch(`/learning-paths/items/${itemId}/status`, { status });
      await fetchPath();
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateAIPath = async () => {
    setGenerating(true);
    try {
      await api.post('/learning-paths/generate', {
        goal: 'Official Cadre Advancement to Deputy Director & Senior Statistical Analysis'
      });
      await fetchPath();
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const items = learningPath?.items || [];
  const completedCount = items.filter((i: any) => i.status === 'COMPLETED').length;
  const progressPercent = items.length ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Personalized Learning Pathway</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sequenced progression of official modules from iGOT Karmayogi & NSSTA designed to eliminate capability deficits.
          </p>
        </div>

        <button
          onClick={handleGenerateAIPath}
          disabled={generating}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{generating ? 'Synthesizing Path...' : 'Re-synthesize AI Pathway'}</span>
        </button>
      </div>

      {/* Pathway Overview Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900">
              {learningPath?.title || 'Advanced Statistical Analysis & Cadre Readiness Path'}
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl">
              {learningPath?.description ||
                'Targeted curriculum for Assistant Directors preparing for multi-domain surveys, National Accounts, and modern Python-based statistical tooling.'}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 min-w-48 text-right md:text-left">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-500 font-medium">Curriculum Progress</span>
              <span className="font-bold text-slate-900">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {completedCount} of {items.length} Modules Completed
            </span>
          </div>
        </div>
      </div>

      {/* Timeline of Milestones */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs">
            No pathway items found. Click 'Re-synthesize AI Pathway' to generate.
          </div>
        ) : (
          items.map((item: any, idx: number) => {
            const isCompleted = item.status === 'COMPLETED';
            const isInProgress = item.status === 'IN_PROGRESS';

            return (
              <div
                key={item.id}
                className={`bg-white p-5 rounded-2xl border transition shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : isInProgress
                    ? 'border-blue-300 ring-2 ring-blue-500/10'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Step number badge */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isInProgress
                        ? 'bg-blue-600 text-white animate-pulse'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                      <span className={`text-[10px] font-bold ${isCompleted ? 'text-emerald-700' : isInProgress ? 'text-blue-700' : 'text-slate-500'}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                      {item.duration && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                      {item.description || 'Targeted training module aligned with cadre competency standards.'}
                    </p>

                    {item.skills && item.skills.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1">
                        {item.skills.map((skill: string, sIdx: number) => (
                          <span
                            key={sIdx}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {isInProgress ? (
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'COMPLETED')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Complete</span>
                    </button>
                  ) : !isCompleted ? (
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'IN_PROGRESS')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-xs"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Begin Module</span>
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </span>
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
