import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { memo, useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const Hero = memo(() => {
  const { t } = useTranslation('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Определяем устройство и устанавливаем состояние загрузки
  useEffect(() => {
    // Проверяем устройство
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Запускаем при монтировании
    checkDevice();
    
    // Сообщаем, что компонент загружен
    setIsLoaded(true);
    
    // Регистрируем LCP элемент
    if (headingRef.current && window.performance && 'observe' in window.performance) {
      try {
        const observer = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            console.log('LCP element:', entries[0]);
          }
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        console.warn('PerformanceObserver not supported');
      }
    }
    
    // Слушаем изменение размера
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
      {/* Упрощенный фон для мобильных устройств */}
      {isMobile ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-xl"></div>
        </div>
      ) : (
        /* Полный фон для десктоп */
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-2xl transform translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute top-1/3 left-0 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl transform -translate-x-1/2"></div>
          <div className="absolute bottom-0 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-2xl transform -translate-x-1/2 translate-y-1/3"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        </div>
      )}

      <div className="container relative z-10 py-8 md:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - отключен для мобильных */}
          {!isMobile && (
            <div 
              className="inline-block px-6 py-2 mb-4 text-sm font-medium rounded-full bg-primary/90 text-white"
            >
              {t('hero_badge')}
            </div>
          )}
          
          {/* LCP элемент - Главный заголовок */}
          <h1 
            ref={headingRef}
            className={`font-bold mb-4 ${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl md:text-6xl'}`}
            id="hero-heading"
          >
            {t('hero_title_1')}{' '}
            <span className="text-primary">{t('hero_title_highlight')}</span>{' '}
            {t('hero_title_2')}
          </h1>
          
          <p className={`mb-6 ${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-gray-600 dark:text-gray-300`}>
            {t('hero_description')}
          </p>
          
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-center items-center gap-4`}>
            <Link 
              href="/contact" 
              className={`btn btn-primary ${isMobile ? 'w-full mb-2' : 'mx-4'}`}
              aria-label={t('get_started')}
            >
              {t('get_started')}
            </Link>
            {!isMobile && (
              <Link 
                href="#services" 
                className="btn btn-outline mx-4"
                aria-label={t('our_services')}
              >
                {t('our_services')}
              </Link>
            )}
          </div>
          
          {/* Отложенный контент загружается только после основного контента или на десктоп */}
          {(!isMobile || isLoaded) && (
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
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
          )}
        </div>
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;
