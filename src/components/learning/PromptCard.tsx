import React from 'react';
import { Card, CardDesc } from '../core/Card';
import { Badge } from '../ui/Badge';
import { ArrowRight } from 'lucide-react';
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
      className={[
        'group flex flex-col items-center gap-4 text-center cursor-pointer transition-all',
        'hover:-translate-y-1 hover:shadow-md',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Badge variant={variant}>{label}</Badge>

      <div className="inline-flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
        {icon}
      </div>

      <CardDesc className="text-center text-balance">{text}</CardDesc>

      <div className="inline-flex items-center gap-1 text-caption font-semibold text-ink-500 group-hover:text-primary-700 transition-colors">
        Réfléchir
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Card>
  );
};

export default PromptCard;
