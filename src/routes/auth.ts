import express from 'express';
import { routes } from '../constants';
import { validateBody, authenticate } from '../middlewares';
import { validateRefreshData, validateUserData } from '../schemas';
import {
  checkUserEmailInUse,
  userLogin,
  userLogout,
  userRefresh,
  userRegistration
} from '../controllers';

export const authRouter = express.Router();

authRouter
  .route(routes.auth.registration)
  .post(validateBody(validateUserData), checkUserEmailInUse, userRegistration);

authRouter
  .route(routes.auth.login)
  .post(validateBody(validateUserData), userLogin);

authRouter
  .route(routes.auth.refresh)
  .post(validateBody(validateRefreshData), userRefresh);

authRouter.route(routes.auth.logout).put(authenticate, userLogout);
