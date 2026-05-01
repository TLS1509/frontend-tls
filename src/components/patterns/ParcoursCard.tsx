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

const TONE_COLORS: Record<ParcoursTone, string> = {
  primary: 'var(--tls-primary-500)',
  warm:    'var(--tls-orange-500)',
  sun:     'var(--tls-yellow-400)',
};

const TONE_SHADOWS: Record<ParcoursTone, string> = {
  primary: '0 4px 14px rgba(85,161,180,0.30)',
  warm:    '0 4px 14px rgba(237,132,58,0.30)',
  sun:     '0 4px 14px rgba(248,176,68,0.30)',
};

const TONE_SHADOWS_HOVER: Record<ParcoursTone, string> = {
  primary: '0 8px 24px rgba(85,161,180,0.45)',
  warm:    '0 8px 24px rgba(237,132,58,0.45)',
  sun:     '0 8px 24px rgba(248,176,68,0.45)',
};

const TONE_GLOWS: Record<ParcoursTone, string> = {
  primary: 'rgba(85,161,180,0.14)',
  warm:    'rgba(237,132,58,0.14)',
  sun:     'rgba(248,176,68,0.14)',
};

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
  const color = TONE_COLORS[tone];
  const shadow = TONE_SHADOWS[tone];
  const shadowHover = TONE_SHADOWS_HOVER[tone];
  const glow = TONE_GLOWS[tone];
  const isDone = status === 'complété';
  const isNew = status === 'non commencé';

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
        {/* Radial top glow overlay */}
        <div
          className="parcours-card__glow"
          style={{ background: `radial-gradient(circle at 50% 0%, ${glow} 0%, transparent 70%)` }}
          aria-hidden="true"
        />

      {/* Card content */}
      <div className="parcours-card__inner">
        {/* Title */}
        <h3 className="parcours-card__title" style={{ color }}>
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

        {/* CTA button */}
        <button
          className="parcours-card__cta"
          style={{
            background: color,
            boxShadow: shadow,
            '--cta-shadow-hover': shadowHover,
          } as React.CSSProperties}
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
