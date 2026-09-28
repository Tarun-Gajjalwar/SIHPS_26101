import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

export const userRouter = Router();

userRouter.use(authenticate);
userRouter.get('/me', userController.getMe);
userRouter.put('/me', userController.updateMe);
userRouter.get('/', authorize('ADMIN'), userController.getAllUsers);
userRouter.get('/:id', authorize('ADMIN'), userController.getUserById);
userRouter.put('/:id/status', authorize('ADMIN'), userController.updateUserStatus);
