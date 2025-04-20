import { useTranslation } from 'next-i18next';
import { useEffect, useState, memo } from 'react';
import Script from 'next/script';

const Awards = memo(() => {
  const { t, i18n } = useTranslation('home');
  const [mounted, setMounted] = useState(false);

  // Устанавливаем флаг монтирования для SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Проверяем, загружены ли переводы
  const hasTranslations = i18n.isInitialized && i18n.hasResourceBundle(i18n.language, 'home');
  
  const awardBadges = [
    {
      id: 1,
      src: "https://shareables.clutch.co/share/badges/2459746/108719?utm_source=clutch_top_company_badge&utm_medium=image_embed",
      title: "Top Clutch Smart Contract Auditing Company Poland 2025"
    },
    {
      id: 2,
      src: "https://shareables.clutch.co/share/badges/2459746/46165?utm_source=clutch_top_company_badge&utm_medium=image_embed",
      title: "Top Clutch Metaverse Development Company Poland 2025"
    },
    {
      id: 3,
      src: "https://shareables.clutch.co/share/badges/2459746/110896?utm_source=clutch_top_company_badge&utm_medium=image_embed",
      title: "Top Clutch Tokenization Company Poland 2025"
    },
    {
      id: 4,
      src: "https://shareables.clutch.co/share/badges/2459746/125298?utm_source=clutch_top_company_badge&utm_medium=image_embed",
      title: "Top Clutch Decentralized Finance Company Poland 2025"
    },
    {
      id: 5,
      src: "https://shareables.clutch.co/share/badges/2459746/99779?utm_source=clutch_top_company_badge&utm_medium=image_embed",
      title: "Top Clutch Web Design Company Gambling Poland"
    },
    {
      id: 6,
      src: "https://shareables.clutch.co/share/badges/2459746/116103?utm_source=clutch_top_company_badge&utm_medium=image_embed",
      title: "Top Clutch Smart Contract Auditing Company Warsaw 2025"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-light-bg dark:bg-dark-bg py-12 md:py-20">
      {/* Декоративный фон */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-2xl"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 rounded-full bg-primary/5 blur-2xl"></div>
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-primary/10 blur-2xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>
      
      {/* Основной контент */}
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          {/* Левая колонка: заголовок, описание и виджет */}
          <div className="lg:w-1/2 lg:sticky lg:top-24">
            {/* Заголовок секции */}
            <div className="text-left mb-8">
              <div className="inline-block px-6 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                {hasTranslations ? t('our_awards') : 'Наши награды'}
              </div>
              
              <h2 className="text-3xl font-bold sm:text-4xl mb-4">
                {hasTranslations ? t('our_awards') : 'Наши награды и признания'}
              </h2>
              
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                {hasTranslations ? t('awards_description') : 'Мы гордимся признанием нашей работы в различных областях блокчейн-разработки и веб-дизайна, что подтверждено многочисленными наградами от Clutch.'}
              </p>
            </div>
            
            {/* Виджет Clutch и призыв к действию */}
            <div className="mt-8">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6">
                {hasTranslations ? t('clutch_widget_description') : 'Ознакомьтесь с нашими отзывами и рейтингом на Clutch - платформе, которая помогает компаниям находить лучших партнеров для своих проектов.'}
              </p>
              
              <div className="flex mb-8">
                <div 
                  className="clutch-widget" 
                  data-url="https://widget.clutch.co" 
                  data-widget-type="1" 
                  data-height="40" 
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
              
              <a 
                href="https://clutch.co/profile/fomo-labs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
              >
                {hasTranslations ? t('view_clutch_profile') : 'Посмотреть наш профиль на Clutch'}
              </a>
            </div>
          </div>
          
          {/* Правая колонка: стопка с наградами */}
          <div className="lg:w-1/2">
            <div className="h-[500px] relative lg:ml-auto lg:mr-8">
              {awardBadges.map((badge, index) => (
                <div 
                  key={badge.id} 
                  className="absolute transition-all duration-300 hover:z-50 hover:-translate-y-6 cursor-pointer"
                  style={{ 
                    top: `${index * 15}px`, 
                    zIndex: awardBadges.length - index,
                    transform: `translateX(${index * 5}px) rotate(${index * 1.5}deg)`
                  }}
                >
                  <iframe 
                    width="360" 
                    height="360" 
                    src={badge.src} 
                    title={badge.title}
                    className="border-0 shadow-lg"
                    style={{ background: 'transparent' }}
                  ></iframe>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Awards.displayName = 'Awards';

export default Awards; 