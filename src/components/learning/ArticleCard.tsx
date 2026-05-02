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
import './ArticleCard.css';

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
      className={['article-card', className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {/* Header: Type icon + date + save button */}
      <div className="article-card__header">
        <div className="article-card__type-info">
          {icon && (
            <div className={`article-card__icon article-card__icon--${tone}`} aria-hidden="true">
              {icon}
            </div>
          )}
          <div>
            <CardEyebrow className="article-card__type-label">{typeLabel}</CardEyebrow>
            <span className="article-card__date">
              <Calendar size={11} />
              {publishedAt}
            </span>
          </div>
        </div>
        {onSave && (
          <button
            type="button"
            className={['article-card__save-btn', isSaved && 'article-card__save-btn--saved'].filter(Boolean).join(' ')}
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

      {/* Category */}
      <span className="article-card__category">{category}</span>

      {/* Title */}
      <CardTitle className="article-card__title">{title}</CardTitle>

      {/* Summary */}
      <CardDesc className="article-card__summary">{summary}</CardDesc>

      {/* Footer: Author + read time + action */}
      <CardFooter className="article-card__footer">
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
