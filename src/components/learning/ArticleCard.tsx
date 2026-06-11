import React from 'react';
import { Card, CardEyebrow, CardTitle, CardDesc, CardFooter } from '../core/Card';
import { Button } from '../core/Button';
import { MetaPillGroup } from '../ui/MetaPillGroup';
import { Calendar, User, Clock, Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';

export type ArticleTone = 'primary' | 'warm' | 'sun';

export interface ArticleCardProps {
  type: 'actu' | 'tutoriel' | 'dossier' | 'magazine';
  typeLabel: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tone?: ArticleTone;
  isSaved?: boolean;
  icon?: React.ReactNode;
  onSave?: (id: string) => void;
  onClick?: () => void;
  onRead?: () => void;
  itemId?: string;
  className?: string;
}

// Outer shell (double-bezel pattern)
const TONE_ICON_SHELL: Record<ArticleTone, string> = {
  primary: 'bg-primary-100/40 ring-1 ring-primary-200/50 p-1.5 rounded-2xl',
  warm:    'bg-secondary-100/40 ring-1 ring-secondary-200/50 p-1.5 rounded-2xl',
  sun:     'bg-accent-100/40 ring-1 ring-accent-200/50 p-1.5 rounded-2xl',
};

// Inner core
const TONE_ICON_CORE: Record<ArticleTone, string> = {
  primary: 'bg-gradient-to-br from-primary-50 to-primary-100 text-primary-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]',
  warm:    'bg-gradient-to-br from-secondary-50 to-secondary-100 text-secondary-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]',
  sun:     'bg-gradient-to-br from-accent-50 to-accent-100 text-accent-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]',
};

const TONE_CATEGORY: Record<ArticleTone, string> = {
  primary: 'text-primary-600',
  warm:    'text-secondary-600',
  sun:     'text-accent-700',
};

// Sprint 3 hover glow
const TONE_HOVER_GLOW: Record<ArticleTone, string> = {
  primary: 'hover-glow-primary',
  warm:    'hover-glow-warm',
  sun:     'hover-glow-sun',
};

const TONE_SAVE_ACTIVE: Record<ArticleTone, string> = {
  primary: 'text-primary-600 border-primary-200 bg-primary-50',
  warm:    'text-secondary-600 border-secondary-200 bg-secondary-50',
  sun:     'text-accent-700 border-accent-200 bg-accent-50',
};

const TONE_SAVE_HOVER: Record<ArticleTone, string> = {
  primary: 'hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50',
  warm:    'hover:text-secondary-600 hover:border-secondary-200 hover:bg-secondary-50',
  sun:     'hover:text-accent-700 hover:border-accent-200 hover:bg-accent-50',
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  typeLabel,
  title,
  summary,
  category,
  author,
  publishedAt,
  readTime,
  tone = 'primary',
  isSaved = false,
  icon,
  onSave,
  onClick,
  onRead,
  itemId = '',
  className = '',
}) => {
  return (
    <Card
      variant="feature"
      className={[
        'group flex flex-col gap-3',
        'transition-all duration-slow ease-emphasis',
        'hover:-translate-y-1 hover:shadow-md',
        TONE_HOVER_GLOW[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      {/* Header: icon + meta + save */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            // Double-bezel icon container
            <div className={TONE_ICON_SHELL[tone]} aria-hidden="true">
              <div
                className={[
                  'inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0',
                  TONE_ICON_CORE[tone],
                ].join(' ')}
              >
                {icon}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <CardEyebrow>{typeLabel}</CardEyebrow>
            <span className="inline-flex items-center gap-1 text-micro text-ink-400 font-medium">
              <Calendar size={11} aria-hidden="true" />
              {publishedAt}
            </span>
          </div>
        </div>

        {onSave && (
          <button
            type="button"
            className={[
              'inline-flex items-center justify-center w-9 h-9 rounded-xl border cursor-pointer',
              'transition-all duration-base ease-standard shrink-0',
              'active:scale-95',
              isSaved
                ? TONE_SAVE_ACTIVE[tone]
                : `text-ink-400 border-ink-200 bg-white ${TONE_SAVE_HOVER[tone]}`,
            ].join(' ')}
            onClick={(e) => {
              e.stopPropagation();
              onSave(itemId);
            }}
            aria-label={isSaved ? 'Retirer des favoris' : 'Enregistrer'}
          >
            {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        )}
      </div>

      {/* Category label */}
      <span className={['inline-block text-caption font-medium', TONE_CATEGORY[tone]].join(' ')}>
        {category}
      </span>

      <CardTitle>{title}</CardTitle>

      <CardDesc>{summary}</CardDesc>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-ink-100">
        <MetaPillGroup
          items={[
            { icon: <User size={12} />, text: author },
            { icon: <Clock size={12} />, text: readTime },
          ]}
          size="sm"
        />
        {onRead && (
          <Button
            size="sm"
            variant="ghost"
            trailingIcon={
              <ArrowRight
                size={14}
                className="transition-transform duration-fast group-hover:translate-x-0.5"
              />
            }
            onClick={(e) => {
              e.stopPropagation();
              onRead();
            }}
          >
            Lire
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
