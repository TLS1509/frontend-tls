import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, Calendar, Smile, Frown, Meh } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Input } from '../components/core/Input';
import { FilterChip } from '../components/ui/FilterChip';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { useJournalStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import type { JournalMoodLevel } from '../types/learning';
import { Container } from '../components/layout';

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
    <div className="min-h-[100dvh] bg-surface">
      <EditorialHero
        eyebrow="Journal · Recherche"
        title="Retrouve toutes tes entrées"
        summary="Recherche full-text + filtres par date et sentiment"
        tone="flat"
      />

      <Container width="content" padding={false} className="px-stack py-section flex flex-col gap-section">
        <Card className="p-stack">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher dans le titre, le contenu..."
            leadingIcon={<SearchIcon className="w-4 h-4" />}
          />
        </Card>

        <div className="flex flex-wrap gap-stack">
          <div className="flex flex-wrap gap-stack-xs items-center">
            <span className="text-caption text-ink-500">Sentiment :</span>
            <FilterChip label="Tous"           active={moodFilter === 'all'}       onClick={() => setMoodFilter('all')} />
            <FilterChip label="😊 Positif"     active={moodFilter === 'happy'}     onClick={() => setMoodFilter('happy')} />
            <FilterChip label="😐 Neutre"      active={moodFilter === 'neutral'}   onClick={() => setMoodFilter('neutral')} />
            <FilterChip label="😞 Difficile"   active={moodFilter === 'sad'}       onClick={() => setMoodFilter('sad')} />
          </div>
          <div className="flex flex-wrap gap-stack-xs items-center">
            <span className="text-caption text-ink-500">Période :</span>
            <FilterChip label="Toutes"  active={dateFilter === 'all'} onClick={() => setDateFilter('all')} />
            <FilterChip label="7j"      active={dateFilter === '7d'}  onClick={() => setDateFilter('7d')} />
            <FilterChip label="30j"     active={dateFilter === '30d'} onClick={() => setDateFilter('30d')} />
            <FilterChip label="3 mois"  active={dateFilter === '90d'} onClick={() => setDateFilter('90d')} />
          </div>
        </div>

        <div className="text-caption text-ink-500">
          {filtered.length} résultat{filtered.length > 1 ? 's' : ''} {query && <>pour "<strong>{query}</strong>"</>}
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="Aucun résultat" description="Essaie un autre terme ou ajuste les filtres" />
        ) : (
          <div className="flex flex-col gap-stack-xs">
            {filtered.map((e) => {
              const cfg = MOOD_CONFIG[e.mood] ?? MOOD_CONFIG['neutral'];
              const Icon = cfg.icon;
              const excerpt = e.body.length > 150 ? e.body.slice(0, 150) + '…' : e.body;
              const date = new Date(e.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
              return (
                <Card key={e.id} className="p-5 cursor-pointer hover:border-primary-300 transition-all">
                  <div className="flex items-start gap-stack">
                    <Icon className={`w-6 h-6 ${cfg.color} shrink-0 mt-1`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-stack-xs mb-1">
                        <h3 className="font-semibold">{e.title}</h3>
                      </div>
                      <p className="text-body-sm text-ink-600 mb-stack-xs">{excerpt}</p>
                      <div className="flex items-center gap-stack-xs flex-wrap">
                        <Badge variant="neutral">{TYPE_LABELS[e.type] ?? e.type}</Badge>
                        <Badge variant="brand">{cfg.label}</Badge>
                        {e.linkedItemId && <Badge variant="sun">Item lié</Badge>}
                        <span className="flex items-center gap-tight text-caption text-ink-500">
                          <Calendar className="w-3 h-3" /> {date}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

export default JournalSearch;
