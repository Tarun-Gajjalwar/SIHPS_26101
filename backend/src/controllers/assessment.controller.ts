import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';
import { analyzeCompetency } from '../services/ai/ai.service';

export const getAllAssessments = async (req: AuthRequest, res: Response): Promise<void> => {
  const assessments = await prisma.assessment.findMany({
    where: { isActive: true },
    include: {
      _count: { select: { questions: true } },
    },
  });
  res.json({ success: true, data: assessments });
};

export const getActiveAssessment = async (req: AuthRequest, res: Response): Promise<void> => {
  const assessment = await prisma.assessment.findFirst({
    where: { isActive: true },
    include: {
      questions: {
        include: { question: true },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!assessment) {
    res.status(404).json({ success: false, message: 'No active assessment found' });
    return;
  }

  const sanitized = {
    ...assessment,
    questions: assessment.questions.map(aq => ({
      ...aq,
      question: {
        id: aq.question.id,
        text: aq.question.text,
        optionA: aq.question.optionA,
        optionB: aq.question.optionB,
        optionC: aq.question.optionC,
        optionD: aq.question.optionD,
        difficulty: aq.question.difficulty,
        domain: aq.question.domain,
        competencyId: aq.question.competencyId,
      },
    })),
  };

  res.json({ success: true, data: sanitized });
};

export const getAssessmentById = async (req: AuthRequest, res: Response): Promise<void> => {
  const assessment = await prisma.assessment.findUnique({
    where: { id: req.params.id },
    include: {
      questions: {
        include: { question: true },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!assessment) {
    res.status(404).json({ success: false, message: 'Assessment not found' });
    return;
  }

  // Strip correct answers from questions
  const sanitized = {
    ...assessment,
    questions: assessment.questions.map(aq => ({
      ...aq,
      question: {
        id: aq.question.id,
        text: aq.question.text,
        optionA: aq.question.optionA,
        optionB: aq.question.optionB,
        optionC: aq.question.optionC,
        optionD: aq.question.optionD,
        difficulty: aq.question.difficulty,
        domain: aq.question.domain,
        competencyId: aq.question.competencyId,
      },
    })),
  };

  res.json({ success: true, data: sanitized });
};

export const startAssessment = async (req: AuthRequest, res: Response): Promise<void> => {
  const assessment = await prisma.assessment.findUnique({
    where: { id: req.params.id },
  });

  if (!assessment) {
    res.status(404).json({ success: false, message: 'Assessment not found' });
    return;
  }

  const attempt = await prisma.assessmentAttempt.create({
    data: {
      userId: req.user!.id,
      assessmentId: req.params.id,
      answers: {},
    },
  });

  res.json({ success: true, data: attempt });
};

export const submitAssessment = async (req: AuthRequest, res: Response): Promise<void> => {
  const { answers } = req.body;
  const { id: assessmentId } = req.params;

  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: {
      questions: {
        include: { question: true },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!assessment) {
    res.status(404).json({ success: false, message: 'Assessment not found' });
    return;
  }

  // Calculate score
  let correct = 0;
  const results: Array<{
    questionId: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string | null;
    domain: string | null;
  }> = [];

  // Track domain-wise performance
  const domainScores: Record<string, { correct: number; total: number }> = {};

  assessment.questions.forEach(aq => {
    const q = aq.question;
    const userAnswer = (answers as Record<string, string>)[q.id] || '';
    const isCorrect = userAnswer === q.correctAnswer;
    if (isCorrect) correct++;

    const domain = q.domain || 'General';
    if (!domainScores[domain]) domainScores[domain] = { correct: 0, total: 0 };
    domainScores[domain].total++;
    if (isCorrect) domainScores[domain].correct++;

    results.push({
      questionId: q.id,
      userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation,
      domain: q.domain,
    });
  });

  const total = assessment.questions.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passed = percentage >= assessment.passingScore;

  // AI analysis
  const profile = await prisma.profile.findUnique({ where: { userId: req.user!.id } });
  
  // Calculate competency scores per domain
  const competencyScores: Record<string, number> = {};
  Object.entries(domainScores).forEach(([domain, data]) => {
    competencyScores[domain] = parseFloat(((data.correct / Math.max(data.total, 1)) * 5).toFixed(1));
  });

  const analysisResult = await analyzeCompetency({
    profileId: profile?.id,
    scores: competencyScores,
    percentage,
    passed,
    domainScores,
  });

  // Update competency scores for the employee
  if (profile) {
    for (const [domain, score] of Object.entries(competencyScores)) {
      const competency = await prisma.competency.findFirst({
        where: { name: { contains: domain, mode: 'insensitive' } },
      });
      if (competency) {
        await prisma.employeeCompetency.upsert({
          where: { profileId_competencyId: { profileId: profile.id, competencyId: competency.id } },
          update: { currentLevel: Math.min(5, Math.max(0, score)), lastAssessed: new Date() },
          create: {
            profileId: profile.id,
            competencyId: competency.id,
            currentLevel: Math.min(5, Math.max(0, score)),
            lastAssessed: new Date(),
          },
        });
      }
    }
  }

  // Save attempt
  const attempt = await prisma.assessmentAttempt.create({
    data: {
      userId: req.user!.id,
      assessmentId,
      answers: answers as object,
      score: correct,
      percentage,
      passed,
      completedAt: new Date(),
      analysisResult: { results, domainScores, competencyScores, analysisResult } as object,
    },
  });

  // Create notification
  await prisma.notification.create({
    data: {
      userId: req.user!.id,
      title: 'Assessment Completed',
      message: `You scored ${percentage}% on "${assessment.title}". ${passed ? 'Congratulations, you passed!' : 'Keep practicing to improve.'}`,
      type: passed ? 'success' : 'warning',
    },
  });

  res.json({
    success: true,
    data: {
      attempt,
      score: correct,
      total,
      percentage,
      passed,
      results,
      domainScores,
      competencyScores,
      analysisResult,
    },
  });
};

export const getAssessmentResult = async (req: AuthRequest, res: Response): Promise<void> => {
  const attempt = await prisma.assessmentAttempt.findFirst({
    where: {
      assessmentId: req.params.id,
      userId: req.user!.id,
      completedAt: { not: null },
    },
    orderBy: { completedAt: 'desc' },
    include: { assessment: true },
  });

  if (!attempt) {
    res.status(404).json({ success: false, message: 'No completed attempt found' });
    return;
  }

  res.json({ success: true, data: attempt });
};

export const getMyAttempts = async (req: AuthRequest, res: Response): Promise<void> => {
  const attempts = await prisma.assessmentAttempt.findMany({
    where: { userId: req.user!.id, completedAt: { not: null } },
    include: { assessment: true },
    orderBy: { completedAt: 'desc' },
  });
  res.json({ success: true, data: attempts });
};
