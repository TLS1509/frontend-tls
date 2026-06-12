import React, { useState } from 'react';
import { Plus, Save, BarChart3, LineChart, PieChart, Table2, Trash2 } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import { Badge } from '../components/ui/Badge';
import { FilterChip } from '../components/ui/FilterChip';
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
  { v: 'line', label: 'Ligne', icon: LineChart },
  { v: 'pie', label: 'Camembert', icon: PieChart },
  { v: 'table', label: 'Tableau', icon: Table2 },
];

const ManagerViewsBuilder: React.FC = () => {
  const [name, setName] = useState('Ma nouvelle vue');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['Taux complétion parcours', 'Niveau Dreyfus moyen']);
  const [chartType, setChartType] = useState('bar');
  const [groupBy, setGroupBy] = useState('département');
  const [dateRange, setDateRange] = useState('30d');

  const toggleMetric = (m: string) => {
    setSelectedMetrics((s) => (s.includes(m) ? s.filter((x) => x !== m) : [...s, m]));
  };

  return (
    <div className="min-h-[100dvh] bg-surface">
      <EditorialHero
        eyebrow="Manager · Custom Views Builder"
        title="Crée ta vue analytique sur mesure"
        summary="Sélectionne tes métriques, choisis ton type de graphique, sauvegarde et partage"
        tone="default"
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
              {CHART_TYPES.map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.v}
                    onClick={() => setChartType(c.v)}
                    className={`p-3 rounded-lg border-2 flex flex-col items-center gap-tight transition-[border-color,background-color] duration-fast ease-standard ${
                      chartType === c.v ? 'border-primary-500 bg-primary-50' : 'border-ink-200 hover:border-primary-300'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-caption">{c.label}</span>
                  </button>
                );
              })}
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

          <div className="aspect-video bg-ink-50 rounded-lg flex items-center justify-center border-2 border-dashed border-ink-300">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-ink-400 mx-auto mb-stack-xs" />
              <div className="text-caption text-ink-500">Aperçu graphique {chartType}</div>
              <div className="text-caption text-ink-400 mt-1">groupé par {groupBy} · {dateRange}</div>
            </div>
          </div>

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
