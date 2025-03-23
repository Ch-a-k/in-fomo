import { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../components/SEO';

export default function TestSEO() {
  const { t } = useTranslation(['common']);

  return (
    <>
      <SEO 
        title="IN-FOMO | Test SEO Page"
        description="This is a test page for SEO validation"
        ogImage="/og-image.png"
      />

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Тестовая страница для SEO</h1>
        <p className="mb-4">
          Эта страница создана для проверки корректности работы SEO.
        </p>
        <p className="mb-4">
          На этой странице оставлены только базовые SEO-метатеги.
        </p>
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Метатеги на этой странице:</h2>
          <ul className="list-disc pl-5">
            <li>title: IN-FOMO | Test SEO Page</li>
            <li>description: This is a test page for SEO validation</li>
            <li>og:image: https://in-fomo.com/og-image.png</li>
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