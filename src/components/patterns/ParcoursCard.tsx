/**
 * ParcoursCard — Design System Pattern
 *
 * Glass-morphism learning path card. Visual spec:
 * - Frosted glass background (via ToneAwareCard)
 * - Tone-colored title (primary/warm/sun)
 * - 2-line description
 * - Inline slim progress bar + bold percentage
 * - Full-width solid tone CTA button with hover lift + shadow
 * - Radial top-glow overlay per tone on hover (style={{}} exception — radial gradients)
 */

import React from 'react';
import { ArrowRight, User, Zap, Clock3, BookOpen } from 'lucide-react';
import { InlineProgress } from './InlineProgress';
import { ToneAwareCard } from './ToneAwareCard';
import { MetaPillGroup } from '../ui/MetaPillGroup';

export type ParcoursTone = 'primary' | 'warm' | 'sun';
export type ParcoursStatus = 'en cours' | 'complété' | 'non commencé';

export interface ParcoursCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: ParcoursStatus;
  tone?: ParcoursTone;
  onClick?: (id: string) => void;
  className?: string;
  instructor?: string;
  duration?: string;
  lessons?: number;
  level?: 'débutant' | 'intermédiaire' | 'avancé';
}

const CTA_LABELS: Record<ParcoursStatus, string> = {
  'en cours':       'Continuer le parcours',
  complété:         'Revoir le parcours',
  'non commencé':   'Commencer le parcours',
};

const TITLE_TONE_CLASSES: Record<ParcoursTone, string> = {
  primary: 'text-primary-600',
  warm:    'text-secondary-600',
  sun:     'text-accent-700',
};

const CTA_BASE =
  'flex items-center justify-center gap-2 w-full h-10 rounded-xl px-4 cursor-pointer font-body text-body-sm font-semibold whitespace-nowrap transition-all duration-150 hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400';

const CTA_TONE_CLASSES: Record<ParcoursTone, string> = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-brand-sm hover:shadow-brand-md',
  warm:    'bg-secondary-500 hover:bg-secondary-600 text-white shadow-xs hover:shadow-sm',
  sun:     'bg-accent-400 hover:bg-accent-500 text-accent-900 shadow-xs hover:shadow-sm',
};

const GLOW_BG: Record<ParcoursTone, React.CSSProperties> = {
  primary: { background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.10) 0%, transparent 70%)' },
  warm:    { background: 'radial-gradient(circle at 50% 0%, rgba(241, 138, 76, 0.14) 0%, transparent 70%)' },
  sun:     { background: 'radial-gradient(circle at 50% 0%, rgba(248, 176, 68, 0.14) 0%, transparent 70%)' },
};

export const ParcoursCard: React.FC<ParcoursCardProps> = ({
  id,
  title,
  description,
  progress,
  status,
  tone = 'primary',
  onClick,
  className = '',
  instructor,
  duration,
  lessons,
  level,
}) => {
  return (
    <ToneAwareCard
      tone={tone}
      onClick={() => onClick?.(id)}
      className={`group relative overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${className}`}
      borderRadius="var(--r-2xl)"
    >
      <div
        onClick={() => onClick?.(id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.(id)}
        aria-label={`${title} — ${status}`}
        className="block w-full h-auto p-0 overflow-visible cursor-pointer"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={GLOW_BG[tone]}
        />

        <div className="relative p-6 flex flex-col gap-4 h-full min-h-[220px] max-md:p-5 max-md:min-h-[190px]">
          <h3 className={`font-display text-h4 font-bold leading-tight m-0 break-words hyphens-auto max-md:text-body ${TITLE_TONE_CLASSES[tone]}`}>
            {title}
          </h3>

          {(instructor || duration || lessons || level) && (
            <MetaPillGroup
              items={[
                ...(instructor ? [{ icon: <User size={13} />, text: instructor }] : []),
                ...(level ? [{ icon: <Zap size={13} />, text: level }] : []),
                ...(duration ? [{ icon: <Clock3 size={13} />, text: duration }] : []),
                ...(lessons ? [{ icon: <BookOpen size={13} />, text: `${lessons} leçons` }] : []),
              ]}
              size="sm"
              layout="horizontal"
              gap="sm"
              className="py-2 border-y border-ink-900/[6%]"
            />
          )}

          <p className="font-body text-body-sm text-ink-600 leading-normal m-0">{description}</p>

          <div className="flex-1 min-h-2" />

          <InlineProgress value={progress} tone={tone} showLabel={true} size="md" />

          <button
            className={`${CTA_BASE} ${CTA_TONE_CLASSES[tone]}`}
            onClick={(e) => { e.stopPropagation(); onClick?.(id); }}
            aria-label={CTA_LABELS[status]}
          >
            <span>{CTA_LABELS[status]}</span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </ToneAwareCard>
  );
};

export default ParcoursCard;
