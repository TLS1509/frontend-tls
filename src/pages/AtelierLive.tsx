import React from 'react';
import { useParams } from 'react-router-dom';
import { Video, Users, FileText, Download, ExternalLink } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageShell } from '../components/layout';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { StatCard } from '../components/ui/StatCard';

// ─── Mock data ───────────────────────────────────────────────────────────────

interface ChatMessage {
  id: number;
  author: string;
  initials: string;
  text: string;
}

const CHAT_MESSAGES: ChatMessage[] = [
  { id: 1, author: 'Marie C.', initials: 'MC', text: "Super exercice en paires, j'ai beaucoup appris !" },
  { id: 2, author: 'Thomas L.', initials: 'TL', text: 'Question : peut-on appliquer ce framework au feedback écrit ?' },
  { id: 3, author: 'Sophie M.', initials: 'SM', text: 'Absolument Thomas : on va justement voir ça dans 10 min.' },
];

interface Resource {
  id: number;
  label: string;
  type: 'pdf' | 'link';
}

const RESOURCES: Resource[] = [
  { id: 1, label: 'Support atelier', type: 'pdf' },
  { id: 2, label: 'Miro Board', type: 'link' },
  { id: 3, label: 'Exercices pratiques', type: 'pdf' },
];

const PARTICIPANTS = [
  { name: 'Marie C.', initials: 'MC' },
  { name: 'Thomas L.', initials: 'TL' },
  { name: 'Julie R.', initials: 'JR' },
  { name: 'Karim B.', initials: 'KB' },
];

// ─── AtelierLive ──────────────────────────────────────────────────────────────

export default function AtelierLive() {
  const { id } = useParams<{ id: string }>();
  void id;

  return (
    <PageShell width="page" noPadTop={true} className="pt-6 md:pt-8 lg:pt-10">
      {/* L'état et l'affluence : la ligne de méta de l'en-tête. */}
      <EditorialHero
        tone="flat"
        eyebrow="Atelier · En direct"
        title="Atelier Feedback 360°"
        summary="Session en cours avec Sophie Martin."
        meta={[
          { label: <Badge variant="danger" size="normal" dot>En direct</Badge> },
          { icon: <Users size={14} aria-hidden="true" />, label: '11 participants' },
        ]}
      />

      <div className="grid md:grid-cols-3 gap-page md:gap-section items-start">
          {/* Zone player : col span 2 */}
          <div className="md:col-span-2 flex flex-col gap-page min-w-0">
            {/* Rejoindre : l'action principale de l'écran, son seul `solid`
                (arbitrage n°19). Posé sur le lecteur sombre, c'est le verre
                clair `onDark`, encre foncée. */}
            <Card variant="ink" className="aspect-video flex flex-col items-center justify-center gap-section">
              <Video size={48} className="text-white/40" />
              <Button
                emphasis="solid"
                tone="brand"
                onDark
                size="lg"
                leadingIcon={<ExternalLink size={16} />}
              >
                Rejoindre sur Google Meet
              </Button>
            </Card>

            {/* Le chat : une section h2 (c'était un h3 de 20 px dans une carte,
                sous le h1). Le message est ce qu'on lit : 16 ink-900, il était en
                légende ; son auteur en légende 600 au-dessus. Champ et bouton à
                la même hauteur, 44 px. */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Chat du groupe" meta={`${CHAT_MESSAGES.length} messages`} size="md" />
              <Card className="flex flex-col gap-stack">
                <ul className="flex flex-col gap-stack">
                  {CHAT_MESSAGES.map((msg) => (
                    <li key={msg.id} className="flex items-start gap-stack-xs">
                      <Avatar name={msg.author} initials={msg.initials} size="sm" />
                      <div className="flex flex-col gap-tight min-w-0">
                        <span className="text-caption font-semibold text-ink-600">{msg.author}</span>
                        <p className="text-body text-ink-900">{msg.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-stack-xs pt-stack-sm border-t border-ink-100">
                  <Input
                    placeholder="Écrire un message…"
                    aria-label="Écrire un message"
                    className="flex-1 min-w-0"
                  />
                  {/* L'envoi du chat, action du panneau : `soft`. */}
                  <Button emphasis="soft" tone="brand">Envoyer</Button>
                </div>
              </Card>
            </section>
          </div>

          {/* Colonne latérale : à côté du lecteur, elle se lit avant le chat —
              ses deux blocs sont des sections h2 (des h3 sans h2 au-dessus). */}
          <div className="md:col-span-1 flex flex-col gap-section">
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Participants" size="md" />
              <StatCard
                value={11}
                label="Connectés"
                size="sm"
                tone="warm"
                surface="tinted"
              />
              <div className="flex flex-wrap items-center gap-stack-xs">
                {PARTICIPANTS.map((p) => (
                  <Avatar key={p.name} name={p.name} initials={p.initials} size="sm" />
                ))}
                <span className="text-caption text-ink-600">+7 autres</span>
              </div>
            </section>

            {/* Des rangées dans UNE carte (plus trois cartes dans une carte) ;
                le nom en 16 ink-900, le format en légende (une donnée, plus une
                pastille « PDF »). Les boutons icône portaient aussi leur libellé
                en enfant : ils débordaient de la carte et chevauchaient l'icône. */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Ressources partagées" size="md" />
              <Card className="p-0">
                <ul className="flex flex-col divide-y divide-ink-100">
                  {RESOURCES.map((res) => (
                    <li key={res.id} className="flex items-center justify-between gap-stack-sm px-stack-md py-stack-sm">
                      <div className="flex items-start gap-stack-xs min-w-0">
                        <span className="shrink-0 inline-flex items-center h-lh text-body text-ink-600" aria-hidden="true">
                          {res.type === 'pdf' ? <FileText size={16} /> : <ExternalLink size={16} />}
                        </span>
                        <div className="flex flex-col gap-tight min-w-0">
                          <span className="text-body text-ink-900">{res.label}</span>
                          <span className="text-caption text-ink-600">{res.type === 'pdf' ? 'PDF' : 'Lien'}</span>
                        </div>
                      </div>
                      {/* L'action de la rangée : `soft` (arbitrage n°19 ;
                          `outline` est réservé à Annuler). */}
                      <Button
                        emphasis="soft"
                        tone="brand"
                        iconOnly
                        className="shrink-0"
                        aria-label={res.type === 'pdf' ? `Télécharger ${res.label}` : `Ouvrir ${res.label}`}
                        leadingIcon={res.type === 'pdf' ? <Download size={16} /> : <ExternalLink size={16} />}
                      />
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          </div>
        </div>
    </PageShell>
  );
}
