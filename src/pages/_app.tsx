import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';
import nextI18NextConfig from '../../next-i18next.config.js';

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
      <Layout
        title={pageProps.title || 'IN-FOMO'}
        description={pageProps.description || ''}
        keywords={pageProps.keywords}
        footerVariant={pageProps.footerVariant || 'design1'}
      >
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
