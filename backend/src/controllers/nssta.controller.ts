import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAllProgrammes = async (req: AuthRequest, res: Response): Promise<void> => {
  const programmes = await prisma.nsstaProgramme.findMany({
    where: { isActive: true },
    orderBy: { title: 'asc' },
  });
  res.json({ success: true, data: programmes });
};

export const getRecommendedProgrammes = async (req: AuthRequest, res: Response): Promise<void> => {
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
    include: {
      skillGaps: { include: { competency: true } },
    },
  });

  if (!profile) {
    res.status(404).json({ success: false, message: 'Profile not found' });
    return;
  }

  const programmes = await prisma.nsstaProgramme.findMany({ where: { isActive: true } });

  const withMatch = programmes.map(p => {
    const matchingGaps = profile.skillGaps.filter(sg =>
      p.competencies.some(c => 
        sg.competency.name.toLowerCase().includes(c.toLowerCase()) ||
        c.toLowerCase().includes(sg.competency.name.toLowerCase())
      )
    );

    return {
      ...p,
      matchingGaps: matchingGaps.map(g => g.competency.name),
      isRecommended: matchingGaps.length > 0,
      reason: matchingGaps.length > 0 
        ? `Matches your ${matchingGaps.map(g => g.competency.name).join(', ')} competency gaps`
        : null,
    };
  });

  res.json({ success: true, data: withMatch });
};

export const getProgrammeById = async (req: AuthRequest, res: Response): Promise<void> => {
  const programme = await prisma.nsstaProgramme.findUnique({ where: { id: req.params.id } });
  if (!programme) {
    res.status(404).json({ success: false, message: 'Programme not found' });
    return;
  }
  res.json({ success: true, data: programme });
};
