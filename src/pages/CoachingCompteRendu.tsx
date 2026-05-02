import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  Target,
  Lightbulb,
  TrendingUp,
  MessageSquareQuote,
  BookOpen,
  CalendarDays,
  Clock3,
  Award,
  ChevronRight,
  PlusCircle,
} from 'lucide-react';

/* ─── Mock data ─────────────────────────────────────────────────────────────── */

interface SessionReport {
  id: string;
  date: string;
  duration: string;
  sessionNumber: number;
  totalSessions: number;
  theme: string;
  coach: {
    name: string;
    initials: string;
    speciality: string;
    rating: number;
  };
  takeaways: {
    id: string;
    icon: React.ComponentType<{ size?: number }>;
    title: string;
    description: string;
    iconColor: string;
    iconBg: string;
  }[];
  actionPlan: {
    id: string;
    step: number;
    action: string;
    deadline: string;
  }[];
  coachNotes: string;
  satisfactionRating: number;
  nextSessionDate: string;
}

const MOCK_REPORTS: Record<string, SessionReport> = {
  default: {
    id: 'cr-001',
    date: '28 avril 2026',
    duration: '55 min',
    sessionNumber: 3,
    totalSessions: 6,
    theme: 'Leadership & Communication',
    coach: {
      name: 'Sophie Marchand',
      initials: 'SM',
      speciality: 'Coach certifiée — Leadership & Développement managérial',
      rating: 5,
    },
    takeaways: [
      {
        id: 'tk1',
        icon: Lightbulb,
        title: 'Écoute active renforcée',
        description: "Vous avez démontré une progression significative dans votre capacité à reformuler les besoins de votre équipe avant d'agir.",
        iconColor: 'var(--tls-yellow-800)',
        iconBg: 'var(--tls-yellow-100)',
      },
      {
        id: 'tk2',
        icon: Target,
        title: 'Clarté des objectifs',
        description: "Le cadrage systématique des attentes en début de réunion réduit les malentendus. À maintenir et formaliser dans vos rituels d'équipe.",
        iconColor: 'var(--tls-orange-700)',
        iconBg: 'var(--tls-orange-100)',
      },
      {
        id: 'tk3',
        icon: TrendingUp,
        title: 'Gestion du stress situationnel',
        description: "Lors de situations de tension, vous avez appliqué la technique de la pause consciente. Résultat : 2 conflits désamorcés cette semaine.",
        iconColor: 'var(--tls-primary-700)',
        iconBg: 'var(--tls-primary-100)',
      },
      {
        id: 'tk4',
        icon: Award,
        title: 'Posture de leader sécurisant',
        description: "Votre équipe perçoit désormais une présence plus stable. La régularité des 1:1 crée un espace de confiance mesurable.",
        iconColor: 'var(--tls-success-fg)',
        iconBg: 'var(--tls-success-light)',
      },
    ],
    actionPlan: [
      {
        id: 'ap1',
        step: 1,
        action: "Planifier 3 délégations concrètes avant le 5 mai — choisir des tâches à impact moyen pour tester la confiance mutuelle.",
        deadline: '5 mai 2026',
      },
      {
        id: 'ap2',
        step: 2,
        action: "Instaurer un canal Slack #décisions-équipe pour partager les arbitrages en temps réel et réduire les angles morts.",
        deadline: '2 mai 2026',
      },
      {
        id: 'ap3',
        step: 3,
        action: "Appliquer la pause de 2 secondes avant toute réponse dans les situations de désaccord — noter dans le journal après chaque occurrence.",
        deadline: 'Continu',
      },
      {
        id: 'ap4',
        step: 4,
        action: "Lire le chapitre 4 de \"Dare to Lead\" (Brené Brown) et identifier 2 vulnérabilités à partager avec l'équipe lors du prochain stand-up.",
        deadline: '10 mai 2026',
      },
    ],
    coachNotes: "C'est une session charnière. Vous êtes en train de passer d'un leadership de contrôle à un leadership de confiance — et ça se voit. La clé maintenant : maintenir la régularité dans les actions engagées, même quand la pression monte. Votre plus grande force est votre capacité d'auto-observation. Continuez à l'utiliser.",
    satisfactionRating: 5,
    nextSessionDate: '12 mai 2026',
  },
};

const getReport = (id: string): SessionReport =>
  MOCK_REPORTS[id] ?? { ...MOCK_REPORTS.default, id };

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

const StarRating: React.FC<{ rating: number; max?: number }> = ({ rating, max = 5 }) => (
  <div style={{ display: 'flex', gap: 'var(--s-1)' }}>
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        size={18}
        fill={i < rating ? 'var(--tls-yellow-500)' : 'none'}
        stroke={i < rating ? 'var(--tls-yellow-500)' : 'var(--border)'}
      />
    ))}
  </div>
);

