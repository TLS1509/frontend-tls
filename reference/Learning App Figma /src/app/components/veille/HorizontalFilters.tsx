import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X, Filter, SlidersHorizontal } from 'lucide-react';

export interface FiltersState {
  levels: string[];
  types: string[];
  tags: string[];
}

interface HorizontalFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  onReset: () => void;
}

const LEVELS = [
  { id: 'beginner', label: 'Débutant', color: 'var(--success-600)' },
  { id: 'intermediate', label: 'Intermédiaire', color: 'var(--accent)' },
  { id: 'advanced', label: 'Avancé', color: 'var(--secondary)' },
];

const TYPES = [
  { id: 'article', label: 'Article' },
  { id: 'video', label: 'Vidéo' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'tutorial', label: 'Tutoriel' },
  { id: 'research', label: 'Recherche' },
  { id: 'tool', label: 'Outil' },
];

const POPULAR_TAGS = [
  'ChatGPT',
  'Prompting',
  'Pédagogie',
  'Innovation',
  'Formation',
  'IA Générative',
  'Tutoriel',
  'Recherche',
];

export function HorizontalFilters({ filters, onFiltersChange, onReset }: HorizontalFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLevel = (level: string) => {
    const newLevels = filters.levels.includes(level)
      ? filters.levels.filter(l => l !== level)
      : [...filters.levels, level];
    onFiltersChange({ ...filters, levels: newLevels });
  };

  const toggleType = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onFiltersChange({ ...filters, types: newTypes });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFiltersChange({ ...filters, tags: newTags });
  };

  const activeFiltersCount = filters.levels.length + filters.types.length + filters.tags.length;

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
      ref={dropdownRef}
      style={{
        position: 'relative',
        zIndex: 100,
      }}
    >
      {/* Main filters bar */}
      <div
        className="p-4 rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
          position: 'relative',
          zIndex: 100,
        }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left side - Filter dropdowns */}
          <div className="flex items-center gap-3 flex-wrap flex-1">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              <span
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Filtres
              </span>
            </div>

            {/* Niveau Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('levels')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
                style={{
                  background: filters.levels.length > 0 ? 'var(--primary-lighter)' : 'rgba(0, 0, 0, 0.04)',
                  color: filters.levels.length > 0 ? 'var(--primary)' : 'var(--foreground)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  border: filters.levels.length > 0 ? '1px solid var(--primary)' : '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (filters.levels.length === 0) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filters.levels.length === 0) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                  }
                }}
              >
                Niveau
                {filters.levels.length > 0 && (
                  <span
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: '20px',
                      height: '20px',
                      background: 'var(--primary)',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: 'var(--font-weight-bold)',
                    }}
                  >
                    {filters.levels.length}
                  </span>
                )}
                <ChevronDown
                  className="w-4 h-4 transition-transform"
                  style={{ transform: openDropdown === 'levels' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              <AnimatePresence>
                {openDropdown === 'levels' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 p-4 rounded-2xl min-w-[200px]"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                      zIndex: 9999,
                    }}
                  >
                    <div className="space-y-3">
                      {LEVELS.map(level => {
                        const isChecked = filters.levels.includes(level.id);
                        return (
                          <label
                            key={level.id}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <div
                              className="w-5 h-5 rounded-md flex items-center justify-center transition-all"
                              style={{
                                background: isChecked ? level.color : 'rgba(0, 0, 0, 0.08)',
                                border: `2px solid ${isChecked ? level.color : 'transparent'}`,
                              }}
                            >
                              {isChecked && (
                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                  <path
                                    d="M1 5L4.5 8.5L11 1.5"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleLevel(level.id)}
                              className="hidden"
                            />
                            <span
                              className="transition-colors"
                              style={{
                                fontSize: 'var(--text-sm)',
                                color: isChecked ? 'var(--foreground)' : 'var(--muted-foreground)',
                                fontWeight: isChecked ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
                              }}
                            >
                              {level.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Type de contenu Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('types')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
                style={{
                  background: filters.types.length > 0 ? 'var(--secondary-50)' : 'rgba(0, 0, 0, 0.04)',
                  color: filters.types.length > 0 ? 'var(--secondary)' : 'var(--foreground)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  border: filters.types.length > 0 ? '1px solid var(--secondary)' : '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (filters.types.length === 0) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filters.types.length === 0) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                  }
                }}
              >
                Type
                {filters.types.length > 0 && (
                  <span
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: '20px',
                      height: '20px',
                      background: 'var(--secondary)',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: 'var(--font-weight-bold)',
                    }}
                  >
                    {filters.types.length}
                  </span>
                )}
                <ChevronDown
                  className="w-4 h-4 transition-transform"
                  style={{ transform: openDropdown === 'types' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              <AnimatePresence>
                {openDropdown === 'types' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 p-4 rounded-2xl min-w-[200px]"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                      zIndex: 9999,
                    }}
                  >
                    <div className="space-y-3">
                      {TYPES.map(type => {
                        const isChecked = filters.types.includes(type.id);
                        return (
                          <label
                            key={type.id}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <div
                              className="w-5 h-5 rounded-md flex items-center justify-center transition-all"
                              style={{
                                background: isChecked ? 'var(--secondary)' : 'rgba(0, 0, 0, 0.08)',
                                border: `2px solid ${isChecked ? 'var(--secondary)' : 'transparent'}`,
                              }}
                            >
                              {isChecked && (
                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                  <path
                                    d="M1 5L4.5 8.5L11 1.5"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleType(type.id)}
                              className="hidden"
                            />
                            <span
                              style={{
                                fontSize: 'var(--text-sm)',
                                color: isChecked ? 'var(--foreground)' : 'var(--muted-foreground)',
                                fontWeight: isChecked ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
                              }}
                            >
                              {type.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tags Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('tags')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
                style={{
                  background: filters.tags.length > 0 ? 'var(--accent-50)' : 'rgba(0, 0, 0, 0.04)',
                  color: filters.tags.length > 0 ? 'var(--accent)' : 'var(--foreground)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  border: filters.tags.length > 0 ? '1px solid var(--accent)' : '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (filters.tags.length === 0) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filters.tags.length === 0) {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                  }
                }}
              >
                Tags
                {filters.tags.length > 0 && (
                  <span
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: '20px',
                      height: '20px',
                      background: 'var(--accent)',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: 'var(--font-weight-bold)',
                    }}
                  >
                    {filters.tags.length}
                  </span>
                )}
                <ChevronDown
                  className="w-4 h-4 transition-transform"
                  style={{ transform: openDropdown === 'tags' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              <AnimatePresence>
                {openDropdown === 'tags' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 p-4 rounded-2xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                      minWidth: '280px',
                      zIndex: 9999,
                    }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_TAGS.map(tag => {
                        const isActive = filters.tags.includes(tag);
                        return (
                          <motion.button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1.5 rounded-full transition-all"
                            style={{
                              background: isActive ? 'var(--accent)' : 'rgba(0,0,0,0.06)',
                              color: isActive ? 'white' : 'var(--muted-foreground)',
                              fontSize: 'var(--text-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              border: isActive ? 'none' : '1px solid transparent',
                            }}
                          >
                            {tag}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side - Reset button */}
          {activeFiltersCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
              style={{
                background: 'rgba(0, 0, 0, 0.04)',
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                fontWeight: 'var(--font-weight-medium)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
              }}
            >
              <X className="w-4 h-4" />
              Réinitialiser ({activeFiltersCount})
            </motion.button>
          )}
        </div>
      </div>

      {/* Active filters pills */}
      {activeFiltersCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex flex-wrap gap-2"
        >
          {/* Level pills */}
          {filters.levels.map(levelId => {
            const level = LEVELS.find(l => l.id === levelId);
            return (
              <motion.div
                key={`level-${levelId}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: `1.5px solid ${level?.color}`,
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: level?.color,
                }}
              >
                {level?.label}
                <button
                  onClick={() => toggleLevel(levelId)}
                  className="hover:opacity-70 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            );
          })}

          {/* Type pills */}
          {filters.types.map(typeId => {
            const type = TYPES.find(t => t.id === typeId);
            return (
              <motion.div
                key={`type-${typeId}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1.5px solid var(--secondary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--secondary)',
                }}
              >
                {type?.label}
                <button
                  onClick={() => toggleType(typeId)}
                  className="hover:opacity-70 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            );
          })}

          {/* Tag pills */}
          {filters.tags.map(tag => (
            <motion.div
              key={`tag-${tag}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1.5px solid var(--accent)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--accent)',
              }}
            >
              {tag}
              <button
                onClick={() => toggleTag(tag)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}