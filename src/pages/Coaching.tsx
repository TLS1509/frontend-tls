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

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoachingStore, useUserProfileStore } from '../stores/persistence';
import { useDevStore } from '../stores/devStore';
import { MOCK_USER_ID } from '../data/passeport';
import { BookingModal, CancelSessionModal, SessionFeedbackModal, SuccessModal } from '../components/modals';
import type { UserPlan } from '../components/modals/BookingModal';
import { Card } from '../components/core/Card';
import { Avatar } from '../components/ui/Avatar';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
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
  MessageCircle,
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
  hourLabel: '14:00 – 15:00',
};


export const Coaching: React.FC = () => {
  const navigate = useNavigate();
  const coachingStore = useCoachingStore();
  const profileStore = useUserProfileStore();
  const { coachAssigned, hasSession: devHasSession, userPlan: devUserPlan } = useDevStore();
  const userPlan = devUserPlan as UserPlan;
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
      title: active.theme ?? `Session avec ${active.coachName}`,
      dateLabel: d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      hourLabel: `${d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} – ${new Date(d.getTime() + active.durationMinutes * 60_000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
    };
  }, [storeSessions]);

  const [upcoming, setUpcoming] = useState<UpcomingSession | null>(
    nextStoredSession ?? INITIAL_UPCOMING
  );

  // Dev store controls whether the session is displayed — overrides local state
  const hasUpcoming = coachAssigned && devHasSession && upcoming !== null;
  const displayedUpcoming = hasUpcoming ? upcoming : null;

  // Listen for modal triggers from DevPanel
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const handler = (e: Event) => {
      const modal = (e as CustomEvent<string>).detail;
      if (modal === 'booking')         setShowBooking(true);
      else if (modal === 'cancel')     setShowCancel(true);
      else if (modal === 'feedback')   setShowFeedback(true);
      else if (modal === 'success-booking') setShowBookingSuccess(true);
      else if (modal === 'success-cancel')  setShowCancelSuccess(true);
    };
    window.addEventListener('dev:open-modal', handler);
    return () => window.removeEventListener('dev:open-modal', handler);
  }, []);

  // Past/completed sessions from store mapped to display format
  const sessions: CoachingSession[] = useMemo(() =>
    storeSessions
      .filter((s) => s.status === 'completed')
      .map((s) => ({
        id: s.id,
        title: s.theme ?? `Session avec ${s.coachName}`,
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
    /* Un seul ton pour les trois outils : trois teintes (teal, orange, jaune)
       à poids égal, c'est l'effet « sapin de Noël » que DESIGN.md §11
       interdit. L'icône et le titre suffisent à les distinguer. */
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
        tone="brand"
        iconStyle="plain"
        iconSize="md"
        icon={<FileText size={32} strokeWidth={1.75} />}
        title="Compte-rendu"
        onClick={() => navigate('/coaching/compte-rendu/coaching-1')}
      />
      <IconFeatureCard
        surface="tinted"
        tone="brand"
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
      <div className="relative min-h-[100dvh]">
        <PageShell width="page" noPadTop className="relative z-[2] pt-6 md:pt-8 lg:pt-10">

          {/* Hero: EditorialHero tone="warm" — Coaching = connexion humaine/amber */}
          <EditorialHero
            tone="flat"
            title="Coaching 1:1"
            summary="Accompagnement individuel pour accélérer la mise en pratique sur tes cas réels."
          />


          {/* PRIMARY ACTION ZONE: 3 cases :
              - pas coach           → empty state "Démarre ton accompagnement"
              - coach + pas session → section « Prochaine session », état vide
              - coach + session     → section « Prochaine session », carte de la session
              Passe typographique du 24/09 : « Prochaine session » était un
              surtitre teal 500 DANS la carte, au-dessus d'un h2 rendu à 20 px.
              Il devient le titre de la section (h2 28, hors de la carte) ; la
              session est le titre de la carte (h3 20). */}
          {!coachAssigned ? (
            <Card variant="tinted" tone="primary" className="p-section lg:p-section-lg flex flex-col items-center text-center gap-stack-lg">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-pill bg-white/70 backdrop-blur-glass-light text-primary-500 shadow-sm">
                <CalendarPlus size={28} strokeWidth={1.75} />
              </span>
              <div className="flex flex-col gap-stack-xs max-w-[520px]">
                <h2 className="font-display text-h2 text-ink-900">
                  Démarre ton accompagnement
                </h2>
                <p className="font-body text-body text-ink-700">
                  Réserve ta première session 1:1. Un coach te sera attribué selon tes objectifs.
                </p>
              </div>
              <Button
                emphasis="solid"
                tone="brand"
                leadingIcon={<Calendar size={16} />}
                onClick={() => setShowBooking(true)}
                size="lg"
              >
                Réserver une session
              </Button>
            </Card>
          ) : (
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Prochaine session" size="md" />
              {hasUpcoming ? (
                <Card variant="tinted" tone="primary" className="p-stack-lg lg:p-section flex flex-col gap-stack-lg">
                  <div className="flex flex-col gap-stack-sm">
                    <div className="flex flex-wrap items-start justify-between gap-stack-xs">
                      <h3 className="font-display text-h3 text-ink-900 min-w-0">
                        {upcoming!.title}
                      </h3>
                      <Badge variant="success">Confirmée</Badge>
                    </div>

                    {/* Quand et où : des données, en MetaPill, 12 px sous le titre. */}
                    <MetaPillGroup
                      items={[
                        { icon: <Calendar size={14} />, text: upcoming!.dateLabel },
                        { icon: <Clock3 size={14} />, text: upcoming!.hourLabel },
                        { icon: <Video size={14} />, text: 'Lien visio actif', tone: 'primary' },
                      ]}
                      layout="horizontal"
                      gap="sm"
                    />
                  </div>

                  {/* Le coach : nom 16/600 (il était en League Spartan gras,
                      la voix d'un titre), rôle en légende. */}
                  <div className="flex items-center gap-stack-sm p-stack rounded-xl bg-white/60 backdrop-blur-glass-light border border-white/60">
                    <Avatar initials="SM" size="sm" tint="brand" />
                    <div className="flex flex-col gap-tight min-w-0 flex-1">
                      <span className="font-body text-body font-semibold text-ink-900 truncate">
                        {coach.name}
                      </span>
                      <span className="font-body text-caption text-ink-600 truncate">
                        {coach.role}
                      </span>
                    </div>
                    <Button
                      emphasis="ghost"
                      size="md"
                      iconOnly
                      leadingIcon={<MessageCircle size={16} />}
                      onClick={() => navigate('/messages')}
                      aria-label={`Envoyer un message à ${coach.name}`}
                    />
                  </div>

                  {/* Actions : « Rejoindre » est l'action principale de l'écran,
                      son seul `solid` (arbitrage n°19) ; le calendrier est un
                      outil et « Reprogrammer » une action d'exception : deux
                      `ghost`. « Reprogrammer » était un `outline` qui ne formait
                      aucune paire Annuler / Confirmer. */}
                  <div className="flex flex-wrap items-center gap-stack-xs">
                    <Button
                      emphasis="solid"
                      tone="brand"
                      size="lg"
                      leadingIcon={<Video size={14} />}
                      className="flex-1 min-w-[180px] sm:flex-none"
                      aria-label="Rejoindre la session de coaching"
                    >
                      Rejoindre la session
                    </Button>
                    <Button
                      size="lg"
                      emphasis="ghost"
                      iconOnly
                      leadingIcon={<Download size={16} />}
                      onClick={handleDownloadCalendarInvite}
                      aria-label="Ajouter au calendrier (.ics)"
                    />
                    <Button emphasis="ghost" tone="brand" size="lg" onClick={() => setShowCancel(true)}>
                      Reprogrammer
                    </Button>
                  </div>
                </Card>
              ) : (
                // Empty state: no session scheduled, prompt to book
                <Card variant="tinted" tone="primary" className="p-section lg:p-section-lg flex flex-col items-center text-center gap-stack-lg">
                  <span className="inline-flex items-center justify-center w-16 h-16 rounded-pill bg-white/70 backdrop-blur-glass-light text-primary-500 shadow-sm">
                    <CalendarPlus size={28} strokeWidth={1.75} />
                  </span>
                  {/* État (légende 600 ink-600) → 4 → titre h3 → 8 → texte 16 ink-700. */}
                  <div className="flex flex-col max-w-[520px]">
                    <p className="font-body text-caption font-semibold text-ink-600">
                      Aucune session programmée
                    </p>
                    <h3 className="mt-stack-3xs font-display text-h3 text-ink-900">
                      Prêt(e) pour une nouvelle session ?
                    </h3>
                    <p className="mt-stack-xs font-body text-body text-ink-700">
                      Réserve un créneau 1:1 de 60 minutes pour avancer sur tes cas réels.
                    </p>
                  </div>
                  {/* Réserver, l'action principale (`solid`) ; échanger avec le
                      coach, l'action seconde (`soft`). */}
                  <div className="flex flex-wrap gap-stack-xs justify-center items-center">
                    <Button
                      emphasis="solid"
                      tone="brand"
                      leadingIcon={<Calendar size={16} />}
                      onClick={() => setShowBooking(true)}
                      size="lg"
                    >
                      Réserver une session
                    </Button>
                    <Button
                      emphasis="soft"
                      tone="brand"
                      size="lg"
                      leadingIcon={<MessageCircle size={16} />}
                      onClick={() => navigate('/messages')}
                      aria-label={`Envoyer un message à ${coach.name}`}
                    >
                      Échanger avec {coach.name.split(' ')[0]}
                    </Button>
                  </div>
                </Card>
              )}
            </section>
          )}

          {/* OUTILS : titre de section sans pastille d'icône — il part du même
              bord que le h1 et que les tuiles. */}
          <section aria-label="Outils de coaching" className="flex flex-col gap-stack">
            <SectionHeader
              size="md"
              title="Mes outils"
              subtitle="Accède à tes préparations, comptes-rendus et réflexions."
            />
            {outilsTiles}
          </section>

          {/* Sessions passées : le compte est une donnée sur la section — il
              passe en méta (il était une pastille à droite, que le bouton
              flottant recouvrait). 16 px entre le titre et les sessions (24). */}
          <section aria-label="Sessions passées" className="flex flex-col gap-stack">
            <SectionHeader
              size="md"
              title="Sessions passées"
              subtitle="Historique complet de tes sessions de coaching."
              meta={`${sessions.length} session${sessions.length > 1 ? 's' : ''}`}
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
                  /* Session passée : on relit la réponse envoyée, pas le formulaire vierge. */
                  onViewQuestionnaire={session.questionnaire ? () => navigate('/coaching/pre-questionnaire/response') : undefined}
                  onViewReport={session.report ? () => navigate(`/coaching/compte-rendu/${session.id}`) : undefined}
                  onOpen={() => navigate(`/coaching/session/${session.id}`)}
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
        sessionTitle={displayedUpcoming?.title ?? ''}
        sessionDate={displayedUpcoming ? `${displayedUpcoming.dateLabel}: ${displayedUpcoming.hourLabel}` : ''}
      />

      {/* SessionFeedbackModal: feedback post-session */}
      <SessionFeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        onSubmit={(rating, comment) => {
          console.log('⭐ Avis:', rating, comment);
          setShowFeedback(false);
        }}
        title="Ton avis sur la session"
        subtitle="Comment évalues-tu cette session de coaching ?"
      />

      {/* SuccessModal: confirmation booking */}
      <SuccessModal
        isOpen={showBookingSuccess}
        onClose={() => setShowBookingSuccess(false)}
        title="Session réservée"
        message={
          displayedUpcoming
            ? `Ta session est confirmée le ${displayedUpcoming.dateLabel} à ${displayedUpcoming.hourLabel}. Un lien visio te sera envoyé par email.`
            : 'Ta session a été réservée avec succès.'
        }
      />

      {/* SuccessModal: confirmation annulation */}
      <SuccessModal
        isOpen={showCancelSuccess}
        onClose={() => setShowCancelSuccess(false)}
        title="Session annulée"
        message="Ta session a bien été annulée. Tu peux réserver un nouveau créneau quand tu le souhaites."
      />
    </>
  );
};

export default Coaching;
