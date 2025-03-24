import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// Типы
interface Language {
  code: string;
  name: string;
  flag: string;
}

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

// Компонент для отдельного пункта навигации
const NavItem = ({ href, label, isActive }: NavItemProps) => (
  <Link
    href={href}
    className={`text-sm font-heading font-black transition-transform transform-gpu hover:-translate-y-[2px] ${
      isActive
        ? 'text-primary'
        : 'text-gray-700 dark:text-gray-200 hover:text-primary'
    }`}
  >
    {label}
  </Link>
);

// Компонент для логотипа
const Logo = ({ roundedLogo, logo }: { roundedLogo: string; logo: string }) => (
  <Link href="/" className="flex items-center">
    <div className="flex items-center space-x-2 md:space-x-3">
      <div className="relative w-7 h-7 md:w-10 md:h-10">
        <Image 
          src={roundedLogo} 
          alt="IN-FOMO"
          width={40}
          height={40}
          className="w-full h-full object-contain"
          priority={true}
          loading="eager"
          quality={90}
          sizes="(max-width: 768px) 28px, 40px"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,..."
        />
      </div>
      <div className="relative h-5 w-20 md:h-8 md:w-32">
        <Image 
          src={logo} 
          alt="IN-FOMO"
          width={128}
          height={32}
          className="w-full h-full object-contain"
          priority={true}
          loading="eager"
          quality={90}
          sizes="(max-width: 768px) 80px, 128px"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,..."
        />
      </div>
    </div>
  </Link>
);

// Компонент переключателя темы
const ThemeToggle = ({ theme, toggleTheme }: { theme: string | undefined, toggleTheme: () => void }) => (
  <button
    onClick={toggleTheme}
    className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary dark:hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {theme === 'dark' ? (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
      </svg>
    ) : (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
      </svg>
    )}
  </button>
);

// Компонент для выбора языка
const LanguageSelector = ({ 
  languages, 
  currentLanguage, 
  isLangMenuOpen, 
  toggleLangMenu, 
  handleLanguageChange 
}: { 
  languages: Language[],
  currentLanguage: Language,
  isLangMenuOpen: boolean,
  toggleLangMenu: () => void,
  handleLanguageChange: (code: string) => Promise<void>
}) => (
  <div className="relative lang-menu">
    <button
      onClick={toggleLangMenu}
      className="flex items-center space-x-1 p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-primary dark:hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      aria-expanded={isLangMenuOpen}
      aria-haspopup="true"
    >
      <span className="text-lg">{currentLanguage.flag}</span>
      <span className="hidden md:inline text-sm">{currentLanguage.code.toUpperCase()}</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    {isLangMenuOpen && (
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[#12121290] ring-1 ring-black ring-opacity-5 z-50">
        <div className="py-1" role="menu" aria-orientation="vertical">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary dark:hover:bg-primary/80 flex items-center space-x-2"
              role="menuitem"
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Компонент мобильного меню
const MobileMenu = ({ 
  isMenuOpen, 
  navItems, 
  isActive,
  languages,
  currentLanguage,
  handleLanguageChange,
  theme,
  toggleTheme
}: { 
  isMenuOpen: boolean, 
  navItems: Array<{ href: string, label: string }>,
  isActive: (href: string) => boolean,
  languages: Language[],
  currentLanguage: Language,
  handleLanguageChange: (code: string) => Promise<void>,
  theme: string | undefined,
  toggleTheme: () => void
}) => {
  if (!isMenuOpen) return null;
  
  return (
    <div className="absolute top-16 md:top-20 left-0 right-0 bg-white dark:bg-[#121212] border-b border-light-border dark:border-dark-border px-4 py-4 shadow-lg z-50">
      <nav className="flex flex-col space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-heading font-black ${
              isActive(item.href)
                ? 'text-primary'
                : 'text-gray-700 dark:text-gray-200'
            }`}
            onClick={() => {}}
          >
            {item.label}
          </Link>
        ))}
        
        <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Theme
            </div>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </div>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                  lang.code === currentLanguage.code
                    ? 'bg-gray-100 dark:bg-gray-800 text-primary'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

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
  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

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
    if (!mounted) return '/images/partners/logo.avif';
    return resolvedTheme === 'dark' 
      ? '/images/partners/logowhite.avif' 
      : '/images/partners/logo.avif';
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

  const currentLanguage = getCurrentLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#121212] border-b border-light-border dark:border-dark-border">
      <div className="container mx-auto px-4 flex justify-between items-center h-16 md:h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo roundedLogo={getRoundedLogo()} logo={getLogo()} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavItem 
              key={item.href} 
              href={item.href} 
              label={item.label} 
              isActive={isActive(item.href)} 
            />
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle theme={resolvedTheme} toggleTheme={toggleTheme} />
          
          <LanguageSelector 
            languages={languages}
            currentLanguage={currentLanguage}
            isLangMenuOpen={isLangMenuOpen}
            toggleLangMenu={toggleLangMenu}
            handleLanguageChange={handleLanguageChange}
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle theme={resolvedTheme} toggleTheme={toggleTheme} />
          
          <LanguageSelector 
            languages={languages}
            currentLanguage={currentLanguage}
            isLangMenuOpen={isLangMenuOpen}
            toggleLangMenu={toggleLangMenu}
            handleLanguageChange={handleLanguageChange}
          />
          
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isMenuOpen={isMenuOpen} 
        navItems={navItems} 
        isActive={isActive}
        languages={languages}
        currentLanguage={currentLanguage}
        handleLanguageChange={handleLanguageChange}
        theme={resolvedTheme}
        toggleTheme={toggleTheme}
      />
    </header>
  );
};

export default Navbar;