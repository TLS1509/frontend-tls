/**
 * JournalNewEntry Page
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { useToastContext } from '../contexts/ToastContext';
import { useJournalStore, useGamificationStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { EDRA_R_QUESTIONS, GENERIC_STRUCTURED_QUESTIONS } from '../data/journal';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Briefcase,
  Target,
  Lightbulb,
  CheckCircle2,
  Wand2,
  Save,
  Clock,
  ChevronDown,
  CheckCheck,
  Smile,
} from 'lucide-react';
import { MoodSelector } from '../components/ui/MoodSelector';

export type EntryType =
  | 'reflexion-libre'
  | 'apprentissage'
  | 'pratique-pro'
  | 'session-coaching'
  | 'moment-eureka';

export type MoodLevel = 'very-sad' | 'sad' | 'neutral' | 'happy' | 'very-happy';


interface TypeConfig {
  label: string;
  icon: React.ReactNode;
  iconSelected: string;
  borderSelected: string;
  checkBg: string;
  questionClass: string;
  writingBg: string;
  question: string;
  bodyPlaceholder: string;
}

const TYPE_CONFIG: Record<EntryType, TypeConfig> = {
  'reflexion-libre': {
    label: 'Réflexion Libre',
    icon: <Sparkles size={28} strokeWidth={1.5} />,
    iconSelected: 'text-primary-500',
    borderSelected: 'border-primary-500',
    checkBg: 'bg-primary-500',
    questionClass: 'text-primary-600',
    writingBg: '',
    question: "Qu'est-ce qui occupe mon esprit aujourd'hui ?",
    bodyPlaceholder: 'Écrivez librement vos pensées, réflexions, découvertes du jour...',
  },
  'apprentissage': {
    label: 'Apprentissage',
    icon: <BookOpen size={28} strokeWidth={1.5} />,
    iconSelected: 'text-primary-500',
    borderSelected: 'border-primary-500',
    checkBg: 'bg-primary-500',
    questionClass: 'text-primary-600',
    writingBg: 'bg-gradient-to-br from-white to-primary-50',
    question: 'Quelle idée vais-je retenir de ma dernière leçon — et pourquoi ?',
    bodyPlaceholder: "Décris ce que tu as découvert, compris ou expérimenté dans tes leçons / parcours / projets / lectures veille...",
  },
  'pratique-pro': {
    label: 'Pratique pro',
    icon: <Briefcase size={28} strokeWidth={1.5} />,
    iconSelected: 'text-secondary-500',
    borderSelected: 'border-secondary-500',
    checkBg: 'bg-secondary-500',
    questionClass: 'text-secondary-600',
    writingBg: 'bg-gradient-to-br from-white to-secondary-50',
    question: 'Comment vais-je activer cet apprentissage dans mon travail cette semaine ?',
    bodyPlaceholder: 'Note les actions concrètes, les changements de posture, les expérimentations à mener avec ton équipe...',
  },
  'session-coaching': {
    label: 'Coaching',
    icon: <Target size={28} strokeWidth={1.5} />,
    iconSelected: 'text-accent-700',
    borderSelected: 'border-accent-500',
    checkBg: 'bg-accent-500',
    questionClass: 'text-accent-700',
    writingBg: 'bg-gradient-to-br from-white to-accent-50',
    question: 'Quelle question veux-tu apporter à ta prochaine session ?',
    bodyPlaceholder: 'Prépare ta prochaine session OU note ce que tu retiens de la dernière : prises de conscience, actions à mener, objectifs clarifiés...',
  },
  'moment-eureka': {
    label: 'Moment Eurêka',
    icon: <Lightbulb size={28} strokeWidth={1.5} />,
    iconSelected: 'text-primary-500',
    borderSelected: 'border-primary-500',
    checkBg: 'bg-primary-500',
    questionClass: 'text-primary-600',
    writingBg: '',
    question: "Quelle idée m'a illuminé ?",
    bodyPlaceholder: "Capturez cette idée brillante avant qu'elle ne s'envole...",
  },
};

const TYPE_ORDER: EntryType[] = [
  'reflexion-libre',
  'apprentissage',
  'pratique-pro',
  'session-coaching',
  'moment-eureka',
];

/** Valid entry types accepted via `?type=...` URL param. */
const VALID_URL_TYPES = new Set<EntryType>(TYPE_ORDER);

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
  const initialType = useMemo<EntryType>(() => {
    const urlType = searchParams.get('type') as EntryType | null;
    return urlType && VALID_URL_TYPES.has(urlType) ? urlType : 'reflexion-libre';
  }, [searchParams]);

  // Item↔Journal link (Cahier #07) — linkedItemId from URL `?itemId=...`
  const linkedItemId = searchParams.get('itemId') ?? undefined;
  const linkedCompetenceId = searchParams.get('competenceId') ?? undefined;

  const [selectedType, setSelectedType] = useState<EntryType>(initialType);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState<MoodLevel>('neutral');
  const [structuredAnswers, setStructuredAnswers] = useState<Record<string, string>>({});
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
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

  const cfg = TYPE_CONFIG[selectedType];
  const isDraft = title.trim() || body.trim();

  // Auto-save: triggers 3s after last keystroke (debounce)
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
      }, 3000);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [title, body, mood, structuredAnswers, isDraft]);

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

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
      description: `Entrée journal réflexif — ${entry.title}`,
      occurredAt: now,
    });
    toast.success('Votre entrée a été publiée dans votre journal', 'Entrée enregistrée');
    setTimeout(() => navigate('/journal'), 800);
  };

  return (
    <div className="min-h-[100dvh] bg-surface font-body flex flex-col">

      {/* Top bar */}
      <header className="flex items-center px-4 sm:px-6 py-4 border-b border-ink-200 bg-white sticky top-0 z-sticky gap-3">
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
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">

        {/* Type selector */}
        <div className="mb-stack-lg">
          <div className="flex items-center gap-stack-xs mb-stack">
            <Wand2 size={16} className="text-primary-500" />
            <span className="font-body text-body-sm font-semibold text-ink-900">Type d'entrée</span>
          </div>

          <div className="grid grid-cols-4 gap-stack max-sm:grid-cols-2">
            {TYPE_ORDER.map((type) => {
              const tc = TYPE_CONFIG[type];
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedType(type)}
                  className={[
                    'flex flex-col items-start gap-3 p-4 rounded-xl bg-white border cursor-pointer relative transition-all duration-200 text-left font-body focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    isSelected
                      ? `${tc.borderSelected} shadow-sm`
                      : 'border-ink-200 shadow-xs hover:border-ink-400',
                  ].join(' ')}
                >
                  {isSelected && (
                    <div className={`absolute top-2.5 right-2.5 w-[22px] h-[22px] rounded-full ${tc.checkBg} flex items-center justify-center`}>
                      <CheckCircle2 size={14} className="text-white" strokeWidth={2.5} />
                    </div>
                  )}

                  <span className={isSelected ? tc.iconSelected : 'text-ink-400'}>
                    {tc.icon}
                  </span>

                  <span className={`font-body text-body-sm leading-snug ${isSelected ? 'font-semibold text-ink-900' : 'font-medium text-ink-500'}`}>
                    {tc.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mood selector — uses DS MoodSelector (aria-pressed, min-h-touch built in) */}
        <div className="mb-section">
          <div className="flex items-center gap-stack-xs mb-stack">
            <Smile size={18} className="text-primary-500" />
            <span className="font-body text-body-sm font-semibold text-ink-900">Comment vous sentez-vous ?</span>
          </div>
          <MoodSelector value={mood} onChange={setMood} />
        </div>

        {/* Inspiration button */}
        <div className="mb-section">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-secondary-50 border border-secondary-200 text-secondary-600 font-body text-body-sm font-semibold cursor-pointer hover:bg-secondary-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
          >
            <Sparkles size={15} />
            Besoin d'inspiration ?
          </button>
        </div>

        {/* Structured questions (collapsible) */}
        <div className="mb-section">
          <div className="flex items-center gap-stack-xs mb-stack">
            <Lightbulb size={18} className="text-primary-500" />
            <span className="font-body text-body-sm font-semibold text-ink-900">
              {selectedType === 'apprentissage' || selectedType === 'pratique-pro'
                ? 'Template EDRA-R (optionnel)'
                : 'Questions structurantes (optionnel)'}
            </span>
          </div>

          <div className="flex flex-col gap-stack-xs">
            {activeQuestions.map((q) => {
              const isExpanded = expandedQuestions.has(q.id);
              return (
                <div key={q.id} className="border border-ink-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleQuestion(q.id)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white hover:bg-ink-50 transition-colors text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-body-sm font-semibold text-ink-900">{q.title}</p>
                      {!isExpanded && <p className="text-caption text-ink-500">{q.description}</p>}
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-ink-400 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-4 py-4 bg-ink-50 border-t border-ink-200">
                      <p className="text-caption text-ink-600 mb-3">{q.description}</p>
                      <textarea
                        value={structuredAnswers[q.id] || ''}
                        onChange={(e) => setStructuredAnswers({ ...structuredAnswers, [q.id]: e.target.value })}
                        placeholder={q.placeholder}
                        rows={4}
                        className="w-full border border-ink-200 rounded-lg p-3 font-body text-body text-ink-900 placeholder:text-ink-400 resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-transparent"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
