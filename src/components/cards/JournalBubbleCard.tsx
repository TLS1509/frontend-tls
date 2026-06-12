/**
 * JournalBubbleCard — Figma DS Journal component.
 *
 * Apple Messages-style chat bubble for displaying journal entries in the
 * journal list. Tone-aware surface per entry type, speech-bubble tail at
 * bottom-right, glass-light action buttons.
 *
 * Distinct from JournalEntryCard (traditional card layout) — this component
 * uses the chat-bubble shell with tinted surfaces.
 *
 * Usage:
 *   <JournalBubbleCard
 *     type="learning"
 *     title="Ma session coaching"
 *     excerpt="Aujourd'hui j'ai compris que…"
 *     date="12 mai 2026"
 *     readingTime="2 min"
 *     onRead={() => navigate(`/journal/detail/${id}`)}
 *     onContinue={() => navigate(`/journal/detail/${id}`)}
 *   />
 */

import React from 'react';
import {
  BookOpen,
  ArrowRight,
  GraduationCap,
  PenSquare,
  Zap,
  Lightbulb,
  ClipboardList,
  FileText,
} from 'lucide-react';
import { Button } from '../core/Button';

export type JournalBubbleType =
  | 'guided'
  | 'free'
  | 'learning'
  | 'coaching'
  | 'insight'
  | 'questionnaire'
  | 'compte-rendu';

interface TypeMeta {
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  badge: string;
  surface: string;
  tail: string;
}

const TYPE_META: Record<JournalBubbleType, TypeMeta> = {
  guided: {
    label: 'Guidé',
    Icon: GraduationCap,
    badge: 'bg-primary-100 text-primary-700 border border-primary-200',
    surface: 'bg-primary-50/70 border-primary-100 hover:border-primary-200 hover:bg-primary-50',
    tail: 'bg-primary-50/70 border-primary-100',
  },
  free: {
    label: 'Libre',
    Icon: PenSquare,
    badge: 'bg-ink-100 text-ink-700 border border-ink-200',
    surface: 'bg-white border-ink-200 hover:border-ink-300',
    tail: 'bg-white border-ink-200',
  },
  learning: {
    label: 'Apprentissage',
    Icon: BookOpen,
    badge: 'bg-secondary-100 text-secondary-700 border border-secondary-200',
    surface: 'bg-secondary-50/70 border-secondary-100 hover:border-secondary-200 hover:bg-secondary-50',
    tail: 'bg-secondary-50/70 border-secondary-100',
  },
  coaching: {
    label: 'Coaching',
    Icon: Zap,
    badge: 'bg-secondary-100 text-secondary-700 border border-secondary-200',
    surface: 'bg-secondary-50/70 border-secondary-100 hover:border-secondary-200 hover:bg-secondary-50',
    tail: 'bg-secondary-50/70 border-secondary-100',
  },
  insight: {
    label: 'Insight',
    Icon: Lightbulb,
    badge: 'bg-accent-100 text-accent-700 border border-accent-200',
    surface: 'bg-accent-50/70 border-accent-100 hover:border-accent-200 hover:bg-accent-50',
    tail: 'bg-accent-50/70 border-accent-100',
  },
  questionnaire: {
    label: 'Questionnaire',
    Icon: ClipboardList,
    badge: 'bg-primary-100 text-primary-700 border border-primary-200',
    surface: 'bg-primary-50/70 border-primary-100 hover:border-primary-200 hover:bg-primary-50',
    tail: 'bg-primary-50/70 border-primary-100',
  },
  'compte-rendu': {
    label: 'Compte rendu',
    Icon: FileText,
    badge: 'bg-success-bg text-success-fg border border-success-base/30',
    surface: 'bg-primary-50/70 border-primary-100 hover:border-primary-200 hover:bg-primary-50',
    tail: 'bg-primary-50/70 border-primary-100',
  },
};

export interface JournalBubbleCardProps {
  type: JournalBubbleType;
  title: string;
  excerpt: string;
  date: string;
  readingTime?: string;
  onRead?: () => void;
  onContinue?: () => void;
  /** Quick action label for coaching/compte-rendu entries. */
  onCoachingAction?: () => void;
  className?: string;
}

export const JournalBubbleCard: React.FC<JournalBubbleCardProps> = ({
  type,
  title,
  excerpt,
  date,
  readingTime,
  onRead,
  onContinue,
  onCoachingAction,
  className = '',
}) => {
  const meta = TYPE_META[type];
  const TypeIcon = meta.Icon;

  return (
    <div
      className={[
        // Chat-bubble shell: very rounded + overflow visible for the tail
        'relative !overflow-visible rounded-3xl border p-5 flex flex-col gap-stack',
        'transition-all duration-base hover:-translate-y-1 hover:shadow-md',
        meta.surface,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Speech bubble tail — bottom-right, color matches surface for seamless blend */}
      <span
        aria-hidden="true"
        className={[
          'absolute -bottom-2 right-8 w-5 h-5 rotate-45 rounded-br-[6px]',
          'border-r border-b transition-colors duration-200',
          meta.tail,
        ].join(' ')}
      />

      {/* Header — title + date/readingTime + type badge */}
      <div className="flex items-start justify-between gap-stack-xs">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-h4 font-bold text-ink-900 m-0 leading-snug">
            {title}
          </h3>
          <span className="font-body text-caption text-ink-500 leading-tight">
            {date}
            {readingTime ? ` · ${readingTime}` : ''}
          </span>
        </div>
        <span
          className={[
            'inline-flex items-center gap-tight.5 px-2.5 py-1 rounded-pill',
            'font-body text-caption font-semibold shrink-0 whitespace-nowrap',
            meta.badge,
          ].join(' ')}
        >
          <TypeIcon size={12} />
          {meta.label}
        </span>
      </div>

      {/* Excerpt */}
      <p className="font-body text-body text-ink-700 leading-relaxed m-0">{excerpt}</p>

      {/* Coaching quick action (questionnaire / compte-rendu only) */}
      {(type === 'questionnaire' || type === 'compte-rendu') && onCoachingAction && (
        <Button
          variant="ghost"
          size="sm"
          trailingIcon={<ArrowRight size={13} />}
          onClick={onCoachingAction}
        >
          {type === 'questionnaire' ? 'Voir les réponses' : 'Voir le rapport complet'}
        </Button>
      )}

      {/* Primary actions */}
      {(onRead || onContinue) && (
        <div className="flex gap-stack-xs pt-stack-xs border-t border-white/60">
          {onRead && (
            <Button
              variant="glass-light"
              size="md"
              leadingIcon={<BookOpen size={16} />}
              onClick={onRead}
            >
              Lire
            </Button>
          )}
          {onContinue && (
            <Button
              variant="glass-light-ghost"
              size="md"
              trailingIcon={<ArrowRight size={16} />}
              onClick={onContinue}
            >
              Continuer
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default JournalBubbleCard;
