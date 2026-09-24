import React, { useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import { DataTable, type DataTableColumn } from '../components/patterns/DataTable';
import { Alert } from '../components/ui/Alert';
import { PageShell } from '../components/layout';

// ─── Mock data ────────────────────────────────────────────────────────────────

const ALERTS = [
  {
    id: '1',
    name: 'Inactivité apprenants',
    trigger: 'Inactif depuis > 7 jours',
    recipients: 'Coach assigné',
    status: 'active',
    lastTriggered: '18 mai 2026',
    triggerCount: 3,
  },
  {
    id: '2',
    name: 'Stagnation Dreyfus',
    trigger: 'Pas de progression Dreyfus > 30 jours',
    recipients: 'Manager + Coach',
    status: 'active',
    lastTriggered: '15 mai 2026',
    triggerCount: 1,
  },
  {
    id: '3',
    name: 'Budget crédits épuisé',
    trigger: 'Crédits coaching < 10% restants',
    recipients: 'Manager',
    status: 'paused',
    lastTriggered: null,
    triggerCount: 0,
  },
  {
    id: '4',
    name: 'Badge compétence obtenu',
    trigger: 'Nouveau badge Dreyfus validé',
    recipients: 'Apprenant + Manager',
    status: 'active',
    lastTriggered: '19 mai 2026',
    triggerCount: 8,
  },
];

// Statut et déclenchements sont rendus en badge / span : le tri lit les valeurs
// brutes `statusTri` (libellé affiché) / `triggerCountTri`, portées par la rangée.
const TABLE_COLUMNS: DataTableColumn[] = [
  { key: 'name', label: 'Nom de l\'alerte', sortable: true },
  { key: 'trigger', label: 'Déclencheur', sortable: false },
  { key: 'recipients', label: 'Destinataires', sortable: false },
  { key: 'status', label: 'Statut', sortable: true, sortValue: (r) => r.statusTri as string },
  { key: 'triggerCount', label: 'Déclenchements', sortable: true, align: 'right', sortValue: (r) => r.triggerCountTri as number },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ManagerAlerts() {
  const [showNewForm, setShowNewForm] = useState(false);
  const [newAlertName, setNewAlertName] = useState('');
  const [newAlertTrigger, setNewAlertTrigger] = useState('');

  const activeCount = ALERTS.filter((a) => a.status === 'active').length;
  const totalTriggers = ALERTS.reduce((acc, a) => acc + a.triggerCount, 0);

  const tableRows = ALERTS.map((a) => ({
    ...a,
    statusTri: a.status === 'active' ? 'Active' : 'En pause',
    triggerCountTri: a.triggerCount,
    status: (
      <Badge variant={a.status === 'active' ? 'success' : 'neutral'} size="compact">
        {a.status === 'active' ? 'Active' : 'En pause'}
      </Badge>
    ),
    triggerCount: <span className="font-semibold text-ink-900 tabular-nums">{a.triggerCount}</span>,
  }));

  /* Passe typographique du 2026-09-24 : une seule coque (`PageShell`, un seul
     bord gauche) ; les compteurs faits main — chiffre centré en teal, légende
     au gris des placeholders — prennent `StatCard`, comme les autres pages de
     l'espace manager ; les titres de section sont des h2 posés hors des
     cartes, et la table n'est plus une carte dans une carte. */
  return (
    <PageShell width="page">
      <PageHero
        eyebrow="Espace Manager"
        title="Alertes et notifications"
        summary="Configurez les alertes automatiques pour suivre l'engagement de votre équipe et anticiper les situations à risque."
        tone="flat"
        trailing={
          <Button emphasis="soft" size="md" leadingIcon={<Plus size={16} />} onClick={() => setShowNewForm(true)}>
            Nouvelle alerte
          </Button>
        }
      />

      {/* Chiffres */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
        <StatCard label="Alertes configurées" value={ALERTS.length} size="sm" />
        <StatCard label="Alertes actives" value={activeCount} size="sm" />
        <StatCard label="Déclenchements ce mois" value={totalTriggers} size="sm" />
      </div>

      {/* New alert form */}
      {showNewForm && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Nouvelle alerte" />
          <Card className="flex flex-col gap-stack-lg">
            <Alert variant="info">
              Les alertes sont envoyées par email aux destinataires configurés.
            </Alert>
            <div className="grid md:grid-cols-2 gap-stack">
              <FormGroup label="Nom de l'alerte" id="alert-name">
                <Input
                  id="alert-name"
                  value={newAlertName}
                  onChange={(e) => setNewAlertName(e.target.value)}
                  placeholder="Ex. : Inactivité prolongée"
                />
              </FormGroup>
              <FormGroup label="Condition de déclenchement" id="alert-trigger">
                <Select id="alert-trigger" value={newAlertTrigger} onChange={(e) => setNewAlertTrigger(e.target.value)}>
                  <option value="">Choisir une condition...</option>
                  <option value="inactivity-7">Inactif depuis 7 jours</option>
                  <option value="inactivity-14">Inactif depuis 14 jours</option>
                  <option value="no-dreyfus-30">Pas de progression Dreyfus 30 jours</option>
                  <option value="credits-low">Crédits coaching &lt; 10 %</option>
                  <option value="badge-earned">Badge compétence obtenu</option>
                  <option value="session-missed">Session coaching manquée</option>
                </Select>
              </FormGroup>
              <FormGroup label="Destinataires" id="alert-recipients">
                <Select id="alert-recipients">
                  <option>Coach assigné</option>
                  <option>Manager</option>
                  <option>Manager + Coach</option>
                  <option>Apprenant + Manager</option>
                </Select>
              </FormGroup>
              <FormGroup label="Canal de notification" id="alert-channel">
                <Select id="alert-channel">
                  <option>Email</option>
                  <option>Notification in-app</option>
                  <option>Email + Notification</option>
                </Select>
              </FormGroup>
            </div>
            <div className="flex flex-wrap gap-stack-xs">
              <Button emphasis="soft" size="md" leadingIcon={<CheckCircle2 size={16} />}>
                Créer l'alerte
              </Button>
              <Button emphasis="outline" size="md" onClick={() => setShowNewForm(false)}>
                Annuler
              </Button>
            </div>
          </Card>
        </section>
      )}

      {/* Alerts table — `DataTable` porte sa propre coque. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Alertes configurées" />
        <DataTable
          columns={TABLE_COLUMNS}
          rows={tableRows}
        />
      </section>
    </PageShell>
  );
}
