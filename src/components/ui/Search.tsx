import React, { useRef, useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

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

const SIZE_CLASSES: Record<SearchSize, string> = {
  default: 'py-2.5 px-4 rounded-xl',
  lg:      'py-3.5 px-5 rounded-2xl',
};

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
    if (inputRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      nativeInputValueSetter?.call(inputRef.current, '');
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
    inputRef.current?.focus();
  };

  const hasValue = Boolean(currentValue);

  const classes = [
    'flex items-center gap-3 bg-white border border-ink-300 transition-all',
    'focus-within:border-primary-400 focus-within:shadow-brand-sm',
    SIZE_CLASSES[size],
    wrapperClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <span className="text-ink-500 inline-flex shrink-0">
        {leadingIcon ?? <SearchIcon size={18} strokeWidth={2} />}
      </span>
      <input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        value={isControlled ? value : internalValue}
        onChange={handleChange}
        className="flex-1 bg-transparent border-0 outline-none font-body text-body-sm text-ink-900 min-w-0 p-0 h-auto placeholder:text-ink-500 focus:outline-none focus:bg-transparent focus:shadow-none"
        {...rest}
      />
      {hasValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Effacer la recherche"
          tabIndex={-1}
          className="inline-flex items-center justify-center w-5 h-5 p-0 border-0 rounded-sm bg-ink-50 text-ink-600 cursor-pointer shrink-0 transition-all hover:bg-ink-200 hover:text-ink-900"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      )}
      {shortcut && !hasValue && (
        <kbd className="font-mono text-[11px] py-0.5 px-2 bg-ink-50 rounded-sm text-ink-600 shrink-0 border border-ink-200">
          {shortcut}
        </kbd>
      )}
    </label>
  );
};

export default Search;
