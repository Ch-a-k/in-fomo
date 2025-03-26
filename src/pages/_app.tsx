import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';
import nextI18NextConfig from '../../next-i18next.config.js';
import { initLoadOptimizations } from '../utils/optimizeLoad';

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // Инициализируем оптимизации загрузки
  useEffect(() => {
    setMounted(true);
    
    // Инициализируем оптимизации загрузки после монтирования компонента
    if (typeof window !== 'undefined') {
      initLoadOptimizations();
    }
  }, []);

  // Эффект для управления Save-Data
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn && conn.saveData) {
        // Устанавливаем метатег для экономии данных
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
        document.head.appendChild(meta);
      }
    }
  }, []);

  if (!mounted) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen bg-white dark:bg-[#121212]" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Layout footerVariant={pageProps.footerVariant || 'design1'}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);