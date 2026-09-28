import { Router } from 'express';
import * as skillGapController from '../controllers/skillgap.controller';
import { authenticate } from '../middleware/auth.middleware';

export const skillGapRouter = Router();

skillGapRouter.use(authenticate);
skillGapRouter.get('/my', skillGapController.getMySkillGaps);
skillGapRouter.post('/analyze', skillGapController.analyzeSkillGaps);
skillGapRouter.get('/:profileId', skillGapController.getProfileSkillGaps);
