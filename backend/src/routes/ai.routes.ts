import { Router } from 'express';
import * as aiController from '../controllers/ai.controller';
import { authenticate } from '../middleware/auth.middleware';

export const aiRouter = Router();

aiRouter.use(authenticate);
aiRouter.post('/chat', aiController.chat);
aiRouter.post('/explain-gap', aiController.explainGap);
aiRouter.post('/analyze-competency', aiController.analyzeCompetency);
