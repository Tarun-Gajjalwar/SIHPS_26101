import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FileQuestion,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import api from '../../services/api';

export const QuizAttemptPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/quizzes/${id}`);
      if (res.data?.success) {
        setQuiz(res.data.data);
      }
    } catch {
      setQuiz(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionId: string, opt: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: opt }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.post(`/quizzes/${id}/attempt`, { answers });
      if (res.data?.success) {
        setResult(res.data.data);
        setSubmitted(true);
      }
    } catch {
      // Local fallback scoring
      const questions = quiz?.questions || [];
      let score = 0;
      questions.forEach((qItem: any) => {
        const q = qItem.generatedQuestion || qItem.question || qItem;
        if (answers[q.id] === q.correctAnswer) {
          score += 1;
        }
      });
      const total = questions.length || 1;
      const pct = Math.round((score / total) * 100);
      setResult({
        score: score * 20,
        percentage: pct,
        passed: pct >= (quiz?.passingScore || 60),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading Quiz...</div>;
  }

  const questions = quiz?.questions || [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/employee/quizzes"
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Quizzes</span>
        </Link>
        <span className="text-xs text-slate-400 font-mono">
          Total MCQs: {questions.length}
        </span>
      </div>

      {/* Quiz Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">{quiz?.title}</h1>
            <p className="text-xs text-slate-500 mt-1">{quiz?.description}</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">{quiz?.duration || 15} Mins</span>
        </div>
      </div>

      {/* Results banner if submitted */}
      {submitted && result && (
        <div
          className={`p-6 rounded-2xl border ${
            result.passed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
          } shadow-sm space-y-2 text-center`}
        >
          <div className="text-2xl font-black">{result.percentage}% Score</div>
          <p className="text-xs font-semibold">
            {result.passed ? '✓ Passing benchmark achieved!' : 'Review the explanations below to improve.'}
          </p>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((qItem: any, idx: number) => {
          const q = qItem.generatedQuestion || qItem.question || qItem;
          const selectedAnswer = answers[q.id];
          const isCorrect = selectedAnswer === q.correctAnswer;

          return (
            <div
              key={q.id || idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-slate-900">
                  Question {idx + 1}. {q.text}
                </span>
                {submitted && (
                  <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2">
                {['A', 'B', 'C', 'D'].map((opt) => {
                  const optText = q[`option${opt}`];
                  const isOptSelected = selectedAnswer === opt;
                  const isRightAnswer = q.correctAnswer === opt;

                  let optClass = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700';
                  if (submitted) {
                    if (isRightAnswer) {
                      optClass = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                    } else if (isOptSelected && !isRightAnswer) {
                      optClass = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                    }
                  } else if (isOptSelected) {
                    optClass = 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20';
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(q.id, opt)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition flex items-center justify-between ${optClass}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded bg-slate-100 text-slate-600 flex items-center justify-center text-[11px] font-bold">
                          {opt}
                        </span>
                        <span>{optText}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submit */}
              {submitted && q.explanation && (
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] text-slate-600">
                  <strong className="text-slate-800">MoSPI Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit */}
      {!submitted ? (
        <div className="pt-2">
          <button
            onClick={handleSubmit}
            disabled={submitting || Object.keys(answers).length === 0}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{submitting ? 'Evaluating Quiz Answers...' : 'Submit Answers & Calculate Score'}</span>
          </button>
        </div>
      ) : (
        <div className="pt-2 flex justify-center">
          <Link
            to="/employee/quizzes"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition"
          >
            Return to Knowledge Quizzes
          </Link>
        </div>
      )}
    </div>
  );
};
