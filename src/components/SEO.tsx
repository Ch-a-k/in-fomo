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
  
  // Приоритетный заголовок и описание
  const priorityTitle = "IN-FOMO. | Innovative IT Solutions";
  const priorityDescription = "Leading IT company providing innovative software development, cloud solutions, and digital transformation services.";
  
  // Используем locale из i18n, если не задан явно
  const seoLocale = locale || i18n.language || router.locale || 'en';
  
  // Вычисляем канонический URL, если он не предоставлен явно
  const canonicalUrl = useMemo(() => {
    if (canonical) return canonical;
    
    const path = router.asPath.split('?')[0].split('#')[0]; // Удаляем query params и хэш
    return getLocalizedUrl(path, seoLocale, baseUrl);
  }, [canonical, router.asPath, seoLocale, baseUrl]);
  
  // Приоритетный URL изображения из требований пользователя
  const priorityImageUrl = "https://opengraph.b-cdn.net/production/images/e9be6993-4e03-4ae5-977d-d5f7d2e2226b.png?token=frkI3hPu3sc-vDYsn36qRJQ4CANW3XK41QkyrfbQ5CA&height=630&width=1200&expires=33278785063";
  
  // Проверяем и устанавливаем абсолютный URL для изображения
  const fullImageUrl = useMemo(() => {
    // Используем приоритетное изображение из требований пользователя
    if (!image) {
      return priorityImageUrl;
    }

    // Если уже абсолютный URL, используем его
    if (image.startsWith('http')) return image;
    
    // Если относительный URL, добавляем baseUrl
    const imagePath = image.startsWith('/') ? image : `/${image}`;
    return `${baseUrl}${imagePath}`;
  }, [image, baseUrl]);
  
  // Приоритетный URL сайта
  const priorityUrl = "https://in-fomo.com";
  
  return (
    <Head>
      {/* Базовые SEO-теги (приоритетные) */}
      <title>{priorityTitle}</title>
      <meta name="description" content={priorityDescription} />
      
      {/* Дополнительные мета-теги */}
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
      
      {/* Open Graph мета-теги (приоритетные) */}
      <meta property="og:url" content={priorityUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={priorityTitle} />
      <meta property="og:description" content={priorityDescription} />
      <meta property="og:image" content={priorityImageUrl} />
      <meta property="og:image:secure_url" content={priorityImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={seoLocale.replace('-', '_')} />

      {/* Twitter Card мета-теги (приоритетные) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="in-fomo.com" />
      <meta property="twitter:url" content={priorityUrl} />
      <meta name="twitter:title" content={priorityTitle} />
      <meta name="twitter:description" content={priorityDescription} />
      <meta name="twitter:image" content={priorityImageUrl} />
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
          
          {tags && tags.length > 0 && tags.map((tag, index) => (
            <meta property="article:tag" content={tag} key={`tag-${index}`} />
          ))}
        </>
      )}
      
      {/* Facebook App ID если предоставлен */}
      {facebookAppId && <meta property="fb:app_id" content={facebookAppId} />}
    </Head>
  );
};

export default SEO;