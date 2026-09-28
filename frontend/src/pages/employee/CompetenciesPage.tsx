import React, { useState, useEffect } from 'react';
import {
  Award,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  BarChart2,
  Sparkles,
  Info
} from 'lucide-react';
import api from '../../services/api';

export const CompetenciesPage: React.FC = () => {
  const [competencies, setCompetencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCompetencies();
  }, []);

  const fetchCompetencies = async () => {
    setLoading(true);
    try {
      const res = await api.get('/competencies/my');
      if (res.data?.success) {
        setCompetencies(res.data.data || []);
      }
    } catch {
      // Mock fallback
      setCompetencies([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['ALL', ...Array.from(new Set(competencies.map(c => c.competency?.category).filter(Boolean)))];

  const filtered = competencies.filter(c => {
    const matchesCategory = selectedCategory === 'ALL' || c.competency?.category === selectedCategory;
    const matchesSearch = c.competency?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.competency?.code?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Official Statistical Competency Matrix</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Systematic capability benchmarks mapped to Cadre Restructuring & Indian Statistical Service (ISS) expectations.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search competency or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Domains' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Competencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs">
            No competencies found matching your criteria.
          </div>
        ) : (
          filtered.map((item) => {
            const current = item.currentLevel || 0;
            const required = item.requiredLevel || 3.0;
            const gap = required - current;
            const percentage = Math.min(100, Math.round((current / 5.0) * 100));

            return (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {item.competency?.code}
                    </span>
                    <span className={`text-[10px] font-bold ${gap <= 0 ? 'text-emerald-700' : gap > 1.0 ? 'text-rose-700' : 'text-amber-700'}`}>
                      {gap <= 0 ? 'Benchmark Met' : `Gap: -${gap.toFixed(1)}`}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug">
                    {item.competency?.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {item.competency?.description || 'Core capability in India statistical system.'}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Evaluated Level:</span>
                    <span className="font-bold text-slate-900">{current.toFixed(1)} / 5.0</span>
                  </div>

                  {/* Progress track */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        gap <= 0 ? 'bg-emerald-500' : gap > 1.0 ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>MoSPI Required: {required.toFixed(1)}</span>
                    <span>Domain: {item.competency?.category}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
