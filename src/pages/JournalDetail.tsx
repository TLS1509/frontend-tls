/**
 * JournalDetail — Phase 10 Tier 2 polish.
 *
 * Vue complète d'une entrée de journal — pattern article éditorial.
 *
 * Structure :
 *  1. ReadingProgressBar + sticky glass header (back + ring + new entry)
 *  2. Breadcrumb + hero compact (eyebrow + h1 + AuthorStrip avec date/readTime)
 *  3. IntroCallout (mood + résumé)
 *  4. 3 KeyFindingCard (Observation / Analyse / Actions)
 *  5. Engagements checklist
 *  6. Tags
 *  7. Entry navigation prev/next
 *  8. New entry CTA brand gradient
 */

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Tag as TagIcon,
  Sparkles,
  Target,
  Eye,
  Lightbulb,
  CheckCircle2,
  PenLine,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { KeyFindingCard } from '../components/patterns/KeyFindingCard';
import { AuthorStrip } from '../components/patterns/AuthorStrip';
import {
  ReadingProgressBar,
  ReadingProgressRing,
} from '../components/patterns/ReadingProgress';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const ENTRY = {
  date: '25 avril 2026',
  week: 'Semaine 14',
  category: 'Leadership',
  mood: '💡',
  moodLabel: 'Inspiré',
  readTime: '7 min',
  title: "Leadership et écoute active — ce que j'ai appris cette semaine",
  tags: ['Leadership', 'Communication', 'Équipe', 'Management'],
  author: { name: 'Vous', role: 'Auteur' },
};

const SECTIONS = [
  {
    icon: <Eye size={20} />,
    tone: 'brand' as const,
    title: 'Observation',
    text: "Cette semaine, j'ai observé une tension récurrente dans les échanges entre deux membres de l'équipe lors de nos stand-ups quotidiens. En creusant un peu, j'ai réalisé que la source n'était pas un désaccord sur les tâches, mais une attente non formulée sur la façon dont les décisions sont prises.",
  },
  {
    icon: <Lightbulb size={20} />,
    tone: 'warm' as const,
    title: 'Analyse',
    text: "En relisant le module sur la communication non-violente, j'ai fait le lien avec ce que je vivais : les besoins non exprimés créent des frustrations qui s'accumulent. La clé n'est pas de résoudre le conflit une fois qu'il éclate, mais de créer des rituels d'expression des besoins en amont.",
  },
  {
    icon: <Target size={20} />,
    tone: 'success' as const,
    title: 'Actions à mettre en place',
    text: "Trois actions concrètes : (1) Organiser un 1:1 avec chacun des deux membres concernés. (2) Proposer un format de rétro bi-mensuel de 30 min. (3) Modifier l'animation du stand-up : laisser 2 minutes pour les 'signaux faibles'.",
  },
];

