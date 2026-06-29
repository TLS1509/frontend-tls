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
import { useAuth } from '../hooks/useAuth';
import { useUserProfileStore } from '../stores/persistence';
import { MOCK_COACH } from '../data/coaching';
import { ResumeLessonCard } from '../components/patterns/ResumeLessonCard';
import { SessionCard } from '../components/learning/SessionCard';
import { ActivityFeed } from '../components/patterns/ActivityFeed';
import { EmptyDashboardState } from '../components/patterns/EmptyDashboardState';
import { PageShell } from '../components/layout';
import { PageHero } from '../components/patterns/EditorialHero';
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
      {/* Section header with inline link */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="m-0 font-display text-h3 font-bold text-ink-900 leading-tight tracking-headline">
          Écrire aujourd'hui
        </h3>
        <button
          type="button"
          onClick={() => navigate('/journal')}
          className="inline-flex items-center gap-1 text-caption font-medium text-primary-600 hover:text-primary-700 transition-colors duration-fast shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
        >
          <PenLine size={12} aria-hidden="true" />
          Mon journal
        </button>
      </div>

      {/* Chat card */}
      <div className="bg-white rounded-2xl border border-ink-100 shadow-card p-4 flex flex-col gap-3">

        {/* Avatar + bubble */}
        <div className="flex items-end gap-3">
          {/* Avatar */}
          <div className="shrink-0 w-9 h-9 rounded-full bg-primary-100 border border-primary-200/60 flex items-center justify-center text-primary-600">
            <Sparkles size={15} strokeWidth={2} aria-hidden="true" />
          </div>

          {/* Bubble — vraie forme chat (bottom-left flat) */}
          <div className="flex-1 bg-primary-50/80 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl border border-primary-100/70 px-4 py-3">
            <span className="block text-[10.5px] font-semibold text-primary-500 uppercase tracking-[0.07em] mb-2">
              {meta}
            </span>
            <p className="font-body text-body text-ink-800 leading-relaxed m-0">
              {prompt}
            </p>
          </div>
        </div>

        {/* Reply bar — chat input style */}
        <div className="flex items-center gap-2 pl-12">
          <button
            type="button"
            onClick={() => navigate(href)}
            className="flex-1 h-9 rounded-full bg-ink-50/80 border border-ink-100 px-4 text-body-sm text-ink-400 text-left hover:bg-ink-100 hover:border-ink-200 transition-[background-color,border-color] duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Répondre…
          </button>
          <button
            type="button"
            onClick={() => navigate(href)}
            aria-label="Ouvrir le journal"
            className="w-9 h-9 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center text-white shadow-brand-sm hover:shadow-brand-md transition-[background-color,box-shadow] duration-fast shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
          </button>
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
      {/* Section header with inline link */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="m-0 font-display text-h3 font-bold text-ink-900 leading-tight tracking-headline">
          Activité & veille
        </h3>
        <button
          type="button"
          onClick={() => navigate('/veille')}
          className="inline-flex items-center gap-1 text-caption font-medium text-primary-600 hover:text-primary-700 transition-colors duration-fast shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
        >
          Explorer la veille
          <ArrowRight size={12} aria-hidden="true" />
        </button>
      </div>

      <ActivityFeed
        layout="cards"
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

  const firstName = user?.name?.split(' ')[0] ?? 'toi';

  return (
    <div className="relative min-h-[100dvh] bg-gradient-page-ambient">
      <PageShell width="page" noPadTop className="relative z-[2] gap-section pt-6 md:pt-8 lg:pt-10">

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
    className="flex flex-col gap-section-lg"
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
        tone="warm"
        duration="3h restantes"
        level="intermédiaire"
        onClick={() => navigate('/learning-paths/1/lessons/1')}
      />
    </motion.section>

    {/* ③ Session + Journal bubble — 2 colonnes */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg lg:gap-section items-start">

      <motion.div className="flex flex-col gap-stack" variants={itemVariants}>
        {/* Section header matching JournalBubble */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="m-0 font-display text-h3 font-bold text-ink-900 leading-tight tracking-headline">
            Prochaine session
          </h3>
          <button
            type="button"
            onClick={() => navigate('/coaching')}
            className="inline-flex items-center gap-1 text-caption font-medium text-primary-600 hover:text-primary-700 transition-colors duration-fast shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
          >
            3 sessions
            <ArrowRight size={12} aria-hidden="true" />
          </button>
        </div>
        <SessionCard
          title="Leadership & IA"
          coachName={MOCK_COACH.name}
          coachRole={MOCK_COACH.role}
          description="Travailler la posture de leader-coach face à l'arrivée des outils IA dans ton équipe."
          dateLabel="Cette semaine · 14:30"
          durationLabel="45 min · Visio"
          status="planned"
          surface="card"
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