/* ─── Main page ──────────────────────────────────────────────────────────────── */

export const CoachingCompteRendu: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const report = getReport(id ?? 'default');

  const progressPercent = Math.round((report.sessionNumber / report.totalSessions) * 100);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
      {/* ── Hero / Header ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--tls-primary-800) 0%, var(--tls-primary-600) 60%, var(--tls-primary-500) 100%)',
          padding: 'var(--s-8)',
          color: 'var(--on-color-text-main)',
        }}
      >
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 'var(--s-2)',
            background: 'var(--on-color-fill-xs)', border: '1px solid var(--on-color-border-sm)',
            borderRadius: 'var(--r-md)', padding: 'var(--s-2) var(--s-4)',
            color: 'var(--text-inverse)', cursor: 'pointer', fontSize: 'var(--t-body-sm)',
            fontFamily: 'var(--font-body)', marginBottom: 'var(--s-6)',
            transition: 'background var(--dur-2)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--on-color-fill-lg)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--on-color-fill-xs)')}
        >
          <ArrowLeft size={16} />
          Retour
        </button>

        {/* Hero content */}
        <div style={{ maxWidth: 'var(--container-wide)', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-4)', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-3)' }}>
                <span style={{
                  fontSize: 'var(--t-caption)', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.1em', background: 'var(--on-color-fill-md)',
                  padding: 'var(--s-1) var(--s-3)', borderRadius: 'var(--r-pill)',
                }}>
                  Compte rendu
                </span>
                <span style={{
                  fontSize: 'var(--t-caption)', fontWeight: 600,
                  background: 'var(--on-color-fill-xs)', padding: 'var(--s-1) var(--s-3)',
                  borderRadius: 'var(--r-pill)',
                }}>
                  Session {report.sessionNumber}/{report.totalSessions}
                </span>
              </div>
              <h1 style={{ fontSize: 'var(--t-h1)', fontWeight: 800, margin: '0 0 var(--s-2)', lineHeight: 1.2 }}>
                {report.theme}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-4)', marginTop: 'var(--s-3)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-body-sm)', opacity: 0.85 }}>
                  <CalendarDays size={14} />
                  {report.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-body-sm)', opacity: 0.85 }}>
                  <Clock3 size={14} />
                  {report.duration}
                </span>
              </div>
            </div>

            {/* Progress ring simplified */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: `conic-gradient(var(--on-color-progress-fill) ${progressPercent * 3.6}deg, var(--on-color-progress-track) 0deg)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: 'var(--tls-primary-700)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                  <span style={{ fontSize: 'var(--t-h4)', fontWeight: 800, lineHeight: 1 }}>{progressPercent}%</span>
                  <span style={{ fontSize: '9px', opacity: 0.8, marginTop: 2 }}>parcours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Page body ── */}
      <div style={{ flex: 1, padding: 'var(--s-8)', maxWidth: 'var(--container-wide)', marginLeft: 'auto', marginRight: 'auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 'var(--s-8)', alignItems: 'start' }}>

          {/* ── Left column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-8)' }}>

            {/* ── Key takeaways ── */}
            <section>
              <h2 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-5)', display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                <CheckCircle2 size={20} style={{ color: 'var(--tls-primary-600)' }} />
                Points clés de la session
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--s-4)' }}>
                {report.takeaways.map((tk, index) => {
                  const TkIcon = tk.icon;
                  return (
                    <div
                      key={tk.id}
                      style={{
                        animation: 'cardFadeInUp var(--dur-3) var(--ease-entrance) both',
                        animationDelay: `${index * 70}ms`,
                      } as React.CSSProperties}
                    >
                      <Card variant="feature" style={{ borderLeft: `3px solid ${tk.iconBg}` }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
                          <div style={{
                            width: 40, height: 40, borderRadius: 'var(--r-md)',
                            background: tk.iconBg, color: tk.iconColor,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <TkIcon size={20} />
                          </div>
                          <h3 style={{ fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                            {tk.title}
                          </h3>
                          <p style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                            {tk.description}
                          </p>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Action plan ── */}
            <section>
              <h2 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-5)', display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                <Target size={20} style={{ color: 'var(--tls-orange-600)' }} />
                Plan d'action
              </h2>
              <Card variant="feature">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {report.actionPlan.map((ap, index) => (
                    <div
                      key={ap.id}
                      style={{
                        display: 'flex', gap: 'var(--s-4)', alignItems: 'flex-start',
                        padding: 'var(--s-4) 0',
                        borderBottom: index < report.actionPlan.length - 1 ? '1px solid var(--border)' : 'none',
                        animation: 'cardFadeInUp var(--dur-3) var(--ease-entrance) both',
                        animationDelay: `${index * 80}ms`,
                      } as React.CSSProperties}
                    >
                      {/* Step number */}
                      <div style={{
                        flexShrink: 0,
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'var(--tls-primary-50)',
                        color: 'var(--tls-primary-700)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 'var(--t-body-sm)', fontWeight: 800,
                        border: '2px solid var(--tls-primary-200)',
                      }}>
                        {ap.step}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 'var(--t-body)', color: 'var(--text)', margin: '0 0 var(--s-1)', lineHeight: 1.55 }}>
                          {ap.action}
                        </p>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)',
                          fontSize: 'var(--t-caption)', color: 'var(--tls-primary-700)',
                          background: 'var(--tls-primary-50)', padding: '2px var(--s-2)',
                          borderRadius: 'var(--r-pill)', fontWeight: 600,
                        }}>
                          <CalendarDays size={10} />
                          {ap.deadline}
                        </span>
                      </div>
                      <ChevronRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 8 }} />
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* ── Coach notes ── */}
            <section>
              <h2 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-5)', display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                <MessageSquareQuote size={20} style={{ color: 'var(--tls-primary-600)' }} />
                Note de votre coach
              </h2>
              <Card
                variant="feature"
                style={{
                  borderLeft: '4px solid var(--tls-primary-400)',
                  background: 'linear-gradient(135deg, var(--tls-primary-50) 0%, var(--surface) 100%)',
                }}
              >
                <div style={{ display: 'flex', gap: 'var(--s-4)', alignItems: 'flex-start' }}>
                  {/* Coach initials avatar */}
                  <div style={{
                    flexShrink: 0,
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'var(--tls-primary-600)', color: 'var(--on-color-text-main)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'var(--t-body-sm)', fontWeight: 800,
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    {report.coach.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: 'var(--t-body)', color: 'var(--text)', lineHeight: 1.7,
                      margin: '0 0 var(--s-3)',
                      fontStyle: 'italic',
                    }}>
                      "{report.coachNotes}"
                    </p>
                    <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>
                      — {report.coach.name}
                    </p>
                  </div>
                </div>
              </Card>
            </section>
          </div>

          {/* ── Right sidebar ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)', position: 'sticky', top: 'var(--s-6)' }}>

            {/* Coach info card */}
            <Card variant="feature">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
                <h3 style={{ fontSize: 'var(--t-caption)', fontWeight: 700, color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Votre coach
                </h3>
                <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'center' }}>
                  {/* Avatar */}
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, var(--tls-primary-500), var(--tls-primary-700))',
                    color: 'var(--on-color-text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'var(--t-body)', fontWeight: 800,
                    boxShadow: 'var(--shadow-md)',
                  }}>
                    {report.coach.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-1)' }}>
                      {report.coach.name}
                    </p>
                    <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                      {report.coach.speciality}
                    </p>
                  </div>
                </div>
                <div style={{ paddingTop: 'var(--s-2)', borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: '0 0 var(--s-2)', fontWeight: 600 }}>
                    Évaluation du coach
                  </p>
                  <StarRating rating={report.coach.rating} />
                </div>
              </div>
            </Card>

            {/* Satisfaction */}
            <Card variant="feature">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
                <h3 style={{ fontSize: 'var(--t-caption)', fontWeight: 700, color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Satisfaction de la session
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
                  <StarRating rating={report.satisfactionRating} />
                  <span style={{ fontSize: 'var(--t-h4)', fontWeight: 800, color: 'var(--tls-yellow-700)' }}>
                    {report.satisfactionRating}/5
                  </span>
                </div>
                <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                  Basé sur votre évaluation post-session
                </p>
              </div>
            </Card>

            {/* Next session */}
            <Card variant="feature" style={{ background: 'linear-gradient(135deg, var(--tls-primary-50), var(--surface))' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
                <h3 style={{ fontSize: 'var(--t-caption)', fontWeight: 700, color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Session suivante
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                  <CalendarDays size={16} style={{ color: 'var(--tls-primary-600)' }} />
                  <span style={{ fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--tls-primary-700)' }}>
                    {report.nextSessionDate}
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  trailingIcon={<ChevronRight size={14} />}
                  onClick={() => navigate('/coaching')}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Prochaine session
                </Button>
              </div>
            </Card>

            {/* Add to journal */}
            <Button
              variant="secondary"
              leadingIcon={<PlusCircle size={16} />}
              onClick={() => navigate(`/journal/new-entry?type=compte-rendu&sessionId=${report.id}`)}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Ajouter au journal
            </Button>

            {/* Resources link */}
            <Button
              variant="ghost"
              leadingIcon={<BookOpen size={16} />}
              onClick={() => navigate('/journal')}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Voir tous les comptes rendus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingCompteRendu;
