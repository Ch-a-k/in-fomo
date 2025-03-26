import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { memo, useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const Hero = memo(() => {
  const { t } = useTranslation('home');
  const [isMobile, setIsMobile] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Определяем устройство и устанавливаем состояние загрузки
  useEffect(() => {
    // Проверяем устройство только на клиенте
    if (typeof window !== 'undefined') {
      // Проверяем устройство
      const checkDevice = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Запускаем при монтировании
      checkDevice();
      
      // Регистрируем LCP элемент
      if (headingRef.current && typeof PerformanceObserver !== 'undefined') {
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
      
      // Слушаем изменение размера с использованием throttle
      let timeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(timeout);
        timeout = setTimeout(checkDevice, 100);
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
      {/* Упрощенный фон с фиксированными размерами */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
        style={{ 
          height: isMobile ? '100vh' : '100%',
          contain: 'strict',
          contentVisibility: 'auto',
          willChange: 'transform',
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-xl transform-gpu"></div>
        {!isMobile && (
          <>
            <div className="absolute top-1/3 left-0 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl transform-gpu -translate-x-1/2"></div>
            <div className="absolute bottom-0 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-2xl transform-gpu -translate-x-1/2 translate-y-1/3"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
          </>
        )}
      </div>

      <div 
        className="container relative z-10 py-8 md:py-16 lg:py-24"
        style={{ 
          minHeight: isMobile ? '50vh' : '70vh',
          contain: 'content',
        }}
      >
        <div 
          className="max-w-4xl mx-auto text-center"
          style={{ 
            contain: 'content',
            contentVisibility: 'auto',
          }}
        >
          {/* Badge с фиксированной высотой */}
          <div 
            className={`${!isMobile ? 'inline-block px-6 py-2 mb-4 text-sm font-medium rounded-full bg-primary text-white' : 'h-0 overflow-hidden'}`}
            role="banner"
            style={{ 
              minHeight: isMobile ? '0' : '32px',
              height: isMobile ? '0' : 'auto',
              contain: 'strict',
            }}
          >
            {t('hero_badge')}
          </div>
          
          {/* LCP элемент - Главный заголовок с фиксированным размером */}
          <h1 
            ref={headingRef}
            className={`font-bold mb-4 text-gray-900 dark:text-white ${isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl md:text-6xl'}`}
            id="hero-heading"
            style={{ 
              contentVisibility: 'auto',
              containIntrinsicSize: isMobile ? '0 64px' : '0 80px',
              contain: 'style layout',
              minHeight: isMobile ? '64px' : '80px',
              fontSize: 'var(--h1-size, 2.5rem)',
              lineHeight: 'var(--h1-lh, 1.2)',
              willChange: 'contents'
            }}
          >
            {t('hero_title_1')}{' '}
            <span className="text-primary dark:text-primary">{t('hero_title_highlight')}</span>{' '}
            {t('hero_title_2')}
          </h1>
          
          {/* Описание с фиксированной высотой */}
          <p 
            className={`mb-6 ${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-gray-800 dark:text-gray-100`}
            style={{ 
              contentVisibility: 'auto',
              containIntrinsicSize: isMobile ? '0 64px' : '0 48px',
              contain: 'style layout',
              minHeight: isMobile ? '64px' : '48px',
            }}
          >
            {t('hero_description')}
          </p>
          
          {/* Кнопки с фиксированной высотой */}
          <div 
            className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-center items-center gap-4`}
            style={{ 
              contain: 'layout style',
              minHeight: isMobile ? '96px' : '48px',
            }}
          >
            <Link 
              href="/contact" 
              className={`btn btn-primary ${isMobile ? 'w-full mb-2' : 'mx-4'}`}
              aria-label={t('get_started')}
              style={{ transform: 'translateZ(0)' }}
            >
              {t('get_started')}
            </Link>
            
            {!isMobile && (
              <Link 
                href="#services" 
                className="btn btn-outline mx-4"
                aria-label={t('our_services')}
                style={{ transform: 'translateZ(0)' }}
              >
                {t('our_services')}
              </Link>
            )}
          </div>
          
          {/* Лого-секция с предустановленной высотой */}
          <div 
            className={`mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 ${isMobile ? 'h-0 overflow-hidden' : ''}`}
            style={{ 
              height: isMobile ? '0' : 'auto',
              minHeight: isMobile ? '0' : '48px',
              contain: 'layout style',
            }}
          >
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-700 dark:text-gray-300 font-medium text-lg">Blastly bot</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-700 dark:text-gray-300 font-medium text-lg">Cats & Dogs</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-700 dark:text-gray-300 font-medium text-lg">Heimdal AI</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-700 dark:text-gray-300 font-medium text-lg">Memhash</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;
