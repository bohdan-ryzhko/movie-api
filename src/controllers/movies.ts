import merge from 'lodash.merge';

import { headers, Languages } from '../constants';
import { MovieDto, UserDto } from '../dtos';
import { MovieRequest, UserRequest } from '../interfaces';
import {
  deleteMovieById,
  findMovies,
  makeMovie,
  updateMovieById
} from '../repositories';
import { ctrlWrapper, HttpError } from '../utils';

export const createMovie = ctrlWrapper(async (req: UserRequest, res) => {
  const user = req.user;
  const translation = res.__;
  const language = req.headers[headers.acceptLanguage] as Languages;
  const newMovieData = req.body;

  if (!user) throw HttpError({ status: 401, translation });

  const createdMovie = await makeMovie({ ...newMovieData, userId: user._id });

  await createdMovie.save();

  if (!createdMovie) throw HttpError({ status: 500, translation });

  const movieDto = MovieDto(createdMovie, language);

  res.status(201).json({ data: { movie: movieDto } });
});

export const getMovies = ctrlWrapper(async (req: UserRequest, res) => {
  const user = req.user;
  const translation = res.__;
  const language = req.headers[headers.acceptLanguage] as Languages;

  if (!user) throw HttpError({ status: 401, translation });

  const userDto = UserDto(user);

  const foundMovies = await findMovies(userDto.id);

  if (!foundMovies) throw HttpError({ status: 404, translation });

  const movies = foundMovies.map(movie => MovieDto(movie, language));

  res.status(200).json({ data: { movies } });
});

export const getMovie = ctrlWrapper(async (req: MovieRequest, res) => {
  const movie = req.movie;

  if (!movie) throw HttpError({ status: 404, translation: res.__ });

  res.status(200).json({ data: { movie } });
});

export const updateMovie = ctrlWrapper(async (req: MovieRequest, res) => {
  const movie = req.movie;
  const translation = res.__;
  const updatedMovieData = req.body;
  const language = req.headers[headers.acceptLanguage] as Languages;

  if (!movie) throw HttpError({ status: 404, translation });

  const mergedData = merge(movie, updatedMovieData);

  const updatedMovie = await updateMovieById(movie._id, mergedData);

  if (!updatedMovie) throw HttpError({ status: 500, translation });

  const movieDto = MovieDto(updatedMovie, language);

  res.status(201).json({ data: { movie: movieDto } });
});

export const deleteMovie = ctrlWrapper(async (req: MovieRequest, res) => {
  const movie = req.movie;
  const translation = res.__;

  if (!movie) throw HttpError({ status: 404, translation });

  const deletedMovie = await deleteMovieById(movie._id);

  if (!deletedMovie) throw HttpError({ status: 500, translation });

  res.status(204).json({});
});

export const deleteMoviesByUserId = ctrlWrapper(
  async (req: UserRequest, res, next) => {
    const user = req.user;
    const translation = res.__;

    if (!user) throw HttpError({ status: 401, translation });

    const foundMovies = await findMovies(user._id);

    if (!foundMovies) throw HttpError({ status: 404, translation });

    for (let i = 0; i < foundMovies.length; i += 1) {
      const movie = foundMovies[i];

      const deletedMovie = await deleteMovieById(movie._id);

      if (!deletedMovie) throw HttpError({ status: 500, translation });
    }

    next();
  }
);
