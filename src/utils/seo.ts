/**
 * Утилиты для SEO оптимизации
 */

export interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
  locale?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'blog' | 'product' | string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  category?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

export interface TwitterCardProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
}

export interface OpenGraphProps {
  title: string;
  description?: string;
  type?: 'website' | 'article' | 'blog' | 'product' | string;
  locale?: string;
  url?: string;
  siteName?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

/**
 * Генерирует мета-теги для SEO
 * @param props Параметры SEO
 * @returns Объект с meta-тегами для Next.js Head
 */
export const generateSeoMeta = (props: SeoProps) => {
  const {
    title,
    description,
    canonical,
    locale = 'ru_RU',
    image,
    imageAlt,
    type = 'website',
    keywords,
    author,
    publishedTime,
    modifiedTime,
    category,
    tags,
    noindex = false,
    nofollow = false,
  } = props;

  // Базовые мета-теги
  const metaTags = [
    { name: 'description', content: description },
    { name: 'robots', content: `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}` },
  ];

  // Добавляем keywords если они есть
  if (keywords && keywords.length > 0) {
    metaTags.push({ name: 'keywords', content: keywords.join(', ') });
  }

  // Добавляем автора если он есть
  if (author) {
    metaTags.push({ name: 'author', content: author });
  }

  // Добавляем OpenGraph мета-теги
  const ogProps: OpenGraphProps = {
    title,
    description,
    type,
    locale,
    url: canonical,
    image,
    imageAlt,
    article: type === 'article' ? {
      publishedTime,
      modifiedTime,
      author,
      section: category,
      tags,
    } : undefined,
  };

  const ogTags = generateOpenGraphMeta(ogProps);

  // Добавляем Twitter Card мета-теги
  const twitterProps: TwitterCardProps = {
    title,
    description,
    image,
    imageAlt,
    card: image ? 'summary_large_image' : 'summary',
  };

  const twitterTags = generateTwitterCardMeta(twitterProps);

  return {
    title,
    meta: [
      ...metaTags.filter(tag => tag.content), // Фильтруем пустые значения
      ...ogTags,
      ...twitterTags,
    ],
    link: canonical ? [{ rel: 'canonical', href: canonical }] : [],
    ...(noindex && { priority: true }),
  };
};

/**
 * Генерирует мета-теги OpenGraph
 * @param props Параметры OpenGraph
 * @returns Массив мета-тегов OpenGraph
 */
export const generateOpenGraphMeta = (props: OpenGraphProps) => {
  const {
    title,
    description,
    type = 'website',
    locale = 'ru_RU',
    url,
    siteName,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    article,
  } = props;

  const ogTags = [
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:locale', content: locale },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: siteName },
  ];

  // Добавляем информацию о изображении если оно есть
  if (image) {
    ogTags.push({ property: 'og:image', content: image });
    
    if (imageAlt) {
      ogTags.push({ property: 'og:image:alt', content: imageAlt });
    }
    
    if (imageWidth) {
      ogTags.push({ property: 'og:image:width', content: String(imageWidth) });
    }
    
    if (imageHeight) {
      ogTags.push({ property: 'og:image:height', content: String(imageHeight) });
    }
  }

  // Добавляем теги для статьи если тип 'article'
  if (type === 'article' && article) {
    const { publishedTime, modifiedTime, author, section, tags } = article;
    
    if (publishedTime) {
      ogTags.push({ property: 'article:published_time', content: publishedTime });
    }
    
    if (modifiedTime) {
      ogTags.push({ property: 'article:modified_time', content: modifiedTime });
    }
    
    if (author) {
      ogTags.push({ property: 'article:author', content: author });
    }
    
    if (section) {
      ogTags.push({ property: 'article:section', content: section });
    }
    
    if (tags && tags.length > 0) {
      tags.forEach(tag => {
        ogTags.push({ property: 'article:tag', content: tag });
      });
    }
  }

  return ogTags.filter(tag => tag.content); // Фильтруем пустые значения
};

/**
 * Генерирует мета-теги Twitter Card
 * @param props Параметры Twitter Card
 * @returns Массив мета-тегов Twitter Card
 */
export const generateTwitterCardMeta = (props: TwitterCardProps) => {
  const {
    title,
    description,
    image,
    imageAlt,
    card = 'summary',
    site,
    creator,
  } = props;

  const twitterTags = [
    { name: 'twitter:card', content: card },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ];

  if (image) {
    twitterTags.push({ name: 'twitter:image', content: image });
    
    if (imageAlt) {
      twitterTags.push({ name: 'twitter:image:alt', content: imageAlt });
    }
  }

  if (site) {
    twitterTags.push({ name: 'twitter:site', content: site });
  }

  if (creator) {
    twitterTags.push({ name: 'twitter:creator', content: creator });
  }

  return twitterTags.filter(tag => tag.content); // Фильтруем пустые значения
};

/**
 * Генерирует заголовок страницы
 * @param title Основной заголовок
 * @param siteName Название сайта
 * @param separator Разделитель
 * @returns Форматированный заголовок
 */
export const formatPageTitle = (
  title: string,
  siteName: string = 'IN-FOMO',
  separator: string = ' | '
): string => {
  // Проверяем, содержит ли title уже название сайта
  if (!title) return siteName;
  if (title.includes(siteName)) return title;
  return `${title}${separator}${siteName}`;
};

/**
 * Генерирует URL с учетом локали
 * @param path Путь страницы
 * @param locale Локаль
 * @param baseUrl Базовый URL
 * @returns Полный URL
 */
export const getLocalizedUrl = (
  path: string,
  locale?: string,
  baseUrl: string = typeof window !== 'undefined' ? window.location.origin : ''
): string => {
  if (!path) return baseUrl;
  
  // Удаляем начальный слэш если он есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Добавляем локаль если она есть
  const localePath = locale ? `/${locale}/${cleanPath}` : `/${cleanPath}`;
  
  // Заменяем двойные слэши на одинарные
  const normalizedPath = localePath.replace(/\/+/g, '/');
  
  return `${baseUrl}${normalizedPath}`;
};

export default {
  generateSeoMeta,
  generateOpenGraphMeta,
  generateTwitterCardMeta,
  formatPageTitle,
  getLocalizedUrl,
}; 