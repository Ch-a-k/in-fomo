import { FC } from 'react';
import Head from 'next/head';

// Упрощенный компонент SEO с фиксированными значениями для социальных сетей
const SEO: FC = () => {
  const siteTitle = "IN-FOMO. | Innovative IT Solutions";
  const siteDescription = "Leading IT company providing innovative software development, cloud solutions, and digital transformation services.";
  const siteUrl = "https://in-fomo.com";
  const ogImageUrl = "https://in-fomo.com/og-image.png";
  
  return (
    <Head>
      {/* Базовые мета-теги */}
      <title key="title">{siteTitle}</title>
      <meta key="description" name="description" content={siteDescription} />
      <link key="canonical" rel="canonical" href={siteUrl} />
      
      {/* Важно: Open Graph теги должны иметь абсолютные URL */}
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={siteUrl} />
      <meta key="og:title" property="og:title" content={siteTitle} />
      <meta key="og:description" property="og:description" content={siteDescription} />
      <meta key="og:image" property="og:image" content={ogImageUrl} />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />
      <meta key="og:site_name" property="og:site_name" content="IN-FOMO." />
      
      {/* Twitter Card теги */}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:domain" property="twitter:domain" content="in-fomo.com" />
      <meta key="twitter:url" property="twitter:url" content={siteUrl} />
      <meta key="twitter:title" name="twitter:title" content={siteTitle} />
      <meta key="twitter:description" name="twitter:description" content={siteDescription} />
      <meta key="twitter:image" name="twitter:image" content={ogImageUrl} />
      <meta key="twitter:creator" name="twitter:creator" content="@in_4omo" />
      <meta key="twitter:site" name="twitter:site" content="@in_4omo" />
    </Head>
  );
};

export default SEO;