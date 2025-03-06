import Head from 'next/head';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Hero from '../components/Hero';
import Services from '../components/Services';
import Partners from '../components/Partners';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
     <Head>
    <title>{`IN-FOMO | ${t('title')}`}</title>
    <meta name="description" content={t('subtitle')} />
    <link rel="icon" href="/favicon.ico" />
    </Head>

      <Hero />
      <Services />
      <Partners />
      {/* Add more sections as needed */}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'home'])),
    },
  };
};
