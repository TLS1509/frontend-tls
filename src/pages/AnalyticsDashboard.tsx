import React, { useState, useMemo } from 'react';
import {
  Download,
  RefreshCw,
  Flame,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { FilterChip } from '../components/ui/FilterChip';
import { Tabs } from '../components/ui/Tabs';
import { DataTable } from '../components/patterns/DataTable';
import { PageShell } from '../components/layout';
import { LineChart } from '../components/charts/LineChart';
import { ComposedChart } from '../components/charts/ComposedChart';
import { AreaChart } from '../components/charts/AreaChart';
import { PieChart } from '../components/charts/PieChart';
import { MOCK_LEARNER_PROFILES, MOCK_COACH_TEAM_STATS } from '../data/analytics';

// ─── Mock Data Generation ────────────────────────────────────────────────────

/**
 * Generate 12 weeks of XP progression data
 */
const generateXpProgressionData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 84); // 12 weeks back

  for (let i = 0; i < 12; i++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() + i * 7);
    const weekLabel = `S${i + 1}`;

    // Generate cumulative XP for top 4 learners
    const baseXpPerWeek = [280, 260, 140, 75];
    data.push({
      label: weekLabel,
      'Nadia Ferreira': Math.round(280 * (i + 1) + Math.random() * 50),
      'Camille Durand': Math.round(260 * (i + 1) + Math.random() * 60),
      'Sophie Martin': Math.round(140 * (i + 1) + Math.random() * 30),
      'Pierre Bernard': Math.round(75 * (i + 1) + Math.random() * 15),
    });
  }
  return data;
};

/**
 * Generate 12 weeks of activity vs performance data
 */
const generateActivityPerformanceData = () => {
  const data = [];
  const activities = [24, 26, 28, 22, 30, 32, 25, 28, 35, 33, 36, 38];
  const scores = [72, 74, 76, 71, 78, 80, 77, 79, 81, 82, 84, 85];

  for (let i = 0; i < 12; i++) {
    data.push({
      label: `S${i + 1}`,
      'Actions': activities[i],
      'Taux réussite': scores[i],
    });
  }
  return data;
};

/**
 * Generate 12 weeks of learning hours distribution
 */
const generateLearningHoursData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push({
      label: `S${i + 1}`,
      'Leçons': Math.round(40 + Math.random() * 20),
      'Coaching': Math.round(20 + Math.random() * 15),
      'Autoformation': Math.round(15 + Math.random() * 10),
    });
  }
  return data;
};

/**
 * Generate learner status distribution
 */
const STATUS_LABEL: Record<string, string> = {
  'on-track': 'Sur la bonne voie',
  'at-risk': 'À risque',
  stuck: 'Bloqué',
};

const dreyfusFr = (n: number) => n.toFixed(1).replace('.', ',');

/* Un groupe de pastilles se nomme comme un champ : 16 / 600 ink-900. */
const FILTER_GROUP_LABEL = 'font-body text-body font-semibold text-ink-900';

const generateLearnerStatusData = () => {
  const onTrack = MOCK_LEARNER_PROFILES.filter((l) => l.status === 'on-track').length;
  const atRisk = MOCK_LEARNER_PROFILES.filter((l) => l.status === 'at-risk').length;
  const stuck = MOCK_LEARNER_PROFILES.filter((l) => l.status === 'stuck').length;

  // En français, et la couleur suit la gravité : « Bloqué », le plus grave,
  // était en ambre et « À risque » en corail (audit du 23/09).
  return [
    { label: 'Sur la bonne voie', value: onTrack, color: '#9DBEBA' },
    { label: 'À risque', value: atRisk, color: '#F8B044' },
    { label: 'Bloqué', value: stuck, color: '#F28559' },
  ];
};

