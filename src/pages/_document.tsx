import { Html, Head, Main, NextScript } from 'next/document'
import { SEO } from '../components/SEO'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <SEO />
        <link
          rel="preload"
          href="/fonts/SofiaSans-Black.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Sofia Sans';
                font-style: normal;
                font-weight: 900;
                font-display: swap;
                src: url('/fonts/SofiaSans-Black.ttf') format('truetype');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 