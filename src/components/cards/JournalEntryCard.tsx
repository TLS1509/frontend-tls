/**
 * JournalEntryCard
 *
 * Card component for displaying journal entries with type, title, excerpt, tags, and metadata.
 * Uses only design tokens and TLS components.
 *
 * Usage:
 * <JournalEntryCard
 *   type="guided"
 *   title="My first reflection"
 *   excerpt="Today I learned..."
 *   date="2026-04-30"
 *   time="14:30"
 *   tags={['reflection', 'learning']}
 *   onClick={() => navigate('/journal/123')}
 * />
 */

import React from 'react';
import { BookOpen, Sparkles, BookMarked, Target, Lightbulb, Calendar, Clock } from 'lucide-react';
import './JournalEntryCard.css';

export type JournalEntryType = 'guided' | 'free' | 'learning' | 'coaching' | 'insight';

export interface JournalEntryCardProps {
  type: JournalEntryType;
  title: string;
  excerpt: string;
  date: string;
  time?: string;
  tags?: string[];
  onClick?: () => void;
  className?: string;
}

const typeConfig: Record<JournalEntryType, { icon: React.ComponentType<any>; bg: string; text: string; label: string }> = {
  guided: { icon: BookOpen, bg: 'var(--tls-primary-50)', text: 'var(--tls-primary-600)', label: 'Guided' },
  free: { icon: Sparkles, bg: 'var(--tls-yellow-50)', text: 'var(--tls-yellow-600)', label: 'Free' },
  learning: { icon: BookMarked, bg: 'var(--tls-orange-50)', text: 'var(--tls-orange-600)', label: 'Learning' },
  coaching: { icon: Target, bg: 'var(--overlay-warm-xs)', text: 'var(--tls-orange-600)', label: 'Coaching' },
  insight: { icon: Lightbulb, bg: 'var(--overlay-brand-xs)', text: 'var(--tls-primary-600)', label: 'Insight' },
};

export const JournalEntryCard: React.FC<JournalEntryCardProps> = ({
  type,
  title,
  excerpt,
  date,
  time,
  tags = [],
  onClick,
  className = '',
}) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  const cardClasses = [
    'journal-entry-card',
    `journal-entry-card--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      onClick={onClick}
      className={cardClasses}
    >
      {/* Type Badge */}
      <div className="journal-entry-card__badge">
        <Icon size={14} />
        {config.label}
      </div>

      {/* Title */}
      <h3 className="journal-entry-card__title">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="journal-entry-card__excerpt">
        {excerpt}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="journal-entry-card__tags">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="journal-entry-card__tag"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Metadata */}
      <div className="journal-entry-card__metadata">
        <div className="journal-entry-card__meta-item">
          <Calendar size={14} />
          {date}
        </div>
        {time && (
          <div className="journal-entry-card__meta-item">
            <Clock size={14} />
            {time}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalEntryCard;
