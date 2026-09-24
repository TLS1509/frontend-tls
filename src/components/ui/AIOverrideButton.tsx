import React, { useId, useState } from 'react';
import { XCircle, Check, X } from 'lucide-react';
import { Button } from '../core/Button';

// ─── Types ──────────────────────────────────────────────────────────────────

export type AIOverrideSize = 'sm' | 'md';

export interface AIOverrideButtonProps {
  /** Button label. Defaults to "Rejeter cette recommandation" */
  label?: string;
  /** Called when override is confirmed. Receives optional reason. */
  onOverride: (reason?: string) => void;
  /** If true, shows an inline textarea to collect a rejection reason before confirming */
  requireReason?: boolean;
  size?: AIOverrideSize;
  className?: string;
}

// ─── AIOverrideButton ────────────────────────────────────────────────────────

export const AIOverrideButton: React.FC<AIOverrideButtonProps> = ({
  label = 'Rejeter cette recommandation',
  onOverride,
  requireReason = false,
  size = 'sm',
  className = '',
}) => {
  const [expanded, setExpanded] = useState(false);
  const [reason, setReason] = useState('');
  const reasonId = useId();

  const handleClick = () => {
    if (requireReason) {
      setExpanded(true);
    } else {
      onOverride();
    }
  };

  const handleConfirm = () => {
    onOverride(reason.trim() || undefined);
    setExpanded(false);
    setReason('');
  };

  const handleCancel = () => {
    setExpanded(false);
    setReason('');
  };

  if (expanded) {
    return (
      <div className={`flex flex-col gap-stack-xs ${className}`}>
        {/* Libellé de champ : 16 / 600 ink-900 (il était en légende grise, 13 /
            500) ; « (optionnel) » reste à la graisse du texte. Filet ink-400 de
            la famille champ (arbitrage n°7) — ink-200 mesurait 1,2:1. */}
        <label htmlFor={reasonId} className="text-body font-semibold text-ink-900">
          Raison du rejet <span className="font-normal text-ink-600">(optionnel)</span>
        </label>
        <textarea
          id={reasonId}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Expliquez pourquoi vous rejetez cette recommandation..."
          rows={3}
          className={[
            'w-full h-auto min-h-[80px] rounded-lg border border-ink-400 bg-white',
            'px-stack-sm py-2 text-body text-ink-900 placeholder:text-ink-500',
            'focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
            'resize-none transition-colors duration-base',
          ].join(' ')}
        />
        {/* La confirmation se déplie DANS la page, qui a son propre `solid` :
            « Confirmer le rejet » reste une action de contexte (`soft`), et
            Annuler descend d'un cran, en `ghost` (arbitrage n°19 — la paire
            outline / solid est celle des modales et des formulaires). */}
        <div className="flex gap-stack-xs justify-end">
          <Button
            emphasis="ghost"
            tone="neutral"
            size="sm"
            onClick={handleCancel}
            leadingIcon={<X size={14} />}
          >
            Annuler
          </Button>
          <Button
            emphasis="soft" tone="warm"
            size="sm"
            onClick={handleConfirm}
            leadingIcon={<Check size={14} />}
          >
            Confirmer le rejet
          </Button>
        </div>
      </div>
    );
  }

  return (
    /* Un outil, jamais l'action principale : `ghost` neutre (arbitrage n°19 ;
       il était en `outline`, réservé à Annuler). Label ink-700, par la grille
       — il était obtenu en écrasant la couleur par `className` (`text-ink-500`,
       le cran des placeholders, contre le `text-primary-800` du ton : deux
       classes de même spécificité, l'ordre d'émission tranchait, piège n°6). */
    <Button
      emphasis="ghost"
      tone="neutral"
      size={size}
      onClick={handleClick}
      leadingIcon={<XCircle />}
      className={className}
    >
      {label}
    </Button>
  );
};

export default AIOverrideButton;
