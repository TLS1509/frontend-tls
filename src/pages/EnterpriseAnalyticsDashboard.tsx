import React, { useState } from 'react';
import { Download, RefreshCw, Users, Award, Calendar } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { FilterChip } from '../components/ui/FilterChip';
import { Tabs } from '../components/ui/Tabs';
import { DataTable, type DataTableColumn } from '../components/patterns/DataTable';
import { BarChart } from '../components/charts/BarChart';
import { PageShell } from '../components/layout';

// ─── Mock data ────────────────────────────────────────────────────────────────

/* Chiffres à la française (virgule décimale, espace insécable avant l'unité),
   et un seul ton : quatre tuiles en trois couleurs ne disaient rien de plus. */
const KPI_MAIN = [
  { value: '127', sub: undefined, label: 'Apprenants actifs', delta: '↑ 12 ce mois', dir: 'up' as const },
  { value: '3,1', sub: '/ 5', label: 'Niveau Dreyfus moyen', delta: '↑ 0,4 ce trimestre', dir: 'up' as const },
  { value: '68', sub: '%', label: 'Taux d\'engagement', delta: '↑ 5\u00a0% vs période précédente', dir: 'up' as const },
  { value: '89', sub: undefined, label: 'Sessions de coaching par mois', delta: '↑ 8 vs mois dernier', dir: 'up' as const },
];

const DEPARTMENTS = [
  { name: 'Product & Tech', learners: 34, avgDreyfus: 3.4, engagement: 75, badgesEarned: 87 },
  { name: 'Marketing & Sales', learners: 28, avgDreyfus: 2.9, engagement: 62, badgesEarned: 54 },
  { name: 'Finance & Ops', learners: 22, avgDreyfus: 3.1, engagement: 71, badgesEarned: 61 },
  { name: 'RH & Talent', learners: 18, avgDreyfus: 3.6, engagement: 83, badgesEarned: 72 },
  { name: 'Direction', learners: 12, avgDreyfus: 4.0, engagement: 91, badgesEarned: 48 },
  { name: 'Support Client', learners: 13, avgDreyfus: 2.6, engagement: 54, badgesEarned: 29 },
];

// Dreyfus et engagement sont rendus en badge / barre : le tri lit les valeurs
// brutes `avgDreyfusTri` / `engagementTri`, portées par la rangée.
const TABLE_COLUMNS: DataTableColumn[] = [
  { key: 'name', label: 'Département', sortable: true },
  { key: 'learners', label: 'Apprenants', sortable: true, align: 'right' },
  { key: 'avgDreyfus', label: 'Dreyfus moyen', sortable: true, align: 'right', sortValue: (r) => r.avgDreyfusTri as number },
  { key: 'engagement', label: 'Engagement', sortable: true, sortValue: (r) => r.engagementTri as number },
  { key: 'badgesEarned', label: 'Badges obtenus', sortable: true, align: 'right' },
];

const DREYFUS_COUNTS = [8, 28, 52, 31, 8];
const DREYFUS_TOTAL = 127;

const COMPETENCES = ['Leadership', 'Communication', 'Analyse', 'Tech & Outils', 'Créativité', 'Coopération'];
const COMPETENCE_AVGS = [3.2, 3.5, 2.8, 3.7, 2.4, 3.1];

const dreyfusFr = (n: number) => n.toFixed(1).replace('.', ',');

const WEEKLY_ENGAGEMENT = [62, 68, 71, 65, 74, 70, 78, 68].map((value, i) => ({
  label: `S${i + 1}`,
  value,
}));

