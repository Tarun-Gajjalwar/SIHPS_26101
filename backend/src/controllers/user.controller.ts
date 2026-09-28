import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

const DEMO_PROFILES: Record<string, any> = {
  'user-emp-001': {
    id: 'user-emp-001',
    email: 'employee@statintel.demo',
    role: 'EMPLOYEE',
    profile: {
      id: 'prof-001',
      firstName: 'Rahul',
      lastName: 'Sharma',
      employeeId: 'MOS2021001',
      designation: 'Statistical Data Analyst',
      experience: 3.2,
      education: 'M.Sc. Statistics, Delhi University',
      department: { name: 'Economic Statistics', code: 'ECON' },
      jobRole: { title: 'Statistical Data Analyst', code: 'SDA', level: 'Junior' },
      competencies: [],
      skillGaps: [],
      certificates: []
    }
  },
  'user-trn-002': {
    id: 'user-trn-002',
    email: 'trainer@statintel.demo',
    role: 'TRAINER',
    profile: {
      id: 'prof-002',
      firstName: 'Priya',
      lastName: 'Nair',
      employeeId: 'MOS2018042',
      designation: 'Training & Capacity Building Officer',
      experience: 6.5,
      education: 'Ph.D. Econometrics, ISI Kolkata',
      department: { name: 'Data Analytics Division', code: 'DATA' },
      jobRole: { title: 'Training & Capacity Building Officer', code: 'TRNA', level: 'Mid' },
      competencies: [],
      skillGaps: [],
      certificates: []
    }
  },
  'user-adm-003': {
    id: 'user-adm-003',
    email: 'admin@statintel.demo',
    role: 'ADMIN',
    profile: {
      id: 'prof-003',
      firstName: 'Dr. Suresh',
      lastName: 'Verma',
      employeeId: 'MOS2010005',
      designation: 'Director / Cadre Administrator',
      experience: 14.0,
      education: 'Ph.D. Statistics, ISS Officer',
      department: { name: 'Data Analytics Division', code: 'DATA' },
      jobRole: { title: 'Data Governance Officer', code: 'DGO', level: 'Senior' },
      competencies: [],
      skillGaps: [],
      certificates: []
    }
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  let user: any = null;
  try {
    user = await prisma.user.findUnique({
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
  } catch {
    user = DEMO_PROFILES[req.user!.id] || Object.values(DEMO_PROFILES).find((p: any) => p.email === req.user?.email);
  }

  if (!user) {
    user = DEMO_PROFILES['user-emp-001'];
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
