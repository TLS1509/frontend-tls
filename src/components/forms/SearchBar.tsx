/**
 * SearchBar
 *
 * Reusable search bar component with input, icon, and clear button.
 * Uses only design tokens and TLS components.
 *
 * Usage:
 * <SearchBar
 *   value={search}
 *   onChange={(value) => setSearch(value)}
 *   placeholder="Search entries..."
 * />
 */

import React from 'react';
import type { InputHTMLAttributes } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  className = '',
  placeholder = 'Search...',
  ...inputProps
}) => {
  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
  };

  return (
    <div className={`w-full ${className}`} style={{ position: 'relative' }}>
      {/* Search Icon */}
      <Search
        size={18}
        style={{
          position: 'absolute',
          left: 'var(--s-3)',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
        }}
      />

      {/* Input */}
      <input
        {...inputProps}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: 'var(--s-3) var(--s-3) var(--s-3) var(--s-10)',
          paddingRight: value ? 'var(--s-10)' : 'var(--s-3)',
          borderRadius: 'var(--r-xl)',
          border: '1px solid var(--border-default)',
          background: 'var(--surface)',
          color: 'var(--text)',
          fontSize: 'var(--t-body-sm)',
          outline: 'none',
          transition: 'all var(--dur-2)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--tls-primary-500)';
          e.currentTarget.style.boxShadow = '0 0 0 3px var(--overlay-brand-xs)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-default)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: 'var(--s-3)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--s-1)',
            transition: 'color var(--dur-2)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
          }}
          title="Clear"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
