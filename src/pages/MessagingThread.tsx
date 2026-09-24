import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Paperclip, Smile, Check, CheckCheck } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Avatar } from '../components/ui/Avatar';
import { useCoachingStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { PageShell } from '../components/layout';

interface Message {
  id: string;
  authorId: string;
  authorName: string;
  initials: string;
  text: string;
  time: string;
  read: boolean;
  isMe: boolean;
}

const SEED_MESSAGES: Message[] = [
  { id: '1', authorId: 'coach', authorName: 'Coach', initials: 'SM', text: 'Bonjour ! J\'ai vu que tu as terminé le module de stratégie produit. Comment ça s\'est passé ?', time: '09:12', read: true, isMe: false },
  { id: '2', authorId: 'me', authorName: 'Moi', initials: 'CM', text: 'Salut ! Plutôt bien, mais j\'avais quelques questions sur la matrice BCG.', time: '09:15', read: true, isMe: true },
  { id: '3', authorId: 'coach', authorName: 'Coach', initials: 'SM', text: 'Parfait, on peut en parler lors de notre prochain RDV jeudi. Tu peux me préciser ce qui te bloque exactement ?', time: '09:18', read: true, isMe: false },
  { id: '4', authorId: 'me', authorName: 'Moi', initials: 'CM', text: 'C\'est surtout l\'arbitrage entre les "vache à lait" et les "stars" quand on a un budget limité.', time: '09:22', read: true, isMe: true },
  { id: '5', authorId: 'coach', authorName: 'Coach', initials: 'SM', text: 'Excellent point ! C\'est exactement le type de réflexion qu\'on attend au niveau Dreyfus 3. Je te prépare un cas concret pour jeudi.', time: '09:25', read: false, isMe: false },
];

const MessagingThread: React.FC = () => {
  const { coachId } = useParams();
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);

  const sessions = useCoachingStore().getSessions(MOCK_USER_ID);
  const matchedSession = sessions.find((s) => s.coachId === coachId) ?? sessions[0];
  const coachName = matchedSession?.coachName ?? 'Ton coach';
  const coachInitials = coachName.split(' ').map((n) => n[0]).join('').slice(0, 2);

  const send = () => {
    if (!draft.trim()) return;
    setMessages([
      ...messages,
      { id: String(Date.now()), authorId: 'me', authorName: 'Moi', initials: 'CM', text: draft, time: 'maintenant', read: false, isMe: true },
    ]);
    setDraft('');
  };

  return (
    /* Route « pleine page » (`/messages/` est dans `isFullBleed`, App.tsx) :
       la coque ne pose pas sa gouttière, la page la porte — l'en-tête partait
       à 265 px, sous le bord de la barre latérale (le « S » était coupé).
       L'en-tête vit dans la même colonne que la conversation : un seul bord
       gauche. */
    <div className="min-h-[100dvh] flex flex-col px-4 sm:px-6 lg:px-10">
      <PageShell width="content" noPadTop gap="section" className="pt-6 md:pt-8 lg:pt-10 flex-1">
        {/* La carte du coach répétait le nom du h1 : elle se fond dans la
            ligne de méta. « Coach assigné » est une donnée, pas un état. */}
        <EditorialHero
          eyebrow="Coaching · Messagerie"
          title={coachName}
          summary="Conversation directe avec ton coach."
          meta={[
            { icon: <Avatar initials={coachInitials} size="xs" />, label: 'Coach assigné' },
            { icon: <span className="w-2 h-2 rounded-pill bg-success-base" aria-hidden="true" />, label: 'En ligne' },
          ]}
          tone="flat"
        />

        {/* La conversation : le fil et la zone de saisie forment un groupe
            (16 px). Dans le fil, 12 px entre deux messages, l'heure collée sous
            sa bulle en légende ink-600 (ink-500 est réservé aux placeholders). */}
        <div className="flex-1 flex flex-col gap-stack">
        <div className="flex-1 flex flex-col gap-stack-sm overflow-y-auto max-h-[60vh]" aria-label="Messages" role="log">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-stack-xs ${m.isMe ? 'flex-row-reverse' : ''}`}>
              {!m.isMe && <Avatar initials={m.initials} size="sm" />}
              <div className={`max-w-[70%] ${m.isMe ? 'items-end' : 'items-start'} flex flex-col gap-tight`}>
                <div
                  className={`px-stack py-3 rounded-xl ${
                    m.isMe
                      ? 'bg-primary-700 text-white rounded-br-[6px]'
                      : 'bg-white border border-ink-200 rounded-bl-[6px]'
                  }`}
                >
                  <p className="text-body">{m.text}</p>
                </div>
                <div className="flex items-center gap-stack-3xs text-caption text-ink-600 tabular-nums px-stack-xs">
                  <span>{m.time}</span>
                  {m.isMe && (m.read
                    ? <CheckCheck className="w-3.5 h-3.5" aria-label="Lu" />
                    : <Check className="w-3.5 h-3.5" aria-label="Envoyé" />)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Card className="p-stack-xs flex items-end gap-stack-xs">
          <Button emphasis="outline" iconOnly leadingIcon={<Paperclip className="w-4 h-4" />} aria-label="Joindre" />
          <Button emphasis="outline" iconOnly leadingIcon={<Smile className="w-4 h-4" />} aria-label="Emoji" />
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Écris ton message…"
            aria-label="Ton message"
            className="flex-1 h-auto min-h-[44px] max-h-32 resize-none p-stack-xs border-0 focus:outline-2 focus:outline-offset-2 focus:outline-primary-500 text-body placeholder:text-ink-500"
            rows={1}
          />
          <Button emphasis="soft" leadingIcon={<Send className="w-4 h-4" />} onClick={send} disabled={!draft.trim()}>
            Envoyer
          </Button>
        </Card>
        </div>
      </PageShell>
    </div>
  );
};

export default MessagingThread;
