/**
 * WebhooksManagement : Enterprise webhooks management (admin read-only view).
 * Route: /enterprise/webhooks
 *
 * Allows enterprise admins to view, test, and configure webhook integrations
 * for syncing learning data with HR tools and LMS platforms.
 */

import React from 'react';
import { Webhook, Code2, Key, FileJson, ExternalLink, Zap } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { DataTable } from '../components/patterns/DataTable';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Alert } from '../components/ui/Alert';
import type { DataTableColumn, DataTableRow } from '../components/patterns/DataTable';
import { Container } from '../components/layout';

// ─── Mock data ─────────────────────────────────────────────────────────────────

const WEBHOOK_ROWS: DataTableRow[] = [
  {
    url: (
      <span className="font-mono text-caption text-ink-800 break-all">
        https://hrtools.acmecorp.com/api/webhooks/tls
      </span>
    ),
    events: (
      <div className="flex flex-wrap gap-1">
        <Badge variant="brand">user.enrolled</Badge>
        <Badge variant="brand">lesson.completed</Badge>
      </div>
    ),
    status: <Badge variant="success">Actif</Badge>,
    last_triggered: <span className="text-body-sm text-ink-600">Il y a 3 min</span>,
    actions: (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm">Tester</Button>
        <Button variant="ghost" size="sm">Modifier</Button>
      </div>
    ),
  },
  {
    url: (
      <span className="font-mono text-caption text-ink-800 break-all">
        https://lms.company.io/hooks/learning-society
      </span>
    ),
    events: (
      <div className="flex flex-wrap gap-1">
        <Badge variant="warm">coaching.booked</Badge>
      </div>
    ),
    status: <Badge variant="success">Actif</Badge>,
    last_triggered: <span className="text-body-sm text-ink-600">Il y a 27 min</span>,
    actions: (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm">Tester</Button>
        <Button variant="ghost" size="sm">Modifier</Button>
      </div>
    ),
  },
  {
    url: (
      <span className="font-mono text-caption text-ink-800 break-all">
        https://analytics.enterprise.net/ingest/tls-events
      </span>
    ),
    events: (
      <div className="flex flex-wrap gap-1">
        <Badge variant="sun">badge.earned</Badge>
        <Badge variant="brand">lesson.completed</Badge>
      </div>
    ),
    status: <Badge variant="success">Actif</Badge>,
    last_triggered: <span className="text-body-sm text-ink-600">Il y a 2 h</span>,
    actions: (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm">Tester</Button>
        <Button variant="ghost" size="sm">Modifier</Button>
      </div>
    ),
  },
  {
    url: (
      <span className="font-mono text-caption text-ink-800 break-all">
        https://legacy-hr.acmecorp.com/api/v1/events
      </span>
    ),
    events: (
      <div className="flex flex-wrap gap-1">
        <Badge variant="neutral">user.enrolled</Badge>
      </div>
    ),
    status: <Badge variant="neutral">Inactif</Badge>,
    last_triggered: <span className="text-body-sm text-ink-400">Il y a 14 j</span>,
    actions: (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm">Tester</Button>
        <Button variant="ghost" size="sm">Modifier</Button>
      </div>
    ),
  },
];

const COLUMNS: DataTableColumn[] = [
  { key: 'url', label: 'Endpoint URL', sortable: false },
  { key: 'events', label: 'Événements', sortable: false },
  { key: 'status', label: 'Statut', sortable: false, width: '110px' },
  { key: 'last_triggered', label: 'Dernier appel', sortable: false, width: '150px' },
  { key: 'actions', label: 'Actions', sortable: false, align: 'right', width: '160px' },
];

const EVENT_TYPES = [
  { key: 'user.enrolled', label: 'Inscription à un parcours', variant: 'brand' as const },
  { key: 'user.completed_path', label: 'Parcours terminé', variant: 'brand' as const },
  { key: 'lesson.started', label: 'Leçon démarrée', variant: 'brand' as const },
  { key: 'lesson.completed', label: 'Leçon terminée', variant: 'brand' as const },
  { key: 'coaching.booked', label: 'Session coaching réservée', variant: 'warm' as const },
  { key: 'coaching.completed', label: 'Session coaching terminée', variant: 'warm' as const },
  { key: 'badge.earned', label: 'Badge obtenu', variant: 'sun' as const },
  { key: 'certificate.issued', label: 'Certificat émis', variant: 'sun' as const },
  { key: 'user.created', label: 'Compte utilisateur créé', variant: 'neutral' as const },
  { key: 'user.deactivated', label: 'Compte désactivé', variant: 'neutral' as const },
  { key: 'team.updated', label: 'Équipe mise à jour', variant: 'neutral' as const },
];

