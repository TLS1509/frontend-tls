/**
 * LearningFlow — Documentation du parcours d'apprentissage
 *
 * Page de référence visualisant le flow complet:
 * 1. Discovery (LearningSpace grid)
 * 2. Selection (LearningPathDetail)
 * 3. Learning (LessonPlayer + Astuces/Flashcards/Complementary)
 * 4. Reflection (Journal, Badges)
 * 5. Practice (Projects, Missions)
 *
 * Route: /learning-flow (dev/docs only)
 */

import React from 'react';
import { BookOpen, Search, Play, Brain, Trophy, Target, Check } from 'lucide-react';
import { PageShell } from '../components/layout';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageHero } from '../components/patterns/EditorialHero';

interface FlowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route?: string;
  screenshotUrl?: string;
}

const LEARNING_FLOW: FlowStep[] = [
  {
    id: 'discovery',
    title: 'Discovery',
    description: 'Explorer les ressources disponibles, filtrer par type/thème/niveau/durée. Visualiser tous les contenus accessibles.',
    icon: <Search size={24} />,
    route: '/learning-space',
  },
  {
    id: 'selection',
    title: 'Selection',
    description: 'Choisir un parcours ou une ressource. Visualiser les détails, prérequis, progression, étapes à suivre.',
    icon: <BookOpen size={24} />,
    route: '/learning-paths/:id',
  },
  {
    id: 'learning',
    title: 'Learning',
    description: 'Suivre une leçon : contenu principal, astuces pratiques, flashcards pour retenir, ressources complémentaires.',
    icon: <Play size={24} />,
    route: '/lesson/:id',
  },
  {
    id: 'reflection',
    title: 'Reflection',
    description: 'Journaliser l\'apprentissage, accumuler des badges, suivre la progression sur le passeport de compétences.',
    icon: <Brain size={24} />,
    route: '/journal',
  },
  {
    id: 'practice',
    title: 'Practice',
    description: 'Mettre en pratique via des missions, des projets SBO, des masterclass. Valider les compétences acquises.',
    icon: <Target size={24} />,
    route: '/projects',
  },
  {
    id: 'achievement',
    title: 'Achievement',
    description: 'Célébrer les résultats, afficher les badges gagnés, consulter le leaderboard, partager les accomplissements.',
    icon: <Trophy size={24} />,
    route: '/dashboard/badges',
  },
];

const PRINCIPES: { terme: string; texte: string }[] = [
  { terme: 'Progressive disclosure', texte: 'Révéler les fonctionnalités au fur et à mesure du parcours' },
  { terme: 'Micro-content', texte: 'Leçons courtes, astuces pratiques, flashcards pour la rétention' },
  { terme: 'Motivation', texte: "Badges, points XP, leaderboard pour gamifier l'apprentissage" },
  { terme: 'Application réelle', texte: 'Projets, missions et évaluations pour valider les compétences' },
];

/* Passe typographique du 24/09. La page doublait la gouttière de l'app (un
   `px-4 … lg:px-10` dans PageShell) et centrait sa colonne : son contenu partait
   100 px à droite de celui des autres pages. Elle prend PageShell tel quel,
   l'en-tête PageHero (h1 36, chapô 18 ink-700, surtitre 13/600 — il était en
   capitales 11 px), et deux sections h2 28 : les étapes (h3 20, textes 16
   ink-700 au lieu du cran 500) et les principes. */
export const LearningFlow: React.FC = () => {
  return (
    <PageShell>

      <PageHero
        tone="flat"
        eyebrow={{ icon: <BookOpen size={14} aria-hidden="true" />, label: 'Documentation' }}
        title="Learning App Flow"
        summary="Parcours complet d'un apprenant : de la découverte à l'accomplissement. Chaque étape du flow correspond à des écrans et des interactions spécifiques."
      />

      {/* ── Flow Steps ────────────────────────────────────────── */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Les six étapes" />
        <ol className="flex flex-col gap-stack-lg">
          {LEARNING_FLOW.map((step, idx) => (
            <li key={step.id} className="flex gap-stack items-start">
              {/* ── Vertical connector ── */}
              {idx < LEARNING_FLOW.length - 1 && (
                <div className="relative w-12 self-stretch flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100 to-primary-50 border border-primary-200 flex items-center justify-center text-primary-600 shrink-0">
                    {step.icon}
                  </div>
                  <div className="w-1 flex-1 bg-gradient-to-b from-primary-300 to-primary-100 my-2" />
                </div>
              )}

              {/* ── Last step (no connector) ── */}
              {idx === LEARNING_FLOW.length - 1 && (
                <div className="w-12 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-success-base to-primary-100 border border-success-base/50 flex items-center justify-center text-white shrink-0">
                    {step.icon}
                  </div>
                </div>
              )}

              {/* ── Content — titre centré sur la pastille (48 − 26) / 2 = 11,
                  texte à 8, action à 12. ── */}
              <div className="flex-1 flex flex-col gap-stack-sm pt-[11px]">
                <div className="flex flex-col gap-stack-xs">
                  <h3 className="font-display text-h3 text-ink-900">
                    <span className="tabular-nums">{idx + 1}.</span> {step.title}
                  </h3>
                  <p className="font-body text-body text-ink-700 max-w-prose">
                    {step.description}
                  </p>
                </div>
                {step.route && (
                  <div>
                    <Button
                      emphasis="soft" tone="warm"
                      size="sm"
                      leadingIcon={<BookOpen size={14} />}
                    >
                      Voir l'écran{' '}: {step.route}
                    </Button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Key Principles — le titre de section vit hors de la carte ──── */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Principes clés du flow" />
        <Card variant="feature" className="p-6 border border-primary-200 bg-primary-50">
          <ul className="flex flex-col gap-stack-xs">
            {PRINCIPES.map(({ terme, texte }) => (
              <li key={terme} className="flex items-start gap-stack-xs">
                {/* La coche (Lucide, elle était un caractère ✓ sur un pas
                    inexistant) se cale sur la première ligne : (26 − 16) / 2. */}
                <Check size={16} strokeWidth={2.5} className="shrink-0 mt-[5px] text-primary-700" aria-hidden="true" />
                <span className="font-body text-body text-ink-700">
                  <strong className="font-semibold text-ink-900">{terme}{' '}:</strong> {texte}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

    </PageShell>
  );
};

export default LearningFlow;
