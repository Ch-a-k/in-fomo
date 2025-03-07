import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation('common');
  const router = useRouter();

  useEffect(() => {
    // Проверяем, было ли уже получено согласие
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    // Здесь можно добавить логику для отключения необязательных куки
  };

  const handleLearnMore = () => {
    router.push('/cookie-policy');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1a1a1a] border-t border-light-border dark:border-dark-border shadow-lg"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-heading mb-2">{t('cookie_consent.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {t('cookie_consent.description')}
                </p>
                <button
                  onClick={handleLearnMore}
                  className="text-primary hover:text-primary-dark text-sm underline transition-colors"
                >
                  {t('cookie_consent.learn_more')}
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDecline}
                  className="px-6 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {t('cookie_consent.decline')}
                </button>
                <button
                  onClick={handleAccept}
                  className="btn btn-primary"
                >
                  {t('cookie_consent.accept')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent; 