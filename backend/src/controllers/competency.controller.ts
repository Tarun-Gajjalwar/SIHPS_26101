import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAllCompetencies = async (req: AuthRequest, res: Response): Promise<void> => {
  const competencies = await prisma.competency.findMany({
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  });
  res.json({ success: true, data: competencies });
};

export const getMyCompetencies = async (req: AuthRequest, res: Response): Promise<void> => {
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
  });

  if (!profile) {
    res.status(404).json({ success: false, message: 'Profile not found' });
    return;
  }

  const competencies = await prisma.employeeCompetency.findMany({
    where: { profileId: profile.id },
    include: { competency: true },
    orderBy: { competency: { category: 'asc' } },
  });

  res.json({ success: true, data: competencies });
};

export const updateMyCompetency = async (req: AuthRequest, res: Response): Promise<void> => {
  const { competencyId } = req.params;
  const { currentLevel } = req.body;

  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
  });

  if (!profile) {
    res.status(404).json({ success: false, message: 'Profile not found' });
    return;
  }

  const competency = await prisma.employeeCompetency.upsert({
    where: { profileId_competencyId: { profileId: profile.id, competencyId } },
    update: { currentLevel, lastAssessed: new Date() },
    create: {
      profileId: profile.id,
      competencyId,
      currentLevel,
      lastAssessed: new Date(),
    },
    include: { competency: true },
  });

  res.json({ success: true, data: competency });
};

export const getProfileCompetencies = async (req: AuthRequest, res: Response): Promise<void> => {
  const competencies = await prisma.employeeCompetency.findMany({
    where: { profileId: req.params.profileId },
    include: { competency: true },
  });
  res.json({ success: true, data: competencies });
};
