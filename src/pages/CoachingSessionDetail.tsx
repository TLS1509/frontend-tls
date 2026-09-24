import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Video, FileText, MessageSquare, Download, Clock } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { SessionCard } from '../components/learning/SessionCard';
import { PageShell } from '../components/layout';
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

/** Le type de session, tel que l'apprenant le lit (« classic » était l'enum brute). */
const SESSION_TYPE_LABEL: Record<string, string> = {
  classic: 'Session Classic',
  special: 'Session spéciale',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachingSessionDetail() {
  const { id } = useParams<{ id: string }>();
  const coachingStore = useCoachingStore();
  const sessions = coachingStore.getSessions(MOCK_USER_ID);
  const session = sessions.find((s) => s.id === id) ?? sessions[0];

  if (!session) return null;

  const { day, time } = formatScheduledAt(session.scheduledAt);
  // Cycle (types/learning.ts) : booked -> confirmed -> in-progress -> completed.
  // « à venir » = réservé ou confirmé. Il n'existe pas de statut 'pending' :
  // l'attente de confirmation coach s'appelle 'booked'.
  const isPlanned = session.status === 'confirmed' || session.status === 'booked';
  const coachInitials = session.coachName.split(' ').map((w) => w[0]).join('');
  const previousSessions = sessions.filter((s) => s.id !== session.id && s.status === 'completed');

  return (
    /* 48 px entre l'en-tête et chaque section (le `gap-section` posé ici
       mettait 32). */
    <PageShell width="page" className="pt-6 md:pt-8 lg:pt-10 relative z-base" noPadTop>
      {/* Le titre est le thème de la session ; le surtitre dit le lieu, sans
          identifiant technique (« Session #session-1 »). Coach, date, heure,
          format et état sont des données : la ligne de méta de l'en-tête. Les
          trois tuiles « COACH / DATE & HEURE / FORMAT » (libellés en
          capitales) répétaient cette ligne mot pour mot : elles s'y fondent. */}
      <EditorialHero
        eyebrow="Coaching · Session"
        title={session.theme ?? 'Développement managérial'}
        meta={[
          { icon: <Avatar name={session.coachName} initials={coachInitials} size="xs" />, label: `Avec ${session.coachName}` },
          { icon: <Calendar size={14} aria-hidden="true" />, label: day },
          { icon: <Clock size={14} aria-hidden="true" />, label: time },
          { icon: <Video size={14} aria-hidden="true" />, label: 'Visioconférence' },
          { label: <Badge variant="info" size="compact">{isPlanned ? 'Confirmée' : 'Terminée'}</Badge> },
        ]}
        tone="flat"
        /* Arbitrage n°19 : « Rejoindre » est l'action principale d'une
           session à venir, le seul `solid` ; le calendrier est un outil
           (`ghost` neutre). Une session passée n'a pas d'action principale. */
        trailing={
          <div className="flex flex-wrap items-center gap-stack-xs">
            {isPlanned && (
              <Button emphasis="solid" tone="brand" size="md" leadingIcon={<Video size={16} />}>
                Rejoindre la session
              </Button>
            )}
            <Button emphasis="ghost" tone="neutral" size="md" leadingIcon={<Download size={16} />}>
              Ajouter au calendrier
            </Button>
          </div>
        }
      />

      {/* Objectifs : une liste à lire, pas un objet — plus de carte autour.
          Texte 16 ink-900 ; le numéro se cale sur la première ligne. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Objectifs de la session" size="md" />
        <ol className="flex flex-col gap-stack-sm max-w-prose">
          {DEFAULT_OBJECTIVES.map((obj, i) => (
            <li key={i} className="flex items-start gap-stack-sm">
              <span className="shrink-0 inline-flex items-center h-lh text-body">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-pill bg-secondary-50 text-secondary-800 text-caption font-bold tabular-nums">
                  {i + 1}
                </span>
              </span>
              <span className="text-body text-ink-900">{obj}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Préparation : l'état « À faire avant la session » monte à côté du
          titre (il était sous le bouton, après un filet). */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Préparation recommandée"
          size="md"
          action={<Badge variant="sun" size="compact">À faire avant la session</Badge>}
        />
        <Card className="flex flex-col items-start gap-stack-lg">
          <p className="text-body text-ink-700 max-w-prose">
            Avant la session, prends 10 minutes pour noter tes succès récents, les situations difficiles rencontrées, et les questions que tu souhaites aborder avec ton coach.
          </p>
          <Button
            emphasis="soft" tone="warm"
            size="md"
            leadingIcon={<FileText size={16} />}
          >
            Répondre au questionnaire
          </Button>
        </Card>
      </section>

      {/* Sessions précédentes : chaque session est déjà une carte — plus de
          carte de section autour (double filet, double padding). */}
      {previousSessions.length > 0 && (
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Sessions précédentes"
            meta={`${previousSessions.length} session${previousSessions.length > 1 ? 's' : ''} avec ${session.coachName}`}
            size="md"
          />
          <div className="flex flex-col gap-stack-sm">
            {previousSessions.map((prev) => (
              <SessionCard
                key={prev.id}
                title={prev.theme ?? `Session coaching`}
                description={`${SESSION_TYPE_LABEL[prev.type] ?? prev.type} · ${prev.durationMinutes} min`}
                coachName={session.coachName}
                dateLabel={new Date(prev.scheduledAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                status={/* SessionCard n'expose que 'planned' | 'completed' */ prev.status === 'completed' ? 'completed' : 'planned'}
                surface="card"
                report={true}
                onViewReport={() => {}}
              />
            ))}
          </div>
        </section>
      )}

      {/* Actions — plus de `pb-section` : PageShell porte l'air du bas.
          Contacter le coach, l'action seconde, en `soft` ; annuler la session,
          une action destructive posée dans la page, en `ghost` danger
          (arbitrage n°19) — elle était un `outline` recoloré à la main. */}
      <div className="flex flex-wrap items-center gap-stack-xs">
        <Button emphasis="soft" tone="brand" size="md" leadingIcon={<MessageSquare size={16} />}>
          Contacter le coach
        </Button>
        <Button emphasis="ghost" tone="danger" size="md">
          Annuler la session
        </Button>
      </div>
    </PageShell>
  );
}
