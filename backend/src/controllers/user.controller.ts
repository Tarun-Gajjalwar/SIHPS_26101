import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    include: {
      profile: {
        include: {
          department: true,
          jobRole: true,
          competencies: { include: { competency: true } },
          skillGaps: { include: { competency: true } },
          certificates: true,
        },
      },
    },
  });

  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  const { password, ...userWithoutPassword } = user;
  res.json({ success: true, data: userWithoutPassword });
};

export const updateMe = async (req: AuthRequest, res: Response): Promise<void> => {
  const { firstName, lastName, phone, bio } = req.body;

  const profile = await prisma.profile.update({
    where: { userId: req.user!.id },
    data: { firstName, lastName, phone, bio },
  });

  res.json({ success: true, data: profile });
};

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  const users = await prisma.user.findMany({
    include: {
      profile: {
        include: { department: true, jobRole: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const sanitized = users.map(({ password, ...u }) => u);
  res.json({ success: true, data: sanitized });
};

export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
    include: {
      profile: {
        include: {
          department: true,
          jobRole: true,
          competencies: { include: { competency: true } },
        },
      },
    },
  });

  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  const { password, ...userWithoutPassword } = user;
  res.json({ success: true, data: userWithoutPassword });
};

export const updateUserStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  const { isActive } = req.body;
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: { isActive },
    select: { id: true, email: true, role: true, isActive: true },
  });
  res.json({ success: true, data: user });
};
