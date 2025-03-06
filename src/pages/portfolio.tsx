import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Типы для проектов
interface Project {
  id: number;
  titleKey: string;
  descriptionKey: string;
  categories: string[];
  images: string[];
  technologies: string[];
  link: string;
  year: number;
}

const Portfolio = () => {
  const { t } = useTranslation(['portfolio', 'common']);
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  // Reset loading state when changing images
  useEffect(() => {
    if (selectedProject) {
      setImageLoading(true);
    }
  }, [currentImageIndex, selectedProject]);

  // Функции для карусели
  const nextImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  }, [selectedProject]);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          setSelectedProject(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject, prevImage, nextImage]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Категории фильтров
  const categories = [
    { id: 'all', name: t('categories.all', { ns: 'portfolio' }) },
    { id: 'Web dev', name: t('categories.web', { ns: 'portfolio' }) },
    { id: 'Mobile dev', name: t('categories.mobile', { ns: 'portfolio' }) },
    { id: 'Blockchain', name: t('categories.blockchain', { ns: 'portfolio' }) },
    { id: 'AI Solutions', name: t('categories.ai', { ns: 'portfolio' }) },
    { id: 'CRM', name: t('categories.crm', { ns: 'portfolio' }) },
    { id: 'E-commerce', name: t('categories.ecommerce', { ns: 'portfolio' }) }
  ];

  /// Данные проектов
