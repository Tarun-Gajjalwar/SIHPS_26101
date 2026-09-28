import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAllQuizzes = async (req: AuthRequest, res: Response): Promise<void> => {
  const where = req.user!.role === 'EMPLOYEE'
    ? { status: 'PUBLISHED' as const }
    : {};

  const quizzes = await prisma.quiz.findMany({
    where,
    include: {
      _count: { select: { questions: true, attempts: true } },
      competencies: { include: { competency: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ success: true, data: quizzes });
};

export const createQuiz = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description, duration, passingScore, questionIds, competencyIds } = req.body;

  const quiz = await prisma.quiz.create({
    data: {
      title,
      description,
      createdById: req.user!.id,
      duration: parseInt(String(duration)) || 15,
      passingScore: parseInt(String(passingScore)) || 60,
      questions: {
        create: (questionIds as string[]).map((qId: string, i: number) => ({
          generatedQuestionId: qId,
          order: i + 1,
        })),
      },
      competencies: competencyIds ? {
        create: (competencyIds as string[]).map((cId: string) => ({ competencyId: cId })),
      } : undefined,
    },
    include: {
      questions: {
        include: { generatedQuestion: { include: { competency: true } } },
        orderBy: { order: 'asc' },
      },
      competencies: { include: { competency: true } },
    },
  });

  res.status(201).json({ success: true, data: quiz });
};

export const getQuizById = async (req: AuthRequest, res: Response): Promise<void> => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: req.params.id },
    include: {
      questions: {
        include: { generatedQuestion: true },
        orderBy: { order: 'asc' },
      },
      competencies: { include: { competency: true } },
    },
  });

  if (!quiz) {
    res.status(404).json({ success: false, message: 'Quiz not found' });
    return;
  }

  // For employees, strip correct answers
  if (req.user!.role === 'EMPLOYEE') {
    const sanitized = {
      ...quiz,
      questions: quiz.questions.map(qq => ({
        ...qq,
        generatedQuestion: {
          id: qq.generatedQuestion.id,
          text: qq.generatedQuestion.text,
          optionA: qq.generatedQuestion.optionA,
          optionB: qq.generatedQuestion.optionB,
          optionC: qq.generatedQuestion.optionC,
          optionD: qq.generatedQuestion.optionD,
          difficulty: qq.generatedQuestion.difficulty,
          domain: qq.generatedQuestion.domain,
        },
      })),
    };
    res.json({ success: true, data: sanitized });
    return;
  }

  res.json({ success: true, data: quiz });
};

export const updateQuiz = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description, duration, passingScore } = req.body;

  const quiz = await prisma.quiz.update({
    where: { id: req.params.id },
    data: { title, description, duration, passingScore },
  });

  res.json({ success: true, data: quiz });
};

export const publishQuiz = async (req: AuthRequest, res: Response): Promise<void> => {
  const quiz = await prisma.quiz.update({
    where: { id: req.params.id },
    data: { status: 'PUBLISHED' },
  });

  res.json({ success: true, data: quiz, message: 'Quiz published successfully' });
};

export const startQuizAttempt = async (req: AuthRequest, res: Response): Promise<void> => {
  const quiz = await prisma.quiz.findUnique({ where: { id: req.params.id } });
  if (!quiz) {
    res.status(404).json({ success: false, message: 'Quiz not found' });
    return;
  }

  const attempt = await prisma.quizAttempt.create({
    data: {
      userId: req.user!.id,
      quizId: req.params.id,
      answers: {},
    },
  });

  res.json({ success: true, data: attempt });
};

