import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieConsent from './CookieConsent'
import FloatingButton from './FloatingButton'
import Script from 'next/script'
import Breadcrumbs from './Breadcrumbs'
import dynamic from 'next/dynamic'
import { Analytics } from "@vercel/analytics/react"

// Ленивая загрузка Hotjar компонента
const Hotjar = dynamic(() => import('./Hotjar'), { 
  ssr: false,
  loading: () => null 
})

interface LayoutProps {
  children: ReactNode
  footerVariant?: 'design1' | 'design2'
}

const Layout = ({ 
  children, 
  footerVariant = 'design1',
}: LayoutProps) => {
  const { t } = useTranslation('common')
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
      <>
      {gtmId && (
        <>
          <Script id="google-tag-manager" strategy="worker">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
          <noscript>
            <iframe 
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0" 
              width="0" 
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="worker"
          />
          <Script id="google-analytics" strategy="worker">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                'send_page_view': false,
                'transport_type': 'beacon',
                'optimize_id': 'OPT-XXXXXX'
              });
              
              // Отложенная отправка pageview на 2 секунды
              setTimeout(() => {
                gtag('event', 'page_view', {
                  page_title: document.title,
                  page_location: window.location.href,
                  page_path: window.location.pathname,
                  non_interaction: true
                });
              }, 2000);
            `}
          </Script>
        </>
      )}
      
      {/* Hotjar Tracking загружается динамически и неблокирующе */}
      <Hotjar hotjarId={5347229} />
      {/* Vercel Analytics */}
      <Analytics />
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Navbar />
        <div className="container mx-auto px-4">
          <Breadcrumbs />
        </div>
        <main className="flex-grow relative z-10 min-h-[50vh]">
          {children}
        </main>
        <Footer variant={footerVariant} />
        <CookieConsent />
        <FloatingButton />
      </div>
    </>
  )
}

export default Layout