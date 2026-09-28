import { Router } from 'express';
import * as notificationController from '../controllers/notification.controller';
import { authenticate } from '../middleware/auth.middleware';

export const notificationRouter = Router();

notificationRouter.use(authenticate);
notificationRouter.get('/', notificationController.getMyNotifications);
notificationRouter.put('/:id/read', notificationController.markAsRead);
notificationRouter.put('/read-all', notificationController.markAllAsRead);
