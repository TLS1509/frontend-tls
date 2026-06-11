/**
 * JournalNewEntry Page
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MoodSelector } from '../components/ui/MoodSelector';
import type { MoodLevel } from '../components/ui/MoodSelector';
import { JournalTypeTile, JOURNAL_TYPE_ORDER } from '../components/cards/JournalTypeTile';
import { StructuredQuestionAccordion } from '../components/ui/StructuredQuestionAccordion';
import { useToastContext } from '../contexts/ToastContext';
import { useJournalStore, useGamificationStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { EDRA_R_QUESTIONS, GENERIC_STRUCTURED_QUESTIONS } from '../data/journal';
import type { JournalEntryType } from '../types/learning';
import {
  ArrowLeft,
  Sparkles,
  Wand2,
  Save,
  Clock,
  CheckCheck,
} from 'lucide-react';

/** Backward-compat re-export so any consumers using `EntryType` still compile. */
export type EntryType = JournalEntryType;
export type { MoodLevel };

/** Valid entry types accepted via `?type=...` URL param. */
const VALID_URL_TYPES = new Set<JournalEntryType>(JOURNAL_TYPE_ORDER);

/** Writing-area config : question prompt + textarea placeholder + bg per type. */
interface WritingConfig {
  questionClass: string;
  writingBg: string;
  question: string;
  bodyPlaceholder: string;
}

const WRITING_CONFIG: Record<JournalEntryType, WritingConfig> = {
  'reflexion-libre': {
    questionClass: 'text-primary-600',
    writingBg: '',
    question: "Qu'est-ce qui occupe mon esprit aujourd'hui ?",
    bodyPlaceholder: 'Écrivez librement vos pensées, réflexions, découvertes du jour...',
  },
  'apprentissage': {
    questionClass: 'text-primary-600',
    writingBg: 'bg-gradient-to-br from-white to-primary-50',
    question: 'Quelle idée vais-je retenir de ma dernière leçon : et pourquoi ?',
    bodyPlaceholder: "Décris ce que tu as découvert, compris ou expérimenté dans tes leçons / parcours / projets / lectures veille...",
  },
  'pratique-pro': {
    questionClass: 'text-secondary-600',
    writingBg: 'bg-gradient-to-br from-white to-secondary-50',
    question: 'Comment vais-je activer cet apprentissage dans mon travail cette semaine ?',
    bodyPlaceholder: 'Note les actions concrètes, les changements de posture, les expérimentations à mener avec ton équipe...',
  },
  'session-coaching': {
    questionClass: 'text-accent-700',
    writingBg: 'bg-gradient-to-br from-white to-accent-50',
    question: 'Quelle question veux-tu apporter à ta prochaine session ?',
    bodyPlaceholder: 'Prépare ta prochaine session OU note ce que tu retiens de la dernière : prises de conscience, actions à mener, objectifs clarifiés...',
  },
  'moment-eureka': {
    questionClass: 'text-primary-600',
    writingBg: '',
    question: "Quelle idée m'a illuminé ?",
    bodyPlaceholder: "Capturez cette idée brillante avant qu'elle ne s'envole...",
  },
};

