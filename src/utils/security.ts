/**
 * Утилиты для обеспечения безопасности приложения
 */

/**
 * Экранирует HTML специальные символы для предотвращения XSS атак
 * @param input Строка, которую нужно экранировать
 * @returns Экранированная строка
 */
export const escapeHtml = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Санитизация пользовательского ввода - удаляет потенциально опасные символы и теги
 * @param input Строка для санитизации
 * @returns Санитизированная строка
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  // Удаляем теги script и потенциально опасные атрибуты
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/\bdata:/gi, '');
};

/**
 * Validates an email address
 * @param email Email to validate
 * @returns Boolean indicating whether email is valid
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  
  // Basic email validation regex - RFC 5322 compliant
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
};

/**
 * Validates a URL to ensure it's properly formatted and not potentially harmful
 * @param url URL to validate
 * @returns Boolean indicating whether URL is valid and safe
 */
export const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  
  try {
    const parsedUrl = new URL(url);
    
    // Проверяем, что протокол безопасный (http или https)
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

/**
 * Generates a CSRF token for form protection
 * @returns String CSRF token
 */
export const generateCsrfToken = (): string => {
  // В реальном приложении здесь должна быть более надежная генерация токена
  // с использованием криптографических методов
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Sanitizes and validates form data
 * @param formData Form data object
 * @returns Sanitized form data
 */
export const sanitizeFormData = <T extends Record<string, any>>(formData: T): T => {
  const sanitizedData = { ...formData } as T;
  
  Object.keys(sanitizedData).forEach(key => {
    const k = key as keyof T;
    if (typeof sanitizedData[k] === 'string') {
      sanitizedData[k] = sanitizeInput(sanitizedData[k] as string) as any;
    }
  });
  
  return sanitizedData;
};

/**
 * Validates a password strength
 * @param password Password to validate
 * @returns Object containing validity and reasons
 */
export const validatePasswordStrength = (password: string): { 
  isValid: boolean; 
  reasons: string[] 
} => {
  const reasons: string[] = [];
  
  if (!password || password.length < 8) {
    reasons.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    reasons.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    reasons.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    reasons.push('Password must contain at least one number');
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    reasons.push('Password must contain at least one special character');
  }
  
  return {
    isValid: reasons.length === 0,
    reasons
  };
};

export default {
  escapeHtml,
  sanitizeInput,
  isValidEmail,
  isValidUrl,
  generateCsrfToken,
  sanitizeFormData,
  validatePasswordStrength
}; 