const PAYLOAD_EXAMPLE = `{
  "event": "lesson.completed",
  "timestamp": "2026-05-13T14:23:00Z",
  "data": {
    "user_id": "usr_abc123",
    "user_email": "marie.dupont@acmecorp.com",
    "lesson_id": "les_xyz789",
    "lesson_title": "Introduction au prompt engineering",
    "path_id": "path_ia2026",
    "score": 92,
    "duration_seconds": 1840
  }
}`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WebhooksManagement() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <EditorialHero
        eyebrow="Enterprise · Intégrations"
        title="Webhooks"
        summary="Configurez les webhooks pour synchroniser les données d'apprentissage avec vos outils RH et LMS."
        tone="brand"
        trailing={
          <Button variant="glass" size="md" leadingIcon={<Zap size={16} />}>
            Ajouter un webhook
          </Button>
        }
      />

      {/* ── Main content ── */}
      <Container width="wide" padding={false} className="px-4 md:px-8 flex flex-col gap-section py-section">

        {/* Info alert */}
        <Alert
          variant="info"
          title="À propos des webhooks"
        >
          Les webhooks permettent à The Learning Society d'envoyer des notifications HTTP en temps réel vers vos systèmes externes lorsque des événements d'apprentissage se produisent. Chaque requête est signée via HMAC-SHA256 pour garantir l'authenticité. Les événements supportés incluent les inscriptions, progressions, sessions de coaching et certifications.
        </Alert>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard label="Webhooks actifs" value="3" tone="brand" surface="tinted" />
          <StatCard label="Événements / jour" value="142" delta="+8%" deltaDirection="up" tone="neutral" surface="card" />
          <StatCard label="Taux de succès" value="99.2%" tone="brand" surface="tinted" />
        </div>

        {/* Data table */}
        <SectionCard
          title="Webhooks configurés"
          titleIcon={<Webhook size={18} />}
          headerAction={
            <Button variant="secondary" size="sm" leadingIcon={<Zap size={14} />}>
              Ajouter
            </Button>
          }
        >
          <DataTable
            columns={COLUMNS}
            rows={WEBHOOK_ROWS}
            emptyMessage="Aucun webhook configuré."
          />
        </SectionCard>

        {/* Available events */}
        <SectionCard
          title="Événements disponibles"
          titleIcon={<Zap size={18} />}
          description="Liste complète des événements que vous pouvez écouter via vos webhooks."
        >
          <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.map((evt) => (
              <div key={evt.key} className="flex items-center gap-stack-xs bg-ink-50 border border-ink-100 rounded-lg px-3 py-2">
                <Badge variant={evt.variant}>{evt.key}</Badge>
                <span className="text-body-sm text-ink-600">{evt.label}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Documentation */}
        <SectionCard
          title="Documentation"
          titleIcon={<Code2 size={18} />}
          description="Ressources techniques pour intégrer les webhooks TLS dans vos systèmes."
        >
          <div className="flex flex-col gap-stack">

            {/* Auth */}
            <div className="flex flex-col gap-stack-xs">
              <div className="flex items-center gap-stack-xs">
                <Key size={16} className="text-primary-600 shrink-0" />
                <h4 className="font-display font-semibold text-body text-ink-900">Authentification</h4>
              </div>
              <p className="text-body-sm text-ink-600 leading-relaxed">
                Chaque requête webhook inclut un header <code className="px-1 py-0.5 bg-ink-100 rounded text-caption font-mono text-ink-800">X-TLS-Signature</code> contenant une signature HMAC-SHA256 calculée avec votre secret. Comparez cette signature côté serveur pour valider l'origine des événements.
              </p>
              <div className="rounded-lg bg-ink-900 p-4 font-mono text-caption text-ink-100">
                Authorization: Bearer {'<'}votre_secret_api{'>'}
              </div>
            </div>

            {/* Payload */}
            <div className="flex flex-col gap-stack-xs">
              <div className="flex items-center gap-stack-xs">
                <FileJson size={16} className="text-primary-600 shrink-0" />
                <h4 className="font-display font-semibold text-body text-ink-900">Format de payload</h4>
              </div>
              <p className="text-body-sm text-ink-600 leading-relaxed">
                Les événements sont envoyés en POST avec un corps JSON encodé en UTF-8. La structure est identique pour tous les types d'événements.
              </p>
              <pre className="rounded-lg bg-ink-900 p-4 font-mono text-caption text-ink-100 overflow-x-auto whitespace-pre">
                {PAYLOAD_EXAMPLE}
              </pre>
            </div>

            {/* API docs link */}
            <div className="flex items-center gap-stack-xs pt-2">
              <Button
                variant="brand-ghost"
                size="sm"
                trailingIcon={<ExternalLink size={14} />}
              >
                Documentation API complète
              </Button>
              <Button
                variant="ghost"
                size="sm"
                trailingIcon={<ExternalLink size={14} />}
              >
                Exemples d'intégration
              </Button>
            </div>
          </div>
        </SectionCard>
      </Container>
    </div>
  );
}
