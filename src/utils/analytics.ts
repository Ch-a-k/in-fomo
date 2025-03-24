// Расширяем глобальные типы для Window
declare global {
  interface Window {
    gtag: (command: string, params1: any, params2?: any) => void;
    dataLayer: any[];
  }
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface PageViewParams {
  path: string;
  title?: string;
}

// Типы для Google Analytics и GTM
type GTagEvent = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;  // Дополнительные параметры
};

/**
 * Отправляет событие в систему аналитики
 * @param eventData Данные события
 */
export const trackEvent = (eventData: AnalyticsEvent): void => {
  if (typeof window === 'undefined') return;

  try {
    // Google Analytics 4 (gtag.js)
    if (typeof window.gtag === 'function') {
      const eventParams: GTagEvent = {
        event_category: eventData.category,
        event_label: eventData.label,
        value: eventData.value
      };

      window.gtag('event', eventData.action, eventParams);
    }

    // Для Google Tag Manager
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: eventData.action,
        eventCategory: eventData.category,
        eventLabel: eventData.label,
        eventValue: eventData.value
      });
    }

    // Для целей отладки в консоли
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics event tracked:', eventData);
    }
  } catch (error) {
    // Пишем в консоль, не прерываем работу приложения
    console.error('Error tracking analytics event:', error);
  }
};

/**
 * Отслеживание просмотра страницы
 * @param params Параметры просмотра страницы
 */
export const trackPageView = (params: PageViewParams): void => {
  if (typeof window === 'undefined') return;

  try {
    // Google Analytics 4
    if (typeof window.gtag === 'function') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: params.path,
        page_title: params.title
      });
    }

    // Для Google Tag Manager
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: 'pageview',
        page: params.path,
        page_title: params.title
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Page view tracked:', params);
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

/**
 * Отслеживание конверсий (например, заполнение формы)
 * @param conversionId Идентификатор конверсии
 * @param value Значение конверсии (опционально)
 */
export const trackConversion = (conversionId: string, value?: number): void => {
  trackEvent({
    action: 'conversion',
    category: 'conversion',
    label: conversionId,
    value
  });
};

// Для обратной совместимости
export const event = trackEvent;

export default {
  trackEvent,
  trackPageView,
  trackConversion
}; 