import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  noindex?: boolean;
  customStructuredData?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
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

  const siteTitle = title ? `${title} | In-Fomo` : defaultTitle;
  const siteDescription = description || defaultDescription;
  const siteKeywords = keywords || defaultKeywords;

  const canonicalUrl = `${siteUrl}${router.asPath}`;

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
      <link rel="alternate" href={`${siteUrl}/en${router.asPath}`} hrefLang="en" />
      <link rel="alternate" href={`${siteUrl}/pl${router.asPath}`} hrefLang="pl" />
      <link rel="alternate" href={`${siteUrl}/uk${router.asPath}`} hrefLang="uk" />
      <link rel="alternate" href={`${siteUrl}/kz${router.asPath}`} hrefLang="kz" />
      <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />
      
      {/* Schema.org разметка */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
};

export default SEO; 