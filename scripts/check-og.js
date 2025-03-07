#!/usr/bin/env node

/**
 * Скрипт для проверки OG-метатегов сайта
 * 
 * Использование:
 * node scripts/check-og.js https://your-site.com/page
 */

const url = process.argv[2];

if (!url) {
  console.error('Пожалуйста, укажите URL для проверки');
  console.log('Пример: node scripts/check-og.js https://in-fomo.com/portfolio');
  process.exit(1);
}

console.log(`\n🔍 Проверка OG-метатегов для: ${url}\n`);

console.log('Используйте следующие инструменты для проверки:');
console.log('-----------------------------------------------');

console.log(`\n1. Facebook Sharing Debugger:`);
console.log(`   https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}`);

console.log(`\n2. Twitter Card Validator:`);
console.log(`   https://cards-dev.twitter.com/validator?url=${encodeURIComponent(url)}`);

console.log(`\n3. LinkedIn Post Inspector:`);
console.log(`   https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(url)}`);

console.log(`\n4. Open Graph Check:`);
console.log(`   https://www.opengraph.xyz/url/${encodeURIComponent(url)}`);

console.log('\n-----------------------------------------------');
console.log('Инструкции по использованию:');
console.log('1. Откройте указанные ссылки в браузере');
console.log('2. Проверьте, правильно ли отображаются:');
console.log('   - Заголовок (title)');
console.log('   - Описание (description)');
console.log('   - Изображение (image)');
console.log('   - URL (url)');
console.log('3. Если данные не обновляются, используйте функцию "Scrape Again" или "Refresh"');
console.log('\n✅ Готово!'); 