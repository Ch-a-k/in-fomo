import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

// Этот компонент используется для настройки базовой HTML структуры
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Включаем только базовые мета-теги, остальные будут в SEO компоненте */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          {/* Базовые Open Graph метатеги в _document для гарантированной загрузки при SSR */}
          <meta property="og:title" content="IN-FOMO. | Innovative IT Solutions" />
          <meta property="og:description" content="Leading IT company providing innovative software development, cloud solutions, and digital transformation services." />
          <meta property="og:url" content="https://in-fomo.com" />
          <meta property="og:image" content="https://in-fomo.com/og-image.png" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="IN-FOMO." />
          
          {/* Оптимизированная загрузка шрифтов с предзагрузкой и preconnect */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link 
            rel="preload" 
            as="style" 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          />
          
          {/* Используем кастомную загрузку через noscript для fallback и стили для оптимизации */}
          <style dangerouslySetInnerHTML={{
            __html: `
              /* Загрузка шрифта без блокировки рендеринга */
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
              
              @font-face {
                font-family: 'Fredoka';
                font-style: normal;
                font-weight: 400 700;
                font-display: swap;
                src: url('/fonts/FredokaOne-Regular.ttf') format('ttf');
              }
              /* Предварительно объявляем стили шрифта, чтобы избежать FOUT */
              @media not all and (prefers-reduced-motion) {
                .font-sans {
                  font-family: Inter, system-ui, sans-serif;
                }
              }
            `
          }} />
          <noscript>
            <link 
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
              rel="stylesheet"
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 