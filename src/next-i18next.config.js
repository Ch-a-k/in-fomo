module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'pl', 'uk'], // Supported languages
    localeDetection: true,
  },
  defaultNS: 'common',
  localePath: './public/locales', // Path to translations
  react: { useSuspense: false },
  load: 'languageOnly',
  detection: {
    order: ['path', 'cookie', 'localStorage', 'navigator'],
    caches: ['cookie', 'localStorage']
  }
};