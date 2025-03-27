import { useState, useEffect, memo, useRef } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Функция для сохранения согласия с меткой времени
  const saveConsent = (value: string) => {
    // Сохраняем с меткой времени в правильном формате {value, timestamp}
    // setItemWithTimestamp ожидает объект, который потом обернет еще раз
    const consentValue = { 
      status: value,
      date: new Date().toISOString()
    };
    
    setItemWithTimestamp(COOKIE_CONSENT_KEY, consentValue);
    
    // Отслеживаем согласие для аналитики
    trackEvent({
      action: `cookie_consent_${value}`,
      category: 'user_preferences',
      label: value
    });
  };

  // Определяем устройство iOS для учета safe-area-inset
  const detectIOSDevice = () => {
    if (typeof window === 'undefined') return false;
    
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  useEffect(() => {
    setIsMounted(true);
    
    // Проверяем размер экрана и тип устройства
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 640);
      setIsIOSDevice(detectIOSDevice());
    };
    
    if (typeof window !== 'undefined') {
      checkDevice();
      window.addEventListener('resize', checkDevice);
    }
    
    // Проверяем, есть ли согласие и не истек ли срок его действия
    const hasValidConsent = !isItemExpired(COOKIE_CONSENT_KEY, EXPIRATION.HOUR);
    
    // Показываем баннер только если согласие не дано или истек срок действия
    // Увеличиваем задержку, чтобы снизить CLS и не мешать LCP
    const timer = setTimeout(() => {
      setIsVisible(!hasValidConsent);
      
      // Добавляем класс к body для создания отступа
      if (!hasValidConsent && typeof document !== 'undefined') {
        document.body.classList.add('has-cookie-consent');
        
        // Прокручиваем к верху cookie баннера для мобильных устройств
        if (isMobile && wrapperRef.current) {
          wrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    }, 2500);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkDevice);
      }
      clearTimeout(timer);
    };
  }, []);

  const handleAccept = () => {
    saveConsent('accepted');
    setIsVisible(false);
    // Удаляем класс с body
    if (typeof document !== 'undefined') {
      document.body.classList.remove('has-cookie-consent');
    }
  };

  const handleDecline = () => {
    saveConsent('declined');
    setIsVisible(false);
    // Удаляем класс с body
    if (typeof document !== 'undefined') {
      document.body.classList.remove('has-cookie-consent');
    }
  };

  const handleLearnMore = () => {
    // Сохраняем, что пользователь интересовался политикой
    saveConsent('viewed_policy');
    router.push('/cookie-policy');
    setIsVisible(false);
    // Удаляем класс с body
    if (typeof document !== 'undefined') {
      document.body.classList.remove('has-cookie-consent');
    }
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div 
      ref={wrapperRef}
      className={`cookie-consent-wrapper ${isMobile ? 'max-h-[40vh]' : ''} bg-white dark:bg-[#1a1a1a] border-t border-light-border dark:border-dark-border shadow-lg pointer-events-auto animate-slideUp`}
      style={{
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        contentVisibility: 'auto',
        contain: 'layout style',
        overflowY: 'auto',
        paddingBottom: isIOSDevice ? 'env(safe-area-inset-bottom, 10px)' : undefined
      }}
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
    >
      <div className={`container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6 ${isIOSDevice ? 'pb-safe' : ''}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
          <div className="flex-1 pointer-events-auto">
            <h3 id="cookie-title" className="text-base sm:text-lg font-heading mb-1 md:mb-2 text-gray-900 dark:text-white">
              {t('cookie_consent.title')}
            </h3>
            <p id="cookie-description" className="text-xs sm:text-sm text-gray-800 dark:text-gray-100 mb-2">
              {t('cookie_consent.description')}
            </p>
            <button
              onClick={handleLearnMore}
              className="text-primary hover:text-primary-dark text-xs sm:text-sm underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary mb-4 md:mb-0"
              aria-label={t('cookie_consent.learn_more_aria')}
            >
              {t('cookie_consent.learn_more')}
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center w-full md:w-auto gap-2 pointer-events-auto">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={t('cookie_consent.decline_aria')}
            >
              {t('cookie_consent.decline')}
            </button>
            <button
              onClick={handleAccept}
              className="btn btn-primary px-4 py-2 text-xs sm:text-sm font-medium w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
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