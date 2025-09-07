import type { GetStaticProps } from "next/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SEO from "../components/SEO";
import { Popover } from "@headlessui/react";
import Awards from "../components/Awards";

// Данные (без переводов, так как они будут в i18n)
const teamMembers = [
  { name: "Artur Chuikov", roleKey: "founder_ceo" },
  { name: "Arsen Dumbadze", roleKey: "bdm_cis" },
  { name: "Volodymyr Zeleniuk", roleKey: "bdm_us" },
  { name: "Artur Voievoda", roleKey: "coo" },
  // { name: "Oleksandr Bodiul", roleKey: "full_stack_developer" },
  { name: "Oleksii Perevala", roleKey: "marketing_director" },
  { name: "Serhii Serhienko", roleKey: "business_consultant" },
  { name: "Pawel B", roleKey: "backend_developer" },
  { name: "Dmitry Klim", roleKey: "web3_director" },
  { name: "Maria Spesyvtseva", roleKey: "designer" },
];

const companyValues = [
  { titleKey: "innovation", descKey: "innovation_desc", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { titleKey: "quality", descKey: "quality_desc", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
  { titleKey: "client_centric", descKey: "client_centric_desc", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  { titleKey: "expertise", descKey: "expertise_desc", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" },
  { titleKey: "transparency", descKey: "transparency_desc", icon: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" },
  { titleKey: "reliability", descKey: "reliability_desc", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { titleKey: "innovation_driven", descKey: "innovation_driven_desc", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { titleKey: "teamwork", descKey: "teamwork_desc", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
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
    technologies: ["Next.js", "React", "Vue.js", "Node.js", "TypeScript"],
  },
  {
    titleKey: "mobile_development",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    technologies: ["React Native", "Flutter", "iOS", "Android", "Kotlin"],
  },
  {
    titleKey: "cloud_solutions",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"],
  },
  {
    titleKey: "cybersecurity",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    technologies: [
      "Penetration Testing",
      "Security Audits",
      "Encryption",
      "Access Control",
      "Security Monitoring",
    ],
  },
  {
    titleKey: "ai_solutions",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    technologies: [
      "Machine Learning",
      "Computer Vision",
      "NLP",
      "TensorFlow",
      "PyTorch",
    ],
  },
  {
    titleKey: "ui_ux_design",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    technologies: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "Prototyping",
      "User Research",
    ],
  },
  {
    titleKey: "bot_development",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    technologies: [
      "Telegram Bots",
      "Discord Bots",
      "WhatsApp Bots",
      "Chatbots",
      "AI Integration",
    ],
  },
  {
    titleKey: "crm_development",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    technologies: [
      "Custom CRM",
      "ERP Systems",
      "Business Automation",
      "Analytics",
      "Integration",
    ],
  },
  {
    titleKey: "web3_blockchain",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    technologies: ["Smart Contracts", "DeFi", "NFT", "Web3.js", "Solidity"],
  },
  {
    titleKey: "telegram_mini_apps",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    technologies: ["TWA", "Bot API", "Payments", "WebApp API", "TON"],
  },
  {
    titleKey: "parsers_scrapers",
    icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
    technologies: [
      "Web Scraping",
      "Data Mining",
      "API Integration",
      "Automation",
      "Data Processing",
    ],
  },
  {
    titleKey: "data_analytics",
    icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    technologies: [
      "Big Data",
      "Data Visualization",
      "Predictive Analytics",
      "Business Intelligence",
      "Statistical Analysis",
    ],
  },
];

export default function About() {
  const { t } = useTranslation("about");
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <>
      <SEO
      title={t("meta_title", { defaultValue: "IN-FOMO | About Us" })}
      description={t("meta_description", { defaultValue: "Learn about IN-FOMO - our team, values, and mission to deliver innovative IT solutions."})}
      />

      {/* Hero */}
      <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-block px-6 py-2 mb-6 text-sm font-medium rounded-full bg-primary/90 text-white stagger-delay-1">
                IN-FOMO.
              </div>
              <h1 className="heading-1 mb-6">
                {t("title")} <span className="text-primary">2024</span>
              </h1>
              <p className="mb-10 text-xl text-gray-600 dark:text-gray-300">
                {t("description")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 bg-light-surface dark:bg-dark-surface">
        <div className="container max-w-7xl mx-auto px-4 space-y-16">
          
          {/* Миссия и достижения */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/about/mission-bg.jpg"
                  alt="Digital transformation"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">{t("our_mission")}</h3>
                  <p className="text-white/90 text-lg">
                    {t("our_mission_desc")}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-6 dark:text-white">
                {t("why_choose_us")}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 mr-4 rounded-lg bg-primary/10 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">{t("proven_expertise")}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t("proven_expertise_desc")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 mr-4 rounded-lg bg-primary/10 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">{t("dedicated_team")}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t("dedicated_team_desc")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 mr-4 rounded-lg bg-primary/10 text-primary">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">{t("secure_solutions")}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t("secure_solutions_desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Достижения - Ключевая статистика */}
          <div className="py-10 bg-light-bg dark:bg-dark-bg rounded-2xl border border-light-border dark:border-dark-border">
            <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-4 dark:text-white">
                {t("our_achievements")}
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400">
                {t("our_achievements_desc")}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto px-4">
              <div className="text-center animate-fade-in-up stagger-delay-1">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("projects_completed")}</div>
              </div>
              
              <div className="text-center animate-fade-in-up stagger-delay-2">
                <div className="text-4xl font-bold text-primary mb-2">90+</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("happy_clients")}</div>
              </div>
              
              <div className="text-center animate-fade-in-up stagger-delay-3">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("years_experience")}</div>
              </div>
              
              <div className="text-center animate-fade-in-up stagger-delay-4">
                <div className="text-4xl font-bold text-primary mb-2">30+</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{t("countries_served")}</div>
              </div>
            </div>
          </div>
          {/* Awards */}
          <Awards />
          {/* Tech Stack */}
          <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in-up">
            <div className="inline-block px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {t("tech_stack")}
            </div>
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              {t("tech_stack")}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              {t("tech_stack_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {techStack.map((category, index) => (
              <div key={index} className="animate-fade-in-up stagger-delay-1">
                <Popover as="div" className="relative">
                  <Popover.Button className="w-full">
                    <div className="p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-primary dark:hover:border-primary transition-colors duration-300 h-full">
                      <div className="flex items-center mb-4">
                        <div className="p-3 mr-3 rounded-lg bg-primary/10 inline-block text-primary">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={category.icon}
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold dark:text-white">
                          {t(category.titleKey)}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {category.technologies.map((tech, techIndex) => (
                          <li
                            key={techIndex}
                            className="text-sm text-gray-600 dark:text-gray-400 flex items-center"
                          >
                            <svg
                              className="h-4 w-4 mr-2 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Popover.Button>
                  <Popover.Panel className="absolute z-50 w-64 p-4 mt-2 text-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 left-1/2 -translate-x-1/2">
                    {t(`${category.titleKey}_desc`)}
                  </Popover.Panel>
                </Popover>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              {t("values")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => (
              <div
                key={value.titleKey}
                className="animate-fade-in-up stagger-delay-1"
              >
                <div className="h-[190px] p-6 rounded-lg backdrop-blur-md bg-light-bg/15 dark:bg-dark-bg/15 border border-white/20 dark:border-white/5 hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors flex flex-col">
                  <div className="p-3 mb-4 w-fit rounded-lg bg-primary/15 inline-block text-primary">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={value.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {t(value.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Team */}
          <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              {t("team")}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`animate-fade-in-up stagger-delay-${index + 1}`}
              >
                <div className="h-[230px] p-6 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-[#ff5a00] dark:hover:border-[#ff5a00] transition-colors text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="text-sm font-bold mb-2 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {t(member.roleKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Join Us */}
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-6 dark:text-white stagger-delay-1">
              {t("join_team")}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-6 stagger-delay-2">
              {t("join_team_desc")}
            </p>
            <div className="stagger-delay-3">
              <Link href="/contact" className="btn btn-primary uppercase">
                {t("contact_us")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common", "about", "home"])),
      footerVariant: "design2",
    },
  };
};
