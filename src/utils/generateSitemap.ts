import { writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com';
const LANGUAGES = ['en', 'pl', 'uk', 'kz'];

async function generateSitemap() {
  try {
    // Get all pages except dynamic ones, API routes, etc.
    const pages = await globby([
      'src/pages/**/*.tsx',
      '!src/pages/_*.tsx',
      '!src/pages/api',
      '!src/pages/404.tsx',
      '!src/pages/500.tsx',
    ]);

    const currentDate = new Date().toISOString().split('T')[0];

    // Generate sitemap XML
    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xhtml="http://www.w3.org/1999/xhtml"
              xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
              xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
        ${pages
          .map((page) => {
            // Convert file path to URL path
            const path = page
              .replace('src/pages', '')
              .replace('.tsx', '')
              .replace('/index', '');

            // Skip dynamic routes
            if (path.includes('[')) return '';

            const route = path === '' ? '' : path;
            const url = `${DOMAIN}${route}`;
            const priority = route === '' ? '1.0' : '0.8';
            const changefreq = route === '' ? 'daily' : 'weekly';

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
          })
          .join('')}
      </urlset>
    `;

    // Format XML
    const formatted = await prettier.format(sitemap, {
      parser: 'html',
      printWidth: 120,
    });

    // Write to file
    writeFileSync('public/sitemap.xml', formatted);
    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

// Run the function
generateSitemap(); 