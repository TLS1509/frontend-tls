import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Video, FileText, MessageSquare, Download, ChevronRight, Clock } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { SessionCard } from '../components/learning/SessionCard';
import { Container } from '../components/layout';
import { useCoachingStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';

// ─── Constants ───────────────────────────────────────────────────────────────

const DEFAULT_OBJECTIVES = [
  'Faire le point sur les actions définies lors de la session précédente',
  'Analyser une situation managériale récente et identifier les leviers de progrès',
  'Définir 2-3 actions concrètes pour les prochaines semaines',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatScheduledAt(iso: string) {
  const d = new Date(iso);
  const day = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const time = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const endMs = d.getTime() + 60 * 60000;
  const endTime = new Date(endMs).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  return { day: day.charAt(0).toUpperCase() + day.slice(1), time: `${time} – ${endTime}` };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachingSessionDetail() {
  const { id } = useParams<{ id: string }>();
  const coachingStore = useCoachingStore();
  const sessions = coachingStore.getSessions(MOCK_USER_ID);
  const session = sessions.find((s) => s.id === id) ?? sessions[0];

  if (!session) return null;

  const { day, time } = formatScheduledAt(session.scheduledAt);
  const isPlanned = session.status === 'confirmed' || session.status === 'pending';
  const coachInitials = session.coachName.split(' ').map((w) => w[0]).join('');
  const previousSessions = sessions.filter((s) => s.id !== session.id && s.status === 'completed');

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={`Coaching · Session #${session.id}`}
        title={`Session coaching : ${session.theme ?? 'Développement managérial'}`}
        summary={`${day} · ${time} · Visioconférence`}
        tone="flat"
        trailing={
          <div className="flex items-center gap-stack-xs">
            {isPlanned && (
              <Button variant="glass" size="md" leadingIcon={<Video size={16} />}>
                Rejoindre la session
              </Button>
            )}
            <Button variant="ghost" size="md" leadingIcon={<Download size={16} />}>
              Ajouter au calendrier
            </Button>
          </div>
        }
      />

      <Container width="page" padding={false} className="px-stack md:px-section flex flex-col gap-section">

        {/* Info cards row */}
        <div className="grid md:grid-cols-3 gap-stack">
          {/* Coach */}
          <Card variant="default" className="flex items-center gap-stack p-5">
            <Avatar name={session.coachName} initials={coachInitials} size="lg" />
            <div className="flex flex-col gap-tight">
              <span className="text-caption text-ink-400 uppercase tracking-wide">Coach</span>
              <span className="text-body-sm font-semibold text-ink-900">{session.coachName}</span>
              <span className="text-caption text-ink-500">{session.coachSpeciality ?? 'Leadership · Communication'}</span>
            </div>
          </Card>

          {/* Date & Time */}
          <Card variant="default" className="flex items-center gap-stack p-5">
            <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center shrink-0">
              <Calendar size={20} className="text-secondary-500" />
            </div>
            <div className="flex flex-col gap-tight">
              <span className="text-caption text-ink-400 uppercase tracking-wide">Date & heure</span>
              <span className="text-body-sm font-semibold text-ink-900">{day}</span>
              <span className="text-caption text-ink-500">{time}</span>
            </div>
          </Card>

          {/* Format */}
          <Card variant="default" className="flex items-center gap-stack p-5">
            <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center shrink-0">
              <Video size={20} className="text-secondary-500" />
            </div>
            <div className="flex flex-col gap-tight">
              <span className="text-caption text-ink-400 uppercase tracking-wide">Format</span>
              <span className="text-body-sm font-semibold text-ink-900">Visioconférence</span>
              <Badge variant="info" size="sm">
                {isPlanned ? 'Confirmée' : 'Terminée'}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Objectives */}
        <SectionCard
          title="Objectifs de la session"
          titleIcon={<FileText size={18} />}
        >
          <ul className="flex flex-col gap-stack-xs">
            {DEFAULT_OBJECTIVES.map((obj, i) => (
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
          titleIcon={<ChevronRight size={18} />}
          actions={
            <Badge variant="sun" size="sm">À faire avant la session</Badge>
          }
        >
          <p className="text-body-sm text-ink-600 leading-relaxed">
            Avant la session, prends 10 minutes pour noter tes succès récents, les situations difficiles rencontrées, et les questions que tu souhaites aborder avec ton coach.
          </p>
          <div className="mt-stack flex gap-stack-xs">
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
        {previousSessions.length > 0 && (
          <SectionCard title="Sessions précédentes" titleIcon={<Clock size={18} />}>
            <div className="flex flex-col gap-stack-xs">
              {previousSessions.map((prev) => (
                <SessionCard
                  key={prev.id}
                  title={prev.theme ?? `Session coaching`}
                  description={`${prev.type} · ${prev.durationMinutes} min`}
                  coachName={session.coachName}
                  dateLabel={new Date(prev.scheduledAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  status={prev.status === 'completed' ? 'completed' : 'confirmed'}
                  surface="card"
                  report={true}
                  onViewReport={() => {}}
                />
              ))}
            </div>
          </SectionCard>
        )}

        {/* Actions */}
        <div className="flex items-center gap-stack-xs pb-section">
          <Button variant="ghost" size="md" leadingIcon={<MessageSquare size={16} />}>
            Contacter le coach
          </Button>
          <Button variant="ghost" size="md" className="text-danger-fg hover:bg-danger-bg">
            Annuler la session
          </Button>
        </div>

      </Container>
    </div>
  );
}
