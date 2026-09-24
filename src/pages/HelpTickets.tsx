import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, MessageSquare } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { EmptyState } from '../components/ui/EmptyState';
import { useHelpcenterStore } from '../stores/persistence';
import { PageShell } from '../components/layout';
import type { BadgeVariant } from '../components';

const MOCK_USER_ID = 'user-demo';

const STATUS_BADGE: Record<string, { label: string; variant: BadgeVariant }> = {
  open:        { label: 'Ouvert',     variant: 'sun' },
  in_progress: { label: 'En cours',   variant: 'brand' },
  resolved:    { label: 'Résolu',     variant: 'success' },
  closed:      { label: 'Fermé',      variant: 'neutral' },
};

const TAB_ITEMS = [
  { id: 'open',     label: 'Ouverts'  },
  { id: 'resolved', label: 'Résolus'  },
];

export default function HelpTickets() {
  const [tab, setTab] = useState('open');
  const navigate = useNavigate();
  const store = useHelpcenterStore();

  const tickets = store.getTickets(MOCK_USER_ID);
  const openTickets = tickets.filter((t) => t.status === 'open' || t.status === 'in_progress');
  const resolvedTickets = tickets.filter((t) => t.status === 'resolved' || t.status === 'closed');

  const displayed = tab === 'open' ? openTickets : resolvedTickets;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  /* Passe typographique du 2026-09-24 : l'en-tête vivait HORS de
     `PageShell` (collé au haut de la fenêtre, sur un autre bord que la liste) ;
     les onglets et la liste forment un bloc ; les demandes sont des rangées
     dans une carte (arbitrage n°5), leur objet en Nunito 16 / 600 (il était
     en League Spartan à 16, sous le seuil de la famille display), leur date
     en légende ink-600. */
  return (
    <PageShell width="page">
      <PageHero
        eyebrow="Centre d'aide"
        title="Mes tickets"
        summary="Suivez l'état de vos demandes de support et échangez avec notre équipe."
        tone="flat"
        trailing={
          /* L'action principale de l'écran (arbitrage n°19) ; ouvrir un
             ticket est l'action de sa rangée (soft). */
          <Button emphasis="solid" tone="brand" leadingIcon={<Plus size={16} />} onClick={() => navigate('/help/tickets/new')}>
            Nouveau ticket
          </Button>
        }
      />

      <div className="flex flex-col gap-stack-lg">
        <Tabs items={TAB_ITEMS} value={tab} onChange={setTab} variant="underline" label="Tickets" />

        {displayed.length === 0 ? (
          <EmptyState
            title={tab === 'open' ? 'Aucun ticket ouvert' : 'Aucun ticket résolu'}
            description={
              tab === 'open'
                ? 'Vous n\'avez aucune demande de support en cours.'
                : 'Vos tickets résolus apparaîtront ici une fois traités.'
            }
            icon={<MessageSquare size={32} />}
          />
        ) : (
          <Card className="p-0 overflow-hidden">
            <ul className="flex flex-col divide-y divide-ink-100" aria-label={tab === 'open' ? 'Tickets ouverts' : 'Tickets résolus'}>
              {displayed.map((ticket) => {
                const badge = STATUS_BADGE[ticket.status] ?? { label: ticket.status, variant: 'neutral' as BadgeVariant };
                return (
                  <li key={ticket.id} className="flex flex-wrap items-center gap-x-stack gap-y-stack-xs px-stack-md sm:px-stack-lg py-stack">
                    <div className="flex flex-col gap-stack-3xs flex-1 min-w-48">
                      <span className="font-body text-body font-semibold text-ink-900">{ticket.subject}</span>
                      <span className="flex items-center gap-stack-3xs text-caption text-ink-600">
                        <Calendar size={14} aria-hidden="true" />
                        {formatDate(ticket.createdAt)}
                      </span>
                    </div>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                    <Button
                      emphasis="soft"
                      tone="brand"
                      size="sm"
                      aria-label={`Voir le ticket : ${ticket.subject}`}
                      onClick={() => navigate(`/help/tickets/${ticket.id}`)}
                    >
                      Voir
                    </Button>
                  </li>
                );
              })}
            </ul>
          </Card>
        )}
      </div>
    </PageShell>
  );
}
