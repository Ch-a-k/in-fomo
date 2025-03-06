import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Hero from '../components/Hero';
import Services from '../components/Services';
import Partners from '../components/Partners';

export default function Home() {
  const { t } = useTranslation(['common', 'home']);

  return (
    <>
      <Head>
        <title>{`IN-FOMO | ${t('tagline')}`}</title>
        <meta name="description" content={t('meta_description')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <Services />
      <Partners />
      {/* Add more sections as needed */}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
};
