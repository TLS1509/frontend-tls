import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Calendar, Smile, Frown, Meh, ChevronRight } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Input } from '../components/core/Input';
import { FilterChip } from '../components/ui/FilterChip';
import { MetaPill } from '../components/ui/MetaPill';
import { EmptyState } from '../components/ui/EmptyState';
import { useJournalStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import type { JournalMoodLevel } from '../types/learning';
import { PageShell } from '../components/layout';

type MoodFilter = 'all' | JournalMoodLevel;

const MOOD_CONFIG: Record<JournalMoodLevel, { icon: typeof Smile; color: string; label: string }> = {
  'very-happy': { icon: Smile, color: 'text-primary-600', label: 'Excellent' },
  'happy':      { icon: Smile, color: 'text-success-fg',  label: 'Positif' },
  'neutral':    { icon: Meh,   color: 'text-info-fg',     label: 'Neutre' },
  'sad':        { icon: Frown, color: 'text-warning-fg',  label: 'Difficile' },
  'very-sad':   { icon: Frown, color: 'text-danger-fg',   label: 'Très difficile' },
};

const PERIOD_MS: Record<string, number> = {
  all: 0, '7d': 7 * 86_400_000, '30d': 30 * 86_400_000, '90d': 90 * 86_400_000,
};

const TYPE_LABELS: Record<string, string> = {
  'reflexion-libre': 'Réflexion libre',
  'apprentissage': 'Apprentissage',
  'pratique-pro': 'Pratique pro',
  'session-coaching': 'Coaching',
  'moment-eureka': 'Eurêka',
};

const JournalSearch: React.FC = () => {
  const navigate = useNavigate();
  const journalStore = useJournalStore();
  const [query, setQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState<MoodFilter>('all');
  const [dateFilter, setDateFilter] = useState('all');

  const storeEntries = journalStore.getEntries(MOCK_USER_ID);
  const now = Date.now();

  const filtered = useMemo(() => {
    const cutoff = PERIOD_MS[dateFilter] > 0 ? now - PERIOD_MS[dateFilter] : 0;
    const q = query.trim().toLowerCase();
    return storeEntries.filter((e) => {
      const dateMs = new Date(e.createdAt).getTime();
      if (q && !e.title.toLowerCase().includes(q) && !e.body.toLowerCase().includes(q)) return false;
      if (moodFilter !== 'all' && e.mood !== moodFilter) return false;
      if (cutoff > 0 && dateMs < cutoff) return false;
      return true;
    });
  }, [storeEntries, query, moodFilter, dateFilter, now]);

  return (
    /* Un seul conteneur pour l'en-tête et le corps : le titre était calé à
       gauche de la page, le corps recentré dans sa colonne de 768 px. */
    <PageShell width="content">
      <EditorialHero
        eyebrow="Journal · Recherche"
        title="Retrouve toutes tes entrées"
        summary="Recherche full-text + filtres par date et sentiment"
        tone="flat"
      />

      {/* Recherche et filtres : un seul groupe. Le champ n'a pas besoin d'une
          carte autour de lui ; les deux rangées de filtres sont nommées comme
          des champs (13/600 ink-600), et les émojis cèdent la place aux
          glyphes de l'app. */}
      <div className="flex flex-col gap-stack">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher dans le titre, le contenu..."
          aria-label="Rechercher dans le journal"
          leadingIcon={<SearchIcon className="w-4 h-4" />}
        />

        <div className="flex flex-wrap gap-x-section gap-y-stack">
          <div className="flex flex-col gap-stack-xs">
            <span className="text-caption font-semibold text-ink-600">Sentiment</span>
            <div className="flex flex-wrap gap-stack-xs">
              <FilterChip label="Tous"      active={moodFilter === 'all'}     onClick={() => setMoodFilter('all')} />
              <FilterChip label="Positif"   icon={<Smile size={16} />} active={moodFilter === 'happy'}   onClick={() => setMoodFilter('happy')} />
              <FilterChip label="Neutre"    icon={<Meh size={16} />}   active={moodFilter === 'neutral'} onClick={() => setMoodFilter('neutral')} />
              <FilterChip label="Difficile" icon={<Frown size={16} />} active={moodFilter === 'sad'}     onClick={() => setMoodFilter('sad')} />
            </div>
          </div>
          <div className="flex flex-col gap-stack-xs">
            <span className="text-caption font-semibold text-ink-600">Période</span>
            <div className="flex flex-wrap gap-stack-xs">
              <FilterChip label="Toutes"  active={dateFilter === 'all'} onClick={() => setDateFilter('all')} />
              <FilterChip label="7j"      active={dateFilter === '7d'}  onClick={() => setDateFilter('7d')} />
              <FilterChip label="30j"     active={dateFilter === '30d'} onClick={() => setDateFilter('30d')} />
              <FilterChip label="3 mois"  active={dateFilter === '90d'} onClick={() => setDateFilter('90d')} />
            </div>
          </div>
        </div>
      </div>

      {/* Résultats — une section (h2 28) dont le compte est la méta ; les
          entrées en rangées dans une carte (arbitrage n°5), et chaque rangée
          ouvre son entrée : les cartes portaient un curseur de lien sans
          mener nulle part. Type, humeur et lien sont des données : MetaPill. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Résultats"
          meta={<>{filtered.length} résultat{filtered.length > 1 ? 's' : ''}{query && <> pour « <strong className="font-semibold text-ink-900">{query}</strong> »</>}</>}
        />

        {filtered.length === 0 ? (
          <EmptyState title="Aucun résultat" description="Essaie un autre terme ou ajuste les filtres" />
        ) : (
          <Card className="p-0 overflow-hidden">
            <ul className="divide-y divide-ink-100">
              {filtered.map((e) => {
                const cfg = MOOD_CONFIG[e.mood] ?? MOOD_CONFIG['neutral'];
                const Icon = cfg.icon;
                const excerpt = e.body.length > 150 ? e.body.slice(0, 150) + '…' : e.body;
                const date = new Date(e.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => navigate(`/journal/detail/${e.id}`)}
                      className="group w-full flex items-start gap-stack px-stack-lg py-stack-md text-left bg-white hover:bg-ink-50 transition-colors duration-base cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500"
                    >
                      {/* Glyphe 20 centré sur la première ligne (26) : 3 px. */}
                      <Icon size={20} className={`${cfg.color} shrink-0 mt-[3px]`} aria-hidden="true" />
                      <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                        <p className="text-body font-semibold text-ink-900">{e.title}</p>
                        <p className="text-body text-ink-700 max-w-prose">{excerpt}</p>
                        <div className="mt-stack-xs flex items-center gap-stack-xs flex-wrap">
                          <MetaPill text={TYPE_LABELS[e.type] ?? e.type} />
                          <MetaPill text={cfg.label} tone="primary" />
                          {e.linkedItemId && <MetaPill text="Item lié" tone="sun" />}
                          <span className="flex items-center gap-stack-3xs text-caption text-ink-600">
                            <Calendar size={14} aria-hidden="true" /> {date}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-ink-600 shrink-0 mt-1 group-hover:text-ink-900" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>
        )}
      </section>
    </PageShell>
  );
};

export default JournalSearch;
