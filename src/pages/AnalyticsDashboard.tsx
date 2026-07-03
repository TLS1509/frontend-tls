import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Download,
  RefreshCw,
  TrendingUp,
  Users,
  Award,
  Flame,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
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
import { ChartContainer } from '../components/charts/ChartContainer';
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
    const weekLabel = `W${i + 1}`;

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
      label: `W${i + 1}`,
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
      label: `W${i + 1}`,
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
const generateLearnerStatusData = () => {
  const onTrack = MOCK_LEARNER_PROFILES.filter((l) => l.status === 'on-track').length;
  const atRisk = MOCK_LEARNER_PROFILES.filter((l) => l.status === 'at-risk').length;
  const stuck = MOCK_LEARNER_PROFILES.filter((l) => l.status === 'stuck').length;

  return [
    { label: 'On track', value: onTrack, color: '#9DBEBA' },
    { label: 'At risk', value: atRisk, color: '#F28559' },
    { label: 'Stuck', value: stuck, color: '#F8B044' },
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

  // Learner ranking table rows
  const learnerTableRows = sortedLearners.map((learner, idx) => ({
    rank: idx + 1,
    name: learner.name,
    level: (
      <Badge
        variant={learner.dreyfusAvg >= 4 ? 'success' : learner.dreyfusAvg >= 3 ? 'info' : 'danger'}
        size="sm"
      >
        D{learner.dreyfusAvg.toFixed(1)}
      </Badge>
    ),
    xp: <span className="font-semibold text-primary-700">{learner.totalXp}</span>,
    streak: (
      <div className="flex items-center gap-1">
        <Flame size={14} className="text-secondary-500" />
        <span className="font-semibold">{learner.streak}</span>
      </div>
    ),
    status: (
      <Badge
        variant={
          learner.status === 'on-track'
            ? 'success'
            : learner.status === 'at-risk'
              ? 'warning'
              : 'danger'
        }
        size="sm"
      >
        {learner.status === 'on-track' ? 'On track' : learner.status === 'at-risk' ? 'At risk' : 'Stuck'}
      </Badge>
    ),
    progress: (
      <div className="flex items-center gap-2">
        <ProgressBar value={learner.progressPercent} fill="primary" size="sm" />
        <span className="text-caption text-ink-600 w-10 text-right">{learner.progressPercent}%</span>
      </div>
    ),
  }));

  const learnerTableColumns = [
    { key: 'rank', label: 'Rang', sortable: false },
    { key: 'name', label: 'Apprenant', sortable: false },
    { key: 'level', label: 'Niveau', sortable: false },
    { key: 'xp', label: 'XP total', sortable: false },
    { key: 'streak', label: 'Streak', sortable: false },
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

  return (
    <PageShell width="wide" noPadTop>
      <EditorialHero
        eyebrow="Analytics · Dashboard"
        title="Tableau de bord d'analyse"
        summary="Visualisation complète des KPIs d'engagement, progression Dreyfus, et utilisation des ressources d'apprentissage."
        tone="default"
        trailing={
          <div className="flex items-center gap-stack-xs">
            <Button variant="ghost" size="md" leadingIcon={<Download size={16} />}>
              Exporter
            </Button>
            <Button variant="secondary" size="md" leadingIcon={<RefreshCw size={16} />}>
              Actualiser
            </Button>
          </div>
        }
      />

      <div className="flex flex-col gap-section">

        {/* Period Filter */}
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

        {/* Main KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard
            value={MOCK_COACH_TEAM_STATS.totalLearners.toString()}
            label="Apprenants"
            delta="Inscrits"
            deltaDirection="neutral"
            variant="primary"
            size="md"
          />
          <StatCard
            value={MOCK_COACH_TEAM_STATS.activeLearners.toString()}
            label="Actifs"
            delta={`↑ 2 vs semaine`}
            deltaDirection="up"
            variant="success"
            size="md"
          />
          <StatCard
            value={`${MOCK_COACH_TEAM_STATS.avgDreyfus}`}
            label="Dreyfus moyen"
            delta="Tendance stable"
            deltaDirection="neutral"
            variant="primary"
            size="md"
          />
          <StatCard
            value={`${Math.round((MOCK_COACH_TEAM_STATS.activeLearners / MOCK_COACH_TEAM_STATS.totalLearners) * 100)}%`}
            label="Taux engagement"
            delta="↑ 5% vs mois"
            deltaDirection="up"
            variant="warm"
            size="md"
          />
        </div>

        {/* Tab Navigation */}
        <Tabs
          items={[
            { id: 'overview', label: 'Vue d\'ensemble' },
            { id: 'learners', label: 'Apprenants' },
            { id: 'competencies', label: 'Compétences' },
          ]}
          value={activeTab}
          onChange={setActiveTab}
        />

        {/* OVERVIEW TAB ─────────────────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-section">

            {/* XP Progression Chart */}
            <SectionCard title="Progression XP cumulatif (12 semaines)" titleIcon={<TrendingUp size={18} />}>
              <ChartContainer>
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
              </ChartContainer>
            </SectionCard>

            {/* Activity vs Performance Composed Chart */}
            <SectionCard title="Activité vs Taux de réussite" titleIcon={<BarChart3 size={18} />}>
              <ChartContainer>
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
              </ChartContainer>
            </SectionCard>

            {/* Learning Hours Distribution Area Chart */}
            <SectionCard title="Répartition des heures d'apprentissage" titleIcon={<Clock size={18} />}>
              <ChartContainer>
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
              </ChartContainer>
            </SectionCard>

            {/* Learner Status Distribution Pie Chart */}
            <div className="grid md:grid-cols-2 gap-section">
              <SectionCard title="Distribution des statuts apprenants" titleIcon={<Users size={18} />}>
                <div className="flex justify-center w-full">
                  <PieChart
                    data={learnerStatusData}
                    size="sm"
                    showLegend
                    showValues
                  />
                </div>
              </SectionCard>

              {/* Status Summary Cards */}
              <div className="flex flex-col gap-stack">
                <Card className="flex items-start gap-stack p-stack md:p-stack-lg">
                  <div className="p-2 rounded-md bg-success-bg">
                    <CheckCircle size={20} className="text-success-fg" />
                  </div>
                  <div>
                    <div className="text-h4 font-bold text-ink-900">{MOCK_LEARNER_PROFILES.filter(l => l.status === 'on-track').length}</div>
                    <div className="text-body-sm text-ink-600">Sur la bonne voie</div>
                  </div>
                </Card>

                <Card className="flex items-start gap-stack p-stack md:p-stack-lg">
                  <div className="p-2 rounded-md bg-warning-bg">
                    <AlertCircle size={20} className="text-warning-fg" />
                  </div>
                  <div>
                    <div className="text-h4 font-bold text-ink-900">{MOCK_LEARNER_PROFILES.filter(l => l.status === 'at-risk').length}</div>
                    <div className="text-body-sm text-ink-600">À risque</div>
                  </div>
                </Card>

                <Card className="flex items-start gap-stack p-stack md:p-stack-lg">
                  <div className="p-2 rounded-md bg-danger-bg">
                    <AlertCircle size={20} className="text-danger-fg" />
                  </div>
                  <div>
                    <div className="text-h4 font-bold text-ink-900">{MOCK_LEARNER_PROFILES.filter(l => l.status === 'stuck').length}</div>
                    <div className="text-body-sm text-ink-600">Bloqués</div>
                  </div>
                </Card>
              </div>
            </div>

          </div>
        )}

        {/* LEARNERS TAB ─────────────────────────────────────────────────────────── */}
        {activeTab === 'learners' && (
          <div className="flex flex-col gap-section">

            {/* Sorting Controls */}
            <div className="flex gap-stack-xs flex-wrap">
              <span className="text-body-sm text-ink-600 font-medium">Trier par :</span>
              {(['xp', 'streak', 'level'] as const).map((metric) => (
                <FilterChip
                  key={metric}
                  label={metric === 'xp' ? 'Total XP' : metric === 'streak' ? 'Streak' : 'Niveau'}
                  active={sortByLearners === metric}
                  onClick={() => setSortByLearners(metric)}
                />
              ))}
            </div>

            {/* Learner Rankings Table */}
            <SectionCard title="Classement des apprenants" titleIcon={<Award size={18} />}>
              <DataTable columns={learnerTableColumns} rows={learnerTableRows} />
            </SectionCard>

            {/* Top Performers Cards */}
            <div>
              <div className="text-h3 font-bold text-ink-900 mb-stack">Meilleurs performants</div>
              <div className="grid md:grid-cols-3 gap-stack">
                {sortedLearners.slice(0, 3).map((learner, idx) => (
                  <Card key={learner.userId} className="flex flex-col gap-stack p-stack md:p-stack-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-caption text-ink-500 font-semibold">#{idx + 1}</div>
                        <div className="text-body-lg font-bold text-ink-900">{learner.name}</div>
                        <div className="text-body-sm text-ink-600">{learner.role}</div>
                      </div>
                      <Badge variant="success" size="sm">D{learner.dreyfusAvg.toFixed(1)}</Badge>
                    </div>
                    <div className="flex gap-stack">
                      <div>
                        <div className="text-caption text-ink-500">XP</div>
                        <div className="text-h3 font-bold text-primary-700">{learner.totalXp}</div>
                      </div>
                      <div>
                        <div className="text-caption text-ink-500">Streak</div>
                        <div className="text-h3 font-bold text-secondary-500">{learner.streak}</div>
                      </div>
                    </div>
                    <ProgressBar value={learner.progressPercent} fill="primary" size="md" />
                  </Card>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* COMPETENCIES TAB ────────────────────────────────────────────────────── */}
        {activeTab === 'competencies' && (
          <div className="flex flex-col gap-section">

            {/* Competency Distribution Table */}
            <SectionCard title="Adoption et progression des compétences" titleIcon={<TrendingUp size={18} />}>
              <div className="flex flex-col gap-stack">
                {competencies.map((comp) => (
                  <div key={comp.name} className="flex items-center gap-stack">
                    <div className="w-36 shrink-0">
                      <span className="text-body-sm font-semibold text-ink-700">{comp.name}</span>
                    </div>
                    <div className="flex-1">
                      <ProgressBar value={Math.round((comp.avgLevel / 5) * 100)} fill="brand" size="md" />
                    </div>
                    <div className="flex items-center gap-2 w-48">
                      <span className="text-caption text-ink-600">{comp.adoption} apprenants</span>
                      <Badge variant="info" size="sm">D{comp.avgLevel.toFixed(1)}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Competency Health Cards */}
            <div>
              <div className="text-h3 font-bold text-ink-900 mb-stack">Santé des compétences</div>
              <div className="grid md:grid-cols-2 gap-stack">
                <Card className="flex flex-col gap-stack p-stack md:p-stack-lg bg-success-bg/30 border border-success-base/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-success-base" />
                    <div className="text-body-lg font-bold text-success-base">Compétences saines</div>
                  </div>
                  <div className="text-h3 font-bold text-ink-900">Leadership, Communication</div>
                  <div className="text-body-sm text-ink-600">&gt; 70% d'adoption, niveau D3+</div>
                </Card>

                <Card className="flex flex-col gap-stack p-stack md:p-stack-lg bg-warning-bg/30 border border-warning-base/20">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={20} className="text-warning-base" />
                    <div className="text-body-lg font-bold text-warning-base">Compétences en retard</div>
                  </div>
                  <div className="text-h3 font-bold text-ink-900">Créativité, Analyse</div>
                  <div className="text-body-sm text-ink-600">{'<'} 50% d'adoption, focus d'accompagnement requis</div>
                </Card>
              </div>
            </div>

          </div>
        )}

      </div>
    </PageShell>
  );
}
