/**
 * ArticleCard
 *
 * Card component for displaying articles/content items in Veille/Magazine feeds.
 * Shows type badge, title, summary, author, read time, and save action.
 * Uses only design tokens and TLS components.
 *
 * Usage:
 * <ArticleCard
 *   type="actu"
 *   title="IA générative en formation"
 *   summary="Tour d'horizon des nouveaux usages..."
 *   category="IA & Pédagogie"
 *   author="The Learning Society"
 *   publishedAt="Aujourd'hui"
 *   readTime="6 min"
 *   tone="primary"
 *   isSaved={false}
 *   onSave={() => {}}
 *   onClick={() => navigate('/article/1')}
 * />
 */

import React from 'react';
import { Card, CardEyebrow, CardTitle, CardDesc, CardFooter } from '../core/Card';
import { Button } from '../core/Button';
import { MetaPillGroup } from '../ui/MetaPillGroup';
import { Calendar, User, Clock, Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';

export interface ArticleCardProps {
  type: 'actu' | 'tutoriel' | 'dossier' | 'magazine';
  typeLabel: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tone?: 'primary' | 'warm' | 'sun';
  isSaved?: boolean;
  icon?: React.ReactNode;
  onSave?: (id: string) => void;
  onClick?: () => void;
  onRead?: () => void;
  itemId?: string;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  type,
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
  // Determine icon background color based on tone
  const getIconBg = () => {
    switch (tone) {
      case 'warm':
        return 'var(--tls-orange-100)';
      case 'sun':
        return 'var(--tls-yellow-100)';
      default:
        return 'var(--tls-primary-50)';
    }
  };

  const getIconColor = () => {
    switch (tone) {
      case 'warm':
        return 'var(--tls-orange-600)';
      case 'sun':
        return 'var(--tls-yellow-600)';
      default:
        return 'var(--tls-primary-600)';
    }
  };

  return (
    <Card
      variant="feature"
      className={className}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Header: Type icon + date + save button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--s-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
          {icon && (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 'var(--r-sm)',
                background: getIconBg(),
                color: getIconColor(),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          <div>
            <CardEyebrow style={{ marginBottom: 0 }}>{typeLabel}</CardEyebrow>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--t-micro)', color: 'var(--text-muted)' }}>
              <Calendar size={11} />
              {publishedAt}
            </span>
          </div>
        </div>
        {onSave && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSave(itemId);
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isSaved ? 'var(--tls-primary-600)' : 'var(--text-muted)',
              transition: 'color var(--dur-2)',
              padding: 'var(--s-1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--tls-primary-600)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isSaved ? 'var(--tls-primary-600)' : 'var(--text-muted)';
            }}
            aria-label={isSaved ? 'Retirer des favoris' : 'Enregistrer'}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        )}
      </div>

      {/* Category */}
      <span
        style={{
          fontSize: 'var(--t-micro)',
          color: 'var(--text-muted)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          display: 'block',
          marginBottom: 'var(--s-1)',
        }}
      >
        {category}
      </span>

      {/* Title */}
      <CardTitle style={{ marginBottom: 'var(--s-2)' }}>{title}</CardTitle>

      {/* Summary */}
      <CardDesc style={{ marginBottom: 'var(--s-3)' }}>{summary}</CardDesc>

      {/* Footer: Author + read time + action */}
      <CardFooter style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
