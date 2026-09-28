import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getMyProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
    include: {
      department: true,
      jobRole: true,
      competencies: {
        include: { competency: true },
        orderBy: { competency: { category: 'asc' } },
      },
      skillGaps: {
        include: { competency: true },
        orderBy: { priority: 'asc' },
      },
      learningPaths: {
        include: {
          items: {
            include: { course: true, competency: true },
            orderBy: { order: 'asc' },
          },
        },
      },
      certificates: true,
      learningHistory: {
        orderBy: { completedAt: 'desc' },
        take: 10,
      },
    },
  });

  if (!profile) {
    res.status(404).json({ success: false, message: 'Profile not found' });
    return;
  }

  // Calculate stats
  const assessmentAttempts = await prisma.assessmentAttempt.findMany({
    where: { userId: req.user!.id, completedAt: { not: null } },
    orderBy: { completedAt: 'desc' },
  });

  const quizAttempts = await prisma.quizAttempt.findMany({
    where: { userId: req.user!.id, completedAt: { not: null } },
    orderBy: { completedAt: 'desc' },
  });

  const completedItems = profile.learningPaths.flatMap(lp =>
    lp.items.filter(item => item.status === 'COMPLETED')
  ).length;

  const stats = {
    totalLearningHours: 42,
    completedCourses: completedItems,
    lastAssessmentScore: assessmentAttempts[0]?.percentage ?? null,
    quizzesTaken: quizAttempts.length,
    avgCompetencyScore: profile.competencies.length > 0
      ? profile.competencies.reduce((acc, c) => acc + c.currentLevel, 0) / profile.competencies.length
      : 0,
    activeSkillGaps: profile.skillGaps.length,
    learningPathProgress: profile.learningPaths[0] ? profile.learningPaths[0].progress : 0,
  };

  res.json({ success: true, data: { ...profile, stats } });
};

export const updateMyProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const {
    firstName, lastName, designation, phone, bio,
    departmentId, jobRoleId, education, experience,
  } = req.body;

  const profile = await prisma.profile.update({
    where: { userId: req.user!.id },
    data: {
      firstName,
      lastName,
      designation,
      phone,
      bio,
      departmentId,
      jobRoleId,
      education,
      experience: experience ? parseFloat(experience) : undefined,
    },
    include: {
      department: true,
      jobRole: true,
    },
  });

  res.json({ success: true, data: profile });
};

export const getProfileById = async (req: AuthRequest, res: Response): Promise<void> => {
  const profile = await prisma.profile.findUnique({
    where: { id: req.params.id },
    include: {
      department: true,
      jobRole: true,
      competencies: { include: { competency: true } },
      skillGaps: { include: { competency: true } },
    },
  });

  if (!profile) {
    res.status(404).json({ success: false, message: 'Profile not found' });
    return;
  }

  res.json({ success: true, data: profile });
};
