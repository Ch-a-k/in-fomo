import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface FooterProps {
  variant?: 'design1' | 'design2';
}

const Footer = ({ variant = 'design1' }: FooterProps) => {
  const { t } = useTranslation('common');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const navItems = [
    { name: t('home'), href: '/' },
    { name: t('portfolio'), href: '/portfolio' },
    { name: t('about'), href: '/about' },
    { name: t('contact'), href: '/contact' }
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/in_fomo', icon: (
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    )},
    { name: 'LinkedIn', href: 'https://linkedin.com/company/in-fomo', icon: (
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    )},
    { name: 'X (Twitter)', href: 'https://x.com/in_4omo', icon: (
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    )},
    { name: 'Telegram', href: 'https://t.me/in_fomo', icon: (
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    )},
  ];

  const getLogo = () => {
    if (!mounted) return '/images/partners/logo.png';
    return resolvedTheme === 'dark' ? '/images/partners/logowhite.png' : '/images/partners/logo.png';
  };

  const getRoundedLogo = () => '/images/partners/logorounded.png';

  if (!mounted) {
    return (
      <footer className="bg-light-surface border-t border-light-border relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"></div>
        </div>
      </footer>
    );
  }

  const Design1 = () => (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border relative z-10">
      {/* Top section */}
      <div className="container mx-auto px-4 py-12 border-b border-light-border dark:border-dark-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12">
                  <Image 
                    src={getRoundedLogo()} 
                    alt="IN-FOMO" 
                    width={48} 
                    height={48} 
                    className="rounded-full"
                  />
                </div>
                <div className="h-10 w-auto">
                  <Image 
                    src={getLogo()} 
                    alt="IN-FOMO" 
                    width={120} 
                    height={40} 
                    className="w-auto"
                  />
                </div>
              </div>
            </Link>
            <p className="mt-4 text-gray-800 dark:text-white max-w-md">
              {t('meta_description')}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="text-right mb-4">
              <h4 className="font-semibold text-lg mb-2">{t('contact_us')}</h4>
              <a href="mailto:info@in-fomo.com" className="text-primary hover:text-primary-dark transition-colors">info@in-fomo.com</a>
              <p className="text-gray-800 dark:text-white">{t('location')}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">{t('navigation')}</h3>
            <ul className="grid grid-cols-2 gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-800 dark:text-white hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-800 dark:text-white hover:text-primary transition-colors">
                  {t('privacy_policy')}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-800 dark:text-white hover:text-primary transition-colors">
                  {t('terms_of_service')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">{t('follow_us')}</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary text-white flex items-center justify-center transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  const Design2 = () => (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border relative z-10">
      {/* Top section */}
      <div className="container mx-auto px-4 py-8 border-b border-light-border dark:border-dark-border">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="h-8 w-auto">
                <Image 
                  src={getLogo()} 
                  alt="IN-FOMO" 
                  width={100} 
                  height={32} 
                  className="h-full w-auto"
                />
              </div>
            </div>
          </Link>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-700 hover:bg-primary text-white flex items-center justify-center transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">{t('contact_us')}</h3>
            <p className="text-gray-800 dark:text-white mb-2">
              <a href="mailto:info@in-fomo.com" className="text-primary hover:text-primary-dark transition-colors">
                info@in-fomo.com
              </a>
            </p>
            <p className="text-gray-800 dark:text-white">{t('location')}</p>
            <p className="mt-4 text-gray-800 dark:text-white max-w-xs">
              {t('meta_description')}
            </p>
            <div className="mt-4">
              <Image 
                src={getRoundedLogo()} 
                alt="IN-FOMO" 
                width={40} 
                height={40} 
                className="rounded-full"
              />
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">{t('navigation')}</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-800 dark:text-white hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-800 dark:text-white hover:text-primary transition-colors">
                  {t('privacy_policy')}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-800 dark:text-white hover:text-primary transition-colors">
                  {t('terms_of_service')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );

  return variant === 'design1' ? <Design1 /> : <Design2 />;
};

export default Footer;
