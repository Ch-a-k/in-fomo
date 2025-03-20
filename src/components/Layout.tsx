'use client';

import { ReactNode } from 'react'
import { useTranslation } from 'next-i18next'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieConsent from './CookieConsent'
import Script from 'next/script'
import Breadcrumbs from './Breadcrumbs'
import SchemaOrg from './SchemaOrg'
import SEO from './SEO'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  keywords?: string
  footerVariant?: 'design1' | 'design2'
  noindex?: boolean
  customStructuredData?: Record<string, any>
}

const Layout = ({ 
  children, 
  title,
  description,
  keywords,
  footerVariant = 'design1',
  noindex = false,
  customStructuredData
}: LayoutProps) => {
  const { t } = useTranslation('common')
  const canonicalUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com'
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <>
      {/* Google Tag Manager */}
      {gtmId && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
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
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      <SEO
        title={title}
        description={description}
        keywords={keywords}
        noindex={noindex}
        customStructuredData={customStructuredData}
      />
      
      <SchemaOrg
        title={title}
        description={description || t('meta_description')}
        canonicalUrl={canonicalUrl}
        imageUrl={`${canonicalUrl}/images/og-image.png`}
        dateModified={new Date().toISOString()}
      />
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4">
          <Breadcrumbs />
        </div>
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <Footer variant={footerVariant} />
        <CookieConsent />
      </div>
    </>
  )
}

export default Layout