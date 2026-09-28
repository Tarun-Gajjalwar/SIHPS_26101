import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import {
  LayoutDashboard,
  Award,
  AlertTriangle,
  Map,
  GraduationCap,
  Building2,
  ClipboardCheck,
  HelpCircle,
  Sparkles,
  FileCheck,
  User,
  Users2,
  BarChart3,
  Brain,
  ShieldCheck,
  FileText,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  // Determine active section based on URL pathname
  const isTrainer = location.pathname.startsWith('/trainer') || user?.role === 'TRAINER';
  const isAdmin = location.pathname.startsWith('/admin') || user?.role === 'ADMIN';

  const employeeLinks = [
    { to: '/employee/dashboard', label: 'Cadre Dashboard', icon: LayoutDashboard },
    { to: '/employee/competencies', label: 'Competency Matrix', icon: Award },
    { to: '/employee/skill-gaps', label: 'Skill Gap Diagnostics', icon: AlertTriangle },
    { to: '/employee/learning-path', label: 'Learning Roadmap', icon: Map },
    { to: '/employee/igot-courses', label: 'iGOT Karmayogi', icon: GraduationCap },
    { to: '/employee/nssta-programmes', label: 'NSSTA Programmes', icon: Building2 },
    { to: '/employee/assessments', label: 'AI Assessment', icon: ClipboardCheck },
    { to: '/employee/quizzes', label: 'Knowledge Quizzes', icon: HelpCircle },
    { to: '/employee/ai-assistant', label: 'AI Skill Advisor', icon: Sparkles },
    { to: '/employee/certificates', label: 'My Certifications', icon: FileCheck },
    { to: '/employee/profile', label: 'Officer Profile', icon: User },
  ];

  const trainerLinks = [
    { to: '/trainer/dashboard', label: 'Trainer Overview', icon: LayoutDashboard },
    { to: '/trainer/materials', label: 'Training Materials', icon: FileText },
    { to: '/trainer/questions', label: 'Question Bank', icon: HelpCircle },
    { to: '/trainer/quiz-builder', label: 'AI Quiz Builder', icon: Sparkles },
    { to: '/trainer/performance', label: 'Learner Analytics', icon: TrendingUp },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { to: '/admin/workforce', label: 'Workforce Overview', icon: Users2 },
    { to: '/admin/analytics', label: 'Skill Intelligence', icon: BarChart3 },
    { to: '/admin/emerging-skills', label: 'Emerging Skills Radar', icon: Brain },
    { to: '/admin/users', label: 'User Directory', icon: ShieldCheck },
  ];

  const links = isAdmin ? adminLinks : isTrainer ? trainerLinks : employeeLinks;
  const sectionTitle = isAdmin
    ? 'Directorate Administration'
    : isTrainer
    ? 'NSSTA Faculty & Trainer'
    : 'Statistical Officer Portal';

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
      {/* Sidebar Section Badge */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {sectionTitle}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
        </div>
        <p className="text-xs font-semibold text-slate-800 mt-0.5 truncate">
          {user?.profile?.designation || (user?.role === 'ADMIN' ? 'MoSPI Director' : 'Indian Statistical Service')}
        </p>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
                }`}
              />
              <span className="truncate flex-1">{link.label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-200" />}
            </NavLink>
          );
        })}
      </nav>

      {/* Officer Summary Card at Bottom */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/50">
        <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {user?.profile?.firstName ? user.profile.firstName[0] : 'O'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800 truncate">
                {user?.profile ? `${user.profile.firstName} ${user.profile.lastName}` : (user?.email || 'Officer')}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                ID: {user?.profile?.employeeId || 'MOS2024-ISS'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
