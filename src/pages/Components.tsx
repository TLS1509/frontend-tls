/**
 * Components & Design Tokens Showcase
 *
 * Valeurs : src/index.css (@theme) + src/styles/design-tokens.css — ce dernier
 * gagne les collisions (couche base > theme). Règles d'usage : docs/_canon/REGLES-USAGE-COMPOSANTS.md.
 * (spec.json supprimé le 2026-07-22 : jamais importé, valeurs périmées.)
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

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PositionnementModal,
  BookingModal,
  ConfirmModal,
  SuccessModal,
  SessionFeedbackModal,
  CancelSessionModal,
  VideoPlayerModal,
  CelebrationModal,
} from '../components/modals';
import { SelectCheckbox, SelectCheckboxCategory, SearchWithSuggestions, type SearchSuggestion } from '../components';
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
  AvatarGroup,
  // Feedback
  Alert,
  EmptyState,
  Skeleton,
  Search,
  SearchFilters,
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
  FilterChip,
  Steps,
  InlineWin,
  // Navigation
  Sidebar,
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
  MetaPill,
  MetaPillGroup,
  MetaItem,
  UserInfo,
  IconFeatureCard,
  // Patterns
  ParcoursCard,
  ViewerProgressTrail,
} from '../components';
import { ToastContainer } from '../components';
import { useToast } from '../hooks/useToast';
// Components not yet in main index — direct imports
import { ProfileCard } from '../components/ui/ProfileCard';
import { LearningItemCard } from '../components/learning/LearningItemCard';
// SurfaceCard deprecated → use <Card variant="default|elevated|glass|bordered|muted|sunken">
import { ResourceCard } from '../components/ui/ResourceCard';
import { CompetencyMatrix } from '../components/ui/CompetencyMatrix';
import { GoalProgress } from '../components/ui/GoalProgress';
import { QuizComponent } from '../components/ui/QuizComponent';
import { ActivityFeed } from '../components/patterns/ActivityFeed';
// (DashboardHero deprecated → use PageHero tone="brand" instead)
import { CardGrid } from '../components/patterns/CardGrid';
import { CoachCardGrid } from '../components/patterns/CoachCardGrid';
import { InlineProgress } from '../components/patterns/InlineProgress';
import { LearningPathGrid } from '../components/patterns/LearningPathGrid';
// (LearningPathHeader deprecated → use PageHero with backLink + progress)
import { MultiStepForm } from '../components/patterns/MultiStepForm';
import { PageCard } from '../components/patterns/PageCard';
import { ResumeLessonCard } from '../components/patterns/ResumeLessonCard';
import { SessionCard } from '../components/learning/SessionCard';
import { ArticleCard } from '../components/learning/ArticleCard';
import { PromptCard } from '../components/learning/PromptCard';
import { VideoCard } from '../components/learning/VideoCard';
import { MoodSelector } from '../components/ui/MoodSelector';
import type { MoodLevel } from '../components/ui/MoodSelector';
import { JournalChatCompose } from '../components/ui/JournalChatCompose';
import { StructuredQuestionAccordion } from '../components/ui/StructuredQuestionAccordion';
import { WritingPromptsAside } from '../components/patterns/WritingPromptsAside';
import { JournalBubbleCard } from '../components/cards/JournalBubbleCard';
import type { JournalBubbleType } from '../components/cards/JournalBubbleCard';
import { RankingCard } from '../components/learning/RankingCard';
import { TlsLogo, TlsLogoLockup } from '../components/ui/TlsLogo';
import { Flashcard } from '../components/patterns/Flashcard';
import { QuizQuestionCard } from '../components/patterns/QuizQuestionCard';
import { DataTable } from '../components/patterns/DataTable';
// MessageThreadCard supprimé Phase 10 — remplacé par MessageBubble + ConversationalChat
import { MessageBubble } from '../components/ui/MessageBubble';
import { ConversationalChat } from '../components/patterns/ConversationalChat';
import { RatingModal } from '../components/patterns/RatingModal';
import { ProjectCard } from '../components/learning/ProjectCard';
// SocialButton supprimé (Phase 10) — utiliser AuthSocialButton (depuis AuthShell)
import { FloatingNavButton } from '../components/FloatingNavButton';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/layout/Container';
import { Grid } from '../components/layout/Grid';
import { Stack } from '../components/layout/Stack';
import { Cluster } from '../components/layout/Cluster';
import { BottomNav } from '../components/layout/BottomNav';
import { PageHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import {
  AuthShell,
  AuthDivider,
  AuthSocialButton,
  AuthField,
  AuthPasswordField,
  AuthPrimaryButton,
  AuthGhostButton,
  AuthCheckbox,
  AuthInlineLink,
  AuthGoogleIcon,
  AuthLinkedinIcon,
} from '../components/patterns/AuthShell';
import { ResourceCardGrid } from '../components/patterns/ResourceCardGrid';
// (SettingsSection deprecated → use SectionCard with `actions` footer slot)
import { VeilleCardFeed, VeilleCard, VeilleCardListItem, FeaturedSpotlight } from '../components/patterns/VeilleCardFeed';
import { AuthorStrip } from '../components/patterns/AuthorStrip';
import { IntroCallout } from '../components/patterns/IntroCallout';
import { KeyFindingCard } from '../components/patterns/KeyFindingCard';
import { EditorialQuoteCallout } from '../components/patterns/EditorialQuoteCallout';
import { ReadingProgressBar, ReadingProgressRing } from '../components/patterns/ReadingProgress';
import { TableOfContents } from '../components/patterns/TableOfContents';
import { FilterBar } from '../components/forms/FilterBar';
import { Spinner } from '../components/ui/Spinner';
import { StatusBadge } from '../components/ui/StatusBadge';
import { NotificationBadge } from '../components/ui/NotificationBadge';
// KPICard deprecated → use StatCard directly
import { SkillBar } from '../components/ui/SkillBar';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageHeader } from '../components/patterns/PageHeader';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { QuickActionButton } from '../components/ui/QuickActionButton';
import { Divider } from '../components/ui/Divider';
import { Bell, MessageSquare, BookOpen, Calendar, GraduationCap, Clock3, Flame, Trophy, Zap, Users, Lightbulb, CheckCircle2, LayoutDashboard, Map as MapIcon, PenLine, Video, Sparkles as SparklesIcon, UserRound as UserIcon, Settings2, Target, BarChart3, LogOut, Mail, Layers, Palette, FolderTree, LayoutTemplate, Star, SlidersHorizontal, ArrowLeft, ArrowRight, TrendingUp, FolderOpen, User, Bookmark, Check, CheckCheck, ChevronUp, CirclePlus, Lock, BookOpenText } from 'lucide-react';
import { SidebarUserCard } from '../components/layout/Sidebar';
import { ConsentBanner } from '../components/patterns/ConsentBanner';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { AIOverrideButton } from '../components/ui/AIOverrideButton';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { HeatmapGrid } from '../components/ui/HeatmapGrid';
import { CorrectionCard } from '../components/ui/CorrectionCard';
import { StepTutorial } from '../components/patterns/StepTutorial';
import { NewsletterSignupCard } from '../components/patterns/NewsletterSignupCard';
import { OptionGrid } from '../components/patterns/OptionGrid';
import { DreyfusLevelSelector } from '../components/ui/DreyfusLevelSelector';
import { CongratulationsCard } from '../components/patterns/CongratulationsCard';
import { NextStepsGrid } from '../components/patterns/NextStepsGrid';
import { EmptyDashboardState } from '../components/patterns/EmptyDashboardState';
import { ProgressDots } from '../components/ui/ProgressDots';
import { SelectCheckboxFloating } from '../components/ui/SelectCheckboxFloating';
import { CoachRow } from '../components/patterns/CoachRow';
import { ReaderContextStrip } from '../components/patterns/ReaderContextStrip';
import { CorrectionStatusBar } from '../components/learning/CorrectionStatusBar';
import { ErrorPage } from '../components/patterns/ErrorPage';
import { CompletionModal } from '../components/modals/CompletionModal';
import { AuthSuccess } from '../components/patterns/AuthShell';
import {
  ParcoursCardSkeleton,
  NotificationRowSkeleton,
  EditorialCardSkeleton,
  StatCardSkeleton,
  ActivityItemSkeleton,
  ResumeLessonSkeleton,
  SkeletonGroup,
} from '../components/patterns/SkeletonTemplates';
import { ActivityTimeline } from '../components/patterns/ActivityTimeline';
import { TabsWithContent } from '../components/patterns/TabsWithContent';
import { FormLayout } from '../components/patterns/FormLayout';
import { ViewerOverlay } from '../components/patterns/ViewerOverlay';
import { HeaderNav } from '../components/patterns/HeaderNav';
import { AppBreadcrumb } from '../components/patterns/AppBreadcrumb';
import { AccountFamilyNav } from '../components/patterns/AccountFamilyNav';
import { AchievementBadge } from '../components/ui/AchievementBadge';
import { JacCardPending, JacCardNextJalon } from '../components/ui/JacCard';
import { LessonNavigation } from '../components/patterns/LessonNavigation';
import { FlipCard } from '../components/patterns/FlipCard';
import { Combobox } from '../components/ui/Combobox';
import { QualitativeRating } from '../components/ui/QualitativeRating';
import { DreyfusSlider } from '../components/ui/DreyfusSlider';
import { BehavioralTileGrid } from '../components/patterns/BehavioralTileGrid';
import { VeilleFormatShortcutCards } from '../components/patterns/VeilleFormatShortcutCards';
import { VeilleHeroFilterChips } from '../components/patterns/VeilleHeroFilterChips';
import { AstucesCard } from '../components/learning/AstucesCard';
import { ResourceListItem } from '../components/learning/ResourceListItem';
import { EtapeAccordion } from '../components/patterns/EtapeAccordion';
import { AuthBackLink } from '../components/patterns/AuthShell';
import { Briefcase, HeartHandshake, FileText } from 'lucide-react';
import { Plus, Heart, Home, Trophy as TrophyIcon, Settings, Trash2, Pencil, Maximize2 } from 'lucide-react';
import { FloatLabel } from '../components/core/FloatLabel';
import { Chip } from '../components/ui/Chip';
import { IconChip } from '../components/ui/IconChip';
import { Tooltip } from '../components/ui/Tooltip';
import { Kbd } from '../components/ui/Kbd';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { SettingsRow } from '../components/patterns/SettingsRow';
import { SelectableOptionCard } from '../components/patterns/SelectableOptionCard';
import { RadioGroup } from '../components/ui/RadioGroup';
import { CheckboxGroup } from '../components/ui/CheckboxGroup';
import { FormSection } from '../components/ui/FormSection';
import { InputGroup } from '../components/ui/InputGroup';
import { SimpleTable } from '../components/ui/SimpleTable';
import { PaginatedList } from '../components/ui/PaginatedList';
import { FilteredList } from '../components/ui/FilteredList';
import { StepIndicator } from '../components/ui/StepIndicator';
import { ModalForm } from '../components/ui/ModalForm';
import { FilterableCardGrid } from '../components/ui/FilterableCardGrid';
import {
  RadarChart,
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  ScatterChart,
  ComposedChart,
  HeatmapChart,
  ChartContainer,
  ChartWithExport,
  ChartDetailModal,
  TimelineChart,
  GaugeChart,
  ChartExportButton,
} from '../components/charts';
import {
  CATALOG,
  CATEGORY_ORDER,
  SUBCATEGORY_ORDER,
  type Category as Category_,
  type SubCategory as SubCategory_,
} from './components/registry';
import { ShowcaseNav, useCategorySlug } from './components/ShowcaseNav';
import { categorySlug, componentSlug, categoryFromSlug } from './components/registry';

/* ============================================================================
 * TYPES
 * ============================================================================ */

// New rules-based taxonomy (14 categories)
// La taxonomie (catégories, sous-catégories, classement des composants) vit
// désormais dans ./components/registry.ts — c'est de la donnée, pas du JSX,
// donc la navigation, les ancres et le contrôle de couverture s'en déduisent.
// Extrait le 2026-07-28, phase 1 du chantier showcase.
type NewCategory = Category_;
type SubCategory = SubCategory_;

interface ComponentEntry {
  name: string;              // React name: Button
  codeName: string;          // File: Button.tsx
  /** Classe CSS de base, ex. `.btn`. Absente pour les fiches de convention :
      elles décrivent une règle, pas un composant, donc aucune classe ne la porte. */
  cssBase?: string;
  subCategory?: SubCategory; // optional inline sub-category (used when entry is not in REMAP)
  description: string;
  keywords: string[];        // extra searchable terms
  /** True when the component is only referenced from the Components showcase (not consumed by any real app page). */
  showcaseOnly?: boolean;
  /**
   * Le composant expose-t-il une prop `tone` (primary / warm / sun) ?
   * Métadonnée descriptive, alignée sur le champ « Tone-aware » de la Notion DS DB.
   * NB : `FILTER_OPTIONS` déclare un filtre pour ce flag mais n'est pas encore
   * câblé au rendu — la valeur est donc documentaire pour l'instant.
   */
  toneAware?: boolean;
  /** Le composant expose-t-il des variants ? Même statut que `toneAware`. */
  hasVariants?: boolean;
  /** Optional list of pages/files that consume this component (for dev specs). */
  usedBy?: string[];
  render: () => React.ReactNode;
}

/* ============================================================================
 * CATEGORIZATION REMAP — Source of truth for the new taxonomy
 *
 * Maps every component name → { category, subCategory }
 * Used at render-time to group components by the new structure
 * without having to edit each component entry block.
 * ============================================================================ */

const REMAP = CATALOG;


/** Display order for new categories (left-to-right in filter tabs, top-to-bottom in render). */
// CATEGORY_ORDER et SUBCATEGORY_ORDER sont importés du registre.

/** Resolve a component's new category + subCategory (fallbacks for unmapped entries). */
const resolveMeta = (entry: ComponentEntry): { category: NewCategory; subCategory: SubCategory } => {
  const mapped = REMAP[entry.name];
  if (mapped) return mapped;
  // Un composant absent du registre n'a pas de place définie : on le signale
  // plutôt que de le ranger arbitrairement. `npm run check:showcase` les liste.
  return { category: 'Atoms', subCategory: 'Non classé' };
};

interface TokenEntry {
  name: string;
  cssVar: string;
  value: string;
  group: string;
  type:
    | 'color'
    | 'typography'
    | 'spacing'
    | 'radius'
    | 'shadow'
    | 'motion'
    | 'gradient'
    | 'role'
    | 'opacity'
    | 'duration'
    | 'easing'
    | 'container'
    | 'blur'
    | 'zindex'
    | 'surface'
    | 'touch'
    | 'icon';
}

/* ============================================================================
 * SHARED ICONS (demo content)
 * ============================================================================ */

/* Les icônes de démonstration.

   Elles étaient dix SVG écrits à la main, avec des épaisseurs de trait de 2, 2,2
   et 3 et des tailles de 16 et 18 mêlées — dans un fichier dont la vocation est
   précisément de montrer ce qui est cohérent. Le repo interdit par ailleurs le
   SVG inline custom pour toute icône fonctionnelle : c'est Lucide, et la vitrine
   ne peut pas être l'exception à sa propre règle.

   `icon-sm` (18 px) est la taille hors bouton ; à l'intérieur d'un Button, la
   boîte force le glyphe à sa propre taille, donc ce réglage n'y intervient pas. */
const I = {
  arrow: <ArrowRight className="icon-sm" strokeWidth={2} aria-hidden />,
  check: <Check className="icon-sm" strokeWidth={2} aria-hidden />,
  plus: <Plus className="icon-sm" strokeWidth={2} aria-hidden />,
  heart: <Heart className="icon-sm" strokeWidth={2} aria-hidden />,
  home: <Home className="icon-sm" strokeWidth={2} aria-hidden />,
  book: <BookOpen className="icon-sm" strokeWidth={2} aria-hidden />,
  trophy: <TrophyIcon className="icon-sm" strokeWidth={2} aria-hidden />,
  settings: <Settings className="icon-sm" strokeWidth={2} aria-hidden />,
  trash: <Trash2 className="icon-sm" strokeWidth={2} aria-hidden />,
  edit: <Pencil className="icon-sm" strokeWidth={2} aria-hidden />,
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
    description: 'Hub éditorial avec filtres pills (Tout/Actus/Tutoriels/Dossiers/Magazine), recherche, quick-access 4 formats, feed d\'articles avec bookmark, section "Explorer par catégorie" (6 tuiles deeplink).',
    path: '/veille',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['filter pills', 'search', 'feed', 'bookmark', 'quick-access', 'explore tiles'],
    icon: '🗞️',
  },
  {
    id: 'veille-actus',
    name: 'Veille — Actus',
    description: 'Page n-1 catégorie : feed chronologique de toutes les actus. Hero brand bounded, filter période (semaine/mois/all), VeilleCardFeed avec featured spotlight, cross-categories nav.',
    path: '/veille/actus',
    family: 'Veille',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['listing', 'category', 'feed', 'period filter', 'brand tone'],
    icon: '📰',
  },
  {
    id: 'veille-tutoriels',
    name: 'Veille — Tutoriels',
    description: 'Page n-1 catégorie : grid 3-cols thumbnail-dominant. Hero sun bounded, filter par niveau (débutant/inter/avancé), featured spotlight 2-col, cross-categories nav.',
    path: '/veille/tutoriels',
    family: 'Veille',
    color: 'var(--tls-yellow-600)',
    bg: 'var(--tls-yellow-50)',
    tags: ['listing', 'category', 'grid', 'video', 'level filter', 'sun tone'],
    icon: '🎬',
  },
  {
    id: 'veille-dossiers',
    name: 'Veille — Dossiers',
    description: 'Page n-1 catégorie : grid 2-cols card-dominant. Hero warm bounded, featured full-bleed top, emoji-bubble + tags + pages + downloads, filter catégorie thématique.',
    path: '/veille/dossiers',
    family: 'Veille',
    color: 'var(--tls-orange-600)',
    bg: 'rgba(237,132,58,0.07)',
    tags: ['listing', 'category', 'grid', 'long-form', 'category filter', 'warm tone'],
    icon: '📋',
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
    description: 'Hero glass avec avatar gradient + initiales, online dot, meta chips, intérêts pills. Onglets (Vue d\'ensemble / Activité / Badges / Compétences).',
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
    description: 'Podium or/argent/bronze avec gradients, emojis médailles, cercle initiales 48 px, badge points, série en pastille, rangée de chiffres. ⚠️ L’arbitrage n°18 retire de l’app apprenant le classement nominatif et la série quotidienne.',
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
    description: "Notifications en rangées (NotificationCard row) dans une carte : pastille d'icône au ton du type, non-lus sur fond teinté avec un point, nombre de non-lus dans le hero, filtres en pastilles sur 4 catégories, bouton « Tout lire ».",
    path: '/notifications',
    family: 'Compte',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['notification cards', 'colored border', 'unread badge', 'filter pills', 'tone system'],
    icon: '🔔',
  },
  {
    id: 'account',
    name: 'Mon compte',
    description: "AccountFamilyNav (5 destinations), onglets Général / Sécurité, zone de danger liée aux vrais parcours RGPD. La carte « Interface » et ses interrupteurs factices ont été retirés le 24/09. Ex-Settings.tsx fusionné ici (Phase 24).",
    path: '/account',
    family: 'Compte',
    color: 'var(--tls-primary-600)',
    bg: 'var(--tls-primary-50)',
    tags: ['account family nav', 'tabs', 'toggles', 'settings rows', 'select'],
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
    <div className="flex flex-col gap-stack-xs items-start">
      <Button onClick={() => setOpen(true)} leadingIcon={<Target />}>Se positionner</Button>
      <p className="m-0 text-caption text-ink-600">
        S'ouvre avant de démarrer un parcours. 3 questions, 5 niveaux.
      </p>
      <PositionnementModal isOpen={open} onClose={() => setOpen(false)} courseTitle="Maîtrise des données" />
    </div>
  );
};

const BookingModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-stack-xs items-start">
      <Button onClick={() => setOpen(true)} leadingIcon={<Calendar />}>Réserver une session</Button>
      <p className="m-0 text-caption text-ink-600">
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
    <div className="flex flex-col gap-stack-xs items-start">
      <div className="flex gap-stack-xs flex-wrap">
        {(['info', 'success', 'warning', 'danger'] as const).map((v) => (
          <Button key={v} size="sm" emphasis={variant === v ? 'soft' : 'ghost'} tone="neutral" onClick={() => { setVariant(v); setOpen(true); }}>
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
    <div className="flex gap-stack-xs items-start">
      <Button onClick={() => setOpen(true)} leadingIcon={<CheckCircle2 />}>Afficher la réussite</Button>
      <SuccessModal isOpen={open} onClose={() => setOpen(false)} title="Module complété !" message="Vous avez terminé le module avec succès. Continuez sur votre lancée !" buttonText="Continuer" />
    </div>
  );
};

const SessionFeedbackModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-stack-xs items-start">
      <Button onClick={() => setOpen(true)} leadingIcon={<Star />}>Donner un avis</Button>
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
    <div className="flex gap-stack-xs items-start flex-wrap">
      <Button emphasis="soft" tone="warm" onClick={() => setOpen(true)}>Annuler une session</Button>
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
    <div className="flex gap-stack-xs items-start">
      <Button onClick={() => setOpen(true)} leadingIcon={<Video />}>Lancer une vidéo</Button>
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

/* ── Démos phase 4 : composants qui ont besoin d'un état local ───────────── */

const SegmentedControlDemo: React.FC = () => {
  const [vue, setVue] = useState<'liste' | 'grille' | 'calendrier'>('liste');
  const [periode, setPeriode] = useState<'7j' | '30j' | '90j'>('30j');
  return (
    <div className="flex flex-col gap-stack">
      <SegmentedControl
        options={[
          { value: 'liste', label: 'Liste' },
          { value: 'grille', label: 'Grille' },
          { value: 'calendrier', label: 'Calendrier' },
        ]}
        value={vue}
        onChange={setVue}
      />
      <SegmentedControl
        size="sm"
        tone="warm"
        options={[
          { value: '7j', label: '7 jours' },
          { value: '30j', label: '30 jours' },
          { value: '90j', label: '90 jours' },
        ]}
        value={periode}
        onChange={setPeriode}
      />
      <p className="m-0 text-caption text-ink-600">Vue : {vue} · Période : {periode}</p>
    </div>
  );
};

const SelectableOptionCardDemo: React.FC = () => {
  const [choix, setChoix] = useState('coach');
  const options = [
    { id: 'coach', icon: <UserIcon size={20} />, label: 'Coach', description: 'Accompagne une cohorte' },
    { id: 'manager', icon: <BarChart3 size={20} />, label: 'Manager', description: 'Pilote un portefeuille' },
    { id: 'apprenant', icon: <BookOpen size={20} />, label: 'Apprenant', description: 'Pratique et valide' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
      {options.map((o) => (
        <SelectableOptionCard
          key={o.id}
          icon={o.icon}
          label={o.label}
          description={o.description}
          selected={choix === o.id}
          onClick={() => setChoix(o.id)}
        />
      ))}
    </div>
  );
};

/* ── Démos phase 4, lot 3 ────────────────────────────────────────────────── */

const SelectCheckboxDemo: React.FC = () => {
  const [sel, setSel] = useState<string[]>(['coach']);
  const [cat, setCat] = useState('parcours');
  return (
    <div className="flex flex-col gap-stack max-w-md">
      <SelectCheckbox
        placeholder="Filtrer par rôle"
        options={[
          { id: 'apprenant', label: 'Apprenant' },
          { id: 'coach', label: 'Coach' },
          { id: 'manager', label: 'Manager' },
          { id: 'admin', label: 'Administrateur' },
        ]}
        selected={sel}
        onChange={setSel}
      />
      <SelectCheckboxCategory
        placeholder="Filtrer par domaine"
        categories={[
          { id: 'parcours', label: 'Parcours', subcategories: [{ id: 'p-ing', label: 'Ingénierie' }, { id: 'p-eval', label: 'Évaluation' }] },
          { id: 'veille', label: 'Veille', subcategories: [{ id: 'v-ia', label: 'IA' }, { id: 'v-ld', label: 'L&D' }] },
        ]}
        selected={cat}
        onChange={setCat}
      />
    </div>
  );
};

const SelectCheckboxFloatingDemo: React.FC = () => {
  const [sel, setSel] = useState<string[]>(['jac']);
  return (
    <SelectCheckboxFloating
      label="Types de preuve"
      options={[
        { id: 'jac', label: 'JAC' },
        { id: 'fast', label: 'FAST' },
        { id: 'edra', label: 'EDRA-R' },
        { id: 'projet', label: 'Projet SBO' },
      ]}
      selected={sel}
      onChange={setSel}
    />
  );
};

const ChartDetailModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button emphasis="outline" size="sm" onClick={() => setOpen(true)}>Ouvrir le détail</Button>
      <ChartDetailModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Progression par compétence"
        subtitle="Douze dernières semaines"
      >
        <div className="flex items-end gap-stack-xs h-40">
          {[38, 52, 47, 63, 71, 58, 80].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-primary-400" style={{ height: `${h}%` }} />
          ))}
        </div>
      </ChartDetailModal>
    </>
  );
};

const CompletionModalDemo2: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button emphasis="outline" size="sm" onClick={() => setOpen(true)}>Voir la modale</Button>
      <CompletionModal
        isOpen={open}
        onClose={() => setOpen(false)}
        itemTitle="Concevoir une séquence pédagogique"
        xpEarned={120}
        onNext={() => setOpen(false)}
      />
    </>
  );
};

const ToastDemo: React.FC = () => {
  const { toasts, success, error, warning, info, removeToast } = useToast();
  return (
    <div>
      <div className="flex gap-stack-xs flex-wrap mb-stack">
        <Button size="sm" onClick={() => success('Enregistré avec succès !')}>Success</Button>
        <Button size="sm" emphasis="soft" tone="warm" onClick={() => error('Une erreur est survenue')}>Erreur</Button>
        <Button size="sm" emphasis="soft" tone="warm" onClick={() => warning('Vérifiez votre connexion')}>Warning</Button>
        <Button size="sm" emphasis="outline" onClick={() => info('Mise à jour disponible')}>Info</Button>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div className="flex flex-col gap-stack-xs">
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
    <div className="flex flex-col gap-stack-lg">
      <div>
        <p className="mb-stack-xs text-caption font-semibold text-ink-600">Pill (défaut) · rail au rayon 14, onglet au rayon 10</p>
        {/* Des icônes Lucide, pas des émojis : l'onglet a un emplacement pour elles. */}
        <Tabs
          items={[
            { id: 'tab1', label: 'Étapes', icon: <Layers /> },
            { id: 'tab2', label: 'Projet', icon: <Target /> },
            { id: 'tab3', label: 'Statistiques', icon: <BarChart3 /> },
          ]}
          value={active1}
          onChange={setActive1}
          variant="pill"
        />
      </div>
      <div>
        <p className="mb-stack-xs text-caption font-semibold text-ink-600">Underline</p>
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
      <div>
        <p className="mb-stack-xs text-caption font-semibold text-ink-600">Boxed</p>
        <Tabs
          items={[
            { id: 'a', label: 'Général' },
            { id: 'b', label: 'Sécurité' },
            { id: 'c', label: 'Notifications' },
          ]}
          value={active2}
          onChange={setActive2}
          variant="boxed"
        />
      </div>
    </div>
  );
};

const FilterChipDemo: React.FC = () => {
  const [active, setActive] = useState('all');
  const [activeGlass, setActiveGlass] = useState('tous');
  const TOPICS = ['Tous', 'Leadership', 'IA', 'Formation', 'Coaching'];
  return (
    <div className="flex flex-col gap-stack-lg">
      {/* Default surface */}
      <div className="flex flex-col gap-stack-xs">
        <p className="text-caption font-semibold text-ink-600 m-0">md, le défaut · 44 px · choix unique et réinitialisation</p>
        <div className="flex gap-stack-xs flex-wrap">
          {TOPICS.map((label, i) => {
            const key = i === 0 ? 'all' : label.toLowerCase();
            return (
              <FilterChip key={key} label={label} active={active === key} onClick={() => setActive(key)} />
            );
          })}
          <FilterChip label="Réinitialiser" variant="reset" onClick={() => setActive('all')} />
        </div>
      </div>

      {/* Default with count badges */}
      <div className="flex flex-col gap-stack-xs">
        <p className="text-caption font-semibold text-ink-600 m-0">Avec compteurs</p>
        <div className="flex gap-stack-xs flex-wrap">
          <FilterChip label="En cours" active count={3} onClick={() => {}} />
          <FilterChip label="Terminés" count={1} onClick={() => {}} />
          <FilterChip label="Pas commencés" count={2} onClick={() => {}} />
        </div>
      </div>

      {/* sm : pour une barre dense, à côté d'un Search sm */}
      <div className="flex flex-col gap-stack-xs">
        <p className="text-caption font-semibold text-ink-600 m-0">sm · 28 px, pour une barre dense</p>
        <div className="flex gap-stack-xs flex-wrap">
          {TOPICS.slice(0, 4).map((label, i) => (
            <FilterChip key={label} size="sm" label={label} active={i === 1} onClick={() => {}} />
          ))}
        </div>
      </div>

      {/* Glass variant */}
      <div className="flex flex-col gap-stack-xs">
        <p className="text-caption font-semibold text-ink-600 m-0">Variante glass · sur fond coloré</p>
        <div className="bg-gradient-to-r from-primary-700 to-primary-800 rounded-xl px-stack py-stack-md flex gap-stack-xs flex-wrap">
          {TOPICS.map((label, i) => {
            const key = i === 0 ? 'tous' : label.toLowerCase();
            return (
              <FilterChip
                key={key}
                label={label}
                variant="glass"
                active={activeGlass === key}
                onClick={() => setActiveGlass(key)}
              />
            );
          })}
        </div>
      </div>

      {/* Glass with count badges */}
      <div className="flex flex-col gap-stack-xs">
        <p className="text-caption font-semibold text-ink-600 m-0">Glass · avec compteurs</p>
        <div className="bg-gradient-to-r from-secondary-700 to-secondary-800 rounded-xl px-stack py-stack-md flex gap-stack-xs flex-wrap">
          <FilterChip label="Non lus" variant="glass" active count={3} onClick={() => {}} />
          <FilterChip label="Mentions" variant="glass" count={7} onClick={() => {}} />
          <FilterChip label="Invitations" variant="glass" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

const ModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-stack-xs items-start">
      <Button onClick={() => setOpen(true)}>Ouvrir la modale</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirmer l'action"
        description="Cette opération ne peut pas être annulée."
        actions={
          <>
            {/* La paire Annuler / Confirmer : outline, puis l'action principale en solid (arbitrage n°19). */}
            <Button emphasis="outline" tone="neutral" onClick={() => setOpen(false)}>Annuler</Button>
            <Button emphasis="solid" tone="danger" onClick={() => setOpen(false)}>Supprimer</Button>
          </>
        }
      >
        <p className="m-0 text-ink-700 text-body">
          Voulez-vous vraiment supprimer cet élément ? Cette action est irréversible et toutes les données associées seront perdues.
        </p>
      </Modal>
    </div>
  );
};

const PaginationDemo: React.FC = () => {
  const [page, setPage] = useState(3);
  return (
    <div className="flex flex-col gap-stack">
      <Pagination page={page} totalPages={12} onChange={setPage} info={`Page ${page} sur 12`} />
    </div>
  );
};

const CelebrationModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button emphasis="soft" tone="warm" onClick={() => setOpen(true)}>
        Ouvrir CelebrationModal
      </Button>
      <CelebrationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Parcours terminé"
        description="Tu as terminé le parcours Prompt engineering avec 92 % de réussite."
        actions={
          <>
            <Button emphasis="solid" tone="warm" onClick={() => setOpen(false)}>Voir mon badge</Button>
            <Button emphasis="ghost" onClick={() => setOpen(false)}>Partager</Button>
          </>
        }
      />
    </>
  );
};

const SidebarDemo: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    /* Les icônes de NAVIGATION_PRINCIPALE (src/config/navigation.ts) : la démo
       montrait Video et Sparkles, que l'app n'emploie pas ici. */
    { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard /> },
    { id: 'paths',     label: 'Parcours',         icon: <MapIcon />, count: '3' },
    { id: 'journal',   label: 'Journal de bord',  icon: <PenLine /> },
    { id: 'coaching',  label: 'Coaching',         icon: <GraduationCap /> },
    { id: 'veille',    label: 'Veille',           icon: <BookOpenText /> },
    { id: 'espace',    label: 'Espace Apprentissage', icon: <Layers /> },
  ];
  return (
    <div className="flex flex-col gap-stack-xs">
      <div className="flex items-center gap-stack-xs text-caption text-ink-600">
        <Button emphasis="soft" size="sm" onClick={() => setCollapsed(p => !p)}>
          {collapsed ? 'Déplier' : 'Replier'}
        </Button>
        <span>La barre passe de 260 à 72 px.</span>
      </div>
      {/* Un écran, pas une carte : coins droits, comme la fenêtre où vit la barre. */}
      <div className="h-[480px] border border-ink-200 flex bg-white relative">
        {/* Glass dropdown — floats to the right of the sidebar */}
        {menuOpen && (
          <DropdownMenu
            variant="glass"
            className="absolute bottom-3 z-dropdown min-w-[240px]"
            style={{ left: collapsed ? 80 : 268 }}
          >
            <DropdownItem icon={<UserIcon size={16} />}>Mon Profil</DropdownItem>
            <DropdownItem icon={<Settings2 size={16} />}>Paramètres</DropdownItem>
            <DropdownItem icon={<Target size={16} />} badge="demo">Positionnement</DropdownItem>
            <DropdownItem icon={<BarChart3 size={16} />} badge="pro">Espace Entreprise</DropdownItem>
            <DropdownSeparator />
            <DropdownItem icon={<LogOut size={16} />} danger>Déconnexion</DropdownItem>
          </DropdownMenu>
        )}
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(p => !p)}
          userCard={
            <SidebarUserCard
              avatar={<Avatar initials="J" size="md" shape="square" tint="brand" />}
              name="Jeanne Dupont"
              subtitle="jeanne@tls.fr"
              menuOpen={menuOpen}
              onClick={() => setMenuOpen(p => !p)}
              collapsed={collapsed}
            />
          }
        >
          {items.map(item => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              count={item.count}
              active={active === item.id}
              collapsed={collapsed}
              onClick={(e) => { e.preventDefault(); setActive(item.id); }}
            />
          ))}
        </Sidebar>
        <div className="flex-1 p-stack-lg bg-gradient-to-br from-ink-50 to-white overflow-hidden">
          <p className="text-body text-ink-700">Active : <strong className="text-ink-900">{items.find(i => i.id === active)?.label}</strong></p>
          <p className="text-caption text-ink-600 mt-1">La carte utilisateur, en bas, ouvre le menu du compte. Sous 768 px, la barre devient un tiroir.</p>
        </div>
      </div>
    </div>
  );
};

const MultiStepFormDemo: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="max-w-[500px]">
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
        <div className="p-stack bg-ink-50 rounded-lg">
          {step === 1 && <p>Étape 1 : informations personnelles</p>}
          {step === 2 && <p>Étape 2 : préférences d'apprentissage</p>}
          {step === 3 && <p>Étape 3 : vérification et confirmation</p>}
        </div>
      </MultiStepForm>
    </div>
  );
};

const AuthShellDemo: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <AuthShell
      brand={{ subtitle: 'Démo complète des sub-components' }}
      form={
        <form className="flex flex-col gap-stack" onSubmit={(e) => e.preventDefault()}>
          <AuthField
            label="Nom complet"
            icon={<UserIcon size={18} />}
            type="text"
            placeholder="Votre nom"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <AuthField
            label="Adresse email"
            icon={<Mail size={18} />}
            type="email"
            placeholder="vous@entreprise.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthPasswordField
            label="Mot de passe"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthCheckbox
            checked={acceptTerms}
            onChange={setAcceptTerms}
            label="J'accepte les conditions d'utilisation"
          />
          <div className="flex flex-col sm:flex-row gap-stack-xs">
            <AuthPrimaryButton type="submit">Créer mon compte</AuthPrimaryButton>
            <AuthGhostButton onClick={() => {}}>Retour</AuthGhostButton>
          </div>
          <AuthDivider>ou continuer avec</AuthDivider>
          <div className="flex flex-col gap-stack-xs">
            <AuthSocialButton icon={<AuthGoogleIcon />}>Google</AuthSocialButton>
            <AuthSocialButton icon={<AuthLinkedinIcon />}>LinkedIn</AuthSocialButton>
          </div>
          <p className="text-center text-body text-white m-0 mt-1">
            Déjà inscrit ?{' '}
            <AuthInlineLink onClick={() => {}}>Se connecter</AuthInlineLink>
          </p>
        </form>
      }
    />
  );
};

/* ============================================================================
 * COMPONENT SHOWCASE ENTRIES — 21 components
 * ============================================================================ */

/* ── Deux briques de présentation, communes aux fiches d'arbitrage ────────── */

/**
 * Un bloc à l'intérieur d'une fiche : un titre, une explication, la démonstration.
 *
 * L'explication est au-dessus de ce qu'elle décrit et non en légende dessous :
 * on lit la raison avant de regarder, sinon on regarde sans savoir quoi voir.
 * Largeur bridée à 65 caractères — la même contrainte que le reste du système.
 */
const ShowcaseBloc: React.FC<{
  titre: string;
  note?: string;
  children: React.ReactNode;
}> = ({ titre, note, children }) => (
  /* La variante `ton="warm"` a été retirée le 2026-09-10 avec les cinq encadrés
     « à trancher » qu'elle habillait. Une vitrine montre ce que le système FAIT ;
     elle ne demande pas ce qu'il devrait faire. Ce qui reste ouvert vit sur la
     page d'arbitrages, qui sait enregistrer une réponse — la vitrine, non. */
  /* Titre de sous-section à 20 (doctrine § 1 : le h3 est aussi le titre d'une
     sous-section), note en texte secondaire long : 16 ink-700 à la largeur de
     lecture, 8 px sous le titre. */
  <section className="flex flex-col gap-stack">
    <div className="flex flex-col gap-stack-xs">
      <h4 className="font-display text-h3 text-ink-900">{titre}</h4>
      {note && <p className="font-body text-body text-ink-700 max-w-prose">{note}</p>}
    </div>
    {children}
  </section>
);

/** Le rapport de contraste mesuré, et s'il franchit le seuil. */
const ContrasteChip: React.FC<{ valeur: string; seuil: number }> = ({ valeur, seuil }) => {
  const ok = parseFloat(valeur.replace(',', '.')) >= seuil;
  return (
    <span
      className={`inline-flex items-center gap-stack-3xs rounded-pill px-2 py-0.5 font-mono text-micro tabular-nums ${
        ok ? 'bg-success-bg text-success-fg' : 'bg-danger-bg text-danger-fg'
      }`}
      title={`Seuil AA : ${seuil}:1`}
    >
      {ok ? '\u2713' : '\u2717'} {valeur}:1
    </span>
  );
};

/**
 * Un remplissage à l'essai — une proposition, pas une variante du système.
 *
 * On ne peut pas surcharger un `variant` avec un `className` : `bg-primary-600`
 * et `bg-primary-500` ont la même spécificité, et c'est l'ordre d'émission de
 * Tailwind qui tranche, pas l'ordre dans l'attribut. Le premier jet de cette
 * fiche montrait donc onze boutons teal-600 à label blanc au lieu des six
 * propositions distinctes — la démonstration disait le contraire de son propos.
 *
 * Le parent porte donc les classes en `[&>button]:…` : le sélecteur descend d'un
 * cran (0,1,1 contre 0,1,0), et gagne quel que soit l'ordre du CSS généré.
 */
const BoutonEssai: React.FC<{
  /** Classes `[&>button]:…`, littérales pour que Tailwind les compile. */
  essai: string;
  contraste: string;
  children: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}> = ({ essai, contraste, children, leadingIcon, trailingIcon }) => (
  <span className="inline-flex items-center gap-stack-xs">
    <span className={`inline-flex ${essai}`}>
      <Button leadingIcon={leadingIcon} trailingIcon={trailingIcon}>{children}</Button>
    </span>
    <ContrasteChip valeur={contraste} seuil={4.5} />
  </span>
);

const COMPONENTS: ComponentEntry[] = [
  /* ══════════════════════════════════════════════════════════════════════════
     LES FICHES D'ARBITRAGE

     Elles ne présentent pas un composant : elles posent une convention qu'aucun
     fichier ne porte à lui seul, mesurée sur la codebase du jour. Chacune montre
     l'état constaté avant la règle proposée — on ne tranche pas sur une intention,
     on tranche sur un écart.
     ═══════════════════════════════════════════════════════════════════════════ */

  {
    name: 'Rythme des titres',
    codeName: 'convention — PageShell · base CSS des titres',
    description:
      "Un titre appartient à ce qui le suit, pas à ce qui le précède. D'où le rapport de 3:1 autour d'un titre de section : 48 px au-dessus, 16 en dessous (doctrine § 5). Le 09/09, l'app appliquait un rapport de 1:1 sur 302 piles verticales.",
    keywords: ['rythme', 'titre', 'heading', 'proximité', 'gap', 'espacement', 'vertical', '48', 'check-rythme', 'pageshell'],
    render: () => (
      <div className="flex flex-col gap-section">
        <ShowcaseBloc
          titre="Ce que faisait l'app le 9 septembre"
          note="La règle du repo veut qu'un composant ne porte jamais son propre margin — c'est le parent qui possède le rythme, via gap (piège n°12). Correct, mais un gap est par construction symétrique : il donne exactement autant d'air au-dessus du titre qu'en dessous. Le titre flottait alors entre deux blocs au lieu d'appartenir au sien. Compté ce jour-là dans src/pages : 228 piles en gap-stack (16 px), 43 en gap-section, 26 en gap-stack-lg, aucune asymétrie."
        >
          <div className="grid gap-stack sm:grid-cols-2">
            <div className="rounded-lg border border-ink-200 p-stack">
              <p className="mb-stack-xs text-caption font-semibold text-ink-600">Constaté le 09/09 — gap-stack uniforme</p>
              <div className="flex flex-col gap-stack rounded-md bg-ink-50 p-stack">
                <p className="font-body text-body text-ink-700">Fin du bloc précédent.</p>
                <p className="font-display text-h2 text-ink-900">Un titre de section</p>
                <p className="font-body text-body text-ink-700">Le texte qui lui appartient.</p>
              </div>
              <p className="mt-stack-xs text-caption text-ink-600 tabular-nums">16 px dessus · 16 px dessous — rapport 1,0</p>
            </div>
            <div className="rounded-lg border border-primary-200 bg-primary-50/30 p-stack">
              <p className="mb-stack-xs text-caption font-semibold text-primary-800">La règle — 48 dessus, 16 dessous</p>
              <div className="rounded-md bg-white p-stack">
                <p className="font-body text-body text-ink-700">Fin du bloc précédent.</p>
                <p className="mt-page mb-stack font-display text-h2 text-ink-900">Un titre de section</p>
                <p className="font-body text-body text-ink-700">Le texte qui lui appartient.</p>
              </div>
              <p className="mt-stack-xs text-caption text-primary-800 tabular-nums">48 px dessus · 16 px dessous — rapport 3,0</p>
            </div>
          </div>
        </ShowcaseBloc>

        <ShowcaseBloc
          titre="Ce qui la porte aujourd'hui"
          note="Trois mécanismes, sans marge sur aucun composant. PageShell pose 48 px entre deux sections par défaut depuis le 24/09 — il en posait 32, soit un rapport de 2:1. Un titre de section est séparé de son contenu par gap-stack, 16 px. Et la base CSS donne 0,75 em au-dessus de tout h2 à h4 qui n'ouvre pas son conteneur (21 px pour un h2 de 28), ce qui creuse l'écart même sous un gap symétrique. `npm run check:rythme` signale tout titre de section sous 1,5:1."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse font-body text-body">
              <thead>
                <tr className="border-b border-ink-200 text-left">
                  <th className="py-2 pr-stack text-caption font-semibold text-ink-600">Relation</th>
                  <th className="py-2 pr-stack text-right text-caption font-semibold text-ink-600">Espace</th>
                  <th className="py-2 text-caption font-semibold text-ink-600">Token</th>
                </tr>
              </thead>
              <tbody className="text-ink-700">
                {([
                  ['Dans une ligne, dans un groupe', '4 – 8', 'gap-stack-3xs · gap-stack-xs'],
                  ['Entre éléments d’un même ensemble', '12 – 16', 'gap-stack-sm · gap-stack'],
                  ['Titre de section → son contenu', '16', 'gap-stack'],
                  ['Entre deux sections', '48', 'gap-page'],
                ] as const).map(([rel, px, tok]) => (
                  <tr key={rel} className="border-b border-ink-100">
                    <td className="py-2 pr-stack">{rel}</td>
                    <td className="py-2 pr-stack text-right tabular-nums">{px}</td>
                    <td className="py-2"><code className="font-mono text-caption">{tok}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ShowcaseBloc>
      </div>
    ),
  },

  {
    name: 'Marges et gouttières',
    codeName: 'convention — --spacing-* et gap-*',
    description:
      "L'échelle sémantique est adoptée à 84 % pour les gouttières : 2 939 gap sémantiques contre 567 numériques. Sur ces 567, 181 sont l'exact doublon d'un token existant — et 222 révèlent un barreau manquant.",
    keywords: ['marge', 'gouttière', 'gap', 'espacement', 'spacing', 'échelle'],
    render: () => (
      <div className="flex flex-col gap-section">
        <ShowcaseBloc
          titre="L'échelle sémantique, à l'échelle"
          note="Chaque barre vaut sa valeur réelle. Un nom se relit — gap-stack dit l'intention ; gap-4 oblige à recompter. ⚠️ `stack-3xs` (4 px) et `stack-sm` (12 px) ont été ajoutés le 2026-09-16 : l'échelle sautait de 2 à 6 et de 8 à 16, et 74 usages numériques comblaient ces trous à la main. `stack-md` (20 px) a suivi le 2026-09-17 (verdict « cran 20 px », option A) : 56 usages numériques — p-stack-md, py-stack-md, gap-stack-md — vivaient entre 16 et 24 sans barreau. Attention au piège : `tight` vaut 2 px, pas 4 — renommer un `gap-1` en `gap-tight` le divise par deux."
        >
          <div className="flex flex-col gap-stack-xs">
            {([
              ['tight', 2], ['stack-3xs', 4], ['stack-2xs', 6], ['stack-xs', 8],
              ['stack-sm', 12], ['stack', 16], ['stack-md', 20], ['stack-lg', 24],
              ['section', 32], ['section-lg', 40], ['page', 48],
            ] as const).map(([nom, px]) => (
              <div key={nom} className="flex items-center gap-stack">
                <code className="w-28 shrink-0 font-mono text-caption text-ink-600">{nom}</code>
                <div className="h-3 rounded-xs bg-primary-500" style={{ width: `${px * 3}px` }} />
                <span className="font-mono text-caption text-ink-600 tabular-nums">{px} px</span>
              </div>
            ))}
          </div>
        </ShowcaseBloc>

        <ShowcaseBloc
          titre="Les doublons, eux, se convertissent sans décision"
          note="181 gouttières numériques rendent exactement la même valeur qu'un token existant. Les remplacer ne change pas un pixel à l'écran ; c'est une conversion mécanique, pas un arbitrage."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse font-body text-body">
              <thead>
                <tr className="border-b border-ink-200 text-left">
                  <th className="py-2 pr-stack text-caption font-semibold text-ink-600">Écrit</th>
                  <th className="py-2 pr-stack text-caption font-semibold text-ink-600">Équivaut à</th>
                  <th className="py-2 text-right text-caption font-semibold text-ink-600">Usages</th>
                </tr>
              </thead>
              <tbody className="text-ink-700">
                {([['gap-0.5', 'gap-tight', 53], ['gap-stack-xs', 'gap-stack-xs', 94], ['gap-stack', 'gap-stack', 17], ['gap-stack-lg', 'gap-stack-lg', 15], ['gap-8', 'gap-section', 2]] as const).map(([a, b, n]) => (
                  <tr key={a} className="border-b border-ink-100">
                    <td className="py-2 pr-stack"><code className="font-mono text-caption">{a}</code></td>
                    <td className="py-2 pr-stack"><code className="font-mono text-caption text-primary-700">{b}</code></td>
                    <td className="py-2 text-right font-mono tabular-nums">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ShowcaseBloc>
      </div>
    ),
  },

  {
    name: 'Padding',
    codeName: 'convention — p-* et les surfaces',
    description:
      "L'inverse exact des gouttières : 778 paddings sémantiques contre 2 450 numériques, soit 24 % d'adoption. Le padding intérieur d'une carte, lui, est tranché (arbitrage n°4 du 23/09, padding de carte) : 24 px au canon, 20 en unique dérogation dense — jamais sous le rayon de 20.",
    keywords: ['padding', 'espacement', 'carte', 'surface', 'gouttière de page'],
    render: () => (
      <div className="flex flex-col gap-section">
        <ShowcaseBloc
          titre="La gouttière de page tient, elle"
          note="C'est le point solide du dossier : px-4 sm:px-6 lg:px-10 est écrit 67 fois, et un seul écran s'en écarte. Cette valeur-là n'a pas besoin d'être tranchée, seulement protégée."
        >
          <div className="rounded-lg border border-ink-200 bg-ink-50 py-stack">
            <div className="bg-white px-4 py-stack sm:px-6 lg:px-10">
              <p className="m-0 font-body text-body text-ink-700">
                La zone blanche est le contenu ; le liseré gris, la gouttière. Elle passe de 16 px sur mobile
                à 24 px sur tablette et 40 px sur grand écran — redimensionnez pour la voir bouger.
              </p>
            </div>
          </div>
        </ShowcaseBloc>
      </div>
    ),
  },

  {
    name: 'Centrage',
    codeName: 'vérifié au navigateur le 2026-09-09, remesuré le 2026-09-24',
    description:
      "Mesuré plutôt que supposé : le centrage géométrique est juste partout où on l'a sondé. Le label d'un bouton md (16 px, 700) dérive de 0,70 px de son centre optique, et les glyphes en pastille sont à 0,00 px. Ce n'est donc pas là que se joue l'impression de flottement.",
    keywords: ['centrage', 'alignement', 'optique', 'baseline', 'capitale'],
    render: () => (
      <div className="flex flex-col gap-section">
        <ShowcaseBloc
          titre="Ce qui a été mesuré"
          note="Un centrage vertical par items-center centre la boîte de ligne, pas la hauteur de capitale — et les deux ne coïncident que si les métriques de la fonte s'y prêtent. Celles de Nunito s'y prêtent : sur un bouton md de 44 px, avec son label à 16 px depuis le 24/09, la ligne de base tombe à 27 px du haut, la capitale mesure 11,41 px, donc son milieu est à 21,30 px pour un centre géométrique à 22. L'écart de 0,70 px est invisible. Rien à corriger, et c'est utile de le savoir : la prochaine fois qu'un bloc paraîtra mal centré, il faudra chercher ailleurs."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-collapse font-body text-body">
              <tbody className="text-ink-700">
                {([
                  ['Bouton md, hauteur', '44,00 px'],
                  ['Label', '16 px · 700'],
                  ['Ligne de base, depuis le haut', '27,00 px'],
                  ['Hauteur de capitale', '11,41 px'],
                  ['Centre géométrique', '22,00 px'],
                  ['Milieu de la capitale', '21,30 px'],
                  ['Dérive optique', '0,70 px — sous le seuil du visible'],
                  ['Glyphe dans une pastille de 40 px (09/09)', '0,00 px sur les deux axes'],
                ] as const).map(([k, v]) => (
                  <tr key={k} className="border-b border-ink-100">
                    <td className="py-2 pr-stack">{k}</td>
                    <td className="py-2 text-right font-mono text-caption tabular-nums text-ink-900">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ShowcaseBloc>

        <ShowcaseBloc
          titre="Le vrai risque est ailleurs : le centrage horizontal d'un contenu asymétrique"
          note="Un bouton dont le contenu est symétrique se centre tout seul. Dès qu'une icône n'est que d'un côté, le bloc reste géométriquement centré mais l'œil, lui, voit le mot décalé — parce qu'une icône occupe moins de matière visuelle qu'une même largeur de texte. La compensation se joue sur le padding du côté de l'icône."
        >
          <div className="flex flex-wrap items-center gap-stack">
            <div className="flex flex-col items-start gap-stack-xs">
              <Button>Texte seul</Button>
              <span className="font-mono text-caption text-ink-600">20 / 20 — symétrique</span>
            </div>
            <div className="flex flex-col items-start gap-stack-xs">
              <Button leadingIcon={I.plus}>Icône à gauche</Button>
              <span className="font-mono text-caption text-ink-600">20 / 20 — l’icône pèse moins</span>
            </div>
            <div className="flex flex-col items-start gap-stack-xs">
              <span className="inline-flex [&>button]:pl-4">
                <Button leadingIcon={I.plus}>Icône à gauche</Button>
              </span>
              <span className="font-mono text-caption text-secondary-700">16 / 20 — compensé</span>
            </div>
          </div>
        </ShowcaseBloc>
      </div>
    ),
  },

{
    name: 'Les rayons, et ce qui va ensemble',
    codeName: 'R3 (la règle du seuil) · R4 (les champs à 14) — tranchées le 14/09/2026',
    description:
      "La règle est celle du seuil (R3). Sous 28 px de haut, pilule et rayon 14 sont indiscernables — le navigateur plafonne le rayon à la moitié de la hauteur : la pilule y reste, elle ne coûte rien. Au-dessus, le rayon devient une déclaration et prend l'échelle étagée : 14 pour ce qui se presse ou se remplit (Button, FilterChip md, SegmentedControl et la famille champ, R4), 20 pour les cartes, 24 pour les surcouches. Le bouton-icône garde son cercle.",
    keywords: ['rayon', 'radius', 'pilule', 'bouton', 'badge', 'carte', 'champ', 'input', 'cohérence'],
    render: () => {
      /* Une carte au canon : 20 px (étage conteneur), padding 24. */
      const coque = 'flex flex-col rounded-xl border border-ink-200 bg-white p-stack-lg min-w-0';
      const metas = [{ icon: <Clock3 />, text: '45 min' }, { icon: <Calendar />, text: 'Jeudi 18' }];
      return (
        <div className="flex flex-col gap-section">

          <ShowcaseBloc
            titre="La règle, en une phrase"
            note="Tranchée le 2026-09-14 après mesure au navigateur sur quatre pages de l'app. Sur les ~613 `rounded-pill` du repo, la moitié est sous le seuil (aucun effet à l'écran), 103 sont des cercles assumés, et les rangées de nav n'ont ni fond ni filet au repos — leur rayon ne se voit qu'au survol. Il ne restait, à l'écran, que le bouton plein. 13 instances faites main ont été migrées côté app, 5 côté site."
          >
            <div className="flex flex-col gap-stack">
              <p className="m-0 font-body text-body text-ink-900">
                Sous 28&nbsp;px, la <strong>pilule</strong>. Au-dessus, <strong>l'échelle</strong>.
              </p>
              <div className="grid gap-stack [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
                {([
                  ['Badge · MetaPill · Chip sm · FilterChip sm', 'pilule', "Étage étiquette. Sous le seuil ou à lui : Badge 20, MetaPill et Chip sm 24, Badge large 26, FilterChip sm 28. La pilule y rend la même forme que 14 — la garder ne coûte rien, et c'est la convention du petit label."],
                  ['Button · FilterChip md · SegmentedControl', 'rounded-lg (14)', "Étage interactif. Le bouton a trois tailles, 36 · 44 · 52 (arbitrage n°22 : une hauteur commune aux contrôles d'une même ligne), toutes au-dessus du seuil ; le FilterChip md fait 44, le rail du SegmentedControl 36 ou 44. Le bouton NE suit PAS la carte, passée à 20 le 16/09 : plus l'élément est grand, plus son rayon l'est, et des rayons imbriqués doivent être apparentés, pas identiques."],
                  ['Famille champ', 'rounded-lg (14)', "Étage interactif. R4, même jour : Input · Select · Combobox · Search. 36 à 52 px de haut, donc toujours au-dessus du seuil. Le composant disait 10 sans l'avoir justifié."],
                  ['Card · StatCard · rangées de liste', 'rounded-xl (20) · 14 pour les rangées', "Étage conteneur, le plus grand — décidé le 16/09. R1 l'avait posée à 14 le 09/09 ; à l'usage 14 se lisait comme un rectangle, et Figma était resté à 20 (nœud Card 1111:46, lié à radius-xl). Une rangée de liste reste à l'étage interactif, donc 14."],
                  ['Modal · tiroirs · feuilles', 'rounded-2xl (24)', "Étage surcouche (arbitrage n°2 du 23/09, le rayon des surcouches) : plus l'objet est haut dans l'empilement, plus il est rond. Son padding de 24 égale le rayon, donc ses boutons restent des formes fixes."],
                  ['Button iconOnly', 'pilule → cercle', "Exception écrite. Carré, donc la pilule y donne un cercle parfait — ne pas « uniformiser »."],
                ] as const).map(([fam, val, pourquoi]) => (
                  <div key={fam} className="flex flex-col gap-stack-2xs rounded-lg border border-ink-200 bg-white p-stack">
                    <span className="font-body text-body font-semibold text-ink-900">{fam}</span>
                    <span className="font-mono text-caption text-primary-800">{val}</span>
                    <span className="font-body text-body text-ink-700">{pourquoi}</span>
                  </div>
                ))}
              </div>
              <p className="m-0 font-body text-body text-ink-700">
                L'argument écarté en connaissance de cause : le rayon d'une pilule vaut la moitié de sa
                hauteur, donc sa silhouette ne dépend pas de la longueur du label. C'est vrai — mais ce
                que ça achète, une constance que personne ne perçoit, coûte l'accord entre le CTA et la
                carte qui le porte.
              </p>
            </div>
          </ShowcaseBloc>

          <ShowcaseBloc
            titre="Sous 28 px, la question ne se pose pas"
            note="Le navigateur plafonne tout rayon à la moitié de la plus petite dimension. Sur une pastille de 24 px, ce plafond est à 12 : la pilule (999) et rounded-lg (14) y sont donc écrasés à la même valeur et rendent EXACTEMENT la même forme. Donner « le rayon du design system » à un Badge ne changerait rien à l'écran. Mais l'équivalence s'arrête là où le rayon demandé passe SOUS le plafond : rounded-md (10) est en dessous de 12, et lui se voit — c'est la troisième pastille ci-dessous."
          >
            <div className="flex flex-wrap items-center gap-stack">
              {([
                ['rounded-pill', 'pilule'],
                ['rounded-lg', 'rayon 14'],
                ['rounded-md', 'rayon 10'],
              ] as const).map(([cls, nom]) => (
                <div key={cls} className="flex flex-col items-start gap-stack-2xs">
                  <span className={`inline-flex items-center ${cls} border border-secondary-200 bg-secondary-50 px-2.5 py-0.5 font-body text-micro font-bold uppercase tracking-label text-secondary-700`}>
                    À venir
                  </span>
                  <span className="font-mono text-caption text-ink-600">{nom}</span>
                </div>
              ))}
              <span className="font-mono text-caption text-ink-600 self-center">24 px de haut · plafond à 12 : les deux premières sont identiques, la troisième passe dessous</span>
            </div>
          </ShowcaseBloc>

          <ShowcaseBloc
            titre="À 44 px, l’écart se voit — et c’est un choix"
            note="Un bouton md mesure 44 px : en pilule il rendait 22 px de rayon, contre 14 pour la carte qui le contient. C’était le seul endroit où la question mordait vraiment. Material 3 est allé vers la pilule totale ; Linear, Vercel et Stripe tiennent des rayons modérés — aucune des deux n’est la norme, donc c’est un choix, et R3 l’a fait au milieu."
          >
            <div className="flex flex-wrap items-end gap-stack-lg">
              {([
                ['[&>button]:rounded-pill', 'pilule — 22 px rendus (avant R3)'],
                ['', 'rayon 14 — le défaut depuis R3'],
                ['[&>button]:rounded-md', 'rayon 10'],
              ] as const).map(([surcharge, nom]) => (
                <div key={nom} className="flex flex-col items-start gap-stack-2xs">
                  <span className={`inline-flex ${surcharge}`}>
                    <Button leadingIcon={<Plus />}>Rejoindre</Button>
                  </span>
                  <span className="font-mono text-caption text-ink-600">{nom}</span>
                </div>
              ))}
            </div>
          </ShowcaseBloc>

          <ShowcaseBloc
            titre="Le même bouton, dans sa carte"
            note="C’est là que ça s’est jugé : l’accord entre le coin de la carte et celui du bouton, à taille réelle. Le badge et les métas ne changent pas d’une carte à l’autre — ils sont sous le seuil, et c’est exactement pourquoi ils gardent la pilule."
          >
            <div className="grid gap-stack-lg [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
              {([
                ['[&_button]:rounded-pill', 'CTA en pilule (avant R3)'],
                ['', 'CTA à 14 dans une carte à 20 — retenu'],
                ['[&_button]:rounded-md', 'CTA à 10 px'],
              ] as const).map(([surcharge, nom]) => (
                <div key={nom} className="flex flex-col gap-stack-xs">
                  <div className={`${coque} ${surcharge}`}>
                    <div className="flex items-center justify-between gap-stack-xs">
                      <MetaPillGroup items={metas} />
                      <Badge variant="warm" className="shrink-0">À venir</Badge>
                    </div>
                    <div className="mt-stack-3xs flex items-center justify-between gap-stack">
                      <div className="min-w-0">
                        <h4 className="font-display text-h3 text-ink-900">Session de coaching</h4>
                        <p className="mt-stack-xs font-body text-body text-ink-700">
                          Préparer le lancement du parcours Neuro-éducation.
                        </p>
                      </div>
                      <Button size="sm" className="shrink-0">Rejoindre</Button>
                    </div>
                  </div>
                  <span className="font-mono text-caption text-ink-600">{nom}</span>
                </div>
              ))}
            </div>
          </ShowcaseBloc>

          <ShowcaseBloc
            titre="R4 — le champ et son bouton font la même hauteur"
            note="Mesuré sur /website/contact le 2026-09-14 : les quatre champs rendaient 10 px de rayon, le bouton « Envoyer le message » 14 — et tous les cinq mesurent exactement 48 px de haut. C'est ce relevé qui a tranché. Aucune des trois raisons possibles ne tenait : deux zones de texte quasi identiques rendaient 156 px à 10 (contact) contre 158 px à 14 (pré-questionnaire) ; le marketing portait les deux valeurs ; et sur la seule page /components/search-filters, « une barre de recherche » rendait 10, 14, 20 et 24 px côte à côte. Elle rend 14 partout aujourd'hui."
          >
            <div className="grid gap-section [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
              {([
                ['Avant — deux courbes', 'rounded-md', 'Le champ serre le coin, le bouton l’ouvre. Rien ne justifiait l’écart.'],
                ['Après — une seule', 'rounded-lg', 'Le formulaire se lit comme un objet, pas comme deux familles empilées.'],
              ] as const).map(([titre, rayon, dit]) => (
                <div key={titre} className="flex flex-col gap-stack-xs">
                  <span className="font-body text-body font-semibold text-ink-900">{titre}</span>
                  {/* Champ fait main exprès : il montre l'avant et l'après d'un
                      rayon. Hauteur et filet sont ceux de la famille champ
                      d'aujourd'hui — 52 px au cran lg, filet ink-400. */}
                  <input
                    readOnly
                    value="Jeanne Dupont"
                    aria-label={`Champ de démonstration — ${rayon}`}
                    className={`w-full h-13 px-4 ${rayon} border border-ink-400 bg-white font-body text-body text-ink-900`}
                  />
                  <Button emphasis="soft" size="lg" fullWidth>Envoyer le message</Button>
                  <span className="font-mono text-caption text-ink-600">champ 52 px · bouton 52 px · {rayon === 'rounded-md' ? '10 contre 14' : '14 et 14'}</span>
                  <span className="font-body text-body text-ink-700">{dit}</span>
                </div>
              ))}
            </div>
          </ShowcaseBloc>

          <ShowcaseBloc
            titre="Le seuil, en chiffres"
            note="Mesuré au navigateur. Au-dessus de 28 px seulement, la classe choisie change quelque chose."
          >
            <div className="defiler">
              <table className="w-full min-w-[400px] border-collapse font-body text-body">
                <thead>
                  <tr className="border-b border-ink-200 text-left">
                    <th className="py-2 pr-stack text-caption font-semibold text-ink-600">hauteur</th>
                    <th className="py-2 pr-stack text-right text-caption font-semibold text-ink-600">rayon 14 rendu</th>
                    <th className="py-2 pr-stack text-right text-caption font-semibold text-ink-600">pilule rendue</th>
                    <th className="py-2 text-caption font-semibold text-ink-600">ce qu’on voit</th>
                  </tr>
                </thead>
                <tbody className="text-ink-700">
                  {([
                    ['20 px · Badge compact et normal', '10', '10', 'rien'],
                    ['24 px · MetaPill · Chip sm', '12', '12', 'rien'],
                    ['26 px · Badge large', '13', '13', 'rien'],
                    ['28 px · le seuil · FilterChip sm', '14', '14', 'rien'],
                    ['30 px · Chip md · MetaPill md', '14', '15', '1 px'],
                    ['36 px · Button sm · champ sm', '14', '18', '4 px'],
                    ['44 px · Button md · FilterChip md', '14', '22', '8 px'],
                    ['52 px · Button lg · champ lg', '14', '26', '12 px'],
                  ] as const).map(([h, a, b, v]) => (
                    <tr key={h} className={`border-b border-ink-100 ${v === 'rien' ? '' : 'text-ink-900'}`}>
                      <td className="py-2 pr-stack">{h}</td>
                      <td className="py-2 pr-stack text-right font-mono tabular-nums">{a}</td>
                      <td className="py-2 pr-stack text-right font-mono tabular-nums">{b}</td>
                      <td className="py-2">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ShowcaseBloc>
        </div>
      );
    },
  },

  {
    name: 'Disposition des cartes',
    codeName: 'décision ouverte — où poser l’état, la donnée et l’action',
    description:
      "Les dispositions candidates, montées avec les VRAIS composants : Badge pour l'état, MetaPillGroup pour les données, Button pour l'action. Même contenu et mêmes espaces partout — ceux de l'anatomie de carte du 24/09 ; seule la place change.",
    keywords: ['carte', 'disposition', 'statut', 'méta', 'cta', 'anatomie', 'layout'],
    render: () => {
      const metas = [
        { icon: <Calendar />, text: 'Jeudi 18 sept.' },
        { icon: <Clock3 />, text: '14 h' },
      ];
      const titre = 'Session de coaching';
      const texte = 'Préparer le lancement du parcours Neuro-éducation avec Pierre-Armand.';
      /* Une carte de démonstration au canon : rayon 20 (étage conteneur, depuis
         le 16/09 — elle était à 14), padding 24, bordure ink-200, aucune ombre. */
      const coque = 'flex flex-col rounded-xl border border-ink-200 bg-white p-stack-lg min-w-0';

      return (
        <div className="flex flex-col gap-section">
          <ShowcaseBloc
            titre="Cinq dispositions, mêmes composants"
            note="Les espaces sont ceux de l'anatomie de carte (doctrine § 5, 24/09) : ligne du haut → titre 4 px, titre → texte 8, texte → données 12, contenu → action 24. Le texte est à 16 px ink-700, le titre en h3 20. Ce qui change d'une carte à l'autre, c'est uniquement OÙ se posent l'état, les données et l'action."
          >
            <div className="grid gap-stack-lg [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">

              {/* A — empilé */}
              <div className="flex flex-col gap-stack-xs">
                <div className={coque}>
                  <Badge variant="warm" className="self-start">À venir</Badge>
                  <h4 className="mt-stack-3xs font-display text-h3 text-ink-900">{titre}</h4>
                  <p className="mt-stack-xs font-body text-body text-ink-700">{texte}</p>
                  <MetaPillGroup items={metas} className="mt-stack-sm" />
                  <Button size="sm" className="mt-stack-lg self-start">Rejoindre</Button>
                </div>
                <span className="text-caption font-mono text-ink-600"><b>A</b> · empilé, le statut ouvre</span>
              </div>

              {/* B — barre de tête */}
              <div className="flex flex-col gap-stack-xs">
                <div className={coque}>
                  {/* items-center, pas items-start : un badge fait 19,75 px et une
                      pastille 30 — alignés par le haut, leurs centres décrochent
                      de 5,12 px et la tête de carte paraît bancale. */}
                  <div className="flex items-center justify-between gap-stack-xs">
                    <MetaPillGroup items={metas} />
                    <Badge variant="warm" className="shrink-0">À venir</Badge>
                  </div>
                  <h4 className="mt-stack-3xs font-display text-h3 text-ink-900">{titre}</h4>
                  <p className="mt-stack-xs font-body text-body text-ink-700">{texte}</p>
                  <Button size="sm" className="mt-stack-lg self-start">Rejoindre</Button>
                </div>
                <span className="text-caption font-mono text-ink-600"><b>B</b> · métas à gauche, statut à droite</span>
              </div>

              {/* C — statut en coin */}
              <div className="flex flex-col gap-stack-xs">
                <div className={coque}>
                  <div className="flex items-start justify-between gap-stack-xs">
                    <h4 className="font-display text-h3 text-ink-900">{titre}</h4>
                    <Badge variant="warm" className="shrink-0 mt-0.5">À venir</Badge>
                  </div>
                  <p className="mt-stack-xs font-body text-body text-ink-700">{texte}</p>
                  <MetaPillGroup items={metas} className="mt-stack-sm" />
                  <Button size="sm" className="mt-stack-lg self-start">Rejoindre</Button>
                </div>
                <span className="text-caption font-mono text-ink-600"><b>C</b> · le statut annote le titre</span>
              </div>

              {/* D — pied de carte */}
              <div className="flex flex-col gap-stack-xs">
                <div className={coque}>
                  <div className="flex items-start justify-between gap-stack-xs">
                    <h4 className="font-display text-h3 text-ink-900">{titre}</h4>
                    <Badge variant="warm" className="shrink-0 mt-0.5">À venir</Badge>
                  </div>
                  <p className="mt-stack-xs font-body text-body text-ink-700">{texte}</p>
                  <div className="mt-stack-lg pt-stack border-t border-ink-200 flex items-center justify-between gap-stack-xs">
                    <MetaPillGroup items={metas} />
                    <Button size="sm" className="shrink-0">Rejoindre</Button>
                  </div>
                </div>
                <span className="text-caption font-mono text-ink-600"><b>D</b> · métas et CTA sur une ligne, sous un filet</span>
              </div>

              {/* F — le CTA sur la MÊME LIGNE que le bloc de texte */}
              <div className="flex flex-col gap-stack-xs">
                <div className={`${coque} ring-2 ring-secondary-200`}>
                  {/* Tête : métas à gauche, statut à droite */}
                  <div className="flex items-center justify-between gap-stack-xs">
                    <MetaPillGroup items={metas} />
                    <Badge variant="warm" className="shrink-0">À venir</Badge>
                  </div>
                  {/* Corps : le texte à gauche, l'action à droite, centrée sur lui */}
                  <div className="mt-stack-3xs flex items-center justify-between gap-stack">
                    <div className="min-w-0">
                      <h4 className="font-display text-h3 text-ink-900">{titre}</h4>
                      <p className="mt-stack-xs font-body text-body text-ink-700">{texte}</p>
                    </div>
                    <Button size="sm" className="shrink-0">Rejoindre</Button>
                  </div>
                </div>
                <span className="text-caption font-mono text-secondary-800"><b>F</b> · métas à gauche, statut à droite, CTA centré sur le bloc de texte</span>
              </div>

              {/* E — celle décrite le 10/09 */}
              <div className="flex flex-col gap-stack-xs">
                <div className={`${coque} ring-2 ring-primary-200`}>
                  <div className="flex items-center justify-between gap-stack-xs">
                    <Badge variant="warm">À venir</Badge>
                    <MetaPillGroup items={metas} className="justify-end" />
                  </div>
                  <h4 className="mt-stack-3xs font-display text-h3 text-ink-900">{titre}</h4>
                  <p className="mt-stack-xs font-body text-body text-ink-700">{texte}</p>
                  <div className="mt-stack-lg flex justify-end">
                    <Button size="sm">Rejoindre</Button>
                  </div>
                </div>
                <span className="text-caption font-mono text-primary-800"><b>E</b> · statut à gauche, métas à droite, titre en h3, CTA aligné au texte</span>
              </div>
            </div>
          </ShowcaseBloc>

          <ShowcaseBloc
            titre="Ce que ces cartes prouvent, et qu'aucune maquette ne prouve"
            note="Elles emploient les composants du produit, pas leur imitation. Donc si le badge change de graisse, si le bouton change de filet, si la MetaPill change de hauteur, ces cinq cartes changent avec eux. Une maquette en HTML recopié, elle, continuerait d'afficher l'ancien état — c'est exactement ce qui s'est passé pour l'échelle typographique de cette page, qui lisait encore --t-h3 ce matin."
          >
            <div className="flex flex-wrap items-center gap-stack">
              <Badge variant="warm">état</Badge>
              <MetaPillGroup items={[{ icon: <Clock3 />, text: 'donnée' }]} />
              <Button size="sm">action</Button>
              <span className="font-mono text-caption text-ink-600">les trois primitives, telles que le produit les rend</span>
            </div>
          </ShowcaseBloc>
        </div>
      );
    },
  },

  {
    name: 'La famille des pastilles',
    codeName: 'ui/Badge.tsx · ui/Chip.tsx',
    description:
      "Deux registres, et il faut les distinguer d'un coup d'œil : Badge dit un ÉTAT, MetaPill dit une DONNÉE. La famille est passée de neuf enveloppes à six le 10/09 : Badge, FilterChip, MetaPill et MetaPillGroup, StatusBadge, et Chip, la primitive interne.",
    keywords: ['badge', 'pastille', 'chip', 'pill', 'meta', 'statut', 'tag', 'filtre'],
    render: () => (
      <div className="flex flex-col gap-section">

        <ShowcaseBloc
          titre="Deux registres, deux traitements"
          note="La différence n'est pas décorative : elle dit au lecteur ce qu'il regarde avant qu'il ait lu. Un état crie — 11 px en capitales, graisse 700, serrage positif, bordure. Une donnée chuchote — 11 px en casse normale, graisse 500. À hauteur voisine (Badge 20 px, MetaPill 24), c'est le registre qui les sépare, pas la taille. Confondre les deux, c'est ce qui rend une carte illisible : on ne sait plus ce qui est un fait et ce qui est un statut."
        >
          <div className="flex flex-wrap items-start gap-section">
            <div className="flex flex-col items-start gap-stack-xs">
              <div className="hstack">
                <Badge variant="warm">À venir</Badge>
                <Badge variant="success">Terminé</Badge>
                <Badge variant="danger">En retard</Badge>
              </div>
              <span className="text-caption text-ink-600 font-mono">Badge — l’état · 11 px · 700 · capitales</span>
            </div>
            <div className="flex flex-col items-start gap-stack-xs">
              <MetaPillGroup
                items={[
                  { icon: <Clock3 />, text: '45 min' },
                  { icon: <Calendar />, text: 'Jeudi 18 sept.' },
                  { text: 'Intermédiaire' },
                ]}
              />
              <span className="text-caption text-ink-600 font-mono">MetaPill — la donnée · 11 px · 500</span>
            </div>
          </div>
        </ShowcaseBloc>

        <ShowcaseBloc
          titre="Les tailles de Badge ne s’appellent plus sm / md / lg"
          note="Chip — donc MetaPill, Tag, FilterChip — portait les MÊMES noms pour des hauteurs différentes : un Badge « md » mesurait 20 px quand un Chip « md » en fait 30. On comparait deux échelles qui ne parlent pas de la même chose, et l’écart se lisait comme un défaut d’alignement alors qu’il est voulu. Des noms propres à la famille lèvent la confusion sans toucher aux hauteurs."
        >
          <div className="flex flex-wrap items-end gap-stack">
            {([
              ['compact', '20 px · padding 8'],
              ['normal', '20 px · padding 10 · le défaut'],
              ['large', '26 px · 13 px'],
            ] as const).map(([t, mesure]) => (
              <div key={t} className="flex flex-col items-start gap-stack-2xs">
                <Badge variant="brand" size={t}>Nouveau</Badge>
                <span className="text-caption text-ink-600 font-mono">{t} · {mesure}</span>
              </div>
            ))}
          </div>
        </ShowcaseBloc>

        <ShowcaseBloc
          titre="Ce que la famille compte vraiment"
          note="Relevé le 24/09 : appels JSX dans src/, hors vitrine et labo. Le CLAUDE.md disait « ne pas fusionner, APIs fondamentalement différentes » — écrit en supposant que les neuf enveloppes servaient. Tag, Pill et TrendingBadge n’avaient aucun usage produit : ils ont été supprimés le 10/09. Les « Tag » qu’on croyait leurs étaient l’icône Lucide du même nom."
        >
          <div className="defiler">
            <table className="w-full min-w-[420px] border-collapse font-body text-body">
              <thead>
                <tr className="border-b border-ink-200 text-left">
                  <th className="py-2 pr-stack text-caption font-semibold text-ink-600">composant</th>
                  <th className="py-2 pr-stack text-right text-caption font-semibold text-ink-600">appels</th>
                  <th className="py-2 text-caption font-semibold text-ink-600">rôle</th>
                </tr>
              </thead>
              <tbody className="text-ink-700">
                {([
                  ['Badge', 244, 'l’état'],
                  ['MetaPill', 68, 'la donnée'],
                  ['FilterChip', 66, 'le filtre — un contrôle de 44 px en md'],
                  ['MetaPillGroup', 14, 'les données d’une carte (défaut sm)'],
                  ['Chip', 4, 'primitive interne : les enveloppes prennent ses tokens, ses seuls appels directs sont dans le DevPanel'],
                  ['StatusBadge', 1, 'les cinq états d’une leçon, avec leur icône — du vocabulaire de domaine'],
                  ['Tag · Pill · TrendingBadge', 0, 'supprimés le 10/09'],
                ] as const).map(([n, u, v]) => (
                  <tr key={n} className="border-b border-ink-100">
                    <td className="py-2 pr-stack"><code className="font-mono text-caption">{n}</code></td>
                    <td className="py-2 pr-stack text-right font-mono tabular-nums">{u}</td>
                    <td className="py-2">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ShowcaseBloc>

        <ShowcaseBloc
          titre="Ce qui a été rattaché aux tokens le 2026-09-10"
          note="Le serrage de Badge était écrit en valeur arbitraire, à trois valeurs dont deux sur le même corps de 11 px. L’échelle n’avait aucun serrage positif : ses trois tokens resserrent des titres. --tracking-label (+0,05em) comble ce manque. Quatre gap-stack-2xs passent à gap-stack-2xs. Vérifié au navigateur : rayon 999 px sur les 69 pastilles rendues, et aucune dérive d’alignement au-delà de 1,2 px sur 36 pastilles à texte."
        >
          <div className="flex flex-col gap-stack-2xs">
            {([
              ['serrage', 'tracking-[0.06em] · [0.05em] · [0.04em]', 'tracking-label'],
              ['gouttière', 'gap-stack-2xs', 'gap-stack-2xs'],
              ['rayon', '—', 'rounded-pill · 999 px partout'],
            ] as const).map(([quoi, avant, apres]) => (
              <div key={quoi} className="flex flex-wrap items-baseline gap-stack-xs text-caption">
                <span className="w-24 shrink-0 font-bold text-ink-700">{quoi}</span>
                <code className="font-mono text-caption text-ink-600 line-through">{avant}</code>
                <span className="text-ink-600">→</span>
                <code className="font-mono text-caption text-primary-700">{apres}</code>
              </div>
            ))}
          </div>
        </ShowcaseBloc>
      </div>
    ),
  },

  {
    name: "Échelle d'icônes",
    codeName: '--icon-size-* · index.css',
    description:
      "Tranché le 2026-09-09 : tout est ramené sur l'échelle, étendue aux deux bouts — neuf crans de 14 à 48 px. Elle en comptait cinq quand le code posait vingt-sept tailles ; 851 des 1 904 tailles écrites à la main tombaient hors échelle. Il en restait 12 au recomptage du 17/09 (check-handmade).",
    keywords: ['icône', 'icon', 'taille', 'lucide', 'échelle', 'alignement'],
    render: () => (
      <div className="flex flex-col gap-section">
        <ShowcaseBloc
          titre="L'échelle, et le mot qu'elle accompagne"
          note="Une taille d'icône ne se juge pas seule : elle se juge au rapport avec le texte à côté. Chaque cran vaut environ 1,25 fois la police qu'il accompagne — c'est ce rapport qui fait qu'une icône pèse autant que son mot sans l'écraser."
        >
          <div className="flex flex-col gap-stack">
            {([
              ['xs', 'text-caption font-body', '16 px · légende 13 · bouton sm'],
              ['sm', 'text-body font-body', '18 px · corps 16 · bouton md'],
              ['md', 'text-body font-body', '20 px · corps 16 · bouton lg'],
              ['lg', 'text-body-lg font-body', '24 px · chapô 18'],
              ['xl', 'text-h3 font-display', '28 px · titre h3 20'],
            ] as const).map(([cran, texte, meta]) => (
              <div key={cran} className="flex items-center gap-stack">
                <code className="w-20 shrink-0 font-mono text-caption text-ink-600">icon-{cran}</code>
                <span className={`icon-${cran} inline-flex shrink-0 items-center justify-center text-primary-700 [&>svg]:w-full [&>svg]:h-full`}>
                  <CirclePlus strokeWidth={2} aria-hidden />
                </span>
                <span className={`${texte} text-ink-800`}>Étiquette</span>
                <span className="ml-auto font-mono text-caption text-ink-600 tabular-nums">{meta}</span>
              </div>
            ))}
          </div>
        </ShowcaseBloc>
      </div>
    ),
  },

  /* ---- CORE ------------------------------------------------------------- */
  {
    name: 'Button',
    codeName: 'core/Button.tsx',
    cssBase: '.btn',
    description:
      "Le déclencheur d'une action. Son API est une grille : `emphasis` (solid · soft · outline · ghost · link) dit combien il insiste, `tone` (brand · warm · sun · danger · neutral) de quelle couleur. Trois tailles, 36 · 44 · 52, celles des champs d'une même ligne (arbitrage n°22) ; rayon 14, graisse 700. Un seul `solid` par écran, pour l'action principale (arbitrage n°19). Les treize `variant` historiques et l'ancien cran `xl` restent acceptés, comme alias dépréciés.",
    keywords: ['cta', 'action', 'emphasis', 'tone', 'solid', 'soft', 'outline', 'ghost', 'link', 'onDark', 'iconOnly', 'primary', 'destructive', 'glass', 'taille', '36', '44', '52', 'contraste', 'wcag', 'icône'],
    render: () => (
      <div className="flex flex-col gap-section">

        {/* ─── 1 · LES TROIS TAILLES ──────────────────────────────────────── */}
        <ShowcaseBloc
          titre="Les trois tailles"
          note="Le défaut est md, à 44 px : la cible tactile recommandée par Apple et Material. Les trois crans sont ceux des champs (Input, Select, Search) : un bouton et un champ posés sur la même ligne ont la même hauteur (arbitrage n°22 du 24/09). sm, à 36 px, sert les rangées denses ; un pseudo-élément déborde de 4 px en haut et en bas et porte sa zone tactile à 44 sans toucher au rendu. Son label reste à 13 : essayé à 16 dans trois rangées réelles, l'action pesait plus que le nom qu'elle sert. `xl` n'existe plus — il rend `lg`."
        >
          <div className="flex flex-wrap items-end gap-stack">
            {([
              ['sm', 'Petit', '36 px · label 13 · icône 16 · cible 44'],
              ['md', 'Moyen', '44 px · label 16 · icône 18 · le défaut'],
              ['lg', 'Grand', '52 px · label 16 · icône 20'],
            ] as const).map(([size, label, meta]) => (
              <div key={size} className="flex flex-col items-start gap-stack-xs">
                <Button size={size} leadingIcon={I.plus}>{label}</Button>
                <span className="text-caption text-ink-600 font-body tabular-nums">{meta}</span>
              </div>
            ))}
          </div>
        </ShowcaseBloc>

        {/* ─── 2 · LA GRILLE : NIVEAU × TON ───────────────────────────────── */}
        <ShowcaseBloc
          titre="La grille — cinq niveaux, cinq tons"
          note="L'API publique depuis le 17/09. Depuis le 24/09 (arbitrage n°19, un seul solid par écran), chaque niveau a un rôle : `solid` l'action principale, une par écran ; `soft` l'action de contexte, dans une carte ou une rangée ; `ghost` le tertiaire ; `outline` les paires Annuler / Confirmer. Les treize `variant` historiques ne sont plus que des alias vers une case : `primary` = soft/brand, `ghost` = outline/brand, `glass` = solid + onDark. Le contrat de contraste est attaché au NIVEAU, pas à un nom — c'est ce qui a manqué le jour où la bascule a déplacé un niveau sous un nom, et où le site marketing a perdu ses aplats sans qu'une ligne du site ne change."
        >
          <div className="flex flex-col gap-stack-lg">
            {([
              ['solid',   'Aplat du ton au cran 700, label blanc, survol au 800. Le premier cran qui porte du blanc à 4,5:1 : 5,02 · 6,31 · 4,88 · 5,15. L’action principale — une par écran.'],
              ['soft',    'Fond du ton au cran 50, opaque ; label 800, filet 700. L’action de contexte, dans une carte ou une rangée — et le mieux contrasté du système (6,31 · 9,49 · 7,64).'],
              ['outline', 'Filet 700 sans fond, label 800. Réservé aux paires Annuler / Confirmer.'],
              ['ghost',   'Label 800, ni fond ni filet au repos ; le fond n’arrive qu’au survol. L’action tertiaire.'],
              ['link',    'Ni fond ni filet : label 800 souligné, survol au 900.'],
            ] as const).map(([emphasis, note]) => (
              <div key={emphasis} className="flex flex-col gap-stack-xs">
                <div className="flex items-baseline gap-stack-xs">
                  <code className="font-mono text-caption font-semibold text-ink-900">{emphasis}</code>
                  <span className="font-body text-caption text-ink-600">{note}</span>
                </div>
                <div className="hstack">
                  {(['brand', 'warm', 'sun', 'danger', 'neutral'] as const).map((tone) => (
                    <Button key={tone} emphasis={emphasis} tone={tone} size="sm">{tone}</Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ShowcaseBloc>

        {/* ─── 3 · LES ICÔNES ─────────────────────────────────────────────── */}
        <ShowcaseBloc
          titre="Les icônes suivent la taille du bouton"
          note="Corrigé le 2026-09-09. La boîte de l'icône valait 1em d'un font-size de 1,05em, et le glyphe gardait sa taille propre — presque toujours 16 px. En dessous de lg la boîte était plus étroite que le glyphe : flex-shrink mordait sur la largeur et pas sur la hauteur, donc un cercle devenait un ovale. Sur sm, l'écrasement mesurait 2,35 px. Désormais la boîte vient de l'échelle --icon-size-*, appariée à la police du label, et le SVG remplit la boîte : carré par construction."
        >
          <div className="flex flex-wrap items-end gap-stack">
            {([
              ['sm', '16 px'], ['md', '18 px'], ['lg', '20 px'],
            ] as const).map(([size, px]) => (
              <div key={size} className="flex flex-col items-start gap-stack-xs">
                <Button size={size} leadingIcon={I.plus} trailingIcon={I.arrow}>Étiquette</Button>
                <span className="text-caption text-ink-600 font-body tabular-nums">icône {px}</span>
              </div>
            ))}
            <div className="flex flex-col items-start gap-stack-xs">
              <div className="hstack">
                <Button iconOnly aria-label="Ajouter" size="sm">{I.plus}</Button>
                <Button iconOnly aria-label="Ajouter" size="md" emphasis="soft" tone="warm">{I.plus}</Button>
                <Button iconOnly aria-label="Ajouter" size="lg" emphasis="outline">{I.plus}</Button>
              </div>
              <span className="text-caption text-ink-600 font-body">iconOnly : un cercle de 36, 44 ou 52</span>
            </div>
          </div>
        </ShowcaseBloc>

        {/* ─── 4 · ÉTATS ET RETOUR AU CLIC ────────────────────────────────── */}
        <ShowcaseBloc
          titre="Les états, et le retour au clic"
          note="À l'enfoncement, le bouton descend à 97 % en 80 ms. Le survol n'existe pas au doigt : sur mobile, cet enfoncement est le seul retour que reçoit l'utilisateur, et une transition qui traîne ne se lit plus comme un appui. Sous prefers-reduced-motion, l'échelle ne bouge pas."
        >
          <div className="hstack">
            <Button>Au repos</Button>
            <Button loading>Chargement</Button>
            <Button disabled>Désactivé</Button>
            <Button emphasis="outline" disabled>Désactivé, contour</Button>
            <Button fullWidth={false} emphasis="link">Lien</Button>
          </div>
        </ShowcaseBloc>

        {/* ─── 5 · LA SURFACE ─────────────────────────────────────────────── */}
        <ShowcaseBloc
          titre="La surface décide — `onDark`"
          note="Le verre n'est plus un nom de variante mais une affirmation sur le fond, et une affirmation se vérifie. Sur `onDark`, les niveaux s'expriment en blanc ; le ton n'entre pas, puisque c'est la surface qui donne la couleur. Ce qui a été mesuré le 17/09 : 26 boutons « verre » vivaient sur un hero CLAIR — du blanc sur du blanc, 1,03 de contraste, et c'était l'action principale de vingt pages. Le nom `glass` décrivait une matière, donc rien ne pouvait vérifier la surface. Le niveau `solid` lui-même se contredisait : un voile blanc sous un texte blanc ne passait AA que sur ink-900, et mesurait 2,31 sur un hero teal."
        >
          <div className="flex flex-col gap-stack">
            <div className="rounded-lg bg-gradient-to-br from-primary-800 via-primary-700 to-secondary-700 p-stack flex flex-wrap items-center gap-stack-xs">
              <span className="font-body text-caption font-semibold text-white mr-2">Fond saturé — cran 700 ou plus sombre</span>
              <Button emphasis="solid" onDark leadingIcon={I.plus}>solid</Button>
              <Button emphasis="outline" onDark>outline</Button>
              <Button emphasis="ghost" onDark trailingIcon={I.arrow}>ghost</Button>
            </div>
            <div className="rounded-lg bg-secondary-50 border border-secondary-100 p-stack flex flex-wrap items-center gap-stack-xs">
              <span className="font-body text-caption font-semibold text-secondary-800 mr-2">Carte teintée</span>
              <Button emphasis="soft" tone="neutral" leadingIcon={I.plus}>soft neutral</Button>
              <Button emphasis="ghost" tone="neutral" trailingIcon={I.arrow}>ghost neutral</Button>
              <Button emphasis="soft" tone="warm" leadingIcon={I.plus}>soft warm</Button>
            </div>
            <div className="rounded-lg bg-white border border-ink-200 p-stack flex flex-wrap items-center gap-stack-xs">
              <span className="font-body text-caption font-semibold text-ink-600 mr-2">Fond blanc</span>
              <Button emphasis="soft" leadingIcon={I.plus}>soft</Button>
              <Button emphasis="outline">outline</Button>
              <Button emphasis="ghost" trailingIcon={I.arrow}>ghost</Button>
            </div>
          </div>
        </ShowcaseBloc>
      </div>
    ),
  },
  {
    name: 'QuickActionButton',
    codeName: 'ui/QuickActionButton.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['Coaching'],
    description: "Raccourci en forme de carte compacte : pastille d'icône teintée, libellé 16/700, sous-titre optionnel en légende 13 ink-600, chevron à droite. Rayon 20, environ 66 px de haut (76 avec sous-titre). Quatre tons — primary, warm, sun, et accent qui recopie sun — sur quatre surfaces (card · tinted · glass · frosted), état désactivé. Pour les raccourcis et outils d'une section : plus compact qu'IconFeatureCard ou ActionCard, plus visuel qu'un Button.",
    keywords: ['quick', 'action', 'raccourci', 'button', 'card', 'icon', 'tone', 'chevron', 'shortcut', 'tile', 'surface'],
    render: () => (
      <div className="flex flex-col gap-stack-xs max-w-[420px]">
        <QuickActionButton
          tone="primary"
          icon={<BookOpen size={18} />}
          label="Préparer la session"
          subtitle="Questionnaire pré-session"
          onClick={() => {}}
        />
        <QuickActionButton
          tone="warm"
          icon={<Mail size={18} />}
          label="Compte-rendu"
          subtitle="Notes et points clés des sessions"
          onClick={() => {}}
        />
        <QuickActionButton
          tone="sun"
          icon={<PenLine size={18} />}
          label="Réflexions journal"
          subtitle="Vos entrées liées au coaching"
          onClick={() => {}}
        />
        <QuickActionButton
          tone="primary"
          icon={<Settings2 size={18} />}
          label="Action désactivée"
          subtitle="Indisponible pour l'instant"
          disabled
          onClick={() => {}}
        />
      </div>
    ),
  },
  {
    // Phase 1 P0 (2026-06-30, vérifié): Figma Input 2119:22 (size×status) — conforme code.
    // Toggles (Checkbox/Radio/Switch) sets distincts, OK. Checkbox indeterminate non re-vérifié.
    // Note: Glass surface ignores status prop (by design). Checkbox indeterminate partial.
    name: 'Input',
    codeName: 'Input.tsx',
    cssBase: '.input / .field / .check / .radio / .switch',
    description: "Champ de saisie, libellé toujours au-dessus. Trois tailles, 36 · 44 · 52 (défaut md), les mêmes que Button ; on saisit à 16 px à toutes les tailles — sous 16, iOS Safari zoome la page au focus. Rayon 14, filet ink-400 (arbitrage n°7, le filet de la famille champ). Libellé 16/600 ink-900, aide 13 ink-600, erreur 13 danger-fg annoncée (`role=alert`), 8 px entre libellé, champ et message. Statuts default · success · error, surface light ou glass, icônes de tête et de queue (16 · 18 · 20), `multiline`. Le fichier exporte aussi Checkbox, Radio et Switch : libellé 16/400, contrôle de 20 px calé sur la première ligne du libellé, état coché au cran 700 (arbitrage n°9).",
    keywords: ['form', 'champ', 'saisie', 'text', 'label', 'hint', 'error', 'checkbox', 'radio', 'switch', 'textarea', '36', '44', '52'],
    render: () => (
      <div className="vstack max-w-[480px]">
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
        <div className="hstack items-center">
          <Checkbox label="Me tenir informée" defaultChecked />
          <Checkbox label="Indéterminé" indeterminate />
          <Radio name="demo-r" label="Option A" defaultChecked />
          <Radio name="demo-r" label="Option B" />
          <Switch label="Notifications" defaultChecked />
        </div>
        {/* Sur deux lignes, la case se cale sur la PREMIÈRE ligne du libellé,
            pas sur le milieu du bloc (doctrine § 4). */}
        <div className="max-w-[320px]">
          <Checkbox label="Recevoir chaque lundi le résumé de mes parcours, de mes sessions et de la veille" />
        </div>
        <div className="hstack">
          <Input size="sm" placeholder="sm · 36 px" />
          <Input size="md" placeholder="md · 44 px" />
          <Input size="lg" placeholder="lg · 52 px" />
        </div>
      </div>
    ),
  },
  {
    name: 'Select',
    codeName: 'Select.tsx',
    cssBase: '.field / .input (select wrapper)',
    description: "Menu natif du navigateur, habillé comme Input : mêmes hauteurs (36 · 44 · 52), même rayon 14, même filet ink-400, même texte à 16, mêmes rôles de libellé, d'aide et d'erreur. Chevron de 16 · 18 · 20. Statuts default · success · error. Pour une liste longue ou à filtrer, Combobox.",
    keywords: ['form', 'dropdown', 'select', 'options', 'menu', 'champ', '36', '44', '52'],
    render: () => (
      <div className="vstack max-w-[480px]">
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
          <Select size="sm" placeholder="sm · 36 px" options={[{ value: 'a', label: 'A' }]} />
          <Select size="md" placeholder="md · 44 px" options={[{ value: 'a', label: 'A' }]} />
          <Select size="lg" placeholder="lg · 52 px" options={[{ value: 'a', label: 'A' }]} />
        </div>
      </div>
    ),
  },
  // ── Combobox ───────────────────────────────────────────────────────────────
  {
    name: 'Combobox',
    codeName: 'ui/Combobox.tsx',
    cssBase: 'combobox',
    description:
      "Sélection unique avec recherche : le champ filtre la liste pendant la frappe. Clavier ↑ ↓ Entrée Échap Tab. Même champ que Select — 36 · 44 · 52, texte 16, rayon 14, filet ink-400. Liste en panneau au rayon 14, options à 16 ; l'option choisie passe en 600 au cran 800, avec une coche. Statuts default · success · error, état désactivé.",
    keywords: ['combobox', 'autocomplete', 'searchable', 'select', 'dropdown', 'filter', 'keyboard', 'typeahead'],
    showcaseOnly: true,
    render: () => {
      const LANGS = [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Español' },
        { value: 'de', label: 'Deutsch' },
        { value: 'pt', label: 'Português' },
        { value: 'it', label: 'Italiano' },
        { value: 'nl', label: 'Nederlands' },
      ];
      const [val1, setVal1] = React.useState('');
      const [val2, setVal2] = React.useState('fr');
      return (
        <div className="flex flex-col gap-stack max-w-[480px]">
          <Combobox
            label="Langue"
            hint="Tapez pour filtrer la liste"
            options={LANGS}
            value={val1}
            onChange={setVal1}
            placeholder="Rechercher une langue…"
          />
          <Combobox
            label="Pré-sélectionné"
            options={LANGS}
            value={val2}
            onChange={setVal2}
          />
          <Combobox
            label="En erreur"
            error="Ce champ est requis"
            status="error"
            required
            options={LANGS}
            value=""
            onChange={() => {}}
          />
          <Combobox
            label="Désactivé"
            disabled
            options={LANGS}
            value="en"
            onChange={() => {}}
          />
        </div>
      );
    },
  },
  // ── QualitativeRating ──────────────────────────────────────────────────────
  {
    name: 'QualitativeRating',
    codeName: 'ui/QualitativeRating.tsx',
    cssBase: 'qualitative-rating',
    description:
      "Échelle qualitative : une rangée d'options libellées — par défaut cinq niveaux, d'« À améliorer » à « Excellent » — distincte d'une note chiffrée. Palier interactif : rayon 14, 36 px en sm et 44 en md, libellés 13 ou 16 en 600. L'option choisie prend un dégradé 700 → 800 à libellé blanc (primary, warm) ; sun reste en accent-400 à encre ink-900. Libellé, aide et erreur comme Input ; retour à la ligne (`wrap`) activé par défaut.",
    keywords: ['rating', 'qualitative', 'feedback', 'pills', 'satisfaction', 'evaluation', 'survey', 'scale'],
    showcaseOnly: true,
    render: () => {
      const [primary, setPrimary] = React.useState('');
      const [warm, setWarm]       = React.useState('4');
      const [sun, setSun]         = React.useState('3');
      const [sm, setSm]           = React.useState('');
      return (
        <div className="flex flex-col gap-stack max-w-2xl">
          <QualitativeRating
            label="Ton primary · aucune sélection"
            tone="primary"
            value={primary}
            onChange={setPrimary}
          />
          <QualitativeRating
            label="Ton warm · « Très bien » présélectionné"
            tone="warm"
            value={warm}
            onChange={setWarm}
          />
          <QualitativeRating
            label="Ton sun"
            tone="sun"
            value={sun}
            onChange={setSun}
          />
          <QualitativeRating
            label="Taille sm · 36 px"
            size="sm"
            value={sm}
            onChange={setSm}
          />
          <QualitativeRating
            label="Options personnalisées"
            tone="warm"
            value=""
            onChange={() => {}}
            options={[
              { value: 'non', label: 'Pas du tout' },
              { value: 'un-peu', label: 'Un peu' },
              { value: 'beaucoup', label: 'Beaucoup' },
            ]}
          />
          <QualitativeRating
            label="Désactivé"
            disabled
            value="3"
            onChange={() => {}}
          />
        </div>
      );
    },
  },
  {
    name: 'FormGroup',
    codeName: 'FormGroup.tsx',
    cssBase: '.form-group',
    description: "Enveloppe libellé + contrôle + aide ou erreur, pour un contrôle qui n'a pas les siens. Libellé 16/600 ink-900 — il ne passe plus au rouge en erreur —, astérisque danger-fg, aide 13 ink-600, erreur 13 danger-fg ; 8 px entre chaque. Disposition verticale (défaut) ou horizontale dès 640 px, le libellé sur 150 px au moins.",
    keywords: ['form', 'label', 'wrapper', 'layout', 'hint', 'error'],
    render: () => (
      <div className="flex flex-col gap-stack max-w-[520px]">
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
    // Phase 1 P0 (2026-06-30, vérifié): Figma Card 1111:46 + Card/Glass 1111:63 = tous les
    // variants code présents; tinted déjà tone-split (primary/warm/sun/brand). Rien ne manquait.
    name: 'Card',
    codeName: 'Card.tsx',
    cssBase: '.card',
    description: "L'unité de contenu autonome — une collection, elle, se rend en rangées dans UNE carte (arbitrage n°5). Rayon 20 à toutes les tailles ; padding 24 au canon (md), 20 en dense (sm), 12 en xs, 32 en lg. Anatomie par les props : surtitre `eyebrow` 13/600 ink-600, 4 px, titre h3 20/26, 8 px, `description` 16 ink-700 à la largeur de lecture, 12 px, pied `footer` en 13 ink-600 sous un filet ; icône en tête. Onze variantes : default, feature et elevated (blanches, identiques), interactive, minimal, ink, tinted, glass, glass-brand, glass-warm, glass-dark. Aucune ombre ; au survol, le filet fonce et le fond se teinte, sans soulèvement. CardEyebrow, CardTitle, CardDesc et CardFooter portent les mêmes classes pour une composition libre, mais posés en frères le titre garde sa marge de base — 23 px sous le surtitre au lieu de 4 : préférer les props.",
    keywords: ['container', 'surface', 'carte', 'eyebrow', 'title', 'description', 'footer', 'anatomie', 'padding', 'feature', 'interactive', 'glass', 'minimal', 'ink', 'tinted', 'tone'],
    render: () => (
      <div className="flex flex-col gap-section">
        <ShowcaseBloc
          titre="L'anatomie, par les props"
          note="Posés par `eyebrow`, `title`, `description` et `footer`, les éléments prennent les espaces de l'anatomie : 4 px sous le surtitre, 8 sous le titre, 12 avant le pied. La carte dense (size sm) garde la même anatomie avec 20 px de padding — sa seule dérogation (arbitrage n°4)."
        >
          <div className="grid gap-stack [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
            <Card
              eyebrow="Parcours"
              title="Concevoir une séquence"
              description="Structurer un parcours qui tient debout, de l'objectif à l'évaluation."
              footer={<><span>6 leçons · 45 min</span><Button emphasis="soft" size="sm">Ouvrir</Button></>}
            />
            <Card
              size="sm"
              eyebrow="Dense · padding 20"
              title="Évaluer la pratique"
              description="Distinguer la complétion de la maîtrise."
            />
          </div>
        </ShowcaseBloc>

        <ShowcaseBloc
          titre="Les variantes"
          note="Aucune ne porte d'ombre depuis le 09/09 : le filet suffit. interactive se teinte au survol selon son ton ; tinted prend le dégradé du ton ; les verres ne se posent que sur un fond coloré, et glass-dark part du cran 500 dans son coin haut gauche — n'y poser que du grand texte blanc."
        >
          <div className="flex flex-col gap-stack">
            <div className="grid gap-stack [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
              <Card title="default" description="Filet ink-200, fond blanc." />
              <Card variant="feature" title="feature" description="Blanche, sans filet." />
              <Card variant="minimal" title="minimal" description="Transparente, filet ink-200." />
              <Card variant="interactive" onClick={() => {}} title="interactive" description="Survolez : le filet et le fond changent." />
            </div>
            <div className="grid gap-stack [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
              <Card variant="tinted" tone="primary" title="tinted · primary" description="Dégradé du 100 au 50." />
              <Card variant="tinted" tone="warm" title="tinted · warm" description="Dégradé du 100 au 50." />
              <Card variant="tinted" tone="sun" title="tinted · sun" description="Dégradé du 100 au 50." />
            </div>
            <div className="grid gap-stack [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
              <div className="rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 p-1">
                <Card variant="glass" title="glass" description="Verre clair, sur un fond coloré." />
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-white p-1">
                <Card variant="glass-brand" title="glass-brand" description="Voile teal, sur un fond clair." />
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-primary-800 to-primary-900 p-1">
                <Card variant="glass-dark">
                  <p className="font-display text-h3 text-white">glass-dark</p>
                </Card>
              </div>
            </div>
          </div>
        </ShowcaseBloc>
      </div>
    ),
  },
  {
    // Phase 1 P0 (2026-06-30, vérifié): Badge set 1346:2 + TrendingBadge 1110:83 étaient CASSÉS
    // (clés de variantes incohérentes) → réparés (Badge +dot=false, TrendingBadge +hasCount=false).
    name: 'Badge',
    codeName: 'ui/Badge.tsx',
    cssBase: 'Tailwind',
    description: "L'état qui crie : 11 px en capitales, graisse 700, serrage positif (`tracking-label`), bordure, pilule. Sept variantes (brand · neutral · warm · sun · success · danger · info) ; trois tailles — compact et normal font 20 px (padding 8 ou 10), large 26 px en 13 ; un point `dot` fixe (arbitrage n°16 : pas de mouvement permanent pour dire un état). StatusBadge, dans le même fichier, dit les cinq états d'une leçon avec leur icône — Verrouillé, Disponible, En cours, Terminé, Échoué — au même corps de 11 px. Une donnée n'est pas un état : catégorie, type ou durée vont en MetaPill (arbitrages n°14-15).",
    keywords: ['status', 'état', 'label', 'brand', 'warm', 'sun', 'success', 'danger', 'info', 'dot', 'compact', 'normal', 'large', 'locked', 'completed', 'statusbadge'],
    usedBy: ['LessonCard', 'ParcoursCard', 'VeilleCardFeed', 'Dashboard'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        {/* Badge — sémantique */}
        <div className="flex flex-col gap-stack-xs">
          <span className="font-body text-caption font-semibold text-ink-600">Badge — sémantique</span>
          <div className="hstack flex-wrap">
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
        </div>
        {/* StatusBadge — état leçon */}
        <div className="flex flex-col gap-stack-xs">
          <span className="font-body text-caption font-semibold text-ink-600">StatusBadge — état leçon</span>
          <div className="hstack flex-wrap gap-stack-xs">
            <StatusBadge status="locked" />
            <StatusBadge status="available" />
            <StatusBadge status="in-progress" />
            <StatusBadge status="completed" />
            <StatusBadge status="failed" />
          </div>
          <div className="hstack flex-wrap gap-stack-xs">
            <StatusBadge status="locked" showLabel />
            <StatusBadge status="available" showLabel />
            <StatusBadge status="in-progress" showLabel />
            <StatusBadge status="completed" showLabel />
            <StatusBadge status="failed" showLabel />
          </div>
        </div>
      </div>
    ),
  },
  {
    // Phase 1 P0 (2026-06-30, vérifié): Avatar set 1115:97 conforme code (sizes/tints/shapes/statuses).
    name: 'Avatar',
    codeName: 'Avatar.tsx',
    cssBase: '.avatar',
    description: "La personne : photo ou initiales, en rond — le carré sert aux organisations. Cinq tailles, 24 · 32 · 40 · 56 · 80 px, initiales en 600 au pas correspondant (11 · 13 · 16 · 20 · 28). Teinte stable tirée du nom (brand · warm · sun · ink), point de statut (online · busy · away). AvatarGroup les empile avec un chevauchement de 10 px et un « +N » au-delà de `max`. La pastille `level` existe encore, mais l'arbitrage n°18 (plus de niveaux d'XP dans l'app apprenant) la tient hors des écrans neufs : elle n'est plus montrée ici.",
    keywords: ['user', 'profile', 'initials', 'image', 'status', 'online', 'group'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div className="flex items-center gap-stack-xs">
          <Avatar size="xs" name="Jeanne Dupont" />
          <Avatar size="sm" name="Paul Martin" />
          <Avatar name="Claire Bernard" />
          <Avatar size="lg" name="Ahmed Ali" />
          <Avatar size="xl" name="Sofia Garcia" />
        </div>
        <div className="flex items-center gap-stack-xs">
          <Avatar name="Brand" tint="brand" />
          <Avatar name="Warm" tint="warm" />
          <Avatar name="Sun" tint="sun" />
          <Avatar name="Ink" tint="ink" />
          <Avatar name="JD" status="online" />
          <Avatar name="PM" status="busy" />
          <Avatar name="AW" status="away" />
        </div>
        <div className="flex items-center gap-stack-xs">
          <Avatar name="Org Acme" shape="square" tint="brand" size="sm" />
          <Avatar name="Org TLS" shape="square" tint="warm" />
          <Avatar name="Org Sun" shape="square" tint="sun" size="lg" />
          <AvatarGroup max={3} size="sm">
            <Avatar name="Jeanne D" />
            <Avatar name="Paul M" />
            <Avatar name="Claire B" />
            <Avatar name="Ahmed A" />
            <Avatar name="Sofia G" />
          </AvatarGroup>
        </div>
      </div>
    ),
  },

  /* ---- PATTERNS --------------------------------------------------------- */
  {
    name: 'EmptyState',
    codeName: 'EmptyState.tsx',
    cssBase: '.empty',
    description: "Premier contact, aucun résultat, erreur : il laisse toujours une issue. Pastille de 80 px, titre h3 20, 8 px, texte 16 ink-700 à la largeur de lecture, 24 px, actions. Bordure en pointillés, rayon 20 ; tons default · warm · danger.",
    keywords: ['empty', 'no results', 'placeholder', 'illustration'],
    render: () => (
      <div className="grid-2">
        <EmptyState
          title="Aucun résultat"
          description="Essayez d'ajuster vos filtres ou le terme de recherche."
          actions={<Button emphasis="soft">Réinitialiser les filtres</Button>}
        />
        <EmptyState
          tone="warm"
          title="Commencez votre premier parcours"
          description="Explorez la bibliothèque et sélectionnez un parcours adapté à vos objectifs."
          actions={<Button emphasis="soft" tone="warm">Explorer</Button>}
        />
      </div>
    ),
  },
  {
    name: 'Skeleton',
    codeName: 'Skeleton.tsx',
    cssBase: '.skeleton',
    description: "Bloc de chargement qui épouse la forme du contenu attendu, pour une attente d'une à trois secondes. Variantes text, title, block, circle, card, button ; `width` et `height`. ⚠️ Ses lignes (14 et 24 px) et son bouton en pilule de 40 px datent d'avant le 24/09 : elles ne reprennent plus le texte à 16, les titres à 20 et 28, ni le bouton à 36 · 44 · 52.",
    keywords: ['loading', 'placeholder', 'shimmer'],
    render: () => (
      <div className="vstack max-w-[420px]">
        <div className="hstack items-center">
          <Skeleton variant="circle" width={40} height={40} />
          <div className="vstack flex-1 gap-stack-xs">
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
    name: 'SkeletonTemplates',
    codeName: 'patterns/SkeletonTemplates.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['Notifications', 'LearningPaths', 'Dashboard', 'Veille', 'Journal'],
    description: "Gabarits de chargement prêts à l'emploi, à la silhouette des cartes principales : ParcoursCardSkeleton, NotificationRowSkeleton, EditorialCardSkeleton, ResumeLessonSkeleton, ActivityItemSkeleton, StatCardSkeleton. SkeletonGroup en répète un en liste ou en grille. Ils évitent de refaire des placeholders à chaque page.",
    keywords: ['skeleton', 'loading', 'placeholder', 'shimmer', 'template', 'grid', 'card'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600 m-0">ParcoursCardSkeleton</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack">
            <ParcoursCardSkeleton />
            <ParcoursCardSkeleton />
          </div>
        </div>
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600 m-0">NotificationRowSkeleton</p>
          <div className="flex flex-col gap-stack-xs">
            <NotificationRowSkeleton />
            <NotificationRowSkeleton />
          </div>
        </div>
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600 m-0">EditorialCardSkeleton</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack">
            <EditorialCardSkeleton />
            <EditorialCardSkeleton />
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'Search',
    codeName: 'Search.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['LearningPaths', 'Veille', 'Journal', 'LearningSpace'],
    description: "Barre de recherche composable, de la famille champ : 36 · 44 · 52 (défaut md), texte à 16, rayon 14 à toutes les tailles. Deux variantes : default — blanc, filet ink-400, comme Input — et glass, pour les fonds colorés. Emplacements : raccourci clavier, icône de tête, `trailing`, `filtersSlot` pour des FilterChip en ligne ; suggestions asynchrones (`isLoading`, `onSuggestionSelect`). SearchWithSuggestions en est la variante à panneau de suggestions typées — celle de cette vitrine.",
    keywords: ['find', 'query', 'filter', 'search', 'input', 'glass', 'trailing', 'suggestions', 'autocomplete', 'async'],
    render: () => {
      const [searchVal, setSearchVal] = React.useState('');
      const [suggestionsOpen, setSuggestionsOpen] = React.useState(false);
      const [isLoading, setIsLoading] = React.useState(false);
      const [filterQuery, setFilterQuery] = React.useState('');
      const [glassFilters, setGlassFilters] = React.useState<string[]>(['en cours']);

      const mockSuggestions = searchVal.length > 0
        ? [
            { id: '1', label: 'React Fundamentals', metadata: 'Parcours · 5 modules' },
            { id: '2', label: 'React Advanced Patterns', metadata: 'Parcours · 8 modules' },
            { id: '3', label: 'Testing React Apps', metadata: 'Parcours · 4 modules' },
          ]
        : [];

      return (
        <div className="flex flex-col gap-section max-w-xl">

          {/* ── Variants ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">Variantes</p>
            <Search placeholder="default — blanc et filet ink-400" shortcut="⌘K" />
            <div className="bg-gradient-to-r from-primary-700 to-primary-800 p-stack-lg rounded-xl">
              <Search variant="glass" placeholder="glass — sur fond coloré / hero…" shortcut="⌘K" />
            </div>
          </div>

          {/* ── Sizes ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">Tailles · 36 · 44 · 52</p>
            <Search size="sm" placeholder="sm — 36 px" />
            <Search size="md" placeholder="md — 44 px, le défaut" />
            <Search size="lg" placeholder="lg — 52 px" shortcut="⌘K" />
          </div>

          {/* ── Suggestions (async) ───────────────────────────── */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">Suggestions · asynchrones, avec état de chargement</p>
            <Search
              variant="default"
              placeholder='Tape "react" pour suggestions…'
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
                setSuggestionsOpen(e.target.value.length > 0);
                if (e.target.value.length > 0) {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 600);
                }
              }}
              isLoading={isLoading}
              suggestions={mockSuggestions}
              suggestionsOpen={suggestionsOpen}
              onSuggestionsOpenChange={setSuggestionsOpen}
              onSuggestionSelect={(s) => { setSearchVal(s.label); setSuggestionsOpen(false); }}
            />
          </div>

          {/* ── trailing slot ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">trailing · un bouton-icône de filtres</p>
            <Search
              variant="default"
              placeholder="Rechercher avec filtres…"
              /* Un bouton du système, pas un bouton fait main : l'ancienne
                 démo posait un compteur à 10 px, sous le plancher de l'échelle. */
              trailing={
                <Button iconOnly size="sm" emphasis="ghost" tone="neutral" aria-label="Filtres">
                  <SlidersHorizontal />
                </Button>
              }
            />
          </div>

          {/* ── filtersSlot (FilterChip inline) ──────────────────────── */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">filtersSlot · des FilterChip dans la barre</p>
            <Search
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Rechercher dans Veille…"
              filtersSlot={
                <>
                  <FilterChip label="Tout" active={filterQuery === ''} onClick={() => setFilterQuery('')} />
                  <FilterChip label="Actus" active={filterQuery === 'actu'} onClick={() => setFilterQuery('actu')} />
                  <FilterChip label="Tutoriels" active={filterQuery === 'tuto'} onClick={() => setFilterQuery('tuto')} />
                  <FilterChip label="Dossiers" active={filterQuery === 'dossier'} onClick={() => setFilterQuery('dossier')} />
                </>
              }
            />
          </div>

          {/* ── Glass + FilterBar (pattern hero gradient) ────────────────────── */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">glass + FilterBar · sur un hero en dégradé (Parcours)</p>
            <div className="bg-gradient-to-r from-primary-700 to-primary-800 p-stack-lg rounded-xl">
              <Search
                size="sm"
                variant="glass"
                placeholder="Rechercher un parcours…"
                aria-label="Rechercher un parcours"
                filtersSlot={
                  <div className="flex flex-wrap items-center gap-stack-xs">
                    <FilterBar
                      options={[
                        { id: 'en cours',      label: 'En cours',      count: 3 },
                        { id: 'termine',       label: 'Terminés',      count: 1 },
                        { id: 'pas commence',  label: 'Pas commencés', count: 2 },
                      ]}
                      selected={glassFilters}
                      onChange={setGlassFilters}
                      tone="brand"
                      variant="glass"
                      size="sm"
                      surface="plain"
                    />
                    <span className="font-body text-caption text-white ml-auto">3 sur 6</span>
                  </div>
                }
              />
            </div>
          </div>

        </div>
      );
    },
  },
  {
    name: 'SearchFilters',
    codeName: 'patterns/SearchFilters.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['Journal', 'Veille', 'LearningPaths', 'LearningSpace'],
    description:
      "Recherche et filtres, en un composant. Il orchestre Search, FilterChip et SelectCheckbox : on déclare des axes (`filters`) et il choisit le contrôle — des pastilles jusqu'à `chipThreshold` options (6), une liste à cocher au-delà, une seule pastille pour une bascule. Les pastilles suivent la taille du champ : sm (28 px) avec un Search sm, md (44 px) sinon. Deux dispositions : `inline`, filtres toujours visibles ; `panel`, un bouton de filtres avec compteur qui déplie un panneau où chaque groupe est nommé comme un champ (16/600 ink-900). Réinitialisation automatique (Button sm), trois tons.",
    keywords: ['search', 'filter', 'filtre', 'recherche', 'composite', 'panel', 'chips', 'checklist', 'toggle', 'facets'],
    render: () => {
      const [q1, setQ1] = React.useState('');
      const [types, setTypes] = React.useState<string[]>([]);
      const [saved, setSaved] = React.useState(false);
      const [q2, setQ2] = React.useState('');
      const [period, setPeriod] = React.useState<string[]>([]);
      const [kind, setKind] = React.useState<string[]>([]);
      const [themes, setThemes] = React.useState<string[]>([]);

      const TYPE_OPTS = [
        { id: 'actu', label: 'Actus' },
        { id: 'tuto', label: 'Tutoriels' },
        { id: 'dossier', label: 'Dossiers' },
        { id: 'mag', label: 'Magazine' },
      ];
      const THEME_OPTS = Array.from({ length: 12 }, (_, i) => ({ id: `t${i}`, label: `Thématique ${i + 1}` }));

      return (
        <div className="flex flex-col gap-section max-w-2xl">
          {/* Inline — 1-2 axes peu d'options */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">layout="inline" · pastilles et bascule (Veille, Parcours)</p>
            <SearchFilters
              query={q1}
              onQueryChange={setQ1}
              placeholder="Rechercher un sujet…"
              filters={[
                { id: 'type', label: 'Type', options: TYPE_OPTS, selected: types, onChange: setTypes },
                { id: 'saved', label: 'Sauvegardés', kind: 'toggle', value: saved, onChange: setSaved },
              ]}
            />
          </div>

          {/* Panel — 2+ axes, dont un à beaucoup d'options → dropdown auto */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">layout="panel" · groupes nommés, pastilles ou liste à cocher selon le nombre d'options (Journal, Espace Apprentissage)</p>
            <SearchFilters
              layout="panel"
              query={q2}
              onQueryChange={setQ2}
              placeholder="Rechercher titre, thème, tag…"
              filters={[
                { id: 'period', label: 'Période', options: [
                  { id: 'week', label: 'Cette semaine' },
                  { id: 'month', label: 'Ce mois' },
                  { id: '3m', label: '3 mois' },
                ], selected: period, onChange: setPeriod },
                { id: 'kind', label: "Type d'entrée", options: [
                  { id: 'guided', label: 'Guidé' },
                  { id: 'free', label: 'Libre' },
                  { id: 'insight', label: 'Insight' },
                ], selected: kind, onChange: setKind },
                { id: 'theme', label: 'Thématique (12 → dropdown auto)', options: THEME_OPTS, selected: themes, onChange: setThemes },
              ]}
            />
          </div>
        </div>
      );
    },
  },
  /* ---- LEARNING --------------------------------------------------------- */
  {
    name: 'StatCard',
    codeName: 'ui/StatCard.tsx',
    cssBase: '.stat-card',
    usedBy: ['Dashboard (hero pre-Phase 10)', 'LearningPaths (Phase 10 KPI row)', 'Coaching', 'Journal', 'Notifications'],
    description: "Un chiffre mis en avant, en carte : pastille d'icône, 12 px, la valeur en League Spartan 700 — 28 en sm, `stat-value` (32 → 44) en md, `stat-value-lg` (40 → 56) en lg —, 4 px, puis le libellé en légende 13/600 ink-600 (ce n'est plus un micro-libellé en capitales). Unité en 13 sur la ligne de base ; delta en 13/600, coloré selon `polarity` (ajoutée le 24/09 : une baisse peut être une bonne nouvelle). Tons neutral · brand · warm · sun sur quatre surfaces, ou les variantes héritées ; `square` pour les grilles. Rayon 20, padding 20 (24 en lg).",
    keywords: ['metric', 'kpi', 'stat', 'chiffre', 'valeur', 'dashboard', 'square', 'size', 'polarity', 'delta'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        {/* Variants with icons */}
        <div className="grid grid-cols-2 gap-stack">
          <StatCard icon={<BookOpen size={20} />} label="Parcours complétés" value={12} sub="/24" delta="+3 ce mois" deltaDirection="up" />
          <StatCard variant="elevated" icon={<Clock3 size={20} />} label="Heures d'apprentissage" value="48" sub="h" />
          <StatCard variant="warm" icon={<Calendar size={20} />} label="Semaines actives" value={3} sub="/ 4" delta="+1 ce mois" deltaDirection="up" />
          <StatCard variant="brand" icon={<Trophy size={20} />} label="Progression moyenne" value={78} sub="%" />
          <StatCard variant="sun" icon={<CheckCircle2 size={20} />} label="Compétences validées" value={5} delta="+2" deltaDirection="up" />
        </div>
        {/* Sizes */}
        <div className="grid grid-cols-3 gap-stack items-start">
          <StatCard size="sm" label="Petite" value={42} sub="pts" delta="+5" deltaDirection="up" />
          <StatCard size="md" label="Moyenne" value={42} sub="pts" delta="+5" deltaDirection="up" />
          <StatCard size="lg" variant="brand" label="Grande" value={42} sub="pts" delta="+5" deltaDirection="up" />
        </div>
        {/* Square grid */}
        <div className="grid grid-cols-4 gap-stack">
          <StatCard square size="sm" label="Semaines" value={3} sub="/ 4" />
          <StatCard square variant="elevated" label="Score" value={94} sub="%" />
          <StatCard square variant="warm" label="Sessions" value={12} />
          <StatCard square size="lg" variant="brand" label="Leçons" value={42} />
        </div>
      </div>
    ),
  },
  {
    name: 'ProgressBar',
    codeName: 'ProgressBar.tsx',
    cssBase: '.progress',
    description: "Barre de progression : libellé en légende 13/600 ink-600, valeur en Nunito 13/600 tabulaire au cran 800 (« 72 % »), sur la même ligne de base, 8 px au-dessus d'une piste de 2 · 4 · 8 · 14 px (xs · sm · md · lg). Remplissages brand · warm · sun · success · danger · gradient ; disposition stacked (défaut) ou inline. La barre est nommée pour les lecteurs d'écran. Son pendant circulaire est ProgressRing.",
    keywords: ['progress', 'linear', 'bar', 'percentage', 'ring', 'circle', 'circular', 'svg'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <ProgressBar label="Module 3 · Design systems" value={72} />
        <ProgressBar label="Objectif de la semaine" value={40} fill="warm" />
        <ProgressBar label="Gradient fill" value={60} fill="gradient" size="lg" />
        <ProgressBar value={25} size="sm" valueLabel={false} />
      </div>
    ),
  },

  {
    name: 'ProgressRing',
    codeName: 'ui/ProgressRing.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    description: "Anneau SVG de progression (0–100). 5 tons (brand/warm/sun/success/danger), dégradé interne et halo optionnel (`glow`), animation de 0 à la valeur au montage. La valeur prend un pas de l'échelle selon le diamètre : dès 160 px `stat-value`, dès 112 le h2 (28), dès 80 le h3 (20), dès 64 le corps (16/600), en dessous la légende (13/600) — elle était à `size / 4,5` px, hors échelle. `label` s'affiche sous la valeur en légende 13/600 ink-600 : on lui passe du texte simple. `size` (défaut 120) et `thickness` sont libres.",
    keywords: ['progress', 'ring', 'circle', 'circular', 'svg', 'donut', 'percentage', 'glow', 'tone', 'anneau', 'progression'],
    render: () => (
      <div className="flex gap-stack-lg flex-wrap items-center py-stack-xs">
        <ProgressRing value={78} tone="brand" label="Parcours" />
        <ProgressRing value={54} tone="warm" label="Coaching" />
        <ProgressRing value={92} tone="sun" label="Badges" />
        <ProgressRing value={33} tone="success" label="Certification" />
        <ProgressRing value={20} tone="danger" size={80} thickness={8} />
        <ProgressRing value={65} tone="brand" size={60} thickness={6} glow={false} />
      </div>
    ),
  },

  /* ---- CONTENT & DISPLAY ------------------------------------------------ */
  {
    name: 'ActionCard',
    codeName: 'ActionCard.tsx',
    cssBase: '.tls-action-card / .tls-action-card--brand/warm/sun',
    description: "Carte d'action horizontale : pastille de 56 px au dégradé du ton, titre h3 20, 8 px, description 16 ink-700, et l'action à droite. La colonne de texte descend de 15 px pour centrer la première ligne sur la pastille. Tons brand · warm · sun · neutral ; surfaces card · tinted · glass · frosted ; `onClick` fait de la carte un bouton. Au survol : le filet et le fond, sans soulèvement (passe motion du 17/09).",
    keywords: ['action', 'card', 'icon', 'cta', 'tone', 'brand', 'warm', 'sun', 'quick-action'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <ActionCard
          tone="brand"
          icon={I.book}
          title="Continuer mon parcours"
          description="Prompt Engineering — Module 3 sur 8"
          action={<Button size="sm" emphasis="soft">Reprendre</Button>}
        />
        <ActionCard
          tone="warm"
          icon={I.trophy}
          title="Réserver une session"
          description="Coaching individuel avec Sophie Martin"
          action={<Button size="sm" emphasis="soft" tone="warm">Réserver</Button>}
        />
        <ActionCard
          tone="sun"
          icon={I.heart}
          title="Voir mes badges"
          description="Découvrez vos accomplissements récents"
          action={<Button size="sm" emphasis="soft" tone="warm">Voir</Button>}
        />
      </div>
    ),
  },
  {
    name: 'ActivityItem',
    codeName: 'ActivityItem.tsx',
    cssBase: '.tls-activity-item / .tls-activity-item--lesson/achievement/coach/journal',
    description: "Rangée d'un fil d'activité : pastille ronde de 36 px teintée par type (lesson · achievement · coach · journal), rail vertical entre deux rangées ; titre 16/600 et heure 13 ink-600 sur la même ligne de base, description 16 ink-700 sur deux lignes.",
    keywords: ['activity', 'feed', 'timeline', 'history', 'notification', 'dot', 'type'],
    render: () => (
      <div className="py-stack-xs px-stack bg-white border border-ink-200 rounded-lg">
        <ActivityItem type="lesson" icon={I.check} title="Leçon terminée" description="Introduction au Prompt Engineering" timestamp="Il y a 2h" />
        <ActivityItem type="achievement" icon={I.trophy} title="Badge débloqué" description="Pionnier IA — Premier badge gagné !" timestamp="Hier" />
        <ActivityItem type="coach" icon={I.heart} title="Session coaching" description="Sophie Martin — Leadership" timestamp="Aujourd'hui" />
        <ActivityItem type="journal" icon={I.book} title="Journal mis à jour" description="Réflexions sur les nouvelles compétences" timestamp="Avant-hier" />
      </div>
    ),
  },
  /* ---- TLS APP PATTERNS ------------------------------------------------- */
  {
    name: 'CardGrid',
    codeName: 'patterns/CardGrid.tsx',
    cssBase: 'Tailwind (patterns/CardGrid.tsx)',
    usedBy: ['Recherche', 'Veille', 'LearningPaths', 'Coaching'],
    description: "Grille réutilisable, en requête de conteneur : elle compte ses colonnes sur la largeur de sa boîte, pas sur la fenêtre. Dispositions compact · default · feature · square-tiles · tiles ; écart de 8 · 16 · 24 · 32 px (24 par défaut) ; `autoFit`.",
    keywords: ['grid', 'layout', 'responsive', 'columns', 'cards'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <p className="m-0 text-caption font-semibold text-ink-600">layout="default"</p>
        <CardGrid layout="default" gapSize="sm">
          {['Module A', 'Module B', 'Module C'].map((t) => (
            <div key={t} className="p-3 bg-primary-50 rounded-lg text-caption text-primary-800 font-semibold border border-primary-100">{t}</div>
          ))}
        </CardGrid>
        <p className="m-0 text-caption font-semibold text-ink-600">layout="feature"</p>
        <CardGrid layout="feature" gapSize="sm">
          {['Actu', 'Tutoriel', 'Dossier', 'Mag'].map((t) => (
            <div key={t} className="p-3 bg-secondary-50 rounded-lg text-caption text-secondary-700 font-semibold border border-secondary-100">{t}</div>
          ))}
        </CardGrid>
      </div>
    ),
  },
  {
    name: 'InlineProgress',
    codeName: 'patterns/InlineProgress.tsx',
    cssBase: '.inline-progress',
    usedBy: ['Positionnement', 'ParcoursCard', 'LearningPathDetail'],
    description: "Alias déprécié de `<ProgressBar layout=\"inline\">` : la barre et sa valeur (13/600) sur une ligne. Tons primary · warm · sun, tailles sm et md.",
    keywords: ['progress', 'inline', 'bar', 'percent', 'completion'],
    render: () => (
      <div className="flex flex-col gap-stack-xs max-w-md">
        {[
          { label: 'Prompt Engineering', value: 92, tone: 'primary' as const },
          { label: 'Leadership',         value: 67, tone: 'warm' as const },
          { label: 'IA Générative',      value: 84, tone: 'sun' as const },
        ].map(({ label, value, tone }) => (
          <div key={label} className="flex items-center gap-stack-xs">
            <span className="text-caption text-ink-900 font-semibold min-w-[140px]">{label}</span>
            <InlineProgress value={value} tone={tone} size="md" className="flex-1" />
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'MetaPillGroup',
    codeName: 'ui/MetaPillGroup.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['ParcoursCard', 'LearningPathDetail', 'Dashboard', 'Journal'],
    description: "Groupe de MetaPill, la ligne de données des cartes. Il porte SON propre défaut de taille, sm, et le passe à chaque pastille : changer celui de MetaPill seul ne descend pas jusqu'aux cartes. Disposition horizontale ou verticale ; écart de 8 (`gap` sm et md) ou 16 (lg). Tons par pastille, dont glass et glass-dark pour les surfaces teintées ou saturées.",
    keywords: ['pill', 'chip', 'tag', 'meta', 'group', 'tone', 'glass', 'frosted'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        {/* Tones — light bg */}
        <div className="flex flex-col gap-stack-xs p-stack rounded-xl bg-white border border-ink-200">
          <p className="text-caption font-semibold text-ink-600 m-0">Tons · à la taille par défaut, sm</p>
          <MetaPillGroup
            items={[
              { text: 'Neutral' },
              { text: 'Primary', tone: 'primary' },
              { text: 'Warm', tone: 'warm' },
              { text: 'Sun', tone: 'sun' },
              { text: 'Brand', tone: 'brand' },
            ]}
          />
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-stack-xs p-stack rounded-xl bg-white border border-ink-200">
          <p className="text-caption font-semibold text-ink-600 m-0">Tailles · sm 24 · md 30 · lg 44</p>
          <MetaPillGroup
            items={[
              { text: 'Small', tone: 'primary' },
              { text: 'Medium', tone: 'primary' },
              { text: 'Large', tone: 'primary' },
            ]}
            size="sm"
          />
          <MetaPillGroup
            items={[
              { text: 'Small', tone: 'primary' },
              { text: 'Medium', tone: 'primary' },
              { text: 'Large', tone: 'primary' },
            ]}
            size="md"
          />
          <MetaPillGroup
            items={[
              { text: 'Small', tone: 'primary' },
              { text: 'Medium', tone: 'primary' },
              { text: 'Large', tone: 'primary' },
            ]}
            size="lg"
          />
        </div>

        {/* Glass variant — on tinted backdrop */}
        <div className="flex flex-col gap-stack-xs p-stack rounded-xl bg-gradient-to-br from-primary-50 via-primary-100 to-primary-50 border border-primary-200">
          <p className="text-caption font-semibold text-ink-600 m-0">Glass · sur fond teinté clair</p>
          <MetaPillGroup
            items={[
              { text: '6 semaines', tone: 'glass' },
              { text: '12 leçons', tone: 'glass' },
              { text: 'Marie Dubois', tone: 'glass' },
            ]}
          />
        </div>

        {/* Glass-dark variant — on saturated dark bg */}
        <div className="flex flex-col gap-stack-xs p-stack rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 border border-primary-700">
          <p className="text-caption font-semibold text-white m-0">Glass-dark · sur un dégradé saturé (heros)</p>
          <MetaPillGroup
            items={[
              { text: '6 semaines', tone: 'glass-dark' },
              { text: '12 leçons', tone: 'glass-dark' },
              { text: 'Débutant', tone: 'glass-dark' },
            ]}
          />
        </div>
      </div>
    ),
  },

  {
    name: 'Sidebar',
    codeName: 'layout/Sidebar.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "La navigation principale de l'app : 260 px de large dès 768 px (72 px repliée), un tiroir de 280 px en dessous. Les six entrées viennent de la liste unique de `src/config/navigation.ts` ; rangées de 48 px au rayon 14, libellé 16/600 ink-700, icône de 20, 8 px entre deux entrées. L'entrée active est en texte blanc sur un voile primary-700 → 800 ; les compteurs sont des pastilles de 20 px. En bas, la carte utilisateur (nom 16/600, e-mail 13) ouvre le menu du compte.",
    keywords: ['sidebar', 'nav', 'navigation', 'menu', 'shell', 'collapsible', 'drawer', 'tiroir', '260'],
    render: () => <SidebarDemo />,
  },

  /* ---- MODALS ---------------------------------------------------------------- */
  {
    name: 'PositionnementModal',
    codeName: 'modals/PositionnementModal.tsx',
    cssBase: '—',
    description: 'Auto-évaluation des compétences apprenant avant de démarrer un parcours. 5 niveaux, barre de progression, écran de succès.',
    keywords: ['modal', 'positioning', 'competence', 'assessment', 'level', 'self-eval'],
    render: () => <PositionnementModalDemo />,
  },
  {
    name: 'BookingModal',
    codeName: 'modals/BookingModal.tsx',
    cssBase: '—',
    description: 'Réservation de session coaching en 2 étapes : sélection date/heure via calendrier + confirmation.',
    keywords: ['modal', 'booking', 'calendar', 'coaching', 'slot', 'time', 'reservation'],
    render: () => <BookingModalDemo />,
  },
  {
    name: 'Dialog Modals',
    codeName: 'modals/ConfirmModal.tsx · modals/SuccessModal.tsx · modals/CancelSessionModal.tsx',
    cssBase: '—',
    usedBy: ['Billing', 'SubscriptionPayment'],
    description: "Trois dialogues bâtis sur le même tronc, texte centré : pastille d'icône, titre en h2 au pas h3 (20/700), 8 px, message 16 ink-700, 24 px, actions. ConfirmModal : quatre variantes (info · success · warning · danger). SuccessModal : une réussite, avec une coche. CancelSessionModal : annuler ou reprogrammer une session, avec le choix d'un motif.",
    keywords: ['modal', 'confirm', 'dialog', 'alert', 'danger', 'warning', 'info', 'success', 'cancel', 'session'],
    render: () => (
      <div className="flex flex-col gap-section">
        <p className="text-caption font-semibold text-ink-600 m-0">ConfirmModal — confirmation générique</p>
        <ConfirmModalDemo />
        <p className="text-caption font-semibold text-ink-600 m-0 mt-stack">SuccessModal — célébration check animé</p>
        <SuccessModalDemo />
        <p className="text-caption font-semibold text-ink-600 m-0 mt-stack">CancelSessionModal — annulation / reprogrammation</p>
        <CancelSessionModalDemo />
      </div>
    ),
  },
  {
    name: 'SessionFeedbackModal',
    codeName: 'modals/SessionFeedbackModal.tsx',
    cssBase: '—',
    description: 'Notation étoiles + commentaire. Feedback post-session coaching ou fin de leçon.',
    keywords: ['modal', 'feedback', 'rating', 'stars', 'review', 'comment', 'session'],
    render: () => <SessionFeedbackModalDemo />,
  },
  {
    name: 'VideoPlayerModal',
    codeName: 'modals/VideoPlayerModal.tsx',
    cssBase: '—',
    description: 'Lecteur vidéo plein écran pour tutoriels, leçons vidéo et contenu Veille.',
    keywords: ['modal', 'video', 'player', 'media', 'fullscreen', 'veille', 'tutorial'],
    render: () => <VideoPlayerModalDemo />,
  },

  /* ---- LEARNING SYSTEM COMPONENTS ----------------------------------------- */
  {
    name: 'Toast + useToast',
    codeName: 'Toast.tsx / useToast.ts',
    cssBase: '.toast / .toast__icon--*',
    description: "Notification passagère, avec le hook useToast() : quatre variantes, texte 16 (13 au-delà de 90 caractères), titre 16/600, icône de 20, action et fermeture, disparition automatique réglable ; de 320 à 440 px de large.",
    keywords: ['toast', 'notification', 'alert', 'feedback', 'success', 'error', 'warning'],
    render: () => <ToastDemo />,
  },
  {
    name: 'Tabs',
    codeName: 'Tabs.tsx',
    cssBase: '.tabs / .tab / .tab--active',
    description: "Navigation par onglets, de deux à cinq, avec `aria-selected` et la navigation au clavier. Onglets de 44 px, libellé 16/600 aux deux états (ink-700 au repos), icône de 18. Trois variantes : pill (défaut) — un rail au rayon 14 où l'onglet actif, au rayon 10, se détache en blanc ; underline — trait de 2 px au cran 700 sous un libellé 800 ; boxed — onglets séparés, l'actif en dégradé 700 → 800. Compteur optionnel. `getTabPanelProps` relie un onglet à son panneau.",
    keywords: ['tab', 'onglet', 'navigation', 'pill', 'underline', 'boxed', 'switch', '44'],
    render: () => <TabsDemo />,
  },
  {
    name: 'FilterChip',
    codeName: 'FilterChip.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['LearningPaths', 'Veille', 'Journal', 'Notifications'],
    description: "Pastille de filtre à bascule (`aria-pressed`). En md, le défaut, c'est un contrôle de la ligne : 44 px, libellé 16/600, rayon 14 (arbitrage n°22, la hauteur commune des contrôles). En sm, 28 px et 13/600. Actif : filet 700 et libellé 800, sans changer de graisse. Variantes default · glass (sur fond coloré) · reset ; compteur optionnel ; icône de 18 (md) ou 14 (sm).",
    keywords: ['filter', 'filtre', 'chip', 'pastille', 'select', 'active', 'glass', 'toggle', 'count', 'compteur', '44'],
    render: () => <FilterChipDemo />,
  },
  {
    name: 'Medal',
    codeName: 'Medal.tsx',
    cssBase: '.medal',
    description: "Médaille ronde, sans texte : 72 · 120 · 160 px, glyphe à 44 % du diamètre (Trophy par défaut, via la prop `icon`), `label` en nom accessible. Variantes default (dégradé orange → or), brand (radial teal), locked (gris), gold · silver · bronze.",
    keywords: ['medal', 'badge', 'achievement', 'reward', 'locked', 'unlocked'],
    render: () => (
      <div className="flex gap-stack items-center flex-wrap">
        {/* L'icône passe par `icon` : les émojis donnés en enfants étaient
            ignorés, et les six médailles montraient toutes le trophée. */}
        <Medal size="lg" variant="default" label="Premier parcours" />
        <Medal size="lg" variant="brand" icon={<Zap />} label="Pratique régulière" />
        <Medal size="lg" variant="locked" icon={<Lock />} label="Verrouillée" />
        <Medal size="md" variant="default" icon={<Target />} label="Objectif atteint" />
        <Medal size="md" variant="brand" icon={<Star />} label="Compétence validée" />
        <Medal size="sm" variant="default" icon={<CheckCircle2 />} label="Étape franchie" />
      </div>
    ),
  },
  {
    name: 'CompetenceBadge',
    codeName: 'CompetenceBadge.tsx',
    cssBase: '.comp-badge',
    showcaseOnly: true,
    description: "Niveau de compétence en pastille de 36 px : libellé 16/600 précédé d'une pastille ronde de 24 px qui porte le chiffre (13/700) au cran 700. Quatre niveaux — Découverte, Pratique, Maîtrise, Expert : les trois premiers en dégradé du 50 au 100 (teal, orange, or), le quatrième en radial sombre à texte blanc.",
    keywords: ['competence', 'dreyfus', 'level', 'badge', 'proficiency', 'skill'],
    render: () => (
      <div className="flex gap-stack-xs flex-wrap">
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
    showcaseOnly: true,
    description: "Maîtrise d'une compétence en quatre niveaux — débutant, intermédiaire, avancé, expert : un anneau de progression de 96 px au cran 500 du niveau, un glyphe Lucide au centre (Sprout, Zap, Flame, Trophy) et, 8 px dessous, le libellé en MetaPill md.",
    keywords: ['mastery', 'skill', 'bloom', 'taxonomy', 'level', 'novice', 'expert'],
    render: () => (
      <div className="flex gap-stack flex-wrap">
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
    description: "Vignette de réussite : pastille d'icône (48 · 64 · 80 px), titre 16/600, description 16 ink-700 sur deux lignes, puis selon l'état la date de déblocage (13, accent-800) ou une barre de 6 px et « n / max » (13/600). Trois états — unlocked · in-progress · locked (opacité 70 %) — et trois tailles ; rayon 20.",
    keywords: ['achievement', 'badge', 'unlocked', 'locked', 'milestone', 'reward', 'size', 'variant'],
    render: () => (
      <div className="flex gap-stack flex-wrap">
        {/* Pas de série quotidienne (arbitrage n°18) : un rythme hebdomadaire. */}
        <Achievement icon={<Trophy />} title="Premier parcours" description="Un parcours terminé de bout en bout" unlockedAt="15 janv. 2026" variant="unlocked" size="md" />
        <Achievement icon={<Calendar />} title="Régularité" description="Actif 3 semaines sur les 4 dernières" progress={3} maxProgress={4} variant="in-progress" size="md" />
        <Achievement icon={<Users />} title="Mentor" description="Accompagner 5 collègues" variant="locked" size="md" />
      </div>
    ),
  },
  {
    name: 'AchievementBadge',
    codeName: 'ui/AchievementBadge.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['DashboardAchievements', 'BadgeGallery', 'BadgeDetail', 'ProfileBadgesCompetences', 'PasseportJac', 'Gamification'],
    description: "Carte de badge obtenu, centrée : disque en dégradé (60 · 100 · 140 px), titre h3 20/700, description 16 ink-700, date en légende 13. Quatre couleurs (primary · warm · sun · success) × trois tailles ; état `isLocked` (opacité réduite, cadenas) ; bouton de partage optionnel (`onShare`).",
    keywords: ['achievement', 'badge', 'unlock', 'locked', 'share', 'reward', 'milestone', 'color', 'standalone'],
    render: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack">
        <AchievementBadge
          icon={<Trophy size={48} className="text-white" />}
          title="Pionnier IA"
          description="Premier parcours terminé avec succès"
          unlockedDate="15 janv. 2026"
          color="primary"
          size="md"
        />
        <AchievementBadge
          icon={<Flame size={48} className="text-white" />}
          title="Régularité"
          description="Actif 3 semaines sur les 4 dernières"
          unlockedDate="28 mars 2026"
          color="warm"
          size="md"
        />
        <AchievementBadge
          icon={<Star size={48} className="text-white" />}
          title="Expert Certifié"
          description="Niveau Expert validé en Leadership"
          unlockedDate="3 mai 2026"
          color="sun"
          size="md"
        />
        <AchievementBadge
          icon={<CheckCircle2 size={48} className="text-white" />}
          title="Mentor"
          description="Débloque quand vous aidez 5 collègues"
          isLocked
          color="success"
          size="md"
        />
      </div>
    ),
  },
  {
    name: 'JacCard',
    codeName: 'ui/JacCard.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['PasseportJac'],
    description: "Deux cartes du Passeport, Jalons et certifications (cahiers 02 et 11). JacCardPending : une validation en cours — libellé 16/600, méta 13 ink-600, Badge « En revue » et un Button outline sm « Relancer ». JacCardNextJalon : le prochain jalon — libellé 16/600 et niveau en MetaPill, exigences en 16 ink-700, ProgressBar sm et Button soft sm « Préparer ».",
    keywords: ['jac', 'jalon', 'certification', 'dreyfus', 'validation', 'passeport', 'pending', 'progress'],
    render: () => (
      <div className="flex flex-col gap-stack max-w-xl">
        <JacCardPending
          id="demo-p1"
          title="Leadership : Niveau D3"
          competence="Leadership"
          dreyfusLevel="D3"
          submittedDaysAgo={3}
          waitingFor="Coach"
        />
        <JacCardNextJalon
          id="demo-n1"
          title="Communication : Niveau D4"
          competence="Communication"
          dreyfusLevel="D4"
          requirements={['2 présentations stratégiques', '1 session mentoring', '1 évaluation coach']}
          progress={60}
        />
      </div>
    ),
  },
  {
    name: 'Stepper',
    codeName: 'Stepper.tsx',
    cssBase: '.stepper / .stepper__step',
    description: "Stepper : des étapes numérotées, en ligne ou en colonne — rond de 40 px, chiffre en Nunito 13/600 tabulaire ; l'étape en cours en 600 ink-900, les autres en 400 ; libellé en légende 13 à l'horizontale, 16 avec une description 13 à la verticale. Steps : une liste d'étapes à cocher — pastille de 36 px, titre 16, description 13 ink-600, 24 px entre deux étapes ; une étape faite est barrée, une étape verrouillée estompée.",
    keywords: ['stepper', 'steps', 'progress', 'wizard', 'onboarding', 'sequence', 'checklist', 'task', 'sequential'],
    usedBy: ['OnboardingQuestionnaire', 'SubscriptionPayment', 'OnboardingTutorial', 'OnboardingSuccess'],
    render: () => {
      const steps = [
        { id: '1', label: 'Positionnement', state: 'done' as const },
        { id: '2', label: 'Parcours', state: 'current' as const },
        { id: '3', label: 'Coaching', state: 'upcoming' as const },
        { id: '4', label: 'Certification', state: 'upcoming' as const },
      ];
      return (
        <div className="flex flex-col gap-section">
          <p className="text-caption font-semibold text-ink-600 m-0">Stepper — indicateur horizontal / vertical</p>
          <div className="flex flex-col gap-stack-lg">
            <Stepper items={steps} orientation="horizontal" />
            <Stepper items={steps} orientation="vertical" />
          </div>
          <p className="text-caption font-semibold text-ink-600 m-0 mt-stack">Steps — checklist séquentielle verticale</p>
          <Steps
            items={[
              { title: 'Créer votre compte', description: 'Email + mot de passe sécurisé', state: 'done' },
              { title: 'Compléter votre profil', description: 'Nom, photo, objectifs', state: 'done' },
              { title: 'Se positionner', description: 'Évaluation initiale de compétences', state: 'current' },
              { title: 'Choisir un parcours', description: 'Sélectionnez votre première formation', state: 'upcoming' },
              { title: 'Démarrer l\'apprentissage', state: 'upcoming' },
            ]}
          />
        </div>
      );
    },
  },

  {
    name: 'TabsWithContent',
    codeName: 'patterns/TabsWithContent.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    description: "Onglets qui portent aussi leur contenu (onglet actif et panneau). Onglets en 16/600 (ink-600 au repos), de 46 à 48 px de haut, compteur 13/600 tabulaire, 16 px entre la liste et le panneau. Trois variantes : underline (trait primary-600, libellé 800), boxed (onglet actif en dégradé 700 → 800), pill (onglet actif blanc sur ink-100). Onglets désactivables, `onTabChange`.",
    keywords: ['tabs', 'tabbed', 'content', 'panel', 'underline', 'pill', 'boxed', 'nav', 'switch', 'state'],
    render: () => (
      <div className="flex flex-col gap-section">
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600 m-0">variant="underline" (défaut)</p>
          <TabsWithContent
            variant="underline"
            tabs={[
              { id: 'overview', label: 'Vue d\'ensemble', content: <div className="py-stack text-body text-ink-700">Description du parcours, objectifs pédagogiques et durée estimée.</div> },
              { id: 'lessons', label: 'Leçons', badge: 8, content: <div className="py-stack text-body text-ink-700">Liste des 8 leçons avec état de progression pour chacune.</div> },
              { id: 'resources', label: 'Ressources', content: <div className="py-stack text-body text-ink-700">Ressources complémentaires et liens utiles.</div> },
            ]}
          />
        </div>
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600 m-0">variant="pill"</p>
          <TabsWithContent
            variant="pill"
            tabs={[
              { id: 'all', label: 'Tout', content: <div className="py-3 text-body text-ink-700">Tous les éléments combinés.</div> },
              { id: 'coaching', label: 'Coaching', content: <div className="py-3 text-body text-ink-700">Sessions de coaching planifiées.</div> },
              { id: 'notes', label: 'Notes', content: <div className="py-3 text-body text-ink-700">Vos notes de session.</div> },
            ]}
          />
        </div>
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600 m-0">variant="boxed"</p>
          <TabsWithContent
            variant="boxed"
            tabs={[
              { id: 'profile', label: 'Profil', content: <div className="py-stack text-body text-ink-700">Données de profil et compétences.</div> },
              { id: 'account', label: 'Compte', content: <div className="py-stack text-body text-ink-700">Informations de compte et sécurité.</div> },
              { id: 'settings', label: 'Paramètres', content: <div className="py-stack text-body text-ink-700">Préférences et notifications.</div> },
            ]}
          />
        </div>
      </div>
    ),
  },

  /* ---- FEEDBACK --------------------------------------------------------- */
  {
    name: 'Alert',
    codeName: 'Alert.tsx',
    cssBase: '.alert / .alert--*',
    description: "Message persistant ancré dans la page. Quatre variantes (info · success · warning · danger), chacune colore tout son texte. banner, le défaut : texte 16, titre 16/600, 4 px, icône de 20 calée sur la première ligne, actions et fermeture optionnelles. inline : texte 13, icône de 16, sans titre ni actions. Rôle live alert (danger, warning) ou status (success).",
    keywords: ['alert', 'message', 'warning', 'error', 'success', 'info', 'danger', 'banner', 'inline'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <Alert variant="info" title="Information">Mise à jour disponible — rechargez la page pour en bénéficier.</Alert>
        <Alert variant="success" title="Enregistré avec succès" dismissible>Vos modifications ont bien été sauvegardées.</Alert>
        <Alert variant="warning" title="Attention" actions={<Button size="sm" emphasis="outline">Voir les détails</Button>}>
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
    description: "Dialogue bloquant, pour une décision : voile, boîte au rayon 24 (étage surcouche), 480 px au plus, padding 24 puis 32. Titre en h2 au pas h3 (20/700), 8 px, description 16 ink-700, 16 px, le corps en 16, puis les actions à 24 px du contenu, alignées à droite. Fermeture par Échap, par le bouton-icône ou par un clic sur le voile.",
    keywords: ['modal', 'dialog', 'overlay', 'popup', 'scrim', 'interrupt'],
    render: () => <ModalDemo />,
  },
  {
    name: 'CelebrationModal',
    codeName: 'modals/CelebrationModal.tsx',
    cssBase: 'Tailwind + modals.css animations',
    showcaseOnly: true,
    description: "Célébration d'un jalon (parcours terminé, badge obtenu) : pastille de 80 px, titre en h2 au pas h3 (20/700) ink-900, description 16 ink-700, actions ; des étincelles animées autour, que `hideSparkles` retire.",
    keywords: ['celebration', 'modal', 'milestone', 'achievement', 'parcours', 'badge', 'reward'],
    render: () => <CelebrationModalDemo />,
  },
  {
    name: 'InlineWin',
    codeName: 'ui/Celebration.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Célébration discrète, dans le flux (leçon terminée, étape franchie) : pastille ronde de 40 px, titre 16/600 ink-900, description en légende 13 ink-600. À l'inverse de CelebrationModal, elle n'interrompt pas.",
    keywords: ['inline-win', 'win', 'compact', 'banner', 'achievement'],
    render: () => (
      <InlineWin
        title="Leçon terminée"
        description="Continuez sur votre lancée — il vous reste 3 leçons dans ce module."
      />
    ),
  },

  /* ---- NAVIGATION (additional) ----------------------------------------- */
  {
    name: 'Breadcrumb',
    codeName: 'ui/Breadcrumb.tsx (canonical)',
    cssBase: '.breadcrumb / .breadcrumb__current / .breadcrumb--sticky',
    description: "Fil d'Ariane, en légende 13 partout. variant=\"simple\" (défaut) : liens ink-600, page courante ink-900 en 600, séparateur texte, `sticky` optionnel. variant=\"nav\" : boutons, chevrons, icônes, page courante sur fond primary-50, repli en ellipse au-delà de `maxVisible`, `onNavigate`. L'ancien BreadcrumbNav a été supprimé : `<Breadcrumb variant=\"nav\">` le remplace.",
    keywords: ['breadcrumb', 'navigation', 'path', 'hierarchy', 'ariane', 'sticky', 'nav'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        <div>
          <div className="text-caption text-ink-600 mb-stack-xs">variant="simple" (anchors)</div>
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
            className="mt-stack-xs"
          />
        </div>

        <div>
          <div className="text-caption text-ink-600 mb-stack-xs">variant="nav" (boutons + icônes + ChevronRight)</div>
          <Breadcrumb
            variant="nav"
            items={[
              { label: 'Accueil', icon: <BookOpen size={14} />, href: '#' },
              { label: 'Parcours', icon: <GraduationCap size={14} />, href: '#' },
              { label: 'Module 3' },
            ]}
          />
          <Breadcrumb
            variant="nav"
            maxVisible={3}
            items={[
              { label: 'Accueil', href: '#' },
              { label: 'Catégorie', href: '#' },
              { label: 'Sous-catégorie', href: '#' },
              { label: 'Section', href: '#' },
              { label: 'Page courante' },
            ]}
            onNavigate={(i) => console.log('navigate', i)}
            className="mt-stack-xs"
          />
          <div className="text-caption text-ink-600 mt-1">↑ maxVisible=3 → ellipsis automatique</div>
        </div>

        <div className="bg-ink-50 rounded-md overflow-hidden">
          <Breadcrumb
            sticky
            items={[
              { label: 'Accueil', href: '#' },
              { label: 'Veille', href: '#' },
              { label: 'Article courant' },
            ]}
          />
          <div className="p-stack text-caption text-ink-600">sticky — blur + border-bottom</div>
        </div>
      </div>
    ),
  },
  {
    name: 'AppBreadcrumb',
    codeName: 'patterns/AppBreadcrumb.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['AppLayout (global)', 'LearningPathDetail', 'ArticleDetail', 'VeilleContent'],
    description: "Le fil d'Ariane de l'app, généré depuis l'URL (`useLocation`) et monté pour toute l'app ; il s'affiche à partir de deux segments. Barre de 44 px au moins, en légende 13 : les parents en 400 ink-600, la page courante en 600 ink-900 (`aria-current`), des chevrons de 14. Un bouton Retour de 44 px sous 640 px, un bouton Accueil au-delà.",
    keywords: ['breadcrumb', 'auto', 'location', 'path', 'navigation', 'back', 'layout', 'route'],
    render: () => (
      <div className="flex flex-col gap-stack-xs p-stack bg-ink-50 rounded-xl border border-ink-200">
        <p className="text-caption text-ink-600 italic">Simulation, par Breadcrumb : le vrai fil se lit sur toute page à deux segments ou plus (/learning-paths/1, /veille/article/1).</p>
        {/* La maquette faite main posait un séparateur ink-300 (1,39:1) et un lien en 500. */}
        <Breadcrumb items={[{ label: 'Parcours', href: '#' }, { label: 'Prompt engineering avancé' }]} />
      </div>
    ),
  },
  {
    name: 'AccountFamilyNav',
    codeName: 'patterns/AccountFamilyNav.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['Profile', 'Account', 'Billing'],
    description: "La navigation des pages du compte : cinq destinations — Profil, Mon compte, Confidentialité, Notifications, Facturation —, chacune avec sa pastille d'icône (IconChip sm), son libellé 16/600 et une description en 13 ink-600. La grille compte ses colonnes sur sa propre largeur (requête de conteneur) : une, deux dès 448 px, trois dès 672 px. L'onglet actif est blanc sur le rail ink-50.",
    keywords: ['account', 'compte', 'profile', 'settings', 'nav', 'sub-navigation', 'billing', 'confidentialité', 'notifications', 'container query'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <AccountFamilyNav active="profile" />
        {/* AccountFamilyPage = profile | account | privacy | notifications | billing */}
        <AccountFamilyNav active="billing" />
      </div>
    ),
  },
  {
    name: 'Pagination',
    codeName: 'Pagination.tsx',
    cssBase: '.pager / .pager__dots / .pager-info',
    showcaseOnly: false,
    usedBy: ['Leaderboard'],
    description: "Navigation numérotée des longues listes : boutons de 44 × 44 au rayon 14, chiffres 16/600 tabulaires, page courante en dégradé 700 → 800 à chiffre blanc. Troncature automatique autour de la page (`siblings`), précédent et suivant, et une information optionnelle en légende 13 ink-600.",
    keywords: ['pagination', 'pages', 'nav', 'numbered', 'prev', 'next'],
    render: () => <PaginationDemo />,
  },
  {
    name: 'DropdownMenu',
    codeName: 'ui/DropdownMenu.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['App (Sidebar user menu)'],
    description: "Menu d'actions ou de navigation contextuelle. Deux variantes : solid (filet et ombre) ou glass (flou, anneau, ombre de marque). DropdownItem : rangée de 44 px, libellé 16/400 ink-900, icône de 18, raccourci clavier, badge demo · pro · new · beta, état danger. DropdownLabel : titre de groupe en 13/600 ink-600, casse normale. DropdownSeparator. Le consommateur gère l'ouverture, la position et le clic extérieur ; le menu prend le focus à l'ouverture (`autoFocus`) et le rend au déclencheur (`returnFocusTo`). C'est le menu du compte, dans la Sidebar.",
    keywords: ['dropdown', 'menu', 'actions', 'navigation', 'user-menu', 'popover', 'glass', 'a11y'],
    render: () => (
      <div className="flex flex-wrap gap-section items-start">
        {/* Variant solid — actions context menu */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600 m-0">Solid · menu d'actions</p>
          {/* autoFocus={false} : cette démo est rendue OUVERTE en permanence. Avec le
    défaut du composant (autoFocus), elle prend le focus au montage et le
    navigateur scrolle pour l'amener à l'écran — la catégorie Navigation
    s'ouvrait donc à 1477 px au lieu du haut de page. */}
            <DropdownMenu variant="solid" autoFocus={false} style={{ position: 'static' }}>
            <DropdownLabel>Actions</DropdownLabel>
            <DropdownItem icon={I.edit} shortcut="⌘E">Modifier</DropdownItem>
            <DropdownItem icon={I.arrow}>Partager</DropdownItem>
            <DropdownItem icon={I.book}>Dupliquer</DropdownItem>
            <DropdownSeparator />
            <DropdownItem icon={I.trash} danger>Supprimer</DropdownItem>
          </DropdownMenu>
        </div>

        {/* Variant glass — user menu (vrai pattern utilisé dans Sidebar) */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600 m-0">Glass · menu du compte (Sidebar)</p>
          <div className="relative bg-gradient-to-br from-primary-50 to-primary-100/40 p-section rounded-2xl">
            <DropdownMenu variant="glass" autoFocus={false} style={{ position: 'static', minWidth: 260 }}>
              <DropdownItem icon={<UserIcon size={16} />}>Mon Profil</DropdownItem>
              <DropdownItem icon={<Settings2 size={16} />}>Paramètres</DropdownItem>
              <DropdownItem icon={<Bell size={16} />}>Notifications</DropdownItem>
              <DropdownItem icon={<Target size={16} />} badge="demo">Positionnement</DropdownItem>
              <DropdownItem icon={<BarChart3 size={16} />} badge="pro">Espace Entreprise</DropdownItem>
              <DropdownSeparator />
              <DropdownLabel>Communauté</DropdownLabel>
              <DropdownItem icon={<Trophy size={16} />}>Leaderboard</DropdownItem>
              <DropdownItem icon={<Users size={16} />}>Collaboration</DropdownItem>
              <DropdownItem icon={<MessageSquare size={16} />}>Messages</DropdownItem>
              <DropdownSeparator />
              <DropdownItem icon={<LogOut size={16} />} danger>Déconnexion</DropdownItem>
            </DropdownMenu>
          </div>
        </div>
      </div>
    ),
  },

  /* ---- CONTENT (additional) --------------------------------------------- */
  {
    name: 'MetaPill',
    codeName: 'MetaPill.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "La donnée qui chuchote : 11 px en 500, casse normale — le registre opposé à Badge. Taille par défaut sm (24 px) ; md 30 px en 13, lg 44 px en 16. Dix tons : neutral (et son alias déprécié default), primary, warm, sun, brand, success, danger, info, glass, glass-dark. Avec `onClick`, elle rend un vrai `<button>`. Une catégorie ou un type de contenu est une donnée : MetaPill, jamais Badge (arbitrages n°14-15).",
    keywords: ['pill', 'meta', 'chip', 'tag', 'tone', 'primary', 'warm', 'sun', 'brand', 'success', 'danger', 'info'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div className="hstack flex-wrap">
          <MetaPill text="Neutral" tone="neutral" />
          <MetaPill text="Primary" tone="primary" />
          <MetaPill text="Warm" tone="warm" />
          <MetaPill text="Sun" tone="sun" />
          <MetaPill text="Brand" tone="brand" />
        </div>
        <div className="hstack flex-wrap">
          <MetaPill text="Succès" tone="success" />
          <MetaPill text="Danger" tone="danger" />
          <MetaPill text="Info" tone="info" />
        </div>
        <div className="hstack flex-wrap">
          <MetaPill text="sm · 24 px" size="sm" tone="primary" />
          <MetaPill text="md · 30 px" size="md" tone="primary" />
          <MetaPill text="lg · 44 px" size="lg" tone="primary" />
          <MetaPill text="Cliquable" tone="warm" onClick={() => {}} />
        </div>
      </div>
    ),
  },
  {
    name: 'MetaItem',
    codeName: 'MetaItem.tsx',
    cssBase: '.tls-meta-item / .tls-meta-item--sm / .tls-meta-item--brand/warm',
    showcaseOnly: true,
    description: "Paire étiquette / valeur d'une donnée structurée : l'étiquette en légende 13 ink-600 au-dessus, 4 px, puis la valeur en 600 — 13 en sm, 16 en md —, ink-900 ou au cran 800 du ton (brand, warm). Icône optionnelle dans l'étiquette.",
    keywords: ['meta', 'item', 'label', 'value', 'pair', 'data', 'detail', 'size', 'tone'],
    render: () => (
      <div className="vstack max-w-[360px]">
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
    showcaseOnly: true,
    description: "Bloc identité compact : avatar, nom, rôle, point de statut optionnel. Nom en 16/600 ink-900 (sm, md) ou en titre 20/700 (lg) ; rôle en légende 13 ink-600 (16 en lg) ; avatar de 32 · 40 · 56 px. Statuts online · offline · away.",
    keywords: ['user', 'info', 'avatar', 'name', 'role', 'identity', 'author', 'status', 'online'],
    render: () => (
      <div className="vstack max-w-[320px]">
        <UserInfo name="Jeanne Dupont" role="Apprenante" size="sm" status="online" />
        <UserInfo name="Sophie Martin" role="Coach certifiée" size="md" status="away" />
        <UserInfo name="Ahmed Ali" role="Formateur" size="lg" status="offline" />
      </div>
    ),
  },
  {
    name: 'ProfileCard',
    codeName: 'ui/ProfileCard.tsx',
    cssBase: 'Tailwind (no BEM) — Avatar + MetaPillGroup + Button',
    usedBy: ['Coaching'],
    description: "Carte de profil (coach, expert) : Avatar xl, nom en titre h3 20, rôle en légende 13 ink-600, note (étoiles, valeur 13/600), spécialités en MetaPillGroup sm, contacts, bio 16 ink-700 alignée à gauche, action en Button soft. Variantes default · compact · featured (filet 2 px du ton) · horizontal, trois tons, alignement centré ou à gauche.",
    keywords: ['profile', 'card', 'user', 'coach', 'avatar', 'rating', 'specialties', 'tone', 'featured', 'a11y'],
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
        {/* Featured primary — Coaching look */}
        <ProfileCard
          variant="featured"
          tone="primary"
          align="center"
          initials="SM"
          name="Sophie Martin"
          role="Expert IA & Pédagogie"
          avatarBadge={<Star size={12} className="fill-white" />}
          specialties={['Prompt Engineering', 'IA Générative']}
          contacts={[
            { type: 'email', href: 'mailto:sophie@example.com', label: 'sophie@example.com' },
            { type: 'linkedin', href: 'https://linkedin.com/in/sophie', label: 'LinkedIn' },
          ]}
          bio="Spécialiste IA générative et design pédagogique. Accompagnement 1:1 orienté pratique."
          cta={{ label: 'Réserver une session', icon: <Calendar size={15} />, onClick: () => {} }}
        />
        {/* Default warm — alternative tone */}
        <ProfileCard
          tone="warm"
          align="center"
          initials="PB"
          name="Paul Bernard"
          role="Expert Communication"
          specialties={['Leadership', 'Storytelling']}
          contacts={[
            { type: 'email', href: 'mailto:paul@example.com', label: 'paul@example.com' },
          ]}
          bio="Coach en communication & leadership. 15 ans d'expérience en grandes entreprises."
          cta={{ label: 'Voir profil', onClick: () => {} }}
        />
        {/* Compact left-aligned — sidebar usage */}
        <ProfileCard
          variant="compact"
          tone="sun"
          align="left"
          initials="MC"
          name="Marie Cohen"
          role="Coach Carrière"
          specialties={['Reconversion', 'Mobilité interne']}
          cta={{ label: 'Contacter', onClick: () => {} }}
        />
      </div>
    ),
  },
  {
    name: 'IconFeatureCard',
    codeName: 'ui/IconFeatureCard.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Tuile à icône, contenu centré : l'icône (plain · filled · bubble), le titre, une description optionnelle. L'échelle des titres suit `iconSize` : xs et sm → 16/700 en League Spartan, md, lg et xl → h3 20/700 ; description 16 ink-700. Tons brand · warm · sun × surfaces card · tinted · glass · frosted ; `square` pour une tuile carrée ; `onClick` en fait un bouton. À partir de quatre tuiles, la poser dans `<CardGrid layout=\"square-tiles\">`.",
    keywords: ['feature', 'icon', 'card', 'tile', 'button', 'plain', 'filled', 'bubble', 'tone', 'quick action', 'shortcut', 'glass', 'frosted', 'tinted', 'surface', 'square', 'responsive', 'centered'],
    render: () => (
      <div className="flex flex-col gap-section">

        {/* ─── Usage canonique : CardGrid square-tiles + iconSize md (default) ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-semibold text-ink-600 m-0">Le motif canonique · <code className="text-caption bg-ink-50 px-1.5 py-0.5 rounded">&lt;CardGrid layout="square-tiles"&gt;</code> · iconSize md (défaut · 32 px)</p>
          <CardGrid layout="square-tiles" gapSize="md">
            <IconFeatureCard square tone="brand" iconStyle="plain" icon={<MessageSquare size={32} strokeWidth={1.75} />} title="Coaching" onClick={() => {}} />
            <IconFeatureCard square tone="warm" iconStyle="plain" icon={<MapIcon size={32} strokeWidth={1.75} />} title="Parcours" onClick={() => {}} />
            <IconFeatureCard square tone="sun" iconStyle="plain" icon={<PenLine size={32} strokeWidth={1.75} />} title="Journal" onClick={() => {}} />
            <IconFeatureCard square tone="brand" iconStyle="plain" icon={<BookOpenText size={32} strokeWidth={1.75} />} title="Veille" onClick={() => {}} />
          </CardGrid>
        </div>

        {/* ─── Version sm (compact tiles) ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-semibold text-ink-600 m-0">Variante compacte · iconSize sm (24 px) — pour les zones denses</p>
          <CardGrid layout="square-tiles" gapSize="md">
            <IconFeatureCard square tone="brand" iconStyle="plain" iconSize="sm" icon={<MessageSquare size={24} strokeWidth={1.75} />} title="Coaching" onClick={() => {}} />
            <IconFeatureCard square tone="warm" iconStyle="plain" iconSize="sm" icon={<MapIcon size={24} strokeWidth={1.75} />} title="Parcours" onClick={() => {}} />
            <IconFeatureCard square tone="sun" iconStyle="plain" iconSize="sm" icon={<PenLine size={24} strokeWidth={1.75} />} title="Journal" onClick={() => {}} />
            <IconFeatureCard square tone="brand" iconStyle="plain" iconSize="sm" icon={<BookOpenText size={24} strokeWidth={1.75} />} title="Veille" onClick={() => {}} />
          </CardGrid>
        </div>

        {/* ─── Avec description optionnelle ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-semibold text-ink-600 m-0">Avec description · md</p>
          <CardGrid layout="square-tiles" gapSize="md">
            <IconFeatureCard tone="brand" iconStyle="plain" icon={<MessageSquare size={32} strokeWidth={1.75} />} title="Coaching" description="Sessions 1:1 personnalisées" onClick={() => {}} />
            <IconFeatureCard tone="warm" iconStyle="plain" icon={<MapIcon size={32} strokeWidth={1.75} />} title="Parcours" description="Apprenez à votre rythme" onClick={() => {}} />
            <IconFeatureCard tone="sun" iconStyle="plain" icon={<PenLine size={32} strokeWidth={1.75} />} title="Journal" description="Notez vos réflexions" onClick={() => {}} />
            <IconFeatureCard tone="brand" iconStyle="plain" icon={<BookOpenText size={32} strokeWidth={1.75} />} title="Veille" description="Actualités choisies" onClick={() => {}} />
          </CardGrid>
        </div>

        {/* ─── iconStyle × tone (matrice compacte 3×3) ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-semibold text-ink-600 m-0">iconStyle (plain · filled · bubble) × ton (brand · warm · sun) · md</p>
          <div className="grid grid-cols-3 gap-stack">
            <IconFeatureCard square tone="brand" iconStyle="plain" icon={<MessageSquare size={32} strokeWidth={1.75} />} title="Plain · brand" onClick={() => {}} />
            <IconFeatureCard square tone="warm" iconStyle="filled" icon={<Flame size={32} />} title="Filled · warm" onClick={() => {}} />
            <IconFeatureCard square tone="sun" iconStyle="bubble" icon={<Star size={20} strokeWidth={1.75} />} title="Bubble · sun" onClick={() => {}} />
          </div>
        </div>

        {/* ─── iconSize ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-semibold text-ink-600 m-0">iconSize · xs 20 · sm 24 · md 32 (défaut) · lg 40 · xl 48 — le titre passe de 16 à 20 dès md</p>
          <div className="flex flex-wrap gap-stack items-start">
            <IconFeatureCard tone="brand" iconStyle="plain" iconSize="xs" icon={<MessageSquare size={20} strokeWidth={1.75} />} title="xs" onClick={() => {}} className="w-[100px]" />
            <IconFeatureCard tone="brand" iconStyle="plain" iconSize="sm" icon={<MessageSquare size={24} strokeWidth={1.75} />} title="sm" onClick={() => {}} className="w-[120px]" />
            <IconFeatureCard tone="brand" iconStyle="plain" iconSize="md" icon={<MessageSquare size={32} strokeWidth={1.75} />} title="md" onClick={() => {}} className="w-[140px]" />
            <IconFeatureCard tone="brand" iconStyle="plain" iconSize="lg" icon={<MessageSquare size={40} strokeWidth={1.75} />} title="lg" onClick={() => {}} className="w-[160px]" />
            <IconFeatureCard tone="brand" iconStyle="plain" iconSize="xl" icon={<MessageSquare size={48} strokeWidth={1.75} />} title="xl" onClick={() => {}} className="w-[180px]" />
          </div>
        </div>

        {/* ─── surface (4 variants) ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-semibold text-ink-600 m-0">surface · card / tinted / glass / frosted</p>
          {/* card + tinted sur fond clair */}
          <div className="flex flex-wrap gap-stack">
            <IconFeatureCard square surface="card" tone="brand" iconStyle="plain" iconSize="md" icon={<MessageSquare size={32} strokeWidth={1.75} />} title="card" onClick={() => {}} className="w-[140px]" />
            <IconFeatureCard square surface="tinted" tone="warm" iconStyle="bubble" iconSize="md" icon={<MapIcon size={22} strokeWidth={1.75} />} title="tinted" onClick={() => {}} className="w-[140px]" />
          </div>
          {/* glass + frosted sur fond gradient */}
          <div className="rounded-2xl bg-gradient-to-br from-primary-700 via-primary-800 to-secondary-700 p-stack-lg">
            <div className="flex flex-wrap gap-stack">
              <IconFeatureCard square surface="glass" tone="brand" iconStyle="plain" iconSize="md" icon={<Layers size={32} strokeWidth={1.75} />} title="glass" onClick={() => {}} className="w-[140px]" />
              <IconFeatureCard square surface="frosted" tone="sun" iconStyle="plain" iconSize="md" icon={<Star size={32} strokeWidth={1.75} />} title="frosted" onClick={() => {}} className="w-[140px]" />
            </div>
          </div>
        </div>

        {/* ─── description optionnelle (sans / avec) ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-semibold text-ink-600 m-0">description optionnelle — sans, une tuile ; avec, une carte</p>
          <div className="flex flex-wrap gap-stack items-start">
            <IconFeatureCard square tone="warm" iconStyle="plain" iconSize="md" icon={<Trophy size={32} strokeWidth={1.75} />} title="Sans desc" onClick={() => {}} className="w-[140px]" />
            <IconFeatureCard tone="warm" iconStyle="plain" iconSize="md" icon={<Trophy size={32} strokeWidth={1.75} />} title="Avec desc" description="12 badges cette année" onClick={() => {}} className="w-[180px]" />
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'ParcoursCard',
    codeName: 'patterns/ParcoursCard.tsx',
    cssBase: 'Tailwind (no BEM) — Card variant="tinted" tone={tone}',
    usedBy: ['LearningPaths', 'Dashboard'],
    description: "Carte de parcours pour les catalogues : surface teintée (Card tinted) ou `outline`, trois tons. Titre h3 20 ink-900, 8 px, durée et leçons en MetaPillGroup sm, 12 px, description 16 ink-700 sur cinq lignes au plus ; en bas de carte, la progression (InlineProgress md) puis l'action de 44 px, libellé 16/700 selon l'état. Rayon 20, padding 24 ; halo radial au survol, sans soulèvement.",
    keywords: ['parcours', 'learning path', 'progress', 'tinted', 'tone', 'cta', 'glass', 'glow', 'hover', 'a11y'],
    render: () => (
      <CardGrid layout="default" gapSize="lg">
        <ParcoursCard
          id="1"
          title="Fondamentaux du Leadership"
          description="Apprenez les principes essentiels du leadership moderne et développez vos compétences de management."
          progress={65}
          status="en cours"
          tone="primary"
          lessons={12}
          duration="6 semaines"
          onClick={() => {}}
        />
        <ParcoursCard
          id="2"
          title="Maîtrise du Prompt Engineering"
          description="Devenez expert en IA générative et optimisation des prompts pour l'entreprise."
          progress={0}
          status="non commencé"
          tone="warm"
          lessons={8}
          duration="4 semaines"
          onClick={() => {}}
        />
        <ParcoursCard
          id="3"
          title="Communication Stratégique"
          description="Maîtrisez l'art de la communication d'impact pour influencer et fédérer vos équipes."
          progress={100}
          status="complété"
          tone="sun"
          lessons={10}
          duration="5 semaines"
          onClick={() => {}}
        />
      </CardGrid>
    ),
  },
  {
    name: 'SessionCard',
    codeName: 'learning/SessionCard.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['Coaching', 'Dashboard'],
    description: "Carte de session de coaching, planifiée ou terminée. État en Badge (« Planifiée », « Terminée »), date en légende 13, titre h3 20, le coach (Avatar sm, nom 16/600, rôle 13), description 16 ink-700 sur deux lignes ; sous un filet, les actions (questionnaire, compte rendu, note) et un Button soft sm. Rayon 20, padding 24. Surfaces card · tinted · glass · frosted · outline, trois tons ; une session terminée reste blanche.",
    keywords: ['session', 'coaching', 'meeting', 'past', 'planned', 'surface', 'tinted', 'glass', 'frosted'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <p className="text-caption font-semibold text-ink-600 m-0">Surfaces · card (default) / tinted primary / tinted warm</p>
        <div className="flex flex-col gap-stack">
          <SessionCard
            title="Stratégie d'implémentation IA"
            coachName="Sophie Martin"
            description="Intégration IA dans vos parcours et priorisation des cas d'usage."
            dateLabel="8 décembre 2025"
            status="completed"
            questionnaire={true}
            report={true}
            onViewQuestionnaire={() => {}}
            onViewReport={() => {}}
            onAddNote={() => {}}
          />
          <SessionCard
            surface="tinted"
            tone="primary"
            title="Prochaine session de coaching"
            coachName="Sophie Martin"
            description="Approfondissement ROLE-CONTEXT-TASK avec vos cas réels."
            dateLabel="30 avril 2026"
            status="planned"
            onOpen={() => {}}
          />
          <SessionCard
            surface="tinted"
            tone="warm"
            title="Introduction au prompt engineering"
            coachName="Sophie Martin"
            description="Fondamentaux et structuration des demandes."
            dateLabel="15 décembre 2025"
            status="completed"
            questionnaire={true}
            report={true}
            journal={true}
            onViewQuestionnaire={() => {}}
            onViewReport={() => {}}
            onAddNote={() => {}}
          />
        </div>

        <p className="text-caption font-semibold text-ink-600 m-0 mt-stack">Surfaces · glass / frosted (sur fond coloré pour visualiser le blur)</p>
        <div className="rounded-2xl bg-gradient-to-br from-primary-700 via-primary-800 to-secondary-700 p-stack-lg flex flex-col gap-stack">
          <SessionCard
            surface="glass"
            title="Session glass"
            coachName="Sophie Martin"
            description="Overlay translucide sur fond coloré (hero, gradient page)."
            dateLabel="30 avril 2026"
            status="planned"
            onOpen={() => {}}
          />
          <SessionCard
            surface="frosted"
            title="Session frosted"
            coachName="Sophie Martin"
            description="Overlay plus prononcé (cover image, blob ambient)."
            dateLabel="22 avril 2026"
            status="planned"
            onOpen={() => {}}
          />
        </div>
      </div>
    ),
  },
  {
    name: 'ResourceCard',
    codeName: 'ResourceCard.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Carte de ressource : icône et type (MetaPill sm), titre h3 20, description 16 ink-700, puis sous un filet la catégorie (MetaPill) et la durée (13 ink-600), avec l'action. Rayon 20, padding 24 (20 en `minimal`) ; `badge` pose un vrai Badge en haut à droite ; `href` en fait un lien. Tons primary · warm · sun. Pour les ressources complémentaires d'une fin d'étape.",
    keywords: ['resource', 'card', 'document', 'article', 'tutorial', 'link', 'badge', 'tone', 'complementary', 'learning-path'],
    render: () => (
      <div className="grid-2">
        <ResourceCard
          resourceType="Tutoriel"
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
          resourceType="Dossier"
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
    description: "Tableau de compétences sur cinq niveaux : en-têtes 13/600 ink-600 avec une icône par niveau, noms 16/600 ink-900, cellules rondes de 40 px au filet 2 px, pleines au cran 700 une fois le niveau atteint. Couleur par compétence ; `maxLevel`, `labels` (en anglais par défaut, à traduire), `onSkillHover`.",
    keywords: ['competency', 'matrix', 'skills', 'levels', 'table', 'assessment'],
    render: () => (
      /* Les libellés par défaut sont en anglais (Beginner, Intermediate…) :
         la démo passe les niveaux canoniques du Passeport. */
      <CompetencyMatrix
        labels={['', 'Novice', 'Apprenant', 'Compétent', 'Expert', 'Maître']}
        skills={[
          { name: 'Prompt Engineering', level: 4 },
          { name: 'Leadership', level: 3, color: 'warm' },
          { name: 'IA Générative', level: 5 },
          { name: 'Communication', level: 2, color: 'sun' },
        ]}
      />
    ),
  },
  {
    name: 'GoalProgress',
    codeName: 'GoalProgress.tsx',
    cssBase: 'GoalProgress (inline styles)',
    description: "Suivi d'un objectif : l'objectif en 16/600, une piste de 6 ou 8 px, puis « n % complété » et le temps restant (13 en sm, 16 en md), et un message en 13 si l'objectif est en retard ou atteint. Tons primary · warm · success · danger — forcé à danger en retard, à success à 100 %.",
    keywords: ['goal', 'progress', 'target', 'deadline', 'on-track', 'learning'],
    usedBy: ['Passeport', 'PasseportObjectifs'],
    render: () => (
      <div className="flex flex-col gap-stack">
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
    description: "Quiz à plusieurs questions : « Question n sur N » et pourcentage en 13/600, barre de 6 px, question en h3 20, options en rangées de 16, degré de confiance après chaque réponse (`askConfidence`) ; à la fin, le score en `stat-value` et une phrase en 16 ink-700.",
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
    name: 'ActivityFeed',
    codeName: 'patterns/ActivityFeed.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Fil d'activité chronologique : icônes Lucide par type, acteur en Avatar, trois dispositions — timeline, list (des rangées dans UNE carte, la disposition d'un fil, arbitrage n°5) et cards, gardée pour compatibilité. Titre 16/600 et heure 13 sur la ligne de base, description 16 ink-700 ; regroupement par date (libellé 13/600), état vide, « Voir plus ».",
    keywords: ['activity', 'feed', 'timeline', 'history', 'events', 'chronological', 'notification'],
    render: () => {
      const items = [
        { id: '1', type: 'complete' as const, title: 'Leçon terminée', description: 'Module 3 — Prompt Engineering avancé', timestamp: new Date(Date.now() - 7200000) },
        { id: '2', type: 'achievement' as const, title: 'Badge débloqué', description: 'Pionnier IA — Premier badge obtenu', timestamp: new Date(Date.now() - 86400000) },
        { id: '3', type: 'feedback' as const, title: 'Feedback reçu', description: 'Sophie Martin a commenté votre session', timestamp: new Date(Date.now() - 172800000), actor: { name: 'Sophie Martin' }, actionLabel: 'Voir', onActionClick: () => {} },
        { id: '4', type: 'progress' as const, title: 'Objectif atteint', description: '5 leçons complétées cette semaine', timestamp: new Date(Date.now() - 86400000 * 5) },
        { id: '5', type: 'start' as const, title: 'Nouveau parcours commencé', description: 'Leadership & Communication', timestamp: new Date(Date.now() - 86400000 * 10) },
      ];
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
          <div>
            <p className="text-caption font-semibold text-ink-600 mb-3">timeline, groupée par date</p>
            <ActivityFeed items={items} layout="timeline" groupByDate />
          </div>
          <div>
            <p className="text-caption font-semibold text-ink-600 mb-3">list — des rangées dans une carte</p>
            <ActivityFeed items={items.slice(0, 3)} layout="list" />
          </div>
        </div>
      );
    },
  },

  {
    name: 'ActivityTimeline',
    codeName: 'patterns/ActivityTimeline.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['Dashboard', 'Journal', 'Passeport', 'Coaching'],
    description: "Chronologie verticale : pastille ronde de 40 px au dégradé du ton (ou point de 12 px sans icône) et connecteur ; titre 16/600 et date 13 ink-600 sur la ligne de base, description 16 ink-700, 24 px entre les étapes. Cinq tons, trois statuts (completed · pending · in-progress). Plus compacte qu'ActivityFeed, pour un historique linéaire.",
    keywords: ['timeline', 'activity', 'events', 'vertical', 'connector', 'tone', 'status', 'dot', 'chronological'],
    render: () => (
      <ActivityTimeline
        items={[
          { id: '1', title: 'Leçon terminée', description: 'Module 3 — Prompt Engineering avancé', timestamp: 'Il y a 2h', tone: 'primary', status: 'completed', icon: <CheckCircle2 size={16} /> },
          { id: '2', title: 'Session en cours', description: 'Coaching avec Sophie Martin', timestamp: 'Aujourd\'hui 14h', tone: 'warm', status: 'in-progress', icon: <MessageSquare size={16} /> },
          { id: '3', title: 'Badge débloqué', description: 'Pionnier IA — Premier badge obtenu', timestamp: 'Hier', tone: 'sun', status: 'completed', icon: <Star size={16} /> },
          { id: '4', title: 'Objectif à venir', description: 'Compléter 5 leçons cette semaine', timestamp: 'Dans 3 jours', tone: 'success', status: 'pending', icon: <Target size={16} /> },
        ]}
      />
    ),
  },

  /* ---- TIER 2 EDITORIAL ATOMS (Phase 10) --------------------------------- */
  {
    name: 'AuthorStrip',
    codeName: 'patterns/AuthorStrip.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['ArticleDetail (Tier 2)', 'MagazineArticle (Tier 2)', 'JournalDetail (Tier 2)', 'EditorialQuoteCallout signature'],
    description: "La signature d'un contenu éditorial : avatar, nom 16/600 ink-900 et, en compact, le rôle sur la même ligne (« · Rôle », 13 ink-600) ; dessous, à 2 px, la méta en 13 ink-600 — date, durée — séparée par « · ». `expanded` passe le rôle sur sa propre ligne, avec un avatar plus grand.",
    keywords: ['author', 'byline', 'meta', 'avatar', 'editorial', 'article', 'strip'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        <div>
          <p className="text-caption font-semibold text-ink-600 mb-3">compact, le défaut</p>
          <AuthorStrip
            name="Marie Dubois"
            role="Senior Editor TLS"
            meta={[
              { icon: <Calendar size={14} />, text: '12 mai 2026' },
              { icon: <Clock3 size={14} />,    text: '6 min de lecture' },
            ]}
          />
        </div>
        <div>
          <p className="text-caption font-semibold text-ink-600 mb-3">expanded</p>
          <AuthorStrip
            variant="expanded"
            name="Pierre Leclerc"
            role="Lead Pédagogie · The Learning Society"
            meta={[
              { icon: <Calendar size={14} />, text: '8 mai 2026' },
              { icon: <Clock3 size={14} />,    text: '12 min de lecture' },
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    name: 'IntroCallout',
    codeName: 'patterns/IntroCallout.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['ArticleDetail (Tier 2)', 'MagazineArticle (Tier 2)', 'Dossier (Tier 2)'],
    description: "Le chapô d'un article long, en encart sous le hero : surtitre optionnel 13/600 ink-600, 8 px, texte au chapô 18/28 ink-900 à la largeur de lecture ; en option, une pastille ronde de 40 px avec un guillemet (`withQuoteIcon`). Rayon 14, padding 20 puis 24. Quatre tons (brand · warm · sun · neutral). La barre d'accent à gauche a été retirée le 24/09.",
    keywords: ['intro', 'callout', 'lead', 'paragraph', 'editorial', 'thesis', 'glass'],
    render: () => (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
        <IntroCallout tone="brand" eyebrow="Thèse de l'article">
          L'IA générative redessine en profondeur les modalités d'apprentissage en entreprise. Notre analyse de 47 cas concrets révèle 3 patterns émergents — et 2 impasses à éviter.
        </IntroCallout>
        <IntroCallout tone="warm" withQuoteIcon>
          Cette semaine, on questionne la "personnalisation à grande échelle" : est-elle vraiment compatible avec la cohésion d'équipe et la culture commune ?
        </IntroCallout>
        <IntroCallout tone="sun">
          Tutoriel pas-à-pas : la méthode CRISP pour structurer vos prompts en 5 étapes. À pratiquer sur 3 cas d'usage métier.
        </IntroCallout>
        <IntroCallout tone="neutral" eyebrow="Note méthodologique">
          Les données présentées s'appuient sur 4 mois d'observation terrain (mars-juin 2026). Méthodologie complète en annexe.
        </IntroCallout>
      </div>
    ),
  },
  {
    name: 'KeyFindingCard',
    codeName: 'patterns/KeyFindingCard.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['Dossier (Tier 2)', 'MagazineArticle (Tier 2)'],
    description: "Point clé d'un dossier : pastille d'icône de 48 px, titre h3 20, un chiffre au pas h2 (28, au cran 800) avec sa légende 13, et une description 16 ink-700. Disposition horizontale — le texte se cale sur la première ligne de la pastille — ou empilée ; cinq tons ; surface en verre.",
    keywords: ['key', 'finding', 'insight', 'data', 'metric', 'glass', 'icon-bubble'],
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
        <KeyFindingCard
          tone="brand"
          icon={<Target size={20} />}
          title="Adoption massive"
          metric={{ value: '78 %', label: 'des entreprises CAC40' }}
          description="Le microlearning est désormais standard dans les grands groupes."
        />
        <KeyFindingCard
          tone="warm"
          icon={<TrendingUp size={20} />}
          title="Croissance accélérée"
          metric={{ value: '+340 %', label: 'd\'utilisation IA' }}
          description="Versus la même période l'an dernier."
        />
        <KeyFindingCard
          tone="sun"
          icon={<Trophy size={20} />}
          title="Top engagement"
          description="Les apprenants utilisant l'IA-coach sont 2,4× plus actifs sur le long terme."
        />
        <KeyFindingCard
          tone="success"
          icon={<CheckCircle2 size={20} />}
          title="ROI démontré"
          metric={{ value: '4,2×', label: 'investissement initial' }}
          description="Sur un horizon 18 mois."
        />
      </div>
    ),
  },
  {
    name: 'EditorialQuoteCallout',
    codeName: 'patterns/EditorialQuoteCallout.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['WeeklyNewsletter édito (Tier 2)', 'Magazine foreword (Tier 2)', 'Dossier intro thèse (Tier 2)'],
    description: "Citation éditoriale signée (édito hebdomadaire, avant-propos, thèse d'un dossier) : pastille de 56 puis 64 px avec un guillemet de 28, surtitre 13/600 ink-600, 16 px, citation en Nunito italique 18/28 ink-900 à la largeur de lecture, sur plusieurs paragraphes, 16 px, signature par AuthorStrip. Padding 24, 32 puis 40 selon la largeur.",
    keywords: ['quote', 'editorial', 'callout', 'foreword', 'intro', 'italic', 'signature'],
    render: () => (
      <EditorialQuoteCallout
        tone="brand"
        eyebrow="Édito de la semaine"
        signature={{ name: 'Claire Martin', role: 'Rédactrice en chef TLS' }}
      >
        <p>L'IA générative redessine la pédagogie en profondeur — pas seulement les outils, mais les rythmes, les rôles, les rituels.</p>
        <p>Cette semaine, on a choisi 5 articles qui montrent concrètement ce qui change en formation pro. Pas de futurologie : du terrain, des chiffres, des décisions à prendre maintenant.</p>
      </EditorialQuoteCallout>
    ),
  },
  {
    name: 'ReadingProgress',
    codeName: 'patterns/ReadingProgress.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['ArticleDetail (Tier 2)', 'MagazineArticle (Tier 2)', 'Dossier (Tier 2)', 'LessonPlayer (futur)'],
    description: "Deux indicateurs pilotés par `useReadingProgress(ref?)`, de 0 à 100. ReadingProgressBar : un filet en haut de fenêtre (`fixed`), au dégradé du ton, de 2 px par défaut. ReadingProgressRing : un anneau de 44 px par défaut (trait de 3) ; le pourcentage — 13/600 tabulaire au cran 800 — ne s'écrit qu'à partir de 44 px, et les pages l'emploient à 32 : la valeur n'y est donnée qu'aux lecteurs d'écran. Quatre tons.",
    keywords: ['reading', 'progress', 'scroll', 'indicator', 'bar', 'ring', 'circular', 'article'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        <div>
          <p className="text-caption font-semibold text-ink-600 mb-3">ReadingProgressBar — trois tons, posés dans la page pour la démo</p>
          <div className="flex flex-col gap-stack-xs">
            <div className="relative h-6 bg-ink-50 rounded-md overflow-hidden">
              <ReadingProgressBar tone="brand" fixed={false} height={6} className="absolute inset-0" />
            </div>
            <div className="relative h-6 bg-ink-50 rounded-md overflow-hidden">
              <ReadingProgressBar tone="warm" fixed={false} height={6} className="absolute inset-0" />
            </div>
            <div className="relative h-6 bg-ink-50 rounded-md overflow-hidden">
              <ReadingProgressBar tone="sun" fixed={false} height={6} className="absolute inset-0" />
            </div>
          </div>
          <p className="text-caption text-ink-600 mt-stack-xs">En usage normal, `fixed` (le défaut) ancre la barre en haut de la fenêtre.</p>
        </div>
        <div>
          <p className="text-caption font-semibold text-ink-600 mb-3">ReadingProgressRing — quatre tons à 44 px, puis 56 px</p>
          <div className="flex items-center gap-stack-lg">
            <ReadingProgressRing tone="brand" />
            <ReadingProgressRing tone="warm" />
            <ReadingProgressRing tone="sun" />
            <ReadingProgressRing tone="neutral" />
            <ReadingProgressRing tone="brand" size={56} />
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'TableOfContents',
    codeName: 'patterns/TableOfContents.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['Dossier (Tier 2)', 'LessonPlayer (futur)'],
    description: "Sommaire d'un long contenu, qui suit le défilement (IntersectionObserver) : titre 13/600 ink-600, entrées de 44 px en 16 ink-600 numérotées (« 01 », 13/600 tabulaire) ; l'entrée active passe sur le fond du ton au cran 50, libellé 800 en 600 ; une étape terminée prend une coche. Défilement doux au clic, avec un décalage réglable (`scrollOffset`). Quatre tons ; c'est la page qui le rend collant.",
    keywords: ['toc', 'table-of-contents', 'sommaire', 'navigation', 'sticky', 'scroll-spy', 'sidebar'],
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
        <div>
          <p className="text-caption font-semibold text-ink-600 mb-3">Ton warm</p>
          <TableOfContents
            tone="warm"
            items={[
              { id: 'demo-intro',      label: 'Introduction',           completed: true },
              { id: 'demo-method',     label: 'Méthodologie',           completed: true },
              { id: 'demo-results',    label: 'Résultats clés' },
              { id: 'demo-analysis',   label: 'Analyse et discussion' },
              { id: 'demo-conclusion', label: 'Conclusion & recommandations' },
            ]}
          />
        </div>
        <div>
          <p className="text-caption font-semibold text-ink-600 mb-3">Ton brand (le défaut), titre remplacé</p>
          <TableOfContents
            tone="brand"
            title="Chapitres"
            items={[
              { id: 'demo-c1', label: 'Chapitre 1 — Les fondamentaux' },
              { id: 'demo-c2', label: 'Chapitre 2 — Cas d\'usage' },
              { id: 'demo-c3', label: 'Chapitre 3 — Mise en pratique' },
            ]}
          />
        </div>
      </div>
    ),
  },

  /* ---- FILTER BAR (refactored Tailwind) ----------------------------------- */
  {
    name: 'FilterBar',
    codeName: 'forms/FilterBar.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['LearningPaths (glass variant in hero Search)', 'Veille (filter type drawer)', 'Recherche (4 types sticky)', 'Notifications (à venir)', 'Listings n-1 (Actus/Tutoriels/Dossiers à venir)'],
    description: "Barre de filtres en pastilles, pour une barre d'outils (dans le `filtersSlot` de Search) ou entre un hero et une liste : choix multiple ou unique, compteurs, « Tout effacer », quatre tons, variantes solid · glass · glass-inverse, surfaces tinted · plain, tailles sm et md. ⚠️ Hors de la passe du 24/09 : son libellé et son bouton « Effacer » sont encore en 11/700 capitales.",
    keywords: ['filter', 'pills', 'chips', 'toolbar', 'multi-select', 'count', 'clear-all', 'glass'],
    render: () => {
      const FilterBarDemo: React.FC = () => {
        const [s1, setS1] = useState<string[]>(['all']);
        const [s2, setS2] = useState<string[]>(['unread', 'mention']);
        const [s3, setS3] = useState<string[]>([]);
        const [s4, setS4] = useState<string[]>(['en cours']);
        return (
          <div className="flex flex-col gap-stack-lg">
            <div>
              <p className="text-caption font-semibold text-ink-600 mb-3">Choix unique · brand · tinted · solid</p>
              <FilterBar
                surface="tinted"
                tone="brand"
                variant="solid"
                multiSelect={false}
                showClearAll={false}
                options={[
                  { id: 'all',      label: 'Tout',      count: 24 },
                  { id: 'actu',     label: 'Actus',     count: 8 },
                  { id: 'tutoriel', label: 'Tutoriels', count: 7 },
                  { id: 'dossier',  label: 'Dossiers',  count: 5 },
                  { id: 'magazine', label: 'Magazine',  count: 4 },
                ]}
                selected={s1}
                onChange={setS1}
              />
            </div>

            <div>
              <p className="text-caption font-semibold text-ink-600 mb-3">Choix multiple · warm · plain · avec icônes</p>
              <FilterBar
                tone="warm"
                label="Filtrer"
                options={[
                  { id: 'unread',   label: 'Non lus',   icon: <Bell size={11} />, count: 3 },
                  { id: 'mention',  label: 'Mentions',  icon: <MessageSquare size={11} /> },
                  { id: 'invite',   label: 'Invitations', icon: <Mail size={11} /> },
                  { id: 'archive',  label: 'Archives',  disabled: true },
                ]}
                selected={s2}
                onChange={setS2}
              />
            </div>

            <div>
              <p className="text-caption font-semibold text-ink-600 mb-3">Choix multiple · sun · taille sm</p>
              <FilterBar
                tone="sun"
                size="sm"
                options={[
                  { id: 'beg',    label: 'Débutant' },
                  { id: 'int',    label: 'Intermédiaire' },
                  { id: 'adv',    label: 'Avancé' },
                  { id: 'expert', label: 'Expert' },
                ]}
                selected={s3}
                onChange={setS3}
              />
            </div>

            <div className="rounded-xl p-stack-lg bg-gradient-to-r from-primary-700 to-primary-800">
              <p className="text-caption font-semibold text-white mb-3">Variante glass · sur un hero en dégradé</p>
              <FilterBar
                tone="brand"
                variant="glass"
                size="sm"
                options={[
                  { id: 'en cours',      label: 'En cours',      count: 3 },
                  { id: 'complété',      label: 'Terminés',     count: 1 },
                  { id: 'non commencé',  label: 'Pas commencés', count: 2 },
                ]}
                selected={s4}
                onChange={setS4}
              />
            </div>
          </div>
        );
      };
      return <FilterBarDemo />;
    },
  },

  /* ---- FEEDBACK & STATUS -------------------------------------------------- */
  {
    name: 'Spinner',
    codeName: 'ui/Spinner.tsx',
    cssBase: '.tls-spinner / .tls-spinner--{size} / .tls-spinner--{tone}',
    showcaseOnly: false,
    usedBy: ['Recherche'],
    description: "Indicateur de chargement : 20 · 32 · 48 px ; tons brand · warm · sun · muted · inverse ; `role=\"status\"`, et le libellé (« Chargement… » par défaut) reste réservé aux lecteurs d'écran. Dans la Recherche, en `trailing` du champ pendant l'attente.",
    keywords: ['spinner', 'loading', 'loader', 'indicator', 'async', 'wait'],
    render: () => (
      <div className="vstack gap-stack-lg">
        <div className="hstack items-center gap-stack-lg">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
        <div className="hstack items-center gap-stack-lg">
          <Spinner size="md" tone="brand" label="Chargement…" />
          <Spinner size="md" tone="warm" />
          <Spinner size="md" tone="muted" />
        </div>
      </div>
    ),
  },
  {
    name: 'NotificationBadge',
    codeName: 'ui/NotificationBadge.tsx',
    cssBase: '.notif-badge / .notif-badge--{tone}',
    showcaseOnly: true,
    description: "Compteur posé sur un enfant (icône, avatar) : pastille de 16 px en 11/700 tabulaire, blanc sur le cran 700 (ou danger-strong), liseré blanc. Tons danger · brand · warm ; « 99+ » au-delà de `max` (99) ; rien à zéro.",
    keywords: ['notification', 'badge', 'count', 'overlay', 'indicator', 'unread'],
    render: () => (
      <div className="hstack gap-section items-center flex-wrap">
        <NotificationBadge count={3} tone="danger"><Bell size={24} /></NotificationBadge>
        <NotificationBadge count={12} tone="brand"><MessageSquare size={24} /></NotificationBadge>
        <NotificationBadge count={99} tone="warm"><BookOpen size={24} /></NotificationBadge>
        <NotificationBadge count={150} max={99}><Bell size={24} /></NotificationBadge>
        <NotificationBadge count={0}><Bell size={24} /></NotificationBadge>
      </div>
    ),
  },

  /* ---- PATTERNS (nouveaux) ------------------------------------------------ */
  {
    name: 'SectionHeader',
    codeName: 'patterns/SectionHeader.tsx',
    cssBase: 'SectionHeader (canonical section heading)',
    usedBy: ['Dashboard', 'Journal', 'LearningPathDetail', 'et 94 autres pages (24/09)'],
    description: "L'en-tête de section canonique : titre, sous-titre, méta, action, pastille d'icône optionnelle. Le niveau se choisit par `as` (h2 par défaut, h3, h4), indépendamment de la taille. Tailles : md, le défaut, et lg → titre h2 28/36 ; sm et xs → titre h3 20/26. La pastille est un IconChip (arbitrage n°3) : 32 · 32 · 40 · 48 px de xs à lg, au rayon proportionnel, glyphe au cran 800 ; la première ligne du titre se centre sur elle. Sous-titre 16 ink-700 à la largeur de lecture et méta en légende 13 ink-600, chacun à 4 px. L'en-tête est une rangée qui se replie : le titre réclame 16rem à côté de l'action, sinon l'action passe dessous, à 8 px, calée à gauche — la règle mesure la place réelle, pas la fenêtre. Variantes default · minimal · underline ; cinq tons, `accent` rejoignant `sun`. `solid` est déprécié et rend la même pastille que default ; `iconClassName` est retiré, `compact` déprécié (= sm). Aucune marge extérieure : la page pose 48 px au-dessus et 16 en dessous.",
    keywords: ['section', 'header', 'titre', 'title', 'icon', 'IconChip', 'pastille', 'h2', 'h3', 'h4', 'as', 'meta', 'subtitle', 'action', 'wrap', 'replie', '16rem', 'divider', 'variants', 'sizes', 'solid', 'minimal', 'underline', 'canonical'],
    render: () => (
      <div className="flex flex-col gap-section">
        {/* Tailles : de lg à xs, pour que les niveaux ne sautent pas (h2, h2, h3, h3). */}
        <div className="flex flex-col gap-stack p-stack-md rounded-xl bg-ink-50/50 border border-ink-200">
          <p className="text-caption font-semibold text-ink-600">Quatre tailles · variante default · ton warm</p>
          <SectionHeader size="lg" tone="warm" icon={Calendar} title="lg · h2 28, pastille 48" />
          <SectionHeader size="md" tone="warm" icon={Calendar} title="md · h2 28, pastille 40 — le défaut" />
          <SectionHeader size="sm" tone="warm" icon={Calendar} title="sm · h3 20, pastille 32" as="h3" />
          <SectionHeader size="xs" tone="warm" icon={Calendar} title="xs · h3 20, pastille 32, serré" as="h3" />
        </div>

        {/* Variantes (taille md, ton primary) */}
        <div className="flex flex-col gap-stack p-stack-md rounded-xl bg-ink-50/50 border border-ink-200">
          <p className="text-caption font-semibold text-ink-600">Trois variantes · taille md · ton primary</p>
          <SectionHeader variant="default" icon={Calendar} title="default — la pastille IconChip" subtitle="Fond du ton au cran 50, glyphe au 800." />
          <SectionHeader variant="minimal" icon={Calendar} title="minimal — icône seule" subtitle="Sans pastille." />
          <SectionHeader variant="underline" icon={Calendar} title="underline — trait sous le titre" subtitle="Un trait du ton, sous la première ligne." />
        </div>

        {/* Tons (variante default, taille sm) */}
        <div className="flex flex-col gap-stack p-stack-md rounded-xl bg-ink-50/50 border border-ink-200">
          <p className="text-caption font-semibold text-ink-600">Cinq tons · variante default · taille sm</p>
          <SectionHeader size="sm" as="h3" variant="default" tone="primary" icon={Calendar} title="primary" />
          <SectionHeader size="sm" as="h3" variant="default" tone="warm" icon={Calendar} title="warm" />
          <SectionHeader size="sm" as="h3" variant="default" tone="sun" icon={Calendar} title="sun" />
          <SectionHeader size="sm" as="h3" variant="default" tone="accent" icon={Calendar} title="accent" />
          <SectionHeader size="sm" as="h3" variant="default" tone="neutral" icon={Calendar} title="neutral" />
        </div>

        {/* En situation : sous-titre, méta, action */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-semibold text-ink-600">En situation · sous-titre, méta et action</p>
          <SectionHeader
            icon={BookOpen}
            title="Mes parcours"
            subtitle="Ceux que tu as commencés, du plus récent au plus ancien."
            meta="3 en cours · 1 terminé"
            action={<Button emphasis="ghost" size="sm" trailingIcon={<ArrowRight />}>Voir tout</Button>}
          />
          <SectionHeader title="Sans icône, avec un filet" subtitle="La variante la plus sobre." divider />
        </div>

        {/* Le repli : la colonne ne laisse pas 16rem au titre à côté de
            l'action, qui passe dessous. Même composant, même props. */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-semibold text-ink-600">Dans une colonne de 320 px · l'action passe sous le titre</p>
          <div className="max-w-[320px]">
            <SectionHeader
              icon={BookOpen}
              title="Mes parcours"
              meta="3 en cours · 1 terminé"
              action={<Button emphasis="ghost" size="sm" trailingIcon={<ArrowRight />}>Voir tout</Button>}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'SkillBar',
    codeName: 'ui/SkillBar.tsx',
    cssBase: 'SkillBar (tokens inline)',
    description: "Barre d'une compétence : libellé 16/600 ink-900, valeur en League Spartan 16/700 tabulaire au cran 800 (« 95 % »), 8 px, piste de 8 px. Tons brand · warm · sun ; valeur masquable (`showValue`).",
    keywords: ['skill', 'bar', 'progress', 'competency', 'percentage', 'profile', 'level'],
    render: () => (
      <div className="vstack gap-stack-xs max-w-[480px]">
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
    cssBase: 'PageHeader (canonical page-level header)',
    usedBy: ['OnboardingQuestionnaire', 'OnboardingTutorial', 'OnboardingPreview', 'SubscriptionPayment'],
    description: "En-tête de page utilitaire, sans hero : surtitre 13/600 ink-600 avec son icône, 8 px, h1 36/44/700, 12 px, chapô 18/28 ink-700 à la largeur de lecture ; actions à droite, ou dessous en `align=\"center\"`. Aucune marge extérieure depuis le 24/09 (piège n°12) : l'espace sous lui appartient au parent — 48 px entre les blocs d'un PageShell, ou `gap-section` (32) quand l'en-tête et son contenu forment un bloc, comme dans l'onboarding. Il portait 40 px (32 en `tight`) qui s'ajoutaient au gap de la coque ; `variant` est déprécié et sans effet. Quatre écrans d'onboarding et de souscription l'emploient ; les pages principales ouvrent par PageHero.",
    keywords: ['page', 'header', 'eyebrow', 'title', 'description', 'actions', 'h1', 'align', 'center', 'marge', 'canonical'],
    render: () => (
      <div className="flex flex-col gap-page">
        {/* L'en-tête et son contenu forment un bloc : les 32 px viennent du
            parent (`gap-section`). Le composant n'en pose plus aucun. Entre
            les deux démos, 48 : plus loin que l'en-tête ne l'est de son contenu. */}
        <div className="flex flex-col gap-section">
          <PageHeader
            eyebrow={{ icon: <GraduationCap size={14} />, text: 'Mon parcours' }}
            title="Fondamentaux du Leadership"
            description="Apprenez les principes essentiels du leadership moderne et développez votre style unique."
            actions={<><Button emphasis="ghost" size="sm">Partager</Button><Button emphasis="solid" size="sm">Continuer</Button></>}
          />
          <p className="rounded-xl border border-dashed border-primary-300 bg-primary-50/40 p-stack-lg text-body text-ink-700">
            Le contenu de la page. Les 32 px au-dessus appartiennent au parent (<code className="font-mono text-caption">gap-section</code>), pas à l’en-tête.
          </p>
        </div>
        <PageHeader
          align="center"
          title="Bienvenue dans ton espace"
          description={'align="center" : le titre et le chapô se centrent, les actions passent dessous.'}
          actions={<Button emphasis="soft" size="sm">Commencer</Button>}
        />
      </div>
    ),
  },
  {
    name: 'ViewerHeader',
    codeName: 'patterns/ViewerHeader.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['LessonPlayer', 'FlashcardsViewer', 'AstucesViewer', 'VideoViewer', 'ComplementaryContentViewer', 'Positionnement'],
    description: "La barre des lecteurs plein écran : leçon, flashcards, astuces, vidéo, ressources complémentaires, positionnement. Retour à gauche, un Button ghost neutre comme ses voisins : dès 640 px, le libellé en sm (13/700, cible tactile de 44) — en 16/700 il pèserait plus que le titre —, en dessous l'icône seule, un cercle de 44. Au centre, le titre en 16/600 ink-900 et une seule ligne de méta en 13 ink-600 (le surtitre en 600 ink-700, « · », le sous-titre) ; à droite un emplacement `trailing`, le compteur « 3 / 12 » en 13/600 tabulaire (valeur au cran 800 du ton), puis précédent, suivant et fermer (Button iconOnly ghost de 44 px). Barre de progression optionnelle de 4 px. La barre ne nomme pas l'écran : son titre est un `<p>`, et le h1 à 36 vit dans le contenu. La couverture d'une leçon l'affiche ; ses autres sections le gardent pour le seul plan du document (`sr-only`). `titleAs=\"h1\"` reste une échappatoire pour un écran sans autre titre, que check-typo relève — aucune page ne s'en sert ; `titleId` expose le titre à `aria-labelledby`. Pas de `role=\"banner\"` (retiré le 24/09) : la barre vit dans le `<main>` des lecteurs, et le seul bandeau d'une page est celui de la coque. Aligné à gauche sous 640 px, centré au-delà ; le ton (primary · warm · sun) colore le compteur et la progression.",
    keywords: ['viewer', 'lecteur', 'reader', 'toolbar', 'header', 'titleAs', 'titleId', 'trailing', 'h1', 'prev-next', 'navigation', 'back', 'retour', 'close', 'sticky', 'banner', 'landmark'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        {/* Leçon (LessonPlayer) : la barre porte titre et méta, la couverture
            porte le h1. Le h1 est simulé par un paragraphe au pas h1 : la
            vitrine a déjà le sien, et un second fausserait son plan. */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600">Leçon : la barre porte le titre et la méta, la couverture porte le h1</p>
          <div className="rounded-xl overflow-hidden border border-ink-200 bg-white">
            <ViewerHeader
              sticky={false}
              tone="warm"
              backLabel="Retour"
              onBack={() => {}}
              title="Donner un feedback qui fait progresser"
              eyebrow="Étape 2 · Le feedback"
              subtitle="12 min"
              current={1}
              total={6}
              progress={17}
              onClose={() => {}}
            />
            <div className="flex flex-col gap-stack-sm p-stack-lg sm:p-section">
              <p className="font-display text-h1 text-ink-900 text-balance">Donner un feedback qui fait progresser</p>
              <p className="font-body text-body-lg text-ink-700 max-w-prose">Décrire un fait, en dire l’effet, proposer une suite : trois gestes pour qu’un retour serve à celui qui le reçoit.</p>
            </div>
          </div>
          <p className="text-caption text-ink-600 max-w-prose">Dans la page, le titre de la couverture est le <code className="font-mono text-caption">h1</code> de l’écran ; ici un paragraphe, la vitrine ayant déjà le sien. Dans les autres sections, il ne reste que dans le plan du document.</p>
        </div>

        {/* Flashcards et astuces : pas de titre dans la barre, une ligne de
            méta seulement ; le h1 centré nomme le jeu. */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600">Flashcards, astuces : une ligne de méta dans la barre, le h1 centré nomme le jeu</p>
          <div className="rounded-xl overflow-hidden border border-ink-200 bg-white">
            <ViewerHeader
              sticky={false}
              tone="primary"
              eyebrow="Flashcards"
              subtitle="4 / 12 comprises"
              current={5}
              total={12}
              progress={42}
              onClose={() => {}}
            />
            <div className="p-stack-lg sm:p-section">
              <p className="font-display text-h1 text-ink-900 text-center text-balance">Boucle de feedback OKR</p>
            </div>
          </div>
        </div>

        {/* Vidéo : l'emplacement `trailing` reçoit une action de plus. */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600">Vidéo : une action de plus dans l’emplacement <code className="font-mono text-caption">trailing</code></p>
          <div className="rounded-xl overflow-hidden border border-ink-200 bg-white">
            <ViewerHeader
              sticky={false}
              eyebrow="Vidéo · Veille"
              title="Tendance Leadership 2026 — replay de la conférence"
              onClose={() => {}}
              trailing={
                <Button iconOnly emphasis="ghost" tone="neutral" aria-label="Plein écran">
                  <Maximize2 />
                </Button>
              }
            />
          </div>
        </div>

        {/* Précédent / suivant : dans l'API, désactivés aux bornes — mais
            aucun lecteur ne s'en sert aujourd'hui. */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600">Précédent et suivant, désactivés aux bornes</p>
          <div className="rounded-xl overflow-hidden border border-ink-200 bg-white">
            <ViewerHeader
              sticky={false}
              backLabel="Retour"
              onBack={() => {}}
              title="Premier élément"
              current={1}
              total={12}
              onPrev={() => {}}
              onNext={() => {}}
              disablePrev
            />
          </div>
          <p className="text-caption text-ink-600 max-w-prose">Dans l’API, mais aucun lecteur ne s’en sert aujourd’hui : leur navigation vit dans le pied de page (LessonNavigation).</p>
        </div>
      </div>
    ),
  },
  {
    name: 'HeaderNav',
    codeName: 'patterns/HeaderNav.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    description: "En-tête collant des parcours en plusieurs étapes (onboarding, questionnaire) : Retour à gauche ; au centre, la progression — « Progression » en 13, l'étape en 13/600 au cran 800, une barre de 6 px, le pourcentage en 13/600 tabulaire ; Enregistrer (Button sm) à droite. Verre clair ; « Progression » se masque sous 640 px.",
    keywords: ['header', 'nav', 'sticky', 'back', 'save', 'progress', 'onboarding', 'wizard', 'glass', 'multi-step'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600 m-0">Avec progression + Enregistrer</p>
          <div className="rounded-xl overflow-hidden border border-ink-200">
            <HeaderNav
              backLabel="Quitter le questionnaire"
              onBack={() => {}}
              progress={65}
              progressLabel="Étape 4/6"
              onSave={() => {}}
            />
          </div>
        </div>
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600 m-0">Simple back only</p>
          <div className="rounded-xl overflow-hidden border border-ink-200">
            <HeaderNav
              backLabel="Retour"
              onBack={() => {}}
              showProgressBar={false}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'ViewerOverlay',
    codeName: 'patterns/ViewerOverlay.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    description: "Ancienne enveloppe plein écran des lecteurs — en-tête, progression, pied précédent / suivant, Échap et flèches —, remplacée par ViewerHeader : plus aucune page ne l'emploie. Titre en h1 16/600, sous-titre 13 ink-600, boutons du pied à 44 px ; cinq tons (light · brand · warm · sun · dark). L'aperçu en reprend la structure avec les composants du système.",
    keywords: ['viewer', 'overlay', 'fullscreen', 'immersive', 'player', 'reader', 'tone', 'progress', 'prev', 'next'],
    render: () => (
      <div className="flex flex-col gap-stack-xs">
        {/* Aperçu refait avec les composants du système : la maquette posait des
            boutons faits main à 32 px en ink-400 (3,01:1) et des pilules en 500. */}
        <p className="text-caption text-ink-600">Aperçu tronqué : l'enveloppe est plein écran, son contenu (`children`) est le lecteur lui-même.</p>
        <div className="rounded-2xl overflow-hidden border border-ink-200 bg-white min-h-[260px] flex flex-col">
          <div className="flex items-center justify-between gap-stack-xs px-stack-md py-stack-xs bg-white/85 backdrop-blur-glass-light border-b border-ink-200">
            <Button emphasis="ghost" tone="neutral" size="sm" leadingIcon={<ArrowLeft />}>Retour</Button>
            <div className="flex-1 min-w-0 text-center">
              <p className="text-body font-semibold text-ink-900 truncate">Boucle de feedback OKR</p>
              <p className="text-caption text-ink-600">Carte 3 sur 12</p>
            </div>
            <div className="flex items-center gap-stack-3xs">
              <Button iconOnly emphasis="ghost" tone="neutral" aria-label="Précédent"><ArrowLeft /></Button>
              <Button iconOnly emphasis="ghost" tone="neutral" aria-label="Suivant"><ArrowRight /></Button>
            </div>
          </div>
          <ProgressBar value={25} size="xs" valueLabel={false} aria-label="Progression du lecteur" />
          <div className="flex-1 flex items-center justify-center p-section text-caption text-ink-600">Le contenu du lecteur</div>
          <div className="px-stack-md py-stack-xs border-t border-ink-200 bg-white flex items-center justify-between">
            <Button emphasis="soft" tone="neutral" size="sm" leadingIcon={<ArrowLeft />}>Précédent</Button>
            <span className="text-caption text-ink-600 tabular-nums">3 / 12</span>
            <Button emphasis="soft" size="sm" trailingIcon={<ArrowRight />}>Suivant</Button>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'MultiStepForm',
    codeName: 'patterns/MultiStepForm.tsx',
    cssBase: 'MultiStepForm (form progress)',
    showcaseOnly: true,
    description: "Formulaire en plusieurs étapes : barre de progression et compteur « Étape X / Y » (13/600), pastilles d'étape de 40 px — faite, en cours, à venir — avec leur titre en légende 13/600 ; puis l'étape dans une carte, sa description en 16 ink-700 à la largeur de lecture, et les boutons Précédent / Suivant. Pour l'onboarding ou un assistant de configuration.",
    keywords: ['form', 'multi-step', 'progress', 'navigation', 'wizard'],
    render: () => <MultiStepFormDemo />,
  },
  {
    name: 'FormLayout',
    codeName: 'patterns/FormLayout.tsx',
    cssBase: 'Tailwind (no BEM)',
    showcaseOnly: true,
    description: "Formulaire en sections : titre h2 28 et description, puis des sections en h3 20 ; chaque champ a son libellé 16/600, son aide 13 ink-600 et son erreur 13 danger-fg. Carte au rayon 20, padding 24, 32 px entre les blocs ; Annuler et Enregistrer en fin. Chaque `input` est un emplacement : Input, Select, Switch…",
    keywords: ['form', 'layout', 'section', 'field', 'label', 'help', 'error', 'submit', 'cancel'],
    render: () => (
      <FormLayout
        title="Informations personnelles"
        description="Modifiez vos informations de profil visibles par vos pairs."
        sections={[
          {
            title: 'Identité',
            fields: [
              { name: 'name', label: 'Nom complet', required: true, input: <Input placeholder="Marie Dupont" defaultValue="Marie Dupont" /> },
              { name: 'title', label: 'Titre professionnel', helpText: 'Visible sur votre profil public.', input: <Input placeholder="Lead Designer @ TLS" /> },
            ],
          },
          {
            title: 'Contact',
            fields: [
              { name: 'email', label: 'Email', required: true, input: <Input type="email" placeholder="marie@company.com" defaultValue="marie@company.com" /> },
              { name: 'notify', label: 'Notifications email', input: <Switch /> },
            ],
          },
        ]}
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    ),
  },
  {
    name: 'PageCard',
    codeName: 'patterns/PageCard.tsx',
    cssBase: 'PageCard (featured card)',
    description: "Tuile d'annuaire de pages : vignette ou icône, état (point fixe et libellé 13/600), Badge compact, titre h3, description 16 ink-700, étiquette en MetaPill ; flèche au survol. En grille par PageCardGrid (une à quatre colonnes).",
    keywords: ['card', 'page', 'featured', 'image', 'content', 'thumbnail', 'directory'],
    render: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack">
        <PageCard
          item={{
            id: '1',
            icon: I.book,
            title: 'Tableau de bord',
            description: 'Vue d\'ensemble de votre progression et activités récentes.',
            status: 'active',
            badge: { label: 'Nouveau', variant: 'sun' },
          }}
          showThumbnail={false}
        />
        <PageCard
          item={{
            id: '2',
            icon: I.heart,
            title: 'Coaching',
            description: 'Sessions personnalisées avec votre coach dédié.',
            status: 'beta',
            tag: 'Premium',
          }}
          showThumbnail={false}
        />
        <PageCard
          item={{
            id: '3',
            icon: I.trophy,
            title: 'Achievements',
            description: 'Badges et récompenses débloqués.',
            status: 'coming-soon',
          }}
          showThumbnail={false}
        />
      </div>
    ),
  },
  {
    name: 'VeilleCard',
    codeName: 'patterns/VeilleCardFeed.tsx (exports VeilleCard + VeilleCardListItem + FeaturedSpotlight)',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['Veille (via VeilleCardFeed)'],
    description: "La Veille, trois objets exportés par VeilleCardFeed. VeilleCard (grille) : couverture de 160 px avec le type en MetaPill, méta en 13 ink-600, titre h3 20 sur deux lignes, résumé 16 ink-700, lien « Lire » au cran 800. VeilleCardListItem (liste) : couverture à gauche, titre de 16 à 20 selon la largeur de sa boîte, Badge « Nouveau » devant. FeaturedSpotlight (« À la une ») : grand format, titre h2 28, Button soft. Trois tons par élément.",
    keywords: ['veille', 'card', 'editorial', 'article', 'tutoriel', 'dossier', 'magazine', 'vertical', 'horizontal', 'featured', 'spotlight'],
    render: () => {
      const sampleItem = { id: 'demo-1', typeLabel: 'Actu', TypeIcon: TrendingUp, tone: 'brand' as const, title: "IA générative en formation : où en sommes-nous en 2026 ?", summary: "Tour d'horizon des nouveaux usages de l'IA dans les parcours de formation, des cas concrets et des limites.", category: 'IA & Pédagogie', author: 'TLS', publishedAt: "Aujourd'hui", readTime: '6 min' };
      const tutoItem = { id: 'demo-2', typeLabel: 'Tutoriel', TypeIcon: Video, tone: 'warm' as const, isVideo: true, title: 'Construire un prompt structuré en 5 étapes', summary: 'Une vidéo pas à pas pour formaliser ses prompts et obtenir des résultats reproductibles.', category: 'Prompt Engineering', author: 'Marie Dubois', publishedAt: 'Hier', readTime: '12 min' };
      const dossierItem = { id: 'demo-3', typeLabel: 'Dossier', TypeIcon: FolderOpen, tone: 'sun' as const, title: "Transformation IA des parcours", summary: "Synthèse approfondie sur l'impact de l'IA sur les dispositifs de formation professionnelle en Europe.", category: 'Management', author: 'McKinsey', publishedAt: 'Il y a 3 jours', readTime: '22 min' };
      return (
        <div className="flex flex-col gap-section">
          {/* 1 — VeilleCard (vertical, grid mode) */}
          <div className="flex flex-col gap-stack">
            <p className="text-caption font-semibold text-ink-600 m-0">1 · <code className="text-caption bg-ink-50 px-1.5 py-0.5 rounded">&lt;VeilleCard&gt;</code> — vertical (grid mode)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack-lg">
              <VeilleCard item={sampleItem} surface="card" isSaved={false} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
              <VeilleCard item={tutoItem} surface="card" isSaved={true} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
              <VeilleCard item={dossierItem} surface="card" isSaved={false} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
            </div>
          </div>

          {/* 2 — VeilleCardListItem (horizontal, list mode) */}
          <div className="flex flex-col gap-stack">
            <p className="text-caption font-semibold text-ink-600 m-0">2 · <code className="text-caption bg-ink-50 px-1.5 py-0.5 rounded">&lt;VeilleCardListItem&gt;</code> — horizontal (list mode)</p>
            <div className="flex flex-col gap-stack">
              <VeilleCardListItem item={sampleItem} surface="card" isSaved={false} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
              <VeilleCardListItem item={tutoItem} surface="card" isSaved={true} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
              <VeilleCardListItem item={dossierItem} surface="card" isSaved={false} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
            </div>
          </div>

          {/* 3 — FeaturedSpotlight (hero horizontal) */}
          <div className="flex flex-col gap-stack">
            <p className="text-caption font-semibold text-ink-600 m-0">3 · <code className="text-caption bg-ink-50 px-1.5 py-0.5 rounded">&lt;FeaturedSpotlight&gt;</code> — hero "À la une"</p>
            <FeaturedSpotlight item={{ ...sampleItem, featured: true }} isSaved={false} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
          </div>
        </div>
      );
    },
  },
  {
    name: 'VeilleCard — design proposals',
    codeName: '(mockups visuels — verticaux grid + horizontaux list)',
    cssBase: 'Tailwind',
    description: "Maquettes, pas un composant : les sept pistes explorées pour VeilleCard — quatre verticales pour la grille (A couverture, C teintée, D surimpression, L verre) et trois horizontales pour la liste (HZ-1 image à gauche, HZ-2 rangée teintée, HZ-3 boîte de réception). Leur texte suit l'échelle du 24/09 : titres h3 20, méta 13, étiquettes 11 ; le soulèvement au survol a été retiré (passe motion du 17/09).",
    keywords: ['veille', 'card', 'vertical', 'horizontal', 'grid', 'list', 'cover', 'tinted', 'overlay', 'glass', 'compact'],
    render: () => {
      const item = { typeLabel: 'Dossier', category: 'Management', title: "Transformation IA des parcours de formation", summary: "Synthèse approfondie sur l'impact de l'IA sur les dispositifs de formation professionnelle en Europe.", author: 'McKinsey', publishedAt: 'Il y a 3 jours', readTime: '22 min' };
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">

          {/* Design A — Cover dominant (current) */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">A · Cover dominant (current default)</p>
            <article className="flex flex-col rounded-2xl bg-white border border-ink-200 overflow-hidden">
              <div className="relative h-32 bg-gradient-to-br from-accent-300 via-accent-500 to-secondary-500">
                <div className="absolute inset-0 flex items-center justify-center"><FolderOpen size={56} strokeWidth={1.25} className="text-white/95" /></div>
                <span className="absolute top-3 left-3 inline-flex items-center gap-tight px-2.5 py-1 rounded-pill bg-white/95 backdrop-blur-glass-light text-micro font-bold uppercase text-ink-900 shadow-sm"><FolderOpen size={11} strokeWidth={2.5} /> {item.typeLabel}</span>
              </div>
              <div className="flex flex-col gap-stack-xs p-stack-md">
                <span className="font-body text-caption font-semibold text-ink-600">{item.category} · {item.publishedAt}</span>
                <h3 className="font-display text-h3 font-bold text-ink-900">{item.title}</h3>
                <span className="font-body text-caption text-ink-600"><User size={12} className="inline mr-0.5" /> {item.author} · ⏱ {item.readTime}</span>
                <p className="m-0 font-body text-body text-ink-700">{item.summary}</p>
                <footer className="flex justify-between items-center pt-stack-xs border-t border-ink-100"><span className="text-caption font-bold text-accent-700">Lire →</span></footer>
              </div>
            </article>
          </div>

          {/* Design C — Tinted full bg */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">C · Tinted full bg · couleur tone-aware en arrière-plan complet</p>
            <article className="flex flex-col rounded-2xl bg-accent-50/70 border border-accent-100 p-stack-md gap-stack-xs hover:bg-accent-50">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-stack-2xs px-2.5 py-1 rounded-pill bg-white/90 text-accent-700 border border-accent-200 text-micro font-bold uppercase tracking-wider"><FolderOpen size={11} strokeWidth={2.5} /> {item.typeLabel}</span>
                <button className="w-8 h-8 rounded-pill bg-white/70 text-ink-600 hover:text-ink-900 flex items-center justify-center"><Bookmark size={14} /></button>
              </div>
              <span className="font-body text-caption font-semibold text-ink-600">{item.category} · {item.publishedAt}</span>
              <h3 className="font-display text-h3 font-bold text-ink-900">{item.title}</h3>
              <span className="font-body text-caption text-ink-600"><User size={12} className="inline mr-0.5" /> {item.author} · ⏱ {item.readTime}</span>
              <p className="m-0 font-body text-body text-ink-700">{item.summary}</p>
              <footer className="flex justify-between items-center pt-stack-xs border-t border-white/60"><span className="text-caption font-bold text-accent-700">Lire →</span></footer>
            </article>
          </div>

          {/* Design D — Magazine portrait avec title overlay */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">D · Magazine portrait · cover large + title en overlay bottom</p>
            <article className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent-300 via-accent-500 to-secondary-600 h-[280px]">
              <div className="absolute inset-0 flex items-center justify-center opacity-90"><FolderOpen size={84} strokeWidth={1} className="text-white" /></div>
              {/* Gradient overlay bottom for readability */}
              {/* Voile ink-950, pas un noir hors palette (arbitrage n°17), et assez dense
                  sous le texte : à black/30, la méta blanche tombait à 3,64:1 à 375 px. */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/70 to-transparent" />
              <span className="absolute top-3 left-3 inline-flex items-center gap-tight px-2.5 py-1 rounded-pill bg-white/95 backdrop-blur-glass-light text-micro font-bold uppercase text-ink-900 shadow-sm"><FolderOpen size={11} strokeWidth={2.5} /> {item.typeLabel}</span>
              <div className="absolute inset-x-0 bottom-0 p-stack-md text-white flex flex-col gap-tight">
                <span className="font-body text-caption font-semibold text-white">{item.category} · {item.publishedAt}</span>
                <h3 className="font-display text-h3 font-bold text-white">{item.title}</h3>
                <div className="flex justify-between items-center text-caption text-white mt-tight">
                  <span><User size={12} className="inline" /> {item.author} · ⏱ {item.readTime}</span>
                  <span className="font-bold">Lire →</span>
                </div>
              </div>
            </article>
          </div>

          {/* L — Glass overlay full photo (Apple News style) */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">L · Glass overlay · photo plein cover + panel glass content au bottom (Apple News style)</p>
            <article className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-400 via-accent-500 to-secondary-600 h-[300px] cursor-pointer group">
              <div className="absolute inset-0 flex items-center justify-center opacity-90">
                <FolderOpen size={96} strokeWidth={0.9} className="text-white/85" />
              </div>
              <span className="absolute top-3 left-3 inline-flex items-center gap-tight px-2.5 py-1 rounded-pill bg-white/90 backdrop-blur-glass-medium text-ink-900 text-micro font-bold uppercase border border-white/30">
                <FolderOpen size={11} strokeWidth={2.5} /> {item.typeLabel}
              </span>
              <button className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-pill bg-white/90 text-ink-900 backdrop-blur-glass-medium border border-white/30 hover:bg-white">
                <Bookmark size={15} />
              </button>
              <div className="absolute inset-x-3 bottom-3 rounded-lg bg-white/85 backdrop-blur-glass-heavy border border-white/60 p-stack flex flex-col gap-tight shadow-lg">
                <span className="font-body text-caption font-semibold text-ink-600">{item.category} · {item.publishedAt}</span>
                <h3 className="font-display text-h3 text-ink-900">{item.title}</h3>
                <div className="flex items-center gap-stack-xs mt-1 font-body text-caption text-ink-600">
                  <User size={11} className="inline shrink-0" /><span>{item.author}</span>
                  <span aria-hidden>·</span>
                  <span>⏱ {item.readTime}</span>
                </div>
              </div>
            </article>
          </div>

          {/* ── SECTION HORIZONTALES (LIST) ─── */}
          <div className="border-t border-ink-100 pt-section">
            <p className="text-body font-bold text-ink-700 mb-section-lg">Designs horizontaux · vue liste</p>
          </div>

          {(() => {
            const hzItems = [
              { typeLabel: 'Actu', Icon: TrendingUp, gradFrom: 'from-primary-400', gradTo: 'to-primary-700', toneText: 'text-primary-800', toneBg: 'bg-primary-50', toneBorder: 'border-primary-200', category: 'IA & Pédagogie', title: "IA générative en formation : où en sommes-nous en 2026 ?", summary: "Tour d'horizon des nouveaux usages de l'IA.", author: 'The Learning Society', publishedAt: "Aujourd'hui", readTime: '6 min' },
              { typeLabel: 'Tutoriel', Icon: Video, gradFrom: 'from-secondary-400', gradTo: 'to-secondary-700', toneText: 'text-secondary-800', toneBg: 'bg-secondary-50', toneBorder: 'border-secondary-200', category: 'Prompt Engineering', title: 'Construire un prompt structuré en 5 étapes', summary: 'Une vidéo pas à pas pour formaliser ses prompts.', author: 'Marie Dubois', publishedAt: 'Hier', readTime: '12 min' },
              { typeLabel: 'Dossier', Icon: FolderOpen, gradFrom: 'from-accent-300', gradTo: 'to-accent-600', toneText: 'text-accent-800', toneBg: 'bg-accent-50', toneBorder: 'border-accent-200', category: 'Management', title: "Transformation IA des parcours de formation", summary: "Synthèse approfondie sur les dispositifs de formation en Europe.", author: 'McKinsey', publishedAt: 'Il y a 3 jours', readTime: '22 min' },
            ];
            return (
        <div className="flex flex-col gap-section">

          {/* HZ-1 — Badge sur l'image, meta sous le titre */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">HZ-1 · Badge catégorie sur l'image · meta sous le titre</p>
            <div className="flex flex-col gap-stack-xs max-w-content">
              {hzItems.map((it, idx) => (
                <article key={idx} className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] rounded-2xl bg-white border border-ink-200 overflow-hidden hover:border-ink-300 transition-colors cursor-pointer group">
                  {/* Image avec badge en overlay bottom */}
                  <div className={`relative bg-gradient-to-br ${it.gradFrom} via-current ${it.gradTo} flex items-center justify-center min-h-[108px] overflow-hidden`}>
                    <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 60%)' }} aria-hidden />
                    <it.Icon size={38} strokeWidth={1.25} className="text-white/90 group-hover:scale-110 transition-transform duration-base" />
                    {/* Badge catégorie — sur l'image en haut, glassy */}
                    <span className="absolute top-2 left-0 right-0 flex justify-center">
                      <span className="inline-flex items-center gap-tight px-2.5 py-1 rounded-pill bg-white/90 backdrop-blur-glass-medium border border-white/40 text-micro font-bold uppercase tracking-label text-ink-900 shadow-sm">
                        <it.Icon size={9} strokeWidth={2.5} /> {it.typeLabel}
                      </span>
                    </span>
                  </div>
                  {/* Content : titre → meta → summary */}
                  <div className="flex flex-col justify-center gap-tight p-stack">
                    <h3 className="font-display text-body font-bold text-ink-900 line-clamp-2">{it.title}</h3>
                    <div className="flex items-center gap-stack-2xs font-body text-caption text-ink-600 flex-wrap">
                      <User size={10} className="shrink-0" />
                      <span>{it.author}</span>
                      <span aria-hidden>·</span>
                      <span>{it.category}</span>
                      <span aria-hidden>·</span>
                      <span>{it.publishedAt}</span>
                      <span aria-hidden>·</span>
                      <span>⏱ {it.readTime}</span>
                    </div>
                    <p className="m-0 font-body text-caption text-ink-600 line-clamp-1 hidden sm:block">{it.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* HZ-2 — Tinted row avec badge sur zone icône */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">HZ-2 · Tinted row · icône + badge catégorie · meta sous titre</p>
            <div className="flex flex-col gap-stack-xs max-w-content">
              {hzItems.map((it, idx) => (
                <article key={idx} className={`flex items-center gap-0 rounded-xl ${it.toneBg} border ${it.toneBorder} hover:brightness-95 cursor-pointer transition-all overflow-hidden`}>
                  {/* Zone icône avec badge en dessous */}
                  <div className={`relative flex flex-col items-center justify-center gap-tight w-16 sm:w-20 self-stretch ${it.toneBg} border-r ${it.toneBorder} shrink-0 py-3`}>
                    <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/80 ${it.toneText} shadow-xs`}>
                      <it.Icon size={17} strokeWidth={1.75} />
                    </div>
                    <span className={`font-body text-caption font-semibold ${it.toneText}`}>{it.typeLabel}</span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col gap-tight px-stack py-3">
                    <h3 className="font-display text-body font-bold text-ink-900 line-clamp-1">{it.title}</h3>
                    <div className="flex items-center gap-stack-2xs font-body text-caption text-ink-600 flex-wrap">
                      <User size={10} className="shrink-0" />
                      <span>{it.author}</span>
                      <span aria-hidden>·</span>
                      <span>{it.publishedAt}</span>
                      <span aria-hidden>·</span>
                      <span>⏱ {it.readTime}</span>
                    </div>
                  </div>
                  <span className={`font-body text-caption font-bold ${it.toneText} shrink-0 pr-4`}>Lire →</span>
                </article>
              ))}
            </div>
          </div>

          {/* HZ-3 — Compact inbox (ultra-dense, 1 ligne) */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">HZ-3 · Compact inbox · badge icône + titre + meta 1 ligne · bookmark</p>
            <div className="flex flex-col rounded-2xl bg-white border border-ink-200 overflow-hidden divide-y divide-ink-100 max-w-content">
              {hzItems.map((it, idx) => (
                <article key={idx} className="flex items-center gap-stack-xs px-stack py-3 hover:bg-ink-50 cursor-pointer transition-colors group">
                  {/* Icône + label badge empilés */}
                  <div className={`flex flex-col items-center gap-0.5 shrink-0`}>
                    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${it.toneBg} ${it.toneText}`}>
                      <it.Icon size={16} strokeWidth={2} />
                    </span>
                    <span className={`font-body text-caption font-semibold ${it.toneText}`}>{it.typeLabel}</span>
                  </div>
                  {/* Title + meta */}
                  <div className="flex-1 min-w-0 flex flex-col gap-tight">
                    <h4 className="font-display text-body font-bold text-ink-900 truncate group-hover:text-primary-700 transition-colors">{it.title}</h4>
                    <p className="m-0 font-body text-caption text-ink-600 truncate">
                      <User size={9} className="inline mr-0.5" />{it.author} · {it.publishedAt} · ⏱ {it.readTime}
                    </p>
                  </div>
                  <button className="text-ink-300 hover:text-primary-600 shrink-0 transition-colors"><Bookmark size={14} /></button>
                  <ArrowRight size={13} className="text-ink-300 group-hover:text-ink-600 shrink-0 transition-colors" />
                </article>
              ))}
            </div>
          </div>

        </div>
            );
          })()}

        </div>
      );
    },
  },
  {
    name: 'VeilleCardFeed',
    codeName: 'patterns/VeilleCardFeed.tsx',
    cssBase: 'Tailwind (no BEM)',
    usedBy: ['Veille'],
    description: "Fil éditorial de la Veille : un élément `featured` passe en tête (FeaturedSpotlight), puis deux dispositions — grid, le défaut, en cartes verticales, ou list, en rangées denses. Bouton d'enregistrement, états de chargement et vide.",
    keywords: ['veille', 'feed', 'news', 'content', 'editorial', 'cards', 'spotlight', 'featured', 'article', 'tutoriel', 'dossier', 'magazine', 'tone', 'grid', 'list', 'horizontal'],
    render: () => {
      const sampleItems = [
        { id: '1', featured: true as const, typeLabel: 'Actu', TypeIcon: TrendingUp, tone: 'brand' as const, title: "IA générative en formation : où en sommes-nous en 2026 ?", summary: "Tour d'horizon des nouveaux usages de l'IA dans les parcours de formation, des cas concrets et des limites.", category: 'IA & Pédagogie', author: 'TLS', publishedAt: "Aujourd'hui", readTime: '6 min' },
        { id: '2', typeLabel: 'Tutoriel', TypeIcon: Video, tone: 'warm' as const, isVideo: true, title: 'Construire un prompt structuré en 5 étapes', summary: 'Une vidéo pas à pas pour formaliser ses prompts et obtenir des résultats reproductibles.', category: 'Prompt Engineering', author: 'Marie Dubois', publishedAt: 'Hier', readTime: '12 min' },
        { id: '3', typeLabel: 'Dossier', TypeIcon: FolderOpen, tone: 'sun' as const, title: "Transformation IA des parcours", summary: "Synthèse approfondie sur l'impact de l'IA sur les dispositifs de formation professionnelle en Europe.", category: 'Management', author: 'McKinsey', publishedAt: 'Il y a 3 jours', readTime: '22 min' },
        { id: '4', typeLabel: 'Magazine', TypeIcon: BookOpen, tone: 'brand' as const, title: 'Tendances EdTech 2026', summary: 'Notre numéro mensuel : marchés en croissance, nouveaux acteurs, opportunités stratégiques.', category: 'EdTech', author: 'TLS Mag', publishedAt: 'Il y a 1 semaine', readTime: '18 min' },
      ];
      return (
        <div className="flex flex-col gap-section">
          <div className="flex flex-col gap-stack">
            <p className="text-caption font-semibold text-ink-600 m-0">Disposition <code className="text-caption bg-ink-50 px-1.5 py-0.5 rounded">list</code> · rangées denses</p>
            <VeilleCardFeed items={sampleItems.slice(1)} layout="list" savedIds={new Set(['3'])} onItemClick={() => {}} onToggleSave={() => {}} />
          </div>

          <div className="flex flex-col gap-stack">
            <p className="text-caption font-semibold text-ink-600 m-0">Disposition <code className="text-caption bg-ink-50 px-1.5 py-0.5 rounded">grid</code>, le défaut · cartes verticales</p>
            <VeilleCardFeed items={sampleItems} savedIds={new Set(['3'])} onItemClick={() => {}} onToggleSave={() => {}} />
          </div>
        </div>
      );
    },
  },

  // ─── Figma DS extract — VeilleFormatShortcutCards ────────────────────────────
  {
    name: 'VeilleFormatShortcutCards',
    codeName: 'patterns/VeilleFormatShortcutCards.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Raccourcis vers les formats éditoriaux de la Veille : deux colonnes, quatre dès 768 px ; chaque carte, un bouton au rayon 14, porte une pastille d'icône, un libellé 16/600 et un sous-titre 13, et navigue par `href`. Surface light par défaut ; la variante dark, pour un dégradé, est marquée legacy.",
    keywords: ['veille', 'format', 'shortcut', 'navigation', 'cards', 'editorial', 'magazine', 'newsletter', 'glass', 'dark'],
    usedBy: ['Veille'],
    render: () => (
      <div className="flex flex-col gap-section">
        <div className="flex flex-col gap-stack">
          {/* La démo annonçait « dark par défaut » sans passer `surface` : elle
              rendait des cartes claires aux icônes pâles. Et un dégradé qui
              descend au cran 500 ne porte pas de texte blanc. */}
          <span className="text-caption font-semibold text-ink-600">surface="dark" · legacy, sur un dégradé au cran 700 ou plus</span>
          <div className="p-stack-lg rounded-xl bg-gradient-to-br from-primary-800 to-primary-700">
            <VeilleFormatShortcutCards
              surface="dark"
              cards={[
                { icon: <BookOpen  size={16} strokeWidth={2} className="text-primary-200" />,   title: 'Magazine TLS', subtitle: 'Mensuel · analyses',     href: '/veille/magazine' },
                { icon: <TrendingUp size={16} strokeWidth={2} className="text-secondary-200" />, title: 'Actu hebdo',   subtitle: 'Chaque vendredi',        href: '/veille/weekly-newsletter' },
                { icon: <Video     size={16} strokeWidth={2} className="text-white/70" />,       title: 'Vidéo Reels',  subtitle: 'Short formats · 60 sec',  href: '/veille/video-reels' },
                { icon: <Mail      size={16} strokeWidth={2} className="text-accent-300" />,     title: 'Newsletter',   subtitle: 'Abonnement & archives',   href: '/veille/newsletter' },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col gap-stack">
          <span className="text-caption font-semibold text-ink-600">Par défaut · surface light</span>
          <VeilleFormatShortcutCards />
        </div>
      </div>
    ),
  },

  // ─── Figma DS extract — VeilleHeroFilterChips ────────────────────────────────
  {
    name: 'VeilleHeroFilterChips',
    codeName: 'patterns/VeilleHeroFilterChips.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    description: "La barre de filtres du hero de la Veille, sur fond sombre : des FilterChip glass md (44 px, 16/600) pour les types de contenu et la bascule « Sauvegardés », puis « Réinitialiser » et le nombre de résultats en 13 blanc.",
    keywords: ['veille', 'filter', 'chips', 'hero', 'glass', 'bookmark', 'saved', 'editorial', 'reset', 'count'],
    render: () => {
      const [active, setActive] = React.useState('all');
      const [savedActive, setSavedActive] = React.useState(false);
      const hasFilter = active !== 'all' || savedActive;
      return (
        <div className="p-stack-lg rounded-xl bg-gradient-to-br from-primary-800 to-primary-700">
          <VeilleHeroFilterChips
            filters={[
              { id: 'all',      label: 'Tout' },
              { id: 'actu',     label: 'Actus',     icon: <TrendingUp size={12} strokeWidth={2.5} />, count: 4 },
              { id: 'tutoriel', label: 'Tutoriels',  icon: <Video     size={12} strokeWidth={2.5} />, count: 2 },
              { id: 'dossier',  label: 'Dossiers',   icon: <FolderOpen size={12} strokeWidth={2.5} />, count: 1 },
              { id: 'magazine', label: 'Magazine',   icon: <BookOpen  size={12} strokeWidth={2.5} />, count: 1 },
            ]}
            value={active}
            onChange={setActive}
            savedCount={3}
            isSavedActive={savedActive}
            onSavedToggle={() => setSavedActive((v) => !v)}
            hasActiveFilter={hasFilter}
            onReset={() => { setActive('all'); setSavedActive(false); }}
            resultsCount={8}
          />
        </div>
      );
    },
  },

  {
    name: 'LearningItemCard',
    codeName: 'learning/LearningItemCard.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Carte d'un contenu de l'Espace Apprentissage (neuf types, dont astuces, flashcard, ressource, guide, vidéo, mission, masterclass). Type en MetaPill et durée en 13, libellé 16/600 sur deux lignes, description 16 ink-700, niveau Dreyfus (« D3 ») et thème en MetaPill, puis l'action (Button sm). Trois états : accessible, complété, verrouillé (opacité 60 %, raison du verrou). Rayon 20, padding 20 puis 24 dès 640 px.",
    keywords: ['learning', 'item', 'card', 'astuces', 'flashcard', 'mission', 'video', 'locked', 'completed', 'progress', 'tone', 'badge', 'dreyfus'],
    usedBy: ['LearningSpace'],
    toneAware: true,
    render: () => (
      <div className="flex flex-col gap-section">
        <p className="text-caption font-semibold text-ink-600 m-0">Accessible — brand / warm / sun</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
          <LearningItemCard id="1" type="video_conc" title="Maîtriser la rétroaction constructive" description="Comprendre les mécanismes du feedback pour progresser efficacement." duration="15 min" dreyfusLevel={3} theme="Communication" isAccessible={true} onClick={() => {}} />
          <LearningItemCard id="2" type="mission" title="Conduire un entretien de recrutement" description="Structurer et mener un entretien professionnel pour évaluer les compétences." duration="45 min" dreyfusLevel={4} theme="Management" isAccessible={true} onClick={() => {}} />
          <LearningItemCard id="3" type="astuces" title="5 astuces pour mémoriser durablement" description="Des techniques cognitives éprouvées pour ancrer les apprentissages sur le long terme." duration="10 min" dreyfusLevel={2} theme="Pédagogie" isAccessible={true} onClick={() => {}} />
        </div>
        <p className="text-caption font-semibold text-ink-600 m-0 mt-section">Complété + En cours (progress bar)</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
          <LearningItemCard id="c1" type="astuces" title="5 astuces pour mémoriser durablement" description="Des techniques cognitives éprouvées pour ancrer les apprentissages sur le long terme." duration="10 min" dreyfusLevel={2} theme="Pédagogie" isAccessible={true} isCompleted={true} onClick={() => {}} />
          <LearningItemCard id="c2" type="guide" title="Guide de feedback 360°" description="Concevoir et déployer un dispositif de feedback multi-sources." duration="30 min" dreyfusLevel={3} theme="RH" isAccessible={true} progress={65} onClick={() => {}} />
          <LearningItemCard id="c3" type="ressource" title="Boîte à outils facilitation" description="Templates et fiches pratiques pour faciliter des ateliers en présentiel ou distanciel." duration="20 min" dreyfusLevel={2} theme="Facilitation" isAccessible={true} progress={25} onClick={() => {}} />
        </div>
        <p className="text-caption font-semibold text-ink-600 m-0 mt-section">Locked states — tier / prerequisite</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
          <LearningItemCard id="4" type="masterclass" title="Stratégie de changement organisationnel" description="Piloter la transformation avec méthode et embarquer les équipes." duration="2h" dreyfusLevel={5} theme="Leadership" isAccessible={false} denialReason="tier" denialMessage="Disponible avec l'abonnement Pro" onClick={() => {}} />
          <LearningItemCard id="5" type="guide" title="Guide de feedback 360°" description="Concevoir et déployer un dispositif de feedback multi-sources." duration="30 min" dreyfusLevel={3} theme="RH" isAccessible={false} denialReason="prerequisite" denialMessage="Complète d'abord les astuces de base" onClick={() => {}} />
          <LearningItemCard id="6" type="flashcard" title="Flashcards Dreyfus — niveau 1→5" description="Réviser les 5 niveaux d'expertise et leurs indicateurs comportementaux." duration="8 min" dreyfusLevel={1} theme="Compétences" isAccessible={false} denialReason="tier" onClick={() => {}} />
        </div>
      </div>
    ),
  },

  {
    name: 'EditorialCard',
    codeName: 'learning/ArticleCard.tsx · learning/VideoCard.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Carte éditoriale, deux formats. ArticleCard (actu, tutoriel, dossier) : icône, type en MetaPill et date, catégorie en surtitre 13/600, titre h3 20, résumé 16 ink-700, puis l'auteur et la durée en MetaPill et un Button sm « Lire ». VideoCard : vignette 16:9 au dégradé du ton avec la durée, catégorie en MetaPill, titre h3, « Par … » en 13, et un Button « Regarder ».",
    keywords: ['article', 'editorial', 'actu', 'tutoriel', 'dossier', 'magazine', 'bookmark', 'tone', 'video', 'thumbnail', 'play'],
    render: () => (
      <div className="flex flex-col gap-section">
        <p className="text-caption font-semibold text-ink-600 m-0">ArticleCard — actu / tutoriel / dossier</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
          <ArticleCard
            itemId="a1"
            type="actu"
            typeLabel="Actu"
            tone="primary"
            icon={<TrendingUp size={22} />}
            title="L'essor du microlearning dans les entreprises"
            summary="78% des entreprises du CAC40 ont adopté le microlearning : résultats et conditions du succès."
            category="Formation"
            author="TLS Rédaction"
            publishedAt="Hier"
            readTime="4 min"
            isSaved={false}
            onSave={() => {}}
            onClick={() => {}}
            onRead={() => {}}
          />
          <ArticleCard
            itemId="a2"
            type="dossier"
            typeLabel="Dossier"
            tone="sun"
            icon={<FolderOpen size={22} />}
            title="Transformation IA des parcours de formation"
            summary="Synthèse approfondie sur l'impact de l'IA sur les dispositifs de formation professionnelle en Europe."
            category="Management"
            author="McKinsey"
            publishedAt="Il y a 3 jours"
            readTime="22 min"
            isSaved={true}
            onSave={() => {}}
            onClick={() => {}}
            onRead={() => {}}
          />
        </div>
        <p className="text-caption font-semibold text-ink-600 m-0 mt-stack">VideoCard — vidéos standalone</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-lg max-w-content">
          <VideoCard
            title="Construire un prompt structuré en 5 étapes"
            category="Prompt Engineering"
            duration="12 min"
            author="Marie Dubois"
            tone="primary"
            isSaved={false}
            onClick={() => {}}
            onSave={() => {}}
          />
          <VideoCard
            title="L'IA générative en entreprise"
            category="IA & Innovation"
            duration="18 min"
            author="Pierre Leclerc"
            tone="warm"
            isSaved={true}
            onClick={() => {}}
            onSave={() => {}}
          />
        </div>
      </div>
    ),
  },
  {
    name: 'NewsletterSignupCard',
    codeName: 'patterns/NewsletterSignupCard.tsx',
    cssBase: 'Tailwind',
    description: "Bandeau pleine largeur d'inscription à la newsletter, sur primary-900 : surtitre 13/600, titre h2 28, texte 16, tout en blanc plein, puis le formulaire (Input md et Button soft) et une note en 13. Propre à la Veille ; pas de coque de carte.",
    keywords: ['newsletter', 'signup', 'email', 'subscription', 'veille', 'editorial', 'band', 'full-bleed'],
    render: () => (
      <NewsletterSignupCard
        onSubmit={() => {}}
        onSeeLastIssue={() => {}}
      />
    ),
  },
  /* ─── BATCH PROD-USED COMPONENTS — ajoutés (Phase 10 audit) ─────────────── */
  {
    name: 'PromptCard',
    codeName: 'learning/PromptCard.tsx',
    cssBase: 'Tailwind (chat bubble pattern)',
    usedBy: ['Dashboard'],
    description: "Invitation à écrire, en bulle — la construction canonique : rayon 20, filet 1 px, queue, aucune ombre. En default : étiquette en MetaPill, icône, texte 16 ink-700 et « Réfléchir → » en 13/600. En featured : grande icône et question en 20, puis 28. Le `variant` (les sept tons de Badge) teinte l'étiquette et le survol.",
    keywords: ['prompt', 'chat-bubble', 'speech', 'invitation', 'cta', 'dashboard'],
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack max-w-content">
        <PromptCard
          variant="brand"
          icon={<PenLine size={18} />}
          label="Réflexion du jour"
          text="Qu'as-tu retenu de la session coaching d'hier ?"
          onClick={() => {}}
        />
        <PromptCard
          variant="warm"
          icon={<Lightbulb size={18} />}
          label="Insight"
          text="Note une prise de conscience qui t'a marqué cette semaine."
          onClick={() => {}}
        />
      </div>
    ),
  },
  {
    name: 'MessageBubble',
    codeName: 'ui/MessageBubble.tsx',
    cssBase: 'Tailwind',
    usedBy: ['ChatInterface', 'Messages'],
    description: "Une bulle de message, pour l'assistant IA et la messagerie ; texte 16/26, horodatage 13 ink-600 tabulaire. Côté utilisateur : primary-100 (chatbot) ou primary-700 à texte blanc (messagerie) ; côté assistant : ink-50 et avatar. Pour l'IA : « Confiance limitée » sous 0,6, blocage de confidentialité, sources citées, retour « Utile ? ». Pour la messagerie : nom de l'expéditeur, accusé de lecture, pièces jointes en `children`. Un élément de fil ; PromptCard, elle, est une carte autonome.",
    keywords: ['message', 'bubble', 'chat', 'chatbot', 'messaging', 'assistant', 'user', 'conversation', 'coaching'],
    render: () => (
      <div className="flex flex-col gap-section max-w-2xl">
        <div>
          <p className="text-caption font-semibold text-ink-600 mb-stack-xs">Contexte : chatbot</p>
          <div className="flex flex-col gap-stack p-stack-lg bg-ink-50 rounded-xl border border-ink-200">
            <MessageBubble
              variant="user"
              content="Comment développer mes compétences en leadership ?"
              timestamp="14:32"
              context="chatbot"
            />
            <MessageBubble
              variant="assistant"
              content="**Le leadership transformationnel** repose sur 4 piliers : vision inspirante, communication claire, empowerment de l'équipe, et exemplarité."
              timestamp="14:32"
              context="chatbot"
              confidenceScore={0.87}
              sourcesCited={[{ sourceModule: 'formation', sourceId: 's1', title: 'Parcours Leadership', relevanceScore: 0.92 }]}
            />
            <MessageBubble
              variant="assistant"
              content="Je ne peux pas répondre à cette question pour des raisons de confidentialité."
              timestamp="14:33"
              context="chatbot"
              privacyBlocked
            />
            <MessageBubble
              variant="assistant"
              content="Je n'ai pas d'informations très précises sur ce sujet dans ma base de connaissance."
              timestamp="14:34"
              context="chatbot"
              confidenceScore={0.4}
            />
          </div>
        </div>
        <div>
          <p className="text-caption font-semibold text-ink-600 mb-stack-xs">Contexte : messaging (coaching)</p>
          <div className="flex flex-col gap-stack p-stack-lg bg-white rounded-xl border border-ink-200">
            <MessageBubble
              variant="user"
              content="Bonjour ! J'ai une question sur notre prochaine session de coaching."
              timestamp="10:15"
              context="messaging"
              showReadReceipt
            />
            <MessageBubble
              variant="assistant"
              content="Bonjour ! Bien sûr, je suis disponible. Quelle est ta question ?"
              timestamp="10:16"
              context="messaging"
              senderInitials="SC"
              senderTint="brand"
              senderName="Sophie C."
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'ConversationalChat',
    codeName: 'patterns/ConversationalChat.tsx',
    cssBase: 'Tailwind',
    usedBy: ['ChatInterface', 'Onboarding', 'OnboardingUnified', 'OnboardingQuestionnaireConversational'],
    description: "Fil de conversation complet : une coque en verre (rayon 20), un titre 16/600, le journal des messages (`role=\"log\"`, 8 px entre deux, défilement automatique vers le bas), les bulles de l'IA — blanches, avatar de 32 px, texte 16, le **gras** en 600 au cran 800 — et de l'utilisateur — secondary-700, texte blanc. Props : `messages` (ai · user · typing · inline), `title`, `footer`. Dans l'onboarding et l'assistant.",
    keywords: ['chat', 'conversation', 'thread', 'messages', 'typing', 'auto-scroll', 'chatbot', 'feed'],
    render: () => (
      <ConversationalChat
        messages={[
          {
            id: 'm1',
            type: 'user' as const,
            content: 'Bonjour ! Je voudrais progresser en gestion de projet.',
          },
          {
            id: 'm2',
            type: 'ai' as const,
            content: '**Bonne initiative !** Je vois dans ton Passeport que tu as déjà validé les bases. Je te recommande de commencer par le module Agile & Scrum du parcours Management de Projet.',
          },
          {
            id: 'm3',
            type: 'user' as const,
            content: 'Super, combien de temps ça prend ?',
          },
        ]}
        className="max-h-[380px]"
      />
    ),
  },
  {
    name: 'RankingCard',
    codeName: 'learning/RankingCard.tsx',
    cssBase: 'Tailwind',
    usedBy: ['Leaderboard'],
    description: "Rangée de classement : rang en pastille de 48 px (médaille sur le podium), nom 16/600, points en 13/600, et une action. ⚠️ L'arbitrage n°18 (« Reconnaissances ») retire de l'app apprenant le classement nominatif et la série quotidienne : ce composant ne sert plus de modèle à un écran neuf. La démo n'affiche plus de série.",
    keywords: ['ranking', 'leaderboard', 'podium', 'rank', 'gamification', 'streak'],
    render: () => (
      <div className="flex flex-col gap-stack max-w-md">
        <RankingCard rank={1} name="Sophie Martin" points={2840} variant="sun" onViewProfile={() => {}} />
        <RankingCard rank={2} name="Marc Dubois" points={2650} onViewProfile={() => {}} />
        <RankingCard rank={3} name="Léa Petit" points={2410} onViewProfile={() => {}} />
      </div>
    ),
  },
  {
    name: 'TlsLogo',
    codeName: 'ui/TlsLogo.tsx',
    cssBase: 'Tailwind (SVG inline)',
    usedBy: ['Sidebar', 'AuthShell', 'Onboarding', 'OnboardingUnified', 'OnboardingQuestionnaire', 'OnboardingQuestionnaireConversational', 'SubscriptionPayment', 'OnboardingTutorial', 'OnboardingSuccess'],
    description: '⭐ Logo officiel The Learning Society — SVG inline avec wordmark + mark. Atom critique réutilisé app-wide (sidebar header + auth pages + brand bar de tout le flow onboarding). ⚠️ **Pas de similar** — composant unique.',
    keywords: ['logo', 'brand', 'mark', 'wordmark', 'tls'],
    render: () => (
      <div className="flex flex-col gap-stack p-stack-lg rounded-xl bg-white border border-ink-200 max-w-md">
        <p className="text-caption font-semibold text-ink-600 m-0">Sur fond blanc</p>
        <TlsLogo />
        <p className="text-caption font-semibold text-ink-600 m-0 mt-stack">Sur fond brand (gradient)</p>
        <div className="p-stack rounded-lg bg-gradient-brand-deep">
          <TlsLogo />
        </div>
      </div>
    ),
  },
  {
    name: 'TlsLogoLockup',
    codeName: 'ui/TlsLogo.tsx',
    cssBase: 'Tailwind (TlsLogo + League Spartan)',
    usedBy: [],
    description: "Le logo et son nom : l'icône TlsLogo et le mot « The Learning Society » en League Spartan 800, au teal de la marque. Un logotype — ni l'échelle typographique ni le seuil de contraste ne s'y appliquent. Quatre dispositions (`layout`) : horizontal · vertical · vertical-3 · horizontal-3, miroir du composant Figma. Props : `layout`, `iconSize`, `variant` (de l'icône), `wordmarkTone` (primary · ink · white).",
    keywords: ['logo', 'lockup', 'wordmark', 'brand', 'tls', 'league spartan', 'horizontal', 'vertical'],
    render: () => (
      <div className="flex flex-col gap-section p-stack rounded-xl bg-white border border-ink-200">
        <div className="flex flex-wrap items-center gap-section">
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">horizontal</p>
            <TlsLogoLockup layout="horizontal" iconSize={44} />
          </div>
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">horizontal-3</p>
            <TlsLogoLockup layout="horizontal-3" iconSize={56} />
          </div>
        </div>
        <div className="flex flex-wrap items-start gap-section">
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">vertical</p>
            <TlsLogoLockup layout="vertical" iconSize={64} />
          </div>
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-600 m-0">vertical-3</p>
            <TlsLogoLockup layout="vertical-3" iconSize={64} />
          </div>
        </div>
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600 m-0">wordmark ink · sur fond brand (white)</p>
          <div className="flex flex-wrap items-center gap-section">
            <TlsLogoLockup layout="horizontal" iconSize={40} wordmarkTone="ink" />
            <div className="p-stack rounded-lg bg-gradient-brand-deep">
              <TlsLogoLockup layout="horizontal" iconSize={40} wordmarkTone="white" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  /* ─── BATCH #2 — composants SANS similarité (Phase 10 audit) ────────────── */
  {
    name: 'Flashcard',
    codeName: 'patterns/Flashcard.tsx',
    cssBase: 'Tailwind (3D transform)',
    usedBy: ['FlashcardsViewer'],
    description: "Carte recto verso pour la révision, retournée d'un clic (rotation 3D) : contenu au chapô 18/28 en 600 (16 sous 640 px), indication en 13 ink-600 en italique. Recto teal, verso orange ; rayon 20. Sa mise en forme vit dans une feuille BEM à part, Flashcard.css.",
    keywords: ['flashcard', 'flip', '3d', 'revision', 'learning', 'memorization'],
    render: () => (
      <div className="max-w-md">
        <Flashcard
          front={<div className="flex items-center justify-center h-full p-stack-lg"><p className="font-display text-h3 font-bold text-ink-900 text-center m-0">Qu&apos;est-ce que le leadership transformationnel ?</p></div>}
          back={<div className="flex items-center justify-center h-full p-stack-lg"><p className="text-body text-ink-700 text-center m-0">Style de leadership qui inspire et motive les collaborateurs à dépasser leurs intérêts personnels pour le bien collectif.</p></div>}
        />
      </div>
    ),
  },
  {
    name: 'QuizQuestionCard',
    codeName: 'patterns/QuizQuestionCard.tsx',
    cssBase: 'Tailwind',
    usedBy: ['Positionnement'],
    description: "Question de quiz en carte : pastille de numéro et « sur N » (13), question en h3 20/700, 8 px, réponses en rangées de 16 — lettre dans un rond de 32 px calé sur la première ligne —, puis le retour correct ou incorrect en 16. Rayon 14, padding 24.",
    keywords: ['quiz', 'question', 'qcm', 'options', 'evaluation', 'assessment'],
    render: () => (
      <div className="max-w-2xl">
        <QuizQuestionCard
          question="Quel principe est au cœur du leadership transformationnel ?"
          questionNumber={3}
          totalQuestions={10}
          options={[
            { id: 'a', label: "L'autorité hiérarchique" },
            { id: 'b', label: "L'inspiration et la motivation intrinsèque", isCorrect: true },
            { id: 'c', label: "Le contrôle des résultats" },
            { id: 'd', label: "La rétribution monétaire" },
          ]}
          selectedId="b"
          answered={true}
          showCorrectAnswer={true}
          onSelectOption={() => {}}
        />
      </div>
    ),
  },
  {
    name: 'DataTable',
    codeName: 'patterns/DataTable.tsx',
    cssBase: 'Tailwind',
    description: "Tableau de données : en-têtes 13/600 ink-600 en casse normale — la colonne triée passe en ink-900 —, cellules à 16 avec un retrait de 16 × 12, chiffres alignés à droite en tabulaire. Tri par colonne (`onSort`, le parent trie ; `sortValue` depuis le 23/09), rangées cliquables, pagination (deux Button sm et « Page n sur N »), états de chargement et vide. Pour comparer ou trier une collection (arbitrage n°5).",
    keywords: ['table', 'data', 'grid', 'admin', 'analytics', 'sort'],
    render: () => (
      <DataTable
        columns={[
          { key: 'name', label: 'Nom', sortable: true },
          { key: 'role', label: 'Rôle' },
          { key: 'progress', label: 'Progression', align: 'right' },
          { key: 'last', label: 'Dernière activité', align: 'right' },
        ]}
        rows={[
          { id: '1', name: 'Sophie Martin', role: 'Coach', progress: '92%', last: "Aujourd'hui" },
          { id: '2', name: 'Marc Dubois', role: 'Apprenant', progress: '67%', last: 'Hier' },
          { id: '3', name: 'Léa Petit', role: 'Apprenant', progress: '45%', last: 'Il y a 3 jours' },
        ]}
      />
    ),
  },
  // MessageThreadCard supprimé (Phase 10 cleanup) — design trop simpliste vs Messages.tsx chat-like
  {
    name: 'RatingModal',
    codeName: 'patterns/RatingModal.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind',
    description: "Notation en cinq étoiles avec un commentaire, pour une session, une leçon ou un contenu. Malgré son nom, ce n'est pas un dialogue — ni rôle, ni voile, ni piège de focus — mais un panneau à poser dans un Modal : titre en h2 (28/36), description 16 ink-700, étoiles de 56 px, sens de la note en pastille 13, commentaire, actions.",
    keywords: ['rating', 'stars', 'feedback', 'review', 'evaluation'],
    render: () => (
      <div className="max-w-md">
        <RatingModal
          title="Note cette session"
          description="Comment évalues-tu cette session de coaching avec Sophie ?"
          onSubmit={() => {}}
          onCancel={() => {}}
        />
      </div>
    ),
  },
  {
    name: 'ProjectCard',
    codeName: 'learning/ProjectCard.tsx',
    cssBase: 'Tailwind',
    usedBy: ['Project (page existante)'],
    description: "Carte de projet : titre h3 et Badge d'état (En préparation, En cours, Terminé), description 16 ink-700, méta 13 (tâches, échéance), ProgressBar sm, l'équipe, puis un Button soft pleine largeur. Le remplissage de la barre et les avatars suivent l'état.",
    keywords: ['project', 'collaborative', 'team', 'tasks', 'progress', 'deadline'],
    render: () => (
      <div className="max-w-2xl">
        <ProjectCard
          title="Lancement Plateforme IA"
          description="Conception et déploiement de la nouvelle plateforme d'apprentissage IA pour les entreprises clientes."
          status="in-progress"
          progress={68}
          totalTasks={24}
          completedTasks={16}
          deadline="15 mai 2026"
          teamMembers={[
            { id: '1', name: 'Sophie Martin', role: 'Lead' },
            { id: '2', name: 'Marc Dubois', role: 'Designer' },
            { id: '3', name: 'Léa Petit', role: 'Dev' },
            { id: '4', name: 'Pierre Leclerc', role: 'PM' },
          ]}
          onViewProject={() => {}}
        />
      </div>
    ),
  },
  // SocialButton supprimé (Phase 10 cleanup) — remplacé par AuthSocialButton (AuthShell)
  {
    name: 'FloatingNavButton',
    codeName: 'FloatingNavButton.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Bouton flottant à actions (speed-dial) : 56 px, au cran 700 du ton (sun : accent-400 et encre), qui déplie des actions de 48 px — libellé 16/600, filet au cran 200 du ton. Il se place au-dessus de la BottomNav sous 768 px. `actions`, `tone`, `position`, `icon` et `closeIcon`. Dans l'app, il sert de raccourci de développement vers la vitrine et l'index des pages.",
    keywords: ['floating', 'fab', 'speed-dial', 'quick-actions', 'chatbot', 'contact', 'help', 'fixed'],
    render: () => (
      <div className="relative h-[280px] rounded-2xl border border-ink-200 bg-gradient-page-ambient overflow-hidden">
        <div className="absolute inset-0 p-stack">
          <p className="font-body text-caption text-ink-600 m-0">Démo : speed-dial bottom-right de cette card. Click pour ouvrir/fermer.</p>
        </div>
        {/* Render inline (absolute au lieu de fixed pour démo dans la card) */}
        <div className="absolute bottom-4 right-4">
          <FloatingNavButton
            tone="primary"
            actions={[
              { label: "Demander à l'IA", icon: <SparklesIcon size={18} />, onClick: () => alert('Assistant IA'), tone: 'primary' },
              { label: 'Contact', icon: <MessageSquare size={18} />, onClick: () => alert('Contact'), tone: 'warm' },
              { label: 'Aide', icon: <BookOpen size={18} />, onClick: () => alert('Help'), tone: 'sun' },
            ]}
            className="!static"
          />
        </div>
      </div>
    ),
  },
  {
    name: 'AmbientBlobs',
    codeName: 'patterns/AmbientBlobs.tsx',
    cssBase: 'Tailwind + @keyframes float (index.css)',
    usedBy: ['Coaching'],
    description: 'Fond ambient TLS avec 3 blobs flottants (primary teal / warm orange / sun yellow). Pattern décoratif full-page : 3 cercles très flous (blur 80px) qui dérivent lentement (animation float 20s, staggered delays). Position fixed (default) ou absolute, pointer-events-none. 3 intensities : subtle (0.10) / normal (0.15 default) / vivid (0.25). À combiner avec l\'utility token DS `bg-gradient-page-ambient` (teal-50 → white → yellow-50) pour fond premium TLS. Variants : `-warm` (orange) et `-sun` (orange→yellow).',
    keywords: ['blob', 'ambient', 'background', 'decorative', 'gradient', 'float', 'fixed', 'overlay', 'blur'],
    render: () => (
      <div className="flex flex-col gap-stack">
        {/* Default ambient gradient */}
        <div className="relative h-[260px] overflow-hidden rounded-xl bg-gradient-page-ambient border border-ink-200">
          <AmbientBlobs position="absolute" intensity="normal" />
          <div className="relative z-base p-stack-lg flex flex-col items-center justify-center h-full text-center">
            <p className="m-0 font-display text-h3 font-bold text-ink-900">bg-gradient-page-ambient (DEFAULT)</p>
            <p className="m-0 mt-stack-xs font-body text-body text-ink-700 max-w-prose">
              Teal-50 → white → yellow-50 + 3 blobs flottants (float 20s).
            </p>
          </div>
        </div>

        {/* Warm variant */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
          <div className="relative h-[180px] overflow-hidden rounded-xl bg-gradient-page-ambient-warm border border-ink-200">
            <AmbientBlobs position="absolute" intensity="subtle" />
            <div className="relative z-base p-stack flex flex-col items-center justify-center h-full text-center">
              <p className="m-0 font-display text-body font-bold text-ink-900">bg-gradient-page-ambient-warm</p>
              <p className="m-0 mt-tight font-body text-caption text-ink-600">Teal → white → orange</p>
            </div>
          </div>
          <div className="relative h-[180px] overflow-hidden rounded-xl bg-gradient-page-ambient-sun border border-ink-200">
            <AmbientBlobs position="absolute" intensity="subtle" />
            <div className="relative z-base p-stack flex flex-col items-center justify-center h-full text-center">
              <p className="m-0 font-display text-body font-bold text-ink-900">bg-gradient-page-ambient-sun</p>
              <p className="m-0 mt-tight font-body text-caption text-ink-600">Orange → white → yellow</p>
            </div>
          </div>
        </div>

        {/* Brand deep + soft pastels (gradients tokens additionnels) */}
        <p className="text-caption font-semibold text-ink-600 m-0 mt-stack">Hero & soft pastels — autres gradients tokens DS</p>

        {/* Brand deep (saturated 90°) — le libellé sous la nuance, pas dessus :
            du blanc n'y passe que côté navy, et le bout primary-500 le porte à
            2,94:1 (à 375 px, le libellé replié y débordait : 3,98:1). */}
        <div className="flex flex-col gap-stack-xs">
          <div aria-hidden className="h-[140px] rounded-xl bg-gradient-brand-deep border border-ink-200" />
          <div>
            <p className="m-0 font-display text-body font-bold text-ink-900">bg-gradient-brand-deep</p>
            <p className="m-0 mt-tight font-mono text-caption text-ink-600">90deg · brand-navy #164267 → primary-500 #55a1b4</p>
          </div>
        </div>

        {/* Soft pastels (3-stop + 2-stop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
          <div className="relative h-[180px] overflow-hidden rounded-xl bg-gradient-soft-pastel border border-ink-200">
            <div className="relative z-base p-stack flex flex-col items-center justify-center h-full text-center">
              <p className="m-0 font-display text-body font-bold text-ink-900">bg-gradient-soft-pastel</p>
              <p className="m-0 mt-tight font-body text-caption text-ink-600 font-mono">135° · cyan #f0f9ff → mist #f8fbfd → cream #fefaf5</p>
            </div>
          </div>
          <div className="relative h-[180px] overflow-hidden rounded-xl bg-gradient-soft-duo border border-ink-200">
            <div className="relative z-base p-stack flex flex-col items-center justify-center h-full text-center">
              <p className="m-0 font-display text-body font-bold text-ink-900">bg-gradient-soft-duo</p>
              <p className="m-0 mt-tight font-body text-caption text-ink-600 font-mono">135° · cyan #f0f9ff → mist #f8fbfd → cream #fefaf5</p>
            </div>
          </div>
        </div>

        {/* Equivalence — utility class vs Tailwind native composition */}
        <p className="text-caption font-semibold text-ink-600 m-0 mt-stack">⚖️ Équivalence — utility DS vs Tailwind natif composé</p>
        <p className="text-caption text-ink-600 m-0">
          Les couleurs sont définies en <code className="text-caption bg-ink-50 px-1.5 py-0.5 rounded">@theme</code> → Tailwind v4 expose <code className="text-caption bg-ink-50 px-1.5 py-0.5 rounded">from-X</code>/<code className="text-caption bg-ink-50 px-1.5 py-0.5 rounded">via-X</code>/<code className="text-caption bg-ink-50 px-1.5 py-0.5 rounded">to-X</code> automatiquement. Les 2 versions ci-dessous rendent <strong>identiquement</strong> :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
          <div className="relative h-[140px] overflow-hidden rounded-xl bg-gradient-page-ambient border border-ink-200">
            <div className="relative z-base p-3 h-full flex flex-col items-center justify-center text-center">
              <p className="m-0 font-mono text-caption text-ink-700"><strong>Utility DS</strong></p>
              <code className="m-0 mt-tight text-caption text-ink-900 bg-white/60 px-2 py-1 rounded">bg-gradient-page-ambient</code>
            </div>
          </div>
          <div className="relative h-[140px] overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 via-white to-accent-50 border border-ink-200">
            <div className="relative z-base p-3 h-full flex flex-col items-center justify-center text-center">
              <p className="m-0 font-mono text-caption text-ink-700"><strong>Tailwind composé</strong></p>
              <code className="m-0 mt-tight text-caption text-ink-900 bg-white/60 px-2 py-1 rounded">bg-gradient-to-br from-primary-50 via-white to-accent-50</code>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'EditorialHero',
    codeName: 'patterns/EditorialHero.tsx',
    cssBase: 'EditorialHero (glass hero band)',
    usedBy: ['Dashboard', 'Journal', 'LearningPaths', 'ArticleDetail', 'MagazineArticle', 'Newsletter', 'WeeklyNewsDetail', 'Project', 'CoachingBookingFlow', 'PreCoachingQuestionnaireResponse', 'Account'],
    description: "Alias exact de PageHero, gardé pour les surfaces réellement éditoriales (Magazine, Veille, Articles) : même anatomie — surtitre 13/600, h1 36/44, chapô 18/28, méta 13 —, mêmes tons. Les tons saturés sont au cran 700 → 800 depuis le 23/09 : le 500 ne porte pas de texte blanc.",
    keywords: ['hero', 'editorial', 'banner', 'page-header', 'tone-aware', 'brand', 'warm', 'sun', 'glass'],
    render: () => (
      <EditorialHero
        eyebrow={{ icon: <BookOpen size={12} />, label: 'Le mag du mois' }}
        title="Tendances EdTech 2026"
        summary="Panorama des tendances qui transforment la création de contenus, l'accompagnement et l'évaluation des compétences."
        meta={[
          { icon: <Calendar size={12} />, label: 'Édition avril 2026' },
          { icon: <Clock3 size={12} />, label: '8 min de lecture' },
        ]}
      />
    ),
  },
  {
    name: 'EditorialLayout',
    codeName: 'patterns/EditorialLayout.tsx',
    cssBase: 'EditorialLayout (2-col main + sticky aside)',
    usedBy: ['ArticleDetail', 'MagazineArticle', 'Newsletter', 'WeeklyNewsDetail', 'Project', 'CoachingBookingFlow', 'PreCoachingQuestionnaireResponse'],
    description: "Deux colonnes : le contenu (1,4 fr) et une colonne latérale (0,8 fr, 280 px au moins), 24 px entre elles dès 768 px ; la colonne latérale colle à 96 px du haut sur grand écran, et tout passe en une colonne sur mobile. `asideFirst` inverse l'ordre, `staticAside` désactive le collage.",
    keywords: ['layout', 'editorial', 'sidebar', 'sticky', 'aside', '2-column', 'content'],
    render: () => (
      <EditorialLayout
        staticAside
        main={
          <SectionCard title="Contenu principal">
            <p className="m-0 text-body text-ink-700">
              La colonne principale prend ~1.4fr de l'espace disponible. Elle peut contenir n'importe quel contenu : SectionCard, formulaires, listes, médias.
            </p>
          </SectionCard>
        }
        aside={
          <SectionCard title="Aside">
            <p className="m-0 text-body text-ink-700">
              L'aside prend ~0.8fr et devient sticky sur desktop (top: 96px). Sur mobile, le layout passe en single-column.
            </p>
          </SectionCard>
        }
      />
    ),
  },
  {
    name: 'SectionCard',
    codeName: 'patterns/SectionCard.tsx',
    cssBase: 'SectionCard (titled content card)',
    usedBy: ['ArticleDetail', 'MagazineArticle', 'Newsletter', 'WeeklyNewsDetail', 'Project', 'CoachingBookingFlow', 'PreCoachingQuestionnaireResponse', 'ResetPassword', 'Billing', 'SubscriptionPayment', 'Positionnement', 'OnboardingQuestionnaire'],
    description: "Carte de section : titre h3 20 (son icône calée sur la première ligne), 8 px, description 16 ink-700, action d'en-tête en haut à droite ; 16 px, le contenu ; puis 12 px, un filet, 12 px, les actions. C'est une Card md : padding 24, rayon 20. `titleAs` (h2 | h3, défaut h3, ajouté le 24/09) règle le niveau du titre, pas sa taille : `h2` quand la carte est elle-même la section, posée sous le h1 sans titre au-dessus d'elle — sinon le plan saute de h1 à h3. Si le bloc se lit comme une section de la page, la doctrine préfère un SectionHeader posé sur la page, au-dessus d'une Card. Pour découper une page éditoriale ou un formulaire en blocs.",
    keywords: ['section', 'card', 'titled', 'content', 'editorial', 'layout', 'titleAs', 'h2', 'h3', 'niveau'],
    render: () => (
      <SectionCard
        title="À retenir"
        titleIcon={<CheckCircle2 size={18} className="text-primary-600" />}
        description="Points essentiels à mémoriser pour cette section."
        headerAction={<span className="text-caption text-ink-600">3 éléments</span>}
        actions={<Button emphasis="link">Voir tout</Button>}
      >
        <ul className="m-0 pl-4 flex flex-col gap-stack-xs text-body text-ink-700 list-disc">
          <li>Premier point essentiel à retenir.</li>
          <li>Deuxième point avec une explication détaillée.</li>
          <li>Troisième point pour clore la section.</li>
        </ul>
      </SectionCard>
    ),
  },
  {
    name: 'RelatedItemList',
    codeName: 'patterns/RelatedItemList.tsx',
    cssBase: 'RelatedItemList (cross-link list)',
    usedBy: ['MagazineArticle', 'Newsletter', 'WeeklyNewsDetail', 'CoachingBookingFlow', 'PreCoachingQuestionnaireResponse'],
    description: "Liste d'éléments liés, pour les colonnes éditoriales : pastille d'icône, méta 13 ink-600 au-dessus du titre (16/600), description 16 ink-700 sur deux lignes, 8 px entre deux éléments. Un élément devient un lien avec `href`, un bouton avec `onClick` ; chevron au survol.",
    keywords: ['related', 'list', 'cross-link', 'recommendations', 'editorial', 'aside'],
    render: () => (
      <div className="flex flex-col gap-section">
        <div>
          <p className="text-caption text-ink-600 mb-stack-xs font-semibold">onClick → un bouton</p>
          <RelatedItemList
            items={[
              { id: '1', title: 'Interview expert', description: 'Vision 2027', meta: 'Interview', onClick: () => {} },
              { id: '2', title: 'Case study', description: 'Déploiement entreprise', meta: 'Étude', onClick: () => {} },
            ]}
          />
        </div>
        <div>
          <p className="text-caption text-ink-600 mb-stack-xs font-semibold">href → un lien</p>
          <RelatedItemList
            items={[
              { id: '4', title: 'Webinaire replay', description: 'IA & pédagogie : retour d\'expérience', meta: 'Vidéo', onClick: () => {} },
              { id: '5', title: 'Newsletter #18', description: 'Tendances EdTech 2026', meta: 'Newsletter', onClick: () => {} },
            ]}
          />
        </div>
        <div>
          <p className="text-caption text-ink-600 mb-stack-xs font-semibold">Sans interaction</p>
          <RelatedItemList
            items={[
              { id: '6', title: 'Sans lien interactif', description: 'Item purement displayonly (pas de href ni onClick)', meta: 'Lecture' },
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    name: 'AuthShell',
    codeName: 'patterns/AuthShell.tsx',
    cssBase: 'AuthShell (branded glass dark auth layout)',
    usedBy: ['Login', 'Signup', 'ForgotPassword', 'ResetPassword', 'VerifyEmail', 'MagicLink'],
    description: "La coque des pages d'authentification, sur un dégradé primary-700 → 900 où trois halos d'ambiance au cran 700 donnent la profondeur sans éclaircir ce que le texte blanc a besoin de sombre : carte en verre de 480 px au rayon 20 (l'étage conteneur), voile blanc à 5 % — il était à 10 %, et ramenait le blanc à 4,12:1 sur le haut du dégradé —, filet blanc/20 ; en-tête en h1 36/44/700 blanc et sous-titre 16. L'encart `aside` prend le même rayon 20. La famille Auth* est la primitive de cette surface : AuthField (Input glass lg, 52 px, libellé 16/600 blanc), AuthPasswordField (bascule de visibilité), AuthPrimaryButton et AuthGhostButton (52 px, 16/700, rayon 14), AuthSocialButton, AuthCheckbox (20 px, calée sur la première ligne), AuthDivider (13/400), AuthInlineLink, AuthSuccess. Réservée à la surface glass-dark : ne pas l'employer ailleurs.",
    keywords: ['auth', 'login', 'signup', 'shell', 'glass-dark', 'AuthField', 'AuthPasswordField', 'AuthPrimaryButton', 'AuthGhostButton', 'AuthCheckbox', 'form', 'aside'],
    render: () => <AuthShellDemo />,
  },
  {
    name: 'ResumeLessonCard',
    codeName: 'patterns/ResumeLessonCard.tsx',
    cssBase: 'ResumeLessonCard (dashboard hero card)',
    usedBy: ['Dashboard'],
    description: "La carte « Reprendre ta leçon » du tableau de bord : pastille de 48 px, Badge « En cours » et étape en 13, titre du parcours en h2 au pas h3 (20, puis 28 quand la carte dépasse 512 px), « Prochaine leçon » en 16, données en MetaPillGroup sm ; en pied, la progression en 13 sur une barre de 6 px et un Button md. Fond blanc, rayon 20, padding 24. `description` est dépréciée : elle n'est plus rendue.",
    keywords: ['resume', 'reprendre', 'parcours', 'lesson', 'leçon', 'dashboard', 'continue', 'hero'],
    render: () => (
      <ResumeLessonCard
        id="demo-1"
        parcoursTitle="Devenir prompt designer"
        nextLessonTitle="Structurer un prompt pour un cas de formation"
        currentStep={2}
        totalSteps={5}
        progress={40}
        tone="warm"
        duration="3h restantes"
        level="intermédiaire"
        onClick={() => {}}
      />
    ),
  },
  {
    name: 'IconChip',
    codeName: 'ui/IconChip.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Pastille d'icône : un carré teinté qui porte un glyphe Lucide. Rayon PROPORTIONNEL (arbitrage n°3 du 23/09) — 24 px rounded-sm (6) · 32 et 40 px rounded-md (10) · 48 px rounded-lg (14). Le rond reste réservé aux personnes (Avatar). Fond cran 50 / -bg, glyphe cran 800 / -fg : 6,31 à 10,21:1. Décorative (aria-hidden) sauf si `label` est passé. Une pastille qu'on presse n'en est pas une : c'est un Button iconOnly. Sur une carte de MÊME teinte (primary-50, secondary-50, accent-50, ink-100), passer surface=\"tinted\" : le fond monte au cran 100, sinon la pastille se confond avec la carte (arbitrage n°10 du 23/09).",
    keywords: ['icon', 'chip', 'pastille', 'bubble', 'glyph', 'tone', 'brand', 'warm', 'sun', 'neutral', 'success', 'danger', 'info', 'decoration', 'surface', 'tinted'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div className="hstack flex-wrap items-end">
          <IconChip size="xs"><Target /></IconChip>
          <IconChip size="sm"><Target /></IconChip>
          <IconChip size="md"><Target /></IconChip>
          <IconChip size="lg"><Target /></IconChip>
          <span className="text-caption text-ink-600 font-mono">xs 24 · sm 32 · md 40 · lg 48</span>
        </div>
        <div className="hstack flex-wrap">
          <IconChip size="md" tone="brand"><BookOpen /></IconChip>
          <IconChip size="md" tone="warm"><Flame /></IconChip>
          <IconChip size="md" tone="sun"><Trophy /></IconChip>
          <IconChip size="md" tone="neutral"><Settings2 /></IconChip>
          <IconChip size="md" tone="success"><CheckCircle2 /></IconChip>
          <IconChip size="md" tone="danger"><Trash2 /></IconChip>
          <IconChip size="md" tone="info"><Lightbulb /></IconChip>
        </div>
        <div className="flex items-center gap-stack-sm">
          <IconChip tone="warm"><Calendar /></IconChip>
          <span className="text-body text-ink-900">Prochaine session : jeudi 14 h</span>
        </div>
        {/* Arbitrage n°10 (23/09) : sur une carte de même teinte, le cran 50
            se confond avec la carte (1,00:1) — surface="tinted" monte au 100. */}
        <div className="grid gap-stack sm:grid-cols-3">
          {/* Surface faite main, volontairement : `<Card tone>` hors variante
              `tinted` rend aujourd'hui blanc (bg-white gagne sur bg-primary-50). */}
          {([
            ['brand', 'bg-primary-50 border-primary-200', <BookOpen key="i" />, 'Carte primary-50'],
            ['warm', 'bg-secondary-50 border-secondary-200', <Flame key="i" />, 'Carte secondary-50'],
            ['sun', 'bg-accent-50 border-accent-200', <Trophy key="i" />, 'Carte accent-50'],
          ] as const).map(([chipTone, surfaceClasses, icon, label]) => (
            <div key={chipTone} className={['flex flex-col gap-stack-sm rounded-xl border p-stack-lg', surfaceClasses].join(' ')}>
              <span className="text-caption text-ink-700 font-mono">{label}</span>
              <div className="flex items-center gap-stack-sm">
                <IconChip size="md" tone={chipTone}>{icon}</IconChip>
                <span className="text-body text-ink-700">défaut : cran 50, se fond</span>
              </div>
              <div className="flex items-center gap-stack-sm">
                <IconChip size="md" tone={chipTone} surface="tinted">{icon}</IconChip>
                <span className="text-body text-ink-900">surface="tinted" : cran 100</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: 'Divider',
    codeName: 'ui/Divider.tsx',
    showcaseOnly: true,
    cssBase: '.divider / .divider--vertical / .divider--labeled / .divider--sm/md/lg',
    description: "Séparateur horizontal ou vertical : un filet de 1 px en dégradé (transparent → ink-200 → transparent). Avec `label`, le libellé se pose au milieu en 13/600 ink-600, en casse normale — il était en capitales espacées —, à 8 px de chaque côté. Marges `spacing` de 8 · 16 · 32 px.",
    keywords: ['divider', 'separator', 'hr', 'section', 'label', 'horizontal', 'vertical', 'css'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <Divider />
        <Divider label="ou" />
        <Divider label="Compétences" spacing="lg" />
        <div className="flex items-center gap-stack h-20">
          <span className="text-body">Section A</span>
          <Divider orientation="vertical" />
          <span className="text-body">Section B</span>
          <Divider orientation="vertical" />
          <span className="text-body">Section C</span>
        </div>
      </div>
    ),
  },

  // ── MVP — GDPR & Compliance ──────────────────────────────────────────────

  {
    name: 'ConsentBanner',
    codeName: 'patterns/ConsentBanner.tsx',
    cssBase: 'ConsentBanner',
    description: "Bandeau de consentement aux cookies, fixé en bas : titre 16/600, texte 16, trois boutons sm (Personnaliser, Tout refuser, Tout accepter). Le panneau « Personnaliser » déplie les catégories — nécessaires, analytiques, marketing — en réglages à interrupteur. Module 13 bis, RGPD.",
    keywords: ['consent', 'gdpr', 'rgpd', 'cookies', 'privacy', 'banner', 'compliance', 'ai act'],
    showcaseOnly: false,
    usedBy: [],
    render: () => (
      <div className="relative min-h-[120px] border border-ink-100 rounded-lg overflow-hidden bg-ink-50">
        <p className="p-stack text-caption text-ink-600 italic">ConsentBanner — position fixed bottom dans l'app réelle. Démo statique ci-dessous :</p>
        <div className="relative bg-white/95 border-t border-ink-100 shadow-lg p-stack">
          <div className="flex flex-col md:flex-row md:items-center gap-stack-xs">
            <div className="flex-1 text-body text-ink-700">
              <span className="font-semibold text-ink-900">The Learning Society respecte votre vie privée</span>
              {' — '}Nous utilisons des cookies pour améliorer votre expérience.
            </div>
            <div className="flex flex-col sm:flex-row gap-stack-xs shrink-0">
              {/* Mêmes boutons que ConsentBanner.tsx — la démo les refaisait à la main,
                  et « Tout accepter » y posait du blanc sur 600 (3,66). */}
              <Button emphasis="outline" size="sm">Personnaliser</Button>
              <Button emphasis="soft" tone="warm" size="sm">Tout refuser</Button>
              <Button emphasis="soft" size="sm">Tout accepter</Button>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ── MVP — Compétences & Dreyfus ──────────────────────────────────────────

  {
    name: 'CompetencyRadar',
    codeName: 'ui/CompetencyRadar.tsx',
    cssBase: 'CompetencyRadar',
    description: "Radar Dreyfus de 1 à 5, six axes au plus : niveau actuel et objectif. Il mesure sa boîte et réduit son rayon pour que les libellés — 13/400 ink-600 à toutes les tailles — y tiennent, jusqu'à 375 px ; sous 48 px de rayon, les pointes sont numérotées (13/600) et les libellés passent dans une liste en 13 ink-700 sous le dessin. Libellés cliquables au clavier (`onAxisClick`) ; légende en 13 ink-700 et « Échelle Dreyfus 1–5 ». Tailles de 200 · 320 · 480 px.",
    keywords: ['radar', 'compétences', 'dreyfus', 'skills', 'passeport', 'svg', 'chart', 'hso'],
    showcaseOnly: false,
    usedBy: ['Passeport', 'CoachDashboard', 'ManagerCohort', 'PasseportHistorique'],
    render: () => (
      <div className="flex flex-col gap-section items-center">
        <div className="flex flex-wrap gap-section justify-center items-start">
          <div className="flex flex-col items-center gap-stack-xs">
            <span className="text-caption text-ink-600">sm — sans objectif</span>
            <CompetencyRadar
              size="sm"
              axes={[
                { label: 'Leadership', current: 3 },
                { label: 'Communication', current: 4 },
                { label: 'Analyse', current: 2 },
                { label: 'Technique', current: 4 },
                { label: 'Créativité', current: 1 },
                { label: 'Coopération', current: 3 },
              ]}
              showLegend={false}
            />
          </div>
          <div className="flex flex-col items-center gap-stack-xs">
            <span className="text-caption text-ink-600">md — avec les objectifs</span>
            <CompetencyRadar
              size="md"
              axes={[
                { label: 'Leadership', current: 3, target: 5 },
                { label: 'Communication', current: 4, target: 4 },
                { label: 'Analyse', current: 2, target: 4 },
                { label: 'Technique', current: 4, target: 5 },
                { label: 'Créativité', current: 1, target: 3 },
                { label: 'Coopération', current: 3, target: 4 },
              ]}
              onAxisClick={(axis) => console.log('Axis clicked:', axis.label)}
            />
          </div>
        </div>
        <p className="text-caption text-ink-600 text-center max-w-prose">Un clic sur un libellé d'axe ouvre le détail de la compétence (ici, la console). Échelle Dreyfus de 1 à 5.</p>
      </div>
    ),
  },

  // ── MVP — AI Indicators ──────────────────────────────────────────────────

  {
    name: 'AITransparencyLabel',
    codeName: 'ui/AITransparencyLabel.tsx',
    cssBase: 'AITransparencyLabel',
    description: "Étiquette « IA » transversale, sur tout contenu généré, recommandé ou assisté par l'IA : sm en 11/500 avec une étincelle de 10 px, md en 13/500 avec une de 12. Trois variantes — recommended (info), generated (warning), assisted (ink). Sur une recommandation, dans une suggestion de coach, dans l'assistant. Module 13 bis.",
    keywords: ['ai', 'ia', 'transparency', 'transparence', 'label', 'étiquette', 'generated', 'recommended', 'assisted', 'rgpd'],
    showcaseOnly: false,
    usedBy: ['PerplexityContentDetail', 'ItemRecommendations', 'ChatInterface', 'CoachLearnerProfile'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div className="flex flex-wrap gap-stack-xs items-center">
          <AITransparencyLabel variant="recommended" size="sm" />
          <AITransparencyLabel variant="generated" size="sm" />
          <AITransparencyLabel variant="assisted" size="sm" />
        </div>
        <div className="flex flex-wrap gap-stack-xs items-center">
          <AITransparencyLabel variant="recommended" size="md" />
          <AITransparencyLabel variant="generated" size="md" />
          <AITransparencyLabel variant="assisted" size="md" />
        </div>
        <div className="flex items-start gap-stack-xs p-stack bg-ink-50 rounded-lg">
          <div className="flex flex-col gap-stack-xs">
            <div className="flex items-center gap-stack-xs">
              <span className="text-body font-semibold text-ink-900">Prompt Engineering avancé</span>
              <AITransparencyLabel variant="recommended" size="sm" />
            </div>
            <p className="text-caption text-ink-600">Exemple d'usage en contexte — label inline sur une recommandation IA</p>
          </div>
        </div>
      </div>
    ),
  },

  {
    name: 'AIOverrideButton',
    codeName: 'ui/AIOverrideButton.tsx',
    cssBase: 'AIOverrideButton',
    description: "« Rejeter cette recommandation », pour le coach ou l'admin : un Button outline neutral (sm par défaut) précédé d'une icône. Avec `requireReason`, il déplie une zone de texte — libellé 16/600, filet ink-400 — et deux actions sm, « Annuler » et « Confirmer le rejet ». Transversal IA (module 13 bis).",
    keywords: ['ai', 'ia', 'override', 'reject', 'button', 'coach', 'admin', 'feedback'],
    showcaseOnly: false,
    usedBy: ['CoachLearnerProfile'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div className="flex flex-wrap gap-stack-xs items-center">
          <AIOverrideButton onOverride={(r) => console.log('Override:', r)} />
          <AIOverrideButton label="Écarter la suggestion" size="md" onOverride={(r) => console.log('Override:', r)} />
        </div>
        <div className="border border-ink-100 rounded-lg p-stack flex flex-col gap-stack-xs">
          <p className="text-caption font-semibold text-ink-600">Avec raison obligatoire (requireReason=true) :</p>
          <AIOverrideButton
            requireReason
            onOverride={(r) => console.log('Override with reason:', r)}
          />
        </div>
      </div>
    ),
  },

  // ── MVP — Atrophie Dreyfus ───────────────────────────────────────────────

  {
    name: 'AtrophieIndicator',
    codeName: 'ui/AtrophieIndicator.tsx',
    cssBase: 'AtrophieIndicator',
    description: "Signale qu'un niveau Dreyfus s'érode faute de pratique : rien jusqu'à 90 jours d'inactivité, un avertissement de 91 à 180, un danger au-delà. Pastille en 500 : sm en 11 avec une icône de 12, md en 13 avec une de 16 ; le libellé (« Inactif depuis 120j ») est masquable. Fixe : plus de pulsation depuis le 24/09 (arbitrage n°16, pas de mouvement permanent pour dire un état).",
    keywords: ['atrophie', 'dreyfus', 'inactif', 'badge', 'competence', 'degradation', 'warning', 'gamification'],
    showcaseOnly: false,
    usedBy: ['Gamification', 'CoachEngagement'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div className="flex flex-wrap gap-stack-xs items-center">
          <span className="text-caption text-ink-600">Jusqu’à 90 jours :</span>
          <span className="text-caption text-ink-600 italic">(rien n’est affiché)</span>
          <AtrophieIndicator daysSinceActivity={45} />
        </div>
        <div className="flex flex-wrap gap-stack-xs items-center">
          <span className="text-caption text-ink-600">De 91 à 180 jours :</span>
          <AtrophieIndicator daysSinceActivity={94} currentLevel={3} size="sm" />
          <AtrophieIndicator daysSinceActivity={130} currentLevel={2} size="md" />
        </div>
        <div className="flex flex-wrap gap-stack-xs items-center">
          <span className="text-caption text-ink-600">Au-delà de 180 jours :</span>
          <AtrophieIndicator daysSinceActivity={210} currentLevel={4} size="sm" />
          <AtrophieIndicator daysSinceActivity={365} size="md" />
        </div>
        <div className="flex flex-wrap gap-stack-xs items-center">
          <span className="text-caption text-ink-600">Sans label :</span>
          <AtrophieIndicator daysSinceActivity={100} showLabel={false} />
          <AtrophieIndicator daysSinceActivity={200} showLabel={false} />
        </div>
      </div>
    ),
  },

  // ─── Phase 12 — HeatmapGrid ─────────────────────────────────────────────────
  {
    name: 'HeatmapGrid',
    codeName: 'ui/HeatmapGrid.tsx',
    cssBase: 'HeatmapGrid',
    description: "Grille compétences × apprenants aux niveaux Dreyfus : en-têtes 13/600 ink-600 en casse normale, colonne des noms collante (initiales, nom 16/600), cellules de 40 px au rayon 10 en 13/600 tabulaire, de « — » à D1…D5, le niveau 5 en primary-700 à texte blanc ; légende en 13, de « Novice » à « Expert ». Défilement horizontal sur mobile ; clic sur une cellule. Modules 2 (Passeport) et 10 (Analytics).",
    keywords: ['heatmap', 'competence', 'dreyfus', 'grille', 'coach', 'apprenant', 'niveau', 'radar'],
    usedBy: ['CoachHeatmap', 'FicheApprenantAnalytics'],
    render: () => (
      <HeatmapGrid
        axes={['Leadership', 'Communication', 'Analyse', 'Tech', 'Créativité', 'Coopération']}
        rows={[
          { name: 'Sophie Martin', initials: 'SM', scores: [3, 4, 2, 4, 2, 3] },
          { name: 'Pierre Bernard', initials: 'PB', scores: [2, 3, 1, 2, 1, 2] },
          { name: 'Nadia Ferreira', initials: 'NF', scores: [4, 5, 4, 4, 3, 4] },
          { name: 'Julien Moreau', initials: 'JM', scores: [3, 3, 0, 3, 2, 3] },
          { name: 'Camille Durand', initials: 'CD', scores: [5, 4, 5, 3, 4, 5] },
        ]}
      />
    ),
  },

  // ─── Phase 12 — CorrectionCard ──────────────────────────────────────────────
  {
    name: 'CorrectionCard',
    codeName: 'ui/CorrectionCard.tsx',
    cssBase: 'CorrectionCard',
    description: "Carte d'un travail à corriger : l'apprenant (Avatar sm, nom 16/600, date 13) et l'état en Badge, l'exercice en titre h3 sur deux lignes, la compétence en MetaPill, un extrait en 16 italique ink-700, puis deux Button sm. Statuts pending · in-review · corrected · rejected ; surface card ou tinted. Module 4, Coaching.",
    keywords: ['correction', 'coaching', 'travail', 'feedback', 'corrigé', 'apprenant', 'inbox'],
    usedBy: ['CoachingCorrections', 'CoachCorrectionsQueue', 'CoachCorrectionInterface'],
    render: () => (
      <div className="flex flex-col gap-stack max-w-xl">
        <CorrectionCard
          id="1"
          apprenantName="Sophie Martin"
          apprenantInitials="SM"
          exerciceTitle="Analyse d'une situation de management complexe"
          competence="Leadership"
          submittedAt="Il y a 2h"
          status="pending"
          excerpt="Dans cette situation, j'ai dû gérer un conflit entre deux membres de mon équipe..."
          feedbackCount={0}
          onOpen={() => {}}
          onAssign={() => {}}
        />
        <CorrectionCard
          id="2"
          apprenantName="Pierre Bernard"
          apprenantInitials="PB"
          exerciceTitle="Plan de communication projet Q3"
          competence="Communication"
          submittedAt="Hier"
          status="in-review"
          excerpt="Le plan de communication s'articule autour de trois axes principaux..."
          feedbackCount={2}
          onOpen={() => {}}
        />
        <CorrectionCard
          id="3"
          apprenantName="Nadia Ferreira"
          apprenantInitials="NF"
          exerciceTitle="Rapport d'analyse décisionnelle"
          competence="Analyse"
          submittedAt="Il y a 3j"
          status="corrected"
          feedbackCount={4}
          surface="tinted"
          onOpen={() => {}}
        />
      </div>
    ),
  },

  // ─── Phase 12 — StepTutorial ────────────────────────────────────────────────
  {
    name: 'StepTutorial',
    codeName: 'patterns/StepTutorial.tsx',
    cssBase: 'StepTutorial',
    description: "Tutoriel guidé pas à pas : filet de progression, image optionnelle, compteur « 1 / 3 » en Badge, puis une pastille d'icône de 56 px dont le centre tient la première ligne du titre — un h2 à 28/36 depuis le 24/09 : il suit le h1 de l'écran d'onboarding et nomme le contenu principal ; il était dessiné à 20 — et la description 16 ink-700 ; sous la carte, Précédent · Suivant · Terminer en Button md, et « Passer » en 13. Contrôlé (`currentStep`) ou autonome ; trois tons. Module 3, Onboarding.",
    keywords: ['tutorial', 'wizard', 'onboarding', 'step', 'étape', 'guide', 'tour', 'progression'],
    usedBy: ['OnboardingTutorial'],
    render: () => (
      <div className="max-w-lg mx-auto">
        <StepTutorial
          tone="primary"
          onComplete={() => {}}
          onSkip={() => {}}
          steps={[
            {
              id: 'parcours',
              title: 'Découvre tes parcours',
              description: 'Explore les parcours de formation adaptés à ton profil Dreyfus. Chaque parcours contient des leçons, des exercices pratiques et des ressources complémentaires.',
              icon: <BookOpen size={22} />,
            },
            {
              id: 'coaching',
              title: 'Réserve ton coach',
              description: 'Tu as accès à des sessions de coaching individualisé. Ton coach t\'accompagne dans ta progression et corrige tes travaux pratiques.',
              icon: <GraduationCap size={22} />,
            },
            {
              id: 'passeport',
              title: 'Suis ton Passeport Compétences',
              description: 'Ton radar de compétences H.S.O. évolue au fil de tes activités. Définis tes objectifs et observe ta progression Dreyfus en temps réel.',
              icon: <Target size={22} />,
            },
          ]}
        />
      </div>
    ),
  },

  // ─── Phase 14.1 — Première expérience flow ──────────────────────────────────
  {
    name: 'OptionGrid',
    codeName: 'patterns/OptionGrid.tsx',
    showcaseOnly: true,
    cssBase: 'OptionGrid',
    description: "Grille d'options à choisir, une ou plusieurs : options de 44 px au moins, rayon 14, libellé 16/600 ; la description (13 ink-600) ne s'affiche qu'en icon-left et text-only. Trois dispositions (icon-top · icon-left · text-only), trois tons ; deux colonnes, trois dès 512 px de conteneur.",
    keywords: ['select', 'options', 'cards', 'pick', 'choice', 'role', 'sector', 'onboarding', 'radio', 'checkbox'],
    render: () => {
      const [role, setRole] = React.useState('Manager');
      const [skills, setSkills] = React.useState<string[]>(['Leadership']);
      return (
        <div className="flex flex-col gap-section max-w-2xl">
          <div className="flex flex-col gap-stack">
            <span className="text-caption font-semibold text-ink-600">Choix unique · ton warm · icon-top</span>
            <OptionGrid
              tone="warm"
              value={role}
              onChange={setRole}
              columns={3}
              options={[
                { id: 'Manager',    label: 'Manager',    icon: Briefcase },
                { id: 'Formateur',  label: 'Formateur',  icon: GraduationCap },
                { id: 'Coach',      label: 'Coach',      icon: HeartHandshake },
                { id: 'Apprenant',  label: 'Apprenant',  icon: BookOpen },
                { id: 'Consultant', label: 'Consultant', icon: Zap },
                { id: 'Autre',      label: 'Autre',      icon: UserIcon },
              ]}
            />
          </div>
          <div className="flex flex-col gap-stack">
            <span className="text-caption font-semibold text-ink-600">Choix multiple · ton brand · text-only</span>
            <OptionGrid
              multi
              tone="brand"
              value={skills}
              onChange={(id) => setSkills((curr) => (curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]))}
              columns={2}
              layout="text-only"
              options={[
                { id: 'Leadership',    label: 'Leadership',    description: 'Influence et posture de leader' },
                { id: 'Communication', label: 'Communication', description: 'Écrit et oral en équipe' },
                { id: 'IA & Tech',     label: 'IA & Tech',     description: 'Maîtrise des outils IA' },
                { id: 'Productivité',  label: 'Productivité',  description: 'Gestion du temps et focus' },
              ]}
            />
          </div>
        </div>
      );
    },
  },
  {
    name: 'DreyfusLevelSelector',
    codeName: 'ui/DreyfusLevelSelector.tsx',
    cssBase: 'DreyfusLevelSelector',
    description: "Choix d'un niveau Dreyfus parmi cinq, pour un positionnement : options de 44 px au moins, filet 2 px (au cran 700 une fois choisie, fond 50), chiffre en League Spartan 20/700 au cran 800, libellé 16/600, description 13 ink-600. Une à cinq colonnes selon la largeur ; `radiogroup` navigable aux flèches ; niveaux remplaçables (`levels`).",
    keywords: ['dreyfus', 'level', 'positionnement', 'competence', 'likert', 'self-assessment', 'questionnaire', 'novice', 'expert'],
    usedBy: ['OnboardingQuestionnaire'],
    render: () => {
      const [level, setLevel] = React.useState<number | undefined>(3);
      return (
        <div className="flex flex-col gap-stack max-w-content">
          <span className="text-caption font-semibold text-ink-600">Tone warm · niveau 3 sélectionné</span>
          <DreyfusLevelSelector tone="warm" value={level} onChange={setLevel} />
        </div>
      );
    },
  },

  // ─── Figma DS extract — DreyfusSlider ────────────────────────────────────────
  {
    name: 'DreyfusSlider',
    codeName: 'ui/DreyfusSlider.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Choix d'un niveau Dreyfus sur une piste horizontale (D1 à D5), plus compact que DreyfusLevelSelector : piste de 10 px, curseur de 28 px, un `<input type=\"range\">` invisible pour le clavier ; libellés en 13/600 ink-600 sous la piste, l'actif au cran 800 du ton sans changer de graisse ; description en 13. Tons brand · warm · sun ; libellés canoniques (DREYFUS_LABELS, cahier 02).",
    keywords: ['dreyfus', 'slider', 'level', 'positionnement', 'competence', 'track', 'horizontal', 'compact', 'touch'],
    usedBy: ['Positionnement'],
    render: () => {
      const [v1, setV1] = React.useState<number | undefined>(undefined);
      const [v2, setV2] = React.useState<number | undefined>(3);
      const [v3, setV3] = React.useState<number | undefined>(2);
      return (
        <div className="flex flex-col gap-section max-w-xl">
          <div className="flex flex-col gap-stack">
            <span className="text-caption font-semibold text-ink-600">Tone brand · rien sélectionné</span>
            <DreyfusSlider value={v1} onChange={(n) => setV1(n)} tone="brand" />
          </div>
          <div className="flex flex-col gap-stack">
            <span className="text-caption font-semibold text-ink-600">Tone warm · D3 sélectionné</span>
            <DreyfusSlider value={v2} onChange={(n) => setV2(n)} tone="warm" />
          </div>
          <div className="flex flex-col gap-stack">
            <span className="text-caption font-semibold text-ink-600">Tone sun · D2 sélectionné</span>
            <DreyfusSlider value={v3} onChange={(n) => setV3(n)} tone="sun" />
          </div>
        </div>
      );
    },
  },

  {
    name: 'CongratulationsCard',
    codeName: 'patterns/CongratulationsCard.tsx',
    cssBase: 'CongratulationsCard',
    description: "Bloc de fin d'étape (onboarding, parcours, module) : grande pastille d'icône, Badge large, titre h1 36 et chapô 18/28 ink-700 à 12 px. Le bloc XP optionnel (« +n XP », niveau, barre) relève de ce que l'arbitrage n°18 retire de l'app apprenant : il n'est plus montré ici.",
    keywords: ['congratulations', 'success', 'celebration', 'milestone', 'completion', 'reward', 'xp', 'onboarding'],
    usedBy: ['OnboardingSuccess'],
    render: () => (
      <div className="flex flex-col items-center max-w-xl mx-auto">
        <CongratulationsCard
          tone="brand"
          badgeLabel="Profil complété !"
          title="Bienvenue sur The Learning Society"
          summary="Ton profil est configuré et ton passeport de compétences est prêt. Tu peux maintenant commencer ton parcours."
        />
      </div>
    ),
  },
  {
    name: 'NextStepsGrid',
    codeName: 'patterns/NextStepsGrid.tsx',
    cssBase: 'NextStepsGrid',
    description: "Grille « Et maintenant ? » : une carte-bouton par piste (padding 24), pastille d'icône de 48 px teintée, titre h3 20, description 16 ink-700, action en 13/600 au cran 800 du ton. Ton par carte, pour varier les pistes ; une à trois colonnes.",
    keywords: ['next steps', 'actions', 'cta', 'cards', 'onboarding success', 'guide', 'next'],
    usedBy: ['OnboardingSuccess', 'EmptyDashboardState'],
    render: () => (
      <div className="max-w-content">
        <NextStepsGrid
          items={[
            { id: 'parcours', icon: <BookOpen size={22} />, title: 'Explore tes parcours', description: 'Découvre les parcours adaptés à ton profil.', cta: 'Voir les parcours', tone: 'brand', onClick: () => {} },
            { id: 'coach', icon: <GraduationCap size={22} />, title: 'Rencontre ton coach', description: 'Planifie une première session de coaching.', cta: 'Réserver', tone: 'warm', onClick: () => {} },
            { id: 'passeport', icon: <Target size={22} />, title: 'Ouvre ton Passeport', description: 'Ton radar de compétences est prêt.', cta: 'Voir mon passeport', tone: 'sun', onClick: () => {} },
          ]}
        />
      </div>
    ),
  },
  {
    name: 'EmptyDashboardState',
    codeName: 'patterns/EmptyDashboardState.tsx',
    cssBase: 'EmptyDashboardState',
    description: "Tableau de bord du premier jour, juste après l'onboarding : un titre h2 28 et une phrase 16 ink-700, puis une carte dominante — MetaPill « Premier pas », titre 20, texte 16, action — et la NextStepsGrid des pistes suivantes, en deux colonnes.",
    keywords: ['empty', 'cold start', 'first time', 'dashboard', 'welcome', 'onboarding', 'new user'],
    usedBy: ['Dashboard'],
    render: () => (
      <div className="max-w-4xl">
        <EmptyDashboardState firstName="Sophie" />
      </div>
    ),
  },

  // ─── Phase 14.2a — Apprenant core (viewer shell primitives) ────────────────
  {
    name: 'ProgressDots',
    codeName: 'ui/ProgressDots.tsx',
    cssBase: 'ProgressDots',
    description: "Points de progression d'un carrousel ou d'un assistant : le point actif s'allonge (16 · 24 · 32 px) pour dire la position. Tailles xs · sm · md (6 · 8 · 10 px), trois tons ; `onSelect` rend les points cliquables.",
    keywords: ['progress', 'dots', 'carousel', 'wizard', 'indicator', 'pagination'],
    usedBy: ['LessonNavigation', 'AstucesViewer', 'FlashcardsViewer', 'LessonPlayer'],
    render: () => {
      const [primaryIdx, setPrimaryIdx] = React.useState(2);
      const [warmIdx, setWarmIdx] = React.useState(1);
      const [sunIdx, setSunIdx] = React.useState(3);
      return (
        <div className="flex flex-col gap-stack max-w-xl">
          <div className="flex items-center gap-stack">
            <span className="text-caption text-ink-600 w-24">Primary · md</span>
            <ProgressDots total={5} current={primaryIdx} tone="primary" size="md" onSelect={setPrimaryIdx} />
          </div>
          <div className="flex items-center gap-stack">
            <span className="text-caption text-ink-600 w-24">Warm · sm</span>
            <ProgressDots total={5} current={warmIdx} tone="warm" size="sm" onSelect={setWarmIdx} />
          </div>
          <div className="flex items-center gap-stack">
            <span className="text-caption text-ink-600 w-24">Sun · xs</span>
            <ProgressDots total={7} current={sunIdx} tone="sun" size="xs" onSelect={setSunIdx} />
          </div>
        </div>
      );
    },
  },
  {
    name: 'FlipCard',
    codeName: 'patterns/FlipCard.tsx',
    cssBase: 'FlipCard',
    description: "Carte à retourner (rotation 3D). Au recto, une photo voilée, une bulle d'icône, la catégorie en MetaPill md, le titre (20, puis 28 dès 640 px) et une indication en 13/600 ; au verso, un dégradé au cran 700 du ton, la réponse en chapô 18/28 et le détail en 16. Tons primary · warm · sun ; hauteur réglable (380 par défaut).",
    keywords: ['flip', 'card', 'flashcard', '3d', 'rotate', 'learning', 'tone'],
    usedBy: ['FlashcardsViewer'],
    render: () => {
      const [flipped, setFlipped] = React.useState(false);
      const [tone, setTone] = React.useState<'primary' | 'warm' | 'sun'>('primary');
      return (
        <div className="flex flex-col gap-stack max-w-2xl mx-auto">
          <div className="flex gap-stack-xs justify-center">
            {(['primary', 'warm', 'sun'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={`px-3 py-1.5 rounded-pill text-caption font-semibold transition-colors ${tone === t ? 'bg-primary-700 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <FlipCard
            front={{
              image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1080&q=80',
              icon: <Target className="icon-xl" />,
              category: 'Prompt engineering',
              title: 'Les 4 Piliers du Prompt',
            }}
            back={{
              content: 'Rôle, contexte, instruction, format',
              details: 'Ces 4 éléments structurent un prompt clair pour obtenir les meilleurs résultats.',
            }}
            isFlipped={flipped}
            onFlip={() => setFlipped((f) => !f)}
            tone={tone}
          />
          <p className="text-center font-body text-caption text-ink-600">
            {flipped ? 'Verso visible — cliquer pour retourner' : 'Recto — cliquer pour voir la réponse'}
          </p>
        </div>
      );
    },
  },

  // ─── Figma DS extract — BehavioralTileGrid ───────────────────────────────────
  {
    name: 'BehavioralTileGrid',
    codeName: 'patterns/BehavioralTileGrid.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Grille des piliers d'une compétence (auto-fit, 240 px au moins par tuile) : titre de section en h2 28, puis pour chaque tuile une pastille décorative de 40 px, 16 px, un titre h3 20, 8 px, la description 16 ink-700, 12 px, les étiquettes. Quatre fonds cycliques. Dans LessonPlayer (section Engagement) et dans le positionnement de l'onboarding.",
    keywords: ['behavioral', 'tile', 'grid', 'pillar', 'competence', 'engagement', 'lesson', 'viewer', 'auto-fit'],
    usedBy: ['LessonPlayer', 'OnboardingUnified', 'OnboardingQuestionnaireConversational'],
    render: () => (
      <BehavioralTileGrid
        heading="Les 4 Piliers du Leadership"
        tiles={[
          {
            title: 'Vision & Stratégie',
            description: 'Définir une direction claire et inspirer les équipes vers un objectif commun.',
            tags: ['Vision', 'Stratégie'],
          },
          {
            title: 'Communication',
            description: 'Transmettre les idées avec clarté et écouter activement pour mieux collaborer.',
            tags: ['Oral', 'Écrit'],
          },
          {
            title: 'Décision & Action',
            description: 'Prendre des décisions rapides avec des informations incomplètes et s\'y tenir.',
            tags: ['Décision', 'Biais'],
          },
          {
            title: 'Développement d\'équipe',
            description: 'Faire grandir chaque collaborateur selon ses forces et ses axes de progression.',
            tags: ['Coaching', 'Feedback'],
          },
        ]}
      />
    ),
  },

  {
    name: 'LessonNavigation',
    codeName: 'patterns/LessonNavigation.tsx',
    cssBase: 'LessonNavigation',
    description: "Pied de navigation des lecteurs : [Précédent] · points · [Suivant ou Terminer]. Boutons soft md (44 px, 16/700), libellés masqués sous 640 px (icône seule avec son nom accessible), points ProgressDots sm. Au dernier écran, avec `onFinish`, « Suivant » devient « Terminer ».",
    keywords: ['navigation', 'lesson', 'prev', 'next', 'finish', 'footer', 'viewer'],
    usedBy: ['LessonPlayer', 'AstucesViewer', 'FlashcardsViewer'],
    render: () => {
      const [pos, setPos] = React.useState(3);
      const total = 7;
      return (
        <div className="max-w-2xl mx-auto p-stack-lg rounded-2xl bg-white shadow-sm border border-ink-100">
          <LessonNavigation
            tone="primary"
            current={pos}
            total={total}
            onPrev={() => setPos((p) => Math.max(1, p - 1))}
            onNext={() => setPos((p) => Math.min(total, p + 1))}
            onFinish={() => alert('Leçon terminée !')}
            onDotSelect={(idx) => setPos(idx + 1)}
          />
        </div>
      );
    },
  },

  // ── FIGMA DS — extracted shared components ────────────────────────────────

  {
    name: 'AstucesCard',
    codeName: 'learning/AstucesCard.tsx',
    cssBase: 'AstucesCard (tip scroll-story card)',
    usedBy: ['AstucesViewer'],
    description: "Astuce du lecteur en défilement : numéro dans un carré de 40 px, catégorie en MetaPill, image, titre (20, puis 28 dès 640 px) ink-900, description 16 ink-700, exemples en rangées à 16 px. Filet 2 px au cran 400 du ton ; ton sun par défaut.",
    keywords: ['astuce', 'tip', 'viewer', 'scroll-story', 'card', 'learning', 'tone-aware', 'example'],
    render: () => (
      <div className="max-w-xl mx-auto">
        <AstucesCard
          number={1}
          badge="Productivité"
          image="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"
          title="Raccourcis Clavier"
          description="Gagnez du temps avec les raccourcis essentiels pour naviguer rapidement dans l'application."
          examples={['Ctrl+Shift+P : Palette de commandes', 'Ctrl+K : Recherche rapide', 'Alt+Tab : Changer de fenêtre']}
          tone="sun"
        />
      </div>
    ),
  },

  {
    name: 'ResourceListItem',
    codeName: 'learning/ResourceListItem.tsx',
    cssBase: 'ResourceListItem (resource row)',
    usedBy: ['MasterclassReplay', 'AtelierPresentiel'],
    description: "Rangée de ressource complémentaire : icône, libellé 16/600 ink-900, badge et action à droite ; fond ink-50, rayon 14, padding 16. Rendue en `<button>` avec `onClick`, en `<div>` sinon. Dans les colonnes « Matériaux » et « Ressources » des lecteurs de masterclass et d'atelier.",
    keywords: ['resource', 'list', 'item', 'download', 'file', 'material', 'sidebar'],
    render: () => (
      <div className="flex flex-col gap-stack-xs max-w-sm">
        <ResourceListItem
          icon={<FileText size={14} />}
          label="Support de l'atelier"
          badge={<Badge variant="neutral" size="compact">PDF</Badge>}
          action={<Button emphasis="outline" size="sm">Télécharger</Button>}
        />
        <ResourceListItem
          icon={<Video size={14} />}
          label="Replay vidéo de la session"
          onClick={() => {}}
        />
        <ResourceListItem
          label="Fiche mémo stress & récupération"
        />
      </div>
    ),
  },

  {
    name: 'EtapeAccordion',
    codeName: 'patterns/EtapeAccordion.tsx',
    cssBase: 'EtapeAccordion (step accordion)',
    usedBy: ['CourseDetail', 'LearningPathDetail'],
    description: "Accordéon d'une étape de parcours : en-tête avec le titre en 16/600, 4 px, la durée en légende 13 ink-600, et un chevron de 20. Deux variantes : default (liste compacte bordée, CourseDetail) et panel (grande carte, LearningPathDetail). `header` remplace le titre et la durée ; `locked` désactive le clic et masque le chevron ; `bodyClassName` règle l'enveloppe du contenu.",
    keywords: ['accordion', 'step', 'etape', 'parcours', 'programme', 'expand', 'collapse', 'locked', 'lesson'],
    render: () => {
      const [open1, setOpen1] = React.useState(true);
      const [open2, setOpen2] = React.useState(false);
      return (
        <div className="flex flex-col gap-stack max-w-lg">
          <EtapeAccordion
            title="Les fondamentaux du prompt"
            duration="45 min"
            isOpen={open1}
            onToggle={() => setOpen1((o) => !o)}
            className="mb-0"
            bodyClassName="px-stack pb-stack"
          >
            <p className="text-body text-ink-700 pt-2 m-0">Contenu de l'étape — leçons, exercices, ressources.</p>
          </EtapeAccordion>
          <EtapeAccordion
            title="Devenir prompt designer"
            duration="1h 30"
            isOpen={open2}
            onToggle={() => setOpen2((o) => !o)}
            locked
            className="mb-0"
          >
            <p className="text-body text-ink-700 pt-2 m-0">Contenu verrouillé</p>
          </EtapeAccordion>
        </div>
      );
    },
  },

  /* ── Phase 19 — Form Composites ──────────────────────────────────────────── */
  {
    name: 'RadioGroup',
    codeName: 'ui/RadioGroup.tsx',
    cssBase: 'Tailwind (no BEM)',
    subCategory: 'Form groups',
    usedBy: ['Onboarding', 'Positionnement', 'SessionFeedback'],
    description: "Groupe de boutons radio, en fieldset et legend. Légende 16/600 ink-900 ; options en 16/600 avec leur description en légende 13 ink-600, 12 px entre deux options ; indicateur de 20 px calé sur la première ligne, coché au cran 700. Variantes default et card (carte cochée : filet 400, fond 50), orientation verticale ou horizontale, trois tons. Aide et erreur comme Input.",
    keywords: ['radio', 'group', 'form', 'select', 'choice', 'fieldset', 'card', 'tone'],
    render: () => {
      const [v1, setV1] = React.useState('intermediate');
      const [v2, setV2] = React.useState('coaching');
      const opts1 = [
        { value: 'beginner', label: 'Débutant', description: 'Moins de 2 ans d\'expérience' },
        { value: 'intermediate', label: 'Intermédiaire', description: '2 à 5 ans d\'expérience' },
        { value: 'advanced', label: 'Avancé', description: 'Plus de 5 ans' },
      ];
      const opts2 = [
        { value: 'solo', label: 'Apprentissage solo' },
        { value: 'coaching', label: 'Avec coaching' },
        { value: 'enterprise', label: 'Formation équipe', disabled: true },
      ];
      return (
        <div className="flex flex-col gap-section">
          <div className="flex flex-wrap gap-section items-start">
            <RadioGroup name="level" label="Niveau actuel" required value={v1} onChange={setV1} options={opts1} orientation="vertical" />
            <RadioGroup name="mode" label="Mode d'apprentissage" value={v2} onChange={setV2} options={opts2} orientation="horizontal" hint="Certaines options nécessitent un abonnement" />
          </div>
          <div>
            <p className="text-caption font-semibold text-ink-600 mb-stack">Variant card — tone primary / warm / sun</p>
            <div className="flex flex-col gap-stack">
              <RadioGroup name="goal" label="Objectif" variant="card" tone="primary" value={v1} onChange={setV1} options={opts1.slice(0,2)} orientation="horizontal" />
              <RadioGroup name="goalw" label="Ton warm" variant="card" tone="warm" value="coaching" onChange={() => {}} options={opts2.slice(0,2)} orientation="horizontal" />
            </div>
          </div>
        </div>
      );
    },
  },

  {
    name: 'CheckboxGroup',
    codeName: 'ui/CheckboxGroup.tsx',
    cssBase: 'Tailwind (no BEM)',
    subCategory: 'Form groups',
    usedBy: ['Onboarding', 'FilterBar', 'Account'],
    description: "Cases à cocher en groupe, en fieldset et legend ; `value` est un tableau. Même anatomie que RadioGroup : légende 16/600, options en 16/600 et description 13 ink-600, indicateur de 20 px calé sur la première ligne, coché au cran 700 avec une coche. Variantes default et card, orientation verticale ou horizontale, trois tons.",
    keywords: ['checkbox', 'group', 'multi', 'select', 'form', 'fieldset', 'card', 'tone'],
    render: () => {
      const [vals, setVals] = React.useState<string[]>(['newsletter', 'badges']);
      const opts = [
        { value: 'newsletter', label: 'Newsletter hebdo', description: 'Récap des nouveautés chaque lundi' },
        { value: 'badges', label: 'Notifications badges', description: 'Récompenses et achievements' },
        { value: 'coaching', label: 'Rappels coaching', description: 'J-1 avant chaque session' },
        { value: 'system', label: 'Messages système', disabled: true },
      ];
      const optsSmall = opts.slice(0, 3);
      return (
        <div className="flex flex-col gap-section">
          <div className="flex flex-wrap gap-section items-start">
            <CheckboxGroup name="notifs" label="Notifications" value={vals} onChange={setVals} options={opts} />
            <CheckboxGroup name="notifsh" label="Horizontal" value={vals} onChange={setVals} options={optsSmall} orientation="horizontal" hint={`${vals.length} sélectionnée(s)`} />
          </div>
          <div>
            <p className="text-caption font-semibold text-ink-600 mb-stack">Variant card — tone primary</p>
            <CheckboxGroup name="notifsc" label="Préférences" variant="card" tone="primary" value={vals} onChange={setVals} options={optsSmall} orientation="horizontal" />
          </div>
        </div>
      );
    },
  },

  {
    name: 'FormSection',
    codeName: 'ui/FormSection.tsx',
    cssBase: 'Tailwind (no BEM)',
    subCategory: 'Form groups',
    usedBy: ['Account', 'Profile'],
    description: "Section de formulaire : pastille d'icône (IconChip sm), titre h3 20/700, description 16 ink-700 à la largeur de lecture et à 8 px sous le titre, puis un filet. Rétractable en option (`collapsible`, `defaultExpanded`), par un bouton-icône. Élément `<section>`.",
    keywords: ['form', 'section', 'group', 'title', 'collapsible', 'accordion', 'settings'],
    render: () => (
      <div className="flex flex-col gap-section max-w-lg">
        <FormSection title="Informations personnelles" description="Ces informations sont utilisées pour personnaliser votre expérience d'apprentissage." titleIcon={<UserIcon size={16} />}>
          <Input label="Prénom" placeholder="Marie" size="md" />
          <Input label="Nom de famille" placeholder="Dupont" size="md" />
        </FormSection>
        <FormSection title="Préférences de contact" description="Contrôlez comment nous vous contactons." collapsible defaultExpanded={false}>
          <Input label="Email" placeholder="marie@example.com" size="md" />
        </FormSection>
      </div>
    ),
  },

  {
    name: 'InputGroup',
    codeName: 'ui/InputGroup.tsx',
    cssBase: 'Tailwind (no BEM)',
    subCategory: 'Form groups',
    usedBy: ['Account', 'Profile', 'Onboarding'],
    description: "Disposition d'un groupe de champs : vertical (16 px entre les champs), horizontal (12 px, alignés par le bas) ou grille de 2 à 4 colonnes (16 px), une seule colonne sous 640 px. Libellé de groupe 16/600, aide et erreur partagées.",
    keywords: ['input', 'group', 'layout', 'form', 'grid', 'horizontal', 'vertical', 'columns'],
    render: () => (
      <div className="flex flex-col gap-section">
        <p className="text-caption font-semibold text-ink-600 m-0">Grille · 2 colonnes</p>
        <InputGroup label="Adresse postale" layout="grid" columns={2}>
          <Input label="Rue" placeholder="12 rue de la Paix" />
          <Input label="Code postal" placeholder="75001" />
          <Input label="Ville" placeholder="Paris" />
          <Input label="Pays" placeholder="France" />
        </InputGroup>
        <p className="text-caption font-semibold text-ink-600 m-0">Horizontal</p>
        <InputGroup layout="horizontal">
          <Input label="Prénom" placeholder="Marie" />
          <Input label="Nom" placeholder="Dupont" />
        </InputGroup>
      </div>
    ),
  },

  {
    name: 'SimpleTable',
    codeName: 'ui/SimpleTable.tsx',
    cssBase: 'Tailwind (no BEM)',
    subCategory: 'List composites',
    usedBy: ['CoachEnterpriseDashboard', 'Leaderboard', 'Analytics'],
    description: "Table sémantique à colonnes déclaratives (`ColumnDef` : en-tête, accesseur, alignement, largeur). En-têtes 13/600 ink-600 en casse normale, cellules 16 × 12, chiffres tabulaires, filets ink-100. Options : `striped`, `onRowClick`, `emptyLabel`, `caption` (13 ink-600). Défilement horizontal sur mobile.",
    keywords: ['table', 'données', 'colonnes', 'lignes', 'rows', 'sort', 'striped', 'data'],
    render: () => {
      type User = { id: string; name: string; role: string; score: number; status: string };
      const data: User[] = [
        { id: '1', name: 'Marie Dupont', role: 'Apprenante', score: 94, status: 'Actif' },
        { id: '2', name: 'Jean Martin', role: 'Manager', score: 78, status: 'Actif' },
        { id: '3', name: 'Sophie Bernard', role: 'Apprenante', score: 61, status: 'Inactif' },
        { id: '4', name: 'Lucas Petit', role: 'Coach', score: 87, status: 'Actif' },
      ];
      const columns = [
        { key: 'name', header: 'Nom', accessor: (r: User) => <span className="font-semibold">{r.name}</span> },
        { key: 'role', header: 'Rôle', accessor: (r: User) => r.role },
        { key: 'score', header: 'Score', accessor: (r: User) => `${r.score} pts`, align: 'center' as const },
        /* Un statut est un état : Badge, pas une pastille faite main. */
        { key: 'status', header: 'Statut', accessor: (r: User) => (
          <Badge variant={r.status === 'Actif' ? 'success' : 'neutral'} size="compact">{r.status}</Badge>
        )},
      ];
      return (
        <div className="flex flex-col gap-section">
          <p className="text-caption font-semibold text-ink-600 m-0">Par défaut</p>
          <SimpleTable columns={columns} rows={data} keyExtractor={(r) => r.id} />
          <p className="text-caption font-semibold text-ink-600 m-0">Rayée, rangées cliquables</p>
          <SimpleTable columns={columns} rows={data} keyExtractor={(r) => r.id} striped onRowClick={() => {}} />
          <p className="text-caption font-semibold text-ink-600 m-0">Vide</p>
          <SimpleTable columns={columns} rows={[]} keyExtractor={(r) => r.id} emptyLabel="Aucun membre dans cette équipe" />
        </div>
      );
    },
  },

  {
    name: 'PaginatedList',
    codeName: 'ui/PaginatedList.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    subCategory: 'List composites',
    description: "Pagination d'une liste quelconque : `items`, `renderItem`, `pageSize` (10), `itemLabel`. Boutons ronds de 36 px aux numéros 13/700 tabulaires, plage « 1–10 / 42 » en 13 ink-600, contrôles réduits (n / N) sur mobile. Elle double `ui/Pagination`, qui tient l'échelle des contrôles.",
    keywords: ['pagination', 'pages', 'liste', 'navigation', 'next', 'prev', 'parcours'],
    render: () => {
      const ITEMS = Array.from({ length: 23 }, (_, i) => ({ id: String(i + 1), title: `Parcours ${i + 1}`, category: i % 3 === 0 ? 'Leadership' : i % 3 === 1 ? 'IA & Data' : 'Communication' }));
      return (
        <PaginatedList
          items={ITEMS}
          pageSize={5}
          itemLabel="parcours"
          renderItem={(item) => (
            <div key={item.id} className="flex items-center justify-between px-stack py-3 border-b border-ink-100 last:border-0 hover:bg-ink-50 rounded-lg transition-colors">
              <span className="font-semibold text-ink-900">{item.title}</span>
              <span className="text-caption text-ink-600">{item.category}</span>
            </div>
          )}
          listClassName="border border-ink-200 rounded-xl overflow-hidden"
        />
      );
    },
  },

  {
    name: 'FilteredList',
    codeName: 'ui/FilteredList.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    subCategory: 'List composites',
    description: "Liste filtrée par une recherche : un champ (fait main, 40 px), un compteur en 13 ink-600, un message vide en 16 italique. `filterFn`, `renderItem`, `placeholder`, `emptyLabel`, `showCount`, `itemLabel` ; `useDeferredValue` évite les à-coups sur une longue liste.",
    keywords: ['filtre', 'recherche', 'search', 'liste', 'filter', 'query', 'input'],
    render: () => {
      const ITEMS = [
        { id: '1', title: 'Introduction au microlearning', cat: 'Pédagogie' },
        { id: '2', title: 'Biais cognitifs en entreprise', cat: 'Psychologie' },
        { id: '3', title: 'Prompt Engineering avancé', cat: 'IA & Outils' },
        { id: '4', title: 'Leadership situationnel', cat: 'Management' },
        { id: '5', title: 'Feedback et ancrage mémoriel', cat: 'Pédagogie' },
        { id: '6', title: 'Gestion du changement', cat: 'Management' },
      ];
      return (
        <FilteredList
          items={ITEMS}
          filterFn={(item, q) => item.title.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q)}
          placeholder="Rechercher un parcours…"
          itemLabel="parcours"
          emptyLabel="Aucun parcours ne correspond à ta recherche."
          renderItem={(item) => (
            <div key={item.id} className="flex items-center justify-between px-stack py-3 border-b border-ink-100 last:border-0 hover:bg-ink-50 rounded-lg transition-colors">
              <span className="font-semibold text-ink-900">{item.title}</span>
              <span className="text-caption text-ink-600">{item.cat}</span>
            </div>
          )}
          listClassName="border border-ink-200 rounded-xl overflow-hidden"
        />
      );
    },
  },

  /* ── Phase 19 Tier 3 ───────────────────────────────────────────────────── */
  {
    name: 'StepIndicator',
    codeName: 'ui/StepIndicator.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    subCategory: 'Form groups',
    description: "Indicateur d'étapes d'un formulaire : pastilles de 32 px (chiffre 13/600 tabulaire), l'active au cran 700, les faites avec une coche. À l'horizontale, libellé 13/600 et description en 13 ; à la verticale, libellé 16/600 et description 13. L'étape active est au cran 800 du ton. Trois tons.",
    keywords: ['steps', 'étapes', 'onboarding', 'progression', 'wizard', 'checkout', 'stepper'],
    render: () => {
      const STEPS = [
        { label: 'Profil', description: 'Infos personnelles' },
        { label: 'Parcours', description: 'Ton premier parcours' },
        { label: 'Objectifs', description: 'Ce que tu veux atteindre' },
        { label: 'Confirmation' },
      ];
      return (
        <div className="flex flex-col gap-section">
          <div>
            <p className="text-caption font-semibold text-ink-600 m-0 mb-3">Horizontal — étape 3 sur 4</p>
            <StepIndicator steps={STEPS} currentStep={2} orientation="horizontal" tone="primary" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            <div>
              <p className="text-caption font-semibold text-ink-600 m-0 mb-3">Vertical — primary</p>
              <StepIndicator steps={STEPS} currentStep={1} orientation="vertical" tone="primary" />
            </div>
            <div>
              <p className="text-caption font-semibold text-ink-600 m-0 mb-3">Vertical — warm</p>
              <StepIndicator steps={STEPS} currentStep={2} orientation="vertical" tone="warm" />
            </div>
            <div>
              <p className="text-caption font-semibold text-ink-600 m-0 mb-3">Vertical — sun</p>
              <StepIndicator steps={STEPS} currentStep={3} orientation="vertical" tone="sun" />
            </div>
          </div>
        </div>
      );
    },
  },

  {
    name: 'ModalForm',
    codeName: 'ui/ModalForm.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    subCategory: 'Form groups',
    description: "Formulaire en dialogue natif (`<dialog>`) au rayon 24 : en-tête — titre en h2 au pas h3 (20/700), description 16 ink-700 —, corps (24 · 20 · 16), puis les actions à 24 px, toutes en Button sm : l'action destructive à gauche, Annuler en outline et la soumission en soft à droite. Largeur xs 320 · sm 384 · md 448 · lg 512 ; fermeture par le voile ou Échap.",
    keywords: ['modal', 'dialog', 'form', 'formulaire', 'popup', 'overlay', 'submit'],
    render: () => {
      const [open, setOpen] = React.useState(false);
      const [submitting, setSubmitting] = React.useState(false);
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => { setSubmitting(false); setOpen(false); }, 1500);
      };
      return (
        <div className="flex flex-wrap gap-stack">
          <Button emphasis="solid" size="sm" onClick={() => setOpen(true)}>
            Ouvrir le formulaire
          </Button>
          <ModalForm
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
            title="Modifier le profil"
            description="Tes informations sont visibles de ton coach et des membres de ton équipe."
            submitLabel="Enregistrer"
            submitting={submitting}
            destructiveLabel="Supprimer le compte"
            onDestructive={() => setOpen(false)}
            size="sm"
          >
            {/* Les champs du système, pas des imitations : la démo posait un
                <input> fait main à 40 px, filet ink-200 (1,5:1). */}
            <Input label="Prénom" id="modalform-prenom" defaultValue="Marie" />
            <Select
              label="Rôle"
              id="modalform-role"
              options={[
                { value: 'apprenante', label: 'Apprenante' },
                { value: 'manager', label: 'Manager' },
                { value: 'coach', label: 'Coach' },
              ]}
              defaultValue="apprenante"
            />
          </ModalForm>
        </div>
      );
    },
  },

  {
    name: 'FilterableCardGrid',
    codeName: 'ui/FilterableCardGrid.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    subCategory: 'List composites',
    description: "Grille de cartes filtrable : une recherche, les catégories en FilterChip md, une bascule grille / liste (32 px, faite main), deux à quatre colonnes en requête de conteneur. `filterFn`, `categories` et `categoryFn`, `columns`, `allowLayoutToggle`, `renderCard(item, index, layout)`. Distincte de CardGrid, qui ne fait que la mise en page.",
    keywords: ['grid', 'grille', 'cards', 'filtre', 'catégories', 'layout', 'search', 'toggle'],
    render: () => {
      type Resource = { id: string; title: string; cat: string; author: string };
      const RESOURCES: Resource[] = [
        { id: '1', title: 'Introduction au microlearning', cat: 'Pédagogie', author: 'M. Dupont' },
        { id: '2', title: 'Biais cognitifs en entreprise', cat: 'Psychologie', author: 'Dr. Bernard' },
        { id: '3', title: 'Prompt Engineering avancé', cat: 'IA & Outils', author: 'L. Petit' },
        { id: '4', title: 'Leadership situationnel', cat: 'Management', author: 'S. Martin' },
        { id: '5', title: 'Feedback et ancrage mémoriel', cat: 'Pédagogie', author: 'C. Lefèvre' },
        { id: '6', title: 'Gestion du changement', cat: 'Management', author: 'A. Moreau' },
        { id: '7', title: 'Éthique de l\'IA', cat: 'IA & Outils', author: 'P. Durand' },
        { id: '8', title: 'Communication non-violente', cat: 'Psychologie', author: 'N. Fontaine' },
        { id: '9', title: 'Design pédagogique', cat: 'Pédagogie', author: 'O. Simon' },
      ];
      return (
        <FilterableCardGrid
          items={RESOURCES}
          filterFn={(item, q) => item.title.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q) || item.author.toLowerCase().includes(q)}
          categories={['Pédagogie', 'Psychologie', 'IA & Outils', 'Management']}
          categoryFn={(item) => item.cat}
          columns={3}
          allowLayoutToggle={true}
          emptyLabel="Aucune ressource ne correspond à ta recherche."
          renderCard={(item, _, layout) =>
            layout === 'grid' ? (
              <div key={item.id} className="flex flex-col gap-stack-xs p-stack rounded-xl border border-ink-200 bg-white hover:border-primary-300 hover:shadow-sm transition-all">
                {/* La catégorie est une donnée : MetaPill (arbitrages n°14-15). */}
                <MetaPill text={item.cat} tone="primary" className="self-start" />
                <p className="font-semibold text-ink-900 text-body">{item.title}</p>
                <p className="text-caption text-ink-600">{item.author}</p>
              </div>
            ) : (
              <div key={item.id} className="flex items-center justify-between px-stack py-3 rounded-xl border border-ink-200 bg-white hover:border-primary-300 transition-all">
                <div className="flex items-center gap-stack-xs">
                  <MetaPill text={item.cat} tone="primary" className="shrink-0" />
                  <p className="font-semibold text-ink-900 text-body">{item.title}</p>
                </div>
                <p className="text-caption text-ink-600 m-0 shrink-0 ml-3">{item.author}</p>
              </div>
            )
          }
        />
      );
    },
  },

  {
    name: 'AuthBackLink',
    codeName: 'patterns/AuthShell.tsx',
    cssBase: 'AuthBackLink (auth back-navigation link)',
    usedBy: ['MagicLink', 'VerifyEmail'],
    description: "Lien de retour « ← libellé » des pages d'authentification : 16/600 blanc, flèche de 16. De la famille Auth*, pour la surface glass-dark seulement ; exporté par AuthShell.tsx.",
    keywords: ['auth', 'back', 'link', 'retour', 'connexion', 'glass-dark', 'AuthShell', 'navigation'],
    render: () => (
      <div className="bg-primary-800 p-section rounded-2xl">
        <AuthBackLink label="Retour à la connexion" onClick={() => {}} />
      </div>
    ),
  },

  /* ── Journal DS components ──────────────────────────────────────────────── */
  {
    name: 'MoodSelector',
    codeName: 'ui/MoodSelector.tsx',
    cssBase: 'MoodSelector',
    description: "L'humeur du jour pour le journal, en cinq niveaux : des boutons de 44 px au moins, une icône Lucide de 28 et un libellé en 13/600 ; le niveau choisi passe sur fond primary-100, filet 2 px au cran 700. `value` et `onChange`.",
    keywords: ['mood', 'journal', 'humeur', 'emoji', 'selector', 'feeling', 'MoodLevel'],
    usedBy: ['JournalNewEntry'],
    render: () => {
      const [mood, setMood] = React.useState<MoodLevel>('neutral');
      return <MoodSelector value={mood} onChange={setMood} />;
    },
  },

  {
    name: 'JournalBubbleCard',
    codeName: 'cards/JournalBubbleCard.tsx',
    cssBase: 'JournalBubbleCard',
    description: "Entrée du journal en bulle, la construction canonique de la famille bulle : rayon 20, filet 1 px, queue en bas à droite, padding 24, aucune ombre. Titre h3 20, date 13, type en pastille 13/500, extrait 16 ink-700, puis « Lire » (Button soft neutral) et « Continuer » (ghost). Sept types, chacun sa surface teintée.",
    keywords: ['journal', 'bubble', 'chat', 'entry', 'apple-messages', 'speech-bubble', 'glass-light', 'JournalBubbleType'],
    usedBy: ['Journal'],
    render: () => (
      <div className="flex flex-col gap-stack max-w-xl">
        {(['learning', 'coaching', 'insight'] as JournalBubbleType[]).map((type) => (
          <JournalBubbleCard
            key={type}
            type={type}
            title={type === 'learning' ? 'Ce que j\'ai retenu de la session' : type === 'coaching' ? 'Session coaching du 10 mai' : 'Prise de conscience sur mon leadership'}
            excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            date="12 mai 2026"
            readingTime="2 min"
            onRead={() => {}}
            onContinue={() => {}}
          />
        ))}
      </div>
    ),
  },

  {
    name: 'JournalChatCompose',
    codeName: 'ui/JournalChatCompose.tsx',
    cssBase: 'JournalChatCompose',
    description: "La saisie rapide du journal, en bulle (Card au rayon 20, avec une queue) : une zone de texte à 16, un Button soft md « Continuer », une aide en 13 ink-600 et le raccourci ⌘ ou Ctrl + Entrée. En haut de la page Journal.",
    keywords: ['journal', 'compose', 'chat', 'textarea', 'quick-entry', 'speech-bubble', 'send'],
    usedBy: ['Journal'],
    render: () => {
      const [value, setValue] = React.useState('');
      return (
        <div className="max-w-xl">
          <JournalChatCompose
            value={value}
            onChange={setValue}
            onSubmit={() => {}}
          />
        </div>
      );
    },
  },

  {
    name: 'StructuredQuestionAccordion',
    codeName: 'ui/StructuredQuestionAccordion.tsx',
    showcaseOnly: true,
    cssBase: 'StructuredQuestionAccordion',
    description: "Questions de réflexion du journal (gabarit EDRA-R ou questions libres), en accordéon : en-têtes de 44 px — question 16/600, consigne 13 ink-600 —, chevron de 18 ; le panneau ouvert, sur ink-50, porte une zone de réponse blanche à 16, filet ink-400, 96 px au moins. `answers` est contrôlé.",
    keywords: ['accordion', 'journal', 'EDRA-R', 'structured', 'questions', 'textarea', 'collapsible'],
    render: () => {
      const [answers, setAnswers] = React.useState<Record<string, string>>({});
      return (
        <div className="max-w-xl">
          <StructuredQuestionAccordion
            questions={[
              { id: 'q1', title: 'Explorer', description: 'Qu\'avez-vous observé dans votre pratique ?', placeholder: 'Décrivez l\'observation...' },
              { id: 'q2', title: 'Décoder', description: 'Quelle signification donnez-vous à cette observation ?', placeholder: 'Votre analyse...' },
              { id: 'q3', title: 'Réorienter', description: 'Comment allez-vous adapter votre pratique ?', placeholder: 'Vos intentions...' },
            ]}
            answers={answers}
            onChange={setAnswers}
            label="Template EDRA-R (optionnel)"
          />
        </div>
      );
    },
  },

  {
    name: 'WritingPromptsAside',
    codeName: 'patterns/WritingPromptsAside.tsx',
    showcaseOnly: true,
    cssBase: 'WritingPromptsAside',
    description: "Trois invitations à écrire dans le journal (apprentissage, pratique, coaching) : un SectionHeader minimal au ton sun (titre h2 28 et sous-titre 16), une grille de PromptCard sur une à trois colonnes, puis le lien « Ouvrir mon journal » (16/600, cran 800). `prompts` remplace les défauts ; `onNavigate` et `onOpenJournal` branchent la navigation.",
    keywords: ['journal', 'prompts', 'aside', 'writing', 'reflection', 'PromptCard', 'SectionHeader', 'dashboard'],
    render: () => (
      <WritingPromptsAside
        onNavigate={() => {}}
        onOpenJournal={() => {}}
      />
    ),
  },

  // ── DATA VISUALIZATION (Phase 20+) ──────────────────────────────────────
  {
    name: 'RadarChart',
    codeName: 'charts/RadarChart.tsx',
    cssBase: 'RadarChart',
    description: "Radar des compétences : niveau actuel contre objectif, sur six axes au plus. Libellés d'axe en 13 ink-600, coupés à 14 caractères par ligne et posés au-dessus et au-dessous des pointes ; graduations de 1 à 5 en 13 ; « Niveau actuel » en aplat primary-500 à 35 %, « Objectif cible » en pointillés secondary-500 ; une légende unique en 13 ink-700. Clic sur un axe (`onAxisClick`) ; tailles de 250 · 350 · 450 px. Socle commun (chartTheme.ts) : graduations et titres d'axe en 13/400 ink-600 tabulaires, info-bulle blanche au rayon 14 (titre 13/600, valeurs 13 ink-700), légende en 13 ink-700, nombres et pourcentages à la française ; `role=\"img\"` et `ariaLabel`.",
    keywords: ['radar', 'chart', 'graphique', 'competency', 'compétence', 'dreyfus', 'analytics', 'passeport'],
    usedBy: ['Passeport', 'Coach'],
    render: () => (
      <RadarChart
        data={[
          { label: 'Leadership', current: 3, target: 5 },
          { label: 'Communication', current: 4, target: 5 },
          { label: 'Technique', current: 2, target: 4 },
          { label: 'Résolution de problèmes', current: 3, target: 5 },
          { label: 'Coopération', current: 4, target: 4 },
          { label: 'Vision stratégique', current: 2, target: 4 },
        ]}
        size="md"
        onAxisClick={() => {}}
      />
    ),
  },

  {
    name: 'BarChart',
    codeName: 'charts/BarChart.tsx',
    cssBase: 'BarChart',
    description: "Barres de comparaison — classement d'équipes, cohortes, distribution de scores. Horizontales par défaut (`layout`), catégories sur l'axe vertical, qui prend 35 % de la largeur (72 à 282 px) et coupe les libellés trop longs. Une série (`dataKey`) ou plusieurs (`series`, avec légende) ; clic sur une barre ; hauteurs de 250 · 350 · 450 px. Socle commun (chartTheme.ts) : graduations et titres d'axe en 13/400 ink-600 tabulaires, info-bulle blanche au rayon 14 (titre 13/600, valeurs 13 ink-700), légende en 13 ink-700, nombres et pourcentages à la française ; `role=\"img\"` et `ariaLabel`.",
    keywords: ['bar', 'chart', 'rankings', 'comparison', 'analytics', 'dashboard'],
    usedBy: ['Enterprise', 'Analytics'],
    render: () => (
      <BarChart
        data={[
          { label: 'Équipe Lyon', score: 82 },
          { label: 'Équipe Nantes', score: 76 },
          { label: 'Équipe Paris', score: 89 },
          { label: 'Équipe Lille', score: 71 },
          { label: 'Équipe Bordeaux', score: 85 },
        ]}
        dataKey="score"
        size="md"
        onBarClick={() => {}}
      />
    ),
  },

  {
    name: 'LineChart',
    codeName: 'charts/LineChart.tsx',
    cssBase: 'LineChart',
    description: "Courbe d'une ou plusieurs tendances dans le temps (engagement, progression). Trait de 2 px, point actif de 5 px ; courbe lissée (`smooth`) et points (`showDots`) par défaut ; pas de légende pour une série seule ; clic sur un point. Socle commun (chartTheme.ts) : graduations et titres d'axe en 13/400 ink-600 tabulaires, info-bulle blanche au rayon 14 (titre 13/600, valeurs 13 ink-700), légende en 13 ink-700, nombres et pourcentages à la française ; `role=\"img\"` et `ariaLabel`.",
    keywords: ['line', 'chart', 'trend', 'progression', 'analytics', 'timeline'],
    usedBy: ['Analytics'],
    render: () => (
      <LineChart
        data={[
          { label: 'Semaine 1', lecons: 2 },
          { label: 'Semaine 2', lecons: 4 },
          { label: 'Semaine 3', lecons: 3 },
          { label: 'Semaine 4', lecons: 6 },
        ]}
        dataKey="lecons"
        size="md"
        smooth
        showDots
      />
    ),
  },

  {
    name: 'AreaChart',
    codeName: 'charts/AreaChart.tsx',
    cssBase: 'AreaChart',
    description: "Aires simples ou empilées (`stacked`, le défaut) : des cumuls, une répartition du temps, l'engagement. Remplissage en dégradé vertical, de 80 à 10 % d'opacité ; courbes lissées. Socle commun (chartTheme.ts) : graduations et titres d'axe en 13/400 ink-600 tabulaires, info-bulle blanche au rayon 14 (titre 13/600, valeurs 13 ink-700), légende en 13 ink-700, nombres et pourcentages à la française ; `role=\"img\"` et `ariaLabel`.",
    keywords: ['area', 'chart', 'cumulative', 'stacked', 'analytics', 'allocation'],
    usedBy: ['Analytics', 'Passeport'],
    render: () => (
      <AreaChart
        data={[
          { label: 'Janv.', lessons: 12, coaching: 3 },
          { label: 'Févr.', lessons: 18, coaching: 5 },
          { label: 'Mars', lessons: 22, coaching: 8 },
        ]}
        series={[
          { key: 'lessons', label: 'Leçons' },
          { key: 'coaching', label: 'Coaching' },
        ]}
        stacked
        size="md"
      />
    ),
  },

  {
    name: 'PieChart',
    codeName: 'charts/PieChart.tsx',
    cssBase: 'PieChart',
    description: "Secteurs ou anneau (`donut`) pour une composition : taux d'achèvement, répartition par catégorie. Parts triées de la plus grande à la plus petite ; étiquettes en 13/600 ink-700 (« 37 % »), info-bulle « 1 234 (37,5 %) », légende avec valeur et pourcentage ; rayons de 70 · 100 · 130 px ; clic sur une part. Socle commun (chartTheme.ts) : graduations et titres d'axe en 13/400 ink-600 tabulaires, info-bulle blanche au rayon 14 (titre 13/600, valeurs 13 ink-700), légende en 13 ink-700, nombres et pourcentages à la française ; `role=\"img\"` et `ariaLabel`.",
    keywords: ['pie', 'donut', 'chart', 'composition', 'distribution', 'analytics'],
    usedBy: ['Formateur'],
    render: () => (
      <PieChart
        data={[
          { label: 'Terminés', value: 45 },
          { label: 'En cours', value: 30 },
          { label: 'Pas commencés', value: 25 },
        ]}
        donut
        showLabels
        size="md"
      />
    ),
  },

  {
    name: 'ScatterChart',
    codeName: 'charts/ScatterChart.tsx',
    cssBase: 'ScatterChart',
    description: "Nuage de points ou bulles, pour une corrélation : positionnement des apprenants, compétence contre engagement. Info-bulle propre — le libellé du point en 13/600, puis « axe : valeur » en 13 ink-700, arrondi à l'entier ; taille des bulles par `z` (`bubbleScale`) ; domaines réglables ; clic sur un point. ⚠️ `xAxisLabel` et `yAxisLabel` ne sont pas encore dessinés sur les axes. Socle commun (chartTheme.ts) : graduations et titres d'axe en 13/400 ink-600 tabulaires, info-bulle blanche au rayon 14 (titre 13/600, valeurs 13 ink-700), légende en 13 ink-700, nombres et pourcentages à la française ; `role=\"img\"` et `ariaLabel`.",
    keywords: ['scatter', 'bubble', 'chart', 'correlation', 'positioning', 'analytics'],
    usedBy: ['Coach'],
    render: () => (
      <ScatterChart
        data={[
          { label: 'Alice', x: 85, y: 90, z: 50 },
          { label: 'Bruno', x: 72, y: 78, z: 40 },
          { label: 'Chloé', x: 91, y: 88, z: 60 },
        ]}
        xAxisLabel="Niveau de compétence"
        yAxisLabel="Engagement"
        bubbleScale={2}
        size="md"
      />
    ),
  },

  {
    name: 'ComposedChart',
    codeName: 'charts/ComposedChart.tsx',
    cssBase: 'ComposedChart',
    description: "Barres et courbe sur un même graphique, pour deux mesures liées (nombre d'activités et score moyen, volume et qualité). Barres à 70 % d'opacité, courbes de 2 px ; double axe en option (`dualAxis`), titres d'axe verticaux en 13 ink-600 — à nommer : leurs défauts, « Value » et « Score », sont en anglais. Socle commun (chartTheme.ts) : graduations et titres d'axe en 13/400 ink-600 tabulaires, info-bulle blanche au rayon 14 (titre 13/600, valeurs 13 ink-700), légende en 13 ink-700, nombres et pourcentages à la française ; `role=\"img\"` et `ariaLabel`.",
    keywords: ['composed', 'bar', 'line', 'hybrid', 'dual-axis', 'analytics'],
    usedBy: ['Analytics'],
    render: () => (
      <ComposedChart
        data={[
          { label: 'Semaine 1', count: 15, avgScore: 78 },
          { label: 'Semaine 2', count: 22, avgScore: 82 },
          { label: 'Semaine 3', count: 18, avgScore: 85 },
        ]}
        series={[
          { key: 'count', label: 'Activités', type: 'bar' },
          { key: 'avgScore', label: 'Score moyen', type: 'line' },
        ]}
        dualAxis
        leftAxisLabel="Activités"
        rightAxisLabel="Score moyen"
        size="md"
      />
    ),
  },

  {
    name: 'HeatmapChart',
    codeName: 'charts/HeatmapChart.tsx',
    cssBase: 'HeatmapChart',
    description: "Matrice colorée (compétences × équipes, progression d'une cohorte) : cellules de 48 px dont le fond va du corail à la sauge en passant par l'ambre ; valeur en 13/600 ink-900 tabulaire — un niveau « D3 » sur une échelle de 5, un pourcentage au-delà ; libellés de ligne en 13 ink-600, de colonne tournés à −45° ; légende en 13 ink-700. `minValue`, `maxValue`, `showValues`, clic sur une cellule.",
    keywords: ['heatmap', 'grid', 'matrix', 'skills', 'competency', 'analytics'],
    usedBy: ['Enterprise'],
    render: () => (
      <HeatmapChart
        data={[
          { x: 'Alice', y: 'Leadership', value: 3 },
          { x: 'Alice', y: 'Communication', value: 4 },
          { x: 'Bruno', y: 'Leadership', value: 2 },
          { x: 'Bruno', y: 'Communication', value: 5 },
        ]}
        maxValue={5}
        cellSize={50}
        showValues
        onCellClick={() => {}}
      />
    ),
  },

  {
    name: 'ChartContainer',
    codeName: 'charts/ChartContainer.tsx',
    cssBase: 'ChartContainer',
    description: "L'enveloppe commune des graphiques : un fond blanc, un filet ink-100, le rayon 14, un padding de 16, le contenu centré. Elle n'expose que `children` et `className` — ni titre ni taille : un titre se pose au-dessus, par la page.",
    keywords: ['chart', 'container', 'wrapper', 'consistent', 'styling', 'analytics'],
    usedBy: ['Passeport', 'Enterprise', 'Analytics', 'Coach'],
    // ChartContainer n'expose que children + className (pas de title/size)
    render: () => (
      <ChartContainer>
        <LineChart
          data={[
            { label: 'T1', value: 25 },
            { label: 'T2', value: 32 },
            { label: 'T3', value: 38 },
          ]}
          dataKey="value"
          size="sm"
        />
      </ChartContainer>
    ),
  },

  {
    name: 'TimelineChart',
    codeName: 'charts/TimelineChart.tsx',
    cssBase: 'TimelineChart',
    description: "Chronologie du parcours d'un apprenant — leçons, sessions, badges, jalons —, du plus récent au plus ancien, dans une liste ordonnée. Dates à la française (« 20 mars 2026 ») en 13/600 ink-600 tabulaire sur une colonne de 96 px ; en vertical, cartes au cran 50 du type (titre 16/600, description 16 ink-700), 24 px entre deux événements ; en horizontal, colonnes de 160 px et description en 13. Le type s'écrit dans une pastille 13/500. `maxEvents`, clic sur un événement.",
    keywords: ['timeline', 'journey', 'events', 'learner', 'progression', 'milestones', 'vertical', 'horizontal'],
    usedBy: ['Passeport', 'Coach', 'Analytics'],
    render: () => (
      <TimelineChart
        data={[
          { id: '1', date: '2026-06-29', label: 'Leçon 1 : les fondamentaux du leadership', type: 'lesson', description: 'Terminée en 45 minutes', tone: 'primary' },
          { id: '2', date: '2026-06-27', label: 'Badge obtenu : Leadership D3', type: 'badge', tone: 'sun' },
          { id: '3', date: '2026-06-25', label: 'Session de coaching', type: 'session', description: 'En tête-à-tête avec Sarah', tone: 'warm' },
          { id: '4', date: '2026-06-20', label: 'Jalon : deuxième semaine terminée', type: 'milestone', tone: 'success' },
        ]}
        layout="vertical"
        maxEvents={10}
      />
    ),
  },

  {
    name: 'GaugeChart',
    codeName: 'charts/GaugeChart.tsx',
    cssBase: 'GaugeChart',
    description: "Jauge circulaire d'une progression (de 0 à 100 %, ou une échelle Dreyfus de 0 à 5, toujours affichée en pourcentage). La valeur prend le pas des titres — 20, 28 ou 36 px en 700, tabulaire, au cran 800 du ton — selon la taille (SVG de 100 · 140 · 200 px) : au centre de l'anneau en arc, sous le dessin en aiguille et en segments. Le libellé et l'objectif (« Objectif : 90 % ») s'écrivent dessous en 13 ink-600 — sauf en aiguille, qui n'écrit pas l'objectif. Cinq tons ; `target` pour un objectif.",
    keywords: ['gauge', 'progress', 'circular', 'indicator', 'goal', 'achievement', 'needle', 'arc'],
    usedBy: ['Passeport', 'Dashboard', 'Analytics'],
    render: () => (
      <div className="flex gap-stack-lg flex-wrap">
        <GaugeChart current={68} max={100} label="Passeport complété" tone="primary" variant="arc" size="md" showPercentage />
        <GaugeChart current={3.4} max={5} label="Niveau en leadership" tone="warm" variant="needle" size="md" target={4.5} />
        <GaugeChart current={75} max={100} label="Objectif de la semaine" tone="sun" variant="segment" size="sm" target={90} />
      </div>
    ),
  },

  {
    name: 'ChartExportButton',
    codeName: 'charts/ChartExportButton.tsx',
    cssBase: 'ChartExportButton',
    description: "Boutons d'export d'un graphique : PNG, PDF et CSV (ce dernier si `data` est fourni). compact, le défaut : des Button sm soft, un ton par format (PNG brand, PDF warm, CSV sun) ; full : des Button md. Erreur en 13 danger-fg. ⚠️ Ses libellés d'aide (« Export as PNG »…) sont encore en anglais, et la variante full aligne trois `solid` là où l'arbitrage n°19 n'en veut qu'un par écran.",
    keywords: ['export', 'download', 'csv', 'pdf', 'png', 'chart', 'analytics', 'report'],
    usedBy: ['Passeport', 'Enterprise', 'Analytics', 'Coach'],
    render: () => (
      <div className="space-y-4">
        <div>
          <p className="text-caption text-ink-600 mb-2">compact, le défaut</p>
          <ChartExportButton chartId="chart-demo" filename="chart-export" variant="compact" />
        </div>
        <div>
          <p className="text-caption text-ink-600 mb-2">full</p>
          <ChartExportButton
            chartId="chart-demo"
            filename="report-export"
            data={[{ label: 'T1', value: 100 }, { label: 'T2', value: 150 }]}
            variant="full"
          />
        </div>
      </div>
    ),
  },

  {
    name: 'ViewerProgressTrail',
    codeName: 'patterns/ViewerProgressTrail.tsx',
    cssBase: 'viewer-progress',
    description: "Progression d'un lecteur pas à pas (Astuces, Flashcards) : des points (8 px, 12 pour le courant) ou une barre de 6 px, trois tons. Sans texte ; `role=\"progressbar\"` et ses valeurs.",
    keywords: ['progress', 'viewer', 'steps', 'indicator', 'astuces', 'flashcards', 'lessonplayer'],
    usedBy: ['AstucesViewer', 'FlashcardsViewer'],
    toneAware: true,
    hasVariants: true,
    render: () => (
      <div className="flex flex-col gap-stack">
        <div>
          <p className="text-caption text-ink-600 mb-stack-xs font-semibold">Dots style (default)</p>
          <div className="flex gap-section items-center justify-center">
            <ViewerProgressTrail current={0} total={5} tone="primary" />
            <ViewerProgressTrail current={2} total={5} tone="warm" />
            <ViewerProgressTrail current={4} total={5} tone="sun" />
          </div>
        </div>
        <div>
          <p className="text-caption text-ink-600 mb-stack-xs font-semibold">Bar style</p>
          <div className="flex flex-col gap-stack max-w-sm">
            <ViewerProgressTrail current={0} total={5} style="bar" tone="primary" />
            <ViewerProgressTrail current={2} total={5} style="bar" tone="warm" />
            <ViewerProgressTrail current={5} total={5} style="bar" tone="sun" />
          </div>
        </div>
      </div>
    ),
  },

  /* ---- PHASE 4 — composants exposés le 2026-07-29 ----------------------- */

  {
    name: 'Chip',
    codeName: 'ui/Chip.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Primitive interne de la famille des pastilles : elle porte les tokens partagés (CHIP_BASE, CHIP_SIZE, tons, surfaces) et le helper `resolveChipClasses`, que MetaPill et FilterChip consomment. Trois tailles — sm 24 px en 11/500, md 30 px en 13/500, lg 44 px en 16/500 —, cinq tons, surfaces solid et glass. Pill et Tag ont été supprimés le 10/09 ; ses seuls appels directs sont dans le DevPanel. Dans une page, passer par MetaPill (la donnée) ou FilterChip (le filtre).",
    keywords: ['chip', 'pill', 'pastille', 'primitive', 'tone', 'glass', 'surface', 'filter', 'meta'],
    usedBy: ['MetaPill', 'FilterChip', 'DevPanel'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div className="flex flex-wrap items-center gap-stack-xs">
          <Chip tone="neutral">neutral</Chip>
          <Chip tone="primary">primary</Chip>
          <Chip tone="warm">warm</Chip>
          <Chip tone="sun">sun</Chip>
          <Chip tone="brand">brand</Chip>
        </div>
        <div className="flex flex-wrap items-center gap-stack-xs">
          <Chip size="sm" tone="primary">sm · 24 px</Chip>
          <Chip size="md" tone="primary">md · 30 px</Chip>
          <Chip size="lg" tone="primary">lg · 44 px</Chip>
        </div>
        <div className="flex flex-wrap items-center gap-stack-xs">
          <Chip tone="primary" leadingIcon={<Target size={14} />}>avec icône</Chip>
          <Chip tone="warm" active>actif</Chip>
          <Chip tone="neutral" asButton onClick={() => {}}>cliquable</Chip>
        </div>
      </div>
    ),
  },
  {
    name: 'Tooltip',
    codeName: 'ui/Tooltip.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Infobulle au survol et au focus clavier : 13/400 blanc sur ink-900 (variante brand : primary-700), 220 px au plus avec retour à la ligne, rayon 10, flèche. Quatre côtés, deux variantes, délai réglable (400 ms par défaut). On peut la survoler ; Échap la ferme. L'enfant doit être un élément unique capable de recevoir un ref.",
    keywords: ['tooltip', 'infobulle', 'hover', 'focus', 'aide', 'side'],
    render: () => (
      <div className="flex flex-wrap items-center gap-section py-stack-lg">
        <Tooltip content="Infobulle au-dessus"><Button emphasis="outline" size="sm">top</Button></Tooltip>
        <Tooltip content="À droite" side="right"><Button emphasis="outline" size="sm">right</Button></Tooltip>
        <Tooltip content="En dessous" side="bottom"><Button emphasis="outline" size="sm">bottom</Button></Tooltip>
        <Tooltip content="Variante brand" variant="brand"><Button emphasis="outline" size="sm">brand</Button></Tooltip>
      </div>
    ),
  },
  {
    name: 'Kbd',
    codeName: 'ui/Kbd.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Touche de clavier, en mono : sm à 11 px (environ 17 px de haut), md à 13 (environ 23 px), rayon 6. Variantes default et glass. Passer `keys` pour un raccourci composé : le composant intercale les « + ».",
    keywords: ['kbd', 'clavier', 'raccourci', 'shortcut', 'touche'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div className="flex flex-wrap items-center gap-stack-xs">
          <Kbd keys={['Cmd', 'K']} />
          <Kbd keys={['Ctrl', 'Maj', 'P']} />
          <Kbd keys={['Echap']} />
        </div>
        <div className="flex flex-wrap items-center gap-stack-xs">
          <Kbd size="sm" keys={['Cmd', 'S']} />
          <Kbd size="md" keys={['Cmd', 'S']} />
        </div>
      </div>
    ),
  },
  {
    name: 'SegmentedControl',
    codeName: 'ui/SegmentedControl.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Bascule entre deux à quatre vues exclusives. À préférer aux onglets quand il n'y a pas de contenu à titrer, et aux boutons radio quand le choix s'applique tout de suite. Palier interactif : un rail au rayon 14 de 36 · 44 · 52 (défaut md), des segments au rayon 10, libellés 13 ou 16 en 600 ; le segment actif est blanc, libellé au cran 800. Trois tons (primary · warm · sun).",
    keywords: ['segmented', 'control', 'toggle', 'vue', 'bascule', 'filtre', 'tabs'],
    render: () => <SegmentedControlDemo />,
  },
  {
    name: 'SettingsRow',
    codeName: 'patterns/SettingsRow.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Rangée de réglage : pastille d'icône (IconChip md), libellé 16/600 ink-900 (danger-fg si `danger`), 4 px, description 16 ink-700 à la largeur de lecture, et le contrôle à droite. SettingsToggleRow, dans le même fichier, y pose un Switch. Brique des pages Compte, Facturation et Confidentialité.",
    keywords: ['settings', 'reglage', 'row', 'compte', 'preferences', 'toggle', 'danger'],
    /* Les rangées dans UNE carte (arbitrage n°5), et la carte porte le padding :
       SettingsRow n'en a pas à l'horizontale. */
    render: () => (
      <div className="flex flex-col rounded-xl border border-ink-200 bg-white divide-y divide-ink-100 p-stack-lg">
        <SettingsRow icon={<Bell size={18} />} label="Notifications par e-mail" description="Un résumé hebdomadaire, jamais le week-end">
          <Switch defaultChecked />
        </SettingsRow>
        <SettingsRow icon={<Target size={18} />} label="Objectif hebdomadaire" description="Nombre de sessions visées">
          <Badge variant="brand">3 sessions</Badge>
        </SettingsRow>
        <SettingsRow icon={<LogOut size={18} />} label="Supprimer le compte" description="Action irréversible" danger>
          <Button emphasis="solid" tone="danger" size="sm">Supprimer</Button>
        </SettingsRow>
      </div>
    ),
  },
  {
    name: 'SelectableOptionCard',
    codeName: 'patterns/SelectableOptionCard.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Carte-option d'un choix exclusif : icône, libellé, description, état sélectionné. Dans l'onboarding et le questionnaire de positionnement.",
    keywords: ['option', 'card', 'selection', 'choix', 'onboarding', 'radio', 'positionnement'],
    render: () => <SelectableOptionCardDemo />,
  },
  {
    name: 'FloatLabel',
    codeName: 'core/FloatLabel.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Enveloppe un Input (md, sans libellé) et pose le libellé dans le champ : au repos, il tient lieu de placeholder (16/400 ink-500) ; au focus ou une fois rempli, il se lève en 13/600 ink-700 contre le bord gauche. Seule sa couleur s'anime. Gère `required`, `hint` (13 ink-600) et `error` (13 danger-fg, qui passe aussi le champ en erreur).",
    keywords: ['float', 'label', 'input', 'formulaire', 'flottant', 'hint', 'error'],
    render: () => (
      <div className="flex flex-col gap-stack max-w-md">
        <FloatLabel label="Adresse e-mail" required>
          <Input type="email" defaultValue="chloe@thelearningsociety.fr" />
        </FloatLabel>
        <FloatLabel label="Intitulé du poste" hint="Tel qu'il apparaît dans votre organisation">
          <Input />
        </FloatLabel>
        <FloatLabel label="Code d'accès" error="Ce code n'est plus valide">
          <Input defaultValue="TLS-2024" />
        </FloatLabel>
      </div>
    ),
  },
  /* ---- PHASE 4, lot 2 — primitives de layout + PageHero ----------------- */

  {
    name: 'PageShell',
    codeName: 'layout/PageShell.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Le conteneur canonique des pages principales : largeur (`width`, page par défaut, 1 152 px), marges verticales (32 · 40 · 48 selon la largeur) et rythme entre sections (`gap`, 48 par défaut depuis le 24/09 — il en posait 32). Pas de padding horizontal : la gouttière vient de la mise en page. `noPadTop` retire la marge du haut.",
    keywords: ['shell', 'page', 'layout', 'conteneur', 'largeur', 'padding', 'rythme'],
    render: () => (
      <div className="rounded-xl border border-dashed border-primary-300 bg-primary-50/40">
        {/* gap="stack" pour la démo ; le défaut entre deux sections est 48 (gap="page"). */}
        <PageShell width="content" gap="stack">
          <div className="rounded-lg bg-white border border-ink-200 p-stack text-body">Bloc 1</div>
          <div className="rounded-lg bg-white border border-ink-200 p-stack text-body">Bloc 2</div>
          <div className="rounded-lg bg-white border border-ink-200 p-stack text-body">Bloc 3</div>
        </PageShell>
      </div>
    ),
  },
  {
    name: 'Container',
    codeName: 'layout/Container.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Contrainte de largeur seule, sans rythme vertical, avec la gouttière de page (16 · 24 · 40 px selon la largeur). Six paliers : prose (65 caractères, la lecture longue), content 768, medium 1 024, page 1 152 (le défaut de l'app), wide 1 280, full.",
    keywords: ['container', 'largeur', 'prose', 'max-width', 'lecture', 'centrage'],
    render: () => (
      <div className="flex flex-col gap-stack-xs">
        {(['prose', 'content', 'page'] as const).map((w) => (
          <Container key={w} width={w} padding={false}>
            <div className="rounded-md bg-primary-100 border border-primary-200 px-stack py-2 text-caption font-mono text-primary-800">
              width=&quot;{w}&quot;
            </div>
          </Container>
        ))}
      </div>
    ),
  },
  {
    name: 'Grid',
    codeName: 'layout/Grid.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    description: "Grille à deux dimensions : un nombre de colonnes fixe (`cols`, 1 à 6), ou une grille qui s'adapte seule via `min` (240 px par défaut) — elle rend `repeat(auto-fit, minmax(min, 1fr))` et dispense d'écrire des seuils. Écart par défaut : 16.",
    keywords: ['grid', 'grille', 'colonnes', 'auto-fit', 'minmax', 'responsive'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div>
          <p className="m-0 mb-stack-xs text-caption text-ink-600">cols=&#123;3&#125;</p>
          <Grid cols={3} gap="stack-xs">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="rounded-md bg-ink-50 border border-ink-200 py-3 text-center text-caption">{n}</div>
            ))}
          </Grid>
        </div>
        <div>
          <p className="m-0 mb-stack-xs text-caption text-ink-600">min=&quot;180px&quot; — s&apos;adapte sans breakpoint</p>
          <Grid min="180px" gap="stack-xs">
            {['A', 'B', 'C', 'D'].map((n) => (
              <div key={n} className="rounded-md bg-primary-50 border border-primary-200 py-3 text-center text-caption">{n}</div>
            ))}
          </Grid>
        </div>
      </div>
    ),
  },
  {
    name: 'Stack',
    codeName: 'layout/Stack.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    description: "Empilement vertical à écart sémantique (16 par défaut). Le parent possède le rythme : c'est ce qui évite le double espacement du piège n°12, où un enfant ajoute son `mb-*` au `gap` du parent.",
    keywords: ['stack', 'vertical', 'gap', 'espacement', 'rythme', 'flex-col'],
    render: () => (
      <div className="flex gap-section">
        {(['stack-xs', 'stack', 'stack-lg'] as const).map((g) => (
          <div key={g} className="flex-1">
            <p className="m-0 mb-stack-xs text-caption text-ink-600">gap=&quot;{g}&quot;</p>
            <Stack gap={g}>
              <div className="rounded-md bg-ink-50 border border-ink-200 py-2 text-center text-caption">A</div>
              <div className="rounded-md bg-ink-50 border border-ink-200 py-2 text-center text-caption">B</div>
              <div className="rounded-md bg-ink-50 border border-ink-200 py-2 text-center text-caption">C</div>
            </Stack>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: 'Cluster',
    codeName: 'layout/Cluster.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    description: "Groupe horizontal qui passe à la ligne, pour les rangées de pastilles, de boutons ou de données ; écart de 8 par défaut. `justify=\"between\"` pousse le dernier élément à droite.",
    keywords: ['cluster', 'horizontal', 'wrap', 'chips', 'boutons', 'inline', 'align'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <Cluster gap="stack-xs">
          {['Compétence', 'Pratique', 'Validation', 'Passeport', 'Coaching'].map((l) => (
            <Chip key={l} tone="primary">{l}</Chip>
          ))}
        </Cluster>
        <Cluster gap="stack-xs" justify="between" align="center" className="rounded-lg border border-ink-200 bg-white px-stack py-stack-xs">
          <span className="text-body font-semibold">justify=&quot;between&quot;</span>
          <Button size="sm" emphasis="outline">Action</Button>
        </Cluster>
      </div>
    ),
  },
  {
    name: 'BottomNav',
    codeName: 'layout/BottomNav.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "La navigation mobile, fixée en bas : cinq onglets (les `labelCourt` de la navigation principale) sur une rangée de 56 px, icône de 20 et libellé en 13/600 dans les deux états — primary-700 actif, ink-600 sinon ; l'icône active se pose dans une pastille primary-100. `md:hidden` : elle disparaît dès 768 px, où la Sidebar prend le relais. L'aperçu la contient dans un cadre, sans quoi sa position fixe la collerait au bas de la fenêtre.",
    keywords: ['bottom', 'nav', 'mobile', 'tabbar', 'fixed', 'responsive', 'md:hidden'],
    render: () => (
      <div className="flex flex-col gap-stack-xs">
        <p className="m-0 text-caption text-ink-600">
          Cadre de 380 px : la barre n&apos;apparaît que sous 768 px de large.
        </p>
        <div className="relative h-40 w-full max-w-[380px] overflow-hidden rounded-2xl border border-ink-200 bg-ink-50 [transform:translate(0)]">
          <BottomNav />
        </div>
      </div>
    ),
  },
  {
    name: 'PageHero',
    codeName: 'patterns/EditorialHero.tsx (export canonique)',
    cssBase: 'Tailwind (no BEM)',
    description: "Le hero d'ouverture de page, universel (plus de cent pages). Anatomie : lien retour optionnel (pastille 13/700), 24 px — le retour mène ailleurs, il se tient à l'écart du titre —, surtitre 13/600 — il dit le lieu, en ink-600 et sans capitales —, 8 px, h1 36/44/700, 12 px, chapô 18/28 à la largeur de lecture (ink-700), 12 px, méta en 13, puis la progression (16 px) et `trailing` (24 px). Cinq tons : flat — sans fond ni padding, le choix des pages de l'app —, default (dégradé primary-50), brand, warm et sun (dégradés du cran 700 au 800, texte blanc plein). Les tons colorés sont au rayon 20, l'étage conteneur — ils étaient à 14, le rayon d'un bouton ; leur padding, 32 ou 24 en `compact`, reste au-dessus du rayon, donc leur contenu garde sa forme. Aucune marge extérieure : c'est PageShell qui pose 48 px avant la suite. `EditorialHero` en est l'alias, réservé aux surfaces éditoriales.",
    keywords: ['hero', 'page', 'ouverture', 'h1', 'chapô', 'surtitre', 'tone', 'flat', 'brand', 'eyebrow', 'editorial', 'titre', 'retour', 'backLink', 'rayon'],
    usedBy: ['Dashboard', 'Journal', 'Passeport', 'Coaching', '100+ pages'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <PageHero
          tone="brand"
          backLink={{ label: 'Mes parcours', onClick: () => {} }}
          eyebrow={{ icon: <Target size={12} />, label: 'Parcours en cours' }}
          title="Concevoir une expérience d'apprentissage"
          summary="Cinq compétences, douze jalons de pratique. Le Passeport valide, pas la complétion."
        />
        <PageHero
          tone="sun"
          compact
          title="Compétence validée"
          summary="tone=&quot;sun&quot; — réflexion et accomplissements."
        />
      </div>
    ),
  },
  /* ---- PHASE 4, lot 3 — squelettes, selects, grilles, charts, divers ----- */

  {
    name: 'SkeletonGroup',
    codeName: 'patterns/SkeletonTemplates.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Répète un gabarit de squelette N fois, en liste ou en grille (deux à quatre colonnes). À préférer à une boucle écrite à la main : la mise en page du chargement reste alignée sur celle du contenu qu'elle remplace.",
    keywords: ['skeleton', 'chargement', 'loading', 'placeholder', 'groupe', 'grille'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div>
          <p className="m-0 mb-stack-xs text-caption text-ink-600">layout=&quot;list&quot;</p>
          <SkeletonGroup count={2} template={ActivityItemSkeleton} layout="list" />
        </div>
        <div>
          <p className="m-0 mb-stack-xs text-caption text-ink-600">layout=&quot;grid-3&quot;</p>
          <SkeletonGroup count={3} template={StatCardSkeleton} layout="grid-3" />
        </div>
      </div>
    ),
  },
  {
    name: 'StatCardSkeleton',
    codeName: 'patterns/SkeletonTemplates.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Squelette de StatCard : une pastille, la valeur et le libellé en blocs gris. ⚠️ Il ne reprend plus exactement les proportions de la carte (rayon 14 contre 20, padding 24 contre 20) : le passage au contenu réel décale légèrement.",
    keywords: ['skeleton', 'statcard', 'kpi', 'chargement', 'shimmer'],
    render: () => (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-stack">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    ),
  },
  {
    name: 'ActivityItemSkeleton',
    codeName: 'patterns/SkeletonTemplates.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Squelette d'une rangée de fil d'activité : pastille, titre, méta.",
    keywords: ['skeleton', 'activite', 'feed', 'timeline', 'chargement'],
    render: () => (
      <div className="flex flex-col gap-stack-xs">
        <ActivityItemSkeleton />
        <ActivityItemSkeleton />
        <ActivityItemSkeleton />
      </div>
    ),
  },
  {
    name: 'ResumeLessonSkeleton',
    codeName: 'patterns/SkeletonTemplates.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Squelette de la carte « Reprendre ta leçon » du tableau de bord. C'est la première chose que voit l'apprenant : son état de chargement mérite d'épouser la forme finale.",
    keywords: ['skeleton', 'reprendre', 'lecon', 'dashboard', 'hero', 'chargement'],
    render: () => <ResumeLessonSkeleton />,
  },
  {
    name: 'SelectCheckboxFloating',
    codeName: 'ui/SelectCheckboxFloating.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Sélection multiple posée dans un formulaire, sans menu : le nom du groupe en 16/600 ink-900, puis les options en rangées de 44 px au rayon 14, case et libellé 16/400 ; l'option choisie passe sur fond primary-50, filet 700. Même rôle que SelectCheckbox.",
    keywords: ['select', 'checkbox', 'multiple', 'flottant', 'float', 'label', 'filtre'],
    render: () => <SelectCheckboxFloatingDemo />,
  },
  {
    name: 'CoachRow',
    codeName: 'patterns/CoachRow.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Rangée compacte qui identifie le coach : Avatar sm, nom 16/600, rôle en légende 13 ink-600 à 2 px, et un Button soft « Message » optionnel. Pour les en-têtes de session et les fils de correction, là où une ProfileCard prendrait trop de place.",
    keywords: ['coach', 'row', 'ligne', 'contact', 'session', 'identite', 'message'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <CoachRow coachName="Marie Lecomte" coachRole="Coach pédagogique" coachInitials="ML" onMessage={() => {}} />
        <CoachRow coachName="Thomas Rivière" coachRole="Coach SBO" coachInitials="TR" tint="warm" />
      </div>
    ),
  },
  {
    name: 'CorrectionStatusBar',
    codeName: 'learning/CorrectionStatusBar.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    description: "Bandeau d'état d'une correction : StatusBadge, compétence en 16/600, « +N XP » en 16/600 accent-800, « Itération N » en 13 ink-600. L'état n'est jamais porté par la seule couleur : icône et libellé l'accompagnent. ⚠️ L'XP relève de ce que l'arbitrage n°18 retire de l'app apprenant ; la démo ne le montre plus.",
    keywords: ['correction', 'statut', 'jac', 'validation', 'xp', 'iteration', 'bandeau'],
    render: () => (
      <div className="flex flex-col gap-stack-xs">
        <CorrectionStatusBar status="pending" competenceLabel="Concevoir une séquence" />
        <CorrectionStatusBar status="in-progress" competenceLabel="Concevoir une séquence" iterationCount={2} />
        <CorrectionStatusBar status="completed" competenceLabel="Concevoir une séquence" />
        <CorrectionStatusBar status="failed" competenceLabel="Concevoir une séquence" iterationCount={3} />
      </div>
    ),
  },
  {
    name: 'ReaderContextStrip',
    codeName: 'patterns/ReaderContextStrip.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Bande de contexte des pages de lecture (Dossier, Actus de la semaine, Magazine) : Retour (44 px, 13/600), le titre de l'article en 16/600 ink-900, aligné à gauche, et un emplacement `trailing` — les pages y posent l'anneau de lecture. Collante, 56 px de haut ; elle apparaît en fondu passé 100 px de défilement (`scrollThreshold`).",
    keywords: ['reader', 'lecture', 'article', 'sticky', 'contexte', 'retour', 'scroll'],
    render: () => (
      <div className="rounded-xl border border-ink-200 overflow-hidden">
        <ReaderContextStrip title="Concevoir une expérience d'apprentissage" onBack={() => {}} backLabel="Magazine" />
      </div>
    ),
  },
  {
    name: 'ErrorPage',
    codeName: 'patterns/ErrorPage.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "La page d'erreur canonique, centrée : surtitre 13/600, code en très grand (80 à 144 px, masqué aux lecteurs d'écran), pastille de 96 px, h1 36/44, chapô 18/28 ink-700, encart optionnel, pistes de sortie en tuiles (titre 20/700, texte 16 ink-700) et actions. Tons default · danger · neutral (ajouté le 24/09). Le principe : ne jamais laisser l'utilisateur sans issue.",
    keywords: ['erreur', '404', '500', 'error', 'page', 'fallback', 'suggestions'],
    usedBy: ['Error404', 'Error500', 'MarketingError404'],
    render: () => (
      <div className="rounded-xl border border-ink-200 overflow-hidden">
        <ErrorPage
          code="404"
          title="Cette page a changé d'adresse"
          description="Le lien que vous avez suivi ne mène plus nulle part."
          suggestions={[
            { icon: <LayoutTemplate size={18} />, title: 'Revenir au tableau de bord', description: 'Votre action du jour vous y attend', onClick: () => {} },
            { icon: <BookOpen size={18} />, title: 'Parcourir la bibliothèque', description: 'Tous les parcours disponibles', onClick: () => {} },
          ]}
        />
      </div>
    ),
  },
  {
    name: 'CoachCardGrid',
    codeName: 'patterns/CoachCardGrid.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Grille de coachs avec ses filtres (spécialité, disponibilité) et ses états de chargement et vide : évite de recâbler ce trio sur chaque page de coaching.",
    keywords: ['coach', 'grille', 'grid', 'filtre', 'disponibilite', 'specialite', 'empty'],
    render: () => (
      <CoachCardGrid
        columns={2}
        coaches={[
          { id: '1', name: 'Marie Lecomte', role: 'Coach pédagogique', specialties: ['Ingénierie', 'Évaluation'], availability: true },
          { id: '2', name: 'Thomas Rivière', role: 'Coach SBO', specialties: ['Compétences', 'Référentiels'], availability: false },
        ]}
      />
    ),
  },
  {
    name: 'LearningPathGrid',
    codeName: 'patterns/LearningPathGrid.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Grille de parcours, avec un filtre par statut, la progression et le déroulé optionnel des leçons ; états de chargement et vide inclus.",
    keywords: ['parcours', 'grille', 'grid', 'progression', 'statut', 'lecons', 'filtre'],
    render: () => (
      <LearningPathGrid
        columns={2}
        paths={[
          { id: '1', stepNumber: 1, title: 'Concevoir une séquence', description: 'Structurer un parcours qui tient debout.', lessonCount: 6, progress: 60, status: 'in-progress', tone: 'primary' },
          { id: '2', stepNumber: 2, title: 'Évaluer la pratique', description: 'Distinguer la complétion de la maîtrise.', lessonCount: 4, progress: 0, status: 'not-started', tone: 'warm' },
        ]}
      />
    ),
  },
  {
    name: 'ResourceCardGrid',
    codeName: 'patterns/ResourceCardGrid.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Grille de ressources hétérogènes (fiche, vidéo, gabarit, article) : trois variantes de rendu, les tons, les états de chargement et vide.",
    keywords: ['ressource', 'grille', 'grid', 'bibliotheque', 'document', 'video', 'tone'],
    render: () => (
      <ResourceCardGrid
        columns={3}
        tone="primary"
        items={[
          { id: '1', type: 'Fiche', title: 'Grille EDRA-R', description: 'Le référentiel réflexif, annoté.', duration: '8 min' },
          { id: '2', type: 'Vidéo', title: 'Poser un JAC', description: 'Ce qui distingue un jalon d’une case à cocher.', duration: '12 min' },
          { id: '3', type: 'Gabarit', title: 'Trame de séquence', description: 'À dupliquer pour votre prochain module.', duration: '5 min' },
        ]}
      />
    ),
  },
  {
    name: 'ChartWithExport',
    codeName: 'charts/ChartWithExport.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Enveloppe un graphique et lui ajoute ses exports, alignés à droite et 16 px au-dessus : PNG toujours, PDF si un `title` est fourni, CSV si `data` l'est — le CSV part alors des données, pas d'une capture.",
    keywords: ['chart', 'export', 'png', 'csv', 'graphique', 'telechargement'],
    render: () => (
      <ChartWithExport
        chartId="demo-export"
        title="Compétences validées"
        subtitle="Six derniers mois"
        data={[{ mois: 'Jan', valeur: 3 }, { mois: 'Fév', valeur: 5 }, { mois: 'Mar', valeur: 4 }]}
      >
        <div className="flex items-end gap-stack-xs h-32 px-stack">
          {[40, 72, 58].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-primary-400" style={{ height: `${h}%` }} />
          ))}
        </div>
      </ChartWithExport>
    ),
  },
  {
    name: 'ChartDetailModal',
    codeName: 'charts/ChartDetailModal.tsx',
    showcaseOnly: true,
    cssBase: 'Tailwind (no BEM)',
    description: "Ouvre un graphique en grand, dans un panneau au rayon 24 (90 % de la hauteur au plus) : titre en h2 au pas h3 (20/700), sous-titre 16 ink-700, le graphique, puis des Button md. ⚠️ Ce n'est pas encore un vrai dialogue : ni `role=\"dialog\"`, ni piège de focus.",
    keywords: ['chart', 'modal', 'detail', 'plein ecran', 'analytics', 'zoom'],
    render: () => <ChartDetailModalDemo />,
  },
  {
    name: 'CompletionModal',
    codeName: 'modals/CompletionModal.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Fin de leçon ou de module : un bandeau au dégradé 700 → 800 — pastille, titre en h2 au pas h3 (20), titre de l'élément et description en 16, tout en blanc —, puis l'étape suivante en carte (13/600, titre 16/600, méta 13) et des Button md. Ton calme : pas de confettis par défaut, pas de « ! ». ⚠️ Elle affiche « +50 XP » par défaut (`xpEarned`), ce que l'arbitrage n°18 retire de l'app apprenant.",
    keywords: ['completion', 'modal', 'fin', 'lecon', 'xp', 'suite', 'celebration'],
    render: () => <CompletionModalDemo2 />,
  },
  {
    name: 'AuthSuccess',
    codeName: 'patterns/AuthShell.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "État de réussite des pages d'authentification, sur la surface glass-dark : pastille de 56 px, titre h3 20/700 blanc, description 16 blanc (44 caractères au plus). Réservé à la famille Auth* — ne pas l'employer ailleurs dans l'app.",
    keywords: ['auth', 'succes', 'confirmation', 'glass-dark', 'email', 'inscription'],
    render: () => (
      <div className="rounded-2xl bg-gradient-to-br from-primary-800 to-brand-navy p-section">
        <AuthSuccess
          icon={<Bell size={28} className="text-white" />}
          title="Vérifiez votre boîte mail"
          description="Un lien de connexion vient de partir vers chloe@thelearningsociety.fr."
        />
      </div>
    ),
  },
  {
    name: 'SelectCheckbox',
    codeName: 'ui/SelectCheckbox.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Sélection multiple en menu déroulant, avec le résumé des choix dans le déclencheur : un contrôle de 44 px au rayon 14, libellé 16/600, filet 700 et libellé 800 une fois actif. Les options sont des Checkbox du système. Brique des barres de filtres.",
    keywords: ['select', 'checkbox', 'multiple', 'filtre', 'dropdown', 'menu'],
    render: () => <SelectCheckboxDemo />,
  },
  {
    name: 'SelectCheckboxCategory',
    codeName: 'ui/SelectCheckboxCategory.tsx',
    cssBase: 'Tailwind (no BEM)',
    description: "Variante hiérarchique : catégories et sous-catégories, en sélection unique (pastille radio au cran 700) qui retourne la catégorie parente. Pour les filtres à deux niveaux.",
    keywords: ['select', 'categorie', 'hierarchie', 'sous-categorie', 'filtre', 'arbre'],
    render: () => <SelectCheckboxDemo />,
  },
];

/* ============================================================================
 * TOKEN DEFINITIONS — à tenir à jour depuis src/index.css (@theme).
 * ⚠ Recopie manuelle : rien ne la vérifie. Voir docs/_canon/AUDIT-DESIGN-2026-07-22.md.
 * ============================================================================ */

/* ══════════════════════════════════════════════════════════════════════════
   LES TOKENS

   Source unique : le bloc `@theme` de `src/index.css`. Chaque `cssVar` ci-dessous
   doit y exister — `scripts/check-token-coverage.mjs` échoue sinon, dans les deux
   sens : un token du thème absent de la vitrine, ou une entrée de vitrine qui ne
   correspond à rien.

   Pourquoi ce garde-fou. La vitrine relisait déjà les valeurs en direct
   (`useLiveTokenValue`), et on en concluait « plus aucune dérive ». C'était faux,
   parce qu'elle relisait la **mauvaise variable** : elle interrogeait l'échelle
   `--t-*` de `design-tokens.css`, jumelle et périmée, pendant que l'app rend
   l'échelle `--text-*` de `@theme`. Mesuré au navigateur le 2026-09-09 :

     h3   vitrine 22 px   ·   app 24 px
     h4   vitrine 18 px   ·   app 20 px

   Deux noms pour un même concept ne se télescopent pas dans la cascade : ils
   coexistent, chacun avec sa valeur, et rien ne signale l'écart. Lire en direct
   ne protège de rien si l'on lit à côté. D'où la règle : on ne déclare ici que
   des variables de `@theme`, et un script le vérifie.

   Les `value` ne servent plus qu'au repli et à la recherche plein texte ; c'est
   toujours la variable qui est affichée et dessinée.
   ══════════════════════════════════════════════════════════════════════════ */

const scale = (
  group: string,
  prefix: string,
  values: Array<[string, string]>,
  type: TokenEntry['type'] = 'color',
): TokenEntry[] =>
  values.map(([step, v]) => ({
    name: `${prefix}-${step}`,
    cssVar: `--color-${prefix}-${step}`,
    value: v,
    group,
    type,
  }));

const COLOR_TOKENS: TokenEntry[] = [
  ...scale('Marque — Teal (primary)', 'primary', [
    ['50', '#E8F4F7'], ['100', '#DCEBEF'], ['200', '#B9D7DF'], ['300', '#96C3CF'],
    ['400', '#73AFBF'], ['500', '#55A1B4'], ['600', '#4A8FA1'], ['700', '#3D7786'],
    ['800', '#2F5F6A'], ['900', '#1F3E45'],
  ]),
  /* brand-navy sort de la rampe teal exprès : à #164267 il est plus CLAIR que
     primary-900, donc il n'en est pas le cran suivant. C'est un bleu de marque
     autonome, employé en bout de gradient profond. Il s'appelait primary-950
     jusqu'au 2026-09-09, où le nom mentait sur sa place dans l'échelle. */
  { name: 'brand-navy', cssVar: '--color-brand-navy', value: '#164267', group: 'Marque — Teal (primary)', type: 'color' },
  ...scale('Marque — Orange (secondary)', 'secondary', [
    ['50', '#FFF3EB'], ['100', '#FDDCC7'], ['200', '#FCBB93'], ['300', '#F59A5F'],
    ['400', '#F18A4C'], ['500', '#ED843A'], ['600', '#C06920'], ['650', '#BF693B'],
    ['700', '#8F5017'], ['800', '#5E3710'], ['900', '#3B2109'],
  ]),
  ...scale('Marque — Or (accent)', 'accent', [
    ['50', '#FFF9EE'], ['100', '#FFECC8'], ['200', '#FFD791'], ['300', '#FFC15A'],
    ['400', '#F8B044'], ['500', '#DF9E3D'], ['600', '#C68D36'], ['700', '#A85F0A'],
    ['800', '#7E4006'], ['900', '#5F2E05'],
  ]),
  /* Rampe reconstruite le 2026-09-09, ancrée sur ink-900 (#252B37, 264°) et
     remontée en OKLCH : la clarté perceptuelle laisse tourner la teinte sans
     déplacer le contraste. Les crans 0→300 restent les gris Tailwind bruts —
     ce sont des surfaces, personne n'y lit de texte. À partir de 400 la teinte
     rejoint l'ancre. Contrastes sur blanc en commentaire. */
  ...scale('Encre — la rampe ink', 'ink', [
    ['0', '#ffffff'], ['50', '#f9fafb'], ['100', '#f3f4f6'], ['200', '#e5e7eb'],
    ['300', '#d1d5db'],
    ['400', '#8d95a6'], // 3,01 — bordure et désactivé, jamais du texte
    ['500', '#667082'], // 4,99 — passe sur les sept fonds clairs
    ['600', '#4c5466'], // 7,59 — texte secondaire sûr
    ['700', '#394050'], // 10,38
    ['800', '#2e3442'], // 12,46
    ['900', '#252B37'], // 14,20 — l'ancre, ne pas toucher
    ['950', '#131820'], // 17,81
  ]),
];

const SEMANTIC_TOKENS: TokenEntry[] = [
  { name: 'success-base', cssVar: '--color-success-base', value: '#9DBEBA', group: 'Sémantique', type: 'color' },
  { name: 'success-bg', cssVar: '--color-success-bg', value: '#E8F2F0', group: 'Sémantique', type: 'color' },
  { name: 'success-fg', cssVar: '--color-success-fg', value: '#335A56', group: 'Sémantique', type: 'color' },
  { name: 'success-vivid', cssVar: '--color-success-vivid', value: '#347572', group: 'Sémantique', type: 'color' },
  { name: 'success-bright', cssVar: '--color-success-bright', value: '#228B55', group: 'Sémantique', type: 'color' },
  { name: 'warning-base', cssVar: '--color-warning-base', value: '#F8B044', group: 'Sémantique', type: 'color' },
  { name: 'warning-bg', cssVar: '--color-warning-bg', value: '#FFF9EE', group: 'Sémantique', type: 'color' },
  { name: 'warning-fg', cssVar: '--color-warning-fg', value: '#2f1c13', group: 'Sémantique', type: 'color' },
  { name: 'danger-base', cssVar: '--color-danger-base', value: '#F28559', group: 'Sémantique', type: 'color' },
  { name: 'danger-bg', cssVar: '--color-danger-bg', value: '#FEF4F0', group: 'Sémantique', type: 'color' },
  { name: 'danger-fg', cssVar: '--color-danger-fg', value: '#8F2A0E', group: 'Sémantique', type: 'color' },
  { name: 'danger-strong', cssVar: '--color-danger-strong', value: '#C0432A', group: 'Sémantique', type: 'color' },
  { name: 'danger-deep', cssVar: '--color-danger-deep', value: '#9B2F1B', group: 'Sémantique', type: 'color' },
  { name: 'info-base', cssVar: '--color-info-base', value: '#55A1B4', group: 'Sémantique', type: 'color' },
  { name: 'info-bg', cssVar: '--color-info-bg', value: '#E8F4F7', group: 'Sémantique', type: 'color' },
  { name: 'info-fg', cssVar: '--color-info-fg', value: '#1F3E45', group: 'Sémantique', type: 'color' },
  { name: 'brown-editorial', cssVar: '--color-brown-editorial', value: '#2f1c13', group: 'Sémantique', type: 'color' },
];

/* Les rôles disent *à quoi sert* une couleur ; les rampes disent *laquelle*.
   Écrire `text-text-muted` plutôt que `text-ink-500` survit à un changement de
   rampe — c'est tout l'intérêt de la couche. */
const ROLE_TOKENS: TokenEntry[] = [
  { name: 'text-strong', cssVar: '--color-text-strong', value: 'ink-900', group: 'Rôles — texte, bordure, surface', type: 'role' },
  { name: 'text-default', cssVar: '--color-text-default', value: 'ink-700', group: 'Rôles — texte, bordure, surface', type: 'role' },
  { name: 'text-muted', cssVar: '--color-text-muted', value: 'ink-500', group: 'Rôles — texte, bordure, surface', type: 'role' },
  { name: 'text-subtle', cssVar: '--color-text-subtle', value: 'ink-400', group: 'Rôles — texte, bordure, surface', type: 'role' },
  { name: 'text-inverse', cssVar: '--color-text-inverse', value: 'ink-0', group: 'Rôles — texte, bordure, surface', type: 'role' },
  { name: 'border-subtle', cssVar: '--color-border-subtle', value: 'ink-100', group: 'Rôles — texte, bordure, surface', type: 'role' },
  { name: 'border-default', cssVar: '--color-border-default', value: 'ink-200 — la bordure de carte', group: 'Rôles — texte, bordure, surface', type: 'role' },
  { name: 'border-strong', cssVar: '--color-border-strong', value: 'ink-300', group: 'Rôles — texte, bordure, surface', type: 'role' },
  { name: 'overlay-scrim', cssVar: '--color-overlay-scrim', value: '#000000', group: 'Rôles — texte, bordure, surface', type: 'role' },
];

const SURFACE_TOKENS: TokenEntry[] = [
  { name: 'surface', cssVar: '--color-surface', value: '#ffffff', group: 'Surfaces', type: 'surface' },
  { name: 'surface-muted', cssVar: '--color-surface-muted', value: 'ink-50', group: 'Surfaces', type: 'surface' },
  { name: 'surface-sunken', cssVar: '--color-surface-sunken', value: 'ink-100', group: 'Surfaces', type: 'surface' },
  { name: 'surface-elevated', cssVar: '--color-surface-elevated', value: 'ink-0', group: 'Surfaces', type: 'surface' },
  { name: 'surface-cyan', cssVar: '--color-surface-cyan', value: '#f0f9ff', group: 'Surfaces', type: 'surface' },
  { name: 'surface-mist', cssVar: '--color-surface-mist', value: '#f8fbfd', group: 'Surfaces', type: 'surface' },
  { name: 'surface-cream', cssVar: '--color-surface-cream', value: '#fefaf5', group: 'Surfaces', type: 'surface' },
];

/* Deux échelles typographiques, et c'est volontaire.

   `h1…micro` sert l'application : des pas fixes, parce qu'un tableau de bord ne
   doit pas respirer différemment selon la largeur de la fenêtre. `hero…lede`
   sert les surfaces éditoriales : des `clamp()`, parce qu'un titre d'ouverture
   doit tenir de 375 px à 1440 px.

   Trois pas ont bougé le 2026-09-09 : h3 22→24 px (à 22 px en graisse 700 il
   ratait le seuil des 18,66 px du « grand texte » WCAG, donc exigeait 4,5:1 au
   lieu de 3:1), h4 18→20 px (il collisionnait avec body-lg, deux noms pour la
   même taille), et l'interligne de micro 16→18 px. `display-xl`, `display-lg` et
   `h5` ont été retirés : zéro usage.

   Le 2026-09-24 (arbitrages n°20 et 21) : le h3 de 24 px sort de l'échelle et
   l'ancien h4 de 20 devient le h3 ; `body-sm` (15) fond dans `body` (16). Les
   spécimens de la vitrine se dessinent depuis la variable (Swatch), pas depuis
   la chaîne `value`, qui ne sert plus qu'à l'affichage et à la recherche. */
const TYPOGRAPHY_TOKENS: TokenEntry[] = [
  { name: 'h1', cssVar: '--text-h1', value: '36 px · 44 · 700 · -0.03em', group: 'Typographie — échelle produit', type: 'typography' },
  { name: 'h2', cssVar: '--text-h2', value: '28 px · 36 · 700 · -0.025em', group: 'Typographie — échelle produit', type: 'typography' },
  { name: 'h3', cssVar: '--text-h3', value: '20 px · 26 · 700 · -0.02em — titre de bloc (arbitrage n°21 : 28 puis 20)', group: 'Typographie — échelle produit', type: 'typography' },
  { name: 'body-lg', cssVar: '--text-body-lg', value: '18 px · 28', group: 'Typographie — échelle produit', type: 'typography' },
  { name: 'body', cssVar: '--text-body', value: '16 px · 26 — tout le texte qu’on lit (arbitrage n°20)', group: 'Typographie — échelle produit', type: 'typography' },
  { name: 'caption', cssVar: '--text-caption', value: '13 px · 20', group: 'Typographie — échelle produit', type: 'typography' },
  { name: 'micro', cssVar: '--text-micro', value: '11 px · 18', group: 'Typographie — échelle produit', type: 'typography' },
];

const EDITORIAL_TYPE_TOKENS: TokenEntry[] = [
  { name: 'hero', cssVar: '--text-hero', value: '44 → 80 px · 800', group: 'Typographie — échelle éditoriale (site)', type: 'typography' },
  { name: 'section', cssVar: '--text-section', value: '32 → 52 px · 800', group: 'Typographie — échelle éditoriale (site)', type: 'typography' },
  { name: 'title', cssVar: '--text-title', value: '26 → 38 px · 700', group: 'Typographie — échelle éditoriale (site)', type: 'typography' },
  { name: 'feature', cssVar: '--text-feature', value: '22 → 30 px · 700', group: 'Typographie — échelle éditoriale (site)', type: 'typography' },
  { name: 'lede', cssVar: '--text-lede', value: '17 → 22 px — le chapô', group: 'Typographie — échelle éditoriale (site)', type: 'typography' },
  { name: 'stat-value', cssVar: '--text-stat-value', value: '32 → 44 px', group: 'Typographie — échelle éditoriale (site)', type: 'typography' },
  { name: 'stat-value-lg', cssVar: '--text-stat-value-lg', value: '40 → 56 px', group: 'Typographie — échelle éditoriale (site)', type: 'typography' },
];

/* Le serrage suit une courbe inverse de la taille : plus le texte est gros, plus
   les lettres doivent se rapprocher pour que le mot fasse bloc. Un serrage
   uniforme sur toute l'échelle est l'anti-patron classique — il rend les grands
   titres lâches et le petit texte illisible. */
const TRACKING_TOKENS: TokenEntry[] = [
  { name: 'tracking-display', cssVar: '--tracking-display', value: '-0.03em — h1, hero', group: 'Serrage (tracking)', type: 'typography' },
  { name: 'tracking-headline', cssVar: '--tracking-headline', value: '-0.025em — h2', group: 'Serrage (tracking)', type: 'typography' },
  { name: 'tracking-snug', cssVar: '--tracking-snug', value: '-0.02em — h3 (et h4, qui n’a plus de pas à lui)', group: 'Serrage (tracking)', type: 'typography' },
  { name: 'tracking-label', cssVar: '--tracking-label', value: '+0.05em — le seul positif : étiquettes en capitales', group: 'Serrage (tracking)', type: 'typography' },
];

const FONT_TOKENS: TokenEntry[] = [
  { name: 'font-display', cssVar: '--font-display', value: 'League Spartan — titres. Aucune fonte italique.', group: 'Familles', type: 'typography' },
  { name: 'font-body', cssVar: '--font-body', value: 'Nunito — texte courant, et le vrai italique', group: 'Familles', type: 'typography' },
  { name: 'font-mono', cssVar: '--font-mono', value: 'JetBrains Mono — code, valeurs', group: 'Familles', type: 'typography' },
];

/* `--spacing: 0.25rem` est la base multipliée par Tailwind : `p-4` = 16 px. Les
   noms sémantiques disent l'intention plutôt que le nombre — `gap-stack` se
   relit, `gap-stack` se recompte. */
const SPACING_TOKENS: TokenEntry[] = [
  { name: 'spacing (base 4pt)', cssVar: '--spacing', value: '0.25rem · 4 px — l’unité que Tailwind multiplie', group: 'Espacement — base', type: 'spacing' },
  { name: 'tight', cssVar: '--spacing-tight', value: '2 px', group: 'Espacement — sémantique', type: 'spacing' },
  { name: 'stack-3xs', cssVar: '--spacing-stack-3xs', value: "4 px — ajouté le 2026-09-16, 51 usages l'attendaient (ex-gap-1). ⚠️ `tight` vaut 2, pas 4 : renommer un gap-1 en gap-tight le divise par deux", group: 'Espacement — sémantique', type: 'spacing' },
  { name: 'stack-2xs', cssVar: '--spacing-stack-2xs', value: '6 px — le barreau ajouté le 2026-09-09, ex-gap-stack-2xs', group: 'Espacement — sémantique', type: 'spacing' },
  { name: 'stack-xs', cssVar: '--spacing-stack-xs', value: '8 px', group: 'Espacement — sémantique', type: 'spacing' },
  { name: 'stack-sm', cssVar: '--spacing-stack-sm', value: '12 px — ajouté le 2026-09-16, 23 usages l\'attendaient (ex-gap-3)', group: 'Espacement — sémantique', type: 'spacing' },
  { name: 'stack', cssVar: '--spacing-stack', value: '16 px', group: 'Espacement — sémantique', type: 'spacing' },
  { name: 'stack-md', cssVar: '--spacing-stack-md', value: '20 px — ajouté le 2026-09-17 (verdict « cran 20 px », option A), 56 usages l\'attendaient (ex-p-stack-md/py-stack-md/gap-stack-md)', group: 'Espacement — sémantique', type: 'spacing' },
  { name: 'stack-lg', cssVar: '--spacing-stack-lg', value: '24 px', group: 'Espacement — sémantique', type: 'spacing' },
  { name: 'section', cssVar: '--spacing-section', value: '32 px', group: 'Espacement — sémantique', type: 'spacing' },
  { name: 'section-lg', cssVar: '--spacing-section-lg', value: '40 px', group: 'Espacement — sémantique', type: 'spacing' },
  { name: 'page', cssVar: '--spacing-page', value: '48 px', group: 'Espacement — sémantique', type: 'spacing' },
];

/* Le rythme éditorial est fluide là où l'espacement produit est fixe : sur une
   page de site, l'air entre deux bandes doit grandir avec la fenêtre. */
const RHYTHM_TOKENS: TokenEntry[] = [
  { name: 'rule', cssVar: '--spacing-rule', value: '8 → 12 px', group: 'Rythme éditorial (fluide)', type: 'spacing' },
  { name: 'group', cssVar: '--spacing-group', value: '16 → 24 px', group: 'Rythme éditorial (fluide)', type: 'spacing' },
  { name: 'flow', cssVar: '--spacing-flow', value: '32 → 56 px', group: 'Rythme éditorial (fluide)', type: 'spacing' },
  { name: 'band', cssVar: '--spacing-band', value: '64 → 120 px', group: 'Rythme éditorial (fluide)', type: 'spacing' },
  { name: 'chapter', cssVar: '--spacing-chapter', value: '96 → 176 px', group: 'Rythme éditorial (fluide)', type: 'spacing' },
  { name: 'hero', cssVar: '--spacing-hero', value: '112 → 168 px', group: 'Rythme éditorial (fluide)', type: 'spacing' },
  { name: 'gutter', cssVar: '--spacing-gutter', value: '16 → 40 px — la gouttière de page', group: 'Rythme éditorial (fluide)', type: 'spacing' },
];

const RADIUS_TOKENS: TokenEntry[] = [
  { name: 'xs', cssVar: '--radius-xs', value: '4 px', group: 'Rayons', type: 'radius' },
  { name: 'sm', cssVar: '--radius-sm', value: '6 px', group: 'Rayons', type: 'radius' },
  { name: 'md', cssVar: '--radius-md', value: '10 px', group: 'Rayons', type: 'radius' },
  { name: 'lg', cssVar: '--radius-lg', value: '14 px — étage interactif : boutons, champs, rangées', group: 'Rayons', type: 'radius' },
  { name: 'xl', cssVar: '--radius-xl', value: '20 px — étage conteneur : cartes', group: 'Rayons', type: 'radius' },
  { name: '2xl', cssVar: '--radius-2xl', value: '24 px — étage surcouche : modales, tiroirs', group: 'Rayons', type: 'radius' },
  { name: 'pill', cssVar: '--radius-pill', value: '999 px — étiquettes sous 28 px, bouton icône', group: 'Rayons', type: 'radius' },
];

/* Depuis la passe de sobriété du 2026-09-09, les cartes n'ont plus d'ombre : la
   bordure `ink-200` suffit, et l'ombre est réservée à ce qui flotte réellement
   au-dessus de la page — menus, modales, toasts. Les ombres ci-dessous restent
   donc au catalogue, mais leur terrain d'emploi s'est resserré. */
const SHADOW_TOKENS: TokenEntry[] = [
  { name: 'xs', cssVar: '--shadow-xs', value: '0 1px 2px rgba(18,24,28,.04)', group: 'Ombres — élévation neutre', type: 'shadow' },
  { name: 'sm', cssVar: '--shadow-sm', value: 'double couche, 1–3 px', group: 'Ombres — élévation neutre', type: 'shadow' },
  { name: 'md', cssVar: '--shadow-md', value: '4–12 px', group: 'Ombres — élévation neutre', type: 'shadow' },
  { name: 'lg', cssVar: '--shadow-lg', value: '16–40 px', group: 'Ombres — élévation neutre', type: 'shadow' },
  { name: 'xl', cssVar: '--shadow-xl', value: '28–72 px — modales', group: 'Ombres — élévation neutre', type: 'shadow' },
  { name: 'card', cssVar: '--shadow-card', value: 'repli des cartes sans ton', group: 'Ombres — cartes', type: 'shadow' },
  { name: 'card-hover', cssVar: '--shadow-card-hover', value: 'survol', group: 'Ombres — cartes', type: 'shadow' },
  { name: 'card-lift', cssVar: '--shadow-card-lift', value: 'décollement', group: 'Ombres — cartes', type: 'shadow' },
  { name: 'brand-xs', cssVar: '--shadow-brand-xs', value: 'teal 8 %', group: 'Ombres — teintées par ton', type: 'shadow' },
  { name: 'brand-sm', cssVar: '--shadow-brand-sm', value: 'teal 12 %', group: 'Ombres — teintées par ton', type: 'shadow' },
  { name: 'brand-md', cssVar: '--shadow-brand-md', value: 'teal 18 % — survol du bouton primary', group: 'Ombres — teintées par ton', type: 'shadow' },
  { name: 'warm-xs', cssVar: '--shadow-warm-xs', value: 'orange 8 %', group: 'Ombres — teintées par ton', type: 'shadow' },
  { name: 'warm-sm', cssVar: '--shadow-warm-sm', value: 'orange 12 %', group: 'Ombres — teintées par ton', type: 'shadow' },
  { name: 'warm-md', cssVar: '--shadow-warm-md', value: 'orange 18 %', group: 'Ombres — teintées par ton', type: 'shadow' },
  { name: 'sun-xs', cssVar: '--shadow-sun-xs', value: 'or 8 %', group: 'Ombres — teintées par ton', type: 'shadow' },
  { name: 'sun-sm', cssVar: '--shadow-sun-sm', value: 'or 12 %', group: 'Ombres — teintées par ton', type: 'shadow' },
  { name: 'sun-md', cssVar: '--shadow-sun-md', value: 'or 16 %', group: 'Ombres — teintées par ton', type: 'shadow' },
  { name: 'danger-md', cssVar: '--shadow-danger-md', value: 'rouge brique 18 %', group: 'Ombres — teintées par ton', type: 'shadow' },
  { name: 'success-xs', cssVar: '--shadow-success-xs', value: 'vert-de-gris 8 %', group: 'Ombres — teintées par ton', type: 'shadow' },
  { name: 'success-sm', cssVar: '--shadow-success-sm', value: 'vert-de-gris 12 %', group: 'Ombres — teintées par ton', type: 'shadow' },
];

/* Échelle déclarée au sprint 2, restée sans aucun consommateur jusqu'au
   2026-09-09 : Button la câble enfin. Chaque cran est apparié à un pas de
   l'échelle de texte, dans un rapport constant d'environ 1,25 — c'est ce
   rapport qui fait qu'une icône « pèse » autant que le mot à côté d'elle. */
const ICON_TOKENS: TokenEntry[] = [
  { name: '2xs', cssVar: '--icon-size-2xs', value: '14 px — méta-données, pastilles, chevrons · 770 usages', group: 'Icônes — interface', type: 'icon' },
  { name: 'xs', cssVar: '--icon-size-xs', value: '16 px — avec caption (13 px) · bouton sm', group: 'Icônes — interface', type: 'icon' },
  { name: 'sm', cssVar: '--icon-size-sm', value: '18 px — avec le corps (16 px) · bouton md', group: 'Icônes — interface', type: 'icon' },
  { name: 'md', cssVar: '--icon-size-md', value: '20 px — avec body (16 px) · bouton lg', group: 'Icônes — interface', type: 'icon' },
  { name: 'lg', cssVar: '--icon-size-lg', value: '24 px — avec le chapô (18 px)', group: 'Icônes — interface', type: 'icon' },
  { name: 'xl', cssVar: '--icon-size-xl', value: '28 px — le plus grand cran d’interface', group: 'Icônes — interface', type: 'icon' },
  { name: '2xl', cssVar: '--icon-size-2xl', value: '32 px — vignettes, en-têtes de carte', group: 'Icônes — affichage', type: 'icon' },
  { name: '3xl', cssVar: '--icon-size-3xl', value: '40 px — états vides', group: 'Icônes — affichage', type: 'icon' },
  { name: '4xl', cssVar: '--icon-size-4xl', value: '48 px — pages d’erreur, ouvertures. Au-delà, c’est de l’illustration.', group: 'Icônes — affichage', type: 'icon' },
];

const BORDER_TOKENS: TokenEntry[] = [
  { name: 'hairline', cssVar: '--border-hairline', value: '1 px — cartes, champs', group: 'Épaisseurs de trait', type: 'spacing' },
  { name: 'base', cssVar: '--border-base', value: '2 px', group: 'Épaisseurs de trait', type: 'spacing' },
  { name: 'thick', cssVar: '--border-thick', value: '3 px', group: 'Épaisseurs de trait', type: 'spacing' },
  { name: 'heavy', cssVar: '--border-heavy', value: '4 px', group: 'Épaisseurs de trait', type: 'spacing' },
];

const OPACITY_TOKENS: TokenEntry[] = [
  { name: 'faint', cssVar: '--opacity-faint', value: '0.05', group: 'Opacité', type: 'opacity' },
  { name: 'soft', cssVar: '--opacity-soft', value: '0.10', group: 'Opacité', type: 'opacity' },
  { name: 'tinted', cssVar: '--opacity-tinted', value: '0.15', group: 'Opacité', type: 'opacity' },
  { name: 'medium', cssVar: '--opacity-medium', value: '0.30', group: 'Opacité', type: 'opacity' },
  { name: 'disabled', cssVar: '--opacity-disabled', value: '0.50', group: 'Opacité', type: 'opacity' },
  { name: 'overlay', cssVar: '--opacity-overlay', value: '0.70', group: 'Opacité', type: 'opacity' },
];

const DURATION_TOKENS: TokenEntry[] = [
  { name: 'instant', cssVar: '--duration-instant', value: '80 ms — l’enfoncement d’un bouton', group: 'Durées', type: 'duration' },
  { name: 'fast', cssVar: '--duration-fast', value: '150 ms', group: 'Durées', type: 'duration' },
  { name: 'base', cssVar: '--duration-base', value: '200 ms', group: 'Durées', type: 'duration' },
  { name: 'slow', cssVar: '--duration-slow', value: '300 ms', group: 'Durées', type: 'duration' },
  { name: 'glacial', cssVar: '--duration-glacial', value: '600 ms', group: 'Durées', type: 'duration' },
  { name: 'expressive', cssVar: '--duration-expressive', value: '800 ms', group: 'Durées', type: 'duration' },
];

const EASING_TOKENS: TokenEntry[] = [
  { name: 'standard', cssVar: '--ease-standard', value: 'cubic-bezier(0.2, 0, 0, 1)', group: 'Courbes', type: 'easing' },
  { name: 'decelerate', cssVar: '--ease-decelerate', value: 'cubic-bezier(0, 0, 0.2, 1) — entrée', group: 'Courbes', type: 'easing' },
  { name: 'accelerate', cssVar: '--ease-accelerate', value: 'cubic-bezier(0.4, 0, 1, 1) — sortie', group: 'Courbes', type: 'easing' },
  { name: 'emphasis', cssVar: '--ease-emphasis', value: 'cubic-bezier(0.22, 1, 0.36, 1)', group: 'Courbes', type: 'easing' },
];

const CONTAINER_TOKENS: TokenEntry[] = [
  { name: 'prose', cssVar: '--container-prose', value: '65ch — la longueur de ligne lisible', group: 'Largeurs de conteneur', type: 'container' },
  { name: 'content', cssVar: '--container-content', value: '768 px', group: 'Largeurs de conteneur', type: 'container' },
  { name: 'medium', cssVar: '--container-medium', value: '1024 px', group: 'Largeurs de conteneur', type: 'container' },
  { name: 'page', cssVar: '--container-page', value: '1152 px — le conteneur canonique', group: 'Largeurs de conteneur', type: 'container' },
  { name: 'wide', cssVar: '--container-wide', value: '1280 px', group: 'Largeurs de conteneur', type: 'container' },
];

const BLUR_TOKENS: TokenEntry[] = [
  { name: 'glass-light', cssVar: '--blur-glass-light', value: '8 px', group: 'Flou (verre dépoli)', type: 'blur' },
  { name: 'glass-medium', cssVar: '--blur-glass-medium', value: '16 px', group: 'Flou (verre dépoli)', type: 'blur' },
  { name: 'glass-heavy', cssVar: '--blur-glass-heavy', value: '24 px', group: 'Flou (verre dépoli)', type: 'blur' },
  { name: 'ambient', cssVar: '--blur-ambient', value: '60 px — les halos de fond', group: 'Flou (verre dépoli)', type: 'blur' },
];

const TOUCH_TARGET_TOKENS: TokenEntry[] = [
  { name: 'touch', cssVar: '--spacing-touch', value: '44 px — la taille du bouton par défaut', group: 'Cibles tactiles', type: 'touch' },
  { name: 'touch-lg', cssVar: '--spacing-touch-lg', value: '48 px — Material confortable', group: 'Cibles tactiles', type: 'touch' },
];

/* Deux noms pour la même échelle, et c'est délibéré : Tailwind génère les
   utilities `z-*` depuis `--z-index-*`, tandis que `--z-*` reste lisible dans un
   `var()` écrit à la main. Les valeurs sont identiques — le piège serait qu'elles
   divergent, d'où leur présence côte à côte ici. */
const ZINDEX_TOKENS: TokenEntry[] = [
  { name: 'base', cssVar: '--z-index-base', value: '1', group: 'z-index', type: 'zindex' },
  { name: 'sticky', cssVar: '--z-index-sticky', value: '20', group: 'z-index', type: 'zindex' },
  { name: 'dropdown', cssVar: '--z-index-dropdown', value: '30', group: 'z-index', type: 'zindex' },
  { name: 'overlay', cssVar: '--z-index-overlay', value: '40', group: 'z-index', type: 'zindex' },
  { name: 'modal', cssVar: '--z-index-modal', value: '50', group: 'z-index', type: 'zindex' },
  { name: 'toast', cssVar: '--z-index-toast', value: '60', group: 'z-index', type: 'zindex' },
  { name: 'tooltip', cssVar: '--z-index-tooltip', value: '70', group: 'z-index', type: 'zindex' },
];

/** Ordre de lecture : la couleur, puis le texte, puis l'espace, puis la matière. */
const ALL_TOKENS: TokenEntry[] = [
  ...COLOR_TOKENS,
  ...SEMANTIC_TOKENS,
  ...ROLE_TOKENS,
  ...SURFACE_TOKENS,
  ...FONT_TOKENS,
  ...TYPOGRAPHY_TOKENS,
  ...EDITORIAL_TYPE_TOKENS,
  ...TRACKING_TOKENS,
  ...SPACING_TOKENS,
  ...RHYTHM_TOKENS,
  ...RADIUS_TOKENS,
  ...SHADOW_TOKENS,
  ...ICON_TOKENS,
  ...BORDER_TOKENS,
  ...TOUCH_TARGET_TOKENS,
  ...OPACITY_TOKENS,
  ...DURATION_TOKENS,
  ...EASING_TOKENS,
  ...BLUR_TOKENS,
  ...CONTAINER_TOKENS,
  ...ZINDEX_TOKENS,
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

/**
 * Valeur réellement calculée par le navigateur pour une variable CSS.
 * Les chaînes en dur de SHADOW_TOKENS/COLOR_TOKENS avaient dérivé : la vitrine
 * annonçait des valeurs que l'app ne rendait plus. On lit la source, on ne la
 * recopie pas. `fallback` sert au premier rendu et si la variable n'existe pas.
 */
function useLiveTokenValue(cssVar: string | undefined, fallback: string): string {
  // Lecture pendant le rendu, pas dans un effet : la variable est deja resolue
  // sur :root des le premier paint, donc pas besoin d'un state ni d'un second
  // rendu (et ca evite react-hooks/set-state-in-effect).
  return useMemo(() => {
    if (!cssVar || typeof document === 'undefined') return fallback;
    const v = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
    return v || fallback;
  }, [cssVar, fallback]);
}

const Swatch: React.FC<{ t: TokenEntry }> = ({ t }) => {
  const liveValue = useLiveTokenValue(t.cssVar, t.value);
  if (t.type === 'color' || t.type === 'role') {
    return (
      <div className="token-card">
        <div
          className="token-card__swatch"
          style={{
            // liveValue, jamais t.value : les échelles en dur de COLOR_TOKENS
            // avaient dérivé (l'échelle ink y était encore teintée teal) et la
            // vitrine montrait des gris que l'app ne rend nulle part.
            background: t.type === 'role' && t.cssVar.startsWith('--border')
              ? `linear-gradient(45deg, transparent 49%, ${liveValue} 49%, ${liveValue} 51%, transparent 51%)`
              : liveValue,
            border: t.cssVar.includes('surface') || liveValue.toUpperCase() === '#FFFFFF' ? '1px solid var(--border)' : undefined,
          }}
        />
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value" title={liveValue}>{liveValue}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'gradient') {
    return (
      <div className="token-card">
        <div className="token-card__swatch" style={{ background: t.cssVar ? `var(${t.cssVar}, ${t.value})` : t.value }} />
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value" title={liveValue}>{liveValue}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'shadow') {
    return (
      <div className="token-card">
        <div
          className="token-card__swatch token-card__swatch--shadow"
          /* On dessine depuis la VARIABLE CSS, jamais depuis t.value : les chaînes
             en dur de SHADOW_TOKENS avaient dérivé et la vitrine montrait des
             ombres que l'app ne rendait plus. t.value ne sert plus qu'à afficher
             la valeur en texte, et `?? t.value` couvre un cssVar absent. */
          style={{ boxShadow: t.cssVar ? `var(${t.cssVar}, ${t.value})` : t.value }}
        />
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={t.cssVar} />
          <p className="token-card__value" title={liveValue}>{liveValue}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'spacing') {
    /* On mesure la valeur VIVANTE plutot que de parser la chaine en dur : c'est
       ce qui a fait deriver --dur-* et --r-2xl, qui affichaient des valeurs que
       l'app ne rendait plus. */
    const src = liveValue || t.value;
    const rem = src.match(/([\d.]+)\s*rem/);
    const pxMatch = src.match(/([\d.]+)\s*px/);
    const px = rem ? Math.round(parseFloat(rem[1]) * 16)
             : pxMatch ? Math.round(parseFloat(pxMatch[1]))
             : (parseInt(src, 10) || 0);
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
          style={{ borderRadius: t.cssVar ? `var(${t.cssVar}, ${t.value})` : t.value }}
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
    /* Le spécimen se dessine depuis la VARIABLE, comme les couleurs et les
       ombres. Il lisait la taille dans la chaîne `value` (« 36 px · 44… ») et
       passait « 36 » sans unité : le navigateur l'ignorait, et les vingt et un
       spécimens rendaient à 16 px, les titres en graisse 600 — mesuré au
       navigateur le 2026-09-24. `tracking-label` tombait, lui, à 0,8 px
       (« +0.05em » lu comme une taille). La table était juste ; son rendu ne
       montrait aucune échelle.
       Spécimen décoratif (aria-hidden) : la valeur lisible est dans la méta. */
    const DISPLAY = ['h1', 'h2', 'h3', 'hero', 'section', 'title', 'feature', 'stat-value', 'stat-value-lg'];
    const GRAND = ['h1', 'hero', 'section', 'title', 'stat-value', 'stat-value-lg'];
    let style: React.CSSProperties;
    let specimen = 'Aa Éé Öö 1234';
    if (t.group === 'Familles') {
      style = { fontFamily: `var(${t.cssVar})`, fontSize: 'var(--text-h3)' };
    } else if (t.group === 'Serrage (tracking)') {
      style = t.name === 'tracking-label'
        ? { fontFamily: 'var(--font-body)', fontSize: 'var(--text-micro)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: `var(${t.cssVar})` }
        : { fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 700, letterSpacing: `var(${t.cssVar})` };
      specimen = t.name === 'tracking-label' ? 'À venir' : 'Parcours';
    } else {
      const display = DISPLAY.includes(t.name);
      if (GRAND.includes(t.name)) specimen = 'Aa 12';
      style = {
        fontFamily: display ? 'var(--font-display)' : 'var(--font-body)',
        fontSize: `var(${t.cssVar})`,
        lineHeight: `var(${t.cssVar}--line-height, 1.2)`,
        fontWeight: `var(${t.cssVar}--font-weight, ${display ? 700 : 400})` as React.CSSProperties['fontWeight'],
        letterSpacing: `var(${t.cssVar}--letter-spacing, normal)`,
        ...(t.name === 'micro' ? { fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 'var(--tracking-label)' } : {}),
      };
    }
    return (
      <div className="token-card token-card--wide">
        <div aria-hidden className="token-card__typography" style={style}>
          {specimen}
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

  if (t.type === 'opacity') {
    // Map token suffix → Tailwind opacity utility (e.g. opacity-faint, bg-primary-500/medium)
    const suffix = t.name.replace('opacity-', '');
    return (
      <div className="token-card">
        <div className="h-[72px] rounded-md bg-ink-100 flex items-center justify-center overflow-hidden">
          <div className={`h-full w-full bg-primary-500/${suffix}`} />
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={`bg-primary-500/${suffix}`} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'duration') {
    const suffix = t.name.replace('duration-', '');
    return (
      <div className="token-card">
        <div className="h-[72px] rounded-md bg-primary-50 flex items-center justify-center overflow-hidden group">
          <div
            className={`w-8 h-8 rounded-md bg-primary-500 transition-all ease-standard duration-${suffix} group-hover:translate-x-12 group-hover:bg-secondary-500`}
            title="Hover the card to see this duration"
          />
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={`duration-${suffix}`} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'easing') {
    const suffix = t.name.replace('ease-', '');
    return (
      <div className="token-card">
        <div className="h-[72px] rounded-md bg-primary-50 flex items-center justify-center overflow-hidden group">
          <div
            className={`w-8 h-8 rounded-md bg-primary-500 transition-all duration-slow ease-${suffix} group-hover:translate-x-12 group-hover:bg-secondary-500`}
            title="Hover the card to see this easing"
          />
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={`ease-${suffix}`} />
          <p className="token-card__value" title={t.value}>{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'container') {
    // Visualise the proportion as a horizontal bar (relative widths)
    const widthMap: Record<string, string> = {
      'container-prose': 'w-[35%]',
      'container-content': 'w-[55%]',
      'container-page': 'w-[80%]',
      'container-wide': 'w-full',
    };
    const widthClass = widthMap[t.name] ?? 'w-full';
    return (
      <div className="token-card token-card--wide">
        <div className="h-[72px] rounded-md bg-ink-100 flex items-center px-2 overflow-hidden">
          <div className={`${widthClass} h-3 rounded-pill bg-primary-500`} />
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={`max-w-${t.name.replace('container-', '')}`} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'blur') {
    const suffix = t.name.replace('blur-', '');
    return (
      <div className="token-card">
        <div
          className="h-[72px] rounded-md overflow-hidden flex items-center justify-center relative"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #55A1B4 0%, #ED843A 50%, #F8B044 100%)',
          }}
        >
          <div className={`absolute inset-2 rounded-md bg-white/40 backdrop-blur-${suffix} flex items-center justify-center`}>
            <span className="text-caption font-semibold text-ink-900">{t.value}</span>
          </div>
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={`backdrop-blur-${suffix}`} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'surface') {
    // Map surface token → its bg utility (must be a static literal so JIT compiles it)
    const bgClassMap: Record<string, string> = {
      surface: 'bg-surface',
      'surface-muted': 'bg-surface-muted',
      'surface-sunken': 'bg-surface-sunken',
      'surface-elevated': 'bg-surface-elevated',
    };
    const bgClass = bgClassMap[t.name] ?? 'bg-surface';
    const utility = bgClass;
    return (
      <div className="token-card">
        <div className="h-[72px] rounded-md bg-ink-100/30 p-3 flex items-center justify-center">
          <div className={`${bgClass} w-full h-full rounded-sm border border-ink-200 shadow-xs flex items-center justify-center`}>
            <span className="text-caption font-mono text-ink-600">{t.name}</span>
          </div>
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={utility} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'icon') {
    /* On montre l'icône **à côté du mot** avec lequel le token l'apparie : une
       taille d'icône ne se juge pas dans le vide, elle se juge au rapport avec
       le texte qu'elle accompagne. Le carré teinté derrière donne la boîte réelle,
       pour qu'on voie que le glyphe la remplit — c'était précisément le défaut
       corrigé dans Button le 2026-09-09. */
    const box = `icon-${t.name}`;
    const paired: Record<string, string> = {
      '2xs': 'text-micro font-body', xs: 'text-caption font-body', sm: 'text-body font-body', md: 'text-body font-body',
      lg: 'text-body-lg font-body', xl: 'text-h3 font-display', '2xl': 'text-h3 font-display', '3xl': 'text-h3 font-display', '4xl': 'text-h3 font-display',
    };
    return (
      <div className="token-card">
        <div className="h-[88px] rounded-md bg-ink-50 flex items-center justify-center gap-stack-xs">
          <span className={`${box} inline-flex items-center justify-center bg-primary-100 rounded-xs text-primary-800 [&>svg]:w-full [&>svg]:h-full`}>
            <CirclePlus strokeWidth={2} aria-hidden />
          </span>
          <span className={`${paired[t.name] ?? 'text-body font-body'} text-ink-700`}>Étiquette</span>
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">icon-{t.name}</p>
          <CopyChip text={box} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'touch') {
    // Static literals → JIT compiles `h-touch w-touch` and `h-touch-lg w-touch-lg`
    const sizeClass = t.name === 'touch-lg' ? 'h-touch-lg w-touch-lg' : 'h-touch w-touch';
    const utility = t.name === 'touch-lg' ? 'h-touch-lg' : 'h-touch';
    return (
      <div className="token-card">
        <div className="h-[88px] rounded-md bg-ink-50 flex items-center justify-center">
          <div className={`${sizeClass} rounded-md bg-primary-700 flex items-center justify-center text-white text-caption font-semibold tabular-nums`}>
            {t.name === 'touch-lg' ? '48' : '44'}
          </div>
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={utility} />
          <p className="token-card__value">{t.value}</p>
        </div>
      </div>
    );
  }

  if (t.type === 'zindex') {
    const z = parseInt(t.value, 10) || 0;
    // Visual: stacked layers indicator
    return (
      <div className="token-card">
        <div className="h-[72px] rounded-md bg-ink-50 flex items-center justify-center relative overflow-hidden">
          <div className="absolute left-4 top-4 w-12 h-12 rounded-md bg-primary-300/medium" />
          <div className="absolute left-7 top-7 w-12 h-12 rounded-md bg-primary-500/overlay" />
          <span className="relative font-display text-h3 text-ink-900 tabular-nums">{z}</span>
        </div>
        <div className="token-card__meta">
          <p className="token-card__name">{t.name}</p>
          <CopyChip text={`z-${t.name.replace('z-', '')}`} />
          <p className="token-card__value">layer {z}</p>
        </div>
      </div>
    );
  }

  return null;
};

/* ============================================================================
 * MAIN PAGE
 * ============================================================================ */

type Filter = 'all' | NewCategory | 'Tokens';

// Alphabetical order — "Tout" pinned first, "Tokens" pinned last
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all',                label: 'Tout' },
  { id: 'Atoms',              label: 'Atoms' },
  { id: 'Auth Family',        label: 'Auth Family' },
  { id: 'Cards',              label: 'Cards' },
  { id: 'Composites',         label: 'Composites' },
  { id: 'Feedback',           label: 'Feedback' },
  { id: 'Forms',              label: 'Forms' },
  { id: 'Foundations',        label: 'Foundations' },
  { id: 'Headers & Sections', label: 'Headers & Sections' },
  { id: 'Learning',           label: 'Learning' },
  { id: 'Lists & Feeds',      label: 'Lists & Feeds' },
  { id: 'Modals',             label: 'Modals' },
  { id: 'Navigation',         label: 'Navigation' },
  { id: 'Pages & Templates',  label: 'Pages & Templates' },
  { id: 'Tokens',             label: 'Tokens' },
];

// Filter options for SelectCheckbox
const FILTER_OPTIONS = [
  { id: 'showcaseOnly', label: 'Showcase only' },
  { id: 'toneAware', label: 'Tone-aware' },
  { id: 'hasVariants', label: 'Has variants' },
  { id: 'usedByPages', label: 'Used by pages' },
];

// Category options with subcategories for SelectCheckboxCategory
const CATEGORY_OPTIONS = [
  { id: 'all', label: 'Toutes les catégories' },
  {
    id: 'Atoms',
    label: 'Atoms',
    subcategories: [
      { id: 'Atoms-Basis', label: 'Basis' },
      { id: 'Atoms-Typography', label: 'Typography' },
    ],
  },
  {
    id: 'Forms',
    label: 'Forms',
    subcategories: [
      { id: 'Forms-Inputs', label: 'Inputs' },
      { id: 'Forms-Controls', label: 'Controls' },
    ],
  },
  {
    id: 'Cards',
    label: 'Cards',
    subcategories: [
      { id: 'Cards-Content', label: 'Content Cards' },
      { id: 'Cards-Data', label: 'Data Cards' },
    ],
  },
  { id: 'Feedback', label: 'Feedback' },
  { id: 'Navigation', label: 'Navigation' },
  { id: 'Learning', label: 'Learning' },
  { id: 'Headers & Sections', label: 'Headers & Sections' },
  { id: 'Composites', label: 'Composites' },
  { id: 'Auth Family', label: 'Auth Family' },
  { id: 'Lists & Feeds', label: 'Lists & Feeds' },
  { id: 'Modals', label: 'Modals' },
  { id: 'Foundations', label: 'Foundations' },
  { id: 'Pages & Templates', label: 'Pages & Templates' },
  { id: 'Tokens', label: 'Tokens' },
];

// Wraps each render() in its own React component scope so hooks are independent.
// Without this, calling c.render() directly in the parent's map() makes all
// useState/useEffect calls share the parent's hook call order — changing the
// number of visible components (search query) breaks the hook order rule.
function ComponentRenderer({ renderFn }: { renderFn: () => React.ReactNode }) {
  return <>{renderFn()}</>;
}

// Simple Error Boundary wrapper for component previews
class ComponentPreviewErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-stack bg-danger-bg text-danger-fg border border-danger-base rounded-md">
          <p className="font-bold">Render Error</p>
          <p className="text-caption font-mono">{this.state.error?.message || 'Unknown error'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Components: React.FC = () => {
  const navigate = useNavigate();
  const activeSlug = useCategorySlug();
  const [query, setQuery] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  /* La catégorie active vient de l'URL, plus d'un état local : une seule
     source, et le lien reste partageable. */
  const isSearching = query.trim().length > 0;

  // Show back-to-top button once scrolled past hero
  React.useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const q = query.trim().toLowerCase();

  // Components enriched with meta (category + subCategory)
  const componentsWithMeta = useMemo(
    () => COMPONENTS.map((c) => ({ ...c, _meta: resolveMeta(c) })),
    [],
  );

  const filteredComponents = useMemo(() => {
    /* Aucun filtre de catégorie ici : le découpage en routes retire le Ctrl+F
       qui était la seule navigation. La recherche doit donc traverser tout le
       design system, pas la seule catégorie affichée. */
    return componentsWithMeta.filter((c) => {
      if (!q) return true;
      const haystack = [
        c.name, c.codeName, c.cssBase ?? '', c.description, c._meta.category, c._meta.subCategory, ...c.keywords,
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [q, componentsWithMeta]);

  const filteredTokens = useMemo(() => {
    // Masqués quand une catégorie est affichée — sauf pendant une recherche, et
    // sauf dans Foundations : c'est la catégorie qui porte leur nom, et elle ne
    // les montrait pas. On y venait chercher une couleur ou un pas de texte, on
    // n'y trouvait que des primitives de mise en page.
    if (activeSlug && !isSearching && activeSlug !== categorySlug('Foundations')) return [];
    return ALL_TOKENS.filter((t) => {
      if (!q) return true;
      const haystack = [t.name, t.cssVar, t.value, t.group, t.type].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [q, activeSlug, isSearching]);

  const filteredPages = useMemo(() => {
    // Idem : la recherche doit pouvoir remonter un template de page, et la
    // catégorie « Pages & Templates » n'affiche QUE ça.
    if (activeSlug && !isSearching && activeSlug !== categorySlug('Pages & Templates')) return [];
    return PAGE_TEMPLATES.filter((p) => {
      if (!q) return true;
      const haystack = [p.name, p.description, p.family, ...p.tags].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [q, activeSlug, isSearching]);

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

  // Group by category → subCategory (2 levels)
  const componentsByCategory = useMemo(() => {
    return CATEGORY_ORDER
      .map((cat) => {
        const inCat = filteredComponents.filter((c) => c._meta.category === cat);
        if (inCat.length === 0) return null;
        const subMap = new Map<string, typeof inCat>();
        inCat.forEach((c) => {
          const sub = c._meta.subCategory;
          if (!subMap.has(sub)) subMap.set(sub, []);
          subMap.get(sub)!.push(c);
        });
        const subOrder = SUBCATEGORY_ORDER[cat] ?? [];
        const orderedSubs: Array<readonly [string, typeof inCat]> = [
          ...subOrder.filter((s) => subMap.has(s)).map((s) => [s, subMap.get(s)!] as const),
          ...Array.from(subMap.entries()).filter(([s]) => !subOrder.includes(s)),
        ];
        return [cat, orderedSubs, inCat.length] as const;
      })
      .filter((x): x is readonly [NewCategory, (readonly [string, typeof componentsWithMeta])[], number] => x !== null);
  }, [filteredComponents, componentsWithMeta]);

  /* Une catégorie = une destination. Sans slug d'URL, on retombe sur la vue
     complète (l'ancien comportement), ce qui garde `/components` fonctionnel. */
  const categoryCounts = useMemo(
    () => ({
      ...Object.fromEntries(componentsByCategory.map(([cat, , n]) => [cat, n])),
      'Pages & Templates': PAGE_TEMPLATES.length,
    }),
    [componentsByCategory],
  );
  const visibleCategories = useMemo(
    () =>
      activeSlug && !isSearching
        ? componentsByCategory.filter(([cat]) => categorySlug(cat) === activeSlug)
        : componentsByCategory,
    [componentsByCategory, activeSlug, isSearching],
  );
  const isFiltered = Boolean(activeSlug) && !isSearching;
  /* « Pages & Templates » est une catégorie de la nav, mais son contenu ne
     vient pas de COMPONENTS : il vient de PAGE_TEMPLATES. Sans ce cas, la
     route rendait une page vide. */
  const showPageTemplates =
    !isFiltered || activeSlug === categorySlug('Pages & Templates');

  /* Chaque composant a une destination : sa catégorie, plus son ancre. C'est ce
     qui rend une suggestion cliquable utile — avant, la sélection se contentait
     de remplir le champ de recherche. */
  const componentTargets = useMemo(() => {
    const m = new Map<string, string>();
    componentsWithMeta.forEach((c) => {
      m.set(c.name, `/components/${categorySlug(c._meta.category)}#${componentSlug(c.name)}`);
    });
    return m;
  }, [componentsWithMeta]);
  /* Un slug d'URL qui ne correspond à rien doit se dire, pas rendre une page
     blanche : une URL périmée dans un doc ou un Figma est un cas normal. */
  const unknownCategory = Boolean(activeSlug) && !categoryFromSlug(activeSlug!);

  // Generate search suggestions from all sources
  const searchSuggestions = useMemo<SearchSuggestion[]>(() => {
    const suggestions: SearchSuggestion[] = [];

    // Add components
    componentsWithMeta.forEach((c) => {
      suggestions.push({
        id: c.codeName,
        type: 'component',
        label: c.name,
        description: c.description,
        query: c.name,
      });
    });

    // Add categories
    CATEGORY_OPTIONS.forEach((cat) => {
      if (cat.id !== 'all') {
        suggestions.push({
          id: cat.id,
          type: 'category',
          label: cat.label,
          query: cat.label,
        });
      }
    });

    // Add tokens
    ALL_TOKENS.slice(0, 20).forEach((t) => {
      suggestions.push({
        id: t.name,
        type: 'token',
        label: t.name,
        description: `${t.value}`,
        query: t.name,
      });
    });

    // Add pages
    PAGE_TEMPLATES.forEach((p) => {
      suggestions.push({
        id: p.id,
        type: 'page',
        label: p.name,
        description: p.description,
        query: p.name,
      });
    });

    return suggestions;
  }, [componentsWithMeta]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Compute dynamic stats for the hero
  const totalSubCategories = useMemo(
    () => Object.values(SUBCATEGORY_ORDER).reduce((sum, arr) => sum + arr.length, 0),
    [],
  );
  const lastUpdated = useMemo(
    () => new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
    [],
  );

  return (
    <div className="ds-showcase">
      {/* -------------------------------- HERO (PageHero flat) ---------------- */}
      {/* Le surtitre portait Sparkles, que DESIGN.md § 10.3 réserve aux
          fonctions d'IA. La puce `<code>` était blanche sur blanc (1,00:1) :
          un reste du temps où ce hero était sur fond teal. Elle prend le
          traitement des valeurs de la vitrine, encre sur ink-50. */}
      <PageHero
        tone="flat"
        eyebrow={{ icon: <Layers size={14} />, label: `Design System · v1.0.0 · ${lastUpdated}` }}
        title="Components"
        summary={
          <>
            Source :{' '}
            <code className="font-mono text-body text-ink-900 bg-ink-50 px-1.5 py-0.5 rounded-sm border border-ink-200">
              src/components/
            </code>{' '}
            — bibliothèque vivante de {COMPONENTS.length} composants React et {ALL_TOKENS.length} tokens,
            organisés en {CATEGORY_ORDER.length} catégories et {totalSubCategories} sous-catégories.
            Cliquez sur une puce pour copier la référence.
          </>
        }
      />

      {/* -------------------------------- CONTROLS ----------------------------- */}
      <SearchWithSuggestions
        value={query}
        onChange={(value) => {
          setQuery(value);
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        }}
        suggestions={searchSuggestions}
        onSuggestionSelect={(suggestion) => {
          if (suggestion.type === 'component') {
            const to = componentTargets.get(suggestion.label);
            if (to) {
              setQuery('');
              navigate(to);
              return;
            }
          }
          if (suggestion.type === 'category' && suggestion.id !== 'all') {
            const cat = CATEGORY_ORDER.find((c) => c === suggestion.id);
            if (cat) {
              setQuery('');
              navigate(`/components/${categorySlug(cat)}`);
              return;
            }
          }
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        }}
        size="lg"
        placeholder="Rechercher un composant, un token, une catégorie…"
        className="w-full"
      />

      <ShowcaseNav counts={categoryCounts} activeSlug={activeSlug} />

      {unknownCategory && (
        <EmptyState
          title={`Catégorie « ${activeSlug} » inconnue`}
          description="Ce lien pointe vers une catégorie qui n'existe pas ou plus. Utilisez la navigation ci-dessus."
          actions={
            <Button emphasis="soft" onClick={() => navigate('/components')}>
              Voir tout le design system
            </Button>
          }
        />
      )}

      {/* -------------------------------- RESULTS ----------------------------- */}
      {filteredComponents.length === 0 && filteredTokens.length === 0 && filteredPages.length === 0 ? (
        <EmptyState
          title="Aucun résultat"
          description={`Rien ne correspond à « ${query} ». Essayez un autre terme.`}
          actions={
            <Button emphasis="soft" onClick={() => { setQuery(''); navigate('/components'); }}>
              Réinitialiser
            </Button>
          }
        />
      ) : (
        <>
          {/* ---- Components by category → subCategory ---- */}
          {visibleCategories.map(([cat, subGroups, total]) => (
            <section key={cat} className="ds-section scroll-mt-20" id={`cat-${categorySlug(cat)}`}>
              <div className="ds-section__head">
                <h2 className="ds-section__title">{cat}</h2>
                <span className="ds-section__count">{total} composant{total > 1 ? 's' : ''}</span>
              </div>

              {/* Index de la categorie. Sans lui, on retrouvait le probleme d'un
                  cran plus bas : Atoms tient 33 composants sur 20 000 px, et rien
                  ne permettait d'aller directement a une sous-categorie. */}
              {subGroups.length > 1 && (
                <nav aria-label={`Sous-categories de ${cat}`} className="flex flex-wrap gap-stack-xs">
                  {subGroups.map(([subCat, list]) => (
                    <a
                      key={subCat}
                      href={`#sub-${componentSlug(subCat)}`}
                      className="inline-flex items-center gap-tight rounded-pill border border-ink-200 bg-white px-3 py-1 text-caption font-semibold text-ink-600 transition-colors duration-fast ease-standard hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    >
                      {subCat}
                      <span className="text-ink-600 font-normal">{list.length}</span>
                    </a>
                  ))}
                </nav>
              )}

              {subGroups.map(([subCat, list]) => (
                <div key={subCat} className="flex flex-col gap-stack">
                  {/* Sub-category header (skip if "Other" or single-sub category) */}
                  {subGroups.length > 1 && (
                    <div
                      id={`sub-${componentSlug(subCat)}`}
                      className="flex items-baseline gap-stack-xs mt-stack-lg first:mt-0 pb-2 border-b border-ink-100 scroll-mt-20"
                    >
                      {/* Un titre, donc 700 et ink-900 : il était en 600 ink-700,
                          plus pâle que les noms de fiche qu'il annonce. */}
                      <h3 className="font-display text-h3 text-ink-900">{subCat}</h3>
                      <span className="text-caption text-ink-600 tabular-nums">{list.length}</span>
                    </div>
                  )}

                  <div className="ds-component-list">
                    {list.map((c) => (
                      <article
                        key={c.name}
                        id={componentSlug(c.name)}
                        className="ds-component scroll-mt-20"
                      >
                        <header className="ds-component__head">
                          <div>
                            <div className="flex items-center gap-stack-xs flex-wrap">
                              <h3 className="ds-component__name">{c.name}</h3>
                              {/* Un état, donc un Badge : la pastille était refaite
                                  à la main, avec son propre serrage. */}
                              {c.showcaseOnly && (
                                <span title="Disponible dans le Design System mais pas (encore) consommé par une page de l'app">
                                  <Badge variant="sun" size="compact">Vitrine seulement</Badge>
                                </span>
                              )}
                            </div>
                            <p className="ds-component__desc">{c.description}</p>
                            {/* Une méta : légende 13, 12 px sous la description. */}
                            {c.usedBy && c.usedBy.length > 0 && (
                              <p className="mt-stack-sm max-w-prose text-caption text-ink-600">
                                <span className="font-semibold">Utilisé par :</span>{' '}
                                {c.usedBy.join(' · ')}
                              </p>
                            )}
                          </div>
                          <div className="ds-component__chips">
                            <CopyChip text={c.codeName} label={`‹${c.codeName}›`} />
                            {c.cssBase && <CopyChip text={c.cssBase} label={c.cssBase} />}
                            {/* La catégorie EST un badge : elle passe par le composant, pas par un
     CSS maison. Avant, `.ds-component__cat` la dessinait à la main avec
     un rayon de 6 px et 25 px de haut, à côté d'un CopyChip à 10 px et
     30 px — deux rayons et deux hauteurs sur la même ligne. */}
                            <Badge variant="brand" size="compact">{c._meta.category}</Badge>
                          </div>
                        </header>
                        <div className="ds-component__preview">
                          <ComponentPreviewErrorBoundary>
                            <ComponentRenderer renderFn={c.render} />
                          </ComponentPreviewErrorBoundary>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}

          {/* ---- Pages & Templates ---- */}
          {showPageTemplates && pagesByFamily.map(([family, pages]) => (
            <section key={family} className="ds-section">
              <div className="ds-section__head">
                <h2 className="ds-section__title">Pages · {family}</h2>
                <span className="ds-section__count">{pages.length} template{pages.length > 1 ? 's' : ''}</span>
              </div>
              <div className="grid gap-stack [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]">
                {pages.map((p) => (
                  /* L'anatomie des cartes (doctrine § 5) : surtitre 13/600 → 4 →
                     titre h3 20 → texte 16 ink-700 → méta → action. Le nom était
                     en 800 (graisse du site), la famille en capitales 11 px à la
                     couleur de sa famille (2,47 à 3,72:1), les étiquettes en
                     pastilles faites main, et le bouton, fait main lui aussi,
                     posait du blanc sur un cran 600 (2,64 à 3,98:1). */
                  <div
                    key={p.id}
                    className="flex flex-col overflow-hidden rounded-xl border border-ink-200 bg-white"
                  >
                    <div
                      className="flex items-center gap-stack-sm border-b border-ink-200 px-stack-lg pt-stack-md pb-stack"
                      style={{ background: p.bg }}
                    >
                      <span aria-hidden className="text-h2 leading-none">{p.icon}</span>
                      <div className="min-w-0">
                        <p className="text-caption font-semibold text-ink-600">{p.family}</p>
                        <h3 className="mt-stack-3xs font-display text-h3 text-ink-900">{p.name}</h3>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-stack-sm px-stack-lg pt-stack pb-stack-lg">
                      <p className="max-w-prose text-body text-ink-700">{p.description}</p>
                      <MetaPillGroup items={p.tags.map((tag) => ({ text: tag }))} />
                      <Button
                        emphasis="soft"
                        size="sm"
                        fullWidth
                        className="mt-auto"
                        trailingIcon={<ArrowRight />}
                        onClick={() => navigate(p.path)}
                      >
                        Ouvrir la page
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* ---- Tokens ----
               Ils s'affichaient uniquement dans la vue « Tout ». Or c'est dans
               Foundations qu'on va les chercher : une couleur, un pas de texte
               ou un rayon sont plus fondamentaux qu'une primitive de mise en
               page, et la catégorie qui porte leur nom ne les montrait pas. */}
          {(!isFiltered || activeSlug === categorySlug('Foundations')) && filteredTokens.length > 0 && (
            <section className="ds-section">
              <div className="ds-section__head">
                <h2 className="ds-section__title">Les tokens</h2>
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

      {/* -------------------------------- BACK-TO-TOP ------------------------- */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Retour en haut de page"
          /* Cran 700 et survol qui fonce (règle du bouton solid) ; plus de
             soulèvement au survol (passe motion du 17/09) ; Lucide plutôt
             qu'un SVG écrit à la main. */
          className="fixed bottom-28 right-10 z-toast w-12 h-12 rounded-pill bg-primary-700 text-white shadow-lg flex items-center justify-center cursor-pointer transition-colors duration-base hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          <ChevronUp className="icon-md" strokeWidth={2.5} aria-hidden />
        </button>
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
    /* 48 entre deux sections (doctrine § 5) — c'était 40. */
    gap: var(--spacing-page);
  }
  .ds-hero {
    padding: var(--s-10) var(--s-8);
    border-radius: var(--r-2xl);
    background: var(--g-cool-soft, linear-gradient(180deg, #E8F4F7, #DCEBEF));
    display: flex; flex-direction: column; gap: var(--s-3);
  }
  .ds-hero__eyebrow {
    font-size: var(--text-micro); font-weight: 700; letter-spacing: .06em;
    text-transform: uppercase; color: var(--tls-primary-800); margin: 0;
  }
  .ds-hero__title {
    font-family: 'League Spartan', sans-serif;
    font-size: var(--text-section); line-height: 1.05; margin: 0;
    font-weight: 800;
    color: var(--tls-primary-900);
  }
  .ds-hero__desc { margin: 0; color: var(--tls-primary-800); font-size: var(--text-body-lg); max-width: 70ch; }
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
    font-size: var(--text-micro); text-transform: uppercase; letter-spacing: .06em;
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
    font-size: var(--text-caption);
    font-weight: 600;
    color: var(--text-muted);
    cursor: pointer;
    transition: all var(--dur-2) var(--ease-standard);
  }
  .ds-filter:hover { color: var(--text); border-color: var(--border-strong); }
  .ds-filter--active {
    background: var(--tls-primary-600); color: #fff; border-color: var(--tls-primary-600);
  }

  /* 16 entre un titre de section et son contenu (doctrine § 5) — c'était 20. */
  .ds-section { display: flex; flex-direction: column; gap: var(--s-4); }
  .ds-section__head {
    display: flex; align-items: baseline; justify-content: space-between;
    padding-bottom: var(--s-3); border-bottom: 1px solid var(--border);
  }
  /* Un titre de section est un h2 : 28/36, 700. Il était au pas du h1 (36)
     et en graisse 400 — le reset de Tailwind rend la graisse héritée, et rien
     ici ne la reposait. Deux pas de trop pour un intitulé de catégorie, sous
     le vrai h1 de la page. */
  .ds-section__title {
    font-family: var(--font-display); font-size: var(--text-h2);
    line-height: 1.2857; letter-spacing: var(--tracking-headline);
    font-weight: 700; margin: 0; color: var(--text);
  }
  .ds-section__count {
    font-size: var(--text-caption); color: var(--text-muted); font-weight: 400;
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
    /* Lisait var(--t-h3) — l'échelle jumelle périmée, à 22 px — et n'écrivait
       aucune graisse, donc héritait 400. Un titre de fiche rendu plus petit et
       plus léger que ce que le système déclare, dans la page qui EXPOSE ce
       système. Rebranché sur @theme le 2026-09-10. */
    font-family: 'League Spartan', sans-serif; font-size: var(--text-h3);
    font-weight: 700; margin: 0; color: var(--text);
  }
  /* Texte secondaire long sous un titre : 16 px ink-700, largeur de lecture,
     8 px sous le titre (doctrine § 2, 3 et 5). Il était en ink-600, la
     couleur de la méta, sur 70 caractères et à 4 px. */
  .ds-component__desc {
    margin: var(--s-2) 0 0; color: var(--color-ink-700); font-size: var(--text-body);
    max-width: var(--container-prose);
  }
  .ds-component__chips { display: flex; gap: var(--s-1-5); align-items: center; flex-wrap: wrap; }

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
    font-family: 'JetBrains Mono', monospace; font-size: var(--text-caption);
    color: var(--text); cursor: pointer;
    transition: all var(--dur-2) var(--ease-standard);
  }
  .copy-chip:hover { border-color: var(--tls-primary-300); color: var(--tls-primary-800); }
  /* 10 px hors échelle, en ink-500 (placeholders seulement) : 581 textes de
     la vitrine sous le plancher de 11 px. Il suit désormais le corps du chip. */
  .copy-chip__state { font-size: inherit; color: var(--text-muted); }
  .copy-chip code { font: inherit; background: none; padding: 0; }

  /* Token grids */
  .ds-token-group { display: flex; flex-direction: column; gap: var(--s-3); margin-top: var(--s-5); }
  .ds-token-group__title {
    font-family: var(--font-display);
    font-size: var(--text-h3); line-height: 1.3; letter-spacing: var(--tracking-snug);
    font-weight: 700; margin: 0; color: var(--text);
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
    color: var(--text); overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    min-height: 72px;
  }
  .token-card__meta { display: flex; flex-direction: column; gap: var(--s-1); }
  .token-card__name {
    margin: 0; font-size: var(--text-caption); font-weight: 600; color: var(--text);
  }
  .token-card__value {
    margin: 0; font-family: 'JetBrains Mono', monospace;
    font-size: 11px; color: var(--text-muted);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
`;

export { Components };

export default Components;
