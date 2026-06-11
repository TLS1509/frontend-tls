import React from 'react';
import { useParams } from 'react-router-dom';
import { Video, MessageSquare, Users, FileText, Download, ExternalLink } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { StatCard } from '../components/ui/StatCard';
import { Container } from '../components/layout';

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
  { id: 3, author: 'Sophie M.', initials: 'SM', text: 'Absolument Thomas — on va justement voir ça dans 10 min.' },
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
    <div className="flex flex-col">
      <EditorialHero
        tone="warm"
        eyebrow="Atelier · En direct"
        title="Atelier Feedback 360°"
        summary="Session en cours · Sophie Martin · 11 participants"
        trailing={
          <Badge variant="danger" size="md" className="animate-pulse">🔴 EN DIRECT</Badge>
        }
      />

      <Container width="wide" padding={false} className="px-4 py-section">
        <div className="grid md:grid-cols-3 gap-section">
          {/* Zone player — col span 2 */}
          <div className="md:col-span-2 flex flex-col gap-section">
            {/* Video placeholder */}
            <Card variant="default" className="aspect-video flex flex-col items-center justify-center bg-ink-900 rounded-2xl gap-section">
              <Video size={48} className="text-white/40" />
              <Button
                variant="glass"
                size="lg"
                leadingIcon={<ExternalLink size={16} />}
              >
                Rejoindre sur Google Meet
              </Button>
            </Card>

            {/* Chat simplifié */}
            <SectionCard
              title="Chat groupe"
              titleIcon={<MessageSquare size={18} />}
            >
              <div className="flex flex-col gap-stack">
                {CHAT_MESSAGES.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-stack-xs">
                    <Avatar name={msg.author} initials={msg.initials} size="sm" />
                    <div className="flex flex-col gap-tight">
                      <span className="text-caption font-semibold text-ink-700">{msg.author}</span>
                      <span className="text-caption text-ink-600">{msg.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-stack-xs mt-stack">
                <div className="flex-1">
                  <Input
                    placeholder="Écrire un message..."
                    size="sm"
                  />
                </div>
                <Button variant="ghost" size="sm">Envoyer</Button>
              </div>
            </SectionCard>
          </div>

          {/* Sidebar — col span 1 */}
          <div className="md:col-span-1 flex flex-col gap-stack">
            {/* Participants */}
            <SectionCard
              title="Participants"
              titleIcon={<Users size={18} />}
            >
              <StatCard
                value={11}
                label="Connectés"
                size="sm"
                tone="warm"
                surface="tinted"
              />
              <div className="flex flex-wrap gap-stack-xs mt-stack">
                {PARTICIPANTS.map((p) => (
                  <Avatar key={p.name} name={p.name} initials={p.initials} size="sm" />
                ))}
                <span className="text-caption text-ink-400 self-center">+7 autres</span>
              </div>
            </SectionCard>

            {/* Ressources coach */}
            <SectionCard
              title="Ressources partagées"
              titleIcon={<FileText size={18} />}
            >
              <div className="flex flex-col gap-stack-xs">
                {RESOURCES.map((res) => (
                  <Card key={res.id} variant="default" className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-stack-xs">
                      <FileText size={14} className="text-ink-400 shrink-0" />
                      <span className="text-caption text-ink-700">{res.label}</span>
                      <Badge variant="neutral" size="sm">{res.type.toUpperCase()}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconOnly
                      leadingIcon={res.type === 'pdf' ? <Download size={14} /> : <ExternalLink size={14} />}
                    >
                      {res.type === 'pdf' ? 'Télécharger' : 'Ouvrir'}
                    </Button>
                  </Card>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </Container>
    </div>
  );
}
