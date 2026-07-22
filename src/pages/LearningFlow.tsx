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
import { BookOpen, Search, Play, Brain, Trophy, Target } from 'lucide-react';
import { PageShell } from '../components/layout';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { SectionHeader } from '../components/patterns/SectionHeader';

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

export const LearningFlow: React.FC = () => {
  return (
    <PageShell>
      <div className="px-4 sm:px-6 lg:px-10 flex-1">
        <div className="max-w-4xl mx-auto flex flex-col gap-section-lg py-stack-lg">

          {/* ── Header ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5 text-micro font-bold text-ink-400 uppercase tracking-[0.08em] w-max">
              <BookOpen size={11} aria-hidden />
              Documentation
            </span>
            <h1 className="m-0 font-display text-h2 font-bold text-ink-900 tracking-headline">
              Learning App Flow
            </h1>
            <p className="m-0 font-body text-body-sm text-ink-500 max-w-2xl">
              Parcours complet d'un apprenant : de la découverte à l'accomplissement. Chaque étape du flow correspond à des écrans et des interactions spécifiques.
            </p>
          </div>

          {/* ── Flow Steps ────────────────────────────────────────── */}
          <div className="flex flex-col gap-stack-lg">
            {LEARNING_FLOW.map((step, idx) => (
              <div key={step.id} className="flex gap-stack items-start">
                {/* ── Vertical connector ── */}
                {idx < LEARNING_FLOW.length - 1 && (
                  <div className="relative w-12 flex flex-col items-center">
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

                {/* ── Content ── */}
                <div className="flex-1 flex flex-col gap-2 pt-1">
                  <div className="flex items-start justify-between gap-stack">
                    <div className="flex flex-col gap-tight flex-1">
                      <h2 className="m-0 font-display text-h4 font-bold text-ink-900">
                        {idx + 1}. {step.title}
                      </h2>
                      <p className="m-0 font-body text-body-sm text-ink-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {step.route && (
                    <div className="mt-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        leadingIcon={<BookOpen size={14} />}
                      >
                        Voir l'écran: {step.route}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Key Principles ────────────────────────────────────── */}
          <Card variant="feature" className="p-6 border border-primary-200 bg-primary-50">
            <SectionHeader
              title="Principes clés du flow"
              size="sm"
              variant="minimal"
              className="mb-stack"
            />
            <ul className="m-0 p-0 list-none flex flex-col gap-2">
              <li className="flex items-start gap-2">
                <span className="text-h6 font-bold text-primary-600 mt-px">✓</span>
                <span className="font-body text-body-sm text-ink-700">
                  <strong>Progressive disclosure:</strong> Révéler les fonctionnalités au fur et à mesure du parcours
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-h6 font-bold text-primary-600 mt-px">✓</span>
                <span className="font-body text-body-sm text-ink-700">
                  <strong>Micro-content:</strong> Leçons courtes, astuces pratiques, flashcards pour la rétention
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-h6 font-bold text-primary-600 mt-px">✓</span>
                <span className="font-body text-body-sm text-ink-700">
                  <strong>Motivation:</strong> Badges, points XP, leaderboard pour gamifier l'apprentissage
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-h6 font-bold text-primary-600 mt-px">✓</span>
                <span className="font-body text-body-sm text-ink-700">
                  <strong>Application réelle:</strong> Projets, missions et évaluations pour valider les compétences
                </span>
              </li>
            </ul>
          </Card>

        </div>
      </div>
    </PageShell>
  );
};

export default LearningFlow;
