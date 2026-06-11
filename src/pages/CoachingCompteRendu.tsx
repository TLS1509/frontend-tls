import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Container } from '../components/layout';
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
    iconClass: string;
    cardBorderClass: string;
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
        iconClass: 'text-accent-800 bg-accent-100',
        cardBorderClass: 'border-l-accent-200',
      },
      {
        id: 'tk2',
        icon: Target,
        title: 'Clarté des objectifs',
        description: "Le cadrage systématique des attentes en début de réunion réduit les malentendus. À maintenir et formaliser dans vos rituels d'équipe.",
        iconClass: 'text-secondary-700 bg-secondary-100',
        cardBorderClass: 'border-l-secondary-200',
      },
      {
        id: 'tk3',
        icon: TrendingUp,
        title: 'Gestion du stress situationnel',
        description: "Lors de situations de tension, vous avez appliqué la technique de la pause consciente. Résultat : 2 conflits désamorcés cette semaine.",
        iconClass: 'text-primary-700 bg-primary-100',
        cardBorderClass: 'border-l-primary-200',
      },
      {
        id: 'tk4',
        icon: Award,
        title: 'Posture de leader sécurisant',
        description: "Votre équipe perçoit désormais une présence plus stable. La régularité des 1:1 crée un espace de confiance mesurable.",
        iconClass: 'text-success-fg bg-success-bg',
        cardBorderClass: 'border-l-success-base/30',
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
  <div className="flex gap-1">
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        size={18}
        fill={i < rating ? '#F8B044' : 'none'}
        stroke={i < rating ? '#F8B044' : '#e5e7eb'}
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
    <div className="min-h-screen bg-surface flex flex-col font-body">

      {/* ── Hero / Header ── */}
      <div className="bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 p-8 text-white">

        <Button
          variant="glass"
          size="sm"
          leadingIcon={<ArrowLeft size={14} />}
          onClick={() => navigate(-1)}
          className="mb-section"
        >
          Retour
        </Button>

        <Container width="page" padding={false}>
          <div className="flex flex-wrap gap-4 items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-body text-caption font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-pill">
                  Compte rendu
                </span>
                <span className="font-body text-caption font-semibold bg-white/12 px-3 py-1 rounded-pill">
                  Session {report.sessionNumber}/{report.totalSessions}
                </span>
              </div>
              <h1 className="font-display text-h1 font-extrabold m-0 mb-2 leading-tight">
                {report.theme}
              </h1>
              <div className="flex flex-wrap gap-4 mt-3">
                <span className="flex items-center gap-1 font-body text-body-sm opacity-85">
                  <CalendarDays size={14} />
                  {report.date}
                </span>
                <span className="flex items-center gap-1 font-body text-body-sm opacity-85">
                  <Clock3 size={14} />
                  {report.duration}
                </span>
              </div>
            </div>

            {/* Progress ring — conic-gradient is a runtime computed value → style={} allowed */}
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(rgba(255,255,255,0.90) ${progressPercent * 3.6}deg, rgba(255,255,255,0.20) 0deg)`,
                }}
              >
                <div className="w-[60px] h-[60px] rounded-full bg-primary-700 flex flex-col items-center justify-center">
                  <span className="font-display text-h4 font-extrabold leading-none">{progressPercent}%</span>
                  <span className="font-body opacity-80 mt-0.5 text-[9px]">parcours</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Page body ── */}
      <Container width="page" padding={false} className="flex-1 p-8">
        <div className="grid grid-cols-[1fr_320px] gap-section items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-section">

            {/* ── Key takeaways ── */}
            <section>
              <h2 className="font-display text-h3 font-bold text-ink-900 m-0 mb-5 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-primary-600" />
                Points clés de la session
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
                {report.takeaways.map((tk) => {
                  const TkIcon = tk.icon;
                  return (
                    <div
                      key={tk.id}
                      className={`bg-white border border-ink-200 border-l-4 ${tk.cardBorderClass} rounded-xl p-5 shadow-xs flex flex-col gap-3`}
                    >
                      <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${tk.iconClass}`}>
                        <TkIcon size={20} />
                      </div>
                      <h3 className="font-display text-body font-bold text-ink-900 m-0">
                        {tk.title}
                      </h3>
                      <p className="font-body text-body-sm text-ink-500 m-0 leading-relaxed">
                        {tk.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Action plan ── */}
            <section>
              <h2 className="font-display text-h3 font-bold text-ink-900 m-0 mb-5 flex items-center gap-2">
                <Target size={20} className="text-secondary-600" />
                Plan d'action
              </h2>
              <Card variant="feature">
                <div className="flex flex-col gap-0">
                  {report.actionPlan.map((ap, index) => (
                    <div
                      key={ap.id}
                      className={`flex gap-4 items-start py-4 ${index < report.actionPlan.length - 1 ? 'border-b border-ink-200' : ''}`}
                    >
                      <div className="shrink-0 w-8 h-8 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center font-body text-body-sm font-extrabold border-2 border-primary-200">
                        {ap.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-body text-ink-900 m-0 mb-1 leading-snug">
                          {ap.action}
                        </p>
                        <span className="inline-flex items-center gap-1 font-body text-caption text-primary-700 bg-primary-50 px-2 py-0.5 rounded-pill font-semibold">
                          <CalendarDays size={10} />
                          {ap.deadline}
                        </span>
                      </div>
                      <ChevronRight size={16} className="text-ink-400 shrink-0 mt-2" />
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* ── Coach notes ── */}
            <section>
              <h2 className="font-display text-h3 font-bold text-ink-900 m-0 mb-5 flex items-center gap-2">
                <MessageSquareQuote size={20} className="text-primary-600" />
                Note de votre coach
              </h2>
              <div className="bg-gradient-to-br from-primary-50 to-white border border-ink-200 border-l-4 border-l-primary-400 rounded-xl p-5 shadow-xs">
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-primary-600 text-white flex items-center justify-center font-body text-body-sm font-extrabold shadow-sm">
                    {report.coach.initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-body text-ink-900 leading-relaxed m-0 mb-3 italic">
                      "{report.coachNotes}"
                    </p>
                    <p className="font-body text-caption text-ink-500 m-0 font-semibold">
                      — {report.coach.name}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ── Right sidebar ── */}
          <div className="flex flex-col gap-stack-lg sticky top-6">

            {/* Coach info card */}
            <Card variant="feature">
              <div className="flex flex-col gap-4">
                <h3 className="font-body text-caption font-bold text-ink-500 m-0 uppercase tracking-wider">
                  Votre coach
                </h3>
                <div className="flex gap-3 items-center">
                  <div className="w-[52px] h-[52px] rounded-full shrink-0 bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center font-body text-body font-extrabold shadow-md">
                    {report.coach.initials}
                  </div>
                  <div>
                    <p className="font-body text-body font-bold text-ink-900 m-0 mb-1">
                      {report.coach.name}
                    </p>
                    <p className="font-body text-caption text-ink-500 m-0 leading-snug">
                      {report.coach.speciality}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-ink-200">
                  <p className="font-body text-caption text-ink-500 m-0 mb-2 font-semibold">
                    Évaluation du coach
                  </p>
                  <StarRating rating={report.coach.rating} />
                </div>
              </div>
            </Card>

            {/* Satisfaction */}
            <Card variant="feature">
              <div className="flex flex-col gap-3">
                <h3 className="font-body text-caption font-bold text-ink-500 m-0 uppercase tracking-wider">
                  Satisfaction de la session
                </h3>
                <div className="flex items-center gap-3">
                  <StarRating rating={report.satisfactionRating} />
                  <span className="font-display text-h4 font-extrabold text-accent-700">
                    {report.satisfactionRating}/5
                  </span>
                </div>
                <p className="font-body text-caption text-ink-500 m-0 leading-snug">
                  Basé sur votre évaluation post-session
                </p>
              </div>
            </Card>

            {/* Next session */}
            <Card variant="feature" className="bg-gradient-to-br from-primary-50 to-white">
              <div className="flex flex-col gap-3">
                <h3 className="font-body text-caption font-bold text-ink-500 m-0 uppercase tracking-wider">
                  Session suivante
                </h3>
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-primary-600" />
                  <span className="font-display text-body font-bold text-primary-700">
                    {report.nextSessionDate}
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  trailingIcon={<ChevronRight size={14} />}
                  onClick={() => navigate('/coaching')}
                >
                  Prochaine session
                </Button>
              </div>
            </Card>

            <Button
              variant="secondary"
              fullWidth
              leadingIcon={<PlusCircle size={16} />}
              onClick={() => navigate(`/journal/new-entry?type=compte-rendu&sessionId=${report.id}`)}
            >
              Ajouter au journal
            </Button>

            <Button
              variant="ghost"
              fullWidth
              leadingIcon={<BookOpen size={16} />}
              onClick={() => navigate('/journal')}
            >
              Voir tous les comptes rendus
            </Button>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default CoachingCompteRendu;
