import React, { useMemo, useState } from 'react';
import { Save, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Table2, Trash2 } from 'lucide-react';
import PageHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import SectionCard from '../components/patterns/SectionCard';
import { SelectableOptionCard } from '../components/patterns/SelectableOptionCard';
import { DataTable } from '../components/patterns/DataTable';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import { FilterChip } from '../components/ui/FilterChip';
import { BarChart, type BarChartDataPoint } from '../components/charts/BarChart';
import { LineChart } from '../components/charts/LineChart';
import { PieChart } from '../components/charts/PieChart';
import { PageShell } from '../components/layout';

const METRICS = [
  'Taux complétion parcours',
  'Niveau Dreyfus moyen',
  'XP gagnés / semaine',
  'Badges débloqués',
  'Sessions coaching',
  'JAC validés',
  'Streak moyen',
  'Budget consommé',
];

const CHART_TYPES = [
  { v: 'bar', label: 'Barres', icon: BarChart3 },
  { v: 'line', label: 'Ligne', icon: LineChartIcon },
  { v: 'pie', label: 'Camembert', icon: PieChartIcon },
  { v: 'table', label: 'Tableau', icon: Table2 },
];

const GROUP_LABELS: Record<string, string[]> = {
  'département': ['Product & Tech', 'Marketing & Sales', 'Finance & Ops', 'RH & Talent', 'Direction'],
  'cohorte': ['Cohorte A', 'Cohorte B', 'Cohorte C', 'Cohorte D'],
  'apprenant': ['Sophie M.', 'Marc D.', 'Julie R.', 'Thomas L.'],
  'compétence': ['Leadership', 'Communication', 'Analyse', 'Tech Tools'],
};

const SERIES_COLORS = ['#55A1B4', '#ED843A', '#9DBEBA', '#F8B044'];

const DATE_RANGE_LABEL: Record<string, string> = {
  '7d': '7 derniers jours',
  '30d': '30 derniers jours',
  '90d': '3 derniers mois',
  '1y': '12 derniers mois',
};

/** Génère une valeur pseudo-stable (pas Math.random) à partir des index groupe/métrique. */
function mockValue(groupIdx: number, metricIdx: number): number {
  return 40 + ((groupIdx * 17 + metricIdx * 23) % 55);
}

