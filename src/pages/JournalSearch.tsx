import React, { useState } from 'react';
import { Search as SearchIcon, Calendar, Smile, Frown, Meh } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Input } from '../components/core/Input';
import { FilterChip } from '../components/ui/FilterChip';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';

interface JournalEntry {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  mood: 'happy' | 'neutral' | 'sad';
  type: string;
}

const ENTRIES: JournalEntry[] = [
  { id: '1', title: 'Réflexion sur ma première mission', date: '12 mai 2026', excerpt: 'Aujourd\'hui j\'ai pris conscience que la communication avec les clients est essentielle...', mood: 'happy', type: 'Mission' },
  { id: '2', title: 'Échec sur le pitch produit', date: '8 mai 2026', excerpt: 'Je suis frustré : mon pitch n\'a pas convaincu. Je dois revoir ma structure...', mood: 'sad', type: 'Apprentissage' },
  { id: '3', title: 'Notes de coaching avec Marie', date: '5 mai 2026', excerpt: 'Marie m\'a fait remarquer que je peux structurer ma pensée différemment...', mood: 'neutral', type: 'Coaching' },
  { id: '4', title: 'Victoire sur le module stratégie', date: '2 mai 2026', excerpt: 'Module terminé avec brio ! Le quiz final était difficile mais...', mood: 'happy', type: 'Apprentissage' },
];

const MOOD_CONFIG = {
  happy: { icon: Smile, color: 'text-success-fg', label: 'Positif' },
  neutral: { icon: Meh, color: 'text-info-fg', label: 'Neutre' },
  sad: { icon: Frown, color: 'text-secondary-600', label: 'Difficile' },
};

const JournalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState<'all' | 'happy' | 'neutral' | 'sad'>('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filtered = ENTRIES.filter((e) => {
    if (query && !e.title.toLowerCase().includes(query.toLowerCase()) && !e.excerpt.toLowerCase().includes(query.toLowerCase())) return false;
    if (moodFilter !== 'all' && e.mood !== moodFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Journal · Recherche"
        title="Retrouve toutes tes entrées"
        summary="Recherche full-text + filtres par date et sentiment"
        tone="brand"
      />

      <div className="max-w-content mx-auto px-4 py-section flex flex-col gap-section">
        <Card className="p-4">
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
            <FilterChip label="Tous" active={moodFilter === 'all'} onClick={() => setMoodFilter('all')} />
            <FilterChip label="😊 Positif" active={moodFilter === 'happy'} onClick={() => setMoodFilter('happy')} />
            <FilterChip label="😐 Neutre" active={moodFilter === 'neutral'} onClick={() => setMoodFilter('neutral')} />
            <FilterChip label="😞 Difficile" active={moodFilter === 'sad'} onClick={() => setMoodFilter('sad')} />
          </div>
          <div className="flex flex-wrap gap-stack-xs items-center">
            <span className="text-caption text-ink-500">Période :</span>
            <FilterChip label="Toutes" active={dateFilter === 'all'} onClick={() => setDateFilter('all')} />
            <FilterChip label="7j" active={dateFilter === '7d'} onClick={() => setDateFilter('7d')} />
            <FilterChip label="30j" active={dateFilter === '30d'} onClick={() => setDateFilter('30d')} />
            <FilterChip label="3 mois" active={dateFilter === '90d'} onClick={() => setDateFilter('90d')} />
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
              const cfg = MOOD_CONFIG[e.mood];
              const Icon = cfg.icon;
              return (
                <Card key={e.id} className="p-5 cursor-pointer hover:border-primary-300 transition-all">
                  <div className="flex items-start gap-stack">
                    <Icon className={`w-6 h-6 ${cfg.color} shrink-0 mt-1`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-stack-xs mb-1">
                        <h3 className="font-semibold">{e.title}</h3>
                      </div>
                      <p className="text-body-sm text-ink-600 mb-stack-xs">{e.excerpt}</p>
                      <div className="flex items-center gap-stack-xs">
                        <Badge variant="neutral">{e.type}</Badge>
                        <Badge variant="brand">{cfg.label}</Badge>
                        <span className="flex items-center gap-1 text-caption text-ink-500">
                          <Calendar className="w-3 h-3" /> {e.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalSearch;
