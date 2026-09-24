import React, { useRef, useState } from 'react';
import { Search as SearchIcon, X, Loader } from 'lucide-react';

/**
 * Search — searchbar standalone.
 *
 * Fixes vs previous version:
 *  - NO <label> wrapper — prevents click-steal on nested interactive elements
 *  - type="text" + role="searchbox" — avoids all native browser cancel-button issues
 *  - handleClear calls onChange properly for controlled components
 *  - filtersSlot rendered OUTSIDE the input row (no label interference)
 *
 * Variants: default | filled | ghost | glass
 * Sizes: sm | default | lg
 *
 * Slots:
 *  - leadingIcon    → replaces default search icon
 *  - trailing       → right of input (filter toggle, voice, etc.)
 *  - filtersSlot    → row rendered BELOW input, inside same bordered wrapper
 *  - suggestions    → dropdown list of { id, label, icon?, metadata? }
 *  - isLoading      → spinner while async fetch
 */

export type SearchSize = 'sm' | 'md' | 'lg';
/**
 * 2 surface variants (unified 2026-06-30):
 *  - `default` — white + border, for all standard app pages (matches Input)
 *  - `glass`   — translucent + blur, for hero / gradient / dark surfaces
 * `filled` and `ghost` were removed (redundant with `default` on light surfaces).
 */
export type SearchVariant = 'default' | 'glass';

export interface SearchSuggestion {
  id: string;
  label: string;
  icon?: React.ReactNode;
  metadata?: string;
}

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: SearchSize;
  variant?: SearchVariant;
  shortcut?: string;
  leadingIcon?: React.ReactNode;
  trailing?: React.ReactNode;
  filtersSlot?: React.ReactNode;
  wrapperClassName?: string;
  isLoading?: boolean;
  suggestions?: SearchSuggestion[];
  suggestionsOpen?: boolean;
  onSuggestionsOpenChange?: (open: boolean) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  renderSuggestion?: (suggestion: SearchSuggestion) => React.ReactNode;
}

/* R4 — le rayon de la famille champ, hors de la map de taille et posé une seule
   fois (deux classes de rayon auraient la même spécificité, cf. piège n°6).
   Ce composant portait SA propre échelle — 14 · 20 · 24 selon la taille — alors
   que sa fiche de vitrine le décrit comme « blanc + bordure, comme Input ». La
   mesure donnait raison à la fiche et tort au code : sur /components/search-
   filters, trois barres de recherche rendaient 10, 14 et 20 px côte à côte. Le
   rayon ne dépend plus de la taille. Raisonnement complet dans `core/Input.tsx`. */
const RAYON = 'rounded-lg';

/* Hauteurs 36 · 44 · 52 — arbitrage n°22, l'échelle du champ et du bouton.

   Avant, la hauteur n'était écrite nulle part : elle naissait du padding
   vertical plus l'interligne du texte, et rendait 34 · 48 · 56 px — aucune des
   trois sur l'échelle, et `md` dépassait de 4 px l'`Input` qu'il côtoie dans
   les formulaires. Elle est maintenant portée par la RANGÉE de saisie
   (`min-h-8/10/12`) ; le cadre n'ajoute que 1 px de bordure et 1 px de
   retrait de chaque côté : 32 + 4 = 36, 40 + 4 = 44, 48 + 4 = 52. Une rangée
   de filtres ou de suggestions s'ajoute en dessous sans toucher à ces
   hauteurs, avec son propre padding (`SIZE_BELOW`).

   Padding horizontal et icônes : ceux de la famille champ (`core/Input.tsx`) —
   12 · 16 · 20 et 16 · 18 · 20. */
const SIZE_WRAPPER: Record<SearchSize, string> = {
  sm: 'py-px px-stack-sm',
  md: 'py-px px-stack',
  lg: 'py-px px-stack-md',
};

const SIZE_ROW: Record<SearchSize, string> = {
  sm: 'min-h-8',
  md: 'min-h-10',
  lg: 'min-h-12',
};

/* Retrait sous une rangée de filtres ou de suggestions — ce que le padding
   vertical du cadre donnait avant, rangée de saisie mise à part. */
