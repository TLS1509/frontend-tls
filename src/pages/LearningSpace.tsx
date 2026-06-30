import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, RotateCcw, Grid3x3, Grid2x2,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { CompactFilterPanel } from '../components/patterns/CompactFilterPanel';
import { EmptyState } from '../components/ui/EmptyState';
import { LearningItemCard } from '../components/learning/LearningItemCard';
import { PageShell } from '../components/layout';
import { MOCK_LEARNING_SPACE_ITEMS } from '../data/items';
import { DREYFUS_LABELS } from '../data/competencies';
import type { ItemType, DreyfusLevel } from '../types/learning';
import { canAccessItem, getAccessDenialMessage } from '../lib/access-control';
import { useUserProfileStore, useLessonProgressStore, usePasseportStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';

/* ─── Routing ────────────────────────────────────────────────────────────── */

function resolveItemRoute(item: { type: ItemType; id: string }): string {
  switch (item.type) {
    case 'astuces':        return `/lesson/${item.id}/astuces`;
    case 'flashcard':      return `/lesson/${item.id}/flashcards`;
    case 'video_conc':
    case 'video_geste':    return `/veille/video/${item.id}`;
    case 'ressource':      return `/lesson/${item.id}/complementary`;
    case 'guide':          return `/lesson/${item.id}/complementary`;
    case 'masterclass':    return `/masterclass/${item.id}`;
    case 'micro_learning': return `/lesson/${item.id}/complementary`;
    case 'mission':        return `/project/${item.id}`;
    default:               return '/learning-space';
  }
}

const SEED_COMPLETED_ITEMS = new Set(['item-astuces-1', 'item-ressource-1']);

/* ─── Type groups ────────────────────────────────────────────────────────── */

type TypeGroupId =
  | 'all' | 'astuces' | 'flashcard' | 'guide' | 'ressource' | 'videos' | 'mission' | 'masterclass';

const TYPE_GROUPS: { id: TypeGroupId; label: string; types: ItemType[] | null }[] = [
  { id: 'all',         label: 'Tous les types', types: null },
  { id: 'astuces',     label: 'Astuces',        types: ['astuces'] },
  { id: 'flashcard',   label: 'Flashcards',     types: ['flashcard'] },
  { id: 'guide',       label: 'Guides',         types: ['guide'] },
  { id: 'ressource',   label: 'Ressources',     types: ['ressource', 'micro_learning'] },
  { id: 'videos',      label: 'Vidéos',         types: ['video_conc', 'video_geste'] },
  { id: 'mission',     label: 'Missions',       types: ['mission'] },
  { id: 'masterclass', label: 'Masterclass',    types: ['masterclass'] },
];

/* ─── Duration buckets ───────────────────────────────────────────────────── */

type DurationBucket = 'all' | 'quick' | 'medium' | 'long' | 'mission';

const DURATION_OPTIONS: { id: DurationBucket; label: string }[] = [
  { id: 'all',     label: 'Toutes durées' },
  { id: 'quick',   label: '< 10 min' },
  { id: 'medium',  label: '10–30 min' },
  { id: 'long',    label: '> 30 min' },
  { id: 'mission', label: 'Plurijours' },
];

function matchesDurationBucket(duration: string, bucket: DurationBucket): boolean {
  if (bucket === 'all') return true;
  const lower = duration.toLowerCase();
  if (lower.includes('jour') || lower.includes('semaine')) return bucket === 'mission';
  if (lower.includes('h')) return bucket === 'long';
  const mins = parseInt(lower, 10);
  if (isNaN(mins)) return bucket === 'all';
  if (mins < 10)  return bucket === 'quick';
  if (mins <= 30) return bucket === 'medium';
  return bucket === 'long';
}

/* ─── Level options ──────────────────────────────────────────────────────── */

const LEVEL_OPTIONS = [
  { id: 'all', label: 'Tous niveaux' },
  ...([1, 2, 3, 4, 5] as DreyfusLevel[]).map((l) => ({
    id: String(l),
    label: `D${l} — ${DREYFUS_LABELS[l]}`,
  })),
];

/* ─── Select style ───────────────────────────────────────────────────────── */

/* ─── Component ──────────────────────────────────────────────────────────── */

export const LearningSpace: React.FC = () => {
  const navigate = useNavigate();
  const profileStore = useUserProfileStore();
  const userTier = profileStore.get().subscriptionTier;

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

  /* ─── Filter state ───────────────────────────────────────────────────── */

  const [query, setQuery]         = useState('');
  const [typeGroup, setTypeGroup] = useState<TypeGroupId>('all');
  const [theme, setTheme]         = useState('all');
  const [level, setLevel]         = useState('all');
  const [duration, setDuration]   = useState<DurationBucket>('all');
  const [gridCols, setGridCols] = useState<2 | 4>(4);

  /* ─── Computed ───────────────────────────────────────────────────────── */

  const themeOptions = useMemo(() => {
    const themes = new Set<string>();
    MOCK_LEARNING_SPACE_ITEMS.forEach((item) => {
      if (item.status === 'published') themes.add(item.theme);
    });
    return [
      { id: 'all', label: 'Thématique' },
      ...Array.from(themes).sort().map((t) => ({ id: t, label: t })),
    ];
  }, []);

  const activeTypeTypes: ItemType[] | null = useMemo(() => {
    const g = TYPE_GROUPS.find((g) => g.id === typeGroup);
    return g ? g.types : null;
  }, [typeGroup]);

  const hasActiveFilters =
    typeGroup !== 'all' || theme !== 'all' || level !== 'all' || duration !== 'all' || query.length > 0;

  const filteredItems = useMemo(() => {
    return MOCK_LEARNING_SPACE_ITEMS.filter((item) => {
      if (item.status !== 'published') return false;
      if (activeTypeTypes && !activeTypeTypes.includes(item.type)) return false;
      if (theme !== 'all' && item.theme !== theme) return false;
      if (level !== 'all' && item.dreyfusLevel !== parseInt(level, 10)) return false;
      if (!matchesDurationBucket(item.duration, duration)) return false;
      if (query.trim().length > 0) {
        const q = query.toLowerCase();
        const text = `${item.title} ${item.description} ${item.theme} ${(item.tags ?? []).join(' ')}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [activeTypeTypes, theme, level, duration, query]);

  const resetFilters = () => {
    setQuery('');
    setTypeGroup('all');
    setTheme('all');
    setLevel('all');
    setDuration('all');
  };

  /* ─── Render ─────────────────────────────────────────────────────────── */

  return (
    <PageShell width="page" gap="stack-lg" noPadTop className="relative z-base pt-6 md:pt-8 lg:pt-10">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-tight">
        <h1 className="m-0 font-display text-h2 font-bold text-ink-900 tracking-headline leading-tight">
          Explorez nos ressources
        </h1>
        <p className="m-0 font-body text-body-sm text-ink-500 max-w-2xl">
          Ressources adaptées à ton niveau et tes parcours actuels
        </p>
      </div>

      {/* ── Compact search + filter panel ──────────────────────────────── */}
      <CompactFilterPanel
        query={query}
        onQueryChange={setQuery}
        placeholder="Rechercher par titre, thématique, tag…"
        hasActiveFilters={hasActiveFilters}
        onReset={resetFilters}
        filters={[
          {
            id: 'type',
            label: 'Type',
            multi: false,
            options: TYPE_GROUPS.filter((o) => o.id !== 'all').map((o) => ({ id: o.id, label: o.label })),
            selected: typeGroup === 'all' ? [] : [typeGroup],
            onChange: (ids) => setTypeGroup((ids[0] as TypeGroupId) ?? 'all'),
          },
          {
            id: 'theme',
            label: 'Thématique',
            multi: false,
            options: themeOptions.filter((o) => o.id !== 'all').map((o) => ({ id: o.id, label: o.label })),
            selected: theme === 'all' ? [] : [theme],
            onChange: (ids) => setTheme(ids[0] ?? 'all'),
          },
          {
            id: 'level',
            label: 'Niveau',
            multi: false,
            options: LEVEL_OPTIONS.filter((o) => o.id !== 'all').map((o) => ({ id: o.id, label: o.label })),
            selected: level === 'all' ? [] : [level],
            onChange: (ids) => setLevel(ids[0] ?? 'all'),
          },
          {
            id: 'duration',
            label: 'Durée',
            multi: false,
            options: DURATION_OPTIONS.filter((o) => o.id !== 'all').map((o) => ({ id: o.id, label: o.label })),
            selected: duration === 'all' ? [] : [duration],
            onChange: (ids) => setDuration((ids[0] as DurationBucket) ?? 'all'),
          },
        ]}
      />

      {/* ── Resources grid ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-stack">
        {/* Count + layout toggle (2 col / 4 col) */}
        <div className="flex items-center justify-between gap-stack">
          <span className="text-caption text-ink-500 font-medium">
            {filteredItems.length} ressource{filteredItems.length > 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setGridCols(2)}
              aria-label="Affichage 2 colonnes"
              aria-pressed={gridCols === 2}
              className={[
                'inline-flex items-center justify-center p-1.5 rounded-md transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                gridCols === 2
                  ? 'bg-primary-100 text-primary-600 shadow-xs'
                  : 'bg-white text-ink-400 hover:text-ink-600 hover:bg-ink-50 border border-ink-200',
              ].join(' ')}
            >
              <Grid2x2 size={14} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => setGridCols(4)}
              aria-label="Affichage 4 colonnes"
              aria-pressed={gridCols === 4}
              className={[
                'inline-flex items-center justify-center p-1.5 rounded-md transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                gridCols === 4
                  ? 'bg-primary-100 text-primary-600 shadow-xs'
                  : 'bg-white text-ink-400 hover:text-ink-600 hover:bg-ink-50 border border-ink-200',
              ].join(' ')}
            >
              <Grid3x3 size={14} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Items grid or empty state */}
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={<BookOpen size={32} strokeWidth={1.75} />}
            title="Aucune ressource trouvée"
            description="Essaie d'ajuster tes filtres ou ta recherche."
            actions={
              hasActiveFilters ? (
                <Button variant="secondary" size="sm" leadingIcon={<RotateCcw size={14} />} onClick={resetFilters}>
                  Réinitialiser les filtres
                </Button>
              ) : undefined
            }
          />
        ) : (
          <div className={gridCols === 4 ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-stack' : 'grid grid-cols-1 sm:grid-cols-2 gap-stack-lg'}>
            {filteredItems.map((item) => {
              const accessCheck = canAccessItem(item.tierGate, item.prerequisites, {
                userSubscriptionTier: userTier,
                completedItemIds,
                learnerCompetencyLevels,
              });
              const isAccessible = accessCheck.allowed;
              const denialMessage = getAccessDenialMessage(accessCheck);
              return (
                <LearningItemCard
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  title={item.title}
                  description={item.description}
                  duration={item.duration}
                  dreyfusLevel={item.dreyfusLevel}
                  theme={item.theme}
                  isAccessible={isAccessible}
                  isCompleted={completedItemIds.has(item.id)}
                  denialReason={
                    accessCheck.reason === 'tier'
                      ? 'tier'
                      : accessCheck.reason === 'prerequisite'
                      ? 'prerequisite'
                      : undefined
                  }
                  denialMessage={denialMessage}
                  onClick={isAccessible ? () => navigate(resolveItemRoute(item)) : undefined}
                />
              );
            })}
          </div>
        )}
      </div>
    </PageShell>
  );
};

export default LearningSpace;
