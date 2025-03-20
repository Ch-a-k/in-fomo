import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';
import nextI18NextConfig from '../../next-i18next.config.js';
import Head from 'next/head';

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
      <Head>
        {/* Основные метатеги */}
        <title>IN-FOMO | Innovative IT Solutions</title>
        <meta name="description" content="IN-FOMO - leading IT company providing innovative software development, cloud solutions, and digital transformation services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Статический Open Graph */}
        <meta property="og:title" content="IN-FOMO | Innovative IT Solutions" />
        <meta property="og:description" content="IN-FOMO - leading IT company providing innovative software development, cloud solutions, and digital transformation services." />
        <meta property="og:image" content="https://in-fomo.com/images/og-image.png" />
        <meta property="og:image:alt" content="IN-FOMO branding image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://in-fomo.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IN-FOMO" />
        
        {/* Статические Twitter/X.com мета-теги */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@in_fomo" />
        <meta name="twitter:creator" content="@in_fomo" />
        <meta name="twitter:title" content="IN-FOMO | Innovative IT Solutions" />
        <meta name="twitter:description" content="IN-FOMO - leading IT company providing innovative software development, cloud solutions, and digital transformation services." />
        <meta name="twitter:image" content="https://in-fomo.com/images/og-image.png" />
        <meta name="twitter:image:alt" content="IN-FOMO branding image" />
        
        {/* Альтернативные версии на разных языках */}
        <link rel="alternate" href="https://in-fomo.com/en" hrefLang="en" />
        <link rel="alternate" href="https://in-fomo.com/pl" hrefLang="pl" />
        <link rel="alternate" href="https://in-fomo.com/uk" hrefLang="uk" />
        <link rel="alternate" href="https://in-fomo.com/kz" hrefLang="kz" />
        <link rel="alternate" href="https://in-fomo.com" hrefLang="x-default" />
      </Head>

      <Layout footerVariant={pageProps.footerVariant || 'design1'}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
