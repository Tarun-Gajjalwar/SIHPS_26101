import { Router } from 'express';
import * as learningPathController from '../controllers/learningpath.controller';
import { authenticate } from '../middleware/auth.middleware';

export const learningPathRouter = Router();

learningPathRouter.use(authenticate);
learningPathRouter.get('/my', learningPathController.getMyLearningPath);
learningPathRouter.post('/generate', learningPathController.generateLearningPath);
learningPathRouter.put('/:id/items/:itemId', learningPathController.updateLearningPathItem);
