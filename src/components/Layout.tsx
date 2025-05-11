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
  
  return (
      <>
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