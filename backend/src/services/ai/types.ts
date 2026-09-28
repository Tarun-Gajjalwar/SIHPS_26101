export interface CompetencyAnalysisInput {
  profileId?: string;
  scores: Record<string, number>;
  percentage: number;
  passed: boolean;
  domainScores?: Record<string, { correct: number; total: number }>;
}

export interface CompetencyAnalysisResult {
  summary: string;
  strengths: string[];
  improvements: string[];
  overallLevel: string;
  recommendation: string;
}

export interface SkillGapInput {
  competencies: Array<{
    name: string;
    category: string;
    currentLevel: number;
    requiredLevel: number;
  }>;
  role?: string;
  department?: string;
}

export interface SkillGapResult {
  gaps: Array<{
    competencyName: string;
    gap: number;
    priority: number;
    reason: string;
    recommendedAction: string;
  }>;
  summary: string;
}

export interface MCQInput {
  content: string;
  count: number;
  domain?: string;
  difficulty?: string;
}

export interface MCQQuestion {
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  domain: string;
  aiConfidence: number;
}

export interface MCQResult {
  questions: MCQQuestion[];
  topicsDetected: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AssistantInput {
  messages: ChatMessage[];
  userContext?: {
    name?: string;
    role?: string;
    department?: string;
    competencies?: Array<{ name: string; currentLevel: number; requiredLevel: number }>;
    skillGaps?: Array<{ competencyName: string; gap: number }>;
  };
}

export interface RecommendationInput {
  skillGaps: Array<{ competencyName: string; gap: number; priority: number }>;
  role?: string;
  department?: string;
  completedCourses?: string[];
}

export interface RecommendationResult {
  courses: Array<{
    title: string;
    reason: string;
    matchPercentage: number;
    priority: number;
  }>;
  programmes: Array<{
    title: string;
    reason: string;
    priority: number;
  }>;
}

export interface AIProvider {
  analyzeCompetency(input: CompetencyAnalysisInput): Promise<CompetencyAnalysisResult>;
  identifySkillGaps(input: SkillGapInput): Promise<SkillGapResult>;
  generateMCQs(input: MCQInput): Promise<MCQResult>;
  answerAssistant(input: AssistantInput): Promise<string>;
  generateRecommendations(input: RecommendationInput): Promise<RecommendationResult>;
}
