import { Router } from 'express';
import * as courseController from '../controllers/course.controller';
import { authenticate } from '../middleware/auth.middleware';

export const courseRouter = Router();

courseRouter.use(authenticate);
courseRouter.get('/', courseController.getAllCourses);
courseRouter.get('/recommended', courseController.getRecommendedCourses);
courseRouter.get('/igot', courseController.getIgotCourses);
courseRouter.get('/:id', courseController.getCourseById);
