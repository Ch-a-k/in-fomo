/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk', 'pl', 'kz'],
    localeDetection: false
  },
  defaultNS: 'common',
  localePath: './public/locales',
  react: { useSuspense: false },
  interpolation: {
    escapeValue: false
  },
  load: 'languageOnly',
  detection: {
    order: ['path', 'cookie', 'localStorage', 'navigator'],
    caches: ['cookie', 'localStorage']
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development'
};
