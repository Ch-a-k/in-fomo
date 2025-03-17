import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Breadcrumbs = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  
  const pathSegments = router.asPath.split('/').filter(segment => segment);
  
  // Don't show breadcrumbs on home page
  if (router.asPath === '/') return null;

  const breadcrumbsData = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = t(`breadcrumbs.${segment}`) || segment.replace(/-/g, ' ');
    
    return {
      href,
      label: label.charAt(0).toUpperCase() + label.slice(1)
    };
  });

  return (
    <nav className="flex py-4 text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-white-500 hover:text-primary">
            {t('breadcrumbs.home')}
          </Link>
        </li>
        {breadcrumbsData.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            <span className="mx-2 text-primary">/</span>
            {index === breadcrumbsData.length - 1 ? (
              <span className="text-primary">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="text-primary hover:text-primary">
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