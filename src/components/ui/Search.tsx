import React from 'react';

/**
 * Search — Source of truth: design-system/spec.json → components.Search
 *
 * Search bar with optional suggestion dropdown + keyboard shortcut.
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

export const Search: React.FC<SearchProps> = ({
  size = 'default',
  shortcut,
  leadingIcon,
  wrapperClassName = '',
  placeholder = 'Rechercher…',
  ...rest
}) => {
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
      <input type="search" placeholder={placeholder} {...rest} />
      {shortcut && <kbd className="search__shortcut">{shortcut}</kbd>}
    </label>
  );
};

export default Search;
