import Joi from 'joi';
import { emailRegex } from '@/constants';
import { I18Fn, IUser } from '@/interfaces';

export const validateUserData = (translation: I18Fn) =>
  Joi.object<IUser>({
    email: Joi.string()
      .pattern(emailRegex)
      .required()
      .messages({
        'string.pattern.base': translation('auth.invalidEmail'),
        'string.empty': translation('auth.emailIsRequired'),
        'any.required': translation('auth.emailIsRequired')
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': translation('auth.invalidPwd'),
        'string.empty': translation('auth.pwdIsRequired'),
        'any.required': translation('auth.pwdIsRequired')
      })
  });

export const validateRefreshData = (translation: I18Fn) =>
  Joi.object({
    refreshToken: Joi.string()
      .required()
      .messages({
        'string.empty': translation('auth.refreshTokenIsRequired'),
        'any.required': translation('auth.refreshTokenIsRequired')
      })
  });
