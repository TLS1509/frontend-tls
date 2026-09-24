import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
import { Avatar } from '../components/ui/Avatar';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { SectionCard } from '../components/patterns/SectionCard';
import { PageShell } from '../components/layout';
import {
  ArrowLeft,
  Star,
  Target,
  Lightbulb,
  TrendingUp,
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
      speciality: 'Coach certifiée en leadership et développement managérial',
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
        iconClass: 'text-primary-800 bg-primary-100',
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
        action: "Planifier 3 délégations concrètes avant le 5 mai: choisir des tâches à impact moyen pour tester la confiance mutuelle.",
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
        action: "Appliquer la pause de 2 secondes avant toute réponse dans les situations de désaccord: noter dans le journal après chaque occurrence.",
        deadline: 'Continu',
      },
      {
        id: 'ap4',
        step: 4,
        action: "Lire le chapitre 4 de \"Dare to Lead\" (Brené Brown) et identifier 2 vulnérabilités à partager avec l'équipe lors du prochain stand-up.",
        deadline: '10 mai 2026',
      },
    ],
    coachNotes: "C'est une session charnière. Vous êtes en train de passer d'un leadership de contrôle à un leadership de confiance: et ça se voit. La clé maintenant : maintenir la régularité dans les actions engagées, même quand la pression monte. Votre plus grande force est votre capacité d'auto-observation. Continuez à l'utiliser.",
    satisfactionRating: 5,
    nextSessionDate: '12 mai 2026',
  },
};

const getReport = (id: string): SessionReport =>
  MOCK_REPORTS[id] ?? { ...MOCK_REPORTS.default, id };

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

