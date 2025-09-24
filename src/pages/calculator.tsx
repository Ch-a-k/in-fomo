import { useEffect, useMemo, useState } from 'react'
import type { GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import SEO from '../components/SEO'

type ProjectType = 'landing' | 'corporate' | 'mobile' | 'cloud' | 'cybersecurity' | 'ai' | 'design' | 'bot' | 'crm' | 'consulting' | 'web3' | 'tma' | 'parsers'
type PackageKey = 'starter' | 'business' | 'pro' | 'enterprise'
type SpeedKey = 'relaxed' | 'standard' | 'urgent'
type ScaleKey = 'small' | 'medium' | 'large'

const PROJECT_TYPES: Array<{ key: ProjectType }> = [
  { key: 'landing' },
  { key: 'corporate' },
  { key: 'mobile' },
  { key: 'cloud' },
  { key: 'cybersecurity' },
  { key: 'ai' },
  { key: 'design' },
  { key: 'bot' },
  { key: 'crm' },
  { key: 'consulting' },
  { key: 'web3' },
  { key: 'tma' },
  { key: 'parsers' },
]

const PACKAGE_TIERS: Array<{ key: PackageKey; popular?: boolean }> = [
  { key: 'starter' },
  { key: 'business', popular: true },
  { key: 'pro' },
  { key: 'enterprise' },
]

const BASE_PRICES: Record<ProjectType, Record<PackageKey, number>> = {
  landing: { starter: 1000, business: 1800, pro: 3000, enterprise: 5000 },
  corporate: { starter: 1800, business: 3200, pro: 5200, enterprise: 8000 },
  mobile: { starter: 6500, business: 9800, pro: 15500, enterprise: 24000 },
  cloud: { starter: 3400, business: 5600, pro: 8900, enterprise: 13500 },
  cybersecurity: { starter: 2800, business: 4500, pro: 7800, enterprise: 12000 },
  ai: { starter: 1800, business: 3500, pro: 6800, enterprise: 13000 },
  design: { starter: 1100, business: 2300, pro: 3800, enterprise: 6400 },
  bot: { starter: 1000, business: 2500, pro: 5000, enterprise: 12000 },
  crm: { starter: 7600, business: 11800, pro: 18500, enterprise: 27000 },
  consulting: { starter: 1200, business: 2400, pro: 3900, enterprise: 6500 },
  web3: { starter: 4500, business: 7800, pro: 12000, enterprise: 17500 },
  tma: { starter: 2000, business: 4000, pro: 7000, enterprise: 11000 },
  parsers: { starter: 1000, business: 1800, pro: 3000, enterprise: 5000 },
}

const BASE_WEEKS: Record<ProjectType, Record<PackageKey, number>> = {
  landing: { starter: 1, business: 2, pro: 3, enterprise: 4 },
  corporate: { starter: 2, business: 3, pro: 5, enterprise: 7 },
  mobile: { starter: 5, business: 7, pro: 10, enterprise: 14 },
  cloud: { starter: 3, business: 5, pro: 7, enterprise: 10 },
  cybersecurity: { starter: 3, business: 4, pro: 6, enterprise: 9 },
  ai: { starter: 2, business: 3, pro: 5, enterprise: 8 },
  design: { starter: 1, business: 2, pro: 3, enterprise: 5 },
  bot: { starter: 1, business: 2, pro: 3, enterprise: 5 },
  crm: { starter: 6, business: 9, pro: 12, enterprise: 16 },
  consulting: { starter: 1, business: 2, pro: 3, enterprise: 4 },
  web3: { starter: 4, business: 6, pro: 9, enterprise: 12 },
  tma: { starter: 2, business: 3, pro: 5, enterprise: 8 },
  parsers: { starter: 1, business: 2, pro: 3, enterprise: 4 },
}

const PACKAGE_FEATURES: Record<PackageKey, string[]> = {
  starter: [
    'Дизайн на базе готовых шаблонов',
    'Адаптив под мобильные',
    'Форма заявки/контакта',
    'Базовая аналитика',
  ],
  business: [
    'Индивидуальный дизайн ключевых экранов',
    'Контент‑страницы/каталог',
    '2 языка (опционально)',
    'Интеграции 1–2 сервиса',
    'Базовая SEO‑подготовка',
  ],
  pro: [
    'Полный индивидуальный дизайн',
    'Сложные формы/личный кабинет (light)',
    '3+ интеграции',
    'Расширенная аналитика и события',
    'Тестирование и отладка',
  ],
  enterprise: [
    'Сложные бизнес‑процессы',
    'Нагрузочное и безопасностное тестирование',
    'Многоязычность/мультирегионы',
    'Выделенный менеджер проекта',
    'Планирование релизов и SLA',
  ],
}

const SPEEDS: Array<{ key: SpeedKey; label: string; factor: number }> = [
  { key: 'relaxed', label: 'Спокойно', factor: 0.95 },
  { key: 'standard', label: 'Стандарт', factor: 1.0 },
  { key: 'urgent', label: 'Срочно', factor: 1.15 },
]

const SCALES: Array<{ key: ScaleKey; label: string; factor: number; weeksDelta: number }> = [
  { key: 'small', label: 'Малый', factor: 0.9, weeksDelta: 0 },
  { key: 'medium', label: 'Средний', factor: 1.0, weeksDelta: 1 },
  { key: 'large', label: 'Большой', factor: 1.35, weeksDelta: 2 },
]

export default function CalculatorPage() {
  const { t, i18n } = useTranslation(['common', 'calculator'])
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const [projectType, setProjectType] = useState<ProjectType>('landing')
  const [pkg, setPkg] = useState<PackageKey>('business')
  const [speed, setSpeed] = useState<SpeedKey>('standard')
  const [scale, setScale] = useState<ScaleKey>('medium')

  // Простые понятные доп. опции
  const [langs, setLangs] = useState<number>(1) // кол-во языков
  const [integrations, setIntegrations] = useState<number>(1)
  const [acceptPayments, setAcceptPayments] = useState<boolean>(false)
  const [contentFilling, setContentFilling] = useState<boolean>(false)
  const [dataImport, setDataImport] = useState<boolean>(false)
  const [support3m, setSupport3m] = useState<boolean>(true)

  const addOnsCost = useMemo(() => {
    const langExtra = Math.max(0, langs - 1) * 300
    const integrationsCost = Math.max(0, integrations) * 500
    const paymentsCost = acceptPayments ? 800 : 0
    const contentCost = contentFilling ? 300 : 0
    const importCost = dataImport ? 400 : 0
    const supportCost = support3m ? 600 : 0
    return langExtra + integrationsCost + paymentsCost + contentCost + importCost + supportCost
  }, [langs, integrations, acceptPayments, contentFilling, dataImport, support3m])

  const basePrice = useMemo(() => BASE_PRICES[projectType][pkg], [projectType, pkg])
  const priceWithFactors = useMemo(() => {
    const scaleFactor = SCALES.find(s => s.key === scale)?.factor || 1
    const speedFactor = SPEEDS.find(s => s.key === speed)?.factor || 1
    return Math.round((basePrice * scaleFactor * speedFactor) + addOnsCost)
  }, [basePrice, scale, speed, addOnsCost])

  const priceRange = useMemo(() => {
    const low = Math.round(priceWithFactors * 0.9)
    const high = Math.round(priceWithFactors * 1.15)
    return { low, high }
  }, [priceWithFactors])

  const estimatedWeeks = useMemo(() => {
    const base = BASE_WEEKS[projectType][pkg]
    const scaleDelta = SCALES.find(s => s.key === scale)?.weeksDelta || 0
    let weeks = base + scaleDelta
    if (speed === 'urgent') weeks = Math.max(1, Math.round(weeks * 0.8))
    if (speed === 'relaxed') weeks = Math.round(weeks * 1.1)
    return weeks
  }, [projectType, pkg, scale, speed])

  const includedFeatures = useMemo(() => PACKAGE_FEATURES[pkg], [pkg])

  const summaryText = useMemo(() => {
    const typeLabel = t(`calculator:types.${projectType}`)
    const pkgLabel = t(`calculator:packages.${pkg}.name`)
    const speedLabel = t(`calculator:speeds.${speed}`)
    const scaleLabel = t(`calculator:scales.${scale}`)
    const features = includedFeatures.join(', ')
    const addOns: string[] = []
    if (langs > 1) addOns.push(t('calculator:summary.addon_languages', { count: langs }))
    if (integrations > 0) addOns.push(t('calculator:summary.addon_integrations', { count: integrations }))
    if (acceptPayments) addOns.push(t('calculator:summary.addon_payments'))
    if (contentFilling) addOns.push(t('calculator:summary.addon_content'))
    if (dataImport) addOns.push(t('calculator:summary.addon_import'))
    if (support3m) addOns.push(t('calculator:summary.addon_support'))
    return (
      `${t('calculator:summary.title')}\n` +
      `${t('calculator:summary.project_type')}: ${typeLabel}\n` +
      `${t('calculator:summary.package')}: ${pkgLabel}\n` +
      `${t('calculator:summary.scale')}: ${scaleLabel}\n` +
      `${t('calculator:summary.deadline')}: ~${estimatedWeeks} ${t('calculator:summary.weeks')} (${speedLabel})\n` +
      `\n${t('calculator:summary.included')}: ${features}\n` +
      (addOns.length ? `${t('calculator:summary.addons')}: ${addOns.join(', ')}\n` : '') +
      `\n${t('calculator:summary.price')}: €${priceRange.low}–€${priceRange.high} Netto\n` +
      `\n${t('calculator:disclaimer')}`
    )
  }, [t, projectType, pkg, scale, speed, includedFeatures, langs, integrations, acceptPayments, contentFilling, dataImport, support3m, estimatedWeeks, priceRange])

  const goToContact = () => {
    try {
      if (typeof window !== 'undefined') {
        const payload = { message: summaryText, source: 'calculator' }
        ;(payload as any).locale = i18n?.language || 'en'
        localStorage.setItem('calculator_prefill', JSON.stringify(payload))
      }
    } catch {}
    router.push('/contact#from-calculator')
  }

  return (
    <>
      <SEO title={t('calculator:seo.title', { defaultValue: 'Калькулятор стоимости' }) + ' | IN-FOMO'} description={t('calculator:seo.description', { defaultValue: 'Выберите тип проекта, пакет и опции — без технических деталей.' })} />

      <div className="bg-light-bg dark:bg-dark-bg">
        <div className="container py-6">
          <h1 className="text-xl font-semibold mb-1">{t('calculator:title', { defaultValue: 'Калькулятор стоимости проекта' })}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t('calculator:subtitle', { defaultValue: 'Выберите тип проекта, пакет и опции — без технических деталей.' })}</p>
        </div>
      </div>

      <section className="py-6">
        <div className="container max-w-none px-4">
          <div className="grid grid-cols-1 gap-3">
            {/* Шаг 1: Тип проекта */}
              <div className="rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-[#0f0f0f] p-3">
              <h2 className="text-sm font-semibold mb-2">{t('calculator:headings.type', { defaultValue: 'Тип проекта' })}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {PROJECT_TYPES.map(p => (
                  <button
                    key={p.key}
                    onClick={() => setProjectType(p.key)}
                    className={`px-3 py-2 rounded-full text-xs font-medium border ${projectType === p.key ? 'border-primary text-primary bg-primary/5' : 'border-light-border dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-primary/60'}`}
                  >
                    {t(`calculator:types.${p.key}`)}
                    </button>
                  ))}
                </div>
              </div>

            {/* Шаг 2: Пакет */}
              <div className="rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-[#0f0f0f] p-3">
              <h2 className="text-sm font-semibold mb-3">{t('calculator:headings.choose_package', { defaultValue: 'Выберите пакет' })}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                {PACKAGE_TIERS.map(tier => {
                  const active = pkg === tier.key
                  const price = BASE_PRICES[projectType][tier.key]
                  return (
                    tier.key === 'enterprise' ? (
                      <div key={tier.key} className={`text-left rounded-lg border p-4 transition ${active ? 'border-primary bg-primary/5' : 'border-light-border dark:border-dark-border bg-white dark:bg-[#0f0f0f]'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-base font-semibold">{t(`calculator:packages.${tier.key}.name`)}</div>
                </div>
                        <div className="text-sm text-gray-700 dark:text-gray-200">
                          {t('calculator:packages.enterprise.hint')}
              </div>
                        <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">{t('calculator:disclaimer')}</div>
                </div>
                    ) : (
                      <button
                        key={tier.key}
                        onClick={() => setPkg(tier.key)}
                        className={`text-left rounded-lg border p-4 transition ${active ? 'border-primary bg-primary/5' : 'border-light-border dark:border-dark-border bg-white dark:bg-[#0f0f0f] hover:border-primary/60'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-base font-semibold">{t(`calculator:packages.${tier.key}.name`)}</div>
                          {tier.popular && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{t('calculator:badges.popular', { defaultValue: 'Популярно' })}</span>}
              </div>
                        <div className="text-lg font-bold">€{price} <span className="text-xs font-normal text-gray-500">Netto</span></div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">{t(`calculator:packages.${tier.key}.hint`)}</div>
                        <ul className="mt-3 space-y-1">
                          {PACKAGE_FEATURES[tier.key].slice(0, 4).map((f) => (
                            <li key={f} className="text-xs text-gray-700 dark:text-gray-300">• {f}</li>
                          ))}
                        </ul>
                    </button>
                    )
                  )
                })}
                </div>
              </div>

            {/* Шаг 3: Опции */}
                <div className="rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-[#0f0f0f] p-3">
              <h2 className="text-sm font-semibold mb-3">{t('calculator:headings.options', { defaultValue: 'Дополнительные опции (по желанию)' })}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                <div className="rounded-lg border border-light-border dark:border-dark-border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">{t('calculator:options.languages_label')}</div>
                    <div className="text-xs text-gray-500">{t('calculator:options.languages_hint')}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{t('calculator:options.languages_count', { defaultValue: 'Языков' })}</span>
                    <input type="number" min={1} value={langs} onChange={(e) => setLangs(Math.max(1, parseInt(e.target.value || '1')))} className="w-20 border border-light-border dark:border-dark-border rounded-lg px-2 py-1 bg-white dark:bg-[#0b0b0b] text-sm" />
                  </div>
                </div>
                <div className="rounded-lg border border-light-border dark:border-dark-border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">{t('calculator:options.integrations_label')}</div>
                    <div className="text-xs text-gray-500">{t('calculator:options.integrations_hint')}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{t('calculator:options.integrations_count', { defaultValue: 'Штук' })}</span>
                    <input type="number" min={0} value={integrations} onChange={(e) => setIntegrations(Math.max(0, parseInt(e.target.value || '0')))} className="w-20 border border-light-border dark:border-dark-border rounded-lg px-2 py-1 bg-white dark:bg-[#0b0b0b] text-sm" />
                  </div>
                </div>
                <label className="rounded-lg border border-light-border dark:border-dark-border p-3 inline-flex items-center justify-between gap-3 cursor-pointer">
                  <div>
                    <div className="font-medium text-sm">{t('calculator:options.accept_payments')}</div>
                    <div className="text-xs text-gray-500">+€800</div>
                  </div>
                  <input type="checkbox" checked={acceptPayments} onChange={(e) => setAcceptPayments(e.target.checked)} />
                </label>
                <label className="rounded-lg border border-light-border dark:border-dark-border p-3 inline-flex items-center justify-between gap-3 cursor-pointer">
                      <div>
                    <div className="font-medium text-sm">{t('calculator:options.content_filling')}</div>
                    <div className="text-xs text-gray-500">+€300</div>
                      </div>
                  <input type="checkbox" checked={contentFilling} onChange={(e) => setContentFilling(e.target.checked)} />
                </label>
                <label className="rounded-lg border border-light-border dark:border-dark-border p-3 inline-flex items-center justify-between gap-3 cursor-pointer">
                      <div>
                    <div className="font-medium text-sm">{t('calculator:options.data_import')}</div>
                    <div className="text-xs text-gray-500">+€400</div>
                  </div>
                  <input type="checkbox" checked={dataImport} onChange={(e) => setDataImport(e.target.checked)} />
                </label>
                <label className="rounded-lg border border-light-border dark:border-dark-border p-3 inline-flex items-center justify-between gap-3 cursor-pointer">
                  <div>
                    <div className="font-medium text-sm">{t('calculator:options.support3m')}</div>
                    <div className="text-xs text-gray-500">+€600</div>
                  </div>
                  <input type="checkbox" checked={support3m} onChange={(e) => setSupport3m(e.target.checked)} />
                </label>
                    </div>
                  </div>

            {/* Шаг 4: Сроки и масштаб */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-[#0f0f0f] p-3">
                <h3 className="font-medium mb-2 text-sm">{t('calculator:headings.deadlines', { defaultValue: 'Сроки' })}</h3>
                <div className="flex flex-wrap gap-2">
                  {SPEEDS.map(s => (
                    <button key={s.key} onClick={() => setSpeed(s.key)} className={`px-3 py-2 rounded-full text-xs font-medium border ${speed === s.key ? 'border-primary text-primary bg-primary/5' : 'border-light-border dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-primary/60'}`}>{t(`calculator:speeds.${s.key}`)}</button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">Ориентировочно: ~{estimatedWeeks} недель</div>
                    </div>
              <div className="rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-[#0f0f0f] p-3">
                <h3 className="font-medium mb-2 text-sm">{t('calculator:headings.scale', { defaultValue: 'Масштаб' })}</h3>
                <div className="flex flex-wrap gap-2">
                  {SCALES.map(s => (
                    <button key={s.key} onClick={() => setScale(s.key)} className={`px-3 py-2 rounded-full text-xs font-medium border ${scale === s.key ? 'border-primary text-primary bg-primary/5' : 'border-light-border dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-primary/60'}`}>{t(`calculator:scales.${s.key}`)}</button>
                  ))}
                  </div>
              </div>
            </div>

            {/* Результаты */}
            <div className="rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-[#0f0f0f] p-4">
              <h2 className="text-base font-semibold mb-3">{t('calculator:headings.results', { defaultValue: 'Итоги' })}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center justify-between border rounded-lg px-3 py-2 border-light-border dark:border-dark-border"><span>{t('calculator:results.price_label', { defaultValue: 'Стоимость (оценка)' })}</span><span className="font-semibold">€{priceRange.low}–€{priceRange.high} Netto</span></div>
                <div className="flex items-center justify-between border rounded-lg px-3 py-2 border-light-border dark:border-dark-border"><span>{t('calculator:results.time_label', { defaultValue: 'Срок' })}</span><span className="font-semibold">~{estimatedWeeks} недель</span></div>
                <button onClick={goToContact} className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg">{t('calculator:cta.send_to_contact', { defaultValue: 'Отправить в форму контактов' })}</button>
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                {t('calculator:footer_note', { defaultValue: 'Цены в EUR, NET (Netto), без НДС.' })}
                <br />
                {t('calculator:disclaimer', { defaultValue: 'Показанные цены — ориентировочные. Финальная смета рассчитывается командой после уточнения целей, сроков и объёма работ.' })}
              </div>
              <div className="mt-4">
                <label className="block text-xs text-gray-500 mb-1">{t('calculator:preview_label', { defaultValue: 'Предпросмотр сообщения' })}</label>
                <textarea readOnly className="w-full h-48 text-xs bg-gray-50 dark:bg-[#0a0a0a] border border-light-border dark:border-dark-border rounded-lg p-3 text-gray-700 dark:text-gray-300" value={summaryText} />
                <div className="mt-2 flex gap-2">
                  <button onClick={() => { navigator.clipboard?.writeText(summaryText).catch(() => {}); }} className="px-3 py-2 text-xs border border-light-border dark:border-dark-border rounded-lg hover:border-primary/60">{t('calculator:cta.copy', { defaultValue: 'Скопировать' })}</button>
                  <button onClick={goToContact} className="px-3 py-2 text-xs bg-primary text-white rounded-lg hover:bg-primary/90">{t('calculator:cta.send', { defaultValue: 'Отправить' })}</button>
                </div>
              </div>
                <div className="mt-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('calculator:included_title', { defaultValue: 'Что включено в пакет' })}</div>
                  <div className="flex flex-wrap gap-2">
                  {includedFeatures.map(f => (
                    <span key={f} className="px-2 py-1 text-xs rounded-full border border-light-border dark:border-dark-border text-gray-700 dark:text-gray-300">{f}</span>
                    ))}
                  </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-[#0f0f0f] p-4">
              <h2 className="text-base font-semibold mb-3">{t('calculator:faq.title', { defaultValue: 'FAQ' })}</h2>
              {(() => {
                const items = t('calculator:faq.items', { returnObjects: true }) as Array<{ q: string, a: string }>
                return (
                  <div className="space-y-3">
                    {items?.map((it, idx) => (
                      <div key={idx} className="border border-light-border dark:border-dark-border rounded-lg p-3">
                        <div className="font-medium text-sm mb-1">{it.q}</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">{it.a}</div>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>

            {mounted && (
              <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#0f0f0f]/90 backdrop-blur border-t border-light-border dark:border-dark-border">
                <div className="container max-w-none px-4 py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">€{priceRange.low}–€{priceRange.high} Netto</span>
                    <span className="text-gray-600 dark:text-gray-300">~{estimatedWeeks} недель</span>
                  </div>
                  <button onClick={goToContact} className="px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90">{t('calculator:cta.to_contact', { defaultValue: 'В контактную форму' })}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'calculator'])),
      footerVariant: 'design1'
    }
  }
}


