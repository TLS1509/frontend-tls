import React, { useState } from 'react';
import { Download, FileText, Table2, BarChart3, Check } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { SelectableOptionCard } from '../components/patterns/SelectableOptionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FormGroup } from '../components/core/FormGroup';
import { Select } from '../components/core/Select';
import { Alert } from '../components/ui/Alert';
import { PageShell } from '../components/layout';

// ─── Types ────────────────────────────────────────────────────────────────────

type ExportFormat = 'csv' | 'excel' | 'pdf';
type ExportScope = 'cohort' | 'individual' | 'competence';

const FORMAT_CONFIG: Record<ExportFormat, { label: string; icon: React.ReactNode; description: string }> = {
  csv: { label: 'CSV', icon: <Table2 size={20} />, description: 'Compatible Excel, Google Sheets, Power BI' },
  excel: { label: 'Excel', icon: <FileText size={20} />, description: 'Format natif Excel avec mise en forme' },
  pdf: { label: 'PDF', icon: <BarChart3 size={20} />, description: 'Rapport visuel avec graphiques' },
};

const SCOPE_CONFIG: Record<ExportScope, { label: string; description: string }> = {
  cohort: { label: 'Toute la cohorte', description: 'Progression et indicateurs de tous les apprenants' },
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

  const PERIOD_LABEL: Record<string, string> = {
    'last-week': '7 jours',
    'last-month': '30 jours',
    'last-quarter': '3 mois',
    'last-year': '12 mois',
    all: 'Depuis le début',
  };

  /* Passe typographique du 2026-09-24 : une seule colonne (`PageShell
     width="content"`) — l'en-tête était calé à x 313 et le formulaire, centré,
     à x 505 : deux axes de lecture. Les parties du formulaire sont des sections
     (h2 28) posées sur la page ; les champs n'ont plus de carte autour, les
     options de format n'étaient plus que des cartes dans une carte. */
  return (
    <PageShell width="content">
      <PageHero
        eyebrow="Espace Manager"
        title="Exporter les données"
        summary="Générez des rapports sur la progression de votre cohorte, l'engagement et les niveaux Dreyfus."
        tone="flat"
        trailing={
          <Badge variant="info" size="normal">RGPD conforme : données anonymisables</Badge>
        }
      />

      {/* Success alert */}
      {exported && (
        <Alert variant="success" icon={<Check size={18} />}>
          Export généré avec succès. Le téléchargement va démarrer.
        </Alert>
      )}

      {/* Format selection */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Format d'export" />
        <div className="grid sm:grid-cols-3 gap-stack">
          {(Object.entries(FORMAT_CONFIG) as [ExportFormat, (typeof FORMAT_CONFIG)[ExportFormat]][]).map(([key, cfg]) => (
            <SelectableOptionCard
              key={key}
              icon={cfg.icon}
              label={cfg.label}
              description={cfg.description}
              selected={format === key}
              onClick={() => setFormat(key)}
            />
          ))}
        </div>
      </section>

      {/* Scope & Period */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Périmètre et période" />
        <div className="grid sm:grid-cols-2 gap-stack">
          <FormGroup label="Périmètre" id="scope" hint={SCOPE_CONFIG[scope].description}>
            <Select id="scope" value={scope} onChange={(e) => setScope(e.target.value as ExportScope)}>
              {(Object.entries(SCOPE_CONFIG) as [ExportScope, (typeof SCOPE_CONFIG)[ExportScope]][]).map(([key, cfg]) => (
                <option key={key} value={key}>{cfg.label}</option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup label="Période" id="period">
            <Select id="period" value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="last-week">7 derniers jours</option>
              <option value="last-month">30 derniers jours</option>
              <option value="last-quarter">3 derniers mois</option>
              <option value="last-year">12 derniers mois</option>
              <option value="all">Depuis le début</option>
            </Select>
          </FormGroup>
        </div>
      </section>

      {/* Aperçu, puis l'action : on relit avant de générer. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Aperçu de l'export" />
        <Card variant="tinted" tone="primary">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-stack">
            {[
              { label: 'Format', value: FORMAT_CONFIG[format].label },
              { label: 'Périmètre', value: SCOPE_CONFIG[scope].label },
              { label: 'Période', value: PERIOD_LABEL[period] ?? period },
              { label: 'Apprenants', value: '8 profils' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-stack-3xs">
                <dt className="text-caption font-semibold text-ink-600">{label}</dt>
                <dd className="text-body font-semibold text-ink-900">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>
        {/* Les actions suivent l'aperçu à 24 px (contenu → actions), hors de la
            carte teintée : un bouton `soft` y perdrait son fond. */}
        <div className="flex flex-wrap items-center gap-stack-xs mt-stack-xs">
          <Button
            emphasis="soft"
            size="lg"
            leadingIcon={<Download size={18} />}
            onClick={handleExport}
          >
            Générer l'export
          </Button>
          <Button emphasis="outline" size="lg">
            Planifier un export automatique
          </Button>
        </div>
      </section>

      {/* GDPR note */}
      <Alert variant="info">
        Les données exportées peuvent être anonymisées sur demande. Contactez l'administrateur pour configurer l'anonymisation automatique.
      </Alert>
    </PageShell>
  );
}
