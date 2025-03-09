import { GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

const CookiePolicy = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('meta.title', { ns: 'common', defaultValue: 'IN-FOMO | Cookie Policy' })}</title>
        <meta name="description" content={t('meta.description', { ns: 'common', defaultValue: 'Learn about how we use cookies and similar technologies on our website.' })} />
        <meta property="og:title" content={t('meta.title', { ns: 'common', defaultValue: 'IN-FOMO | Cookie Policy' })} />
        <meta property="og:description" content={t('meta.description', { ns: 'common', defaultValue: 'Learn about how we use cookies and similar technologies on our website.' })} />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container mx-auto px-4 py-16">
          
            <h1 className="heading-1 mb-8">{t('cookie_consent.cookie_policy')}</h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="heading-2 mb-4">1. {t('cookie_policy.what_are_cookies')}</h2>
                <p className="mb-4">{t('cookie_policy.cookies_explanation')}</p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">2. {t('cookie_policy.types_of_cookies')}</h2>
                <h3 className="heading-3 mb-2">{t('cookie_policy.necessary_cookies')}</h3>
                <p className="mb-4">{t('cookie_policy.necessary_cookies_desc')}</p>
                
                <h3 className="heading-3 mb-2">{t('cookie_policy.analytics_cookies')}</h3>
                <p className="mb-4">{t('cookie_policy.analytics_cookies_desc')}</p>
                
                <h3 className="heading-3 mb-2">{t('cookie_policy.marketing_cookies')}</h3>
                <p className="mb-4">{t('cookie_policy.marketing_cookies_desc')}</p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">3. {t('cookie_policy.how_to_control')}</h2>
                <p className="mb-4">{t('cookie_policy.control_explanation')}</p>
              </section>

              <section className="mb-8">
                <h2 className="heading-2 mb-4">4. {t('cookie_policy.updates')}</h2>
                <p className="mb-4">{t('cookie_policy.updates_explanation')}</p>
              </section>

              <section>
                <h2 className="heading-2 mb-4">5. {t('cookie_policy.contact_us')}</h2>
                <p>{t('cookie_policy.contact_explanation')}</p>
              </section>
            </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      title: 'IN-FOMO | Cookie Policy',
      description: 'Learn about how we use cookies and similar technologies on our website.',
      ogImage: '/images/og-image.png'
    },
  }
}

export default CookiePolicy 