useEffect(() => {
  const projectsData: Project[] = [
    {
      id: 1,
      titleKey: 'project_polerowanie_title',
      descriptionKey: 'project_polerowanie_description',
      categories: ['Web dev', 'SEO'],
      images: [
        '/images/projects/polerowanie-szyb.avif',
        '/images/projects/polerowanie-szyb-2.avif',
      ],
      technologies: ['WordPress', 'HTML/CSS', 'JavaScript', 'Responsive Design', 'SEO'],
      link: 'https://polerowanie-szyb.pl/',
      year: 2024
    },
    {
      id: 2,
      titleKey: 'project_blastlybot_title',
      descriptionKey: 'project_blastlybot_description',
      categories: ['AI Solutions', 'Mobile dev'],
      images: [
        '/images/projects/blastly-bot.avif',
        '/images/projects/blastly-bot-2.avif',
      ],
      technologies: ['Telegram API', 'NLP', 'AI', 'Node.js', 'Python'],
      link: 'https://t.me/blastlybot/',
      year: 2024
    },
    {
      id: 3,
      titleKey: 'project_pharmprostir_title',
      descriptionKey: 'project_pharmprostir_description',
      categories: ['E-commerce', 'Web dev'],
      images: [
        '/images/projects/pharmprostir.avif',
        '/images/projects/pharmprostir-2.avif',
      ],
      technologies: ['WooCommerce', 'WordPress', 'Payment Gateway', 'Responsive Design'],
      link: 'https://pharmprostir.com.ua/',
      year: 2024
    },
    {
      id: 4,
      titleKey: 'project_savier_title',
      descriptionKey: 'project_savier_description',
      categories: ['Web dev', 'SEO'],
      images: [
        '/images/projects/savier-blog.avif',
        '/images/projects/savier-blog-2.avif',
      ],
      technologies: ['WordPress', 'Custom Theme', 'SEO', 'Content Management'],
      link: 'https://savier.blog/',
      year: 2024
    },
    {
      id: 5,
      titleKey: 'project_budgood_title',
      descriptionKey: 'project_budgood_description',
      categories: ['Web dev'],
      images: [
        '/images/projects/budgood.avif',
        '/images/projects/budgood-2.avif',
      ],
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Responsive Design'],
      link: 'https://www.budgood.pl',
      year: 2025
    },
    {
      id: 6,
      titleKey: 'project_factum_title',
      descriptionKey: 'project_factum_description',
      categories: ['CRM', 'Web dev'],
      images: [
        '/images/projects/factum-auto.avif',
        '/images/projects/factum-auto-2.avif',
        '/images/projects/factum-auto-3.avif',
        '/images/projects/factum-auto-4.avif',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Web Scraping', 'REST API'],
      link: 'https://factum-auto.com/',
      year: 2024
    },
    {
      id: 7,
      titleKey: 'project_skybud_title',
      descriptionKey: 'project_skybud_description',
      categories: ['CRM', 'Web dev'],
      images: [
        '/images/projects/skybud.avif',
        '/images/projects/skybud-2.avif',
        '/images/projects/skybud-3.avif',
        '/images/projects/skybud-4.avif',
        '/images/projects/skybud-5.avif',
        '/images/projects/skybud-6.avif',
      ],
      technologies: ['React', 'Node.js', 'Google Maps API', 'MongoDB', 'Express'],
      link: 'https://skybud.de/',
      year: 2024
    },
    {
      id: 8,
      titleKey: 'project_vimmi_title',
      descriptionKey: 'project_vimmi_description',
      categories: ['Web dev', 'SaaS'],
      images: [
        '/images/projects/vimmi.avif',
        '/images/projects/vimmi-2.avif',
        '/images/projects/vimmi-3.avif',
      ],
      technologies: ['SaaS', 'React', 'Node.js', 'Analytics', 'Dashboard'],
      link: 'https://vimmi.net/',
      year: 2024
    },
    {
      id: 9,
      titleKey: 'project_beautyprostir_title',
      descriptionKey: 'project_beautyprostir_description',
      categories: ['E-commerce', 'Web dev'],
      images: [
        '/images/projects/beautyprostir.avif',
        '/images/projects/beautyprostir-2.avif',
      ],
      technologies: ['WooCommerce', 'WordPress', 'Payment Gateway', 'Product Management'],
      link: 'https://beautyprostir.pl',
      year: 2024
    },
    {
      id: 10,
      titleKey: 'project_llm_title',
      descriptionKey: 'project_llm_description',
      categories: ['AI Solutions'],
      images: [
        '/images/projects/llm-model.avif',
        '/images/projects/llm-model-2.avif',
      ],
      technologies: ['LLM', 'NLP', 'Python', 'TensorFlow', 'Document Processing'],
      link: '#',
      year: 2024
    },
    {
      id: 11,
      titleKey: 'project_transport_crm_title',
      descriptionKey: 'project_transport_crm_description',
      categories: ['CRM', 'Web dev'],
      images: [
        '/images/projects/transport-crm.avif',
        '/images/projects/transport-crm-2.avif',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Logistics', 'Scheduling'],
      link: '#',
      year: 2024
    },
    {
      id: 12,
      titleKey: 'project_smashandfun_title',
      descriptionKey: 'project_smashandfun_description',
      categories: ['Web dev', 'E-commerce'],
      images: [
        '/images/projects/smashandfun.avif',
        '/images/projects/smashandfun-2.avif',
      ],
      technologies: ['WordPress', 'Booking System', 'Payment Gateway', 'Responsive Design'],
      link: 'https://smashandfun.pl',
      year: 2024
    },
    {
      id: 13,
      titleKey: 'project_soulspace_title',
      descriptionKey: 'project_soulspace_description',
      categories: ['Web dev', 'SEO'],
      images: [
        '/images/projects/soulspace.avif',
        '/images/projects/soulspace-2.avif',
        '/images/projects/soulspace-3.avif',
      ],
      technologies: ['SEO', 'Content Optimization', 'Google Analytics', 'Keyword Research'],
      link: 'https://soulspace.pt',
      year: 2024
    },
    {
      id: 14,
      titleKey: 'project_commentify_title',
      descriptionKey: 'project_commentify_description',
      categories: ['AI Solutions', 'Web dev'],
      images: [
        '/images/projects/commentify.avif',
        '/images/projects/commentify-2.avif',
        '/images/projects/commentify-3.avif',
        '/images/projects/commentify-4.avif',
      ],
      technologies: ['AI', 'React', 'Node.js', 'Sentiment Analysis', 'Real-time Monitoring'],
      link: 'https://commentify.io/en',
      year: 2024
    },
    {
      id: 15,
      titleKey: 'project_everscale_title',
      descriptionKey: 'project_everscale_description',
      categories: ['Blockchain', 'Web dev'],
      images: [
        '/images/projects/everscale.avif',
        '/images/projects/everscale-2.avif',
        '/images/projects/everscale-3.avif',
      ],
      technologies: ['Web3', 'React', 'Blockchain', 'Smart Contracts', 'Documentation'],
      link: 'https://everscale.network',
      year: 2020
    },
    {
      id: 16,
      titleKey: 'project_cryptonumiz_title',
      descriptionKey: 'project_cryptonumiz_description',
      categories: ['Blockchain'],
      images: [
        '/images/projects/cryptonumiz.avif',
        '/images/projects/cryptonumiz-2.avif',
        '/images/projects/cryptonumiz-3.avif',
        '/images/projects/cryptonumiz-4.avif',
      ],
      technologies: ['Ethereum', 'Solidity', 'Web3.js', 'Smart Contracts', 'ERC-20'],
      link: 'https://etherscan.io/token/0x208f1dfeb0b9127f72c7813664270c9c53317ac6',
      year: 2022
    },
    {
      id: 17,
      titleKey: 'project_therace_title',
      descriptionKey: 'project_therace_description',
      categories: ['Blockchain', 'Web dev'],
      images: [
        '/images/projects/therace.avif',
        '/images/projects/therace-2.avif',
      ],
      technologies: ['dApp', 'NFT', 'Web3', 'Game Development', 'Blockchain'],
      link: 'https://web.archive.org/web/20240820022653/http://www.therace.io/',
      year: 2024
    },
    {
      id: 18,
      titleKey: 'project_survey_bot_title',
      descriptionKey: 'project_survey_bot_description',
      categories: ['AI Solutions', 'Mobile dev'],
      images: [
        '/images/projects/survey-bot.avif',
        '/images/projects/survey-bot-2.avif',
        '/images/projects/survey-bot-3.avif',
        '/images/projects/survey-bot-4.avif',
        '/images/projects/survey-bot-5.avif',
        '/images/projects/survey-bot-6.avif',
        '/images/projects/survey-bot-7.avif',
        '/images/projects/survey-bot-8.avif',
        '/images/projects/survey-bot-9.avif',
        '/images/projects/survey-bot-10.avif',
      ],
      technologies: ['Telegram API', 'Node.js', 'MongoDB', 'Analytics', 'Admin Panel'],
      link: '#',
      year: 2024
    },
    {
      id: 19,
      titleKey: 'project_crypto_signals_title',
      descriptionKey: 'project_crypto_signals_description',
      categories: ['AI Solutions', 'Blockchain'],
      images: [
        '/images/projects/crypto-signals.avif',
        '/images/projects/crypto-signals-2.avif',
      ],
      technologies: ['TradingView API', 'Binance API', 'Python', 'LLM', 'Trading Algorithms'],
      link: '#',
      year: 2024
    },
    {
      id: 20,
      titleKey: 'project_meta_management_title',
      descriptionKey: 'project_meta_management_description',
      categories: ['Web dev'],
      images: [
        '/images/projects/meta-management.avif',
      ],
      technologies: ['Meta API', 'Node.js', 'React', 'Multi-account Management', 'AntiDetect'],
      link: '#',
      year: 2022
    },
    {
      id: 21,
      titleKey: 'project_product_parser_title',
      descriptionKey: 'project_product_parser_description',
      categories: ['Web dev'],
      images: [
        '/images/projects/product-parser.avif',
      ],
      technologies: ['Python', 'Web Scraping', 'CSV Export', 'API', 'Automation'],
      link: '#',
      year: 2024
    },
    {
      id: 22,
      titleKey: 'project_social_parser_title',
      descriptionKey: 'project_social_parser_description',
      categories: ['Web dev', 'AI Solutions'],
      images: [
        '/images/projects/social-parser.avif',
      ],
      technologies: ['Social Media APIs', 'Python', 'Data Mining', 'Automation'],
      link: '#',
      year: 2024
    },
    {
      id: 23,
      titleKey: 'project_cefion_title',
      descriptionKey: 'project_cefion_description',
      categories: ['Mobile dev', 'Web dev'],
      images: [
        '/images/projects/cefion-mobile-app.avif',
        '/images/projects/cefion-mobile-app-2.avif',
        '/images/projects/cefion-mobile-app-3.avif',
        '/images/projects/cefion-mobile-app-4.avif',
        '/images/projects/cefion-mobile-app-5.avif',
        '/images/projects/cefion-mobile-app-6.avif',
      ],
      technologies: ['React Native', 'React.js', 'Node.js', 'MongoDB'],
      link: 'https://cefion.vercel.app',
      year: 2022
    }
  ];
  
  setProjects(projectsData);
  setFilteredProjects(projectsData);
}, [t]); // Добавляем t как зависимость из-за использования в categories

  // Фильтр проектов по категории
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.categories.includes(activeCategory))
      );
    }
  }, [activeCategory, projects]);

  return (
    <>
      <Head>
        <title>{`IN-FOMO | ${t('meta.title', { ns: 'portfolio' })}`}</title>
        <meta name="description" content={t('meta.description', { ns: 'portfolio' })} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              {t('hero.badge')}
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="heading-1 mb-6">
              {t('hero.title')} <span className="text-primary">{t('hero.title_highlight')}</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="mb-10 text-xl text-gray-600 dark:text-gray-300">
              {t('hero.description')}
            </motion.p>
          </motion.div>
        </div>
      </div>

      <section className="py-16">
        <div className="container">
          {/* Фильтры */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Список проектов */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-56">
                  <Image
                  src={project.images[0]}
                  alt={t(project.titleKey, { ns: 'portfolio' })}
                  width={500}
                  height={300}
                  priority
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.categories.map((category) => (
                          <div
                            key={category}
                            className="text-xs uppercase tracking-wider text-white bg-primary/80 rounded-full px-2 py-1"
                          >
                            {category}
                          </div>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {t(project.titleKey, { ns: 'portfolio' })}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                      {t(project.descriptionKey, { ns: 'portfolio' })}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{project.year}</span>
                      <a
                        href={project.link}
                        target={project.link === '#' ? '_self' : '_blank'} // Предотвращает открытие новой вкладки для '#'
                        rel={project.link === '#' ? undefined : 'noopener noreferrer'}
                        className={`text-primary hover:text-primary-dark transition-colors flex items-center gap-1 text-sm font-medium ${project.link === '#' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t('view_project', { ns: 'portfolio' })} 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Модальное окно */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Карусель изображений */}
                  <div className="relative">
                    <div className="w-full aspect-video bg-gray-900">
                      {selectedProject && (
                        <Image
                          src={selectedProject.images[currentImageIndex]}
                          alt={`${t(selectedProject.titleKey, { ns: 'portfolio' })} - ${currentImageIndex + 1}`}
                          width={896}
                          height={504}
                          priority
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full hover:bg-white/90 transition-colors"
                        >
                          ←
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full hover:bg-white/90 transition-colors"
                        >
                          →
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProject.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Информация о проекте */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">
                      {t(selectedProject.titleKey, { ns: 'portfolio' })}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.categories.map((category) => (
                        <span
                          key={category}
                          className="text-xs bg-primary/80 text-white px-2 py-1 rounded"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {t(selectedProject.descriptionKey, { ns: 'portfolio' })}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{selectedProject.year}</span>
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
                      >
                        {t('view_project', { ns: 'portfolio' })}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t('no_projects_found', { ns: 'portfolio' })}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }: { locale?: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['portfolio', 'common'])),
    },
  };
};

export default Portfolio;
