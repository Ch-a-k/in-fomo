import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  logo: string;
}

// Компонент для отображения логотипов партнеров
// Поддерживает числовые имена файлов (1.svg, 2.svg, и т.д.)
const Partners = () => {
  const { t, ready } = useTranslation('home');
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    // Функция для генерации партнеров с числовыми именами файлов
    const generateNumberedPartners = (count: number): Partner[] => {
      const result: Partner[] = [];
      for (let i = 1; i <= count; i++) {
        result.push({
          name: `Partner ${i}`,
          logo: `/images/partners/${i}.svg`
        });
      }
      return result;
    };

    // Список партнеров с их логотипами
    // Включает как именованные логотипы, так и числовые (1.svg, 2.svg, и т.д.)
    const partnersList: Partner[] = [
      // Числовые партнеры (можно добавить сколько угодно)
      ...generateNumberedPartners(26), // Генерируем 22 числовых партнеров
      
      // Именованные партнеры (если нужны)
     
    ];

    setPartners(partnersList);
  }, []);

  // Анимационные варианты для контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05 // Каждый ребенок появляется с задержкой 0.05 секунд
      }
    }
  };

  // Анимационные варианты для каждого логотипа
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
          >
            {ready ? t('our_partners') : 'Наши надежные партнеры'}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="heading-2 mb-4"
          >
            {ready ? t('our_partners') : 'Наши надежные партнеры'}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            {ready ? t('partners_description') : 'Мы сотрудничаем с ведущими компаниями из различных отраслей для предоставления инновационных решений, адаптированных к потребностям вашего бизнеса.'}
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative p-6 flex items-center justify-center h-24">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="max-h-12 max-w-full object-contain transition-all duration-300"
                  onError={(e) => {
                    // Если изображение не загрузилось, показываем название партнера
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="text-center font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                        ${partner.name}
                      </div>
                    `;
                  }}
                />
                
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