const PERIOD_OPTIONS = [
  { id: 'week', label: 'Semaine' },
  { id: 'month', label: 'Mois' },
  { id: 'quarter', label: 'Trimestre' },
  { id: 'year', label: 'Année' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function EnterpriseAnalyticsDashboard() {
  const [activePeriod, setActivePeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('kpis');

  /* La table compare des valeurs : le Dreyfus moyen était un `Badge` coloré
     selon un seuil jamais écrit (une donnée habillée en état) ; il redevient
     un chiffre, aligné à droite comme les autres colonnes numériques. */
  const tableRows = DEPARTMENTS.map((d) => ({
    ...d,
    avgDreyfusTri: d.avgDreyfus,
    engagementTri: d.engagement,
    learners: <span className="tabular-nums">{d.learners}</span>,
    badgesEarned: <span className="tabular-nums">{d.badgesEarned}</span>,
    avgDreyfus: <span className="tabular-nums text-ink-900">{dreyfusFr(d.avgDreyfus)}</span>,
    engagement: (
      <div className="flex items-center gap-stack-xs min-w-[120px]">
        <ProgressBar value={d.engagement} fill="brand" size="sm" valueLabel={false} className="flex-1" aria-label={`Engagement : ${d.name}`} />
        <span className="text-caption text-ink-600 shrink-0 tabular-nums whitespace-nowrap">{d.engagement}{'\u00a0'}%</span>
      </div>
    ),
  }));

  /* Passe typographique du 2026-09-24 : le haut de page reprend le padding de
     `PageShell` ; la période et les chiffres forment un bloc (16 px), les
     onglets et leur panneau un autre (24) ; chaque graphique est une section
     à h2, hors de sa carte (la page sautait du h1 au h3) ; la série de huit
     semaines se lit de gauche à droite, en colonnes. */
  return (
    <PageShell width="wide">
      <PageHero
        eyebrow="Espace entreprise"
        title="Analyses de l'entreprise"
        summary="Engagement, progression Dreyfus et usage du coaching, toutes équipes confondues."
        tone="flat"
        trailing={
          <div className="flex flex-wrap items-center gap-stack-xs">
            <Button emphasis="outline" size="md" leadingIcon={<Download size={16} />}>
              Exporter le rapport
            </Button>
            <Button emphasis="soft" size="md" leadingIcon={<RefreshCw size={16} />}>
              Actualiser
            </Button>
          </div>
        }
      />

      {/* La période règle les chiffres qu'elle précède : un seul bloc. */}
      <div className="flex flex-col gap-stack-lg">
        {/* Un groupe de pastilles se nomme comme un champ (16 / 600 ink-900). */}
        <div className="flex flex-col gap-stack-xs" role="group" aria-labelledby="analyses-filtre-periode">
          <span id="analyses-filtre-periode" className="font-body text-body font-semibold text-ink-900">Période</span>
          <div className="flex flex-wrap gap-stack-xs">
            {PERIOD_OPTIONS.map((p) => (
              <FilterChip
                key={p.id}
                label={p.label}
                active={activePeriod === p.id}
                onClick={() => setActivePeriod(p.id)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          {KPI_MAIN.map((kpi) => (
            <StatCard
              key={kpi.label}
              value={kpi.value}
              sub={kpi.sub}
              label={kpi.label}
              delta={kpi.delta}
              deltaDirection={kpi.dir}
              size="md"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-stack-lg">
        <Tabs
          items={[
            { id: 'kpis', label: 'Vue d\'ensemble' },
            { id: 'departments', label: 'Par département' },
            { id: 'competences', label: 'Par compétence' },
          ]}
          value={activeTab}
          onChange={setActiveTab}
          label="Vues des analyses"
        />

        {activeTab === 'kpis' && (
          <div className="flex flex-col gap-page">
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Taux d'engagement par semaine" meta="8 dernières semaines, en %" />
              <Card>
                <BarChart data={WEEKLY_ENGAGEMENT} dataKey="value" size="sm" layout="vertical" ariaLabel="Taux d'engagement par semaine, sur 8 semaines" />
              </Card>
            </section>

            <section className="flex flex-col gap-stack">
              <SectionHeader title="Répartition par niveau Dreyfus" meta={`${DREYFUS_TOTAL} apprenants`} />
              <Card>
                <ul className="flex flex-col gap-stack-sm" aria-label="Apprenants par niveau Dreyfus">
                  {DREYFUS_COUNTS.map((count, i) => {
                    const level = i + 1;
                    const pct = Math.round((count / DREYFUS_TOTAL) * 100);
                    return (
                      <li key={level} className="flex items-center gap-stack">
                        <span className="w-8 shrink-0 text-body font-semibold text-ink-900 tabular-nums">D{level}</span>
                        <ProgressBar value={pct} fill="brand" size="sm" layout="inline" aria-label={`Niveau ${level}`} className="flex-1" />
                        <span className="w-28 shrink-0 text-right text-caption text-ink-600 tabular-nums whitespace-nowrap">{count} apprenants</span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </section>

            <section className="flex flex-col gap-stack">
              <SectionHeader title="Coaching et badges" />
              <div className="grid md:grid-cols-3 gap-stack">
                <StatCard size="md" icon={<Award size={20} />} value="351" label="Badges Dreyfus obtenus" />
                <StatCard size="md" icon={<Calendar size={20} />} value="89" label="Sessions de coaching réalisées" />
                <StatCard size="md" icon={<Users size={20} />} value="94" sub="%" label="Satisfaction coaching" />
              </div>
            </section>
          </div>
        )}

        {activeTab === 'departments' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Indicateurs par département" meta={`${DEPARTMENTS.length} départements`} />
            <DataTable columns={TABLE_COLUMNS} rows={tableRows} />
          </section>
        )}

        {activeTab === 'competences' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Progression par compétence" meta="Niveau Dreyfus moyen, toute l'entreprise" />
            <Card>
              <ul className="flex flex-col gap-stack-sm" aria-label="Niveau moyen par compétence">
                {COMPETENCES.map((comp, i) => {
                  const avg = COMPETENCE_AVGS[i];
                  return (
                    <li key={comp} className="flex flex-col gap-stack-3xs sm:flex-row sm:items-center sm:gap-stack">
                      <span className="text-body text-ink-900 sm:w-40 sm:shrink-0">{comp}</span>
                      {/* Le niveau se lit sur son échelle (1 à 5), pas en pourcentage. */}
                      <ProgressBar
                        value={avg}
                        max={5}
                        fill="brand"
                        size="md"
                        layout="inline"
                        valueLabel={`${dreyfusFr(avg)} / 5`}
                        aria-label={`${comp} : niveau moyen`}
                        className="flex-1"
                      />
                    </li>
                  );
                })}
              </ul>
            </Card>
          </section>
        )}
      </div>
    </PageShell>
  );
}
