import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, ChevronDown, Sparkles, RotateCcw, Grid3x3, List,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Search } from '../components/ui/Search';
import { FilterBar } from '../components/forms/FilterBar';
import { EmptyState } from '../components/ui/EmptyState';
import { CardGrid } from '../components/patterns/CardGrid';
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

type TypeGroupId = 'all' | 'videos' | 'guides' | 'astuces' | 'missions' | 'masterclass';

const TYPE_GROUPS: { id: TypeGroupId; label: string; types: ItemType[] | null }[] = [
  { id: 'all',         label: 'Tout',               types: null },
  { id: 'videos',      label: 'Vidéos',             types: ['video_conc', 'video_geste'] },
  { id: 'guides',      label: 'Guides & Ressources', types: ['guide', 'ressource', 'micro_learning'] },
  { id: 'astuces',     label: 'Astuces & Flash',    types: ['astuces', 'flashcard'] },
  { id: 'missions',    label: 'Missions',           types: ['mission'] },
  { id: 'masterclass', label: 'Masterclass',        types: ['masterclass'] },
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

const SELECT_CLS =
  'appearance-none h-8 pl-3 pr-7 bg-white border border-ink-200 rounded-lg text-micro text-ink-700 font-medium cursor-pointer focus:outline-none focus:border-primary-400 transition-colors duration-base hover:border-ink-300';

const SELECT_ACTIVE_CLS =
  'border-primary-400 bg-primary-50 text-primary-700';

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
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

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

  const typeFilterOptions = TYPE_GROUPS.map((g) => ({ id: g.id, label: g.label }));

  /* ─── Render ─────────────────────────────────────────────────────────── */

  return (
    <PageShell width="page" className="relative z-base gap-5 pt-2 pb-2" noPadTop>

      {/* ── Breadcrumb context ──────────────────────────────────────────── */}
      <div className="flex items-center gap-1.5 px-4 sm:px-6 lg:px-10 text-micro text-ink-400 font-medium">
        <span>📚 Parcours</span>
        <span>·</span>
        <span>📍 Étape</span>
        <span>·</span>
        <span>📖 Leçon</span>
      </div>

      {/* ── Page header + search — on same surface as content ────────────── */}
      <div className="flex flex-col gap-5">

        {/* Title row */}
        <div className="flex items-start justify-between gap-stack">
          <div className="flex flex-col gap-tight">
            <span className="inline-flex items-center gap-1.5 text-micro font-bold text-ink-400 uppercase tracking-[0.08em]">
              <BookOpen size={11} aria-hidden />
              Espace Apprentissage
            </span>
            <h1 className="m-0 font-display text-h2 font-bold text-ink-900 tracking-headline leading-tight">
              Explorez nos ressources
            </h1>
          </div>
          <span className="text-body-sm text-ink-400 font-medium pt-1 shrink-0 tabular-nums">
            {filteredItems.length} ressource{filteredItems.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Search + filters — same surface, default variant */}
        <Search
          variant="default"
          size="default"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par titre, thématique, tag…"
          aria-label="Rechercher un contenu"
          trailing={
            hasActiveFilters ? (
              <Button
                variant="secondary"
                size="sm"
                leadingIcon={<RotateCcw size={11} />}
                onClick={resetFilters}
              >
                Réinitialiser
              </Button>
            ) : undefined
          }
          filtersSlot={
            <div className="flex items-center gap-2 flex-wrap">
              {/* Type filter pills */}
              <FilterBar
                options={typeFilterOptions}
                selected={[typeGroup]}
                onChange={(ids) => setTypeGroup((ids[0] ?? 'all') as TypeGroupId)}
                multiSelect={false}
                variant="solid"
                tone="brand"
                size="sm"
                showClearAll={false}
              />

              <span className="w-px h-4 bg-ink-200 shrink-0 hidden sm:block" aria-hidden />

              {/* Theme select */}
              <div className="relative shrink-0">
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  aria-label="Filtrer par thématique"
                  className={[SELECT_CLS, theme !== 'all' ? SELECT_ACTIVE_CLS : ''].join(' ')}
                >
                  {themeOptions.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" aria-hidden />
              </div>

              {/* Level select */}
              <div className="relative shrink-0">
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  aria-label="Filtrer par niveau"
                  className={[SELECT_CLS, level !== 'all' ? SELECT_ACTIVE_CLS : ''].join(' ')}
                >
                  {LEVEL_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" aria-hidden />
              </div>

              {/* Duration select */}
              <div className="relative shrink-0">
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value as DurationBucket)}
                  aria-label="Filtrer par durée"
                  className={[SELECT_CLS, duration !== 'all' ? SELECT_ACTIVE_CLS : ''].join(' ')}
                >
                  {DURATION_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" aria-hidden />
              </div>
            </div>
          }
        />
      </div>

      {/* ── Divider → Content grid separator ─────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-stack pb-stack">
        <div className="h-px bg-ink-100" />
      </div>

      {/* ── Display mode toggle + count ─────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-stack pb-stack">
        <span className="text-body-sm text-ink-500 font-medium">
          {filteredItems.length} résultat{filteredItems.length !== 1 ? 's' : ''}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDisplayMode('grid')}
            aria-label="Affichage grille"
            className={[
              'inline-flex items-center justify-center p-2 rounded-lg transition-all duration-base',
              displayMode === 'grid'
                ? 'bg-primary-100 text-primary-600 shadow-xs'
                : 'bg-white text-ink-400 hover:text-ink-600 hover:bg-ink-50',
            ].join(' ')}
          >
            <Grid3x3 size={16} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode('list')}
            aria-label="Affichage liste"
            className={[
              'inline-flex items-center justify-center p-2 rounded-lg transition-all duration-base',
              displayMode === 'list'
                ? 'bg-primary-100 text-primary-600 shadow-xs'
                : 'bg-white text-ink-400 hover:text-ink-600 hover:bg-ink-50',
            ].join(' ')}
          >
            <List size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ── Smart Recommendations section (bonus feature) ─────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 mb-section">
        <div className="flex items-center justify-between gap-stack">
          <h2 className="m-0 font-display text-h4 font-bold text-ink-900">
            Pour toi maintenant
          </h2>
          <a href="#" className="text-caption font-medium text-primary-600 hover:text-primary-700 transition-colors">
            Voir plus →
          </a>
        </div>
        <p className="m-0 font-body text-body-sm text-ink-500 mt-tight mb-stack">
          Ressources adaptées à ton niveau et tes parcours actuels
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack">
          {filteredItems.slice(0, 4).map((item) => {
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
      </div>

      {/* ── Divider before full discovery grid ──────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 border-t border-ink-100 pt-section" />

      {/* ── "Découvrir" section title ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <h2 className="m-0 font-display text-h4 font-bold text-ink-900">
          Découvrir
        </h2>
        <p className="m-0 font-body text-body-sm text-ink-500 mt-tight mb-stack">
          Parcourez toutes nos ressources d'apprentissage
        </p>
      </div>

      {/* ── Content grid ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        {filteredItems.length === 0 ? (
          <EmptyState
            tone="primary"
            icon={<Sparkles size={32} />}
            title="Aucun contenu trouvé"
            description="Essayez d'élargir vos filtres ou de modifier votre recherche."
            actions={
              <Button variant="secondary" size="sm" leadingIcon={<RotateCcw size={12} />} onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            }
          />
        ) : displayMode === 'list' ? (
          <div className="flex flex-col gap-stack" aria-label="Contenus d'apprentissage — Affichage liste">
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
        ) : (
          <CardGrid layout="default" gapSize="stack" aria-label="Contenus d'apprentissage — Affichage grille">
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
          </CardGrid>
        )}
      </div>
    </PageShell>
  );
};

export default LearningSpace;