// ─── Component ────────────────────────────────────────────────────────────

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activePeriod, setActivePeriod] = useState('month');
  const [sortByLearners, setSortByLearners] = useState<'xp' | 'streak' | 'level'>('xp');

  // Memoized data generation
  const xpProgressionData = useMemo(() => generateXpProgressionData(), []);
  const activityPerformanceData = useMemo(() => generateActivityPerformanceData(), []);
  const learningHoursData = useMemo(() => generateLearningHoursData(), []);
  const learnerStatusData = useMemo(() => generateLearnerStatusData(), []);

  // Sort learners based on selected metric
  const sortedLearners = useMemo(() => {
    const sorted = [...MOCK_LEARNER_PROFILES];
    if (sortByLearners === 'xp') {
      sorted.sort((a, b) => b.totalXp - a.totalXp);
    } else if (sortByLearners === 'streak') {
      sorted.sort((a, b) => b.streak - a.streak);
    } else {
      sorted.sort((a, b) => b.dreyfusAvg - a.dreyfusAvg);
    }
    return sorted;
  }, [sortByLearners]);

  // Learner ranking table rows — des chiffres en encre, alignés à droite ; le
  // niveau est une donnée (plus un `Badge` coloré selon un seuil non écrit).
  const learnerTableRows = sortedLearners.map((learner, idx) => ({
    rank: <span className="tabular-nums">{idx + 1}</span>,
    name: <span className="font-semibold text-ink-900">{learner.name}</span>,
    level: <span className="tabular-nums text-ink-900">{dreyfusFr(learner.dreyfusAvg)}</span>,
    xp: <span className="tabular-nums text-ink-900">{learner.totalXp}</span>,
    streak: (
      <span className="inline-flex items-center gap-stack-3xs">
        <Flame size={14} className="text-secondary-700" aria-hidden="true" />
        <span className="tabular-nums">{learner.streak}</span>
      </span>
    ),
    status: (
      <Badge
        variant={
          learner.status === 'on-track'
            ? 'success'
            : learner.status === 'at-risk'
              ? 'sun'
              : 'danger'
        }
        size="compact"
      >
        {STATUS_LABEL[learner.status]}
      </Badge>
    ),
    progress: (
      <div className="flex items-center gap-stack-xs min-w-[8rem]">
        <ProgressBar value={learner.progressPercent} fill="brand" size="sm" valueLabel={false} className="flex-1" aria-label={`Progression de ${learner.name}`} />
        <span className="text-caption text-ink-600 w-10 text-right tabular-nums whitespace-nowrap">{learner.progressPercent}{'\u00a0'}%</span>
      </div>
    ),
  }));

  const learnerTableColumns = [
    { key: 'rank', label: 'Rang', sortable: false, align: 'right' as const },
    { key: 'name', label: 'Apprenant', sortable: false },
    { key: 'level', label: 'Niveau', sortable: false, align: 'right' as const },
    { key: 'xp', label: 'XP total', sortable: false, align: 'right' as const },
    { key: 'streak', label: 'Série', sortable: false },
    { key: 'status', label: 'Statut', sortable: false },
    { key: 'progress', label: 'Progression', sortable: false },
  ];

  // Competency adoption data
  const competencies = [
    { name: 'Leadership', adoption: 7, avgLevel: 3.5 },
    { name: 'Communication', adoption: 8, avgLevel: 3.6 },
    { name: 'Analyse', adoption: 6, avgLevel: 2.8 },
    { name: 'Tech & Outils', adoption: 7, avgLevel: 3.4 },
    { name: 'Créativité', adoption: 5, avgLevel: 2.6 },
    { name: 'Coopération', adoption: 6, avgLevel: 3.1 },
  ];

  const statusCounts = [
    { key: 'on-track', label: 'Sur la bonne voie', icon: <CheckCircle size={20} className="text-success-fg" aria-hidden="true" /> },
    { key: 'at-risk', label: 'À risque', icon: <AlertCircle size={20} className="text-accent-800" aria-hidden="true" /> },
    { key: 'stuck', label: 'Bloqués', icon: <AlertCircle size={20} className="text-danger-fg" aria-hidden="true" /> },
  ].map((s) => ({ ...s, count: MOCK_LEARNER_PROFILES.filter((l) => l.status === s.key).length }));

  /* Passe typographique du 2026-09-24 :
     - en-tête `flat` au padding de `PageShell` (il était une carte de verre
       collée au haut de la fenêtre, seule de son espèce dans la tranche) ;
     - chaque graphique est une section à h2, dans UNE carte (il était dans une
       `SectionCard` puis dans un `ChartContainer` : deux coques) ;
     - légendes et axes en français (S1…S12, « Sur la bonne voie ») ;
     - les chiffres en encre : le teal et l'orange ne disent pas qu'un XP ou
       une série compte plus ; le titre « Compétences en retard » était en
       `warning-base` (#F8B044), illisible sur fond clair. */
  return (
    <PageShell width="wide">
      <PageHero
        eyebrow="Analyses"
        title="Tableau de bord d'analyse"
        summary="Engagement, progression Dreyfus et usage des ressources d'apprentissage de l'équipe."
        tone="flat"
        trailing={
          /* Deux outils, pas d'action principale : une page de consultation
             n'a pas de `solid` (arbitrage n°19). */
          <div className="flex flex-wrap items-center gap-stack-xs">
            <Button emphasis="ghost" tone="brand" size="md" leadingIcon={<Download size={16} />}>
              Exporter
            </Button>
            <Button emphasis="ghost" tone="brand" size="md" leadingIcon={<RefreshCw size={16} />}>
              Actualiser
            </Button>
          </div>
        }
      />

      {/* La période et les chiffres qu'elle règle : un bloc. */}
      <div className="flex flex-col gap-stack-lg">
        <div className="flex flex-col gap-stack-xs" role="group" aria-labelledby="analyse-filtre-periode">
          <span id="analyse-filtre-periode" className={FILTER_GROUP_LABEL}>Période</span>
          <div className="flex flex-wrap gap-stack-xs">
            {['week', 'month', 'quarter', 'year'].map((p) => (
              <FilterChip
                key={p}
                label={p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : p === 'quarter' ? 'Trimestre' : 'Année'}
                active={activePeriod === p}
                onClick={() => setActivePeriod(p)}
              />
            ))}
          </div>
        </div>

        {/* Main KPI Cards — un seul ton. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard
            value={MOCK_COACH_TEAM_STATS.totalLearners.toString()}
            label="Apprenants"
            delta="Inscrits"
            size="md"
          />
          <StatCard
            value={MOCK_COACH_TEAM_STATS.activeLearners.toString()}
            label="Actifs"
            delta="↑ 2 vs semaine dernière"
            deltaDirection="up"
            size="md"
          />
          <StatCard
            value={dreyfusFr(MOCK_COACH_TEAM_STATS.avgDreyfus)}
            sub="/ 5"
            label="Niveau Dreyfus moyen"
            delta="Tendance stable"
            size="md"
          />
          <StatCard
            value={`${Math.round((MOCK_COACH_TEAM_STATS.activeLearners / MOCK_COACH_TEAM_STATS.totalLearners) * 100)}`}
            sub="%"
            label="Taux d'engagement"
            delta={'↑ 5\u00a0% vs mois dernier'}
            deltaDirection="up"
            size="md"
          />
        </div>
      </div>

      <div className="flex flex-col gap-stack-lg">
        {/* Tab Navigation */}
        <Tabs
          items={[
            { id: 'overview', label: 'Vue d\'ensemble' },
            { id: 'learners', label: 'Apprenants' },
            { id: 'competencies', label: 'Compétences' },
          ]}
          value={activeTab}
          onChange={setActiveTab}
          label="Vues du tableau de bord"
        />

        {/* OVERVIEW TAB ─────────────────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-page">

            {/* XP Progression Chart */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Progression XP cumulée" meta="12 dernières semaines, les 4 premiers du classement" />
              <Card>
                <LineChart
                  data={xpProgressionData}
                  series={[
                    { key: 'Nadia Ferreira', label: 'Nadia Ferreira', color: '#55A1B4', strokeWidth: 3 },
                    { key: 'Camille Durand', label: 'Camille Durand', color: '#ED843A', strokeWidth: 3 },
                    { key: 'Sophie Martin', label: 'Sophie Martin', color: '#F8B044', strokeWidth: 2 },
                    { key: 'Pierre Bernard', label: 'Pierre Bernard', color: '#9DBEBA', strokeWidth: 2, strokeDasharray: '5 5' },
                  ]}
                  size="lg"
                  showLegend
                  smooth
                  showDots
                />
              </Card>
            </section>

            {/* Activity vs Performance Composed Chart */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Activité et taux de réussite" meta="12 dernières semaines" />
              <Card>
                <ComposedChart
                  data={activityPerformanceData}
                  series={[
                    { key: 'Actions', label: 'Actions complétées', type: 'bar', color: '#55A1B4', yAxisId: 'left' },
                    { key: 'Taux réussite', label: 'Taux de réussite (%)', type: 'line', color: '#ED843A', yAxisId: 'right' },
                  ]}
                  size="lg"
                  showLegend
                  dualAxis
                  leftAxisLabel="Actions"
                  rightAxisLabel="Taux (%)"
                />
              </Card>
            </section>

            {/* Learning Hours Distribution Area Chart */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Répartition des heures d'apprentissage" meta="Heures par semaine, 12 dernières semaines" />
              <Card>
                <AreaChart
                  data={learningHoursData}
                  series={[
                    { key: 'Leçons', label: 'Leçons', color: '#55A1B4' },
                    { key: 'Coaching', label: 'Sessions coaching', color: '#ED843A' },
                    { key: 'Autoformation', label: 'Autoformation', color: '#F8B044' },
                  ]}
                  size="lg"
                  showLegend
                  stacked
                  smooth
                  fillOpacity={0.6}
                />
              </Card>
            </section>

            {/* Learner Status Distribution */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Statut des apprenants" meta={`${MOCK_LEARNER_PROFILES.length} apprenants`} />
              <div className="grid md:grid-cols-2 gap-stack items-start">
                <Card className="flex justify-center">
                  <PieChart
                    data={learnerStatusData}
                    size="sm"
                    showLegend
                    showLabels
                  />
                </Card>

                {/* Les trois comptes : des rangées dans une carte. */}
                <Card className="p-0">
                  <ul className="flex flex-col divide-y divide-ink-100" aria-label="Apprenants par statut">
                    {statusCounts.map((s) => (
                      <li key={s.key} className="flex items-center gap-stack px-stack-md sm:px-stack-lg py-stack">
                        <span className="shrink-0 inline-flex">{s.icon}</span>
                        <span className="flex-1 text-body text-ink-900">{s.label}</span>
                        <span className="text-body font-semibold text-ink-900 tabular-nums">{s.count}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </section>

          </div>
        )}

        {/* LEARNERS TAB ─────────────────────────────────────────────────────────── */}
        {activeTab === 'learners' && (
          <div className="flex flex-col gap-page">

            {/* Learner Rankings Table, avec son tri */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Classement des apprenants" meta={`${sortedLearners.length} apprenants`} />
              <div className="flex flex-col gap-stack-xs" role="group" aria-labelledby="analyse-tri">
                <span id="analyse-tri" className={FILTER_GROUP_LABEL}>Trier par</span>
                <div className="flex gap-stack-xs flex-wrap">
                  {(['xp', 'streak', 'level'] as const).map((metric) => (
                    <FilterChip
                      key={metric}
                      label={metric === 'xp' ? 'XP total' : metric === 'streak' ? 'Série' : 'Niveau'}
                      active={sortByLearners === metric}
                      onClick={() => setSortByLearners(metric)}
                    />
                  ))}
                </div>
              </div>
              <DataTable columns={learnerTableColumns} rows={learnerTableRows} />
            </section>

            {/* Top Performers Cards */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Les trois premiers" />
              <div className="grid md:grid-cols-3 gap-stack">
                {sortedLearners.slice(0, 3).map((learner, idx) => (
                  /* Anatomie de carte : surtitre 4 · titre 8 · méta 12 · chiffres. */
                  <Card key={learner.userId} className="flex flex-col gap-stack-lg">
                    <div className="flex flex-col gap-stack-3xs">
                      <p className="text-caption font-semibold text-ink-600">{idx === 0 ? '1er' : `${idx + 1}e`}</p>
                      <h3 className="font-display text-h3 text-ink-900">{learner.name}</h3>
                      <p className="text-caption text-ink-600">{learner.role} · Niveau {dreyfusFr(learner.dreyfusAvg)}</p>
                    </div>
                    <dl className="flex gap-section">
                      <div className="flex flex-col gap-stack-3xs">
                        <dt className="text-caption font-semibold text-ink-600">XP</dt>
                        <dd className="font-display text-h3 text-ink-900 tabular-nums">{learner.totalXp}</dd>
                      </div>
                      <div className="flex flex-col gap-stack-3xs">
                        <dt className="text-caption font-semibold text-ink-600">Série</dt>
                        <dd className="font-display text-h3 text-ink-900 tabular-nums">{learner.streak}</dd>
                      </div>
                    </dl>
                    <ProgressBar value={learner.progressPercent} fill="brand" size="md" label="Progression" />
                  </Card>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* COMPETENCIES TAB ────────────────────────────────────────────────────── */}
        {activeTab === 'competencies' && (
          <div className="flex flex-col gap-page">

            {/* Competency Distribution */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Adoption et progression des compétences" meta="Niveau Dreyfus moyen et nombre d'apprenants" />
              <Card>
                <ul className="flex flex-col gap-stack" aria-label="Compétences">
                  {competencies.map((comp) => (
                    <li key={comp.name} className="flex flex-col gap-stack-3xs sm:flex-row sm:items-center sm:gap-stack">
                      <span className="sm:w-40 sm:shrink-0 text-body font-semibold text-ink-900">{comp.name}</span>
                      <ProgressBar
                        value={comp.avgLevel}
                        max={5}
                        fill="brand"
                        size="md"
                        layout="inline"
                        valueLabel={`${dreyfusFr(comp.avgLevel)} / 5`}
                        aria-label={`${comp.name} : niveau moyen`}
                        className="flex-1"
                      />
                      <span className="sm:w-28 sm:shrink-0 sm:text-right text-caption text-ink-600 tabular-nums whitespace-nowrap">{comp.adoption} apprenants</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>

            {/* Competency Health Cards */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Santé des compétences" />
              <div className="grid md:grid-cols-2 gap-stack">
                <Card className="flex flex-col gap-stack-xs bg-success-bg/30 border border-success-base/20">
                  <h3 className="flex items-start gap-stack-xs font-display text-h3 text-ink-900">
                    <span className="shrink-0 inline-flex items-center h-lh" aria-hidden="true"><CheckCircle size={20} className="text-success-fg" /></span>
                    Compétences saines
                  </h3>
                  <p className="text-body font-semibold text-ink-900">Leadership, Communication</p>
                  <p className="text-body text-ink-700">Plus de 70{'\u00a0'}% d'adoption, niveau D3 et au-delà.</p>
                </Card>

                <Card className="flex flex-col gap-stack-xs bg-warning-bg/30 border border-warning-base/20">
                  <h3 className="flex items-start gap-stack-xs font-display text-h3 text-ink-900">
                    <span className="shrink-0 inline-flex items-center h-lh" aria-hidden="true"><AlertCircle size={20} className="text-accent-800" /></span>
                    Compétences en retard
                  </h3>
                  <p className="text-body font-semibold text-ink-900">Créativité, Analyse</p>
                  <p className="text-body text-ink-700">Moins de 50{'\u00a0'}% d'adoption : un accompagnement ciblé est à prévoir.</p>
                </Card>
              </div>
            </section>

          </div>
        )}
      </div>
    </PageShell>
  );
}
