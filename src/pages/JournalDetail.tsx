/**
 * JournalDetail: Phase 10 Tier 2 polish.
 *
 * Vue complète d'une entrée de journal: pattern article éditorial.
 *
 * Structure :
 *  1. ReadingProgressBar + sticky glass header (back + ring + new entry)
 *  2. Breadcrumb + hero compact (eyebrow + h1 + AuthorStrip avec date/readTime)
 *  3. Corps de l'entrée (le texte écrit par l'apprenant)
 *  4. Une KeyFindingCard par réponse structurée (EDRA-R ou génériques), s'il y en a
 *  5. Tags
 *  7. Entry navigation prev/next
 *  8. New entry CTA brand gradient
 */

import React, { useRef, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJournalStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { EDRA_R_QUESTIONS, GENERIC_STRUCTURED_QUESTIONS } from '../data/journal';
import { JOURNAL_TYPES } from '../lib/journal-types';
import type { JournalEntryType, JournalMoodLevel } from '../types/learning';
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
  Frown,
  Meh,
  Smile,
  SmilePlus,
  Laugh,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { KeyFindingCard, type KeyFindingTone } from '../components/patterns/KeyFindingCard';
import { EmptyState } from '../components/ui/EmptyState';
import { AuthorStrip } from '../components/patterns/AuthorStrip';
import { PageShell } from '../components/layout';
import {
  ReadingProgressBar,
  ReadingProgressRing,
} from '../components/patterns/ReadingProgress';
import { CARD_HOVER_NEUTRE } from '../lib/tone-classes';

/* ─── Data ───────────────────────────────────────────────────────────────── */

/* Tout ce que la page affiche vient de l'entrée du store. Avant le 2026-09-24,
   seuls le titre et les tags en venaient : le corps, les sections, la date,
   l'humeur, la catégorie et une liste d'engagements étaient des constantes, si
   bien que « Échec sur le pitch produit » s'affichait avec le texte d'une autre
   entrée — et avec des engagements que l'apprenant n'avait jamais écrits. */

/* Libellé du type : le vocabulaire de la liste du journal (`lib/journal-types`),
   pour que la pastille soit celle de la carte sur laquelle on vient de cliquer.
   Même correspondance que `SPEC_TO_DISPLAY` dans Journal.tsx. */
const TYPE_LABEL: Record<JournalEntryType, string> = {
  'reflexion-libre':  JOURNAL_TYPES.free.label,
  'apprentissage':    JOURNAL_TYPES.learning.label,
  'pratique-pro':     JOURNAL_TYPES.guided.label,
  'session-coaching': JOURNAL_TYPES.coaching.label,
  'moment-eureka':    JOURNAL_TYPES.insight.label,
};

/* Humeur : mêmes libellés et mêmes glyphes que le sélecteur de l'éditeur
   (`MoodSelector`), pour qu'on relise l'humeur qu'on a choisie. */
const MOOD: Record<JournalMoodLevel, { label: string; icon: React.ReactNode }> = {
  'very-sad':   { label: 'Difficile', icon: <Frown /> },
  'sad':        { label: 'Neutre',    icon: <Meh /> },
  'neutral':    { label: 'Bien',      icon: <Smile /> },
  'happy':      { label: 'Très bien', icon: <SmilePlus /> },
  'very-happy': { label: 'Excellent', icon: <Laugh /> },
};

/* Questions structurées : le titre de chaque réponse est celui de la question
   posée dans l'éditeur (EDRA-R ou questions génériques). */
const QUESTION_TITLE: Record<string, string> = Object.fromEntries(
  [...EDRA_R_QUESTIONS, ...GENERIC_STRUCTURED_QUESTIONS].map((q) => [q.id, q.title]),
);

const ANSWER_STYLE: Record<string, { icon: React.ReactNode; tone: KeyFindingTone }> = {
  experience:  { icon: <Eye size={20} />,          tone: 'brand' },
  description: { icon: <Eye size={20} />,          tone: 'brand' },
  reflexion:   { icon: <Lightbulb size={20} />,    tone: 'warm' },
  action:      { icon: <Target size={20} />,       tone: 'success' },
  resultat:    { icon: <CheckCircle2 size={20} />, tone: 'success' },
  learning:    { icon: <Lightbulb size={20} />,    tone: 'brand' },
  challenges:  { icon: <Eye size={20} />,          tone: 'warm' },
  application: { icon: <Target size={20} />,       tone: 'success' },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

/* Même calcul que la carte de la liste (Journal.tsx). */
const readingTime = (text: string) =>
  `${Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200))} min`;

/* ─── Component ──────────────────────────────────────────────────────────── */

export const JournalDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const journalStore = useJournalStore();
  const articleRef = useRef<HTMLDivElement>(null);

  // L'entrée affichée : celle de l'URL, sinon la plus récente.
  const storeEntry = useMemo(() => {
    const entries = journalStore.getEntries(MOCK_USER_ID);
    return id ? entries.find((e) => e.id === id) : entries[0];
  }, [id, journalStore.entries]);

  const { prevEntry, nextEntry } = useMemo(() => {
    const allEntries = journalStore.getEntries(MOCK_USER_ID);
    const currentIndex = allEntries.findIndex((e) => e.id === (id ?? allEntries[0]?.id));
    return {
      prevEntry: currentIndex > 0 ? allEntries[currentIndex - 1] : null,
      nextEntry: currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null,
    };
  }, [id, journalStore.entries]);

  if (!storeEntry) {
    return (
      <div className="min-h-[100dvh] bg-surface">
        <PageShell width="medium" className="py-section">
          <EmptyState
            icon={<PenLine size={32} />}
            title="Cette entrée n'existe plus"
            description="Elle a peut-être été supprimée, ou le lien est incomplet. Ton journal, lui, est intact."
            actions={
              <Button
                emphasis="outline"
                size="md"
                leadingIcon={<ArrowLeft size={14} />}
                onClick={() => navigate('/journal')}
              >
                Retour au journal
              </Button>
            }
          />
        </PageShell>
      </div>
    );
  }

  const mood = MOOD[storeEntry.mood];
  const answers = Object.entries(storeEntry.structuredAnswers ?? {}).filter(
    ([, text]) => text.trim().length > 0,
  );
  const fullText = [storeEntry.body, ...answers.map(([, text]) => text)].join(' ');
  const tags = storeEntry.tags ?? [];

  return (
    <div className="min-h-[100dvh] bg-surface">
      <ReadingProgressBar targetRef={articleRef} tone="brand" />

      {/* Sticky glass header */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100">
        <PageShell width="medium" className="h-14 flex items-center justify-between gap-stack-xs" noPadTop>
          <Button
            emphasis="outline"
            size="sm"
            leadingIcon={<ArrowLeft size={14} />}
            onClick={() => navigate('/journal')}
          >
            Retour au journal
          </Button>
          <div className="flex items-center gap-stack-xs">
            <ReadingProgressRing targetRef={articleRef} tone="brand" size={32} />
            <Button
              emphasis="soft"
              size="sm"
              leadingIcon={<PenLine size={14} />}
              onClick={() => navigate('/journal/new-entry')}
            >
              Nouvelle entrée
            </Button>
          </div>
        </PageShell>
      </div>

      <PageShell
        ref={articleRef}
        width="medium"
        className="relative z-base py-section gap-section flex-1"
        noPadTop
      >

        {/* Hero éditorial */}
        <header className="flex flex-col gap-stack">
          {/* Eyebrow chips */}
          <div className="flex items-center gap-stack-xs flex-wrap">
            <MetaPill icon={<Sparkles />} text="Journal de bord" tone="primary" />
            {/* Le type est une donnée, pas un état : MetaPill (arbitrages n°14-15). */}
            <MetaPill text={TYPE_LABEL[storeEntry.type]} />
            {mood && <MetaPill icon={mood.icon} text={mood.label} />}
          </div>

          <h1 className="font-display text-h1 font-bold text-ink-900 tracking-tight">
            {storeEntry.title}
          </h1>

          <div className="pt-stack pb-stack-lg border-b border-ink-100">
            <AuthorStrip
              variant="compact"
              name="Vous"
              role="Auteur"
              meta={[
                { icon: <CalendarDays size={14} />, text: formatDate(storeEntry.createdAt) },
                { icon: <Clock3 size={14} />,       text: readingTime(fullText) },
              ]}
            />
          </div>
        </header>

        {/* Corps de l'entrée : le texte tel que l'apprenant l'a écrit */}
        {storeEntry.body.trim().length > 0 && (
          <div className="flex flex-col gap-stack">
            {storeEntry.body.split(/\n{2,}/).map((para, i) => (
              <p key={i} className="font-body text-body text-ink-800 whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>
        )}

        {/* Réponses aux questions structurées, s'il y en a */}
        {answers.length > 0 && (
          <section className="flex flex-col gap-stack">
            {answers.map(([questionId, text]) => {
              const style = ANSWER_STYLE[questionId] ?? { icon: <PenLine size={20} />, tone: 'neutral' as const };
              return (
                <KeyFindingCard
                  key={questionId}
                  icon={style.icon}
                  tone={style.tone}
                  title={QUESTION_TITLE[questionId] ?? questionId}
                  description={text}
                />
              );
            })}
          </section>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-col gap-stack-xs pt-stack border-t border-ink-100">
            <span className="inline-flex items-center gap-stack-2xs font-body text-caption font-medium text-ink-500">
              <TagIcon size={14} /> Tags
            </span>
            <MetaPillGroup items={tags.map((tag) => ({ text: tag }))} />
          </div>
        )}

        {/* Entry navigation prev/next */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-xs">
          {prevEntry ? (
            <button
              type="button"
              onClick={() => navigate(`/journal/detail/${prevEntry.id}`)}
              className={`flex items-center gap-stack-xs p-stack rounded-lg border border-ink-100 bg-white ${CARD_HOVER_NEUTRE} transition-colors duration-base cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500`}
            >
              <ArrowLeft size={16} className="text-ink-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-body text-micro font-bold text-ink-500 uppercase tracking-wider mb-1">
                  Entrée précédente
                </div>
                <div className="font-body text-body font-semibold text-ink-900 truncate">
                  {prevEntry.title}
                </div>
              </div>
            </button>
          ) : <div />}
          {nextEntry ? (
            <button
              type="button"
              onClick={() => navigate(`/journal/detail/${nextEntry.id}`)}
              className={`flex items-center justify-end gap-stack-xs p-stack rounded-lg border border-ink-100 bg-white ${CARD_HOVER_NEUTRE} transition-colors duration-base cursor-pointer text-right focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500`}
            >
              <div className="flex-1 min-w-0">
                <div className="font-body text-micro font-bold text-ink-500 uppercase tracking-wider mb-1">
                  Entrée suivante
                </div>
                <div className="font-body text-body font-semibold text-ink-900 truncate">
                  {nextEntry.title}
                </div>
              </div>
              <ArrowRight size={16} className="text-ink-600 shrink-0" />
            </button>
          ) : <div />}
        </div>

        {/* New entry CTA */}
        <section className="rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 p-stack-lg sm:p-section flex flex-col sm:flex-row sm:items-center gap-stack-lg text-white">
          <div className="flex-1">
            <h3 className="font-display text-h3 font-bold mb-1">
              Qu'avez-vous appris cette semaine ?
            </h3>
            <p className="m-0 font-body text-body text-white">
              Capturez vos observations pendant qu'elles sont fraîches.
            </p>
          </div>
          <Button
            emphasis="soft" tone="neutral"
            size="md"
            leadingIcon={<PenLine size={14} />}
            onClick={() => navigate('/journal/new-entry')}
            className="self-start sm:self-center shrink-0"
          >
            Nouvelle entrée
          </Button>
        </section>
      </PageShell>
    </div>
  );
};

export default JournalDetail;
