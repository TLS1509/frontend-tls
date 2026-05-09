import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import './Journal.css';
import { Button } from '../components/core/Button';
import { HeroSection } from '../components/patterns/HeroSection';
import {
  CalendarDays,
  PenSquare,
  BookOpen,
  ArrowRight,
  Search,
  Sparkles,
  Clock3,
  TrendingUp,
  X,
  Lightbulb,
  Zap,
  GraduationCap,
  Filter,
  ChevronDown,
  ClipboardList,
  FileText,
} from 'lucide-react';

/* ─── Template type system ──────────────────────────────────────────────────── */

type EntryType = 'guided' | 'free' | 'learning' | 'coaching' | 'insight' | 'questionnaire' | 'compte-rendu';
type PeriodFilter = 'all' | 'week' | 'month' | '3months';

interface JournalEntry {
  id: string;
  type: EntryType;
  title: string;
  excerpt: string;
  date: string;      // display string
  dateMs: number;    // for sorting / filtering
  readingTime: string;
  tags: string[];
}

const TYPE_META: Record<EntryType, {
  emoji: string;
  label: string;
  bg: string;
  color: string;
  border: string;
  icon: React.ComponentType<{ size?: number }>;
}> = {
  guided: {
    emoji: '🧭', label: 'Guidé',
    bg: 'var(--tls-primary-50)', color: 'var(--tls-primary-700)', border: 'var(--tls-primary-200)',
    icon: GraduationCap,
  },
  free: {
    emoji: '✍️', label: 'Libre',
    bg: 'var(--tls-ink-50)', color: 'var(--tls-ink-700)', border: 'var(--tls-ink-200)',
    icon: PenSquare,
  },
  learning: {
    emoji: '📖', label: 'Apprentissage',
    bg: 'var(--tls-primary-100)', color: 'var(--tls-primary-800)', border: 'var(--tls-primary-300)',
    icon: BookOpen,
  },
  coaching: {
    emoji: '🎯', label: 'Coaching',
    bg: 'var(--tls-orange-100)', color: 'var(--tls-orange-700)', border: 'var(--tls-orange-300)',
    icon: Zap,
  },
  insight: {
    emoji: '💡', label: 'Insight',
    bg: 'var(--tls-yellow-100)', color: 'var(--tls-yellow-800)', border: 'var(--tls-yellow-300)',
    icon: Lightbulb,
  },
  questionnaire: {
    emoji: '📋', label: 'Questionnaire',
    bg: 'var(--tls-primary-100)', color: 'var(--tls-primary-700)', border: 'var(--tls-primary-200)',
    icon: ClipboardList,
  },
  'compte-rendu': {
    emoji: '📊', label: 'Compte rendu',
    bg: 'var(--tls-success-bg)', color: 'var(--tls-success-fg)', border: 'var(--tls-success-border)',
    icon: FileText,
  },
};

/* ─── Mock data ─────────────────────────────────────────────────────────────── */

const now = Date.now();
const daysAgo = (n: number) => now - n * 24 * 3600 * 1000;

