import { Router } from 'express';
import * as competencyController from '../controllers/competency.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const competencyRouter = Router();

competencyRouter.use(authenticate);
competencyRouter.get('/', competencyController.getAllCompetencies);
competencyRouter.get('/my', competencyController.getMyCompetencies);
competencyRouter.put('/my/:competencyId', competencyController.updateMyCompetency);
competencyRouter.get('/:profileId', competencyController.getProfileCompetencies);
