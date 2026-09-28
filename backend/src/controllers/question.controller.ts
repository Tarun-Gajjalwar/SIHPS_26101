import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAllGeneratedQuestions = async (req: AuthRequest, res: Response): Promise<void> => {
  const { status, materialId } = req.query;

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (materialId) where.materialId = materialId;
  if (req.user!.role === 'TRAINER') where.uploadedById = req.user!.id;

  const questions = await prisma.generatedQuestion.findMany({
    where,
    include: { competency: true, material: true },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ success: true, data: questions });
};

export const getQuestionById = async (req: AuthRequest, res: Response): Promise<void> => {
  const question = await prisma.generatedQuestion.findUnique({
    where: { id: req.params.id },
    include: { competency: true, material: true },
  });

  if (!question) {
    res.status(404).json({ success: false, message: 'Question not found' });
    return;
  }

  res.json({ success: true, data: question });
};

export const updateQuestion = async (req: AuthRequest, res: Response): Promise<void> => {
  const { text, optionA, optionB, optionC, optionD, correctAnswer, explanation, difficulty, domain, competencyId } = req.body;

  const question = await prisma.generatedQuestion.update({
    where: { id: req.params.id },
    data: {
      text, optionA, optionB, optionC, optionD,
      correctAnswer, explanation, difficulty, domain, competencyId,
    },
    include: { competency: true },
  });

  res.json({ success: true, data: question });
};

export const updateQuestionStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  const { status, reviewNotes } = req.body;

  const question = await prisma.generatedQuestion.update({
    where: { id: req.params.id },
    data: {
      status,
      reviewNotes,
      reviewedAt: new Date(),
    },
  });

  res.json({ success: true, data: question });
};

export const deleteQuestion = async (req: AuthRequest, res: Response): Promise<void> => {
  await prisma.generatedQuestion.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Question deleted' });
};
