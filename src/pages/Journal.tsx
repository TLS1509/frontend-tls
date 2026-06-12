import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJournalStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import type { JournalEntryType } from '../types/learning';
import { Card } from '../components/core/Card';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';
import { Search } from '../components/ui/Search';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { JournalBubbleCard } from '../components/cards/JournalBubbleCard';
import type { JournalBubbleType } from '../components/cards/JournalBubbleCard';
import { JournalChatCompose } from '../components/ui/JournalChatCompose';
import { PageShell } from '../components/layout';
import {
  PenSquare,
  Sparkles,
  X,
  SlidersHorizontal,
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────────── */

type PeriodFilter = 'all' | 'week' | 'month' | '3months';
type TypeFilter = 'all' | JournalBubbleType;

interface JournalEntry {
  id: string;
  type: JournalBubbleType;
  title: string;
  excerpt: string;
  date: string;
  dateMs: number;
  readingTime: string;
  tags: string[];
}

/* ─── Style maps: Tailwind only ─────────────────────────────────────────── */

/* ─── Store → display mapping ────────────────────────────────────────────── */

// Computed inside useMemo — see filteredEntries below.

const SPEC_TO_DISPLAY: Record<JournalEntryType, JournalBubbleType> = {
  'reflexion-libre':  'free',
  'apprentissage':    'learning',
  'pratique-pro':     'guided',
  'session-coaching': 'coaching',
  'moment-eureka':    'insight',
};

/* ─── Filter config ──────────────────────────────────────────────────────── */

const TYPE_FILTERS: { key: TypeFilter; label: string; emoji?: string }[] = [
  { key: 'all',           label: 'Toutes' },
  { key: 'guided',        label: 'Guidé',         emoji: '🧭' },
  { key: 'free',          label: 'Libre',          emoji: '✍️' },
  { key: 'learning',      label: 'Apprentissage',  emoji: '📖' },
  { key: 'coaching',      label: 'Coaching',       emoji: '🎯' },
  { key: 'insight',       label: 'Insight',        emoji: '💡' },
  { key: 'questionnaire', label: 'Questionnaire',  emoji: '📋' },
  { key: 'compte-rendu',  label: 'Compte rendu',   emoji: '📊' },
];

const PERIOD_FILTERS: { key: PeriodFilter; label: string }[] = [
  { key: 'all',      label: 'Toute période' },
  { key: 'week',     label: 'Cette semaine' },
  { key: 'month',    label: 'Ce mois' },
  { key: '3months',  label: '3 mois' },
];

const PERIOD_MS: Record<PeriodFilter, number> = {
  all: 0, week: 7 * 86_400_000, month: 30 * 86_400_000, '3months': 90 * 86_400_000,
};

/* ─── Main page ──────────────────────────────────────────────────────────── */

export const Journal: React.FC = () => {
  const navigate = useNavigate();
  const journalStore = useJournalStore();
  const [typeFilter,   setTypeFilter]   = useState<TypeFilter>('all');
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all');
  const [searchQuery,  setSearchQuery]  = useState('');

  const storeEntries = journalStore.getEntries(MOCK_USER_ID);

  const ENTRIES: JournalEntry[] = useMemo(() => storeEntries.map((e) => ({
    id: e.id,
    type: SPEC_TO_DISPLAY[e.type] ?? 'free',
    title: e.title,
    excerpt: e.body.length > 200 ? e.body.slice(0, 200) + '…' : e.body,
    date: new Date(e.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    dateMs: new Date(e.createdAt).getTime(),
    readingTime: `${Math.max(1, Math.ceil(e.body.split(' ').length / 200))} min`,
    tags: e.tags ?? [],
  })), [storeEntries]);

  const filteredEntries = useMemo(() => {
    const now = Date.now();
    const cutoff = PERIOD_MS[periodFilter] > 0 ? now - PERIOD_MS[periodFilter] : 0;
    const q = searchQuery.trim().toLowerCase();
    return ENTRIES.filter((e) => {
      const matchType   = typeFilter === 'all' || e.type === typeFilter;
      const matchPeriod = cutoff === 0 || e.dateMs >= cutoff;
      const matchSearch = q === '' || e.title.toLowerCase().includes(q) || e.excerpt.toLowerCase().includes(q) || e.tags.some((t) => t.toLowerCase().includes(q));
      return matchType && matchPeriod && matchSearch;
    });
  }, [ENTRIES, typeFilter, periodFilter, searchQuery]);

  const hasActiveFilter = typeFilter !== 'all' || periodFilter !== 'all' || searchQuery !== '';

  /* Compose state: quick-prompt chat input qui s'expand. */
  const [composeText, setComposeText] = useState('');

  /* Filters panel collapsible: hidden par défaut, toggle via icon button trailing du Search. */
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilterCount =
    (typeFilter !== 'all' ? 1 : 0) + (periodFilter !== 'all' ? 1 : 0);

  /* Types user-initiables (les 4 disponibles depuis la section "Compose new entry").
     Coaching/Questionnaire/Compte-rendu sont system-generated depuis le flow coaching. */
  const COMPOSE_TYPES: { type: JournalBubbleType; emoji: string; label: string; tone: 'brand' | 'warm' | 'sun'; subtitle: string }[] = [
    { type: 'guided',       emoji: '🧭', label: 'Guidé',         tone: 'brand', subtitle: 'Questions structurées' },
    { type: 'free',         emoji: '✍️', label: 'Libre',          tone: 'brand', subtitle: 'Écris comme tu veux' },
    { type: 'insight',      emoji: '💡', label: 'Insight',        tone: 'sun',   subtitle: 'Une prise de conscience' },
    { type: 'learning',     emoji: '📖', label: 'Apprentissage',  tone: 'warm',  subtitle: 'Notes post-leçon' },
  ];

  const TONE_BG: Record<'brand' | 'warm' | 'sun', string> = {
    brand: 'bg-primary-50 hover:bg-primary-100 border-primary-100 hover:border-primary-300',
    warm:  'bg-secondary-50 hover:bg-secondary-100 border-secondary-100 hover:border-secondary-300',
    sun:   'bg-accent-50 hover:bg-accent-100 border-accent-100 hover:border-accent-300',
  };

  const handleComposeSubmit = () => {
    if (composeText.trim().length > 0) {
      // Pass text via query param (URLEncoded): picked up by NewEntry page
      navigate(`/journal/new-entry?type=free&draft=${encodeURIComponent(composeText)}`);
    } else {
      navigate('/journal/new-entry?type=free');
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-gradient-page-ambient flex flex-col">
      <PageShell width="page" noPadTop>

        {/* Hero: EditorialHero brand standalone (sans trailing) */}
        <EditorialHero
          tone="brand"
          eyebrow={{ icon: <Sparkles size={12} />, label: 'Mon apprentissage' }}
          title="Journal d'apprentissage"
          summary="Capitalise tes prises de conscience, structure tes réflexions et suis ta progression."
        />

        {/* ⭐ Compose new entry: section engageante avec :
            (1) chat-style prompt input qui ouvre NewEntry en mode 'free' avec draft pré-rempli
            (2) 4 emoji buttons (types user-initiables) pour démarrer un format spécifique */}
        <section aria-label="Nouvelle entrée" className="flex flex-col gap-stack-lg">
          <SectionHeader
            variant="default"
            size="md"
            tone="primary"
            icon={<PenSquare size={20} />}
            title="Quoi écrire aujourd'hui ?"
            subtitle="Démarre une entrée libre ou choisis un format guidé"
          />

          {/* Chat-style prompt card */}
          <JournalChatCompose
            value={composeText}
            onChange={setComposeText}
            onSubmit={handleComposeSubmit}
          />

          {/* Or pick a guided format: 4 emoji buttons */}
          <div className="flex flex-col gap-stack-xs">
            <span className="font-body text-caption text-ink-500">Ou choisis un format guidé :</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-stack">
              {COMPOSE_TYPES.map((t) => (
                <button
                  key={t.type}
                  type="button"
                  onClick={() => navigate(`/journal/new-entry?type=${t.type}`)}
                  className={[
                    'group flex flex-col items-center justify-center gap-tight p-stack rounded-2xl border-2 text-center cursor-pointer',
                    'transition-all duration-base hover:-translate-y-0.5 hover:shadow-md',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    TONE_BG[t.tone],
                  ].join(' ')}
                >
                  <span className="text-h2 leading-none transition-transform group-hover:scale-110 select-none" aria-hidden="true">{t.emoji}</span>
                  <span className="font-display text-body-sm font-bold text-ink-900 leading-tight">{t.label}</span>
                  <span className="font-body text-caption text-ink-600 leading-tight">{t.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Toolbar compacte: Search size="sm" avec icon button "filters" trailing.
            Panel filtres collapsible (caché par défaut, toggle via icon). */}
        <div className="flex flex-col gap-stack-xs">
          <Search
            variant="filled"
            placeholder="Rechercher titre, thème, tag…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            trailing={
              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                aria-expanded={filtersOpen}
                aria-label={`${filtersOpen ? 'Masquer' : 'Afficher'} les filtres${activeFilterCount > 0 ? ` (${activeFilterCount} actifs)` : ''}`}
                className={[
                  'relative inline-flex items-center justify-center w-9 h-9 rounded-md border cursor-pointer transition-all',
                  filtersOpen || activeFilterCount > 0
                    ? 'bg-primary-500 border-primary-500 text-white hover:bg-primary-600'
                    : 'bg-white border-ink-200 text-ink-600 hover:bg-ink-50 hover:border-ink-300',
                ].join(' ')}
              >
                <SlidersHorizontal size={16} strokeWidth={2.25} />
                {activeFilterCount > 0 && !filtersOpen && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent-500 text-white text-[10px] font-bold border border-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            }
          />

          {/* Filters collapsible panel */}
          {filtersOpen && (
            <Card className="p-stack flex flex-col gap-stack shadow-sm animate-[filterIn_0.18s_ease_both]">
              <div className="flex flex-col gap-stack-xs">
                <span className="font-body text-caption font-medium text-ink-500">Période</span>
                <div className="flex gap-stack-xs flex-wrap" role="group" aria-label="Filtrer par période">
                  {PERIOD_FILTERS.map(({ key, label }) => (
                    <FilterChip
                      key={key}
                      label={label}
                      active={periodFilter === key}
                      onClick={() => setPeriodFilter(key)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-stack-xs">
                <span className="font-body text-caption font-medium text-ink-500">Type d'entrée</span>
                <div className="flex gap-stack-xs flex-wrap" role="group" aria-label="Filtrer par type">
                  {TYPE_FILTERS.map(({ key, label, emoji }) => (
                    <FilterChip
                      key={key}
                      label={label}
                      icon={emoji ? <span aria-hidden="true">{emoji}</span> : undefined}
                      active={typeFilter === key}
                      onClick={() => setTypeFilter(key)}
                    />
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Active filter result count */}
        {hasActiveFilter && (
          <div className="flex items-center justify-between px-5 py-3 bg-primary-50 border border-primary-100 rounded-lg shadow-xs">
            <span className="font-body text-body-sm text-primary-700 font-medium">
              {filteredEntries.length} entrée{filteredEntries.length > 1 ? 's' : ''} trouvée{filteredEntries.length > 1 ? 's' : ''}
            </span>
            <button
              onClick={() => { setTypeFilter('all'); setPeriodFilter('all'); setSearchQuery(''); }}
              className="inline-flex items-center gap-1 font-body text-caption text-primary-600 hover:text-primary-700 font-semibold bg-transparent border-0 cursor-pointer transition-colors"
            >
              <X size={12} /> Réinitialiser
            </button>
          </div>
        )}

        {/* Entries */}
        {filteredEntries.length === 0 ? (
          <EmptyState
            icon={<Sparkles size={32} />}
            title="Aucune entrée trouvée"
            description="Essayez d'élargir votre recherche ou de créer une nouvelle entrée depuis les tiles ci-dessus."
          />
        ) : (
          <div className="flex flex-col gap-stack">
            {filteredEntries.map((entry) => (
              <JournalBubbleCard
                key={entry.id}
                type={entry.type}
                title={entry.title}
                excerpt={entry.excerpt}
                date={`${entry.date} · ${entry.readingTime}`}
                onRead={() => navigate(`/journal/detail/${entry.id}`)}
                onContinue={() => navigate(`/journal/detail/${entry.id}`)}
                onCoachingAction={
                  entry.type === 'questionnaire' ? () => navigate('/coaching/pre-questionnaire')
                  : entry.type === 'compte-rendu' ? () => navigate('/coaching/compte-rendu/1')
                  : undefined
                }
              />
            ))}
          </div>
        )}
      </PageShell>
    </div>
  );
};
