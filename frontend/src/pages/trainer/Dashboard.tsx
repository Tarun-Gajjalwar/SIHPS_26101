import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  UploadCloud,
  FileCheck2,
  SlidersHorizontal,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  BrainCircuit,
  FileText
} from 'lucide-react';
import api from '../../services/api';

export const TrainerDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    materialsCount: 4,
    questionsCount: 22,
    pendingReview: 6,
    activeQuizzes: 3,
  });

  return (
    <div className="space-y-6">
      {/* Faculty Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
          
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Faculty Intelligence Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Ingest official MoSPI training manuals, generate AI-grounded MCQs, curate assessments, and inspect learner cohort analytics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/trainer/materials"
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 flex items-center gap-2 transition"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Ingest Document</span>
            </Link>
            <Link
              to="/trainer/questions"
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-purple-300 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition"
            >
              <FileCheck2 className="w-4 h-4 text-purple-400" />
              <span>Review AI MCQs</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ingested Materials</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{stats.materialsCount}</span>
            <span className="text-xs text-slate-500">Official PDFs</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Processed by OCR & AI Engine</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Generated MCQs</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{stats.questionsCount}</span>
            <span className="text-xs text-slate-500">Items in Pool</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">16 Approved by Faculty</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Review</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{stats.pendingReview}</span>
            <span className="text-xs text-amber-600 font-semibold">Needs Approval</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Human-in-the-loop verification</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Published Quizzes</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{stats.activeQuizzes}</span>
            <span className="text-xs text-slate-500">Active</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Live for Cadre Officers</p>
        </div>
      </div>

      {/* Ingestion & AI Pipeline Flow Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-1">
          MoSPI Automated Training Intelligence Pipeline
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          How StatSaksham converts unstructured Ministry training manuals into verified evaluation assets:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold mb-2">
              1
            </div>
            <h3 className="text-xs font-bold text-slate-900">Document Ingestion</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Upload PDF or DOCX manuals (CPI, Survey Design, National Accounts, IIP).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs font-bold mb-2">
              2
            </div>
            <h3 className="text-xs font-bold text-slate-900">Concept & Topic OCR</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              AI parses key statistical terminology, formulas, and legal guidelines.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold mb-2">
              3
            </div>
            <h3 className="text-xs font-bold text-slate-900">MCQ Generation</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Synthesizes realistic 4-option questions with detailed rationale and difficulty tags.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold mb-2">
              4
            </div>
            <h3 className="text-xs font-bold text-slate-900">Faculty Review & Deploy</h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Trainer approves or rejects MCQs, assembling them into live cadre assessments.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            to="/trainer/materials"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <span>Proceed to Ingestion Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
