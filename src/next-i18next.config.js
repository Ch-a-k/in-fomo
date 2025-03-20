module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'kz', 'pl', 'uk'], // Supported languages
    localeDetection: false,
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