/**
 * JournalFreeEntry — interface de saisie libre dans le journal
 *
 * Design : éditeur épuré avec champ titre, grande textarea,
 * sélecteur de catégorie, chips tags, indicateur de mood,
 * boutons Publier / Brouillon. Sidebar aide-mémoire.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  PenLine,
  Save,
  Send,
  CalendarDays,
  Tag,
  Sparkles,
  BookOpen,
  Lightbulb,
  Target,
  Eye,
  Smile,
  Zap,
  Heart,
  AlertCircle,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'leadership', label: 'Leadership', icon: '🎯' },
  { id: 'apprentissage', label: 'Apprentissage', icon: '📚' },
  { id: 'collaboration', label: 'Collaboration', icon: '🤝' },
  { id: 'reflexion', label: 'Réflexion', icon: '💭' },
  { id: 'action', label: 'Action', icon: '⚡' },
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
  { icon: <Eye size={14} />, label: 'Observation', hint: "Qu'avez-vous observé cette semaine ?" },
  { icon: <Lightbulb size={14} />, label: 'Prise de recul', hint: "Qu'est-ce que cela vous apprend ?" },
  { icon: <Target size={14} />, label: 'Action', hint: "Que voulez-vous faire différemment ?" },
];

export const JournalFreeEntry: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,$/, '');
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-body)' }}>

      {/* ─ Top bar ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--s-4) var(--s-8)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
          <button
            type="button"
            onClick={() => navigate('/journal')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: 'var(--r-full)', border: '1.5px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 'var(--t-sm)', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
          >
            <ArrowLeft size={14} /> Retour
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--tls-primary-500)" />
            <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: 'var(--t-body)' }}>Nouvelle entrée libre</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--s-2)' }}>
          <button
            type="button"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: 'var(--r-full)', border: '1.5px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 'var(--t-sm)', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
          >
            <Save size={14} /> Brouillon
          </button>
          <button
            type="button"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 20px', borderRadius: 'var(--r-full)', border: 'none', background: 'var(--tls-primary-500)', color: '#fff', fontSize: 'var(--t-sm)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
          >
            <Send size={14} /> Publier
          </button>
        </div>
      </div>

      {/* ─ Layout (2 col) ─────────────────────────────────────── */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'var(--s-6) var(--s-8)', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 'var(--s-8)', alignItems: 'start' }}>

        {/* Main editor */}
        <div>
          {/* Date chip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--s-4)', color: 'var(--text-muted)', fontSize: 'var(--t-sm)' }}>
            <CalendarDays size={14} />
            <span>1 mai 2026</span>
          </div>

          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de votre entrée..."
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--text)', fontFamily: 'var(--font-body)', background: 'transparent', marginBottom: 'var(--s-5)', letterSpacing: '-0.02em', boxSizing: 'border-box' }}
          />

          {/* Category selector */}
          <div style={{ marginBottom: 'var(--s-4)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--s-2)' }}>Catégorie</div>
            <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(active ? null : cat.id)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: 'var(--r-full)', border: `1.5px solid ${active ? 'var(--tls-primary-400)' : 'var(--border)'}`, background: active ? 'var(--tls-primary-50)' : 'transparent', color: active ? 'var(--tls-primary-700)' : 'var(--text-muted)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}
                  >
                    <span>{cat.icon}</span> {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mood selector */}
          <div style={{ marginBottom: 'var(--s-5)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--s-2)' }}>Comment vous sentez-vous ?</div>
            <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
              {MOODS.map((mood) => {
                const active = selectedMood === mood.label;
                return (
                  <button
                    key={mood.label}
                    type="button"
                    onClick={() => setSelectedMood(active ? null : mood.label)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: 'var(--r-full)', border: `1.5px solid ${active ? 'var(--tls-primary-400)' : 'var(--border)'}`, background: active ? 'var(--tls-primary-50)' : 'transparent', color: active ? 'var(--tls-primary-700)' : 'var(--text-muted)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}
                  >
                    {mood.emoji} {mood.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border)', marginBottom: 'var(--s-5)' }} />

          {/* Content textarea */}
          <div style={{ position: 'relative' }}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Commencez à écrire... Qu'avez-vous observé ? Qu'avez-vous appris ? Que voulez-vous faire différemment ?"
              rows={18}
              style={{ width: '100%', border: 'none', outline: 'none', resize: 'none', fontSize: 'var(--t-body)', color: 'var(--text)', fontFamily: 'var(--font-body)', lineHeight: 1.85, background: 'transparent', boxSizing: 'border-box', padding: 0 }}
            />
            {/* Word count */}
            <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)', marginTop: 'var(--s-2)' }}>
              {wordCount} mot{wordCount > 1 ? 's' : ''}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border)', margin: 'var(--s-5) 0' }} />

          {/* Tags */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--s-2)' }}>Tags</div>
            <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap', alignItems: 'center' }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: 'var(--r-full)', background: 'var(--tls-primary-50)', color: 'var(--tls-primary-700)', fontSize: '12px', fontWeight: 600, border: '1px solid rgba(85,161,180,0.2)' }}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tls-primary-400)', padding: 0, lineHeight: 1, fontSize: '14px', fontFamily: 'var(--font-body)' }}
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
                style={{ border: 'none', outline: 'none', fontSize: '12px', color: 'var(--text)', fontFamily: 'var(--font-body)', background: 'transparent', minWidth: '120px' }}
              />
            </div>
          </div>

          {/* Bottom actions */}
          <div style={{ display: 'flex', gap: 'var(--s-2)', marginTop: 'var(--s-6)' }}>
            <button
              type="button"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: 'var(--r-full)', border: 'none', background: 'var(--tls-primary-500)', color: '#fff', fontSize: 'var(--t-sm)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
            >
              <Send size={15} /> Publier l'entrée
            </button>
            <button
              type="button"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', borderRadius: 'var(--r-full)', border: '1.5px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 'var(--t-sm)', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
            >
              <Save size={14} /> Sauvegarder en brouillon
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: 'calc(var(--s-4) + 58px)' }}>

          {/* Writing prompts */}
          <div style={{ background: 'var(--tls-primary-50)', border: '1.5px solid rgba(85,161,180,0.2)', borderRadius: 'var(--r-xl)', padding: 'var(--s-4) var(--s-5)', marginBottom: 'var(--s-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-3)' }}>
              <PenLine size={15} color="var(--tls-primary-600)" />
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--tls-primary-700)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Aide à l'écriture</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
              {PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setContent(content + (content ? '\n\n' : '') + prompt.hint + '\n')}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--s-2)', padding: 'var(--s-3)', borderRadius: 'var(--r-lg)', border: '1.5px solid rgba(85,161,180,0.15)', background: '#fff', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--tls-primary-300)'; e.currentTarget.style.background = 'var(--tls-primary-50)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(85,161,180,0.15)'; e.currentTarget.style.background = '#fff'; }}
                >
                  <span style={{ color: 'var(--tls-primary-500)', flexShrink: 0, marginTop: '1px' }}>{prompt.icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--tls-primary-600)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>{prompt.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{prompt.hint}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Format libre tips */}
          <div style={{ background: 'rgba(237,132,58,0.06)', border: '1.5px solid rgba(237,132,58,0.15)', borderRadius: 'var(--r-xl)', padding: 'var(--s-4) var(--s-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-3)' }}>
              <Lightbulb size={15} color="var(--tls-orange-500)" />
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--tls-orange-700)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Aide-mémoire</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
              {[
                'Une idée reçue aujourd\'hui',
                'Un feedback qui m\'a surpris',
                'Une action testée et son résultat',
                'Une question encore ouverte',
                'Ce que je veux ne pas oublier',
              ].map((tip, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--s-2)' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--tls-orange-400)', flexShrink: 0, marginTop: '7px' }} />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};
