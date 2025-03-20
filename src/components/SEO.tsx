import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  noindex?: boolean;
  customStructuredData?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage = '/images/og-image.png',
  ogImageAlt,
  ogType = 'website',
  noindex = false,
  customStructuredData,
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const locale = router.locale || 'en';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com';
  
  const defaultTitle = t('seo.defaultTitle');
  const defaultDescription = t('seo.defaultDescription');
  const defaultKeywords = t('seo.defaultKeywords');
  const defaultOgImageAlt = t('seo.defaultOgImageAlt', 'In-Fomo branding image');

  const siteTitle = title ? `${title} | In-Fomo` : defaultTitle;
  const siteDescription = description || defaultDescription;
  const siteKeywords = keywords || defaultKeywords;
  const imageAlt = ogImageAlt || defaultOgImageAlt;

  const canonicalUrl = `${siteUrl}${router.asPath}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Основные размеры OG изображения
  const ogImageWidth = 1200;
  const ogImageHeight = 630;

  // Базовая структура Schema.org для организации
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "In-Fomo",
    "url": "https://in-fomo.com",
    "logo": "https://in-fomo.com/logo.png",
    "sameAs": [
      "https://twitter.com/in_fomo",
      "https://www.linkedin.com/company/in-fomo"
    ],
    "inLanguage": locale
  };

  // Объединяем базовые данные с пользовательскими, если они есть
  const structuredData = customStructuredData 
    ? { ...baseStructuredData, ...customStructuredData }
    : baseStructuredData;

  return (
    <Head>
      {/* Основные мета-теги */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {!noindex && <meta name="robots" content="index,follow" />}
      <meta name="googlebot" content={noindex ? "noindex,nofollow" : "index,follow"} />
      
      <meta name="language" content={locale} />
      <meta httpEquiv="content-language" content={locale} />
      
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph - поддерживается Facebook, Instagram, Threads, WhatsApp, Telegram */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content={ogImageWidth.toString()} />
      <meta property="og:image:height" content={ogImageHeight.toString()} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="In-Fomo" />
      <meta property="og:locale" content={locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`} />
      
      {/* Альтернативные локали для Open Graph */}
      {router.locales?.filter(l => l !== locale).map(loc => (
        <meta 
          key={`og-locale-alt-${loc}`} 
          property="og:locale:alternate" 
          content={loc === 'en' ? 'en_US' : `${loc}_${loc.toUpperCase()}`} 
        />
      ))}
      
      {/* Twitter/X.com специфичные мета-теги */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@in_fomo" />
      <meta name="twitter:creator" content="@in_fomo" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      
      {/* Альтернативные версии на разных языках */}
      <link rel="alternate" href={`${siteUrl}/en${router.asPath}`} hrefLang="en" />
      <link rel="alternate" href={`${siteUrl}/pl${router.asPath}`} hrefLang="pl" />
      <link rel="alternate" href={`${siteUrl}/uk${router.asPath}`} hrefLang="uk" />
      <link rel="alternate" href={`${siteUrl}/kz${router.asPath}`} hrefLang="kz" />
      <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />
      
      {/* WhatsApp и Viber используют Open Graph, но можно добавить специфичные теги */}
      <meta property="al:ios:url" content={canonicalUrl} />
      <meta property="al:ios:app_store_id" content="310633997" /> {/* ID WhatsApp в App Store */}
      <meta property="al:ios:app_name" content="WhatsApp" />
      
      <meta property="al:android:url" content={canonicalUrl} />
      <meta property="al:android:package" content="com.whatsapp" />
      <meta property="al:android:app_name" content="WhatsApp" />
      
      {/* Schema.org разметка */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
};

export default SEO; 