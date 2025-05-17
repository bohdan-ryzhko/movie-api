import { Languages } from '@/constants';
import { Translate } from '@/interfaces';

export const translate = (value: Translate, language: Languages) => {
  return value.translate[language] || value.translate.en;
};
