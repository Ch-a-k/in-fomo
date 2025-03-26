import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { trackEvent } from '../utils/analytics';
import { 
  setItemWithTimestamp, 
  getItemWithExpiration, 
  isItemExpired,
  EXPIRATION 
} from '../utils/cookies';

// Константы для ключей хранилища
const COOKIE_CONSENT_KEY = 'cookieConsent';

const CookieConsent = memo(() => {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Функция для сохранения согласия с меткой времени
  const saveConsent = (value: string) => {
    // Сохраняем с меткой времени
    setItemWithTimestamp(COOKIE_CONSENT_KEY, value);
    
    // Отслеживаем согласие для аналитики
    trackEvent({
      action: `cookie_consent_${value}`,
      category: 'user_preferences',
      label: value
    });
  };

  useEffect(() => {
    setIsMounted(true);
    // Проверяем, есть ли согласие и не истек ли срок его действия
    const hasValidConsent = !isItemExpired(COOKIE_CONSENT_KEY, EXPIRATION.HOUR);
    
    // Показываем баннер только если согласие не дано или истек срок действия
    // Добавляем небольшую задержку для улучшения производительности при загрузке
    const timer = setTimeout(() => {
      setIsVisible(!hasValidConsent);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    saveConsent('accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    saveConsent('declined');
    setIsVisible(false);
    // Здесь можно добавить логику для отключения необязательных куки
  };

  const handleLearnMore = () => {
    // Сохраняем, что пользователь интересовался политикой
    saveConsent('viewed_policy');
    router.push('/cookie-policy');
    setIsVisible(false);
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-white dark:bg-[#1a1a1a] border-t border-light-border dark:border-dark-border shadow-lg pointer-events-auto"
      style={{
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        containIntrinsicSize: '0 200px',
        contentVisibility: 'auto'
      }}
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 pointer-events-auto">
            <h3 id="cookie-title" className="text-lg font-heading mb-2 text-gray-900 dark:text-white">
              {t('cookie_consent.title')}
            </h3>
            <p id="cookie-description" className="text-sm text-gray-800 dark:text-gray-100 mb-2">
              {t('cookie_consent.description')}
            </p>
            <button
              onClick={handleLearnMore}
              className="text-primary hover:text-primary-dark text-sm underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={t('cookie_consent.learn_more_aria')}
            >
              {t('cookie_consent.learn_more')}
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center w-full md:w-auto gap-3 pointer-events-auto">
            <button
              onClick={handleDecline}
              className="px-6 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={t('cookie_consent.decline_aria')}
            >
              {t('cookie_consent.decline')}
            </button>
            <button
              onClick={handleAccept}
              className="btn btn-primary w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={t('cookie_consent.accept_aria')}
            >
              {t('cookie_consent.accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

CookieConsent.displayName = 'CookieConsent';

export default CookieConsent; 