import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const { t, i18n } = useTranslation('common')
  
  // Проверяем, что мы на клиенте
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Отслеживаем скролл для изменения стиля хедера
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Навигационные элементы с переводами (убрали blog)
  const navItems = [
    { name: 'home', href: '/' },
    { name: 'services', href: '/services' },
    { name: 'portfolio', href: '/portfolio' },
    { name: 'about', href: '/about' },
    { name: 'contact', href: '/contact' }
  ]

  // Доступные языки
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'uk', name: 'Українська' }
  ]

  // Переключение языка
  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale })
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">IN-FOMO</span>
          </Link>

          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  router.pathname === item.href 
                    ? 'text-orange-500' 
                    : isScrolled
                      ? 'text-gray-800 dark:text-white'
                      : 'text-white'
                }`}
              >
                {t(item.name)}
              </Link>
            ))}
          </nav>

          {/* Правая часть с переключателями */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Переключатель языка */}
            <div className="relative group">
              <button 
                className={`flex items-center space-x-1 text-sm font-medium ${
                  isScrolled 
                    ? 'text-gray-800 dark:text-white' 
                    : 'text-white'
                }`}
              >
                <span>{t(`language_code`, 'EN')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Выпадающее меню языков */}
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        router.locale === lang.code
                          ? 'text-orange-500 bg-orange-50 dark:bg-gray-700'
                          : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Переключатель темы */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={t('toggle_theme')}
              className={`p-1 rounded-full ${
                isScrolled 
                  ? 'text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {mounted && (
                theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )
              )}
            </button>
            
            {/* Кнопка контакта */}
            <Link 
              href="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {t('get_in_touch')}
            </Link>
          </div>

          {/* Мобильная кнопка меню */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Переключатель темы (мобильный) */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={t('toggle_theme')}
              className={`p-1 rounded-full ${
                isScrolled 
                  ? 'text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {mounted && (
                theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )
              )}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`p-1 rounded-md ${
                isScrolled 
                  ? 'text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700' 
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label={t('open_menu')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          x: isMenuOpen ? 0 : '100%'
        }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-white dark:bg-gray-900 z-50 md:hidden ${isMenuOpen ? 'block' : 'pointer-events-none'}`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="text-2xl font-bold text-orange-500" onClick={() => setIsMenuOpen(false)}>
              IN-FOMO
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={t('close_menu')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className={`block py-2 text-lg ${
                      router.pathname === item.href 
                        ? 'text-orange-500 font-medium' 
                        : 'text-gray-800 dark:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-6">
            {/* Переключатель языка */}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('select_language')}</p>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code)
                      setIsMenuOpen(false)
                    }}
                    className={`py-2 px-3 text-sm rounded-md ${
                      router.locale === lang.code 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Переключатель темы */}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('appearance')}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center px-3 py-1 text-sm rounded-md ${
                    theme === 'light' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>{t('light')}</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center px-3 py-1 text-sm rounded-md ${
                    theme === 'dark' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span>{t('dark')}</span>
                </button>
              </div>
            </div>

            {/* Кнопка контакта */}
            <Link 
              href="/contact"
              className="block w-full py-2 text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('get_in_touch')}
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  )
}