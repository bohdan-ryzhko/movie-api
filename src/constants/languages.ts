export const languages = {
  en: 'en',
  uk: 'uk'
} as const;

export type Languages = keyof typeof languages;
