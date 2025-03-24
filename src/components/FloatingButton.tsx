'use client';

import { memo, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const FloatingButton = memo(() => {
  const { t } = useTranslation('common');
  const [isExpanded, setIsExpanded] = useState(false);
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
      {/* Выезжающая кнопка */}
      <div 
        className={`transform transition-all duration-300 ease-in-out ${isExpanded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        aria-hidden={!isExpanded}
      >
        <Link 
          href="/contact" 
          className="btn btn-primary shadow-lg hover:shadow-xl mr-3"
          style={{ willChange: 'transform' }}
          aria-label={t('get_started')}
        >
          {t('get_started')}
        </Link>
      </div>
      
      {/* Стрелка для переключения */}
      <button 
        onClick={toggleExpand} 
        className={`w-10 h-10 flex items-center justify-center text-white rounded-l-lg shadow-lg overflow-hidden relative transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,90,0,0.6)] ${!hasPulsed ? 'animate-pulse' : ''}`}
        style={{
          position: 'relative',
          background: 'linear-gradient(90deg, #ff5a00, #ff2d55)',
          zIndex: 1,
          overflow: 'hidden'
        }}
        aria-label={isExpanded ? t('floating_button.hide') : t('floating_button.show')}
      >
        {/* Светящийся эффект для кнопки как в btn-primary */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            content: '""',
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: 'linear-gradient(90deg, #ff5a00, #ff0000, #ff5a00)',
            backgroundSize: '200% 100%',
            borderRadius: '10px',
            zIndex: -1,
            animation: 'movingBorder 2s infinite linear'
          }}
        />
        
        {/* Светящийся эффект */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-50%',
                right: '-50%',
                bottom: 0,
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
                width: '50%',
                height: '100%',
                transform: 'skewX(-30deg)',
                animation: 'borderLight 3s infinite linear',
                zIndex: 2
              }}
            />
          </div>
        </div>
        
        {/* Стрелка */}
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