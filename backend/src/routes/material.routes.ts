import { Router } from 'express';
import * as materialController from '../controllers/material.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.docx', '.pptx', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

export const materialRouter = Router();

materialRouter.use(authenticate);
materialRouter.get('/', materialController.getAllMaterials);
materialRouter.post('/upload', authorize('TRAINER', 'ADMIN'), upload.single('file') as any, materialController.uploadMaterial as any);
materialRouter.get('/:id', materialController.getMaterialById);
materialRouter.post('/:id/generate-questions', authorize('TRAINER', 'ADMIN'), materialController.generateQuestions);
