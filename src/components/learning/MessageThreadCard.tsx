/**
 * MessageThreadCard
 *
 * Card component for displaying message threads in messaging/collaboration pages.
 * Shows sender, subject, preview text, and open action.
 * Uses only design tokens and TLS components.
 *
 * Usage:
 * <MessageThreadCard
 *   from="Coach Alice"
 *   subject="Preparation session leadership"
 *   preview="Peux-tu preparer 3 situations concretes ?"
 *   onClick={() => navigate('/messages/1')}
 * />
 */

import React from 'react';
import { Button } from '../core/Button';
import { UserRound } from 'lucide-react';

export interface MessageThreadCardProps {
  from: string;
  subject: string;
  preview: string;
  onClick?: () => void;
  className?: string;
}

export const MessageThreadCard: React.FC<MessageThreadCardProps> = ({
  from,
  subject,
  preview,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--s-3)',
        padding: 'var(--s-3)',
        borderRadius: 'var(--r-md)',
        border: '1px solid var(--border-subtle)',
        background: 'var(--surface)',
        transition: 'all var(--dur-2)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--surface-muted)';
        e.currentTarget.style.borderColor = 'var(--border-default)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--surface)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
      }}
      onClick={onClick}
    >
      {/* Content section */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Subject */}
        <h4 style={{ margin: '0 0 var(--s-1)', fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--text)' }}>
          {subject}
        </h4>

        {/* From/sender */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-micro)', color: 'var(--text-muted)', marginBottom: 'var(--s-2)' }}>
          <UserRound size={12} /> {from}
        </div>

        {/* Preview text */}
        <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {preview}
        </p>
      </div>

      {/* Action button */}
      {onClick && (
        <Button
          size="sm"
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Ouvrir
        </Button>
      )}
    </div>
  );
};

export default MessageThreadCard;
