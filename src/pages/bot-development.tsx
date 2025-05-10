import { GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '../components/SEO';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// Custom hook for animation on scroll
function useAnimateOnScroll(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

// Component for typing effect
function TypedText({ text, speed = 50 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);
  
  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
}

// Component for countdown timer
function CountdownTimer({ targetDate, className = "" }) {
  const { t } = useTranslation(['botdev']);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  return (
    <div className={`flex items-center justify-center space-x-3 ${className}`}>
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-4xl font-bold bg-primary/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          {String(timeLeft.days).padStart(2, '0')}
        </div>
        <span className="text-xs mt-1 text-gray-300">{t('botdev:countdown_days')}</span>
      </div>
      <span className="text-2xl font-bold text-white">:</span>
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-4xl font-bold bg-primary/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span className="text-xs mt-1 text-gray-300">{t('botdev:countdown_hours')}</span>
      </div>
      <span className="text-2xl font-bold text-white">:</span>
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-4xl font-bold bg-primary/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className="text-xs mt-1 text-gray-300">{t('botdev:countdown_minutes')}</span>
      </div>
      <span className="text-2xl font-bold text-white">:</span>
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-4xl font-bold bg-primary/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white animate-pulse">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <span className="text-xs mt-1 text-gray-300">{t('botdev:countdown_seconds')}</span>
      </div>
    </div>
  );
}

// Component for animated profit growth chart
function ProfitGrowthChart({ isVisible }) {
  // Chart data
  const data = [
    { month: 1, profit: 10, timeSpent: 10 },
    { month: 2, profit: 25, timeSpent: 50 },
    { month: 3, profit: 45, timeSpent: 60 },
    { month: 4, profit: 55, timeSpent: 70 },
    { month: 5, profit: 65, timeSpent: 75 },
    { month: 6, profit: 85, timeSpent: 75 }
  ];
  
  // Chart dimensions
  const width = 600;
  const height = 300;
  const padding = 40;
  
  // Calculate positions
  const xScale = (i) => padding + (i / (data.length - 1)) * (width - padding * 2);
  const yScaleProfit = (val) => height - padding - (val / 100) * (height - padding * 2);
  const yScaleTime = (val) => padding + (val / 100) * (height - padding * 2);
  
  // Generate path data
  const profitLine = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScaleProfit(d.profit)}`
  ).join(' ');
  
  const timeLine = data.map((d, i) => 
    `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScaleTime(d.timeSpent)}`
  ).join(' ');
  
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* X and Y axis */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="currentColor" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="currentColor" strokeWidth="2" />
        
        {/* Axis labels */}
        <text x={width / 2} y={height - 10} textAnchor="middle" className="text-xs fill-current">Месяцы после внедрения бота</text>
        <text x={10} y={height / 2} textAnchor="middle" transform={`rotate(-90, 10, ${height / 2})`} className="text-xs fill-current">Показатели (%)</text>
        
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((tick, i) => (
          <g key={i}>
            <line 
              x1={padding} 
              y1={padding + (tick / 100) * (height - padding * 2)} 
              x2={width - padding} 
              y2={padding + (tick / 100) * (height - padding * 2)} 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeDasharray="5,5" 
              opacity="0.3"
            />
            <text 
              x={padding - 10} 
              y={padding + (tick / 100) * (height - padding * 2)} 
              textAnchor="end" 
              dominantBaseline="middle" 
              className="text-xs fill-current"
            >
              {100 - tick}%
            </text>
          </g>
        ))}
        
        {/* Month labels */}
        {data.map((d, i) => (
          <text 
            key={i}
            x={xScale(i)} 
            y={height - padding + 20} 
            textAnchor="middle" 
            className="text-xs fill-current"
          >
            {d.month}
          </text>
        ))}
        
        {/* Profit line */}
        <path 
          d={profitLine} 
          fill="none" 
          stroke="#FF5A00" 
          strokeWidth="3"
          strokeDasharray={isVisible ? "none" : "1000"} 
          strokeDashoffset={isVisible ? "0" : "1000"}
          style={{ transition: "stroke-dashoffset 2s ease" }}
        />
        
        {/* Time spent line */}
        <path 
          d={timeLine} 
          fill="none" 
          stroke="#3B82F6" 
          strokeWidth="3"
          strokeDasharray={isVisible ? "none" : "1000"} 
          strokeDashoffset={isVisible ? "0" : "1000"}
          style={{ transition: "stroke-dashoffset 2s ease", transitionDelay: "0.5s" }}
        />
        
        {/* Data points - Profit */}
        {data.map((d, i) => (
          <circle 
            key={`profit-${i}`}
            cx={xScale(i)} 
            cy={yScaleProfit(d.profit)} 
            r="6"
            fill="#FF5A00"
            opacity={isVisible ? "1" : "0"}
            style={{ transition: "opacity 0.5s ease", transitionDelay: `${i * 0.2}s` }}
          />
        ))}
        
        {/* Data points - Time spent */}
        {data.map((d, i) => (
          <circle 
            key={`time-${i}`}
            cx={xScale(i)} 
            cy={yScaleTime(d.timeSpent)} 
            r="6"
            fill="#3B82F6"
            opacity={isVisible ? "1" : "0"}
            style={{ transition: "opacity 0.5s ease", transitionDelay: `${i * 0.2 + 0.5}s` }}
          />
        ))}
        
        {/* Legend */}
        <g transform={`translate(${width - 150}, 20)`}>
          <rect x="0" y="0" width="130" height="50" rx="5" fill="rgba(255,255,255,0.1)" />
          <circle cx="15" cy="15" r="5" fill="#FF5A00" />
          <text x="30" y="18" className="text-xs fill-current">Рост прибыли</text>
          <circle cx="15" cy="35" r="5" fill="#3B82F6" />
          <text x="30" y="38" className="text-xs fill-current">Затраты времени</text>
        </g>
      </svg>
    </div>
  );
}

export default function BotDevelopment() {
  const { t } = useTranslation(['common', 'botdev']);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const heroAnim = useAnimateOnScroll(0.1);
  const featuresAnim = useAnimateOnScroll(0.1);
  const botTypesAnim = useAnimateOnScroll(0.1);
  const pricingAnim = useAnimateOnScroll(0.1);
  const chartAnim = useAnimateOnScroll(0.1);
  
  // Set countdown target date to 7 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  
  return (
    <>
      <SEO
        title={t('botdev:meta.title')}
        description={t('botdev:meta.description')}
      />
      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section ref={heroAnim.ref} className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-dark-bg dark:bg-dark-bg text-white overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/20 blur-3xl transform translate-x-1/3 -translate-y-1/3 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl transform -translate-x-1/3 translate-y-1/3 animate-float-slow"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-500/30 rounded-full blur-xl animate-float"></div>
            <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-purple-500/30 rounded-full blur-xl animate-float-reverse"></div>
            
            {/* Floating code particles */}
            <div className="hidden md:block absolute top-20 left-10 text-sm text-primary/70 animate-float-slow">
              {`{code: "bot"}`}
            </div>
            <div className="hidden md:block absolute bottom-24 right-20 text-sm text-blue-400/70 animate-float">
              {`function botBuilder() { ... }`}
            </div>
            <div className="hidden md:block absolute top-1/3 right-1/3 text-sm text-green-400/70 animate-float-reverse">
              {`<Bot active={true} />`}
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center">
              <div className="inline-block px-4 py-2 bg-primary/30 backdrop-blur-sm rounded-full text-primary-light mb-6 animate-pulse-subtle hover:animate-none hover:bg-primary/40 transition-all cursor-default">
                {t('botdev:hero_badge')}
              </div>
              <h1 className={`text-4xl md:text-6xl font-bold text-center mb-6 transition-opacity duration-1000 ${heroAnim.isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <span>{t('botdev:hero_title_1')} </span>
                <span className="text-primary relative inline-block">
                  {t('botdev:hero_title_highlight')}
                  <span className="absolute -inset-1 bg-primary/20 blur-sm rounded-lg -z-10"></span>
                </span>
                <span> {t('botdev:hero_title_2')}</span>
              </h1>
              <p className={`text-lg text-gray-200 max-w-3xl text-center mb-10 transition-all duration-1000 delay-300 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <TypedText text={t('botdev:hero_description')} speed={10} />
              </p>
              
              {/* Special Offer and Countdown Timer */}
              <div className={`w-full max-w-3xl mx-auto mb-8 relative transition-all duration-1000 delay-500 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-blue-600/20 to-purple-500/20 rounded-xl blur-md"></div>
                <div className="absolute inset-0 bg-dark-bg/50 backdrop-blur-sm rounded-xl"></div>
                
                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary/30 blur-xl animate-pulse-slow"></div>
                <div className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full bg-blue-500/30 blur-xl animate-float-slow"></div>
                <div className="absolute top-1/2 right-4 w-2 h-2 bg-primary/50 rounded-full animate-ping-slow"></div>
                <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-blue-500/30 rounded-full animate-float-reverse"></div>
                
                <div className="relative z-10 p-5 rounded-xl border border-primary/20 overflow-hidden">
                  {/* Top ribbon */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 rotate-45">
                    <div className="absolute bottom-0 w-full h-12 bg-primary flex items-end justify-center pb-1">
                      <span className="text-xs font-bold text-white">{t('botdev:special_offer_badge')}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 text-shadow-sm">
                        {t('botdev:special_offer_title')}
                      </h3>
                      <p className="text-gray-200 text-sm mb-3">{t('botdev:special_offer_countdown')}</p>
                      
                      <CountdownTimer targetDate={targetDate} className="mb-4" />
                      
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                        <div className="inline-flex items-center px-2 py-1 bg-primary/20 rounded-full">
                          <svg className="w-3 h-3 text-green-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-200 text-xs">{t('botdev:special_offer_discount')}</span>
                        </div>
                        <div className="inline-flex items-center px-2 py-1 bg-blue-500/20 rounded-full">
                          <svg className="w-3 h-3 text-green-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-200 text-xs">{t('botdev:special_offer_setup')}</span>
                        </div>
                        <div className="inline-flex items-center px-2 py-1 bg-purple-500/20 rounded-full">
                          <svg className="w-3 h-3 text-green-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-200 text-xs">{t('botdev:special_offer_support')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
                        <Link 
                          href="#pricing" 
                          className="relative z-10 px-6 py-3 bg-primary hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all duration-300 rounded-full font-medium group overflow-hidden flex items-center"
                        >
                          <span className="relative z-10 flex items-center">
                            {t('botdev:get_started')}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </Link>
                      </div>
                      
                      <div className="mt-3 text-center">
                        <div className="inline-block px-3 py-1 bg-dark-surface/50 rounded-full">
                          <span className="text-xs text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            {t('botdev:special_offer_secure_payment')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`transition-all duration-1000 delay-700 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Link href="#pricing" className="px-8 py-3 bg-primary hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all duration-300 rounded-full font-medium relative group overflow-hidden">
                  <span className="relative z-10">{t('botdev:get_started')}</span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  <span className="absolute inset-0 w-0 h-0 bg-white rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2 group-hover:w-56 group-hover:h-56 transition-all duration-500"></span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Animated bot illustration */}
          <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 opacity-20 animate-float-slow">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="60" y="40" width="80" height="100" rx="10" stroke="currentColor" strokeWidth="2"/>
              <circle cx="80" cy="70" r="10" fill="currentColor"/>
              <circle cx="120" cy="70" r="10" fill="currentColor"/>
              <rect x="70" y="100" width="60" height="10" rx="5" fill="currentColor"/>
              <rect x="50" y="150" width="20" height="30" rx="5" stroke="currentColor" strokeWidth="2"/>
              <rect x="130" y="150" width="20" height="30" rx="5" stroke="currentColor" strokeWidth="2"/>
              <path d="M70 40 L50 20 L40 30" stroke="currentColor" strokeWidth="2"/>
              <path d="M130 40 L150 20 L160 30" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresAnim.ref} className="relative py-16 md:py-24 bg-light-surface dark:bg-dark-surface overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-primary/10 animate-ping-slow opacity-70"></div>
          <div className="absolute bottom-12 left-12 w-24 h-24 rounded-full bg-blue-500/10 animate-pulse-slow opacity-30"></div>
          
          <div className="container mx-auto px-4">
            <div className={`text-center mb-16 transition-all duration-1000 ${featuresAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-3">
                {t('botdev:features_subtitle')}
              </div>
              <br></br>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white relative inline-block">
                {t('botdev:features_title')}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/60 to-blue-500/60 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('botdev:features_description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div 
                className={`bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-light-border dark:border-dark-border group relative overflow-hidden ${featuresAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '100ms' }}
                onMouseEnter={() => setHoveredFeature(1)} 
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform group-hover:bg-primary/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white group-hover:text-primary transition-colors">{t('botdev:feature_1_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('botdev:feature_1_desc')}</p>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
              
              {/* Feature 2 */}
              <div 
                className={`bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-light-border dark:border-dark-border group relative overflow-hidden ${featuresAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '200ms' }}
                onMouseEnter={() => setHoveredFeature(2)} 
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform group-hover:bg-blue-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white group-hover:text-blue-500 transition-colors">{t('botdev:feature_2_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('botdev:feature_2_desc')}</p>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
              
              {/* Feature 3 */}
              <div 
                className={`bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-light-border dark:border-dark-border group relative overflow-hidden ${featuresAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '300ms' }}
                onMouseEnter={() => setHoveredFeature(3)} 
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform group-hover:bg-green-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white group-hover:text-green-500 transition-colors">{t('botdev:feature_3_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('botdev:feature_3_desc')}</p>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-green-500 to-emerald-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
              
              {/* Feature 4 */}
              <div 
                className={`bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-light-border dark:border-dark-border group relative overflow-hidden ${featuresAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '400ms' }}
                onMouseEnter={() => setHoveredFeature(4)} 
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform group-hover:bg-purple-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-8.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white group-hover:text-purple-500 transition-colors">{t('botdev:feature_4_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('botdev:feature_4_desc')}</p>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
              
              {/* Feature 5 */}
              <div 
                className={`bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-light-border dark:border-dark-border group relative overflow-hidden ${featuresAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '500ms' }}
                onMouseEnter={() => setHoveredFeature(5)} 
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform group-hover:bg-yellow-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white group-hover:text-yellow-500 transition-colors">{t('botdev:feature_5_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('botdev:feature_5_desc')}</p>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-yellow-500 to-amber-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
              
              {/* Feature 6 */}
              <div 
                className={`bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-light-border dark:border-dark-border group relative overflow-hidden ${featuresAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '600ms' }}
                onMouseEnter={() => setHoveredFeature(6)} 
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform group-hover:bg-red-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white group-hover:text-red-500 transition-colors">{t('botdev:feature_6_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('botdev:feature_6_desc')}</p>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-500 to-rose-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Bots Section */}
        <section ref={botTypesAnim.ref} className="relative py-16 md:py-24 bg-light-bg dark:bg-dark-bg overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute -top-8 left-1/4 w-16 h-16 rounded-full bg-blue-500/5 blur-xl animate-float-slow"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 rounded-full bg-purple-500/5 blur-xl animate-pulse-slow"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-16 transition-all duration-1000 ${botTypesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-block px-3 py-1 bg-blue-500/10 rounded-full text-blue-500 text-sm font-medium mb-3">
                {t('botdev:choose_your_bot')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{t('botdev:bot_types_title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('botdev:bot_types_description')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Bot Type 1 */}
              <div 
                className={`bg-light-surface dark:bg-dark-surface p-8 rounded-xl border border-light-border dark:border-dark-border group hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden ${botTypesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 p-2 text-xs font-semibold text-white bg-primary rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('botdev:popular')}
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white group-hover:text-primary transition-colors">{t('botdev:bot_type_1_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t('botdev:bot_type_1_desc')}</p>
                <ul className="space-y-2">
                  <li className="flex items-start group/item">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200 group-hover/item:text-primary transition-colors">{t('botdev:bot_type_1_feature_1')}</span>
                  </li>
                  <li className="flex items-start group/item">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200 group-hover/item:text-primary transition-colors">{t('botdev:bot_type_1_feature_2')}</span>
                  </li>
                  <li className="flex items-start group/item">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200 group-hover/item:text-primary transition-colors">{t('botdev:bot_type_1_feature_3')}</span>
                  </li>
                </ul>
                <div className="mt-6 h-0.5 w-full bg-gradient-to-r from-primary/30 to-transparent rounded-full transform origin-left scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </div>
              
              {/* Bot Type 2 */}
              <div 
                className={`bg-light-surface dark:bg-dark-surface p-8 rounded-xl border border-light-border dark:border-dark-border group hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 relative overflow-hidden ${botTypesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-12 transition-all duration-700"></div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white group-hover:text-blue-500 transition-colors">{t('botdev:bot_type_2_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t('botdev:bot_type_2_desc')}</p>
                <ul className="space-y-2">
                  <li className="flex items-start group/item">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200 group-hover/item:text-blue-500 transition-colors">{t('botdev:bot_type_2_feature_1')}</span>
                  </li>
                  <li className="flex items-start group/item">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200 group-hover/item:text-blue-500 transition-colors">{t('botdev:bot_type_2_feature_2')}</span>
                  </li>
                  <li className="flex items-start group/item">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200 group-hover/item:text-blue-500 transition-colors">{t('botdev:bot_type_2_feature_3')}</span>
                  </li>
                </ul>
                <div className="mt-6 h-0.5 w-full bg-gradient-to-r from-blue-500/30 to-transparent rounded-full transform origin-left scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </div>
              
              {/* Bot Type 3 */}
              <div 
                className={`bg-light-surface dark:bg-dark-surface p-8 rounded-xl border border-light-border dark:border-dark-border group hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 relative overflow-hidden ${botTypesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-[-3rem] transition-all duration-700"></div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white group-hover:text-purple-500 transition-colors">{t('botdev:bot_type_3_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t('botdev:bot_type_3_desc')}</p>
                <ul className="space-y-2">
                  <li className="flex items-start group/item">
                    <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200 group-hover/item:text-purple-500 transition-colors">{t('botdev:bot_type_3_feature_1')}</span>
                  </li>
                  <li className="flex items-start group/item">
                    <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200 group-hover/item:text-purple-500 transition-colors">{t('botdev:bot_type_3_feature_2')}</span>
                  </li>
                  <li className="flex items-start group/item">
                    <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 group-hover/item:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="dark:text-gray-200 group-hover/item:text-purple-500 transition-colors">{t('botdev:bot_type_3_feature_3')}</span>
                  </li>
                </ul>
                <div className="mt-6 h-0.5 w-full bg-gradient-to-r from-purple-500/30 to-transparent rounded-full transform origin-left scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Analysis Section */}
        <section ref={chartAnim.ref} className="relative py-16 md:py-24 bg-gradient-to-br from-dark-bg via-dark-bg/95 to-dark-bg text-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl transform translate-x-1/3 -translate-y-1/3 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl transform -translate-x-1/3 translate-y-1/3 animate-float-slow"></div>
            
            {/* Floating code particles */}
            <div className="hidden md:block absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float-slow"></div>
            <div className="hidden md:block absolute bottom-1/4 right-1/3 w-3 h-3 bg-blue-500/40 rounded-full animate-float-reverse"></div>
            <div className="hidden md:block absolute top-1/3 right-1/4 w-2 h-2 bg-purple-500/40 rounded-full animate-pulse-subtle"></div>
            
            {/* Data particles */}
            <div className="hidden md:block absolute bottom-16 left-16 text-xs text-primary/50 animate-float-slow">
              {`{ profit: +85%, time: -80% }`}
            </div>
            <div className="hidden md:block absolute top-20 right-20 text-xs text-blue-400/50 animate-float">
              {`ROI = 350%`}
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-12 transition-all duration-1000 ${chartAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-block px-4 py-1 bg-primary/20 rounded-full text-primary text-sm font-medium mb-4">
                {t('botdev:roi_analysis_badge')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('botdev:roi_analysis_title')}</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                {t('botdev:roi_analysis_description')}
              </p>
            </div>
            
            <div className={`bg-dark-surface/70 backdrop-blur-sm p-8 rounded-xl border border-dark-border mb-12 transition-all duration-1000 delay-300 ${chartAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <ProfitGrowthChart isVisible={chartAnim.isVisible} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Stat 1 */}
              <div className={`bg-dark-surface/50 backdrop-blur-sm p-6 rounded-xl border border-dark-border group hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-1000 delay-400 ${chartAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">{t('botdev:roi_profit_title')}</h3>
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{t('botdev:roi_profit_value')}</div>
                <p className="text-gray-300">{t('botdev:roi_profit_description')}</p>
              </div>
              
              {/* Stat 2 */}
              <div className={`bg-dark-surface/50 backdrop-blur-sm p-6 rounded-xl border border-dark-border group hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-1000 delay-500 ${chartAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">{t('botdev:roi_time_title')}</h3>
                </div>
                <div className="text-4xl font-bold text-blue-500 mb-2">{t('botdev:roi_time_value')}</div>
                <p className="text-gray-300">{t('botdev:roi_time_description')}</p>
              </div>
              
              {/* Stat 3 */}
              <div className={`bg-dark-surface/50 backdrop-blur-sm p-6 rounded-xl border border-dark-border group hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-1000 delay-600 ${chartAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">{t('botdev:roi_roi_title')}</h3>
                </div>
                <div className="text-4xl font-bold text-green-500 mb-2">{t('botdev:roi_roi_value')}</div>
                <p className="text-gray-300">{t('botdev:roi_roi_description')}</p>
              </div>
            </div>
            
            <div className={`mt-12 text-center transition-all duration-1000 delay-700 ${chartAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link href="#pricing" className="inline-block px-8 py-3 bg-primary hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all duration-300 rounded-full font-medium relative group overflow-hidden">
                <span className="relative z-10">{t('botdev:roi_cta')}</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                <span className="absolute inset-0 w-0 h-0 bg-white rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2 group-hover:w-56 group-hover:h-56 transition-all duration-500"></span>
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" ref={pricingAnim.ref} className="relative py-16 md:py-24 bg-light-surface dark:bg-dark-surface overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="absolute top-40 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-primary/5 to-blue-500/5 blur-3xl animate-blob"></div>
          <div className="absolute bottom-40 left-20 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-3xl animate-blob animation-delay-2000"></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float-slow"></div>
            <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-blue-500/40 rounded-full animate-float-reverse"></div>
            <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-purple-500/40 rounded-full animate-ping-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-indigo-500/40 rounded-full animate-pulse-slow"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className={`text-center mb-16 transition-all duration-1000 ${pricingAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-3">
                {t('botdev:pricing_badge')}
              </div>
              <br></br>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white relative inline-block">
                {t('botdev:pricing_title')}
                <span className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full"></span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('botdev:pricing_description')}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                {t('botdev:pricing_updated')}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Price 1 */}
              <div 
                className={`bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-light-border dark:border-dark-border group hover:border-primary/30 dark:hover:border-primary/30 relative overflow-hidden ${pricingAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 group-hover:translate-y-8 transition-all duration-1000"></div>
                
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-primary transition-colors">{t('botdev:price_1_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{t('botdev:price_1_desc')}</p>
                  <div className="text-3xl font-bold text-primary mb-6 flex items-end">
                    <span className="text-sm mr-1">$</span>
                    <span className="group-hover:scale-110 transition-transform inline-block">{t('botdev:price_1_amount')}</span>
                    <span className="text-gray-400 text-base font-normal ml-2"></span>
                  </div>
                  <Link href="/contact" className="block text-center px-6 py-3 bg-primary hover:bg-primary-dark transition-all duration-300 text-white rounded-lg font-medium group-hover:shadow-lg group-hover:shadow-primary/25 relative overflow-hidden">
                    <span className="relative z-10">{t('botdev:get_started')}</span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </div>
              </div>
              
              {/* Price 2 */}
              <div 
                className={`bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-light-border dark:border-dark-border group hover:border-blue-500/30 dark:hover:border-blue-500/30 relative  ${pricingAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 group-hover:translate-y-8 transition-all duration-1000"></div>
                
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                  <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse-subtle">
                    {t('botdev:popular_choice')}
                  </div>
                </div>
                
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-blue-500 transition-colors">{t('botdev:price_2_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{t('botdev:price_2_desc')}</p>
                  <div className="text-3xl font-bold text-blue-500 mb-6 flex items-end">
                    <span className="text-sm mr-1">$</span>
                    <span className="group-hover:scale-110 transition-transform inline-block">{t('botdev:price_2_amount')}</span>
                    <span className="text-gray-400 text-base font-normal ml-2"></span>
                  </div>
                  <Link href="/contact" className="block text-center px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white rounded-lg font-medium group-hover:shadow-lg group-hover:shadow-blue-500/25 relative overflow-hidden">
                    <span className="relative z-10">{t('botdev:get_started')}</span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </div>
              </div>
              
              {/* Price 3 */}
              <div 
                className={`bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-light-border dark:border-dark-border group hover:border-purple-500/30 dark:hover:border-purple-500/30 relative overflow-hidden ${pricingAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 group-hover:translate-y-8 transition-all duration-1000"></div>
                
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-purple-500 transition-colors">{t('botdev:price_3_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{t('botdev:price_3_desc')}</p>
                  <div className="text-3xl font-bold text-purple-500 mb-6 flex items-end">
                    <span className="text-sm mr-1">$</span>
                    <span className="group-hover:scale-110 transition-transform inline-block">{t('botdev:price_3_amount')}</span>
                    <span className="text-gray-400 text-base font-normal ml-2"></span>
                  </div>
                  <Link href="/contact" className="block text-center px-6 py-3 bg-purple-500 hover:bg-purple-600 transition-all duration-300 text-white rounded-lg font-medium group-hover:shadow-lg group-hover:shadow-purple-500/25 relative overflow-hidden">
                    <span className="relative z-10">{t('botdev:get_started')}</span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </div>
              </div>
              
              {/* Price 4 */}
              <div 
                className={`bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-light-border dark:border-dark-border group hover:border-indigo-500/30 dark:hover:border-indigo-500/30 relative overflow-hidden ${pricingAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 group-hover:translate-y-8 transition-all duration-1000"></div>
                
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-indigo-500 transition-colors">{t('botdev:price_4_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{t('botdev:price_4_desc')}</p>
                  <div className="text-3xl font-bold text-indigo-500 mb-6 flex items-end">
                    <span className="text-sm mr-1">$</span>
                    <span className="group-hover:scale-110 transition-transform inline-block">{t('botdev:price_4_amount')}</span>
                    <span className="text-gray-400 text-base font-normal ml-2"></span>
                  </div>
                  <Link href="/contact" className="block text-center px-6 py-3 bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 text-white rounded-lg font-medium group-hover:shadow-lg group-hover:shadow-indigo-500/25 relative overflow-hidden">
                    <span className="relative z-10">{t('botdev:get_started')}</span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </div>
              </div>
              
              {/* Price 5 */}
              <div 
                className={`bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-light-border dark:border-dark-border group hover:border-pink-500/30 dark:hover:border-pink-500/30 relative overflow-hidden ${pricingAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '500ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 group-hover:translate-y-8 transition-all duration-1000"></div>
                
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-pink-500 transition-colors">{t('botdev:price_5_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{t('botdev:price_5_desc')}</p>
                  <div className="text-3xl font-bold text-pink-500 mb-6 flex items-end">
                    <span className="text-sm mr-1">$</span>
                    <span className="group-hover:scale-110 transition-transform inline-block">{t('botdev:price_5_amount')}</span>
                    <span className="text-gray-400 text-base font-normal ml-2"></span>
                  </div>
                  <Link href="/contact" className="block text-center px-6 py-3 bg-pink-500 hover:bg-pink-600 transition-all duration-300 text-white rounded-lg font-medium group-hover:shadow-lg group-hover:shadow-pink-500/25 relative overflow-hidden">
                    <span className="relative z-10">{t('botdev:get_started')}</span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </div>
              </div>
              
              {/* Price 6 */}
              <div 
                className={`bg-light-bg dark:bg-dark-bg p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-light-border dark:border-dark-border group hover:border-green-500/30 dark:hover:border-green-500/30 relative overflow-hidden ${pricingAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '600ms' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 group-hover:translate-y-8 transition-all duration-1000"></div>
                
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-green-500 transition-colors">{t('botdev:price_6_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{t('botdev:price_6_desc')}</p>
                  <div className="text-3xl font-bold text-green-500 mb-6 flex items-end">
                    <span className="text-sm mr-1">$</span>
                    <span className="group-hover:scale-110 transition-transform inline-block">{t('botdev:price_6_amount')}</span>
                    <span className="text-gray-400 text-base font-normal ml-2"></span>
                  </div>
                  <Link href="/contact" className="block text-center px-6 py-3 bg-green-500 hover:bg-green-600 transition-all duration-300 text-white rounded-lg font-medium group-hover:shadow-lg group-hover:shadow-green-500/25 relative overflow-hidden">
                    <span className="relative z-10">{t('botdev:get_started')}</span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className={`mt-16 transition-all duration-1000 delay-300 ${pricingAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="text-2xl font-bold mb-8 text-center dark:text-white relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">{t('botdev:additional_services_title')}</span>
                <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-primary via-blue-500 to-transparent"></div>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Additional Service 1 */}
                <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-light-border dark:border-dark-border hover:border-primary/30 dark:hover:border-primary/30 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-primary transition-colors">{t('botdev:additional_1_title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t('botdev:additional_1_desc')}</p>
                  <div className="text-2xl font-bold text-primary flex items-end">
                    <span className="text-sm mr-1">$</span>
                    <span className="group-hover:scale-105 transition-transform inline-block">{t('botdev:additional_1_amount')}</span>
                  </div>
                </div>
                
                {/* Additional Service 2 */}
                <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-light-border dark:border-dark-border hover:border-blue-500/30 dark:hover:border-blue-500/30 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-indigo-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-blue-500 transition-colors">{t('botdev:additional_2_title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t('botdev:additional_2_desc')}</p>
                  <div className="text-2xl font-bold text-blue-500 flex items-end">
                    <span className="text-sm mr-1">$</span>
                    <span className="group-hover:scale-105 transition-transform inline-block">{t('botdev:additional_2_amount')}</span>
                  </div>
                </div>
                
                {/* Additional Service 3 */}
                <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-light-border dark:border-dark-border hover:border-purple-500/30 dark:hover:border-purple-500/30 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-pink-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-purple-500 transition-colors">{t('botdev:additional_3_title')}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{t('botdev:additional_3_desc')}</p>
                  <div className="text-2xl font-bold text-purple-500 flex items-end">
                    <span className="text-sm mr-1">$</span>
                    <span className="group-hover:scale-105 transition-transform inline-block">{t('botdev:additional_3_amount')}</span>
                    <span className="text-gray-400 text-base font-normal ml-2"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 md:py-24 bg-dark-bg dark:bg-dark-bg text-white overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/15 blur-3xl transform translate-x-1/3 -translate-y-1/3 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl transform -translate-x-1/3 translate-y-1/3 animate-float-slow"></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl animate-float"></div>
            
            {/* Floating particles */}
            <div className="hidden md:block absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-ping-slow"></div>
            <div className="hidden md:block absolute bottom-1/4 right-1/3 w-3 h-3 bg-blue-500/40 rounded-full animate-float-reverse"></div>
            <div className="hidden md:block absolute top-1/3 right-1/4 w-2 h-2 bg-purple-500/40 rounded-full animate-pulse-subtle"></div>
            
            {/* Code particles */}
            <div className="hidden md:block absolute bottom-16 left-16 text-xs text-primary/50 animate-float-slow">
              {`function buildBot() { ... }`}
            </div>
            <div className="hidden md:block absolute top-20 right-20 text-xs text-blue-400/50 animate-float">
              {`<BotFeature active={true} />`}
            </div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/20 text-white text-sm font-medium mb-4 backdrop-blur-sm">
                {t('botdev:ready_to_start')}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {t('botdev:cta_title')}
                <span className="text-primary relative inline-block ml-2">
                  <span className="relative z-10">{t('botdev:cta_highlight')}</span>
                  <span className="absolute -inset-1 bg-primary/20 rounded blur-sm -z-10"></span>
                </span>
              </h2>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
                {t('botdev:cta_description')}
              </p>
              <Link 
                href="/contact" 
                className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl font-medium text-lg shadow-lg shadow-primary/25 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {t('botdev:contact_us')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-primary-dark to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                <span className="absolute inset-0 w-0 h-0 bg-white rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2 group-hover:w-96 group-hover:h-96 transition-all duration-500"></span>
              </Link>
              
              <div className="flex items-center justify-center mt-8 text-gray-300">
                <div className="flex items-center mr-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('botdev:support_247')}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('botdev:quick_response')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const translations = await serverSideTranslations(locale, ['common', 'botdev']);
  
  return {
    props: {
      ...translations,
      footerVariant: 'design1'
    },
  };
}; 