import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils';
import { Schema } from 'joi';
import { I18Fn } from '../interfaces';

export const validateBody =
  (schema: (translation: I18Fn) => Schema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const translation = res.__;

    const { error } = schema(translation).validate(req.body);

    if (error !== undefined)
      next(HttpError({ status: 400, message: error.message }));

    next();
  };
