import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Combobox — Searchable single-select (Tailwind v4)
 *
 * An `<input>` that filters a dropdown list as the user types.
 * Full keyboard navigation: ↑ ↓ navigate, Enter selects, Escape/Tab closes.
 * Selected option shows a Check icon. Follows the Select.tsx visual pattern.
 *
 * Sizes  : sm / md / lg
 * Status : default / success / error
 * ARIA   : role="combobox", role="listbox", role="option", aria-activedescendant
 */

export type ComboboxSize = 'sm' | 'md' | 'lg';
export type ComboboxStatus = 'default' | 'success' | 'error';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options?: ComboboxOption[];
  /** Controlled: currently-selected value */
  value?: string;
  onChange?: (value: string) => void;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  size?: ComboboxSize;
  status?: ComboboxStatus;
  disabled?: boolean;
  id?: string;
  className?: string;
  /** Message shown when no option matches the query. Default: "Aucun résultat" */
  noResultsLabel?: string;
}

/* ─── Style maps ────────────────────────────────────────────────────────────── */

const FIELD_BASE = 'flex flex-col gap-stack-xs font-body';

// Visual control shell: border, bg, sizing. No `relative` here — the wrapper
// <div class="relative"> below is the positioning context for the dropdown.
const CONTROL_BASE =
  'inline-flex items-center gap-stack-xs w-full border font-body transition-colors duration-base';

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

/* R4 — le rayon de la famille champ, hors de BASE (une seule classe par appel).
   La liste déroulante prend le même cran : elle prolonge le champ. Raisonnement
   complet dans `core/Input.tsx`. */
const RAYON = 'rounded-lg';

/* 36 · 44 · 52 (arbitrage n°22), texte saisi à 16 px à toutes les tailles
   (zoom d'iOS au focus en dessous) ; padding et chevron de la famille champ
   (`core/Input.tsx`). */
const SIZE_CLASSES: Record<ComboboxSize, string> = {
  sm: 'h-9 px-stack-sm text-body',
  md: 'h-touch px-stack text-body',
  lg: 'h-13 px-stack-md text-body',
};

const ICON_SIZE: Record<ComboboxSize, string> = {
  sm: '[&>svg]:size-4',
  md: '[&>svg]:size-4.5',
  lg: '[&>svg]:size-5',
};

/* Les options de la liste reprennent le padding du champ : leur texte part de
   la même verticale que la saisie. */
const OPTION_PADDING: Record<ComboboxSize, string> = {
  sm: 'px-stack-sm',
  md: 'px-stack',
  lg: 'px-stack-md',
};

type StatusVariant = { idle: string; active: string };
const STATUS_CLASSES: Record<ComboboxStatus, StatusVariant> = {
  default: {
    idle:   'border-ink-400', // arbitrage n°7 du 23/09 : 3,01:1 sur blanc (ink-300 : 1,47)
    active: 'border-primary-500 ring-1 ring-primary-500/25',
  },
  success: {
    idle:   'border-success-base',
    active: 'border-success-base ring-1 ring-success-base/25',
  },
  error: {
    idle:   'border-danger-base',
    active: 'border-danger-base ring-1 ring-danger-base/25',
  },
};

const INPUT_BASE =
  'flex-1 bg-transparent outline-none border-0 p-0 min-w-0 font-body text-inherit ' +
  'appearance-none cursor-text ' +
  'focus:outline-none focus:shadow-none focus:bg-transparent ' +
  'disabled:cursor-not-allowed placeholder:text-ink-500';

/* ─── Component ─────────────────────────────────────────────────────────────── */

