import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';
import { identifySkillGaps } from '../services/ai/ai.service';

export const getMySkillGaps = async (req: AuthRequest, res: Response): Promise<void> => {
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
    include: {
      skillGaps: {
        include: { competency: true },
        orderBy: { priority: 'asc' },
      },
    },
  });

  if (!profile) {
    res.status(404).json({ success: false, message: 'Profile not found' });
    return;
  }

  res.json({ success: true, data: profile.skillGaps });
};

export const analyzeSkillGaps = async (req: AuthRequest, res: Response): Promise<void> => {
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
    include: {
      competencies: { include: { competency: true } },
      jobRole: true,
      department: true,
    },
  });

  if (!profile) {
    res.status(404).json({ success: false, message: 'Profile not found' });
    return;
  }

  const competencyInput = profile.competencies.map(ec => ({
    name: ec.competency.name,
    category: ec.competency.category,
    currentLevel: ec.currentLevel,
    requiredLevel: ec.requiredLevel,
  }));

  const result = await identifySkillGaps({
    competencies: competencyInput,
    role: profile.jobRole?.title,
    department: profile.department?.name,
  });

  // Update skill gaps in database
  for (const gap of result.gaps) {
    const competency = await prisma.competency.findFirst({
      where: { name: { equals: gap.competencyName, mode: 'insensitive' } },
    });

    if (competency) {
      await prisma.skillGap.upsert({
        where: { profileId_competencyId: { profileId: profile.id, competencyId: competency.id } },
        update: {
          gapScore: gap.gap,
          priority: gap.priority,
          reason: gap.reason,
          resolvedAt: null,
        },
        create: {
          profileId: profile.id,
          competencyId: competency.id,
          gapScore: gap.gap,
          priority: gap.priority,
          reason: gap.reason,
        },
      });
    }
  }

  // Fetch updated gaps
  const updatedGaps = await prisma.skillGap.findMany({
    where: { profileId: profile.id },
    include: { competency: true },
    orderBy: { priority: 'asc' },
  });

  res.json({
    success: true,
    data: {
      gaps: updatedGaps,
      summary: result.summary,
      analysisResult: result,
    },
  });
};

export const getProfileSkillGaps = async (req: AuthRequest, res: Response): Promise<void> => {
  const gaps = await prisma.skillGap.findMany({
    where: { profileId: req.params.profileId },
    include: { competency: true },
    orderBy: { priority: 'asc' },
  });
  res.json({ success: true, data: gaps });
};
