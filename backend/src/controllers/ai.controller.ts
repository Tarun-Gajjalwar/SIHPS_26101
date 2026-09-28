import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';
import { answerAssistant } from '../services/ai/ai.service';

export const chat = async (req: AuthRequest, res: Response): Promise<void> => {
  let { messages, question, message } = req.body;

  if (!messages) {
    const text = question || message;
    if (text) {
      messages = [{ role: 'user', content: text }];
    }
  }

  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ success: false, message: 'Messages or question is required' });
    return;
  }

  // Get user context
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
    include: {
      competencies: { include: { competency: true } },
      skillGaps: { include: { competency: true } },
      jobRole: true,
      department: true,
    },
  });

  const userContext = profile ? {
    name: `${profile.firstName} ${profile.lastName}`,
    role: profile.jobRole?.title,
    department: profile.department?.name,
    competencies: profile.competencies.map(ec => ({
      name: ec.competency.name,
      currentLevel: ec.currentLevel,
      requiredLevel: ec.requiredLevel,
    })),
    skillGaps: profile.skillGaps.map(sg => ({
      competencyName: sg.competency.name,
      gap: sg.gapScore,
    })),
  } : undefined;

  const response = await answerAssistant({ messages, userContext });

  res.json({ success: true, data: { response, answer: response } });
};

export const explainGap = async (req: AuthRequest, res: Response): Promise<void> => {
  const { competencyName, currentLevel, requiredLevel } = req.body;

  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
    include: { jobRole: true, department: true },
  });

  const response = await answerAssistant({
    messages: [
      {
        role: 'user',
        content: `Why do I have a skill gap in ${competencyName}? My current level is ${currentLevel}/5 and required level is ${requiredLevel}/5.`,
      },
    ],
    userContext: {
      name: profile ? `${profile.firstName} ${profile.lastName}` : undefined,
      role: profile?.jobRole?.title,
      department: profile?.department?.name,
      skillGaps: [{ competencyName, gap: requiredLevel - currentLevel }],
    },
  });

  res.json({ success: true, data: { response } });
};

export const analyzeCompetency = async (req: AuthRequest, res: Response): Promise<void> => {
  const { scores, percentage } = req.body;

  const response = await answerAssistant({
    messages: [
      {
        role: 'user',
        content: `Analyze my competency assessment: I scored ${percentage}% overall. My domain scores are: ${JSON.stringify(scores)}`,
      },
    ],
  });

  res.json({ success: true, data: { response } });
};
