import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Clock,
  Flame,
  Search,
  Play,
  Video,
  Headphones,
  FileText,
  Map,
  Calendar,
  Users,
  Star,
  ChevronRight,
  Layers,
  Lock,
} from 'lucide-react';
import {
  Card,
  CardTitle,
  CardDesc,
  Button,
  Badge,
  ProgressBar,
} from '../components';
import { Search as SearchInput } from '../components/ui/Search';
import { StatCard } from '../components/ui/StatCard';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { FilterBar, type FilterBarOption } from '../components/forms/FilterBar';
import { MOCK_LEARNING_SPACE_ITEMS, ITEM_TYPE_LABELS } from '../data/items';
import { DREYFUS_LABELS } from '../data/competencies';
import type { ItemType, DreyfusLevel, SubscriptionTier } from '../types/learning';
import { canAccessItem, getAccessDenialMessage, getGatingType } from '../lib/access-control';
import { useUserProfileStore, useLessonProgressStore, usePasseportStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';

/** Demo seed — items pré-marqués complétés tant que le tracking item-level n'est pas en place. */
const SEED_COMPLETED_ITEMS = new Set(['item-1', 'item-4']);

/* ─── Item icon mapping by type ──────────────────────────────────────── */

const ITEM_TYPE_ICONS: Record<ItemType, React.ReactNode> = {
  astuces: <Flame size={18} className="text-accent-400" />,
  flashcard: <Star size={18} className="text-primary-500" />,
  ressource: <FileText size={18} className="text-primary-500" />,
  guide: <Map size={18} className="text-primary-500" />,
  video_conc: <Video size={18} className="text-primary-500" />,
  video_geste: <Play size={18} className="text-primary-500" />,
  micro_learning: <BookOpen size={18} className="text-primary-500" />,
  mission: <Users size={18} className="text-warm-500" />,
  masterclass: <Star size={18} className="text-sun-500" />,
};

const ITEM_TYPE_TONE: Record<ItemType, 'brand' | 'warm' | 'sun' | 'success' | 'danger'> = {
  astuces: 'sun',
  flashcard: 'brand',
  ressource: 'brand',
  guide: 'success',
  video_conc: 'brand',
  video_geste: 'warm',
  micro_learning: 'brand',
  mission: 'warm',
  masterclass: 'sun',
};

const FormatChip: React.FC<{ label: string; icon?: React.ReactNode }> = ({ label, icon }) => (
  <span className="inline-flex items-center gap-1 px-2 py-1 bg-ink-50 border border-ink-200 rounded-pill text-caption text-ink-500 font-medium">
    {icon}
    {label}
  </span>
);

/* ─── Filter helpers ─────────────────────────────────────────────── */

function getUniqueThemes(): string[] {
  const themes = new Set<string>();
  MOCK_LEARNING_SPACE_ITEMS.forEach((item) => {
    if (item.status === 'published') themes.add(item.theme);
  });
  return Array.from(themes).sort();
}

function getUniqueDurations(): string[] {
  const durations = new Set<string>();
  MOCK_LEARNING_SPACE_ITEMS.forEach((item) => {
    if (item.status === 'published') durations.add(item.duration);
  });
  return Array.from(durations).sort();
}

export const LearningSpace: React.FC = () => {
  const profileStore = useUserProfileStore();
  const userTier = profileStore.get().subscriptionTier;

  // Phase 16.1 #2 — wire access control context to real stores.
  // Competency levels read from usePasseportStore so canAccessItem() matches the
  // learner's actual radar. Lesson progress feeds item completion (best-effort —
  // item-level completion store TBD).
  const lessonsMap = useLessonProgressStore((s) => s.lessons);
  const passeportStore = usePasseportStore();
  const learnerCompetencyLevels = useMemo(() => {
    const map: Record<string, DreyfusLevel> = {};
    passeportStore.getCompetencies(MOCK_USER_ID).forEach((c) => {
      map[c.competenceId] = c.currentLevel;
    });
    return map;
  }, [passeportStore]);
  const completedItemIds = useMemo(() => {
    const ids = new Set<string>(SEED_COMPLETED_ITEMS);
    Object.entries(lessonsMap).forEach(([lessonId, entry]) => {
      if (entry.totalSections > 0 && entry.completed.length >= entry.totalSections) {
        ids.add(lessonId);
      }
    });
    return ids;
  }, [lessonsMap]);

  const [query, setQuery] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ItemType[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<DreyfusLevel[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(['published']);

  /* ─── Filter options ───────────────────────────────────────────────── */

  const themeOptions = useMemo(() => {
    const themes = getUniqueThemes();
    return themes.map((theme) => {
      const count = MOCK_LEARNING_SPACE_ITEMS.filter(
        (item) => item.theme === theme && item.status === 'published'
      ).length;
      return {
        id: theme,
        label: theme,
        count,
      };
    });
  }, []);

  const typeOptions = useMemo(() => {
    const types: ItemType[] = ['astuces', 'flashcard', 'ressource', 'guide', 'video_conc', 'video_geste', 'micro_learning', 'mission', 'masterclass'];
    return types.map((type) => {
      const count = MOCK_LEARNING_SPACE_ITEMS.filter(
        (item) => item.type === type && item.status === 'published'
      ).length;
      return {
        id: type,
        label: ITEM_TYPE_LABELS[type],
        count,
      };
    });
  }, []);

  const durationOptions = useMemo(() => {
    const durations = getUniqueDurations();
    return durations.map((duration) => {
      const count = MOCK_LEARNING_SPACE_ITEMS.filter(
        (item) => item.duration === duration && item.status === 'published'
      ).length;
      return {
        id: duration,
        label: duration,
        count,
      };
    });
  }, []);

  const levelOptions = useMemo(() => {
    return [1, 2, 3, 4, 5].map((level) => {
      const dreyfusLevel = level as DreyfusLevel;
      const count = MOCK_LEARNING_SPACE_ITEMS.filter(
        (item) => item.dreyfusLevel === dreyfusLevel && item.status === 'published'
      ).length;
      return {
        id: String(level),
        label: `${DREYFUS_LABELS[dreyfusLevel]} (D${level})`,
        count,
      };
    });
  }, []);

  /* ─── Filtered items ───────────────────────────────────────────────── */

  const filteredItems = useMemo(() => {
    return MOCK_LEARNING_SPACE_ITEMS.filter((item) => {
      // Status filter (always include this)
      if (!selectedStatus.includes(item.status)) return false;

      // Theme filter
      if (selectedThemes.length > 0 && !selectedThemes.includes(item.theme)) return false;

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(item.type)) return false;

      // Duration filter
      if (selectedDurations.length > 0 && !selectedDurations.includes(item.duration)) return false;

      // Level filter
      if (selectedLevels.length > 0 && !selectedLevels.includes(item.dreyfusLevel)) return false;

      // Search query (title + description + theme + tags)
      if (query.length > 0) {
        const searchLower = query.toLowerCase();
        const searchableText = `${item.title} ${item.description} ${item.theme} ${(item.tags || []).join(' ')}`.toLowerCase();
        if (!searchableText.includes(searchLower)) return false;
      }

      return true;
    });
  }, [query, selectedThemes, selectedTypes, selectedDurations, selectedLevels, selectedStatus]);

  /* ─── Handlers ───────────────────────────────────────────────────── */

  const handleThemeChange = (selected: string[]) => {
    setSelectedThemes(selected);
  };

  const handleTypeChange = (selected: string[]) => {
    setSelectedTypes(selected as ItemType[]);
  };

  const handleDurationChange = (selected: string[]) => {
    setSelectedDurations(selected);
  };

  const handleLevelChange = (selected: string[]) => {
    setSelectedLevels(selected.map((id) => parseInt(id) as DreyfusLevel));
  };

  const handleClearAllFilters = () => {
    setSelectedThemes([]);
    setSelectedTypes([]);
    setSelectedDurations([]);
    setSelectedLevels([]);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">

        {/* ── Hero ────────────────────────────────────────────── */}
        <EditorialHero
          tone="brand"
          eyebrow={{ icon: <BookOpen size={12} />, label: 'Espace Apprentissage' }}
          title="Explorez nos ressources"
          summary="Retrouvez tous les contenus disponibles : parcours, vidéos, guides, missions et bien plus encore."
        />

        {/* ── Search + KPI row ───────────────────────────────── */}
        <section aria-label="Recherche et indicateurs" className="flex flex-col gap-stack-lg">
          <SearchInput
            placeholder="Rechercher par titre, thématique ou compétence…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
            <StatCard
              tone="brand"
              surface="tinted"
              size="sm"
              icon={<BookOpen size={18} />}
              label="Contenus disponibles"
              value={String(filteredItems.length)}
            />
            <StatCard
              tone="warm"
              surface="tinted"
              size="sm"
              icon={<Layers size={18} />}
              label="Types de contenu"
              value="9"
            />
            <StatCard
              tone="sun"
              surface="tinted"
              size="sm"
              icon={<Flame size={18} />}
              label="Niveaux"
              value="D1–D5"
            />
          </div>
        </section>

        {/* ── Filters ──────────────────────────────────────────── */}
        <section aria-label="Filtres de contenu" className="flex flex-col gap-stack">
          <h3 className="text-h4 font-bold text-ink-900 m-0">Filtrer par :</h3>

          <div className="flex flex-col gap-stack">
            {/* Thématique filter */}
            <div>
              <p className="text-caption font-semibold text-ink-700 mb-2">Thématique</p>
              <FilterBar
                options={themeOptions}
                selected={selectedThemes}
                onChange={handleThemeChange}
                tone="brand"
                size="sm"
              />
            </div>

            {/* Type filter */}
            <div>
              <p className="text-caption font-semibold text-ink-700 mb-2">Type de contenu</p>
              <FilterBar
                options={typeOptions}
                selected={selectedTypes as string[]}
                onChange={handleTypeChange}
                tone="warm"
                size="sm"
              />
            </div>

            {/* Duration filter */}
            <div>
              <p className="text-caption font-semibold text-ink-700 mb-2">Durée</p>
              <FilterBar
                options={durationOptions}
                selected={selectedDurations}
                onChange={handleDurationChange}
                tone="sun"
                size="sm"
              />
            </div>

            {/* Niveau filter */}
            <div>
              <p className="text-caption font-semibold text-ink-700 mb-2">Niveau</p>
              <FilterBar
                options={levelOptions}
                selected={selectedLevels.map(String)}
                onChange={handleLevelChange}
                tone="brand"
                size="sm"
              />
            </div>

            {/* Clear all button */}
            {(selectedThemes.length > 0 ||
              selectedTypes.length > 0 ||
              selectedDurations.length > 0 ||
              selectedLevels.length > 0 ||
              query.length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAllFilters}
              >
                Réinitialiser tous les filtres
              </Button>
            )}
          </div>
        </section>

        {/* ── Items grid ───────────────────────────────────────── */}
        <section aria-label="Contenus" className="flex flex-col gap-stack">
          {filteredItems.length === 0 ? (
            <div className="text-center py-section">
              <p className="text-body text-ink-600">Aucun contenu ne correspond à vos filtres.</p>
              <Button variant="ghost" onClick={handleClearAllFilters} className="mt-stack">
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack">
              {filteredItems.map((item) => {
                const accessCheck = canAccessItem(item.tierGate, item.prerequisites, {
                  userSubscriptionTier: userTier,
                  completedItemIds,
                  learnerCompetencyLevels,
                });
                const gatingType = getGatingType(item.tierGate, item.prerequisites);
                const isAccessible = accessCheck.allowed;
                const denialMessage = getAccessDenialMessage(accessCheck);

                return (
                  <Card
                    key={item.id}
                    variant="interactive"
                    as="article"
                    className={!isAccessible ? 'opacity-60 cursor-not-allowed' : ''}
                  >
                    <div className="p-5 flex flex-col gap-3 h-full">
                      {/* Type badge + icon */}
                      <div className="flex items-center justify-between">
                        <Badge variant={ITEM_TYPE_TONE[item.type]}>
                          {ITEM_TYPE_LABELS[item.type]}
                        </Badge>
                        <div className={isAccessible ? 'text-primary-500' : 'text-ink-300'}>
                          {ITEM_TYPE_ICONS[item.type]}
                        </div>
                      </div>

                      {/* Title */}
                      <CardTitle className="text-body font-semibold mt-2">
                        {item.title}
                      </CardTitle>

                      {/* Description */}
                      <CardDesc className="flex-1">
                        {item.description}
                      </CardDesc>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-2">
                        <FormatChip label={item.duration} icon={<Clock size={11} />} />
                        <FormatChip label={`D${item.dreyfusLevel}`} icon={<Star size={11} />} />
                        <FormatChip label={item.theme} icon={<Layers size={11} />} />
                      </div>

                      {/* Access gating badges */}
                      {!isAccessible && (
                        <Badge
                          variant={
                            accessCheck.reason === 'tier' ? 'warning' : 'info'
                          }
                          size="sm"
                          className="mt-auto flex items-center gap-1"
                          title={denialMessage}
                        >
                          <Lock size={12} />
                          {accessCheck.reason === 'tier'
                            ? 'Upgrade abonnement'
                            : 'Pré-requis'}
                        </Badge>
                      )}

                      {/* CTA */}
                      <Button
                        size="sm"
                        className="mt-auto w-full"
                        disabled={!isAccessible}
                        title={!isAccessible ? denialMessage : undefined}
                      >
                        {isAccessible ? 'Accéder' : 'Verrouillé'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
