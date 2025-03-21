import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  noIndex?: boolean;
  ogImage?: string;
}

const SEO = ({
  title,
  description,
  noIndex = false,
  ogImage,
}: SEOProps) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  
  // Получаем языковой префикс из маршрута
  const { locale } = router;
  
  // Базовый URL сайта
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com';
  
  // Формируем канонический URL
  const path = router.asPath.split('?')[0].split('#')[0]; // Удаляем query параметры и хэши
  const canonicalUrl = `${siteUrl}${path === '/' ? '' : path}`;
  
  // Получаем путь к изображению
  const ogImageUrl = ogImage 
    ? `${siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}` 
    : `${siteUrl}/images/og-image.png`;
  
  // Формируем заголовок с поддержкой локализации
  // Если передан конкретный заголовок, используем его, иначе пытаемся получить из переводов
  const pageTitle = title || t('meta.title', { ns: router.pathname.substring(1) || 'common', defaultValue: 'IN-FOMO | Innovative IT Solutions' });
  
  // Аналогично для описания
  const pageDescription = description || t('meta.description', { ns: router.pathname.substring(1) || 'common', defaultValue: 'Leading IT company providing innovative software development, cloud solutions, and digital transformation services.' });

  return (
    <Head>
      {/* Основные метатеги */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} key="description" />
      <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      <link rel="icon" href="/favicon.ico" key="icon" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" key="apple-icon" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:url" content={canonicalUrl} key="og:url" />
      <meta property="og:title" content={pageTitle} key="og:title" />
      <meta property="og:description" content={pageDescription} key="og:description" />
      <meta property="og:image" content={ogImageUrl} key="og:image" />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />
      <meta property="og:site_name" content="IN-FOMO" key="og:site_name" />
      <meta property="og:locale" content={locale || 'en'} key="og:locale" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:url" content={canonicalUrl} key="twitter:url" />
      <meta name="twitter:title" content={pageTitle} key="twitter:title" />
      <meta name="twitter:description" content={pageDescription} key="twitter:description" />
      <meta name="twitter:image" content={ogImageUrl} key="twitter:image" />
      
      {/* Telegram */}
      <meta name="telegram:channel" content="@infomo" key="telegram:channel" />
      <meta name="telegram:image" content={ogImageUrl} key="telegram:image" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} key="canonical" />
      
      {/* Alternate language links */}
      {router.locales?.map((loc) => (
        <link 
          key={`alternate-${loc}`}
          rel="alternate" 
          hrefLang={loc} 
          href={`${siteUrl}/${loc === router.defaultLocale ? '' : loc}${path === '/' ? '' : path}`} 
        />
      ))}
      
      {/* Robots */}
      <meta 
        name="robots" 
        content={noIndex ? "noindex,nofollow" : "index,follow"} 
        key="robots" 
      />
    </Head>
  );
};

export default SEO; 