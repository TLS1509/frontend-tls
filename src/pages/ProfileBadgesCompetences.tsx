import React, { useState } from 'react';
import { Award, Filter, Search } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { AchievementBadge } from '../components/ui/AchievementBadge';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { FilterChip } from '../components/ui/FilterChip';
import { EmptyState } from '../components/ui/EmptyState';

// ─── Mock data ────────────────────────────────────────────────────────────────

const BADGES = [
  { id: 'lead-d3', name: 'Leadership Compétent', category: 'Leadership', dreyfus: 3, tone: 'primary' as const, earned: true, earnedDate: '15 mai 2026' },
  { id: 'lead-d2', name: 'Leadership Débutant avancé', category: 'Leadership', dreyfus: 2, tone: 'primary' as const, earned: true, earnedDate: '3 avr. 2026' },
  { id: 'comm-d4', name: 'Communication Performante', category: 'Communication', dreyfus: 4, tone: 'warm' as const, earned: true, earnedDate: '8 mai 2026' },
  { id: 'comm-d3', name: 'Communication Compétente', category: 'Communication', dreyfus: 3, tone: 'warm' as const, earned: true, earnedDate: '20 mars 2026' },
  { id: 'tech-d4', name: 'Tech & Outils Performant', category: 'Tech & Outils', dreyfus: 4, tone: 'sun' as const, earned: true, earnedDate: '1 mai 2026' },
  { id: 'anal-d2', name: 'Analyse Débutant avancé', category: 'Analyse', dreyfus: 2, tone: 'primary' as const, earned: true, earnedDate: '10 avr. 2026' },
  { id: 'lead-d4', name: 'Leadership Performant', category: 'Leadership', dreyfus: 4, tone: 'primary' as const, earned: false, earnedDate: null },
  { id: 'creat-d2', name: 'Créativité Débutant avancé', category: 'Créativité', dreyfus: 2, tone: 'sun' as const, earned: false, earnedDate: null },
  { id: 'coop-d3', name: 'Coopération Compétente', category: 'Coopération', dreyfus: 3, tone: 'primary' as const, earned: false, earnedDate: null },
];

const RADAR_AXES = [
  { label: 'Leadership', current: 3, target: 5 },
  { label: 'Communication', current: 4, target: 4 },
  { label: 'Analyse', current: 2, target: 4 },
  { label: 'Tech & Outils', current: 4, target: 5 },
  { label: 'Créativité', current: 1, target: 3 },
  { label: 'Coopération', current: 3, target: 4 },
];

const CATEGORIES = ['Tous', 'Leadership', 'Communication', 'Analyse', 'Tech & Outils', 'Créativité', 'Coopération'];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfileBadgesCompetences() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [showEarned, setShowEarned] = useState<'all' | 'earned' | 'locked'>('all');

  const earnedBadges = BADGES.filter((b) => b.earned);
  const filtered = BADGES.filter((b) => {
    const matchCat = activeCategory === 'Tous' || b.category === activeCategory;
    const matchEarned = showEarned === 'all' || (showEarned === 'earned' && b.earned) || (showEarned === 'locked' && !b.earned);
    return matchCat && matchEarned;
  });

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Profil · Badges Compétences"
        title="Mes Badges Dreyfus"
        summary={`${earnedBadges.length} badges obtenus sur ${BADGES.length}. Chaque badge atteste d'un niveau Dreyfus validé dans une compétence.`}
        tone="sun"
        trailing={
          <Button variant="glass" size="md" leadingIcon={<Award size={16} />}>
            Partager mon profil
          </Button>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* Radar overview */}
        <div className="grid md:grid-cols-2 gap-section">
          <SectionCard title="Mon Radar Compétences" titleIcon={<Award size={18} />}>
            <CompetencyRadar axes={RADAR_AXES} size="md" showLegend />
          </SectionCard>

          <SectionCard title="Progression badges" titleIcon={<Award size={18} />}>
            <div className="flex flex-col gap-3">
              {['Leadership', 'Communication', 'Analyse', 'Tech & Outils', 'Créativité', 'Coopération'].map((cat) => {
                const total = BADGES.filter((b) => b.category === cat).length;
                const earned = BADGES.filter((b) => b.category === cat && b.earned).length;
                const pct = Math.round((earned / Math.max(total, 1)) * 100);
                return (
                  <div key={cat} className="flex items-center gap-stack">
                    <span className="text-caption text-ink-600 w-28 shrink-0">{cat}</span>
                    <div className="flex-1 h-2 bg-ink-100 rounded-pill overflow-hidden">
                      <div
                        className="h-full bg-accent-400 rounded-pill transition-all duration-slow"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-caption font-semibold text-ink-700 w-12 text-right">{earned}/{total}</span>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {(['all', 'earned', 'locked'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setShowEarned(v)}
                className={[
                  'px-3 py-1.5 text-caption font-semibold rounded-pill transition-colors duration-fast',
                  showEarned === v ? 'bg-accent-400 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200',
                ].join(' ')}
              >
                {v === 'all' ? 'Tous' : v === 'earned' ? 'Obtenus' : 'À débloquer'}
              </button>
            ))}
          </div>
        </div>

        {/* Badges grid */}
        <SectionCard title={`${filtered.length} badge${filtered.length !== 1 ? 's' : ''}`} titleIcon={<Award size={18} />}>
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Award size={32} />}
              title="Aucun badge trouvé"
              description="Change les filtres pour voir d'autres badges."
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-section">
              {filtered.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center gap-2">
                  <AchievementBadge
                    title={badge.name}
                    category={badge.category}
                    tone={badge.tone}
                    size="md"
                    earned={badge.earned}
                  />
                  <div className="flex flex-col items-center gap-tight text-center">
                    <span className="text-caption font-semibold text-ink-800 line-clamp-2 leading-tight">{badge.name}</span>
                    {badge.earnedDate && (
                      <span className="text-micro text-ink-400">{badge.earnedDate}</span>
                    )}
                    {!badge.earned && (
                      <Badge variant="neutral" size="sm">D{badge.dreyfus} requis</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

      </div>
    </div>
  );
}
