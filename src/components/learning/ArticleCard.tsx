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

const TONE_ICON: Record<ArticleTone, string> = {
  primary: 'bg-gradient-to-br from-primary-50 to-primary-100 text-primary-700 ring-1 ring-primary-200/50',
  warm:    'bg-gradient-to-br from-secondary-50 to-secondary-100 text-secondary-700 ring-1 ring-secondary-200/50',
  sun:     'bg-gradient-to-br from-accent-50 to-accent-100 text-accent-700 ring-1 ring-accent-200/50',
};

const TONE_CATEGORY: Record<ArticleTone, string> = {
  primary: 'text-primary-600',
  warm:    'text-secondary-600',
  sun:     'text-accent-700',
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
      className={['group flex flex-col gap-3 transition-all hover:-translate-y-1 hover:shadow-md', className]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div
              className={[
                'inline-flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 shadow-sm',
                TONE_ICON[tone],
              ].join(' ')}
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <CardEyebrow>{typeLabel}</CardEyebrow>
            <span className="inline-flex items-center gap-1 text-micro text-ink-400 font-medium">
              <Calendar size={11} />
              {publishedAt}
            </span>
          </div>
        </div>
        {onSave && (
          <button
            type="button"
            className={[
              'inline-flex items-center justify-center w-10 h-10 rounded-xl border cursor-pointer transition-all shrink-0',
              isSaved
                ? 'text-primary-600 border-primary-200 bg-primary-50 shadow-brand-xs'
                : 'text-ink-400 border-ink-200 bg-white hover:bg-ink-50 hover:text-primary-600 hover:border-primary-200',
            ].join(' ')}
            onClick={(e) => {
              e.stopPropagation();
              onSave(itemId);
            }}
            aria-label={isSaved ? 'Retirer des favoris' : 'Enregistrer'}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        )}
      </div>

      <span className={['inline-block text-caption font-bold uppercase tracking-wider', TONE_CATEGORY[tone]].join(' ')}>
        {category}
      </span>

      <CardTitle>{title}</CardTitle>

      <CardDesc>{summary}</CardDesc>

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
            onClick={(e) => {
              e.stopPropagation();
              onRead();
            }}
          >
            Lire <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
