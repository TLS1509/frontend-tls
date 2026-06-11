import React, { useState } from 'react';
import { Bell, Plus, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { Select } from '../components/core/Select';
import { DataTable } from '../components/patterns/DataTable';
import { Alert } from '../components/ui/Alert';
import { Container } from '../components/layout';

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

const TABLE_COLUMNS = [
  { key: 'name', label: 'Nom de l\'alerte', sortable: true },
  { key: 'trigger', label: 'Déclencheur', sortable: false },
  { key: 'recipients', label: 'Destinataires', sortable: false },
  { key: 'status', label: 'Statut', sortable: true },
  { key: 'triggerCount', label: 'Déclenchements', sortable: true },
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
    status: (
      <Badge variant={a.status === 'active' ? 'success' : 'neutral'} size="sm">
        {a.status === 'active' ? 'Active' : 'En pause'}
      </Badge>
    ),
    triggerCount: <span className="text-body-sm font-semibold text-ink-900">{a.triggerCount}</span>,
  }));

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Manager · Configuration"
        title="Alertes & Notifications"
        summary="Configure les alertes automatiques pour suivre l'engagement de ton équipe et anticiper les situations à risque."
        tone="default"
        trailing={
          <Button variant="glass" size="md" leadingIcon={<Plus size={16} />} onClick={() => setShowNewForm(true)}>
            Nouvelle alerte
          </Button>
        }
      />

      <Container width="page" padding={false} className="px-stack md:px-section flex flex-col gap-section">

        {/* Summary */}
        <div className="grid grid-cols-3 gap-stack">
          <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-5 gap-tight">
            <span className="text-h2 font-display font-bold text-primary-700">{ALERTS.length}</span>
            <span className="text-caption text-ink-500">Alertes configurées</span>
          </Card>
          <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-5 gap-tight">
            <span className="text-h2 font-display font-bold text-primary-700">{activeCount}</span>
            <span className="text-caption text-ink-500">Alertes actives</span>
          </Card>
          <Card variant="tinted" tone="primary" className="flex flex-col items-center justify-center py-5 gap-tight">
            <span className="text-h2 font-display font-bold text-primary-700">{totalTriggers}</span>
            <span className="text-caption text-ink-500">Déclenchements ce mois</span>
          </Card>
        </div>

        {/* New alert form */}
        {showNewForm && (
          <SectionCard title="Nouvelle alerte" titleIcon={<Plus size={18} />}>
            <Alert variant="info" className="mb-stack">
              Les alertes sont envoyées par email aux destinataires configurés.
            </Alert>
            <div className="grid md:grid-cols-2 gap-stack">
              <FormGroup label="Nom de l'alerte" id="alert-name">
                <Input
                  id="alert-name"
                  value={newAlertName}
                  onChange={(e) => setNewAlertName(e.target.value)}
                  placeholder="Ex: Inactivité prolongée"
                />
              </FormGroup>
              <FormGroup label="Condition de déclenchement" id="alert-trigger">
                <Select id="alert-trigger" value={newAlertTrigger} onChange={(e) => setNewAlertTrigger(e.target.value)}>
                  <option value="">Choisir une condition...</option>
                  <option value="inactivity-7">Inactif depuis 7 jours</option>
                  <option value="inactivity-14">Inactif depuis 14 jours</option>
                  <option value="no-dreyfus-30">Pas de progression Dreyfus 30 jours</option>
                  <option value="credits-low">Crédits coaching &lt; 10%</option>
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
            <div className="flex gap-3 mt-stack">
              <Button variant="primary" size="md" leadingIcon={<CheckCircle2 size={16} />}>
                Créer l'alerte
              </Button>
              <Button variant="ghost" size="md" onClick={() => setShowNewForm(false)}>
                Annuler
              </Button>
            </div>
          </SectionCard>
        )}

        {/* Alerts table */}
        <SectionCard title="Alertes configurées" titleIcon={<Bell size={18} />}>
          <DataTable
            columns={TABLE_COLUMNS}
            rows={tableRows}
          />
        </SectionCard>

      </Container>
    </div>
  );
}
