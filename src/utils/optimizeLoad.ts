/**
 * Утилиты для оптимизации загрузки ресурсов и улучшения метрик Web Vitals
 */

interface DeferLoadOptions {
  src: string;
  type?: string;
  importance?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
  delay?: number;
  async?: boolean;
  defer?: boolean;
}

/**
 * Загружает скрипт с задержкой после загрузки страницы и возможностью задать приоритет
 */
export const loadScriptDeferred = (options: DeferLoadOptions): void => {
  if (typeof window === 'undefined') return;

  const loadScript = () => {
    // Проверяем, существует ли уже скрипт с таким источником
    if (document.querySelector(`script[src="${options.src}"]`)) return;

    // Создаем скрипт
    const script = document.createElement('script');
    script.src = options.src;
    script.async = options.async !== false;
    script.defer = options.defer !== false;
    
    // Устанавливаем тип скрипта если указан
    if (options.type) {
      script.type = options.type;
    }
    
    // Устанавливаем приоритет загрузки
    if (options.importance) {
      script.setAttribute('fetchpriority', options.importance);
      script.setAttribute('importance', options.importance);
    }
    
    // Устанавливаем обработчик загрузки
    if (options.onLoad) {
      script.onload = options.onLoad;
    }
    
    // Добавляем скрипт в DOM
    document.head.appendChild(script);
  };

  // Определяем, когда загружать скрипт
  if (document.readyState === 'complete') {
    // Страница уже загружена, добавляем задержку
    setTimeout(loadScript, options.delay || 1000);
  } else {
    // Страница загружается, ждем ивент load
    window.addEventListener('load', () => {
      setTimeout(loadScript, options.delay || 1000);
    }, { once: true });
  }
};

/**
 * Загружает критические CSS инлайн и предзагружает шрифты
 */
export const optimizeCriticalResources = (): void => {
  if (typeof window === 'undefined') return;
  
  // Предзагрузка шрифтов, только если они еще не загружены
  const preloadFonts = () => {
    const fontUrls = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ];
    
    fontUrls.forEach(url => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        link.onload = () => {
          link.onload = null;
          link.rel = 'stylesheet';
        };
        document.head.appendChild(link);
      }
    });
  };
  
  // Определяем, когда загружать шрифты
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadFonts);
  } else {
    preloadFonts();
  }
};

/**
 * Отложенная загрузка изображений, которые находятся вне видимой области
 */
export const lazyLoadNonVisibleImages = (): void => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const dataSrc = img.getAttribute('data-src');
        
        if (dataSrc) {
          img.src = dataSrc;
          img.removeAttribute('data-src');
        }
        
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  
  // Наблюдаем за всеми изображениями с атрибутом data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });
};

/**
 * Приоритизирует загрузку ресурсов в зависимости от их видимости
 */
export const prioritizeCriticalAssets = (): void => {
  // Проверяем, поддерживаются ли необходимые API
  if (
    typeof window === 'undefined' || 
    !('IntersectionObserver' in window) ||
    !('requestIdleCallback' in window)
  ) return;
  
  // Находим элементы для загрузки на первом экране
  const lcpElements = document.querySelectorAll('.lcp, h1, h2, .hero-image, #hero-heading');
  
  // Устанавливаем высокий приоритет для LCP элементов
  lcpElements.forEach(element => {
    if (element instanceof HTMLElement) {
      element.setAttribute('fetchpriority', 'high');
    }
    
    // Если это контейнер с изображением
    const image = element.querySelector('img');
    if (image) {
      image.setAttribute('fetchpriority', 'high');
      image.setAttribute('loading', 'eager');
    }
  });
  
  // Отложенная загрузка низкоприоритетных ресурсов
  (window as any).requestIdleCallback(() => {
    // Загружаем скрипты аналитики и другие несрочные ресурсы
    const lowPriorityScripts = document.querySelectorAll('script[data-priority="low"]');
    lowPriorityScripts.forEach(script => {
      if (script instanceof HTMLScriptElement && !script.getAttribute('src')) {
        const src = script.getAttribute('data-src');
        if (src) {
          script.src = src;
        }
      }
    });
  }, { timeout: 2000 });
};

/**
 * Инициализирует все оптимизации загрузки
 */
export const initLoadOptimizations = (): void => {
  optimizeCriticalResources();
  
  if (document.readyState === 'complete') {
    lazyLoadNonVisibleImages();
    prioritizeCriticalAssets();
  } else {
    window.addEventListener('load', () => {
      lazyLoadNonVisibleImages();
      prioritizeCriticalAssets();
    });
  }
}; 