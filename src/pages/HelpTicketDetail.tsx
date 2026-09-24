import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Calendar } from 'lucide-react';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Input } from '../components/core/Input';
import { FormGroup } from '../components/core/FormGroup';
import { PageShell } from '../components/layout';
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
      <PageShell width="content">
        <PageHero
          eyebrow="Centre d'aide"
          title="Ticket introuvable"
          summary="Ce ticket n'existe pas ou vous n'y avez pas accès."
          tone="flat"
        />
        <div>
          <Button emphasis="outline" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/help/tickets')}>
            Retour aux tickets
          </Button>
        </div>
      </PageShell>
    );
  }

  const badge = STATUS_BADGE[ticket.status] ?? { label: ticket.status, variant: 'neutral' as BadgeVariant };
  // « ticket-001 » → « n° 001 » : un identifiant brut n'est pas un nom.
  const numero = ticket.id.replace(/^\D+/, '');

  /* Passe typographique du 2026-09-24 : une seule coque, à la largeur d'un
     fil de conversation (768) ; le retour passe au-dessus du titre ; l'état
     « Résolu » était écrit deux fois (en-tête et à côté du retour) : il reste
     dans l'en-tête ; l'identifiant brut devient « Demande n° 001 », en méta ;
     les échanges sont des rangées dans UNE carte, avec les initiales (la page
     les passait en enfants d'`Avatar`, qui affichait « ? ») ; les dates en
     légende ink-600 (elles étaient au gris des placeholders). */
  return (
    <PageShell width="content">
      <PageHero
        backLink={{ label: 'Mes tickets', onClick: () => navigate('/help/tickets') }}
        eyebrow="Centre d'aide"
        title={ticket.subject}
        meta={[
          { label: `Demande n°\u00a0${numero}` },
          { label: `Ouverte le ${formatDate(ticket.createdAt)}` },
        ]}
        tone="flat"
        trailing={<Badge variant={badge.variant}>{badge.label}</Badge>}
      />

      <section className="flex flex-col gap-stack">
        <SectionHeader title="Votre message" />
        <Card className="flex flex-col gap-stack-xs">
          <p className="flex items-center gap-stack-3xs text-caption text-ink-600">
            <Calendar size={14} aria-hidden="true" />
            {formatDate(ticket.createdAt)}
          </p>
          <p className="text-body text-ink-700 whitespace-pre-line max-w-prose">
            {ticket.description}
          </p>
        </Card>
      </section>

      {replies.length > 0 && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Échanges" meta={`${replies.length} message${replies.length > 1 ? 's' : ''}`} />
          <Card className="p-0 overflow-hidden">
            <ul className="flex flex-col divide-y divide-ink-100">
              {replies.map((reply) => (
                <li key={reply.id} className="flex gap-stack-sm px-stack-md sm:px-stack-lg py-stack-lg">
                  <Avatar size="md" tint={reply.isAdminReply ? 'brand' : 'warm'} initials={reply.isAdminReply ? 'SP' : 'MO'} />
                  <div className="flex flex-col gap-stack-xs flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-stack-xs gap-y-stack-3xs">
                      <span className="font-body text-body font-semibold text-ink-900">
                        {reply.isAdminReply ? 'Support TLS' : 'Moi'}
                      </span>
                      <span className="text-caption text-ink-600">{formatDate(reply.createdAt)}</span>
                    </div>
                    <p className="text-body text-ink-700 whitespace-pre-line max-w-prose">
                      {reply.replyText}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {ticket.status !== 'closed' && ticket.status !== 'resolved' && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Répondre" />
          <Card className="flex flex-col gap-stack-lg">
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
                emphasis="soft"
                leadingIcon={<Send size={16} />}
                disabled={!replyText.trim()}
                onClick={handleReply}
              >
                Envoyer
              </Button>
            </div>
          </Card>
        </section>
      )}
    </PageShell>
  );
}
