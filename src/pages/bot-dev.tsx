import { useState, useEffect, useRef } from 'react';
import { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import SEO from '../components/SEO';
import BusinessCharts from '../components/BusinessCharts';
import ClientOnly from '../utils/ClientOnly';
import Head from 'next/head';

// Базовые данные для графика, которые будут переведены внутри компонента
const baseChartData = [
  {
    day: 1,
    managerTime: 90,
    revenue: 10,
    botMangerTime: 85,
    botRevenue: 15,
  },
  {
    day: 7,
    managerTime: 85,
    revenue: 20,
    botMangerTime: 70,
    botRevenue: 30,
  },
  {
    day: 15,
    managerTime: 80,
    revenue: 30,
    botMangerTime: 60,
    botRevenue: 45,
  },
  {
    day: 30,
    managerTime: 78,
    revenue: 35,
    botMangerTime: 45,
    botRevenue: 65,
  },
  {
    day: 60,
    managerTime: 75,
    revenue: 40,
    botMangerTime: 30,
    botRevenue: 85,
  },
  {
    day: 90,
    managerTime: 73,
    revenue: 45,
    botMangerTime: 25,
    botRevenue: 95,
  },
];

export default function BotDev() {
  const { t } = useTranslation(['common', 'bot-dev']);
  
  // Подготовка переводов для компонентов графиков
  const chartTranslations = {
    beforeBot: t('bot-dev:chart_section.before_bot'),
    afterBot: t('bot-dev:chart_section.after_bot'),
    managerTime: t('bot-dev:chart_section.manager_time'),
    revenue: t('bot-dev:chart_section.revenue'),
  };
  
  // Преобразуем базовые данные в данные с переводами
  const chartData = baseChartData.map(item => {
    // Безопасный доступ к переводам
    let dayName;
    try {
      dayName = t('common:day', { count: item.day });
    } catch (e) {
      dayName = `Day ${item.day}`;
    }
    
    return {
      name: dayName || `Day ${item.day}`,
      managerTime: item.managerTime,
      revenue: item.revenue,
      botMangerTime: item.botMangerTime,
      botRevenue: item.botRevenue,
    };
  });

  // Bot packages data
  const BOT_PACKAGES = [
    {
      id: 'telegram_bot',
      title: t('bot-dev:pricing.packages.telegram_bot.title'),
      description: t('bot-dev:pricing.packages.telegram_bot.description'),
      price: 500,
      color: 'bg-blue-500',
    },
    {
      id: 'chatbot',
      title: t('bot-dev:pricing.packages.chatbot.title'),
      description: t('bot-dev:pricing.packages.chatbot.description'),
      price: 700,
      color: 'bg-green-500',
    },
    {
      id: 'ai_bot',
      title: t('bot-dev:pricing.packages.ai_bot.title'),
      description: t('bot-dev:pricing.packages.ai_bot.description'),
      price: 1200,
      color: 'bg-purple-500',
    },
  ];

  // Additional services
  const ADDITIONAL_SERVICES = [
    {
      id: 'integration',
      title: t('bot-dev:pricing.services.integration'),
      price: 50,
    },
    {
      id: 'payment_processing',
      title: t('bot-dev:pricing.services.payment_processing'),
      price: 100,
    },
    {
      id: 'custom_analytics',
      title: t('bot-dev:pricing.services.custom_analytics'),
      price: 80,
    },
    {
      id: 'multi_language',
      title: t('bot-dev:pricing.services.multi_language'),
      price: 120,
    },
    {
      id: 'cloud_hosting',
      title: t('bot-dev:pricing.services.cloud_hosting'),
      price: 60,
    },
    // Новые дополнительные услуги, связанные с ботами
    {
      id: 'ai_training',
      title: t('bot-dev:pricing.services.ai_training'),
      price: 200,
    },
    {
      id: 'voice_recognition',
      title: t('bot-dev:pricing.services.voice_recognition'),
      price: 150,
    },
    {
      id: 'crm_integration',
      title: t('bot-dev:pricing.services.crm_integration'),
      price: 120,
    },
    {
      id: 'chatbot_templates',
      title: t('bot-dev:pricing.services.chatbot_templates'),
      price: 80,
    },
    {
      id: 'messenger_sync',
      title: t('bot-dev:pricing.services.messenger_sync'),
      price: 100,
    },
    {
      id: 'bot_maintenance',
      title: t('bot-dev:pricing.services.bot_maintenance'),
      price: 75,
    },
    {
      id: 'user_behavior_analysis',
      title: t('bot-dev:pricing.services.user_behavior_analysis'),
      price: 90,
    },
  ];
  
  // State variables
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    contactType: 'telegram', // Default contact type
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedPackage) return 0;
    
    const packagePrice = BOT_PACKAGES.find(pkg => pkg.id === selectedPackage)?.price || 0;
    const additionalServicesPrice = additionalServices.reduce((total, serviceId) => {
      const service = ADDITIONAL_SERVICES.find(svc => svc.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
    
    return packagePrice + additionalServicesPrice;
  };
  
  // Form handlers
  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };
  
  const handleAdditionalServiceToggle = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.contact) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    if (!selectedPackage) {
      setErrorMessage('Please select a bot package');
      return;
    }
    
    setFormStatus('submitting');
    
    // Selected package information
    const selectedPackageInfo = BOT_PACKAGES.find(pkg => pkg.id === selectedPackage);
    
    // Selected additional services information
    const selectedServicesInfo = ADDITIONAL_SERVICES.filter(service => 
      additionalServices.includes(service.id)
    );
    
    // Prepare data for sending
    const submissionData = {
      name: formData.name,
      contact: formData.contact,
      contactType: formData.contactType,
      message: formData.message,
      selectedPackage: selectedPackageInfo?.title,
      additionalServices: selectedServicesInfo.map(service => service.title),
      totalPrice: `$${calculateTotalPrice()}`
    };
    
    try {
      const response = await fetch('/api/send-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus('success');
        // Reset form
        setFormData({
          name: '',
          contact: '',
          contactType: 'telegram',
          message: '',
        });
        setSelectedPackage(null);
        setAdditionalServices([]);
      } else {
        setFormStatus('error');
        setErrorMessage(data.message || t('bot-dev:contact_form.error_message'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };
  
  // Chart animation
  const [chartAnimated, setChartAnimated] = useState(false);
  const rechartsSectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (rechartsSectionRef.current) {
        const rect = rechartsSectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible && !chartAnimated) {
          setChartAnimated(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chartAnimated]);
  
  // Для исправления ошибки с key_benefits
  const getBenefits = () => {
    try {
      return t('bot-dev:chart_section.key_benefits.benefits', { returnObjects: true }) as string[];
    } catch (e) {
      return [
        'Сокращение времени, затрачиваемого менеджерами на рутинные задачи',
        'Значительный рост доходов за счет автоматизации процессов',
        'Быстрая окупаемость инвестиций в разработку и внедрение бота'
      ];
    }
  };
  
  return (
    <>
      <SEO
      title={t("meta_title", { defaultValue: "IN-FOMO | Bot Development" })}
      description={t("meta_description", { defaultValue: "Learn about IN-FOMO - our team, values, and mission to deliver innovative IT solutions."})}
      />

      <Head>
        <title>{t('bot-dev:meta.title')}</title>
        <meta name="description" content={t('bot-dev:meta.description')} />
      </Head>
      
      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-xl"></div>
            <div className="absolute top-1/3 left-0 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl transform -translate-x-1/2"></div>
            <div className="absolute bottom-0 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-2xl transform -translate-x-1/2 translate-y-1/3"></div>
          </div>

          <div className="container relative z-10 py-8 md:py-16 lg:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-6 py-2 mb-4 text-sm font-medium rounded-full bg-primary text-white">
                {t('bot-dev:hero.badge')}
              </div>
              
              <h1 className="font-bold mb-4 text-3xl sm:text-5xl md:text-6xl text-gray-900 dark:text-white">
                {t('bot-dev:hero.title')}
              </h1>
              
              <p className="mb-6 text-lg md:text-xl text-gray-800 dark:text-gray-100">
                {t('bot-dev:hero.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a 
                  href="#pricing" 
                  className="btn btn-primary w-full sm:w-auto px-8"
                  aria-label={t('bot-dev:hero.cta_pricing')}
                >
                  {t('bot-dev:hero.cta_pricing')}
                </a>
                <Link 
                  href="/contact" 
                  className="btn btn-outline w-full sm:w-auto px-8"
                  aria-label={t('bot-dev:hero.cta_contact')}
                >
                  {t('bot-dev:hero.cta_contact')}
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* График Recharts */}
        <section id="recharts-section" ref={rechartsSectionRef} className="py-16 bg-white dark:bg-dark-surface">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-block px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {t('bot-dev:chart_section.badge')}
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                {t('bot-dev:chart_section.title')}
              </h2>
              
              <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
                {t('bot-dev:chart_section.description')}
              </p>
            </div>
            
            <ClientOnly fallback={
              <div className="h-80 w-full flex items-center justify-center">
                <div className="text-gray-500">Loading charts...</div>
              </div>
            }>
              <BusinessCharts 
                chartData={chartData} 
                translations={chartTranslations}
              />
            </ClientOnly>
            
            <div className="max-w-3xl mx-auto bg-light-surface dark:bg-dark-bg p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">{t('bot-dev:chart_section.key_benefits.title')}</h4>
                </div>
              </div>
              <ul className="ml-14 space-y-2 text-gray-600 dark:text-gray-300">
                {getBenefits().map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-12 md:py-16 bg-light-surface dark:bg-dark-surface">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <div className="inline-block px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {t('bot-dev:pricing.badge')}
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                {t('bot-dev:pricing.title')}
              </h2>
              
              <p className="text-base text-gray-600 dark:text-gray-300">
                {t('bot-dev:pricing.description')}
              </p>
            </div>

            {/* Bot Packages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {BOT_PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`bg-white dark:bg-dark-bg rounded-lg shadow-md overflow-hidden border-2 transition-all duration-300 ${
                    selectedPackage === pkg.id 
                      ? 'border-primary scale-105 shadow-lg' 
                      : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                  }`}
                >
                  <div className={`${pkg.color} h-2 w-full`}></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
                    <div className="flex items-end mb-6">
                      <span className="text-3xl font-bold">${pkg.price}</span>
                    </div>
                    <button
                      onClick={() => handlePackageSelect(pkg.id)}
                      className={`w-full py-2 px-4 rounded-md transition-colors ${
                        selectedPackage === pkg.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {selectedPackage === pkg.id ? t('bot-dev:contact_form.buttons.selected') : t('bot-dev:contact_form.buttons.select')}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Services */}
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">{t('bot-dev:pricing.services.title')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {ADDITIONAL_SERVICES.map((service) => (
                  <div
                    key={service.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      additionalServices.includes(service.id)
                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg'
                    }`}
                    onClick={() => handleAdditionalServiceToggle(service.id)}
                  >
                    <div className="flex items-start mb-1">
                      <div className={`h-4 w-4 rounded-sm flex-shrink-0 flex items-center justify-center mr-2 mt-0.5 ${
                        additionalServices.includes(service.id)
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        {additionalServices.includes(service.id) && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs md:text-sm font-medium leading-tight">{service.title}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs md:text-sm font-bold text-primary">${service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Price */}
            {selectedPackage && (
              <div className="max-w-3xl mx-auto bg-white dark:bg-dark-bg rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">{t('bot-dev:pricing.total_price')}:</span>
                  <span className="text-2xl font-bold text-primary">${calculateTotalPrice()}</span>
                </div>
              </div>
            )}

            {/* Contact Form */}
            {selectedPackage && (
              <div className="max-w-3xl mx-auto bg-white dark:bg-dark-bg rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">{t('bot-dev:contact_form.title')}</h3>
                {formStatus === 'success' ? (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-4 rounded-md mb-4">
                    <p className="text-center">{t('bot-dev:contact_form.success_message')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {formStatus === 'error' && (
                      <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-md mb-4">
                        <p>{errorMessage}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-base text-gray-900 dark:text-white mb-2">
                          {t('bot-dev:contact_form.fields.name.label')} <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          required
                          className="outline-none block w-full px-4 py-3 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-primary focus:ring-primary transition-colors"
                          placeholder={t('bot-dev:contact_form.fields.name.placeholder')}
                        />
                      </div>

                      <div>
                        <label className="block text-base text-gray-900 dark:text-white mb-2">
                          {t('bot-dev:contact_form.fields.contact_method.label')} <span className="text-primary">*</span>
                        </label>
                        <select
                          name="contactType"
                          value={formData.contactType}
                          onChange={handleFormChange}
                          className="outline-none block w-full px-4 py-3 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-primary focus:ring-primary transition-colors"
                        >
                          <option value="telegram">{t('bot-dev:contact_form.fields.contact_method.options.telegram')}</option>
                          <option value="whatsapp">{t('bot-dev:contact_form.fields.contact_method.options.whatsapp')}</option>
                          <option value="phone">{t('bot-dev:contact_form.fields.contact_method.options.phone')}</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-base text-gray-900 dark:text-white mb-2">
                        {t('bot-dev:contact_form.fields.contact.label')} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleFormChange}
                        required
                        className="outline-none block w-full px-4 py-3 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-primary focus:ring-primary transition-colors"
                        placeholder={
                          formData.contactType === 'telegram' 
                            ? t('bot-dev:contact_form.fields.contact.placeholder.telegram')
                            : formData.contactType === 'whatsapp' 
                              ? t('bot-dev:contact_form.fields.contact.placeholder.whatsapp')
                              : t('bot-dev:contact_form.fields.contact.placeholder.phone')
                        }
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-base text-gray-900 dark:text-white mb-2">
                        {t('bot-dev:contact_form.fields.message.label')}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        rows={4}
                        className="outline-none block w-full px-4 py-3 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-primary focus:ring-primary transition-colors resize-none"
                        placeholder={t('bot-dev:contact_form.fields.message.placeholder')}
                      ></textarea>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {formStatus === 'submitting' ? (
                          <div className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>{t('bot-dev:contact_form.buttons.sending')}</span>
                          </div>
                        ) : (
                          t('bot-dev:contact_form.buttons.submit')
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'bot-dev'])),
      footerVariant: 'design1'
    },
  };
}; 