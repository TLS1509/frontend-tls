/**
 * WebhooksManagement : Enterprise webhooks management (admin read-only view).
 * Route: /enterprise/webhooks
 *
 * Allows enterprise admins to view, test, and configure webhook integrations
 * for syncing learning data with HR tools and LMS platforms.
 */

import React from 'react';
import { Key, FileJson, ExternalLink, Zap } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { DataTable } from '../components/patterns/DataTable';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Alert } from '../components/ui/Alert';
import type { DataTableColumn, DataTableRow } from '../components/patterns/DataTable';
import { PageShell } from '../components/layout';

// ─── Mock data ─────────────────────────────────────────────────────────────────

/* Un code d'événement est du code : monospace, en encre, sans couleur. Ils
   étaient en `Badge` teal, orange ou or selon une règle que la page ne disait
   pas (la famille de l'événement) — des capitales à 11 px pour des
   identifiants qu'on recopie en minuscules. */
const EventCode: React.FC<{ code: string }> = ({ code }) => (
  <code className="px-1.5 py-0.5 rounded-sm bg-ink-100 font-mono text-caption text-ink-800 whitespace-nowrap">{code}</code>
);

const WEBHOOK_ROWS: DataTableRow[] = [
  {
    url: (
      <span className="font-mono text-caption text-ink-800 break-all">
        https://hrtools.acmecorp.com/api/webhooks/tls
      </span>
    ),
    events: (
      <div className="flex flex-wrap gap-stack-3xs">
        <EventCode code="user.enrolled" />
        <EventCode code="lesson.completed" />
      </div>
    ),
    status: <Badge variant="success">Actif</Badge>,
    last_triggered: <span className="text-body text-ink-600">Il y a 3 min</span>,
    actions: (
      <div className="flex items-center gap-stack-xs">
        <Button emphasis="ghost" tone="brand" size="sm">Tester</Button>
        <Button emphasis="soft" tone="brand" size="sm">Modifier</Button>
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
      <div className="flex flex-wrap gap-stack-3xs">
        <EventCode code="coaching.booked" />
      </div>
    ),
    status: <Badge variant="success">Actif</Badge>,
    last_triggered: <span className="text-body text-ink-600">Il y a 27 min</span>,
    actions: (
      <div className="flex items-center gap-stack-xs">
        <Button emphasis="ghost" tone="brand" size="sm">Tester</Button>
        <Button emphasis="soft" tone="brand" size="sm">Modifier</Button>
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
      <div className="flex flex-wrap gap-stack-3xs">
        <EventCode code="badge.earned" />
        <EventCode code="lesson.completed" />
      </div>
    ),
    status: <Badge variant="success">Actif</Badge>,
    last_triggered: <span className="text-body text-ink-600">Il y a 2 h</span>,
    actions: (
      <div className="flex items-center gap-stack-xs">
        <Button emphasis="ghost" tone="brand" size="sm">Tester</Button>
        <Button emphasis="soft" tone="brand" size="sm">Modifier</Button>
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
      <div className="flex flex-wrap gap-stack-3xs">
        <EventCode code="user.enrolled" />
      </div>
    ),
    status: <Badge variant="neutral">Inactif</Badge>,
    last_triggered: <span className="text-body text-ink-600">Il y a 14 j</span>,
    actions: (
      <div className="flex items-center gap-stack-xs">
        <Button emphasis="ghost" tone="brand" size="sm">Tester</Button>
        <Button emphasis="soft" tone="brand" size="sm">Modifier</Button>
      </div>
    ),
  },
];

/* Actions de rangée (arbitrage n°19) : « Modifier » est l'action de la rangée
   (soft), « Tester » un outil (ghost). `outline` est réservé à Annuler. */
