import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  noIndex?: boolean;
}

const SEO = ({
  title = 'IN-FOMO | Innovative IT Solutions',
  description = 'Leading IT company providing innovative software development, cloud solutions, and digital transformation services.',
  noIndex = false,
}: SEOProps) => {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com';
  const canonicalUrl = `${siteUrl}${router.asPath === '/' ? '' : router.asPath}`;
  const ogImageUrl = `${siteUrl}/images/og-image.png`;

  return (
    <Head>
      {/* Основные метатеги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
      
      {/* Open Graph / Facebook / Threads */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="IN-FOMO" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImageUrl} />
      
      {/* Telegram */}
      <meta property="telegram:channel" content="@infomo" />
      <meta property="telegram:image" content={ogImageUrl} />
      <meta property="telegram:title" content={title} />
      <meta property="telegram:description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}
    </Head>
  );
};

export default SEO; 