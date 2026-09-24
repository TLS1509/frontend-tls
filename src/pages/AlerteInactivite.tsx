import React from 'react';
import { Bell, Settings, AlertTriangle, CheckCircle2, Users } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { DataTable, type DataTableColumn } from '../components/patterns/DataTable';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Alert } from '../components/ui/Alert';
import { PageShell } from '../components/layout';

// ─── Mock data ────────────────────────────────────────────────────────────────

const ALERT_HISTORY_ROWS = [
  {
    apprenant: (
      <div className="flex flex-col gap-stack-3xs">
        <span className="font-semibold text-ink-900">Marie Dupont</span>
        <span className="text-caption text-ink-600">Commercial · Équipe Sud</span>
      </div>
    ),
    jours: <span className="font-semibold text-ink-900 tabular-nums whitespace-nowrap">21 jours</span>,
    joursTri: 21,
    statut: <Badge variant="warm" size="compact">En cours</Badge>,
    date: <span className="text-caption text-ink-600">8 mai 2026</span>,
    dateTri: '2026-05-08',
    action: (
      <Button emphasis="link" size="sm">
        Voir détails
      </Button>
    ),
  },
  {
    apprenant: (
      <div className="flex flex-col gap-stack-3xs">
        <span className="font-semibold text-ink-900">Thomas Bernard</span>
        <span className="text-caption text-ink-600">Manager · Équipe Nord</span>
      </div>
    ),
    jours: <span className="font-semibold text-ink-900 tabular-nums whitespace-nowrap">18 jours</span>,
    joursTri: 18,
    statut: <Badge variant="success" size="compact">Résolue</Badge>,
    date: <span className="text-caption text-ink-600">5 mai 2026</span>,
    dateTri: '2026-05-05',
    action: (
      <Button emphasis="link" size="sm">
        Voir détails
      </Button>
    ),
  },
  {
    apprenant: (
      <div className="flex flex-col gap-stack-3xs">
        <span className="font-semibold text-ink-900">Camille Rousseau</span>
        <span className="text-caption text-ink-600">RH · Siège</span>
      </div>
    ),
    jours: <span className="font-semibold text-ink-900 tabular-nums whitespace-nowrap">16 jours</span>,
    joursTri: 16,
    statut: <Badge variant="warm" size="compact">En cours</Badge>,
    date: <span className="text-caption text-ink-600">3 mai 2026</span>,
    dateTri: '2026-05-03',
    action: (
      <Button emphasis="link" size="sm">
        Voir détails
      </Button>
    ),
  },
  {
    apprenant: (
      <div className="flex flex-col gap-stack-3xs">
        <span className="font-semibold text-ink-900">Lucas Martin</span>
        <span className="text-caption text-ink-600">Développeur · Tech</span>
      </div>
    ),
    jours: <span className="font-semibold text-ink-900 tabular-nums whitespace-nowrap">14 jours</span>,
    joursTri: 14,
    statut: <Badge variant="neutral" size="compact">Ignorée</Badge>,
    date: <span className="text-caption text-ink-600">28 avr. 2026</span>,
    dateTri: '2026-04-28',
    action: (
      <Button emphasis="link" size="sm">
        Voir détails
      </Button>
    ),
  },
  {
    apprenant: (
      <div className="flex flex-col gap-stack-3xs">
        <span className="font-semibold text-ink-900">Sophie Leclerc</span>
        <span className="text-caption text-ink-600">Finance · Comptabilité</span>
      </div>
    ),
    jours: <span className="font-semibold text-ink-900 tabular-nums whitespace-nowrap">19 jours</span>,
    joursTri: 19,
    statut: <Badge variant="success" size="compact">Résolue</Badge>,
    date: <span className="text-caption text-ink-600">25 avr. 2026</span>,
    dateTri: '2026-04-25',
    action: (
      <Button emphasis="link" size="sm">
        Voir détails
      </Button>
    ),
  },
];

// Les cellules sont des nœuds stylés : le tri lit les valeurs brutes
// `joursTri` / `dateTri`, portées par la rangée mais jamais affichées.
// Alignement : le texte à gauche, les nombres et l'action à droite.
const TABLE_COLUMNS: DataTableColumn[] = [
  { key: 'apprenant', label: 'Apprenant', sortable: false },
  { key: 'jours', label: 'Jours d\'inactivité', sortable: true, align: 'right', sortValue: (r) => r.joursTri as number },
  { key: 'statut', label: 'Statut', sortable: false },
  { key: 'date', label: 'Envoyé le', sortable: true, sortValue: (r) => r.dateTri as string },
  { key: 'action', label: 'Action', sortable: false, align: 'right' },
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

/* Passe typographique du 2026-09-24 : une seule coque (l'en-tête collait au
   haut de la fenêtre et partait 32 px à gauche du contenu) ; deux sections à
   h2 hors des cartes ; les jours d'inactivité en encre (une couleur par
   rangée — rouge, vert, brun, gris — sans légende) ; « En cours » a un seul
   ton ; le compte des alertes chuchote en méta au lieu d'un `Badge`. */
export default function AlerteInactivite() {
  return (
    <PageShell width="wide">
      <PageHero
        eyebrow="Espace entreprise"
        title="Alertes d'inactivité"
        summary="Configurez les seuils d'alerte pour les apprenants inactifs et consultez l'historique des alertes déclenchées."
        tone="flat"
        trailing={
          <Button emphasis="soft" size="sm" leadingIcon={<Bell size={14} />}>
            Envoyer une alerte test
          </Button>
        }
      />

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
          icon={<Users size={20} />}
          deltaDirection="down"
          polarity="lower-is-better"
          delta="−2 vs semaine dernière"
        />
        <StatCard
          label="Taux de résolution"
          value="71"
          sub="%"
          icon={<CheckCircle2 size={20} />}
          deltaDirection="up"
          delta={'+8\u00a0% ce trimestre'}
        />
      </div>

      {/* Config form */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Configuration des seuils"
          subtitle="Définissez les règles de déclenchement des alertes d'inactivité."
        />
        <Card className="flex flex-col gap-stack-lg">
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

          <div>
            <Button emphasis="soft" size="md" leadingIcon={<Settings size={16} />}>
              Enregistrer la configuration
            </Button>
          </div>
        </Card>
      </section>

      {/* Historique alertes — `DataTable` porte sa propre coque. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Historique des alertes"
          meta={`${ALERT_HISTORY_ROWS.length} alertes · les 30 derniers jours`}
        />
        <DataTable
          columns={TABLE_COLUMNS}
          rows={ALERT_HISTORY_ROWS}
          emptyMessage="Aucune alerte déclenchée sur cette période."
        />
      </section>
    </PageShell>
  );
}
