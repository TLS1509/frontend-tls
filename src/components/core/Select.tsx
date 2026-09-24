import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Select — Self-contained dropdown field component (Tailwind v4)
 *
 * Includes everything needed for a form field:
 * - Label (with optional required indicator)
 * - Control (select with chevron icon)
 * - Helper text or error message
 *
 * Sizes: sm/md/lg
 * Status: default/success/error
 */

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectStatus = 'default' | 'success' | 'error';

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  size?: SelectSize;
  status?: SelectStatus;
  options?: SelectOption[];
  placeholder?: string;
  showIcon?: boolean;
}

const FIELD_BASE = 'flex flex-col gap-stack-xs font-body';

const CONTROL_BASE =
  'inline-flex items-center gap-stack-xs w-full border font-body transition-[border-color,box-shadow] duration-150';

/* R4 — le rayon de la famille champ, hors de BASE (une seule classe par appel).
   Raisonnement complet dans `core/Input.tsx`. */
const RAYON = 'rounded-lg';

/* 36 · 44 · 52 (arbitrage n°22) et 16 px de texte à toutes les tailles : la
   valeur choisie est du texte saisi, et Safari iOS zoome au focus sous 16 px.
   Padding et icône : ceux de `core/Input.tsx`, dont la famille champ suit
   l'échelle (12 · 16 · 20 ; chevron 16 · 18 · 20). */
const SIZE_CLASSES: Record<SelectSize, string> = {
  sm: 'h-9 px-stack-sm text-body',
  md: 'h-touch px-stack text-body',
  lg: 'h-13 px-stack-md text-body',
};

const ICON_SIZE: Record<SelectSize, string> = {
  sm: '[&>svg]:size-4',
  md: '[&>svg]:size-4.5',
  lg: '[&>svg]:size-5',
};

const STATUS_CLASSES: Record<SelectStatus, string> = {
  // Filet à ink-400 — arbitrage n°7 du 2026-09-23 : 3,01:1 sur blanc (WCAG 1.4.11
  // exige 3:1), 2,68:1 sur carte teintée (sous le seuil, choix assumé). ink-300
  // mesurait 1,47:1 : un champ blanc sur fond blanc n'existait pas.
  default: 'border-ink-400 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20',
  success: 'border-success-base focus-within:ring-2 focus-within:ring-success-base/35',
  error: 'border-danger-base focus-within:ring-2 focus-within:ring-danger-base/35',
};

/* Fond et encre : une table d'états, UNE entrée posée par appel (24/09).
   Ils vivaient dans CONTROL_BASE (`bg-white text-ink-900`) et l'état
   désactivé ajoutait `bg-ink-50 text-ink-500` : deux classes par propriété,
   même spécificité, l'ordre d'émission de Tailwind tranche (piège n°6) — le
   champ désactivé restait blanc, en ink-900. L'erreur et le succès ne
   touchent que le filet (STATUS_CLASSES). */
const ETAT_CLASSES = {
  repos: 'bg-white text-ink-900',
  desactive: 'bg-ink-50 text-ink-500 cursor-not-allowed',
} as const;

const NATIVE_SELECT =
  'flex-1 bg-transparent outline-none border-0 p-0 min-w-0 font-body text-inherit appearance-none cursor-pointer disabled:cursor-not-allowed focus:outline-none focus:shadow-none focus:bg-transparent focus-visible:outline-none';

export const Select: React.FC<SelectProps> = ({
  label,
  hint,
  error,
  required,
  id,
  size = 'md',
  status = 'default',
  options = [],
  placeholder = 'Sélectionner...',
  showIcon = true,
  disabled = false,
  className = '',
  children,
  ...rest
}) => {
  const fieldId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const containerClasses = [FIELD_BASE, className].filter(Boolean).join(' ');

  const controlClasses = [
    CONTROL_BASE,
    RAYON,
    SIZE_CLASSES[size],
    STATUS_CLASSES[status],
    disabled ? ETAT_CLASSES.desactive : ETAT_CLASSES.repos,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label
          className="text-body font-semibold text-ink-900"
          htmlFor={fieldId}
        >
          {label}
          {required && (
            <span className="text-danger-fg ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <span className={controlClasses}>
        <select
          id={fieldId}
          disabled={disabled}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={error || hint ? `${fieldId}-message` : undefined}
          className={NATIVE_SELECT}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {showIcon && (
          <span
            className={`inline-flex items-center justify-center shrink-0 text-ink-500 pointer-events-none ${ICON_SIZE[size]}`}
            aria-hidden="true"
          >
            <ChevronDown />
          </span>
        )}
      </span>

      {(error || hint) && (
        <p
          id={`${fieldId}-message`}
          className={
            error
              ? 'text-caption text-danger-fg flex items-center gap-tight'
              : 'text-caption text-ink-600'
          }
          role={error ? 'alert' : undefined}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
};

export default Select;
