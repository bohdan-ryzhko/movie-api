import { NextFunction, Request, Response } from 'express';

import { headers, languages } from '../constants';

export const setDefaultLanguage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers[headers.acceptLanguage]) {
    req.headers[headers.acceptLanguage] = languages.en;
  }

  next();
};
