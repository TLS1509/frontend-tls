import React from 'react';
import { Card } from '../core/Card';
import { Button } from '../core/Button';
import { MetaPill } from '../ui/MetaPill';
import { Play, Bookmark, BookmarkCheck, Clock } from 'lucide-react';

export type VideoCardTone = 'primary' | 'warm' | 'sun' | 'brand';

export interface VideoCardProps {
  title: string;
  category: string;
  duration: string;
  author?: string;
  tone?: VideoCardTone;
  isSaved?: boolean;
  onClick?: () => void;
  onSave?: () => void;
  className?: string;
}

// Sprint 3 hover-glow — brand maps to primary (same teal family)
const TONE_HOVER_GLOW: Record<VideoCardTone, string> = {
  primary: 'hover-glow-primary',
  warm:    'hover-glow-warm',
  sun:     'hover-glow-sun',
  brand:   'hover-glow-primary',
};

const TONE_THUMB: Record<VideoCardTone, string> = {
  primary: 'bg-gradient-to-br from-primary-400 via-primary-600 to-primary-800',
  warm:    'bg-gradient-to-br from-secondary-400 via-secondary-600 to-secondary-800',
  sun:     'bg-gradient-to-br from-accent-300 via-accent-500 to-secondary-600',
  brand:   'bg-gradient-to-br from-primary-700 via-primary-900 to-ink-900',
};

export const VideoCard: React.FC<VideoCardProps> = ({
  title,
  category,
  duration,
  author,
  tone = 'primary',
  isSaved = false,
  onClick,
  onSave,
  className = '',
}) => {
  return (
    <Card
      className={[
        'group flex flex-col gap-stack-sm transition-all duration-slow ease-emphasis overflow-hidden',
        TONE_HOVER_GLOW[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        onClick={onClick}
        className={[
          'relative aspect-video rounded-xl overflow-hidden cursor-pointer flex items-center justify-center',
          TONE_THUMB[tone],
        ].join(' ')}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="relative w-16 h-16 rounded-pill bg-white/20 backdrop-blur-glass-light text-white flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:bg-white/30 ring-2 ring-white/30 shadow-xl"
        >
          <Play size={28} fill="currentColor" className="ml-1" />
        </div>
        {/* La durée est une donnée : le registre de MetaPill (11/500), sur le
            voile sombre qui la garde lisible quel que soit le dégradé. */}
        <div className="absolute bottom-3 right-3 inline-flex items-center gap-tight px-2 py-1 rounded-pill bg-black/60 backdrop-blur-sm text-white text-micro font-medium tabular-nums">
          <Clock size={14} />
          {duration}
        </div>
      </div>

      {/* Catégorie → titre 4 · titre → auteur 4 (passe typographique du
          2026-09-24). La catégorie est une DONNÉE : MetaPill, jamais Badge
          (arbitrage n°14). Les `mt-stack-3xs` remplacent la marge de base des
          titres (0,75em), faite pour séparer des sections. */}
      <div className="flex flex-col">
        <MetaPill text={category} tone="neutral" className="w-fit" />
        <h3 className="mt-stack-3xs text-h3 text-ink-900 line-clamp-2">{title}</h3>
        {author && <p className="m-0 mt-stack-3xs text-caption text-ink-600">Par {author}</p>}
      </div>

      <div className="flex gap-stack-xs mt-stack-xs pt-stack-sm border-t border-ink-100">
        <Button onClick={onClick} className="flex-1 justify-center">
          <Play size={14} fill="currentColor" />
          Regarder
        </Button>
        <Button
          emphasis="outline"
          onClick={(e) => {
            e.stopPropagation();
            onSave?.();
          }}
          className={[
            'p-2 min-w-[44px] justify-center',
            isSaved ? 'text-primary-500 bg-primary-50' : '',
          ].join(' ')}
        >
          {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </Button>
      </div>
    </Card>
  );
};

export default VideoCard;
