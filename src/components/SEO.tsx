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
  ogImage
}: SEOProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  // Базовый URL сайта
  const siteUrl = 'https://in-fomo.com';
  
  // Формируем канонический URL
  const path = router.asPath.split('?')[0].split('#')[0];
  const canonicalUrl = `${siteUrl}${path === '/' ? '' : path}`;
  
  // Заголовок
  const pageTitle =
    title ||
    t('meta.title', {
      ns: router.pathname.substring(1) || 'common',
      defaultValue: 'IN-FOMO | Innovative IT Solutions',
    });

  // Описание
  const pageDescription =
    description ||
    t('meta.description', {
      ns: router.pathname.substring(1) || 'common',
      defaultValue:
        'Leading IT company providing innovative software development, cloud solutions, and digital transformation services.',
    });
    
  // OG изображение
  const ogImageUrl = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`
    : `${siteUrl}/og-image.png`;

  return (
    <Head>
      {/* Основные метатеги */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content="#ff5a00" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:site_name" content="IN-FOMO" />
      <meta property="og:locale" content={router.locale || 'en'} />

      {/* Twitter Cards - упрощенная версия */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Канонический URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Альтернативные языковые ссылки */}
      {router.locales?.map((loc) => (
        <link
          key={`alternate-${loc}`}
          rel="alternate"
          hrefLang={loc}
          href={`${siteUrl}/${loc === router.defaultLocale ? '' : loc}${path === '/' ? '' : path}`}
        />
      ))}

      {/* Управление индексацией */}
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />

      {/* Шрифты */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Структурированные данные Schema.org - упрощенная версия */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: pageTitle,
            url: siteUrl,
            description: pageDescription,
            publisher: {
              '@type': 'Organization',
              name: 'IN-FOMO',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`
              }
            },
            image: ogImageUrl
          })
        }}
      />
    </Head>
  );
};

export default SEO;