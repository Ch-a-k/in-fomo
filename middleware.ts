import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'uk', 'pl', 'kz']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  // Проверяем сохраненную локаль в cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Проверяем локаль в localStorage
  if (typeof window !== 'undefined') {
    const localStorageLocale = localStorage.getItem('i18nextLng')
    if (localStorageLocale && locales.includes(localStorageLocale)) {
      return localStorageLocale
    }
  }

  // Получаем заголовки для определения предпочтительного языка
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Используем negotiator для определения предпочтительного языка
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const locale = matchLocale(languages, locales, defaultLocale)
  
  return locale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

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
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|sw.js).*)']
} 