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
    <div className={`flex flex-wrap items-center gap-stack-sm p-3 rounded-lg bg-white/60 backdrop-blur-glass-light border border-white/60 ${className}`}>
      {/* Identité : nom 16/600 ink-900, rôle 13/400 ink-600 à 2 px. Le nom
          était en League Spartan 700 — un titre, pour un libellé de rangée.
          L'avatar (32) s'aligne sur la première ligne, pas sur le bloc : le
          texte descend de 2 px (2 + 13 = 15, contre 16). */}
      <div className="flex items-start gap-stack-sm min-w-0 flex-1">
        <Avatar initials={coachInitials} size="sm" tint={tint} />
        <div className="flex flex-col gap-tight min-w-0 flex-1 pt-tight">
          <span className="font-body text-body font-semibold text-ink-900 truncate">
            {coachName}
          </span>
          <span className="font-body text-caption text-ink-600 truncate">
            {coachRole}
          </span>
        </div>
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
