/**
 * Dashboard Page — Learner home.
 *
 * Layout :
 *  ① Hero          full width
 *  ② ResumeLessonCard   full width — action DOMINANTE
 *  ③ SessionCard    lg:col-1  |  JournalBubble  lg:col-1
 *  ④ Activité & veille  full width
 *
 * Mobile: single column, order preservé.
 */

import React, { useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '../components/core/Button';
import { useAuth } from '../hooks/useAuth';
import { useUserProfileStore } from '../stores/persistence';
import { MOCK_COACH } from '../data/coaching';
import { ResumeLessonCard } from '../components/patterns/ResumeLessonCard';
import { SessionCard } from '../components/learning/SessionCard';
import { ActivityFeed } from '../components/patterns/ActivityFeed';
import { EmptyDashboardState } from '../components/patterns/EmptyDashboardState';
import { PageShell } from '../components/layout';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import {
  ArrowRight,
  Hand,
  Sparkles,
  PenLine,
} from 'lucide-react';

// ─── Animations ─────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── En-tête de section ──────────────────────────────────────────────────────

/* Titre de section (h2 28) et son action. L'action passe SOUS le titre quand la
   place manque (375 px, ou colonnes de 326 px à 1024) : dans `SectionHeader`,
   le titre prend `flex-1` et l'action ne se replie jamais, donc un titre de
   28 px se cassait en deux lignes à côté d'un bouton (« Prochaine / session »).
   Ici l'en-tête garde sa largeur propre et c'est l'action qui descend. */
const EnTeteDeSection: React.FC<{ title: string; action: React.ReactNode }> = ({ title, action }) => (
  <div className="flex flex-wrap items-center justify-between gap-x-stack gap-y-stack-xs">
    <SectionHeader title={title} />
    {action}
  </div>
);

// ─── Contextual journal bubble ───────────────────────────────────────────────

type NudgeContext = 'session' | 'lesson';

const NUDGE_PROMPTS: Record<NudgeContext, { prompt: string; meta: string; href: string }> = {
  session: {
    prompt: 'Quelle question aimerais-tu poser à Sophie lors de ta session mardi ?',
    meta: 'Session coaching · Mardi 14h30',
    href: '/journal/new-entry?type=session-coaching',
  },
  lesson: {
    prompt: 'Quelle idée retenir de ta leçon sur les prompts ?',
    meta: 'Parcours Prompt designer',
    href: '/journal/new-entry?type=apprentissage',
  },
};

interface JournalBubbleNudgeProps {
  navigate: ReturnType<typeof useNavigate>;
  hasUpcomingSession: boolean;
}

const JournalBubbleNudge: React.FC<JournalBubbleNudgeProps> = ({ navigate, hasUpcomingSession }) => {
  const context: NudgeContext = hasUpcomingSession ? 'session' : 'lesson';
  const { prompt, meta, href } = NUDGE_PROMPTS[context];

  return (
    <div className="flex flex-col gap-stack">
      {/* Une section de la page : h2 28 (passe typographique du 24/09). Elle
          était un h3 20 fait main, à la taille d'un titre de carte. */}
      <EnTeteDeSection
        title="Écrire aujourd'hui"
        action={
          <Button
            emphasis="outline"
            size="sm"
            leadingIcon={<PenLine size={14} />}
            onClick={() => navigate('/journal')}
          >
            Mon journal
          </Button>
        }
      />

      {/* Chat card */}
      {/* Padding 24 ≥ rayon 20 : la bulle (20) est une forme fixe. À 16, son coin
          était évasé (rayon concentrique attendu : 3). */}
      <div className="bg-white rounded-xl border border-ink-100 p-stack-lg flex flex-col gap-stack-sm">

        {/* Avatar + bubble */}
        <div className="flex items-end gap-stack-sm">
          {/* Avatar */}
          <div className="shrink-0 w-9 h-9 rounded-pill bg-primary-100 border border-primary-200/60 flex items-center justify-center text-primary-600">
            <Sparkles size={14} strokeWidth={2} aria-hidden="true" />
          </div>

          {/* Bulle — vraie forme chat (coin bas-gauche aplati pour la queue).
              Construction de la famille bulle, tranchée le 2026-09-17 : rayon
              conteneur (20) + padding canon carte (24, `p-stack-lg`). L'étape
              intermédiaire du même jour l'avait posée à `p-stack-md` (20 px) pour
              coller à `JournalBubbleCard`, avant que le cran `stack-md` (20 px)
              n'entre dans l'échelle le 17/09 au soir ; le composant avait
              rejoint le canon carte (24) entre-temps. Padding ≥ rayon : le coin ne pince pas. */}
          {/* La méta (le rendez-vous qui motive la question) est une donnée :
              légende 13/600 ink-600, 4 px au-dessus de la question, comme un
              surtitre de carte. Elle était en étiquette 11 px capitales teal,
              le registre du Badge, et criait plus fort que la question. */}
          <div className="flex-1 flex flex-col gap-stack-3xs bg-primary-50/80 rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl border border-primary-100/70 p-stack-lg">
            <p className="font-body text-caption font-semibold text-ink-600">
              {meta}
            </p>
            <p className="font-body text-body text-ink-900">
              {prompt}
            </p>
          </div>
        </div>

        {/* Reply bar — chat input style */}
        <div className="flex items-center gap-stack-xs pl-12">
          <button
            type="button"
            onClick={() => navigate(href)}
            className="flex-1 h-9 rounded-lg bg-ink-50/80 border border-ink-100 px-4 text-body text-ink-600 text-left hover:bg-ink-100 hover:border-ink-200 transition-[background-color,border-color] duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Répondre…
          </button>
          <Button
            iconOnly
            size="sm"
            emphasis="soft"
            tone="brand"
            onClick={() => navigate(href)}
            aria-label="Ouvrir le journal"
            className="shrink-0"
          >
            <ArrowRight strokeWidth={2.5} aria-hidden="true" />
          </Button>
        </div>

      </div>
    </div>
  );
};

// ─── Activity & veille section ───────────────────────────────────────────────

interface ActivitySectionProps {
  navigate: ReturnType<typeof useNavigate>;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ navigate }) => {
  const feedItems = useMemo(() => makeFeedItems(navigate), [navigate]);
  return (
    <div className="flex flex-col gap-stack">
      <EnTeteDeSection
        title="Activité & veille"
        action={
          <Button
            emphasis="outline"
            size="sm"
            trailingIcon={<ArrowRight size={14} />}
            onClick={() => navigate('/veille')}
          >
            Explorer la veille
          </Button>
        }
      />

      {/* Un fil qu'on parcourt : des rangées dans une carte (arbitrage n°5 du 23/09). */}
      <ActivityFeed
        layout="list"
        groupByDate={false}
        timeFormat="relative"
        itemsPerPage={4}
        items={feedItems}
      />
    </div>
  );
};

