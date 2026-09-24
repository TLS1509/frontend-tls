import React, { useMemo, useState } from 'react';
import { BarChart3, TrendingUp, Users, Clock, CheckCircle2 } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { FilterChip } from '../components/ui/FilterChip';
import { Tabs } from '../components/ui/Tabs';
import { ProfileCard } from '../components/ui/ProfileCard';
import { BarChart } from '../components/charts/BarChart';
import { PageShell } from '../components/layout';
import { useAnalyticsStore } from '../stores/persistence';
import { MOCK_COACH_ID } from '../data/analytics';

// ─── Mock data ────────────────────────────────────────────────────────────────

const PERIOD_OPTIONS = [
  { id: 'week', label: 'Semaine' },
  { id: 'month', label: 'Mois' },
  { id: 'quarter', label: 'Trimestre' },
];

const TAB_ITEMS = [
  { id: 'global', label: 'Vue globale' },
  { id: 'competences', label: 'Par compétence' },
  { id: 'corrections', label: 'Corrections' },
];

const ENGAGEMENT_WEEKS = [65, 72, 68, 75, 80, 71, 78, 72];
const ENGAGEMENT_WEEKS_CHART = ENGAGEMENT_WEEKS.map((value, i) => ({
  label: `S${i + 1}`,
  value,
}));

// DREYFUS_DISTRIBUTION and TOP_PROGRESSORS are derived from the store (see component body)

const COMPETENCES = [
  { label: 'Leadership', value: 3.2, pct: 64, badge: 'info' as const },
  { label: 'Communication', value: 3.5, pct: 70, badge: 'success' as const },
  { label: 'Analyse', value: 2.8, pct: 56, badge: 'danger' as const },
  { label: 'Tech', value: 3.7, pct: 74, badge: 'success' as const },
  { label: 'Créativité', value: 2.4, pct: 48, badge: 'danger' as const },
  { label: 'Coopération', value: 3.1, pct: 62, badge: 'info' as const },
];

