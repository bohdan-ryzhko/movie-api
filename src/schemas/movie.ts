import Joi from 'joi';
import { I18Fn, IMovie } from '@/interfaces';
import { getTranslateValidation } from './base';

export const validateCreateMovie = (translation: I18Fn) =>
  Joi.object<Omit<IMovie, '_id'>>({
    name: getTranslateValidation(),
    description: getTranslateValidation(),
    release_date: Joi.date()
      .iso()
      .required()
      .messages({
        'date.base': translation('movies.releaseDateIsInvalid'),
        'any.required': translation('movies.releaseDateIsReq'),
        'date.format': translation('movies.releaseDateIsInvalid')
      }),
    rating: Joi.number()
      .max(5)
      .required()
      .messages({
        'number.base': translation('movies.ratingMustBeANumber'),
        'number.max': translation('movies.ratingMax'),
        'any.required': translation('movies.ratingIsReq')
      })
  });

export const validateUpdateMovie = (translation: I18Fn) =>
  Joi.object<Partial<IMovie>>({
    name: getTranslateValidation(false),
    description: getTranslateValidation(false),
    release_date: Joi.date()
      .iso()
      .messages({
        'date.base': translation('movies.releaseDateIsInvalid'),
        'date.format': translation('movies.releaseDateIsInvalid')
      }),
    rating: Joi.number()
      .max(5)
      .messages({
        'number.base': translation('movies.ratingMustBeANumber'),
        'number.max': translation('movies.ratingMax')
      })
  });
