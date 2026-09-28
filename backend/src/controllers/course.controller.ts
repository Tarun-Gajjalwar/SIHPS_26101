import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAllCourses = async (req: AuthRequest, res: Response): Promise<void> => {
  const courses = await prisma.course.findMany({ orderBy: { title: 'asc' } });
  res.json({ success: true, data: courses });
};

export const getIgotCourses = async (req: AuthRequest, res: Response): Promise<void> => {
  const courses = await prisma.course.findMany({
    where: { isIgot: true },
    orderBy: { title: 'asc' },
  });

  // Add match percentages based on profile
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
    include: {
      skillGaps: { include: { competency: true } },
      recommendations: { include: { course: true } },
    },
  });

  const coursesWithMatch = courses.map(course => {
    const recommendation = profile?.recommendations.find(r => r.courseId === course.id);
    const gap = profile?.skillGaps.find(sg =>
      course.skills.some(s => sg.competency.name.toLowerCase().includes(s.toLowerCase()) ||
        s.toLowerCase().includes(sg.competency.name.toLowerCase()))
    );

    return {
      ...course,
      matchPercentage: recommendation?.matchPercentage || (gap ? 85 + Math.random() * 10 : 60 + Math.random() * 20),
      isRecommended: !!recommendation || !!gap,
      recommendationReason: recommendation?.reason || (gap ? `Addresses your ${gap.competency.name} competency gap` : null),
    };
  });

  res.json({ success: true, data: coursesWithMatch });
};

export const getRecommendedCourses = async (req: AuthRequest, res: Response): Promise<void> => {
  const profile = await prisma.profile.findUnique({
    where: { userId: req.user!.id },
    include: {
      recommendations: {
        where: { type: 'COURSE' },
        include: { course: true },
        orderBy: { priority: 'asc' },
      },
    },
  });

  if (!profile) {
    res.status(404).json({ success: false, message: 'Profile not found' });
    return;
  }

  res.json({ success: true, data: profile.recommendations });
};

export const getCourseById = async (req: AuthRequest, res: Response): Promise<void> => {
  const course = await prisma.course.findUnique({ where: { id: req.params.id } });
  if (!course) {
    res.status(404).json({ success: false, message: 'Course not found' });
    return;
  }
  res.json({ success: true, data: course });
};
