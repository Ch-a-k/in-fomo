import { useState, useEffect } from 'react';
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

const CookieConsent = () => {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
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
    // Проверяем, есть ли согласие и не истек ли срок его действия
    const hasValidConsent = !isItemExpired(COOKIE_CONSENT_KEY, EXPIRATION.HOUR);
    
    // Показываем баннер только если согласие не дано или истек срок действия
    setIsVisible(!hasValidConsent);
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

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1a1a1a] border-t border-light-border dark:border-dark-border shadow-lg animate-slideUp`}>
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
          <div className="flex flex-row justify-center w-full md:w-auto gap-3">
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
    </div>
  );
};

export default CookieConsent; 