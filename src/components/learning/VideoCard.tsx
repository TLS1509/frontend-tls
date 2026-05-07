import React from 'react';
import { Card } from '../core/Card';
import { Badge } from '../ui/Badge';
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

const TONE_THUMB: Record<VideoCardTone, string> = {
  primary: 'bg-gradient-to-br from-primary-400 to-primary-700',
  warm:    'bg-gradient-to-br from-secondary-400 to-secondary-700',
  sun:     'bg-gradient-to-br from-accent-300 to-accent-600',
  brand:   'bg-gradient-to-br from-primary-600 to-primary-900',
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
    <Card className={['flex flex-col gap-3', className].filter(Boolean).join(' ')}>
      <div
        onClick={onClick}
        className={[
          'relative aspect-video rounded-lg overflow-hidden cursor-pointer flex items-center justify-center',
          TONE_THUMB[tone],
        ].join(' ')}
      >
        <div
          aria-hidden="true"
          className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-transform hover:scale-110"
        >
          <Play size={24} fill="currentColor" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="m-0 text-h4 font-semibold text-ink-900 leading-snug">{title}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">{category}</Badge>
          <MetaPill icon={<Clock size={12} />} text={duration} size="sm" />
        </div>
        {author && <p className="m-0 text-caption text-ink-500">Par {author}</p>}
      </div>

      <div className="flex gap-2 pt-2 border-t border-ink-200">
        <Button onClick={onClick} className="flex-1 justify-center">
          <Play size={14} />
          Regarder
        </Button>
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onSave?.();
          }}
          className={[
            'p-2 min-w-[44px] justify-center',
            isSaved ? 'text-primary-500' : '',
          ].join(' ')}
        >
          {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </Button>
      </div>
    </Card>
  );
};

export default VideoCard;
