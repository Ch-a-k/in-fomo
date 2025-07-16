import { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../components/SEO';

import Hero from '../components/Hero';
import Services from '../components/Services';
import Partners from '../components/Partners';
import Awards from '../components/Awards';
import MilestonesSection from '../components/MilestonesSection';

export default function Home() {
  const { t } = useTranslation(['common', 'home']);
  // Проверяем и форматируем URL сайта
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com').replace(/\/$/, '');
  
  return (
    <>
      <SEO
      title={t("meta_title", { defaultValue: "IN-FOMO. | TOP-1 in Europe by Clutch" })}
      description={t("meta_description", { defaultValue: "We are a team of experienced developers and designers who are passionate about creating innovative IT solutions."})}
      />
      <main className="overflow-x-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <Hero />
        <Awards />
        <Services />
        <MilestonesSection />
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
      footerVariant: 'design1'
    },
  };
};
