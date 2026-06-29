/**
 * JournalEntryCard — Tailwind refactor (Phase 10 cleanup).
 *
 * Card pour afficher une entrée de journal avec type, title, excerpt, tags, metadata.
 * 100% Tailwind + DS tokens (plus de `var(--tls-*)`, plus de CSS file BEM).
 *
 * Usage :
 *   <JournalEntryCard
 *     type="guided"
 *     title="Ma première réflexion"
 *     excerpt="Aujourd'hui j'ai appris…"
 *     date="2026-04-30"
 *     time="14:30"
 *     tags={['réflexion', 'apprentissage']}
 *     onClick={() => navigate('/journal/123')}
 *   />
 */

import React from 'react';
import {
  BookOpen,
  Sparkles,
  BookMarked,
  Target,
  Lightbulb,
  Calendar,
  Clock,
} from 'lucide-react';
import { TONE_BORDER } from '../../lib/tone-classes';
import type { PageTone } from '../../lib/tone-classes';

export type JournalEntryType = 'guided' | 'free' | 'learning' | 'coaching' | 'insight';

export interface JournalEntryCardProps {
  type: JournalEntryType;
  title: string;
  excerpt: string;
  date: string;
  time?: string;
  tags?: string[];
  tone?: PageTone;
  onClick?: () => void;
  className?: string;
}

interface TypeConfig {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  badge: string;
  border: string;
  hoverShadow: string;
}

const TYPE_CONFIG: Record<JournalEntryType, TypeConfig> = {
  guided: {
    icon: BookOpen,
    label: 'Guidée',
    badge: 'bg-primary-50 text-primary-700 border-primary-200',
    border: 'hover:border-primary-300',
    hoverShadow: 'hover:shadow-brand-sm',
  },
  free: {
    icon: Sparkles,
    label: 'Libre',
    badge: 'bg-accent-50 text-accent-700 border-accent-200',
    border: 'hover:border-accent-300',
    hoverShadow: 'hover:shadow-sun-sm',
  },
  learning: {
    icon: BookMarked,
    label: 'Apprentissage',
    badge: 'bg-secondary-50 text-secondary-700 border-secondary-200',
    border: 'hover:border-secondary-300',
    hoverShadow: 'hover:shadow-warm-sm',
  },
  coaching: {
    icon: Target,
    label: 'Coaching',
    badge: 'bg-secondary-50 text-secondary-700 border-secondary-200',
    border: 'hover:border-secondary-300',
    hoverShadow: 'hover:shadow-warm-sm',
  },
  insight: {
    icon: Lightbulb,
    label: 'Insight',
    badge: 'bg-primary-50 text-primary-700 border-primary-200',
    border: 'hover:border-primary-300',
    hoverShadow: 'hover:shadow-brand-sm',
  },
};

export const JournalEntryCard: React.FC<JournalEntryCardProps> = ({
  type,
  title,
  excerpt,
  date,
  time,
  tags = [],
  tone = 'primary',
  onClick,
  className = '',
}) => {
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;
  const clickable = Boolean(onClick);

  return (
    <article
      onClick={onClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      className={[
        'group flex flex-col gap-stack-xs p-5 sm:p-6 rounded-2xl',
        'bg-white border border-ink-100',
        clickable
          ? `cursor-pointer transition-all duration-base ${config.border} ${config.hoverShadow} hover:-translate-y-1`
          : '',
        '!h-auto !overflow-visible !items-stretch !font-normal',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Type badge */}
      <span
        className={[
          'inline-flex items-center gap-1 self-start px-2.5 py-1 rounded-pill border',
          'font-body text-micro font-bold uppercase tracking-wider',
          config.badge,
        ].join(' ')}
      >
        <Icon size={12} />
        {config.label}
      </span>

      {/* Title */}
      <h3 className="m-0 font-display text-h4 font-semibold text-ink-900 leading-tight tracking-headline">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="m-0 font-body text-body-sm text-ink-600 leading-relaxed line-clamp-3">
        {excerpt}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={['inline-flex items-center px-2 py-0.5 rounded-pill bg-ink-50 border font-body text-micro font-semibold text-ink-700', TONE_BORDER[tone]].join(' ')}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Metadata */}
      <div className="flex items-center gap-x-3 gap-y-1 flex-wrap pt-stack-xs mt-auto font-body text-micro text-ink-500">
        <span className="inline-flex items-center gap-tight">
          <Calendar size={12} />
          {date}
        </span>
        {time && (
          <>
            <span aria-hidden className="text-ink-300">·</span>
            <span className="inline-flex items-center gap-tight">
              <Clock size={12} />
              {time}
            </span>
          </>
        )}
      </div>
    </article>
  );
};

export default JournalEntryCard;
