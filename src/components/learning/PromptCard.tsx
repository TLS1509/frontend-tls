/**
 * PromptCard
 *
 * Card component for displaying reflection prompts.
 * Used in Dashboard and reflection sections.
 * Uses only design tokens and TLS components.
 *
 * Usage:
 * <PromptCard
 *   label="Apprentissage"
 *   icon={<BookOpen size={34} />}
 *   text="Quelle a été ma plus grande découverte aujourd'hui ?"
 *   variant="info"
 *   onClick={() => navigate('/journal/new')}
 * />
 */

import React from 'react';
import { Card, CardDesc } from '../core/Card';
import { Badge } from '../ui/Badge';
import type { BadgeVariant } from '../ui/Badge';

export interface PromptCardProps {
  label: string;
  icon: React.ReactNode;
  text: string;
  variant?: BadgeVariant;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  className?: string;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  label,
  icon,
  text,
  variant = 'info',
  onClick,
  onKeyDown,
  className = '',
}) => {
  return (
    <Card
      variant="interactive"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      className={className}
      style={{ textAlign: 'center', cursor: 'pointer' }}
    >
      <div style={{ marginBottom: 'var(--s-3)' }}>
        <Badge variant={variant}>{label}</Badge>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--s-3)' }}>
        {icon}
      </div>
      <CardDesc style={{ textAlign: 'center' }}>{text}</CardDesc>
    </Card>
  );
};

export default PromptCard;
