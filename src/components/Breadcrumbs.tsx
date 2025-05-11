import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

// Интерфейс для хлебной крошки
interface Breadcrumb {
  href: string;
  label: string;
}

const Breadcrumbs = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  
  // Отфильтруем query параметры и разделим путь на сегменты
  const path = router.asPath.split('?')[0].split('#')[0];
  const pathSegments = path.split('/').filter(segment => segment);
  
  // Не показываем хлебные крошки на главной странице
  if (path === '/' || path === '') return null;

  // Специальные случаи для определенных страниц
  const getSegmentLabel = (segment: string, fullPath: string) => {
    // Игнорируем языковые префиксы в URL
    const langs = ['en', 'uk', 'pl', 'ru'];
    if (langs.includes(segment)) {
      return ''; // Для языковых префиксов возвращаем пустую строку
    }
    
    // Проверяем, есть ли прямой перевод для этого сегмента
    const directTranslation = t(`breadcrumbs.${segment}`, { defaultValue: '' });
    if (directTranslation) return directTranslation;
    
    // Обрабатываем случаи, когда сегмент содержит идентификатор или слишком длинный
    if (segment.length > 30 || segment.match(/[a-f0-9]{8,}/i)) {
      // Если сегмент слишком длинный или похож на идентификатор
      // Попробуем найти общий ключ для родительского пути
      const parentSegments = fullPath.split('/').filter(s => s && !langs.includes(s));
      parentSegments.pop(); // Удаляем текущий сегмент
      const parentPath = parentSegments.join('-');
      
      // Пытаемся найти перевод для типа содержимого на этом пути
      const contentType = t(`breadcrumbs.${parentPath}-item`, { defaultValue: '' });
      if (contentType) return contentType;
      
      // Проверяем, есть ли у нас специальные обработчики для этого типа URL
      if (fullPath.includes('/blog/')) return t('breadcrumbs.blog-post', { defaultValue: 'Article' });
      if (fullPath.includes('/portfolio/')) return t('breadcrumbs.portfolio-item', { defaultValue: 'Project' });
      if (fullPath.includes('/services/')) return t('breadcrumbs.service-item', { defaultValue: 'Service' });
      
      // Если не нашли специального обработчика, возвращаем обрезанную версию
      return segment.length > 30 ? segment.substring(0, 20) + '...' : segment;
    }
    
    // Если нет особых случаев, форматируем сегмент, заменяя дефисы на пробелы
    return segment.replace(/-/g, ' ');
  };

  const breadcrumbsData: Breadcrumb[] = pathSegments
    .map((segment, index) => {
      const segmentPath = '/' + pathSegments.slice(0, index + 1).join('/');
      const segmentLabel = getSegmentLabel(segment, segmentPath);
      
      // Пропускаем сегменты с пустыми метками (например, языковые префиксы)
      if (!segmentLabel) return null;
      
      return {
        href: segmentPath,
        label: segmentLabel.charAt(0).toUpperCase() + segmentLabel.slice(1)
      };
    })
    .filter((crumb): crumb is Breadcrumb => crumb !== null); // TypeScript: явно указываем, что фильтр удаляет null-значения

  return (
    <nav className="flex py-4 text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap">
        <li>
          <Link 
            href="/" 
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            {t('breadcrumbs.home')}
          </Link>
        </li>
        {breadcrumbsData.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
            {index === breadcrumbsData.length - 1 ? (
              <span className="text-primary font-medium max-w-[200px] md:max-w-xs truncate">
                {crumb.label}
              </span>
            ) : (
              <Link 
                href={crumb.href} 
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors max-w-[150px] md:max-w-xs truncate"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs; 