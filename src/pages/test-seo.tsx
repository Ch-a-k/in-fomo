import { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

export default function TestSEO() {
  const { t } = useTranslation(['common']);
  const siteUrl = 'https://in-fomo.com'; // Жестко указан URL без переменных окружения

  return (
    <>
      <Head>
        <title>IN-FOMO | Test SEO Page</title>
        <meta name="description" content="This is a test page for SEO validation" />
        
        {/* Open Graph / Facebook - хардкодированные, абсолютные URL */}
        <meta property="og:url" content="https://in-fomo.com/test-seo" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="IN-FOMO | Test SEO Page" />
        <meta property="og:description" content="This is a test page for SEO validation" />
        <meta property="og:image" content="https://in-fomo.com/images/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="IN-FOMO Test SEO" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="IN-FOMO" />
        <meta property="og:logo" content="https://in-fomo.com/images/logo.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://in-fomo.com/test-seo" />
        <meta name="twitter:title" content="IN-FOMO | Test SEO Page" />
        <meta name="twitter:description" content="This is a test page for SEO validation" />
        <meta name="twitter:image" content="https://in-fomo.com/images/og-image.png" />
        <meta name="twitter:image:alt" content="IN-FOMO Test SEO" />
      </Head>

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Тестовая страница для SEO</h1>
        <p className="mb-4">
          Эта страница создана для проверки корректности работы Open Graph тегов.
        </p>
        <p className="mb-4">
          Метатеги на этой странице заданы жёстко (хардкодом), без использования переменных.
        </p>
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Метатеги на этой странице:</h2>
          <ul className="list-disc pl-5">
            <li>og:url: https://in-fomo.com/test-seo</li>
            <li>og:type: website</li>
            <li>og:title: IN-FOMO | Test SEO Page</li>
            <li>og:description: This is a test page for SEO validation</li>
            <li>og:image: https://in-fomo.com/images/og-image.png</li>
            <li>og:logo: https://in-fomo.com/images/logo.png</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const translations = await serverSideTranslations(locale, ['common']);
  
  return {
    props: {
      ...translations,
      footerVariant: 'design1'
    },
  };
}; 