import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

interface JobPosition {
  key: string;
  title: string;
  description: string;
  requirements: string[];
  compensation: string;
}

const SalesCareersSection: React.FC = () => {
  const { t } = useTranslation(['contact']);
  const [activeTab, setActiveTab] = useState('salesRep');

  // Get requirements from translation file and convert to string[]
  const salesRepRequirements = t('salesCareers.positions.salesRep.requirements', { returnObjects: true }) as unknown as string[];
  const salesManagerRequirements = t('salesCareers.positions.salesManager.requirements', { returnObjects: true }) as unknown as string[];
  const accountManagerRequirements = t('salesCareers.positions.accountManager.requirements', { returnObjects: true }) as unknown as string[];

  // Benefits list
  const benefits = t('salesCareers.benefits.items', { returnObjects: true }) as unknown as string[];

  // List of positions to display - allows for easy future expansion
  const positions: JobPosition[] = [
    {
      key: 'salesRep',
      title: t('salesCareers.positions.salesRep.title'),
      description: t('salesCareers.positions.salesRep.description'),
      requirements: salesRepRequirements,
      compensation: t('salesCareers.positions.salesRep.compensation')
    },
    {
      key: 'salesManager',
      title: t('salesCareers.positions.salesManager.title'),
      description: t('salesCareers.positions.salesManager.description'),
      requirements: salesManagerRequirements,
      compensation: t('salesCareers.positions.salesManager.compensation')
    },
    {
      key: 'accountManager',
      title: t('salesCareers.positions.accountManager.title'),
      description: t('salesCareers.positions.accountManager.description'),
      requirements: accountManagerRequirements,
      compensation: t('salesCareers.positions.accountManager.compensation')
    }
  ];

  const activePosition = positions.find(pos => pos.key === activeTab) || positions[0];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50/50 dark:from-black dark:to-[#1a0800]">
      <div className="container mx-auto px-4 relative">
        {/* Декоративные элементы */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#FF5a00]/10 dark:bg-[#FF5a00]/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500/10 dark:bg-orange-500/15 blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-3xl"></div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <span className="inline-block px-4 py-1.5 bg-[#FF5a00]/10 text-[#FF5a00] text-sm font-medium rounded-full mb-4">
            {t('salesCareers.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
            {t('salesCareers.subtitle')}
          </h2>
          <p className="text-lg text-black/70 dark:text-white/80">
            {t('salesCareers.description')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-12 border-b border-orange-100 dark:border-orange-900/30">
            {positions.map((position) => (
              <button
                key={position.key}
                onClick={() => setActiveTab(position.key)}
                className={`relative px-6 py-4 text-base font-medium transition-colors ${
                  activeTab === position.key
                    ? 'text-[#FF5a00]'
                    : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                }`}
              >
                {position.title}
                {activeTab === position.key && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5a00]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          >
            {/* Left Column - Job Info */}
            <div className="lg:col-span-2 bg-white/70 dark:bg-black/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-orange-100/70 dark:border-orange-900/30 relative overflow-hidden">


              
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                {activePosition.title}
              </h3>
              
              <div className="mb-6">
                <p className="text-black/70 dark:text-white/80 mb-4">
                  {activePosition.description}
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-black dark:text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#FF5a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {t('salesCareers.requirements')}
                </h4>
                <ul className="space-y-3">
                  {activePosition.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-3 mt-1 bg-[#FF5a00]/10 text-[#FF5a00] rounded-full">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <span className="text-black/70 dark:text-white/80">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Right Column - Apply Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white to-orange-50 dark:from-black dark:to-[#1a0800] border border-orange-100/70 dark:border-orange-900/30 rounded-2xl p-8 sticky top-24 backdrop-blur-sm shadow-xl">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-black dark:text-white mb-1">
                    {t('salesCareers.compensation')}
                  </h4>
                  <div className="text-[#FF5a00] font-bold text-2xl mb-4">
                    {activePosition.compensation}
                  </div>
                  <p className="text-black/70 dark:text-white/80 mb-6">
                    {t('salesCareers.howToApply')}
                  </p>
                  <a 
                    href="#careers-form" 
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-[#FF5a00] hover:bg-[#FF5a00]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5a00] transition-colors"
                  >
                    {t('salesCareers.applyNow')}
                  </a>
                </div>
                
                <div className="border-t border-orange-200 dark:border-orange-900/30 pt-6">
                  <h5 className="font-medium text-black dark:text-white mb-3">{t('salesCareers.benefits.title')}:</h5>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-black/70 dark:text-white/80 text-sm">
                        <svg className="w-4 h-4 mr-2 text-[#FF5a00]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SalesCareersSection; 