import { useState } from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

const FooterDemo = () => {
  const { t } = useTranslation('common');
  const [selectedDesign, setSelectedDesign] = useState<'design1' | 'design2'>('design1');

  return (
    <Layout footerVariant={selectedDesign} title={t('footer_demo')} description={t('footer_demo_description')}>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('footer_demo')}</h1>
        
        <div className="max-w-2xl mx-auto mb-16 bg-light-surface dark:bg-dark-surface p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">{t('select_footer_design')}</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedDesign('design1')}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  selectedDesign === 'design1'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                {t('design')} 1
              </button>
              
              <div className="flex-1">
                <h3 className="font-semibold">{t('design')} 1</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('design1_description', 'Spacious layout with clear section separation')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedDesign('design2')}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  selectedDesign === 'design2'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                {t('design')} 2
              </button>
              
              <div className="flex-1">
                <h3 className="font-semibold">{t('design')} 2</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('design2_description', 'Compact layout with inline elements')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center">
              {t('current_selection')}: <span className="font-semibold">{t('design')} {selectedDesign === 'design1' ? '1' : '2'}</span>
            </p>
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
              {t('scroll_down_to_view')}
            </p>
          </div>
        </div>
        
        <div className="h-[500px]">
          {/* Empty space to allow scrolling down to see the footer */}
        </div>
      </div>
    </Layout>
  );
};

export default FooterDemo;
