import { Router } from 'express';
import * as recommendationController from '../controllers/recommendation.controller';
import { authenticate } from '../middleware/auth.middleware';

export const recommendationRouter = Router();

recommendationRouter.use(authenticate);
recommendationRouter.get('/my', recommendationController.getMyRecommendations);
recommendationRouter.post('/generate', recommendationController.generateRecommendations);
