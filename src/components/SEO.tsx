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
  
  // Используем locale из i18n, если не задан явно
  const seoLocale = locale || i18n.language || router.locale || 'en';
  
  // Вычисляем канонический URL, если он не предоставлен явно
  const canonicalUrl = useMemo(() => {
    if (canonical) return canonical;
    
    const path = router.asPath.split('?')[0].split('#')[0]; // Удаляем query params и хэш
    return getLocalizedUrl(path, seoLocale, baseUrl);
  }, [canonical, router.asPath, seoLocale, baseUrl]);
  
  return (
    <Head>
      {/* Базовые SEO-теги (приоритетные) */}
      <title key="title">IN-FOMO. | Innovative IT Solutions</title>
      <meta 
        key="description" 
        name="description" 
        content="Leading IT company providing innovative software development, cloud solutions, and digital transformation services." 
      />
      
      {/* Дополнительные мета-теги */}
      {keywords && keywords.length > 0 && (
        <meta key="keywords" name="keywords" content={keywords.join(', ')} />
      )}
      
      {author && <meta key="author" name="author" content={author} />}
      
      {/* Управление индексацией */}
      <meta 
        key="robots"
        name="robots" 
        content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} 
      />
      
      {/* Канонический URL */}
      <link key="canonical" rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph мета-теги (приоритетные) */}
      <meta key="og:url" property="og:url" content="https://in-fomo.com" />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:title" property="og:title" content="IN-FOMO. | Innovative IT Solutions" />
      <meta 
        key="og:description" 
        property="og:description" 
        content="Leading IT company providing innovative software development, cloud solutions, and digital transformation services." 
      />
      <meta 
        key="og:image" 
        property="og:image" 
        content="https://opengraph.b-cdn.net/production/images/e9be6993-4e03-4ae5-977d-d5f7d2e2226b.png?token=frkI3hPu3sc-vDYsn36qRJQ4CANW3XK41QkyrfbQ5CA&height=630&width=1200&expires=33278785063" 
      />
      <meta 
        key="og:image:secure_url" 
        property="og:image:secure_url" 
        content="https://opengraph.b-cdn.net/production/images/e9be6993-4e03-4ae5-977d-d5f7d2e2226b.png?token=frkI3hPu3sc-vDYsn36qRJQ4CANW3XK41QkyrfbQ5CA&height=630&width=1200&expires=33278785063" 
      />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />
      {imageAlt && <meta key="og:image:alt" property="og:image:alt" content={imageAlt} />}
      <meta key="og:site_name" property="og:site_name" content={siteName} />
      <meta key="og:locale" property="og:locale" content={seoLocale.replace('-', '_')} />

      {/* Twitter Card мета-теги (приоритетные) */}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:domain" property="twitter:domain" content="in-fomo.com" />
      <meta key="twitter:url" property="twitter:url" content="https://in-fomo.com" />
      <meta key="twitter:title" name="twitter:title" content="IN-FOMO. | Innovative IT Solutions" />
      <meta 
        key="twitter:description" 
        name="twitter:description" 
        content="Leading IT company providing innovative software development, cloud solutions, and digital transformation services." 
      />
      <meta 
        key="twitter:image" 
        name="twitter:image" 
        content="https://opengraph.b-cdn.net/production/images/e9be6993-4e03-4ae5-977d-d5f7d2e2226b.png?token=frkI3hPu3sc-vDYsn36qRJQ4CANW3XK41QkyrfbQ5CA&height=630&width=1200&expires=33278785063" 
      />
      {imageAlt && <meta key="twitter:image:alt" name="twitter:image:alt" content={imageAlt} />}
      {twitterSite && <meta key="twitter:site" name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta key="twitter:creator" name="twitter:creator" content={twitterCreator} />}
      
      {/* Дополнительные теги для статей */}
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta key="article:published_time" property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta key="article:modified_time" property="article:modified_time" content={modifiedTime} />
          )}
          {author && <meta key="article:author" property="article:author" content={author} />}
          {category && <meta key="article:section" property="article:section" content={category} />}
          
          {tags && tags.length > 0 && tags.map((tag, index) => (
            <meta key={`article:tag:${index}`} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Facebook App ID если предоставлен */}
      {facebookAppId && <meta key="fb:app_id" property="fb:app_id" content={facebookAppId} />}
    </Head>
  );
};

export default SEO;