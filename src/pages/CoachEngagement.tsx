import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { DataTable, type DataTableColumn } from '../components/patterns/DataTable';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Avatar } from '../components/ui/Avatar';
import { FilterChip } from '../components/ui/FilterChip';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { Alert } from '../components/ui/Alert';
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

  const enAtrophie = LEARNERS.filter((l) => l.atrophyDays);

  return (
    /* Trois temps à 48 px : l'en-tête, l'état de l'équipe (chiffres + alerte
       d'atrophie, 16 entre eux : l'alerte nomme les deux apprenants que compte
       la tuile « Atrophie »), puis la liste avec ses filtres. L'alerte vivait
       sous la table, loin du chiffre qu'elle explique. */
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coach · Engagement & Analytics"
        title="L'engagement de mon équipe"
        summary="Streaks, badges, XP semaine et alertes d'atrophie."
        tone="flat"
      />

      <div className="flex flex-col gap-stack">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard label="Apprenants actifs" value="3/5" sub="60 %" />
          <StatCard label="Streak moyen" value="10,2 j" sub="+2 vs S-1" />
          <StatCard label="Badges semaine" value="7" sub="dont 2 Or" />
          <StatCard label="Atrophie" value="2" sub="à relancer" icon={<AlertTriangle size={18} />} />
        </div>

        {enAtrophie.length > 0 && (
          /* `Alert` : titre 16/600, texte 16 à 4 px, icône sur la première
             ligne. La carte faite main posait `border-warning-border`, une
             couleur absente de @theme (filet à la couleur du texte). */
          <Alert variant="warning" title={`${enAtrophie.length} apprenants en atrophie`}>
            Sara C. (95 jours) et Anna R. (32 jours) n'ont pas validé d'activité récemment. Pensez à les recontacter.
          </Alert>
        )}
      </div>

      {/* Cinq apprenants dont on compare streak, badges et XP : une table
          triable, pas une pile de cartes (arbitrage n°5 du 23/09). Les filtres
          appartiennent à la liste qu'ils filtrent : ils vivent sous son titre. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Apprenants assignés"
          meta={`${filtered.length} apprenant${filtered.length > 1 ? 's' : ''}${filter !== 'all' ? ` sur ${LEARNERS.length}` : ''}`}
          size="md"
        />
        <div className="flex flex-wrap gap-stack-xs" role="group" aria-label="Filtrer les apprenants">
          <FilterChip label="Tous" active={filter === 'all'} onClick={() => setFilter('all')} />
          <FilterChip label="Actifs" active={filter === 'active'} onClick={() => setFilter('active')} />
          <FilterChip label="À risque" active={filter === 'at-risk'} onClick={() => setFilter('at-risk')} />
        </div>
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
    </PageShell>
  );
};

export default CoachEngagement;