const SIZE_BELOW: Record<SearchSize, string> = {
  sm: 'pt-stack-2xs pb-stack-2xs',
  md: 'pt-stack-xs pb-stack-xs',
  lg: 'pt-stack-xs pb-stack-sm',
};

/* ⚠️ Le texte SAISI est à 16 px aux trois tailles : sous 16, Safari iOS zoome
   sur la page au focus (l'ancien `sm` était à 13). */
const SIZE_INPUT = 'text-body';

const SIZE_ICON: Record<SearchSize, string> = {
  sm: '[&>svg]:size-4',
  md: '[&>svg]:size-4.5',
  lg: '[&>svg]:size-5',
};

/* `glass` — contrat : un hero au cran 700 ou plus sombre.
   ⚠️ Corrigé le 2026-09-23 : le voile était BLANC (/15) sous un texte blanc —
   un voile clair éclaircit ce que le blanc a besoin de sombre. Mesuré sur la
   vitrine, arrêt 700 : placeholder 2,36, icône 2,67, raccourci 2,23. Voile
   sombre (ink-900/20) et blanc plein ou /80 : placeholder 4,63, le reste ≥ 6. */
const VARIANT_WRAPPER: Record<SearchVariant, string> = {
  // Filet ink-400 (arbitrage n°7 du 23/09, 3,01:1 sur blanc) ; le survol fonce d'un cran.
  default: 'bg-white border border-ink-400 hover:border-ink-500 focus-within:border-primary-400 focus-within:shadow-brand-sm',
  glass:   'bg-ink-900/20 border border-white/30 backdrop-blur-glass-light hover:bg-ink-900/25 focus-within:bg-ink-900/30 focus-within:border-white/60',
};

const VARIANT_ICON: Record<SearchVariant, string> = {
  default: 'text-ink-500',
  glass:   'text-white',
};

const VARIANT_INPUT: Record<SearchVariant, string> = {
  default: 'text-ink-900 placeholder:text-ink-500',
  glass:   'text-white placeholder:text-white/80',
};

