import { GetStaticProps } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useTheme } from 'next-themes'

export default function TermsOfService() {
  const { t } = useTranslation(['terms', 'common'])
  const { theme } = useTheme()

  return (
    <>
      <Head>
        <title>{`IN-FOMO | ${t('meta.title')}`}</title>
        <meta name="description" content={t('meta.description')} />
      </Head>

      {/* Hero */}
      <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <div>
            <div className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              {t('hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 bg-light-surface dark:bg-dark-surface">
        <div className="container max-w-7xl mx-auto px-4 space-y-12">
          {/* Introduction */}
          <div>
            <div className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.introduction.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('sections.introduction.content')}</p>
            </div>
          </div>

          {/* Definitions */}
          <div>
            <div className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.definitions.title')}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{t('sections.definitions.content')}</p>
              <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                {Object.values(t('sections.definitions.items', { returnObjects: true })).map(
                  (item, index) => (
                    <li key={index} className="pl-4">{item}</li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* User Accounts */}
          <div>
            <div className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.account.title')}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{t('sections.account.content')}</p>
              <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                {Object.values(t('sections.account.items', { returnObjects: true })).map(
                  (item, index) => (
                    <li key={index} className="pl-4">{item}</li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div>
            <div className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.intellectualProperty.title')}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{t('sections.intellectualProperty.content')}</p>
              <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                {Object.values(t('sections.intellectualProperty.items', { returnObjects: true })).map(
                  (item, index) => (
                    <li key={index} className="pl-4">{item}</li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Restrictions */}
          <div>
            <div className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.restrictions.title')}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{t('sections.restrictions.content')}</p>
              <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                {Object.values(t('sections.restrictions.items', { returnObjects: true })).map(
                  (item, index) => (
                    <li key={index} className="pl-4">{item}</li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Grid of Additional Sections */}
            {/* Termination */}
            <div className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.termination.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('sections.termination.content')}</p>
            </div>
          
            {/* Liability */}
            <div className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.liability.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('sections.liability.content')}</p>
            </div>

            {/* Warranty */}
            <div className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.warranty.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('sections.warranty.content')}</p>
            </div>

            {/* Changes */}
            <div className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.changes.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('sections.changes.content')}</p>
            </div>
            
          {/* Contact */}
          <div>
            <div className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.contact.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('sections.contact.content')}</p>
            </div>
          </div>

          {/* Last Updated */}
          <div>
            <p className="text-gray-500 dark:text-gray-400">
              {t('lastUpdated')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'terms'])),
    },
  }
} 