/**
 * ParcoursCard — Design System Pattern
 *
 * Glass-morphism learning path card adapted from WIP ParcoursPageUpgraded.
 *
 * Visual spec:
 * - Frosted glass background with blur(20px)
 * - Tone-colored title (primary/warm/sun)
 * - 2-line description
 * - Inline slim progress bar + bold percentage
 * - Full-width solid tone CTA button with hover lift + shadow
 * - Radial top-glow overlay per tone on hover
 *
 * Usage:
 *   <ParcoursCard
 *     id="1"
 *     title="Fondamentaux du Leadership"
 *     description="Apprenez les principes..."
 *     progress={65}
 *     status="en cours"
 *     tone="primary"
 *     onClick={(id) => navigate(`/learning-paths/${id}`)}
 *   />
 */

import React from 'react';
import { ArrowRight, User, Zap, Clock3, BookOpen } from 'lucide-react';
import { InlineProgress } from './InlineProgress';
import { ToneAwareCard } from './ToneAwareCard';
import { MetaPillGroup } from '../ui/MetaPillGroup';
import './ParcoursCard.css';

export type ParcoursTone = 'primary' | 'warm' | 'sun';
export type ParcoursStatus = 'en cours' | 'complété' | 'non commencé';

export interface ParcoursCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;       // 0–100
  status: ParcoursStatus;
  tone?: ParcoursTone;
  onClick?: (id: string) => void;
  className?: string;
  // Optional metadata
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
      className={`parcours-card parcours-card--${tone} ${className}`}
      style={{ cursor: 'pointer', transition: 'all var(--dur-2)' }}
      borderRadius="var(--r-2xl)"
    >
      <div
        onClick={() => onClick?.(id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.(id)}
        aria-label={`${title} — ${status}`}
        style={{ cursor: 'pointer' }}
      >
        {/* Radial top glow overlay — tone-specific via CSS class */}
        <div
          className="parcours-card__glow"
          aria-hidden="true"
        />

      {/* Card content */}
      <div className="parcours-card__inner">
        {/* Title — tone color via CSS class */}
        <h3 className="parcours-card__title">
          {title}
        </h3>

        {/* Description */}
        <p className="parcours-card__desc">{description}</p>

        {/* Metadata using MetaPillGroup (if provided) */}
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
            className="parcours-card__metadata-pills"
          />
        )}

        {/* Spacer */}
        <div className="parcours-card__spacer" />

        {/* Progress bar using InlineProgress component */}
        <InlineProgress value={progress} tone={tone} showLabel={true} size="md" />

        {/* CTA button — tone-specific via CSS class */}
        <button
          className={`parcours-card__cta parcours-card__cta--${tone}`}
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
