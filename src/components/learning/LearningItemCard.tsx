/**
 * LearningItemCard — Card for a single LearningSpace item.
 *
 * Pattern: ResourceCard-inspired tone-aware outline + icon.
 *
 * Layout (top → bottom):
 *   1. Icon bubble (top-right corner) with tone-aware gradient background
 *   2. Type badge + duration metadata
 *   3. Title (h4) + description (line-clamp-2)
 *   4. Footer: level pill + theme tag
 *   5. Lock row (if inaccessible)
 *   6. CTA button (full-width)
 *
 * All cards enforce consistent padding (p-4) → same visual size in grids.
 * Completion badge overlay (top-left).
 */

import React from 'react';
import {
  Flame, Star, FileText, Map, Video, Play, BookOpen, Users, Lock, Clock, Tag, CheckCircle2,
} from 'lucide-react';
import { Card } from '../core/Card';
import { Button } from '../core/Button';
import { Badge } from '../ui/Badge';
import type { ItemType, DreyfusLevel } from '../../types/learning';
import { ITEM_TYPE_LABELS } from '../../data/items';

/* ─── Type → tone + icon ──────────────────────────────────────────────────── */

const TONE: Record<ItemType, 'brand' | 'warm' | 'sun'> = {
  astuces:        'sun',
  flashcard:      'brand',
  ressource:      'brand',
  guide:          'brand',
  video_conc:     'brand',
  video_geste:    'warm',
  micro_learning: 'brand',
  mission:        'warm',
  masterclass:    'sun',
};

const ICON: Record<ItemType, React.ReactNode> = {
  astuces:        <Flame size={16} strokeWidth={1.75} />,
  flashcard:      <Star size={16} strokeWidth={1.75} />,
  ressource:      <FileText size={16} strokeWidth={1.75} />,
  guide:          <Map size={16} strokeWidth={1.75} />,
  video_conc:     <Video size={16} strokeWidth={1.75} />,
  video_geste:    <Play size={16} strokeWidth={1.75} />,
  micro_learning: <BookOpen size={16} strokeWidth={1.75} />,
  mission:        <Users size={16} strokeWidth={1.75} />,
  masterclass:    <Star size={16} strokeWidth={1.75} />,
};

/* ─── Gradient backgrounds & borders (tinted outline) ─────────────────────── */

const BG_GRADIENT: Record<'brand' | 'warm' | 'sun', string> = {
  brand: 'bg-gradient-to-br from-primary-50 to-white',
  warm:  'bg-gradient-to-br from-secondary-50 to-white',
  sun:   'bg-gradient-to-br from-accent-50 to-white',
};

const BORDER_TONE: Record<'brand' | 'warm' | 'sun', string> = {
  brand: '!border-primary-200',
  warm:  '!border-secondary-200',
  sun:   '!border-accent-200',
};

/* ─── Outline variant (minimal, light background) ──────────────────────────── */

const BG_OUTLINE: Record<'brand' | 'warm' | 'sun', string> = {
  brand: 'bg-white',
  warm:  'bg-white',
  sun:   'bg-white',
};

const BORDER_OUTLINE: Record<'brand' | 'warm' | 'sun', string> = {
  brand: '!border-primary-300 !border-2',
  warm:  '!border-secondary-300 !border-2',
  sun:   '!border-accent-300 !border-2',
};

const ICON_BUBBLE_OUTLINE: Record<'brand' | 'warm' | 'sun', string> = {
  brand: 'bg-primary-100 text-primary-600',
  warm:  'bg-secondary-100 text-secondary-600',
  sun:   'bg-accent-100 text-accent-600',
};

const LEVEL_PILL_OUTLINE: Record<'brand' | 'warm' | 'sun', string> = {
  brand: 'bg-primary-50 text-primary-700 border border-primary-200',
  warm:  'bg-secondary-50 text-secondary-700 border border-secondary-200',
  sun:   'bg-accent-50 text-accent-700 border border-accent-200',
};

const HOVER_BG_OUTLINE: Record<'brand' | 'warm' | 'sun', string> = {
  brand: 'hover:bg-primary-50',
  warm:  'hover:bg-secondary-50',
  sun:   'hover:bg-accent-50',
};

const ICON_BUBBLE: Record<'brand' | 'warm' | 'sun', string> = {
  brand: 'bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600',
  warm:  'bg-gradient-to-br from-secondary-100 to-secondary-50 text-secondary-600',
  sun:   'bg-gradient-to-br from-accent-100 to-accent-50 text-accent-600',
};

