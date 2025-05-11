import Script from 'next/script';
import { useEffect } from 'react';

interface HotjarProps {
  hotjarId: string | number;
  hotjarVersion?: number;
}

const Hotjar = ({ hotjarId = 5347229, hotjarVersion = 6 }: HotjarProps) => {
  // Используем хук useEffect вместо Script для полного контроля загрузки Hotjar
  useEffect(() => {
    // Проверяем, что мы в браузере
    if (typeof window === 'undefined') return;
    
    // Создаем элемент script вручную
    const initHotjar = () => {
      // Проверяем, не загружался ли скрипт ранее
      if ((window as any).hj) return;
      
      // Добавляем хотяр объект в window
      (window as any).hj = (window as any).hj || function() {
        ((window as any).hj.q = (window as any).hj.q || []).push(arguments);
      };
      (window as any)._hjSettings = {
        hjid: hotjarId,
        hjsv: hotjarVersion
      };
      
      // Создаем и добавляем скрипт с низким приоритетом
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = `https://static.hotjar.com/c/hotjar-${hotjarId}.js?sv=${hotjarVersion}`;
      
      // Установим атрибуты для низкого приоритета
      script.setAttribute('importance', 'low');
      script.setAttribute('fetchpriority', 'low');
      
      // Добавляем небольшую задержку для загрузки скрипта
      setTimeout(() => {
        document.head.appendChild(script);
      }, 3000); // 3 секунды задержки
    };
    
    // Проверяем, завершилась ли загрузка главного контента
    if (document.readyState === 'complete') {
      initHotjar();
    } else {
      // Иначе ждем завершения загрузки
      window.addEventListener('load', initHotjar, { once: true });
    }
    
    return () => {
      window.removeEventListener('load', initHotjar);
    };
  }, [hotjarId, hotjarVersion]);

  return null; // Ничего не рендерим
};

export default Hotjar;
