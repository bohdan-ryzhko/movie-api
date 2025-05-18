import { MovieRequest } from '../interfaces';
import { findMovieById } from '../repositories';
import { HttpError } from '../utils';
import { NextFunction, Response } from 'express';

export const checkMovieId = async (
  req: MovieRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const translation = res.__;

    if (!id)
      throw HttpError({
        status: 400,
        message: translation('movies.movieIdIsRequired')
      });

    const foundMovie = await findMovieById(id);

    if (!foundMovie) throw HttpError({ status: 404, translation });

    req.movie = foundMovie;
    next();
  } catch (error) {
    next(HttpError({ status: 500, translation: res.__ }));
  }
};