export const submitQuizAttempt = async (req: AuthRequest, res: Response): Promise<void> => {
  const { answers, attemptId } = req.body;
  const { id: quizId } = req.params;

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        include: { generatedQuestion: true },
        orderBy: { order: 'asc' },
      },
      competencies: { include: { competency: true } },
    },
  });

  if (!quiz) {
    res.status(404).json({ success: false, message: 'Quiz not found' });
    return;
  }

  // Calculate score
  let correct = 0;
  const feedback: Array<{
    questionId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string | null;
  }> = [];

  const domainScores: Record<string, { correct: number; total: number }> = {};

  quiz.questions.forEach(qq => {
    const q = qq.generatedQuestion;
    const userAnswer = (answers as Record<string, string>)[q.id] || '';
    const isCorrect = userAnswer === q.correctAnswer;
    if (isCorrect) correct++;

    const domain = q.domain || 'General';
    if (!domainScores[domain]) domainScores[domain] = { correct: 0, total: 0 };
    domainScores[domain].total++;
    if (isCorrect) domainScores[domain].correct++;

    feedback.push({
      questionId: q.id,
      question: q.text,
      userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation,
    });
  });

  const total = quiz.questions.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passed = percentage >= quiz.passingScore;

  // Save attempt
  const attempt = await prisma.quizAttempt.create({
    data: {
      userId: req.user!.id,
      quizId,
      answers: answers as object,
      score: correct,
      percentage,
      passed,
      completedAt: new Date(),
      feedback: feedback as object,
    },
  });

  // Update competency scores for each competency covered by this quiz
  const profile = await prisma.profile.findUnique({ where: { userId: req.user!.id } });
  const competencyUpdates: Array<{ competencyName: string; oldLevel: number; newLevel: number; improvement: number }> = [];

  if (profile) {
    for (const qc of quiz.competencies) {
      const competencyName = qc.competency.name;
      const domain = Object.keys(domainScores).find(d =>
        d.toLowerCase().includes(competencyName.toLowerCase()) ||
        competencyName.toLowerCase().includes(d.toLowerCase())
      );

      const domainScore = domain ? (domainScores[domain].correct / domainScores[domain].total) : (correct / total);
      const newCompetencyScore = parseFloat((domainScore * 5).toFixed(1));

      const existing = await prisma.employeeCompetency.findUnique({
        where: { profileId_competencyId: { profileId: profile.id, competencyId: qc.competencyId } },
      });

      if (existing) {
        // Weighted average: 70% old score + 30% new assessment
        const blendedScore = parseFloat((existing.currentLevel * 0.7 + newCompetencyScore * 0.3).toFixed(1));
        const improvement = parseFloat((blendedScore - existing.currentLevel).toFixed(1));

        await prisma.employeeCompetency.update({
          where: { profileId_competencyId: { profileId: profile.id, competencyId: qc.competencyId } },
          data: { currentLevel: Math.min(5, blendedScore), lastAssessed: new Date() },
        });

        if (improvement !== 0) {
          competencyUpdates.push({
            competencyName,
            oldLevel: existing.currentLevel,
            newLevel: Math.min(5, blendedScore),
            improvement,
          });
        }
      }
    }

    // Update skill gaps after competency update
    for (const update of competencyUpdates) {
      const competency = await prisma.competency.findFirst({
        where: { name: { equals: update.competencyName, mode: 'insensitive' } },
      });
      if (competency) {
        const existingGap = await prisma.skillGap.findUnique({
          where: { profileId_competencyId: { profileId: profile.id, competencyId: competency.id } },
        });
        if (existingGap) {
          const newGap = existingGap.gapScore - update.improvement;
          if (newGap <= 0.2) {
            await prisma.skillGap.update({
              where: { profileId_competencyId: { profileId: profile.id, competencyId: competency.id } },
              data: { gapScore: 0, resolvedAt: new Date() },
            });
          } else {
            await prisma.skillGap.update({
              where: { profileId_competencyId: { profileId: profile.id, competencyId: competency.id } },
              data: { gapScore: parseFloat(newGap.toFixed(1)) },
            });
          }
        }
      }
    }
  }

  // Create notification
  await prisma.notification.create({
    data: {
      userId: req.user!.id,
      title: 'Quiz Completed',
      message: `You scored ${percentage}% on "${quiz.title}". ${passed ? '🎉 Congratulations, you passed!' : 'Keep practicing to improve your score.'} ${competencyUpdates.length > 0 ? 'Your competency profile has been updated.' : ''}`,
      type: passed ? 'success' : 'info',
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
      feedback,
      competencyUpdates,
    },
  });
};

export const getQuizResult = async (req: AuthRequest, res: Response): Promise<void> => {
  const attempt = await prisma.quizAttempt.findFirst({
    where: {
      quizId: req.params.id,
      userId: req.user!.id,
      completedAt: { not: null },
    },
    orderBy: { completedAt: 'desc' },
    include: { quiz: true },
  });

  if (!attempt) {
    res.status(404).json({ success: false, message: 'No completed attempt found' });
    return;
  }

  res.json({ success: true, data: attempt });
};

export const getQuizAttempts = async (req: AuthRequest, res: Response): Promise<void> => {
  const attempts = await prisma.quizAttempt.findMany({
    where: {
      quizId: req.params.id,
      ...(req.user!.role === 'EMPLOYEE' ? { userId: req.user!.id } : {}),
    },
    include: {
      user: { include: { profile: true } },
    },
    orderBy: { startedAt: 'desc' },
  });

  res.json({ success: true, data: attempts });
};
