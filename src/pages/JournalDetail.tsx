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
import type { JournalEntryType } from '../types/learning';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Tag as TagIcon,
  PenLine,
} from 'lucide-react';
import { HUMEURS } from '../components/ui/MoodSelector';
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { EmptyState } from '../components/ui/EmptyState';
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

/* Humeur : la table du sélecteur de l'éditeur (`HUMEURS`, MoodSelector), pour
   qu'on relise l'humeur qu'on a choisie — une seule source depuis le
   2026-09-24 ; la copie qui vivait ici reproduisait le décalage d'un cran. */

/* Questions structurées : le titre de chaque réponse est celui de la question
   posée dans l'éditeur (EDRA-R ou questions génériques). */
const QUESTION_TITLE: Record<string, string> = Object.fromEntries(
  [...EDRA_R_QUESTIONS, ...GENERIC_STRUCTURED_QUESTIONS].map((q) => [q.id, q.title]),
);

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
            /* Seule issue de l'écran, donc son action principale : l'aplat
               (arbitrage n°19). */
            actions={
              <Button
                emphasis="solid"
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

  const mood = HUMEURS[storeEntry.mood];
  const answers = Object.entries(storeEntry.structuredAnswers ?? {}).filter(
    ([, text]) => text.trim().length > 0,
  );
  const fullText = [storeEntry.body, ...answers.map(([, text]) => text)].join(' ');
  const tags = storeEntry.tags ?? [];

  return (
    <div className="min-h-[100dvh] bg-surface">
      <ReadingProgressBar targetRef={articleRef} tone="brand" />

      {/* Barre collante : une rangée. Elle passait par `PageShell`, dont la base
          porte `flex-col` — les deux groupes s'empilaient dans 56 px de haut, et
          « Retour au journal » sortait par le haut de l'écran. */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100">
        <div className="max-w-medium mx-auto w-full h-14 flex flex-row items-center justify-between gap-stack-xs">
          {/* Retour : tertiaire, `ghost` neutre. « Nouvelle entrée » garde son
              `soft` : l'aplat est l'appel du bas de page (arbitrage n°19). */}
          <Button
            emphasis="ghost"
            tone="neutral"
            size="sm"
            leadingIcon={<ArrowLeft size={14} />}
            onClick={() => navigate('/journal')}
          >
            Retour au journal
          </Button>
          <div className="flex items-center gap-stack-xs">
            {/* À 375 px, l'anneau cède sa place : la rangée faisait 356 px
                pour 343 (la barre de progression, en haut, dit la même chose). */}
            <span className="hidden sm:inline-flex">
              <ReadingProgressRing targetRef={articleRef} tone="brand" size={32} />
            </span>
            <Button
              emphasis="soft"
              size="sm"
              leadingIcon={<PenLine size={14} />}
              onClick={() => navigate('/journal/new-entry')}
            >
              Nouvelle entrée
            </Button>
          </div>
        </div>
      </div>

      {/* Le haut de page est celui de la coque (48 à 1440) : l'en-tête se lit
          avec le texte qu'il ouvre, à 32 en dessous — et non plus à 57, filet
          compris, sous 32 seulement au-dessus. */}
      <PageShell
        ref={articleRef}
        width="medium"
        gap="section"
        className="relative z-base flex-1"
      >

        {/* En-tête de lecture — l'anatomie de `PageHero` : surtitre → 8 → h1
            → 12 → méta. Le h1 était à 16 px de ses pastilles et à 32 de sa
            date, derrière une bande « Vous · Auteur » avec un avatar : le
            gabarit d'un article de blog sur un carnet personnel. La date et
            la durée de lecture restent, en légende. L'étincelle, réservée aux
            fonctions d'IA, quitte la pastille « Journal de bord ». */}
        <header className="flex flex-col">
          <div className="flex items-center gap-stack-xs flex-wrap">
            <MetaPill text="Journal de bord" tone="primary" />
            {/* Le type est une donnée, pas un état : MetaPill (arbitrages n°14-15). */}
            <MetaPill text={TYPE_LABEL[storeEntry.type]} />
            {mood && <MetaPill icon={<mood.Icone />} text={mood.label} />}
          </div>

          <h1 className="mt-stack-xs font-display text-h1 text-ink-900 text-balance">
            {storeEntry.title}
          </h1>

          <p className="mt-stack-sm flex flex-wrap items-center gap-x-stack-sm gap-y-stack-3xs text-caption text-ink-600">
            <span className="inline-flex items-center gap-stack-3xs">
              <CalendarDays size={14} aria-hidden="true" />
              <time dateTime={storeEntry.createdAt}>{formatDate(storeEntry.createdAt)}</time>
            </span>
            <span className="inline-flex items-center gap-stack-3xs">
              <Clock3 size={14} aria-hidden="true" />
              {readingTime(fullText)} de lecture
            </span>
          </p>
        </header>

        {/* Corps de l'entrée : le texte tel que l'apprenant l'a écrit, à la
            largeur de lecture (65 caractères) — il courait sur 1 000 px — et
            en encre principale. Une ligne entre deux paragraphes. */}
        {storeEntry.body.trim().length > 0 && (
          <div className="flex flex-col gap-stack max-w-prose">
            {storeEntry.body.split(/\n{2,}/).map((para, i) => (
              <p key={i} className="font-body text-body text-ink-900 whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>
        )}

        {/* Réponses aux questions structurées : la question, puis la réponse,
            dans le fil du texte. Chacune vivait dans sa propre carte avec une
            pastille ronde — un paragraphe par carte, ce que la doctrine exclut
            (§ 3). La question est l'intitulé de sa réponse (16/600, 4 px) ; la
            réponse, le texte de l'apprenant, reste en encre principale ; 24
            entre deux réponses. */}
        {answers.length > 0 && (
          <dl className="flex flex-col gap-stack-lg max-w-prose">
            {answers.map(([questionId, text]) => (
              <div key={questionId} className="flex flex-col gap-stack-3xs">
                <dt className="font-body text-body font-semibold text-ink-900">
                  {QUESTION_TITLE[questionId] ?? questionId}
                </dt>
                <dd className="font-body text-body text-ink-900 whitespace-pre-line">{text}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-col gap-stack-xs pt-stack border-t border-ink-100">
            <span className="inline-flex items-center gap-stack-3xs font-body text-caption font-semibold text-ink-600">
              <TagIcon size={14} aria-hidden="true" /> Tags
            </span>
            <MetaPillGroup items={tags.map((tag) => ({ text: tag }))} />
          </div>
        )}

        {/* Entry navigation prev/next — le sens (« Entrée précédente ») est une
            légende 13 : il était en étiquette 11 capitales ink-500, le registre
            des seuls Badge. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-xs">
          {prevEntry ? (
            <button
              type="button"
              onClick={() => navigate(`/journal/detail/${prevEntry.id}`)}
              className={`flex items-center gap-stack-xs p-stack rounded-lg border border-ink-100 bg-white ${CARD_HOVER_NEUTRE} transition-colors duration-base cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500`}
            >
              <ArrowLeft size={16} className="text-ink-600 shrink-0" />
              <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                <div className="font-body text-caption text-ink-600">
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
              <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                <div className="font-body text-caption text-ink-600">
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

        {/* New entry CTA — un encart d'appel, pas une section du texte : son
            intitulé garde la taille d'un titre de bloc (20) sans entrer dans le
            plan de la page (il sautait du h1 au h3). Titre → phrase 4. */}
        <aside aria-label="Nouvelle entrée" className="rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 p-stack-lg sm:p-section flex flex-col sm:flex-row sm:items-center gap-stack-lg text-white">
          <div className="flex-1 flex flex-col gap-stack-3xs">
            <p className="font-display text-h3 text-white text-balance">
              Qu'avez-vous appris cette semaine ?
            </p>
            <p className="font-body text-body text-white max-w-prose">
              Capturez vos observations pendant qu'elles sont fraîches.
            </p>
          </div>
          {/* L'action principale de la page, sur un fond au cran 700 : l'aplat
              `onDark`, verre clair à encre foncée (arbitrage n°19). Le `soft`
              neutre est la pastille des cartes teintées claires, pas celle
              d'un fond sombre. */}
          <Button
            emphasis="solid" onDark
            size="md"
            leadingIcon={<PenLine size={14} />}
            onClick={() => navigate('/journal/new-entry')}
            className="self-start sm:self-center shrink-0"
          >
            Nouvelle entrée
          </Button>
        </aside>
      </PageShell>
    </div>
  );
};

export default JournalDetail;
