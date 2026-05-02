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
  role: 'Expert IA & Pédagogie',
  bio: 'Spécialiste IA générative et design pédagogique. Accompagnement 1:1 orienté mise en pratique sur vos cas réels.',
  rating: 4.9,
  ratingCount: 42,
  sessions: '156',
  specialties: ['Prompt Engineering', 'IA Générative', 'Design Pédagogique'],
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
        {/* KPI Stats — Elevated with better visual hierarchy */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--s-4)', marginBottom: 'var(--s-10)' }}>
          <Card
            className="card-stagger hover-lift"
            variant="default"
            style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)', transition: 'all var(--dur-2)', cursor: 'default', textAlign: 'center' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)' }}>
              <Calendar size={20} />
            </div>
            <p style={{ fontSize: 'var(--t-h2)', fontWeight: 800, color: 'var(--tls-primary-600)', margin: '0 0 var(--s-1)', lineHeight: 1 }} role="status" aria-label="1 session planifiée">1</p>
            <p style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', margin: 0 }}>Session planifiée</p>
          </Card>
          <Card
            className="card-stagger hover-lift"
            variant="default"
            style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)', transition: 'all var(--dur-2)', cursor: 'default', textAlign: 'center' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div className="tls-kpi-icon" style={{ background: 'var(--tls-orange-50)', color: 'var(--tls-orange-600)' }}>
              <CheckCircle2 size={20} />
            </div>
            <p style={{ fontSize: 'var(--t-h2)', fontWeight: 800, color: 'var(--tls-orange-600)', margin: '0 0 var(--s-1)', lineHeight: 1 }} role="status" aria-label="12 sessions réalisées">12</p>
            <p style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', margin: 0 }}>Sessions réalisées</p>
          </Card>
          <Card
            className="card-stagger hover-lift"
            variant="default"
            style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)', transition: 'all var(--dur-2)', cursor: 'default', textAlign: 'center' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div className="tls-kpi-icon" style={{ background: 'var(--tls-yellow-50)', color: 'var(--tls-yellow-600)' }}>
              <Star size={20} />
            </div>
            <p style={{ fontSize: 'var(--t-h2)', fontWeight: 800, color: 'var(--tls-yellow-600)', margin: '0 0 var(--s-1)', lineHeight: 1 }} role="status" aria-label="4.9 sur 5 de satisfaction">4.9/5</p>
            <p style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', margin: 0 }}>Satisfaction moyenne</p>
          </Card>
        </div>

        {/* Two-column layout: Coach card (1/3) + Upcoming session (2/3) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--s-8)', marginBottom: 'var(--s-10)', alignItems: 'start' }}>
          {/* Coach Profile Card — Sticky glass card */}
          <div style={{ position: 'sticky', top: 'var(--s-6)' }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-2xl)',
              padding: 'var(--s-8)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--s-5)',
            }}>
              {/* Avatar with level badge */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 96,
                  height: 96,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--tls-primary-400), var(--tls-orange-500))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-brand-md)',
                }}>
                  <span style={{
                    fontSize: 'var(--t-h2)',
                    fontWeight: 800,
                    color: 'var(--text-inverse)',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.02em',
                  }}>
                    {coach.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                {/* Level badge — absolute bottom-right */}
                <div style={{
                  position: 'absolute',
                  bottom: -4,
                  right: -4,
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--r-lg)',
                  background: 'linear-gradient(135deg, var(--tls-orange-500), var(--tls-yellow-500))',
                  border: '3px solid var(--surface)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Star size={14} style={{ color: 'var(--text-inverse)' }} fill="currentColor" />
                </div>
              </div>

              {/* Name + role centered */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 var(--s-1)', fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  {coach.name}
                </p>
                <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--tls-primary-600)', fontWeight: 500 }}>
                  {coach.role}
                </p>
              </div>

              {/* Star rating row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                <div style={{ display: 'flex', gap: 'var(--s-1)' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      style={{ color: star <= Math.round(coach.rating) ? 'var(--tls-yellow-500)' : 'var(--border)' }}
                      fill={star <= Math.round(coach.rating) ? 'var(--tls-yellow-500)' : 'none'}
                    />
                  ))}
                </div>
                <span style={{ fontSize: 'var(--t-caption)', fontWeight: 700, color: 'var(--tls-yellow-700)' }}>
                  {coach.rating}
                </span>
                <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                  ({coach.ratingCount} avis)
                </span>
              </div>

              {/* Specialties as Tag chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2)', justifyContent: 'center' }}>
                {coach.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    style={{
                      padding: 'var(--s-1) var(--s-3)',
                      borderRadius: 'var(--r-pill)',
                      background: 'var(--tls-primary-50)',
                      border: '1px solid var(--tls-primary-100)',
                      color: 'var(--tls-primary-700)',
                      fontSize: 'var(--t-caption)',
                      fontWeight: 600,
                    }}
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />

              {/* Contact info rows */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
                <a
                  href={`mailto:${coach.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--s-2)',
                    fontSize: 'var(--t-caption)',
                    color: 'var(--tls-primary-600)',
                    textDecoration: 'none',
                    transition: 'color var(--dur-2)',
                    padding: 'var(--s-2) var(--s-3)',
                    borderRadius: 'var(--r-lg)',
                    background: 'var(--surface-muted)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--tls-primary-700)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--tls-primary-600)'; }}
                >
                  <Mail size={14} style={{ flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {coach.email}
                  </span>
                </a>
                <a
                  href={`https://${coach.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--s-2)',
                    fontSize: 'var(--t-caption)',
                    color: 'var(--tls-primary-600)',
                    textDecoration: 'none',
                    transition: 'color var(--dur-2)',
                    padding: 'var(--s-2) var(--s-3)',
                    borderRadius: 'var(--r-lg)',
                    background: 'var(--surface-muted)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--tls-primary-700)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--tls-primary-600)'; }}
                >
                  <ExternalLink size={14} style={{ flexShrink: 0 }} />
                  LinkedIn
                </a>
              </div>

              {/* Bio */}
              <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6, textAlign: 'center' }}>
                {coach.bio}
              </p>

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
          </div>

          {/* Upcoming Session Card — Featured with elevated styling */}
          <Card variant="feature" style={{ background: 'linear-gradient(135deg, var(--tls-primary-50), var(--surface))', boxShadow: 'var(--shadow-md)', transition: 'all var(--dur-2)', borderRadius: 'var(--r-lg)', border: '1px solid var(--tls-primary-200)' }}>
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

        {/* Past Sessions — Better visual separation and spacing */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)', paddingTop: 'var(--s-8)', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                Sessions passées
              </h2>
              <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 'var(--s-1) 0 0' }}>Historique complet de vos sessions de coaching</p>
            </div>
            <span style={{ fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--tls-primary-600)', background: 'var(--tls-primary-50)', padding: 'var(--s-1) var(--s-3)', borderRadius: 'var(--r-pill)' }}>
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
        </section>
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
