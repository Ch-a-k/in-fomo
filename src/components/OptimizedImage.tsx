import React, { useEffect, useState, memo } from 'react';
import Image, { ImageProps } from 'next/image';
import { useInView } from 'react-intersection-observer';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  /**
   * Флаг, указывающий является ли изображение важным для LCP (Largest Contentful Paint)
   */
  isLCP?: boolean;
  
  /**
   * CSS классы для контейнера
   */
  wrapperClassName?: string;
  
  /**
   * CSS классы для скелетона (placeholder)
   */
  skeletonClassName?: string;
  
  /**
   * Задержка показа скелетона (мс)
   */
  skeletonDelay?: number;
  
  /**
   * Обработчик загрузки изображения
   */
  onImageLoad?: () => void;
}

/**
 * Оптимизированный компонент изображения с приоритетной загрузкой для LCP
 * и отображением скелетона во время загрузки
 */
const OptimizedImage = memo(({
  src,
  alt,
  width,
  height,
  isLCP = false,
  wrapperClassName = '',
  skeletonClassName = '',
  skeletonDelay = 100,
  priority = false,
  onImageLoad,
  className = '',
  ...rest
}: OptimizedImageProps) => {
  // Состояния компонента
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Определяем, нужно ли приоритетно загружать изображение
  const shouldPrioritize = isLCP || priority;
  
  // Показываем скелетон с небольшой задержкой, чтобы избежать мерцания при быстрой загрузке
  useEffect(() => {
    if (!isLoaded) {
      const timer = setTimeout(() => {
        setShowSkeleton(true);
      }, skeletonDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isLoaded, skeletonDelay]);
  
  // Вычисляем соотношение сторон для скелетона
  const aspectRatio = width && height
    ? `${Number(width)} / ${Number(height)}`
    : undefined;
  
  // Обработчик загрузки изображения
  const handleLoad = () => {
    setIsLoaded(true);
    if (onImageLoad) {
      onImageLoad();
    }
  };
  
  // Атрибуты для мобильной оптимизации
  const mobileAttr: Record<string, any> = {};
  
  // Добавляем attribute fetchpriority для браузеров, которые его поддерживают
  if (shouldPrioritize) {
    mobileAttr.fetchpriority = 'high';
  }
  
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={{ 
        aspectRatio: aspectRatio
      }}
    >
      {/* Скелетон-плейсхолдер */}
      {showSkeleton && !isLoaded && (
        <div 
          className={`absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}
      
      {/* Изображение */}
      {(inView || shouldPrioritize) && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          priority={shouldPrioritize}
          loading={shouldPrioritize ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          {...mobileAttr}
          {...rest}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 