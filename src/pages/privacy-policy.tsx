import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export default function PrivacyPolicy() {
  const { t } = useTranslation(['privacy', 'common']);
  const { theme } = useTheme();

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
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              {t('hero.badge')}
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              {t('hero.title')}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('hero.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 bg-light-surface dark:bg-dark-surface">
        <div className="container max-w-7xl mx-auto px-4 space-y-12">
          {/* Introduction */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.introduction.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('sections.introduction.content')}</p>
            </motion.div>
          </motion.div>

          {/* Information We Collect */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.information.title')}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{t('sections.information.content')}</p>
              <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                {[0, 1, 2, 3, 4].map((index) => (
                  <li key={index} className="pl-4">{t(`sections.information.items.${index}`)}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* How We Use Your Information */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.usage.title')}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{t('sections.usage.content')}</p>
              <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                {[0, 1, 2, 3].map((index) => (
                  <li key={index} className="pl-4">{t(`sections.usage.items.${index}`)}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Cookies */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.cookies.title')}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{t('sections.cookies.content')}</p>
              <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                {[0, 1, 2].map((index) => (
                  <li key={index} className="pl-4">{t(`sections.cookies.items.${index}`)}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Grid of Additional Sections */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Security */}
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.security.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('sections.security.content')}</p>
            </motion.div>

            {/* Third Party */}
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.thirdParty.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('sections.thirdParty.content')}</p>
            </motion.div>
          </motion.div>

          {/* Your Rights */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.rights.title')}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{t('sections.rights.content')}</p>
              <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <li key={index} className="pl-4">{t(`sections.rights.items.${index}`)}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Grid of Final Sections */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Updates */}
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.updates.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('sections.updates.content')}</p>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants} className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('sections.contact.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('sections.contact.content')}</p>
            </motion.div>
          </motion.div>

          {/* Last Updated */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }}
            className="text-center"
          >
            <motion.p variants={itemVariants} className="text-gray-500 dark:text-gray-400">
              {t('lastUpdated')}
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['privacy', 'common'])),
    },
  };
};