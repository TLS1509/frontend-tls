/**
 * MagazineCard
 *
 * Card component for displaying magazine editions.
 * Shows magazine cover, title, article count, and call-to-action.
 *
 * Usage:
 * <MagazineCard
 *   title="Édition #15 - Tendances EdTech 2026"
 *   description="Notre sélection des innovations clés en éducation"
 *   issueNumber={15}
 *   articleCount={8}
 *   tone="primary"
 *   onClick={() => navigate('/veille/magazine/15')}
 *   onSave={() => {}}
 *   isSaved={false}
 * />
 */

import React from 'react';
import { Card } from '../core/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../core/Button';
import { MetaPill } from '../ui/MetaPill';
import { Bookmark, BookmarkCheck, ArrowRight, FileText } from 'lucide-react';

export interface MagazineCardProps {
  title: string;
  description: string;
  issueNumber: number;
  articleCount: number;
  tone?: 'primary' | 'warm' | 'sun' | 'brand';
  isSaved?: boolean;
  onClick?: () => void;
  onSave?: () => void;
  className?: string;
}

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
  const toneColors: Record<string, { bg: string; border: string; text: string }> = {
    primary: {
      bg: 'var(--tls-primary-50)',
      border: 'var(--tls-primary-200)',
      text: 'var(--tls-primary-700)',
    },
    warm: {
      bg: 'var(--overlay-warm-xs)',
      border: 'var(--tls-orange-200)',
      text: 'var(--tls-orange-700)',
    },
    sun: {
      bg: 'var(--tls-yellow-50)',
      border: 'var(--tls-yellow-200)',
      text: 'var(--tls-yellow-700)',
    },
    brand: {
      bg: 'var(--surface-muted)',
      border: 'var(--border-subtle)',
      text: 'var(--text)',
    },
  };

  const colors = toneColors[tone] || toneColors.primary;

  return (
    <Card className={className}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
        {/* Magazine Cover Placeholder */}
        <div
          style={{
            height: 200,
            borderRadius: 'var(--r-lg)',
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.text,
            fontSize: 'var(--t-h3)',
            fontWeight: 600,
          }}
        >
          {`N°${issueNumber}`}
        </div>

        {/* Content */}
        <div>
          <h3 style={{ margin: 0, fontSize: 'var(--t-body)', fontWeight: 600, marginBottom: 'var(--s-2)' }}>
            {title}
          </h3>
          <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 'var(--s-3)' }}>
            {description}
          </p>
        </div>

        {/* Metadata */}
        <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
          <MetaPill icon={<FileText size={14} />} text={`${articleCount} articles`} size="sm" />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--s-2)', paddingTop: 'var(--s-3)', borderTop: '1px solid var(--border-subtle)' }}>
          <Button
            onClick={onClick}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            Ouvrir
            <ArrowRight size={14} style={{ marginLeft: 6 }} />
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

export default MagazineCard;
