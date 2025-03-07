'use client';

import { ReactNode } from 'react'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import Navbar from './Navbar'
import Footer from './Footer'
import Script from 'next/script'

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
  description,
  footerVariant = 'design1',
  ogImage = '/images/og-image.png',
  ogUrl
}: LayoutProps) => {
  const { t } = useTranslation('common')
  const siteUrl = ogUrl || 'https://in-fomo.com'
  const metaDescription = description || t('meta_description')
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // Замените на ваш ID Google Analytics

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={`${siteUrl}${ogImage}`} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />
        
        {/* WhatsApp */}
        <meta property="og:site_name" content="IN-FOMO" />
        <meta property="og:locale" content="en_US" />
        
        {/* Telegram */}
        <meta name="telegram:channel" content="@infomo" />
        <meta name="telegram:image" content={`${siteUrl}${ogImage}`} />
        
        {/* Instagram and Threads (use same OG tags) */}
        <meta property="instapp:owner_id" content="IN-FOMO" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      
      <Navbar />
      
      <main className="flex-grow relative z-10">
        {children}
      </main>
      
      <Footer variant={footerVariant} />
    </div>
  )
}

export default Layout