/**
 * Awards.tsx
 * 
 * Компонент отображения наград и достижений компании на сайте.
 * Отображает награды в виде горизонтальной бегущей строки с эффектом бесконечной прокрутки.
 * Поддерживает мультиязычность через систему i18n (next-i18next).
 * 
 * @version 2.3.0
 * @author IN-FOMO Team
 */

import { useTranslation } from 'next-i18next';
import { memo, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';

const Awards = memo(() => {
  // Инициализируем переводы из пространства имен 'home'
  const { t, i18n } = useTranslation('home');
  // Ссылка для доступа к DOM-элементу скролла
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Проверяем, загружены ли переводы
  const hasTranslations = i18n.isInitialized && i18n.hasResourceBundle(i18n.language, 'home');
  
  /**
   * Массив наград с индивидуальными параметрами
   * - id: уникальный идентификатор награды
   * - src: путь к изображению награды
   * - title: заголовок награды (с поддержкой i18n)
   * - description: краткое описание награды (с поддержкой i18n)
   * 
   * Важно: порядок наград в этом массиве синхронизирован с ключами локализации
   */
  const awards = [
    // Награда 1: UX компания для некоммерческого сектора Польши
    { 
      id: 1, 
      src: "/images/badges/badge_1.png", 
      title: hasTranslations ? t('award_ux_company_np_poland_title') : "Top User Experience Company (Non-profit Poland)",
      description: hasTranslations ? t('award_ux_company_np_poland_desc') : "Recognized for excellence in user experience design for non-profit organizations in Poland" 
    },
    // Награда 2: Цифровой дизайн для некоммерческого сектора Варшавы
    { 
      id: 2, 
      src: "/images/badges/badge_2.png", 
      title: hasTranslations ? t('award_digital_design_np_warsaw_title') : "Top Digital Design Company (Non-profit Warsaw)",
      description: hasTranslations ? t('award_digital_design_np_warsaw_desc') : "Leading digital design services for non-profit sector in Warsaw" 
    },
    // Награда 3: Веб-дизайн для игорной индустрии Польши
    { 
      id: 3, 
      src: "/images/badges/badge_3.png", 
      title: hasTranslations ? t('award_web_design_gambling_poland_title') : "Top Web Design Company (Gambling Poland)",
      description: hasTranslations ? t('award_web_design_gambling_poland_desc') : "Best in web design for gambling industry in Poland" 
    },
    // Награда 4: Веб-дизайн для некоммерческого сектора Польши
    { 
      id: 4, 
      src: "/images/badges/badge_4.png", 
      title: hasTranslations ? t('award_web_design_np_poland_title') : "Top Web Design Company (Non-profit Poland)",
      description: hasTranslations ? t('award_web_design_np_poland_desc') : "Leading web design services for non-profit organizations across Poland" 
    },
    // Награда 5: Блокчейн-компания для пищевой отрасли 2025
    { 
      id: 5, 
      src: "/images/badges/badge_5.png", 
      title: hasTranslations ? t('award_blockchain_food_beverage_title') : "Top Blockchain Company (Food & Beverage 2025)",
      description: hasTranslations ? t('award_blockchain_food_beverage_desc') : "Leading blockchain solutions provider for food & beverage industry in 2025" 
    },
    // Награда 6: Цифровой дизайн для некоммерческого сектора Польши
    { 
      id: 6, 
      src: "/images/badges/badge_6.png", 
      title: hasTranslations ? t('award_digital_design_np_poland_title') : "Top Digital Design Company (Non-profit Poland)",
      description: hasTranslations ? t('award_digital_design_np_poland_desc') : "Leading provider of digital design services for non-profit sector in Poland" 
    },
    // Награда 7: Аудит смарт-контрактов в Польше 2025
    { 
      id: 7, 
      src: "/images/badges/badge_7.png", 
      title: hasTranslations ? t('award_smart_contract_poland_2025_title') : "Top Smart Contract Auditing Company (Poland 2025)",
      description: hasTranslations ? t('award_smart_contract_poland_2025_desc') : "Leading smart contract auditing services across Poland for 2025" 
    },
    // Награда 8: Аудит смарт-контрактов в Варшаве 2025
    { 
      id: 8, 
      src: "/images/badges/badge_8.png", 
      title: hasTranslations ? t('award_smart_contract_warsaw_2025_title') : "Top Smart Contract Auditing Company (Warsaw 2025)",
      description: hasTranslations ? t('award_smart_contract_warsaw_2025_desc') : "Leading smart contract auditing services in Warsaw region for 2025" 
    },
    // Награда 9: Токенизация в Варшаве 2025
    { 
      id: 9, 
      src: "/images/badges/badge_9.png", 
      title: hasTranslations ? t('award_tokenization_warsaw_2025_title') : "Top Tokenization Company (Warsaw 2025)",
      description: hasTranslations ? t('award_tokenization_warsaw_2025_desc') : "Expert in asset tokenization technologies in Warsaw for 2025" 
    },
    // Награда 10: UX компания для некоммерческого сектора Варшавы
    { 
      id: 10, 
      src: "/images/badges/badge_10.png", 
      title: hasTranslations ? t('award_ux_company_np_warsaw_title') : "Top User Experience Company (Non-profit Warsaw)",
      description: hasTranslations ? t('award_ux_company_np_warsaw_desc') : "Recognized for excellence in user experience design for non-profit organizations in Warsaw" 
    },
    // Награда 11: Децентрализованные финансы в Польше 2025
    { 
      id: 11, 
      src: "/images/badges/badge_11.png", 
      title: hasTranslations ? t('award_defi_poland_2025_title') : "Top Decentralized Finance Company (Poland 2025)",
      description: hasTranslations ? t('award_defi_poland_2025_desc') : "Leading provider of decentralized finance solutions across Poland for 2025" 
    },
    // Награда 12: Веб-разработчики для игорной индустрии Польши
    { 
      id: 12, 
      src: "/images/badges/badge_12.png", 
      title: hasTranslations ? t('award_web_dev_gambling_poland_title') : "Top Web Developers (Gambling Poland)",
      description: hasTranslations ? t('award_web_dev_gambling_poland_desc') : "Recognized as top web development team for gambling industry in Poland" 
    },
    // Награда 13: Разработка метавселенной в Польше 2025
    { 
      id: 13, 
      src: "/images/badges/badge_13.png", 
      title: hasTranslations ? t('award_metaverse_poland_2025_title') : "Top Metaverse Development Company (Poland 2025)",
      description: hasTranslations ? t('award_metaverse_poland_2025_desc') : "Leading innovator in metaverse development solutions across Poland for 2025" 
    },
    // Награда 14: Токенизация в Польше 2025
    { 
      id: 14, 
      src: "/images/badges/badge_14.png", 
      title: hasTranslations ? t('award_tokenization_poland_2025_title') : "Top Tokenization Company (Poland 2025)",
      description: hasTranslations ? t('award_tokenization_poland_2025_desc') : "Expert in asset tokenization technologies across Poland for 2025" 
    },
    // Награда 15: Децентрализованные финансы в Варшаве 2025
    { 
      id: 15, 
      src: "/images/badges/badge_15.png", 
      title: hasTranslations ? t('award_defi_warsaw_2025_title') : "Top Decentralized Finance Company (Warsaw 2025)",
      description: hasTranslations ? t('award_defi_warsaw_2025_desc') : "Leading provider of decentralized finance solutions in Warsaw for 2025" 
    }
  ];

  // Примечание: не используем случайные награды, а показываем в порядке релевантности
  // для лучшей синхронизации картинок с текстом
  const displayAwards = awards.slice(0, 9);
  
  // Дублируем награды для создания эффекта бесконечной прокрутки
  const scrollAwards = [...displayAwards, ...displayAwards];

  return (
    <section className="py-6 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Левая колонка - заголовок и кнопка */}
          <div className="md:w-1/3 mb-4 md:mb-0 md:pr-8">
            {/* Метка категории с индикатором */}
            <div className="mb-2 text-xs font-medium text-primary inline-flex items-center">
              <span className="w-3 h-3 mr-1 bg-primary/20 rounded-full"></span>
              {hasTranslations ? t('our_awards') : 'Награды Clutch'}
            </div>
            
            {/* Основной заголовок секции */}
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              {hasTranslations ? t('our_awards_title') : 'Лидирующие позиции в рейтингах'}
            </h2>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Кнопка перехода на профиль Clutch */}
              <a 
                href="https://clutch.co/profile/fomo-0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary border border-primary/30 hover:bg-primary/20 rounded-lg transition-colors duration-200"
              >
                <span className="flex items-center">
                  {hasTranslations ? t('view_profile') : 'Посмотреть профиль'} 
                  <span className="relative w-16 h-4 ml-1 inline-block">
                    <Image
                      src="/images/badges/clutch.svg"
                      alt="Clutch"
                      fill
                      className="object-contain"
                    />
                  </span>
                </span>
                <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              {/* Добавляем стикер Clutch вместо звезд */}
              <div 
                className="clutch-widget" 
                data-url="https://widget.clutch.co" 
                data-widget-type="1" 
                data-height="40" 
                data-nofollow="true" 
                data-expandifr="true" 
                data-scale="100" 
                data-clutchcompany-id="2459746"
              ></div>
            </div>
          </div>
          
          {/* Правая колонка - награды в виде бегущей строки */}
          <div className="md:w-2/3 overflow-hidden relative">
            {/* Градиенты для мягкого исчезновения по краям (левый край) */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent dark:from-[#151515] dark:to-transparent border-l border-[#ff5a00] z-10"></div>
            {/* Градиенты для мягкого исчезновения по краям (правый край) */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent dark:from-[#151515] dark:to-transparent border-r border-[#ff5a00] z-10"></div>
            
            {/* Контейнер для бегущей строки с масками для плавного исчезновения */}
            <div className="awards-scroll-container overflow-hidden relative">
              {/* Сама бегущая строка с наградами */}
              <div ref={scrollRef} className="awards-scroll py-3 flex animated-scroll">
                {/* Маппинг элементов наград */}
                {scrollAwards.map((award, idx) => (
                  <div key={`${award.id}-${idx}`} className="award-item flex-shrink-0 mx-4 first:ml-0">
                    {/* Карточка награды со стилем основной кнопки */}
                    <div className="btn-hero-primary rounded-lg px-4 py-3 flex items-center h-32 w-96">
                      {/* Контейнер для изображения награды */}
                      <div className="relative w-24 h-24 flex-shrink-0 bg-white/20 rounded-full p-1.5">
                        <Image
                          src={award.src}
                          alt={award.title}
                          fill
                          className="object-contain"
                          sizes="96px"
                        />
                      </div>
                      
                      {/* Текстовая информация о награде */}
                      <div className="ml-4 flex flex-col overflow-hidden max-w-[240px]">
                        {/* Заголовок награды (ограничен одной строкой) */}
                        <div className="text-base font-medium text-white leading-tight whitespace-normal line-clamp-1">
                          {award.title}
                        </div>
                        {/* Описание награды (ограничено двумя строками) */}
                        <div className="text-sm text-white/80 leading-tight mt-1 whitespace-normal line-clamp-2">
                          {award.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Компактный виджет Clutch для отображения рейтинга */}
            <div className="mt-4 flex justify-end">
              <div 
                className="clutch-widget" 
                data-url="https://widget.clutch.co" 
                data-widget-type="14" 
                data-height="50" 
                data-nofollow="true" 
                data-expandifr="true" 
                data-scale="80" 
                data-clutchcompany-id="2459746">
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Стили для бегущей строки и виджета Clutch */}
      <style jsx>{`
        /* Маска для плавного исчезновения начала и конца бегущей строки */
        .awards-scroll-container {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent 100%);
        }
        
        /* Базовые стили для контейнера с наградами */
        .awards-scroll {
          white-space: nowrap;
          display: flex;
        }
        
        /* Анимация бесконечной прокрутки */
        .animated-scroll {
          animation: scroll-awards 10s linear infinite;
        }
        
        /* Стили для контейнера награды, отображаемого в стиле основной кнопки */
        .btn-hero-primary {
          background-color: var(--color-primary, #4338ca);
          color: white;
          box-shadow: 0 8px 16px -2px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.06);
          transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        
        /* Определение ключевых кадров анимации скролла */
        @keyframes scroll-awards {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Отключение анимации для пользователей, предпочитающих уменьшение движения */
        @media (prefers-reduced-motion: reduce) {
          .animated-scroll {
            animation: none;
          }
        }
      `}</style>
      
      {/* Глобальные стили для компонента */}
      <style jsx global>{`
        /* Стили для виджета Clutch */
        .clutch-widget iframe, iframe[src*="clutch.co"] {
          background: transparent !important;
          border: none !important;
        }
        
        /* Определение основного цвета сайта */
        :root {
          --color-primary: #ff5a00;
        }
        
        /* Стили для ограничения количества строк текста */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    
      {/* Скрипт для загрузки виджета Clutch */}
      <Script 
        type="text/javascript" 
        src="https://widget.clutch.co/static/js/widget.js" 
        strategy="afterInteractive"
      />
    </section>
  );
});

// Установка displayName для удобства отладки в React DevTools
Awards.displayName = 'Awards';

export default Awards;
