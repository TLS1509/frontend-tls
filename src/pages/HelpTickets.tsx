import React, { useState } from 'react';
import { HelpCircle, Plus, Calendar, MessageSquare } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { EmptyState } from '../components/ui/EmptyState';

const OPEN_TICKETS = [
  {
    id: '1',
    title: 'Problème de connexion à mon compte',
    date: '12 mai 2026',
    status: 'En cours',
    statusVariant: 'brand' as const,
  },
  {
    id: '2',
    title: 'Impossible de télécharger mon attestation',
    date: '10 mai 2026',
    status: 'Ouvert',
    statusVariant: 'sun' as const,
  },
  {
    id: '3',
    title: 'Erreur lors du paiement de l\'abonnement',
    date: '8 mai 2026',
    status: 'En cours',
    statusVariant: 'brand' as const,
  },
  {
    id: '4',
    title: 'Le module Feedback ne se lance pas',
    date: '5 mai 2026',
    status: 'Ouvert',
    statusVariant: 'sun' as const,
  },
];

const TAB_ITEMS = [
  { id: 'open',     label: 'Ouverts'  },
  { id: 'resolved', label: 'Résolus'  },
];

export default function HelpTickets() {
  const [tab, setTab] = useState('open');

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Support' }}
        title="Mes Tickets"
        summary="Suivez l'état de vos demandes de support et échangez avec notre équipe."
        tone="default"
        trailing={
          <Button variant="glass" leadingIcon={<Plus size={16} />}>
            Nouveau ticket
          </Button>
        }
      />

      <div className="max-w-page mx-auto w-full px-4 flex flex-col gap-section pb-page">
        <Tabs items={TAB_ITEMS} value={tab} onChange={setTab} variant="underline" />

        {tab === 'open' && (
          <div className="flex flex-col gap-stack">
            {OPEN_TICKETS.map((ticket) => (
              <Card key={ticket.id}>
                <div className="flex items-center gap-stack">
                  <div className="flex flex-col gap-tight flex-1 min-w-0">
                    <span className="font-display font-semibold text-body text-ink-900">{ticket.title}</span>
                    <span className="flex items-center gap-tight text-caption text-ink-500">
                      <Calendar size={12} />
                      {ticket.date}
                    </span>
                  </div>
                  <Badge variant={ticket.statusVariant}>{ticket.status}</Badge>
                  <Button variant="ghost" size="sm">Voir</Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === 'resolved' && (
          <EmptyState
            title="Aucun ticket résolu"
            description="Vos tickets résolus apparaîtront ici une fois traités par notre équipe support."
            icon={<MessageSquare size={32} />}
          />
        )}
      </div>
    </div>
  );
}