export const Search: React.FC<SearchProps> = ({
  size = 'md',
  variant = 'default',
  shortcut,
  leadingIcon,
  trailing,
  filtersSlot,
  wrapperClassName = '',
  placeholder = 'Rechercher…',
  value,
  onChange,
  isLoading = false,
  suggestions,
  suggestionsOpen: controlledSuggestionsOpen,
  onSuggestionsOpenChange,
  onSuggestionSelect,
  renderSuggestion,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState('');
  const [internalSuggestionsOpen, setInternalSuggestionsOpen] = useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as string) : internalValue;
  const suggestionsOpen = controlledSuggestionsOpen !== undefined
    ? controlledSuggestionsOpen
    : internalSuggestionsOpen;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    if (suggestions && suggestions.length > 0) {
      const newOpen = e.target.value.length > 0;
      if (newOpen !== suggestionsOpen) {
        if (controlledSuggestionsOpen === undefined) setInternalSuggestionsOpen(newOpen);
        onSuggestionsOpenChange?.(newOpen);
      }
    }
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    // Properly call onChange for controlled components — synthetic event shape
    if (onChange && inputRef.current) {
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      nativeSetter?.call(inputRef.current, '');
      onChange({ target: inputRef.current } as React.ChangeEvent<HTMLInputElement>);
    }
    if (controlledSuggestionsOpen === undefined) setInternalSuggestionsOpen(false);
    onSuggestionsOpenChange?.(false);
    inputRef.current?.focus();
  };

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    onSuggestionSelect?.(suggestion);
    if (controlledSuggestionsOpen === undefined) setInternalSuggestionsOpen(false);
    onSuggestionsOpenChange?.(false);
  };

  const hasValue = Boolean(currentValue);
  const hasFiltersSlot = Boolean(filtersSlot);
  const hasSuggestions = suggestions && suggestions.length > 0;
  const isGlass = variant === 'glass';

  const wrapperClasses = [
    'flex flex-col transition-all duration-150',
    RAYON,
    SIZE_WRAPPER[size],
    VARIANT_WRAPPER[variant],
    wrapperClassName,
  ].filter(Boolean).join(' ');

  const inputRowClasses = [
    'flex items-center gap-stack-xs',
    SIZE_ROW[size],
  ].join(' ');

  const inputClasses = [
    'flex-1 bg-transparent border-0 outline-none font-body min-w-0 h-auto p-0',
    'focus:outline-none focus:bg-transparent focus:shadow-none',
    SIZE_INPUT,
    VARIANT_INPUT[variant],
  ].join(' ');

  return (
    <div className={wrapperClasses} role="search">
      {/* Input row — plain div, no label wrapping (avoids click-steal on nested buttons) */}
      <div className={inputRowClasses}>
        <span className={`inline-flex items-center justify-center shrink-0 ${SIZE_ICON[size]} ${VARIANT_ICON[variant]}`} aria-hidden>
          {leadingIcon ?? <SearchIcon strokeWidth={2} />}
        </span>

        <input
          ref={inputRef}
          type="text"
          role="searchbox"
          placeholder={placeholder}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          className={inputClasses}
          aria-autocomplete={hasSuggestions ? 'list' : undefined}
          aria-expanded={hasSuggestions ? suggestionsOpen : undefined}
          aria-controls={hasSuggestions ? 'search-suggestions' : undefined}
          {...rest}
        />

        {hasValue && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Effacer la recherche"
            tabIndex={-1}
            className={[
              'inline-flex items-center justify-center w-5 h-5 p-0 border-0 rounded-sm cursor-pointer shrink-0 transition-all',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              isGlass
                ? 'bg-ink-900/30 text-white hover:bg-ink-900/45'
                : 'bg-ink-50 text-ink-600 hover:bg-ink-200 hover:text-ink-900',
            ].join(' ')}
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}

        {isLoading && (
          <span className={`inline-flex items-center justify-center w-5 h-5 p-0 shrink-0 animate-spin ${VARIANT_ICON[variant]}`} aria-hidden>
            <Loader size={14} strokeWidth={2} />
          </span>
        )}

        {trailing && (
          <span className="inline-flex items-center shrink-0">{trailing}</span>
        )}

        {shortcut && !hasValue && !isLoading && (
          <kbd className={[
            'font-mono text-micro py-0.5 px-2 rounded-sm shrink-0 border',
            isGlass
              ? 'bg-ink-900/30 text-white border-white/30'
              : 'bg-ink-50 text-ink-600 border-ink-200',
          ].join(' ')}>
            {shortcut}
          </kbd>
        )}
      </div>

      {/* Filters slot — rendered BELOW input row, as sibling (not inside a label) */}
      {hasFiltersSlot && (
        <div className={`flex flex-wrap gap-stack-2xs border-t ${SIZE_BELOW[size]} ${isGlass ? 'border-white/20' : 'border-ink-100'}`}>
          {filtersSlot}
        </div>
      )}

      {/* Suggestions dropdown */}
      {hasSuggestions && suggestionsOpen && (
        <div
          id="search-suggestions"
          role="listbox"
          className={`flex flex-col gap-tight border-t ${SIZE_BELOW[size]} ${isGlass ? 'border-white/20' : 'border-ink-100'}`}
        >
          {suggestions!.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              role="option"
              onClick={() => handleSuggestionSelect(suggestion)}
              className={[
                'flex items-center gap-stack-xs px-2 py-1.5 rounded-md text-left transition-all',
                isGlass
                  ? 'hover:bg-ink-900/20 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70'
                  : 'hover:bg-ink-50 text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              ].join(' ')}
            >
              {suggestion.icon && <span className="inline-flex shrink-0">{suggestion.icon}</span>}
              {/* Des <span> : un <button> n'admet que du contenu phrasé (il
                  portait trois <div>, 2026-09-24). `block` garde la coupure
                  en « … » de `truncate`, qui ne joue que sur un bloc. */}
              <span className="flex-1 min-w-0">
                <span className={`block text-body truncate ${isGlass ? 'text-white' : 'text-ink-900'}`}>
                  {renderSuggestion ? renderSuggestion(suggestion) : suggestion.label}
                </span>
                {suggestion.metadata && (
                  <span className={`block text-caption truncate ${isGlass ? 'text-white/80' : 'text-ink-600'}`}>
                    {suggestion.metadata}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
