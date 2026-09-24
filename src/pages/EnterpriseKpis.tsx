import React, { useState } from 'react';
import { Download, Settings } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { DataTable, type DataTableColumn } from '../components/patterns/DataTable';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { FilterChip } from '../components/ui/FilterChip';
import { Tabs } from '../components/ui/Tabs';
import { BarChart } from '../components/charts/BarChart';
import { PageShell } from '../components/layout';

// ─── Mock data ────────────────────────────────────────────────────────────────

const PERIOD_OPTIONS = [
  { id: 'week', label: 'Semaine' },
  { id: 'month', label: 'Mois' },
  { id: 'quarter', label: 'Trimestre' },
  { id: 'year', label: 'Année' },
];

const DEPT_OPTIONS = [
  { id: 'all', label: 'Tous' },
  { id: 'product', label: 'Product & Tech' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'finance', label: 'Finance' },
  { id: 'rh', label: 'RH' },
  { id: 'direction', label: 'Direction' },
];

const TAB_ITEMS = [
  { id: 'dept', label: 'Par département' },
  { id: 'comp', label: 'Par compétence' },
  { id: 'trends', label: 'Tendances' },
];

/* Un seul ton pour les six chiffres (ils étaient en teal, blanc et orange sur
   deux lignes) ; les montants et pourcentages à la française. */
const MAIN_KPIS = [
  {
    value: '340',
    sub: '%',
    label: 'ROI de la formation',
    delta: '↑ 12\u00a0%',
    deltaDirection: 'up' as const,
  },
  {
    value: '1\u00a0240',
    sub: '€',
    label: 'Coût par apprenant',
    delta: '↓ 8\u00a0%',
    deltaDirection: 'down' as const,
    // Un coût qui baisse est une bonne nouvelle : vert, pas rouge.
    polarity: 'lower-is-better' as const,
  },
  {
    value: '72',
    label: 'NPS de la plateforme',
    delta: '↑ 4 pts',
    deltaDirection: 'up' as const,
  },
  {
    value: '47',
    label: 'Certifications Dreyfus',
    delta: '↑ 9 ce trimestre',
    deltaDirection: 'up' as const,
  },
  {
    value: '1\u00a0840',
    sub: 'h',
    label: 'Heures de formation',
    delta: '↑ 15\u00a0%',
    deltaDirection: 'up' as const,
  },
  {
    value: '91',
    sub: '%',
    label: 'Rétention post-formation',
    delta: '↑ 3\u00a0%',
    deltaDirection: 'up' as const,
  },
];

const DEPARTMENTS = [
  { name: 'Product & Tech', learners: 34, avgDreyfusRaw: 3.4, engagement: 75, roi: '380%' },
  { name: 'Marketing', learners: 28, avgDreyfusRaw: 2.9, engagement: 62, roi: '310%' },
  { name: 'Finance', learners: 22, avgDreyfusRaw: 3.1, engagement: 71, roi: '350%' },
  { name: 'RH', learners: 18, avgDreyfusRaw: 3.6, engagement: 83, roi: '420%' },
  { name: 'Direction', learners: 12, avgDreyfusRaw: 4.0, engagement: 91, roi: '520%' },
  { name: 'Support', learners: 13, avgDreyfusRaw: 2.6, engagement: 54, roi: '260%' },
];

// Engagement et ROI sont rendus en barre / span stylé : le tri lit les valeurs
// brutes `engagementTri` / `roiTri`, portées par la rangée.
/* Les colonnes de chiffres s'alignent à droite (doctrine § 3). */
const TABLE_COLUMNS: DataTableColumn[] = [
  { key: 'name', label: 'Département', sortable: true },
  { key: 'learners', label: 'Apprenants', sortable: true, align: 'right', sortValue: (r) => r.learnersTri as number },
  { key: 'avgDreyfus', label: 'Dreyfus moyen', sortable: true, align: 'right', sortValue: (r) => r.dreyfusTri as number },
  { key: 'engagement', label: 'Engagement', sortable: true, width: '180px', sortValue: (r) => r.engagementTri as number },
  { key: 'roi', label: 'ROI', sortable: true, align: 'right', sortValue: (r) => r.roiTri as number },
];

const dreyfusFr = (n: number) => n.toFixed(1).replace('.', ',');

const COMPETENCES = [
  { label: 'Leadership', pct: 64, dreyfus: 3.2, badge: 'info' as const },
  { label: 'Communication', pct: 70, dreyfus: 3.5, badge: 'success' as const },
  { label: 'Analyse', pct: 56, dreyfus: 2.8, badge: 'danger' as const },
  { label: 'Tech & Digital', pct: 74, dreyfus: 3.7, badge: 'success' as const },
  { label: 'Créativité', pct: 48, dreyfus: 2.4, badge: 'danger' as const },
  { label: 'Coopération', pct: 62, dreyfus: 3.1, badge: 'info' as const },
];

const ENGAGEMENT_TREND = [58, 62, 65, 68, 71, 68];
const ENGAGEMENT_TREND_CHART = ENGAGEMENT_TREND.map((value, i) => ({
  label: `M${i + 1}`,
  value,
}));

/* Un groupe de pastilles se nomme comme un champ : 16 / 600 ink-900 (le motif
   des filtres du Journal, commit a43e6010). */
const FILTER_GROUP_LABEL = 'font-body text-body font-semibold text-ink-900';

// ─── Component ────────────────────────────────────────────────────────────────

