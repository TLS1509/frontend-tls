/**
 * JournalFreeEntry : interface de saisie libre dans le journal
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJournalStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import type { JournalEntryType, JournalMoodLevel } from '../types/learning';
import { Button } from '../components/core/Button';
import { FilterChip } from '../components/ui/FilterChip';
import { Container } from '../components/layout';
import {
  ArrowLeft,
  PenLine,
  Save,
  Send,
  CalendarDays,
  Lightbulb,
  Target,
  Eye,
  BookOpen,
  Users,
  MessageCircle,
  Zap,
  Smile,
  Frown,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

const CATEGORIES: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: 'leadership',    label: 'Leadership',    icon: <Target size={14} strokeWidth={1.75} /> },
  { id: 'apprentissage', label: 'Apprentissage',  icon: <BookOpen size={14} strokeWidth={1.75} /> },
  { id: 'collaboration', label: 'Collaboration',  icon: <Users size={14} strokeWidth={1.75} /> },
  { id: 'reflexion',     label: 'Réflexion',      icon: <MessageCircle size={14} strokeWidth={1.75} /> },
  { id: 'action',        label: 'Action',         icon: <Zap size={14} strokeWidth={1.75} /> },
];

const MOODS: { icon: React.ReactNode; label: string }[] = [
  { icon: <Lightbulb size={14} strokeWidth={1.75} />, label: 'Inspiré' },
  { icon: <Zap size={14} strokeWidth={1.75} />,       label: 'Motivé' },
  { icon: <HelpCircle size={14} strokeWidth={1.75} />,label: 'En réflexion' },
  { icon: <Smile size={14} strokeWidth={1.75} />,     label: 'Satisfait' },
  { icon: <Frown size={14} strokeWidth={1.75} />,     label: 'Frustré' },
  { icon: <TrendingUp size={14} strokeWidth={1.75} />,label: 'En croissance' },
];

const PROMPTS = [
  { icon: <Eye size={14} />,       label: 'Observation',     hint: "Qu'avez-vous observé cette semaine ?" },
  { icon: <Lightbulb size={14} />, label: 'Prise de recul',  hint: "Qu'est-ce que cela vous apprend ?" },
  { icon: <Target size={14} />,    label: 'Action',          hint: "Que voulez-vous faire différemment ?" },
];

const TIPS = [
  "Une idée reçue aujourd'hui",
  "Un feedback qui m'a surpris",
  "Une action testée et son résultat",
  "Une question encore ouverte",
  "Ce que je veux ne pas oublier",
];

const MOOD_LEVEL_MAP: Record<string, JournalMoodLevel> = {
  'Inspiré': 'happy',
  'Motivé': 'happy',
  'En réflexion': 'neutral',
  'Satisfait': 'happy',
  'Frustré': 'sad',
  'En croissance': 'very-happy',
};

const CATEGORY_TYPE_MAP: Record<string, JournalEntryType> = {
  'leadership': 'pratique-pro',
  'apprentissage': 'apprentissage',
  'collaboration': 'pratique-pro',
  'reflexion': 'reflexion-libre',
  'action': 'moment-eureka',
};

export const JournalFreeEntry: React.FC = () => {
  const navigate = useNavigate();
  const journalStore = useJournalStore();

  const [title, setTitle]                       = useState('');
  const [content, setContent]                   = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMood, setSelectedMood]         = useState<string | null>(null);
  const [tags, setTags]                         = useState<string[]>([]);
  const [tagInput, setTagInput]                 = useState('');

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,$/, '');
      if (newTag && !tags.includes(newTag)) setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const buildAndSaveEntry = () => {
    const now = new Date().toISOString();
    journalStore.addEntry({
      id: `entry-${Date.now()}`,
      userId: MOCK_USER_ID,
      type: (selectedCategory ? CATEGORY_TYPE_MAP[selectedCategory] : undefined) ?? 'reflexion-libre',
      title: title.trim() || 'Entrée sans titre',
      body: content,
      mood: (selectedMood ? MOOD_LEVEL_MAP[selectedMood] : undefined) ?? 'neutral',
      tags,
      // Firewall gamification (2026-07-23) : la réflexion n'est plus rémunérée en XP.
      // Voir docs/product/RAPPORT-COHERENCE-LEARNING-APP.md (incohérence 2).
      xpAwarded: 0,
      createdAt: now,
      updatedAt: now,
    });
    navigate('/journal');
  };

  return (
    <div className="min-h-[100dvh] bg-surface font-body flex flex-col">

      {/* Top bar — à 375 px, le nom de la page cède sa place : « Publier »
          sortait de l'écran (bord droit mesuré à 452 px). La plume remplace
          l'étincelle, réservée aux fonctions d'IA. */}
      <div className="flex items-center justify-between gap-stack-xs px-stack sm:px-section py-stack border-b border-ink-200 sticky top-0 bg-white z-sticky">
        {/* Hiérarchie (arbitrage n°19) : « Publier », toujours visible dans la
            barre collante, est le seul aplat ; Retour et Brouillon sont des
            `ghost` neutres. Les trois boutons étaient en `soft`, dont deux
            orange et un teal : deux tons, aucun niveau. */}
        <div className="flex items-center gap-stack-xs min-w-0">
          <Button
            emphasis="ghost" tone="neutral"
            size="sm"
            leadingIcon={<ArrowLeft size={14} />}
            onClick={() => navigate('/journal')}
          >
            Retour
          </Button>
          <div className="hidden sm:flex items-center gap-stack-xs min-w-0">
            <PenLine size={16} className="text-primary-500 shrink-0" aria-hidden="true" />
            <span className="font-body text-body font-semibold text-ink-900 truncate">Nouvelle entrée libre</span>
          </div>
        </div>
        <div className="flex gap-stack-xs shrink-0">
          <Button emphasis="ghost" tone="neutral" size="sm" leadingIcon={<Save size={14} />}>
            Brouillon
          </Button>
          <Button emphasis="solid" size="sm" leadingIcon={<Send size={14} />} onClick={buildAndSaveEntry}>
            Publier
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <Container width="medium" padding={false} className="flex-1 px-stack sm:px-section py-stack-lg grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-section items-start">

        {/* Main editor — les groupes du formulaire se suivent à 24, le
            libellé est à 8 de son champ. Les libellés étaient des étiquettes
            11 px capitales ink-500 (le registre du Badge, la couleur des
            placeholders) : ce sont des libellés de champ, 16/600 ink-900,
            comme dans l'éditeur principal. */}
        <div className="flex flex-col gap-stack-lg min-w-0">
          {/* La page n'avait aucun h1 : le champ de titre en tient lieu à l'écran. */}
          <h1 className="sr-only font-display text-h1">Nouvelle entrée libre</h1>

          <div className="flex flex-col gap-stack-xs">
            {/* Date */}
            <div className="flex items-center gap-stack-3xs text-ink-600 font-body text-caption">
              <CalendarDays size={14} aria-hidden="true" />
              <span>{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>

            {/* Title input — au pas d'un h2 (28, 700) : il était à 30 px en
                graisse 900, avec un placeholder ink-200 (illisible). */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Titre de l'entrée"
              placeholder="Titre de votre entrée..."
              className="w-full border-0 outline-none font-display text-h2 text-ink-900 bg-transparent h-auto block placeholder:text-ink-500"
            />
          </div>

          {/* Category selector — FilterChip (les puces faites main, en 13/700,
              laissaient les choix inactifs en ink-500). */}
          <div className="flex flex-col gap-stack-xs">
            <div className="font-body text-body font-semibold text-ink-900">
              Catégorie
            </div>
            <div className="flex gap-stack-xs flex-wrap">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <FilterChip
                    key={cat.id}
                    size="sm"
                    label={cat.label}
                    icon={cat.icon}
                    active={active}
                    onClick={() => setSelectedCategory(active ? null : cat.id)}
                  />
                );
              })}
            </div>
          </div>

          {/* Mood selector */}
          <div className="flex flex-col gap-stack-xs">
            <div className="font-body text-body font-semibold text-ink-900">
              Comment vous sentez-vous ?
            </div>
            <div className="flex gap-stack-xs flex-wrap">
              {MOODS.map((mood) => {
                const active = selectedMood === mood.label;
                return (
                  <FilterChip
                    key={mood.label}
                    size="sm"
                    label={mood.label}
                    icon={mood.icon}
                    active={active}
                    onClick={() => setSelectedMood(active ? null : mood.label)}
                  />
                );
              })}
            </div>
          </div>

          <hr className="border-ink-200" />

          {/* Content textarea */}
          <div className="flex flex-col gap-stack-xs">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              aria-label="Contenu de l'entrée"
              placeholder="Commencez à écrire... Qu'avez-vous observé ? Qu'avez-vous appris ? Que voulez-vous faire différemment ?"
              rows={18}
              className="w-full border-0 outline-none resize-none font-body text-body text-ink-900 bg-transparent h-auto block placeholder:text-ink-500"
            />
            <div className="text-right font-body text-caption text-ink-600 tabular-nums">
              {wordCount} mot{wordCount > 1 ? 's' : ''}
            </div>
          </div>

          <hr className="border-ink-200" />

          {/* Tags */}
          <div className="flex flex-col gap-stack-xs">
            <div className="font-body text-body font-semibold text-ink-900">
              Tags
            </div>
            <div className="flex gap-stack-xs flex-wrap items-center">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-stack-3xs px-2.5 py-1 rounded-pill bg-primary-50 text-primary-800 font-body text-caption font-medium border border-primary-200"
                >
                  {tag}
                  <button
                    type="button"
                    aria-label={`Retirer le tag ${tag}`}
                    onClick={() => removeTag(tag)}
                    className="bg-transparent border-0 cursor-pointer text-primary-800 hover:text-primary-900 p-0 text-body focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-400 rounded-sm"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                aria-label="Ajouter un tag"
                placeholder="Ajouter un tag..."
                className="border-0 outline-none font-body text-body text-ink-900 bg-transparent min-w-[120px] h-auto placeholder:text-ink-500"
              />
            </div>
          </div>

          {/* Bottom actions — elles passent à la ligne à 375 px : « Sauvegarder
              en brouillon » sortait de l'écran (bord droit à 459 px). */}
          {/* Le même couple qu'en haut, un cran plus bas : l'aplat reste à
              « Publier » dans la barre collante (un seul par écran). */}
          <div className="flex flex-wrap gap-stack-xs">
            <Button emphasis="soft" leadingIcon={<Send size={14} />} onClick={buildAndSaveEntry}>Publier l'entrée</Button>
            <Button emphasis="ghost" tone="neutral" leadingIcon={<Save size={14} />} onClick={buildAndSaveEntry}>
              Sauvegarder en brouillon
            </Button>
          </div>
        </div>

        {/* Sidebar — deux encarts, rayon de conteneur (20) et padding dense
            (20). Leurs intitulés étaient en 13 px, graisse 800, capitales
            espacées : ce sont des libellés, 16/600, avec leur icône. */}
        <aside className="lg:sticky lg:top-[72px] flex flex-col gap-stack">

          {/* Writing prompts */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-stack-md flex flex-col gap-stack-sm">
            <div className="flex items-center gap-stack-xs">
              <PenLine size={16} className="text-primary-700" aria-hidden="true" />
              <span className="font-body text-body font-semibold text-ink-900">
                Aide à l'écriture
              </span>
            </div>
            <div className="flex flex-col gap-stack-xs">
              {PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setContent(content + (content ? '\n\n' : '') + prompt.hint + '\n')}
                  className="flex items-start gap-stack-xs p-stack-sm rounded-lg border border-primary-100 bg-white cursor-pointer text-left font-body transition-all duration-150 hover:border-primary-300 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  {/* 6 px : l'icône (14) se centre sur la première ligne (26). */}
                  <span className="text-primary-700 shrink-0 mt-1.5" aria-hidden="true">{prompt.icon}</span>
                  <div className="flex flex-col gap-stack-3xs">
                    <div className="font-body text-body font-semibold text-ink-900">
                      {prompt.label}
                    </div>
                    <div className="font-body text-caption text-ink-600">
                      {prompt.hint}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-stack-md flex flex-col gap-stack-sm">
            <div className="flex items-center gap-stack-xs">
              <Lightbulb size={16} className="text-secondary-700" aria-hidden="true" />
              <span className="font-body text-body font-semibold text-ink-900">
                Aide-mémoire
              </span>
            </div>
            <ul className="flex flex-col gap-stack-3xs">
              {TIPS.map((tip, i) => (
                <li key={i} className="flex items-start gap-stack-xs">
                  {/* 10 px : la puce (6) se centre sur la ligne de 26. */}
                  <span className="w-1.5 h-1.5 rounded-pill bg-secondary-400 shrink-0 mt-2.5" aria-hidden="true" />
                  <span className="font-body text-body text-ink-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </aside>
      </Container>
    </div>
  );
};
