import { useTranslation } from 'next-i18next';
import { useEffect, useState, memo } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface Partner {
  name: string;
  id: number;
}

const Partners = memo(() => {
  const { t, i18n } = useTranslation('home');
  const { resolvedTheme } = useTheme();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [mounted, setMounted] = useState(false);

  // Устанавливаем флаг монтирования для SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Генерируем тестовый список партнеров
  useEffect(() => {
    const generateNumberedPartners = (count: number): Partner[] => {
      return Array.from({ length: count }, (_, i) => ({
        name: `Partner ${i + 1}`,
        id: i + 1
      }));
    };

    setPartners(generateNumberedPartners(21));
  }, []);

  // Получаем путь к логотипу в зависимости от темы
  const getPartnerLogoPath = (partnerId: number) => {
    if (!mounted || !resolvedTheme) {
      return `/images/partners/light/${partnerId}.svg`;
    }
    
    return resolvedTheme === 'dark' 
      ? `/images/partners/dark/${partnerId}.svg` 
      : `/images/partners/light/${partnerId}.svg`;
  };

  // Обработчик ошибки загрузки изображения
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, partnerName: string) => {
    if (e.currentTarget) {
      e.currentTarget.style.display = 'none';
    }

    const container = e.currentTarget?.parentElement;
    if (container) {
      const nameElement = document.createElement('div');
      nameElement.className = 'text-center text-sm font-medium text-gray-700 dark:text-gray-300';
      nameElement.textContent = partnerName;
      
      container.innerHTML = '';
      container.appendChild(nameElement);
    }
  };

  // Проверяем, загружены ли переводы
  const hasTranslations = i18n.isInitialized && i18n.hasResourceBundle(i18n.language, 'home');

  return (
    <section className="relative overflow-hidden bg-light-bg dark:bg-dark-bg py-12 md:py-20">
      {/* Декоративный фон */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-2xl"></div>
        <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-primary/5 blur-2xl"></div>
        <div className="absolute -bottom-32 left-1/2 w-80 h-80 rounded-full bg-primary/10 blur-2xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>
      
      {/* Основной контент */}
      <div className="container relative z-10">
        {/* Заголовок секции */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-block px-6 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            {hasTranslations ? t('our_partners') : 'Наши надежные партнеры'}
          </div>
          
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            {hasTranslations ? t('our_partners') : 'Наши надежные партнеры'}
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            {hasTranslations ? t('partners_description') : 'Мы сотрудничаем с ведущими компаниями из различных отраслей для предоставления инновационных решений, адаптированных к потребностям вашего бизнеса.'}
          </p>
        </div>
        
        {/* Сетка логотипов */}
        <div className="grid grid-cols-3 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7 gap-4 ">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="h-16 flex items-center justify-center p-2 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border hover:border-primary/30 transition-all"
            >
              {mounted ? (
                <Image 
                  src={getPartnerLogoPath(partner.id)}
                  alt={`${partner.name} logo`} 
                  width={48}
                  height={48}
                  className="w-auto h-[32px] transition-transform hover:scale-105"
                  onError={(e) => handleImageError(e, partner.name)}
                />
              ) : (
                <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  {partner.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Partners.displayName = 'Partners';

export default Partners;
