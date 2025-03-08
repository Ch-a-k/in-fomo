import type { GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import Head from 'next/head'

// Telegram bots configuration
const TELEGRAM_CONFIG = {
  general: {
    token: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN_GENERAL,
    chatId: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID_GENERAL
  },
  careers: {
    token: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN_CAREERS,
    chatId: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID_CAREERS
  }
};

const ContactForm = ({ formType, t }) => {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'message' && value.length > 4000) return
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const config = TELEGRAM_CONFIG[formType]
    if (!config.token || !config.chatId) {
      console.error('Telegram configuration missing')
      setStatus('error')
      return
    }

    const messageText = `
🔔 ${t('forms.feedback.newMessage')} (${t(`forms.${formType}.title`)})
👤 ${t('forms.fields.name.label')}: ${formData.name}
📞 ${t('forms.fields.contact.label')}: ${formData.contact}
💬 ${t('forms.fields.message.label')}: ${formData.message}
    `

    try {
      const response = await fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: config.chatId,
          text: messageText,
          parse_mode: 'HTML',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', contact: '', message: '' })
      setTimeout(() => setStatus(''), 5000)
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
      setTimeout(() => setStatus(''), 5000)
    }
  }

  return (
    <div className="w-full bg-white dark:bg-[#1a1a1a] rounded-lg p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-800">
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base text-gray-900 dark:text-white mb-2">
                {t('forms.fields.name.label')} <span className="text-[#FF5a00]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 text-base text-gray-900 dark:text-white bg-white dark:bg-[#090909] border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF5a00] focus:ring-1 focus:ring-[#FF5a00] transition-colors placeholder-gray-500"
                placeholder={t('forms.fields.name.placeholder')}
              />
            </div>

            <div>
              <label className="block text-base text-gray-900 dark:text-white mb-2 whitespace-nowrap text-ellipsis overflow-hidden">
                {t('forms.fields.contact.label')} <span className="text-[#FF5a00]">*</span>
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 text-base text-gray-900 dark:text-white bg-white dark:bg-[#090909] border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF5a00] focus:ring-1 focus:ring-[#FF5a00] transition-colors placeholder-gray-500"
                placeholder={t('forms.fields.contact.placeholder')}
              />
            </div>
          </div>

          <div>
            <label className="block text-base text-gray-900 dark:text-white mb-2">
              {t('forms.fields.message.label')} <span className="text-[#FF5a00]">*</span>
            </label>
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="block w-full px-4 py-3 text-base text-gray-900 dark:text-white bg-white dark:bg-[#090909] border border-gray-200 dark:border-gray-700 rounded-lg focus:border-[#FF5a00] focus:ring-1 focus:ring-[#FF5a00] transition-colors resize-none placeholder-gray-500"
                placeholder={t('forms.fields.message.placeholder')}
              />
              <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                {4000 - formData.message.length} {t('forms.feedback.charactersLeft')}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-8 py-3 text-base font-medium text-white bg-[#FF5a00] hover:bg-[#FF5a00]/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{t('forms.actions.sending')}</span>
                </div>
              ) : (
                t('forms.actions.submit')
              )}
            </button>
          </div>

          {status === 'success' && (
            <div className="mt-4 p-4 bg-green-900/20 text-green-400 rounded-lg">
              {t('forms.feedback.success')}
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 p-4 bg-red-900/20 text-red-400 rounded-lg">
              {t('forms.feedback.error')}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default function Contact() {
  const { t } = useTranslation(['contact', 'common'])
  const { theme } = useTheme()

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Head>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              {t('hero.badge', { ns: 'contact' })}
            </div>
            
            <h1 className="heading-1 mb-6">
              {t('hero.title', { ns: 'contact' }).split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-primary">{t('hero.title', { ns: 'contact' }).split(' ').slice(-1)}</span>
            </h1>
            
            <p className="mb-10 text-xl text-gray-600 dark:text-gray-300">
              {t('hero.subtitle', { ns: 'contact' })}
            </p>
          </div>
        </div>
      </div>

      {/* General Contact Form Section */}
      <section className="py-12 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column - Description */}
            <div className="w-full lg:w-[30%]">
              <div className="sticky top-24">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('forms.general.title', { ns: 'contact' })}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('forms.general.description', { ns: 'contact' })}
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-[70%]">
              <ContactForm formType="general" t={t} />
            </div>
          </div>
        </div>
      </section>

      {/* Careers Form Section */}
      <section className="py-12 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column - Description */}
            <div className="w-full lg:w-[30%]">
              <div className="sticky top-24">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('forms.careers.title', { ns: 'contact' })}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('forms.careers.description', { ns: 'contact' })}
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-[70%]">
              <ContactForm formType="careers" t={t} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const translations = await serverSideTranslations(locale, ['common', 'contact']);
  
  return {
    props: {
      ...translations,
      title: 'IN-FOMO | Contact Us',
      description: 'Get in touch with IN-FOMO for your IT project needs. We provide innovative solutions for businesses worldwide.',
      ogImage: '/images/og-image.png',
      footerVariant: 'design1'
    },
  };
};