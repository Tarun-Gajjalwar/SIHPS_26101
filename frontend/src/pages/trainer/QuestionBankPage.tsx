import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Search,
  Loader2
} from 'lucide-react';
import api from '../../services/api';

export const QuestionBankPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/questions');
      if (res.data?.success) {
        setQuestions(res.data.data || []);
      }
    } catch {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (qId: string, status: string) => {
    try {
      await api.patch(`/questions/${qId}/status`, { status });
      setQuestions((prev) =>
        prev.map((q) => (q.id === qId ? { ...q, status } : q))
      );
    } catch {
      setQuestions((prev) =>
        prev.map((q) => (q.id === qId ? { ...q, status } : q))
      );
    }
  };

  const filtered = questions.filter((q) => {
    const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;
    const matchesSearch =
      q.text?.toLowerCase().includes(search.toLowerCase()) ||
      q.domain?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">AI Question Bank & Faculty Review</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review, verify, and approve synthetic multiple-choice questions extracted from MoSPI training documents.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions or statistical domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'APPROVED', 'AI_GENERATED', 'NEEDS_REVIEW'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
            <span>Loading questions...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs">
            No questions found matching your filter criteria.
          </div>
        ) : (
          filtered.map((q, idx) => {
            const isApproved = q.status === 'APPROVED';

            return (
              <div
                key={q.id || idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        Q#{idx + 1}
                      </span>
                      <span className={`text-[10px] font-bold ${isApproved ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {q.status?.replace('_', ' ') || 'AI GENERATED'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">{q.difficulty || 'MEDIUM'}</span>
                      {q.domain && (
                        <span className="text-[11px] text-slate-400 font-medium">
                          Domain: {q.domain}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed pt-1">
                      {q.text}
                    </h3>
                  </div>

                  {/* Faculty Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                    <button
                      onClick={() => handleUpdateStatus(q.id, 'APPROVED')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                        isApproved
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isApproved ? 'Approved' : 'Approve MCQ'}</span>
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(q.id, 'REJECTED')}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>

                {/* Options grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {['A', 'B', 'C', 'D'].map((opt) => {
                    const isCorrect = q.correctAnswer === opt;
                    return (
                      <div
                        key={opt}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                            : 'bg-slate-50 border-slate-100 text-slate-700'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded text-[11px] font-bold flex items-center justify-center shrink-0 ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {opt}
                        </span>
                        <span className="line-clamp-2">{q[`option${opt}`]}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Rationale explanation */}
                {q.explanation && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                    <strong className="text-slate-800">MoSPI Manual Citation & Rationale:</strong>{' '}
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
