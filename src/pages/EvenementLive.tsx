import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Video,
  MessageSquare,
  ClipboardList,
  FileText,
  ExternalLink,
  Download,
} from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Container } from '../components/layout';

// ─── Mock data ───────────────────────────────────────────────────────────────

const EVENT = {
  title: 'Conférence TLS 2026',
  participants: 342,
};

const PROGRAMME_ITEMS = [
  { time: '14h00', title: 'Keynote ouverture', status: 'done' },
  { time: '14h45', title: 'Panel "IA & Learning"', status: 'live' },
  { time: '15h30', title: 'Workshop au choix', status: 'upcoming' },
  { time: '16h30', title: 'Networking & clôture', status: 'upcoming' },
];

const QUESTIONS = [
  { id: '1', author: 'Marie L.', text: "Comment intégrer l'IA dans un programme de formation existant sans tout refaire ?", votes: 24 },
  { id: '2', author: 'Thomas B.', text: "Quels outils recommandez-vous pour mesurer l'impact d'un programme L&D ?", votes: 18 },
  { id: '3', author: 'Amina K.', text: "Y a-t-il des études de cas sur l'adoption de l'IA dans les grandes entreprises françaises ?", votes: 12 },
  { id: '4', author: 'Lucas M.', text: 'Comment gérer la résistance au changement lors de la mise en place de nouvelles formations ?', votes: 7 },
];

const RESOURCES = [
  { type: 'download', title: 'Support keynote ouverture.pdf', size: '2.4 MB' },
  { type: 'download', title: 'Guide IA & Learning 2026.pdf', size: '1.1 MB' },
  { type: 'link', title: 'Ressources supplémentaires (Notion)', url: '#' },
];

const PROGRAMME_BADGE: Record<string, React.ReactNode> = {
  done:     <Badge variant="neutral">Terminé</Badge>,
  live:     <Badge variant="danger" className="animate-pulse">En cours 🔴</Badge>,
  upcoming: <Badge variant="info">À venir</Badge>,
};

export default function EvenementLive() {
  useParams<{ id: string }>();
  const [question, setQuestion] = useState('');

  return (
    <div className="flex flex-col gap-section px-stack py-stack-lg">
      <EditorialHero
        tone="sun"
        eyebrow={{ label: 'Événement · En direct' }}
        title={EVENT.title}
        summary={`En cours · ${EVENT.participants} participants connectés`}
        trailing={
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="danger" className="animate-pulse">🔴 EN DIRECT</Badge>
            <Badge variant="neutral">{EVENT.participants} participants</Badge>
          </div>
        }
      />

      <Container width="wide" padding={false} className="grid md:grid-cols-3 gap-section">
        {/* Player : col span 2 */}
        <div className="md:col-span-2 flex flex-col gap-section">
          <Card className="aspect-video flex items-center justify-center bg-ink-900 rounded-2xl overflow-hidden">
            <div className="flex flex-col items-center gap-stack">
              <Video size={48} className="text-white/40" />
              <p className="text-caption text-white/50 m-0">Diffusion live</p>
              <Button
                variant="glass"
                size="lg"
                leadingIcon={<ExternalLink size={16} />}
              >
                Rejoindre le live
              </Button>
            </div>
          </Card>

          {/* Questions publiques */}
          <SectionCard
            title="Questions au panel"
            titleIcon={<MessageSquare size={18} />}
          >
            {QUESTIONS.map((q) => (
              <div key={q.id} className="flex items-start gap-3 py-stack-xs border-b border-ink-100 last:border-0">
                <Avatar name={q.author} size="sm" />
                <div className="flex flex-col gap-tight flex-1 min-w-0">
                  <p className="text-caption font-semibold text-ink-900 m-0">{q.author}</p>
                  <p className="text-caption text-ink-600 m-0">{q.text}</p>
                </div>
                <Badge variant="sun">↑ {q.votes}</Badge>
              </div>
            ))}

            <div className="flex gap-stack-xs pt-2">
              <Input
                placeholder="Poser une question au panel..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1"
              />
              <Button variant="primary" size="sm">
                Envoyer
              </Button>
            </div>
          </SectionCard>
        </div>

        {/* Sidebar : col span 1 */}
        <div className="md:col-span-1 flex flex-col gap-stack">
          {/* Programme */}
          <SectionCard
            title="Programme"
            titleIcon={<ClipboardList size={18} />}
          >
            {PROGRAMME_ITEMS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-stack-xs py-1.5 border-b border-ink-100 last:border-0">
                <span className="text-caption font-mono font-bold text-ink-500 shrink-0 w-10">
                  {item.time}
                </span>
                <span className="text-caption text-ink-700 flex-1 min-w-0">{item.title}</span>
                <span className="shrink-0">{PROGRAMME_BADGE[item.status]}</span>
              </div>
            ))}
          </SectionCard>

          {/* Ressources */}
          <SectionCard
            title="Ressources"
            titleIcon={<FileText size={18} />}
          >
            {RESOURCES.map((res, idx) => (
              <div key={idx} className="flex items-center gap-stack-xs py-1.5 border-b border-ink-100 last:border-0">
                {res.type === 'download' ? (
                  <Download size={14} className="text-primary-500 shrink-0" />
                ) : (
                  <ExternalLink size={14} className="text-primary-500 shrink-0" />
                )}
                <span className="text-caption text-ink-700 flex-1 min-w-0 truncate">{res.title}</span>
                {res.type === 'download' && res.size && (
                  <span className="text-micro text-ink-400 shrink-0">{res.size}</span>
                )}
              </div>
            ))}
          </SectionCard>

          {/* Participants live */}
          <Card variant="tinted" tone="sun" className="p-stack text-center">
            <p className="text-h2 font-bold text-accent-600 font-display m-0">
              {EVENT.participants}
            </p>
            <p className="text-caption text-ink-500 m-0">participants en direct</p>
          </Card>
        </div>
      </Container>
    </div>
  );
}
