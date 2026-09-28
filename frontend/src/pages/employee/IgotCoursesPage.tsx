import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  Clock,
  Award,
  CheckCircle2,
  Filter,
  Sparkles
} from 'lucide-react';
import api from '../../services/api';

export const IgotCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/courses');
      if (res.data?.success) {
        setCourses(res.data.data || []);
      }
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = (courseId: string) => {
    setEnrollingId(courseId);
    setTimeout(() => {
      setEnrolledIds((prev) => [...prev, courseId]);
      setEnrollingId(null);
    }, 600);
  };

  const filtered = courses.filter(
    (c) =>
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase()) ||
      c.skills?.some((s: string) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">iGOT Karmayogi Courses</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official civil service e-learning catalog mapped to MoSPI statistical competency frameworks.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search statistical courses, tools (Python, R, CPI, NSSO)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-xs">
            No courses found matching your search.
          </div>
        ) : (
          filtered.map((course) => {
            const isEnrolled = enrolledIds.includes(course.id);
            const isEnrolling = enrollingId === course.id;

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {course.provider || 'iGOT Karmayogi'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">{course.level || 'INTERMEDIATE'}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Skills tags */}
                  {course.skills && course.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {course.skills.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-[9px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration || '20 Hours'}
                  </span>

                  {isEnrolled ? (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Enrolled</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course.id)}
                      disabled={isEnrolling}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{isEnrolling ? 'Enrolling...' : 'Enroll on iGOT'}</span>
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