const TODAY = new Date().toLocaleDateString('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

export const JournalNewEntry: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const journalStore = useJournalStore();
  const gamifStore = useGamificationStore();

  // Pre-select entry type from URL `?type=...` (used when navigating from Dashboard JournalPromptCards)
  const initialType = useMemo<JournalEntryType>(() => {
    const urlType = searchParams.get('type') as JournalEntryType | null;
    return urlType && VALID_URL_TYPES.has(urlType) ? urlType : 'reflexion-libre';
  }, [searchParams]);

  // Item↔Journal link (Cahier #07) : linkedItemId from URL `?itemId=...`
  const linkedItemId = searchParams.get('itemId') ?? undefined;
  const linkedCompetenceId = searchParams.get('competenceId') ?? undefined;

  const [selectedType, setSelectedType] = useState<JournalEntryType>(initialType);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState<MoodLevel>('neutral');
  const [structuredAnswers, setStructuredAnswers] = useState<Record<string, string>>({});
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const autoSaveTimeoutRef = useRef<number | undefined>(undefined);
  const hasContentRef = useRef(false);

  // EDRA-R template for apprentissage/pratique-pro (Cahier #07 § Template EDRA-R)
  const activeQuestions = (selectedType === 'apprentissage' || selectedType === 'pratique-pro')
    ? EDRA_R_QUESTIONS
    : GENERIC_STRUCTURED_QUESTIONS;

  const wordCount = useMemo(() => {
    const text = `${title} ${body}`.trim();
    if (!text) return 0;
    return text.split(/\s+/).filter(Boolean).length;
  }, [title, body]);

  const cfg = WRITING_CONFIG[selectedType];
  const isDraft = title.trim() || body.trim();

  // Auto-save logic with 30s debounce
  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    if (isDraft) {
      hasContentRef.current = true;
      setAutoSaveStatus('saving');

      autoSaveTimeoutRef.current = setTimeout(() => {
        // Simulate save (in real app, would call an API)
        setAutoSaveStatus('saved');
        // Clear "saved" indicator after 2s
        setTimeout(() => setAutoSaveStatus('idle'), 2000);
      }, 3000); // 30s debounce
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [title, body, mood, structuredAnswers, isDraft]);

  const toast = useToastContext();
  const handlePublish = () => {
    if (!title.trim() && !body.trim()) {
      toast.warning('Ajoutez un titre ou du contenu avant de publier', 'Brouillon vide');
      return;
    }
    const now = new Date().toISOString();
    const entry = {
      id: `j-${Date.now()}`,
      userId: MOCK_USER_ID,
      type: selectedType,
      title: title.trim() || 'Sans titre',
      body: body.trim(),
      mood,
      structuredAnswers: Object.keys(structuredAnswers).length > 0 ? structuredAnswers : undefined,
      linkedItemId,
      linkedCompetenceId,
      xpAwarded: 20,
      tags: [] as string[],
      createdAt: now,
      updatedAt: now,
    };
    journalStore.addEntry(entry);
    gamifStore.addXPEvent({
      id: `xp-journal-${Date.now()}`,
      userId: MOCK_USER_ID,
      trigger: 'journal_entry',
      xp: 20,
      description: `Entrée journal réflexif : ${entry.title}`,
      occurredAt: now,
    });
    toast.success('Votre entrée a été publiée dans votre journal', 'Entrée enregistrée');
    setTimeout(() => navigate('/journal'), 800);
  };

  return (
    <div className="min-h-screen bg-surface font-body flex flex-col">

      {/* Top bar */}
      <header className="flex items-center px-6 py-4 border-b border-ink-200 bg-white sticky top-0 z-sticky gap-3">
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          aria-label="Retour au journal"
          onClick={() => navigate('/journal')}
          className="shrink-0"
        >
          <ArrowLeft size={20} />
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="font-body text-body font-bold text-ink-900 leading-tight">Nouvelle entrée</div>
            {isDraft && <Badge variant="sun" size="sm">Brouillon</Badge>}
          </div>
          <div className="flex items-center gap-1 text-ink-500 font-body text-caption">
            <Clock size={12} />
            {TODAY}
          </div>
        </div>

        <span className="font-body text-caption text-ink-500 font-medium shrink-0">
          {wordCount} mot{wordCount !== 1 ? 's' : ''}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          {autoSaveStatus === 'saving' && (
            <span className="text-caption text-ink-400 font-medium">Sauvegarde...</span>
          )}
          {autoSaveStatus === 'saved' && (
            <div className="flex items-center gap-1 text-caption text-success-base font-medium">
              <CheckCheck size={14} />
              Enregistré
            </div>
          )}
          <Button leadingIcon={<Save size={15} />} size="sm" onClick={handlePublish}>
            Publier
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-8">

        {/* Type selector */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Wand2 size={16} className="text-primary-500" />
            <span className="font-body text-body-sm font-semibold text-ink-900">Type d'entrée</span>
          </div>

          <div className="grid grid-cols-4 gap-3 max-sm:grid-cols-2">
            {JOURNAL_TYPE_ORDER.map((type) => (
              <JournalTypeTile
                key={type}
                type={type}
                selected={selectedType === type}
                onClick={() => setSelectedType(type)}
              />
            ))}
          </div>
        </div>

        {/* Mood selector */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl" aria-hidden="true">🎭</span>
            <span className="font-body text-body-sm font-semibold text-ink-900">Comment vous sentez-vous ?</span>
          </div>
          <MoodSelector value={mood} onChange={setMood} />
        </div>

        {/* Inspiration button */}
        <div className="mb-8">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-secondary-50 border border-secondary-200 text-secondary-600 font-body text-body-sm font-semibold cursor-pointer hover:bg-secondary-100 transition-colors"
          >
            <Sparkles size={15} />
            Besoin d'inspiration ?
          </button>
        </div>

        {/* Structured questions (collapsible) */}
        <div className="mb-8">
          <StructuredQuestionAccordion
            questions={activeQuestions}
            answers={structuredAnswers}
            onChange={setStructuredAnswers}
            label={
              selectedType === 'apprentissage' || selectedType === 'pratique-pro'
                ? 'Template EDRA-R (optionnel)'
                : 'Questions structurantes (optionnel)'
            }
          />
        </div>

        {/* Writing area */}
        <div className={`border border-ink-200 rounded-2xl p-7 shadow-sm ${cfg.writingBg || 'bg-white'}`}>

          {/* Reflection question */}
          <div className="mb-6">
            <p className="m-0 mb-1 font-body text-caption text-ink-500 font-medium">
              Question de réflexion
            </p>
            <p className={`m-0 font-body text-body font-semibold leading-snug ${cfg.questionClass}`}>
              {cfg.question}
            </p>
          </div>

          <hr className="border-ink-200 mb-5" />

          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Donnez un titre à votre entrée..."
            className="w-full border-0 outline-none bg-transparent text-2xl font-semibold text-ink-900 font-body mb-3 h-auto block placeholder:text-ink-300"
          />

          <hr className="border-ink-200 mb-5" />

          {/* Body textarea */}
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={cfg.bodyPlaceholder}
            rows={12}
            className="w-full border-0 outline-none bg-transparent font-body text-body text-ink-900 leading-relaxed resize-none h-auto block placeholder:text-ink-300"
          />
        </div>
      </main>
    </div>
  );
};