// ─── Main page ───────────────────────────────────────────────────────────────

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const profileStore = useUserProfileStore();
  const profile = profileStore.get();

  const isFirstTimeRef = useRef((profile?.dashboardVisitCount ?? 0) === 0 && profile?.isOnboarded === true);
  const isFirstTime = isFirstTimeRef.current;

  useEffect(() => {
    if (profile) {
      profileStore.patch({ dashboardVisitCount: (profile.dashboardVisitCount ?? 0) + 1 });
    }
  }, []);

  const formattedDate = useMemo(() => {
    const raw = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }, []);

  // Le prénom saisi à l'onboarding prime sur le nom du compte (« Dev User »
  // en local) : seulement une fois l'onboarding fait, sinon le profil ne
  // porte que son prénom de démo.
  const firstName =
    (profile?.isOnboarded && profile.firstName?.trim()) ||
    user?.name?.split(' ')[0] ||
    'toi';

  return (
    <div className="relative min-h-[100dvh]" data-page-title="Tableau de bord">
      {/* Datum de tête d'écran (17/09) : plus d'override de padding haut — la
          page prend LA rampe par défaut de PageShell (section/section-lg/page),
          la même que la rangée logo du rail. Les deux colonnes partent de la
          même ligne. */}
      {/* 48 px entre l'en-tête et le contenu, puis entre chaque section (le
          défaut de PageShell, doctrine § 5). La page écrasait ce rythme à 32,
          puis le contenu à 40 : trois écarts pour dire la même chose. */}
      <PageShell width="page" className="relative z-[2]">

        {/* ① Hero */}
        <PageHero
          tone="flat"
          eyebrow={{ icon: <Hand size={14} className="opacity-80" />, label: formattedDate }}
          title={`Bonjour ${firstName}`}
          summary={
            isFirstTime
              ? "Ton espace t'attend. Voici les premières actions pour démarrer en confiance."
              : "Ton focus du jour t'attend, prêt à reprendre."
          }
        />

        {/* Cold-start */}
        {isFirstTime ? (
          <EmptyDashboardState firstName={firstName} />
        ) : (
          <DashboardContent navigate={navigate} />
        )}

      </PageShell>
    </div>
  );
};

// ─── DashboardContent ────────────────────────────────────────────────────────