export default function EnterpriseKpis() {
  const [activePeriod, setActivePeriod] = useState('month');
  const [activeDept, setActiveDept] = useState('all');
  const [activeTab, setActiveTab] = useState('dept');

  /* Le Dreyfus moyen et le ROI sont des données : un chiffre en encre, pas un
     `Badge` coloré selon un seuil jamais écrit, ni un vert de « réussite ». */
  const tableRows = DEPARTMENTS.map((d) => ({
    name: d.name,
    learnersTri: d.learners,
    dreyfusTri: d.avgDreyfusRaw,
    engagementTri: d.engagement,
    roiTri: parseInt(d.roi, 10),
    learners: <span className="tabular-nums">{d.learners}</span>,
    avgDreyfus: <span className="tabular-nums text-ink-900">{dreyfusFr(d.avgDreyfusRaw)}</span>,
    engagement: (
      <div className="flex items-center gap-stack-xs min-w-28">
        <ProgressBar value={d.engagement} fill="brand" size="sm" valueLabel={false} className="flex-1" aria-label={`Engagement : ${d.name}`} />
        <span className="text-caption text-ink-600 tabular-nums shrink-0 whitespace-nowrap">{d.engagement}{'\u00a0'}%</span>
      </div>
    ),
    roi: (
      <span className="font-semibold text-ink-900 tabular-nums whitespace-nowrap">{parseInt(d.roi, 10)}{'\u00a0'}%</span>
    ),
  }));

  /* Passe typographique du 2026-09-24 : haut de page au padding de
     `PageShell` ; les deux rangées de pastilles sont nommées (« Période »,
     « Département ») et forment un bloc avec les chiffres qu'elles règlent ;
     chaque onglet ouvre sur un titre de section h2 hors de la carte ; la
     tendance se dit en une phrase sous son titre, plus dans une carte teintée
     posée dans la carte. */
  return (
    <PageShell width="wide">
      <PageHero
        eyebrow="Espace entreprise"
        title="Indicateurs détaillés"
        summary="Les indicateurs de performance par département, par compétence et par période."
        tone="flat"
        trailing={
          /* Deux outils, pas d'action principale : une page de consultation
             n'a pas de `solid` (arbitrage n°19). */
          <div className="flex flex-wrap gap-stack-xs">
            <Button
              emphasis="ghost"
              tone="brand"
              size="md"
              leadingIcon={<Download size={16} />}
            >
              Exporter
            </Button>
            <Button
              emphasis="ghost"
              tone="brand"
              size="md"
              leadingIcon={<Settings size={16} />}
            >
              Configurer
            </Button>
          </div>
        }
      />

      {/* Filtres et chiffres : un bloc. */}
      <div className="flex flex-col gap-stack-lg">
        <div className="flex flex-wrap gap-x-section gap-y-stack">
          <div className="flex flex-col gap-stack-xs" role="group" aria-labelledby="kpis-filtre-periode">
            <span id="kpis-filtre-periode" className={FILTER_GROUP_LABEL}>Période</span>
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

          <div className="flex flex-col gap-stack-xs" role="group" aria-labelledby="kpis-filtre-departement">
            <span id="kpis-filtre-departement" className={FILTER_GROUP_LABEL}>Département</span>
            <div className="flex flex-wrap gap-stack-xs">
              {DEPT_OPTIONS.map((d) => (
                <FilterChip
                  key={d.id}
                  label={d.label}
                  active={activeDept === d.id}
                  onClick={() => setActiveDept(d.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-stack">
          {MAIN_KPIS.map((kpi) => (
            <StatCard
              key={kpi.label}
              value={kpi.value}
              sub={kpi.sub}
              label={kpi.label}
              delta={kpi.delta}
              deltaDirection={kpi.deltaDirection}
              polarity={'polarity' in kpi ? kpi.polarity : undefined}
              size="md"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-stack-lg">
        <Tabs
          items={TAB_ITEMS}
          value={activeTab}
          onChange={setActiveTab}
          variant="underline"
          label="Vues des indicateurs"
        />

        {/* Tab : Par département */}
        {activeTab === 'dept' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Progression Dreyfus par département" meta={`${DEPARTMENTS.length} départements`} />
            <DataTable
              columns={TABLE_COLUMNS}
              rows={tableRows}
              pageSize={10}
            />
          </section>
        )}

        {/* Tab : Par compétence */}
        {activeTab === 'comp' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Maîtrise par compétence" meta="Niveau Dreyfus moyen, toute l'entreprise" />
            <Card>
              <ul className="flex flex-col gap-stack" aria-label="Niveau moyen par compétence">
                {COMPETENCES.map((c) => (
                  <li key={c.label} className="flex flex-col gap-stack-3xs sm:flex-row sm:items-center sm:gap-stack">
                    <span className="sm:w-40 sm:shrink-0 text-body font-semibold text-ink-900">
                      {c.label}
                    </span>
                    {/* Le niveau se lit sur son échelle (1 à 5). */}
                    <ProgressBar
                      value={c.dreyfus}
                      max={5}
                      fill="brand"
                      size="sm"
                      layout="inline"
                      valueLabel={`${dreyfusFr(c.dreyfus)} / 5`}
                      aria-label={`${c.label} : niveau moyen`}
                      className="flex-1"
                    />
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        )}

        {/* Tab : Tendances */}
        {activeTab === 'trends' && (
          <section className="flex flex-col gap-stack">
            <SectionHeader
              title="Évolution de l'engagement"
              subtitle="L'engagement gagne 10 points en six mois, et le niveau Dreyfus moyen 0,4."
              meta="6 derniers mois, en %"
            />
            <Card>
              <BarChart data={ENGAGEMENT_TREND_CHART} dataKey="value" size="sm" layout="vertical" ariaLabel="Taux d'engagement mensuel sur 6 mois" />
            </Card>
          </section>
        )}
      </div>
    </PageShell>
  );
}
