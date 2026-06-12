import React from 'react';
import { useParams } from 'react-router-dom';
import { Video, MessageSquare, FileText, ExternalLink, Clock, Users } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Container } from '../components/layout';

// ─── Mock data ──────────────────────────────────────────────────────────────

const QA_QUESTIONS = [
  { id: 1, author: 'Julie M.', initials: 'JM', text: 'Comment gérer un manager qui résiste au changement en période de crise ?' },
  { id: 2, author: 'Thomas R.', initials: 'TR', text: 'Quelle est la fréquence idéale pour les points d\'équipe en situation tendue ?' },
];

const RESOURCES = [
  { id: 1, label: 'Slides : Leadership en crise', type: 'PDF' },
  { id: 2, label: 'Bibliographie recommandée', type: 'PDF' },
];

// ─── MasterclassLive ─────────────────────────────────────────────────────────

export default function MasterclassLive() {
  useParams<{ id: string }>();

  return (
    <div className="flex flex-col">
      <EditorialHero
        tone="brand"
        eyebrow="Masterclass · En direct"
        title="Leadership en temps de crise"
        summary="Session en cours avec Marie Fontaine · DRH · Groupe Vinci"
        trailing={
          <div className="flex items-center gap-stack-xs flex-wrap">
            <Badge variant="danger" size="md" className="animate-pulse">🔴 EN DIRECT</Badge>
            <span className="text-caption text-white/70 flex items-center gap-tight">
              <Users size={13} />
              127 participants
            </span>
          </div>
        }
      />

      <Container width="wide" padding={false} className="px-stack py-section">
        <div className="grid md:grid-cols-3 gap-section">
          {/* Player embed : col span 2 */}
          <div className="md:col-span-2">
            <Card variant="default" className="aspect-video flex items-center justify-center bg-ink-900 rounded-2xl overflow-hidden">
              <div className="flex flex-col items-center gap-stack text-white">
                <Video size={48} className="text-white/40" />
                <p className="text-body text-white/60">Session live · Google Meet</p>
                <Button
                  variant="glass"
                  size="lg"
                  leadingIcon={<ExternalLink size={16} />}
                >
                  Rejoindre sur Google Meet
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar droite */}
          <div className="md:col-span-1 flex flex-col gap-stack">
            {/* Timer card */}
            <Card variant="tinted" tone="primary" className="text-center p-stack">
              <p className="text-micro text-ink-400 uppercase tracking-wider mb-tight">Temps écoulé</p>
              <p className="text-h2 font-display font-bold text-primary-700">47:23</p>
              <div className="flex items-center justify-center gap-stack-xs mt-tight text-caption text-ink-500">
                <Clock size={13} />
                <span>90 min de session</span>
              </div>
            </Card>

            {/* Q&A section */}
            <SectionCard title="Questions & Réponses" titleIcon={<MessageSquare size={18} />}>
              <div className="flex flex-col gap-stack-xs">
                {QA_QUESTIONS.map((q) => (
                  <div key={q.id} className="flex items-start gap-stack-xs p-3 rounded-xl bg-ink-50">
                    <Avatar name={q.author} initials={q.initials} size="sm" />
                    <div className="flex flex-col gap-tight min-w-0">
                      <span className="text-caption font-semibold text-ink-700">{q.author}</span>
                      <p className="text-caption text-ink-600 leading-relaxed">{q.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-stack-xs mt-tight">
                <Input
                  placeholder="Poser une question..."
                  className="flex-1"
                />
                <Button variant="ghost" size="sm">Envoyer</Button>
              </div>
            </SectionCard>

            {/* Resources */}
            <SectionCard title="Ressources" titleIcon={<FileText size={18} />}>
              <div className="flex flex-col gap-stack-xs">
                {RESOURCES.map((r) => (
                  <div key={r.id} className="flex items-center justify-between gap-stack-xs p-3 rounded-xl bg-ink-50">
                    <div className="flex items-center gap-stack-xs min-w-0">
                      <FileText size={14} className="text-ink-400 shrink-0" />
                      <span className="text-caption text-ink-700 truncate">{r.label}</span>
                    </div>
                    <Button variant="ghost" size="sm">Télécharger</Button>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </Container>
    </div>
  );
}
