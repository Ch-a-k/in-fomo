import { useTranslation } from 'next-i18next';
import { memo } from 'react';
import { GiLaurelCrown, GiMoneyStack, GiCubeforce, GiSpawnNode, GiCash, GiShieldReflect } from "react-icons/gi";

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

  return (
    <section className="py-10 md:py-16 bg-primary relative overflow-hidden">
      {/* Фоновый паттерн */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        backgroundColor: '#ff5a00',
        backgroundImage: 'linear-gradient(#000 1.1px, transparent 1.1px), linear-gradient(90deg, #000 1.1px, transparent 1.1px), linear-gradient(#4f4f4f 1.1px, transparent 1.1px), linear-gradient(90deg, #4f4f4f 1.1px, #ff5a00 1.1px)',
        backgroundSize: '50px 50px, 50px 50px, 50px 50px, 50px 50px',
        backgroundPosition: '0 0, 0 0, 0 0, 0 0',
        opacity: 0.5,
      }} />
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center mb-8">
          <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
            <div className="mb-1 text-xs font-bold text-black inline-flex items-center uppercase tracking-wider">
              <span className="w-2 h-2 mr-2 bg-black rounded-full"></span>
              Milestones & Recognition.
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-0 text-white leading-tight">
              {t('milestones_subtitle')}
            </h2>
          </div>
          <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {milestones.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="animate-fadein"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex flex-col items-center p-4 h-full min-h-[180px] flex-1 rounded-lg bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 hover:border-[#181828] dark:hover:border-white transition-colors duration-300">
                    <div className="p-3 mb-3 rounded-lg bg-primary/10 inline-block text-primary">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white text-center break-words hyphens-auto min-h-[2.5rem]">
                      {t(item.key)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Декоративные круги */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/30 rounded-full blur-2xl z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/30 rounded-full blur-3xl z-0"></div>
      <style jsx>{`
        .animate-fadein {
          opacity: 0;
          animation: fadein 0.7s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes fadein {
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
});

MilestonesSection.displayName = 'MilestonesSection';

export default MilestonesSection; 