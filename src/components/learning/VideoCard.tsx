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
  const toneColors: Record<string, { bg: string; border: string; icon: string }> = {
    primary: {
      bg: 'var(--tls-primary-50)',
      border: 'var(--tls-primary-200)',
      icon: 'var(--tls-primary-700)',
    },
    warm: {
      bg: 'var(--overlay-warm-xs)',
      border: 'var(--tls-orange-200)',
      icon: 'var(--tls-orange-700)',
    },
    sun: {
      bg: 'var(--tls-yellow-50)',
      border: 'var(--tls-yellow-200)',
      icon: 'var(--tls-yellow-700)',
    },
    brand: {
      bg: 'var(--surface-muted)',
      border: 'var(--border-subtle)',
      icon: 'var(--text-muted)',
    },
  };

  const colors = toneColors[tone] || toneColors.primary;

  return (
    <Card className={className}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
        {/* Video Thumbnail */}
        <div
          style={{
            position: 'relative',
            height: 180,
            borderRadius: 'var(--r-lg)',
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'all var(--dur-2)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.boxShadow = 'var(--shadow-md)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.boxShadow = 'none';
          }}
          onClick={onClick}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: colors.icon,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              transition: 'transform var(--dur-2)',
            }}
          >
            <Play size={24} style={{ marginLeft: 2 }} fill="currentColor" />
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 style={{ margin: 0, fontSize: 'var(--t-body-sm)', fontWeight: 600, marginBottom: 'var(--s-2)' }}>
            {title}
          </h3>
          <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap', marginBottom: 'var(--s-2)' }}>
            <Badge variant="neutral">{category}</Badge>
            <MetaPill icon={<Clock size={12} />} text={duration} size="sm" />
          </div>
          {author && (
            <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
              Par {author}
            </p>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--s-2)', paddingTop: 'var(--s-3)', borderTop: '1px solid var(--border-subtle)' }}>
          <Button
            onClick={onClick}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <Play size={14} style={{ marginRight: 6 }} />
            Regarder
          </Button>
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onSave?.();
            }}
            style={{
              padding: 'var(--s-2)',
              minWidth: 44,
              justifyContent: 'center',
            }}
          >
            {isSaved ? (
              <BookmarkCheck size={16} style={{ color: 'var(--tls-primary-500)' }} />
            ) : (
              <Bookmark size={16} />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;