export const Combobox: React.FC<ComboboxProps> = ({
  options = [],
  value,
  onChange,
  label,
  hint,
  error,
  required,
  placeholder = 'Rechercher…',
  size = 'md',
  status = 'default',
  disabled = false,
  id,
  className = '',
  noResultsLabel = 'Aucun résultat',
}) => {
  // Stable ID for ARIA wiring — memoised so it never changes across re-renders
  const uid = useMemo(() => `cbx-${Math.random().toString(36).substr(2, 9)}`, []);
  const fieldId = id ?? uid;
  const listboxId = `${fieldId}-lb`;
  const msgId = `${fieldId}-msg`;

  const selectedOption = options.find((o) => o.value === value) ?? null;

  const [query, setQuery] = useState(selectedOption?.label ?? '');
  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLUListElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  // Keep the text input in sync when the controlled `value` changes externally
  useEffect(() => {
    const opt = options.find((o) => o.value === value) ?? null;
    setQuery(opt?.label ?? '');
  }, [value, options]);

  // Options that match the current query (case-insensitive substring)
  const filtered = useMemo(
    () =>
      query
        ? options.filter((o) =>
            o.label.toLowerCase().includes(query.toLowerCase()),
          )
        : options,
    [query, options],
  );

  const selectOption = useCallback(
    (opt: ComboboxOption) => {
      if (opt.disabled) return;
      setQuery(opt.label);
      setOpen(false);
      setFocusedIdx(-1);
      onChange?.(opt.value);
    },
    [onChange],
  );

  const restoreQuery = useCallback(() => {
    setQuery(options.find((o) => o.value === value)?.label ?? '');
  }, [value, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
    setFocusedIdx(-1);
    // If the user edits away from the currently-selected label, deselect
    if (value && e.target.value !== selectedOption?.label) {
      onChange?.('');
    }
  };

  const scrollItemIntoView = (idx: number) => {
    const item = listRef.current?.children[idx] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) { setOpen(true); return; }
        setFocusedIdx((i) => {
          const next = i < filtered.length - 1 ? i + 1 : 0;
          scrollItemIntoView(next);
          return next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!open) { setOpen(true); return; }
        setFocusedIdx((i) => {
          const prev = i > 0 ? i - 1 : filtered.length - 1;
          scrollItemIntoView(prev);
          return prev;
        });
        break;
      case 'Enter':
        e.preventDefault();
        if (open && focusedIdx >= 0 && filtered[focusedIdx]) {
          selectOption(filtered[focusedIdx]);
        } else {
          setOpen((o) => !o);
        }
        break;
      case 'Escape':
        setOpen(false);
        setFocusedIdx(-1);
        restoreQuery();
        break;
      case 'Tab':
        setOpen(false);
        setFocusedIdx(-1);
        break;
      default:
        break;
    }
  };

  // Close and restore query when clicking outside the whole widget
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocusedIdx(-1);
        restoreQuery();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [restoreQuery]);

  const computedStatus: ComboboxStatus = error ? 'error' : status;
  const { idle, active } = STATUS_CLASSES[computedStatus];

  const controlClasses = [
    CONTROL_BASE,
    RAYON,
    SIZE_CLASSES[size],
    open ? active : idle,
    disabled ? ETAT_CLASSES.desactive : ETAT_CLASSES.repos,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={wrapRef} className={[FIELD_BASE, className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={fieldId} className="text-body font-semibold text-ink-900">
          {label}
          {required && (
            <span className="text-danger-fg ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Relative wrapper: dropdown positions relative to this element */}
      <div className="relative">
        <span className={controlClasses}>
          <input
            ref={inputRef}
            id={fieldId}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={open ? listboxId : undefined}
            aria-activedescendant={
              open && focusedIdx >= 0 ? `${listboxId}-opt-${focusedIdx}` : undefined
            }
            aria-invalid={computedStatus === 'error' || undefined}
            aria-describedby={(error ?? hint) ? msgId : undefined}
            disabled={disabled}
            value={query}
            onChange={handleInputChange}
            onFocus={() => { if (!disabled) setOpen(true); }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            className={INPUT_BASE}
          />
          {/* Chevron toggle */}
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            aria-label={open ? 'Fermer les options' : 'Afficher les options'}
            onClick={() => {
              if (!disabled) {
                setOpen((o) => !o);
                inputRef.current?.focus();
              }
            }}
            className={`inline-flex items-center justify-center shrink-0 text-ink-500 border-0 bg-transparent p-0 cursor-pointer disabled:cursor-not-allowed focus:outline-none ${ICON_SIZE[size]}`}
          >
            <ChevronDown
              className={`transition-transform duration-base ${open ? 'rotate-180' : ''}`}
            />
          </button>
        </span>

        {/* Dropdown list */}
        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={typeof label === 'string' ? label : 'Options'}
            className={`absolute left-0 right-0 top-full mt-1 z-dropdown bg-white border border-ink-200 ${RAYON} shadow-md overflow-y-auto max-h-[220px]`}
          >
            {filtered.length === 0 ? (
              <li
                role="presentation"
                className={`${OPTION_PADDING[size]} py-2.5 text-body text-ink-600 select-none`}
              >
                {noResultsLabel}
              </li>
            ) : (
              filtered.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isFocused  = idx === focusedIdx;
                return (
                  <li
                    key={opt.value}
                    id={`${listboxId}-opt-${idx}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled}
                    onMouseDown={(e) => {
                      e.preventDefault(); // keep input focused
                      selectOption(opt);
                    }}
                    onMouseEnter={() => setFocusedIdx(idx)}
                    className={[
                      'flex items-center justify-between gap-stack-xs py-2.5 text-body',
                      OPTION_PADDING[size],
                      'cursor-pointer select-none transition-colors duration-fast',
                      // Option choisie : 600 et encre de marque au cran 800 (le
                      // 700 mesurait 4,48 sur le fond primary-50 de l'option active).
                      isSelected ? 'text-primary-800 font-semibold' : 'text-ink-900',
                      isFocused && !opt.disabled ? 'bg-primary-50' : '',
                      opt.disabled
                        ? 'opacity-disabled cursor-not-allowed text-ink-400'
                        : 'hover:bg-ink-50',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <span className="flex-1 truncate">{opt.label}</span>
                    {isSelected && (
                      <Check
                        size={16}
                        strokeWidth={2.5}
                        className="shrink-0 text-primary-700"
                      />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>

      {(error ?? hint) && (
        <p
          id={msgId}
          role={error ? 'alert' : undefined}
          className={
            error
              ? 'text-caption text-danger-fg flex items-center gap-tight'
              : 'text-caption text-ink-600'
          }
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
};

export default Combobox;
