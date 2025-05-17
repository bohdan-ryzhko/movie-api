import { Types } from 'mongoose';

import { Translate } from '@/interfaces';
import { Request } from 'express';

export interface IMovie {
  _id: string;
  userId: Types.ObjectId;
  description: Translate;
  release_date: Date;
  name: Translate;
  rating: number;
}

export interface IMovieDto
  extends Omit<IMovie, '_id' | 'description' | 'name'> {
  id: string;
  name: string;
  description: string;
}

export interface IMovieDocument extends IMovie, Document {}

export interface MovieRequest extends Request {
  movie?: IMovieDocument;
}
