/**
 * Careers.tsx
 * 
 * Компонент для отображения доступных вакансий компании.
 * Показывает список открытых позиций с требованиями и контактной информацией.
 * Поддерживает мультиязычность через систему i18n (next-i18next).
 * 
 * @version 2.1.0
 * @author IN-FOMO Team
 */

import { useTranslation } from 'next-i18next';
import React, { memo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Careers = memo(() => {
  // Инициализируем переводы из пространства имен 'careers' и 'common'
  const { t, i18n } = useTranslation(['careers', 'common']);
  
  // Проверяем, загружены ли переводы
  const hasTranslations = i18n.isInitialized && 
                          (i18n.hasResourceBundle(i18n.language, 'careers') || 
                           i18n.hasResourceBundle(i18n.language, 'common'));
  
  // Состояние для отслеживания выбранной категории
  const [activeCategory, setActiveCategory] = useState('all');
  
  /**
   * Категории вакансий для фильтрации
   */
  const categories = [
    { id: 'all', name: hasTranslations ? t('categories.all', { ns: 'careers' }) : 'All Positions' },
    { id: 'frontend', name: hasTranslations ? t('categories.frontend', { ns: 'careers' }) : 'Frontend' },
    { id: 'backend', name: hasTranslations ? t('categories.backend', { ns: 'careers' }) : 'Backend' },
    { id: 'fullstack', name: hasTranslations ? t('categories.fullstack', { ns: 'careers' }) : 'Fullstack' },
    { id: 'specialized', name: hasTranslations ? t('categories.specialized', { ns: 'careers' }) : 'Specialized' },
    { id: 'sales', name: hasTranslations ? t('categories.sales', { ns: 'careers' }) : 'Sales' }
  ];
  
  /**
   * Список доступных вакансий с детальной информацией
   */
  const vacancies = [
    {
      id: 1,
      title: hasTranslations ? t('vacancies.angular_node.title', { ns: 'careers' }) : 'Angular/Node.js Developer',
      category: 'fullstack',
      skills: [
        hasTranslations ? t('vacancies.angular_node.skills.frontend', { ns: 'careers' }) : 'Frontend: Angular 14',
        hasTranslations ? t('vacancies.angular_node.skills.backend', { ns: 'careers' }) : 'Backend: Node.js + Express, TypeORM',
        hasTranslations ? t('vacancies.angular_node.skills.database', { ns: 'careers' }) : 'Database: PostgreSQL - PGAdmin 16',
        hasTranslations ? t('vacancies.angular_node.skills.websocket', { ns: 'careers' }) : 'WebSocket Service: Socket.io',
        hasTranslations ? t('vacancies.angular_node.skills.integrations', { ns: 'careers' }) : 'Integrations:',
        '- AWS Lambda (XML Upload Processing)',
        '- WordPress Webhook',
        hasTranslations ? t('vacancies.angular_node.skills.wordpress', { ns: 'careers' }) : 'WordPress dev, experience with Gravity forms, eLearning, custom plugins'
      ],
      responseFormat: hasTranslations ? t('vacancies.response_format', { ns: 'careers' }) : 'CV, ссылка на LinkedIn, где находитесь, уровень английского языка, последний и предпоследний рейт в час в $ (если есть).'
    },
    {
      id: 2,
      title: hasTranslations ? t('vacancies.ros_python.title', { ns: 'careers' }) : 'ROS Python Developer (Robotics & Image Recognition)',
      category: 'specialized',
      skills: [
        hasTranslations ? t('vacancies.ros_python.skills.specialization', { ns: 'careers' }) : 'ROS Python разработчик, специализирующийся на робототехнике и распознавании изображений',
        hasTranslations ? t('vacancies.ros_python.skills.projects', { ns: 'careers' }) : 'Для правительственных проектов (США)',
        hasTranslations ? t('vacancies.ros_python.skills.focus', { ns: 'careers' }) : 'Работа с камерами, трекинг, сегментация изображений, ROS2'
      ],
      responseFormat: hasTranslations ? t('vacancies.response_format', { ns: 'careers' }) : 'CV, ссылка на LinkedIn, где находитесь, уровень английского языка, последний и предпоследний рейт в час в $ (если есть).'
    },
    {
      id: 3,
      title: hasTranslations ? t('vacancies.dotnet_migration.title', { ns: 'careers' }) : '.NET Migration Specialist',
      category: 'backend',
      skills: [
        hasTranslations ? t('vacancies.dotnet_migration.skills.main', { ns: 'careers' }) : 'Опыт миграции приложений с .NET Framework 4.8 на .NET 5 или новее',
        hasTranslations ? t('vacancies.dotnet_migration.skills.experience', { ns: 'careers' }) : 'Уверенность и подтвержденный опыт выполнения таких миграций'
      ],
      responseFormat: hasTranslations ? t('vacancies.response_format', { ns: 'careers' }) : 'CV, ссылка на LinkedIn, где находитесь, уровень английского языка, последний и предпоследний рейт в час в $ (если есть).'
    },
    {
      id: 4,
      title: hasTranslations ? t('vacancies.wordpress_react.title', { ns: 'careers' }) : 'WordPress + React Developer',
      category: 'frontend',
      skills: [
        hasTranslations ? t('vacancies.wordpress_react.skills.wordpress', { ns: 'careers' }) : 'WordPress разработка',
        hasTranslations ? t('vacancies.wordpress_react.skills.headless', { ns: 'careers' }) : 'Headless CMS + WordPress',
        hasTranslations ? t('vacancies.wordpress_react.skills.frontend', { ns: 'careers' }) : 'React/Next.js',
        hasTranslations ? t('vacancies.wordpress_react.skills.basics', { ns: 'careers' }) : 'HTML/CSS/JS',
        hasTranslations ? t('vacancies.wordpress_react.skills.php', { ns: 'careers' }) : 'Базовые знания PHP'
      ],
      responseFormat: hasTranslations ? t('vacancies.response_format', { ns: 'careers' }) : 'CV, ссылка на LinkedIn, где находитесь, уровень английского языка, последний и предпоследний рейт в час в $ (если есть).'
    },
    {
      id: 5,
      title: hasTranslations ? t('vacancies.python_django.title', { ns: 'careers' }) : 'Python/Django Developer',
      category: 'backend',
      skills: [
        hasTranslations ? t('vacancies.python_django.skills.python', { ns: 'careers' }) : 'Python 3.x',
        hasTranslations ? t('vacancies.python_django.skills.frameworks', { ns: 'careers' }) : 'Django, Flask, FastAPI',
        hasTranslations ? t('vacancies.python_django.skills.databases', { ns: 'careers' }) : 'PostgreSQL, MySQL, MongoDB',
        hasTranslations ? t('vacancies.python_django.skills.tools', { ns: 'careers' }) : 'Git, Docker, Celery, Redis',
        hasTranslations ? t('vacancies.python_django.skills.api', { ns: 'careers' }) : 'REST, GraphQL',
        hasTranslations ? t('vacancies.python_django.skills.optional', { ns: 'careers' }) : 'Дополнительно: Pandas, NumPy, Jupyter (для data/ML), AWS/GCP/Azure'
      ],
      responseFormat: hasTranslations ? t('vacancies.response_format', { ns: 'careers' }) : 'CV, ссылка на LinkedIn, где находитесь, уровень английского языка, последний и предпоследний рейт в час в $ (если есть).'
    },
    {
      id: 6,
      title: hasTranslations ? t('vacancies.mern.title', { ns: 'careers' }) : 'Fullstack MERN Developer',
      category: 'fullstack',
      skills: [
        hasTranslations ? t('vacancies.mern.skills.frontend', { ns: 'careers' }) : 'Frontend: React, Next.js, JavaScript/TypeScript, HTML, CSS, SASS/Tailwind CSS',
        hasTranslations ? t('vacancies.mern.skills.backend', { ns: 'careers' }) : 'Backend: Node.js, Express.js',
        hasTranslations ? t('vacancies.mern.skills.database', { ns: 'careers' }) : 'Database: MongoDB',
        hasTranslations ? t('vacancies.mern.skills.api', { ns: 'careers' }) : 'API: REST, GraphQL',
        hasTranslations ? t('vacancies.mern.skills.tools', { ns: 'careers' }) : 'Tools: Git, Docker, Webpack/Vite, Vercel',
        hasTranslations ? t('vacancies.mern.skills.additional', { ns: 'careers' }) : 'Additional: Redux, JWT, WebSocket, AWS/Vercel, integrations, webhooks, etc.'
      ],
      responseFormat: hasTranslations ? t('vacancies.response_format', { ns: 'careers' }) : 'CV, ссылка на LinkedIn, где находитесь, уровень английского языка, последний и предпоследний рейт в час в $ (если есть).'
    },
    {
      id: 7,
      title: hasTranslations ? t('vacancies.sales_representative.title', { ns: 'careers' }) : 'Sales Representative',
      category: 'sales',
      skills: [
        hasTranslations ? t('vacancies.sales_representative.skills.experience', { ns: 'careers' }) : '1-2 years of experience in sales',
        hasTranslations ? t('vacancies.sales_representative.skills.communication', { ns: 'careers' }) : 'Excellent communication and negotiation skills',
        hasTranslations ? t('vacancies.sales_representative.skills.languages', { ns: 'careers' }) : 'Fluent in English, additional languages are a plus',
        hasTranslations ? t('vacancies.sales_representative.skills.tech', { ns: 'careers' }) : 'Basic understanding of IT services and solutions',
        hasTranslations ? t('vacancies.sales_representative.skills.relationships', { ns: 'careers' }) : 'Ability to build and maintain client relationships',
        hasTranslations ? t('vacancies.sales_representative.skills.compensation', { ns: 'careers' }) : 'Compensation: Base salary + 10% commission from successful sales'
      ],
      responseFormat: hasTranslations ? t('vacancies.response_format', { ns: 'careers' }) : 'CV, ссылка на LinkedIn, где находитесь, уровень английского языка, последний и предпоследний рейт в час в $ (если есть).'
    },
    {
      id: 8,
      title: hasTranslations ? t('vacancies.sales_manager.title', { ns: 'careers' }) : 'Sales Manager',
      category: 'sales',
      skills: [
        hasTranslations ? t('vacancies.sales_manager.skills.experience', { ns: 'careers' }) : '3+ years of experience in sales in the IT/tech industry',
        hasTranslations ? t('vacancies.sales_manager.skills.leadership', { ns: 'careers' }) : 'Leadership and team management skills',
        hasTranslations ? t('vacancies.sales_manager.skills.strategies', { ns: 'careers' }) : 'Ability to develop and implement sales strategies',
        hasTranslations ? t('vacancies.sales_manager.skills.crm', { ns: 'careers' }) : 'Experience with CRM systems and sales analytics',
        hasTranslations ? t('vacancies.sales_manager.skills.targets', { ns: 'careers' }) : 'Proven ability to meet and exceed sales targets',
        hasTranslations ? t('vacancies.sales_manager.skills.compensation', { ns: 'careers' }) : 'Compensation: Base salary + 15% commission from successful sales'
      ],
      responseFormat: hasTranslations ? t('vacancies.response_format', { ns: 'careers' }) : 'CV, ссылка на LinkedIn, где находитесь, уровень английского языка, последний и предпоследний рейт в час в $ (если есть).'
    },
    {
      id: 9,
      title: hasTranslations ? t('vacancies.key_account_manager.title', { ns: 'careers' }) : 'Key Account Manager',
      category: 'sales',
      skills: [
        hasTranslations ? t('vacancies.key_account_manager.skills.experience', { ns: 'careers' }) : '5+ years of experience in client relationship management in IT/tech industry',
        hasTranslations ? t('vacancies.key_account_manager.skills.enterprise', { ns: 'careers' }) : 'Experience working with enterprise clients',
        hasTranslations ? t('vacancies.key_account_manager.skills.relationships', { ns: 'careers' }) : 'Strong relationship building and management skills',
        hasTranslations ? t('vacancies.key_account_manager.skills.negotiations', { ns: 'careers' }) : 'Advanced negotiation and contract management skills',
        hasTranslations ? t('vacancies.key_account_manager.skills.technical', { ns: 'careers' }) : 'Solid technical understanding of IT services and solutions',
        hasTranslations ? t('vacancies.key_account_manager.skills.compensation', { ns: 'careers' }) : 'Compensation: Base salary + 20% commission from successful sales'
      ],
      responseFormat: hasTranslations ? t('vacancies.response_format', { ns: 'careers' }) : 'CV, ссылка на LinkedIn, где находитесь, уровень английского языка, последний и предпоследний рейт в час в $ (если есть).'
    },
    {
      id: 10,
      title: hasTranslations ? t('vacancies.frontend_react.title', { ns: 'careers' }) : 'Frontend React Developer',
      category: 'frontend',
      skills: [
        hasTranslations ? t('vacancies.frontend_react.skills.main', { ns: 'careers' }) : 'Сильный опыт работы с React 18+ и Next.js',
        hasTranslations ? t('vacancies.frontend_react.skills.typescript', { ns: 'careers' }) : 'Продвинутые знания TypeScript',
        hasTranslations ? t('vacancies.frontend_react.skills.styling', { ns: 'careers' }) : 'CSS-in-JS (Styled Components, Emotion), Tailwind CSS',
        hasTranslations ? t('vacancies.frontend_react.skills.state', { ns: 'careers' }) : 'Управление состоянием с Redux Toolkit, React Query',
        hasTranslations ? t('vacancies.frontend_react.skills.testing', { ns: 'careers' }) : 'Тестирование с Jest, React Testing Library',
        hasTranslations ? t('vacancies.frontend_react.skills.tools', { ns: 'careers' }) : 'Опыт работы с инструментами сборки (Webpack, Vite) и современными рабочими процессами',
        hasTranslations ? t('vacancies.frontend_react.skills.plus', { ns: 'careers' }) : 'Опыт работы с микрофронтендами и федерациями модулей будет плюсом'
      ],
      responseFormat: hasTranslations ? t('vacancies.response_format', { ns: 'careers' }) : 'CV, ссылка на LinkedIn, где находитесь, уровень английского языка, последний и предпоследний рейт в час в $ (если есть).'
    }
  ];
  
  // Фильтрация вакансий по выбранной категории
  const filteredVacancies = 
    activeCategory === 'all' 
      ? vacancies 
      : vacancies.filter(vacancy => vacancy.category === activeCategory);
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50/50 dark:from-black dark:to-[#1a0800]">
      <div className="container mx-auto px-4 relative">
        {/* Декоративные элементы */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#FF5a00]/10 dark:bg-[#FF5a00]/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500/10 dark:bg-orange-500/15 blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-3xl"></div>
        </div>
        
        {/* Фильтры категорий */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 relative z-10 border-b border-orange-100 dark:border-orange-900/30 pb-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-6 py-3 text-base font-medium transition-colors ${
                activeCategory === category.id
                  ? 'text-[#FF5a00]'
                  : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
              }`}
            >
              {category.name}
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5a00]"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Список вакансий */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {filteredVacancies.map((vacancy, index) => (
            <motion.div 
              key={vacancy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col bg-white/70 dark:bg-black/50 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100/70 dark:border-orange-900/30 overflow-hidden transition-all hover:shadow-2xl"
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-black dark:text-white">
                  {vacancy.title}
                </h3>
                
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#FF5a00]/10 text-[#FF5a00]">
                    {categories.find(cat => cat.id === vacancy.category)?.name}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#FF5a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {hasTranslations ? t('requirements', { ns: 'careers' }) : 'Требования'}
                  </h4>
                  <ul className="space-y-2 mb-4">
                    {vacancy.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 mt-0.5 bg-[#FF5a00]/10 text-[#FF5a00] rounded-full">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </span>
                        <span className="text-sm text-black/70 dark:text-white/80">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-white to-orange-50 dark:from-black/80 dark:to-[#1a0800] border border-orange-100/70 dark:border-orange-900/30 rounded-lg p-3 mb-4 text-xs">
                  <p className="text-black/70 dark:text-white/80">
                    <strong>{hasTranslations ? t('vacancies.please_include', { ns: 'careers' }) : 'Пожалуйста, укажите:'}</strong> {vacancy.responseFormat}
                  </p>
                </div>
                
                <a 
                  href="https://iodized-tilapia-e46.notion.site/1e5e5ec3ab0f816dab7eca2519073a79?pvs=105" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#FF5a00] hover:bg-[#FF5a00]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5a00] transition-colors mt-auto"
                >
                  {hasTranslations ? t('apply_now', { ns: 'careers' }) : 'Откликнуться'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredVacancies.length === 0 && (
          <div className="text-center py-10 relative z-10">
            <p className="text-lg text-black/70 dark:text-white/80">
              {hasTranslations ? t('no_vacancies', { ns: 'careers' }) : 'Нет доступных вакансий в этой категории'}
            </p>
          </div>
        )}
        
        <div className="mt-12 text-center relative z-10">
          <p className="text-base text-black/70 dark:text-white/80 mb-4">
            {hasTranslations ? t('not_found_suitable', { ns: 'careers' }) : 'Не нашли подходящую вакансию? Отправьте нам ваше резюме, и мы свяжемся с вами, когда появится подходящая позиция.'}
          </p>
          
          <Link 
            href="/contact#careers-form" 
            className="inline-flex items-center justify-center px-6 py-3 border border-[#FF5a00]/30 text-base font-medium rounded-lg text-[#FF5a00] hover:bg-[#FF5a00]/10 transition-colors"
          >
            {hasTranslations ? t('contact_us', { ns: 'careers' }) : 'Связаться с нами'}
            <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
});

// Установка displayName для удобства отладки в React DevTools
Careers.displayName = 'Careers';

export default Careers;