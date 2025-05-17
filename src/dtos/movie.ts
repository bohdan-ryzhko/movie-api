import { IMovieDocument, IMovieDto } from '@/interfaces';
import { translate } from '@/dtos';
import { Languages } from '@/constants';

export const MovieDto = (
  movie: IMovieDocument,
  language: Languages
): IMovieDto => ({
  id: movie._id,
  description: translate(movie.description, language),
  release_date: movie.release_date,
  name: translate(movie.name, language),
  rating: movie.rating,
  userId: movie.userId
});