const ENTRIES: JournalEntry[] = [
  {
    id: 'j1',
    type: 'guided',
    title: 'Semaine 14 — Leadership & délégation',
    excerpt: "J'ai identifié mes points de friction en délégation : la peur de perdre le contrôle freine ma capacité à faire confiance. Exercice : planifier 3 délégations concrètes avant vendredi.",
    date: '14 avril 2026',
    dateMs: daysAgo(2),
    readingTime: '4 min',
    tags: ['Leadership', 'Délégation', 'Confiance'],
  },
  {
    id: 'j2',
    type: 'coaching',
    title: 'Feedback équipe — Session avec Sophie',
    excerpt: 'Les retours ont mis en avant la clarté des attentes. Sophie a souligné que je tends à retenir des informations clés trop longtemps. Action : créer un canal partagé de décisions.',
    date: '12 avril 2026',
    dateMs: daysAgo(4),
    readingTime: '6 min',
    tags: ['Feedback', 'Communication', 'Équipe'],
  },
  {
    id: 'j3',
    type: 'insight',
    title: 'Le modèle SCARF en action',
    excerpt: "Après la réunion de lundi, j'ai eu une révélation : la tension venait d'une menace perçue sur le statut. En le nommant, la conversation a changé. L'insight : nommer le domaine social dès le début.",
    date: '8 avril 2026',
    dateMs: daysAgo(8),
    readingTime: '3 min',
    tags: ['SCARF', 'Neuroleadership', 'Insight'],
  },
  {
    id: 'j4',
    type: 'learning',
    title: 'Motivation intrinsèque : points clés',
    excerpt: 'Notes post-leçon "Motivation et Engagement". La distinction clé : la motivation extrinsèque produit des résultats à court terme mais détruit la confiance. Action : identifier 2 leviers intrinsèques par collaborateur.',
    date: '3 avril 2026',
    dateMs: daysAgo(13),
    readingTime: '5 min',
    tags: ['Motivation', 'Engagement', 'Psychologie'],
  },
  {
    id: 'j5',
    type: 'free',
    title: 'Réflexion libre — Quelle manager suis-je ?',
    excerpt: "Exercice de positionnement : sur une échelle de 1 à 10, comment j'évalue ma capacité à créer du sens pour mon équipe ? Je me donne un 6,5. Les lacunes : je partage peu mes propres doutes.",
    date: '28 mars 2026',
    dateMs: daysAgo(19),
    readingTime: '7 min',
    tags: ['Identité', 'Posture', 'Authenticité'],
  },
  {
    id: 'j6',
    type: 'coaching',
    title: 'Bilan mi-parcours — Mois 2',
    excerpt: "Sophie a noté des progrès réels sur l'écoute active. Ce qui reste difficile : interrompre moins, surtout dans les situations de stress. Objectif mois 3 : pause de 2 secondes avant toute réponse.",
    date: '20 mars 2026',
    dateMs: daysAgo(27),
    readingTime: '8 min',
    tags: ['Bilan', 'Écoute', 'Progression'],
  },
  {
    id: 'j7',
    type: 'guided',
    title: 'Mon plan d\'action — Leadership transformationnel',
    excerpt: "Après la leçon sur le leadership transformationnel, j'ai défini 4 actions concrètes pour ce mois : rituels 1:1, partage de la vision, délégation de décisions opérationnelles, reconnaissance publique.",
    date: '10 mars 2026',
    dateMs: daysAgo(37),
    readingTime: '6 min',
    tags: ['Plan d\'action', 'Transformationnel', 'Vision'],
  },
  {
    id: 'j8',
    type: 'insight',
    title: 'L\'effet miroir — Quand je projette sur l\'équipe',
    excerpt: "Prise de conscience : quand je dis 'mon équipe manque de proactivité', je projetais ma propre anxiété sur eux. En posant la question directement, j'ai découvert qu'ils manquaient d'informations, pas de motivation.",
    date: '2 mars 2026',
    dateMs: daysAgo(45),
    readingTime: '4 min',
    tags: ['Projection', 'Biais', 'Communication'],
  },
  {
    id: 'j9',
    type: 'questionnaire',
    title: 'Questionnaire pré-session — Mois 3',
    excerpt: "Réponses au questionnaire préparatoire de Sophie : objectifs de la session, points de blocage actuels, niveau de stress ressenti cette semaine. J'ai identifié 2 freins prioritaires à explorer.",
    date: '26 avril 2026',
    dateMs: daysAgo(5),
    readingTime: '3 min',
    tags: ['Préparation', 'Coaching', 'Introspection'],
  },
  {
    id: 'j10',
    type: 'compte-rendu',
    title: 'Compte rendu — Session 3 avec Sophie',
    excerpt: "Synthèse de la session du 28 avril : progression sur l'écoute active, clarté des objectifs, gestion du stress situationnel. Plan d'action en 4 étapes engagé jusqu'au 12 mai.",
    date: '28 avril 2026',
    dateMs: daysAgo(3),
    readingTime: '6 min',
    tags: ['Bilan', 'Leadership', 'Plan d\'action'],
  },
];

