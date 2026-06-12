/**
 * LearnDoMatchVisual : the "show the system" panel for the Home Learn→Do→Match
 * scroll-story (rendered inside <StickyScrollStory visual={...} />).
 *
 * A persistent competency-loop stepper (Learn · Do · Match) with a morphing
 * product panel per active step:
 *   0 · Learn  : parcours adaptatif, progression Dreyfus (5 niveaux)
 *   1 · Do     : mise en pratique sur un projet réel
 *   2 · Match  : passeport de compétences vérifiables, prêt à être matché
 *
 * Tokens only (no hex / arbitrary colors). Motion via framer-motion, fully
 * reduced-motion aware. Content is always rendered visible : the crossfade
 * never gates a panel invisible at rest.
 */
import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GraduationCap, PenTool, BadgeCheck, CheckCircle2, Sparkles } from 'lucide-react';

type StepKey = 'learn' | 'do' | 'match';

const STEPS: {
  key: StepKey;
  label: string;
  fr: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  /** active node fill (white icon) : all ≥ AA on white text/icon */
  fill: string;
}[] = [
  { key: 'learn', label: 'Learn', fr: 'Apprendre', Icon: GraduationCap, fill: 'bg-primary-700' },
  { key: 'do', label: 'Do', fr: 'Mettre en pratique', Icon: PenTool, fill: 'bg-secondary-700' },
  { key: 'match', label: 'Match', fr: 'Valoriser', Icon: BadgeCheck, fill: 'bg-accent-700' },
];

const DREYFUS: { label: string; h: string }[] = [
  { label: 'Novice', h: 'h-8' },
  { label: 'Débutant avancé', h: 'h-12' },
  { label: 'Compétent', h: 'h-16' },
  { label: 'Performant', h: 'h-20' },
  { label: 'Expert', h: 'h-24' },
];

const COMPETENCES: { name: string; level: number }[] = [
  { name: 'Prompt design pédagogique', level: 4 },
  { name: 'Conception IA-augmentée', level: 3 },
  { name: 'Évaluation par compétences', level: 5 },
];

const LevelDots: React.FC<{ level: number }> = ({ level }) => (
  <span className="flex items-center gap-tight" aria-hidden>
    {[1, 2, 3, 4, 5].map((n) => (
      <span
        key={n}
        className={`w-1.5 h-1.5 rounded-pill ${n <= level ? 'bg-accent-500' : 'bg-ink-200'}`}
      />
    ))}
  </span>
);

// ─── Per-step panels ──────────────────────────────────────────────────────────
const LearnPanel: React.FC = () => (
  <div className="flex flex-col gap-stack-lg">
    <div className="flex items-center justify-between gap-stack">
      <span className="font-display font-bold text-ink-900 text-h4">Parcours adaptatif</span>
      <span className="font-body text-caption font-semibold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-pill whitespace-nowrap">
        Progression Dreyfus
      </span>
    </div>
    <div className="flex items-end gap-stack-xs h-24" aria-hidden>
      {DREYFUS.map((d, i) => (
        <div
          key={d.label}
          className={`flex-1 rounded-t-md ${d.h} ${
            i < 2 ? 'bg-primary-300' : i === 2 ? 'bg-primary-600' : 'bg-primary-100'
          }`}
        />
      ))}
    </div>
    <div className="flex items-center justify-between font-body text-caption text-ink-500">
      <span>Novice</span>
      <span>Expert</span>
    </div>
    <div className="flex items-center gap-stack-xs rounded-xl bg-ink-50 px-3 py-2.5">
      <span className="w-2 h-2 rounded-pill bg-primary-600 shrink-0" />
      <span className="font-body text-body-sm text-ink-700">
        Niveau actuel : <span className="font-bold text-ink-900">Compétent</span> (3/5)
      </span>
    </div>
  </div>
);

