import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  Plus,
  RefreshCw,
  ArrowRight,
  BrainCircuit,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export const MaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/materials');
      if (res.data?.success) {
        setMaterials(res.data.data || []);
      }
    } catch {
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  const sampleManuals = [
    {
      title: 'Consumer Price Index (CPI) Compilation Guidelines & Base Year Weighting (2024)',
      filename: 'MoSPI_CPI_Methodology_Manual_2024.pdf',
      topics: ['Laspeyres Formula', 'Price Collection', 'Geometric Mean Imputation', 'Weighting Protocols'],
      summary: 'Comprehensive methodology for CPI(Urban/Rural/Combined) compiled by Price Statistics Division, MoSPI.'
    },
    {
      title: 'NSSO Household Survey Sampling Design & Multi-Stage Stratification (Vol. 4)',
      filename: 'NSSO_Sampling_Design_Guidelines_Vol4.pdf',
      topics: ['First Stage Units (FSUs)', 'Ultimate Stage Units (USUs)', 'Stratified Multi-Stage Sampling', 'Non-Sampling Errors'],
      summary: 'Field Operations Division survey sampling protocol for national socio-economic surveys.'
    },
    {
      title: 'National Accounts Statistics: Gross Value Added (GVA) & Deflator Standards',
      filename: 'National_Accounts_GVA_Manual.pdf',
      topics: ['GVA Estimation', 'Double Deflation', 'Annual Survey of Industries (ASI)', 'SNA 2008 Framework'],
      summary: 'Central Statistics Office standards for annual and quarterly national accounts compilation.'
    }
  ];

  const handleIngestPreset = async (manual: typeof sampleManuals[0]) => {
    setUploading(true);
    try {
      await api.post('/materials/sample', {
        title: manual.title,
        filename: manual.filename,
        topics: manual.topics,
        summary: manual.summary
      });
      await fetchMaterials();
    } catch {
      // Create local item if backend sample route is custom
      const newMat = {
        id: Date.now().toString(),
        title: manual.title,
        filename: manual.filename,
        topics: manual.topics,
        summary: manual.summary,
        status: 'READY',
        createdAt: new Date().toISOString()
      };
      setMaterials((prev) => [newMat, ...prev]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Training Material Ingestion & OCR</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Upload official MoSPI guidelines or choose pre-loaded manuals to extract competencies and generate MCQs.
          </p>
        </div>
      </div>

      {/* Quick Ingest Demo Manuals Box */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold">Fast-Track Hackathon Ingestion Presets</h2>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            One-Click Ingest & Generate
          </span>
        </div>

        <p className="text-xs text-slate-300">
          Simulate ingesting standard Ministry manuals without having to upload files from your local disk:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sampleManuals.map((man, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-purple-400 transition flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-purple-300">{man.filename}</span>
                <h3 className="text-xs font-bold text-white mt-1 leading-snug">{man.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{man.summary}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">{man.topics.length} Key Topics</span>
                <button
                  onClick={() => handleIngestPreset(man)}
                  disabled={uploading}
                  className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[11px] font-semibold flex items-center gap-1 transition disabled:opacity-50"
                >
                  <Plus className="w-3 h-3" />
                  <span>Ingest & Parse</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Materials List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Ingested Document Library ({materials.length})
          </span>
          <button
            onClick={fetchMaterials}
            className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="p-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              <span>Loading documents...</span>
            </div>
          ) : materials.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">No documents ingested yet.</p>
              <p className="text-slate-400 mt-1">Click any preset above to ingest official MoSPI manuals.</p>
            </div>
          ) : (
            materials.map((mat) => (
              <div
                key={mat.id}
                className="p-5 hover:bg-slate-50/80 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{mat.title}</span>
                    <span className={`text-[10px] font-bold ${mat.status === 'READY' ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {mat.status || 'READY'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 max-w-2xl">{mat.summary}</p>

                  {mat.topics && mat.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {mat.topics.map((t: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-purple-50 text-purple-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to="/trainer/questions"
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
                  >
                    <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
                    <span>View Generated MCQs</span>
                    <ArrowRight className="w-3 h-3" />
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
