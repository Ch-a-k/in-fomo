/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true
  },
  i18n: {
    locales: ['en', 'uk', 'pl', 'ru'],
    defaultLocale: 'en',
    localeDetection: true
  }
}

module.exports = nextConfig
