import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Video, FileText, MessageSquare, Download, ChevronRight, Clock, MapPin } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { SessionCard } from '../components/learning/SessionCard';

// ─── Mock data ────────────────────────────────────────────────────────────────

const SESSION = {
  id: '1',
  title: 'Session coaching — Leadership & Management',
  coach: { name: 'Isabelle Martin', initials: 'IM', specialite: 'Leadership · Communication' },
  date: 'Lundi 19 mai 2026',
  time: '14h00 – 15h00',
  status: 'planned' as const,
  meetLink: 'https://meet.google.com/abc-defg-hij',
  format: 'Visioconférence',
  competence: 'Leadership',
  questionnaireDone: false,
  reportAvailable: false,
  objectives: [
    'Faire le point sur la progression D3 → D4',
    'Analyser les résultats de l\'exercice de délégation',
    'Définir les priorités pour les 2 prochaines semaines',
  ],
  preparation: 'Relire le rapport de la session précédente et préparer 2 situations de management récentes à analyser.',
  previousSessions: [
    { id: '0', title: 'Session 1 — Bilan initial', date: '12 mai 2026', status: 'completed' as const },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachingSessionDetail() {
  const { id } = useParams<{ id: string }>();
  const _ = id;
  const [noteExpanded, setNoteExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={`Coaching · Session #${SESSION.id}`}
        title={SESSION.title}
        subtitle={`${SESSION.date} · ${SESSION.time} · ${SESSION.format}`}
        tone="warm"
        actions={
          <div className="flex items-center gap-3">
            {SESSION.meetLink && SESSION.status === 'planned' && (
              <Button variant="glass" size="md" leadingIcon={<Video size={16} />}>
                Rejoindre la session
              </Button>
            )}
            <Button variant="glass-light-ghost" size="md" leadingIcon={<Download size={16} />}>
              Ajouter au calendrier
            </Button>
          </div>
        }
      />

      <div className="max-w-page mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* Info cards row */}
        <div className="grid md:grid-cols-3 gap-stack">
          {/* Coach */}
          <Card variant="default" className="flex items-center gap-stack p-5">
            <Avatar name={SESSION.coach.name} initials={SESSION.coach.initials} size="lg" />
            <div className="flex flex-col gap-tight">
              <span className="text-caption text-ink-400 uppercase tracking-wide">Coach</span>
              <span className="text-body-sm font-semibold text-ink-900">{SESSION.coach.name}</span>
              <span className="text-caption text-ink-500">{SESSION.coach.specialite}</span>
            </div>
          </Card>

          {/* Date & Time */}
          <Card variant="default" className="flex items-center gap-stack p-5">
            <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center shrink-0">
              <Calendar size={20} className="text-secondary-500" />
            </div>
            <div className="flex flex-col gap-tight">
              <span className="text-caption text-ink-400 uppercase tracking-wide">Date & heure</span>
              <span className="text-body-sm font-semibold text-ink-900">{SESSION.date}</span>
              <span className="text-caption text-ink-500">{SESSION.time}</span>
            </div>
          </Card>

          {/* Format */}
          <Card variant="default" className="flex items-center gap-stack p-5">
            <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center shrink-0">
              <Video size={20} className="text-secondary-500" />
            </div>
            <div className="flex flex-col gap-tight">
              <span className="text-caption text-ink-400 uppercase tracking-wide">Format</span>
              <span className="text-body-sm font-semibold text-ink-900">{SESSION.format}</span>
              <Badge variant="info" size="sm">
                {SESSION.status === 'planned' ? 'Confirmée' : 'Terminée'}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Objectives */}
        <SectionCard
          title="Objectifs de la session"
          icon={<FileText size={18} />}
        >
          <ul className="flex flex-col gap-2">
            {SESSION.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-stack">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary-50 text-secondary-600 text-caption font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-body-sm text-ink-700">{obj}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Preparation */}
        <SectionCard
          title="Préparation recommandée"
          icon={<ChevronRight size={18} />}
          actions={
            <Badge variant="warning" size="sm">À faire avant la session</Badge>
          }
        >
          <p className="text-body-sm text-ink-600 leading-relaxed">{SESSION.preparation}</p>
          <div className="mt-stack flex gap-3">
            <Button
              variant="warm"
              size="md"
              leadingIcon={<FileText size={16} />}
            >
              Compléter le questionnaire
            </Button>
          </div>
        </SectionCard>

        {/* Previous sessions */}
        {SESSION.previousSessions.length > 0 && (
          <SectionCard title="Sessions précédentes" icon={<Clock size={18} />}>
            <div className="flex flex-col gap-2">
              {SESSION.previousSessions.map((prev) => (
                <SessionCard
                  key={prev.id}
                  title={prev.title}
                  coachName={SESSION.coach.name}
                  dateLabel={prev.date}
                  status={prev.status}
                  surface="card"
                  report={true}
                  onViewReport={() => {}}
                />
              ))}
            </div>
          </SectionCard>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pb-section">
          <Button variant="ghost" size="md" leadingIcon={<MessageSquare size={16} />}>
            Contacter le coach
          </Button>
          <Button variant="ghost" size="md" className="text-danger-fg hover:bg-danger-bg">
            Annuler la session
          </Button>
        </div>

      </div>
    </div>
  );
}
