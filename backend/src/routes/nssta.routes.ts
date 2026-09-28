import { Router } from 'express';
import * as nsstaProgrammeController from '../controllers/nssta.controller';
import { authenticate } from '../middleware/auth.middleware';

export const nsstaProgrammeRouter = Router();

nsstaProgrammeRouter.use(authenticate);
nsstaProgrammeRouter.get('/', nsstaProgrammeController.getAllProgrammes);
nsstaProgrammeRouter.get('/recommended', nsstaProgrammeController.getRecommendedProgrammes);
nsstaProgrammeRouter.get('/:id', nsstaProgrammeController.getProgrammeById);
