import { FC } from 'react';
import Head from 'next/head';
import Script from 'next/script';

// Интерфейс для пропсов SEO компонента
interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

// Компонент SEO теперь принимает опциональные пропсы
const SEO: FC<SEOProps> = ({ 
  title = "IN-FOMO. | Innovative IT Solutions", 
  description = "Leading IT company providing innovative software development, cloud solutions, and digital transformation services.",
  image = "/og-image.png",
  imageAlt = "IN-FOMO - Innovative IT Solutions"
}) => {
  // Проверяем и форматируем URL сайта
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com').replace(/\/$/, '');
  const ogImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  return (
    <>
      <Head>
        {/* Базовые мета-теги */}
        <title key="title">{title}</title>
        <meta key="description" name="description" content={description} />
        <link key="canonical" rel="canonical" href={siteUrl} />
        
        {/* Favicon с параметром версии для принудительного обновления */}
        <link key="icon" rel="icon" href="/favicon-new.ico" type="image/x-icon" />
        <link key="shortcut-icon" rel="shortcut icon" href="/favicon-new.ico" type="image/x-icon" />
        <link key="apple-touch-icon" rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
        
        {/* Open Graph теги - КРИТИЧЕСКИ ВАЖНЫ для Telegram */}
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:url" property="og:url" content={siteUrl} />
        <meta key="og:title" property="og:title" content={title} />
        <meta key="og:description" property="og:description" content={description} />
        <meta key="og:image" property="og:image" content={ogImageUrl} />
        <meta key="og:image:secure_url" property="og:image:secure_url" content={ogImageUrl} />
        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:height" property="og:image:height" content="630" />
        <meta key="og:image:alt" property="og:image:alt" content={imageAlt} />
        <meta key="og:site_name" property="og:site_name" content="IN-FOMO." />
        
        {/* Facebook Instant Articles мета-теги */}
        <meta key="ia:markup_url" property="ia:markup_url" content={`${siteUrl}/instant-articles/`} />
        <meta key="ia:markup_url_dev" property="ia:markup_url_dev" content={`${siteUrl}/instant-articles-dev/`} />
        <meta key="ia:rules_url" property="ia:rules_url" content={`${siteUrl}/instant-articles-rules/`} />
        <meta key="ia:rules_url_dev" property="ia:rules_url_dev" content={`${siteUrl}/instant-articles-rules-dev/`} />

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
        <meta key="twitter:image:src" name="twitter:image:src" content={ogImageUrl} />
        <meta key="twitter:image:alt" name="twitter:image:alt" content={imageAlt} />
        <meta key="twitter:creator" name="twitter:creator" content="@in_4omo" />
        <meta key="twitter:site" name="twitter:site" content="@in_4omo" />
      </Head>

      {/* Google tag (gtag.js) */}
      <Script 
        async 
        src="https://www.googletagmanager.com/gtag/js?id=G-EKCC4R8VMN" 
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-EKCC4R8VMN');
        `}
      </Script>
    </>
  );
};

export default SEO;