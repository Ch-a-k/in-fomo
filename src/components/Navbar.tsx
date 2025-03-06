'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');
  // Languages available
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  ];

  // After mounting, we can show the theme toggle (to avoid hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Закрываем меню языков при клике вне его
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

  // Получаем базовый путь без языкового префикса
  const getPathWithoutLocale = (path: string) => {
    const localePattern = new RegExp(`^/(${languages.map(l => l.code).join('|')})(/|$)`);
    return path.replace(localePattern, '/');
  };

  // Получаем текущий язык
  const getCurrentLanguage = () => {
    const currentLang = languages.find(lang => lang.code === router.locale);
    return currentLang || languages[0];
  };

  // Check if the current path matches the given href
  const isActive = (href: string) => {
    const path = router.asPath;
    if (href === '/') {
      return path === '/' || path === `/${router.locale}`;
    }
    return path.startsWith(href) || path.startsWith(`/${router.locale}${href}`);
  };

  // Get logo based on theme
  const getLogo = () => {
    if (!mounted) return '/images/partners/logo.png';
    return resolvedTheme === 'dark' ? '/images/partners/logowhite.png' : '/images/partners/logo.png';
  };

  const getRoundedLogo = () => '/images/partners/logorounded.png';

  return (
    <nav className="relative bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              {mounted && (
                <Image 
                  src={getRoundedLogo()} 
                  alt="IN-FOMO" 
                  width={40} 
                  height={40} 
                  className="rounded-full"
                  priority
                />
              )}
            </div>
            <div className="w-auto h-[32px]">
              {mounted && (
                <Image 
                  src={getLogo()} 
                  alt="IN-FOMO" 
                  width={100} 
                  height={32} 
                  className="w-auto h-auto"
                  priority
                />
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {mounted && (
              <>
                <Link 
                  href="/" 
                  className={`font-medium transition-colors ${isActive('/') ? 'text-primary' : 'hover:text-primary'}`}
                >
                  {t('home')}
                </Link>
                <Link 
                  href="/portfolio" 
                  className={`font-medium transition-colors ${isActive('/portfolio') ? 'text-primary' : 'hover:text-primary'}`}
                >
                  {t('portfolio')}
                </Link>
                <Link 
                  href="/about" 
                  className={`font-medium transition-colors ${isActive('/about') ? 'text-primary' : 'hover:text-primary'}`}
                >
                  {t('about')}
                </Link>
                <Link 
                  href="/contact" 
                  className={`font-medium transition-colors ${isActive('/contact') ? 'text-primary' : 'hover:text-primary'}`}
                >
                  {t('contact')}
                </Link>
              </>
            )}
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            {mounted && (
              <div className="relative lang-menu">
                <button 
                  onClick={toggleLangMenu}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                  aria-expanded={isLangMenuOpen}
                  aria-label={t('select_language')}
                >
                  <span className="text-lg mr-1">{getCurrentLanguage().flag}</span>
                  <span>{getCurrentLanguage().name}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
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
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border z-50"
                    >
                      <div className="py-1">
                        {languages.map((lang) => (
                          <Link
                            key={lang.code}
                            href={getPathWithoutLocale(router.asPath)}
                            locale={lang.code}
                            className={`flex items-center space-x-3 w-full text-left px-4 py-2 text-sm hover:bg-light-surface dark:hover:bg-dark-surface transition-colors ${
                              router.locale === lang.code ? 'text-primary font-medium bg-primary/5' : ''
                            }`}
                            onClick={() => setIsLangMenuOpen(false)}
                          >
                            <span className="text-lg">{lang.flag}</span>
                            <span>{lang.name}</span>
                            {router.locale === lang.code && (
                              <svg className="h-4 w-4 ml-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Theme Toggle */}
            {mounted && (
              <div className="relative">
                <button
                  onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
                  className="p-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                  aria-label={t('toggle_theme')}
                >
                  {resolvedTheme === 'light' ? (
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
            )}
            
            {/* Contact Button */}
            {mounted && (
              <Link 
                href="/contact" 
                className={`btn ${isActive('/contact') ? 'btn-primary-dark' : 'btn-primary'}`}
              >
                {t('get_in_touch')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Language Selector - Mobile */}
            <div className="relative lang-menu">
              <button 
                onClick={toggleLangMenu}
                className="flex items-center p-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                aria-expanded={isLangMenuOpen}
                aria-label={t('select_language')}
              >
                <span className="text-lg">{getCurrentLanguage().flag}</span>
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border z-50"
                  >
                    <div className="py-1">
                      {languages.map((lang) => (
                        <Link
                          key={lang.code}
                          href={getPathWithoutLocale(router.asPath)}
                          locale={lang.code}
                          className={`flex items-center space-x-3 w-full text-left px-4 py-2 text-sm hover:bg-light-surface dark:hover:bg-dark-surface transition-colors ${
                            router.locale === lang.code ? 'text-primary font-medium bg-primary/5' : ''
                          }`}
                          onClick={() => {
                            setIsLangMenuOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                          {router.locale === lang.code && (
                            <svg className="h-4 w-4 ml-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Theme Toggle - Mobile */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                aria-label={t('toggle_theme')}
              >
                {resolvedTheme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            )}
            
            {/* Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border transition-colors"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t('close_menu') : t('open_menu')}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-4 pb-4">
              <Link
                href="/"
                className={`font-medium transition-colors ${
                  isActive('/') ? 'text-primary' : 'hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                href="/portfolio"
                className={`font-medium transition-colors ${
                  isActive('/portfolio') ? 'text-primary' : 'hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('portfolio')}
              </Link>
              <Link
                href="/about"
                className={`font-medium transition-colors ${
                  isActive('/about') ? 'text-primary' : 'hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about')}
              </Link>
              <Link
                href="/contact"
                className={`font-medium transition-colors ${
                  isActive('/contact') ? 'text-primary' : 'hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>
              <Link
                href="/contact"
                className={`btn ${isActive('/contact') ? 'btn-primary-dark' : 'btn-primary'} w-full text-center`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('get_in_touch')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;