import React, { useState } from 'react';
import { Users, AlertTriangle } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { DataTable, type DataTableColumn } from '../components/patterns/DataTable';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Avatar } from '../components/ui/Avatar';
import { FilterChip } from '../components/ui/FilterChip';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { ProgressBar } from '../components/ui/ProgressBar';
import { PageShell } from '../components/layout';

interface Learner {
  name: string;
  initials: string;
  streak: number;
  badges: number;
  xpWeek: number;
  trend: 'up' | 'down' | 'stable';
  atrophyDays?: number;
}

const LEARNERS: Learner[] = [
  { name: 'Léa Martin', initials: 'LM', streak: 18, badges: 12, xpWeek: 320, trend: 'up' },
  { name: 'Tom Bernard', initials: 'TB', streak: 7, badges: 8, xpWeek: 180, trend: 'stable' },
  { name: 'Sara Costa', initials: 'SC', streak: 0, badges: 14, xpWeek: 0, trend: 'down', atrophyDays: 95 },
  { name: 'Jules Petit', initials: 'JP', streak: 24, badges: 18, xpWeek: 410, trend: 'up' },
  { name: 'Anna Roux', initials: 'AR', streak: 2, badges: 5, xpWeek: 60, trend: 'down', atrophyDays: 32 },
];

const TREND: Record<Learner['trend'], { arrow: string; label: string; variant: 'success' | 'danger' | 'neutral'; order: number }> = {
  up: { arrow: '↑', label: 'En hausse', variant: 'success', order: 2 },
  stable: { arrow: '→', label: 'Stable', variant: 'neutral', order: 1 },
  down: { arrow: '↓', label: 'En baisse', variant: 'danger', order: 0 },
};

/** Barème de la jauge d'XP : 500 XP par semaine remplissent la barre. */
const XP_WEEK_MAX = 500;

// Les valeurs de tri voyagent dans la rangée sous des clés que la table n'affiche pas.
const COLUMNS: DataTableColumn[] = [
  { key: 'name', label: 'Apprenant', sortable: true, sortValue: (r) => r._name as string },
  { key: 'streak', label: 'Streak', sortable: true, align: 'right', sortValue: (r) => r._streak as number },
  { key: 'badges', label: 'Badges', sortable: true, align: 'right', sortValue: (r) => r._badges as number },
  { key: 'xpWeek', label: 'XP semaine', sortable: true, sortValue: (r) => r._xp as number },
  { key: 'trend', label: 'Tendance', sortable: true, align: 'right', sortValue: (r) => r._trend as number },
];

const CoachEngagement: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'at-risk'>('all');

  const filtered = LEARNERS.filter((l) => {
    if (filter === 'active') return l.streak > 0 && !l.atrophyDays;
    if (filter === 'at-risk') return !!l.atrophyDays || l.streak === 0;
    return true;
  });

  return (
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coach · Engagement & Analytics"
        title="L'engagement de mon équipe"
        summary="Streaks, badges, XP semaine et alertes d'atrophie"
        tone="flat"
      />

      <div className="flex flex-col gap-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
          <StatCard label="Apprenants actifs" value="3/5" sub="60%" />
          <StatCard label="Streak moyen" value="10.2j" sub="+2 vs S-1" />
          <StatCard label="Badges semaine" value="7" sub="dont 2 Or" />
          <StatCard label="Atrophie" value="2" sub="à relancer" icon={<AlertTriangle size={18} />} />
        </div>

        <div className="flex flex-wrap gap-stack-xs">
          <FilterChip label="Tous" active={filter === 'all'} onClick={() => setFilter('all')} />
          <FilterChip label="Actifs" active={filter === 'active'} onClick={() => setFilter('active')} />
          <FilterChip label="À risque" active={filter === 'at-risk'} onClick={() => setFilter('at-risk')} />
        </div>

        {/* Cinq apprenants dont on compare streak, badges et XP : une table
            triable, pas une pile de cartes (arbitrage n°5 du 23/09). */}
        <section className="flex flex-col gap-stack" aria-label="Apprenants assignés">
          <SectionHeader
            title="Apprenants assignés"
            subtitle={`${filtered.length} apprenant${filtered.length > 1 ? 's' : ''}`}
            icon={<Users size={20} />}
            tone="primary"
            size="md"
          />
          <DataTable
            columns={COLUMNS}
            pageSize={Math.max(filtered.length, 1)}
            emptyMessage="Aucun apprenant dans ce filtre."
            rows={filtered.map((l) => {
              const trend = TREND[l.trend];
              return {
                _name: l.name,
                _streak: l.streak,
                _badges: l.badges,
                _xp: l.xpWeek,
                _trend: trend.order,
                name: (
                  <span className="flex items-center gap-stack-sm min-w-0">
                    <Avatar initials={l.initials} size="sm" />
                    <span className="font-semibold text-ink-900 truncate">{l.name}</span>
                    {l.atrophyDays && <AtrophieIndicator daysSinceActivity={l.atrophyDays} />}
                  </span>
                ),
                streak: <span className="tabular-nums text-ink-700">{l.streak}j</span>,
                badges: <span className="tabular-nums text-ink-700">{l.badges}</span>,
                xpWeek: (
                  <span className="flex items-center gap-stack-xs min-w-[8rem]">
                    <ProgressBar value={Math.min(100, (l.xpWeek / XP_WEEK_MAX) * 100)} fill="warm" size="sm" valueLabel={false} className="flex-1" />
                    <span className="tabular-nums text-ink-700 w-14 text-right">{l.xpWeek} XP</span>
                  </span>
                ),
                trend: (
                  // Pas de `sr-only` ici : un enfant en position absolue échappe au
                  // défilement de la table (son bloc conteneur est hors du cadre) et
                  // élargissait la page de 300 px à 375.
                  <Badge variant={trend.variant} size="compact">
                    <span role="img" aria-label={trend.label}>{trend.arrow}</span>
                  </Badge>
                ),
              };
            })}
          />
        </section>

        {LEARNERS.some((l) => l.atrophyDays) && (
          <Card className="p-stack-md bg-warning-bg border-warning-base/30 flex items-start gap-stack-xs">
            <AlertTriangle className="w-5 h-5 text-warning-fg mt-1 shrink-0" />
            <div>
              <div className="font-semibold mb-1">2 apprenants en atrophie</div>
              <p className="text-body-sm text-ink-700">Sara C. (95 jours) et Anna R. (32 jours) n'ont pas validé d'activité récemment. Pensez à les recontacter.</p>
            </div>
          </Card>
        )}
      </div>
    </PageShell>
  );
};

export default CoachEngagement;
