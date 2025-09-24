import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { GetStaticProps } from 'next/types';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../components/SEO';

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
  // Автоматически вычисляемые акценты: «Что сделали»
  highlights?: string[];
}

const Portfolio = () => {
  const { t } = useTranslation(['portfolio', 'common']);
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<'title' | 'year' | 'categories' | 'technologies'>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Блокировка скролла при открытом модальном окне с сохранением позиции
  const scrollPositionRef = useRef(0);
  useEffect(() => {
    if (selectedProject) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    } else {
      const savedY = scrollPositionRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, savedY);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
    };
  }, [selectedProject]);

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

  // Категории фильтров
  const categories = [
    { id: 'all', name: t('categories.all', { ns: 'portfolio' }) },
    { id: 'Web dev', name: t('categories.web', { ns: 'portfolio' }) },
    { id: 'Mobile dev', name: t('categories.mobile', { ns: 'portfolio' }) },
    { id: 'Blockchain', name: t('categories.blockchain', { ns: 'portfolio' }) },
    { id: 'AI Solutions', name: t('categories.ai', { ns: 'portfolio' }) },
    { id: 'CRM', name: t('categories.crm', { ns: 'portfolio' }) },
    { id: 'E-commerce', name: t('categories.ecommerce', { ns: 'portfolio' }) },
    { id: 'Bots', name: t('categories.bots', { ns: 'portfolio' }) }
  ];

  // Вспомогательная функция для генерации "Что сделали" по контексту
  const buildHighlights = (p: Project): string[] => {
    const highlights: string[] = [];
    if (p.categories.includes('CRM')) {
      highlights.push('hl_crm', 'hl_process_automation');
    }
    if (p.categories.includes('AI Solutions')) {
      highlights.push('hl_ai_analytics');
    }
    if (p.categories.includes('E-commerce')) {
      highlights.push('hl_payments', 'hl_catalog_orders');
    }
    if (p.categories.includes('Blockchain')) {
      highlights.push('hl_smart_contracts');
    }
    if (p.categories.includes('Mobile dev')) {
      highlights.push('hl_mobile_app');
    }
    if (p.categories.includes('Web dev')) {
      highlights.push('hl_website_perf');
    }
    // Технологии дополняют
    if (p.technologies.some((t) => /SEO/i.test(t))) {
      highlights.push('hl_seo_growth');
    }
    // Уникальные кейсы по ключам
    if (p.titleKey === 'project_odoo_ai_title') {
      highlights.push('hl_odoo_dashboards');
    }
    if (p.titleKey === 'project_subscribe_bot_title') {
      highlights.push('hl_monopay', 'hl_check_subscription', 'hl_auto_remove', 'hl_webhooks_notify');
    }
    return Array.from(new Set(highlights)).slice(0, 4);
  };

  // Данные проектов
  useEffect(() => {
    const projectsData: Project[] = [
      {
        id: 27,
        titleKey: 'project_subscribe_bot_title',
        descriptionKey: 'project_subscribe_bot_description',
        categories: ['Bots', 'AI Solutions', 'Mobile dev'],
        images: [
          '/images/projects/Julia-bot-1.png',
          '/images/projects/Julia-bot-2.png',
          '/images/projects/Julia-bot-3.png'
        ],
        technologies: ['Telegram Bot API', 'MonoPay', 'Node.js', 'SQLite', 'Webhooks', 'Cron'],
        link: 'https://t.me/samoshyna_juliya_bot',
        year: 2025
      },
      {
        id: 26,
        titleKey: 'project_odoo_ai_title',
        descriptionKey: 'project_odoo_ai_description',
        categories: ['CRM', 'AI Solutions', 'Web dev'],
        images: [
          '/images/projects/odoo-1.webp',
          '/images/projects/odoo-2.webp',
          '/images/projects/odoo-3.webp',
          '/images/projects/odoo-4.webp',
          '/images/projects/odoo-5.webp',
          '/images/projects/odoo-6.webp',
          '/images/projects/odoo-7.webp',
          '/images/projects/odoo-8.webp',
        ],
        technologies: ['Odoo ERP', 'Python', 'PostgreSQL', 'REST API', 'AI', 'NLP'],
        link: '#',
        year: 2025
      },
      {
        id: 25,
        titleKey: 'project_cryptocourse_title',
        descriptionKey: 'project_cryptocourse_description',
        categories: ['Blockchain', 'Web dev'],
        images: [
          '/images/projects/cryptocourse.avif',
          '/images/projects/cryptocourse-2.avif',
          '/images/projects/cryptocourse-3.avif',
          '/images/projects/cryptocourse-4.avif',
        ],
        technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Responsive Design'],
        link: 'https://www.dhcd.xyz',
        year: 2025
      },
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
        titleKey: 'project_cryptorecovery_title',
        descriptionKey: 'project_cryptorecovery_description',
        categories: ['Blockchain', 'AI Solutions', 'Web dev'],
        images: [
          '/images/projects/cryptorecovery.avif',
          '/images/projects/cryptorecovery-2.avif',
          '/images/projects/cryptorecovery-3.avif',
        ],
        technologies: ['Blockchain', 'Cryptography', 'AI', 'Data Recovery', 'Security'],
        link: 'https://example.com/crypto-recovery',
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
      },
      {
        id: 24,
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
      
      // ... остальные проекты ...
    ];
    
    const withHighlights = projectsData.map((p) => ({ ...p, highlights: buildHighlights(p) }));
    setProjects(withHighlights);
    setFilteredProjects(withHighlights);
  }, [t]);

  // Фильтр, поиск и сортировка
  useEffect(() => {
    let result = [...projects];

    // Фильтр по категории
    if (activeCategory !== 'all') {
      result = result.filter(project => project.categories.includes(activeCategory));
    }

    // Поиск по названию, описанию и технологиям
    const query = searchQuery.trim().toLowerCase();
    if (query.length > 0) {
      result = result.filter(project => {
        const title = t(project.titleKey, { ns: 'portfolio' }).toLowerCase();
        const description = t(project.descriptionKey, { ns: 'portfolio' }).toLowerCase();
        const techs = project.technologies.join(' ').toLowerCase();
        return title.includes(query) || description.includes(query) || techs.includes(query);
      });
    }

    // Сортировка
    result.sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';
      if (sortKey === 'title') {
        aVal = t(a.titleKey, { ns: 'portfolio' });
        bVal = t(b.titleKey, { ns: 'portfolio' });
      } else if (sortKey === 'year') {
        aVal = a.year;
        bVal = b.year;
      } else if (sortKey === 'categories') {
        aVal = (a.categories[0] || '').toString();
        bVal = (b.categories[0] || '').toString();
      } else if (sortKey === 'technologies') {
        aVal = a.technologies.length;
        bVal = b.technologies.length;
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? (aVal - bVal) : (bVal - aVal);
      }
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      if (aStr < bStr) return sortOrder === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredProjects(result);
  }, [activeCategory, projects, searchQuery, sortKey, sortOrder, t]);

  // Количество видимых карточек управляется visibleCount

  const handleSort = (key: 'title' | 'year' | 'categories' | 'technologies') => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // Сброс количества при изменении фильтров/поиска/сортировки
  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, searchQuery, sortKey, sortOrder]);

  // Маленький детерминированный спарклайн по id
  const getSparkPath = (id: number): string => {
    const points: Array<[number, number]> = [];
    let y = (id % 5) + 3; // базовый уровень
    for (let x = 0; x <= 10; x++) {
      y = (y + ((id * (x + 3)) % 4) - 1) % 10;
      if (y < 2) y = 2;
      if (y > 9) y = 9;
      points.push([x, y]);
    }
    return points.map((p, i) => (i === 0 ? `M ${p[0]} ${10 - p[1]}` : `L ${p[0]} ${10 - p[1]}`)).join(' ');
  };

  // Функция для отслеживания клика по проекту
  const trackProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };
  
  // Функция для отслеживания клика по ссылке проекта
  const trackProjectLinkClick = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.link || project.link === '#') return;
    try {
      if (project.link.startsWith('/')) {
        window.location.href = project.link;
      } else {
        window.open(project.link, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      // no-op
    }
  };

  return (
    <>
      <SEO
      title={t("meta_title", { defaultValue: "IN-FOMO | Portfolio" })}
      description={t("meta_description", { defaultValue: "Learn about IN-FOMO - our team, values, and mission to deliver innovative IT solutions."})}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/90 text-white stagger-delay-1">
              {t('hero.badge')}
            </div>
            
            <h1 className="heading-1 mb-6 stagger-delay-2">
              {t('hero.title')} <span className="text-primary">{t('hero.title_highlight')}</span>
            </h1>
            
            <p className="mb-10 text-xl text-gray-600 dark:text-gray-300 stagger-delay-3">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container">
          {/* Фильтры */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
            <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === category.id
                    ? 'bg-primary text-white border-transparent'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-[#1a1a1a] dark:text-gray-200 dark:hover:bg-[#222222] border-light-border dark:border-dark-border'
                }`}
                onClick={() => {
                  setActiveCategory(category.id);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search', { ns: 'portfolio', defaultValue: 'Поиск' })}
                  className="w-56 md:w-72 px-4 py-2 rounded-full border border-light-border dark:border-dark-border bg-white dark:bg-[#0f0f0f] text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                          </span>
          </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">{t('sort_by', { ns: 'portfolio', defaultValue: 'Сортировать' })}</span>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as any)}
                  className="px-3 py-2 rounded-md border border-light-border dark:border-dark-border bg-white dark:bg-[#0f0f0f] text-sm"
                >
                  <option value="year">{t('table_year', { ns: 'portfolio', defaultValue: 'Год' })}</option>
                  <option value="title">{t('table_title', { ns: 'portfolio', defaultValue: 'Название' })}</option>
                  <option value="categories">{t('table_categories', { ns: 'portfolio', defaultValue: 'Категории' })}</option>
                  <option value="technologies">{t('table_technologies', { ns: 'portfolio', defaultValue: 'Технологии' })}</option>
                </select>
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 rounded-md border border-light-border dark:border-dark-border bg-white dark:bg-[#0f0f0f] text-sm"
                  aria-label="toggle-order"
                >
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </button>
              </div>
        </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
  {filteredProjects.map((project) => (
              <div key={project.id} className="group relative rounded-2xl overflow-hidden border border-light-border dark:border-dark-border bg-white/80 dark:bg-[#0f0f0f]/80 backdrop-blur-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => trackProjectClick(project)}>
                <div className="relative h-48 md:h-56">
                  <Image src={project.images[0]} alt={t(project.titleKey, { ns: 'portfolio' })} width={800} height={450} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority />
                      <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                    {project.categories.map((c) => (
                      <button key={c} className="text-[10px] md:text-xs uppercase tracking-wider bg-black/40 text-white/95 px-2 py-1 rounded-full hover:bg-black/55" onClick={(e) => { e.stopPropagation(); setActiveCategory(c); }}>
                        {c}
                      </button>
            ))}
          </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-black/75 via-black/25 to-transparent">
                    <h3 className="text-lg md:text-xl font-bold text-white line-clamp-1">{t(project.titleKey, { ns: 'portfolio' })}</h3>
        </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">{t(project.descriptionKey, { ns: 'portfolio' })}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(project.highlights || []).slice(0, 3).map((h) => (
                      <span key={h} className="text-[11px] bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">{t(h as any, { ns: 'portfolio', defaultValue: h })}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{project.year}</span>
                      {project.link && project.link !== '#' && (
                        <button onClick={(e) => trackProjectLinkClick(project, e)} className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/90">
                          {t('view_project', { ns: 'portfolio' })}
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

          {/* Конец списка карточек */}

          {/* Модальное окно */}
          {selectedProject && (
  <div
    className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in pt-[64px]"
    onClick={() => {
      if (selectedProject) {
        setSelectedProject(null);
      }
    }}
  >
    <div className="min-h-[calc(50vh-64px)] px-4 flex items-center justify-center">
      <div
        className="inline-block w-full max-w-6xl text-left align-middle transition-all transform rounded-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-primary/40 via-transparent to-primary/40">
          <div className="flex flex-col lg:flex-row rounded-3xl bg-white dark:bg-[#0f0f0f] backdrop-blur-lg border border-light-border/90 dark:border-[#ff2a00] shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
          {/* Карусель изображений */}
          <div className="relative lg:w-2/3">
            <div className="relative w-full">
              <Image
                src={selectedProject.images[currentImageIndex]}
                alt={`${t(selectedProject.titleKey, { ns: 'portfolio' })} - ${currentImageIndex + 1}`}
                width={1200}
                height={675}
                priority
                className="w-full h-auto object-contain rounded-tl-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
              />
            </div>

            {/* Кнопка закрытия */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2.5 text-white/90 hover:text-white bg-black/40 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all duration-200 shadow-lg"
              aria-label={t('close_modal', { ns: 'portfolio' })}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {selectedProject.images.length > 1 && (
              <>
                {/* Prev/Next */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/85 hover:text-white bg-black/30 hover:bg-black/40 backdrop-blur-sm rounded-full transition-all duration-200 shadow"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/85 hover:text-white bg-black/30 hover:bg-black/40 backdrop-blur-sm rounded-full transition-all duration-200 shadow"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {/* Thumbnails + counter */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <div className="flex gap-2 overflow-x-auto p-1 rounded-md bg-black/20 backdrop-blur-sm">
                    {selectedProject.images.slice(0, 8).map((img, index) => (
                      <button
                        key={img}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                        className={`h-10 w-16 rounded-md overflow-hidden border ${currentImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                      >
                        <Image src={img} alt={`thumb-${index+1}`} width={64} height={40} className="object-cover w-16 h-10" />
                      </button>
                    ))}
                  </div>
                  <div className="ml-auto text-xs text-white/90 bg-black/30 px-2 py-1 rounded-md">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Информация о проекте */}
          <div className="lg:w-1/3 p-6 lg:p-8 flex flex-col">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {t(selectedProject.titleKey, { ns: 'portfolio' })}
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.categories.map((category) => (
                <span
                  key={category}
                  className="text-xs font-medium bg-primary/15 text-primary px-3 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>

                  {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {t('what_we_did', { ns: 'portfolio', defaultValue: 'Что сделали' })}
                </h3>
                <div className="flex flex-wrap gap-2">
                      {selectedProject.highlights.map((h) => (
                        <span key={h} className="text-xs font-medium bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">
                          {t(h as any, { ns: 'portfolio', defaultValue: h })}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {t('description', { ns: 'portfolio' })}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t(selectedProject.descriptionKey, { ns: 'portfolio' })}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
                  {t('technologies', { ns: 'portfolio' })}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedProject.year}
                </span>
                <button
                  onClick={() => trackProjectLinkClick(selectedProject, { stopPropagation: () => {} } as any)}
                  disabled={!selectedProject.link || selectedProject.link === '#'}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-full transition-colors disabled:opacity-60"
                >
                  {t('view_project', { ns: 'portfolio' })}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

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

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const translations = await serverSideTranslations(locale, ['common', 'portfolio']);
  
  return {
    props: {
      ...translations,
      footerVariant: 'design1'
    },
  };
};

export default Portfolio;
