'use client';

import { ReactNode } from 'react'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieConsent from './CookieConsent'
import Script from 'next/script'
import Breadcrumbs from './Breadcrumbs'
import SchemaOrg from './SchemaOrg'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  footerVariant?: 'design1' | 'design2'
  ogImage?: string
  ogUrl?: string
}

const Layout = ({ 
  children, 
  title = 'IN-FOMO', 
  description = '',
  footerVariant = 'design1',
  ogImage = '/images/og-image.png',
  ogUrl = ''
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

      <Head>
        <title>{title}</title>
        <meta name="description" content={description || t('meta_description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description || t('meta_description')} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description || t('meta_description')} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* WhatsApp */}
        <meta property="og:site_name" content="IN-FOMO" />
        <meta property="og:locale" content="en_US" />
        
        {/* Telegram */}
        <meta name="telegram:channel" content="@infomo" />
        <meta name="telegram:image" content={`${ogUrl}${ogImage}`} />
        
        {/* Instagram and Threads (use same OG tags) */}
        <meta property="instapp:owner_id" content="IN-FOMO" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      
      <SchemaOrg
        title={title}
        description={description || t('meta_description')}
        canonicalUrl={canonicalUrl}
        imageUrl={`${canonicalUrl}${ogImage}`}
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