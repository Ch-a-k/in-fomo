'use client'

import { useEffect, useRef, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { useTranslation } from 'next-i18next'

type TabId = 'overview' | 'sales' | 'crm' | 'analytics'

const tabs: TabId[] = ['overview','sales','crm','analytics']

const Stat = ({ title, value, delta }: { title: string; value: string; delta?: string }) => (
  <div className="rounded-xl border border-light-border dark:border-dark-border/70 bg-white/70 dark:bg-[#0f0f0f]/70 backdrop-blur-md p-4">
    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{title}</div>
    <div className="flex items-baseline gap-2">
      <div className="text-lg font-semibold text-gray-900 dark:text-white">{value}</div>
      {delta && <span className="text-xs text-green-500">{delta}</span>}
    </div>
  </div>
)

const Table = () => {
  const { t } = useTranslation('home')
  const companies = [
    'Smashandfun',
    'Polerowanieszyb',
    'Blastly',
    'Funcypan',
    'DHCD',
    'Beautyprostir',
    'Therace',
  ]
  const services = ['ERP Integration','CRM Setup','AI Analytics','Automation','Data Migration']
  const rows = companies.map((name, idx) => {
    const isDone = idx % 3 === 0
    const status = isDone ? t('status_done') : t('status_in_progress')
    const service = services[idx % services.length]
    const amount = Math.floor(1300 + Math.random() * (40000 - 1300))
    const hour = 9 + (idx % 8)
    const min = String(10 + idx).padStart(2,'0')
    return { name, status, service, amount, last: `${t('today')}, ${hour}:${min}`, isDone }
  })

  return (
    <div className="overflow-hidden rounded-xl border border-light-border dark:border-dark-border/70">
      <div className="grid grid-cols-5 text-xs bg-gray-50 dark:bg-[#161616] text-gray-600 dark:text-gray-300">
        <div className="px-3 py-2">{t('crm_table_name')}</div>
        <div className="px-3 py-2">{t('crm_table_status')}</div>
        <div className="px-3 py-2">{t('crm_table_last')}</div>
        <div className="px-3 py-2">{t('crm_table_service')}</div>
        <div className="px-3 py-2 text-right pr-4">{t('crm_table_amount')}</div>
      </div>
      {rows.map((r) => (
        <div key={r.name} className="grid grid-cols-5 text-sm border-t border-light-border dark:border-dark-border/60 bg-white/60 dark:bg-[#111111]/60 hover:bg-white/80 dark:hover:bg-[#171717]/80">
          <div className="px-3 py-3">{r.name}</div>
          <div className="px-3 py-3">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${r.isDone ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300' : 'bg-primary/10 text-primary'}`}>{r.status}</span>
          </div>
          <div className="px-3 py-3">{r.last}</div>
          <div className="px-3 py-3">{r.service}</div>
          <div className="px-3 py-3 text-right pr-4">${r.amount.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}

export default function InteractiveDashboard() {
  const { t } = useTranslation('home')
  const { t: tc } = useTranslation('common')
  const containerRef = useRef<HTMLDivElement | null>(null)
  const windowRef = useRef<HTMLDivElement | null>(null)
  const dragStart = useRef<{ x: number; y: number; left: number; top: number } | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const [pos, setPos] = useState({ left: 0, top: 0 })
  const [earned, setEarned] = useState<number>(0)
  const [saved, setSaved] = useState<number>(0)
  const [isMobile, setIsMobile] = useState(false)

  // responsive breakpoint watcher
  useEffect(() => {
    const mq = typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)') : null
    const update = () => setIsMobile(!!mq?.matches)
    update()
    mq?.addEventListener('change', update)
    return () => mq?.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const container = containerRef.current
    const win = windowRef.current
    if (!container || !win) return

    // центрируем окно
    const rect = container.getBoundingClientRect()
    const wrect = win.getBoundingClientRect()
    setPos({ left: (rect.width - wrect.width) / 2, top: Math.max(16, (rect.height - wrect.height) / 3) })
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    const win = windowRef.current
    const container = containerRef.current
    if (!win || !container) return

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.dashboard-drag-handle')) return
      const wrect = win.getBoundingClientRect()
      dragStart.current = { x: e.clientX, y: e.clientY, left: wrect.left, top: wrect.top };
      (e.target as Element).setPointerCapture?.(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragStart.current) return
      e.preventDefault()
      const containerRect = container.getBoundingClientRect()
      const wrect = win.getBoundingClientRect()
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      let left = dragStart.current.left + dx - containerRect.left
      let top = dragStart.current.top + dy - containerRect.top
      // ограничения в пределах контейнера
      left = Math.max(0, Math.min(left, containerRect.width - wrect.width))
      top = Math.max(0, Math.min(top, containerRect.height - wrect.height))
      setPos({ left, top })
    }

    const onPointerUp = () => {
      dragStart.current = null
    }

    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [isMobile])

  // KPI counters (reuse logic with KPIWidget for consistency)
  useEffect(() => {
    const now = Date.now()
    const base = JSON.parse(
      typeof window !== 'undefined' ? localStorage.getItem('kpi-base') || 'null' : 'null'
    ) as null | { t: number; earned: number; saved: number }

    const elapsedMin = base ? Math.max(0, (now - base.t) / 60000) : 0
    const startEarned = base ? base.earned : 1200000
    const startSaved = base ? base.saved : 480000
    const earnedPerMin = 13
    const savedPerMin = 20

    const targetEarned = Math.floor(startEarned + earnedPerMin * elapsedMin)
    const targetSaved = Math.floor(startSaved + savedPerMin * elapsedMin)

    setEarned(targetEarned)
    setSaved(targetSaved)

    if (typeof window !== 'undefined') {
      localStorage.setItem('kpi-base', JSON.stringify({ t: now, earned: targetEarned, saved: targetSaved }))
    }

    const startTs = performance.now()
    let raf: number | null = null
    const animate = (ts: number) => {
      const dt = (ts - startTs) / 60000
      setEarned(targetEarned + Math.floor(dt * earnedPerMin))
      setSaved(targetSaved + Math.floor(dt * savedPerMin))
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => {
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="relative py-20 bg-light-bg dark:bg-dark-bg overflow-hidden">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">{t('erp_crm_headline', { defaultValue: 'Специализируемся на разработке и интеграции ERP и CRM систем, автоматизации и оптимизации' })}</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">{t('erp_crm_sub', { defaultValue: 'Перемещайте окно, переключайте вкладки и взаимодействуйте с виджетами.' })}</p>
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-7xl">
        <div
          ref={windowRef}
          className={`${isMobile ? 'relative' : 'absolute'} w-full max-w-6xl shadow-2xl rounded-2xl select-none`}
          style={isMobile ? undefined : { left: pos.left, top: pos.top }}
        >
          <div className="dashboard-drag-handle rounded-t-2xl bg-white/85 dark:bg-[#0f0f0f]/85 backdrop-blur-md border border-light-border dark:border-dark-border/70 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {tabs.map(tid => (
                <button
                  key={tid}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${activeTab === tid ? 'bg-primary text-white border-transparent' : 'bg-white/60 dark:bg-[#161616] text-gray-700 dark:text-gray-300 border-light-border dark:border-dark-border/60 hover:bg-white/80 dark:hover:bg-[#1c1c1c]'}`}
                  onClick={() => setActiveTab(tid)}
                >
                  {t(tid)}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-b-2xl border-x border-b border-light-border dark:border-dark-border/70 bg-white/70 dark:bg-[#0b0b0b]/70 backdrop-blur-md p-4">
            {activeTab === 'overview' && (
              <>
                {/* IN-FOMO impact */}
                <div className="rounded-xl border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#101010]/70 p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="rounded-lg border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#141414]/70 p-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{tc('kpi_earned')}</div>
                      <div className="text-2xl font-semibold text-primary">${earned.toLocaleString()}</div>
                      <div className="text-[11px] text-gray-500 mt-1">IN-FOMO</div>
                    </div>
                    <div className="rounded-lg border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#141414]/70 p-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{tc('kpi_saved')}</div>
                      <div className="text-2xl font-semibold text-primary">${saved.toLocaleString()}</div>
                      <div className="text-[11px] text-gray-500 mt-1">IN-FOMO</div>
                    </div>
                    <div className="rounded-lg border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#141414]/70 p-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('clients_helped', { defaultValue: 'Companies we helped' })}</div>
                      <div className="flex flex-wrap gap-2">
                        {['Smashandfun','Polerowanieszyb','Blastly','DHCD','Beautyprostir','Therace'].map(name => (
                          <span key={name} className="px-2 py-1 text-[11px] rounded-full border border-light-border dark:border-dark-border/60 bg-white/60 dark:bg-[#181818]/60">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <Stat title={t('overview_new_leads')} value="124" delta="+12%" />
                  <Stat title={t('overview_deals_pipeline')} value="58" delta="+4%" />
                  <Stat title={t('overview_won_this_month')} value="$82k" delta="+9%" />
                  <Stat title={t('overview_avg_cycle')} value={`12 ${t('days')}`} />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Revenue area chart */}
                  <div className="rounded-xl border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#101010]/70 p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{t('monthly_revenue')}</div>
                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[{m:t('month_jan'),v:24},{m:t('month_feb'),v:28},{m:t('month_mar'),v:31},{m:t('month_apr'),v:29},{m:t('month_may'),v:35},{m:t('month_jun'),v:42}]}> 
                          <defs>
                            <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ff5a00" stopOpacity={0.6}/>
                              <stop offset="95%" stopColor="#ff5a00" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="m" tick={{fill:'currentColor'}} tickLine={false} axisLine={false} />
                          <YAxis tick={{fill:'currentColor'}} tickLine={false} axisLine={false} />
                          <Tooltip />
                          <Area type="monotone" dataKey="v" stroke="#ff5a00" strokeWidth={2} fill="url(#rev)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Leads bar chart */}
                  <div className="rounded-xl border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#101010]/70 p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{t('leads_by_channel')}</div>
                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[{c:t('channel_ads'),v:120},{c:t('channel_seo'),v:80},{c:t('channel_ref'),v:60},{c:t('channel_email'),v:40}]}> 
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="c" tick={{fill:'currentColor'}} tickLine={false} axisLine={false} />
                          <YAxis tick={{fill:'currentColor'}} tickLine={false} axisLine={false} />
                          <Tooltip />
                          <Bar dataKey="v" fill="#ff5a00" radius={[6,6,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Additional blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Recent activity */}
                  <div className="rounded-xl border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#101010]/70 p-3">
                    <div className="text-sm font-medium mb-2">{t('recent_activity')}</div>
                    <ul className="space-y-2 text-sm">
                      {[
                        t('recent_item_lead_moved'),
                        t('recent_item_invoice_paid'),
                        t('recent_item_user_invited'),
                        t('recent_item_deal_updated'),
                        t('recent_item_webhook_ok'),
                      ].map((txt, i) => (
                        <li key={i} className="flex items-center justify-between rounded-lg border border-light-border dark:border-dark-border/50 bg-white/60 dark:bg-[#141414]/60 px-3 py-2">
                          <span>{txt}</span>
                          <span className="text-xs text-gray-500">{t('time_hours_ago', { hours: i+1 })}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Tasks */}
                  <div className="rounded-xl border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#101010]/70 p-3">
                    <div className="text-sm font-medium mb-2">{t('implementation_tasks')}</div>
                    <div className="space-y-3">
                      {[
                        {label: t('task_odoo_setup'), v:70},
                        {label: t('task_data_migration'), v:40},
                        {label: t('task_ai_core'), v:55},
                        {label: t('task_user_training'), v:25},
                      ].map((it) => (
                        <div key={it.label}>
                          <div className="flex justify-between text-xs mb-1"><span>{it.label}</span><span>{it.v}%</span></div>
                          <div className="h-2 rounded-full bg-gray-200 dark:bg-[#1a1a1a]">
                            <div className="h-2 rounded-full bg-primary" style={{ width: `${it.v}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'crm' && (
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <button className="px-3 py-1 text-xs rounded-full border bg-white/70 dark:bg-[#161616] border-light-border dark:border-dark-border/60 hover:bg-white/90 dark:hover:bg-[#1a1a1a]">{t('actions_add_lead')}</button>
                  <button className="px-3 py-1 text-xs rounded-full border bg-white/70 dark:bg-[#161616] border-light-border dark:border-dark-border/60 hover:bg-white/90 dark:hover:bg-[#1a1a1a]">{t('actions_export')}</button>
                </div>
                <Table />
                <div className="flex items-center justify-between mt-3 text-xs text-gray-600 dark:text-gray-400">
                  <span>{t('pagination_showing', { count: 10, total: 128 })}</span>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 rounded border bg-white/70 dark:bg-[#161616] border-light-border dark:border-dark-border/60">{t('pagination_prev')}</button>
                    <button className="px-2 py-1 rounded border bg-white/70 dark:bg-[#161616] border-light-border dark:border-dark-border/60">{t('pagination_next')}</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sales' && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <Stat title="MQL" value="312" delta="+5%" />
                  <Stat title="SQL" value="144" delta="+3%" />
                  <Stat title="Conversion" value="21%" delta="+2%" />
                  <Stat title="ARPU" value="$420" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Backlog','In progress','Won'].map((col, idx) => (
                    <div key={col} className="rounded-xl border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#101010]/70 p-3">
                      <div className="text-sm font-medium mb-2">{col}</div>
                      {[1,2,3].slice(0, idx===2?2:3).map(i => (
                        <div key={i} className="mb-2 rounded-lg border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#141414]/70 p-3 flex items-center justify-between">
                          <div>
                            <div className="text-sm">Deal {idx+1}-{i}</div>
                            <div className="text-[11px] text-gray-500">Acme • 7 days</div>
                          </div>
                          <span className="text-xs font-medium">${(i*(idx+1)*3).toLocaleString()}k</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'analytics' && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <Stat title="Visitors" value="48,120" delta="+42%" />
                  <Stat title="Bounce" value="22%" delta="-9%" />
                  <Stat title="Sessions" value="90,340" delta="+58%" />
                  <Stat title="CTR" value="6.8%" delta="+3.6%" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#101010]/70 p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Traffic trend</div>
                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[{d:1,v:80},{d:2,v:110},{d:3,v:160},{d:4,v:230},{d:5,v:320},{d:6,v:450},{d:7,v:620}]}> 
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="d" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} />
                          <Tooltip />
                          <Line type="monotone" dataKey="v" stroke="#ff5a00" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="rounded-xl border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#101010]/70 p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">CTR trend</div>
                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[{d:1,v:1.2},{d:2,v:1.6},{d:3,v:2.2},{d:4,v:3.0},{d:5,v:4.2},{d:6,v:5.6},{d:7,v:6.8}]}> 
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="d" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} domain={[0,8]} />
                          <Tooltip />
                          <Line type="monotone" dataKey="v" stroke="#ff5a00" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="rounded-xl border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#101010]/70 p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Leads growth</div>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[{m:'Jan',v:120},{m:'Feb',v:200},{m:'Mar',v:360},{m:'Apr',v:520},{m:'May',v:760},{m:'Jun',v:1100}]}> 
                          <defs>
                            <linearGradient id="leadsg" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ff5a00" stopOpacity={0.6}/>
                              <stop offset="95%" stopColor="#ff5a00" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="m" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} />
                          <Tooltip />
                          <Area type="monotone" dataKey="v" stroke="#ff5a00" strokeWidth={2} fill="url(#leadsg)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="rounded-xl border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#101010]/70 p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Revenue by channel</div>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[{c:'Ads',v:40},{c:'SEO',v:90},{c:'Ref',v:140},{c:'Email',v:220},{c:'Partners',v:360}]}> 
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="c" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} />
                          <Tooltip />
                          <Bar dataKey="v" fill="#ff5a00" radius={[6,6,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="rounded-xl border border-light-border dark:border-dark-border/60 bg-white/70 dark:bg-[#101010]/70 p-3">
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">CAC vs LTV</div>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[{d:1,cac:80,ltv:200},{d:2,cac:85,ltv:260},{d:3,cac:82,ltv:340},{d:4,cac:78,ltv:480},{d:5,cac:75,ltv:620}]}> 
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="d" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} />
                          <Tooltip />
                          <Line type="monotone" dataKey="cac" stroke="#888888" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="ltv" stroke="#ff5a00" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="text-xs text-gray-500 dark:text-gray-400">{t('tip_drag')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}


