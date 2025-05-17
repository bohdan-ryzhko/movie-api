import { errorMessages } from '@/constants';
import { CustomError, HttpStatus, I18Fn } from '@/interfaces';

type HttpErrorParams = {
  status: HttpStatus;
  translation?: I18Fn;
  message?: string;
};

export const HttpError = ({
  status,
  translation,
  message = translation
    ? translation(`errors.${status}`)
    : errorMessages[status]
}: HttpErrorParams) => {
  const error: CustomError = new Error(message);
  error.status = status;
  return error;
};
