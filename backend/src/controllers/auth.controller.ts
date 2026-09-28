import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

// Demo fallback users for prototype mode or when database is unreachable
const DEMO_USERS: Record<string, any> = {
  'employee@statintel.demo': {
    id: 'user-emp-001',
    email: 'employee@statintel.demo',
    role: 'EMPLOYEE',
    isActive: true,
    profile: {
      id: 'prof-001',
      firstName: 'Rahul',
      lastName: 'Sharma',
      employeeId: 'MOS2021001',
      designation: 'Statistical Data Analyst',
      experience: 3.2,
      education: 'M.Sc. Statistics, Delhi University',
      department: { name: 'Economic Statistics', code: 'ECON' },
      jobRole: { title: 'Statistical Data Analyst', code: 'SDA', level: 'Junior' }
    }
  },
  'trainer@statintel.demo': {
    id: 'user-trn-002',
    email: 'trainer@statintel.demo',
    role: 'TRAINER',
    isActive: true,
    profile: {
      id: 'prof-002',
      firstName: 'Priya',
      lastName: 'Nair',
      employeeId: 'MOS2018042',
      designation: 'Training & Capacity Building Officer',
      experience: 6.5,
      education: 'Ph.D. Econometrics, ISI Kolkata',
      department: { name: 'Data Analytics Division', code: 'DATA' },
      jobRole: { title: 'Training & Capacity Building Officer', code: 'TRNA', level: 'Mid' }
    }
  },
  'admin@statintel.demo': {
    id: 'user-adm-003',
    email: 'admin@statintel.demo',
    role: 'ADMIN',
    isActive: true,
    profile: {
      id: 'prof-003',
      firstName: 'Dr. Suresh',
      lastName: 'Verma',
      employeeId: 'MOS2010005',
      designation: 'Director / Cadre Administrator',
      experience: 14.0,
      education: 'Ph.D. Statistics, ISS Officer',
      department: { name: 'Data Analytics Division', code: 'DATA' },
      jobRole: { title: 'Data Governance Officer', code: 'DGO', level: 'Senior' }
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Email and password are required' });
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();
  let user: any = null;

  try {
    user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        profile: {
          include: {
            department: true,
            jobRole: true,
          },
        },
      },
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
        return;
      }
    }
  } catch (err: any) {
    console.warn('Database query failed, checking demo accounts:', err?.message);
  }

  // Fallback to demo credentials if database is unreachable or user not found
  if (!user && DEMO_USERS[normalizedEmail]) {
    if (password === 'demo123') {
      user = DEMO_USERS[normalizedEmail];
    }
  }

  if (!user || !user.isActive) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  const secret = process.env.JWT_SECRET || 'fallback-secret';
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
  );

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: userWithoutPassword,
    },
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstName, lastName, role } = req.body;

  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({ success: false, message: 'All fields are required' });
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) {
    res.status(409).json({ success: false, message: 'User already exists' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'EMPLOYEE',
      profile: {
        create: {
          firstName,
          lastName,
        },
      },
    },
    include: { profile: true },
  });

  const { password: _, ...userWithoutPassword } = user;

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: userWithoutPassword,
  });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.json({ success: true, message: 'Logged out successfully' });
};
