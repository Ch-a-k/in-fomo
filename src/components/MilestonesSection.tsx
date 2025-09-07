import { useTranslation } from 'next-i18next';
import { memo, useMemo } from 'react';
import { GiLaurelCrown, GiMoneyStack, GiCubeforce, GiSpawnNode, GiCash, GiShieldReflect } from "react-icons/gi";
import { motion } from 'framer-motion';

const milestones = [
  { key: 'milestone_top1', icon: GiLaurelCrown },
  { key: 'milestone_investment', icon: GiMoneyStack },
  { key: 'milestone_clients_investment', icon: GiCash },
  { key: 'milestone_blockchain', icon: GiCubeforce },
  { key: 'milestone_nodes', icon: GiSpawnNode },
  { key: 'milestone_enterprise', icon: GiShieldReflect },
];

const MilestonesSection = memo(() => {
  const { t } = useTranslation('home');

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 }
  }), []);

  return (
    <section className="py-14 md:py-20 relative overflow-hidden">
      {/* Градиентный фон в стиле Next.js */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/10" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float-reverse" />
        {/* Градиентная сетка */}
        <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:36px_36px] dark:opacity-20" />
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row md:items-center mb-10">
          <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
            <div className="mb-2 text-[10px] font-bold text-gray-800 dark:text-gray-200 inline-flex items-center uppercase tracking-[0.2em]">
              <span className="w-2 h-2 mr-2 bg-primary rounded-full"></span>
              Milestones & Recognition
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-0 text-gray-900 dark:text-white leading-tight">
              {t('milestones_subtitle')}
            </h2>
          </div>

          <motion.div
            className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          >
            {milestones.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.key} variants={itemVariants}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="group relative overflow-hidden flex flex-col items-center p-5 h-full min-h-[180px] rounded-xl border border-light-border dark:border-dark-border bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm shadow-[0_0_0_1px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-3 mb-3 rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="relative text-sm font-semibold text-gray-900 dark:text-white text-center break-words hyphens-auto min-h-[2.5rem]">
                      {t(item.key)}
                    </span>
                    <div className="pointer-events-none absolute -bottom-6 -left-6 h-16 w-16 bg-primary/10 rounded-full blur-xl group-hover:animate-pulse-subtle" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

MilestonesSection.displayName = 'MilestonesSection';

export default MilestonesSection; 