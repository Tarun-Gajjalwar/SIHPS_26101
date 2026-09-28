import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';
import { generateMCQs } from '../services/ai/ai.service';
import fs from 'fs';

export const getAllMaterials = async (req: AuthRequest, res: Response): Promise<void> => {
  const where = req.user!.role === 'TRAINER' || req.user!.role === 'ADMIN'
    ? { uploadedById: req.user!.id }
    : {};

  const materials = await prisma.material.findMany({
    where,
    include: {
      uploadedBy: {
        include: { profile: true },
      },
      _count: { select: { generatedQuestions: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ success: true, data: materials });
};

export const uploadMaterial = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded' });
    return;
  }

  const { title } = req.body;

  const material = await prisma.material.create({
    data: {
      uploadedById: req.user!.id,
      title: title || req.file.originalname,
      filename: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: req.file.path,
      status: 'PROCESSING',
    },
  });

  // Simulate async processing
  setTimeout(async () => {
    try {
      // Read file content (for TXT files, else use mock content)
      let content = '';
      if (req.file!.mimetype === 'text/plain') {
        content = fs.readFileSync(req.file!.path, 'utf-8');
      } else {
        content = `Educational material about ${title || req.file!.originalname}. Topics include statistical methods, data analysis, survey design, sampling techniques, and data visualization.`;
      }

      const result = await generateMCQs({
        content,
        count: 15,
        domain: title,
      });

      // Save generated questions
      for (const q of result.questions) {
        const competency = await prisma.competency.findFirst({
          where: { name: { contains: q.domain, mode: 'insensitive' } },
        });

        await prisma.generatedQuestion.create({
          data: {
            materialId: material.id,
            uploadedById: req.user!.id,
            text: q.text,
            optionA: q.optionA,
            optionB: q.optionB,
            optionC: q.optionC,
            optionD: q.optionD,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            difficulty: q.difficulty,
            domain: q.domain,
            competencyId: competency?.id || null,
            aiConfidence: q.aiConfidence,
            status: 'AI_GENERATED',
          },
        });
      }

      // Update material status
      await prisma.material.update({
        where: { id: material.id },
        data: {
          status: 'READY',
          topics: result.topicsDetected,
          processedAt: new Date(),
        },
      });

      // Create notification
      await prisma.notification.create({
        data: {
          userId: req.user!.id,
          title: 'MCQs Generated Successfully',
          message: `${result.questions.length} questions generated from "${material.title}". Please review them in the Question Bank.`,
          type: 'success',
        },
      });
    } catch (error) {
      await prisma.material.update({
        where: { id: material.id },
        data: { status: 'FAILED' },
      });
    }
  }, 3000); // 3 second simulated processing

  res.status(201).json({
    success: true,
    message: 'File uploaded successfully. AI is generating questions...',
    data: material,
  });
};

export const getMaterialById = async (req: AuthRequest, res: Response): Promise<void> => {
  const material = await prisma.material.findUnique({
    where: { id: req.params.id },
    include: {
      uploadedBy: { include: { profile: true } },
      generatedQuestions: {
        include: { competency: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!material) {
    res.status(404).json({ success: false, message: 'Material not found' });
    return;
  }

  res.json({ success: true, data: material });
};

export const generateQuestions = async (req: AuthRequest, res: Response): Promise<void> => {
  const { count = 10 } = req.body;

  const material = await prisma.material.findUnique({ where: { id: req.params.id } });
  if (!material) {
    res.status(404).json({ success: false, message: 'Material not found' });
    return;
  }

  const result = await generateMCQs({
    content: `Educational material: ${material.title}`,
    count: parseInt(String(count)),
  });

  const created = await Promise.all(result.questions.map(async q => {
    const competency = await prisma.competency.findFirst({
      where: { name: { contains: q.domain, mode: 'insensitive' } },
    });

    return prisma.generatedQuestion.create({
      data: {
        materialId: material.id,
        uploadedById: req.user!.id,
        text: q.text,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty,
        domain: q.domain,
        competencyId: competency?.id || null,
        aiConfidence: q.aiConfidence,
        status: 'AI_GENERATED',
      },
    });
  }));

  res.json({ success: true, data: { questions: created, count: created.length } });
};
