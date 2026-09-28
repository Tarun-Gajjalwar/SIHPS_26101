import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.store';

// Layouts
import { EmployeeLayout } from './layouts/EmployeeLayout';
import { TrainerLayout } from './layouts/TrainerLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Employee pages
import { EmployeeDashboard } from './pages/employee/Dashboard';
import { ProfilePage } from './pages/employee/ProfilePage';
import { CompetenciesPage } from './pages/employee/CompetenciesPage';
import { SkillGapsPage } from './pages/employee/SkillGapsPage';
import { LearningPathPage } from './pages/employee/LearningPathPage';
import { IgotCoursesPage } from './pages/employee/IgotCoursesPage';
import { NsstaProgrammesPage } from './pages/employee/NsstaProgrammesPage';
import { AssessmentPage } from './pages/employee/AssessmentPage';
import { QuizzesPage } from './pages/employee/QuizzesPage';
import { QuizAttemptPage } from './pages/employee/QuizAttemptPage';
import { AIAssistantPage } from './pages/employee/AIAssistantPage';
import { CertificatesPage } from './pages/employee/CertificatesPage';

// Trainer pages
import { TrainerDashboard } from './pages/trainer/Dashboard';
import { MaterialsPage } from './pages/trainer/MaterialsPage';
import { QuestionBankPage } from './pages/trainer/QuestionBankPage';
import { QuizBuilderPage } from './pages/trainer/QuizBuilderPage';
import { LearnerPerformancePage } from './pages/trainer/LearnerPerformancePage';

// Admin pages
import { AdminDashboard } from './pages/admin/Dashboard';
import { WorkforcePage } from './pages/admin/WorkforcePage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { EmergingSkillsPage } from './pages/admin/EmergingSkillsPage';
import { UsersPage } from './pages/admin/UsersPage';

// Protected route component
const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const RoleRedirect = () => {
  const { user, isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  if (user?.role === 'TRAINER') return <Navigate to="/trainer/dashboard" replace />;
  return <Navigate to="/employee/dashboard" replace />;
};

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Auto-redirect based on role */}
      <Route path="/dashboard" element={<RoleRedirect />} />

      {/* Employee routes */}
      <Route path="/employee" element={
        <ProtectedRoute allowedRoles={['EMPLOYEE']}>
          <EmployeeLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="competencies" element={<CompetenciesPage />} />
        <Route path="skill-gaps" element={<SkillGapsPage />} />
        <Route path="learning-path" element={<LearningPathPage />} />
        <Route path="igot-courses" element={<IgotCoursesPage />} />
        <Route path="nssta-programmes" element={<NsstaProgrammesPage />} />
        <Route path="assessments" element={<AssessmentPage />} />
        <Route path="quizzes" element={<QuizzesPage />} />
        <Route path="quizzes/:id/attempt" element={<QuizAttemptPage />} />
        <Route path="ai-assistant" element={<AIAssistantPage />} />
        <Route path="certificates" element={<CertificatesPage />} />
      </Route>

      {/* Trainer routes */}
      <Route path="/trainer" element={
        <ProtectedRoute allowedRoles={['TRAINER', 'ADMIN']}>
          <TrainerLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<TrainerDashboard />} />
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="questions" element={<QuestionBankPage />} />
        <Route path="quiz-builder" element={<QuizBuilderPage />} />
        <Route path="performance" element={<LearnerPerformancePage />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="workforce" element={<WorkforcePage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="emerging-skills" element={<EmergingSkillsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
