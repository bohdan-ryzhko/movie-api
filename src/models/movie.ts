import { IMovieDocument } from '../interfaces';
import { model, Schema } from 'mongoose';

const movieSchema = new Schema<IMovieDocument>({
  description: {
    translate: {
      en: { type: String, required: true },
      uk: { type: String }
    }
  },
  release_date: {
    type: Date,
    required: true
  },
  name: {
    translate: {
      en: { type: String, required: true },
      uk: { type: String }
    }
  },
  rating: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export const Movie = model<IMovieDocument>('Movie', movieSchema);
