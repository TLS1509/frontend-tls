import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Alert } from '../components/ui/Alert';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ProfileCard } from '../components/ui/ProfileCard';
import { Avatar } from '../components/ui/Avatar';
import { Tabs } from '../components/ui/Tabs';
import { FilterChip } from '../components/ui/FilterChip';
import { BarChart } from '../components/charts/BarChart';
import { PageShell } from '../components/layout';
import { useAnalyticsStore } from '../stores/persistence';
import { MOCK_COACH_ID } from '../data/analytics';
import type { LearnerStatus } from '../types/learning';

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<LearnerStatus, string> = {
  'on-track': 'En progression',
  'at-risk': 'À risque',
  'stuck': 'Bloqué',
};

const STATUS_VARIANT: Record<LearnerStatus, 'success' | 'warm' | 'danger'> = {
  'on-track': 'success',
  'at-risk': 'warm',
  'stuck': 'danger',
};

const WEEKLY_ACTIVITY = [
  { day: 'Lun', sessions: 3, corrections: 1 },
  { day: 'Mar', sessions: 2, corrections: 2 },
  { day: 'Mer', sessions: 4, corrections: 0 },
  { day: 'Jeu', sessions: 1, corrections: 3 },
  { day: 'Ven', sessions: 3, corrections: 1 },
];
const WEEKLY_ACTIVITY_CHART = WEEKLY_ACTIVITY.map(({ day, sessions, corrections }) => ({
  label: day,
  sessions,
  corrections,
}));

