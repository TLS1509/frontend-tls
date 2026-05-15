import React from 'react';
import { Button } from '../core/Button';
import { MetaPill } from '../ui/MetaPill';
import { Bookmark, BookmarkCheck, ArrowRight, FileText } from 'lucide-react';

export type MagazineCardTone = 'primary' | 'warm' | 'sun' | 'brand';

export interface MagazineCardProps {
  title: string;
  description?: string;
  issueNumber: number;
  articleCount: number;
  publishedAt?: string;
  tone?: MagazineCardTone;
  isSaved?: boolean;
  onClick?: () => void;
  onSave?: () => void;
  className?: string;
}

const TONE_GRADIENT: Record<MagazineCardTone, string> = {
  primary: 'from-primary-700 via-primary-800 to-primary-900',
  warm:    'from-secondary-500 via-secondary-700 to-secondary-800',
  sun:     'from-accent-300 via-accent-400 to-accent-600',
  brand:   'from-ink-600 via-ink-700 to-ink-900',
};

const TONE_TEXT: Record<MagazineCardTone, string> = {
  primary: 'text-white',
  warm:    'text-white',
  sun:     'text-ink-900',
  brand:   'text-white',
};

const TONE_MUTED: Record<MagazineCardTone, string> = {
  primary: 'text-white/60',
  warm:    'text-white/60',
  sun:     'text-ink-700/70',
  brand:   'text-white/55',
};

const TONE_RULE: Record<MagazineCardTone, string> = {
  primary: 'bg-white/20',
  warm:    'bg-white/20',
  sun:     'bg-ink-900/15',
  brand:   'bg-white/15',
};

export const MagazineCard: React.FC<MagazineCardProps> = ({
  title,
  description,
  issueNumber,
  articleCount,
  publishedAt,
  tone = 'primary',
  isSaved = false,
  onClick,
  onSave,
  className = '',
}) => {
  return (
    <article
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className={[
        'group relative flex flex-col overflow-hidden rounded-2xl shadow-sm cursor-pointer',
        'transition-all duration-base hover:-translate-y-0.5 hover:shadow-md',
        'focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* ── Cover body ── */}
      <div className={[
        'relative flex flex-col gap-stack p-6 overflow-hidden bg-gradient-to-br min-h-[200px]',
        TONE_GRADIENT[tone],
      ].join(' ')}>

        {/* Ambient glow top-right */}
        <div aria-hidden className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-[50px] pointer-events-none" />

        {/* Decorative large issue number — watermark */}
        <span
          aria-hidden
          className={[
            'absolute -bottom-3 -right-1 font-display font-extrabold leading-none select-none pointer-events-none',
            'text-[7rem] opacity-faint',
            TONE_TEXT[tone],
          ].join(' ')}
        >
          {issueNumber}
        </span>

        {/* Header row: label + issue number */}
        <div className="relative z-10 flex items-center justify-between">
          <span className={['font-body text-micro font-bold uppercase tracking-[0.2em]', TONE_MUTED[tone]].join(' ')}>
            Magazine TLS
          </span>
          <span className={['font-body text-micro font-bold uppercase tracking-[0.2em]', TONE_MUTED[tone]].join(' ')}>
            N°{issueNumber}
          </span>
        </div>

        {/* Rule */}
        <div className={['relative z-10 w-full h-px', TONE_RULE[tone]].join(' ')} />

        {/* Title */}
        <h3 className={[
          'relative z-10 m-0 font-display text-h3 font-bold leading-tight',
          TONE_TEXT[tone],
        ].join(' ')}>
          {title}
        </h3>

        {/* Description — optional */}
        {description && (
          <p className={[
            'relative z-10 m-0 font-body text-body-sm leading-relaxed line-clamp-2',
            TONE_MUTED[tone],
          ].join(' ')}>
            {description}
          </p>
        )}

        {/* Date — pinned to bottom of cover */}
        {publishedAt && (
          <div className="relative z-10 mt-auto flex flex-col gap-tight pt-stack-xs">
            <div className={['w-6 h-0.5 rounded-full', TONE_RULE[tone]].join(' ')} />
            <span className={['font-body text-caption font-semibold', TONE_MUTED[tone]].join(' ')}>
              {publishedAt}
            </span>
          </div>
        )}
      </div>

      {/* ── Footer strip ── */}
      <div className="relative flex items-center gap-3 px-5 py-3 bg-white border-t border-ink-100">
        <MetaPill
          icon={<FileText size={13} />}
          text={`${articleCount} article${articleCount > 1 ? 's' : ''}`}
          size="sm"
          tone="brand"
        />
        <Button
          variant="primary"
          size="sm"
          trailingIcon={<ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />}
          className="ml-auto"
          onClick={(e) => { e.stopPropagation(); onClick?.(); }}
        >
          Ouvrir
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          leadingIcon={isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          onClick={(e) => { e.stopPropagation(); onSave?.(); }}
          aria-label={isSaved ? 'Retirer des favoris' : 'Sauvegarder'}
          className={isSaved ? 'text-primary-600' : ''}
        />
      </div>
    </article>
  );
};

export default MagazineCard;
