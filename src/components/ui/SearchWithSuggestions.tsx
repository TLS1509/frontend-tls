import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search as SearchIcon, Code2, Layers, Tag, FileText } from 'lucide-react';

export interface SearchSuggestion {
  id: string;
  type: 'component' | 'category' | 'token' | 'page';
  label: string;
  description?: string;
  query?: string; // If set, clicking suggestion fills search with this query
}

export interface SearchWithSuggestionsProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: SearchSuggestion[];
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ICON_MAP = {
  component: <Code2 size={16} />,
  category: <Layers size={16} />,
  token: <Tag size={16} />,
  page: <FileText size={16} />,
};

const LABEL_MAP = {
  component: 'Composant',
  category: 'Catégorie',
  token: 'Token',
  page: 'Page',
};

const COLOR_MAP = {
  component: 'text-primary-800 bg-primary-50',
  category: 'text-secondary-700 bg-secondary-50',
  token: 'text-accent-700 bg-accent-50',
  page: 'text-ink-600 bg-ink-50',
};

/**
 * Premium search input with intelligent autocomplete suggestions.
 * Shows filtered suggestions as user types, with type badges and descriptions.
 */
export const SearchWithSuggestions: React.FC<SearchWithSuggestionsProps> = ({
  value,
  onChange,
  suggestions,
  onSuggestionSelect,
  placeholder = 'Rechercher…',
  size = 'lg',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions by query
  const q = value.trim().toLowerCase();
  const filteredSuggestions = useMemo(() => {
    if (!q) return suggestions.slice(0, 8); // Show first 8 if no query
    return suggestions
      .filter(
        (s) =>
          s.label.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [q, suggestions]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIdx((prev) =>
          prev === null ? 0 : Math.min(prev + 1, filteredSuggestions.length - 1)
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIdx((prev) =>
          prev === null || prev === 0 ? filteredSuggestions.length - 1 : prev - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIdx !== null) {
          handleSuggestionClick(filteredSuggestions[highlightedIdx]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    const query = suggestion.query || suggestion.label;
    onChange(query);
    onSuggestionSelect?.(suggestion);
    setIsOpen(false);
    setHighlightedIdx(null);
  };

  /* Hauteur totale 36 · 44 · 52 (arbitrage n°22) : le champ natif fait la
     hauteur moins les 8 px de la double lunette — 2 × (filet 1 + retrait 2 +
     filet 1). Le padding horizontal vit sur le cœur, pas sur le champ : il
     était compté deux fois. */
  const sizeClasses = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
  };
  const iconSize = { sm: 16, md: 18, lg: 20 }[size];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* ===== OUTER SHELL (Double-Bezel) ===== */}
      <div className="p-0.5 bg-black/5 rounded-xl border border-ink-200">
        {/* ===== INNER CORE ===== */}
        <div className="relative flex items-center gap-stack-xs bg-white rounded-lg border border-ink-100 shadow-[inset_0_1px_1px_white/15] overflow-hidden px-4">
          <SearchIcon
            size={iconSize}
            className="text-ink-500 pointer-events-none flex-shrink-0"
          />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setIsOpen(true);
              setHighlightedIdx(null);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`
              flex-1 bg-transparent border-0
              text-body text-ink-900 placeholder:text-ink-500
              focus:outline-none
              ${sizeClasses[size]}
            `}
          />
        </div>

        {/* ===== SUGGESTIONS DROPDOWN ===== */}
        {isOpen && filteredSuggestions.length > 0 && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Dropdown */}
            <div
              className={`
                absolute top-full left-0 right-0 mt-2 z-50
                bg-white border border-ink-200 rounded-xl
                shadow-lg backdrop-blur-glass-medium
                overflow-hidden
                animate-in fade-in slide-in-from-top-2 duration-300
              `}
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-ink-100">
                <p className="text-caption font-semibold text-ink-600">
                  Suggestions {filteredSuggestions.length > 0 && `(${filteredSuggestions.length})`}
                </p>
              </div>

              {/* Suggestions list */}
              <div className="max-h-96 overflow-y-auto p-2 space-y-0.5">
                {filteredSuggestions.map((suggestion, idx) => (
                  <button
                    key={`${suggestion.type}-${suggestion.id}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`
                      w-full flex items-start gap-stack-xs px-3 py-2 rounded-lg
                      transition-[background-color,color] duration-fast ease-emphasis
                      text-left
                      ${
                        highlightedIdx === idx
                          ? 'bg-primary-50 border border-primary-200'
                          : 'hover:bg-ink-50'
                      }
                    `}
                  >
                    {/* Des <span> : un <button> n'admet que du contenu phrasé
                        (il portait trois <div> et deux <p>, 2026-09-24). Les
                        enfants directs du bouton, flex, sont des blocs ; la
                        description garde son `line-clamp`, qui pose l'affichage. */}
                    {/* Icon */}
                    <span
                      className={`
                        mt-0.5 flex-shrink-0 p-1.5 rounded-md
                        ${COLOR_MAP[suggestion.type]}
                      `}
                    >
                      {ICON_MAP[suggestion.type]}
                    </span>

                    {/* Text content */}
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-stack-xs flex-wrap">
                        <span className="text-body font-semibold text-ink-900 truncate">
                          {suggestion.label}
                        </span>
                        <span className={`text-micro font-medium px-2 py-0.5 rounded-pill whitespace-nowrap ${COLOR_MAP[suggestion.type]}`}>
                          {LABEL_MAP[suggestion.type]}
                        </span>
                      </span>
                      {suggestion.description && (
                        <span className="text-caption text-ink-600 mt-0.5 line-clamp-1">
                          {suggestion.description}
                        </span>
                      )}
                    </span>

                    {/* Keyboard hint */}
                    {highlightedIdx === idx && (
                      <span className="text-caption text-ink-600 ml-2 flex-shrink-0">⏎</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Footer — show if suggestions are truncated */}
              {q && suggestions.length > filteredSuggestions.length && (
                <div className="px-4 py-2.5 border-t border-ink-100 text-caption text-ink-600 text-center">
                  +{suggestions.length - filteredSuggestions.length} résultats supplémentaires
                </div>
              )}
            </div>
          </>
        )}

        {/* ===== EMPTY STATE ===== */}
        {isOpen && q && filteredSuggestions.length === 0 && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Empty dropdown */}
            <div
              className={`
                absolute top-full left-0 right-0 mt-2 z-50
                bg-white border border-ink-200 rounded-xl
                shadow-lg backdrop-blur-glass-medium
                overflow-hidden
                animate-in fade-in slide-in-from-top-2 duration-300
              `}
            >
              <div className="px-4 py-section text-center">
                <p className="text-body text-ink-700">
                  Aucun résultat pour « <strong>{value}</strong> »
                </p>
                <p className="text-caption text-ink-600 mt-1">
                  Essayez un autre terme
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchWithSuggestions;