function formatLastActive(daysSince: number): string {
  if (daysSince === 0) return "Aujourd'hui";
  if (daysSince === 1) return 'Il y a 1 jour';
  return `Il y a ${daysSince} jours`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachTeamDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState<LearnerStatus | 'all'>('all');

  const analyticsStore = useAnalyticsStore();
  const learners = analyticsStore.getLearnerProfiles(MOCK_COACH_ID);
  const stats = analyticsStore.getTeamStats(MOCK_COACH_ID);

  const filteredLearners = useMemo(() => {
    if (statusFilter === 'all') return learners;
    return learners.filter((l) => l.status === statusFilter);
  }, [learners, statusFilter]);

  const topProgressors = useMemo(
    () => [...learners].sort((a, b) => b.progressPercent - a.progressPercent).slice(0, 3),
    [learners]
  );

  const alertCount = stats.stuckCount + stats.atRiskCount;

  return (
    /* 48 px entre l'en-tête, l'état de l'équipe (chiffres + alerte, 16 entre
       eux) et l'espace à onglets ; 32 entre les onglets et leur panneau. Les
       sections des panneaux étaient des `SectionCard` (h3 de 20 px dans une
       carte, sous le h1) : titre h2 28 hors de la carte, contenu dans la carte. */
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coach · Équipe"
        title="Tableau de bord équipe"
        summary="Vue d'ensemble de la progression de toute votre équipe : activité, niveaux Dreyfus, sessions et corrections."
        tone="flat"
        trailing={
          <div className="flex flex-wrap items-center gap-stack-xs">
            <Button emphasis="outline" size="md" leadingIcon={<Calendar size={16} />}>
              Planifier une session
            </Button>
            <Button emphasis="soft" size="md" leadingIcon={<Users size={16} />}>
              Voir tous les profils
            </Button>
          </div>
        }
      />

      <div className="flex flex-col gap-stack">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard value={stats.totalLearners} label="Apprenants" size="sm" />
          <StatCard
            value={stats.stuckCount}
            label="Bloqués"
            variant="warm"
            size="sm"
            delta={stats.stuckCount > 0 ? 'Action recommandée' : 'RAS'}
            deltaDirection={stats.stuckCount > 0 ? 'down' : 'up'}
          />
          <StatCard
            value={`D${stats.avgDreyfus.toFixed(1).replace('.', ',')}`}
            label="Dreyfus moyen"
            variant="brand"
            size="sm"
            delta="↑ 0,3 ce mois"
            deltaDirection="up"
          />
          <StatCard
            value={stats.correctionsQueue}
            label="Corrections en attente"
            size="sm"
          />
        </div>

        {alertCount > 0 && (
          /* `Alert` et non un bandeau fait main (dont le filet
             `border-warning-border` n'existe pas dans @theme). */
          <Alert
            variant="warning"
            actions={
              <Button emphasis="outline" size="sm">
                Planifier
              </Button>
            }
          >
            <strong className="font-semibold">{stats.stuckCount} bloqué{stats.stuckCount !== 1 ? 's' : ''}</strong> et{' '}
            <strong className="font-semibold">{stats.atRiskCount} à risque</strong> : planifie un bilan cette semaine.
          </Alert>
        )}
      </div>

      <div className="flex flex-col gap-section">
        <Tabs
          items={[
            { id: 'overview', label: 'Vue d\'ensemble' },
            { id: 'apprenants', label: `Apprenants (${stats.totalLearners})` },
            { id: 'top', label: 'Top progresseurs' },
          ]}
          value={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === 'overview' && (
          <div className="flex flex-col gap-page">
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Activité hebdomadaire" meta="Sessions et corrections, du lundi au vendredi" size="md" />
              <Card>
                <BarChart
                  data={WEEKLY_ACTIVITY_CHART}
                  dataKey="sessions"
                  series={[
                    { key: 'sessions', label: 'Sessions', color: '#ED843A' },
                    { key: 'corrections', label: 'Corrections', color: '#55A1B4' },
                  ]}
                  showLegend
                  size="sm"
                  layout="vertical"
                />
              </Card>
            </section>

            <section className="flex flex-col gap-stack">
              <SectionHeader title="Distribution Dreyfus" meta={`${stats.totalLearners} apprenants, par niveau moyen`} size="md" />
              {/* Une rangée par niveau : le niveau en 16/600, la jauge, le compte
                  aligné à droite en chiffres tabulaires. */}
              <Card className="flex flex-col gap-stack-sm">
                {[1, 2, 3, 4, 5].map((level) => {
                  const count = learners.filter((l) => Math.round(l.dreyfusAvg) === level).length;
                  const pct = stats.totalLearners > 0 ? Math.round((count / stats.totalLearners) * 100) : 0;
                  return (
                    <div key={level} className="flex items-center gap-stack">
                      <span className="text-body font-semibold text-ink-900 tabular-nums w-8 shrink-0">D{level}</span>
                      <div className="flex-1">
                        <ProgressBar value={pct} fill="brand" size="sm" />
                      </div>
                      <span className="text-caption text-ink-600 tabular-nums w-24 shrink-0 text-right">{count} apprenant{count !== 1 ? 's' : ''}</span>
                    </div>
                  );
                })}
              </Card>
            </section>
          </div>
        )}

        {activeTab === 'apprenants' && (
          /* Les filtres et la liste qu'ils filtrent forment un groupe : 16 px
             entre eux (32 avant). */
          <div className="flex flex-col gap-stack">
            <div className="flex flex-wrap gap-stack-xs" role="group" aria-label="Filtrer par statut">
              {(['all', 'on-track', 'at-risk', 'stuck'] as const).map((s) => {
                const count = s === 'all' ? learners.length : learners.filter((l) => l.status === s).length;
                return (
                  <FilterChip
                    key={s}
                    label={s === 'all' ? `Tous (${count})` : `${STATUS_LABEL[s]} (${count})`}
                    active={statusFilter === s}
                    onClick={() => setStatusFilter(s)}
                  />
                );
              })}
            </div>

            {/* Learner list — une collection qu'on parcourt pour ouvrir une fiche :
                des rangées dans UNE carte, pas une pile de cartes (arbitrage n°5 du
                23/09). Chaque rangée est un lien ; son fond de survol est rogné par
                la carte à son arc intérieur (overflow-hidden), et l'anneau de focus
                est posé à l'intérieur pour ne pas être rogné avec lui. */}
            {filteredLearners.length === 0 ? (
              <p className="text-body text-ink-600">Aucun apprenant dans cette catégorie.</p>
            ) : (
              <Card className="p-0 overflow-hidden">
                <ul className="flex flex-col divide-y divide-ink-100" aria-label="Apprenants">
                  {filteredLearners.map((learner) => (
                    <li key={learner.userId}>
                      <Link
                        to={`/coach/apprenant/${learner.userId}/analytics`}
                        className="flex items-center gap-stack px-stack-md sm:px-stack-lg py-stack-sm hover:bg-ink-50 transition-colors duration-fast focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink-900"
                      >
                        <Avatar initials={learner.initials} name={learner.name} size="sm" tint="warm" />

                        {/* Nom 16/600 et son état, puis le rôle en légende. */}
                        <div className="flex-1 min-w-0 flex flex-col gap-tight">
                          <div className="flex items-center gap-stack-xs flex-wrap">
                            <span className="text-body font-semibold text-ink-900">{learner.name}</span>
                            <Badge variant={STATUS_VARIANT[learner.status]} size="compact">
                              {STATUS_LABEL[learner.status]}
                            </Badge>
                          </div>
                          <p className="text-caption text-ink-600 truncate">{learner.role}</p>
                        </div>

                        {/* Progression : le niveau, la jauge, puis le pourcentage en
                            légende — une seule fois (la jauge le répétait). */}
                        <div className="hidden md:flex flex-col items-end gap-stack-3xs w-36 shrink-0">
                          <span className="text-caption text-ink-600 tabular-nums">Dreyfus {learner.dreyfusAvg.toFixed(1).replace('.', ',')}</span>
                          <ProgressBar value={learner.progressPercent} fill="brand" size="sm" valueLabel={false} className="w-full" />
                          <span className="text-caption text-ink-600 tabular-nums">{learner.progressPercent} % de l'objectif</span>
                        </div>

                        {/* Last activity */}
                        <span className="hidden lg:block text-caption text-ink-600 w-28 text-right shrink-0">
                          {formatLastActive(learner.daysSinceActivity)}
                        </span>

                        <ChevronRight size={16} className="text-ink-500 shrink-0" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'top' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Top progresseurs ce mois" meta="Les trois plus fortes progressions vers l'objectif" size="md" />
            <div className="grid md:grid-cols-3 gap-stack">
              {topProgressors.map((p, i) => (
                <div key={p.userId} className="relative">
                  {i === 0 && (
                    <span className="absolute -top-2 -right-2 z-base inline-flex items-center justify-center w-6 h-6 rounded-pill bg-accent-700 text-white text-micro font-bold">1</span>
                  )}
                  <ProfileCard
                    name={p.name}
                    role={p.role}
                    initials={p.initials}
                    specialties={p.competencyScores.slice(0, 2).map((c) => c.label)}
                    variant="default"
                    align="center"
                    cta={<MetaPill text={`D${p.dreyfusAvg.toFixed(1).replace('.', ',')}`} />}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
}
