import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
}

export default function ContactForm({ isOpen, onClose, selectedPackage = '' }: ContactFormProps) {
  const { t } = useTranslation(['common', 'botdev']);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [contactType, setContactType] = useState('telegram');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          contact,
          contactType,
          message,
          selectedPackage,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setName('');
        setContact('');
        setMessage('');
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md p-6 mx-4 bg-white dark:bg-dark-bg rounded-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-bold mb-4 dark:text-white">
              {t('botdev:contact_form.title')}
            </h3>
            
            {selectedPackage && (
              <div className="mb-4 p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {t('botdev:contact_form.selected_package')}: <span className="font-semibold text-primary">{t(`botdev:packages.${selectedPackage}.title`)}</span>
                </p>
              </div>
            )}

            {submitStatus === 'success' ? (
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2 dark:text-white">{t('botdev:contact_form.success_title')}</h4>
                <p className="text-gray-600 dark:text-gray-400">{t('botdev:contact_form.success_message')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('botdev:contact_form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-dark-surface dark:text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="contactType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('botdev:contact_form.contact_type')}
                  </label>
                  <select
                    id="contactType"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-dark-surface dark:text-white"
                    value={contactType}
                    onChange={(e) => setContactType(e.target.value)}
                  >
                    <option value="telegram">Telegram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('botdev:contact_form.contact')}
                  </label>
                  <input
                    type="text"
                    id="contact"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-dark-surface dark:text-white"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    placeholder={
                      contactType === 'telegram' ? '@username or phone' :
                      contactType === 'whatsapp' ? 'Phone number' :
                      contactType === 'phone' ? 'Phone number' : 'Email address'
                    }
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('botdev:contact_form.message')} ({t('botdev:contact_form.optional')})
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-dark-surface dark:text-white"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
                    {t('botdev:contact_form.error_message')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('botdev:contact_form.submitting')}
                    </>
                  ) : (
                    t('botdev:contact_form.submit')
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 