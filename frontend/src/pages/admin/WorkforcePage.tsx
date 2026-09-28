import React from 'react';
import { Download, Sparkles } from 'lucide-react';


export const WorkforcePage: React.FC = () => {
  const departments = [
    'National Sample Survey Office (NSSO)',
    'Price Statistics Division (PSD)',
    'National Accounts Division (CSO - NAD)',
    'Field Operations Division (FOD)',
    'Economic Statistics Division (ESD)',
    'Coordination & Publications (CPD)',
  ];

  const competencies = [
    { name: 'Survey Sampling & Design', code: 'SAM-01' },
    { name: 'Consumer Price Index (CPI)', code: 'CPI-02' },
    { name: 'National Accounts (SNA 2008)', code: 'SNA-03' },
    { name: 'Index of Industrial Production', code: 'IIP-04' },
    { name: 'Python for Statistical Analysis', code: 'PY-05' },
    { name: 'Time Series & Econometrics', code: 'ECM-06' },
  ];

  // Matrix values [deptIndex][compIndex] = score out of 5
  const heatmapData = [
    [4.6, 3.2, 2.8, 3.1, 3.5, 3.8], // NSSO
    [2.9, 4.8, 3.0, 3.6, 3.9, 4.1], // PSD
    [2.7, 3.4, 4.7, 3.8, 3.2, 4.4], // NAD
    [4.2, 3.6, 2.4, 2.9, 2.3, 2.7], // FOD
    [3.1, 4.0, 3.9, 4.6, 3.7, 4.0], // ESD
    [3.4, 3.2, 3.1, 3.0, 2.8, 3.0], // CPD
  ];

  const getHeatmapColor = (score: number) => {
    if (score >= 4.2) return 'bg-emerald-600 text-white font-bold';
    if (score >= 3.5) return 'bg-blue-600 text-white font-bold';
    if (score >= 3.0) return 'bg-sky-100 text-sky-900 font-semibold border border-sky-300';
    if (score >= 2.5) return 'bg-amber-100 text-amber-900 font-semibold border border-amber-300';
    return 'bg-rose-100 text-rose-900 font-bold border border-rose-300 animate-pulse';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Workforce Competency Heatmap</h1>
          <p className="text-xs text-slate-500 mt-1">
            Department-level capability assessment across MoSPI core statistical competencies (Average Score / 5.0).
          </p>
        </div>

        <button
          onClick={() => alert('Competency matrix exported to CSV.')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Matrix (CSV)</span>
        </button>
      </div>

      {/* Legend Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
          Proficiency Scale:
        </span>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-600"></span>
            <span className="text-slate-600 font-medium">Expert (4.2 - 5.0)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-blue-600"></span>
            <span className="text-slate-600 font-medium">Advanced (3.5 - 4.1)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-sky-200 border border-sky-400"></span>
            <span className="text-slate-600 font-medium">Proficient (3.0 - 3.4)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-200 border border-amber-400"></span>
            <span className="text-slate-600 font-medium">Working Gap (2.5 - 2.9)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-rose-200 border border-rose-400"></span>
            <span className="text-slate-600 font-medium">Critical Deficit (&lt; 2.5)</span>
          </div>
        </div>
      </div>

      {/* Heatmap Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="p-4 w-72">MoSPI Cadre / Division</th>
              {competencies.map((comp) => (
                <th key={comp.code} className="p-3 text-center">
                  <div>{comp.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono font-normal">
                    [{comp.code}]
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {departments.map((dept, rIdx) => (
              <tr key={dept} className="hover:bg-slate-50/50 transition">
                <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>{dept}</span>
                </td>
                {competencies.map((comp, cIdx) => {
                  const score = heatmapData[rIdx][cIdx];
                  const colorClass = getHeatmapColor(score);

                  return (
                    <td key={cIdx} className="p-2 text-center">
                      <div
                        className={`py-2 px-3 rounded-lg text-xs transition duration-150 inline-block w-16 shadow-2xs ${colorClass}`}
                      >
                        {score.toFixed(1)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Strategic Observations Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-xs text-blue-900 space-y-2">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>StatSaksham Workforce Insights</span>
        </h3>
        <p className="text-blue-800 leading-relaxed">
          • <strong>Field Operations Division (FOD)</strong> demonstrates excellent survey sampling capability (4.2), but possesses critical capability deficits in <em>Python Scripting (2.3)</em> and <em>National Accounts (2.4)</em>.<br />
          • Recommended Intervention: Mandatory deployment of the <strong>iGOT Python for Official Statistics</strong> module across all regional FOD field offices prior to the 2025 Economic Census.
        </p>
      </div>
    </div>
  );
};
