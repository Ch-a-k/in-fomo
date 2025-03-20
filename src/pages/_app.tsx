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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com';

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
        <meta name="description" content="Leading IT company providing innovative software development, cloud solutions, and digital transformation services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="IN-FOMO | Innovative IT Solutions" />
        <meta property="og:description" content="Leading IT company providing innovative software development, cloud solutions, and digital transformation services." />
        <meta property="og:image" content={`${siteUrl}/images/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="IN-FOMO - IT Innovation Solutions" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="IN-FOMO" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content="IN-FOMO | Innovative IT Solutions" />
        <meta name="twitter:description" content="Leading IT company providing innovative software development, cloud solutions, and digital transformation services." />
        <meta name="twitter:image" content={`${siteUrl}/images/og-image.png`} />
        <meta name="twitter:image:alt" content="IN-FOMO - IT Innovation Solutions" />
        
        {/* Canonical and Alternate Languages */}
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" href={`${siteUrl}/en`} hrefLang="en" />
        <link rel="alternate" href={`${siteUrl}/pl`} hrefLang="pl" />
        <link rel="alternate" href={`${siteUrl}/uk`} hrefLang="uk" />
        <link rel="alternate" href={`${siteUrl}/kz`} hrefLang="kz" />
        <link rel="alternate" href={siteUrl} hrefLang="x-default" />
      </Head>

      <Layout footerVariant={pageProps.footerVariant || 'design1'}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
