import React, { useMemo, useState } from 'react';
import { Save, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Table2, Trash2 } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { SelectableOptionCard } from '../components/patterns/SelectableOptionCard';
import { DataTable } from '../components/patterns/DataTable';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import { Badge } from '../components/ui/Badge';
import { FilterChip } from '../components/ui/FilterChip';
import { BarChart, type BarChartDataPoint } from '../components/charts/BarChart';
import { LineChart } from '../components/charts/LineChart';
import { PieChart } from '../components/charts/PieChart';
import { Container } from '../components/layout';

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

  return (
    <div className="min-h-[100dvh] bg-surface">
      <EditorialHero
        eyebrow="Manager · Custom Views Builder"
        title="Crée ta vue analytique sur mesure"
        summary="Sélectionne tes métriques, choisis ton type de graphique, sauvegarde et partage"
        tone="flat"
      />

      <Container width="page" padding={false} className="px-stack py-section grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-section">
        {/* Builder Panel */}
        <div className="flex flex-col gap-stack">
          <SectionCard title="1. Nom de la vue">
            <FormGroup label="Titre">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Performance Q2 par département" />
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
            <div className="flex flex-col gap-stack-xs">
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

          <div className="flex gap-stack-xs">
            <Button variant="primary" leadingIcon={<Save className="w-4 h-4" />} fullWidth>Sauvegarder</Button>
            <Button variant="ghost" iconOnly leadingIcon={<Trash2 className="w-4 h-4" />} aria-label="Supprimer" />
          </div>
        </div>

        {/* Preview Panel */}
        <Card className="p-stack-lg sticky top-stack h-fit">
          <div className="flex items-center justify-between mb-stack">
            <div>
              <div className="text-caption text-ink-500">Aperçu en direct</div>
              <h3 className="text-h3 font-semibold">{name}</h3>
            </div>
            <Badge variant="info">{selectedMetrics.length} métriques</Badge>
          </div>

          <div className="mb-stack-xs text-caption text-ink-400">
            groupé par {groupBy} · {dateRange}
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

          <div className="mt-stack flex flex-wrap gap-tight">
            {selectedMetrics.map((m) => (
              <Badge key={m} variant="brand">{m}</Badge>
            ))}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default ManagerViewsBuilder;
