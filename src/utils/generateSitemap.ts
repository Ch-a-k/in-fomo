const fs = require('fs');
const glob = require('glob');
const prettier = require('prettier');

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com';
const LANGUAGES = ['en', 'pl', 'uk', 'ru'];

async function generateSitemap() {
  try {
    // Используем glob c разными паттернами для поиска страниц
    const pagePatterns = [
      'src/pages/**/!(*.test|_*|api/**|404|500).{jsx,tsx}',
      'pages/**/!(*.test|_*|api/**|404|500).{jsx,tsx}'
    ];
    
    // Объединяем результаты поиска по всем паттернам
    let allPages: string[] = [];
    for (const pattern of pagePatterns) {
      const pages = glob.sync(pattern);
      if (pages.length > 0) {
        allPages = [...allPages, ...pages];
      }
    }
    
    console.log(`Found ${allPages.length} pages in codebase`);
    
    if (allPages.length === 0) {
      console.warn('⚠️ No pages found! Using fallback strategy for common pages');
      // Если страницы не найдены, добавляем основные страницы вручную
      allPages = [
        'index',
        'about',
        'contact',
        'portfolio',
        'privacy-policy',
        'terms-of-service'
      ];
    }

    const currentDate = new Date().toISOString().split('T')[0];

    // Generate sitemap XML
    let sitemapUrls = '';
    
    if (allPages.length > 0 && 
        (allPages[0].startsWith('src/pages/') || allPages[0].startsWith('pages/'))) {
      // Если нашли реальные файлы
      sitemapUrls = allPages
        .map((page) => {
          // Convert file path to URL path
          const path = page
            .replace(/^(src\/pages|pages)/, '')
            .replace(/\.(jsx|tsx)$/, '')
            .replace('/index', '');

          // Skip dynamic routes
          if (path.includes('[')) return '';

          const route = path === '' ? '' : path;
          const url = `${DOMAIN}${route}`;
          const priority = route === '' ? '1.0' : '0.8';
          const changefreq = route === '' ? 'daily' : 'weekly';

          return generateUrlEntry(url, currentDate, route, priority, changefreq);
        })
        .filter(Boolean) // Удаляем пустые строки (динамические маршруты)
        .join('');
    } else {
      // Если используем список вручную добавленных страниц
      sitemapUrls = allPages
        .map((page) => {
          const route = page === 'index' ? '' : `/${page}`;
          const url = `${DOMAIN}${route}`;
          const priority = route === '' ? '1.0' : '0.8';
          const changefreq = route === '' ? 'daily' : 'weekly';
          
          return generateUrlEntry(url, currentDate, route, priority, changefreq);
        })
        .join('');
    }

    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xhtml="http://www.w3.org/1999/xhtml"
              xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
              xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
        ${sitemapUrls}
      </urlset>
    `;

    // Format XML
    const formatted = await prettier.format(sitemap, {
      parser: 'html',
      printWidth: 120,
    });

    // Write to file
    fs.writeFileSync('public/sitemap.xml', formatted);
    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

// Вспомогательная функция для генерации записи URL
function generateUrlEntry(url: string, currentDate: string, route: string, priority: string, changefreq: string) {
  return `
    <url>
      <loc>${url}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
      ${LANGUAGES.map(
        (lang) => `
        <xhtml:link 
          rel="alternate" 
          hreflang="${lang}" 
          href="${DOMAIN}/${lang}${route}" 
        />`
      ).join('')}
      <xhtml:link 
        rel="alternate" 
        hreflang="x-default" 
        href="${url}" 
      />
      ${
        route.includes('/about') || route.includes('/portfolio')
          ? `
        <image:image>
          <image:loc>${DOMAIN}/images${route}/hero.jpg</image:loc>
          <image:title>IN-FOMO ${
            route.charAt(1).toUpperCase() + route.slice(2)
          }</image:title>
        </image:image>`
          : ''
      }
    </url>
  `;
}

// Run the function
generateSitemap(); 