/* Étoiles : des classes de token (elles portaient `#F8B044` et `#e5e7eb` en dur). */
const StarRating: React.FC<{ rating: number; max?: number }> = ({ rating, max = 5 }) => (
  <div className="flex gap-tight" role="img" aria-label={`${rating} sur ${max}`}>
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        size={18}
        strokeWidth={1.75}
        className={i < rating ? 'fill-accent-400 text-accent-400' : 'fill-transparent text-ink-300'}
        aria-hidden="true"
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
    /* Passe typographique du 24/09 : la page était entièrement faite main —
       bandeau sombre maison, étiquette « COMPTE RENDU » en capitales, anneau de
       progression à 11 px, titres de section h2 rendus à 20 px, chiffres en
       graisse 800, fond blanc `bg-surface` arrêté à la colonne. Elle prend
       l'ouverture de toutes les pages (`PageHero`, ton `flat`) : surtitre →
       h1 36 → méta → la progression du parcours en barre (l'anneau disait la
       même chose en décor). */
    <PageShell width="page" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        tone="flat"
        trailing={
          <Button emphasis="ghost" tone="neutral" size="md" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
            Retour
          </Button>
        }
        eyebrow={`Compte rendu · Session ${report.sessionNumber} sur ${report.totalSessions}`}
        title={report.theme}
        meta={[
          { icon: <CalendarDays size={14} aria-hidden="true" />, label: report.date },
          { icon: <Clock3 size={14} aria-hidden="true" />, label: report.duration },
          { label: `Avec ${report.coach.name}` },
        ]}
        progress={progressPercent}
        progressLabel={`${progressPercent} % du parcours de coaching · session ${report.sessionNumber} sur ${report.totalSessions}`}
      />

      {/* Deux colonnes à partir de lg seulement : la grille `1fr 320px` sans
          repli poussait l'aside hors de l'écran à 375 px. */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-page lg:gap-section items-start">

        {/* ── Left column : trois sections h2 28, 48 px entre elles ── */}
        <div className="flex flex-col gap-page min-w-0">

          {/* Points clés : quatre paragraphes titrés dans une carte — plus une
              grille de quatre cartes à pastilles d'icône en quatre teintes.
              Titre h3 20, texte 16 ink-700 (il était en ink-500) à 8 px. */}
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Points clés de la session" size="md" />
            <Card>
              <ul className="flex flex-col divide-y divide-ink-100">
                {report.takeaways.map((tk) => (
                  <li key={tk.id} className="flex flex-col gap-stack-xs py-stack-md first:pt-0 last:pb-0">
                    <h3 className="font-display text-h3 text-ink-900">{tk.title}</h3>
                    <p className="font-body text-body text-ink-700 max-w-prose">{tk.description}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* Plan d'action : le numéro se cale sur la première ligne, en 700
              (il était en 800) ; l'échéance est une donnée (MetaPill). Les
              chevrons disaient « cliquable » sur des rangées qui ne le sont pas. */}
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Plan d'action" meta={`${report.actionPlan.length} actions`} size="md" />
            <Card className="p-0">
              <ol className="flex flex-col divide-y divide-ink-100">
                {report.actionPlan.map((ap) => (
                  <li key={ap.id} className="flex gap-stack items-start px-stack-md sm:px-stack-lg py-stack">
                    <span className="shrink-0 inline-flex items-center h-lh text-body">
                      <span className="w-8 h-8 rounded-pill bg-primary-50 text-primary-800 flex items-center justify-center font-body text-body font-bold tabular-nums border-2 border-primary-200">
                        {ap.step}
                      </span>
                    </span>
                    <div className="flex-1 min-w-0 flex flex-col items-start gap-stack-xs">
                      <p className="font-body text-body text-ink-900 max-w-prose">{ap.action}</p>
                      <MetaPill icon={<CalendarDays />} text={ap.deadline} tone="primary" />
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </section>

          {/* Note du coach : une citation (guillemets français, insécables),
              signée en légende — la signature commençait par « : », reste du
              retrait des tirets. */}
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Note de ton coach" size="md" />
            <figure className="bg-primary-50/40 border border-primary-100 rounded-xl p-stack-lg flex gap-stack items-start">
              <Avatar initials={report.coach.initials} name={report.coach.name} size="md" tint="brand" />
              <div className="flex-1 flex flex-col gap-stack-sm min-w-0">
                <blockquote className="font-body text-body text-ink-900 italic max-w-prose">
                  «&nbsp;{report.coachNotes}&nbsp;»
                </blockquote>
                <figcaption className="font-body text-caption font-semibold text-ink-600">
                  {report.coach.name}
                </figcaption>
              </div>
            </figure>
          </section>
        </div>

        {/* ── Right sidebar : des blocs (h3 20) ── Leurs titres étaient des h3
            rendus en légende 13/500 ink-500 : un titre qui chuchote. */}
        <aside className="flex flex-col gap-stack lg:sticky lg:top-6" aria-label="Autour de la session">
          <SectionCard title="Ton coach">
            <div className="flex flex-col gap-stack">
              <div className="flex gap-stack-sm items-center">
                <Avatar initials={report.coach.initials} name={report.coach.name} size="lg" tint="brand" />
                <div className="flex flex-col gap-tight min-w-0">
                  <p className="font-body text-body font-semibold text-ink-900">{report.coach.name}</p>
                  <p className="font-body text-caption text-ink-600">{report.coach.speciality}</p>
                </div>
              </div>
              <div className="flex flex-col gap-stack-xs pt-stack-sm border-t border-ink-200">
                <p className="font-body text-caption font-semibold text-ink-600">Évaluation du coach</p>
                <StarRating rating={report.coach.rating} />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Satisfaction de la session" description="Basé sur ton évaluation post-session.">
            <div className="flex items-center gap-stack-xs">
              <StarRating rating={report.satisfactionRating} />
              <span className="font-display text-h3 text-ink-900 tabular-nums">
                {report.satisfactionRating}/5
              </span>
            </div>
          </SectionCard>

          <SectionCard title="Session suivante" tone="primary">
            <div className="flex flex-col gap-stack-sm">
              <p className="flex items-center gap-stack-xs font-body text-body font-semibold text-ink-900">
                <CalendarDays size={16} className="shrink-0 text-primary-700" aria-hidden="true" />
                {report.nextSessionDate}
              </p>
              <Button
                emphasis="soft"
                size="sm"
                fullWidth
                trailingIcon={<ChevronRight size={14} />}
                onClick={() => navigate('/coaching')}
              >
                Prochaine session
              </Button>
            </div>
          </SectionCard>

          {/* Arbitrage n°19 : prolonger la séance dans le journal est l'action
              principale du compte rendu (le seul `solid`) ; la liste des
              comptes rendus est un renvoi (`ghost`). */}
          <div className="flex flex-col gap-stack-xs">
            <Button
              emphasis="solid"
              tone="warm"
              fullWidth
              leadingIcon={<PlusCircle size={16} />}
              onClick={() => navigate(`/journal/new-entry?type=compte-rendu&sessionId=${report.id}`)}
            >
              Ajouter au journal
            </Button>

            <Button
              emphasis="ghost"
              tone="brand"
              fullWidth
              leadingIcon={<BookOpen size={16} />}
              onClick={() => navigate('/journal')}
            >
              Voir tous les comptes rendus
            </Button>
          </div>
        </aside>

      </div>
    </PageShell>
  );
};

export default CoachingCompteRendu;
