import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

const Hero = () => {
  const { t } = useTranslation('home');

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
        type: 'spring', 
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="container relative z-10 py-16 md:py-24 lg:py-32">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            {t('hero_badge')}
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="heading-1 mb-6">
            {t('hero_title_1')} <span className="text-primary">{t('hero_title_highlight')}</span> {t('hero_title_2')}
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mb-10 text-xl text-gray-600 dark:text-gray-300">
            {t('hero_description')}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <a href="#contact" className="btn btn-primary">
              {t('get_started')}
            </a>
            <a href="#services" className="btn btn-outline">
              {t('our_services')}
            </a>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {/* Trusted by logos */}
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-400 dark:text-gray-600 font-bold text-xl">Blastly bot</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-400 dark:text-gray-600 font-bold text-xl">Cats & Dogs</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-400 dark:text-gray-600 font-bold text-xl">Heimdal AI</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-400 dark:text-gray-600 font-bold text-xl">Memhash</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