const ManagerViewsBuilder: React.FC = () => {
  const [name, setName] = useState('Ma nouvelle vue');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['Taux complétion parcours', 'Niveau Dreyfus moyen']);
  const [chartType, setChartType] = useState('bar');
  const [groupBy, setGroupBy] = useState('département');
  const [dateRange, setDateRange] = useState('30d');

  const toggleMetric = (m: string) => {
    setSelectedMetrics((s) => (s.includes(m) ? s.filter((x) => x !== m) : [...s, m]));
  };

  const groups = GROUP_LABELS[groupBy] ?? GROUP_LABELS['département'];
  const previewMetrics = selectedMetrics.length > 0 ? selectedMetrics.slice(0, 4) : [METRICS[0]];

  // Data shape shared by bar/line/table: one row per group, one field per metric
  const chartData: BarChartDataPoint[] = useMemo(
    () =>
      groups.map((label, groupIdx) => {
        const row: BarChartDataPoint = { label };
        previewMetrics.forEach((metric, metricIdx) => {
          row[`m${metricIdx}`] = mockValue(groupIdx, metricIdx);
        });
        return row;
      }),
    [groups, previewMetrics]
  );

  const series = previewMetrics.map((metric, i) => ({
    key: `m${i}`,
    label: metric,
    color: SERIES_COLORS[i % SERIES_COLORS.length],
  }));

  // Pie preview only makes sense for a single metric distributed across groups
  const pieData = groups.map((label, groupIdx) => ({
    label,
    value: mockValue(groupIdx, 0),
    color: SERIES_COLORS[groupIdx % SERIES_COLORS.length],
  }));

  /* Passe typographique du 2026-09-24 : plus d'aplat `bg-surface` (il
     s'arrêtait net à x≈1400 et au pied de page) ; une seule coque ; chaque
     colonne s'ouvre sur son titre de section (h2), les étapes restent des
     blocs (h3 dans leur carte). Les métriques choisies étaient écrites trois
     fois (pastilles, « 2 MÉTRIQUES » et une rangée de `Badge` sous le
     graphique) : elles vivent dans les pastilles et dans la légende. */
  return (
    <PageShell width="wide">
      <PageHero
        eyebrow="Espace Manager · Vues personnalisées"
        title="Créez votre vue analytique sur mesure"
        summary="Sélectionnez vos métriques, choisissez votre type de graphique, puis sauvegardez et partagez la vue."
        tone="flat"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-x-section gap-y-page items-start">
        {/* Builder Panel */}
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Paramètres" />
          <SectionCard title="1. Nom de la vue">
            <FormGroup label="Titre">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. : Performance T2 par département" />
            </FormGroup>
          </SectionCard>

          <SectionCard title="2. Métriques">
            <div className="flex flex-wrap gap-stack-xs">
              {METRICS.map((m) => (
                <FilterChip key={m} label={m} active={selectedMetrics.includes(m)} onClick={() => toggleMetric(m)} />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="3. Filtres">
            <div className="flex flex-col gap-stack">
              <FormGroup label="Plage de dates">
                <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                  <option value="7d">7 derniers jours</option>
                  <option value="30d">30 derniers jours</option>
                  <option value="90d">3 derniers mois</option>
                  <option value="1y">12 derniers mois</option>
                </Select>
              </FormGroup>
              <FormGroup label="Grouper par">
                <Select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                  <option value="département">Département</option>
                  <option value="cohorte">Cohorte</option>
                  <option value="apprenant">Apprenant</option>
                  <option value="compétence">Compétence</option>
                </Select>
              </FormGroup>
            </div>
          </SectionCard>

          <SectionCard title="4. Type de visualisation">
            <div className="grid grid-cols-2 gap-stack-xs">
              {CHART_TYPES.map((c) => (
                <SelectableOptionCard
                  key={c.v}
                  size="sm"
                  icon={<c.icon className="w-5 h-5" />}
                  label={c.label}
                  selected={chartType === c.v}
                  onClick={() => setChartType(c.v)}
                />
              ))}
            </div>
          </SectionCard>

          {/* Arbitrage n°19 : sauvegarder la vue est l'action principale ;
              supprimer, destructif sur une page, passe en ghost danger. */}
          <div className="flex gap-stack-xs mt-stack-xs">
            <Button emphasis="solid" tone="brand" leadingIcon={<Save className="w-4 h-4" />} fullWidth>Sauvegarder</Button>
            <Button emphasis="ghost" tone="danger" iconOnly leadingIcon={<Trash2 className="w-4 h-4" />} aria-label="Supprimer" />
          </div>
        </section>

        {/* Preview Panel */}
        <section className="flex flex-col gap-stack lg:sticky lg:top-stack">
          <SectionHeader title="Aperçu en direct" />
          <Card className="flex flex-col gap-stack">
            {/* Anatomie de carte : titre 20, méta 13 juste dessous. */}
            <div className="flex flex-col gap-stack-3xs">
              <h3 className="font-display text-h3 text-ink-900">{name}</h3>
              <p className="text-caption text-ink-600">
                {selectedMetrics.length === 1 ? `${selectedMetrics[0]} · ` : ''}
                Groupé par {groupBy} · {DATE_RANGE_LABEL[dateRange] ?? dateRange}
              </p>
            </div>

            {chartType === 'bar' && (
              <BarChart data={chartData} dataKey="m0" series={series.length > 1 ? series : undefined} showLegend={series.length > 1} size="sm" />
            )}
            {chartType === 'line' && (
              <LineChart data={chartData} dataKey="m0" series={series.length > 1 ? series : undefined} showLegend={series.length > 1} size="sm" />
            )}
            {chartType === 'pie' && (
              <PieChart data={pieData} size="sm" showLegend showLabels />
            )}
            {chartType === 'table' && (
              <DataTable
                columns={[
                  { key: 'label', label: groupBy.charAt(0).toUpperCase() + groupBy.slice(1), align: 'left' },
                  ...previewMetrics.map((metric, i) => ({ key: `m${i}`, label: metric, align: 'right' as const })),
                ]}
                rows={chartData}
              />
            )}
          </Card>
        </section>
      </div>
    </PageShell>
  );
};

export default ManagerViewsBuilder;
