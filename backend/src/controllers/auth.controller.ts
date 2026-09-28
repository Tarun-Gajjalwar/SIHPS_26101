import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Email and password are required' });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: {
      profile: {
        include: {
          department: true,
          jobRole: true,
        },
      },
    },
  });

  if (!user || !user.isActive) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
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
