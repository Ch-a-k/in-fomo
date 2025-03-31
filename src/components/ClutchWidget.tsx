import { useEffect, useRef } from 'react';

const ClutchWidget = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Создаем скрипт
    const script = document.createElement('script');
    script.src = 'https://widget.clutch.co/static/js/widget.js';
    script.type = 'text/javascript';
    script.async = true;

    // Обработчик загрузки скрипта
    script.onload = () => {
      console.log('Clutch widget script loaded');
    };
    script.onerror = () => {
      console.error('Error loading Clutch widget script');
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      ref={widgetRef}
      className="clutch-widget"
      data-url="https://widget.clutch.co"
      data-widget-type="11"
      data-height="100"
      data-nofollow="true"
      data-expandifr="true"
      data-scale="100"
      data-clutchcompany-id="2459746"
      style={{ 
        minHeight: '100px', // Задаем минимальную высоту
        backgroundColor: 'transparent',
      }}
    />
  );
};

export default ClutchWidget;