import type { GetStaticProps } from 'next/types'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// Данные (без переводов, так как они будут в i18n)
const teamMembers = [
  { name: "Artur Chuikov", roleKey: "founder_ceo" },
  { name: "Arsen Dumbadze", roleKey: "ceo_cis" },
  { name: "Volodymyr Zeleniuk", roleKey: "ceo_us" },
  { name: "Artur Voievoda", roleKey: "sales_manager" },
  { name: "Olha Berezenko", roleKey: "sales_manager" },
  { name: "Eugene B", roleKey: "sales_manager" },
  { name: "Oleksandr Bodiul", roleKey: "full_stack_developer" },
  { name: "Oleksii Perevala", roleKey: "marketing_director" },
  { name: "Serhii Serhienko", roleKey: "business_consultant" },
  { name: "Pawel B", roleKey: "full_stack_developer" }
];

const companyValues = [
  { titleKey: "innovation", descKey: "innovation_desc" },
  { titleKey: "quality", descKey: "quality_desc" },
  { titleKey: "client_centric", descKey: "client_centric_desc" },
  { titleKey: "expertise", descKey: "expertise_desc" }
];

// Обновляем интерфейс для techStack
interface TechCategory {
  titleKey: string;
  icon: string;
  technologies: string[];
}

const techStack: TechCategory[] = [
  {
    titleKey: "web_development",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    technologies: ["Next.js", "React", "Vue.js", "Node.js", "TypeScript"]
  },
  {
    titleKey: "mobile_development",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    technologies: ["React Native", "Flutter", "iOS", "Android", "Kotlin"]
  },
  {
    titleKey: "cloud_solutions",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"]
  },
  {
    titleKey: "cybersecurity",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    technologies: ["Penetration Testing", "Security Audits", "Encryption", "Access Control", "Security Monitoring"]
  },
  {
    titleKey: "ai_solutions",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    technologies: ["Machine Learning", "Computer Vision", "NLP", "TensorFlow", "PyTorch"]
  },
  {
    titleKey: "ui_ux_design",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    technologies: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"]
  },
  {
    titleKey: "bot_development",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    technologies: ["Telegram Bots", "Discord Bots", "WhatsApp Bots", "Chatbots", "AI Integration"]
  },
  {
    titleKey: "crm_development",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    technologies: ["Custom CRM", "ERP Systems", "Business Automation", "Analytics", "Integration"]
  },
  {
    titleKey: "web3_blockchain",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    technologies: ["Smart Contracts", "DeFi", "NFT", "Web3.js", "Solidity"]
  },
  {
    titleKey: "telegram_mini_apps",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    technologies: ["TWA", "Bot API", "Payments", "WebApp API", "TON"]
  },
  {
    titleKey: "parsers_scrapers",
    icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
    technologies: ["Web Scraping", "Data Mining", "API Integration", "Automation", "Data Processing"]
  }
];

export default function About() {
  const { t } = useTranslation('about')
  const { theme } = useTheme()
  const router = useRouter()



  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero */}
      <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/90 text-white stagger-delay-1">
                IN-FOMO.
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white stagger-delay-2">
                {t('title')} <span className="text-primary">2024</span>
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-400 stagger-delay-4">
                {t('description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 bg-light-surface dark:bg-dark-surface">
        <div className="container max-w-7xl mx-auto px-4 space-y-16">
          
          {/* Tech Stack */}
          <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in-up">
            <div className="inline-block px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {t('tech_stack')}
            </div>
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              {t('tech_stack')}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              {t('tech_stack_desc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {techStack.map((category, index) => (
              <div key={index} className="animate-fade-in-up stagger-delay-1">
                <div className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-primary dark:hover:border-primary transition-colors duration-300 h-full">
                  <div className="flex items-center mb-4">
                    <div className="p-3 mr-3 rounded-lg bg-primary/10 inline-block text-primary">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold dark:text-white">{t(category.titleKey)}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.technologies.map((tech, techIndex) => (
                      <li key={techIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <svg className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              {t('values')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {companyValues.map((value, index) => (
              <div key={value.titleKey} className="text-center animate-fade-in-up stagger-delay-1">
                <div className="p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
                  <h3 className="text-lg font-bold mb-2 dark:text-white">{t(value.titleKey)}</h3>

                </div>
              </div>
            ))}
          </div>

          {/* Team */}
          <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              {t('team')}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {teamMembers.map((member, index) => (
              <div key={member.name} className={`animate-fade-in-up stagger-delay-${index + 1}`}>
                <div className="p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-sm font-bold dark:text-white">{member.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{t(member.roleKey)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Join Us */}
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 dark:text-white stagger-delay-1">
              {t('join_team')}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-6 stagger-delay-2">
              {t('join_team_desc')}
            </p>
            <div className="stagger-delay-3">
              <Link href="/contact" className="btn btn-primary uppercase">
                {t('contact_us')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'en', ['common', 'about']);
  
  return {
    props: {
      ...translations,
      title: 'IN-FOMO | About Us',
      description: 'Learn about IN-FOMO - our team, values, and mission to deliver innovative IT solutions.',
      ogImage: '/images/og-image.png',
      footerVariant: 'design1'
    },
  };
};