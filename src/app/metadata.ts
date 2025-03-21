import { Metadata } from 'next';

const siteConfig = {
  name: 'IN-FOMO',
  description: 'Leading IT company providing innovative software development, cloud solutions, and digital transformation services.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com',
  ogImage: '/images/og-image.png',
  links: {
    twitter: 'https://twitter.com/infomo',
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og-image.png'],
    creator: '@infomo',
    site: '@infomo',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
}; 