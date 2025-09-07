'use client';

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const CursorOrderTooltip = () => {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Добавляем keyframes для анимации переливов, если еще не добавлены
    const styleId = 'cursor-tooltip-anim'
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement('style')
      styleTag.id = styleId
      styleTag.textContent = `
        @keyframes tooltipGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `
      document.head.appendChild(styleTag)
    }

    const tooltipEl = document.createElement('div')
    tooltipEl.style.position = 'fixed'
    tooltipEl.style.top = '0px'
    tooltipEl.style.left = '0px'
    tooltipEl.style.pointerEvents = 'auto'
    tooltipEl.style.zIndex = '10000'
    tooltipEl.style.transform = 'translate(-50%, -100%)'
    tooltipEl.style.padding = '10px 14px'
    // Прямоугольник с закругленными углами в стиле карточек
    tooltipEl.style.borderRadius = '12px'
    // Градиент в цвет карточек с переливами
    tooltipEl.style.background = 'linear-gradient(90deg, rgba(255,90,0,0.9) 0%, rgba(47, 15, 1, 0.99) 50%, rgba(255,90,0,0.9) 100%)'
    tooltipEl.style.backgroundSize = '200% 100%'
    tooltipEl.style.animation = 'tooltipGradientShift 2.2s linear infinite'
    // Обводка и тень, близкие к карточкам
    tooltipEl.style.border = '1px solid rgb(250, 92, 0)'
    tooltipEl.style.boxShadow = '0 8px 24px rgba(255,90,0,0.25), inset 0 0 0 1px rgba(255,90,0,0.2)'
    tooltipEl.style.color = '#fff'
    tooltipEl.style.fontSize = '12px'
    tooltipEl.style.fontWeight = '600'
    tooltipEl.style.opacity = '0'
    tooltipEl.style.transition = 'opacity 120ms ease'
    tooltipEl.style.willChange = 'transform, opacity'
    tooltipEl.style.whiteSpace = 'nowrap'
    tooltipEl.style.userSelect = 'none'

    tooltipRef.current = tooltipEl
    document.body.appendChild(tooltipEl)

    const move = (e: MouseEvent) => {
      if (!tooltipRef.current) return
      // Показываем только если наведено на карточку услуг
      const target = e.target as HTMLElement | null
      const isOnCard = !!target && (target.closest('[data-order-tooltip="true"]') !== null)
      if (!isOnCard) {
        if (visible) {
          setVisible(false)
          tooltipRef.current.style.opacity = '0'
        }
        return
      }
      const offsetX = 18
      const offsetY = 18
      tooltipRef.current.style.transform = `translate(${e.clientX + offsetX}px, ${e.clientY - offsetY}px)`
      if (!visible) {
        setVisible(true)
        tooltipRef.current.style.opacity = '1'
      }
    }

    const leaveWindow = () => {
      if (!tooltipRef.current) return
      setVisible(false)
      tooltipRef.current.style.opacity = '0'
    }

    // Клик только по самому шильдику
    tooltipEl.setAttribute('role', 'button')
    tooltipEl.setAttribute('aria-label', t('order_action'))
    tooltipEl.style.cursor = 'pointer'
    const onTooltipClick = () => {
      router.push('/contact').then(() => {
        setTimeout(() => {
          const firstInput: HTMLInputElement | null = document.querySelector('input[name="name"]')
          if (firstInput) {
            firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
            firstInput.focus()
          }
        }, 300)
      })
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseout', leaveWindow)
    tooltipEl.addEventListener('mousedown', (e) => e.stopPropagation())
    tooltipEl.addEventListener('click', onTooltipClick)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseout', leaveWindow)
      tooltipEl.removeEventListener('click', onTooltipClick)
      if (tooltipRef.current && tooltipRef.current.parentElement) {
        tooltipRef.current.parentElement.removeChild(tooltipRef.current)
      }
      tooltipRef.current = null
    }
  }, [router])

  useEffect(() => {
    if (!tooltipRef.current) return
    const label = t('order_action')
    tooltipRef.current.textContent = label
    tooltipRef.current.setAttribute('aria-label', label)
  }, [t, i18n.language])

  return null
}

export default CursorOrderTooltip


