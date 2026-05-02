import React, { useRef, useState } from 'react';

/**
 * Search — Source of truth: design-system/spec.json → components.Search
 *
 * Search bar with optional suggestion dropdown + keyboard shortcut + clear button.
 * Sizes: default / lg.
 */

export type SearchSize = 'default' | 'lg';

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: SearchSize;
  shortcut?: string;
  leadingIcon?: React.ReactNode;
  wrapperClassName?: string;
}

const SEARCH_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CLEAR_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const Search: React.FC<SearchProps> = ({
  size = 'default',
  shortcut,
  leadingIcon,
  wrapperClassName = '',
  placeholder = 'Rechercher…',
  value,
  onChange,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState('');

  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as string) : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    // Fire a synthetic change event for controlled usage
    if (inputRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      nativeInputValueSetter?.call(inputRef.current, '');
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
    inputRef.current?.focus();
  };

  const hasValue = Boolean(currentValue);

  const classes = [
    'search',
    size === 'lg' && 'search--lg',
    wrapperClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <span className="search__icon">{leadingIcon ?? SEARCH_ICON}</span>
      <input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        value={isControlled ? value : internalValue}
        onChange={handleChange}
        {...rest}
      />
      {hasValue && (
        <button
          type="button"
          className="search__clear"
          onClick={handleClear}
          aria-label="Effacer la recherche"
          tabIndex={-1}
        >
          {CLEAR_ICON}
        </button>
      )}
      {shortcut && !hasValue && <kbd className="search__shortcut">{shortcut}</kbd>}
    </label>
  );
};

export default Search;
