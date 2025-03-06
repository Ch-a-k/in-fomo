import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation('common');
  const { theme, setTheme } = useTheme();

  // Languages available
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.lang-menu') && isLangMenuOpen) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLangMenu = () => setIsLangMenuOpen(!isLangMenuOpen);

  const getCurrentLanguage = () => {
    const currentLang = languages.find(lang => lang.code === i18n.language);
    return currentLang || languages[0];
  };

  const isActive = (href: string) => {
    // Простая проверка активности ссылки
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (href === '/') {
        return path === '/' || path === `/${i18n.language}`;
      }
      return path.startsWith(href) || path.startsWith(`/${i18n.language}${href}`);
    }
    return false;
  };

  const getLogo = () => {
    if (!mounted) return '/images/partners/logo.png';
    return theme === 'dark' ? '/images/partners/logowhite.png' : '/images/partners/logo.png';
  };

  const getRoundedLogo = () => '/images/partners/logorounded.png';

  const handleLanguageChange = (langCode: string) => {
    if (typeof window !== 'undefined') {
      // Сохраняем выбранный язык в localStorage
      localStorage.setItem('i18nextLng', langCode);
      
      // Изменяем язык через i18n
      i18n.changeLanguage(langCode);
      
      // Перенаправляем на ту же страницу с новым языком
      const currentPath = window.location.pathname;
      const pathWithoutLang = currentPath.replace(/^\/(en|uk|pl|kz)/, '');
      window.location.href = `/${langCode}${pathWithoutLang || '/'}`;
    }
    setIsLangMenuOpen(false);
  };

  if (!mounted) return null;

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#121212] border-b border-light-border dark:border-dark-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src={getLogo()} alt="IN-FOMO" width={120} height={40} className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Language Selector - Desktop */}
            <div className="hidden md:block relative lang-menu">
              <button
                onClick={toggleLangMenu}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                aria-label={t('select_language')}
              >
                <span className="text-lg">{getCurrentLanguage().flag}</span>
                <span className="text-sm font-medium">{getCurrentLanguage().name}</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[#1a1a1a] ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`flex items-center space-x-3 w-full text-left px-4 py-2 text-sm hover:bg-light-surface dark:hover:bg-dark-surface transition-colors ${
                            i18n.language === lang.code ? 'text-primary font-medium bg-primary/5' : ''
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                          {i18n.language === lang.code && (
                            <svg className="h-4 w-4 ml-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle - Desktop */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                aria-label={t('toggle_theme')}
              >
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Get Started Button - Desktop */}
            <div className="hidden md:block">
              <Link 
                href="/contact" 
                className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t('get_started')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border transition-colors"
              aria-label={isMenuOpen ? t('close_menu') : t('open_menu')}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-[#121212] border-b border-light-border dark:border-dark-border"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {/* Get Started Button - Mobile */}
              <Link 
                href="/contact" 
                className="flex items-center justify-center w-full px-4 py-3 mb-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t('get_started')}
              </Link>
              
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-light-surface dark:hover:bg-dark-surface'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 pb-3 border-t border-light-border dark:border-dark-border">
                <div className="flex items-center justify-between px-3">
                  {/* Language Selector - Mobile */}
                  <div className="relative lang-menu">
                    <button
                      onClick={toggleLangMenu}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                      aria-label={t('select_language')}
                    >
                      <span className="text-lg">{getCurrentLanguage().flag}</span>
                      <span className="text-sm font-medium">{getCurrentLanguage().name}</span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {isLangMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[#1a1a1a] ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                        >
                          <div className="py-1">
                            {languages.map((lang) => (
                              <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`flex items-center space-x-3 w-full text-left px-4 py-2 text-sm hover:bg-light-surface dark:hover:bg-dark-surface transition-colors ${
                                  i18n.language === lang.code ? 'text-primary font-medium bg-primary/5' : ''
                                }`}
                              >
                                <span className="text-lg">{lang.flag}</span>
                                <span>{lang.name}</span>
                                {i18n.language === lang.code && (
                                  <svg className="h-4 w-4 ml-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Theme Toggle - Mobile */}
                  <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="p-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                    aria-label={t('toggle_theme')}
                  >
                    {theme === 'light' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;