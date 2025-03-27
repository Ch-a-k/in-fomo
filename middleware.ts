import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

// Поддерживаемые языки
const locales = ['en', 'uk', 'pl', 'kz']
const defaultLocale = 'en'

// Сопоставление кодов языков для mapping двухбуквенных кодов языка к нашим локалям
const languageMapping: Record<string, string> = {
  'en': 'en', // английский
  'uk': 'uk', // украинский
  'pl': 'pl', // польский
  'kk': 'kz', // казахский - стандартный код 'kk', но наша локаль 'kz'
  'ru': 'kz', // русский - ближайший к украинскому, если нет казахского
  'be': 'kz', // белорусский - ближайший к украинскому
}

// Расширенный список User-Agent для социальных ботов
const socialBots = [
  'facebookexternalhit',
  'Facebot',
  'Facebook',
  'fb_iab',
  'fbid',
  'XING-contenttabreceiver',
  'LinkedInBot',
  'Twitterbot',
  'Pinterest',
  'Instagram',
  'WhatsApp',
  'Slackbot',
  'TelegramBot',
  'Discordbot',
  'Snapchat',
  'vkShare',
  'W3C_Validator',
  'baiduspider',
  'Yandex',
  'YandexBot',
  'YandexImages',
  'SocialMediaBot',
  'OGbot',
  'ViberURLCrawler'
];

function isBot(userAgent: string): boolean {
  if (!userAgent) return false;
  
  // Проверяем наличие строки "bot" в User-Agent (для generic ботов)
  if (userAgent.toLowerCase().includes('bot')) return true;
  
  // Проверяем наличие известных социальных ботов
  return socialBots.some(bot => userAgent.toLowerCase().includes(bot.toLowerCase()));
}

function getLocale(request: NextRequest): string {
  // 1. Проверяем сохраненную локаль в cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // 2. Получаем заголовки для определения предпочтительного языка
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value
  })

  let languages: string[] = []
  
  // Проверка Accept-Language заголовка
  if (negotiatorHeaders['accept-language']) {
    languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  }
  
  // 3. Ищем соответствие предпочтительного языка пользователя нашим локалям
  try {
    // Пытаемся найти прямое соответствие
    const matchedLocale = matchLocale(languages, locales, defaultLocale)
    return matchedLocale
  } catch (error) {
    // Если прямого соответствия нет, ищем в нашей таблице маппинга
    for (const lang of languages) {
      const shortLang = lang.split('-')[0].toLowerCase()
      if (languageMapping[shortLang]) {
        return languageMapping[shortLang]
      }
    }
    
    // Если совпадений нет, возвращаем английский по умолчанию
    return defaultLocale
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Получаем User-Agent
  const userAgent = request.headers.get('user-agent') || '';
  
  // Проверяем, является ли запрос от бота или краулера
  if (isBot(userAgent)) {
    // Для ботов не делаем никакого перенаправления
    return;
  }
  
  // Пропускаем API роуты и статические файлы
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return
  }

  // Проверяем, есть ли уже локаль в URL
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Если локали нет в URL, добавляем её
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    
    // Сохраняем выбранный язык в cookie
    const response = NextResponse.redirect(newUrl)
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 год
    })
    
    return response
  }
}

export const config = {
  // Matcher игнорирует файлы в public и _next
  matcher: ['/((?!api|_next/static|_next/image|images|favicon-v2.ico|sw.js).*)']
} 