const COLUMNS: DataTableColumn[] = [
  // L'URL se lit d'un bloc : sur un petit écran, la table défile plutôt que de
  // la couper tous les 7 caractères (voir `minWidth` dans DataTable).
  { key: 'url', label: 'URL de l\'endpoint', sortable: false, minWidth: '16rem' },
  { key: 'events', label: 'Événements', sortable: false },
  { key: 'status', label: 'Statut', sortable: false, width: '110px' },
  { key: 'last_triggered', label: 'Dernier appel', sortable: false, width: '150px' },
  { key: 'actions', label: 'Actions', sortable: false, align: 'right', width: '160px' },
];

/* Les événements, rangés par famille : la couleur des pastilles portait cette
   famille sans la nommer. */
const EVENT_GROUPS = [
  {
    title: 'Parcours et leçons',
    events: [
      { key: 'user.enrolled', label: 'Inscription à un parcours' },
      { key: 'user.completed_path', label: 'Parcours terminé' },
      { key: 'lesson.started', label: 'Leçon démarrée' },
      { key: 'lesson.completed', label: 'Leçon terminée' },
    ],
  },
  {
    title: 'Coaching',
    events: [
      { key: 'coaching.booked', label: 'Session de coaching réservée' },
      { key: 'coaching.completed', label: 'Session de coaching terminée' },
    ],
  },
  {
    title: 'Badges et certificats',
    events: [
      { key: 'badge.earned', label: 'Badge obtenu' },
      { key: 'certificate.issued', label: 'Certificat émis' },
    ],
  },
  {
    title: 'Comptes et équipes',
    events: [
      { key: 'user.created', label: 'Compte utilisateur créé' },
      { key: 'user.deactivated', label: 'Compte désactivé' },
      { key: 'team.updated', label: 'Équipe mise à jour' },
    ],
  },
];

const WEBHOOK_HEADERS_EXAMPLE = `POST /votre-endpoint HTTP/1.1
Content-Type: application/json
X-TLS-Signature: sha256=<HMAC-SHA256 du corps brut, clé = votre secret, en hexadécimal>`;

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

/* Passe typographique du 2026-09-24 : une seule coque (l'en-tête collait au
   haut de la fenêtre, 32 px à gauche du contenu) ; des sections à h2 hors des
   cartes ; les sous-titres de la documentation, des h4 en graisse 600 à
   16 px, deviennent des h3 à 20 ; le texte long passe à ink-700 et à la
   largeur de lecture ; la paire de boutons de documentation passe à la ligne
   au lieu de déborder à 375 px ; le second « Ajouter » de la table, doublon
   de l'action de l'en-tête, est retiré. */
