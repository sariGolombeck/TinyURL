
import { Router } from 'express';
import userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/users', userController.createUser);
userRouter.get('/users', userController.getAllUsers);
userRouter.get('/users/:id', userController.getUserById);
userRouter.patch('/users/:id', userController.updateUserById);
userRouter.delete('/users/:id', userController.deleteUserById);
export default userRouter;