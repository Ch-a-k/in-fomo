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
          
          {/* Базовые Open Graph метатеги в _document для гарантированной загрузки при SSR */}
          <meta property="og:title" content="IN-FOMO. | Innovative IT Solutions" />
          <meta property="og:description" content="Leading IT company providing innovative software development, cloud solutions, and digital transformation services." />
          <meta property="og:url" content="https://in-fomo.com" />
          <meta property="og:image" content="https://in-fomo.com/og-image.png" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="IN-FOMO." />
          
          {/* Оптимизированная загрузка шрифтов для Next.js 15 */}
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          
          
          {/* Предзагрузка Google шрифтов с высоким приоритетом */}
          <link 
            rel="preload" 
            as="style" 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sofia+Sans:wght@400;600;700&display=swap&text=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" 
          />
          
          {/* Используем font-display:swap для Google шрифтов */}
          <link 
            id="google-fonts"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sofia+Sans:wght@400;600;700&display=swap&text=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&display=swap" 
            rel="stylesheet"
            media="print"
            onLoad={() => {
              const element = document.getElementById('google-fonts');
              if (element) {
                (element as HTMLLinkElement).media = 'all';
              }
            }}
          />
          
          {/* Специальный скрипт для отслеживания и оптимизации CLS */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Отслеживаем CLS
                (function() {
                  if (typeof PerformanceObserver !== 'undefined') {
                    // Регистрируем наблюдатель для CLS
                    try {
                      new PerformanceObserver((entryList) => {
                        for (const entry of entryList.getEntries()) {
                          // Если обнаружен значительный сдвиг макета (> 0.1)
                          if (entry.value > 0.1) {
                            console.warn('Large layout shift detected:', entry);
                          }
                        }
                      }).observe({type: 'layout-shift', buffered: true});
                      
                      // Наблюдатель для контроля LCP
                      new PerformanceObserver((entryList) => {
                        const entries = entryList.getEntries();
                        if (entries.length > 0) {
                          const lcpEntry = entries[entries.length - 1];
                          // Если LCP элемент загружается дольше 2.5 секунд - проблема
                          if (lcpEntry.startTime > 2500) {
                            console.warn('Slow LCP:', lcpEntry);
                          }
                        }
                      }).observe({type: 'largest-contentful-paint', buffered: true});
                    } catch (e) {
                      console.warn('PerformanceObserver not fully supported');
                    }
                  }
                  
                  // Оптимизация загрузки шрифтов
                  document.fonts.ready.then(() => {
                    document.documentElement.classList.add('fonts-loaded');
                  });
                  
                  // Загрузка Google шрифтов
                  var fontLink = document.getElementById('google-fonts');
                  if (fontLink) {
                    fontLink.addEventListener('load', function() {
                      this.media = 'all';
                    });
                  }
                })();
              `
            }}
          />
          
          {/* Используем стили для оптимизации и минимизации Layout Shifts */}
          <style dangerouslySetInnerHTML={{
            __html: `
              /* Устанавливаем дефолтные размеры для элементов до загрузки шрифтов */
              :root {
                --font-fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                
                /* Предустановленные размеры для предотвращения сдвигов */
                --container-width: 100%;
                --container-max-width: 1280px;
                --container-min-h: 50vh;
                
                /* Предустановленные размеры для заголовков */
                --h1-size: 2.5rem;
                --h1-lh: 1.2;
                --h1-min-h: 3rem;
                --h2-size: 2rem;
                --h2-lh: 1.3;
                --h2-min-h: 2.6rem;
              }
              
              /* Предотвращаем FOUT - flash of unstyled text */
              html {
                visibility: visible;
                opacity: 1;
              }
              
             
              /* Fallback для всех шрифтов с резервированием места */
              body {
                font-family: var(--font-fallback);
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              
              /* Резервируем место для больших контейнеров */
              main, section, article, header, footer {
                min-height: var(--container-min-h, 50vh);
                contain: layout style;
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
              
              /* Добавляем плавный переход при загрузке шрифтов для уменьшения заметности изменений */
              .fonts-loaded * {
                transition: font-family 0.1s ease-out;
              }
              
              /* Стабилизация кнопок и ссылок для предотвращения CLS */
              button, a {
                position: relative;
                contain: layout style;
                transform: translateZ(0);
              }
              
              /* Стабилизируем псевдоэлементы, вызывающие CLS */
              button::before, a::before {
                content-visibility: auto;
                contain: layout style paint;
                backface-visibility: hidden;
                transform: translateZ(0);
                will-change: transform;
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