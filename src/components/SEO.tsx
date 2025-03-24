import { FC } from 'react';
import Head from 'next/head';

// Интерфейс для пропсов SEO компонента
interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

// Компонент SEO теперь принимает опциональные пропсы
const SEO: FC<SEOProps> = ({ 
  title = "IN-FOMO. | Innovative IT Solutions", 
  description = "Leading IT company providing innovative software development, cloud solutions, and digital transformation services.",
  image = "/og-image.png" 
}) => {
  // Проверяем и форматируем URL сайта
  const siteUrl = "https://in-fomo.com";
  const ogImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  return (
    <Head>
      {/* Базовые мета-теги */}
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <link key="canonical" rel="canonical" href={siteUrl} />
      
      {/* Важно: Open Graph теги должны иметь абсолютные URL */}
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={siteUrl} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:image" property="og:image" content={ogImageUrl} />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />
      <meta key="og:site_name" property="og:site_name" content="IN-FOMO." />
      
      {/* Telegram специфичные мета-теги */}
      <meta key="telegram:card" property="telegram:card" content="summary_large_image" />
      <meta key="telegram:image" property="telegram:image" content={ogImageUrl} />
      <meta key="telegram:title" property="telegram:title" content={title} />
      <meta key="telegram:description" property="telegram:description" content={description} />
      
      {/* Twitter Card теги */}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:domain" property="twitter:domain" content="in-fomo.com" />
      <meta key="twitter:url" property="twitter:url" content={siteUrl} />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={ogImageUrl} />
      <meta key="twitter:creator" name="twitter:creator" content="@in_4omo" />
      <meta key="twitter:site" name="twitter:site" content="@in_4omo" />
    </Head>
  );
};

export default SEO;