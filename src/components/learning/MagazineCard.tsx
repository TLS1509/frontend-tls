import React from 'react';
import { Card } from '../core/Card';
import { Button } from '../core/Button';
import { MetaPill } from '../ui/MetaPill';
import { Bookmark, BookmarkCheck, ArrowRight, FileText } from 'lucide-react';

export type MagazineCardTone = 'primary' | 'warm' | 'sun' | 'brand';

export interface MagazineCardProps {
  title: string;
  description: string;
  issueNumber: number;
  articleCount: number;
  tone?: MagazineCardTone;
  isSaved?: boolean;
  onClick?: () => void;
  onSave?: () => void;
  className?: string;
}

const TONE_COVER: Record<MagazineCardTone, string> = {
  primary: 'bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700 text-white',
  warm:    'bg-gradient-to-br from-secondary-400 via-secondary-500 to-secondary-700 text-white',
  sun:     'bg-gradient-to-br from-accent-300 via-accent-400 to-accent-600 text-accent-900',
  brand:   'bg-gradient-to-br from-ink-700 to-ink-900 text-white',
};

export const MagazineCard: React.FC<MagazineCardProps> = ({
  title,
  description,
  issueNumber,
  articleCount,
  tone = 'primary',
  isSaved = false,
  onClick,
  onSave,
  className = '',
}) => {
  return (
    <Card
      className={[
        'group flex flex-col gap-4 transition-all hover:-translate-y-0.5 hover:shadow-md',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'relative h-[220px] rounded-2xl flex flex-col items-center justify-center overflow-hidden shadow-md',
          TONE_COVER[tone],
        ].join(' ')}
      >
        <div
          aria-hidden="true"
          className="absolute -top-1/4 -right-[20%] w-[80%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.25)_0%,transparent_60%)] pointer-events-none"
        />
        <span className="relative z-10 text-caption font-bold uppercase tracking-[0.15em] opacity-80">
          Édition
        </span>
        <span className="relative z-10 font-display text-[5rem] font-extrabold leading-none tracking-tighter">
          N°{issueNumber}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="m-0 text-h4 font-semibold text-ink-900 leading-snug line-clamp-2">{title}</h3>
        <p className="m-0 text-body-sm text-ink-500 leading-relaxed line-clamp-2">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <MetaPill icon={<FileText size={14} />} text={`${articleCount} articles`} size="sm" />
      </div>

      <div className="flex gap-2 pt-3 border-t border-ink-100">
        <Button onClick={onClick} className="flex-1 justify-center">
          Ouvrir
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Button>
        <Button
          variant="ghost"
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

export default MagazineCard;
