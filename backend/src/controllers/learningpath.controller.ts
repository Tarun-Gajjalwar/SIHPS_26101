import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';
import { generateRecommendations } from '../services/ai/ai.service';

export const getMyLearningPath = async (req: AuthRequest, res: Response): Promise<void> => {
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
  });

  if (!profile) {
    res.status(404).json({ success: false, message: 'Profile not found' });
    return;
  }

  const paths = await prisma.learningPath.findMany({
    where: { profileId: profile.id, isActive: true },
    include: {
      items: {
        include: { course: true, competency: true },
        orderBy: { order: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ success: true, data: paths });
};

export const generateLearningPath = async (req: AuthRequest, res: Response): Promise<void> => {
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

  const recResult = await generateRecommendations({
    skillGaps: skillGapInput,
    role: profile.jobRole?.title,
    department: profile.department?.name,
  });

  // Deactivate existing paths
  await prisma.learningPath.updateMany({
    where: { profileId: profile.id },
    data: { isActive: false },
  });

  // Get courses from db to match recommendations
  const courses = await prisma.course.findMany({ take: 20 });

  // Create new learning path
  const pathItems = recResult.courses.map((rec, i) => {
    const matchedCourse = courses.find(c => 
      c.title.toLowerCase().includes(rec.title.toLowerCase().split(' ')[0]) ||
      rec.title.toLowerCase().includes(c.title.toLowerCase().split(' ')[0])
    );

    return {
      title: rec.title,
      courseId: matchedCourse?.id || null,
      order: i + 1,
      status: i === 0 ? 'IN_PROGRESS' as const : 'RECOMMENDED' as const,
      duration: matchedCourse?.duration || '20 hours',
      difficulty: 'MEDIUM' as const,
      skills: matchedCourse?.skills || [],
      description: rec.reason,
    };
  });

  const newPath = await prisma.learningPath.create({
    data: {
      profileId: profile.id,
      title: `${profile.jobRole?.title || 'Statistical Officer'} Development Path`,
      goal: `${profile.jobRole?.title || 'Statistical Officer'} → Advanced ${profile.jobRole?.title || 'Statistical Analyst'}`,
      isActive: true,
      progress: 15,
      items: {
        create: pathItems,
      },
    },
    include: {
      items: {
        include: { course: true },
        orderBy: { order: 'asc' },
      },
    },
  });

  res.json({ success: true, data: newPath });
};

export const updateLearningPathItem = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id, itemId } = req.params;
  const { status } = req.body;

  const item = await prisma.learningPathItem.update({
    where: { id: itemId },
    data: {
      status,
      completedAt: status === 'COMPLETED' ? new Date() : null,
    },
  });

  // Recalculate progress
  const allItems = await prisma.learningPathItem.findMany({
    where: { learningPathId: id },
  });
  const completedCount = allItems.filter(i => i.status === 'COMPLETED').length;
  const progress = allItems.length > 0 ? Math.round((completedCount / allItems.length) * 100) : 0;

  await prisma.learningPath.update({
    where: { id },
    data: { progress },
  });

  res.json({ success: true, data: item });
};