interface DashboardContentProps {
  navigate: ReturnType<typeof useNavigate>;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ navigate }) => {
  const reduceMotion = useReducedMotion();
  return (
  <motion.div
    className="flex flex-col gap-page"
    variants={containerVariants}
    initial={reduceMotion ? false : 'hidden'}
    animate="show"
  >
    {/* ② DOMINANT ACTION — full width */}
    <motion.section aria-label="Ton parcours en cours" variants={itemVariants}>
      <ResumeLessonCard
        id="parcours-1"
        eyebrow="Étape 2 sur 5"
        parcoursTitle="Devenir prompt designer"
        nextLessonTitle="Structurer un prompt efficace"
        progress={40}
        currentStep={2}
        totalSteps={5}
        tone="warm"
        duration="3h restantes"
        level="intermédiaire"
        onClick={() => navigate('/learning-paths/1/lessons/1')}
      />
    </motion.section>

    {/* ③ Session + Journal bubble — 2 colonnes. Empilées (mobile), ce sont
        deux sections : 48 entre elles, comme partout ; côte à côte, 32 de
        gouttière. */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-page gap-x-section items-start">

      <motion.div className="flex flex-col gap-stack" variants={itemVariants}>
        {/* Même anatomie que la colonne voisine : h2 28 sur 36 de haut, la
            hauteur du bouton `sm` d'en face — les deux titres partagent leur
            ligne. Le lien prend la typographie des liens du fil d'activité,
            plus bas sur la page (13/600 au cran 800 ; il était à 13/500 au
            cran 700). Pas le niveau `link` de Button : en taille `sm` il garde
            16 px de padding, et replié sous le titre il sortait du bord gauche. */}
        <EnTeteDeSection
          title="Prochaine session"
          action={
            <button
              type="button"
              onClick={() => navigate('/coaching')}
              className="inline-flex items-center min-h-6 py-1 -my-1 gap-stack-3xs text-caption font-semibold text-primary-800 hover:text-primary-900 transition-colors duration-fast shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
            >
              Toutes mes sessions
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          }
        />
        <SessionCard
          title="Leadership & IA"
          coachName={MOCK_COACH.name}
          coachRole={MOCK_COACH.role}
          description="Travailler la posture de leader-coach face à l'arrivée des outils IA dans ton équipe."
          dateLabel="Cette semaine · 14:30"
          durationLabel="45 min · Visio"
          status="planned"
          surface="card"
          onOpen={() => navigate('/coaching')}
        />
      </motion.div>

      <motion.section aria-label="Journal de bord" variants={itemVariants}>
        <JournalBubbleNudge navigate={navigate} hasUpcomingSession={true} />
      </motion.section>

    </div>

    {/* ④ Activité & veille — full width */}
    <motion.section aria-label="Activité et veille" variants={itemVariants}>
      <ActivitySection navigate={navigate} />
    </motion.section>

  </motion.div>
  );
};

// ─── Feed data factory ───────────────────────────────────────────────────────

const makeFeedItems = (navigate: ReturnType<typeof useNavigate>) => [
  {
    id: 'feed-1',
    type: 'feedback' as const,
    title: 'Sophie Marchand a partagé un feedback sur ta dernière session',
    description: '"Très belle progression sur la posture de leader-coach. Continue à expérimenter la délégation cette semaine."',
    timestamp: new Date(Date.now() - 3 * 3600000),
    actor: { name: 'Sophie Marchand' },
    actionLabel: 'Lire',
    onActionClick: () => navigate('/coaching/compte-rendu/1'),
  },
  {
    id: 'feed-2',
    type: 'parcours' as const,
    title: 'Nouveau parcours : Communication augmentée par IA',
    description: '5 modules · 2h30 · Aligné avec ton focus actuel sur la posture de leader-coach.',
    timestamp: new Date(Date.now() - 8 * 3600000),
    actionLabel: 'Explorer',
    onActionClick: () => navigate('/learning-paths'),
  },
  {
    id: 'feed-3',
    type: 'veille-article' as const,
    title: 'Le futur du travail hybride',
    description: 'Comment les organisations combinent apprentissage continu, autonomie et rituels collaboratifs.',
    timestamp: new Date(Date.now() - 86400000),
    actionLabel: 'Lire',
    onActionClick: () => navigate('/veille'),
  },
  {
    id: 'feed-4',
    type: 'achievement' as const,
    title: 'Badge "Pionnier IA" à portée',
    description: 'Tu as complété 40 % du parcours Devenir prompt designer : continue sur ta lancée pour débloquer le badge.',
    timestamp: new Date(Date.now() - 2 * 86400000),
    actionLabel: 'Continuer',
    onActionClick: () => navigate('/learning-paths/1'),
  },
];

export default Dashboard;
