import React, { useState } from 'react';
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
      <div className={`flex flex-col gap-2 ${className}`}>
        <label className="text-caption text-ink-600 font-medium">
          Raison du rejet <span className="text-ink-400 font-normal">(optionnel)</span>
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Expliquez pourquoi vous rejetez cette recommandation..."
          rows={3}
          className={[
            'w-full h-auto min-h-[80px] rounded-md border border-ink-200 bg-white',
            'px-3 py-2 text-body-sm text-ink-900 placeholder:text-ink-400',
            'focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
            'resize-none transition-colors duration-base',
          ].join(' ')}
        />
        <div className="flex gap-2 justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            leadingIcon={<X size={14} />}
          >
            Annuler
          </Button>
          <Button
            variant="secondary"
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
    <Button
      variant="ghost"
      size={size}
      onClick={handleClick}
      leadingIcon={<XCircle size={size === 'sm' ? 14 : 16} />}
      className={`text-ink-500 hover:text-danger-fg hover:bg-danger-bg ${className}`}
    >
      {label}
    </Button>
  );
};

export default AIOverrideButton;
