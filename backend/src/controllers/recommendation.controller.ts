import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';
import { generateRecommendations } from '../services/ai/ai.service';

export const getMyRecommendations = async (req: AuthRequest, res: Response): Promise<void> => {
  const profile = await prisma.profile.findUnique({ where: { userId: req.user!.id } });
  if (!profile) {
    res.status(404).json({ success: false, message: 'Profile not found' });
    return;
  }

  const recommendations = await prisma.recommendation.findMany({
    where: { profileId: profile.id },
    include: { course: true, nsstaProgramme: true },
    orderBy: { priority: 'asc' },
  });

  res.json({ success: true, data: recommendations });
};

export const generateRecommendationsForUser = async (req: AuthRequest, res: Response): Promise<void> => {
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
    include: {
      skillGaps: { include: { competency: true }, orderBy: { priority: 'asc' } },
      jobRole: true,
      department: true,
    },
  });

  if (!profile) {
    res.status(404).json({ success: false, message: 'Profile not found' });
    return;
  }

  const skillGapInput = profile.skillGaps.map(sg => ({
    competencyName: sg.competency.name,
    gap: sg.gapScore,
    priority: sg.priority,
  }));

  const result = await generateRecommendations({
    skillGaps: skillGapInput,
    role: profile.jobRole?.title,
    department: profile.department?.name,
  });

  // Get existing courses and programmes
  const courses = await prisma.course.findMany({ where: { isIgot: true } });
  const programmes = await prisma.nsstaProgramme.findMany({ where: { isActive: true } });

  // Delete old recommendations
  await prisma.recommendation.deleteMany({ where: { profileId: profile.id } });

  // Create new recommendations
  const created = [];
  for (const rec of result.courses) {
    const matchedCourse = courses.find(c =>
      c.title.toLowerCase().includes(rec.title.toLowerCase().split(' ')[0]) ||
      rec.title.toLowerCase().includes(c.title.toLowerCase().split(' ')[0])
    ) || courses[0];

    if (matchedCourse) {
      const recommendation = await prisma.recommendation.create({
        data: {
          profileId: profile.id,
          courseId: matchedCourse.id,
          type: 'COURSE',
          matchPercentage: rec.matchPercentage,
          reason: rec.reason,
          priority: rec.priority,
        },
        include: { course: true },
      });
      created.push(recommendation);
    }
  }

  for (const prog of result.programmes) {
    const matchedProgramme = programmes.find(p =>
      p.title.toLowerCase().includes(prog.title.toLowerCase().split(' ')[0]) ||
      prog.title.toLowerCase().includes(p.title.toLowerCase().split(' ')[0])
    ) || programmes[0];

    if (matchedProgramme) {
      const recommendation = await prisma.recommendation.create({
        data: {
          profileId: profile.id,
          nsstaProgrammeId: matchedProgramme.id,
          type: 'NSSTA',
          reason: prog.reason,
          priority: prog.priority,
        },
        include: { nsstaProgramme: true },
      });
      created.push(recommendation);
    }
  }

  res.json({ success: true, data: created });
};

// Export with correct name
export { generateRecommendationsForUser as generateRecommendations };
