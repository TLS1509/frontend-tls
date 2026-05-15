import React, { useRef, useState } from 'react';
import { Search as SearchIcon, X, Loader } from 'lucide-react';

/**
 * Search — Source of truth: design-system/spec.json → components.Search
 *
 * Search bar with optional shortcut, clear button, leading icon slot, and trailing slot.
 * Supports async suggestions dropdown, filter buttons, and multiple interaction patterns.
 *
 * Variants: default | filled | ghost | glass
 * Sizes: sm | default | lg
 *
 * Slots & features :
 *  - `leadingIcon` → overrides default search icon (left)
 *  - `trailing`    → rendered to the right of the input, AFTER clear button and BEFORE shortcut.
 *                    Use for filter toggle buttons, voice search, etc.
 *  - `filtersSlot` → inline filter chips BELOW input (inside wrapper border)
 *  - `suggestions` → list of { id, label, icon? } to render as dropdown
 *  - `isLoading`   → show spinner in trailing area (for async searches)
 *  - `suggestionsOpen` & `onSuggestionsOpenChange` → control dropdown visibility
 *  - `onSuggestionSelect` → callback when user clicks a suggestion
 */

export type SearchSize = 'sm' | 'default' | 'lg';
export type SearchVariant = 'default' | 'filled' | 'ghost' | 'glass';

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
  /** Optional trailing element (typically icon button for filters / voice / etc). */
  trailing?: React.ReactNode;
  /**
   * Optional content rendered BELOW the search input INSIDE the same bordered wrapper.
   * Use for filter chips visible inline (alternative au trailing button + drawer collapsible).
   * Le wrapper passe en flex-col pour intégrer naturellement.
   */
  filtersSlot?: React.ReactNode;
  wrapperClassName?: string;
  /** Show loading spinner in trailing area while fetching suggestions. */
  isLoading?: boolean;
  /** Array of suggestions to display in dropdown. */
  suggestions?: SearchSuggestion[];
  /** Control dropdown visibility (external state). */
  suggestionsOpen?: boolean;
  /** Called when dropdown open state changes. */
  onSuggestionsOpenChange?: (open: boolean) => void;
  /** Called when user selects a suggestion. */
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  /** Optional custom suggestion renderer. */
  renderSuggestion?: (suggestion: SearchSuggestion) => React.ReactNode;
}

const SIZE_WRAPPER: Record<SearchSize, string> = {
  sm:      'py-1.5 px-3 rounded-lg gap-2',
  default: 'py-2.5 px-4 rounded-xl gap-3',
  lg:      'py-3.5 px-5 rounded-2xl gap-3',
};

const SIZE_INPUT: Record<SearchSize, string> = {
  sm:      'text-caption',
  default: 'text-body-sm',
  lg:      'text-body',
};

const SIZE_ICON: Record<SearchSize, number> = {
  sm: 12,
  default: 18,
  lg: 20,
};

const VARIANT_WRAPPER: Record<SearchVariant, string> = {
  default: 'bg-white border border-ink-300 hover:border-ink-400 focus-within:border-primary-400 focus-within:shadow-brand-sm',
  filled:  'bg-ink-100 border border-transparent hover:bg-ink-200 focus-within:bg-white focus-within:border-primary-400 focus-within:shadow-brand-sm',
  ghost:   'bg-transparent border border-ink-200 hover:border-ink-300 focus-within:border-primary-400 focus-within:bg-white focus-within:shadow-brand-sm',
  glass:   'bg-white/15 border border-white/25 backdrop-blur-glass-light hover:bg-white/22 focus-within:bg-white/30 focus-within:border-white/50',
};

const VARIANT_ICON: Record<SearchVariant, string> = {
  default: 'text-ink-500',
  filled:  'text-ink-500',
  ghost:   'text-ink-400',
  glass:   'text-white/70',
};

const VARIANT_INPUT: Record<SearchVariant, string> = {
  default: 'text-ink-900 placeholder:text-ink-400',
  filled:  'text-ink-900 placeholder:text-ink-400',
  ghost:   'text-ink-900 placeholder:text-ink-400',
  glass:   'text-white placeholder:text-white/60',
};

