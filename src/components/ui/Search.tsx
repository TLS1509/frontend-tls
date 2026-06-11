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

const SIZE_WRAPPER: Record<SearchSize, string> = {
  sm:      'py-1.5 px-3 rounded-lg',
  default: 'py-2.5 px-4 rounded-xl',
  lg:      'py-3.5 px-5 rounded-2xl',
};

const SIZE_GAP: Record<SearchSize, string> = {
  sm:      'gap-2',
  default: 'gap-3',
  lg:      'gap-3',
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
    'flex flex-col transition-[background-color,border-color,box-shadow] duration-fast ease-emphasis',
    SIZE_WRAPPER[size],
    VARIANT_WRAPPER[variant],
    wrapperClassName,
  ].filter(Boolean).join(' ');

  const inputRowClasses = [
    'flex items-center',
    SIZE_GAP[size],
  ].join(' ');

  const inputClasses = [
    'flex-1 bg-transparent border-0 outline-none font-body min-w-0 h-auto p-0',
    'focus:outline-none focus:bg-transparent focus:shadow-none',
    SIZE_INPUT[size],
    VARIANT_INPUT[variant],
  ].join(' ');

  return (
    <div className={wrapperClasses} role="search">
      {/* Input row — plain div, no label wrapping (avoids click-steal on nested buttons) */}
      <div className={inputRowClasses}>
        <span className={`inline-flex items-center justify-center shrink-0 ${VARIANT_ICON[variant]}`} aria-hidden>
          {leadingIcon ?? <SearchIcon size={SIZE_ICON[size]} strokeWidth={2} />}
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
              'inline-flex items-center justify-center w-5 h-5 p-0 border-0 rounded-sm cursor-pointer shrink-0 transition-[background-color,color] duration-fast ease-emphasis',
              isGlass
                ? 'bg-white/20 text-white/80 hover:bg-white/30 hover:text-white'
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
            'font-mono text-[11px] py-0.5 px-2 rounded-sm shrink-0 border',
            isGlass
              ? 'bg-white/15 text-white/70 border-white/20'
              : 'bg-ink-50 text-ink-500 border-ink-200',
          ].join(' ')}>
            {shortcut}
          </kbd>
        )}
      </div>

      {/* Filters slot — rendered BELOW input row, as sibling (not inside a label) */}
      {hasFiltersSlot && (
        <div className={`flex flex-wrap gap-1.5 pt-2 border-t ${isGlass ? 'border-white/20' : 'border-ink-100'}`}>
          {filtersSlot}
        </div>
      )}

      {/* Suggestions dropdown */}
      {hasSuggestions && suggestionsOpen && (
        <div
          id="search-suggestions"
          role="listbox"
          className={`flex flex-col gap-1 pt-2 border-t ${isGlass ? 'border-white/20' : 'border-ink-100'}`}
        >
          {suggestions!.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              role="option"
              onClick={() => handleSuggestionSelect(suggestion)}
              className={[
                'flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-[background-color] duration-fast ease-emphasis',
                isGlass ? 'hover:bg-white/15 text-white' : 'hover:bg-ink-50 text-ink-900',
              ].join(' ')}
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
