import Joi from 'joi';
import { Translate } from '../interfaces';

export const getTranslateValidation = (required = true) => {
  const translate = Joi.object<Translate['translate']>({
    uk: Joi.string(),
    en: Joi.string()
  });

  return Joi.object<Translate>({
    translate
  })[required ? 'required' : 'optional']();
};
