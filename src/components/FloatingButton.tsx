'use client';

import { memo, useState, useEffect, useRef } from 'react';
import KPIWidget from './KPIWidget';

const FloatingButton = memo(() => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hasPulsed, setHasPulsed] = useState(false);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  // Инициализируем аудио при первой загрузке компонента
  useEffect(() => {
    // Создаем аудио-элемент только на клиенте
    if (typeof window !== 'undefined') {
      clickSoundRef.current = new Audio('/sounds/click.mp3');
      clickSoundRef.current.volume = 0.3; // Уменьшаем громкость звука
    }
  }, []);

  // Эффект пульсации при первой загрузке
  useEffect(() => {
    const pulsateTimer = setTimeout(() => {
      setHasPulsed(true);
    }, 2000); // Запускаем через 2 секунды после загрузки

    return () => clearTimeout(pulsateTimer);
  }, []);

  const toggleExpand = () => {
    // Воспроизводим звук щелчка
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0; // Сбрасываем аудио на начало
      clickSoundRef.current.play().catch(e => console.log('Ошибка воспроизведения звука:', e));
    }
    
    setIsExpanded(!isExpanded);
    setHasPulsed(true); // После клика больше не пульсирует
  };

  return (
    <div className="fixed bottom-8 right-0 z-50 flex items-center">
      <div 
        className={`transform transition-all duration-300 ease-in-out ${isExpanded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        aria-hidden={!isExpanded}
      >
        <div className="mr-3">
          <KPIWidget />
        </div>
      </div>
      <button 
        onClick={toggleExpand} 
        className={`w-10 h-10 flex items-center justify-center text-white rounded-l-lg shadow-lg overflow-hidden relative transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,90,0,0.6)] ${!hasPulsed ? 'animate-pulse' : ''}`}
        style={{
          position: 'relative',
          background: 'linear-gradient(90deg, #ff5a00, #ff2d55)',
          zIndex: 1,
          overflow: 'hidden'
        }}
        aria-label={isExpanded ? 'Hide' : 'Show'}
        aria-expanded={isExpanded}
      >
        <svg 
          className={`w-5 h-5 text-white transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'} relative z-10`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
});

FloatingButton.displayName = 'FloatingButton';

export default FloatingButton; 