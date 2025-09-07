'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

function formatMoney(n: number): string {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
}

export default function KPIWidget() {
  const { t } = useTranslation('common')
  const [earned, setEarned] = useState<number>(0)
  const [saved, setSaved] = useState<number>(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Инициализируем и сохраняем в localStorage, чтобы числа плавно росли между визитами
    const now = Date.now()
    const base = JSON.parse(
      typeof window !== 'undefined' ? localStorage.getItem('kpi-base') || 'null' : 'null'
    ) as null | { t: number; earned: number; saved: number }

    const elapsedMin = base ? Math.max(0, (now - base.t) / 60000) : 0

    // Базовые значения (можно подправить под реальные кейсы)
    const startEarned = base ? base.earned : 1_200_000
    const startSaved = base ? base.saved : 480_000

    // Рост в минуту (условный)
    const earnedPerMin = 240 // $/мин
    const savedPerMin = 190  // $/мин

    const targetEarned = Math.floor(startEarned + earnedPerMin * elapsedMin)
    const targetSaved = Math.floor(startSaved + savedPerMin * elapsedMin)

    setEarned(targetEarned)
    setSaved(targetSaved)

    // Сохраняем текущую точку
    if (typeof window !== 'undefined') {
      localStorage.setItem('kpi-base', JSON.stringify({ t: now, earned: targetEarned, saved: targetSaved }))
    }

    // Плавное увеличение в реальном времени
    const startTs = performance.now()
    const animate = (ts: number) => {
      const dt = (ts - startTs) / 60000 // минуты
      setEarned(targetEarned + Math.floor(dt * earnedPerMin))
      setSaved(targetSaved + Math.floor(dt * savedPerMin))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="rounded-2xl border border-light-border dark:border-dark-border/70 bg-white/85 dark:bg-[#0f0f0f]/85 backdrop-blur-md shadow-xl p-4 md:p-5 w-[290px] select-none">
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('kpi_thanks')}</div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-[12px] text-gray-700 dark:text-gray-300">{t('kpi_earned')}</div>
        <div className="text-lg font-semibold text-primary">${formatMoney(earned)}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-[12px] text-gray-700 dark:text-gray-300">{t('kpi_saved')}</div>
        <div className="text-lg font-semibold text-primary">${formatMoney(saved)}</div>
      </div>
      <div className="mt-3 text-right">
        <Link href="/contact#from-services" className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/90">
          {t('get_started')}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </Link>
      </div>
    </div>
  )
}


