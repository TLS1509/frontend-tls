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
  primary: 'bg-primary-50 text-primary-600',
  warm:    'bg-secondary-100 text-secondary-600',
  sun:     'bg-accent-100 text-accent-700',
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
      className={['flex flex-col gap-3', className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div
              className={[
                'inline-flex items-center justify-center w-10 h-10 rounded-lg shrink-0',
                TONE_ICON[tone],
              ].join(' ')}
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <CardEyebrow>{typeLabel}</CardEyebrow>
            <span className="inline-flex items-center gap-1 text-micro text-ink-500">
              <Calendar size={11} />
              {publishedAt}
            </span>
          </div>
        </div>
        {onSave && (
          <button
            type="button"
            className={[
              'inline-flex items-center justify-center w-9 h-9 rounded-md border border-ink-200 bg-white cursor-pointer transition-colors shrink-0',
              isSaved
                ? 'text-primary-600 border-primary-200 bg-primary-50'
                : 'text-ink-500 hover:bg-ink-50 hover:text-ink-900',
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

      <span className="inline-block text-caption font-semibold uppercase tracking-wider text-ink-500">
        {category}
      </span>

      <CardTitle>{title}</CardTitle>

      <CardDesc>{summary}</CardDesc>

      <CardFooter className="flex items-center justify-between flex-wrap gap-3">
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
            Lire <ArrowRight size={14} />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
