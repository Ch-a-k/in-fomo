'use client';

import { ReactNode } from 'react'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieConsent from './CookieConsent'
import { GoogleTagManager } from '@next/third-parties/google'
import Breadcrumbs from './Breadcrumbs'

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

  return (
    <>
      <GoogleTagManager gtmId="G-YET0LLRBZN" />
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