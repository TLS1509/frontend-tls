/**
 * LearningItemCard — Card for a single LearningSpace item.
 *
 * Layout (top → bottom):
 *   1. Header row: type badge + meta pills (duration, level) + icon bubble
 *   2. Title (h3) + description
 *   3. Theme tag
 *   4. Lock row (if inaccessible)
 *   5. CTA button
 */

import React from 'react';
import {
  Flame, Star, FileText, Map, Video, Play, BookOpen, Users, Lock, Clock, Layers, Tag, CheckCircle2,
} from 'lucide-react';
import { Card } from '../core/Card';
import { Button } from '../core/Button';
import { Badge } from '../ui/Badge';
import type { ItemType, DreyfusLevel } from '../../types/learning';
import { ITEM_TYPE_LABELS, MODE_LABELS } from '../../data/items';

/* ─── Type → tone + icon ──────────────────────────────────────────────────── */

const TONE: Record<ItemType, 'brand' | 'warm' | 'sun' | 'success' | 'danger'> = {
  astuces:        'sun',
  flashcard:      'brand',
  ressource:      'brand',
  guide:          'success',
  video_conc:     'brand',
  video_geste:    'warm',
  micro_learning: 'brand',
  mission:        'warm',
  masterclass:    'sun',
};

const ICON: Record<ItemType, React.ReactNode> = {
  astuces:        <Flame size={16} />,
  flashcard:      <Star size={16} />,
  ressource:      <FileText size={16} />,
  guide:          <Map size={16} />,
  video_conc:     <Video size={16} />,
  video_geste:    <Play size={16} />,
  micro_learning: <BookOpen size={16} />,
  mission:        <Users size={16} />,
  masterclass:    <Star size={16} />,
};

/* ─── Bubble color per tone ───────────────────────────────────────────────── */

const BUBBLE: Record<'brand' | 'warm' | 'sun' | 'success' | 'danger', string> = {
  brand:   'bg-primary-50 text-primary-600',
  warm:    'bg-secondary-50 text-secondary-600',
  sun:     'bg-accent-50 text-accent-600',
  success: 'bg-success-bg text-success-fg',
  danger:  'bg-danger-bg text-danger-fg',
};

/* ─── Meta pill base ─────────────────────────────────────────────────────── */

const META_PILL = 'inline-flex items-center gap-tight px-2 py-0.5 bg-ink-50 border border-ink-100 rounded-pill text-micro text-ink-500 font-medium leading-none';
const DURATION_PILL = 'inline-flex items-center gap-tight px-2 py-0.5 bg-ink-100 border border-ink-200 rounded-pill text-micro text-ink-700 font-semibold leading-none';

/* ─── Props ──────────────────────────────────────────────────────────────── */

export interface LearningItemCardProps {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  duration: string;
  dreyfusLevel: DreyfusLevel;
  theme: string;
  isAccessible: boolean;
  isCompleted?: boolean;
  progress?: number;
  denialReason?: 'tier' | 'prerequisite';
  denialMessage?: string;
  onClick?: (id: string) => void;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export const LearningItemCard: React.FC<LearningItemCardProps> = ({
  id,
  type,
  title,
  description,
  duration,
  dreyfusLevel,
  theme,
  isAccessible,
  isCompleted = false,
  progress,
  denialReason,
  denialMessage,
  onClick,
}) => {
  const tone = TONE[type];
  const icon = ICON[type];

  return (
    <Card
      as="article"
      variant="interactive"
      size="md"
      className={[
        'relative',
        !isAccessible ? 'opacity-60 cursor-not-allowed' : '',
      ].filter(Boolean).join(' ')}
      onClick={onClick ? () => onClick(id) : undefined}
    >
      {/* ── Completion badge overlay ── */}
      {isCompleted && (
        <span
          aria-label="Complété"
          className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-success-base text-white flex items-center justify-center shadow-xs z-base"
        >
          <CheckCircle2 size={12} strokeWidth={2.5} />
        </span>
      )}

      {/* ── 1. Header: badge + meta pills + icon bubble ── */}
      <div className="flex items-start justify-between gap-2">
        {/* Left cluster: mode badge + type badge + duration (prominent) + level */}
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          <span className={META_PILL}>{MODE_LABELS[type]}</span>
          <Badge variant={tone} size="sm">{ITEM_TYPE_LABELS[type]}</Badge>
          <span className={DURATION_PILL}>
            <Clock size={10} aria-hidden />
            {duration}
          </span>
          <span className={META_PILL}>
            D{dreyfusLevel}
          </span>
        </div>

        {/* Right: icon bubble */}
        <span
          className={[
            'w-8 h-8 shrink-0 flex items-center justify-center rounded-lg',
            isAccessible ? BUBBLE[tone] : 'bg-ink-100 text-ink-400',
          ].join(' ')}
          aria-hidden
        >
          {icon}
        </span>
      </div>

      {/* ── 2. Content: title + description ── */}
      <div className="flex flex-col gap-tight flex-1">
        <h3 className="m-0 font-display text-h5 font-semibold leading-tight tracking-tight text-ink-900 line-clamp-2">
          {title}
        </h3>
        <p className="m-0 text-body-sm text-ink-500 leading-snug line-clamp-2">
          {description}
        </p>
      </div>

      {/* ── 3. Theme tag ── */}
      <span className={`${META_PILL} w-fit`}>
        <Tag size={10} aria-hidden />
        {theme}
      </span>

      {/* ── 4. Lock row ── */}
      {!isAccessible && (
        <div className="rounded-lg bg-ink-50 px-3 py-2 flex items-start gap-2">
          <Lock size={12} className="text-ink-400 shrink-0 mt-px" aria-hidden />
          <div className="flex flex-col gap-tight">
            <span className="text-caption text-ink-600 font-medium">
              {denialReason === 'tier' ? 'Upgrade requis' : 'Pré-requis manquant'}
            </span>
            {denialMessage && (
              <span className="text-micro text-ink-400 leading-tight">{denialMessage}</span>
            )}
          </div>
        </div>
      )}

      {/* ── 5. Progress bar (if in-progress) ── */}
      {typeof progress === 'number' && progress > 0 && !isCompleted && (
        <div className="h-[3px] rounded-full bg-ink-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-slow"
            style={{ width: `${Math.min(100, progress)}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${progress}% complété`}
          />
        </div>
      )}

      {/* ── 6. CTA ── */}
      <Button
        variant={isAccessible ? 'primary' : 'secondary'}
        size="sm"
        fullWidth
        disabled={!isAccessible}
        title={!isAccessible ? denialMessage : undefined}
        aria-label={isAccessible ? `Accéder à ${title}` : `${title} — verrouillé`}
        onClick={onClick ? (e) => { e.stopPropagation(); onClick(id); } : undefined}
      >
        {isCompleted ? 'Revoir' : isAccessible ? 'Accéder' : 'Verrouillé'}
      </Button>
    </Card>
  );
};

export default LearningItemCard;
