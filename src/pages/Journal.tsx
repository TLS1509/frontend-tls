import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJournalStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import type { JournalEntryType } from '../types/learning';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';
import { Search } from '../components/ui/Search';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import {
  PenSquare,
  BookOpen,
  ArrowRight,
  Sparkles,
  X,
  Lightbulb,
  GraduationCap,
  ClipboardList,
  FileText,
  Zap,
  Send,
  SlidersHorizontal,
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────────── */

type EntryType = 'guided' | 'free' | 'learning' | 'coaching' | 'insight' | 'questionnaire' | 'compte-rendu';
type PeriodFilter = 'all' | 'week' | 'month' | '3months';
type TypeFilter = 'all' | EntryType;

interface JournalEntry {
  id: string;
  type: EntryType;
  title: string;
  excerpt: string;
  date: string;
  dateMs: number;
  readingTime: string;
  tags: string[];
}

/* ─── Style maps — Tailwind only ─────────────────────────────────────────── */

/**
 * Badge pill colors per entry type — affiché top-right de l'EntryCard
 * pour rapidement identifier le type (en complément de la surface tinted).
 */
const TYPE_BADGE: Record<EntryType, string> = {
  guided:        'bg-primary-100 text-primary-700 border border-primary-200',
  free:          'bg-ink-100 text-ink-700 border border-ink-200',
  learning:      'bg-secondary-100 text-secondary-700 border border-secondary-200',
  coaching:      'bg-secondary-100 text-secondary-700 border border-secondary-200',
  insight:       'bg-accent-100 text-accent-700 border border-accent-200',
  questionnaire: 'bg-primary-100 text-primary-700 border border-primary-200',
  'compte-rendu':'bg-success-bg text-success-fg border border-success-base/30',
};

/**
 * Surface tinted per entry type — convey le type d'entrée via le ton de fond.
 * 'free' reste en surface card (white) pour distinguer les notes libres.
 */
const TYPE_SURFACE: Record<EntryType, string> = {
  guided:        'bg-primary-50/70 border-primary-100 hover:border-primary-200 hover:bg-primary-50',
  free:          'bg-white border-ink-200 hover:border-ink-300',
  learning:      'bg-secondary-50/70 border-secondary-100 hover:border-secondary-200 hover:bg-secondary-50',
  coaching:      'bg-secondary-50/70 border-secondary-100 hover:border-secondary-200 hover:bg-secondary-50',
  insight:       'bg-accent-50/70 border-accent-100 hover:border-accent-200 hover:bg-accent-50',
  questionnaire: 'bg-primary-50/70 border-primary-100 hover:border-primary-200 hover:bg-primary-50',
  'compte-rendu':'bg-primary-50/70 border-primary-100 hover:border-primary-200 hover:bg-primary-50',
};

/**
 * Speech bubble tail color — matches the type surface bg (so tail blends seamlessly).
 */
const TYPE_TAIL: Record<EntryType, string> = {
  guided:        'bg-primary-50/70 border-primary-100',
  free:          'bg-white border-ink-200',
  learning:      'bg-secondary-50/70 border-secondary-100',
  coaching:      'bg-secondary-50/70 border-secondary-100',
  insight:       'bg-accent-50/70 border-accent-100',
  questionnaire: 'bg-primary-50/70 border-primary-100',
  'compte-rendu':'bg-primary-50/70 border-primary-100',
};

const TYPE_META: Record<EntryType, { emoji: string; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  guided:        { emoji: '🧭', label: 'Guidé',         icon: GraduationCap },
  free:          { emoji: '✍️', label: 'Libre',          icon: PenSquare },
  learning:      { emoji: '📖', label: 'Apprentissage',  icon: BookOpen },
  coaching:      { emoji: '🎯', label: 'Coaching',       icon: Zap },
  insight:       { emoji: '💡', label: 'Insight',        icon: Lightbulb },
  questionnaire: { emoji: '📋', label: 'Questionnaire',  icon: ClipboardList },
  'compte-rendu':{ emoji: '📊', label: 'Compte rendu',   icon: FileText },
};

/* ─── Store → display mapping ────────────────────────────────────────────── */

const now = Date.now();

const SPEC_TO_DISPLAY: Record<JournalEntryType, EntryType> = {
  'reflexion-libre':  'free',
  'apprentissage':    'learning',
  'pratique-pro':     'guided',
  'session-coaching': 'coaching',
  'moment-eureka':    'insight',
};

/* ─── Filter config ──────────────────────────────────────────────────────── */

const TYPE_FILTERS: { key: TypeFilter; label: string }[] = [
  { key: 'all',           label: 'Toutes' },
  { key: 'guided',        label: '🧭 Guidé' },
  { key: 'free',          label: '✍️ Libre' },
  { key: 'learning',      label: '📖 Apprentissage' },
  { key: 'coaching',      label: '🎯 Coaching' },
  { key: 'insight',       label: '💡 Insight' },
  { key: 'questionnaire', label: '📋 Questionnaire' },
  { key: 'compte-rendu',  label: '📊 Compte rendu' },
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

/* ─── EntryCard ──────────────────────────────────────────────────────────── */

interface EntryCardProps {
  entry: JournalEntry;
  onNavigate: (id: string) => void;
  onCoachingAction?: () => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onNavigate, onCoachingAction }) => {
  const meta     = TYPE_META[entry.type];
  const TypeIcon = meta.icon;

  return (
    <div
      className={[
        // Apple Messages chat bubble : very rounded + visible overflow for the tail
        'relative !overflow-visible rounded-3xl border p-5 flex flex-col gap-stack',
        'transition-all duration-base hover:-translate-y-1 hover:shadow-md',
        // Surface tinted tone-aware par type
        TYPE_SURFACE[entry.type],
      ].join(' ')}
    >
      {/* Speech bubble tail — bottom-right (color matches surface for seamless blend) */}
      <span
        aria-hidden="true"
        className={[
          'absolute -bottom-2 right-8 w-5 h-5 rotate-45 rounded-br-[6px]',
          'border-r border-b transition-colors duration-200',
          TYPE_TAIL[entry.type],
        ].join(' ')}
      />

      {/* Header — title + date inline + TYPE_BADGE pill top-right. */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-h4 font-bold text-ink-900 m-0 leading-snug">{entry.title}</h3>
          <span className="font-body text-caption text-ink-500 leading-tight">
            {entry.date} · {entry.readingTime}
          </span>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill font-body text-caption font-semibold shrink-0 whitespace-nowrap ${TYPE_BADGE[entry.type]}`}
        >
          <TypeIcon size={12} />
          {meta.label}
        </span>
      </div>

      {/* Excerpt */}
      <p className="font-body text-body text-ink-700 leading-relaxed m-0">{entry.excerpt}</p>

      {/* Coaching quick action */}
      {(entry.type === 'questionnaire' || entry.type === 'compte-rendu') && onCoachingAction && (
        <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={13} />} onClick={onCoachingAction}>
          {entry.type === 'questionnaire' ? 'Voir les réponses' : 'Voir le rapport complet'}
        </Button>
      )}

      {/* Actions — boutons glassy DS (variant glass-light filled + glass-light-ghost) */}
      <div className="flex gap-stack-xs pt-stack-xs border-t border-white/60">
        <Button
          variant="glass-light"
          size="md"
          leadingIcon={<BookOpen size={16} />}
          onClick={() => onNavigate(entry.id)}
        >
          Lire
        </Button>
        <Button
          variant="glass-light-ghost"
          size="md"
          trailingIcon={<ArrowRight size={16} />}
          onClick={() => onNavigate(entry.id)}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
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

  /* Compose state — quick-prompt chat input qui s'expand. */
  const [composeText, setComposeText] = useState('');

  /* Filters panel collapsible — hidden par défaut, toggle via icon button trailing du Search. */
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilterCount =
    (typeFilter !== 'all' ? 1 : 0) + (periodFilter !== 'all' ? 1 : 0);

  /* Types user-initiables (les 4 disponibles depuis la section "Compose new entry").
     Coaching/Questionnaire/Compte-rendu sont system-generated depuis le flow coaching. */
  const COMPOSE_TYPES: { type: EntryType; emoji: string; label: string; tone: 'brand' | 'warm' | 'sun'; subtitle: string }[] = [
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
      // Pass text via query param (URLEncoded) — picked up by NewEntry page
      navigate(`/journal/new-entry?type=free&draft=${encodeURIComponent(composeText)}`);
    } else {
      navigate('/journal/new-entry?type=free');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-50/30 via-white to-primary-50/20 flex flex-col">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-12 flex flex-col gap-section w-full">

        {/* Hero — EditorialHero brand standalone (sans trailing) */}
        <EditorialHero
          tone="brand"
          eyebrow={{ icon: <Sparkles size={12} />, label: 'Mon apprentissage' }}
          title="Journal d'apprentissage"
          summary="Capitalise tes prises de conscience, structure tes réflexions et suis ta progression."
        />

        {/* ⭐ Compose new entry — section engageante avec :
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

          {/* Chat-style prompt card — input qui ressemble à une bulle de messagerie */}
          <Card className="!p-0 !rounded-3xl !gap-0 !overflow-visible relative bg-white border border-primary-100 shadow-sm hover:shadow-md transition-shadow">
            {/* Speech bubble tail */}
            <span
              aria-hidden="true"
              className="absolute -bottom-2 left-8 w-4 h-4 rotate-45 rounded-br-[4px] bg-white border-r border-b border-primary-100"
            />
            <div className="flex items-end gap-3 p-4">
              <span className="text-h2 leading-none shrink-0 select-none" aria-hidden="true">✍️</span>
              <div className="flex-1 min-w-0">
                <label className="sr-only" htmlFor="journal-compose">Écris une pensée du jour</label>
                <textarea
                  id="journal-compose"
                  rows={2}
                  value={composeText}
                  onChange={(e) => setComposeText(e.target.value)}
                  placeholder="Tape une pensée, un insight, une question qui t'a traversé(e)…"
                  className="w-full resize-none border-0 outline-0 bg-transparent font-body text-body text-ink-900 placeholder:text-ink-400 leading-relaxed h-auto min-h-[44px] focus:outline-0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleComposeSubmit();
                  }}
                />
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={handleComposeSubmit}
                aria-label="Continuer l'entrée"
                leadingIcon={<Send size={15} />}
                className="shrink-0"
              >
                Continuer
              </Button>
            </div>
            <div className="px-4 pb-3 -mt-1 flex items-center justify-between gap-2 flex-wrap">
              <span className="font-body text-caption text-ink-500">
                Tu pourras affiner le format & ajouter des tags à l'étape suivante.
              </span>
              <span className="font-body text-micro text-ink-400 hidden sm:inline">
                <kbd className="px-1.5 py-0.5 rounded bg-ink-50 border border-ink-200 text-ink-600 font-mono text-[10px]">⌘ + Entrée</kbd> pour envoyer
              </span>
            </div>
          </Card>

          {/* Or pick a guided format — 4 emoji buttons */}
          <div className="flex flex-col gap-stack-xs">
            <span className="font-body text-caption text-ink-500">Ou choisis un format guidé :</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-stack">
              {COMPOSE_TYPES.map((t) => (
                <button
                  key={t.type}
                  type="button"
                  onClick={() => navigate(`/journal/new-entry?type=${t.type}`)}
                  className={[
                    'group flex flex-col items-center justify-center gap-tight p-4 rounded-2xl border-2 text-center cursor-pointer',
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

        {/* Toolbar compacte — Search size="sm" avec icon button "filters" trailing.
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
            <Card className="p-4 flex flex-col gap-stack shadow-sm animate-[filterIn_0.18s_ease_both]">
              <div className="flex flex-col gap-stack-xs">
                <span className="font-body text-micro font-bold uppercase tracking-wider text-ink-500">Période</span>
                <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Filtrer par période">
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
                <span className="font-body text-micro font-bold uppercase tracking-wider text-ink-500">Type d'entrée</span>
                <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Filtrer par type">
                  {TYPE_FILTERS.map(({ key, label }) => (
                    <FilterChip
                      key={key}
                      label={label}
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
              <EntryCard
                key={entry.id}
                entry={entry}
                onNavigate={(id) => navigate(`/journal/detail/${id}`)}
                onCoachingAction={
                  entry.type === 'questionnaire' ? () => navigate('/coaching/pre-questionnaire')
                  : entry.type === 'compte-rendu' ? () => navigate('/coaching/compte-rendu/1')
                  : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
