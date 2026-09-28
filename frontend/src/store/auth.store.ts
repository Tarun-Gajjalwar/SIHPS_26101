import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  role: 'EMPLOYEE' | 'TRAINER' | 'ADMIN';
  profile?: {
    id: string;
    firstName: string;
    lastName: string;
    designation?: string;
    employeeId?: string;
    department?: { name: string; code: string };
    jobRole?: { title: string; code: string };
    experience?: number;
    education?: string;
    stats?: {
      totalLearningHours: number;
      completedCourses: number;
      lastAssessmentScore: number | null;
      avgCompetencyScore: number;
      activeSkillGaps: number;
      learningPathProgress: number;
    };
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', { email, password });
          const { token, user } = response.data.data;
          localStorage.setItem('statintel_token', token);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (err: unknown) {
          const error = err as { response?: { data?: { message?: string } } };
          set({
            error: error.response?.data?.message || 'Login failed',
            isLoading: false,
          });
          throw err;
        }
      },

      logout: () => {
        localStorage.removeItem('statintel_token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      refreshUser: async () => {
        try {
          const response = await api.get('/users/me');
          set({ user: response.data.data });
        } catch {
          // silently fail
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'statintel_auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
