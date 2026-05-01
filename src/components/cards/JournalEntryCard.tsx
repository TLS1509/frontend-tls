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

  return (
    <div
      onClick={onClick}
      className={`group p-5 rounded-2xl cursor-pointer transition-all duration-200 ${className}`}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-default)',
        boxShadow: 'var(--shadow-xs)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Type Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--s-1)',
          padding: '4px 8px',
          borderRadius: 'var(--r-md)',
          background: config.bg,
          color: config.text,
          marginBottom: 'var(--s-3)',
          fontSize: 'var(--t-caption)',
          fontWeight: 600,
        }}
      >
        <Icon size={14} />
        {config.label}
      </div>

      {/* Title */}
      <h3
        style={{
          margin: '0 0 var(--s-2)',
          fontSize: 'var(--t-body)',
          fontWeight: 600,
          color: 'var(--text)',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {title}
      </h3>

      {/* Excerpt */}
      <p
        style={{
          margin: '0 0 var(--s-3)',
          fontSize: 'var(--t-caption)',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {excerpt}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap', marginBottom: 'var(--s-3)' }}>
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 6px',
                borderRadius: 'var(--r-xs)',
                background: 'var(--surface-muted)',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Metadata */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--s-3)',
          paddingTop: 'var(--s-3)',
          borderTop: '1px solid var(--border-subtle)',
          color: 'var(--text-muted)',
          fontSize: 'var(--t-caption)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
          <Calendar size={14} />
          {date}
        </div>
        {time && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
            <Clock size={14} />
            {time}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalEntryCard;
