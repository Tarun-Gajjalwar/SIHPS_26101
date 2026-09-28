import { MockAIProvider } from './mock.provider';
import type {
  AIProvider,
  CompetencyAnalysisInput,
  CompetencyAnalysisResult,
  SkillGapInput,
  SkillGapResult,
  MCQInput,
  MCQResult,
  AssistantInput,
  RecommendationInput,
  RecommendationResult,
} from './types';

let provider: AIProvider;

function getProvider(): AIProvider {
  if (provider) return provider;

  const aiProvider = process.env.AI_PROVIDER?.toLowerCase() || 'mock';

  if (aiProvider === 'gemini' && process.env.GEMINI_API_KEY) {
    // Gemini provider would be imported here
    console.log('Using Gemini AI provider');
    provider = new MockAIProvider(); // Fall back to mock for now
  } else if (aiProvider === 'openai' && process.env.OPENAI_API_KEY) {
    // OpenAI provider would be imported here
    console.log('Using OpenAI provider');
    provider = new MockAIProvider(); // Fall back to mock for now
  } else {
    console.log('Using Mock AI provider (prototype mode)');
    provider = new MockAIProvider();
  }

  return provider;
}

export async function analyzeCompetency(input: CompetencyAnalysisInput): Promise<CompetencyAnalysisResult> {
  return getProvider().analyzeCompetency(input);
}

export async function identifySkillGaps(input: SkillGapInput): Promise<SkillGapResult> {
  return getProvider().identifySkillGaps(input);
}

export async function generateMCQs(input: MCQInput): Promise<MCQResult> {
  return getProvider().generateMCQs(input);
}

export async function answerAssistant(input: AssistantInput): Promise<string> {
  return getProvider().answerAssistant(input);
}

export async function generateRecommendations(input: RecommendationInput): Promise<RecommendationResult> {
  return getProvider().generateRecommendations(input);
}
