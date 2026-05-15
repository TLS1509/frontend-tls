import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, Send, ArrowLeft, Calendar, Headphones } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Input } from '../components/core/Input';
import { FormGroup } from '../components/core/FormGroup';
import { useHelpcenterStore } from '../stores/persistence';
import type { BadgeVariant } from '../components';

const MOCK_USER_ID = 'user-demo';

const STATUS_BADGE: Record<string, { label: string; variant: BadgeVariant }> = {
  open:        { label: 'Ouvert',     variant: 'sun' },
  in_progress: { label: 'En cours',   variant: 'brand' },
  resolved:    { label: 'Résolu',     variant: 'success' },
  closed:      { label: 'Fermé',      variant: 'neutral' },
};

export default function HelpTicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useHelpcenterStore();
  const [replyText, setReplyText] = useState('');

  const ticket = store.getTicket(id ?? '');
  const replies = id ? store.getTicketReplies(id) : [];

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  const handleReply = () => {
    if (!replyText.trim() || !id) return;
    store.addTicketReply(id, MOCK_USER_ID, replyText.trim());
    setReplyText('');
  };

  if (!ticket) {
    return (
      <div className="flex flex-col gap-section">
        <EditorialHero
          eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Ticket' }}
          title="Ticket introuvable"
          summary="Ce ticket n'existe pas ou vous n'y avez pas accès."
          tone="default"
        />
        <div className="max-w-page mx-auto w-full px-4 pb-page">
          <Button variant="ghost" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/help/tickets')}>
            Retour aux tickets
          </Button>
        </div>
      </div>
    );
  }

  const badge = STATUS_BADGE[ticket.status] ?? { label: ticket.status, variant: 'neutral' as BadgeVariant };

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Ticket' }}
        title={ticket.subject}
        summary={`Ticket ${ticket.id} — Ouvert le ${formatDate(ticket.createdAt)}`}
        tone="default"
        trailing={<Badge variant={badge.variant}>{badge.label}</Badge>}
      />

      <div className="max-w-page mx-auto w-full px-4 flex flex-col gap-section pb-page">
        <div className="flex items-center gap-stack-xs">
          <Button variant="ghost" leadingIcon={<ArrowLeft size={16} />} size="sm" onClick={() => navigate('/help/tickets')}>
            Retour aux tickets
          </Button>
          <Badge variant={badge.variant}>{badge.label}</Badge>
        </div>

        <SectionCard title="Votre message" titleIcon={<HelpCircle size={18} />}>
          <div className="flex flex-col gap-stack-xs">
            <div className="flex items-center gap-stack-xs text-caption text-ink-500">
              <Calendar size={12} />
              {formatDate(ticket.createdAt)}
            </div>
            <p className="text-body text-ink-700 leading-relaxed m-0 whitespace-pre-line">
              {ticket.description}
            </p>
          </div>
        </SectionCard>

        {replies.length > 0 && (
          <SectionCard title="Échanges" titleIcon={<Headphones size={18} />}>
            <div className="flex flex-col gap-stack">
              {replies.map((reply) => (
                <Card key={reply.id}>
                  <div className="flex gap-stack">
                    <Avatar size="md" tint={reply.isAdminReply ? 'brand' : 'warm'}>
                      {reply.isAdminReply ? 'SP' : 'MO'}
                    </Avatar>
                    <div className="flex flex-col gap-stack-xs flex-1">
                      <div className="flex items-center justify-between gap-stack-xs">
                        <span className="font-display font-semibold text-body-sm text-ink-900">
                          {reply.isAdminReply ? 'Support TLS' : 'Moi'}
                        </span>
                        <span className="text-caption text-ink-500">{formatDate(reply.createdAt)}</span>
                      </div>
                      <p className="text-body-sm text-ink-700 leading-relaxed m-0 whitespace-pre-line">
                        {reply.replyText}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </SectionCard>
        )}

        {ticket.status !== 'closed' && ticket.status !== 'resolved' && (
          <SectionCard title="Répondre" titleIcon={<Send size={18} />}>
            <div className="flex flex-col gap-stack">
              <FormGroup label="Votre message">
                <Input
                  multiline
                  rows={4}
                  placeholder="Décrivez votre problème ou apportez des précisions…"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </FormGroup>
              <div className="flex gap-stack-xs">
                <Button
                  variant="primary"
                  leadingIcon={<Send size={16} />}
                  disabled={!replyText.trim()}
                  onClick={handleReply}
                >
                  Envoyer
                </Button>
              </div>
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}