/* ─── Filter definitions ────────────────────────────────────────────────────── */

type TypeFilter = 'all' | EntryType | 'questionnaire' | 'compte-rendu';

const TYPE_FILTERS: { key: TypeFilter; label: string }[] = [
  { key: 'all',           label: 'Toutes' },
  { key: 'guided',        label: '🧭 Guidé' },
  { key: 'free',          label: '✍️ Libre' },
  { key: 'learning',      label: '📖 Apprentissage' },
  { key: 'coaching',      label: '🎯 Coaching' },
  { key: 'insight',       label: '💡 Insight' },
  { key: 'questionnaire', label: '📋 Questionnaire' },
  { key: 'compte-rendu',  label: '📊 Compte rendu' },
];

const PERIOD_FILTERS: { key: PeriodFilter; label: string }[] = [
  { key: 'all',     label: 'Toute période' },
  { key: 'week',    label: 'Cette semaine' },
  { key: 'month',   label: 'Ce mois' },
  { key: '3months', label: '3 mois' },
];

const PERIOD_MS: Record<PeriodFilter, number> = {
  all:     0,
  week:    7  * 24 * 3600 * 1000,
  month:   30 * 24 * 3600 * 1000,
  '3months': 90 * 24 * 3600 * 1000,
};

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

const KpiCard: React.FC<{
  label: string;
  value: string;
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
}> = ({ label, value, icon, iconBg = 'var(--tls-primary-50)', iconColor = 'var(--tls-primary-600)' }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Card
      variant="feature"
      style={{
        textAlign: 'center',
        transition: 'all var(--dur-2)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'default'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)', alignItems: 'center' }}>
        {icon && (
          <div className="tls-kpi-icon" style={{ background: iconBg, color: iconColor }}>
            {icon}
          </div>
        )}
        <p style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: iconColor ?? 'var(--tls-primary-500)', margin: 0 }}>
          {value}
        </p>
        <p style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', margin: 0 }}>
          {label}
        </p>
      </div>
    </Card>
  );
};

