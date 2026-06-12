/**
 * Dashboard Page : Learner home (mobile-first).
 *
 * Sections (top-down, single column mobile, desktop keeps same order):
 *   ① Hero compact   : bandeau greeting + date (pas de citation décorative)
 *   ② Ton parcours   : ResumeLessonCard — Tier 1, primary action
 *   ③ Ton coaching   : SessionCard — Tier 2
 *   ④ Ton journal    : WritingPromptsAside — Tier 2
 *   ⑤ Actualités     : ActivityFeed (3 items max) — Tier 3 passif
 */

import React, { useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUserProfileStore } from '../stores/persistence';
import { Button } from '../components/core/Button';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { ResumeLessonCard } from '../components/patterns/ResumeLessonCard';
import { SessionCard } from '../components/learning/SessionCard';
import { WritingPromptsAside } from '../components/patterns/WritingPromptsAside';
import { ActivityFeed } from '../components/patterns/ActivityFeed';
import { EmptyDashboardState } from '../components/patterns/EmptyDashboardState';
import { PageShell } from '../components/layout';
import {
  Compass,
  GraduationCap,
  Newspaper,
  ArrowRight,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const profileStore = useUserProfileStore();
  const profile = profileStore.get();

  // First-time detection : capture at render (before the useEffect increments the counter)
  // so the UI doesn't flash between states on the same mount.
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
    // Capitalize first letter only (weekday name) — no toUpperCase
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }, []);

  const firstName = user?.name?.split(' ')[0] ?? 'toi';

  return (
    <div className="relative min-h-[100dvh] bg-gradient-page-ambient">
      <PageShell width="page" noPadTop className="relative md:gap-section-lg lg:gap-page">

        {/* Compact greeting strip — brand presence without editorial height */}
        <div className="rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 px-section py-stack-lg">
          <p className="font-body text-caption font-semibold text-primary-200 mb-tight">
            {formattedDate}
          </p>
          <h1 className="font-display text-h2 font-bold text-white leading-tight">
            Bonjour {firstName}{' '}
            <span aria-hidden="true">👋</span>
          </h1>
          {isFirstTime && (
            <p className="font-body text-body-sm text-primary-100 mt-stack-xs">
              Ton espace t'attend. Voici les premières actions pour démarrer en confiance.
            </p>
          )}
        </div>

        {/* Cold-start state : replaces mock content for new users */}
        {isFirstTime ? (
          <EmptyDashboardState firstName={firstName} />
        ) : (
          <DashboardContent navigate={navigate} />
        )}
      </PageShell>
    </div>
  );
};

interface DashboardContentProps {
  navigate: ReturnType<typeof useNavigate>;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ navigate }) => {
  return (
    <>
      {/* ② TON PARCOURS — Tier 1 : action principale, header le plus prominent */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Ton parcours"
          subtitle="Reprendre où tu t'es arrêté"
          icon={Compass}
          variant="solid"
          tone="warm"
        />
        <ResumeLessonCard
          id="parcours-1"
          eyebrow="Étape 2 sur 5"
          parcoursTitle="Devenir prompt designer"
          description="Applications pratiques : structurer tes prompts pour des cas concrets de formation. Plus que 8 minutes pour terminer la prochaine leçon."
          progress={40}
          tone="warm"
          duration="3h restantes"
          lessons={5}
          level="intermédiaire"
          onClick={() => navigate('/learning-paths/1/lessons/1')}
        />
      </section>

      {/* ③ TON COACHING — Tier 2 */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Ton coaching"
          subtitle="Sessions personnalisées avec ton coach"
          icon={GraduationCap}
          variant="default"
          tone="primary"
        />
        <SessionCard
          title="Session : Leadership & IA"
          coachName="Sarah Martin"
          description="Travailler la posture de leader-coach face à l'arrivée des outils IA dans ton équipe."
          dateLabel="Mardi 12 mai · 14:30"
          durationLabel="45 min · Visio"
          status="planned"
          onOpen={() => navigate('/coaching')}
        />
        <Button
          variant="link"
          size="sm"
          trailingIcon={<ArrowRight size={14} />}
          onClick={() => navigate('/coaching')}
        >
          Voir mes 3 sessions à venir
        </Button>
      </section>

      {/* ④ TON JOURNAL — Tier 2 */}
      <WritingPromptsAside
        onNavigate={navigate}
        onOpenJournal={() => navigate('/journal')}
      />

      {/* ⑤ ACTUALITÉS — Tier 3 : contenu passif, limité à 3 items */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Actualités"
          subtitle="Veille, feedback et nouveautés"
          icon={Newspaper}
          variant="minimal"
          tone="neutral"
        />
        <ActivityFeed
          layout="timeline"
          groupByDate
          timeFormat="relative"
          itemsPerPage={3}
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
              title: 'Nouveau parcours disponible : Communication augmentée par IA',
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
              description: '"J\'ai vécu le même blocage l\'an dernier : un livre qui m\'a aidé : Trillion Dollar Coach."',
              timestamp: new Date(Date.now() - 1.2 * 86400000),
              actor: { name: 'Marc Dupont' },
              actionLabel: 'Voir',
              onActionClick: () => navigate('/journal/detail/j1'),
            },
            // ── Cette semaine ────────────────────────────────────────
            {
              id: 'feed-5',
              type: 'veille-video',
              title: 'Prompt Engineering : masterclass',
              description: '18 min · Maîtrise les structures de prompts pour la formation et le coaching pro.',
              timestamp: new Date(Date.now() - 4 * 86400000),
              actionLabel: 'Voir',
              onActionClick: () => navigate('/veille/tutoriel/1'),
            },
            {
              id: 'feed-6',
              type: 'achievement',
              title: 'Badge "Pionnier IA" disponible',
              description: 'Tu as complété 80% du parcours Devenir prompt designer : termine-le pour débloquer le badge.',
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
