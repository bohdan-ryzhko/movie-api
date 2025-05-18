import express from 'express';
import { routes } from '../constants';
import { authenticate, checkMovieId, validateBody } from '../middlewares';
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie
} from '../controllers';
import { validateCreateMovie, validateUpdateMovie } from '../schemas';

export const moviesRouter = express.Router();

moviesRouter
  .route(routes.base)
  .post(authenticate, validateBody(validateCreateMovie), createMovie);

moviesRouter.route(routes.base).get(authenticate, getMovies);

moviesRouter.route(routes.id).get(authenticate, checkMovieId, getMovie);

moviesRouter
  .route(routes.id)
  .put(
    authenticate,
    checkMovieId,
    validateBody(validateUpdateMovie),
    updateMovie
  );

moviesRouter.route(routes.id).delete(authenticate, checkMovieId, deleteMovie);
