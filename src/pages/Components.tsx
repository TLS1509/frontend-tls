/**
 * Components & Design Tokens Showcase
 *
 * Source of truth: /src/design-system/spec.json — The Learning Society Design System v1.0.0
 *
 * This page mirrors the Claude Design export:
 *   - All 21 components grouped by category (Core / Patterns / Learning / Navigation)
 *   - Every variant, size, state rendered live
 *   - Every design token (colors, typography, spacing, radius, shadows, motion, gradients)
 *     with its CSS variable + value, copy-able for bug reports
 *   - Real-time search across components, tokens, CSS classes
 *   - Category filter
 *
 * Naming convention: React component name  ↔  CSS class base (from spec.cssBase)
 *   e.g. <Button> → .btn        <Alert> → .alert        <CompetenceBadge> → .comp-badge
 */

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PositionnementModal,
  BookingModal,
  ConfirmModal,
  SuccessModal,
  StreakCelebrationModal,
  SessionFeedbackModal,
  CancelSessionModal,
  VideoPlayerModal,
} from '../components/modals';
import {
  // Core
  Button,
  Card,
  CardEyebrow,
  CardTitle,
  CardDesc,
  CardFooter,
  Input,
  Checkbox,
  Radio,
  Switch,
  Select,
  FormGroup,
  // Identity
  Badge,
  Avatar,
  // Feedback
  Alert,
  EmptyState,
  Skeleton,
  Search,
  Toast,
  Modal,
  // Learning
  StatCard,
  ProgressBar,
  ProgressRing,
  Medal,
  CompetenceBadge,
  MasteryBadge,
  Achievement,
  TrendingBadge,
  GlassCard,
  FilterChip,
  Steps,
  Celebration,
  // Navigation
  Sidebar,
  SidebarGroup,
  NavItem,
  Tabs,
  Stepper,
  Breadcrumb,
  Pagination,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  // Content & Display
  ActionCard,
  ActivityItem,
  SectionTitle,
  Tag,
  MetaPill,
  MetaItem,
  UserInfo,
  IconFeatureCard,
  // Patterns
  ToneAwareCard,
  ParcoursCard,
} from '../components';
import { ToastContainer } from '../components';
import { useToast } from '../hooks/useToast';
// Components not yet in main index — direct imports
import { ProfileCard } from '../components/ui/ProfileCard';
import { CourseCard } from '../components/ui/CourseCard';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { ResourceCard } from '../components/ui/ResourceCard';
import { CompetencyMatrix } from '../components/ui/CompetencyMatrix';
import { GoalProgress } from '../components/ui/GoalProgress';
import { QuizComponent } from '../components/ui/QuizComponent';
import { ActivityFeed } from '../components/patterns/ActivityFeed';
import { DashboardHero } from '../components/patterns/DashboardHero';
import { CardGrid } from '../components/patterns/CardGrid';
import { CoachCardGrid } from '../components/patterns/CoachCardGrid';
import { HeroSection } from '../components/patterns/HeroSection';
import { InlineProgress } from '../components/patterns/InlineProgress';
import { LearningPathGrid } from '../components/patterns/LearningPathGrid';
import { LearningPathHeader } from '../components/patterns/LearningPathHeader';
import { MultiStepForm } from '../components/patterns/MultiStepForm';
import { PageCard } from '../components/patterns/PageCard';
import { PageHeaderSimple } from '../components/patterns/PageHeaderSimple';
import { ResourceCardGrid } from '../components/patterns/ResourceCardGrid';
import { SettingsSection } from '../components/patterns/SettingsSection';
import { VeilleCardFeed } from '../components/patterns/VeilleCardFeed';
import { Spinner } from '../components/ui/Spinner';
import { StatusBadge } from '../components/ui/StatusBadge';
import { NotificationBadge } from '../components/ui/NotificationBadge';
import { KPICard } from '../components/ui/KPICard';
import { SkillBar } from '../components/ui/SkillBar';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageHeader } from '../components/patterns/PageHeader';
import { Divider } from '../components/ui/Divider';
import { Bell, MessageSquare, BookOpen, Calendar, GraduationCap, Clock3, Flame, Trophy, Zap, Users, Lightbulb, CheckCircle2 } from 'lucide-react';

/* ============================================================================
 * TYPES
 * ============================================================================ */

type Category = 'Core' | 'Patterns' | 'Learning' | 'Navigation' | 'Content' | 'Modals' | 'Feedback';

interface ComponentEntry {
  name: string;              // React name: Button
  codeName: string;          // File: Button.tsx
  cssBase: string;           // .btn
  category: Category;
  description: string;
  keywords: string[];        // extra searchable terms
  render: () => React.ReactNode;
}

interface TokenEntry {
  name: string;
  cssVar: string;
  value: string;
  group: string;
  type: 'color' | 'typography' | 'spacing' | 'radius' | 'shadow' | 'motion' | 'gradient' | 'role';
}

/* ============================================================================
 * SHARED ICONS (demo content)
 * ============================================================================ */

const I = {
  arrow: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  plus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  heart: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
  home: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  book: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  trophy: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2z" /></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.86 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  trash: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /></svg>,
  edit: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
};

/* ============================================================================
 * PAGE TEMPLATES — recently designed full-page patterns
 * ============================================================================ */

interface PageTemplate {
  id: string;
  name: string;
  description: string;
  path: string;
  family: string;
  color: string;
  bg: string;
  tags: string[];
  icon: string;
}

const PAGE_TEMPLATES: PageTemplate[] = [
  /* ── Core ── */
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Vue d\'ensemble avec KPI row, parcours en cours, activité récente, prompts IA et quick-actions 4-col.',
    path: '/dashboard',
    family: 'Core',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['KPI', 'cards', 'quick-actions', 'activity feed'],
    icon: '📊',
  },
  {
    id: 'learning-paths',
    name: 'Parcours',
    description: 'Grid de tiles parcours avec filtres pills, barre de recherche, ProgressBar et badge de niveau.',
    path: '/learning-paths',
    family: 'Core',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['grid', 'filter pills', 'search', 'ProgressBar'],
    icon: '📚',
  },
  {
    id: 'learning-path-detail',
    name: 'Détail Parcours',
    description: 'Header hero, étapes avec accordéon, ressources complémentaires et CTA "Commencer".',
    path: '/learning-paths/1',
    family: 'Core',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['hero', 'steps', 'accordion', 'CTA'],
    icon: '🎯',
  },
  /* ── Journal ── */
  {
    id: 'journal',
    name: 'Journal de bord',
    description: 'Liste d\'entrées avec filter pills par type (Réflexion, Apprentissage, Coaching, Insight), barre de recherche et cartes d\'entrées colorées.',
    path: '/journal',
    family: 'Journal',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['filter pills', 'search', 'cards', 'type system'],
    icon: '📓',
  },
  {
    id: 'journal-new-entry',
    name: 'Nouvelle entrée journal',
    description: '4 type selector cards (Réflexion Libre, Apprentissage, Session Coaching, Moment Eurêka), question de réflexion contextuelle, textarea avec compteur de mots.',
    path: '/journal/new-entry',
    family: 'Journal',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['type selector', 'form', 'sticky header', 'word count'],
    icon: '✍️',
  },
  {
    id: 'journal-detail',
    name: 'Entrée journal — détail',
    description: 'Lecteur d\'entrée avec 3 sections structurées (Observation/Analyse/Actions), checklist engagements, navigation prev/next, CTA teal gradient.',
    path: '/journal/detail/1',
    family: 'Journal',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['reader', 'structured sections', 'checklist', 'navigation'],
    icon: '📝',
  },
  {
    id: 'journal-free-entry',
    name: 'Entrée libre journal',
    description: 'Éditeur épuré avec titre, catégorie pills, mood selector, textarea + compteur mots, tags dynamiques, sidebar aide-mémoire avec prompts cliquables.',
    path: '/journal/free-entry',
    family: 'Journal',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['editor', 'mood selector', 'dynamic tags', 'sticky header', 'sidebar'],
    icon: '🗒️',
  },
  /* ── Veille ── */
  {
    id: 'veille',
    name: 'Veille Hub',
    description: 'Hub éditorial avec filtres pills (Tout/Actus/Tutoriels/Dossiers/Magazine), recherche, quick-access 4 formats, feed d\'articles avec bookmark.',
    path: '/veille',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['filter pills', 'search', 'feed', 'bookmark', 'quick-access'],
    icon: '🗞️',
  },
  {
    id: 'veille-article',
    name: 'Article — Actu de la semaine',
    description: 'Lecteur article avec breadcrumb, badge ACTU teal, hero gradient, callout "Points essentiels", 3 sections corps, like/save/share, contenus liés.',
    path: '/veille/article/1',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['reader', 'breadcrumb', 'callout teal', 'actions', 'related'],
    icon: '📰',
  },
  {
    id: 'veille-content',
    name: 'Étude de Marché',
    description: 'Layout 2 colonnes (sommaire sticky + contenu), callout orange Résumé Exécutif, grille 2×2 Points clés, grands chiffres Données & Analyses, CTA téléchargement.',
    path: '/veille/content',
    family: 'Veille',
    color: 'var(--tls-orange-600)',
    bg: 'rgba(237,132,58,0.07)',
    tags: ['two-column', 'sidebar', 'callout orange', 'data viz', 'download CTA'],
    icon: '📂',
  },
  {
    id: 'veille-dossier',
    name: 'Dossier thématique',
    description: 'Breadcrumb + actions télécharger/bookmark/share, hero teal gradient, icône BarChart orange + tag "DOSSIER", callout Résumé Exécutif orange, sommaire sticky sidebar, sections numérotées, Points clés 2×2, grands chiffres Données & Analyses, conclusion teal gradient, CTA download orange.',
    path: '/veille/dossier/1',
    family: 'Veille',
    color: 'var(--tls-orange-600)',
    bg: 'rgba(237,132,58,0.07)',
    tags: ['two-column', 'sidebar', 'callout orange', 'key points 2x2', 'data viz', 'download CTA'],
    icon: '📋',
  },
  {
    id: 'veille-video-tutorial',
    name: 'Tutoriel Vidéo',
    description: 'Player 16:9 sombre avec barre de progression orange, chapitres listés sur fond teal, actions like/save/share, meta durée + vues.',
    path: '/veille/video-tutorial/1',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['video player', 'chapters', 'social actions', 'progress bar'],
    icon: '🎬',
  },
  {
    id: 'veille-weekly-newsletter',
    name: 'Actus de la semaine',
    description: 'Badge SEMAINE #08, grand titre teal, bloc éditorial avec guillemets, vidéo split-card, grille 3 cartes "À la une", liste articles bookmark, subscribe footer teal.',
    path: '/veille/weekly-newsletter',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['editorial', 'quote block', 'split card', '3-col grid', 'newsletter'],
    icon: '📬',
  },
  {
    id: 'veille-weekly-news-detail',
    name: 'Article newsletter — détail',
    description: 'Breadcrumb Veille > Actus, badges catégorie + À la une, hero teal, callout "L\'essentiel", 3 sections, source card, like/save/share, articles liés.',
    path: '/veille/weekly-news/1',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['reader', 'breadcrumb', 'callout', 'source card', 'related'],
    icon: '🧾',
  },
  {
    id: 'veille-magazine',
    name: 'Magazine TLS',
    description: 'Hero plein écran sombre avec titre en overlay, Synthèse Exécutive card blanche, Sommaire du magazine avec header orange et liste numérotée teal/orange.',
    path: '/veille/magazine',
    family: 'Veille',
    color: 'var(--tls-orange-500)',
    bg: 'rgba(237,132,58,0.07)',
    tags: ['dark hero', 'full-bleed', 'sommaire', 'two-column'],
    icon: '📚',
  },
  {
    id: 'veille-magazine-article',
    name: 'Article magazine — détail',
    description: 'Lien retour texte + icônes bookmark/share, pill catégorie teal outline, grand titre bold, avatar auteur + durée, intro paragraphe, callout "À retenir" bordure gauche teal + puces ChevronRight, 4 sections éditoriales, citation teal italique, conclusion, footer hashtags.',
    path: '/veille/magazine-article/1',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['reader', 'editorial', 'outline pill', 'callout teal', 'quote', 'hashtags'],
    icon: '📰',
  },
  /* ── Coaching ── */
  {
    id: 'coaching',
    name: 'Coaching 1-to-1',
    description: 'Layout 2 colonnes : session à venir (teal + orange CTA) + historique sessions, coach card sticky avec avatar, spécialités pills, liens contact.',
    path: '/coaching',
    family: 'Coaching',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['two-column', 'sticky card', 'session history', 'action chips'],
    icon: '🎓',
  },
  {
    id: 'pre-coaching-questionnaire',
    name: 'Préparez votre session',
    description: '3 étapes verticales — icône cercle 48px + carte blanche avec question bold + textarea gris. Bouton Envoyer désactivé jusqu\'à saisie.',
    path: '/coaching/pre-questionnaire',
    family: 'Coaching',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['multi-step', 'vertical timeline', 'textarea', 'form validation'],
    icon: '🧠',
  },
  /* ── Premium pages (glass-elevated pass) ── */
  {
    id: 'profile',
    name: 'Profil utilisateur',
    description: 'Hero glass avec avatar gradient + initiales, online dot, meta chips, intérêts pills. Stats row 4 KPI avec tls-kpi-icon colorés. Onglets (Vue d\'ensemble / Activité / Badges / Compétences).',
    path: '/profile',
    family: 'Compte',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['glass hero', 'avatar', 'kpi icons', 'tabs', 'badges', 'skills'],
    icon: '👤',
  },
  {
    id: 'messages',
    name: 'Messagerie',
    description: 'Split layout: liste de threads avec avatars initiales colorés, dots non-lus, filter pills (Tous/Coaching/Équipe/Support), recherche. Panneau conversation avec empty-state illustré.',
    path: '/messages',
    family: 'Communauté',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['split layout', 'avatar stack', 'unread dots', 'filter pills', 'empty state'],
    icon: '💬',
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    description: 'Glass hero éditorial, KPI row 3 colonnes (Layers/ListChecks/CheckCircle2), cartes projet avec badge statut inline, barre de progression + %, meta chips, stack avatars équipe superposés.',
    path: '/collaboration',
    family: 'Communauté',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['glass hero', 'kpi icons', 'project cards', 'avatar stack', 'progress'],
    icon: '🤝',
  },
  {
    id: 'leaderboard',
    name: 'Leaderboard',
    description: 'Podium or/argent/bronze avec gradients, emojis médailles, cercle initiales 48px, badge points, streak flame pill, hover translateY(-3px). KPI row Flame/TrendingUp/Users.',
    path: '/leaderboard',
    family: 'Communauté',
    color: 'var(--tls-yellow-600)',
    bg: 'rgba(248,176,68,0.08)',
    tags: ['podium', 'gold silver bronze', 'gamification', 'streak', 'kpi icons'],
    icon: '🏆',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    description: 'Cards avec bordure gauche 4px colorée par type (info/warm/success), icône bulle tone-aware 36×36, badge unread count live dans le hero, filter pills 4 catégories, bouton "Tout lire".',
    path: '/notifications',
    family: 'Compte',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['notification cards', 'colored border', 'unread badge', 'filter pills', 'tone system'],
    icon: '🔔',
  },
  {
    id: 'settings',
    name: 'Paramètres',
    description: 'Glass hero COMPTE & PRÉFÉRENCES, tls-kpi-row (BellRing/Shield/Palette), 4 cards settings avec switch toggles, selects langue/sécurité, best practice callout.',
    path: '/settings',
    family: 'Compte',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['glass hero', 'kpi icons', 'toggles', 'settings cards', 'select'],
    icon: '⚙️',
  },
];

/* ============================================================================
 * DEMO WRAPPER COMPONENTS — isolate hooks so tab-filter changes don't crash
 * (render functions called as {c.render()} are plain calls, not <Component />,
 *  so any hook inside them belongs to the parent. Wrapping fixes the violation.)
 * ============================================================================ */

const PositionnementModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)', alignItems: 'flex-start' }}>
      <Button onClick={() => setOpen(true)}>🎯 Se positionner</Button>
      <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
        S'ouvre avant de démarrer un parcours. 3 questions, 5 niveaux.
      </p>
      <PositionnementModal isOpen={open} onClose={() => setOpen(false)} courseTitle="Maîtrise des données" />
    </div>
  );
};

const BookingModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)', alignItems: 'flex-start' }}>
      <Button onClick={() => setOpen(true)}>📅 Réserver une session</Button>
      <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
        Calendrier interactif + créneaux disponibles + confirmation 2 étapes.
      </p>
      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onBookingConfirmed={({ date, time }) => { alert(`Session réservée le ${date} à ${time}`); setOpen(false); }}
        coachName="Sophie Martin"
        coachInitials="SM"
      />
    </div>
  );
};

const ConfirmModalDemo: React.FC = () => {
  const [variant, setVariant] = useState<'info' | 'success' | 'warning' | 'danger'>('info');
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
        {(['info', 'success', 'warning', 'danger'] as const).map((v) => (
          <Button key={v} size="sm" variant={variant === v ? 'primary' : 'secondary'} onClick={() => { setVariant(v); setOpen(true); }}>
            {v}
          </Button>
        ))}
      </div>
      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => console.log('Confirmed')}
        title={variant === 'danger' ? 'Supprimer la session ?' : variant === 'warning' ? 'Attention' : variant === 'success' ? 'Confirmer' : 'Information'}
        message="Cette action est irréversible. Êtes-vous sûr de vouloir continuer ?"
        variant={variant}
        confirmText="Oui, continuer"
      />
    </div>
  );
};

const SuccessModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'flex-start' }}>
      <Button onClick={() => setOpen(true)}>🎉 Afficher Success</Button>
      <SuccessModal isOpen={open} onClose={() => setOpen(false)} title="Module complété !" message="Vous avez terminé le module avec succès. Continuez sur votre lancée !" buttonText="Continuer" />
    </div>
  );
};

const StreakCelebrationModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'flex-start' }}>
      <Button onClick={() => setOpen(true)}>🔥 Streak !</Button>
      <StreakCelebrationModal isOpen={open} onClose={() => setOpen(false)} streakCount={14} milestone={14} encouragement="14 jours consécutifs — vous êtes en feu !" />
    </div>
  );
};

const SessionFeedbackModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'flex-start' }}>
      <Button onClick={() => setOpen(true)}>⭐ Donner un avis</Button>
      <SessionFeedbackModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={(rating, comment) => { console.log('Feedback:', rating, comment); }}
      />
    </div>
  );
};

const CancelSessionModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  return (
    <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Button variant="secondary" onClick={() => setOpen(true)}>❌ Annuler une session</Button>
      <CancelSessionModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onCancel={(reason) => { console.log('Annulé, motif:', reason); setOpen(false); }}
        onReschedule={() => { setOpen(false); setShowBooking(true); }}
        sessionTitle="Session de coaching IA"
        sessionDate="Mardi 30 avril 2026 — 14h00"
      />
      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        onBookingConfirmed={({ date, time }) => { console.log('Réservé:', date, time); setShowBooking(false); }}
        coachName="Sophie Martin"
        coachInitials="SM"
      />
    </div>
  );
};

const VideoPlayerModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'flex-start' }}>
      <Button onClick={() => setOpen(true)}>▶ Lancer une vidéo</Button>
      <VideoPlayerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Introduction au Prompt Engineering"
        duration="12:34"
        instructor="Sophie Martin"
        description="Découvrez les fondamentaux du prompt engineering."
      />
    </div>
  );
};

const ToastDemo: React.FC = () => {
  const { toasts, success, error, warning, info, removeToast } = useToast();
  return (
    <div>
      <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap', marginBottom: 'var(--s-4)' }}>
        <Button size="sm" onClick={() => success('Enregistré avec succès !')}>Success</Button>
        <Button size="sm" variant="secondary" onClick={() => error('Une erreur est survenue')}>Erreur</Button>
        <Button size="sm" variant="secondary" onClick={() => warning('Vérifiez votre connexion')}>Warning</Button>
        <Button size="sm" variant="ghost" onClick={() => info('Mise à jour disponible')}>Info</Button>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
        <Toast variant="success" title="Sauvegardé" dismissible={false}>Vos modifications ont été enregistrées.</Toast>
        <Toast variant="danger" title="Erreur" dismissible={false}>Impossible de se connecter au serveur.</Toast>
        <Toast variant="warning" title="Attention" dismissible={false}>Votre session expire dans 5 minutes.</Toast>
        <Toast variant="info" title="Info" dismissible={false}>Nouvelle version disponible.</Toast>
      </div>
    </div>
  );
};

const TabsDemo: React.FC = () => {
  const [active1, setActive1] = useState('tab1');
  const [active2, setActive2] = useState('a');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>
      <div>
        <p style={{ margin: '0 0 var(--s-3)', fontSize: 'var(--t-caption)', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pill (défaut)</p>
        <Tabs
          items={[
            { id: 'tab1', label: '📚 Étapes' },
            { id: 'tab2', label: '🎯 Projet' },
            { id: 'tab3', label: '📊 Stats' },
          ]}
          value={active1}
          onChange={setActive1}
          variant="pill"
        />
      </div>
      <div>
        <p style={{ margin: '0 0 var(--s-3)', fontSize: 'var(--t-caption)', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Underline</p>
        <Tabs
          items={[
            { id: 'a', label: 'Général' },
            { id: 'b', label: 'Sécurité' },
            { id: 'c', label: 'Notifications' },
          ]}
          value={active2}
          onChange={setActive2}
          variant="underline"
        />
      </div>
    </div>
  );
};

const FilterChipDemo: React.FC = () => {
  const [active, setActive] = useState('all');
  return (
    <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
      {['Tous', 'Leadership', 'IA', 'Formation', 'Coaching'].map((label, i) => {
        const key = i === 0 ? 'all' : label.toLowerCase();
        return (
          <FilterChip
            key={key}
            label={label}
            active={active === key}
            onClick={() => setActive(key)}
          />
        );
      })}
      <FilterChip label="Réinitialiser" variant="reset" onClick={() => setActive('all')} />
    </div>
  );
};

const ModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'flex-start' }}>
      <Button onClick={() => setOpen(true)}>Ouvrir Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirmer l'action"
        description="Cette opération ne peut pas être annulée."
        actions={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Annuler</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirmer</Button>
          </>
        }
      >
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--t-body-sm)' }}>
          Voulez-vous vraiment supprimer cet élément ? Cette action est irréversible et toutes les données associées seront perdues.
        </p>
      </Modal>
    </div>
  );
};

const PaginationDemo: React.FC = () => {
  const [page, setPage] = useState(3);
  return (
    <div className="vstack">
      <Pagination page={page} totalPages={12} onChange={setPage} info={`Page ${page} sur 12`} />
    </div>
  );
};

const MultiStepFormDemo: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <div style={{ maxWidth: 500 }}>
      <MultiStepForm
        steps={[
          { id: 1, title: 'Informations', description: 'Vos données personnelles' },
          { id: 2, title: 'Préférences', description: 'Vos préférences d\'apprentissage' },
          { id: 3, title: 'Confirmation', description: 'Vérifiez et confirmez' },
        ]}
        currentStep={step}
        onNext={() => setStep(s => Math.min(s + 1, 3))}
        onBack={() => setStep(s => Math.max(s - 1, 1))}
        showProgressBar
        showStepIndicators
      >
        <div style={{ padding: 'var(--s-4)', background: 'var(--surface-muted)', borderRadius: 'var(--r-lg)' }}>
          {step === 1 && <p>Étape 1: Informations personnelles</p>}
          {step === 2 && <p>Étape 2: Préférences d\'apprentissage</p>}
          {step === 3 && <p>Étape 3: Vérification et confirmation</p>}
        </div>
      </MultiStepForm>
    </div>
  );
};

/* ============================================================================
 * COMPONENT SHOWCASE ENTRIES — 21 components
 * ============================================================================ */

