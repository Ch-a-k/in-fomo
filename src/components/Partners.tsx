import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface Partner {
  name: string;
  id: number;
}

// Компонент для отображения логотипов партнеров
// Поддерживает числовые имена файлов (1.svg, 2.svg, и т.д.)
const Partners = () => {
  const { t, ready } = useTranslation('home');
  const { resolvedTheme } = useTheme();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const generateNumberedPartners = (count: number): Partner[] => {
      return Array.from({ length: count }, (_, i) => ({
        name: `Partner ${i + 1}`,
        id: i + 1
      }));
    };

    setPartners(generateNumberedPartners(21));
  }, []);

  // Получаем путь к иконке в зависимости от текущей темы
  const getPartnerLogoPath = (partnerId: number) => {
    // Если компонент еще не смонтирован или тема не определена, возвращаем путь для светлой темы
    if (!mounted || !resolvedTheme) {
      return `/images/partners/light/${partnerId}.svg`;
    }
    
    // В зависимости от темы возвращаем путь к соответствующей иконке
    return resolvedTheme === 'dark' 
      ? `/images/partners/dark/${partnerId}.svg` 
      : `/images/partners/light/${partnerId}.svg`;
  };

  // Обработчик ошибки загрузки изображения
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, partnerName: string) => {
    // Безопасно скрываем изображение
    if (e.currentTarget) {
      e.currentTarget.style.display = 'none';
    }

    // Находим родительский контейнер и добавляем текст
    const container = e.currentTarget?.parentElement;
    if (container) {
      // Создаем новый элемент вместо изменения innerHTML
      const nameElement = document.createElement('div');
      nameElement.className = 'text-center font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300';
      nameElement.textContent = partnerName;
      
      // Очищаем контейнер и добавляем новый элемент
      container.innerHTML = '';
      container.appendChild(nameElement);
    }
  };

  return (
    <section className="relative overflow-hidden bg-light-bg dark:bg-dark-bg py-16 md:py-24">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/2 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        
        {/* Сетка */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
            {ready ? t('our_partners') : 'Наши надежные партнеры'}
          </div>
          
          <h2 className="heading-2 mb-4 animate-fade-in [animation-delay:200ms]">
            {ready ? t('our_partners') : 'Наши надежные партнеры'}
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in [animation-delay:400ms]">
            {ready ? t('partners_description') : 'Мы сотрудничаем с ведущими компаниями из различных отраслей для предоставления инновационных решений, адаптированных к потребностям вашего бизнеса.'}
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover-scale animate-fade-in"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative p-6 flex items-center justify-center h-24">
                <div className="transition-all duration-300">
                  {mounted ? (
                    <img 
                      src={getPartnerLogoPath(partner.id)}
                      alt={`${partner.name} logo`} 
                      width={40}
                      height={40}
                      className="max-h-12 max-w-full object-contain transition-all duration-300"
                      onError={(e) => handleImageError(e, partner.name)}
                    />
                  ) : (
                    <div className="text-center font-medium text-gray-700 dark:text-gray-300">
                      {partner.name}
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
