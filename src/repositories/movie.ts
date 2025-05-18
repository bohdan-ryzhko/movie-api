import { IMovie } from '../interfaces';
import { Movie } from '../models';

export const findMovies = (userId: string) => Movie.find({ userId });

export const findMovieById = (id: string) => Movie.findById(id);

export const makeMovie = (movie: IMovie) => Movie.create(movie);

export const updateMovieById = (id: string, movie: IMovie) =>
  Movie.findByIdAndUpdate(id, { $set: movie }, { new: true });

export const deleteMovieById = (id: string) => Movie.findByIdAndDelete(id);

export const deleteManyMoviesByUserId = (userId: string) =>
  Movie.deleteMany({ userId });
