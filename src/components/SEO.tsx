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
  baseUrl = process.env.NEXT_PUBLIC_DOMAIN || '',
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
  
  // Полный URL для изображения
  const fullImageUrl = image && !image.startsWith('http') 
    ? `${baseUrl}${image.startsWith('/') ? image : `/${image}`}`
    : image;
  
  // Форматируем заголовок страницы
  const formattedTitle = formatPageTitle(title, siteName);
  
  return (
    <Head>
      {/* Базовые SEO-теги */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
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
      
      {/* Open Graph мета-теги */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={seoLocale.replace('-', '_')} />
      
      {fullImageUrl && (
        <>
          <meta property="og:image" content={fullImageUrl} />
          {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
        </>
      )}
      
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
          
          {tags && tags.length > 0 && tags.map((tag, index) => (
            <meta property="article:tag" content={tag} key={`tag-${index}`} />
          ))}
        </>
      )}
      
      {/* Twitter Card мета-теги */}
      <meta name="twitter:card" content={fullImageUrl ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      
      {fullImageUrl && (
        <>
          <meta name="twitter:image" content={fullImageUrl} />
          {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
        </>
      )}
      
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      
      {/* Facebook App ID если предоставлен */}
      {facebookAppId && <meta property="fb:app_id" content={facebookAppId} />}
      
      {/* Настройки для favicon и apple-touch-icon могут быть добавлены здесь */}
    </Head>
  );
};

export default SEO;