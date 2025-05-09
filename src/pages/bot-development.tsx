import { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../components/SEO';
import Image from 'next/image';
import Link from 'next/link';

export default function BotDevelopment() {
  const { t } = useTranslation(['common', 'botdev']);
  
  return (
    <>
      <SEO
        title={t('botdev:meta.title')}
        description={t('botdev:meta.description')}
      />
      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-dark-bg dark:bg-dark-bg text-white">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/20 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center">
              <div className="inline-block px-4 py-2 bg-primary/30 rounded-full text-primary-light mb-6">
                {t('botdev:hero_badge')}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
                <span>{t('botdev:hero_title_1')} </span>
                <span className="text-primary">{t('botdev:hero_title_highlight')}</span>
                <span> {t('botdev:hero_title_2')}</span>
              </h1>
              <p className="text-lg text-gray-200 max-w-3xl text-center mb-10">
                {t('botdev:hero_description')}
              </p>
              <Link href="#pricing" className="px-8 py-3 bg-primary hover:bg-primary-dark transition-colors rounded-full font-medium">
                {t('botdev:get_started')}
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-light-surface dark:bg-dark-surface">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{t('botdev:features_title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('botdev:features_description')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{t('botdev:feature_1_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('botdev:feature_1_desc')}</p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{t('botdev:feature_2_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('botdev:feature_2_desc')}</p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{t('botdev:feature_3_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('botdev:feature_3_desc')}</p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-8.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{t('botdev:feature_4_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('botdev:feature_4_desc')}</p>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{t('botdev:feature_5_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('botdev:feature_5_desc')}</p>
              </div>
              
              {/* Feature 6 */}
              <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{t('botdev:feature_6_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('botdev:feature_6_desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Bots Section */}
        <section className="py-16 md:py-24 bg-light-bg dark:bg-dark-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{t('botdev:bot_types_title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('botdev:bot_types_description')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Bot Type 1 */}
              <div className="bg-light-surface dark:bg-dark-surface p-8 rounded-xl border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{t('botdev:bot_type_1_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t('botdev:bot_type_1_desc')}</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200">{t('botdev:bot_type_1_feature_1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200">{t('botdev:bot_type_1_feature_2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200">{t('botdev:bot_type_1_feature_3')}</span>
                  </li>
                </ul>
              </div>
              
              {/* Bot Type 2 */}
              <div className="bg-light-surface dark:bg-dark-surface p-8 rounded-xl border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{t('botdev:bot_type_2_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t('botdev:bot_type_2_desc')}</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200">{t('botdev:bot_type_2_feature_1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200">{t('botdev:bot_type_2_feature_2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200">{t('botdev:bot_type_2_feature_3')}</span>
                  </li>
                </ul>
              </div>
              
              {/* Bot Type 3 */}
              <div className="bg-light-surface dark:bg-dark-surface p-8 rounded-xl border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{t('botdev:bot_type_3_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t('botdev:bot_type_3_desc')}</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200">{t('botdev:bot_type_3_feature_1')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200">{t('botdev:bot_type_3_feature_2')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200">{t('botdev:bot_type_3_feature_3')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-light-surface dark:bg-dark-surface">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{t('botdev:pricing_title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('botdev:pricing_description')}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('botdev:pricing_updated')}</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Price 1 */}
              <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('botdev:price_1_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t('botdev:price_1_desc')}</p>
                <div className="text-3xl font-bold text-primary mb-6">${t('botdev:price_1_amount')}</div>
                <Link href="/contact" className="block text-center px-6 py-3 bg-primary hover:bg-primary-dark transition-colors text-white rounded-lg font-medium">
                  {t('botdev:get_started')}
                </Link>
              </div>
              
              {/* Price 2 */}
              <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('botdev:price_2_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t('botdev:price_2_desc')}</p>
                <div className="text-3xl font-bold text-primary mb-6">${t('botdev:price_2_amount')}</div>
                <Link href="/contact" className="block text-center px-6 py-3 bg-primary hover:bg-primary-dark transition-colors text-white rounded-lg font-medium">
                  {t('botdev:get_started')}
                </Link>
              </div>
              
              {/* Price 3 */}
              <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('botdev:price_3_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t('botdev:price_3_desc')}</p>
                <div className="text-3xl font-bold text-primary mb-6">${t('botdev:price_3_amount')}</div>
                <Link href="/contact" className="block text-center px-6 py-3 bg-primary hover:bg-primary-dark transition-colors text-white rounded-lg font-medium">
                  {t('botdev:get_started')}
                </Link>
              </div>
              
              {/* Price 4 */}
              <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('botdev:price_4_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t('botdev:price_4_desc')}</p>
                <div className="text-3xl font-bold text-primary mb-6">${t('botdev:price_4_amount')}</div>
                <Link href="/contact" className="block text-center px-6 py-3 bg-primary hover:bg-primary-dark transition-colors text-white rounded-lg font-medium">
                  {t('botdev:get_started')}
                </Link>
              </div>
              
              {/* Price 5 */}
              <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('botdev:price_5_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t('botdev:price_5_desc')}</p>
                <div className="text-3xl font-bold text-primary mb-6">${t('botdev:price_5_amount')}</div>
                <Link href="/contact" className="block text-center px-6 py-3 bg-primary hover:bg-primary-dark transition-colors text-white rounded-lg font-medium">
                  {t('botdev:get_started')}
                </Link>
              </div>
              
              {/* Price 6 */}
              <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('botdev:price_6_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{t('botdev:price_6_desc')}</p>
                <div className="text-3xl font-bold text-primary mb-6">${t('botdev:price_6_amount')}</div>
                <Link href="/contact" className="block text-center px-6 py-3 bg-primary hover:bg-primary-dark transition-colors text-white rounded-lg font-medium">
                  {t('botdev:get_started')}
                </Link>
              </div>
            </div>

            {/* Additional Services */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8 text-center dark:text-white">{t('botdev:additional_services_title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Additional Service 1 */}
                <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                  <h4 className="text-xl font-semibold mb-2 dark:text-white">{t('botdev:additional_1_title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t('botdev:additional_1_desc')}</p>
                  <div className="text-2xl font-bold text-primary">${t('botdev:additional_1_amount')}</div>
                </div>
                
                {/* Additional Service 2 */}
                <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                  <h4 className="text-xl font-semibold mb-2 dark:text-white">{t('botdev:additional_2_title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t('botdev:additional_2_desc')}</p>
                  <div className="text-2xl font-bold text-primary">${t('botdev:additional_2_amount')}</div>
                </div>
                
                {/* Additional Service 3 */}
                <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-light-border dark:border-dark-border">
                  <h4 className="text-xl font-semibold mb-2 dark:text-white">{t('botdev:additional_3_title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t('botdev:additional_3_desc')}</p>
                  <div className="text-2xl font-bold text-primary">${t('botdev:additional_3_amount')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-dark-bg dark:bg-dark-bg text-white">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/15 blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('botdev:cta_title')}</h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-8">{t('botdev:cta_description')}</p>
            <Link href="/contact" className="inline-block px-8 py-3 bg-primary hover:bg-primary-dark transition-colors rounded-full font-medium">
              {t('botdev:contact_us')}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const translations = await serverSideTranslations(locale, ['common', 'botdev']);
  
  return {
    props: {
      ...translations,
      footerVariant: 'design1'
    },
  };
}; 