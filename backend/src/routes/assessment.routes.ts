import { Router } from 'express';
import * as assessmentController from '../controllers/assessment.controller';
import { authenticate } from '../middleware/auth.middleware';

export const assessmentRouter = Router();

assessmentRouter.use(authenticate);
assessmentRouter.get('/active', assessmentController.getActiveAssessment);
assessmentRouter.get('/my-attempts', assessmentController.getMyAttempts);
assessmentRouter.get('/', assessmentController.getAllAssessments);
assessmentRouter.get('/:id', assessmentController.getAssessmentById);
assessmentRouter.post('/:id/start', assessmentController.startAssessment);
assessmentRouter.post('/:id/submit', assessmentController.submitAssessment);
assessmentRouter.get('/:id/result', assessmentController.getAssessmentResult);
assessmentRouter.get('/attempts/my', assessmentController.getMyAttempts);
