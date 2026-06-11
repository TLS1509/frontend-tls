/**
 * FloatingNavButton — Speed-dial flottant (fixed bottom-right) avec menu d'actions.
 *
 * Migré en Tailwind pur + DS tokens (Phase 10). Configurable :
 *  - `actions` : liste de { label, icon, onClick, tone }
 *  - `tone` : couleur du FAB principal (primary/warm/sun/brand) — DEFAULT primary
 *  - `position` : 'bottom-right' (DEFAULT) | 'bottom-left'
 *  - `icon` / `closeIcon` : icônes custom pour FAB et état ouvert
 *  - `ariaLabel` : accessibility
 *
 * Use cases :
 *  - DEV shortcut (Design System / Pages Index) — démonstration showcase
 *  - **Futur chatbot** : FAB Sparkles + actions (Ask AI, Suggest, etc.)
 *  - Quick contact / help button
 *
 * ⚠️ N'est PAS rendu par défaut dans App.tsx prod. À monter explicitement sur les
 * pages qui en ont besoin OU activer via une feature flag.
 */

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

export type FloatingNavTone = 'primary' | 'warm' | 'sun' | 'brand';
export type FloatingNavPosition = 'bottom-right' | 'bottom-left';

export interface FloatingNavAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  /** Tone background pill de l'action (default primary). */
  tone?: FloatingNavTone;
}

export interface FloatingNavButtonProps {
  /** Liste d'actions affichées au-dessus du FAB principal. */
  actions?: FloatingNavAction[];
  /** Tone du FAB principal. Default primary. */
  tone?: FloatingNavTone;
  /** Position fixed dans le viewport. Default bottom-right. */
  position?: FloatingNavPosition;
  /** Icone du FAB fermé. Default Plus. */
  icon?: React.ReactNode;
  /** Icone du FAB ouvert. Default X. */
  closeIcon?: React.ReactNode;
  /** Aria label du FAB. */
  ariaLabel?: string;
  className?: string;
}

const TONE_BG: Record<FloatingNavTone, string> = {
  primary: 'bg-primary-600 hover:bg-primary-500 text-white shadow-brand-md',
  warm:    'bg-secondary-500 hover:bg-secondary-400 text-white shadow-warm-md',
  sun:     'bg-accent-400 hover:bg-accent-300 text-ink-900 shadow-sun-sm',
  brand:   'bg-gradient-to-br from-primary-500 to-primary-700 hover:from-primary-400 hover:to-primary-600 text-white shadow-lg',
};

const TONE_ACTION_BG: Record<FloatingNavTone, string> = {
  primary: 'bg-white text-primary-700 border-primary-200 hover:border-primary-300 hover:bg-primary-50',
  warm:    'bg-white text-secondary-700 border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50',
  sun:     'bg-white text-accent-700 border-accent-200 hover:border-accent-300 hover:bg-accent-50',
  brand:   'bg-white text-primary-800 border-primary-200 hover:border-primary-300 hover:bg-primary-50',
};

const POSITION_CLASS: Record<FloatingNavPosition, string> = {
  'bottom-right': 'bottom-6 right-6 items-end',
  'bottom-left':  'bottom-6 left-6 items-start',
};

export const FloatingNavButton: React.FC<FloatingNavButtonProps> = ({
  actions = [],
  tone = 'primary',
  position = 'bottom-right',
  icon = <Plus size={22} strokeWidth={2.25} />,
  closeIcon = <X size={22} strokeWidth={2.25} />,
  ariaLabel,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const renderedActions = actions;

  return (
    <div
      className={[
        'fixed z-modal flex flex-col gap-3',
        POSITION_CLASS[position],
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Actions stack (visible when open) */}
      {isOpen && (
        <div className="flex flex-col gap-2 animate-[filterIn_0.18s_ease_both]">
          {renderedActions.map((action) => {
            const actionTone = action.tone ?? tone;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => { action.onClick(); setIsOpen(false); }}
                title={action.label}
                aria-label={action.label}
                className={[
                  'inline-flex items-center gap-2.5 px-4 h-12 rounded-pill border shadow-sm cursor-pointer transition-[background-color,border-color,box-shadow,transform] duration-fast ease-emphasis',
                  'hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  TONE_ACTION_BG[actionTone],
                ].join(' ')}
              >
                <span className="inline-flex items-center justify-center w-6 h-6 shrink-0">
                  {action.icon}
                </span>
                <span className="font-body text-body-sm font-semibold whitespace-nowrap">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main FAB */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={ariaLabel ?? (isOpen ? 'Fermer le menu' : 'Ouvrir le menu')}
        title={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        className={[
          'inline-flex items-center justify-center w-14 h-14 rounded-pill cursor-pointer transition-[background-color,box-shadow,transform] duration-fast ease-emphasis',
          'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.95]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          TONE_BG[tone],
        ].join(' ')}
      >
        <span className={['inline-flex transition-[transform] duration-base ease-emphasis', isOpen ? 'rotate-45' : ''].join(' ')}>
          {isOpen ? closeIcon : icon}
        </span>
      </button>
    </div>
  );
};

export default FloatingNavButton;
