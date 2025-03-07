import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import Layout from '../components/Layout';
import '../styles/globals.css';
import nextI18NextConfig from '../../next-i18next.config.js';

// Google Analytics ID - замените на ваш реальный ID
const GA_MEASUREMENT_ID = 'G-YET0LLRBZN';

// Функция для отслеживания просмотров страниц
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Функция для отслеживания событий
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Создаем полный URL с параметрами запроса
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      // Отправляем просмотр страницы в Google Analytics
      pageview(url);
    }
  }, [pathname, searchParams]);

  // Получаем метаданные страницы для OG-тегов
  const title = pageProps.title || 'IN-FOMO';
  const description = pageProps.description || '';
  const ogImage = pageProps.ogImage || '/images/og-image.png';
  const ogUrl = pageProps.ogUrl || '';
  const footerVariant = pageProps.footerVariant || 'design1';

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Layout
          title={title}
          description={description}
          ogImage={ogImage}
          ogUrl={ogUrl}
          footerVariant={footerVariant}
        >
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
