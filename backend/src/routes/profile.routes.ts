import { Router } from 'express';
import * as profileController from '../controllers/profile.controller';
import { authenticate } from '../middleware/auth.middleware';

export const profileRouter = Router();

profileRouter.use(authenticate);
profileRouter.get('/me', profileController.getMyProfile);
profileRouter.put('/me', profileController.updateMyProfile);
profileRouter.get('/:id', profileController.getProfileById);
