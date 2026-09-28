import { Router } from 'express';
import * as analyticsController from '../controllers/analytics.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const analyticsRouter = Router();

analyticsRouter.use(authenticate);
analyticsRouter.get('/dashboard', authorize('ADMIN'), analyticsController.getDashboardStats);
analyticsRouter.get('/departments', authorize('ADMIN'), analyticsController.getDepartmentCompetencies);
analyticsRouter.get('/skill-gaps', authorize('ADMIN'), analyticsController.getSkillGapAnalysis);
analyticsRouter.get('/training', authorize('ADMIN'), analyticsController.getTrainingEffectiveness);
analyticsRouter.get('/emerging-skills', authorize('ADMIN'), analyticsController.getEmergingSkills);
analyticsRouter.get('/competency-matrix', authorize('ADMIN'), analyticsController.getCompetencyMatrix);
