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
      className={['text-center cursor-pointer', className].filter(Boolean).join(' ')}
    >
      <div className="mb-3">
        <Badge variant={variant}>{label}</Badge>
      </div>
      <div className="flex justify-center mb-3">{icon}</div>
      <CardDesc className="text-center">{text}</CardDesc>
    </Card>
  );
};

export default PromptCard;
