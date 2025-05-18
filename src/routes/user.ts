import express from 'express';
import { routes } from '../constants';
import { authenticate } from '../middlewares';
import { deleteUser, getUserInfo } from '../controllers';

export const userRouter = express.Router();

userRouter.route(routes.base).get(authenticate, getUserInfo);

userRouter.route(routes.base).delete(authenticate, deleteUser);