const DoPanel: React.FC = () => (
  <div className="flex flex-col gap-stack-lg">
    <div className="flex items-center justify-between gap-stack">
      <span className="font-display font-bold text-ink-900 text-h4">Mise en pratique</span>
      <span className="font-body text-caption font-semibold text-secondary-700 bg-secondary-50 px-2.5 py-1 rounded-pill whitespace-nowrap">
        Projet réel
      </span>
    </div>
    <div className="rounded-xl ring-1 ring-ink-200 p-4 flex flex-col gap-stack">
      <div className="flex items-center gap-stack-xs">
        <span className="grid place-items-center w-9 h-9 rounded-lg bg-secondary-50 text-secondary-600 shrink-0">
          <PenTool size={18} />
        </span>
        <span className="flex flex-col">
          <span className="font-display font-bold text-ink-900 text-body leading-tight">
            Concevoir une séquence micro-learning
          </span>
          <span className="font-body text-caption text-ink-500">Cas concret · à votre rythme</span>
        </span>
      </div>
      <div className="flex items-center gap-stack-xs">
        <div className="flex-1 h-1.5 rounded-pill bg-ink-100 overflow-hidden">
          <div className="h-full w-2/3 rounded-pill bg-secondary-500" />
        </div>
        <span className="font-body text-caption text-ink-500 whitespace-nowrap">en cours</span>
      </div>
    </div>
    <div className="flex items-center gap-stack-xs rounded-xl bg-ink-50 px-3 py-2.5">
      <CheckCircle2 size={16} className="text-secondary-600 shrink-0" />
      <span className="font-body text-body-sm text-ink-700">
        La compétence se prouve sur un livrable, pas sur un QCM.
      </span>
    </div>
  </div>
);

const MatchPanel: React.FC = () => (
  <div className="flex flex-col gap-stack-lg">
    <div className="flex items-center justify-between gap-stack">
      <span className="font-display font-bold text-ink-900 text-h4">Passeport de compétences</span>
      <span className="inline-flex items-center gap-tight font-body text-caption font-semibold text-accent-700 bg-accent-50 px-2.5 py-1 rounded-pill whitespace-nowrap">
        <BadgeCheck size={13} /> Badge vérifiable
      </span>
    </div>
    <div className="flex flex-col gap-stack">
      {COMPETENCES.map((c) => (
        <div key={c.name} className="flex items-center gap-stack-xs">
          <BadgeCheck size={16} className="text-accent-600 shrink-0" />
          <span className="flex-1 font-body text-body-sm text-ink-800">{c.name}</span>
          <LevelDots level={c.level} />
        </div>
      ))}
    </div>
    <div className="flex items-center gap-stack-xs rounded-xl bg-accent-50 px-3 py-2.5">
      <Sparkles size={16} className="text-accent-700 shrink-0" />
      <span className="font-body text-body-sm text-ink-700">
        Des compétences vérifiables, prêtes à être <span className="font-bold text-ink-900">matchées</span> à vos projets.
      </span>
    </div>
  </div>
);

const PANELS = [LearnPanel, DoPanel, MatchPanel];

type Props = {
  /** active step 0..2 (clamped) */
  active: number;
  className?: string;
};

export const LearnDoMatchVisual: React.FC<Props> = ({ active, className = '' }) => {
  const reduce = useReducedMotion();
  const i = Math.min(STEPS.length - 1, Math.max(0, active));
  const Panel = PANELS[i];

  return (
    <div
      className={`relative w-full max-w-md rounded-2xl bg-white ring-1 ring-ink-200 shadow-xl p-6 flex flex-col gap-stack-lg ${className}`}
    >
      {/* Card label */}
      <div className="flex items-center justify-between">
        <span className="font-body text-caption font-semibold uppercase tracking-widest text-ink-400">
          Système de compétences
        </span>
        <span className="font-body text-caption font-bold text-ink-700">{STEPS[i].fr}</span>
      </div>

      {/* Loop stepper : persistent system frame */}
      <div className="flex items-start gap-stack-xs">
        {STEPS.map((s, idx) => (
          <React.Fragment key={s.key}>
            <div className="flex flex-col items-center gap-tight.5">
              <span
                className={`grid place-items-center w-11 h-11 rounded-pill transition-colors duration-slow ease-emphasis ${
                  idx === i ? `${s.fill} text-white shadow-sm` : 'bg-ink-100 text-ink-400'
                }`}
              >
                <s.Icon size={20} />
              </span>
              <span
                className={`font-body text-caption font-bold tracking-wide ${
                  idx === i ? 'text-ink-900' : 'text-ink-400'
                }`}
              >
                {s.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <span
                className={`flex-1 h-0.5 rounded-pill mt-5 transition-colors duration-slow ${
                  idx < i ? s.fill : 'bg-ink-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Morphing product panel */}
      <div className="relative min-h-60">
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute inset-0"
          >
            <Panel />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LearnDoMatchVisual;
