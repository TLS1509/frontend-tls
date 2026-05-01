import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X, Filter } from 'lucide-react';

export interface FiltersState {
  levels: string[];
  types: string[];
  tags: string[];
}

interface AdvancedFiltersProps {
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

export function AdvancedFilters({ filters, onFiltersChange, onReset }: AdvancedFiltersProps) {
  const [expandedSections, setExpandedSections] = useState(['levels', 'types', 'tags']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-3xl sticky top-6"
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" style={{ color: 'var(--primary)' }} />
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
            }}
          >
            Filtres
          </h3>
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200"
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X className="w-4 h-4" />
            Réinitialiser
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="space-y-4">
        {/* Niveau */}
        <div>
          <button
            onClick={() => toggleSection('levels')}
            className="w-full flex items-center justify-between py-2"
          >
            <span
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
              }}
            >
              Niveau
            </span>
            <motion.div
              animate={{ rotate: expandedSections.includes('levels') ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedSections.includes('levels') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-2 space-y-2">
                  {LEVELS.map(level => {
                    const isChecked = filters.levels.includes(level.id);
                    return (
                      <label
                        key={level.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleLevel(level.id)}
                            className="w-4 h-4 rounded cursor-pointer"
                            style={{
                              accentColor: level.color,
                            }}
                          />
                        </div>
                        <span
                          className="transition-colors"
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: isChecked ? 'var(--foreground)' : 'var(--muted-foreground)',
                            fontWeight: isChecked ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
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

        {/* Type de contenu */}
        <div>
          <button
            onClick={() => toggleSection('types')}
            className="w-full flex items-center justify-between py-2"
          >
            <span
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
              }}
            >
              Type de contenu
            </span>
            <motion.div
              animate={{ rotate: expandedSections.includes('types') ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedSections.includes('types') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-2 space-y-2">
                  {TYPES.map(type => {
                    const isChecked = filters.types.includes(type.id);
                    return (
                      <label
                        key={type.id}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleType(type.id)}
                          className="w-4 h-4 rounded cursor-pointer"
                          style={{
                            accentColor: 'var(--primary)',
                          }}
                        />
                        <span
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: isChecked ? 'var(--foreground)' : 'var(--muted-foreground)',
                            fontWeight: isChecked ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
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

        {/* Tags populaires */}
        <div>
          <button
            onClick={() => toggleSection('tags')}
            className="w-full flex items-center justify-between py-2"
          >
            <span
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
              }}
            >
              Tags populaires
            </span>
            <motion.div
              animate={{ rotate: expandedSections.includes('tags') ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedSections.includes('tags') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-3 flex flex-wrap gap-2">
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
                          background: isActive ? 'var(--primary-lighter)' : 'rgba(0,0,0,0.05)',
                          color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          border: isActive ? '1px solid var(--primary)' : '1px solid transparent',
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

      {/* Active filters count */}
      {activeFiltersCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 pt-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div
            className="px-3 py-2 rounded-lg text-center"
            style={{
              background: 'var(--primary-lighter)',
            }}
          >
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--primary)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              {activeFiltersCount} filtre{activeFiltersCount > 1 ? 's' : ''} actif{activeFiltersCount > 1 ? 's' : ''}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
