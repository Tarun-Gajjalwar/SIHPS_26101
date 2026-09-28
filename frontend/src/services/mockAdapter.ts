// Client-side Mock Adapter for StatSaksham
// Allows the entire frontend to run standalone on Vercel without a separate backend
import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import {
  MOCK_USERS,
  MOCK_COMPETENCIES,
  MOCK_EMPLOYEE_COMPETENCIES,
  MOCK_SKILL_GAPS,
  MOCK_IGOT_COURSES,
  MOCK_NSSTA_PROGRAMMES,
  MOCK_LEARNING_PATH,
  MOCK_QUESTIONS,
  MOCK_MATERIALS,
  MOCK_QUIZZES,
  MOCK_CERTIFICATES,
  MOCK_ANALYTICS,
  MockUser
} from './mockData';

// Mutable in-memory store for dynamic prototype interaction
let currentQuestions = [...MOCK_QUESTIONS];
let currentMaterials = [...MOCK_MATERIALS];
let currentLearningPath = JSON.parse(JSON.stringify(MOCK_LEARNING_PATH));
let currentSkillGaps = [...MOCK_SKILL_GAPS];
let currentCompetencies = [...MOCK_EMPLOYEE_COMPETENCIES];

export async function handleMockRequest(config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
  const fullUrl = config.url || '';
  // Strip baseURL or leading '/api'
  const path = fullUrl.replace(/^(https?:\/\/[^/]+)?(\/api)?/, '');
  const method = (config.method || 'get').toUpperCase();
  
  let body: any = {};
  if (config.data) {
    body = typeof config.data === 'string' ? JSON.parse(config.data || '{}') : config.data;
  }

  // Artificial tiny delay to simulate realistic response
  await new Promise((r) => setTimeout(r, 60));

  const respond = (data: any, status = 200): AxiosResponse => ({
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config,
  });

  // 1. Authentication
  if (path === '/auth/login' && method === 'POST') {
    const email = (body.email || '').toLowerCase().trim();
    const user: MockUser = MOCK_USERS[email] || MOCK_USERS['employee@statintel.demo'];

    const token = `statsaksham-mock-jwt-${user.role.toLowerCase()}-${Date.now()}`;
    localStorage.setItem('statintel_token', token);
    localStorage.setItem('statintel_active_email', user.email);

    return respond({
      success: true,
      message: 'Login successful (Client Mock)',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          profile: user.profile
        }
      }
    });
  }

  // Helper: Get active logged in user
  const activeEmail = localStorage.getItem('statintel_active_email') || 'employee@statintel.demo';
  const currentUser = MOCK_USERS[activeEmail] || MOCK_USERS['employee@statintel.demo'];

  // 2. User & Profile
  if (path === '/users/me' || path === '/profile/me') {
    return respond({
      success: true,
      data: {
        id: currentUser.id,
        email: currentUser.email,
        role: currentUser.role,
        profile: {
          ...currentUser.profile,
          competencies: currentCompetencies,
          skillGaps: currentSkillGaps,
          certificates: MOCK_CERTIFICATES
        }
      }
    });
  }

  if (path === '/users' && method === 'GET') {
    return respond({
      success: true,
      data: Object.values(MOCK_USERS)
    });
  }

  // 3. Competencies
  if (path === '/competencies/my') {
    return respond({
      success: true,
      data: currentCompetencies
    });
  }

  if (path === '/competencies') {
    return respond({
      success: true,
      data: MOCK_COMPETENCIES
    });
  }

  // 4. Skill Gaps
  if (path === '/skill-gaps/my') {
    return respond({
      success: true,
      data: currentSkillGaps
    });
  }

  if (path === '/skill-gaps/recalculate') {
    return respond({
      success: true,
      message: 'Skill gap recalculated successfully',
      data: currentSkillGaps
    });
  }

  // 5. Learning Paths
  if (path === '/learning-paths/my') {
    return respond({
      success: true,
      data: [currentLearningPath]
    });
  }

  if (path.startsWith('/learning-paths/items/') && path.endsWith('/status') && method === 'PATCH') {
    const parts = path.split('/');
    const itemId = parts[3];
    const newStatus = body.status;
    const item = currentLearningPath.items.find((i: any) => i.id === itemId);
    if (item) item.status = newStatus;
    return respond({
      success: true,
      data: currentLearningPath
    });
  }

  if (path === '/learning-paths/generate') {
    return respond({
      success: true,
      message: 'Learning path generated',
      data: currentLearningPath
    });
  }

  // 6. Courses & NSSTA
  if (path === '/courses') {
    return respond({
      success: true,
      data: MOCK_IGOT_COURSES
    });
  }

  if (path === '/nssta') {
    return respond({
      success: true,
      data: MOCK_NSSTA_PROGRAMMES
    });
  }

  // 7. Quizzes & Assessments
  if (path === '/quizzes' && method === 'GET') {
    return respond({
      success: true,
      data: MOCK_QUIZZES
    });
  }

  if (path.startsWith('/quizzes/') && method === 'GET') {
    return respond({
      success: true,
      data: MOCK_QUIZZES[0]
    });
  }

  if (path.includes('/attempt') && method === 'POST') {
    return respond({
      success: true,
      data: {
        score: 45,
        totalMarks: 50,
        percentage: 90,
        passed: true,
        summary: 'Excellent performance in official survey design and sampling methodology.'
      }
    });
  }

  if (path === '/quizzes' && method === 'POST') {
    const newQuiz = {
      id: `quiz-${Date.now()}`,
      title: body.title || 'New Faculty Generated Quiz',
      description: body.description || 'Generated assessment',
      duration: body.duration || 15,
      totalMarks: 50,
      questionsCount: (body.questionIds || []).length || 5,
      questions: currentQuestions.slice(0, 5)
    };
    return respond({
      success: true,
      data: newQuiz
    });
  }

  if (path === '/assessments/submit') {
    return respond({
      success: true,
      message: 'Assessment submitted successfully',
      data: {
        score: 85,
        competencyScore: 3.8
      }
    });
  }

  // 8. Documents & Materials
  if (path === '/materials' && method === 'GET') {
    return respond({
      success: true,
      data: currentMaterials
    });
  }

  if (path === '/materials/sample' && method === 'POST') {
    const newMat = {
      id: `mat-${Date.now()}`,
      title: body.title || 'Ingested Manual',
      filename: body.filename || 'manual.pdf',
      status: 'READY',
      topics: body.topics || ['Statistical Analysis', 'MoSPI Standards'],
      summary: body.summary || 'Official ingested manual.',
      createdAt: new Date().toISOString()
    };
    currentMaterials = [newMat, ...currentMaterials];
    return respond({
      success: true,
      data: newMat
    });
  }

  // 9. Questions Bank
  if (path === '/questions' && method === 'GET') {
    return respond({
      success: true,
      data: currentQuestions
    });
  }

  if (path.startsWith('/questions/') && path.endsWith('/status') && method === 'PATCH') {
    const parts = path.split('/');
    const qId = parts[2];
    const q = currentQuestions.find((item) => item.id === qId);
    if (q) q.status = body.status;
    return respond({
      success: true,
      data: q || currentQuestions[0]
    });
  }

  // 10. Admin Analytics
  if (path === '/analytics/dashboard') {
    return respond({
      success: true,
      data: MOCK_ANALYTICS
    });
  }

  // 11. AI Assistant Chat
  if (path === '/ai/chat' && method === 'POST') {
    const q = (body.question || '').toLowerCase();
    let reply = 'StatSaksham AI: Based on MoSPI standards and National Statistical Commission (NSC) directives, competency alignment is critical for official cadre operations. We recommend checking the iGOT Karmayogi modules and NSSTA residential workshops.';

    if (q.includes('cpi') || q.includes('price')) {
      reply = 'StatSaksham AI: CPI (Consumer Price Index) compilation in MoSPI utilizes the modified Laspeyres formula with 2012=100 base year weighting. Price data is collected across 1,181 rural and 1,114 urban markets weekly/monthly.';
    } else if (q.includes('sampling') || q.includes('survey')) {
      reply = 'StatSaksham AI: NSSO utilizes a stratified multi-stage sampling design. First Stage Units (FSUs) are Census villages (rural) and Urban Frame Survey (UFS) blocks (urban). Ultimate Stage Units (USUs) are households.';
    } else if (q.includes('python')) {
      reply = 'StatSaksham AI: Python is recommended for automating survey cleaning and GSBPM validation logic. Check the "Python for Official Data Analysis" course on iGOT Karmayogi.';
    }

    return respond({
      success: true,
      data: { reply }
    });
  }

  // Fallback default
  return respond({
    success: true,
    data: []
  });
}
