import { GetStaticProps } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'

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

const techStack = [
  { categoryKey: "frontend", technologies: ["React", "Next.js", "Vue.js"] },
  { categoryKey: "backend", technologies: ["Node.js", "Python", "Go"] },
  { categoryKey: "mobile", technologies: ["React Native", "Flutter"] },
  { categoryKey: "database", technologies: ["MongoDB", "PostgreSQL"] },
  { categoryKey: "cloud", technologies: ["AWS", "Azure", "Docker"] },
  { categoryKey: "ai", technologies: ["TensorFlow", "PyTorch"] }
];

const achievements = [
  { number: "50+", textKey: "projects" },
  { number: "30+", textKey: "clients" },
  { number: "12", textKey: "countries" },
  { number: "24/7", textKey: "support" }
];

const whatWeDo = [
  { titleKey: "web_development", descKey: "web_development_desc" },
  { titleKey: "mobile_apps", descKey: "mobile_apps_desc" },
  { titleKey: "ai_solutions", descKey: "ai_solutions_desc" },
  { titleKey: "web3_blockchain", descKey: "web3_blockchain_desc" }
];

export default function About() {
  const { t } = useTranslation('about')
  const { theme } = useTheme()
  const router = useRouter()

  // Анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <>
      <Head>
      <title>{`IN-FOMO | ${t('title')}`}</title>
      <meta name="description" content={t('subtitle')} />
      <link rel="icon" href="/favicon.ico" />
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
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
              IN-FOMO
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              {t('title')} <span className="text-primary">2024</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('subtitle')}
            </motion.p>
            <motion.p variants={itemVariants} className="text-base text-gray-500 dark:text-gray-400">
              {t('description')}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 bg-light-surface dark:bg-dark-surface">
        <div className="container max-w-7xl mx-auto px-4 space-y-16">
          {/* What We Do */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 text-center dark:text-white">
              {t('what_we_do')}
            </motion.h2>
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 grid-auto-rows-1fr">
              {whatWeDo.map((service, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors h-full">
                    <div className="p-2 mb-3 rounded-lg bg-primary/10 inline-block text-primary">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2 dark:text-white">{t(service.titleKey)}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t(service.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 text-center dark:text-white">
              {t('achievements')}
            </motion.h2>
            <motion.div variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {achievements.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{item.number}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t(item.textKey)}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 text-center dark:text-white">
              {t('tech_stack')}
            </motion.h2>
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((stack, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
                    <h3 className="text-lg font-bold mb-2 dark:text-white">{t(stack.categoryKey)}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stack.technologies.join(', ')}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Values */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 text-center dark:text-white">
              {t('values')}
            </motion.h2>
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {companyValues.map((value, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors">
                    <h3 className="text-lg font-bold mb-2 dark:text-white">{t(value.titleKey)}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t(value.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Team */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 text-center dark:text-white">
              {t('team')}
            </motion.h2>
            <motion.div variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {teamMembers.map((member, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-sm font-bold dark:text-white">{member.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t(member.roleKey)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Join Us */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="text-center">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 dark:text-white">
              {t('join_team')}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base text-gray-600 dark:text-gray-300 mb-6">
              {t('join_team_desc')}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link href="/contact" className="btn btn-primary">
                {t('contact_us')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'about'])),
    },
  };
};