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
  primary: 'bg-primary-50 border-primary-200 text-primary-700',
  warm:    'bg-secondary-50 border-secondary-200 text-secondary-700',
  sun:     'bg-accent-50 border-accent-200 text-accent-700',
  brand:   'bg-ink-50 border-ink-200 text-ink-900',
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
    <Card className={className}>
      <div className="flex flex-col gap-3">
        <div
          className={[
            'h-[200px] rounded-lg border flex items-center justify-center text-h3 font-semibold',
            TONE_COVER[tone],
          ].join(' ')}
        >
          {`N°${issueNumber}`}
        </div>

        <div>
          <h3 className="m-0 mb-2 text-body font-semibold text-ink-900">{title}</h3>
          <p className="m-0 mb-3 text-body-sm text-ink-500 leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <MetaPill icon={<FileText size={14} />} text={`${articleCount} articles`} size="sm" />
        </div>

        <div className="flex gap-2 pt-3 border-t border-ink-200">
          <Button onClick={onClick} className="flex-1 justify-center">
            Ouvrir
            <ArrowRight size={14} className="ml-1.5" />
          </Button>
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onSave?.();
            }}
            className="p-2 min-w-[44px] justify-center"
          >
            {isSaved ? (
              <BookmarkCheck size={16} className="text-primary-500" />
            ) : (
              <Bookmark size={16} />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MagazineCard;
