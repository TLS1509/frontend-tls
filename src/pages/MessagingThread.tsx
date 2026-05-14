import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Paperclip, Smile, Check, CheckCheck } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

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

const COACH = { id: 'c1', name: 'Marie Dubois', initials: 'MD', status: 'online' as const };

const MOCK_MESSAGES: Message[] = [
  { id: '1', authorId: 'c1', authorName: 'Marie', initials: 'MD', text: 'Bonjour ! J\'ai vu que tu as terminé le module de stratégie produit. Comment ça s\'est passé ?', time: '09:12', read: true, isMe: false },
  { id: '2', authorId: 'me', authorName: 'Moi', initials: 'CM', text: 'Salut Marie ! Plutôt bien, mais j\'avais quelques questions sur la matrice BCG.', time: '09:15', read: true, isMe: true },
  { id: '3', authorId: 'c1', authorName: 'Marie', initials: 'MD', text: 'Parfait, on peut en parler lors de notre prochain RDV jeudi. Tu peux me préciser ce qui te bloque exactement ?', time: '09:18', read: true, isMe: false },
  { id: '4', authorId: 'me', authorName: 'Moi', initials: 'CM', text: 'C\'est surtout l\'arbitrage entre les "vache à lait" et les "stars" quand on a un budget limité.', time: '09:22', read: true, isMe: true },
  { id: '5', authorId: 'c1', authorName: 'Marie', initials: 'MD', text: 'Excellent point ! C\'est exactement le type de réflexion qu\'on attend au niveau Dreyfus 3. Je te prépare un cas concret pour jeudi.', time: '09:25', read: false, isMe: false },
];

const MessagingThread: React.FC = () => {
  const { coachId } = useParams();
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

  const send = () => {
    if (!draft.trim()) return;
    setMessages([
      ...messages,
      { id: String(Date.now()), authorId: 'me', authorName: 'Moi', initials: 'CM', text: draft, time: 'maintenant', read: false, isMe: true },
    ]);
    setDraft('');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <EditorialHero
        eyebrow="Coaching · Messagerie"
        title={COACH.name}
        description="Conversation directe avec ton coach"
        tone="default"
      />

      <div className="flex-1 max-w-content mx-auto w-full px-4 py-section flex flex-col gap-stack">
        <Card className="p-4 flex items-center gap-3">
          <Avatar initials={COACH.initials} size="md" />
          <div className="flex-1">
            <div className="font-semibold">{COACH.name}</div>
            <div className="text-caption text-success-fg flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success-base" /> En ligne
            </div>
          </div>
          <Badge variant="info">Coach assigné</Badge>
        </Card>

        <div className="flex-1 flex flex-col gap-stack-xs overflow-y-auto max-h-[60vh] py-stack">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-2 ${m.isMe ? 'flex-row-reverse' : ''}`}>
              {!m.isMe && <Avatar initials={m.initials} size="sm" />}
              <div className={`max-w-[70%] ${m.isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    m.isMe
                      ? 'bg-primary-600 text-white rounded-br-[6px]'
                      : 'bg-white border border-ink-200 rounded-bl-[6px]'
                  }`}
                >
                  <p className="text-body-sm leading-relaxed">{m.text}</p>
                </div>
                <div className="flex items-center gap-1 text-caption text-ink-500 px-2">
                  <span>{m.time}</span>
                  {m.isMe && (m.read ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Card className="p-2 flex items-end gap-2">
          <Button variant="ghost" size="sm" iconOnly leadingIcon={<Paperclip className="w-4 h-4" />} aria-label="Joindre" />
          <Button variant="ghost" size="sm" iconOnly leadingIcon={<Smile className="w-4 h-4" />} aria-label="Emoji" />
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Tape ton message..."
            className="flex-1 h-auto min-h-[44px] max-h-32 resize-none p-2 border-0 focus:outline-none text-body-sm"
            rows={1}
          />
          <Button variant="primary" size="sm" trailingIcon={<Send className="w-4 h-4" />} onClick={send} disabled={!draft.trim()}>
            Envoyer
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default MessagingThread;
