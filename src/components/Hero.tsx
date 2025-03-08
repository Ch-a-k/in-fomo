import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const Hero = () => {
  const { t } = useTranslation('home');

  return (
    <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="container relative z-10 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in">
            {t('hero_badge')}
          </div>
          
          <h1 className="heading-1 mb-6 animate-fade-in [animation-delay:200ms]">
            {t('hero_title_1')} <span className="text-primary">{t('hero_title_highlight')}</span> {t('hero_title_2')}
          </h1>
          
          <p className="mb-10 text-xl text-gray-600 dark:text-gray-300 animate-fade-in [animation-delay:400ms]">
            {t('hero_description')}
          </p>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center animate-fade-in [animation-delay:600ms]">
            <Link href="/contact" className="btn btn-primary">
              {t('get_started')}
            </Link>
            <Link href="#services" className="btn btn-outline">
              {t('our_services')}
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 animate-fade-in [animation-delay:800ms]">
            {/* Trusted by logos */}
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-400 dark:text-gray-600 font-bold text-xl">Blastly bot</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-400 dark:text-gray-600 font-bold text-xl">Cats & Dogs</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-400 dark:text-gray-600 font-bold text-xl">Heimdal AI</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-8 text-gray-400 dark:text-gray-600 font-bold text-xl">Memhash</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
