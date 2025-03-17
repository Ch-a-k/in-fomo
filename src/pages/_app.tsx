import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';
import nextI18NextConfig from '../../next-i18next.config.js';
import SEO from '../components/SEO';

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      <SEO />
      <Layout
        title={pageProps.title || 'IN-FOMO'}
        description={pageProps.description || ''}
        ogImage={pageProps.ogImage || '/images/og-image.png'}
        ogUrl={pageProps.ogUrl || ''}
        footerVariant={pageProps.footerVariant || 'design1'}
      >
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
