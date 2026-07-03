import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { BookOpen, MessageSquare, NotebookPen, Compass, Sparkles } from 'lucide-react';
import { TlsLogo } from '../../ui/TlsLogo';

type TabKey = 'parcours' | 'coaching' | 'journal' | 'veille';

type Tab = {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
};

const TABS: Tab[] = [
  { key: 'parcours', label: 'Parcours', icon: <BookOpen size={14} /> },
  { key: 'coaching', label: 'Coaching', icon: <MessageSquare size={14} /> },
  { key: 'journal', label: 'Journal', icon: <NotebookPen size={14} /> },
  { key: 'veille', label: 'Veille', icon: <Compass size={14} /> },
];

const panelMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] as const },
};

const ParcoursPanel: React.FC = () => (
  <motion.div {...panelMotion} className="flex flex-col gap-stack-xs">
    <div className="rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 p-4 text-white">
      <span className="text-caption opacity-80 font-semibold uppercase tracking-wider">Étape 4 sur 7</span>
      <p className="font-display text-h4 font-bold m-0 mt-1">Devenir prompt designer</p>
      <div className="mt-3 h-1.5 bg-white/30 rounded-pill overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '57%' }}
          transition={{ duration: 1.2, delay: 0.25, ease: 'easeOut' }}
          className="h-full bg-white rounded-pill"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-stack-xs">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.45, type: 'spring', stiffness: 260, damping: 18 }}
        className="rounded-lg bg-primary-50 border border-primary-100 p-3 flex flex-col gap-0.5"
      >
        <span className="text-caption font-bold text-primary-700 uppercase">XP gagnés</span>
        <span className="font-display text-h4 font-bold text-ink-900 tabular-nums">+340</span>
      </motion.div>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 18 }}
        className="rounded-lg bg-accent-50 border border-accent-100 p-3 flex flex-col gap-0.5"
      >
        <span className="text-caption font-bold text-warning-fg uppercase">Streak</span>
        <span className="font-display text-h4 font-bold text-ink-900 tabular-nums">12 j</span>
      </motion.div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75 }}
      className="rounded-lg bg-gradient-to-br from-accent-50 to-accent-100/40 border border-accent-200 p-3 flex items-center gap-stack-xs"
    >
      <Sparkles size={16} className="text-warning-fg shrink-0" />
      <span className="font-body text-caption font-semibold text-ink-800">
        Nouveau badge débloqué <span className="font-bold">Prompt Apprenti</span>
      </span>
    </motion.div>
  </motion.div>
);

const CoachingPanel: React.FC = () => (
  <motion.div {...panelMotion} className="flex flex-col gap-stack-xs">
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="flex justify-start"
    >
      <div className="rounded-2xl rounded-bl-md bg-ink-100 px-3 py-2 max-w-[85%]">
        <p className="font-body text-body-sm text-ink-900 m-0">
          Bravo pour ta soumission Marie ! J'ai trois retours détaillés à partager.
        </p>
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="flex justify-end"
    >
      <div className="rounded-2xl rounded-br-md bg-primary-500 text-white px-3 py-2 max-w-[85%]">
        <p className="font-body text-body-sm m-0">Merci Sarah, je relis ce soir 🙏</p>
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="rounded-xl bg-white border border-ink-200 p-3 flex items-center gap-stack-xs mt-2 shadow-xs"
    >
      <div className="w-10 h-10 rounded-pill bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
        S
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body font-bold text-body-sm text-ink-900 m-0 truncate">Session avec Sarah</p>
        <p className="font-body text-caption text-ink-500 m-0 truncate">Mardi 14:30 · Visio</p>
      </div>
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.95, type: 'spring', stiffness: 320, damping: 16 }}
        className="inline-flex items-center px-2 py-0.5 rounded-pill bg-success-bg text-success-fg text-micro font-bold uppercase"
      >
        Live
      </motion.span>
    </motion.div>
  </motion.div>
);

