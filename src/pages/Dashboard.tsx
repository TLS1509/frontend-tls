/**
 * Dashboard Page — Learner home (mobile-first, 4-stage architecture).
 *
 * Sections (top-down, single column on mobile, optional 2-col on desktop for stage ④):
 *   ① Ton parcours    — patterns/ParcoursCard size="featured" (glass, primary CTA)
 *   ② Ton coaching    — learning/SessionCard
 *   ③ Ton journal     — learning/PromptCard size="featured" (single, rotates daily)
 *   ④ Ta veille       — learning/ArticleCard + learning/VideoCard
 *
 * Hero: EditorialHero épuré (date + greeting + quote, no stats).
 * Background: subtle brand→warm gradient with noise.
 * Container: max-w-6xl on desktop for proper width usage.
 */

import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/core/Button';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { ResumeLessonCard } from '../components/patterns/ResumeLessonCard';
import { SessionCard } from '../components/learning/SessionCard';
import { PromptCard } from '../components/learning/PromptCard';
import { ActivityFeed } from '../components/patterns/ActivityFeed';
import { EmptyDashboardState } from '../components/patterns/EmptyDashboardState';
import {
  Sparkles,
  BookOpen,
  Briefcase,
  Target,
  PenLine,
  Compass,
  GraduationCap,
  Newspaper,
  ArrowRight,
} from 'lucide-react';

const DAILY_QUOTES = [
  "L'apprentissage est un voyage, pas une destination.",
  "Ce n'est pas l'intelligence qui garantit le succès, c'est la curiosité.",
  'Chaque jour, une nouvelle compétence transforme votre potentiel.',
  "Apprendre, c'est s'offrir la liberté de devenir.",
  "La croissance commence là où la zone de confort s'arrête.",
  'Un petit progrès chaque jour mène à de grands changements.',
];

interface JournalPrompt {
  /** Catégorie de réflexion — pédagogiquement ancrée dans un moment d'apprenance. */
  label: string;
  icon: React.ReactNode;
  text: string;
  /** Couleur du badge — info=teal (libre), warm=orange (apprentissage post-leçon), sun=jaune (coaching). */
  variant: 'info' | 'warm' | 'sun';
  /** Lien vers nouvelle entrée journal pré-remplie avec le contexte. */
  href: string;
}

/**
 * 3 contextes canoniques de self-reflection learner-centric (formation + pratique pro) :
 *  - Apprentissage : self-reflection sur une leçon/parcours/projet/lecture veille — ce que tu retiens, ce qui résonne
 *  - Pratique pro  : transfert au travail — comment tu vas activer ce que tu viens d'apprendre dans ton équipe/posture
 *  - Coaching      : préparation pré-session (questions à apporter) OU restitution post-session (ce que tu retiens)
 *
 * Pas de gratitude / daily reflection — c'est un journal d'apprenance pro.
 *
 * Extensible vers : Veille (post-article/vidéo lié à pratique) et Projet (pré/post deliverable) en V2.
 */
/**
 * IMPORTANT: `href` aligné avec `EntryType` de JournalNewEntry.
 * Le type passé en URL pré-sélectionne automatiquement le bon entry type
 * dans le formulaire (avec questionClass, bodyPlaceholder et question contextualisés).
 */
const JOURNAL_PROMPTS: JournalPrompt[] = [
  {
    label: 'Apprentissage',
    icon: <BookOpen size={36} strokeWidth={1.7} className="text-primary-600" />,
    text: 'Quelle idée vas-tu retenir de ta dernière leçon — et pourquoi ?',
    variant: 'info',
    href: '/journal/new-entry?type=apprentissage',
  },
  {
    label: 'Pratique pro',
    icon: <Briefcase size={36} strokeWidth={1.7} className="text-secondary-600" />,
    text: 'Comment vas-tu activer cet apprentissage dans ton travail cette semaine ?',
    variant: 'warm',
    href: '/journal/new-entry?type=pratique-pro',
  },
  {
    label: 'Coaching',
    icon: <Target size={36} strokeWidth={1.7} className="text-accent-700" />,
    text: "Quelle question veux-tu apporter à ta prochaine session ?",
    variant: 'sun',
    href: '/journal/new-entry?type=session-coaching',
  },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  // Cold-start state for first-time users : opt-in via `?firstTime=1` until
  // backend exposes a real `isOnboarded` / `hasStartedParcours` flag.
  const isFirstTime = searchParams.get('firstTime') === '1';

  const formattedDate = useMemo(() => {
    return new Date()
      .toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      .toUpperCase();
  }, []);

  const dailyQuote = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
    );
    return DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length];
  }, []);

  const firstName = user?.name?.split(' ')[0] ?? 'membre';

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-50/30 via-white to-primary-50/20">

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-section md:py-section-lg lg:py-page flex flex-col gap-section md:gap-section-lg lg:gap-page">

        {/* Hero — épuré, full width, brand blue gradient */}
        <EditorialHero
          tone="brand"
          eyebrow={{ icon: <Sparkles size={12} />, label: formattedDate }}
          title={
            <>
              Bienvenue {firstName} <span className="inline-block">👋</span>
            </>
          }
          summary={
            isFirstTime
              ? "Ton espace t'attend. Voici les premières actions pour démarrer en confiance."
              : <em className="not-italic font-body">"{dailyQuote}"</em>
          }
        />

        {/* Cold-start state — replaces mock parcours / coaching / activity for new users */}
        {isFirstTime ? (
          <EmptyDashboardState firstName={firstName} />
        ) : (
          <DashboardContent navigate={navigate} />
        )}
      </div>
    </div>
  );
};

