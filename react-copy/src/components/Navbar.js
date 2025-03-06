import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Navbar = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  ];

  return (
    <nav>
      <ul>
        <li><Link href="/">{t('home')}</Link></li>
        <li><Link href="/portfolio">{t('portfolio')}</Link></li>
        <li><Link href="/about">{t('about')}</Link></li>
        <li><Link href="/contact">{t('contact')}</Link></li>
      </ul>
      <div className="language-selector">
        {languages.map((lang) => (
          <button key={lang.code} onClick={() => router.push(router.asPath, router.asPath, { locale: lang.code })}>
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
