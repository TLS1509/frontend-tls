import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../core/Input';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
}

/**
 * SearchBar — Reusable search input component
 * Standalone component for search functionality across the app.
 * Can be composed with FilterSelect components.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Rechercher…',
  onClear,
  className = '',
}) => {
  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        leadingIcon={<Search size={16} />}
        className="flex-1"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Effacer la recherche"
          className="p-2 hover:bg-ink-50 rounded-md transition-colors"
        >
          <X size={16} className="text-ink-400" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