interface DashboardContentProps {
  navigate: ReturnType<typeof useNavigate>;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ navigate }) => {
  return (
    <>
        {/* ① TON PARCOURS — featured glass card */}
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Ton parcours" subtitle="Reprendre où tu t'es arrêté" icon={Compass} variant="minimal" tone="warm" />
          <ResumeLessonCard
            id="parcours-1"
            eyebrow="Étape 2 sur 5"
            parcoursTitle="Devenir prompt designer"
            description="Applications pratiques — Apprends à structurer tes prompts pour des cas concrets de formation. Plus que 8 minutes pour terminer la prochaine leçon."
            progress={40}
            tone="warm"
            duration="3h restantes"
            lessons={5}
            level="intermédiaire"
            onClick={() => navigate('/learning-paths/1')}
          />
        </section>

        {/* ② TON COACHING */}
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Ton coaching" subtitle="Sessions personnalisées avec ton coach" icon={GraduationCap} variant="minimal" tone="primary" />
          <SessionCard
            title="Session — Leadership & IA"
            coachName="Sarah Martin"
            description="Travailler la posture de leader-coach face à l'arrivée des outils IA dans ton équipe."
            dateLabel="Mardi 12 mai · 14:30"
            durationLabel="45 min · Visio"
            status="planned"
            onOpen={() => navigate('/coaching')}
          />
          <button
            type="button"
            onClick={() => navigate('/coaching')}
            className="self-start inline-flex items-center gap-1.5 text-body-sm font-semibold text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline transition-colors bg-transparent border-0 p-0 cursor-pointer"
          >
            Voir mes 3 sessions à venir
            <ArrowRight size={14} />
          </button>
        </section>

        {/* ③ TON JOURNAL — 3 contextual reflection prompts */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Journal de bord"
            subtitle="Self-reflection sur ta formation et tes pratiques professionnelles"
            icon={PenLine}
            variant="minimal"
            tone="sun"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack">
            {JOURNAL_PROMPTS.map((prompt) => (
              <PromptCard
                key={prompt.label}
                label={prompt.label}
                icon={prompt.icon}
                text={prompt.text}
                variant={prompt.variant}
                onClick={() => navigate(prompt.href)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => navigate('/journal')}
            className="self-start inline-flex items-center gap-1.5 text-body-sm font-semibold text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline transition-colors bg-transparent border-0 p-0 cursor-pointer"
          >
            Ouvrir mon journal
            <ArrowRight size={14} />
          </button>
        </section>

        {/* ④ À DÉCOUVRIR — Activity feed timeline: veille + feedback + nouveautés */}
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="À découvrir"
            subtitle="Ton flux d'activité — veille, feedback, nouveautés et signaux pour ta progression"
            icon={Newspaper}
            variant="minimal"
            tone="primary"
          />
          <ActivityFeed
            layout="timeline"
            groupByDate
            timeFormat="relative"
            items={[
              // ── Aujourd'hui ──────────────────────────────────────────
              {
                id: 'feed-1',
                type: 'feedback',
                title: 'Sarah Martin a partagé un feedback sur ta dernière session',
                description: '"Très belle progression sur la posture de leader-coach. Continue à expérimenter la délégation cette semaine."',
                timestamp: new Date(Date.now() - 3 * 3600000),
                actor: { name: 'Sarah Martin' },
                actionLabel: 'Lire',
                onActionClick: () => navigate('/coaching/compte-rendu/1'),
              },
              {
                id: 'feed-2',
                type: 'parcours',
                title: 'Nouveau parcours disponible — Communication augmentée par IA',
                description: '5 modules · 2h30 · Aligné avec ton focus actuel sur la posture de leader-coach.',
                timestamp: new Date(Date.now() - 8 * 3600000),
                actionLabel: 'Explorer',
                onActionClick: () => navigate('/learning-paths/new'),
              },
              // ── Hier ─────────────────────────────────────────────────
              {
                id: 'feed-3',
                type: 'veille-article',
                title: 'Le futur du travail hybride',
                description: 'Comment les organisations combinent apprentissage continu, autonomie et rituels collaboratifs.',
                timestamp: new Date(Date.now() - 1 * 86400000),
                actionLabel: 'Lire',
                onActionClick: () => navigate('/veille/article/1'),
              },
              {
                id: 'feed-4',
                type: 'comment',
                title: 'Marc Dupont a commenté ta réflexion "Délégation et confiance"',
                description: '"J\'ai vécu le même blocage l\'an dernier — un livre qui m\'a aidé : Trillion Dollar Coach."',
                timestamp: new Date(Date.now() - 1.2 * 86400000),
                actor: { name: 'Marc Dupont' },
                actionLabel: 'Voir',
                onActionClick: () => navigate('/journal/detail/j1'),
              },
              // ── Cette semaine ────────────────────────────────────────
              {
                id: 'feed-5',
                type: 'veille-video',
                title: 'Prompt Engineering — masterclass',
                description: '18 min · Maîtrise les structures de prompts pour la formation et le coaching pro.',
                timestamp: new Date(Date.now() - 4 * 86400000),
                actionLabel: 'Voir',
                onActionClick: () => navigate('/veille/tutoriel/1'),
              },
              {
                id: 'feed-6',
                type: 'achievement',
                title: 'Badge "Pionnier IA" disponible',
                description: 'Tu as complété 80% du parcours Devenir prompt designer — termine-le pour débloquer le badge.',
                timestamp: new Date(Date.now() - 5 * 86400000),
                actionLabel: 'Continuer',
                onActionClick: () => navigate('/learning-paths/1'),
              },
            ]}
          />
          <Button
            variant="ghost"
            className="self-start"
            trailingIcon={<ArrowRight size={14} />}
            onClick={() => navigate('/veille')}
          >
            Explorer toute la veille
          </Button>
        </section>
    </>
  );
};

export default Dashboard;
