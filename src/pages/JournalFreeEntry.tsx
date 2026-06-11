/**
 * JournalFreeEntry : interface de saisie libre dans le journal
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Container } from '../components/layout';
import {
  ArrowLeft,
  PenLine,
  Save,
  Send,
  CalendarDays,
  Sparkles,
  Lightbulb,
  Target,
  Eye,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'leadership',    label: 'Leadership',    icon: '🎯' },
  { id: 'apprentissage', label: 'Apprentissage',  icon: '📚' },
  { id: 'collaboration', label: 'Collaboration',  icon: '🤝' },
  { id: 'reflexion',     label: 'Réflexion',      icon: '💭' },
  { id: 'action',        label: 'Action',         icon: '⚡' },
];

const MOODS = [
  { emoji: '💡', label: 'Inspiré' },
  { emoji: '💪', label: 'Motivé' },
  { emoji: '🤔', label: 'En réflexion' },
  { emoji: '😊', label: 'Satisfait' },
  { emoji: '😤', label: 'Frustré' },
  { emoji: '🌱', label: 'En croissance' },
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

export const JournalFreeEntry: React.FC = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-surface font-body flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-ink-200 sticky top-0 bg-white z-sticky">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            leadingIcon={<ArrowLeft size={14} />}
            onClick={() => navigate('/journal')}
          >
            Retour
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-primary-500" />
            <span className="font-body text-body font-bold text-ink-900">Nouvelle entrée libre</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" leadingIcon={<Save size={14} />}>
            Brouillon
          </Button>
          <Button size="sm" leadingIcon={<Send size={14} />}>
            Publier
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <Container width="medium" padding={false} className="flex-1 px-8 py-6 grid grid-cols-[1fr_280px] gap-section items-start">

        {/* Main editor */}
        <div>
          {/* Date chip */}
          <div className="flex items-center gap-1.5 mb-4 text-ink-500 font-body text-body-sm">
            <CalendarDays size={14} />
            <span>1 mai 2026</span>
          </div>

          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de votre entrée..."
            className="w-full border-0 outline-none text-3xl font-black text-ink-900 font-display bg-transparent mb-5 tracking-tight h-auto block placeholder:text-ink-200"
          />

          {/* Category selector */}
          <div className="mb-4">
            <div className="font-body text-micro font-bold text-ink-500 uppercase tracking-widest mb-2">
              Catégorie
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(active ? null : cat.id)}
                    className={[
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill border cursor-pointer font-body text-caption font-semibold transition-all duration-150',
                      active
                        ? 'border-primary-400 bg-primary-50 text-primary-700'
                        : 'border-ink-200 bg-transparent text-ink-500 hover:border-ink-400',
                    ].join(' ')}
                  >
                    <span>{cat.icon}</span> {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mood selector */}
          <div className="mb-5">
            <div className="font-body text-micro font-bold text-ink-500 uppercase tracking-widest mb-2">
              Comment vous sentez-vous ?
            </div>
            <div className="flex gap-2 flex-wrap">
              {MOODS.map((mood) => {
                const active = selectedMood === mood.label;
                return (
                  <button
                    key={mood.label}
                    type="button"
                    onClick={() => setSelectedMood(active ? null : mood.label)}
                    className={[
                      'inline-flex items-center gap-1 px-3 py-1.5 rounded-pill border cursor-pointer font-body text-micro font-semibold transition-all duration-150',
                      active
                        ? 'border-primary-400 bg-primary-50 text-primary-700'
                        : 'border-ink-200 bg-transparent text-ink-500 hover:border-ink-400',
                    ].join(' ')}
                  >
                    {mood.emoji} {mood.label}
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-ink-200 mb-5" />

          {/* Content textarea */}
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Commencez à écrire... Qu'avez-vous observé ? Qu'avez-vous appris ? Que voulez-vous faire différemment ?"
              rows={18}
              className="w-full border-0 outline-none resize-none font-body text-body text-ink-900 leading-relaxed bg-transparent h-auto block placeholder:text-ink-300"
            />
            <div className="text-right font-body text-caption text-ink-400 mt-2">
              {wordCount} mot{wordCount > 1 ? 's' : ''}
            </div>
          </div>

          <hr className="border-ink-200 my-5" />

          {/* Tags */}
          <div>
            <div className="font-body text-micro font-bold text-ink-500 uppercase tracking-widest mb-2">
              Tags
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-primary-50 text-primary-700 font-body text-micro font-semibold border border-primary-200"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="bg-transparent border-0 cursor-pointer text-primary-400 hover:text-primary-600 p-0 leading-none text-body-sm"
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
                placeholder="Ajouter un tag..."
                className="border-0 outline-none font-body text-caption text-ink-700 bg-transparent min-w-[120px] h-auto"
              />
            </div>
          </div>

          {/* Bottom actions */}
          <div className="flex gap-2 mt-6">
            <Button leadingIcon={<Send size={15} />}>Publier l'entrée</Button>
            <Button variant="secondary" leadingIcon={<Save size={14} />}>
              Sauvegarder en brouillon
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="sticky top-[72px] flex flex-col gap-stack">

          {/* Writing prompts */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 px-5">
            <div className="flex items-center gap-2 mb-3">
              <PenLine size={15} className="text-primary-600" />
              <span className="font-body text-caption font-extrabold text-primary-700 uppercase tracking-widest">
                Aide à l'écriture
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setContent(content + (content ? '\n\n' : '') + prompt.hint + '\n')}
                  className="flex items-start gap-2 p-3 rounded-lg border border-primary-100 bg-white cursor-pointer text-left font-body transition-all duration-150 hover:border-primary-300 hover:bg-primary-50"
                >
                  <span className="text-primary-500 shrink-0 mt-px">{prompt.icon}</span>
                  <div>
                    <div className="font-body text-micro font-bold text-primary-600 uppercase tracking-widest mb-0.5">
                      {prompt.label}
                    </div>
                    <div className="font-body text-caption text-ink-500 leading-snug">
                      {prompt.hint}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 px-5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={15} className="text-secondary-500" />
              <span className="font-body text-caption font-extrabold text-secondary-700 uppercase tracking-widest">
                Aide-mémoire
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {TIPS.map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary-400 shrink-0 mt-[7px]" />
                  <span className="font-body text-caption text-ink-500 leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </Container>
    </div>
  );
};
