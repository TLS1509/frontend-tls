/**
 * VideoCard
 *
 * Card component for displaying video content (tutorials, reels, lessons).
 * Shows video thumbnail, title, duration, and metadata.
 *
 * Usage:
 * <VideoCard
 *   title="Construire un prompt structuré en 5 étapes"
 *   category="Prompt Engineering"
 *   duration="12 min"
 *   author="Marie Dubois"
 *   tone="warm"
 *   onClick={() => navigate('/video/123')}
 * />
 */

import React from 'react';
import { Card } from '../core/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../core/Button';
import { MetaPill } from '../ui/MetaPill';
import { Play, Bookmark, BookmarkCheck, Clock } from 'lucide-react';
import './VideoCard.css';

export interface VideoCardProps {
  title: string;
  category: string;
  duration: string;
  author?: string;
  tone?: 'primary' | 'warm' | 'sun' | 'brand';
  isSaved?: boolean;
  onClick?: () => void;
  onSave?: () => void;
  className?: string;
}

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
    <Card className={['video-card', `video-card--${tone}`, className].filter(Boolean).join(' ')}>
      {/* Video Thumbnail */}
      <div className="video-card__thumbnail" onClick={onClick}>
        <div className="video-card__play-btn" aria-hidden="true">
          <Play size={24} fill="currentColor" />
        </div>
      </div>

      {/* Content */}
      <div className="video-card__content">
        <h3 className="video-card__title">{title}</h3>
        <div className="video-card__meta">
          <Badge variant="neutral">{category}</Badge>
          <MetaPill icon={<Clock size={12} />} text={duration} size="sm" />
        </div>
        {author && <p className="video-card__author">Par {author}</p>}
      </div>

      {/* Actions */}
      <div className="video-card__actions">
        <Button onClick={onClick} className="video-card__action-watch">
          <Play size={14} />
          Regarder
        </Button>
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onSave?.();
          }}
          className={['video-card__action-save', isSaved && 'video-card__action-save--saved'].filter(Boolean).join(' ')}
        >
          {isSaved ? (
            <BookmarkCheck size={16} />
          ) : (
            <Bookmark size={16} />
          )}
        </Button>
      </div>
    </Card>
  );
};

export default VideoCard;
