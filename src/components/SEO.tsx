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
  
  // Проверяем и устанавливаем абсолютный URL для изображения
  const fullImageUrl = useMemo(() => {
    if (!image) return `${baseUrl}/images/og-image.png`; // Дефолтное изображение

    // Если уже абсолютный URL, используем его
    if (image.startsWith('http')) return image;
    
    // Если относительный URL, добавляем baseUrl
    const imagePath = image.startsWith('/') ? image : `/${image}`;
    return `${baseUrl}${imagePath}`;
  }, [image, baseUrl]);
  
  // Форматируем заголовок страницы
  const formattedTitle = formatPageTitle(title, siteName);
  
  // Стандартное описание, если не предоставлено
  const safeDescription = description || `IN-FOMO. - leading IT company providing innovative software development services.`;
  
  return (
    <Head>
      {/* Базовые SEO-теги */}
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
      
      {/* Open Graph мета-теги - Обязательные */}
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={seoLocale.replace('-', '_')} />
      
      {/* Open Graph мета-теги - Изображение */}
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:secure_url" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      
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
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      
      {/* Facebook App ID если предоставлен */}
      {facebookAppId && <meta property="fb:app_id" content={facebookAppId} />}
      
      {/* Настройки для favicon и apple-touch-icon могут быть добавлены здесь */}
    </Head>
  );
};

export default SEO;