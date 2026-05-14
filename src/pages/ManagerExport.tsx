import React, { useState } from 'react';
import { Download, FileText, Table2, BarChart3, Calendar, Check } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FormGroup } from '../components/core/FormGroup';
import { Select } from '../components/core/Select';
import { Alert } from '../components/ui/Alert';

// ─── Types ────────────────────────────────────────────────────────────────────

type ExportFormat = 'csv' | 'excel' | 'pdf';
type ExportScope = 'cohort' | 'individual' | 'competence';

const FORMAT_CONFIG: Record<ExportFormat, { label: string; icon: React.ReactNode; description: string }> = {
  csv: { label: 'CSV', icon: <Table2 size={20} />, description: 'Compatible Excel, Google Sheets, Power BI' },
  excel: { label: 'Excel', icon: <FileText size={20} />, description: 'Format natif Excel avec mise en forme' },
  pdf: { label: 'PDF', icon: <BarChart3 size={20} />, description: 'Rapport visuel avec graphiques' },
};

const SCOPE_CONFIG: Record<ExportScope, { label: string; description: string }> = {
  cohort: { label: 'Toute la cohorte', description: 'Progression et KPIs de tous les apprenants' },
  individual: { label: 'Par apprenant', description: 'Rapport détaillé pour un apprenant spécifique' },
  competence: { label: 'Par compétence', description: 'Progression Dreyfus par axe de compétence' },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ManagerExport() {
  const [format, setFormat] = useState<ExportFormat>('excel');
  const [scope, setScope] = useState<ExportScope>('cohort');
  const [period, setPeriod] = useState('last-month');
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 4000);
  };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Manager · Export"
        title="Exporter les Données"
        subtitle="Génère des rapports personnalisés sur la progression de ta cohorte, les KPIs d'engagement et les niveaux Dreyfus."
        tone="neutral"
        actions={
          <Badge variant="info" size="md">RGPD conforme — données anonymisables</Badge>
        }
      />

      <div className="max-w-content mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* Success alert */}
        {exported && (
          <Alert variant="success" icon={<Check size={18} />}>
            Export généré avec succès. Le téléchargement va démarrer.
          </Alert>
        )}

        {/* Format selection */}
        <SectionCard title="Format d'export" icon={<FileText size={18} />}>
          <div className="grid md:grid-cols-3 gap-stack">
            {(Object.entries(FORMAT_CONFIG) as [ExportFormat, (typeof FORMAT_CONFIG)[ExportFormat]][]).map(([key, cfg]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFormat(key)}
                className={[
                  'flex flex-col gap-2 p-5 rounded-xl border text-left transition-all duration-base',
                  format === key
                    ? 'bg-primary-50 border-primary-300 shadow-sm'
                    : 'bg-white border-ink-100 hover:border-ink-200',
                ].join(' ')}
              >
                <div className={['w-10 h-10 rounded-lg flex items-center justify-center', format === key ? 'bg-primary-600 text-white' : 'bg-ink-100 text-ink-500'].join(' ')}>
                  {cfg.icon}
                </div>
                <div className="flex flex-col gap-tight">
                  <span className="text-body-sm font-semibold text-ink-900">{cfg.label}</span>
                  <span className="text-caption text-ink-500">{cfg.description}</span>
                </div>
                {format === key && <Badge variant="info" size="sm">Sélectionné</Badge>}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Scope & Period */}
        <SectionCard title="Périmètre et période" icon={<Calendar size={18} />}>
          <div className="grid md:grid-cols-2 gap-stack">
            <FormGroup label="Périmètre" htmlFor="scope">
              <Select id="scope" value={scope} onChange={(e) => setScope(e.target.value as ExportScope)}>
                {(Object.entries(SCOPE_CONFIG) as [ExportScope, (typeof SCOPE_CONFIG)[ExportScope]][]).map(([key, cfg]) => (
                  <option key={key} value={key}>{cfg.label} — {cfg.description}</option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup label="Période" htmlFor="period">
              <Select id="period" value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="last-week">7 derniers jours</option>
                <option value="last-month">30 derniers jours</option>
                <option value="last-quarter">3 derniers mois</option>
                <option value="last-year">12 derniers mois</option>
                <option value="all">Depuis le début</option>
              </Select>
            </FormGroup>
          </div>
        </SectionCard>

        {/* Export preview */}
        <Card variant="tinted" tone="primary" className="p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Download size={16} className="text-primary-600" />
            <span className="text-body-sm font-semibold text-primary-700">Aperçu de l'export</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Format', value: FORMAT_CONFIG[format].label },
              { label: 'Périmètre', value: SCOPE_CONFIG[scope].label },
              { label: 'Période', value: period === 'last-month' ? '30 jours' : period === 'last-week' ? '7 jours' : '3 mois' },
              { label: 'Apprenants', value: '8 profils' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-tight">
                <span className="text-caption text-ink-500">{label}</span>
                <span className="text-body-sm font-semibold text-ink-900">{value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="lg"
            leadingIcon={<Download size={18} />}
            onClick={handleExport}
          >
            Générer l'export
          </Button>
          <Button variant="ghost" size="lg">
            Planifier un export automatique
          </Button>
        </div>

        {/* GDPR note */}
        <Alert variant="info">
          Les données exportées peuvent être anonymisées sur demande. Contactez l'administrateur pour configurer l'anonymisation automatique.
        </Alert>

      </div>
    </div>
  );
}