export const Search: React.FC<SearchProps> = ({
  size = 'default',
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
  const suggestionsOpen = controlledSuggestionsOpen !== undefined ? controlledSuggestionsOpen : internalSuggestionsOpen;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    // Open suggestions dropdown when user types
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
    if (!isControlled) setInternalValue('');
    if (inputRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      nativeInputValueSetter?.call(inputRef.current, '');
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
    // Close suggestions when clearing
    if (controlledSuggestionsOpen === undefined) setInternalSuggestionsOpen(false);
    onSuggestionsOpenChange?.(false);
    inputRef.current?.focus();
  };

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    onSuggestionSelect?.(suggestion);
    // Close dropdown after selection
    if (controlledSuggestionsOpen === undefined) setInternalSuggestionsOpen(false);
    onSuggestionsOpenChange?.(false);
  };

  const hasValue = Boolean(currentValue);

  /* Si filtersSlot présent, on passe en flex-col pour empiler input + chips dans le même wrapper.
     Le padding latéral du wrapper reste cohérent, on ajuste le padding vertical. */
  const hasFiltersSlot = Boolean(filtersSlot);

  const wrapperClasses = [
    hasFiltersSlot ? 'flex flex-col transition-all duration-150 gap-2' : 'flex items-center transition-all duration-150',
    SIZE_WRAPPER[size],
    VARIANT_WRAPPER[variant],
    wrapperClassName,
  ]
    .filter(Boolean)
    .join(' ');

  /* Inner row pour input + icons quand filtersSlot présent. */
  const innerRowClasses = hasFiltersSlot
    ? `flex items-center ${size === 'sm' ? 'gap-2' : 'gap-3'}`
    : '';

  const inputClasses = [
    'flex-1 bg-transparent border-0 outline-none font-body min-w-0 p-0 h-auto focus:outline-none focus:bg-transparent focus:shadow-none',
    SIZE_INPUT[size],
    VARIANT_INPUT[variant],
  ].join(' ');

  const isGlass = variant === 'glass';

  /* Row containing leading icon + input + clear + trailing + shortcut.
     Always rendered ; wrappé dans un row container quand filtersSlot présent. */
  const inputRow = (
    <>
      <span className={`inline-flex items-center justify-center shrink-0 ${VARIANT_ICON[variant]}`}>
        {leadingIcon ?? <SearchIcon size={SIZE_ICON[size]} strokeWidth={2} />}
      </span>
      <input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        value={isControlled ? value : internalValue}
        onChange={handleChange}
        className={inputClasses}
        aria-autocomplete="list"
        aria-expanded={suggestionsOpen}
        aria-controls={suggestions && suggestions.length > 0 ? 'search-suggestions' : undefined}
        {...rest}
      />
      {hasValue && !isLoading && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Effacer la recherche"
          tabIndex={-1}
          className={`inline-flex items-center justify-center w-5 h-5 p-0 border-0 rounded-sm cursor-pointer shrink-0 transition-all ${
            isGlass
              ? 'bg-white/20 text-white/80 hover:bg-white/30 hover:text-white'
              : 'bg-ink-50 text-ink-600 hover:bg-ink-200 hover:text-ink-900'
          }`}
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      )}
      {isLoading && (
        <span className={`inline-flex items-center justify-center w-5 h-5 p-0 shrink-0 animate-spin ${VARIANT_ICON[variant]}`}>
          <Loader size={14} strokeWidth={2} />
        </span>
      )}
      {trailing && (
        <span className="inline-flex items-center shrink-0">{trailing}</span>
      )}
      {shortcut && !hasValue && !isLoading && (
        <kbd
          className={`font-mono text-[11px] py-0.5 px-2 rounded-sm shrink-0 border ${
            isGlass
              ? 'bg-white/15 text-white/70 border-white/20'
              : 'bg-ink-50 text-ink-500 border-ink-200'
          }`}
        >
          {shortcut}
        </kbd>
      )}
    </>
  );

  const hasSuggestions = suggestions && suggestions.length > 0;

  return (
    <div className={wrapperClasses}>
      <label className="w-full">
        {hasFiltersSlot ? (
          <>
            <div className={innerRowClasses}>{inputRow}</div>
            {/* Filters row inline — visible directement sous l'input dans le même wrapper bordé */}
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-ink-100/60">
              {filtersSlot}
            </div>
          </>
        ) : (
          inputRow
        )}
      </label>

      {/* Suggestions dropdown — rendered AFTER input inside the wrapper */}
      {hasSuggestions && suggestionsOpen && (
        <div
          id="search-suggestions"
          role="listbox"
          className="flex flex-col gap-1 pt-2 border-t border-ink-100/60"
        >
          {suggestions!.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              role="option"
              onClick={() => handleSuggestionSelect(suggestion)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-all ${
                isGlass
                  ? 'hover:bg-white/15 text-white'
                  : 'hover:bg-ink-50 text-ink-900'
              }`}
            >
              {suggestion.icon && <span className="inline-flex shrink-0">{suggestion.icon}</span>}
              <div className="flex-1 min-w-0">
                <div className={`text-body-sm font-medium truncate ${isGlass ? 'text-white' : 'text-ink-900'}`}>
                  {renderSuggestion ? renderSuggestion(suggestion) : suggestion.label}
                </div>
                {suggestion.metadata && (
                  <div className={`text-caption truncate ${isGlass ? 'text-white/60' : 'text-ink-500'}`}>
                    {suggestion.metadata}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
