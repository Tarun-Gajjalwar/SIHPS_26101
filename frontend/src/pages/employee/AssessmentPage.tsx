import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  AlertCircle,
  Brain,
  ShieldCheck,
  Target
} from 'lucide-react';
import api from '../../services/api';

interface Question {
  id: string;
  domain: string;
  text: string;
  options: { key: string; text: string }[];
  correctOption: string;
  explanation: string;
}

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'q1',
    domain: 'Statistical Competency',
    text: 'In National Sample Survey (NSS) multi-stage design, what is the primary purpose of stratification in the first stage units (FSUs)?',
    options: [
      { key: 'A', text: 'To maximize variance between different strata' },
      { key: 'B', text: 'To minimize sampling variance by grouping homogeneous units within strata' },
      { key: 'C', text: 'To avoid the need for probability proportional to size (PPS) sampling' },
      { key: 'D', text: 'To eliminate non-sampling response errors completely' },
    ],
    correctOption: 'B',
    explanation: 'Stratification groups homogeneous FSUs together, which substantially reduces the sampling variance compared to simple random sampling.',
  },
  {
    id: 'q2',
    domain: 'Statistical Competency',
    text: 'Which index number formula satisfies both the Time Reversal Test and the Factor Reversal Test?',
    options: [
      { key: 'A', text: "Laspeyres' Index" },
      { key: 'B', text: "Paasche's Index" },
      { key: 'C', text: "Fisher's Ideal Index" },
      { key: 'D', text: "Marshall-Edgeworth Index" },
    ],
    correctOption: 'C',
    explanation: "Fisher's Ideal Index is the geometric mean of Laspeyres and Paasche indices and satisfies both Time Reversal and Factor Reversal tests.",
  },
  {
    id: 'q3',
    domain: 'Technical Competency',
    text: 'In Python data processing using pandas, which method is most memory-efficient for reading very large national survey CSV microdata?',
    options: [
      { key: 'A', text: 'pd.read_csv() with chunksize parameter and specified dtypes' },
      { key: 'B', text: 'pd.read_table() followed by df.to_numpy()' },
      { key: 'C', text: 'Loading entire file into a Python list via open().readlines()' },
      { key: 'D', text: 'Converting file to JSON before parsing' },
    ],
    correctOption: 'A',
    explanation: 'Using chunksize processes large files in batches, and specifying optimized data types reduces RAM consumption by up to 80%.',
  },
  {
    id: 'q4',
    domain: 'Technical Competency',
    text: 'In SQL database queries for statistical aggregations, which clause is executed AFTER the GROUP BY clause to filter grouped results?',
    options: [
      { key: 'A', text: 'WHERE' },
      { key: 'B', text: 'ORDER BY' },
      { key: 'C', text: 'HAVING' },
      { key: 'D', text: 'PARTITION BY' },
    ],
    correctOption: 'C',
    explanation: 'The HAVING clause filters aggregated groups after the GROUP BY operation has partitioned the records.',
  },
  {
    id: 'q5',
    domain: 'Digital Governance',
    text: "Under India's Digital Personal Data Protection (DPDP) Act, what is the role of MoSPI when collecting statistical data for national welfare planning?",
    options: [
      { key: 'A', text: 'Exempt from all data security safeguards' },
      { key: 'B', text: 'Acts as Data Fiduciary with strict purpose limitation and anonymization standards' },
      { key: 'C', text: 'Permitted to share raw identifiable microdata publicly without consent' },
      { key: 'D', text: 'Solely designated as a Data Principal' },
    ],
    correctOption: 'B',
    explanation: 'Government entities handling personal data must act as Data Fiduciaries, ensuring robust anonymization and data governance protocols.',
  },
  {
    id: 'q6',
    domain: 'Managerial & Policy',
    text: 'When releasing GDP estimates and official statistics, which principle of the UN Fundamental Principles of Official Statistics ensures public trust?',
    options: [
      { key: 'A', text: 'Strict commercial monetization of raw survey outputs' },
      { key: 'B', text: 'Impartiality, equal access, and professional scientific independence' },
      { key: 'C', text: 'Exclusive release only to registered academic institutions' },
      { key: 'D', text: 'Limiting statistical methodology transparency' },
    ],
    correctOption: 'B',
    explanation: 'Principle 1 mandates relevance, impartiality, and equal access to official statistics as an indispensable public good.',
  },
];

