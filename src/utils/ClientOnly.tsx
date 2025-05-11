import { ReactNode, useEffect, useState } from 'react';

interface ClientOnlyProps {
    children: ReactNode;
    fallback?: ReactNode;
}

/**
 * ClientOnly компонент позволяет рендерить содержимое только на клиенте,
 * предотвращая ошибки гидратации и SSR.
 */
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
    const [hasMounted, setHasMounted] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        try {
            setHasMounted(true);
        } catch (e) {
            console.error('Error in ClientOnly component:', e);
            setHasError(true);
        }
    }, []);

    // Если произошла ошибка или компонент еще не смонтирован, показываем fallback
    if (!hasMounted || hasError) {
        return <>{fallback}</>;
    }

    // Обрабатываем возможные ошибки в дочерних компонентах
    try {
        return <>{children}</>;
    } catch (e) {
        console.error('Error rendering client-only content:', e);
        return <>{fallback}</>;
    }
} 