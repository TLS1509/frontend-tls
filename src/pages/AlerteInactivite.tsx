import React from 'react';
import { Bell, Settings, AlertTriangle, CheckCircle2, Clock, Users } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { DataTable } from '../components/patterns/DataTable';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Alert } from '../components/ui/Alert';

// ─── Mock data ────────────────────────────────────────────────────────────────

const ALERT_HISTORY_ROWS = [
  {
    apprenant: (
      <div className="flex flex-col gap-tight">
        <span className="font-semibold text-ink-900">Marie Dupont</span>
        <span className="text-micro text-ink-500">Commercial · Équipe Sud</span>
      </div>
    ),
    jours: <span className="font-bold text-danger-fg">21 jours</span>,
    statut: <Badge variant="danger" size="sm">En cours</Badge>,
    date: <span className="text-caption text-ink-600">08 mai 2026</span>,
    action: (
      <button className="text-caption text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors duration-fast">
        Voir détails
      </button>
    ),
  },
  {
    apprenant: (
      <div className="flex flex-col gap-tight">
        <span className="font-semibold text-ink-900">Thomas Bernard</span>
        <span className="text-micro text-ink-500">Manager · Équipe Nord</span>
      </div>
    ),
    jours: <span className="font-bold text-success-fg">18 jours</span>,
    statut: <Badge variant="success" size="sm">Résolue</Badge>,
    date: <span className="text-caption text-ink-600">05 mai 2026</span>,
    action: (
      <button className="text-caption text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors duration-fast">
        Voir détails
      </button>
    ),
  },
  {
    apprenant: (
      <div className="flex flex-col gap-tight">
        <span className="font-semibold text-ink-900">Camille Rousseau</span>
        <span className="text-micro text-ink-500">RH · Siège</span>
      </div>
    ),
    jours: <span className="font-bold text-warning-fg">16 jours</span>,
    statut: <Badge variant="warning" size="sm">En cours</Badge>,
    date: <span className="text-caption text-ink-600">03 mai 2026</span>,
    action: (
      <button className="text-caption text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors duration-fast">
        Voir détails
      </button>
    ),
  },
  {
    apprenant: (
      <div className="flex flex-col gap-tight">
        <span className="font-semibold text-ink-900">Lucas Martin</span>
        <span className="text-micro text-ink-500">Développeur · Tech</span>
      </div>
    ),
    jours: <span className="font-bold text-ink-500">14 jours</span>,
    statut: <Badge variant="neutral" size="sm">Ignorée</Badge>,
    date: <span className="text-caption text-ink-600">28 avr. 2026</span>,
    action: (
      <button className="text-caption text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors duration-fast">
        Voir détails
      </button>
    ),
  },
  {
    apprenant: (
      <div className="flex flex-col gap-tight">
        <span className="font-semibold text-ink-900">Sophie Leclerc</span>
        <span className="text-micro text-ink-500">Finance · Comptabilité</span>
      </div>
    ),
    jours: <span className="font-bold text-success-fg">19 jours</span>,
    statut: <Badge variant="success" size="sm">Résolue</Badge>,
    date: <span className="text-caption text-ink-600">25 avr. 2026</span>,
    action: (
      <button className="text-caption text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors duration-fast">
        Voir détails
      </button>
    ),
  },
];

const TABLE_COLUMNS = [
  { key: 'apprenant', label: 'Apprenant', sortable: false },
  { key: 'jours', label: 'Jours d\'inactivité', sortable: true, align: 'center' as const },
  { key: 'statut', label: 'Statut', sortable: false, align: 'center' as const },
  { key: 'date', label: 'Envoyé le', sortable: true },
  { key: 'action', label: 'Action', sortable: false, align: 'center' as const },
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Faible' },
  { value: 'medium', label: 'Moyen' },
  { value: 'high', label: 'Élevé' },
  { value: 'critical', label: 'Critique' },
];

const FREQUENCY_OPTIONS = [
  { value: 'immediate', label: 'Immédiat' },
  { value: 'daily', label: 'Quotidien' },
  { value: 'weekly', label: 'Hebdomadaire' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AlerteInactivite() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Enterprise · Alertes"
        title="Alertes Inactivité"
        summary="Configure les seuils d'alerte pour les apprenants inactifs et consulte l'historique des alertes déclenchées."
        tone="neutral"
        trailing={
          <Button variant="glass" size="sm" leadingIcon={<Bell size={14} />}>
            Envoyer une alerte test
          </Button>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard
            label="Alertes déclenchées ce mois"
            value="12"
            icon={<Bell size={20} />}
            deltaDirection="up"
            delta="+3 vs mois dernier"
          />
          <StatCard
            label="Apprenants inactifs actuels"
            value="7"
            variant="warm"
            icon={<Users size={20} />}
            deltaDirection="down"
            delta="-2 vs semaine dernière"
          />
          <StatCard
            label="Taux de résolution"
            value="71"
            sub="%"
            icon={<CheckCircle2 size={20} />}
            deltaDirection="up"
            delta="+8% ce trimestre"
          />
        </div>

        {/* Config form */}
        <SectionCard
          title="Configuration des seuils"
          titleIcon={<Settings size={18} />}
          description="Définissez les règles de déclenchement des alertes d'inactivité."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
            <FormGroup label="Seuil d'inactivité (jours)" id="threshold">
              <Input
                id="threshold"
                type="number"
                defaultValue="14"
                min="1"
                max="90"
                placeholder="14"
              />
            </FormGroup>

            <Select
              label="Niveau de priorité"
              options={PRIORITY_OPTIONS}
              defaultValue="medium"
            />

            <FormGroup
              label="Destinataires"
              id="recipients"
              hint="Séparez plusieurs adresses par une virgule."
              className="md:col-span-2"
            >
              <Input
                id="recipients"
                type="email"
                placeholder="manager@entreprise.com, coach@entreprise.com"
              />
            </FormGroup>

            <Select
              label="Fréquence d'envoi"
              options={FREQUENCY_OPTIONS}
              defaultValue="daily"
            />
          </div>

          <Alert variant="warning" icon={<AlertTriangle size={18} />}>
            Les alertes critiques sont envoyées immédiatement, indépendamment de la fréquence configurée.
          </Alert>

          <div className="mt-stack">
            <Button variant="primary" size="md" leadingIcon={<Settings size={16} />}>
              Enregistrer la configuration
            </Button>
          </div>
        </SectionCard>

        {/* Historique alertes */}
        <SectionCard
          title="Historique des alertes"
          titleIcon={<Clock size={18} />}
          description="Les 30 derniers jours · Mis à jour en temps réel."
          headerAction={
            <Badge variant="neutral" size="sm">5 alertes affichées</Badge>
          }
        >
          <DataTable
            columns={TABLE_COLUMNS}
            rows={ALERT_HISTORY_ROWS}
            emptyMessage="Aucune alerte déclenchée sur cette période."
          />
        </SectionCard>

      </div>
    </div>
  );
}