const CORRECTIONS_PENDING = [
  {
    id: 1,
    apprenant: 'Marc Leroy',
    exercice: 'Étude de cas leadership',
    competence: 'Leadership',
    delai: 'Il y a 2 jours',
  },
  {
    id: 2,
    apprenant: 'Julie Perrin',
    exercice: 'Synthèse analytique Q2',
    competence: 'Analyse',
    delai: 'Il y a 3 jours',
  },
  {
    id: 3,
    apprenant: 'Kevin Blanc',
    exercice: 'Pitch créativité',
    competence: 'Créativité',
    delai: 'Il y a 4 jours',
  },
  {
    id: 4,
    apprenant: 'Nadia Koury',
    exercice: 'Atelier communication',
    competence: 'Communication',
    delai: 'Il y a 5 jours',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const DREYFUS_LABELS_LOCAL: Record<number, string> = {
  1: 'Novice', 2: 'Débutant avancé', 3: 'Compétent', 4: 'Performant', 5: 'Expert',
};

export default function CoachAnalytics() {
  const [activePeriod, setActivePeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('global');

  const analyticsStore = useAnalyticsStore();
  const teamStats = analyticsStore.getTeamStats(MOCK_COACH_ID);
  const learnerProfiles = analyticsStore.getLearnerProfiles(MOCK_COACH_ID);

  const dreyfusDistribution = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    learnerProfiles.forEach((p) => {
      const level = Math.round(p.dreyfusAvg);
      if (level >= 1 && level <= 5) counts[level]++;
    });
    const total = learnerProfiles.length || 1;
    return [1, 2, 3, 4, 5].map((l) => ({
      level: `D${l}`,
      label: DREYFUS_LABELS_LOCAL[l],
      count: counts[l],
      pct: Math.round((counts[l] / total) * 100),
    }));
  }, [learnerProfiles]);

  const topProgressors = useMemo(() =>
    [...learnerProfiles]
      .sort((a, b) => b.dreyfusAvg - a.dreyfusAvg)
      .slice(0, 3)
      .map((p) => ({
        name: p.name,
        initials: p.initials,
        role: `D${p.dreyfusAvg.toFixed(1)} · ${p.role}`,
        specialties: p.competencyScores.slice(0, 2).map((s) => s.label),
      }))
  , [learnerProfiles]);

  return (
    /* 48 px entre l'en-tête, les chiffres et l'espace à onglets ; 32 entre les
       onglets et leur panneau ; dans un panneau, 48 entre les sections et 16
       entre un titre et son contenu. Les sections étaient des `SectionCard` :
       titres h3 de 20 px enfermés dans des cartes, sous un h1 (saut de niveau),
       et une carte dans une carte pour les corrections. */
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow={{ label: 'Coach · Analytics' }}
        title="Analytics équipe"
        summary="Suivi de l'engagement, de la progression Dreyfus et de l'activité de correction de votre cohorte."
        tone="flat"
        trailing={
          <div className="flex flex-wrap gap-stack-xs" role="group" aria-label="Période">
            {PERIOD_OPTIONS.map((p) => (
              <FilterChip
                key={p.id}
                label={p.label}
                active={activePeriod === p.id}
                onClick={() => setActivePeriod(p.id)}
              />
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
        <StatCard
          icon={<Users size={20} />}
          value={teamStats.activeLearners.toString()}
          label="Apprenants actifs"
          delta="↑ 2 ce mois"
          deltaDirection="up"
          variant="brand"
          size="md"
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          value={`D${teamStats.avgDreyfus.toFixed(1).replace('.', ',')}`}
          label="Dreyfus moyen"
          delta="↑ 0,3 ce trimestre"
          deltaDirection="up"
          size="md"
        />
        <StatCard
          icon={<BarChart3 size={20} />}
          value="72"
          sub="%"
          label="Taux engagement"
          delta="↑ 5 %"
          deltaDirection="up"
          size="md"
        />
        <StatCard
          icon={<Clock size={20} />}
          value={teamStats.correctionsQueue.toString()}
          label="Corrections en attente"
          variant="warm"
          size="md"
        />
      </div>

      <div className="flex flex-col gap-section">
        <Tabs
          items={TAB_ITEMS}
          value={activeTab}
          onChange={setActiveTab}
          variant="underline"
        />

        {/* Tab : Vue globale */}
        {activeTab === 'global' && (
          <div className="flex flex-col gap-page">
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Engagement hebdomadaire" meta="Taux d'engagement de la cohorte, sur 8 semaines" size="md" />
              <Card>
                {/* Une série de semaines se lit à l'horizontale : des colonnes, pas des
                    barres couchées (qui laissaient un grand vide à gauche). */}
                <BarChart data={ENGAGEMENT_WEEKS_CHART} dataKey="value" size="sm" layout="vertical" />
              </Card>
            </section>

            <section className="flex flex-col gap-stack">
              <SectionHeader title="Distribution Dreyfus" meta={`${learnerProfiles.length} apprenants, par niveau moyen`} size="md" />
              {/* Une rangée par niveau : le niveau en 16/600, son nom en légende,
                  la jauge, puis le compte aligné à droite en chiffres tabulaires. */}
              <Card className="flex flex-col gap-stack-sm">
                {dreyfusDistribution.map((d) => (
                  <div key={d.level} className="flex items-center gap-stack">
                    <span className="w-8 shrink-0 text-body font-semibold text-ink-900 tabular-nums">
                      {d.level}
                    </span>
                    <span className="w-36 shrink-0 text-caption text-ink-600 hidden sm:block">
                      {d.label}
                    </span>
                    <div className="flex-1">
                      <ProgressBar value={d.pct} fill="brand" size="sm" valueLabel={false} />
                    </div>
                    <span className="w-24 shrink-0 text-caption text-ink-600 tabular-nums text-right">
                      {d.count} apprenant{d.count > 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </Card>
            </section>

            <section className="flex flex-col gap-stack">
              <SectionHeader title="Top progression ce mois" size="md" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
                {topProgressors.map((p) => (
                  <ProfileCard
                    key={p.name}
                    name={p.name}
                    initials={p.initials}
                    role={p.role}
                    specialties={p.specialties}
                    tone="warm"
                    variant="compact"
                    align="center"
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Tab : Par compétence */}
        {activeTab === 'competences' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Dreyfus moyen par compétence" meta={`${COMPETENCES.length} compétences, niveau moyen sur 5`} size="md" />
            {/* Le niveau est une donnée : un nombre aligné à droite, en chiffres
                tabulaires — plus une pastille d'état colorée (« D3.2 »). */}
            <Card className="flex flex-col gap-stack-sm">
              {COMPETENCES.map((c) => (
                <div key={c.label} className="flex items-center gap-stack">
                  <span className="w-32 shrink-0 text-body font-semibold text-ink-900">
                    {c.label}
                  </span>
                  <div className="flex-1">
                    <ProgressBar value={c.pct} fill="brand" size="sm" valueLabel={false} />
                  </div>
                  <span className="w-12 shrink-0 text-body text-ink-700 tabular-nums text-right">
                    D{c.value.toFixed(1).replace('.', ',')}
                  </span>
                </div>
              ))}
            </Card>
          </section>
        )}

        {/* Tab : Corrections */}
        {activeTab === 'corrections' && (
          <div className="flex flex-col gap-page">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
              <StatCard
                icon={<Clock size={20} />}
                value={teamStats.correctionsQueue.toString()}
                label="En attente"
                variant="warm"
                size="md"
              />
              <StatCard
                icon={<CheckCircle2 size={20} />}
                value="12"
                label="Traitées ce mois"
                variant="brand"
                size="md"
              />
              <StatCard
                icon={<TrendingUp size={20} />}
                value="83"
                sub="%"
                label="Taux retour 48h"
                deltaDirection="up"
                delta="↑ 5 %"
                size="md"
              />
            </div>

            {/* Les corrections en attente : des rangées dans UNE carte (plus une
                carte teintée dans une carte de section). Le nom 16/600, l'exercice
                16 ink-700, la compétence en MetaPill (une donnée), le délai en
                légende. */}
            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Corrections en attente"
                meta={`${CORRECTIONS_PENDING.length} travaux à corriger`}
                size="md"
                action={
                  <Button emphasis="soft" size="sm">
                    Aller à la file
                  </Button>
                }
              />
              <Card className="p-0">
                <ul className="flex flex-col divide-y divide-ink-100">
                  {CORRECTIONS_PENDING.map((c) => (
                    <li
                      key={c.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-stack-xs sm:gap-stack px-stack-md sm:px-stack-lg py-stack-sm"
                    >
                      <span className="text-body font-semibold text-ink-900 sm:w-40 shrink-0">
                        {c.apprenant}
                      </span>
                      <span className="flex-1 text-body text-ink-700">{c.exercice}</span>
                      <MetaPill text={c.competence} className="self-start sm:self-auto" />
                      <span className="text-caption text-ink-600 shrink-0 sm:w-28 sm:text-right">{c.delai}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          </div>
        )}
      </div>
    </PageShell>
  );
}
