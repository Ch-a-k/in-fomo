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
          
          {/* Настройка шрифтов */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          
          {/* Кастомные настройки шрифта */}
          <style dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400 700;
                font-display: swap;
                src: url('/fonts/Inter-VariableFont.woff2') format('woff2');
              }
            `
          }} />
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