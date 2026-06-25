/**
 * WritingPromptsAside — Figma DS Journal pattern.
 *
 * Panel of writing-prompt cards (PromptCard) with a section header and an
 * optional "Ouvrir mon journal" link. Used in Dashboard section ③ and any
 * journal flow that surfaces contextual reflection prompts.
 *
 * Defaults to the 3 canonical learner-centric prompts
 * (Apprentissage / Pratique pro / Coaching). Pass `prompts` to override.
 *
 * Usage:
 *   <WritingPromptsAside
 *     onNavigate={navigate}
 *     onOpenJournal={() => navigate('/journal')}
 *   />
 */

import React from 'react';
import { BookOpen, Briefcase, Target, PenLine, ArrowRight } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { PromptCard } from '../learning/PromptCard';
import type { BadgeVariant } from '../ui/Badge';

export interface WritingPrompt {
  label: string;
  icon: React.ReactNode;
  text: string;
  variant: BadgeVariant;
  href: string;
}

const DEFAULT_PROMPTS: WritingPrompt[] = [
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
    text: 'Quelle question veux-tu apporter à ta prochaine session ?',
    variant: 'sun',
    href: '/journal/new-entry?type=session-coaching',
  },
];

export interface WritingPromptsAsideProps {
  /** Override the default 3 prompts. */
  prompts?: WritingPrompt[];
  /** Called when the user clicks a prompt tile or the "Ouvrir mon journal" link. */
  onNavigate: (href: string) => void;
  /** When provided, renders "Ouvrir mon journal →" link at the bottom. */
  onOpenJournal?: () => void;
  title?: string;
  subtitle?: string;
  /** Hide the section header — useful when section hierarchy is communicated by card size/position. */
  showHeader?: boolean;
  className?: string;
}

export const WritingPromptsAside: React.FC<WritingPromptsAsideProps> = ({
  prompts = DEFAULT_PROMPTS,
  onNavigate,
  onOpenJournal,
  title = 'Journal de bord',
  subtitle = 'Self-reflection sur ta formation et tes pratiques professionnelles',
  showHeader = true,
  className = '',
}) => (
  <section
    aria-label={title}
    className={['flex flex-col gap-stack', className].filter(Boolean).join(' ')}
  >
    {showHeader && (
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={PenLine}
        variant="minimal"
        tone="sun"
      />
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.label}
          label={prompt.label}
          icon={prompt.icon}
          text={prompt.text}
          variant={prompt.variant}
          ctaLabel="Écrire"
          onClick={() => onNavigate(prompt.href)}
        />
      ))}
    </div>

    {onOpenJournal && (
      <button
        type="button"
        onClick={onOpenJournal}
        className="self-start inline-flex items-center gap-tight.5 font-body text-body-sm font-semibold text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline transition-colors bg-transparent border-0 p-0 cursor-pointer"
      >
        Ouvrir mon journal
        <ArrowRight size={14} />
      </button>
    )}
  </section>
);

export default WritingPromptsAside;
