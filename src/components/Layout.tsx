'use client';

import { ReactNode } from 'react'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import Navbar from './Navbar'
import Footer from './Footer'
import { ThemeProvider } from 'next-themes'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  footerVariant?: 'design1' | 'design2'
}

const Layout = ({ 
  children, 
  title = 'IN-FOMO', 
  description,
  footerVariant = 'design1'
}: LayoutProps) => {
  const { t } = useTranslation('common')

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen">
        <Head>
          <title>{title}</title>
          <meta name="description" content={description || t('meta_description')} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Navbar />
        
        <main className="flex-grow relative z-10">
          {children}
        </main>
        
        <Footer variant={footerVariant} />
      </div>
    </ThemeProvider>
  )
}

export default Layout