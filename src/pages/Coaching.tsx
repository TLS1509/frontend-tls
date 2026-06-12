/**
 * Coaching Page: Phase 10 refactor v2
 *
 * Décision UX (user feedback) : suppression de la section ProfileCard coach.
 * Le coach card n'apporte pas de valeur tant qu'on n'a pas de session active.
 * Focus prioritaire de la page :
 *   1. Hero
 *   2. Action principale : Book session OU Next session (full width)
 *   3. Ressources : prep / compte-rendu / journal (3 tiles)
 *   4. Sessions passées (history)
 *
 *  - Layout single column, full width pour l'action zone (plus de 2-col sticky coach)
 *  - Coach info : compact inline DANS la next session card (avatar + name + role)
 *  - Outils : IconFeatureCard square dans grid-cols-2/3 max-w-[640px] (exactement 3 items)
 *  - Semantic spacing tokens (gap-section, gap-stack)
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoachingStore, useUserProfileStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { BookingModal, CancelSessionModal, SessionFeedbackModal, SuccessModal } from '../components/modals';
import type { UserPlan } from '../components/modals/BookingModal';
import { Card } from '../components/core/Card';
import { Avatar } from '../components/ui/Avatar';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { MetaPill } from '../components/ui/MetaPill';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { IconFeatureCard } from '../components/ui/IconFeatureCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/core/Button';
import { SessionCard } from '../components/learning';
import { PageShell } from '../components/layout';
import {
  CalendarClock,
  Video,
  Calendar,
  Clock3,
  ClipboardList,
  FileText,
  PenLine,
  CalendarPlus,
  Sparkles,
  MessageCircle,
  UserPlus,
  UserX,
  Download,
} from 'lucide-react';
import { MOCK_COACH } from '../data/coaching';

interface CoachingSession {
  id: string;
  title: string;
  coachName: string;
  description: string;
  dateLabel: string;
  status: 'planned' | 'completed';
  questionnaire: boolean;
  report: boolean;
  journal: boolean;
}

const coach = MOCK_COACH;

interface UpcomingSession {
  title: string;
  dateLabel: string;
  hourLabel: string;
}

const INITIAL_UPCOMING: UpcomingSession = {
  title: 'Session de coaching IA',
  dateLabel: 'Mardi 30 avril 2026',
  hourLabel: '14:00 - 15:00',
};


export const Coaching: React.FC = () => {
  const navigate = useNavigate();
  const coachingStore = useCoachingStore();
  const profileStore = useUserProfileStore();
  const [coachAssigned, setCoachAssigned] = useState(true);
  const [userPlan, setUserPlan] = useState<UserPlan>('free');
  const [showBooking, setShowBooking]     = useState(false);
  const [showCancel, setShowCancel]       = useState(false);
  const [showFeedback, setShowFeedback]   = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [showCancelSuccess, setShowCancelSuccess]   = useState(false);

  const storeSessions = coachingStore.getSessions(MOCK_USER_ID);
  const credits = profileStore.get().credits;

  // Compute upcoming from store (booked/confirmed/in-progress)
  const nextStoredSession = useMemo(() => {
    const active = storeSessions.find((s) =>
      s.status === 'booked' || s.status === 'confirmed' || s.status === 'in-progress'
    );
    if (!active) return null;
    const d = new Date(active.scheduledAt);
    return {
      title: active.theme ?? `Session coaching: ${active.coachName}`,
      dateLabel: d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      hourLabel: `${d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}: ${new Date(d.getTime() + active.durationMinutes * 60_000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
    };
  }, [storeSessions]);

  const [upcoming, setUpcoming] = useState<UpcomingSession | null>(
    nextStoredSession ?? INITIAL_UPCOMING
  );

  const hasUpcoming = upcoming !== null;

  // Past/completed sessions from store mapped to display format
  const sessions: CoachingSession[] = useMemo(() =>
    storeSessions
      .filter((s) => s.status === 'completed')
      .map((s) => ({
        id: s.id,
        title: s.theme ?? `Session coaching: ${s.coachName}`,
        coachName: s.coachName,
        description: s.coachSpeciality ?? '',
        dateLabel: new Date(s.scheduledAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'completed' as const,
        questionnaire: s.preQuestionnaireCompleted,
        report: true,
        journal: false,
      })),
  [storeSessions]);

  /* Tiles outils: section content (plus dans le hero trailing).
     Surface tinted tone-aware (brand/warm/sun) sur fond clair, icône md (32px). */
  const outilsTiles = (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-stack max-w-[640px]">
      <IconFeatureCard
        surface="tinted"
        tone="brand"
        iconStyle="plain"
        iconSize="md"
        icon={<ClipboardList size={32} strokeWidth={1.75} />}
        title="Préparer"
        onClick={() => navigate('/coaching/pre-questionnaire')}
      />
      <IconFeatureCard
        surface="tinted"
        tone="warm"
        iconStyle="plain"
        iconSize="md"
        icon={<FileText size={32} strokeWidth={1.75} />}
        title="Compte-rendu"
        onClick={() => navigate('/coaching/compte-rendu/coaching-1')}
      />
      <IconFeatureCard
        surface="tinted"
        tone="sun"
        iconStyle="plain"
        iconSize="md"
        icon={<PenLine size={32} strokeWidth={1.75} />}
        title="Réflexions"
        onClick={() => navigate('/journal?type=coaching')}
      />
    </div>
  );

  /* Génère un fichier .ics (invite calendrier standard) et déclenche le download.
     Stub minimal: en prod, parser dateLabel/hourLabel proprement et inclure timezone. */
  const handleDownloadCalendarInvite = () => {
    if (!upcoming) return;
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The Learning Society//Coaching//FR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:coaching-${Date.now()}@thelearningsociety.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      // TODO Phase ultérieure : parser real dates depuis upcoming.dateLabel / hourLabel
      'DTSTART:20260430T120000Z',
      'DTEND:20260430T130000Z',
      `SUMMARY:${upcoming.title}`,
      `DESCRIPTION:Session de coaching avec ${coach.name} (${coach.role}). Lien visio fourni par email.`,
      'LOCATION:Visioconférence',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coaching-${upcoming.dateLabel.replace(/\s+/g, '-').toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="relative min-h-[100dvh] bg-gradient-page-ambient">
        <AmbientBlobs />
        <PageShell width="page" noPadTop className="relative z-base">

          {/* Hero: EditorialHero tone="brand" standalone (tiles outils sortis du hero). */}
          <EditorialHero
            tone="brand"
            eyebrow={{ icon: <CalendarClock size={12} />, label: 'Mon accompagnement' }}
            title="Coaching 1:1"
            summary="Accompagnement individuel pour accélérer la mise en pratique sur vos cas réels."
          />

          {/* DEV CONTROLS: masqué en production */}
          {import.meta.env.DEV && <div className="flex flex-wrap items-center gap-stack-xs p-3 rounded-xl bg-accent-50 border border-accent-200 text-caption">
            <span className="inline-flex items-center gap-tight font-bold text-accent-900">
              <Sparkles size={14} /> DEV
            </span>
            <span className="text-ink-700">Coach :</span>
            <Button
              size="sm"
              variant={coachAssigned ? 'secondary' : 'primary'}
              leadingIcon={coachAssigned ? <UserX size={14} /> : <UserPlus size={14} />}
              onClick={() => setCoachAssigned(!coachAssigned)}
            >
              {coachAssigned ? 'Pas de coach assigné' : 'Coach assigné'}
            </Button>
            <span className="text-ink-500 mx-1">·</span>
            <span className="text-ink-700">Session :</span>
            <Button
              size="sm"
              variant={hasUpcoming ? 'secondary' : 'primary'}
              onClick={() => setUpcoming(hasUpcoming ? null : INITIAL_UPCOMING)}
              disabled={!coachAssigned}
            >
              {hasUpcoming ? 'Retirer la session' : 'Restaurer la session'}
            </Button>
            <span className="text-ink-500 mx-1">·</span>
            <span className="text-ink-700">Plan :</span>
            {(['free', 'pro', 'enterprise'] as UserPlan[]).map((plan) => (
              <Button
                key={plan}
                size="sm"
                variant={userPlan === plan ? 'primary' : 'ghost'}
                onClick={() => setUserPlan(plan)}
              >
                {plan}
              </Button>
            ))}
            <span className="text-ink-500 mx-1">·</span>
            <span className="text-ink-700">Modales :</span>
            <Button size="sm" variant="ghost" onClick={() => setShowBooking(true)}>Booking</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowCancel(true)} disabled={!hasUpcoming}>Cancel</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowFeedback(true)}>Feedback</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowBookingSuccess(true)}>Success Booking</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowCancelSuccess(true)}>Success Cancel</Button>
          </div>}

          {/* (Section coach strip supprimée: intégré DANS la session card upcoming pour
              le state coach + session. Pas de section dédiée quand pas de coach assigné
              ni quand pas de session : l'empty state action zone suffit.) */}

          {/* PRIMARY ACTION ZONE: 3 cases :
              - pas coach           → empty state "Demander un coach"
              - coach + pas session → empty state "Réserver une session"
              - coach + session     → upcoming session card */}
          {!coachAssigned ? (
            <Card variant="tinted" tone="primary" className="!p-0 !rounded-2xl !gap-0">
              <div className="p-section lg:p-section-lg flex flex-col items-center text-center gap-stack-lg">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-pill bg-white/70 backdrop-blur-glass-light text-primary-500 shadow-sm">
                  <CalendarPlus size={28} strokeWidth={1.75} />
                </span>
                <div className="flex flex-col gap-tight max-w-[520px]">
                  <h2 className="m-0 font-display text-h2 font-bold text-ink-900 leading-tight">
                    Démarrez votre accompagnement
                  </h2>
                  <p className="m-0 font-body text-body text-ink-600 leading-relaxed mt-stack-xs">
                    Réservez votre première session 1:1. Un coach vous sera attribué selon vos objectifs.
                  </p>
                </div>
                <Button
                  leadingIcon={<Calendar size={16} />}
                  onClick={() => setShowBooking(true)}
                  size="lg"
                >
                  Réserver une session
                </Button>
              </div>
            </Card>
          ) : hasUpcoming ? (
            <Card
              variant="tinted"
              tone="primary"
              className="!p-0 !rounded-2xl !gap-0"
            >
              <div className="p-stack-lg lg:p-section flex flex-col gap-stack-lg">
                <div className="flex flex-wrap items-start justify-between gap-stack-xs">
                  <div className="flex flex-col gap-tight min-w-0">
                    <p className="m-0 font-body text-caption font-medium text-primary-700">
                      Prochaine session
                    </p>
                    <h2 className="m-0 font-display text-h3 font-bold text-ink-900 leading-tight">
                      {upcoming!.title}
                    </h2>
                  </div>
                  <Badge variant="success">Confirmée</Badge>
                </div>

                <MetaPillGroup
                  items={[
                    { icon: <Calendar size={14} />, text: upcoming!.dateLabel },
                    { icon: <Clock3 size={14} />, text: upcoming!.hourLabel },
                    { icon: <Video size={14} />, text: 'Lien visio actif', tone: 'primary' },
                  ]}
                  layout="horizontal"
                  gap="sm"
                />

                {/* Coach row : avatar + name + role + Message button: intégré ici
                    (au lieu d'une section strip dédiée) car c'est dans le contexte de la
                    session que contacter son coach a du sens. */}
                <div className="flex flex-wrap items-center gap-stack-xs p-3 rounded-xl bg-white/60 backdrop-blur-glass-light border border-white/60">
                  <Avatar initials="SM" size="sm" tint="brand" />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-display text-body-sm font-bold text-ink-900 leading-tight truncate">
                      {coach.name}
                    </span>
                    <span className="font-body text-caption text-ink-600 leading-tight truncate">
                      {coach.role}
                    </span>
                  </div>
                  <Button
                    variant="glass-warm"
                    size="md"
                    leadingIcon={<MessageCircle size={14} />}
                    onClick={() => navigate('/messages')}
                    aria-label={`Envoyer un message à ${coach.name}`}
                  >
                    Message
                  </Button>
                </div>

                <div className="flex flex-wrap gap-stack-xs">
                  <Button size="lg" leadingIcon={<Video size={15} />} aria-label="Rejoindre la session de coaching">
                    Rejoindre la session
                  </Button>
                  <Button
                    size="lg"
                    variant="glass-warm"
                    leadingIcon={<Download size={15} />}
                    onClick={handleDownloadCalendarInvite}
                    aria-label="Télécharger l'invitation calendrier (.ics)"
                  >
                    Ajouter au calendrier
                  </Button>
                  <Button variant="ghost" onClick={() => setShowCancel(true)}>
                    Reprogrammer
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            // Empty state: no session scheduled, prompt to book
            <Card
              variant="tinted"
              tone="primary"
              className="!p-0 !rounded-2xl !gap-0"
            >
              <div className="p-section lg:p-section-lg flex flex-col items-center text-center gap-stack-lg">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-pill bg-white/70 backdrop-blur-glass-light text-primary-500 shadow-sm">
                  <CalendarPlus size={28} strokeWidth={1.75} />
                </span>
                <div className="flex flex-col gap-tight max-w-[520px]">
                  <p className="m-0 font-body text-caption font-medium text-primary-700">
                    Aucune session programmée
                  </p>
                  <h2 className="m-0 font-display text-h2 font-bold text-ink-900 leading-tight">
                    Prêt(e) pour une nouvelle session ?
                  </h2>
                  <p className="m-0 font-body text-body text-ink-600 leading-relaxed mt-stack-xs">
                    Réservez un créneau 1:1 de 60 minutes pour avancer sur vos cas réels.
                  </p>
                </div>
                <div className="flex flex-wrap gap-stack-xs justify-center items-center">
                  <Button
                    leadingIcon={<Calendar size={16} />}
                    onClick={() => setShowBooking(true)}
                    size="lg"
                  >
                    Réserver une session
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    leadingIcon={<MessageCircle size={16} />}
                    onClick={() => navigate('/messages')}
                    aria-label={`Envoyer un message à ${coach.name}`}
                  >
                    Échanger avec {coach.name.split(' ')[0]}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* OUTILS: Préparer / Compte-rendu / Réflexions
              IconFeatureCard tinted tone-aware (brand/warm/sun) en contenu page. */}
          <section aria-label="Outils de coaching" className="flex flex-col gap-stack">
            <SectionHeader
              variant="default"
              size="md"
              tone="primary"
              icon={<ClipboardList size={20} />}
              title="Mes outils"
              subtitle="Accédez à vos préparations, comptes-rendus et réflexions"
            />
            {outilsTiles}
          </section>

          {/* Past sessions */}
          <section aria-label="Sessions passées" className="flex flex-col gap-stack-lg">
            <SectionHeader
              variant="default"
              size="md"
              tone="primary"
              title="Sessions passées"
              subtitle="Historique complet de vos sessions de coaching"
              action={
                <MetaPill
                  text={`${sessions.length} session${sessions.length > 1 ? 's' : ''}`}
                  tone="primary"
                />
              }
            />

            <div className="flex flex-col gap-stack">
              {sessions.map((session) => (
                <SessionCard
                  key={session.id}
                  /* Past sessions all in tinted warm (secondary-50/70): consistant theme orange clair. */
                  surface="tinted"
                  tone="warm"
                  title={session.title}
                  coachName={session.coachName}
                  description={session.description}
                  dateLabel={session.dateLabel}
                  status={session.status}
                  questionnaire={session.questionnaire}
                  report={session.report}
                  journal={session.journal}
                  onViewQuestionnaire={session.questionnaire ? () => navigate('/coaching/pre-questionnaire') : undefined}
                  onViewReport={session.report ? () => navigate(`/coaching/compte-rendu/${session.id}`) : undefined}
                  onOpen={() => {}}
                />
              ))}
            </div>
          </section>
        </PageShell>
      </div>

      {/* BookingModal: réservation d'une session. onBookingConfirmed crée la session + ouvre SuccessModal */}
      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        onBookingConfirmed={({ date, time }) => {
          console.log('📅 Session réservée:', date, time);
          setUpcoming({
            title: 'Session de coaching IA',
            dateLabel: date,
            hourLabel: time,
          });
          setShowBooking(false);
          setShowBookingSuccess(true);
        }}
        coachName={coach.name}
        coachInitials="SM"
        userPlan={userPlan}
        sessionPrice={75}
        /* Defaults appliqués dans le component si non passé :
           - free : 0/0 crédits → paiement
           - pro : 3/5 crédits → inclus
           - enterprise : 12/20 → sponsorisé */
        companyName="The Learning Society"
      />

      {/* CancelSessionModal: annulation : flip vers empty state + SuccessModal */}
      <CancelSessionModal
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
        onCancel={(reason) => {
          console.log('❌ Session annulée: motif:', reason);
          setUpcoming(null);
          setShowCancel(false);
          setShowCancelSuccess(true);
        }}
        onReschedule={() => {
          setShowCancel(false);
          setShowBooking(true);
        }}
        sessionTitle={upcoming?.title ?? ''}
        sessionDate={upcoming ? `${upcoming.dateLabel}: ${upcoming.hourLabel}` : ''}
      />

      {/* SessionFeedbackModal: feedback post-session */}
      <SessionFeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        onSubmit={(rating, comment) => {
          console.log('⭐ Avis:', rating, comment);
          setShowFeedback(false);
        }}
        title="Votre avis sur la session"
        subtitle="Comment évaluez-vous cette session de coaching ?"
      />

      {/* SuccessModal: confirmation booking */}
      <SuccessModal
        isOpen={showBookingSuccess}
        onClose={() => setShowBookingSuccess(false)}
        title="Session réservée !"
        message={
          upcoming
            ? `Votre session est confirmée le ${upcoming.dateLabel} à ${upcoming.hourLabel}. Un lien visio vous sera envoyé par email.`
            : 'Votre session a été réservée avec succès.'
        }
      />

      {/* SuccessModal: confirmation annulation */}
      <SuccessModal
        isOpen={showCancelSuccess}
        onClose={() => setShowCancelSuccess(false)}
        title="Session annulée"
        message="Votre session a bien été annulée. Vous pouvez réserver un nouveau créneau quand vous le souhaitez."
      />
    </>
  );
};

export default Coaching;
