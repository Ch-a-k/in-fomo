import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { memo } from 'react';

const Hero = memo(() => {
  const { t } = useTranslation('home');

  return (
    <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
      {/* Background geometric shapes - оптимизировано для предотвращения горизонтального скролла */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Заменяем -right-24 на right-0 с transform */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-2xl transform translate-x-1/4 -translate-y-1/4"></div>
        {/* Заменяем -left-24 на left-0 с transform */}
        <div className="absolute top-1/3 left-0 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl transform -translate-x-1/2"></div>
        {/* Исправляем -bottom-32 */}
        <div className="absolute bottom-0 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-2xl transform -translate-x-1/2 translate-y-1/3"></div>
        
        {/* Grid pattern с уменьшенной прозрачностью для лучшей производительности */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>

      <div className="container relative z-10 py-12 md:py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Приоритетный контент для LCP */}
          <div 
            className="inline-block px-6 py-2 mb-4 text-sm font-medium rounded-full bg-primary/90 text-white"
            style={{ willChange: 'transform' }}
          >
            {t('hero_badge')}
          </div>
          
          <h1 
            className="text-4xl font-bold sm:text-5xl md:text-6xl mb-4"
            style={{ willChange: 'transform' }}
          >
            {t('hero_title_1')}{' '}
            <span className="text-primary">{t('hero_title_highlight')}</span>{' '}
            {t('hero_title_2')}
          </h1>
          
          <p className="mb-8 text-lg md:text-xl text-gray-600 dark:text-gray-300">
            {t('hero_description')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center sm:space-y-0 space-y-4 sm:space-y-0">
            <Link 
              href="/contact" 
              className="btn btn-primary mx-4 w-full sm:w-auto mb-4 sm:mb-0"
              style={{ willChange: 'transform' }}
            >
              {t('get_started')}
            </Link>
            <Link 
              href="#services" 
              className="btn btn-outline mx-4 w-full sm:w-auto"
              style={{ willChange: 'transform' }}
            >
              {t('our_services')}
            </Link>
          </div>
          
          {/* Отложенный контент */}
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-400 dark:text-gray-600 font-medium text-lg">Blastly bot</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-400 dark:text-gray-600 font-medium text-lg">Cats & Dogs</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-400 dark:text-gray-600 font-medium text-lg">Heimdal AI</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-400 dark:text-gray-600 font-medium text-lg">Memhash</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;
