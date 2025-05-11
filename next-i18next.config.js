/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk', 'pl', 'ru'],
    localeDetection: true
  },
  defaultNS: 'common',
  localePath: './public/locales',
  react: { 
    useSuspense: false,
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span']
  },
  interpolation: {
    escapeValue: false
  },
  load: 'languageOnly',
  detection: {
    order: ['path', 'cookie', 'localStorage', 'navigator'],
    caches: ['cookie', 'localStorage']
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  serializeConfig: false,
  debug: process.env.NODE_ENV === 'development'
};
