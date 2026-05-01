/**
 * JournalDetail — vue complète d'une entrée de journal
 *
 * Design : lecteur de journal personnel avec breadcrumb, date + tags,
 * titre de l'entrée, sections structurées (Observation, Analyse, Actions),
 * indicateur de mood, navigation entre entrées, CTA nouvelle entrée.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CalendarDays,
  Clock,
  Tag,
  Sparkles,
  Target,
  Eye,
  Lightbulb,
  CheckCircle2,
  PenLine,
  BookOpen,
} from 'lucide-react';

const ENTRY = {
  date: '25 avril 2026',
  week: 'Semaine 14',
  category: 'Leadership',
  mood: '💡',
  moodLabel: 'Inspiré',
  readTime: '7 min',
  title: 'Leadership et écoute active — ce que j\'ai appris cette semaine',
  tags: ['Leadership', 'Communication', 'Équipe', 'Management'],
  sections: [
    {
      icon: <Eye size={16} color="var(--tls-primary-600)" />,
      label: 'Observation',
      color: 'var(--tls-primary-50)',
      border: 'rgba(85,161,180,0.2)',
      accent: 'var(--tls-primary-500)',
      text: "Cette semaine, j'ai observé une tension récurrente dans les échanges entre deux membres de l'équipe lors de nos stand-ups quotidiens. En creusant un peu, j'ai réalisé que la source n'était pas un désaccord sur les tâches, mais une attente non formulée sur la façon dont les décisions sont prises. L'un attendait plus de concertation, l'autre plus d'efficacité. Cette observation m'a frappé : combien de conflits apparents cachent en réalité des attentes implicites sur le process ?",
    },
    {
      icon: <Lightbulb size={16} color="var(--tls-orange-600)" />,
      label: 'Analyse',
      color: 'rgba(237,132,58,0.07)',
      border: 'rgba(237,132,58,0.2)',
      accent: 'var(--tls-orange-500)',
      text: "En relisant le module sur la communication non-violente suivi le mois dernier, j'ai fait le lien avec ce que je vivais : les besoins non exprimés créent des frustrations qui s'accumulent jusqu'à la confrontation. La clé n'est pas de résoudre le conflit une fois qu'il éclate, mais de créer des rituels d'expression des besoins en amont. J'ai aussi réalisé que mon propre style de communication — direct et orienté solutions — peut parfois court-circuiter le besoin de reconnaissance que certains membres de l'équipe cherchent avant de passer à l'action.",
    },
    {
      icon: <Target size={16} color="#16a34a" />,
      label: 'Actions à mettre en place',
      color: 'rgba(22,163,74,0.05)',
      border: 'rgba(22,163,74,0.15)',
      accent: '#16a34a',
      text: "Trois actions concrètes pour la semaine prochaine : (1) Organiser un 1:1 avec chacun des deux membres concernés pour valider ma compréhension de la situation et créer un espace d'expression sans jugement. (2) Proposer au collectif un format de rétro bi-mensuel de 30 min où chacun peut exprimer ce qui fonctionne et ce qui freine. (3) Modifier mon animation du stand-up : laisser systématiquement 2 minutes à la fin pour les 'signaux faibles' — ce qui pèse mais n'est pas encore un problème.",
    },
  ],
};

export const JournalDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-body)' }}>

      {/* ─ Top bar ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--s-4) var(--s-8)', borderBottom: '1px solid var(--border)' }}>
        <button
          type="button"
          onClick={() => navigate('/journal')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: 'var(--r-full)', border: '1.5px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 'var(--t-sm)', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
        >
          <ArrowLeft size={14} /> Retour au journal
        </button>
        <button
          type="button"
          onClick={() => navigate('/journal/new-entry')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 20px', borderRadius: 'var(--r-full)', border: 'none', background: 'var(--tls-primary-500)', color: 'var(--text-inverse)', fontSize: 'var(--t-sm)', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
        >
          <PenLine size={15} /> Nouvelle entrée
        </button>
      </div>

      {/* ─ Breadcrumb ─────────────────────────────────────────── */}
      <div style={{ padding: 'var(--s-3) var(--s-8)', display: 'flex', alignItems: 'center', gap: 'var(--s-2)', fontSize: 'var(--t-sm)', color: 'var(--text-muted)' }}>
        <span style={{ cursor: 'pointer', color: 'var(--tls-primary-600)' }} onClick={() => navigate('/journal')}>Journal</span>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text)', fontWeight: 500 }}>{ENTRY.week}</span>
      </div>

      {/* ─ Hero light ─────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(160deg, var(--tls-primary-50) 0%, #fff 60%)', padding: 'var(--s-8) var(--s-8) var(--s-6)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>

          {/* Meta chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', marginBottom: 'var(--s-4)', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px', borderRadius: 'var(--r-full)', background: 'var(--tls-primary-500)', color: 'var(--text-inverse)', fontSize: '12px', fontWeight: 800, letterSpacing: '0.06em' }}>
              <Sparkles size={12} /> JOURNAL DE BORD
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: 'var(--r-full)', background: 'rgba(85,161,180,0.1)', color: 'var(--tls-primary-700)', fontSize: '12px', fontWeight: 700 }}>
              <BookOpen size={12} /> {ENTRY.category}
            </span>
            {/* Mood */}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: 'var(--r-full)', background: '#f8f9fa', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, border: '1px solid var(--border)' }}>
              {ENTRY.mood} {ENTRY.moodLabel}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: 'var(--text)', margin: '0 0 var(--s-5)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            {ENTRY.title}
          </h1>

          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-5)', flexWrap: 'wrap' }}>
            {[
              { icon: <CalendarDays size={14} />, label: ENTRY.date },
              { icon: <Clock size={14} />, label: ENTRY.readTime },
            ].map((m, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: 'var(--t-sm)' }}>
                {m.icon}{m.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─ Body ───────────────────────────────────────────────── */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'var(--s-6) var(--s-8) var(--s-12)' }}>

        {/* Sections structurées */}
        {ENTRY.sections.map((section, i) => (
          <div key={i} style={{ background: section.color, border: `1.5px solid ${section.border}`, borderLeft: `4px solid ${section.accent}`, borderRadius: 'var(--r-xl)', padding: 'var(--s-5) var(--s-6)', marginBottom: 'var(--s-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-3)' }}>
              {section.icon}
              <span style={{ fontSize: '12px', fontWeight: 800, color: section.accent, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{section.label}</span>
            </div>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{section.text}</p>
          </div>
        ))}

        {/* Actions checklist */}
        <div style={{ background: '#f8f9fa', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: 'var(--s-5) var(--s-6)', marginBottom: 'var(--s-7)' }}>
          <div style={{ fontWeight: 800, color: 'var(--text)', marginBottom: 'var(--s-3)', fontSize: 'var(--t-sm)', display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
            <CheckCircle2 size={15} color="var(--tls-primary-500)" /> Engagements pour S15
          </div>
          {[
            { done: false, text: '1:1 avec Pierre — jeudi 14h' },
            { done: false, text: '1:1 avec Amélie — vendredi 10h' },
            { done: false, text: 'Proposer format rétro au reste de l\'équipe — lundi' },
            { done: false, text: 'Modifier template stand-up pour inclure "signaux faibles"' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${item.done ? 'var(--tls-primary-500)' : 'var(--border)'}`, background: item.done ? 'var(--tls-primary-500)' : 'transparent', flexShrink: 0 }} />
              <span style={{ fontSize: 'var(--t-sm)', color: item.done ? 'var(--text-muted)' : 'var(--text)', textDecoration: item.done ? 'line-through' : 'none' }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', flexWrap: 'wrap', marginBottom: 'var(--s-6)' }}>
          <Tag size={14} style={{ color: 'var(--text-muted)' }} />
          {ENTRY.tags.map((tag) => (
            <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 'var(--r-full)', background: 'var(--tls-primary-50)', color: 'var(--tls-primary-700)', fontSize: '12px', fontWeight: 600, border: '1px solid rgba(85,161,180,0.2)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--border)', margin: 'var(--s-2) 0 var(--s-6)' }} />

        {/* Navigation between entries */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-3)', marginBottom: 'var(--s-8)' }}>
          <button
            type="button"
            onClick={() => navigate('/journal/detail/prev')}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', padding: 'var(--s-4)', borderRadius: 'var(--r-xl)', border: '1.5px solid var(--border)', background: '#fff', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--tls-primary-300)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <ArrowLeft size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Entrée précédente</div>
              <div style={{ fontSize: 'var(--t-sm)', fontWeight: 600, color: 'var(--text)' }}>Semaine 13 — Délégation</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => navigate('/journal/detail/next')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--s-3)', padding: 'var(--s-4)', borderRadius: 'var(--r-xl)', border: '1.5px solid var(--border)', background: '#fff', cursor: 'pointer', textAlign: 'right', fontFamily: 'var(--font-body)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--tls-primary-300)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Entrée suivante</div>
              <div style={{ fontSize: 'var(--t-sm)', fontWeight: 600, color: 'var(--text)' }}>Semaine 15 — Feedback</div>
            </div>
            <ArrowRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          </button>
        </div>

        {/* New entry CTA */}
        <div style={{ background: 'linear-gradient(135deg, var(--tls-primary-500) 0%, var(--tls-primary-600) 100%)', borderRadius: 'var(--r-xl)', padding: 'var(--s-6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--s-4)' }}>
          <div>
            <div style={{ fontSize: 'var(--t-body)', fontWeight: 800, color: 'var(--text-inverse)', marginBottom: 'var(--s-1)' }}>Qu'avez-vous appris cette semaine ?</div>
            <div style={{ fontSize: 'var(--t-sm)', color: 'rgba(255,255,255,0.8)' }}>Capturez vos observations pendant qu'elles sont fraîches.</div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/journal/new-entry')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', borderRadius: 'var(--r-full)', border: 'none', background: '#fff', color: 'var(--tls-primary-600)', fontSize: 'var(--t-sm)', fontWeight: 800, cursor: 'pointer', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            <PenLine size={15} /> Nouvelle entrée
          </button>
        </div>
      </div>
    </div>
  );
};
