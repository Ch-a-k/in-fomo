import type { GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'
import SEO from '../components/SEO'
import Careers from '../components/Careers'

export default function CareersPage() {
  const { t } = useTranslation(['careers', 'common'])
  const { theme } = useTheme()

  return (
    <>
      <SEO 
        title={t('careers_title', { ns: 'careers' })}
        description={t('careers_description', { ns: 'careers' })}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/90 text-white">
              {t('careers_badge', { ns: 'careers' })}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {t('careers_title', { ns: 'careers' })}
            </h1>
            
            <p className="mb-10 text-xl text-gray-600 dark:text-gray-300">
              {t('careers_description', { ns: 'careers' })}
            </p>
          </div>
        </div>
      </div>

      {/* Careers Component Section */}
      <Careers />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'careers'])),
      footerVariant: 'design1'
    },
  };
}; 