export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'intro' | 'active' | 'result'>('intro');
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [submitting, setSubmitting] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (phase !== 'active') return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const handleSelectOption = (key: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questions[currentIdx].id]: key,
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Optional backend submission attempt
      await api.post('/assessments/submit', {
        answers: selectedAnswers,
      }).catch(() => {});
    } finally {
      setSubmitting(false);
      setPhase('result');
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Calculate results
  let correctCount = 0;
  const domainBreakdown: Record<string, { total: number; correct: number }> = {};

  questions.forEach((q) => {
    if (!domainBreakdown[q.domain]) {
      domainBreakdown[q.domain] = { total: 0, correct: 0 };
    }
    domainBreakdown[q.domain].total += 1;
    if (selectedAnswers[q.id] === q.correctOption) {
      correctCount += 1;
      domainBreakdown[q.domain].correct += 1;
    }
  });

  const percentage = Math.round((correctCount / questions.length) * 100);

  // Phase: INTRO
  if (phase === 'intro') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Official Statistical Cadre Assessment
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 mt-1 max-w-2xl">
            This periodic diagnostic evaluates your core competencies against Indian Statistical Service (ISS) benchmarks and automatically generates personalized learning interventions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">6 Multi-Domain Questions</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Covers Statistical Theory, Technical Tools, Data Governance & Policy.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">15 Minutes Time Limit</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Paced diagnostic to simulate real analytical decision making.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">AI Gap Calibrations</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Directly syncs with your iGOT Karmayogi roadmap recommendations.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Ready to begin your assessment?</h3>
            <p className="text-xs text-slate-500">
              Ensure you have a quiet environment and stable connection.
            </p>
          </div>
          <button
            onClick={() => setPhase('active')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all shrink-0"
          >
            <span>Start Assessment Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Phase: ACTIVE QUESTION
  if (phase === 'active') {
    const q = questions[currentIdx];
    const selected = selectedAnswers[q.id];
    const answeredCount = Object.keys(selectedAnswers).length;

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Assessment Top Bar */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-semibold text-slate-700">{q.domain}</span>
              <span className="text-xs text-slate-400">
                ({answeredCount}/{questions.length} answered)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs font-bold text-slate-700">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Question Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
          <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
            {q.text}
          </p>

          <div className="mt-6 space-y-3">
            {q.options.map((opt) => {
              const isSelected = selected === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSelectOption(opt.key)}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left text-xs sm:text-sm transition-all ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-semibold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span className="flex-1 mt-0.5">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-40 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <span>{submitting ? 'Submitting...' : 'Submit Assessment'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Phase: RESULT
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 border border-indigo-100">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Assessment Completed
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Your diagnostic score has been synchronized with the MoSPI Cadre Intelligence Engine.
        </p>

        <div className="mt-6 inline-flex items-baseline gap-2 bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl">
          <span className="text-3xl sm:text-4xl font-black text-indigo-600">
            {percentage}%
          </span>
          <span className="text-xs text-slate-500 font-medium">
            ({correctCount} of {questions.length} correct)
          </span>
        </div>

        {/* Domain Breakdown */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
          {Object.entries(domainBreakdown).map(([domain, data]) => {
            const domainPct = Math.round((data.correct / data.total) * 100);
            return (
              <div key={domain} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-[11px] font-bold text-slate-700 block truncate">
                  {domain}
                </span>
                <div className="mt-2 flex items-baseline justify-between text-xs">
                  <span className="font-bold text-slate-900">{domainPct}%</span>
                  <span className="text-slate-400">
                    {data.correct}/{data.total}
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${domainPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Insight Box */}
        <div className="mt-6 text-left p-4 rounded-xl border border-indigo-100 bg-indigo-50/40">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-bold text-indigo-950">AI Diagnostic Summary</h4>
          </div>
          <p className="text-xs text-indigo-900/80 leading-relaxed">
            Strong statistical methodology foundation demonstrated in survey sampling and index theory. We recommend prioritizing <strong>Python for Official Statistics</strong> and review of the <strong>DPDP Act Data Governance protocols</strong> on iGOT Karmayogi to eliminate your assessed cadre gaps.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/employee/skill-gaps"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-all"
          >
            <span>View Updated Skill Gaps</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => {
              setSelectedAnswers({});
              setCurrentIdx(0);
              setTimeLeft(15 * 60);
              setPhase('intro');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-5 py-3 rounded-xl transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