const LEVEL_PILL: Record<'brand' | 'warm' | 'sun', string> = {
  brand: 'bg-primary-50 text-primary-700 border-primary-200',
  warm:  'bg-secondary-50 text-secondary-700 border-secondary-200',
  sun:   'bg-accent-50 text-accent-700 border-accent-200',
};

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
  cardVariant?: 'tinted' | 'outline';
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
  cardVariant = 'tinted',
  onClick,
}) => {
  const tone = TONE[type];
  const icon = ICON[type];
  const isTinted = cardVariant === 'tinted';
  const bgClasses = isTinted ? BG_GRADIENT[tone] : BG_OUTLINE[tone];
  const borderClasses = isTinted ? BORDER_TONE[tone] : BORDER_OUTLINE[tone];
  const hoverClasses = !isTinted ? HOVER_BG_OUTLINE[tone] : '';
  const iconBubbleClasses = isTinted ? ICON_BUBBLE[tone] : ICON_BUBBLE_OUTLINE[tone];
  const levelPillClasses = isTinted ? LEVEL_PILL[tone] : LEVEL_PILL_OUTLINE[tone];
  const shadowClasses = isTinted && (tone === 'sun' ? 'shadow-sun-sm' : tone === 'warm' ? 'shadow-warm-sm' : 'shadow-brand-sm');

  return (
    <Card
      as="article"
      variant="interactive"
      size="md"
      className={[
        `relative border ${bgClasses} ${borderClasses} p-5 sm:p-6`,
        shadowClasses,
        hoverClasses,
        !isAccessible ? 'opacity-60 cursor-not-allowed' : '',
      ].filter(Boolean).join(' ')}
      onClick={onClick ? () => onClick(id) : undefined}
    >

      {/* ── Icon bubble (top-right corner) ── */}
      <div className="absolute top-3 right-3">
        <span
          className={[
            'w-8 h-8 shrink-0 flex items-center justify-center rounded-lg',
            isAccessible ? iconBubbleClasses : 'bg-ink-100 text-ink-400',
          ].join(' ')}
          aria-hidden
        >
          {icon}
        </span>
      </div>

      {/* ── Main content (flex column, better spacing) ── */}
      <div className="flex flex-col gap-2 pr-10">
        {/* 1. Type badge + duration ── */}
        <div className="flex items-center gap-1 flex-wrap text-micro">
          <Badge variant={tone} size="sm">{ITEM_TYPE_LABELS[type]}</Badge>
          <span className="text-ink-400">•</span>
          <span className="text-ink-500 font-medium text-micro">{duration}</span>
        </div>

        {/* 2. Title + description ── */}
        <div className="flex flex-col gap-1">
          <h3 className="m-0 font-display text-h5 font-semibold leading-tight text-ink-900 line-clamp-2">
            {title}
          </h3>
          <p className="m-0 text-caption text-ink-500 leading-snug line-clamp-2">
            {description}
          </p>
        </div>

        {/* 3. Footer: level + theme ── */}
        <div className="flex items-center gap-1 text-micro">
          <span className={`px-2 py-1 rounded text-micro font-medium border ${levelPillClasses}`}>
            D{dreyfusLevel}
          </span>
          <span className="text-ink-400 text-micro">•</span>
          <span className="text-ink-500 text-micro truncate">{theme}</span>
        </div>
      </div>

      {/* ── Lock row (if inaccessible) ── */}
      {!isAccessible && (
        <div className="mt-stack rounded-lg bg-ink-50 px-3 py-2 flex items-start gap-2">
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

      {/* ── Progress bar (if in-progress) ── */}
      {typeof progress === 'number' && progress > 0 && !isCompleted && (
        <div className="mt-stack h-1 rounded-full bg-ink-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-slow ${
              tone === 'brand' ? 'bg-primary-500' : tone === 'warm' ? 'bg-secondary-500' : 'bg-accent-500'
            }`}
            style={{ width: `${Math.min(100, progress)}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${progress}% complété`}
          />
        </div>
      )}

      {/* ── CTA button (full-width, tone-aware) ── */}
      <Button
        variant={isAccessible ? tone === 'brand' ? 'primary' : tone === 'warm' ? 'secondary' : 'accent' : 'secondary'}
        size="sm"
        fullWidth
        disabled={!isAccessible}
        title={!isAccessible ? denialMessage : undefined}
        aria-label={isAccessible ? `Accéder à ${title}` : `${title} — verrouillé`}
        onClick={onClick ? (e) => { e.stopPropagation(); onClick(id); } : undefined}
        className="mt-stack"
      >
        {isCompleted ? 'Revoir' : isAccessible ? 'Accéder' : 'Verrouillé'}
      </Button>
    </Card>
  );
};

export default LearningItemCard;
