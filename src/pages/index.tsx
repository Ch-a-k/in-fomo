import { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../components/SEO';

import Hero from '../components/Hero';
import Services from '../components/Services';
import Partners from '../components/Partners';

export default function Home() {
  const { t } = useTranslation(['common', 'home']);
  // Проверяем и форматируем URL сайта
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com').replace(/\/$/, '');
  
  return (
    <>
      <SEO 
        title="IN-FOMO | Innovative IT Solutions"
        description="Leading IT company providing innovative software development, cloud solutions, and digital transformation services."
        ogImage="/images/og-image.png"
        ogType="website"
      />
      <main>
        <Hero />
        <Services />
        <Partners />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const translations = await serverSideTranslations(locale, ['common', 'home']);
  
  return {
    props: {
      ...translations,
      title: 'IN-FOMO | Innovative IT Solutions',
      description: 'Leading IT company providing innovative software development, cloud solutions, and digital transformation services.',
      footerVariant: 'design1'
    },
  };
};
