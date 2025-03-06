import Document from 'next/document'
import Html from 'next/document'
import Head from 'next/document'
import Main from 'next/document'
import NextScript from 'next/document'

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fredoka:wght@600&display=swap" rel="stylesheet" />
        
        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://in-fomo.com/" />
        <meta property="og:title" content="IN FOMO - Innovative IT Solutions" />
        <meta property="og:description" content="We help businesses adopt the latest technologies to improve efficiency, reduce costs, and drive growth in today's digital world." />
        <meta property="og:image" content="https://in-fomo.com/images/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://in-fomo.com/" />
        <meta property="twitter:title" content="IN FOMO - Innovative IT Solutions" />
        <meta property="twitter:description" content="We help businesses adopt the latest technologies to improve efficiency, reduce costs, and drive growth in today's digital world." />
        <meta property="twitter:image" content="https://in-fomo.com/images/og-image.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
