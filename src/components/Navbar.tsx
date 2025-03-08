import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation('common');
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  // Languages available
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'kz', name: 'Казахский', flag: '🇰🇿' }
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
    if (!mounted) return '/images/partners/logowhite.avif';
    return resolvedTheme === 'dark' ? '/images/partners/logowhite.avif' : '/images/partners/logo.avif';
  };

  const getRoundedLogo = () => '/images/partners/logorounded.avif';

  const handleLanguageChange = async (langCode: string) => {
    try {
      // Save language preference
      localStorage.setItem('i18nextLng', langCode);
      
      // Change language in i18n
      await i18n.changeLanguage(langCode);

      // Get the current path without the locale prefix
      const path = router.asPath;
      
      // Change route to the new locale
      await router.push(path, path, { locale: langCode });
      
      setIsLangMenuOpen(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
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
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image 
                  src={getRoundedLogo()} 
                  alt="IN-FOMO" 
                  width={40} 
                  height={40} 
                  style={{
                    maxWidth: '100%',
                    width: 'auto',
                    height: 'auto'
                  }}
                  priority={true}
                  fetchPriority="high"
                />
              </div>
              <div className="relative h-8 w-32">
                <Image 
                  src={getLogo()} 
                  alt="IN-FOMO" 
                  width={120} 
                  height={32} 
                  style={{
                    maxWidth: '100%',
                    width: 'auto',
                    height: 'auto'
                  }}
                  priority={true}
                  fetchPriority="high"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-heading font-black transition-transform transform-gpu hover:-translate-y-[1px] ${
                isActive(item.href)
                  ? 'text-primary'
                  : 'text-gray-700 dark:text-gray-200 hover:text-primary'
              }`}
              style={{ willChange: 'transform' }}
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

            {isLangMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[#1a1a1a] ring-1 ring-black ring-opacity-5 focus:outline-none animate-fadeIn"
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
              </div>
            )}
          </div>

          {/* Theme Toggle - Desktop */}
          <div className="hidden md:block relative">
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
          
          {/* Get Started Button - Desktop */}
          <div className="hidden md:block ml-2">
            <Link 
              href="/contact" 
              className="btn btn-primary"
            >
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="md:hidden bg-white dark:bg-[#121212] border-b border-light-border dark:border-dark-border animate-slideDown"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-heading font-black ${
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

                  {isLangMenuOpen && (
                    <div
                      className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[#1a1a1a] ring-1 ring-black ring-opacity-5 focus:outline-none z-10 animate-fadeIn"
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
                    </div>
                  )}
                </div>

                {/* Theme Toggle - Mobile */}
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
            </div>
            
            {/* Get Started Button - Mobile */}
            <div className="px-3 py-3">
              <Link 
                href="/contact" 
                className="btn btn-primary w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('get_started')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;