interface EntryCardProps {
  entry: JournalEntry;
  onNavigate: (id: string) => void;
  onCoachingAction?: () => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onNavigate, onCoachingAction }) => {
  const [hovered, setHovered] = useState(false);
  const meta = TYPE_META[entry.type];
  const TypeIcon = meta.icon;

  return (
    <Card
      variant="feature"
      style={{
        transition: 'all var(--dur-2)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        cursor: 'default',
        borderLeft: `4px solid ${meta.border}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--s-4)' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-2)', lineHeight: 1.35 }}>
              {entry.title}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
              <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
                <CalendarDays size={12} />
                {entry.date}
              </p>
              <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
                <Clock3 size={12} />
                {entry.readingTime}
              </p>
            </div>
          </div>
          {/* Type badge */}
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)',
              padding: 'var(--s-1) var(--s-3)',
              borderRadius: 'var(--r-pill)',
              background: meta.bg,
              color: meta.color,
              border: `1px solid ${meta.border}`,
              fontSize: 'var(--t-caption)',
              fontWeight: 600,
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            <TypeIcon size={12} />
            {meta.label}
          </span>
        </div>

        {/* Content */}
        <p style={{ fontSize: 'var(--t-body)', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
          {entry.excerpt}
        </p>

        {/* Tags */}
        {entry.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 'var(--s-1)', flexWrap: 'wrap' }}>
            {entry.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 'var(--t-micro)', padding: '2px 8px',
                  borderRadius: 'var(--r-pill)',
                  background: 'var(--surface-muted)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Coaching quick actions */}
        {(entry.type === 'questionnaire' || entry.type === 'compte-rendu') && onCoachingAction && (
          <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
            <Button
              variant="ghost"
              size="sm"
              trailingIcon={<ArrowRight size={13} />}
              onClick={onCoachingAction}
              style={{ fontSize: 'var(--t-caption)', color: 'var(--tls-primary-600)' }}
            >
              {entry.type === 'questionnaire' ? 'Voir les réponses' : 'Voir le rapport complet'}
            </Button>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--s-3)', paddingTop: 'var(--s-2)', borderTop: '1px solid var(--border)' }}>
          <Button variant="secondary" size="sm" leadingIcon={<BookOpen size={14} />} onClick={() => onNavigate(entry.id)}>
            Lire
          </Button>
          <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={14} />} onClick={() => onNavigate(entry.id)}>
            Continuer
          </Button>
        </div>
      </div>
    </Card>
  );
};

/* ─── Main page ──────────────────────────────────────────────────────────────── */

export const Journal: React.FC = () => {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);

  const filteredEntries = useMemo(() => {
    const periodCutoff = PERIOD_MS[periodFilter] > 0 ? now - PERIOD_MS[periodFilter] : 0;
    const q = searchQuery.trim().toLowerCase();

    return ENTRIES.filter((e) => {
      const matchType   = typeFilter === 'all' || e.type === typeFilter;
      const matchPeriod = periodCutoff === 0 || e.dateMs >= periodCutoff;
      const matchSearch = q === '' ||
        e.title.toLowerCase().includes(q) ||
        e.excerpt.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q));
      return matchType && matchPeriod && matchSearch;
    });
  }, [typeFilter, periodFilter, searchQuery]);

  const thisMonthCount = ENTRIES.filter((e) => e.dateMs >= daysAgo(30)).length;
  const uniqueTagsCount = new Set(ENTRIES.flatMap((e) => e.tags)).size;
  const coachingCount = ENTRIES.filter((e) => e.type === 'coaching' || e.type === 'questionnaire' || e.type === 'compte-rendu').length;

  const selectedPeriodLabel = PERIOD_FILTERS.find((f) => f.key === periodFilter)?.label ?? 'Toute période';

  return (
    <div className="journal-page">
      {/* Hero Section */}
      <HeroSection
        icon={Sparkles}
        title="Journal d'apprentissage"
        description="Capitalisez vos prises de conscience, structurez vos réflexions et suivez votre progression avec un espace de journaling adapté à votre parcours."
        variant="gradient"
        tone="primary"
      />

      <div className="journal-content">
        {/* KPI Cards — Enhanced with elevation and better spacing */}
        <div className="journal-kpi-grid">
          <div className="journal-kpi-grid__item">
            <KpiCard
              label="Entrées ce mois"
              value={String(thisMonthCount)}
              icon={<PenSquare size={20} />}
              iconBg="var(--tls-primary-50)"
              iconColor="var(--tls-primary-600)"
            />
          </div>
          <div className="journal-kpi-grid__item">
            <KpiCard
              label="Thèmes explorés"
              value={String(uniqueTagsCount)}
              icon={<Sparkles size={20} />}
              iconBg="var(--tls-orange-50)"
              iconColor="var(--tls-orange-600)"
            />
          </div>
          <div className="journal-kpi-grid__item">
            <KpiCard
              label="Sessions coaching"
              value={String(coachingCount)}
              icon={<TrendingUp size={20} />}
              iconBg="var(--tls-yellow-50)"
              iconColor="var(--tls-yellow-600)"
            />
          </div>
          <div className="journal-kpi-grid__item">
            <KpiCard
              label="Insights captés"
              value={String(ENTRIES.filter((e) => e.type === 'insight').length)}
              icon={<Lightbulb size={20} />}
              iconBg="var(--tls-primary-50)"
              iconColor="var(--tls-primary-700)"
            />
          </div>
        </div>

        {/* CTA row — Enhanced with better visual prominence */}
        <div className="journal-cta-row">
          {(['guided', 'free', 'insight'] as EntryType[]).map((type) => {
            const m = TYPE_META[type];
            return (
              <Button
                key={type}
                variant="secondary"
                leadingIcon={<span style={{ fontSize: '1em' }}>{m.emoji}</span>}
                onClick={() => navigate(`/journal/new-entry?type=${type}`)}
                style={{ background: m.bg, borderColor: m.border, color: m.color, transition: 'all var(--dur-2)' }}
              >
                {m.label}
              </Button>
            );
          })}
          <Button
            leadingIcon={<PenSquare size={16} />}
            onClick={() => navigate('/journal/new-entry')}
            className="journal-cta-row__new-entry"
          >
            Nouvelle entrée
          </Button>
        </div>

        {/* Toolbar — Enhanced with better visual separation */}
        <Card variant="feature" className="journal-toolbar">
          <div className="journal-toolbar__flex">
            {/* Search */}
            <div className="journal-toolbar__search">
              <Search size={16} className="journal-toolbar__search-icon" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher titre, thème, tag…"
                className="journal-toolbar__search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="journal-toolbar__search-clear"
                  aria-label="Effacer la recherche"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Period dropdown */}
            <div className="journal-toolbar__period-dropdown">
              <button
                type="button"
                onClick={() => setShowPeriodMenu((v) => !v)}
                className="journal-toolbar__period-button"
              >
                <Filter size={14} className="journal-toolbar__period-icon" />
                {selectedPeriodLabel}
                <ChevronDown size={14} className={`journal-toolbar__period-chevron ${showPeriodMenu ? 'journal-toolbar__period-chevron--open' : ''}`} />
              </button>
              {showPeriodMenu && (
                <div className="journal-toolbar__period-menu">
                  {PERIOD_FILTERS.map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => { setPeriodFilter(key); setShowPeriodMenu(false); }}
                      className={`journal-toolbar__period-option ${periodFilter === key ? 'journal-toolbar__period-option--active' : ''}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Type filter pills */}
          <div className="journal-toolbar__type-filters" role="tablist" aria-label="Filtrer par type">
            {TYPE_FILTERS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={typeFilter === key}
                onClick={() => setTypeFilter(key)}
                className={`tls-filter-pill${typeFilter === key ? ' tls-filter-pill--active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </Card>

        {/* Result count — Enhanced with better styling */}
        {(typeFilter !== 'all' || periodFilter !== 'all' || searchQuery) && (
          <div className="journal-result-count">
            <span className="journal-result-count__text">
              {filteredEntries.length} entrée{filteredEntries.length > 1 ? 's' : ''} trouvée{filteredEntries.length > 1 ? 's' : ''}
            </span>
            <button
              onClick={() => { setTypeFilter('all'); setPeriodFilter('all'); setSearchQuery(''); }}
              className="journal-result-count__reset"
            >
              <X size={12} />
              Réinitialiser
            </button>
          </div>
        )}

        {/* Entries List */}
        {filteredEntries.length === 0 ? (
          <Card variant="feature" className="journal-empty-state">
            <div className="journal-empty-state__icon-container">
              <Search size={24} className="journal-empty-state__icon" />
            </div>
            <div>
              <h3 className="journal-empty-state__title">Aucune entrée trouvée</h3>
              <p className="journal-empty-state__description">
                Essayez d'élargir votre recherche ou de modifier les filtres.
              </p>
            </div>
          </Card>
        ) : (
          <div className="journal-entries-list">
            {filteredEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="journal-entries-list__item"
              >
                <EntryCard
                  entry={entry}
                  onNavigate={(id) => navigate(`/journal/detail/${id}`)}
                  onCoachingAction={
                    entry.type === 'questionnaire'
                      ? () => navigate('/coaching/pre-questionnaire')
                      : entry.type === 'compte-rendu'
                      ? () => navigate('/coaching/compte-rendu/1')
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes periodMenuIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
