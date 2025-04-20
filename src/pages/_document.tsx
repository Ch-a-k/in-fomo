import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

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
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />

          {/* Favicon с параметром версии для принудительного обновления */}
          <link rel="icon" href="/favicon-new.ico" type="image/x-icon" />
          <link
            rel="shortcut icon"
            href="/favicon-new.ico"
            type="image/x-icon"
          />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />

          {/* Базовые Open Graph метатеги в _document для гарантированной загрузки при SSR */}
          <meta
            property="og:title"
            content="IN-FOMO. | Innovative IT Solutions"
          />
          <meta
            property="og:description"
            content="Leading IT company providing innovative software development, cloud solutions, and digital transformation services."
          />
          <meta property="og:url" content="https://in-fomo.com" />
          <meta
            property="og:image"
            content="https://in-fomo.com/og-image.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="IN-FOMO." />

          {/* Оптимизированная загрузка шрифтов с предзагрузкой для уменьшения CLS */}
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          {/* Предзагрузка локальных шрифтов */}
          <link
            rel="preload"
            href="/fonts/FredokaOne-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />

          {/* Предзагрузка Google шрифтов */}
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sofia+Sans:wght@400;600;700&display=swap&text=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
          />

          {/* Используем стандартный CSS с отложенной загрузкой для Google шрифтов */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sofia+Sans:wght@400;600;700&display=swap&text=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            rel="stylesheet"
            media="print"
            // @ts-ignore - используем строковый onload для HTML атрибута, это стандартная практика
            onload="this.media='all'"
          />

          {/* Используем стили для оптимизации и минимизации Layout Shifts */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
              /* Устанавливаем дефолтные размеры для элементов до загрузки шрифтов */
              :root {
                --font-fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
              }
              
              /* Предотвращаем CLS с использованием size-adjust */
              @font-face {
                font-family: 'Fredoka';
                font-style: normal;
                font-weight: 400 700;
                font-display: swap;
                src: local('Fredoka'), url('/fonts/FredokaOne-Regular.ttf') format('truetype');
                size-adjust: 100%;
                font-synthesis: none;
              }
              
              /* Fallback для всех шрифтов */
              body {
                font-family: var(--font-fallback);
              }
              
              /* Задаем резервное место для заголовков */
              h1, h2, h3, h4, h5, h6 {
                font-family: 'Fredoka', var(--font-fallback);
                font-size-adjust: 0.5;
              }
              
              /* Использование font-display: swap для всех шрифтов */
              .font-sans {
                font-family: 'Inter', var(--font-fallback);
                font-display: swap;
              }
              
              .font-heading {
                font-family: 'Sofia Sans', var(--font-fallback);
                font-display: swap;
              }
            `,
            }}
          />
          <noscript>
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sofia+Sans:wght@400;600;700&display=swap"
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
