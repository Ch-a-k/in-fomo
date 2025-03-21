import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const SEO = ({
  title = 'IN-FOMO | Innovative IT Solutions',
  description = 'Leading IT company providing innovative software development, cloud solutions, and digital transformation services.',
  ogImage = '/images/og-image.png',
  ogType = 'website',
  noIndex = false,
}: SEOProps) => {
  const router = useRouter();
  // Проверяем и форматируем URL сайта (удаляем лишние слеши)
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com').replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}${router.asPath === '/' ? '' : router.asPath}`;
  
  // Убеждаемся, что URL для OG-изображения абсолютный
  const formattedOgImage = ogImage.startsWith('http') 
    ? ogImage 
    : `${siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  // Логирование для отладки (в разработке)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('SEO Component values:');
      console.log('- Site URL:', siteUrl);
      console.log('- Canonical URL:', canonicalUrl);
      console.log('- OG Image URL:', formattedOgImage);
    }
  }, [siteUrl, canonicalUrl, formattedOgImage]);

  return (
    <Head>
      {/* Основные метатеги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      
      {/* Open Graph / Facebook - с абсолютными URL */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={formattedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="IN-FOMO" />
      <meta property="og:logo" content={`${siteUrl}/images/logo.png`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={formattedOgImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Canonical and Alternate Languages */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={`${siteUrl}/en${router.asPath === '/' ? '' : router.asPath}`} hrefLang="en" />
      <link rel="alternate" href={`${siteUrl}/pl${router.asPath === '/' ? '' : router.asPath}`} hrefLang="pl" />
      <link rel="alternate" href={`${siteUrl}/uk${router.asPath === '/' ? '' : router.asPath}`} hrefLang="uk" />
      <link rel="alternate" href={`${siteUrl}/kz${router.asPath === '/' ? '' : router.asPath}`} hrefLang="kz" />
      <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
    </Head>
  );
};

export default SEO; 