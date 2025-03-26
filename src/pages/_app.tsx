import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';
import nextI18NextConfig from '../../next-i18next.config.js';
import { initLoadOptimizations } from '../utils/optimizeLoad';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Инициализируем оптимизации загрузки и шрифты
  useEffect(() => {
    setMounted(true);
    
    // Инициализируем оптимизации загрузки после монтирования компонента
    if (typeof window !== 'undefined') {
      // Отслеживаем загрузку шрифтов
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          setFontLoaded(true);
          document.documentElement.classList.add('fonts-loaded');
        });
      }
      
      // Измерение производительности 
      const reportPerformance = () => {
        if ('performance' in window && 'getEntriesByType' in performance) {
          const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navEntry) {
            // Анализируем время загрузки ключевых метрик
            const ttfb = navEntry.responseStart - navEntry.requestStart;
            const dcl = navEntry.domContentLoadedEventEnd - navEntry.fetchStart;
            const load = navEntry.loadEventEnd - navEntry.fetchStart;
            console.info(`Performance metrics: TTFB=${ttfb.toFixed(0)}ms, DCL=${dcl.toFixed(0)}ms, Load=${load.toFixed(0)}ms`);
          }
        }
      };
      
      // Запускаем остальные оптимизации
      initLoadOptimizations();
      
      // Отложенно собираем метрики производительности
      if (document.readyState === 'complete') {
        reportPerformance();
      } else {
        window.addEventListener('load', reportPerformance);
        return () => window.removeEventListener('load', reportPerformance);
      }
    }
  }, []);

  // Эффект для управления Save-Data
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const prefersReducedData = () => {
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        if (conn && conn.saveData) {
          document.documentElement.classList.add('save-data');
          return true;
        }
      }
      return false;
    };
    
    // Применяем оптимизации для экономии данных
    if (prefersReducedData()) {
      // Удаляем анимации и тяжелые эффекты для экономии данных
      // Но не добавляем дублирующий viewport мета-тег
      const style = document.createElement('style');
      style.textContent = `
        @media (prefers-reduced-data: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  if (!mounted) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Head>
          {/* Предотвращаем Flash of Unstyled Content при гидрации */}
          <style>{`
            .fonts-loading * {
              opacity: 0.99;
            }
            :root {
              --container-min-h: 50vh;
            }
            main, section {
              min-height: var(--container-min-h, 50vh);
            }
          `}</style>
        </Head>
        <div className="min-h-screen bg-white dark:bg-[#121212]" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Head>
        {/* Критические встраиваемые стили для предотвращения Layout Shifts */}
        <style>{`
          :root {
            --container-min-h: 50vh;
          }
          main, section {
            min-height: var(--container-min-h, 50vh);
            contain: content;
            content-visibility: auto;
          }
          .fonts-loaded * {
            transition: font-family 0.1s ease-out;
          }
        `}</style>
      </Head>
      <Layout footerVariant={pageProps.footerVariant || 'design1'}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);