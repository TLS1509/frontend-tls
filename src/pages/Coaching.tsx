/**
 * Coaching Page - Coaching sessions and support
 *
 * Shows:
 * - Available coaching sessions
 * - Booking/scheduling options
 * - Coaching progress
 * - Coaching history
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingModal, CancelSessionModal, SessionFeedbackModal } from '../components/modals';
import { Card } from '../components/core/Card';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { HeroSection } from '../components/patterns/HeroSection';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/core/Button';
import { SessionCard } from '../components/learning';
import {
  CalendarClock,
  UserRound,
  Users,
  Mail,
  ExternalLink,
  Star,
  Video,
  Calendar,
  Clock3,
  CheckCircle2,
} from 'lucide-react';
import '../styles/static-pages.css';


interface CoachingSession {
  id: string;
  title: string;
  coachName: string;
  description: string;
  dateLabel: string;
  durationLabel: string;
  status: 'planned' | 'completed';
  questionnaire: boolean;
  report: boolean;
  journal: boolean;
}

const coach = {
  name: 'Sophie Martin',
  role: 'Expert IA & Pedagogie',
  bio: 'Specialiste IA generative et design pedagogique. Accompagnement 1:1 orienté mise en pratique.',
  rating: '4.9',
  sessions: '156',
  email: 'sophie.martin@thelearningsociety.com',
  linkedin: 'linkedin.com/in/sophiemartin',
};

const upcoming = {
  title: 'Session de coaching IA',
  dateLabel: 'Mardi 30 avril 2026',
  hourLabel: '14:00 - 15:00',
};

const sessions: CoachingSession[] = [
  {
    id: 'coaching-1',
    title: 'Introduction au prompt engineering',
    coachName: 'Sophie Martin',
    description: 'Fondamentaux ROLE-CONTEXT-TASK et structuration des demandes.',
    dateLabel: '15 decembre 2025',
    durationLabel: '1h',
    status: 'completed',
    questionnaire: true,
    report: true,
    journal: true,
  },
  {
    id: 'coaching-2',
    title: "Strategie d'implementation IA",
    coachName: 'Sophie Martin',
    description: "Integration IA dans vos parcours existants et priorisation des cas d'usage.",
    dateLabel: '8 decembre 2025',
    durationLabel: '1h',
    status: 'completed',
    questionnaire: true,
    report: true,
    journal: false,
  },
];

export const Coaching: React.FC = () => {
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
    <div style={{ minHeight: '100vh', background: 'var(--tls-primary-50)', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <HeroSection
        icon={CalendarClock}
        title="Coaching 1:1"
        description="Accompagnement individuel pour accélérer la mise en pratique sur vos cas réels"
        gradient="primary"
      />

      {/* Content Section */}
      <div style={{ flex: 1, padding: 'var(--s-8)', maxWidth: 'var(--container-wide)', marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
        {/* KPI Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--s-4)', marginBottom: 'var(--s-8)' }}>
          <Card
            className="card-stagger"
            variant="default"
            style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-xs)', transition: 'all var(--dur-2)', cursor: 'default', textAlign: 'center' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)' }}>
              <Calendar size={20} />
            </div>
            <p style={{ fontSize: 'var(--t-h2)', fontWeight: 800, color: 'var(--tls-primary-600)', margin: '0 0 var(--s-1)', lineHeight: 1 }} role="status" aria-label="1 session planifiée">1</p>
            <p style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', margin: 0 }}>Session planifiée</p>
          </Card>
          <Card
            className="card-stagger"
            variant="default"
            style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-xs)', transition: 'all var(--dur-2)', cursor: 'default', textAlign: 'center' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div className="tls-kpi-icon" style={{ background: 'var(--tls-orange-50)', color: 'var(--tls-orange-600)' }}>
              <CheckCircle2 size={20} />
            </div>
            <p style={{ fontSize: 'var(--t-h2)', fontWeight: 800, color: 'var(--tls-orange-600)', margin: '0 0 var(--s-1)', lineHeight: 1 }} role="status" aria-label="12 sessions réalisées">12</p>
            <p style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', margin: 0 }}>Sessions réalisées</p>
          </Card>
          <Card
            className="card-stagger"
            variant="default"
            style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-xs)', transition: 'all var(--dur-2)', cursor: 'default', textAlign: 'center' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div className="tls-kpi-icon" style={{ background: 'var(--tls-yellow-50)', color: 'var(--tls-yellow-600)' }}>
              <Star size={20} />
            </div>
            <p style={{ fontSize: 'var(--t-h2)', fontWeight: 800, color: 'var(--tls-yellow-600)', margin: '0 0 var(--s-1)', lineHeight: 1 }} role="status" aria-label="4.9 sur 5 de satisfaction">4.9/5</p>
            <p style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', margin: 0 }}>Satisfaction moyenne</p>
          </Card>
        </div>

        {/* Two-column layout: Coach info + Upcoming session */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 1fr', gap: 'var(--s-8)', marginBottom: 'var(--s-8)', alignItems: 'start' }}>
          {/* Coach Card - Sticky */}
          <div style={{ position: 'sticky', top: 'var(--s-8)' }}>
            <Card variant="feature" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)', transition: 'all var(--dur-2)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
                {/* Avatar section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
                  {/* Avatar circle */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 'var(--r-full)',
                      background: 'linear-gradient(135deg, var(--tls-primary-400) 0%, var(--tls-primary-600) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: 'var(--shadow-brand)',
                    }}
                  >
                    <span style={{ fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text-inverse)' }}>
                      {coach.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', fontWeight: 700, color: 'var(--text)' }}>
                      {coach.name}
                    </p>
                    <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--tls-primary-600)', fontWeight: 500 }}>
                      {coach.role}
                    </p>
                  </div>
                  <Badge variant="info" style={{ marginLeft: 'auto', flexShrink: 0 }}>1:1</Badge>
                </div>

                {/* Rating & sessions */}
                <div style={{ display: 'flex', gap: 'var(--s-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', padding: 'var(--s-1) var(--s-2)', borderRadius: 'var(--r-lg)', background: 'var(--tls-yellow-50)', border: '1px solid var(--tls-yellow-100)' }}>
                    <Star size={13} style={{ color: 'var(--tls-yellow-500)' }} />
                    <span style={{ fontSize: 'var(--t-caption)', fontWeight: 600, color: 'var(--tls-yellow-700)' }}>
                      {coach.rating} / 5
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', padding: 'var(--s-1) var(--s-2)', borderRadius: 'var(--r-lg)', background: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
                    <Users size={13} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: 'var(--t-caption)', fontWeight: 500, color: 'var(--text-muted)' }}>
                      {coach.sessions} sessions
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {coach.bio}
                </p>

                {/* Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)', paddingTop: 'var(--s-2)', borderTop: '1px solid var(--border)' }}>
                  <a
                    href={`mailto:${coach.email}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--s-2)',
                      fontSize: 'var(--t-body-sm)',
                      color: 'var(--tls-primary-600)',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--tls-primary-700)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--tls-primary-600)';
                    }}
                  >
                    <Mail size={14} />
                    {coach.email}
                  </a>
                  <a
                    href={`https://${coach.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--s-2)',
                      fontSize: 'var(--t-body-sm)',
                      color: 'var(--tls-primary-600)',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--tls-primary-700)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--tls-primary-600)';
                    }}
                  >
                    <ExternalLink size={14} />
                    LinkedIn
                  </a>
                </div>

                {/* Callout */}
                <div style={{ padding: 'var(--s-3)', borderRadius: 'var(--r-lg)', background: 'var(--tls-primary-50)', border: '1px solid var(--tls-primary-100)' }}>
                  <p style={{ fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--text)', margin: '0 0 var(--s-1)' }}>
                    Conseil préparation
                  </p>
                  <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 0 }}>
                    {"Complétez le questionnaire pré-session pour maximiser la valeur du rendez-vous."}
                  </p>
                </div>

                {/* Book CTA */}
                <Button
                  variant="primary"
                  leadingIcon={<Calendar size={15} />}
                  onClick={() => setShowBooking(true)}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Réserver une session
                </Button>
              </div>
            </Card>
          </div>

          {/* Upcoming Session Card */}
          <Card variant="feature" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)', transition: 'all var(--dur-2)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--s-3)' }}>
                <div>
                  <p style={{ margin: '0 0 var(--s-1)', fontSize: 'var(--t-caption)', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Prochaine session
                  </p>
                  <h3 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                    {upcoming.title}
                  </h3>
                </div>
                <Badge variant="success">Confirmée</Badge>
              </div>

              {/* Session Meta */}
              <MetaPillGroup
                items={[
                  { icon: <Calendar size={14} />, text: upcoming.dateLabel },
                  { icon: <Clock3 size={14} />, text: upcoming.hourLabel },
                  { icon: <Video size={14} />, text: 'Lien visio actif', tone: 'primary' },
                ]}
                layout="vertical"
                gap="sm"
              />

              {/* Actions */}
              <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap', paddingTop: 'var(--s-2)' }}>
                <Button leadingIcon={<Video size={15} />} aria-label="Rejoindre la session de coaching">
                  Rejoindre la session
                </Button>
                <Button variant="secondary" onClick={() => setShowCancel(true)}>Annuler / Reprogrammer</Button>
                <Button variant="ghost" onClick={() => setShowFeedback(true)}>Donner un avis</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Past Sessions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
              Sessions passées
            </h2>
            <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
              {sessions.length} sessions
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                title={session.title}
                coachName={session.coachName}
                description={session.description}
                dateLabel={session.dateLabel}
                durationLabel={session.durationLabel}
                status={session.status}
                questionnaire={session.questionnaire}
                report={session.report}
                journal={session.journal}
                onViewQuestionnaire={
                  session.questionnaire
                    ? () => navigate('/coaching/pre-questionnaire')
                    : undefined
                }
                onViewReport={
                  session.report
                    ? () => navigate(`/coaching/compte-rendu/${session.id}`)
                    : undefined
                }
                onOpen={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>

    <BookingModal
      isOpen={showBooking}
      onClose={() => setShowBooking(false)}
      onBookingConfirmed={({ date, time }) => {
        console.log('📅 Session réservée:', date, time);
        setShowBooking(false);
      }}
      coachName={coach.name}
      coachInitials={coach.name.split(' ').map((n: string) => n[0]).join('')}
    />

    <CancelSessionModal
      isOpen={showCancel}
      onClose={() => setShowCancel(false)}
      onCancel={(reason) => {
        console.log('❌ Session annulée — motif:', reason);
        setShowCancel(false);
      }}
      onReschedule={() => {
        setShowCancel(false);
        setShowBooking(true);
      }}
      sessionTitle={upcoming.title}
      sessionDate={`${upcoming.dateLabel} — ${upcoming.hourLabel}`}
    />

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

    </>
  );
};
