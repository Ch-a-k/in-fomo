import { useTranslation } from 'next-i18next';
import { useEffect, useState, memo, useRef, MouseEvent, TouchEvent } from 'react';
import Script from 'next/script';
import Image from 'next/image';

const Awards = memo(() => {
  const { t, i18n } = useTranslation('home');
  const [mounted, setMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Устанавливаем флаг монтирования для SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Проверяем, загружены ли переводы
  const hasTranslations = i18n.isInitialized && i18n.hasResourceBundle(i18n.language, 'home');
  
  const awardBadges = [
    {
      id: 1,
      src: "/images/badges/badge_1.png",
      title: "Top Clutch Smart Contract Auditing Company Poland 2025"
    },
    {
      id: 2,
      src: "/images/badges/badge_2.png",
      title: "Top Clutch Metaverse Development Company Poland 2025"
    },
    {
      id: 3,
      src: "/images/badges/badge_3.png",
      title: "Top Clutch Tokenization Company Poland 2025"
    },
    {
      id: 4,
      src: "/images/badges/badge_4.png",
      title: "Top Clutch Decentralized Finance Company Poland 2025"
    },
    {
      id: 5,
      src: "/images/badges/badge_5.png",
      title: "Top Clutch Web Design Company Gambling Poland"
    },
    {
      id: 6,
      src: "/images/badges/badge_6.png",
      title: "Top Clutch Smart Contract Auditing Company Warsaw 2025"
    },
    {
      id: 7,
      src: "/images/badges/badge_7.png",
      title: "Top Clutch Development Company Poland"
    },
    {
      id: 8,
      src: "/images/badges/badge_8.png", 
      title: "Top Clutch Blockchain Development Company Poland"
    },
    {
      id: 9,
      src: "/images/badges/badge_9.png",
      title: "Top Clutch Software Development Company Poland"
    }
  ];

  // Дублируем баджи для бесконечной бегущей строки
  const duplicatedBadges = [...awardBadges, ...awardBadges, ...awardBadges];

  // Обработчик начала перетаскивания мышью
  const handleMouseDown = (e: MouseEvent) => {
    if (!marqueeRef.current) return;
    
    setIsDragging(true);
    setIsAutoScrollPaused(true);
    setStartX(e.pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);
  };

  // Обработчик движения мыши при перетаскивании
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Множитель скорости прокрутки
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  // Обработчик окончания перетаскивания мышью
  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Возобновляем автоскролл через небольшую задержку
    setTimeout(() => {
      setIsAutoScrollPaused(false);
    }, 1000);
  };

  // Обработчик начала перетаскивания касанием
  const handleTouchStart = (e: TouchEvent) => {
    if (!marqueeRef.current) return;
    
    setIsDragging(true);
    setIsAutoScrollPaused(true);
    setStartX(e.touches[0].pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);
  };

  // Обработчик движения при перетаскивании касанием
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    
    const x = e.touches[0].pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  // Обработчик окончания перетаскивания касанием
  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Возобновляем автоскролл через небольшую задержку
    setTimeout(() => {
      setIsAutoScrollPaused(false);
    }, 1000);
  };

  return (
    <section className="py-16 md:py-20 bg-light-bg dark:bg-dark-bg overflow-hidden">
      <div className="container mx-auto">
        {/* Заголовок секции */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-6 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            {hasTranslations ? t('our_awards') : 'Наши награды'}
          </div>
          
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            {hasTranslations ? t('our_awards_title') : 'Наши награды и признания'}
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            {hasTranslations ? t('awards_description') : 'Мы с гордостью демонстрируем нашу экспертизу и высокое качество услуг, отмеченные престижными наградами от Clutch - ведущей платформы для оценки и отзывов о B2B компаниях. Наши награды в областях блокчейн-разработки, смарт-контрактов, токенизации и DeFi подтверждают нашу позицию как одного из лидеров индустрии в Польше и Варшаве.'}
          </p>
          
          {/* Виджет Clutch после заголовка */}
          <div className="flex justify-center mt-8 mb-8">
            <div 
              className="clutch-widget" 
              data-url="https://widget.clutch.co" 
              data-widget-type="14" 
              data-height="50" 
              data-nofollow="true" 
              data-expandifr="true" 
              data-scale="100" 
              data-clutchcompany-id="2459746">
            </div>
            <Script 
              type="text/javascript" 
              src="https://widget.clutch.co/static/js/widget.js" 
              strategy="afterInteractive"
            />
          </div>
        </div>
      </div>

      {/* Бегущая строка с наградами */}
      <div className="relative w-full overflow-hidden">
        {/* Градиент слева */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-light-bg dark:from-dark-bg to-transparent z-10"></div>
        
        {/* Градиент справа */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-light-bg dark:from-dark-bg to-transparent z-10"></div>
        
        {/* Контейнер для бегущей строки с поддержкой перетаскивания */}
        <div 
          ref={containerRef}
          className="marquee-container cursor-grab"
          onMouseLeave={handleMouseUp}
        >
          <div 
            ref={marqueeRef}
            className={`marquee ${isAutoScrollPaused ? 'pause-animation' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {duplicatedBadges.map((badge, index) => (
              <div 
                key={`${badge.id}-${index}`} 
                className="mx-4 inline-block"
                style={{ verticalAlign: 'middle' }}
              >
                <Image 
                  src={badge.src}
                  alt={badge.title}
                  width={240}
                  height={240}
                  className="object-contain transition-transform hover:scale-105"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Виджет Clutch и призыв к действию */}
      <div className="container mx-auto mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6">
            {hasTranslations ? t('clutch_widget_description') : 'Ознакомьтесь с отзывами наших клиентов на Clutch. Наш высокий рейтинг и положительные отзывы отражают нашу приверженность к качеству и удовлетворению потребностей клиентов.'}
          </p>
          
          <a 
            href="https://clutch.co/profile/fomo-0" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
          >
            {hasTranslations ? t('view_clutch_profile') : 'Посмотреть наш профиль на Clutch'}
          </a>
        </div>
      </div>

      {/* CSS для бегущей строки с поддержкой перетаскивания */}
      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          -webkit-overflow-scrolling: touch;
        }
        
        .marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
          cursor: grab;
          overflow-x: auto;
          scrollbar-width: none; /* Для Firefox */
          -ms-overflow-style: none; /* Для IE и Edge */
        }
        
        .marquee::-webkit-scrollbar {
          display: none; /* Для Chrome, Safari и Opera */
        }
        
        .marquee.pause-animation {
          animation-play-state: paused;
        }
        
        .marquee:active {
          cursor: grabbing;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none;
          }
        }
      `}</style>

      {/* Добавляем глобальные стили для баджей Clutch */}
      <style jsx global>{`
        .clutch-widget iframe,
        iframe[title*="Clutch"] {
          background: transparent !important;
        }
        
        /* Убираем фон у всех iframe от Clutch */
        iframe[src*="clutch.co"] {
          background-color: transparent !important;
          border: none !important;
        }
      `}</style>
    </section>
  );
});

Awards.displayName = 'Awards';

export default Awards;
