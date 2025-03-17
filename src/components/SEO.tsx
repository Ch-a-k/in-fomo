import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage = 'https://in-fomo.com/og-image.jpg',
  noindex = false,
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const locale = router.locale || 'en';
  
  const defaultTitle = t('seo.defaultTitle');
  const defaultDescription = t('seo.defaultDescription');
  const defaultKeywords = t('seo.defaultKeywords');

  const siteTitle = title ? `${title} | In-Fomo` : defaultTitle;
  const siteDescription = description || defaultDescription;
  const siteKeywords = keywords || defaultKeywords;

  const canonicalUrl = `https://in-fomo.com${router.asPath}`;

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="In-Fomo" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Alternate language versions */}
      <link rel="alternate" href={`https://in-fomo.com/en${router.asPath}`} hrefLang="en" />
      <link rel="alternate" href={`https://in-fomo.com/pl${router.asPath}`} hrefLang="pl" />
      <link rel="alternate" href={`https://in-fomo.com/uk${router.asPath}`} hrefLang="uk" />
      <link rel="alternate" href={`https://in-fomo.com/kz${router.asPath}`} hrefLang="kz" />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "In-Fomo",
          "url": "https://in-fomo.com",
          "logo": "https://in-fomo.com/logo.png",
          "sameAs": [
            "https://twitter.com/in_fomo",
            "https://www.linkedin.com/company/in-fomo"
          ]
        })}
      </script>
    </Head>
  );
};

export default SEO; 