const TODOS = [
  { done: false, text: '1:1 avec Pierre — jeudi 14h' },
  { done: false, text: '1:1 avec Amélie — vendredi 10h' },
  { done: false, text: "Proposer format rétro au reste de l'équipe — lundi" },
  { done: false, text: 'Modifier template stand-up pour inclure "signaux faibles"' },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const JournalDetail: React.FC = () => {
  const navigate = useNavigate();
  const articleRef = useRef<HTMLElement>(null);
  const [todos, setTodos] = useState(TODOS);

  const toggleTodo = (i: number) =>
    setTodos((prev) => prev.map((t, idx) => (idx === i ? { ...t, done: !t.done } : t)));

  return (
    <div className="min-h-screen bg-surface">
      <ReadingProgressBar targetRef={articleRef} tone="brand" />

      {/* Sticky glass header */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            leadingIcon={<ArrowLeft size={14} />}
            onClick={() => navigate('/journal')}
          >
            Retour au journal
          </Button>
          <div className="flex items-center gap-2">
            <ReadingProgressRing targetRef={articleRef} tone="brand" size={36} />
            <Button
              variant="primary"
              size="sm"
              leadingIcon={<PenLine size={13} />}
              onClick={() => navigate('/journal/new-entry')}
            >
              Nouvelle entrée
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={articleRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section"
      >

        {/* Hero éditorial */}
        <header className="flex flex-col gap-stack">
          {/* Eyebrow chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-primary-100 text-primary-700 text-micro font-bold uppercase tracking-wider">
              <Sparkles size={11} /> Journal de bord
            </span>
            <Badge variant="brand">{ENTRY.category}</Badge>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-ink-100 text-ink-700 text-micro font-semibold">
              {ENTRY.mood} {ENTRY.moodLabel}
            </span>
          </div>

          <h1 className="m-0 font-display text-h1 font-bold text-ink-900 leading-tight tracking-tight">
            {ENTRY.title}
          </h1>

          <div className="pt-stack pb-stack-lg border-b border-ink-100">
            <AuthorStrip
              variant="compact"
              name={ENTRY.author.name}
              role={ENTRY.author.role}
              meta={[
                { icon: <CalendarDays size={12} />, text: ENTRY.date },
                { icon: <Clock3 size={12} />,       text: ENTRY.readTime },
              ]}
            />
          </div>
        </header>

        {/* Sections — 3 KeyFindingCard */}
        <section className="flex flex-col gap-stack">
          {SECTIONS.map((s, i) => (
            <KeyFindingCard
              key={i}
              icon={s.icon}
              tone={s.tone}
              title={s.title}
              description={s.text}
            />
          ))}
        </section>

        {/* Engagements (todos) */}
        <section className="rounded-2xl border border-ink-100 bg-white p-5 sm:p-6 flex flex-col gap-stack">
          <h2 className="m-0 font-display text-body font-bold text-ink-900 flex items-center gap-2 tracking-tight">
            <CheckCircle2 size={16} className="text-primary-600" />
            Engagements pour la semaine prochaine
          </h2>
          <ul className="m-0 p-0 list-none flex flex-col">
            {todos.map((item, i) => (
              <li key={i} className={i < todos.length - 1 ? 'border-b border-ink-100' : ''}>
                <button
                  type="button"
                  onClick={() => toggleTodo(i)}
                  className="w-full flex items-center gap-3 py-3 bg-transparent border-0 cursor-pointer text-left !h-auto !overflow-visible !items-center !font-normal"
                >
                  <span
                    aria-hidden
                    className={[
                      'shrink-0 w-5 h-5 inline-flex items-center justify-center rounded-pill border-2 transition-colors duration-base',
                      item.done
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : 'bg-white border-ink-300',
                    ].join(' ')}
                  >
                    {item.done && <CheckCircle2 size={12} strokeWidth={3} />}
                  </span>
                  <span
                    className={[
                      'font-body text-body-sm',
                      item.done ? 'text-ink-400 line-through' : 'text-ink-800',
                    ].join(' ')}
                  >
                    {item.text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Tags */}
        <div className="flex flex-col gap-stack-xs pt-stack border-t border-ink-100">
          <span className="inline-flex items-center gap-1.5 font-body text-micro font-bold uppercase tracking-wider text-ink-500">
            <TagIcon size={11} /> Tags
          </span>
          <div className="flex flex-wrap gap-2">
            {ENTRY.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-pill bg-ink-50 border border-ink-200 font-body text-micro font-semibold text-ink-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Entry navigation prev/next */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 p-4 rounded-2xl border border-ink-100 bg-white hover:border-ink-200 hover:shadow-sm transition-all duration-base cursor-pointer text-left"
          >
            <ArrowLeft size={16} className="text-ink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-body text-micro font-bold text-ink-500 uppercase tracking-wider mb-1">
                Entrée précédente
              </div>
              <div className="font-body text-body-sm font-semibold text-ink-900 truncate">
                Semaine 13 — Délégation
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => navigate(1)}
            className="flex items-center justify-end gap-3 p-4 rounded-2xl border border-ink-100 bg-white hover:border-ink-200 hover:shadow-sm transition-all duration-base cursor-pointer text-right"
          >
            <div className="flex-1 min-w-0">
              <div className="font-body text-micro font-bold text-ink-500 uppercase tracking-wider mb-1">
                Entrée suivante
              </div>
              <div className="font-body text-body-sm font-semibold text-ink-900 truncate">
                Semaine 15 — Feedback
              </div>
            </div>
            <ArrowRight size={16} className="text-ink-400 shrink-0" />
          </button>
        </div>

        {/* New entry CTA */}
        <section className="rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-stack-lg text-white">
          <div className="flex-1">
            <h3 className="m-0 font-display text-h4 font-bold mb-1">
              Qu'avez-vous appris cette semaine ?
            </h3>
            <p className="m-0 font-body text-body-sm text-white/85">
              Capturez vos observations pendant qu'elles sont fraîches.
            </p>
          </div>
          <Button
            variant="glass-light"
            size="md"
            leadingIcon={<PenLine size={14} />}
            onClick={() => navigate('/journal/new-entry')}
            className="self-start sm:self-center shrink-0"
          >
            Nouvelle entrée
          </Button>
        </section>
      </div>
    </div>
  );
};

export default JournalDetail;
