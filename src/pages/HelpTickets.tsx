import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Plus, Calendar, MessageSquare } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { EmptyState } from '../components/ui/EmptyState';
import { useHelpcenterStore } from '../stores/persistence';
import { Container } from '../components/layout';
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

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Support' }}
        title="Mes Tickets"
        summary="Suivez l'état de vos demandes de support et échangez avec notre équipe."
        tone="default"
        trailing={
          <Button variant="glass" leadingIcon={<Plus size={16} />} onClick={() => navigate('/help/tickets/new')}>
            Nouveau ticket
          </Button>
        }
      />

      <Container width="page" padding={false} className="px-stack flex flex-col gap-section pb-page">
        <Tabs items={TAB_ITEMS} value={tab} onChange={setTab} variant="underline" />

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
          <div className="flex flex-col gap-stack">
            {displayed.map((ticket) => {
              const badge = STATUS_BADGE[ticket.status] ?? { label: ticket.status, variant: 'neutral' as BadgeVariant };
              return (
                <Card key={ticket.id}>
                  <div className="flex items-center gap-stack">
                    <div className="flex flex-col gap-tight flex-1 min-w-0">
                      <span className="font-display font-semibold text-body text-ink-900">{ticket.subject}</span>
                      <span className="flex items-center gap-tight text-caption text-ink-500">
                        <Calendar size={12} />
                        {formatDate(ticket.createdAt)}
                      </span>
                    </div>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/help/tickets/${ticket.id}`)}
                    >
                      Voir
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
