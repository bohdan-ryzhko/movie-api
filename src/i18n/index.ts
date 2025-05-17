import path from 'path';
import { I18n } from 'i18n';
import { languages } from '@/constants';

const locales = Object.values(languages);

export const i18n = new I18n({
  locales,
  directory: path.join(__dirname, '../../translation'),
  defaultLocale: locales[0] || 'en',
  objectNotation: true
});
