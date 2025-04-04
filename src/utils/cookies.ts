/**
 * Утилиты для работы с cookies и localStorage
 */

/**
 * Проверяет, доступно ли localStorage в текущем окружении
 */
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Получает значение из localStorage
 * @param key - Ключ для получения
 * @param defaultValue - Значение по умолчанию, если ключ не найден
 */
export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (!isLocalStorageAvailable()) return defaultValue;
  
  try {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;
    
    try {
      // Пытаемся распарсить значение как JSON
      return JSON.parse(value) as T;
    } catch (parseError) {
      console.warn(`Could not parse value for ${key} as JSON, returning default value`);
      return defaultValue;
    }
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return defaultValue;
  }
};

/**
 * Устанавливает значение в localStorage
 * @param key - Ключ для сохранения
 * @param value - Значение для сохранения
 */
export const setStorageItem = <T>(key: string, value: T): void => {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
};

/**
 * Удаляет значение из localStorage
 * @param key - Ключ для удаления
 */
export const removeStorageItem = (key: string): void => {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`Error removing ${key} from localStorage:`, e);
  }
};

/**
 * Устанавливает значение с временной меткой
 * @param key - Ключ для сохранения
 * @param value - Значение для сохранения
 */
export const setItemWithTimestamp = <T>(key: string, value: T): void => {
  const timestampedValue = {
    value,
    timestamp: Date.now()
  };
  
  setStorageItem(key, timestampedValue);
};

/**
 * Получает значение и проверяет его временную метку
 * @param key - Ключ для получения
 * @param expiration - Время жизни значения в миллисекундах
 * @param defaultValue - Значение по умолчанию, если ключ не найден или истек
 */
export const getItemWithExpiration = <T>(
  key: string, 
  expiration: number, 
  defaultValue: T
): T => {
  const now = Date.now();
  
  try {
    // Получаем сырое значение из localStorage
    const rawValue = localStorage.getItem(key);
    
    // Если значение отсутствует, возвращаем значение по умолчанию
    if (!rawValue) return defaultValue;
    
    try {
      // Пытаемся распарсить значение как JSON
      const parsedValue = JSON.parse(rawValue);
      
      // Проверяем, что parsedValue имеет формат {value, timestamp}
      if (parsedValue && typeof parsedValue === 'object' && 'timestamp' in parsedValue) {
        // Проверяем, не истекло ли время жизни
        if (now - parsedValue.timestamp > expiration) {
          // Если истекло, удаляем устаревшие данные
          removeStorageItem(key);
          return defaultValue;
        }
        
        return parsedValue.value;
      }
      
      // Если это не объект с timestamp, возвращаем его как есть
      // (для обратной совместимости)
      return parsedValue as unknown as T;
    } catch (parseError) {
      // Если не удалось распарсить как JSON, возвращаем сырое значение
      console.warn(`Could not parse value for ${key} as JSON, returning raw value`);
      return rawValue as unknown as T;
    }
  } catch (e) {
    console.error(`Error getting ${key} with expiration:`, e);
    return defaultValue;
  }
};

/**
 * Обновляет временную метку существующего значения
 * @param key - Ключ для обновления
 */
export const updateTimestamp = (key: string): void => {
  try {
    const data = getStorageItem<{ value: any, timestamp: number } | null>(key, null);
    
    if (data) {
      data.timestamp = Date.now();
      setStorageItem(key, data);
    }
  } catch (e) {
    console.error(`Error updating timestamp for ${key}:`, e);
  }
};

/**
 * Проверяет, истекло ли время жизни значения
 * @param key - Ключ для проверки
 * @param expiration - Время жизни значения в миллисекундах
 */
export const isItemExpired = (key: string, expiration: number): boolean => {
  const now = Date.now();
  
  try {
    // Сначала получаем сырое значение из localStorage
    const rawValue = localStorage.getItem(key);
    
    // Если значение отсутствует, считаем его истекшим
    if (!rawValue) return true;
    
    try {
      // Пытаемся распарсить значение как JSON
      const parsedValue = JSON.parse(rawValue);
      
      // Проверяем, что parsedValue имеет формат {value, timestamp}
      if (parsedValue && typeof parsedValue === 'object' && 'timestamp' in parsedValue) {
        return now - parsedValue.timestamp > expiration;
      }
      
      // Если это не объект с timestamp, считаем его истекшим (требуется обновление)
      return true;
    } catch (parseError) {
      // Если не удалось распарсить как JSON, считаем что значение устарело
      console.warn(`Could not parse value for ${key} as JSON, considering it expired`);
      return true;
    }
  } catch (e) {
    console.error(`Error checking expiration for ${key}:`, e);
    return true;
  }
};

// Константы для часто используемых значений экспирации
export const EXPIRATION = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000
}; 