const JournalPanel: React.FC = () => (
  <motion.div {...panelMotion} className="flex flex-col gap-stack-xs">
    <div className="rounded-xl bg-gradient-to-br from-accent-50 to-secondary-50 p-4 border border-accent-200">
      <span className="text-caption font-bold text-warning-fg uppercase tracking-wider">Aujourd'hui</span>
      <p className="font-display text-h5 font-bold text-ink-900 m-0 mt-1">3 insights après ma session</p>
      <p className="font-body text-body-sm text-ink-700 m-0 mt-2 line-clamp-2">
        J'ai compris que mes apprenants ont besoin de respiration entre les modules denses. La prochaine cohorte sera plus rythmée.
      </p>
    </div>
    <div className="grid grid-cols-3 gap-stack-xs">
      {[
        { label: 'Insight', tone: 'bg-primary-50 text-primary-700 border-primary-100' },
        { label: 'Question', tone: 'bg-secondary-50 text-secondary-700 border-secondary-100' },
        { label: 'Action', tone: 'bg-accent-50 text-warning-fg border-accent-100' },
      ].map(({ label, tone }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 + i * 0.12 }}
          className={`rounded-lg border p-2 text-center ${tone}`}
        >
          <span className="text-caption font-bold uppercase tracking-wider">{label}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const VeillePanel: React.FC = () => (
  <motion.div {...panelMotion} className="flex flex-col gap-stack-xs">
    {[
      { tag: 'Pédagogie', title: "L'apprentissage actif chez Brilliant", src: 'TechCrunch' },
      { tag: 'IA', title: 'Mistral lance un assistant pédago', src: 'The Verge' },
      { tag: 'Étude', title: '78% des L&D adoptent l\'IA en 2026', src: 'McKinsey' },
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.12 }}
        className="rounded-lg bg-white border border-ink-200 p-3 flex flex-col gap-tight"
      >
        <span className="inline-flex items-center self-start px-2 py-0.5 rounded-pill bg-primary-50 text-primary-700 text-micro font-bold uppercase">
          {item.tag}
        </span>
        <p className="font-body font-bold text-body-sm text-ink-900 m-0 leading-tight">{item.title}</p>
        <p className="font-body text-caption text-ink-500 m-0">{item.src}</p>
      </motion.div>
    ))}
  </motion.div>
);

const PANELS: Record<TabKey, React.FC> = {
  parcours: ParcoursPanel,
  coaching: CoachingPanel,
  journal: JournalPanel,
  veille: VeillePanel,
};

type Props = {
  className?: string;
  /** Tab to display initially. Default 'parcours'. */
  initialTab?: TabKey;
  /**
   * 'full' (default) = hero/showcase frame with logo, working tab-switcher and hint text.
   * 'compact' = illustrative frame for a single fixed feature (used in zigzag sections):
   * no logo/dots, no tab-switcher, no hint — just the feature name and its panel.
   */
  variant?: 'full' | 'compact';
};

/**
 * Interactive Learning App mockup. 4 tabs (Parcours / Coaching / Journal / Veille)
 * — each click loads a different mini-panel with internal staggered animations.
 * Signature piece for the home page "Interactive Product Demo" section.
 *
 * Wrapped in MotionConfig reducedMotion="user" so every nested motion.* element
 * (including the per-panel entrance animations defined above) automatically
 * collapses transform/layout animation to an immediate state for users with
 * prefers-reduced-motion, without needing each panel to check it individually.
 */
export const InteractiveAppMockup: React.FC<Props> = ({
  className = '',
  initialTab = 'parcours',
  variant = 'full',
}) => {
  const [active, setActive] = useState<TabKey>(initialTab);
  const Panel = PANELS[active];
  const compact = variant === 'compact';
  const activeTab = TABS.find((t) => t.key === active);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`relative rounded-2xl bg-gradient-to-br from-primary-50 via-white to-secondary-50 border border-ink-100 shadow-2xl overflow-hidden p-5 flex flex-col gap-stack ${compact ? 'min-h-[360px]' : 'min-h-[460px]'} ${className}`}
      >
        {compact ? (
          /* compact header — single feature label, no chrome/tab-switcher */
          <div className="flex items-center gap-stack-xs pb-3 border-b border-ink-100">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white shadow-xs text-primary-600">
              {activeTab?.icon}
            </span>
            <span className="font-display font-bold text-body-sm text-ink-900">{activeTab?.label}</span>
          </div>
        ) : (
          <>
            {/* mockup header */}
            <div className="flex items-center gap-stack-xs pb-3 border-b border-ink-100">
              <TlsLogo size={20} />
              <span className="font-display font-bold text-body-sm text-ink-900">Learning App</span>
              <div className="ml-auto flex gap-tight">
                <span className="w-2 h-2 rounded-pill bg-ink-200" />
                <span className="w-2 h-2 rounded-pill bg-ink-200" />
                <span className="w-2 h-2 rounded-pill bg-ink-200" />
              </div>
            </div>

            {/* tabs */}
            <div className="flex items-center gap-tight p-1 rounded-pill bg-ink-100 w-fit">
              {TABS.map((t) => {
                const isActive = active === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActive(t.key)}
                    className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-caption font-semibold transition-colors duration-base ${
                      isActive ? 'text-primary-700' : 'text-ink-600 hover:text-ink-900'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="mockup-tab-bg"
                        className="absolute inset-0 rounded-pill bg-white shadow-xs"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative inline-flex items-center gap-1.5">
                      {t.icon}
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* panel */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div key={active}>
              <Panel />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* hint — full variant only, since compact has no tab-switcher to hint at */}
        {!compact && (
          <div className="pt-2 border-t border-ink-100 flex items-center justify-center gap-1.5">
            <Sparkles size={12} className="text-warning-fg" />
            <span className="font-body text-caption text-ink-500">Clique sur les onglets pour explorer</span>
          </div>
        )}
      </div>
    </MotionConfig>
  );
};

export default InteractiveAppMockup;
