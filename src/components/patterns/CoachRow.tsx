import React from 'react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../core/Button';
import { MessageCircle } from 'lucide-react';

export interface CoachRowProps {
  coachName: string;
  coachRole: string;
  coachInitials: string;
  onMessage?: () => void;
  className?: string;
  tint?: 'brand' | 'warm' | 'sun';
}

/**
 * CoachRow — Compact coach card pattern
 *
 * Displays coach avatar + name/role + quick-message button.
 * Extracted from Coaching.tsx line 331 pattern (Phase 19.1).
 * Reusable across: session cards, lesson players, coaching detail pages.
 *
 * Le CTA prend le niveau `soft` au ton de la rangée (`tint`).
 * (ghost remplace glass-brand, retiré — doublon exact).
 */
export const CoachRow: React.FC<CoachRowProps> = ({
  coachName,
  coachRole,
  coachInitials,
  onMessage,
  className = '',
  tint = 'brand',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-stack-xs p-3 rounded-lg bg-white/60 backdrop-blur-glass-light border border-white/60 ${className}`}>
      <Avatar initials={coachInitials} size="sm" tint={tint} />
      <div className="flex flex-col min-w-0 flex-1">
        <span className="font-display text-body font-bold text-ink-900 truncate">
          {coachName}
        </span>
        <span className="font-body text-caption text-ink-600 truncate">
          {coachRole}
        </span>
      </div>
      {onMessage && (
        <Button
          emphasis="soft"
          tone={tint}
          size="md"
          leadingIcon={<MessageCircle size={14} />}
          onClick={onMessage}
          aria-label={`Envoyer un message à ${coachName}`}
        >
          Message
        </Button>
      )}
    </div>
  );
};
