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
  
  // Базовый URL сайта с проверкой и форматированием
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com';
  // Убеждаемся, что URL не заканчивается слэшем
  siteUrl = siteUrl.replace(/\/$/, '');
  
  // Формируем канонический URL
  const path = router.asPath.split('?')[0].split('#')[0]; // Удаляем query параметры и хэши
  const canonicalUrl = `${siteUrl}${path === '/' ? '' : path}`;
  
  // Получаем абсолютный URL для OG-изображения
  // Используем изображение в корне, если оно существует, иначе в подпапке images
  const defaultImage = '/og-image.png'; // Изображение в корне public
  const ogImageUrl = ogImage 
    ? `${siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}` 
    : `${siteUrl}${defaultImage}`;
  
  // Формируем заголовок с поддержкой локализации
  // Если передан конкретный заголовок, используем его, иначе пытаемся получить из переводов
  const pageTitle = title || t('meta.title', { ns: router.pathname.substring(1) || 'common', defaultValue: 'IN-FOMO | Innovative IT Solutions' });
  
  // Аналогично для описания
  const pageDescription = description || t('meta.description', { ns: router.pathname.substring(1) || 'common', defaultValue: 'Leading IT company providing innovative software development, cloud solutions, and digital transformation services.' });

  // Выводим отладочную информацию в консоль в режиме разработки
  if (process.env.NODE_ENV === 'development') {
    console.log('SEO Component Debug:');
    console.log('- Page Path:', router.pathname);
    console.log('- Canonical URL:', canonicalUrl);
    console.log('- OG Image URL:', ogImageUrl);
    console.log('- Title:', pageTitle);
    console.log('- Description:', pageDescription);
  }

  return (
    <Head>
      {/* Основные метатеги */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      <meta name="theme-color" content="#ff5a00" />
      
      {/* Open Graph / Facebook - сначала Open Graph теги для базового взаимодействия со всеми платформами */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="IN-FOMO" />
      <meta property="og:locale" content={locale || 'en'} />
      
      {/* Twitter Cards - специфичные теги для Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@infomo" />
      <meta name="twitter:creator" content="@infomo" />
      {/* Twitter использует og:title и другие og: теги как fallback, поэтому дублирование не обязательно */}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
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
      />
    </Head>
  );
};

export default SEO; 