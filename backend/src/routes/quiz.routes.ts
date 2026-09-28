import { Router } from 'express';
import * as quizController from '../controllers/quiz.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const quizRouter = Router();

quizRouter.use(authenticate);
quizRouter.get('/', quizController.getAllQuizzes);
quizRouter.post('/', authorize('TRAINER', 'ADMIN'), quizController.createQuiz);
quizRouter.get('/:id', quizController.getQuizById);
quizRouter.put('/:id', authorize('TRAINER', 'ADMIN'), quizController.updateQuiz);
quizRouter.post('/:id/publish', authorize('TRAINER', 'ADMIN'), quizController.publishQuiz);
quizRouter.post('/:id/attempt', quizController.startQuizAttempt);
quizRouter.post('/:id/submit', quizController.submitQuizAttempt);
quizRouter.get('/:id/result', quizController.getQuizResult);
quizRouter.get('/:id/attempts', quizController.getQuizAttempts);
