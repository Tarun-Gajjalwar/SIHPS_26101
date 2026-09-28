import { Router } from 'express';
import * as questionController from '../controllers/question.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const questionRouter = Router();

questionRouter.use(authenticate);
questionRouter.get('/', questionController.getAllGeneratedQuestions);
questionRouter.get('/:id', questionController.getQuestionById);
questionRouter.put('/:id', authorize('TRAINER', 'ADMIN'), questionController.updateQuestion);
questionRouter.put('/:id/status', authorize('TRAINER', 'ADMIN'), questionController.updateQuestionStatus);
questionRouter.delete('/:id', authorize('TRAINER', 'ADMIN'), questionController.deleteQuestion);
