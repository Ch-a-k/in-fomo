import { FC, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { SeoProps, formatPageTitle, getLocalizedUrl } from '../utils/seo';

interface SEOComponentProps extends SeoProps {
  siteName?: string;
  baseUrl?: string;
  twitterSite?: string;
  twitterCreator?: string;
  facebookAppId?: string;
}

const SEO: FC<SEOComponentProps> = ({
  title,
  description,
  canonical,
  locale,
  image,
  imageAlt,
  type = 'website',
  keywords,
  author,
  publishedTime,
  modifiedTime,
  category,
  tags,
  noindex = false,
  nofollow = false,
  siteName = 'IN-FOMO.',
  baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://in-fomo.com',
  twitterSite = '@in_4omo',
  twitterCreator = '@in_4omo',
  facebookAppId,
}) => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const seoLocale = locale || i18n.language || router.locale || 'en';

  const canonicalUrl = useMemo(() => {
    if (canonical) return canonical;
    const path = router.asPath.split('?')[0].split('#')[0];
    return getLocalizedUrl(path, seoLocale, baseUrl);
  }, [canonical, router.asPath, seoLocale, baseUrl]);

  const fullImageUrl = useMemo(() => {
    if (!image) return `${baseUrl}/images/og-image.png`;
    if (image.startsWith('http')) return image;
    const imagePath = image.startsWith('/') ? image : `/${image}`;
    return `${baseUrl}${imagePath}`;
  }, [image, baseUrl]);

  const formattedTitle = formatPageTitle(title, siteName);
  const safeDescription = description || 'IN-FOMO. - leading IT company providing innovative software development services.';

  return (
    <Head>
      {/* Базовые мета-теги */}
      <title>{formattedTitle}</title>
      <meta name="description" content={safeDescription} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {author && <meta name="author" content={author} />}

      {/* Управление индексацией */}
      <meta
        name="robots"
        content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`}
      />

      {/* Канонический URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph теги */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:image" content={fullImageUrl} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:site_name" content={siteName} />
      {seoLocale && <meta property="og:locale" content={seoLocale} />}

      {/* Twitter Card теги */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

      {/* Дополнительные теги для статей */}
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta property="article:author" content={author} />}
          {category && <meta property="article:section" content={category} />}
          {tags &&
            tags.length > 0 &&
            tags.map((tag, index) => (
              <meta property="article:tag" content={tag} key={`tag-${index}`} />
            ))}
        </>
      )}

      {/* Facebook App ID */}
      {facebookAppId && <meta property="fb:app_id" content={facebookAppId} />}
    </Head>
  );
};

export default SEO;