const COMPONENTS: ComponentEntry[] = [
  /* ---- CORE ------------------------------------------------------------- */
  {
    name: 'Button',
    codeName: 'Button.tsx',
    cssBase: '.btn',
    category: 'Core',
    description: 'Single action trigger. Pill shape, clear hierarchy. One primary per screen.',
    keywords: ['cta', 'action', 'primary', 'warm', 'ghost', 'destructive', 'link'],
    render: () => (
      <div className="vstack">
        <div className="hstack">
          <Button variant="primary">Primary</Button>
          <Button variant="warm">Warm</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="brand-ghost">Brand ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="hstack">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra large</Button>
        </div>
        <div className="hstack">
          <Button leadingIcon={I.plus}>With leading icon</Button>
          <Button trailingIcon={I.arrow} variant="warm">Continue</Button>
          <Button iconOnly aria-label="Add" variant="secondary">{I.plus}</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    ),
  },
  {
    name: 'Input',
    codeName: 'Input.tsx',
    cssBase: '.input / .field / .check / .radio / .switch',
    category: 'Core',
    description: 'Form field. Label always above. Includes Checkbox, Radio, Switch sub-components.',
    keywords: ['form', 'text', 'checkbox', 'radio', 'switch', 'textarea'],
    render: () => (
      <div className="vstack" style={{ maxWidth: 480 }}>
        <Input
          label="Nom complet"
          hint="Tel qu'il apparaîtra sur votre certificat"
          id="demo-name"
          placeholder="Jeanne Dupont"
        />
        <Input
          label="Email"
          error="Adresse email invalide"
          id="demo-email"
          required
          type="email"
          status="error"
          placeholder="nom@exemple.fr"
        />
        <Input
          label="Validation OK"
          id="demo-ok"
          status="success"
          defaultValue="jeanne@tls.fr"
        />
        <Input
          label="Message"
          id="demo-msg"
          multiline
          rows={3}
          placeholder="Écrivez ici…"
        />
        <div className="hstack" style={{ alignItems: 'center' }}>
          <Checkbox label="Me tenir informée" defaultChecked />
          <Radio name="demo-r" label="Option A" defaultChecked />
          <Radio name="demo-r" label="Option B" />
          <Switch label="Notifications" defaultChecked />
        </div>
        <div className="hstack">
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </div>
      </div>
    ),
  },
  {
    name: 'Select',
    codeName: 'Select.tsx',
    cssBase: '.field / .input (select wrapper)',
    category: 'Core',
    description: 'Native dropdown with chevron icon. Sizes sm/md/lg, status default/success/error.',
    keywords: ['form', 'dropdown', 'select', 'options'],
    render: () => (
      <div className="vstack" style={{ maxWidth: 480 }}>
        <Select
          label="Langue"
          hint="Choisissez votre langue préférée"
          options={[
            { value: 'fr', label: 'Français' },
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
          ]}
          defaultValue="fr"
        />
        <Select
          label="Niveau"
          error="Sélection requise"
          status="error"
          required
          options={[
            { value: 'beg', label: 'Débutant' },
            { value: 'int', label: 'Intermédiaire' },
            { value: 'adv', label: 'Avancé' },
          ]}
        />
        <Select
          label="Validé"
          status="success"
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
          ]}
          defaultValue="a"
        />
        <div className="hstack">
          <Select size="sm" placeholder="Small" options={[{ value: 'a', label: 'A' }]} />
          <Select size="md" placeholder="Medium" options={[{ value: 'a', label: 'A' }]} />
          <Select size="lg" placeholder="Large" options={[{ value: 'a', label: 'A' }]} />
        </div>
      </div>
    ),
  },
  {
    name: 'FormGroup',
    codeName: 'FormGroup.tsx',
    cssBase: '.form-group',
    category: 'Core',
    description: 'Wrapper combining label + control + hint/error. Layouts: vertical (default) and horizontal.',
    keywords: ['form', 'label', 'wrapper', 'layout', 'hint', 'error'],
    render: () => (
      <div className="flex flex-col gap-4" style={{ maxWidth: 520 }}>
        <FormGroup label="Prénom" hint="Tel qu'il apparaît sur votre profil" id="fg-firstname">
          <Input placeholder="Ex. Marie" />
        </FormGroup>
        <FormGroup label="Email" error="Adresse email invalide" required id="fg-email">
          <Input placeholder="marie@example.com" status="error" />
        </FormGroup>
        <FormGroup label="Niveau" id="fg-level">
          <Select
            options={[
              { value: 'beg', label: 'Débutant' },
              { value: 'int', label: 'Intermédiaire' },
            ]}
            placeholder="Choisir..."
          />
        </FormGroup>
        <FormGroup label="Pays" hint="Affiché sur votre profil public" id="fg-country">
          <Input placeholder="France" />
        </FormGroup>
      </div>
    ),
  },
  {
    name: 'Card',
    codeName: 'Card.tsx',
    cssBase: '.card',
    category: 'Core',
    description: 'Main content unit. 6 variants: default, feature, elevated, interactive (hover lift), glass, minimal.',
    keywords: ['container', 'surface', 'feature', 'elevated', 'interactive', 'glass', 'minimal'],
    render: () => (
      <div className="grid-2">
        <Card>
          <CardEyebrow>DEFAULT</CardEyebrow>
          <CardTitle>Card par défaut</CardTitle>
          <CardDesc>Bordure fine, pas d'ombre. Contenu groupé lisiblement.</CardDesc>
        </Card>
        <Card variant="feature">
          <CardEyebrow>FEATURE</CardEyebrow>
          <CardTitle>Carte mise en avant</CardTitle>
          <CardDesc>Ombre douce, padding généreux, pas de bordure.</CardDesc>
          <CardFooter>
            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--t-caption)' }}>il y a 3 min</span>
            <Button size="sm" variant="ghost">Voir</Button>
          </CardFooter>
        </Card>
        <Card variant="elevated">
          <CardEyebrow>ELEVATED</CardEyebrow>
          <CardTitle>Carte élevée</CardTitle>
          <CardDesc>Ombre moyenne, profondeur accentuée. Pour les contenus importants.</CardDesc>
        </Card>
        <Card variant="interactive" role="button" tabIndex={0}>
          <CardEyebrow>INTERACTIVE</CardEyebrow>
          <CardTitle>Hover pour voir</CardTitle>
          <CardDesc>translateY(-2px) + shadow-md au hover.</CardDesc>
        </Card>
        <div style={{ padding: 'var(--s-4)', background: 'var(--g-warm-soft)', borderRadius: 'var(--r-xl)' }}>
          <Card variant="glass">
            <CardEyebrow>GLASS</CardEyebrow>
            <CardTitle>Glass (sur fond teinté uniquement)</CardTitle>
            <CardDesc>Utiliser seulement sur un fond coloré ou gradient.</CardDesc>
          </Card>
        </div>
        <Card variant="minimal">
          <CardEyebrow>MINIMAL</CardEyebrow>
          <CardTitle>Carte minimale</CardTitle>
          <CardDesc>Transparent avec bordure légère, hover discret. Contenu léger.</CardDesc>
        </Card>
      </div>
    ),
  },
  {
    name: 'Badge',
    codeName: 'Badge.tsx',
    cssBase: '.badge',
    category: 'Core',
    description: 'Compact status tag. Uppercase 11px, 1–2 words max. 7 semantic variants + dot modifier.',
    keywords: ['status', 'label', 'tag', 'brand', 'warm', 'sun', 'success', 'danger', 'info'],
    render: () => (
      <div className="hstack">
        <Badge variant="brand">Brand</Badge>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="warm">Warm</Badge>
        <Badge variant="sun">Sun</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="success" dot>Active</Badge>
        <Badge variant="danger" dot>Offline</Badge>
      </div>
    ),
  },
  {
    name: 'Avatar',
    codeName: 'Avatar.tsx',
    cssBase: '.avatar',
    category: 'Core',
    description: 'User representation: image or initials. Stable hash-based tint. Status dot + AvatarGroup.',
    keywords: ['user', 'profile', 'initials', 'image', 'status', 'online', 'group'],
    render: () => (
      <div className="vstack">
        <div className="hstack" style={{ alignItems: 'center' }}>
          <Avatar size="xs" name="Jeanne Dupont" />
          <Avatar size="sm" name="Paul Martin" />
          <Avatar name="Claire Bernard" />
          <Avatar size="lg" name="Ahmed Ali" />
          <Avatar size="xl" name="Sofia Garcia" />
        </div>
        <div className="hstack" style={{ alignItems: 'center' }}>
          <Avatar name="Brand" tint="brand" />
          <Avatar name="Warm" tint="warm" />
          <Avatar name="Sun" tint="sun" />
          <Avatar name="Ink" tint="ink" />
          <Avatar name="JD" status="online" />
          <Avatar name="PM" status="busy" />
          <Avatar name="AW" status="away" />
        </div>
      </div>
    ),
  },

  /* ---- PATTERNS --------------------------------------------------------- */
  {
    name: 'EmptyState',
    codeName: 'EmptyState.tsx',
    cssBase: '.empty',
    category: 'Patterns',
    description: 'First contact / no results / server error. Always actionable — never a dead end.',
    keywords: ['empty', 'no results', 'placeholder', 'illustration'],
    render: () => (
      <div className="grid-2">
        <EmptyState
          title="Aucun résultat"
          description="Essayez d'ajuster vos filtres ou le terme de recherche."
          actions={<Button variant="primary">Réinitialiser les filtres</Button>}
        />
        <EmptyState
          tone="warm"
          title="Commencez votre premier parcours"
          description="Explorez la bibliothèque et sélectionnez un parcours adapté à vos objectifs."
          actions={<Button variant="warm">Explorer</Button>}
        />
      </div>
    ),
  },
  {
    name: 'Skeleton',
    codeName: 'Skeleton.tsx',
    cssBase: '.skeleton',
    category: 'Patterns',
    description: 'Placeholder shimmer matching expected content shape. Use for 1–3s loads.',
    keywords: ['loading', 'placeholder', 'shimmer'],
    render: () => (
      <div className="vstack" style={{ maxWidth: 420 }}>
        <div className="hstack" style={{ alignItems: 'center' }}>
          <Skeleton variant="circle" width={40} height={40} />
          <div className="vstack" style={{ flex: 1, gap: 8 }}>
            <Skeleton variant="title" />
            <Skeleton variant="text" width="80%" />
          </div>
        </div>
        <Skeleton variant="block" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="70%" />
      </div>
    ),
  },
  {
    name: 'Search',
    codeName: 'Search.tsx',
    cssBase: '.search',
    category: 'Patterns',
    description: 'Search bar with optional shortcut hint. Sizes: default, lg.',
    keywords: ['find', 'query', 'filter'],
    render: () => (
      <div className="vstack" style={{ maxWidth: 520 }}>
        <Search placeholder="Rechercher un parcours…" shortcut="⌘K" />
        <Search size="lg" placeholder="Rechercher partout…" shortcut="⌘K" />
      </div>
    ),
  },

  /* ---- LEARNING --------------------------------------------------------- */
  {
    name: 'StatCard',
    codeName: 'StatCard.tsx',
    cssBase: '.stat-card',
    category: 'Learning',
    description: 'Prominent metric. Display number + micro label + optional delta. 4 surface variants.',
    keywords: ['metric', 'kpi', 'stat', 'dashboard'],
    render: () => (
      <div className="grid-2">
        <StatCard label="PARCOURS COMPLÉTÉS" value={12} sub="/24" delta="+3 ce mois" deltaDirection="up" />
        <StatCard variant="elevated" label="HEURES D'APPRENTISSAGE" value="48" sub="h" />
        <StatCard variant="warm" label="SÉRIE" value={7} sub="jours" delta="Record personnel" deltaDirection="up" />
        <StatCard variant="brand" label="PROGRESSION MOYENNE" value={78} sub="%" />
      </div>
    ),
  },
  {
    name: 'ProgressBar',
    codeName: 'ProgressBar.tsx',
    cssBase: '.progress',
    category: 'Learning',
    description: 'Linear progress tracking. Sizes sm/md/lg. Fills: brand, warm, gradient.',
    keywords: ['progress', 'linear', 'bar', 'percentage'],
    render: () => (
      <div className="vstack">
        <ProgressBar label="Module 3 · Design systems" value={72} />
        <ProgressBar label="Série hebdo" value={40} fill="warm" />
        <ProgressBar label="Gradient fill" value={60} fill="gradient" size="lg" />
        <ProgressBar value={25} size="sm" valueLabel={false} />
      </div>
    ),
  },

  /* ---- CONTENT & DISPLAY ------------------------------------------------ */
  {
    name: 'ActionCard',
    codeName: 'ActionCard.tsx',
    cssBase: '.tls-action-card / .tls-action-card--brand/warm/sun',
    category: 'Content',
    description: 'Carte action horizontale: icône colorée + titre + description + CTA. Tones: brand/warm/sun. Hover: translateY(-3px) + shadow-md.',
    keywords: ['action', 'card', 'icon', 'cta', 'tone', 'brand', 'warm', 'sun', 'quick-action'],
    render: () => (
      <div className="vstack">
        <ActionCard
          tone="brand"
          icon={I.book}
          title="Continuer mon parcours"
          description="Prompt Engineering — Module 3 sur 8"
          action={<Button size="sm" variant="primary">Reprendre</Button>}
        />
        <ActionCard
          tone="warm"
          icon={I.trophy}
          title="Réserver une session"
          description="Coaching individuel avec Sophie Martin"
          action={<Button size="sm" variant="warm">Réserver</Button>}
        />
        <ActionCard
          tone="sun"
          icon={I.heart}
          title="Voir mes badges"
          description="Découvrez vos accomplissements récents"
          action={<Button size="sm" variant="secondary">Voir</Button>}
        />
      </div>
    ),
  },
  {
    name: 'ActivityItem',
    codeName: 'ActivityItem.tsx',
    cssBase: '.tls-activity-item / .tls-activity-item--lesson/achievement/coach/journal',
    category: 'Content',
    description: 'Ligne d\'activité timeline. Dot coloré par type + connecteur entre items. Types: lesson/achievement/coach/journal. Hover: surface-muted.',
    keywords: ['activity', 'feed', 'timeline', 'history', 'notification', 'dot', 'type'],
    render: () => (
      <div style={{ padding: 'var(--s-2) var(--s-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)' }}>
        <ActivityItem type="lesson" icon={I.check} title="Leçon terminée" description="Introduction au Prompt Engineering" timestamp="Il y a 2h" />
        <ActivityItem type="achievement" icon={I.trophy} title="Badge débloqué" description="Pionnier IA — Premier badge gagné !" timestamp="Hier" />
        <ActivityItem type="coach" icon={I.heart} title="Session coaching" description="Sophie Martin — Leadership" timestamp="Aujourd'hui" />
        <ActivityItem type="journal" icon={I.book} title="Journal mis à jour" description="Réflexions sur les nouvelles compétences" timestamp="Avant-hier" />
      </div>
    ),
  },
  {
    name: 'SectionTitle',
    codeName: 'SectionTitle.tsx',
    cssBase: '.tls-section-title',
    category: 'Content',
    description: 'En-tête de section. Icône optionnelle + titre + sous-titre + action à droite. Variante divider pour ligne de séparation.',
    keywords: ['heading', 'section', 'title', 'subtitle', 'header', 'icon', 'action'],
    render: () => (
      <div className="vstack">
        <SectionTitle title="Actions rapides" subtitle="Accédez directement à vos fonctionnalités" icon="⚡" />
        <SectionTitle title="Fil d'actualité" divider action={<button type="button" className="btn btn--secondary btn--sm">Voir tout</button>} />
        <SectionTitle title="Parcours" />
      </div>
    ),
  },

  /* ---- TLS APP PATTERNS ------------------------------------------------- */
  {
    name: 'CardGrid',
    codeName: 'patterns/CardGrid.tsx',
    cssBase: '.card-grid',
    category: 'Patterns',
    description: 'Grid responsive réutilisable. Layouts: compact (2 col), default (3 col), feature (4 col), autoFit. Breakpoints automatiques mobile/tablette/desktop.',
    keywords: ['grid', 'layout', 'responsive', 'columns', 'cards'],
    render: () => (
      <div className="vstack">
        <p style={{ fontSize: 'var(--t-micro)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>layout="default" (3 col)</p>
        <div className="card-grid card-grid--default card-grid--gap-sm">
          {['Module A', 'Module B', 'Module C'].map((t) => (
            <div key={t} style={{ padding: 'var(--s-3)', background: 'var(--tls-primary-50)', border: '1px solid rgba(85,161,180,0.2)', borderRadius: 'var(--r-lg)', fontSize: 'var(--t-caption)', color: 'var(--tls-primary-700)', fontWeight: 600 }}>{t}</div>
          ))}
        </div>
        <p style={{ fontSize: 'var(--t-micro)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>layout="feature" (4 col)</p>
        <div className="card-grid card-grid--feature card-grid--gap-sm">
          {['Actu', 'Tutoriel', 'Dossier', 'Mag'].map((t) => (
            <div key={t} style={{ padding: 'var(--s-3)', background: 'rgba(237,132,58,0.07)', border: '1px solid rgba(237,132,58,0.2)', borderRadius: 'var(--r-lg)', fontSize: 'var(--t-caption)', color: 'var(--tls-orange-600)', fontWeight: 600 }}>{t}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: 'InlineProgress',
    codeName: 'patterns/InlineProgress.tsx',
    cssBase: '.inline-progress',
    category: 'Patterns',
    description: 'Barre de progression embarquée dans les cartes et listes. Tones: primary / warm / sun. Sizes: sm / md. Label en % optionnel.',
    keywords: ['progress', 'inline', 'bar', 'percent', 'completion'],
    render: () => (
      <div className="vstack" style={{ maxWidth: 400 }}>
        {[
          { label: 'Prompt Engineering', value: 92, tone: 'primary' as const },
          { label: 'Leadership',         value: 67, tone: 'warm' as const },
          { label: 'IA Générative',      value: 84, tone: 'sun' as const },
        ].map(({ label, value, tone }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
            <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text)', fontWeight: 600, minWidth: 140 }}>{label}</span>
            <div className={`inline-progress inline-progress--${tone} inline-progress--md`} style={{ flex: 1 }}>
              <div className="inline-progress__track">
                <div className="inline-progress__fill" style={{ width: `${value}%` }} />
              </div>
              <span className="inline-progress__label">{value}%</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'MetaPillGroup',
    codeName: 'ui/MetaPillGroup.tsx',
    cssBase: '.tls-meta-pill',
    category: 'Patterns',
    description: 'Collection de MetaPill avec tones (primary/warm/sun/brand). Layouts horizontal/vertical. Remplace les chips dispersés dans les pages.',
    keywords: ['pill', 'chip', 'tag', 'meta', 'group', 'tone'],
    render: () => (
      <div className="vstack">
        <div className="hstack" style={{ flexWrap: 'wrap' }}>
          <span className="tls-meta-pill">Default</span>
          <span className="tls-meta-pill tls-meta-pill--primary">Primary</span>
          <span className="tls-meta-pill tls-meta-pill--warm">Warm</span>
          <span className="tls-meta-pill tls-meta-pill--sun">Sun</span>
          <span className="tls-meta-pill tls-meta-pill--brand">Brand</span>
        </div>
        <div className="hstack" style={{ flexWrap: 'wrap' }}>
          <span className="tls-meta-pill tls-meta-pill--sm tls-meta-pill--primary">Sm primary</span>
          <span className="tls-meta-pill tls-meta-pill--primary">Md primary</span>
          <span className="tls-meta-pill tls-meta-pill--lg tls-meta-pill--primary">Lg primary</span>
        </div>
      </div>
    ),
  },
  {
    name: 'TLS KPI Pattern',
    codeName: 'static-pages.css',
    cssBase: '.tls-kpi + .tls-kpi-icon',
    category: 'Patterns',
    description: 'Bloc statistique standardisé: icône colorée 44×44 (tls-kpi-icon) + grand chiffre 800w + label muted. Utilisé sur Dashboard, Journal, Coaching, Collaboration, Settings, Leaderboard.',
    keywords: ['kpi', 'stat', 'metric', 'icon', 'number'],
    render: () => (
      <section className="tls-kpi-row">
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)', marginBottom: 'var(--s-2)' }}>
            {I.book}
          </div>
          <strong style={{ color: 'var(--tls-primary-700)' }}>12</strong>
          <span>Cours terminés</span>
        </div>
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'rgba(237,132,58,0.10)', color: 'var(--tls-orange-600)', marginBottom: 'var(--s-2)' }}>
            {I.trophy}
          </div>
          <strong style={{ color: 'var(--tls-orange-600)' }}>2 450</strong>
          <span>Points XP</span>
        </div>
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'rgba(234,192,74,0.12)', color: 'var(--tls-yellow-600)', marginBottom: 'var(--s-2)' }}>
            {I.heart}
          </div>
          <strong style={{ color: 'var(--tls-yellow-600)' }}>7j</strong>
          <span>Série actuelle</span>
        </div>
      </section>
    ),
  },
  {
    name: 'Filter Pills',
    codeName: 'static-pages.css',
    cssBase: '.tls-filter-pill / .tls-filter-pill--active',
    category: 'Patterns',
    description: 'Pills de filtrage CSS-only avec focus ring WCAG AA. État actif via aria-selected ou classe --active. Utilisées sur Journal, Notifications, Messages, Veille.',
    keywords: ['filter', 'pill', 'tab', 'category', 'active', 'aria'],
    render: () => (
      <div role="tablist" className="hstack" style={{ flexWrap: 'wrap' }}>
        <button type="button" role="tab" aria-selected={true}  className="tls-filter-pill tls-filter-pill--active">⚡ Tous</button>
        <button type="button" role="tab" aria-selected={false} className="tls-filter-pill">{I.book} Formations</button>
        <button type="button" role="tab" aria-selected={false} className="tls-filter-pill">{I.trophy} Badges</button>
        <button type="button" role="tab" aria-selected={false} className="tls-filter-pill">{I.heart} Favoris</button>
      </div>
    ),
  },

  /* ---- NAVIGATION ------------------------------------------------------- */
  {
    name: 'Sidebar',
    codeName: 'Sidebar.tsx',
    cssBase: '.sidebar / .nav-item',
    category: 'Navigation',
    description: 'Primary app navigation. Grouped sections, active state with 3px left bar.',
    keywords: ['sidebar', 'nav', 'menu', 'shell'],
    render: () => (
      <div style={{ height: 380, background: 'var(--surface-muted)', borderRadius: 'var(--r-xl)', padding: 12, display: 'flex' }}>
        <Sidebar
          brand={<><span style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--tls-primary-500)' }} /> <span>TLS</span></>}
          user={<><Avatar size="sm" name="Jeanne Dupont" /><div><p style={{ margin: 0, fontWeight: 600, fontSize: 'var(--t-caption)' }}>Jeanne D.</p><p style={{ margin: 0, fontSize: 'var(--t-micro)', color: 'var(--text-muted)' }}>Apprenante</p></div></>}
        >
          <SidebarGroup label="Principal">
            <NavItem icon={I.home} label="Tableau de bord" active />
            <NavItem icon={I.book} label="Parcours" count={3} />
            <NavItem icon={I.trophy} label="Récompenses" />
          </SidebarGroup>
          <SidebarGroup label="Paramètres">
            <NavItem icon={I.settings} label="Préférences" />
          </SidebarGroup>
        </Sidebar>
      </div>
    ),
  },

  /* ---- MODALS ---------------------------------------------------------------- */
  {
    name: 'PositionnementModal',
    codeName: 'modals/PositionnementModal.tsx',
    cssBase: '—',
    category: 'Modals',
    description: 'Auto-évaluation des compétences apprenant avant de démarrer un parcours. 5 niveaux, barre de progression, écran de succès.',
    keywords: ['modal', 'positioning', 'competence', 'assessment', 'level', 'self-eval'],
    render: () => <PositionnementModalDemo />,
  },
  {
    name: 'BookingModal',
    codeName: 'modals/BookingModal.tsx',
    cssBase: '—',
    category: 'Modals',
    description: 'Réservation de session coaching en 2 étapes : sélection date/heure via calendrier + confirmation.',
    keywords: ['modal', 'booking', 'calendar', 'coaching', 'slot', 'time', 'reservation'],
    render: () => <BookingModalDemo />,
  },
  {
    name: 'ConfirmModal',
    codeName: 'modals/ConfirmModal.tsx',
    cssBase: '—',
    category: 'Modals',
    description: 'Dialog de confirmation générique. 4 variantes: info, success, warning, danger.',
    keywords: ['modal', 'confirm', 'dialog', 'alert', 'danger', 'warning', 'info'],
    render: () => <ConfirmModalDemo />,
  },
  {
    name: 'SuccessModal',
    codeName: 'modals/SuccessModal.tsx',
    cssBase: '—',
    category: 'Modals',
    description: 'Célébration de réussite générique. Icône check animée avec ring pulsé.',
    keywords: ['modal', 'success', 'celebration', 'achievement', 'check', 'completion'],
    render: () => <SuccessModalDemo />,
  },
  {
    name: 'StreakCelebrationModal',
    codeName: 'modals/StreakCelebrationModal.tsx',
    cssBase: '—',
    category: 'Modals',
    description: 'Célébration de série quotidienne. Particules feu, streak count, stats semaines/XP.',
    keywords: ['modal', 'streak', 'flame', 'celebration', 'consecutive', 'days', 'gamification'],
    render: () => <StreakCelebrationModalDemo />,
  },
  {
    name: 'SessionFeedbackModal',
    codeName: 'modals/SessionFeedbackModal.tsx',
    cssBase: '—',
    category: 'Modals',
    description: 'Notation étoiles + commentaire. Feedback post-session coaching ou fin de leçon.',
    keywords: ['modal', 'feedback', 'rating', 'stars', 'review', 'comment', 'session'],
    render: () => <SessionFeedbackModalDemo />,
  },
  {
    name: 'CancelSessionModal',
    codeName: 'modals/CancelSessionModal.tsx',
    cssBase: '—',
    category: 'Modals',
    description: 'Annulation ou reprogrammation d\'une session coaching avec sélection du motif.',
    keywords: ['modal', 'cancel', 'session', 'coaching', 'reschedule', 'reason'],
    render: () => <CancelSessionModalDemo />,
  },
  {
    name: 'VideoPlayerModal',
    codeName: 'modals/VideoPlayerModal.tsx',
    cssBase: '—',
    category: 'Modals',
    description: 'Lecteur vidéo plein écran pour tutoriels, leçons vidéo et contenu Veille.',
    keywords: ['modal', 'video', 'player', 'media', 'fullscreen', 'veille', 'tutorial'],
    render: () => <VideoPlayerModalDemo />,
  },

  /* ---- LEARNING SYSTEM COMPONENTS ----------------------------------------- */
  {
    name: 'GlassCard',
    codeName: 'GlassCard.tsx',
    cssBase: '.tls-glass-card / .tls-glass-card--default/brand/warm/dark',
    category: 'Patterns',
    description: 'Carte glassmorphism avec backdrop-filter blur. Tones: default, brand, warm, dark. Utilisée dans les heroes et sections éditorialles.',
    keywords: ['glass', 'card', 'blur', 'frosted', 'hero', 'backdrop', 'tone'],
    render: () => (
      <div style={{ display: 'flex', gap: 'var(--s-4)', flexWrap: 'wrap', background: 'var(--g-hero)', padding: 'var(--s-6)', borderRadius: 'var(--r-xl)' }}>
        <div style={{ flex: 1, minWidth: 120 }}>
          <GlassCard tone="default">
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--text)' }}>Default</p>
            <p style={{ margin: 'var(--s-1) 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>Fond clair + blur</p>
          </GlassCard>
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <GlassCard tone="brand">
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--on-color-text-main)' }}>Brand</p>
            <p style={{ margin: 'var(--s-1) 0 0', fontSize: 'var(--t-caption)', color: 'var(--on-color-text-muted)' }}>Teinte primaire</p>
          </GlassCard>
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <GlassCard tone="warm">
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--tls-orange-800)' }}>Warm</p>
            <p style={{ margin: 'var(--s-1) 0 0', fontSize: 'var(--t-caption)', color: 'var(--tls-orange-700)' }}>Teinte orange</p>
          </GlassCard>
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <GlassCard tone="dark">
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--on-color-text-main)' }}>Dark</p>
            <p style={{ margin: 'var(--s-1) 0 0', fontSize: 'var(--t-caption)', color: 'var(--on-color-text-muted)' }}>Fond profond</p>
          </GlassCard>
        </div>
      </div>
    ),
  },
  {
    name: 'Toast + useToast',
    codeName: 'Toast.tsx / useToast.ts',
    cssBase: '.toast / .toast__icon--*',
    category: 'Patterns',
    description: 'Notification toast avec hook useToast(). 4 variantes: success / info / warning / danger. Auto-dismiss configurable, dismissible, slot action.',
    keywords: ['toast', 'notification', 'alert', 'feedback', 'success', 'error', 'warning'],
    render: () => <ToastDemo />,
  },
  {
    name: 'Tabs',
    codeName: 'Tabs.tsx',
    cssBase: '.tabs / .tab / .tab--active',
    category: 'Navigation',
    description: 'Navigation par onglets. Variante pill (défaut) ou underline. 2–5 onglets, aria-selected + keyboard navigation. Utilisé dans Account, Profile, LearningPathDetail.',
    keywords: ['tab', 'navigation', 'pill', 'underline', 'switch'],
    render: () => <TabsDemo />,
  },
  {
    name: 'FilterChip',
    codeName: 'FilterChip.tsx',
    cssBase: '.filter-chip',
    category: 'Patterns',
    description: 'Chip de filtrage cliquable avec état actif. Supporte icon, variante reset. Accessibilité: focus ring WCAG AA.',
    keywords: ['filter', 'chip', 'tag', 'select', 'active'],
    render: () => <FilterChipDemo />,
  },
  {
    name: 'Medal',
    codeName: 'Medal.tsx',
    cssBase: '.medal',
    category: 'Learning',
    description: 'Médaille de réussite: cercle avec anneau en pointillés intérieur. Warm gradient = déverrouillé, Brand deep = spécial/rare, Ink gray = verrouillé.',
    keywords: ['medal', 'badge', 'achievement', 'reward', 'locked', 'unlocked'],
    render: () => (
      <div style={{ display: 'flex', gap: 'var(--s-4)', alignItems: 'center', flexWrap: 'wrap' }}>
        <Medal size="lg" variant="default">🏆</Medal>
        <Medal size="lg" variant="brand">⚡</Medal>
        <Medal size="lg" variant="locked">🔒</Medal>
        <Medal size="md" variant="default">🎯</Medal>
        <Medal size="md" variant="brand">🌟</Medal>
        <Medal size="sm" variant="default">✨</Medal>
      </div>
    ),
  },
  {
    name: 'ProgressRing',
    codeName: 'ProgressRing.tsx',
    cssBase: 'ProgressRing (inline SVG)',
    category: 'Learning',
    description: 'Anneau de progression SVG circulaire. Tailles: sm/md/lg/xl. Animation de fill avec stroke-dashoffset. Utilisé dans profil, badges de compétences.',
    keywords: ['progress', 'ring', 'circle', 'circular', 'svg', 'percentage'],
    render: () => (
      <div style={{ display: 'flex', gap: 'var(--s-6)', alignItems: 'center', flexWrap: 'wrap' }}>
        <ProgressRing value={75} size={100} label="Parcours" />
        <ProgressRing value={45} size={80} label="Leçons" />
        <ProgressRing value={90} size={64} />
        <ProgressRing value={30} size={48} />
      </div>
    ),
  },
  {
    name: 'CompetenceBadge',
    codeName: 'CompetenceBadge.tsx',
    cssBase: '.comp-badge',
    category: 'Learning',
    description: '4 niveaux de compétence avec code couleur progressif. Niveau 1 = débutant (gris), Niveau 4 = expert (primary vibrant). Utilisé dans profil compétences.',
    keywords: ['competence', 'skill', 'level', 'badge', 'proficiency'],
    render: () => (
      <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
        <CompetenceBadge level={1} label="Sensibilisé" />
        <CompetenceBadge level={2} label="Pratiquant" />
        <CompetenceBadge level={3} label="Autonome" />
        <CompetenceBadge level={4} label="Expert" />
      </div>
    ),
  },
  {
    name: 'MasteryBadge',
    codeName: 'MasteryBadge.tsx',
    cssBase: '.mastery-badge',
    category: 'Learning',
    description: '5 niveaux de maîtrise (Novice → Expert) avec représentation de la taxonomie de Bloom. Progression visuelle par couleur du clair au vif.',
    keywords: ['mastery', 'skill', 'bloom', 'taxonomy', 'level', 'novice', 'expert'],
    render: () => (
      <div style={{ display: 'flex', gap: 'var(--s-4)', flexWrap: 'wrap' }}>
        <MasteryBadge level="beginner" label="Découverte" progress={30} />
        <MasteryBadge level="intermediate" label="Prompt Engineering" progress={65} />
        <MasteryBadge level="advanced" label="IA Générative" progress={80} />
        <MasteryBadge level="expert" label="Design System" progress={100} />
      </div>
    ),
  },
  {
    name: 'Achievement',
    codeName: 'Achievement.tsx',
    cssBase: '.achievement',
    category: 'Learning',
    description: 'Composant de récompense/achievement. 3 variantes: unlocked (déverrouillé), locked (verrouillé avec opacité réduite), in-progress (avec barre de progression).',
    keywords: ['achievement', 'badge', 'unlocked', 'locked', 'milestone', 'reward'],
    render: () => (
      <div style={{ display: 'flex', gap: 'var(--s-4)', flexWrap: 'wrap' }}>
        <Achievement icon="🏆" title="Pionnier IA" description="Premier parcours terminé" unlockedAt="15 janv. 2024" variant="unlocked" size="md" />
        <Achievement icon="⚡" title="Streak Master" description="7 jours consécutifs" progress={7} maxProgress={10} variant="in-progress" size="md" />
        <Achievement icon="🌟" title="Mentor" description="Aidez 5 collègues" variant="locked" size="md" />
      </div>
    ),
  },
  {
    name: 'TrendingBadge',
    codeName: 'TrendingBadge.tsx',
    cssBase: '.trending-badge',
    category: 'Learning',
    description: 'Indicateur de preuve sociale: Trending, Popular, Recommended, Featured, New. Animations subtiles. Utilisé sur les cartes de cours/veille.',
    keywords: ['trending', 'popular', 'featured', 'new', 'badge', 'social proof'],
    render: () => (
      <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
        <TrendingBadge type="trending" />
        <TrendingBadge type="popular" />
        <TrendingBadge type="recommended" />
        <TrendingBadge type="featured" />
        <TrendingBadge type="new" />
      </div>
    ),
  },
  {
    name: 'Stepper',
    codeName: 'Stepper.tsx',
    cssBase: '.stepper / .stepper__step',
    category: 'Navigation',
    description: 'Indicateur d\'étapes séquentiel. Orientations: horizontal/vertical. États par step: done/current/upcoming. Utilisé dans onboarding, wizards multi-étapes.',
    keywords: ['stepper', 'steps', 'progress', 'wizard', 'onboarding', 'sequence'],
    render: () => {
      const steps = [
        { id: '1', label: 'Positionnement', state: 'done' as const },
        { id: '2', label: 'Parcours', state: 'current' as const },
        { id: '3', label: 'Coaching', state: 'upcoming' as const },
        { id: '4', label: 'Certification', state: 'upcoming' as const },
      ];
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>
          <Stepper items={steps} orientation="horizontal" />
          <Stepper items={steps} orientation="vertical" />
        </div>
      );
    },
  },

  /* ---- FEEDBACK --------------------------------------------------------- */
  {
    name: 'Alert',
    codeName: 'Alert.tsx',
    cssBase: '.alert / .alert--*',
    category: 'Feedback',
    description: 'Message contextuel persistant ancré dans la page. 4 variantes sémantiques: info, success, warning, danger. Patterns: banner (défaut) et inline (compact).',
    keywords: ['alert', 'message', 'warning', 'error', 'success', 'info', 'danger', 'banner', 'inline'],
    render: () => (
      <div className="vstack">
        <Alert variant="info" title="Information">Mise à jour disponible — rechargez la page pour en bénéficier.</Alert>
        <Alert variant="success" title="Enregistré avec succès" dismissible>Vos modifications ont bien été sauvegardées.</Alert>
        <Alert variant="warning" title="Attention" actions={<Button size="sm" variant="ghost">Voir les détails</Button>}>
          Votre session expire dans 5 minutes.
        </Alert>
        <Alert variant="danger" title="Erreur de connexion">Impossible de joindre le serveur. Vérifiez votre connexion.</Alert>
        <div className="hstack">
          <Alert variant="info" pattern="inline">Inline info</Alert>
          <Alert variant="success" pattern="inline">Inline success</Alert>
          <Alert variant="warning" pattern="inline">Inline warning</Alert>
          <Alert variant="danger" pattern="inline">Inline danger</Alert>
        </div>
      </div>
    ),
  },
  {
    name: 'Modal',
    codeName: 'Modal.tsx',
    cssBase: '.modal / .modal-scrim',
    category: 'Feedback',
    description: 'Dialog bloquant pour décisions critiques. Scrim + blur en arrière-plan. Fermeture via Escape, bouton close, ou clic scrim. Slots: title, description, actions, body.',
    keywords: ['modal', 'dialog', 'overlay', 'popup', 'scrim', 'interrupt'],
    render: () => <ModalDemo />,
  },
  {
    name: 'Celebration',
    codeName: 'Celebration.tsx',
    cssBase: '.celebration / .inline-win',
    category: 'Feedback',
    description: 'Moments de victoire. Deux formes: banner (plein) et inline-win (compact). Règle: rare = précieux, célébrer les vrais jalons uniquement.',
    keywords: ['celebration', 'win', 'achievement', 'confetti', 'success', 'milestone', 'reward'],
    render: () => (
      <div className="vstack">
        <Celebration
          title="Parcours complété !"
          description="Félicitations ! Vous avez terminé le parcours Prompt Engineering avec 92% de réussite."
          actions={
            <>
              <Button variant="warm">Voir mon badge</Button>
              <Button variant="ghost">Partager</Button>
            </>
          }
        />
      </div>
    ),
  },

  /* ---- NAVIGATION (additional) ----------------------------------------- */
  {
    name: 'Breadcrumb',
    codeName: 'Breadcrumb.tsx',
    cssBase: '.breadcrumb / .breadcrumb__current / .breadcrumb--sticky',
    category: 'Navigation',
    description: 'Fil d\'Ariane pour hiérarchies ≥ 3 niveaux. Dernier élément non cliquable (bold). Hover: tls-primary-600. Variante sticky: blur + border-bottom.',
    keywords: ['breadcrumb', 'navigation', 'path', 'hierarchy', 'ariane', 'sticky'],
    render: () => (
      <div className="vstack">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '#' },
            { label: 'Parcours', href: '#' },
            { label: 'Prompt Engineering', href: '#' },
            { label: 'Module 3' },
          ]}
        />
        <Breadcrumb
          separator="›"
          items={[
            { label: 'Veille', href: '#' },
            { label: 'Dossiers', href: '#' },
            { label: 'IA & Travail' },
          ]}
        />
        <div style={{ background: 'var(--bg)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
          <Breadcrumb
            sticky
            items={[
              { label: 'Accueil', href: '#' },
              { label: 'Veille', href: '#' },
              { label: 'Article courant' },
            ]}
          />
          <div style={{ padding: 'var(--s-4)', fontSize: 'var(--t-caption)', color: 'var(--text-soft)' }}>sticky — blur + border-bottom</div>
        </div>
      </div>
    ),
  },
  {
    name: 'Pagination',
    codeName: 'Pagination.tsx',
    cssBase: '.pager / .pager__dots / .pager-info',
    category: 'Navigation',
    description: 'Navigation numérotée pour longues listes. Points de troncature automatiques. Boutons prev/next. Info texte optionnel.',
    keywords: ['pagination', 'pages', 'nav', 'numbered', 'prev', 'next'],
    render: () => <PaginationDemo />,
  },
  {
    name: 'Steps',
    codeName: 'Steps.tsx',
    cssBase: '.steps / .step / .step--done / .step--current',
    category: 'Navigation',
    description: 'Checklist séquentielle d\'étapes au sein d\'une tâche ou d\'un parcours. États: done, current, upcoming. Différent du Stepper (linéaire horizontal/vertical).',
    keywords: ['steps', 'checklist', 'task', 'journey', 'done', 'current', 'sequential'],
    render: () => (
      <Steps
        items={[
          { title: 'Créer votre compte', description: 'Email + mot de passe sécurisé', state: 'done' },
          { title: 'Compléter votre profil', description: 'Nom, photo, objectifs', state: 'done' },
          { title: 'Se positionner', description: 'Évaluation initiale de compétences', state: 'current' },
          { title: 'Choisir un parcours', description: 'Sélectionnez votre première formation', state: 'upcoming' },
          { title: 'Démarrer l\'apprentissage', state: 'upcoming' },
        ]}
      />
    ),
  },
  {
    name: 'DropdownMenu',
    codeName: 'DropdownMenu.tsx',
    cssBase: '.dd / .dd__item / .dd__item--danger / .dd__sep',
    category: 'Navigation',
    description: 'Menu d\'actions secondaires derrière un déclencheur. Labels de section, séparateurs, zone danger en bas. Le consommateur gère l\'état ouvert/fermé et le positionnement.',
    keywords: ['dropdown', 'menu', 'actions', 'context', 'secondary', 'popover'],
    render: () => (
      <div style={{ display: 'flex', gap: 'var(--s-8)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <DropdownMenu style={{ width: 220, position: 'static', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', background: 'var(--surface)', overflow: 'hidden' }}>
          <DropdownLabel>Actions</DropdownLabel>
          <DropdownItem icon={I.edit} shortcut="⌘E">Modifier</DropdownItem>
          <DropdownItem icon={I.arrow}>Partager</DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={I.trash} danger>Supprimer</DropdownItem>
        </DropdownMenu>
      </div>
    ),
  },

  /* ---- CONTENT (additional) --------------------------------------------- */
  {
    name: 'Tag',
    codeName: 'Tag.tsx',
    cssBase: '.tag / .tag--removable',
    category: 'Content',
    description: 'Étiquette de catégorie ou filtre actif. Neutre par défaut, supprimable pour les filtres actifs (bouton ×).',
    keywords: ['tag', 'label', 'category', 'filter', 'removable', 'chip'],
    render: () => (
      <div className="hstack" style={{ flexWrap: 'wrap' }}>
        <Tag>Leadership</Tag>
        <Tag>IA Générative</Tag>
        <Tag leadingIcon={I.book}>Formation</Tag>
        <Tag onRemove={() => {}}>Supprimable ×</Tag>
        <Tag leadingIcon={I.trophy} onRemove={() => {}}>Badge actif</Tag>
      </div>
    ),
  },
  {
    name: 'MetaPill',
    codeName: 'MetaPill.tsx',
    cssBase: '.tls-meta-pill / .tls-meta-pill--*',
    category: 'Content',
    description: 'Pilule de métadonnée unique avec tones et tailles. Contrairement à MetaPillGroup, s\'utilise seul pour des contextes précis. Clickable optionnel.',
    keywords: ['pill', 'meta', 'chip', 'tag', 'tone', 'primary', 'warm', 'sun', 'brand'],
    render: () => (
      <div className="vstack">
        <div className="hstack" style={{ flexWrap: 'wrap' }}>
          <MetaPill text="Default" />
          <MetaPill text="Primary" tone="primary" />
          <MetaPill text="Warm" tone="warm" />
          <MetaPill text="Sun" tone="sun" />
          <MetaPill text="Brand" tone="brand" />
        </div>
        <div className="hstack" style={{ flexWrap: 'wrap' }}>
          <MetaPill text="Small" size="sm" tone="primary" />
          <MetaPill text="Medium" size="md" tone="primary" />
          <MetaPill text="Large" size="lg" tone="primary" />
          <MetaPill text="Cliquable" tone="warm" onClick={() => {}} />
        </div>
      </div>
    ),
  },
  {
    name: 'MetaItem',
    codeName: 'MetaItem.tsx',
    cssBase: '.tls-meta-item / .tls-meta-item--sm / .tls-meta-item--brand/warm',
    category: 'Content',
    description: 'Paire label/valeur pour les métadonnées structurées. Sizes: sm/md. Tones: muted (défaut)/brand/warm. Icon optionnel dans le label.',
    keywords: ['meta', 'item', 'label', 'value', 'pair', 'data', 'detail', 'size', 'tone'],
    render: () => (
      <div className="vstack" style={{ maxWidth: 360 }}>
        <MetaItem label="Durée" value="4h 30min" />
        <MetaItem label="Niveau" value="Intermédiaire" tone="brand" />
        <MetaItem label="Modules" value="12 leçons" tone="warm" />
        <MetaItem label="Certifié" value="Oui" size="sm" />
      </div>
    ),
  },
  {
    name: 'UserInfo',
    codeName: 'UserInfo.tsx',
    cssBase: '.tls-user-info / .tls-user-info--sm|md|lg',
    category: 'Content',
    description: 'Bloc identité utilisateur compact: avatar + nom + rôle + status dot optionnel. Tailles: sm/md/lg. Statuts: online/offline/away.',
    keywords: ['user', 'info', 'avatar', 'name', 'role', 'identity', 'author', 'status', 'online'],
    render: () => (
      <div className="vstack" style={{ maxWidth: 320 }}>
        <UserInfo name="Jeanne Dupont" role="Apprenante" size="sm" status="online" />
        <UserInfo name="Sophie Martin" role="Coach certifiée" size="md" status="away" />
        <UserInfo name="Ahmed Ali" role="Formateur" size="lg" status="offline" />
      </div>
    ),
  },
  {
    name: 'ProfileCard',
    codeName: 'ProfileCard.tsx',
    cssBase: '.tls-profile-card / .tls-profile-card--*',
    category: 'Content',
    description: 'Carte profil complète: avatar, nom, rôle, bio, métadonnées chips, liens sociaux, CTA. 3 variantes: default, compact, featured.',
    keywords: ['profile', 'card', 'user', 'avatar', 'bio', 'social', 'coach', 'compact', 'featured'],
    render: () => (
      <div className="grid-2">
        <ProfileCard
          name="Sophie Martin"
          role="Coach Leadership & IA"
          bio="Experte en développement managérial avec 10 ans d'expérience en grandes entreprises."
          metadata={[
            { label: 'Séances', value: 48 },
            { label: 'Satisfaction', value: '98%' },
          ]}
          socialLinks={[
            { platform: 'linkedin', url: '#' },
            { platform: 'email', url: '#' },
          ]}
          cta={{ label: 'Réserver une session', onClick: () => {} }}
        />
        <ProfileCard
          variant="compact"
          name="Paul Bernard"
          role="Expert Prompt Engineering"
          cta={{ label: 'Voir profil', onClick: () => {}, variant: 'secondary' }}
        />
      </div>
    ),
  },
  {
    name: 'IconFeatureCard',
    codeName: 'IconFeatureCard.tsx',
    cssBase: '.tls-icon-feature-card / .tls-icon-feature-card--brand/warm/sun',
    category: 'Content',
    description: 'Carte de fonctionnalité avec icône proéminente + titre + description. Tones: brand/warm/sun. Hover: icon scale(1.1) + shadow-md.',
    keywords: ['feature', 'icon', 'card', 'highlight', 'benefit', 'landing', 'tone'],
    render: () => (
      <div className="grid-2">
        <IconFeatureCard
          tone="brand"
          icon={I.book}
          title="Parcours personnalisés"
          description="Des formations adaptées à votre rythme et vos objectifs professionnels."
        />
        <IconFeatureCard
          tone="warm"
          icon={I.trophy}
          title="Certifications reconnues"
          description="Obtenez des badges et diplômes valorisés par les recruteurs."
        />
        <IconFeatureCard
          tone="sun"
          icon={I.heart}
          title="Coaching 1-to-1"
          description="Sessions individuelles avec des coachs certifiés et expérimentés."
        />
        <IconFeatureCard
          tone="brand"
          icon={I.settings}
          title="Suivi de progression"
          description="Tableaux de bord détaillés pour mesurer vos avancées en temps réel."
        />
      </div>
    ),
  },

  /* ---- CORE CARDS (additional) ----------------------------------------- */
  {
    name: 'CourseCard',
    codeName: 'CourseCard.tsx',
    cssBase: '.course-card / .course-card--brand/warm/sun',
    category: 'Core',
    description: 'Carte de cours EDTECH avec gradient hero, badge catégorie, progression si inscrit, CTA Enroll/Continue. Tones: brand/warm/sun. Hover: shadow-md + translateY(-2px).',
    keywords: ['course', 'card', 'enroll', 'progress', 'learning', 'edtech', 'category', 'tone'],
    render: () => (
      <div className="grid-2">
        <CourseCard
          title="Prompt Engineering Avancé"
          instructor="Sophie Martin"
          category="Design"
          tone="warm"
          enrolled={false}
          onEnroll={() => {}}
        />
        <CourseCard
          title="React & Design Systems"
          instructor="Paul Bernard"
          category="React"
          tone="brand"
          enrolled={true}
          progress={67}
          onContinue={() => {}}
        />
      </div>
    ),
  },
  {
    name: 'ParcoursCard',
    codeName: 'patterns/ParcoursCard.tsx',
    cssBase: '.parcours-card / .parcours-card--primary|warm|sun',
    category: 'Core',
    description: 'Carte de parcours glassmorphism avec progression, statut, CTA tonalisé. Tones: primary/warm/sun. Hover: translateY(-4px) + shadow-lg + radial glow.',
    keywords: ['parcours', 'learning path', 'progress', 'glass', 'tone', 'cta'],
    render: () => (
      <div className="grid-2">
        <ParcoursCard
          id="1"
          title="Fondamentaux du Leadership"
          description="Apprenez les principes clés du leadership moderne et développez votre style."
          progress={65}
          status="en cours"
          tone="primary"
          instructor="Sophie Martin"
          lessons={12}
          duration="6h"
          onClick={() => {}}
        />
        <ParcoursCard
          id="2"
          title="Maîtrise du Prompt Engineering"
          description="Devenez expert en IA générative et optimisation des prompts pour l'entreprise."
          progress={0}
          status="non commencé"
          tone="warm"
          instructor="Ahmed Ali"
          lessons={8}
          duration="4h"
          onClick={() => {}}
        />
      </div>
    ),
  },
  {
    name: 'SurfaceCard',
    codeName: 'SurfaceCard.tsx',
    cssBase: '.tls-surface-card / .tls-surface-card--default|elevated|glass|bordered',
    category: 'Core',
    description: 'Conteneur de surface générique. Variantes: default (surface+shadow-sm+border), elevated (shadow-md, pas de border), glass (backdrop-filter), bordered (accent primary-200).',
    keywords: ['surface', 'card', 'container', 'glass', 'elevated', 'bordered', 'group'],
    render: () => (
      <div className="grid-2">
        <SurfaceCard variant="default">
          <p className="text-label">Default</p>
          <p className="text-caption text-muted">Surface + shadow-sm + border.</p>
        </SurfaceCard>
        <SurfaceCard variant="elevated">
          <p className="text-label">Elevated</p>
          <p className="text-caption text-muted">Shadow-md, sans bordure.</p>
        </SurfaceCard>
        <SurfaceCard variant="bordered">
          <p className="text-label">Bordered</p>
          <p className="text-caption text-muted">Bordure accent primary-200.</p>
        </SurfaceCard>
        <SurfaceCard variant="muted">
          <p className="text-label">Muted</p>
          <p className="text-caption text-muted">Fond grisé léger.</p>
        </SurfaceCard>
      </div>
    ),
  },
  {
    name: 'ResourceCard',
    codeName: 'ResourceCard.tsx',
    cssBase: '.tls-resource-card / .tls-resource-card--*',
    category: 'Core',
    description: 'Carte de ressource avec icône, type, titre, description, durée, catégorie, CTA. Variantes: default, minimal, with-badge. Tones: primary/warm/sun.',
    keywords: ['resource', 'card', 'document', 'article', 'tutorial', 'link', 'badge', 'tone'],
    render: () => (
      <div className="grid-2">
        <ResourceCard
          resourceType="TUTORIEL"
          title="Introduction au Prompt Engineering"
          description="Maîtrisez l'art de formuler des requêtes efficaces pour l'IA générative."
          duration="45 min"
          category="IA"
          tone="primary"
          cta={{ label: 'Lire', onClick: () => {} }}
          icon={I.book}
        />
        <ResourceCard
          variant="with-badge"
          resourceType="DOSSIER"
          title="IA & Marché du Travail 2026"
          description="Analyse complète des impacts de l'IA sur les métiers et compétences."
          duration="20 min"
          category="Veille"
          tone="warm"
          badge={{ label: 'Nouveau', variant: 'warm', position: 'top-right' }}
          cta={{ label: 'Télécharger', onClick: () => {} }}
          icon={I.arrow}
        />
      </div>
    ),
  },

  /* ---- LEARNING (additional) -------------------------------------------- */
  {
    name: 'CompetencyMatrix',
    codeName: 'CompetencyMatrix.tsx',
    cssBase: 'CompetencyMatrix (table + inline styles)',
    category: 'Learning',
    description: 'Tableau de compétences multi-dimensions. Niveaux 1–5 (Novice → Expert) avec icônes par niveau et code couleur par compétence.',
    keywords: ['competency', 'matrix', 'skills', 'levels', 'table', 'assessment'],
    render: () => (
      <CompetencyMatrix
        skills={[
          { name: 'Prompt Engineering', level: 4 },
          { name: 'Leadership', level: 3, color: 'var(--tls-orange-500)' },
          { name: 'IA Générative', level: 5 },
          { name: 'Communication', level: 2, color: 'var(--tls-yellow-400)' },
        ]}
      />
    ),
  },
  {
    name: 'GoalProgress',
    codeName: 'GoalProgress.tsx',
    cssBase: 'GoalProgress (inline styles)',
    category: 'Learning',
    description: 'Suivi de progression vers un objectif d\'apprentissage: nom, %, temps restant, indicateur on-track/retard. Tones: primary/warm/success/danger.',
    keywords: ['goal', 'progress', 'target', 'deadline', 'on-track', 'learning'],
    render: () => (
      <div className="vstack">
        <GoalProgress goal="Terminer le parcours Leadership" percentComplete={72} daysRemaining={8} isOnTrack={true} tone="primary" />
        <GoalProgress goal="Obtenir la certification IA" percentComplete={35} daysRemaining={3} isOnTrack={false} tone="danger" />
        <GoalProgress goal="Compléter 10 sessions coaching" percentComplete={100} isOnTrack={true} tone="success" />
      </div>
    ),
  },
  {
    name: 'QuizComponent',
    codeName: 'QuizComponent.tsx',
    cssBase: 'QuizComponent (inline styles)',
    category: 'Learning',
    description: 'Quiz interactif multi-questions avec navigation prev/next, barre de progression, résultats finaux avec score et pourcentage.',
    keywords: ['quiz', 'question', 'answer', 'test', 'assessment', 'score', 'interactive'],
    render: () => (
      <QuizComponent
        questions={[
          { question: 'Qu\'est-ce que le Prompt Engineering ?', options: ['L\'art de formuler des requêtes efficaces pour l\'IA', 'Un langage de programmation', 'Un framework CSS', 'Un protocole réseau'], correct: 0 },
          { question: 'Quelle entreprise a créé ChatGPT ?', options: ['Google', 'Meta', 'OpenAI', 'Microsoft'], correct: 2 },
        ]}
        onComplete={({ correct, total }) => console.log(`Score: ${correct}/${total}`)}
      />
    ),
  },

  /* ---- PATTERNS (additional) -------------------------------------------- */
  {
    name: 'ToneAwareCard',
    codeName: 'patterns/ToneAwareCard.tsx',
    cssBase: '.tone-card--primary / .tone-card--warm / .tone-card--sun',
    category: 'Patterns',
    description: 'Conteneur adaptatif au tone. Applique automatiquement le fond et la bordure correspondant au tone (primary/warm/sun). Clickable optionnel.',
    keywords: ['tone', 'card', 'primary', 'warm', 'sun', 'adaptive', 'background'],
    render: () => (
      <div className="grid-2">
        {(['primary', 'warm', 'sun'] as const).map((tone) => (
          <ToneAwareCard key={tone} tone={tone} padding="var(--s-4)">
            <p style={{ margin: 0, fontWeight: 700, fontSize: 'var(--t-caption)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tone: {tone}</p>
            <p style={{ margin: '4px 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>Fond + bordure automatique selon le tone.</p>
          </ToneAwareCard>
        ))}
        <ToneAwareCard tone="primary" padding="var(--s-4)" onClick={() => {}}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 'var(--t-caption)' }}>Cliquable (hover lift)</p>
        </ToneAwareCard>
      </div>
    ),
  },
  {
    name: 'HeroSection',
    codeName: 'patterns/HeroSection.tsx',
    cssBase: 'HeroSection (inline styles)',
    category: 'Patterns',
    description: 'Section hero réutilisable avec icône, titre, description, métadonnées et gradient de fond. Gradients: primary/orange. Utilisée dans Veille, Parcours, Settings.',
    keywords: ['hero', 'section', 'header', 'gradient', 'icon', 'title', 'landing'],
    render: () => (
      <div className="vstack">
        <HeroSection
          title="Veille & Ressources"
          description="Restez à la pointe de votre domaine avec notre sélection éditoriale."
          gradient="primary"
          metadata={[{ icon: I.book, text: '240 ressources' }, { icon: I.heart, text: 'Mise à jour hebdomadaire' }]}
        />
        <HeroSection
          title="Coaching 1-to-1"
          description="Sessions personnalisées avec des experts certifiés."
          gradient="orange"
        />
      </div>
    ),
  },
  {
    name: 'ActivityFeed',
    codeName: 'patterns/ActivityFeed.tsx',
    cssBase: 'ActivityFeed (inline styles)',
    category: 'Patterns',
    description: 'Feed d\'activités chronologique avec timeline optionnelle. Types: start, complete, progress, achievement, feedback, message. Pagination interne.',
    keywords: ['activity', 'feed', 'timeline', 'history', 'events', 'chronological', 'notification'],
    render: () => (
      <ActivityFeed
        useTimeline
        items={[
          { id: '1', type: 'complete', title: 'Leçon terminée', description: 'Module 3 — Prompt Engineering avancé', timestamp: new Date(Date.now() - 7200000), tone: 'primary' },
          { id: '2', type: 'achievement', title: 'Badge débloqué', description: 'Pionnier IA — Premier badge obtenu', timestamp: new Date(Date.now() - 86400000), tone: 'warm' },
          { id: '3', type: 'feedback', title: 'Feedback reçu', description: 'Sophie Martin a commenté votre dernière session', timestamp: new Date(Date.now() - 172800000), tone: 'sun' },
        ]}
      />
    ),
  },
  {
    name: 'DashboardHero',
    codeName: 'patterns/DashboardHero.tsx',
    cssBase: 'DashboardHero (inline styles)',
    category: 'Patterns',
    description: 'Hero composite pour pages dashboard: titre, sous-titre, stats KPI, CTA primaire + secondaire, glassmorphism optionnel. Tone-aware.',
    keywords: ['dashboard', 'hero', 'kpi', 'stats', 'cta', 'composite', 'glass'],
    render: () => (
      <DashboardHero
        title="Bonjour, Jeanne"
        subtitle="Continuez votre apprentissage"
        description="Vous avez progressé de 12% cette semaine — continuez sur votre lancée !"
        stats={[
          { label: 'Cours complétés', value: 12, accent: 'primary' },
          { label: 'Points XP', value: '2 450', accent: 'warm' },
          { label: 'Série', value: '7j', accent: 'sun' },
        ]}
        primaryCta={{ label: 'Continuer mon parcours', onClick: () => {} }}
        secondaryCta={{ label: 'Explorer', onClick: () => {} }}
        showGlow
      />
    ),
  },

  /* ---- FEEDBACK & STATUS -------------------------------------------------- */
  {
    name: 'Spinner',
    codeName: 'ui/Spinner.tsx',
    cssBase: '.tls-spinner / .tls-spinner--{size} / .tls-spinner--{tone}',
    category: 'Feedback',
    description: 'Indicateur de chargement animé. Tailles : sm (20px), md (32px), lg (48px). Tones : brand (teal), warm (orange), muted (gris).',
    keywords: ['spinner', 'loading', 'loader', 'indicator', 'async', 'wait'],
    render: () => (
      <div className="vstack" style={{ gap: 'var(--s-6)' }}>
        <div className="hstack" style={{ alignItems: 'center', gap: 'var(--s-6)' }}>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
        <div className="hstack" style={{ alignItems: 'center', gap: 'var(--s-6)' }}>
          <Spinner size="md" tone="brand" label="Chargement..." />
          <Spinner size="md" tone="warm" />
          <Spinner size="md" tone="muted" />
        </div>
      </div>
    ),
  },
  {
    name: 'StatusBadge',
    codeName: 'ui/StatusBadge.tsx',
    cssBase: '.status-badge / .status-badge--{state}',
    category: 'Feedback',
    description: 'Badge d\'état d\'apprentissage. 5 états : locked, available, in-progress, completed, failed. Avec ou sans label.',
    keywords: ['status', 'badge', 'state', 'progress', 'locked', 'completed', 'learning'],
    render: () => (
      <div className="vstack" style={{ gap: 'var(--s-4)' }}>
        <div className="hstack" style={{ flexWrap: 'wrap', gap: 'var(--s-3)' }}>
          <StatusBadge status="locked" />
          <StatusBadge status="available" />
          <StatusBadge status="in-progress" />
          <StatusBadge status="completed" />
          <StatusBadge status="failed" />
        </div>
        <div className="hstack" style={{ flexWrap: 'wrap', gap: 'var(--s-3)' }}>
          <StatusBadge status="locked" showLabel />
          <StatusBadge status="available" showLabel />
          <StatusBadge status="in-progress" showLabel />
          <StatusBadge status="completed" showLabel />
          <StatusBadge status="failed" showLabel />
        </div>
      </div>
    ),
  },
  {
    name: 'NotificationBadge',
    codeName: 'ui/NotificationBadge.tsx',
    cssBase: '.notif-badge / .notif-badge--{tone}',
    category: 'Feedback',
    description: 'Badge numérique superposé sur un enfant (icône, avatar). Tones : danger, brand, warm. Max configurable (99 par défaut).',
    keywords: ['notification', 'badge', 'count', 'overlay', 'indicator', 'unread'],
    render: () => (
      <div className="hstack" style={{ gap: 'var(--s-8)', alignItems: 'center', flexWrap: 'wrap' }}>
        <NotificationBadge count={3} tone="danger"><Bell size={24} /></NotificationBadge>
        <NotificationBadge count={12} tone="brand"><MessageSquare size={24} /></NotificationBadge>
        <NotificationBadge count={99} tone="warm"><BookOpen size={24} /></NotificationBadge>
        <NotificationBadge count={150} max={99}><Bell size={24} /></NotificationBadge>
        <NotificationBadge count={0}><Bell size={24} /></NotificationBadge>
      </div>
    ),
  },
  {
    name: 'KPICard',
    codeName: 'ui/KPICard.tsx',
    cssBase: '.tls-kpi / .tls-kpi-icon / .tls-kpi--{tone}',
    category: 'Feedback',
    description: 'Carte de KPI avec icône, valeur, label, tendance optionnelle (up/down/neutral) et 4 tones (brand/warm/sun/success).',
    keywords: ['kpi', 'metric', 'stat', 'card', 'number', 'icon', 'trend', 'dashboard'],
    render: () => (
      <div className="grid-2" style={{ gap: 'var(--s-4)' }}>
        <KPICard value="12" label="Cours terminés" icon={<BookOpen size={20} />} tone="brand" trend={{ value: 2, direction: 'up', label: 'ce mois' }} />
        <KPICard value="86h" label="Temps d'apprentissage" icon={<Clock3 size={20} />} tone="warm" />
        <KPICard value="7j" label="Série actuelle" icon={<Flame size={20} />} tone="sun" />
        <KPICard value="2 450" label="Points XP" icon={<Trophy size={20} />} tone="success" trend={{ value: 180, direction: 'up' }} />
      </div>
    ),
  },

  /* ---- PATTERNS (nouveaux) ------------------------------------------------ */
  {
    name: 'SectionHeader',
    codeName: 'patterns/SectionHeader.tsx',
    cssBase: 'SectionHeader (tokens inline)',
    category: 'Patterns',
    description: 'En-tête de section réutilisable avec icône optionnelle, titre h2, sous-titre et action droite. Variante compact. Utilisée dans Coaching, Leaderboard, Journal.',
    keywords: ['section', 'header', 'title', 'icon', 'h2', 'action', 'compact'],
    render: () => (
      <div className="vstack">
        <SectionHeader icon={Calendar} title="Prochaine session" subtitle="Votre prochain rendez-vous de coaching" action={<button className="btn btn--sm btn--outline">Voir tout</button>} />
        <SectionHeader icon={BookOpen} title="Ressources associées" compact />
        <SectionHeader title="Sans icône" subtitle="Section sans icône avec sous-titre" />
      </div>
    ),
  },
  {
    name: 'SkillBar',
    codeName: 'ui/SkillBar.tsx',
    cssBase: 'SkillBar (tokens inline)',
    category: 'Learning',
    description: 'Barre de progression de compétence. Tones : brand (teal), warm (orange), sun (jaune). Affichage du pourcentage optionnel. Transition CSS animée.',
    keywords: ['skill', 'bar', 'progress', 'competency', 'percentage', 'profile', 'level'],
    render: () => (
      <div className="vstack" style={{ gap: 'var(--s-3)', maxWidth: 480 }}>
        <SkillBar label="Prompt Engineering" value={95} tone="brand" />
        <SkillBar label="Pédagogie" value={88} tone="warm" />
        <SkillBar label="Design Thinking" value={72} tone="sun" />
        <SkillBar label="Communication" value={60} tone="brand" showValue={false} />
      </div>
    ),
  },
  {
    name: 'PageHeader',
    codeName: 'patterns/PageHeader.tsx',
    cssBase: 'PageHeader (tokens inline)',
    category: 'Patterns',
    description: 'En-tête de page complet. Eyebrow optionnel (icône + texte majuscule), titre h1, description, actions droite. Utilisé dans toutes les pages principales.',
    keywords: ['page', 'header', 'eyebrow', 'title', 'description', 'actions', 'h1'],
    render: () => (
      <div className="vstack">
        <PageHeader
          eyebrow={{ icon: <GraduationCap size={14} />, text: 'Mon parcours' }}
          title="Fondamentaux du Leadership"
          description="Apprenez les principes essentiels du leadership moderne et développez votre style unique."
          actions={<><button className="btn btn--sm btn--outline">Partager</button><button className="btn btn--sm btn--primary">Continuer</button></>}
        />
        <PageHeader title="Tableau de bord" description="Bienvenue, retrouvez votre progression." />
      </div>
    ),
  },
  {
    name: 'CoachCardGrid',
    codeName: 'patterns/CoachCardGrid.tsx',
    cssBase: 'CoachCardGrid (responsive grid)',
    category: 'Patterns',
    description: 'Grille de cartes pour les séances de coaching. Responsive sur tous les breakpoints. Variantes de tons (primary/warm/sun).',
    keywords: ['grid', 'coach', 'cards', 'coaching', 'session', 'responsive', 'tone'],
    render: () => (
      <CoachCardGrid
        coaches={[
          {
            id: '1',
            name: 'Sarah Chen',
            role: 'Coach',
            avatar: 'https://via.placeholder.com/120?text=Sarah',
            bio: 'Experte en leadership',
            specialties: ['Leadership', 'Communication'],
            availability: true,
          },
          {
            id: '2',
            name: 'Marc Dupont',
            role: 'Mentor',
            avatar: 'https://via.placeholder.com/120?text=Marc',
            bio: 'Consultant stratégique',
            specialties: ['Stratégie', 'Vision'],
            availability: true,
          },
        ]}
      />
    ),
  },
  {
    name: 'LearningPathGrid',
    codeName: 'patterns/LearningPathGrid.tsx',
    cssBase: 'LearningPathGrid (responsive grid)',
    category: 'Patterns',
    description: 'Grille pour les parcours d\'apprentissage. Responsive avec gestion des images de fond.',
    keywords: ['learning', 'path', 'grid', 'course', 'responsive'],
    render: () => (
      <LearningPathGrid
        paths={[
          {
            id: '1',
            title: 'Fondamentaux du Leadership',
            description: 'Apprenez les principes essentiels',
            lessonCount: 12,
            progress: 65,
            status: 'in-progress',
            tone: 'primary',
          },
          {
            id: '2',
            title: 'Communication Efficace',
            description: 'Maîtrisez les techniques de communication',
            lessonCount: 8,
            progress: 0,
            status: 'not-started',
            tone: 'warm',
          },
        ]}
      />
    ),
  },
  {
    name: 'LearningPathHeader',
    codeName: 'patterns/LearningPathHeader.tsx',
    cssBase: 'LearningPathHeader (header with progress)',
    category: 'Patterns',
    description: 'En-tête de parcours avec progression, durée estimée et statut de complétude.',
    keywords: ['learning', 'header', 'progress', 'path', 'completion'],
    render: () => (
      <LearningPathHeader
        title="Fondamentaux du Leadership"
        category="Développement Personnel"
        description="Apprenez les principes essentiels du leadership moderne"
        progress={65}
        kpis={[
          { label: 'Leçons complétées', value: '8/12', icon: <CheckCircle2 size={16} /> },
          { label: 'Durée restante', value: '2h 30m', icon: <Clock3 size={16} /> },
        ]}
        tone="primary"
      />
    ),
  },
  {
    name: 'MultiStepForm',
    codeName: 'patterns/MultiStepForm.tsx',
    cssBase: 'MultiStepForm (form progress)',
    category: 'Patterns',
    description: 'Formulaire multi-étapes avec indicateurs de progression et navigation.',
    keywords: ['form', 'multi-step', 'progress', 'navigation', 'wizard'],
    render: () => <MultiStepFormDemo />,
  },
  {
    name: 'PageCard',
    codeName: 'patterns/PageCard.tsx',
    cssBase: 'PageCard (featured card)',
    category: 'Patterns',
    description: 'Carte de page avec image, titre, description. Variantes pour mise en avant.',
    keywords: ['card', 'page', 'featured', 'image', 'content'],
    render: () => (
      <PageCard
        item={{
          id: '1',
          thumbnail: 'https://via.placeholder.com/300x200?text=Course',
          title: 'Cours Featured',
          description: 'Apprenez les fondamentaux essentiels',
          status: 'active',
        }}
        showThumbnail={true}
      />
    ),
  },
  {
    name: 'PageHeaderSimple',
    codeName: 'patterns/PageHeaderSimple.tsx',
    cssBase: 'PageHeaderSimple (simple header)',
    category: 'Patterns',
    description: 'En-tête de page minimaliste. Titre seul ou avec description courte.',
    keywords: ['header', 'simple', 'title', 'minimal'],
    render: () => (
      <div className="vstack">
        <PageHeaderSimple title="Tableau de bord" />
        <PageHeaderSimple title="Mon profil" description="Gérez vos informations personnelles" />
      </div>
    ),
  },
  {
    name: 'ResourceCardGrid',
    codeName: 'patterns/ResourceCardGrid.tsx',
    cssBase: 'ResourceCardGrid (responsive grid)',
    category: 'Patterns',
    description: 'Grille de cartes pour les ressources. Responsive sur tous les breakpoints.',
    keywords: ['resource', 'grid', 'cards', 'responsive'],
    render: () => (
      <ResourceCardGrid
        items={[
          {
            id: '1',
            type: 'ARTICLE',
            title: 'Guide du Leadership',
            description: 'Apprenez les principes essentiels',
            duration: '5 min',
            category: 'Leadership',
          },
          {
            id: '2',
            type: 'VIDEO',
            title: 'Communication Efficace',
            description: 'Techniques de communication avancées',
            duration: '15 min',
            category: 'Communication',
          },
        ]}
        columns={2}
      />
    ),
  },
  {
    name: 'SettingsSection',
    codeName: 'patterns/SettingsSection.tsx',
    cssBase: 'SettingsSection (form section)',
    category: 'Patterns',
    description: 'Section de paramètres avec groupes de formulaires et labels.',
    keywords: ['settings', 'form', 'section', 'group', 'preferences'],
    render: () => (
      <SettingsSection title="Paramètres de notification">
        <div style={{ padding: 'var(--s-4)', background: 'var(--surface-muted)', borderRadius: 'var(--r-lg)' }}>
          <p style={{ margin: 0, fontSize: 'var(--t-body-sm)' }}>Sélectionnez vos préférences de notification</p>
        </div>
      </SettingsSection>
    ),
  },
  {
    name: 'VeilleCardFeed',
    codeName: 'patterns/VeilleCardFeed.tsx',
    cssBase: 'VeilleCardFeed (content feed)',
    category: 'Patterns',
    description: 'Flux de contenu pour la veille. Carousel ou grille adaptative.',
    keywords: ['veille', 'feed', 'news', 'content', 'carousel'],
    render: () => (
      <VeilleCardFeed
        items={[
          { id: '1', type: 'ARTICLE', title: 'Tendance Leadership 2024', summary: 'Les nouvelles tendances du leadership', category: 'Leadership', publishedDate: new Date(), isNew: true },
          { id: '2', type: 'VIDEO', title: 'Communication Digitale', summary: 'Comment bien communiquer en ligne', category: 'Communication', publishedDate: new Date() },
          { id: '3', type: 'PODCAST', title: 'L\'avenir du travail', summary: 'Discussion avec des experts', category: 'Tendances', publishedDate: new Date() },
        ]}
      />
    ),
  },
  {
    name: 'Divider',
    codeName: 'ui/Divider.tsx',
    cssBase: '.divider / .divider--vertical / .divider--labeled / .divider--sm/md/lg',
    category: 'Content',
    description: 'Séparateur horizontal ou vertical. Label centré avec var(--text-soft). Spacings: sm/md/lg via classes CSS. Ligne: var(--border).',
    keywords: ['divider', 'separator', 'hr', 'section', 'label', 'horizontal', 'vertical', 'css'],
    render: () => (
      <div className="vstack">
        <Divider />
        <Divider label="ou" />
        <Divider label="Compétences" spacing="lg" />
        <div style={{ display: 'flex', alignItems: 'center', height: 80, gap: 'var(--s-4)' }}>
          <span style={{ fontSize: 'var(--t-body-sm)' }}>Section A</span>
          <Divider orientation="vertical" />
          <span style={{ fontSize: 'var(--t-body-sm)' }}>Section B</span>
          <Divider orientation="vertical" />
          <span style={{ fontSize: 'var(--t-body-sm)' }}>Section C</span>
        </div>
      </div>
    ),
  },
];

/* ============================================================================
 * TOKEN DEFINITIONS — parsed from /src/design-system/spec.json
 * ============================================================================ */

const buildColorScale = (group: string, prefix: string, values: Array<[string, string]>): TokenEntry[] =>
  values.map(([step, hex]) => ({
    name: `${prefix} ${step}`,
    cssVar: `--tls-${prefix.toLowerCase()}-${step}`,
    value: hex,
    group,
    type: 'color',
  }));

const COLOR_TOKENS: TokenEntry[] = [
  ...buildColorScale('Primary (Teal)', 'primary', [
    ['50', '#E8F4F7'], ['100', '#DCEBEF'], ['200', '#B9D7DF'], ['300', '#96C3CF'],
    ['400', '#73AFBF'], ['500', '#55A1B4'], ['600', '#4A8FA1'], ['700', '#3D7786'],
    ['800', '#2F5F6A'], ['900', '#1F3E45'],
  ]),
  ...buildColorScale('Orange (Warm)', 'orange', [
    ['50', '#FFF3EB'], ['100', '#FDDCC7'], ['200', '#FCBB93'], ['300', '#F59A5F'],
    ['400', '#F18A4C'], ['500', '#ED843A'], ['600', '#C06920'], ['700', '#8F5017'],
    ['800', '#5E3710'], ['900', '#3B2109'],
  ]),
  ...buildColorScale('Yellow (Sun)', 'yellow', [
    ['50', '#FFF9EE'], ['100', '#FFECC8'], ['200', '#FFD791'], ['300', '#FFC15A'],
    ['400', '#F8B044'], ['500', '#DF9E3D'], ['600', '#C68D36'], ['700', '#AE7B30'],
    ['800', '#956A29'], ['900', '#7C5822'],
  ]),
  ...buildColorScale('Ink (Neutrals)', 'ink', [
    ['0', '#FFFFFF'], ['25', '#FAFBFC'], ['50', '#F5F8F8'], ['100', '#EEF2F4'],
    ['200', '#E0E6E9'], ['300', '#C8D2D6'], ['400', '#9AA8AE'], ['500', '#6B7981'],
    ['600', '#535B62'], ['700', '#3A474B'], ['800', '#2A3538'], ['900', '#252B37'],
    ['950', '#12181C'],
  ]),
];

const SEMANTIC_TOKENS: TokenEntry[] = [
  { name: 'Success base', cssVar: '--tls-success-base', value: '#9DBEBA', group: 'Semantic', type: 'color' },
  { name: 'Success bg', cssVar: '--tls-success-bg', value: '#E8F2F0', group: 'Semantic', type: 'color' },
  { name: 'Success fg', cssVar: '--tls-success-fg', value: '#335A56', group: 'Semantic', type: 'color' },
  { name: 'Warning base', cssVar: '--tls-warning-base', value: '#F8B044', group: 'Semantic', type: 'color' },
  { name: 'Warning bg', cssVar: '--tls-warning-bg', value: '#FFF9EE', group: 'Semantic', type: 'color' },
  { name: 'Warning fg', cssVar: '--tls-warning-fg', value: '#7C5822', group: 'Semantic', type: 'color' },
  { name: 'Danger base', cssVar: '--tls-danger-base', value: '#F28559', group: 'Semantic', type: 'color' },
  { name: 'Danger bg', cssVar: '--tls-danger-bg', value: '#FEF4F0', group: 'Semantic', type: 'color' },
  { name: 'Danger fg', cssVar: '--tls-danger-fg', value: '#8F2A0E', group: 'Semantic', type: 'color' },
  { name: 'Info base', cssVar: '--tls-info-base', value: '#55A1B4', group: 'Semantic', type: 'color' },
  { name: 'Info bg', cssVar: '--tls-info-bg', value: '#E8F4F7', group: 'Semantic', type: 'color' },
  { name: 'Info fg', cssVar: '--tls-info-fg', value: '#1F3E45', group: 'Semantic', type: 'color' },
];

const ROLE_TOKENS: TokenEntry[] = [
  { name: 'bg', cssVar: '--bg', value: '#FAFBFC', group: 'Roles', type: 'role' },
  { name: 'surface', cssVar: '--surface', value: '#FFFFFF', group: 'Roles', type: 'role' },
  { name: 'surface-muted', cssVar: '--surface-muted', value: '#F5F8F8', group: 'Roles', type: 'role' },
  { name: 'surface-sunken', cssVar: '--surface-sunken', value: '#EEF2F4', group: 'Roles', type: 'role' },
  { name: 'border', cssVar: '--border', value: 'rgba(37,43,55,0.08)', group: 'Roles', type: 'role' },
  { name: 'border-strong', cssVar: '--border-strong', value: 'rgba(37,43,55,0.14)', group: 'Roles', type: 'role' },
  { name: 'text', cssVar: '--text', value: '#252B37', group: 'Roles', type: 'role' },
  { name: 'text-muted', cssVar: '--text-muted', value: '#535B62', group: 'Roles', type: 'role' },
  { name: 'text-soft', cssVar: '--text-soft', value: '#6B7981', group: 'Roles', type: 'role' },
  { name: 'text-inverse', cssVar: '--text-inverse', value: '#FFFFFF', group: 'Roles', type: 'role' },
];

const TYPOGRAPHY_TOKENS: TokenEntry[] = [
  { name: 'display 2xl', cssVar: '--t-display-2xl', value: 'clamp(3.5rem, 6vw + 1rem, 6.5rem)', group: 'Display', type: 'typography' },
  { name: 'display xl', cssVar: '--t-display-xl', value: 'clamp(2.75rem, 4vw + 1rem, 4.5rem)', group: 'Display', type: 'typography' },
  { name: 'display lg', cssVar: '--t-display-lg', value: 'clamp(2.25rem, 2.5vw + 1rem, 3.25rem)', group: 'Display', type: 'typography' },
  { name: 'h1', cssVar: '--t-h1', value: '2.25rem · 36px', group: 'Headings', type: 'typography' },
  { name: 'h2', cssVar: '--t-h2', value: '1.75rem · 28px', group: 'Headings', type: 'typography' },
  { name: 'h3', cssVar: '--t-h3', value: '1.375rem · 22px', group: 'Headings', type: 'typography' },
  { name: 'h4', cssVar: '--t-h4', value: '1.125rem · 18px', group: 'Headings', type: 'typography' },
  { name: 'body-lg', cssVar: '--t-body-lg', value: '1.125rem · 18px', group: 'Body', type: 'typography' },
  { name: 'body', cssVar: '--t-body', value: '1rem · 16px', group: 'Body', type: 'typography' },
  { name: 'body-sm', cssVar: '--t-body-sm', value: '0.9375rem · 15px', group: 'Body', type: 'typography' },
  { name: 'caption', cssVar: '--t-caption', value: '0.8125rem · 13px', group: 'Body', type: 'typography' },
  { name: 'micro', cssVar: '--t-micro', value: '0.6875rem · 11px', group: 'Body', type: 'typography' },
];

const SPACING_TOKENS: TokenEntry[] = [
  ['--s-0', '0'], ['--s-1', '4px'], ['--s-2', '8px'], ['--s-3', '12px'],
  ['--s-4', '16px'], ['--s-5', '20px'], ['--s-6', '24px'], ['--s-8', '32px'],
  ['--s-10', '40px'], ['--s-12', '48px'], ['--s-16', '64px'], ['--s-20', '80px'],
  ['--s-24', '96px'], ['--s-32', '128px'],
].map(([cssVar, value]) => ({
  name: cssVar.replace('--s-', 'space-'),
  cssVar,
  value,
  group: 'Spacing (4pt base)',
  type: 'spacing',
}));

const RADIUS_TOKENS: TokenEntry[] = [
  ['--r-xs', '4px'], ['--r-sm', '6px'], ['--r-md', '10px'], ['--r-lg', '14px'],
  ['--r-xl', '20px'], ['--r-2xl', '28px'], ['--r-pill', '999px'],
].map(([cssVar, value]) => ({
  name: cssVar.replace('--r-', 'radius-'),
  cssVar,
  value,
  group: 'Border radius',
  type: 'radius',
}));

const SHADOW_TOKENS: TokenEntry[] = [
  { name: 'shadow-xs', cssVar: '--shadow-xs', value: '0 1px 2px rgba(18,24,28,.04)', group: 'Elevation', type: 'shadow' },
  { name: 'shadow-sm', cssVar: '--shadow-sm', value: '0 1px 2px rgba(0,0,0,.05), 0 1px 3px rgba(0,0,0,.04)', group: 'Elevation', type: 'shadow' },
  { name: 'shadow-md', cssVar: '--shadow-md', value: '0 4px 12px -2px rgba(0,0,0,.08)', group: 'Elevation', type: 'shadow' },
  { name: 'shadow-lg', cssVar: '--shadow-lg', value: '0 16px 40px -12px rgba(0,0,0,.14)', group: 'Elevation', type: 'shadow' },
  { name: 'shadow-xl', cssVar: '--shadow-xl', value: '0 28px 72px -20px rgba(0,0,0,.22)', group: 'Elevation', type: 'shadow' },
  { name: 'shadow-brand', cssVar: '--shadow-brand', value: '0 10px 30px -10px rgba(85,161,180,.45)', group: 'Elevation', type: 'shadow' },
  { name: 'shadow-warm', cssVar: '--shadow-warm', value: '0 10px 30px -10px rgba(237,132,58,.35)', group: 'Elevation', type: 'shadow' },
  // Brand shadow scale
  { name: 'shadow-brand-xs', cssVar: '--shadow-brand-xs', value: '0 4px 12px rgba(85,161,180,.15)', group: 'Brand Shadows', type: 'shadow' },
  { name: 'shadow-brand-md', cssVar: '--shadow-brand-md', value: '0 6px 16px rgba(85,161,180,.40)', group: 'Brand Shadows', type: 'shadow' },
  { name: 'shadow-brand-xl', cssVar: '--shadow-brand-xl', value: '0 12px 32px rgba(85,161,180,.50)', group: 'Brand Shadows', type: 'shadow' },
  { name: 'shadow-brand-card', cssVar: '--shadow-brand-card', value: '0 12px 32px rgba(85,161,180,.28)', group: 'Brand Shadows', type: 'shadow' },
  { name: 'shadow-warm-card', cssVar: '--shadow-warm-card', value: '0 12px 32px rgba(237,132,58,.28)', group: 'Brand Shadows', type: 'shadow' },
  // Focus rings
  { name: 'shadow-focus-brand', cssVar: '--shadow-focus-brand', value: '0 0 0 4px rgba(85,161,180,.18)', group: 'Focus Rings', type: 'shadow' },
  { name: 'shadow-focus-warm', cssVar: '--shadow-focus-warm', value: '0 0 0 4px rgba(242,133,89,.18)', group: 'Focus Rings', type: 'shadow' },
  // Inset highlights
  { name: 'shadow-inset-top-sm', cssVar: '--shadow-inset-top-sm', value: 'inset 0 1px 0 rgba(255,255,255,.80)', group: 'Inset Highlights', type: 'shadow' },
  { name: 'shadow-inset-top-md', cssVar: '--shadow-inset-top-md', value: 'inset 0 1px 0 rgba(255,255,255,.90)', group: 'Inset Highlights', type: 'shadow' },
  { name: 'shadow-inset-top-lg', cssVar: '--shadow-inset-top-lg', value: 'inset 0 1px 0 rgba(255,255,255,.95)', group: 'Inset Highlights', type: 'shadow' },
];

const MOTION_TOKENS: TokenEntry[] = [
  { name: 'ease-standard', cssVar: '--ease-standard', value: 'cubic-bezier(0.2, 0, 0, 1)', group: 'Easing', type: 'motion' },
  { name: 'ease-emphasized', cssVar: '--ease-emphasized', value: 'cubic-bezier(0.2, 0, 0, 1.15)', group: 'Easing', type: 'motion' },
  { name: 'ease-entrance', cssVar: '--ease-entrance', value: 'cubic-bezier(0, 0, 0.2, 1)', group: 'Easing', type: 'motion' },
  { name: 'ease-exit', cssVar: '--ease-exit', value: 'cubic-bezier(0.4, 0, 1, 1)', group: 'Easing', type: 'motion' },
  { name: 'dur-1', cssVar: '--dur-1', value: '120ms', group: 'Duration', type: 'motion' },
  { name: 'dur-2', cssVar: '--dur-2', value: '180ms', group: 'Duration', type: 'motion' },
  { name: 'dur-3', cssVar: '--dur-3', value: '240ms', group: 'Duration', type: 'motion' },
  { name: 'dur-4', cssVar: '--dur-4', value: '320ms', group: 'Duration', type: 'motion' },
];

const GRADIENT_TOKENS: TokenEntry[] = [
  { name: 'Warm', cssVar: '--g-warm', value: 'linear-gradient(135deg, #F8B044, #ED843A)', group: 'Gradients', type: 'gradient' },
  { name: 'Warm soft', cssVar: '--g-warm-soft', value: 'linear-gradient(180deg, #FFF3EB, #FFE6D6)', group: 'Gradients', type: 'gradient' },
  { name: 'Cool', cssVar: '--g-cool', value: 'linear-gradient(135deg, #55A1B4, #3D7786)', group: 'Gradients', type: 'gradient' },
  { name: 'Cool deep', cssVar: '--g-cool-deep', value: 'linear-gradient(135deg, #2F5F6A, #1F3E45)', group: 'Gradients', type: 'gradient' },
  { name: 'Cool soft', cssVar: '--g-cool-soft', value: 'linear-gradient(180deg, #E8F4F7, #DCEBEF)', group: 'Gradients', type: 'gradient' },
];

const ALL_TOKENS: TokenEntry[] = [
  ...COLOR_TOKENS,
  ...SEMANTIC_TOKENS,
  ...ROLE_TOKENS,
  ...TYPOGRAPHY_TOKENS,
  ...SPACING_TOKENS,
  ...RADIUS_TOKENS,
  ...SHADOW_TOKENS,
  ...MOTION_TOKENS,
  ...GRADIENT_TOKENS,
];

/* ============================================================================
 * COPY TO CLIPBOARD UTIL
 * ============================================================================ */

const copyToClipboard = async (text: string, onDone?: () => void) => {
  try {
    await navigator.clipboard.writeText(text);
    onDone?.();
  } catch {
    // Silent fail — not critical
  }
};

const CopyChip: React.FC<{ text: string; label?: React.ReactNode }> = ({ text, label }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copy-chip"
      onClick={() => copyToClipboard(text, () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      })}
      title="Cliquer pour copier"
    >
      <code>{label ?? text}</code>
      <span className="copy-chip__state">{copied ? '✓ copié' : '⧉'}</span>
    </button>
  );
};

/* ============================================================================
 * TOKEN SWATCH RENDERERS
 * ============================================================================ */

const Swatch: React.FC<{ t: TokenEntry }> = ({ t }) => {
  if (t.type === 'color' || t.type === 'role') {
    return (
      <div className="token-card">
        <div
          className="token-card__swatch"
          style={{
            background: t.type === 'role' && t.cssVar.startsWith('--border')
              ? `linear-gradient(45deg, transparent 49%, ${t.value} 49%, ${t.value} 51%, transparent 51%)`
              : t.value,
            border: t.cssVar.includes('surface') || t.value === '#FFFFFF' ? '1px solid var(--border)' : undefined,
          }}
        />
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'gradient') {
    return (
      <div className="token-card">
        <div className="token-card__swatch" style={{ background: t.value }} />
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value" title={t.value}>{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'shadow') {
    return (
      <div className="token-card">
        <div
          className="token-card__swatch token-card__swatch--shadow"
          style={{ boxShadow: t.value }}
        />
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value" title={t.value}>{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'spacing') {
    const px = parseInt(t.value, 10) || 0;
    return (
      <div className="token-card">
        <div className="token-card__swatch token-card__swatch--spacing">
          <span style={{ width: Math.max(px, 2), height: 16, background: 'var(--tls-primary-400)', borderRadius: 2 }} />
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'radius') {
    return (
      <div className="token-card">
        <div
          className="token-card__swatch token-card__swatch--radius"
          style={{ borderRadius: t.value }}
        />
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'typography') {
    const isDisplay = t.group === 'Display';
    const fontSize = isDisplay ? '2rem' : t.value.split(' ')[0];
    return (
      <div className="token-card token-card--wide">
        <div
          className="token-card__typography"
          style={{
            fontFamily: t.name.startsWith('display') || t.name.startsWith('h')
              ? 'League Spartan, sans-serif'
              : 'Nunito, sans-serif',
            fontSize,
            fontWeight: t.name.startsWith('h') || t.name.startsWith('display') ? 600 : 400,
          }}
        >
          Aa Éé Öö 1234
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'motion') {
    return (
      <div className="token-card">
        <div className="token-card__swatch token-card__swatch--motion">
          <span className="motion-dot" style={{ animationTimingFunction: t.value.includes('cubic') ? t.value : undefined, animationDuration: t.value.includes('ms') ? t.value : undefined }} />
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value" title={t.value}>{t.value}</p>
        </div>
      </div>
    );
  }

  return null;
};

/* ============================================================================
 * MAIN PAGE
 * ============================================================================ */

type Filter = 'all' | Category | 'Tokens' | 'Pages';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 'Core', label: 'Core' },
  { id: 'Feedback', label: 'Feedback' },
  { id: 'Patterns', label: 'Patterns' },
  { id: 'Learning', label: 'Learning' },
  { id: 'Content', label: 'Content' },
  { id: 'Navigation', label: 'Navigation' },
  { id: 'Tokens', label: 'Tokens' },
  { id: 'Pages', label: 'Pages & Templates' },
];

const Components: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const q = query.trim().toLowerCase();

  const filteredComponents = useMemo(() => {
    if (filter === 'Tokens' || filter === 'Pages') return [];
    return COMPONENTS.filter((c) => {
      if (filter !== 'all' && c.category !== filter) return false;
      if (!q) return true;
      const haystack = [
        c.name, c.codeName, c.cssBase, c.description, c.category, ...c.keywords,
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [q, filter]);

  const filteredTokens = useMemo(() => {
    if (filter !== 'all' && filter !== 'Tokens') return [];
    return ALL_TOKENS.filter((t) => {
      if (!q) return true;
      const haystack = [t.name, t.cssVar, t.value, t.group, t.type].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [q, filter]);

  const filteredPages = useMemo(() => {
    if (filter !== 'all' && filter !== 'Pages') return [];
    return PAGE_TEMPLATES.filter((p) => {
      if (!q) return true;
      const haystack = [p.name, p.description, p.family, ...p.tags].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [q, filter]);

  const pagesByFamily = useMemo(() => {
    const order = ['Core', 'Journal', 'Veille', 'Coaching'];
    const map = new Map<string, PageTemplate[]>();
    filteredPages.forEach((p) => {
      if (!map.has(p.family)) map.set(p.family, []);
      map.get(p.family)!.push(p);
    });
    return order
      .map((fam) => [fam, map.get(fam) ?? []] as const)
      .filter(([, list]) => list.length > 0);
  }, [filteredPages]);

  const tokensByGroup = useMemo(() => {
    const map = new Map<string, TokenEntry[]>();
    filteredTokens.forEach((t) => {
      if (!map.has(t.group)) map.set(t.group, []);
      map.get(t.group)!.push(t);
    });
    return Array.from(map.entries());
  }, [filteredTokens]);

  const componentsByCategory = useMemo(() => {
    const order: Category[] = ['Core', 'Feedback', 'Patterns', 'Learning', 'Content', 'Navigation'];
    return order
      .map((cat) => [cat, filteredComponents.filter((c) => c.category === cat)] as const)
      .filter(([, list]) => list.length > 0);
  }, [filteredComponents]);

  return (
    <div className="ds-showcase">
      {/* -------------------------------- HERO -------------------------------- */}
      <header className="ds-hero">
        <p className="ds-hero__eyebrow">Design System · v1.0.0 · 2026-04-24</p>
        <h1 className="ds-hero__title">The Learning Society — Components</h1>
        <p className="ds-hero__desc">
          Source of truth: <code>src/components/</code>. {COMPONENTS.length} composants React
          + tous les tokens du système. Tout est copiable — cliquez sur une puce pour
          copier le nom de code ou la variable CSS.
        </p>
        <div className="ds-hero__stats">
          <div><strong>{COMPONENTS.length}</strong><span>composants</span></div>
          <div><strong>{ALL_TOKENS.length}</strong><span>tokens</span></div>
          <div><strong>5</strong><span>catégories</span></div>
          <div><strong>3</strong><span>fontes</span></div>
        </div>
      </header>

      {/* -------------------------------- CONTROLS ---------------------------- */}
      <div className="ds-controls">
        <Search
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="lg"
          placeholder="Rechercher un composant, un token, une classe CSS…"
        />
        <div className="ds-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`ds-filter${filter === f.id ? ' ds-filter--active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* -------------------------------- RESULTS ----------------------------- */}
      {filteredComponents.length === 0 && filteredTokens.length === 0 && filteredPages.length === 0 ? (
        <EmptyState
          title="Aucun résultat"
          description={`Rien ne correspond à « ${query} ». Essayez un autre terme.`}
          actions={<Button variant="primary" onClick={() => { setQuery(''); setFilter('all'); }}>Réinitialiser</Button>}
        />
      ) : (
        <>
          {/* ---- Components by category ---- */}
          {componentsByCategory.map(([cat, list]) => (
            <section key={cat} className="ds-section">
              <div className="ds-section__head">
                <h2 className="ds-section__title">{cat}</h2>
                <span className="ds-section__count">{list.length} composant{list.length > 1 ? 's' : ''}</span>
              </div>
              <div className="ds-component-list">
                {list.map((c) => (
                  <article key={c.name} className="ds-component">
                    <header className="ds-component__head">
                      <div>
                        <h3 className="ds-component__name">{c.name}</h3>
                        <p className="ds-component__desc">{c.description}</p>
                      </div>
                      <div className="ds-component__chips">
                        <CopyChip text={c.codeName} label={`‹${c.codeName}›`} />
                        <CopyChip text={c.cssBase} label={c.cssBase} />
                        <span className="ds-component__cat">{c.category}</span>
                      </div>
                    </header>
                    <div className="ds-component__preview">{c.render()}</div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {/* ---- Pages & Templates ---- */}
          {pagesByFamily.map(([family, pages]) => (
            <section key={family} className="ds-section">
              <div className="ds-section__head">
                <h2 className="ds-section__title">Pages · {family}</h2>
                <span className="ds-section__count">{pages.length} template{pages.length > 1 ? 's' : ''}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--s-4)' }}>
                {pages.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--r-xl)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Color header */}
                    <div
                      style={{
                        background: p.bg,
                        borderBottom: '1px solid var(--border)',
                        padding: 'var(--s-5) var(--s-5) var(--s-4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--s-3)',
                      }}
                    >
                      <span style={{ fontSize: 'var(--t-h2)', lineHeight: 1 }}>{p.icon}</span>
                      <div>
                        <div style={{ fontSize: 'var(--t-micro)', fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 'var(--s-1)' }}>
                          {p.family}
                        </div>
                        <div style={{ fontSize: 'var(--t-body)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.2 }}>
                          {p.name}
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: 'var(--s-4) var(--s-5)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
                      <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                        {p.description}
                      </p>

                      {/* Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-1-5)' }}>
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: 'var(--chip-padding-xs)',
                              borderRadius: 'var(--r-pill)',
                              background: 'var(--surface-muted)',
                              border: '1px solid var(--border)',
                              fontSize: 'var(--t-micro)',
                              fontWeight: 600,
                              color: 'var(--text-muted)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Navigate button */}
                      <button
                        type="button"
                        onClick={() => navigate(p.path)}
                        style={{
                          marginTop: 'auto',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 'var(--s-1-5)',
                          padding: 'var(--s-2) var(--s-4-5)',
                          borderRadius: 'var(--r-pill)',
                          background: p.color,
                          border: 'none',
                          color: 'var(--text-inverse)',
                          fontWeight: 700,
                          fontSize: 'var(--t-body-sm)',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-body)',
                          transition: 'opacity 0.15s',
                          width: '100%',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        Ouvrir la page →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* ---- Tokens ---- */}
          {filteredTokens.length > 0 && (
            <section className="ds-section">
              <div className="ds-section__head">
                <h2 className="ds-section__title">Design Tokens</h2>
                <span className="ds-section__count">{filteredTokens.length} token{filteredTokens.length > 1 ? 's' : ''}</span>
              </div>
              {tokensByGroup.map(([group, list]) => (
                <div key={group} className="ds-token-group">
                  <h3 className="ds-token-group__title">{group}</h3>
                  <div className={`ds-token-grid ds-token-grid--${list[0].type}`}>
                    {list.map((t) => (
                      <Swatch key={t.cssVar} t={t} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      )}

      {/* -------------------------------- INLINE STYLES ----------------------- */}
      <style>{PAGE_STYLES}</style>
    </div>
  );
};

/* ============================================================================
 * PAGE-SPECIFIC STYLES
 * Not part of the design system proper — just glue for the showcase layout.
 * ============================================================================ */

const PAGE_STYLES = `
  .ds-showcase {
    max-width: var(--container-wide);
    margin: 0 auto;
    padding: var(--s-8) var(--s-6);
    display: flex;
    flex-direction: column;
    gap: var(--s-10);
  }
  .ds-hero {
    padding: var(--s-10) var(--s-8);
    border-radius: var(--r-2xl);
    background: var(--g-cool-soft, linear-gradient(180deg, #E8F4F7, #DCEBEF));
    display: flex; flex-direction: column; gap: var(--s-3);
  }
  .ds-hero__eyebrow {
    font-size: var(--t-micro); font-weight: 700; letter-spacing: .06em;
    text-transform: uppercase; color: var(--tls-primary-800); margin: 0;
  }
  .ds-hero__title {
    font-family: 'League Spartan', sans-serif;
    font-size: var(--t-display-lg); line-height: 1.05; margin: 0;
    color: var(--tls-primary-900);
  }
  .ds-hero__desc { margin: 0; color: var(--tls-primary-800); font-size: var(--t-body-lg); max-width: 70ch; }
  .ds-hero__desc code {
    font-family: 'JetBrains Mono', monospace; font-size: .95em;
    background: rgba(255,255,255,0.55); padding: 1px 6px; border-radius: var(--r-sm);
  }
  .ds-hero__stats { display: flex; gap: var(--s-8); margin-top: var(--s-5); flex-wrap: wrap; }
  .ds-hero__stats > div { display: flex; flex-direction: column; }
  .ds-hero__stats strong {
    font-family: 'League Spartan', sans-serif; font-size: 2.25rem; line-height: 1;
    color: var(--tls-primary-800);
  }
  .ds-hero__stats span {
    font-size: var(--t-micro); text-transform: uppercase; letter-spacing: .06em;
    color: var(--tls-primary-700); margin-top: 4px;
  }

  .ds-controls {
    position: sticky; top: 0; z-index: 10;
    padding: var(--s-4) var(--s-2);
    background: rgba(255,255,255,0.85);
    backdrop-filter: var(--glass-blur, saturate(180%) blur(20px));
    border-radius: var(--r-xl);
    display: flex; flex-direction: column; gap: var(--s-3);
    border: 1px solid var(--border);
  }
  .ds-filters { display: flex; gap: var(--s-1-5); flex-wrap: wrap; }
  .ds-filter {
    border: 1px solid var(--border);
    background: var(--surface);
    padding: var(--s-1-5) var(--s-3);
    border-radius: var(--r-pill);
    font-size: var(--t-caption);
    font-weight: 600;
    color: var(--text-muted);
    cursor: pointer;
    transition: all var(--dur-2) var(--ease-standard);
  }
  .ds-filter:hover { color: var(--text); border-color: var(--border-strong); }
  .ds-filter--active {
    background: var(--tls-primary-600); color: #fff; border-color: var(--tls-primary-600);
  }

  .ds-section { display: flex; flex-direction: column; gap: var(--s-5); }
  .ds-section__head {
    display: flex; align-items: baseline; justify-content: space-between;
    padding-bottom: var(--s-3); border-bottom: 1px solid var(--border);
  }
  .ds-section__title {
    font-family: 'League Spartan', sans-serif; font-size: var(--t-h1);
    margin: 0; color: var(--text);
  }
  .ds-section__count {
    font-size: var(--t-caption); color: var(--text-muted); font-weight: 500;
  }

  .ds-component-list { display: flex; flex-direction: column; gap: var(--s-6); }
  .ds-component {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-xl);
    padding: var(--s-6);
    display: flex; flex-direction: column; gap: var(--s-5);
  }
  .ds-component__head {
    display: flex; gap: var(--s-5); justify-content: space-between;
    flex-wrap: wrap; align-items: flex-start;
  }
  .ds-component__name {
    font-family: 'League Spartan', sans-serif; font-size: var(--t-h3);
    margin: 0; color: var(--text);
  }
  .ds-component__desc {
    margin: 4px 0 0; color: var(--text-muted); font-size: var(--t-body-sm);
    max-width: 70ch;
  }
  .ds-component__chips { display: flex; gap: var(--s-1-5); align-items: center; flex-wrap: wrap; }
  .ds-component__cat {
    font-size: var(--t-micro); font-weight: 700; letter-spacing: .06em;
    text-transform: uppercase; color: var(--tls-primary-700);
    background: var(--tls-primary-50); padding: var(--s-1) var(--s-2); border-radius: var(--r-sm);
  }

  .ds-component__preview {
    padding: var(--s-6);
    background: var(--surface-muted);
    border-radius: var(--r-lg);
    border: 1px solid var(--border);
  }

  /* Shared utility helpers used inside component previews */
  .hstack { display: flex; gap: var(--s-3); flex-wrap: wrap; align-items: flex-start; }
  .vstack { display: flex; flex-direction: column; gap: var(--s-4); }
  .grid-2 {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: var(--s-4);
  }

  /* Copy chip */
  .copy-chip {
    display: inline-flex; align-items: center; gap: var(--s-1-5);
    background: var(--surface-muted);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: var(--s-1) var(--s-2);
    font-family: 'JetBrains Mono', monospace; font-size: var(--t-caption);
    color: var(--text); cursor: pointer;
    transition: all var(--dur-2) var(--ease-standard);
  }
  .copy-chip:hover { border-color: var(--tls-primary-300); color: var(--tls-primary-800); }
  .copy-chip__state { font-size: 10px; color: var(--text-soft); }
  .copy-chip code { font: inherit; background: none; padding: 0; }

  /* Token grids */
  .ds-token-group { display: flex; flex-direction: column; gap: var(--s-3); margin-top: var(--s-5); }
  .ds-token-group__title {
    font-family: 'League Spartan', sans-serif;
    font-size: var(--t-h4); margin: 0; color: var(--text);
  }
  .ds-token-grid {
    display: grid; gap: var(--s-3);
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
  .ds-token-grid--typography { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
  .ds-token-grid--gradient { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }

  .token-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    padding: var(--s-3);
    display: flex; flex-direction: column; gap: var(--s-2);
  }
  .token-card--wide { grid-column: span 1; }
  .token-card__swatch {
    height: 72px; border-radius: var(--r-md);
    display: flex; align-items: center; justify-content: center;
  }
  .token-card__swatch--shadow { background: var(--surface); }
  .token-card__swatch--spacing { background: var(--surface-muted); }
  .token-card__swatch--radius {
    background: var(--tls-primary-100); width: 64px; height: 64px; margin: 8px auto;
  }
  .token-card__swatch--motion { background: var(--surface-muted); position: relative; overflow: hidden; }
  .token-card__swatch--motion .motion-dot {
    width: 10px; height: 10px; background: var(--tls-primary-600); border-radius: 50%;
    animation: motion-slide 1800ms infinite alternate;
  }
  @keyframes motion-slide { from { transform: translateX(-30px); } to { transform: translateX(30px); } }
  .token-card__typography {
    padding: var(--s-4); background: var(--surface-muted); border-radius: var(--r-md);
    color: var(--text);
    display: flex; align-items: center; justify-content: center;
    min-height: 72px;
  }
  .token-card__meta { display: flex; flex-direction: column; gap: var(--s-1); }
  .token-card__name {
    margin: 0; font-size: var(--t-caption); font-weight: 600; color: var(--text);
  }
  .token-card__value {
    margin: 0; font-family: 'JetBrains Mono', monospace;
    font-size: 11px; color: var(--text-muted);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
`;

export { Components };