export default function WebhooksManagement() {
  return (
    <PageShell width="wide">
      <PageHero
        eyebrow="Espace entreprise · Intégrations"
        title="Webhooks"
        summary="Configurez les webhooks pour synchroniser les données d'apprentissage avec vos outils RH et LMS."
        tone="flat"
        trailing={
          /* L'action pour laquelle l'écran existe : configurer un webhook. */
          <Button emphasis="solid" tone="brand" size="md" leadingIcon={<Zap size={16} />}>
            Ajouter un webhook
          </Button>
        }
      />

      {/* Info alert */}
      <Alert
        variant="info"
        title="À propos des webhooks"
      >
        Les webhooks permettent à The Learning Society d'envoyer des notifications HTTP en temps réel vers vos systèmes externes lorsque des événements d'apprentissage se produisent. Chaque requête est signée via HMAC-SHA256 pour garantir l'authenticité. Les événements supportés incluent les inscriptions, progressions, sessions de coaching et certifications.
      </Alert>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
        <StatCard label="Webhooks actifs" value="3" />
        <StatCard label="Événements par jour" value="142" delta={'+8\u00a0%'} deltaDirection="up" />
        <StatCard label="Taux de succès" value="99,2" sub="%" />
      </div>

      {/* Data table — `DataTable` porte sa propre coque. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Webhooks configurés" meta={`${WEBHOOK_ROWS.length} webhooks`} />
        <DataTable
          columns={COLUMNS}
          rows={WEBHOOK_ROWS}
          emptyMessage="Aucun webhook configuré."
        />
      </section>

      {/* Available events */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Événements disponibles"
          subtitle="Les événements que vous pouvez écouter via vos webhooks, par famille."
        />
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-section gap-y-stack-lg">
            {EVENT_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col gap-stack-sm">
                <h3 className="font-display text-h3 text-ink-900">{group.title}</h3>
                <dl className="flex flex-col gap-stack-xs">
                  {group.events.map((evt) => (
                    <div key={evt.key} className="flex flex-wrap items-baseline gap-x-stack-sm gap-y-stack-3xs">
                      <dt><EventCode code={evt.key} /></dt>
                      <dd className="text-body text-ink-700">{evt.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Documentation — du texte qu'on lit : posé sur la page, à la largeur de lecture. */}
      {/* 24 px sous l'en-tête (et non 16) : le premier sous-titre h3 garde plus
          d'air au-dessus qu'en dessous, comme tout titre. */}
      <section className="flex flex-col gap-stack-lg">
        <SectionHeader
          title="Documentation"
          subtitle="Ressources techniques pour intégrer les webhooks TLS dans vos systèmes."
        />

        <div className="flex flex-col gap-section">
          {/* Auth */}
          <div className="flex flex-col gap-stack-xs">
            <h3 className="flex items-start gap-stack-xs font-display text-h3 text-ink-900">
              {/* Une ligne de haut : l'icône se centre sur la première ligne du titre. */}
              <span className="shrink-0 inline-flex items-center h-lh text-primary-700" aria-hidden="true"><Key size={18} /></span>
              Authentification
            </h3>
            <p className="text-body text-ink-700 max-w-prose">
              Chaque requête webhook inclut un header <code className="px-1 py-0.5 bg-ink-100 rounded-sm text-caption font-mono text-ink-800 whitespace-nowrap">X-TLS-Signature</code> contenant une signature HMAC-SHA256 calculée avec votre secret. Comparez cette signature côté serveur pour valider l'origine des événements.
            </p>
            {/* L'exemple montrait `Authorization: Bearer <votre_secret_api>`,
                contredisant le texte juste au-dessus (2026-09-24). Le Bearer
                est le mécanisme de l'API entrante (/api-docs) ; un webhook
                sortant est signé, et le secret ne voyage jamais. */}
            <pre className="rounded-lg bg-ink-900 p-stack font-mono text-caption text-ink-100 overflow-x-auto whitespace-pre">
              {WEBHOOK_HEADERS_EXAMPLE}
            </pre>
          </div>

          {/* Payload */}
          <div className="flex flex-col gap-stack-xs">
            <h3 className="flex items-start gap-stack-xs font-display text-h3 text-ink-900">
              <span className="shrink-0 inline-flex items-center h-lh text-primary-700" aria-hidden="true"><FileJson size={18} /></span>
              Format de payload
            </h3>
            <p className="text-body text-ink-700 max-w-prose">
              Les événements sont envoyés en POST avec un corps JSON encodé en UTF-8. La structure est identique pour tous les types d'événements.
            </p>
            <pre className="rounded-lg bg-ink-900 p-stack font-mono text-caption text-ink-100 overflow-x-auto whitespace-pre">
              {PAYLOAD_EXAMPLE}
            </pre>
          </div>

          {/* API docs link — la paire passe à la ligne quand la place manque. */}
          <div className="flex flex-wrap items-center gap-stack-xs">
            <Button
              emphasis="ghost"
              tone="brand"
              size="sm"
              trailingIcon={<ExternalLink size={14} />}
            >
              Documentation API complète
            </Button>
            <Button
              emphasis="ghost"
              tone="brand"
              size="sm"
              trailingIcon={<ExternalLink size={14} />}
            >
              Exemples d'intégration
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
