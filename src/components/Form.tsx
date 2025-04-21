import { useState, FormEvent, ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import { sanitizeFormData } from '../utils/security';

// Типы
export type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
  placeholder?: string;
  value: string | boolean;
  required?: boolean;
  options?: { label: string; value: string }[];
  errorMessage?: string;
  pattern?: string;
  validators?: ((value: any) => string | null)[];
};

type FormProps = {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  submitText: string;
  resetText?: string;
  showReset?: boolean;
  loading?: boolean;
  successMessage?: string;
  errorMessage?: string;
  formId?: string;
  className?: string;
  children?: ReactNode;
};

const Form = ({
  fields,
  onSubmit,
  submitText,
  resetText,
  showReset = false,
  loading = false,
  successMessage,
  errorMessage,
  formId,
  className = '',
  children
}: FormProps) => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {} as Record<string, any>)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Обработка изменений полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });

    // Сброс ошибки при изменении поля
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      // Проверка обязательных полей
      if (field.required && (!formData[field.name] || formData[field.name] === '')) {
        newErrors[field.name] = t('field_required');
        isValid = false;
      }

      // Проверка email
      if (field.type === 'email' && formData[field.name] && 
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name])) {
        newErrors[field.name] = t('invalid_email');
        isValid = false;
      }

      // Проверка на соответствие паттерну
      if (field.pattern && formData[field.name] && 
          !new RegExp(field.pattern).test(formData[field.name])) {
        newErrors[field.name] = field.errorMessage || t('invalid_format');
        isValid = false;
      }

      // Применение пользовательских валидаторов
      if (field.validators && formData[field.name]) {
        for (const validator of field.validators) {
          const error = validator(formData[field.name]);
          if (error) {
            newErrors[field.name] = error;
            isValid = false;
            break;
          }
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Обработка отправки формы
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Сбрасываем состояния перед новой отправкой
    setSubmitSuccess(false);
    setSubmitError('');
    
    // Валидация формы
    const isValid = validateForm();
    if (!isValid) return;
    
    // Санитизация данных
    const sanitizedData = sanitizeFormData(formData);
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(sanitizedData);
      
      // Успешная отправка
      setSubmitSuccess(true);
      
      // Опционально - сброс формы
      if (showReset) {
        resetForm();
      }
    } catch (error) {
      // Ошибка отправки
      setSubmitError(
        errorMessage || 
        (error instanceof Error ? error.message : t('form_error'))
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Сброс формы
  const resetForm = () => {
    setFormData(
      fields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }, {} as Record<string, any>)
    );
    setErrors({});
    setSubmitSuccess(false);
    setSubmitError('');
  };

  // Рендер полей формы
  const renderField = (field: FormField) => {
    const { name, label, type, placeholder, required, options = [] } = field;
    const error = errors[name];
    
    switch (type) {
      case 'textarea':
        return (
          <div className="mb-4" key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id={name}
              name={name}
              value={formData[name] as string}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 dark:bg-gray-800 dark:border-gray-700 ${
                error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              rows={4}
              required={required}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
        
      case 'select':
        return (
          <div className="mb-4" key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
              id={name}
              name={name}
              value={formData[name] as string}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 dark:bg-gray-800 dark:border-gray-700 ${
                error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              required={required}
            >
              <option value="">{t('select_option')}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="mb-4" key={name}>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={name}
                  name={name}
                  type="checkbox"
                  checked={formData[name] as boolean}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
                  required={required}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={name} className="font-medium text-gray-700 dark:text-gray-300">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
              </div>
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
        
      case 'radio':
        return (
          <div className="mb-4" key={name}>
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </span>
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`${name}-${option.value}`}
                    name={name}
                    type="radio"
                    value={option.value}
                    checked={formData[name] === option.value}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
                    required={required}
                  />
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );

      // По умолчанию возвращаем обычное текстовое поле
      default:
        return (
          <div className="mb-4" key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name] as string}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 dark:bg-gray-800 dark:border-gray-700 ${
                error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              required={required}
              pattern={field.pattern}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>
      {/* Отображаем все поля формы */}
      {fields.map(renderField)}
      
      {/* Дополнительное содержимое формы */}
      {children}
      
      {/* Успешное сообщение */}
      {submitSuccess && successMessage && (
        <div className="p-3 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      
      {/* Сообщение об ошибке */}
      {submitError && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}
      
      {/* Кнопки формы */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting || loading}
        >
          {isSubmitting || loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              {t('loading')}
            </span>
          ) : (
            submitText
          )}
        </button>
        
        {showReset && (
          <button
            type="button"
            onClick={resetForm}
            className="btn btn-secondary"
            disabled={isSubmitting || loading}
          >
            {resetText || t('reset')}
          </button>
        )}
      </div>
    </form>
  );
};

export default Form; 