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
  CelebrationModal,
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
  AvatarGroup,
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
  Tag,
  MetaPill,
  MetaPillGroup,
  MetaItem,
  UserInfo,
  IconFeatureCard,
  // Patterns
  ParcoursCard,
} from '../components';
import { ToastContainer } from '../components';
import { useToast } from '../hooks/useToast';
// Components not yet in main index — direct imports
import { ProfileCard } from '../components/ui/ProfileCard';
import { CourseCard } from '../components/ui/CourseCard';
// SurfaceCard deprecated → use <Card variant="default|elevated|glass|bordered|muted|sunken">
import { ResourceCard } from '../components/ui/ResourceCard';
import { CompetencyMatrix } from '../components/ui/CompetencyMatrix';
import { GoalProgress } from '../components/ui/GoalProgress';
import { QuizComponent } from '../components/ui/QuizComponent';
import { ActivityFeed } from '../components/patterns/ActivityFeed';
// (DashboardHero deprecated → use HeroSection variant="gradient" instead)
import { CardGrid } from '../components/patterns/CardGrid';
import { CoachCardGrid } from '../components/patterns/CoachCardGrid';
import { HeroSection } from '../components/patterns/HeroSection';
import { InlineProgress } from '../components/patterns/InlineProgress';
import { LearningPathGrid } from '../components/patterns/LearningPathGrid';
// (LearningPathHeader deprecated → use HeroSection variant="gradient" with size="lg" showBackButton progress)
import { MultiStepForm } from '../components/patterns/MultiStepForm';
import { PageCard } from '../components/patterns/PageCard';
import { ResumeLessonCard } from '../components/patterns/ResumeLessonCard';
import { SessionCard } from '../components/learning/SessionCard';
import { ArticleCard } from '../components/learning/ArticleCard';
import { MagazineCard } from '../components/learning/MagazineCard';
import { PromptCard } from '../components/learning/PromptCard';
import { VideoCard } from '../components/learning/VideoCard';
import { RankingCard } from '../components/learning/RankingCard';
import { TlsLogo } from '../components/ui/TlsLogo';
import { Flashcard } from '../components/patterns/Flashcard';
import { QuizQuestionCard } from '../components/patterns/QuizQuestionCard';
import { DataTable } from '../components/patterns/DataTable';
// MessageThreadCard supprimé Phase 10 — design simpliste vs Messages.tsx chat-like
import { RatingModal } from '../components/patterns/RatingModal';
import { ProjectCard } from '../components/learning/ProjectCard';
// SocialButton supprimé (Phase 10) — utiliser AuthSocialButton (depuis AuthShell)
import { FloatingNavButton } from '../components/FloatingNavButton';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { EditorialHero } from '../components/patterns/EditorialHero';
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
import { Bell, MessageSquare, BookOpen, Calendar, GraduationCap, Clock3, Flame, Trophy, Zap, Users, Lightbulb, CheckCircle2, LayoutDashboard, Map as MapIcon, PenLine, Video, Sparkles as SparklesIcon, UserRound as UserIcon, Settings2, Target, BarChart3, LogOut, Mail, Layers, Palette, FolderTree, LayoutTemplate, Star, SlidersHorizontal, ArrowLeft, ArrowRight, TrendingUp, FolderOpen, User, Bookmark, Check, CheckCheck } from 'lucide-react';
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
import { LessonNavigation } from '../components/patterns/LessonNavigation';
import { FlipCard } from '../components/patterns/FlipCard';
import { Briefcase, HeartHandshake } from 'lucide-react';

/* ============================================================================
 * TYPES
 * ============================================================================ */

// Legacy category (kept for backward compat with existing entries — overridden by REMAP below)
type Category = 'Core' | 'Patterns' | 'Learning' | 'Navigation' | 'Content' | 'Modals' | 'Feedback';

// New rules-based taxonomy (13 categories)
type NewCategory =
  | 'Foundations'        // tokens + layout primitives
  | 'Atoms'              // 1 element UI indivisible
  | 'Composites'         // group wrappers (AvatarGroup, MetaPillGroup, Tabs…)
  | 'Headers & Sections' // heroes, page headers, section headers/wrappers
  | 'Feedback'           // alert, toast, empty, celebration
  | 'Navigation'         // sidebar, breadcrumb, tabs, search
  | 'Cards'              // single-content cards
  | 'Lists & Feeds'      // collections of cards/items
  | 'Forms'              // multi-step + composite forms
  | 'Learning'           // gamification & pedagogy (TLS-specific)
  | 'Modals'             // overlay dialogs
  | 'Auth Family'        // AuthShell + sub-components
  | 'Pages & Templates'; // route-level previews

// Sub-categories (string for flexibility — no compile-time enum)
type SubCategory = string;

interface ComponentEntry {
  name: string;              // React name: Button
  codeName: string;          // File: Button.tsx
  cssBase: string;           // .btn
  category: Category;        // legacy — kept for backward compat
  description: string;
  keywords: string[];        // extra searchable terms
  /** True when the component is only referenced from the Components showcase (not consumed by any real app page). */
  showcaseOnly?: boolean;
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

const REMAP: Record<string, { category: NewCategory; subCategory: SubCategory }> = {
  // ── ATOMS ─────────────────────────────────────────────────────────────
  // Form fields
  Button:               { category: 'Atoms', subCategory: 'Form fields' },
  QuickActionButton:    { category: 'Atoms', subCategory: 'Form fields' },
  Input:                { category: 'Atoms', subCategory: 'Form fields' },
  Checkbox:             { category: 'Atoms', subCategory: 'Form fields' },
  Radio:                { category: 'Atoms', subCategory: 'Form fields' },
  Switch:               { category: 'Atoms', subCategory: 'Form fields' },
  Select:               { category: 'Atoms', subCategory: 'Form fields' },
  FormGroup:            { category: 'Atoms', subCategory: 'Form fields' },
  // FormField supprimé (Phase 10) — fusionné dans Input + FormGroup

  // Surfaces
  Card:                 { category: 'Atoms', subCategory: 'Surfaces' },

  // Identity
  Avatar:               { category: 'Atoms', subCategory: 'Identity' },
  UserInfo:             { category: 'Atoms', subCategory: 'Identity' },
  TlsLogo:              { category: 'Atoms', subCategory: 'Identity' },

  // Badges (rationalisés en une seule entrée)
  Badge:                { category: 'Atoms', subCategory: 'Status badges' },
  NotificationBadge:    { category: 'Atoms', subCategory: 'Status badges' },

  // Chips / Pills
  Pill:                 { category: 'Atoms', subCategory: 'Chips & Pills' },
  MetaPill:             { category: 'Atoms', subCategory: 'Chips & Pills' },
  MetaItem:             { category: 'Atoms', subCategory: 'Chips & Pills' },
  Tag:                  { category: 'Atoms', subCategory: 'Chips & Pills' },
  FilterChip:           { category: 'Atoms', subCategory: 'Chips & Pills' },
  // 'Filter Pills' supprimé — redondant avec FilterChip

  // Indicators
  ProgressBar:          { category: 'Atoms', subCategory: 'Indicators' },
  InlineProgress:       { category: 'Atoms', subCategory: 'Indicators' },
  // ProgressRing supprimé — mentionné dans ProgressBar description
  Skeleton:             { category: 'Atoms', subCategory: 'Indicators' },
  Spinner:              { category: 'Atoms', subCategory: 'Indicators' },

  // Decoration
  Divider:              { category: 'Atoms', subCategory: 'Decoration' },
  // BackgroundBlobs supprimé (Phase 10) — legacy remplacé par AmbientBlobs (patterns/)

  // ── COMPOSITES ────────────────────────────────────────────────────────
  AvatarGroup:          { category: 'Composites', subCategory: 'Group wrappers' },
  MetaPillGroup:        { category: 'Composites', subCategory: 'Group wrappers' },
  // Tabs et Breadcrumb classés en Navigation (cf. ci-dessous)
  Stepper:              { category: 'Composites', subCategory: 'Group wrappers' },
  // Steps supprimé — fusionné dans Stepper entry
  Pagination:           { category: 'Composites', subCategory: 'Group wrappers' },

  // ── HEADERS & SECTIONS ────────────────────────────────────────────────
  HeroSection:          { category: 'Headers & Sections', subCategory: 'Heroes' },
  EditorialHero:        { category: 'Headers & Sections', subCategory: 'Heroes' },
  // 'PageHero archetypes' supprimé — proposals non encore implémentées
  AmbientBlobs:         { category: 'Foundations', subCategory: 'Backgrounds' },
  PageHeader:           { category: 'Headers & Sections', subCategory: 'Page headers' },
  HeaderNav:            { category: 'Headers & Sections', subCategory: 'Page headers' },
  ViewerHeader:         { category: 'Headers & Sections', subCategory: 'Page headers' },
  SectionHeader:        { category: 'Headers & Sections', subCategory: 'Section headers' },
  SectionCard:          { category: 'Headers & Sections', subCategory: 'Section wrappers' },
  EditorialLayout:      { category: 'Headers & Sections', subCategory: 'Section wrappers' },
  IntroCallout:         { category: 'Headers & Sections', subCategory: 'Section wrappers' },
  EditorialQuoteCallout:{ category: 'Headers & Sections', subCategory: 'Section wrappers' },
  AuthorStrip:          { category: 'Atoms', subCategory: 'Identity' },
  ReadingProgress:      { category: 'Atoms', subCategory: 'Indicators' },
  TableOfContents:      { category: 'Navigation', subCategory: 'Secondary nav' },
  KeyFindingCard:       { category: 'Cards', subCategory: 'KPI & Stats' },
  // Phase 10 retrofit additions (8 ajouts)
  AccountFamilyNav:     { category: 'Navigation', subCategory: 'Secondary nav' },
  AppBreadcrumb:        { category: 'Navigation', subCategory: 'Secondary nav' },
  ViewerOverlay:        { category: 'Headers & Sections', subCategory: 'Section wrappers' },
  StepCard:             { category: 'Cards', subCategory: 'Learning content' },
  LessonCard:           { category: 'Cards', subCategory: 'Learning content' },

  // ── FEEDBACK ──────────────────────────────────────────────────────────
  Alert:                { category: 'Feedback', subCategory: 'Status messages' },
  'Toast + useToast':   { category: 'Feedback', subCategory: 'Status messages' },
  Toast:                { category: 'Feedback', subCategory: 'Status messages' },
  EmptyState:           { category: 'Feedback', subCategory: 'Empty/zero states' },
  Celebration:          { category: 'Feedback', subCategory: 'Celebrations' },

  // ── NAVIGATION ────────────────────────────────────────────────────────
  Sidebar:              { category: 'Navigation', subCategory: 'Primary nav (app shell)' },
  SidebarUserCard:      { category: 'Navigation', subCategory: 'Primary nav (app shell)' },
  NavItem:              { category: 'Navigation', subCategory: 'Primary nav (app shell)' },
  DropdownMenu:         { category: 'Navigation', subCategory: 'Contextual menus' },
  Breadcrumb:           { category: 'Navigation', subCategory: 'Secondary nav' },
  Tabs:                 { category: 'Navigation', subCategory: 'Secondary nav' },
  // TopNav, BottomNav, HamburgerButton supprimés (0 production usage)
  // → la sidebar gère toute la navigation primaire de l'app shell
  TabsWithContent:      { category: 'Navigation', subCategory: 'Secondary nav' },
  Search:               { category: 'Navigation', subCategory: 'Search' },
  // SearchBar supprimé (Phase 10) — Search canonical le remplace
  // SearchWithFilters supprimé (Phase 10) — pattern composable via Search + trailing filter btn + Card panel (cf. Journal/Veille)
  FloatingNavButton:    { category: 'Navigation', subCategory: 'Floating actions' },

  // ── CARDS ─────────────────────────────────────────────────────────────
  // Generic
  ActionCard:           { category: 'Cards', subCategory: 'Generic' },
  IconFeatureCard:      { category: 'Cards', subCategory: 'Generic' },
  ProfileCard:          { category: 'Cards', subCategory: 'Generic' },
  ResourceCard:         { category: 'Cards', subCategory: 'Generic' },
  CourseCard:           { category: 'Cards', subCategory: 'Generic' },
  PageCard:             { category: 'Cards', subCategory: 'Generic' },
  StatCard:             { category: 'Cards', subCategory: 'KPI & Stats' },
  // 'TLS KPI Pattern' supprimé — redondant avec StatCard

  // Communication (chat-bubble)
  PromptCard:           { category: 'Cards', subCategory: 'Communication' },
  // 'Chat Bubbles' supprimé — documenté dans PromptCard + MessagingThread
  JournalEntryCard:     { category: 'Cards', subCategory: 'Communication' },
  NotificationCard:     { category: 'Cards', subCategory: 'Communication' },
  // MessageThreadCard supprimé Phase 10

  // Learning content cards
  ParcoursCard:         { category: 'Cards', subCategory: 'Learning content' },
  ResumeLessonCard:     { category: 'Cards', subCategory: 'Learning content' },

  // Editorial content
  EditorialCard:        { category: 'Cards', subCategory: 'Editorial content' },
  // ArticleCard → renommé EditorialCard (absorbe MagazineCard + VideoCard)
  // MagazineCard supprimé — fusionné dans EditorialCard
  // VideoCard supprimé — fusionné dans EditorialCard

  // Domain
  SessionCard:          { category: 'Cards', subCategory: 'Domain (coaching/project)' },
  ProjectCard:          { category: 'Cards', subCategory: 'Domain (coaching/project)' },
  RankingCard:          { category: 'Cards', subCategory: 'Domain (coaching/project)' },

  // Activity
  ActivityItem:         { category: 'Cards', subCategory: 'Activity' },

  // ── LISTS & FEEDS ─────────────────────────────────────────────────────
  CardGrid:             { category: 'Lists & Feeds', subCategory: 'Grids' },
  ActionCardGrid:       { category: 'Lists & Feeds', subCategory: 'Grids' },
  // CoachCardGrid supprimé — grille spécialisée, pas un pattern DS générique
  // LearningPathGrid supprimé — idem
  // ResourceCardGrid supprimé — idem
  VeilleCardFeed:       { category: 'Lists & Feeds', subCategory: 'Grids' },
  VeilleCard:           { category: 'Cards', subCategory: 'Editorial content' },
  'VeilleCard — design proposals': { category: 'Cards', subCategory: 'Editorial content' },
  ActivityFeed:         { category: 'Lists & Feeds', subCategory: 'Feeds (chronological)' },
  ActivityTimeline:     { category: 'Lists & Feeds', subCategory: 'Feeds (chronological)' },
  RelatedItemList:      { category: 'Lists & Feeds', subCategory: 'Lists (vertical)' },
  DataTable:            { category: 'Lists & Feeds', subCategory: 'Tables' },

  // ── FORMS ─────────────────────────────────────────────────────────────
  MultiStepForm:        { category: 'Forms', subCategory: 'Composite forms' },
  FormLayout:           { category: 'Forms', subCategory: 'Composite forms' },
  SearchWithFilters_F:  { category: 'Forms', subCategory: 'Composite forms' }, // collision-safe alias
  FilterBar:            { category: 'Forms', subCategory: 'Composite forms' },

  // ── LEARNING (gamification & pedagogy specific to TLS) ────────────────
  Medal:                { category: 'Learning', subCategory: 'Achievements' },
  Achievement:          { category: 'Learning', subCategory: 'Achievements' },
  AchievementBadge:     { category: 'Learning', subCategory: 'Achievements' },
  CompetenceBadge:      { category: 'Learning', subCategory: 'Competence' },
  MasteryBadge:         { category: 'Learning', subCategory: 'Competence' },
  CompetencyMatrix:     { category: 'Learning', subCategory: 'Competence' },
  GoalProgress:         { category: 'Learning', subCategory: 'Goals & progress' },
  SkillBar:             { category: 'Learning', subCategory: 'Goals & progress' },
  QuizComponent:        { category: 'Learning', subCategory: 'Quiz & flashcards' },
  QuizQuestionCard:     { category: 'Learning', subCategory: 'Quiz & flashcards' },
  Flashcard:            { category: 'Learning', subCategory: 'Quiz & flashcards' },

  // ── MODALS ────────────────────────────────────────────────────────────
  Modal:                { category: 'Modals', subCategory: 'Base' },
  BookingModal:         { category: 'Modals', subCategory: 'Booking flow' },
  PositionnementModal:  { category: 'Modals', subCategory: 'Booking flow' },
  'Dialog Modals':      { category: 'Modals', subCategory: 'Confirm/Status' },
  // ConfirmModal → renommé 'Dialog Modals' (absorbe SuccessModal + CancelSessionModal)
  // SuccessModal supprimé — fusionné dans 'Dialog Modals'
  // CancelSessionModal supprimé — fusionné dans 'Dialog Modals'
  SessionFeedbackModal: { category: 'Modals', subCategory: 'Confirm/Status' },
  CelebrationModal:     { category: 'Modals', subCategory: 'Celebrations' },
  // StreakCelebrationModal supprimé — mentionné dans CelebrationModal description
  VideoPlayerModal:     { category: 'Modals', subCategory: 'Media' },
  RatingModal:          { category: 'Modals', subCategory: 'Confirm/Status' },

  // ── AUTH FAMILY ───────────────────────────────────────────────────────
  AuthShell:            { category: 'Auth Family', subCategory: 'Shell & layout' },

  // ── MVP — GDPR / IA / Compétences ─────────────────────────────────────
  ConsentBanner:        { category: 'Feedback', subCategory: 'GDPR & Compliance' },
  CompetencyRadar:      { category: 'Learning', subCategory: 'Compétences' },
  AITransparencyLabel:  { category: 'Atoms', subCategory: 'Indicators' },
  AIOverrideButton:     { category: 'Atoms', subCategory: 'Form fields' },
  AtrophieIndicator:    { category: 'Learning', subCategory: 'Compétences' },

  // ── PHASE 12 — Heatmap / Corrections / Tutorial ──────────────────────
  HeatmapGrid:          { category: 'Learning', subCategory: 'Compétences' },
  CorrectionCard:       { category: 'Cards', subCategory: 'Learning content' },
  StepTutorial:         { category: 'Modals', subCategory: 'Onboarding' },

  // ── PHASE 14.1 — Première expérience flow ─────────────────────────────
  OptionGrid:             { category: 'Forms',          subCategory: 'Composite forms' },
  DreyfusLevelSelector:   { category: 'Learning',       subCategory: 'Compétences' },
  CongratulationsCard:    { category: 'Feedback',       subCategory: 'Celebrations' },
  NextStepsGrid:          { category: 'Lists & Feeds',  subCategory: 'Grids' },
  EmptyDashboardState:    { category: 'Feedback',       subCategory: 'Empty/zero states' },

  // ── PHASE 14.2a — Apprenant core (viewer shell) ──────────────────────
  ProgressDots:           { category: 'Atoms',         subCategory: 'Indicators' },
  LessonNavigation:       { category: 'Composites',    subCategory: 'Group wrappers' },
  FlipCard:               { category: 'Learning',      subCategory: 'Quiz & flashcards' },

  // ── HEADERS & SECTIONS — extras ───────────────────────────────────────
  'Card subcomponents': { category: 'Atoms', subCategory: 'Surfaces' },
};

/** Display order for new categories (left-to-right in filter tabs, top-to-bottom in render). */
const CATEGORY_ORDER: NewCategory[] = [
  'Foundations',
  'Atoms',
  'Composites',
  'Headers & Sections',
  'Feedback',
  'Navigation',
  'Cards',
  'Lists & Feeds',
  'Forms',
  'Learning',
  'Modals',
  'Auth Family',
  'Pages & Templates',
];

/** Display order for sub-categories within each category. */
const SUBCATEGORY_ORDER: Record<NewCategory, string[]> = {
  Foundations: ['Design Tokens', 'Layout Primitives'],
  Atoms: ['Form fields', 'Surfaces', 'Identity', 'Status badges', 'Chips & Pills', 'Indicators', 'Decoration'],
  Composites: ['Group wrappers'],
  'Headers & Sections': ['Heroes', 'Page headers', 'Section headers', 'Section wrappers'],
  Feedback: ['Status messages', 'Empty/zero states', 'Celebrations'],
  Navigation: ['Primary nav (app shell)', 'Contextual menus', 'Secondary nav', 'Search'],
  Cards: ['Generic', 'KPI & Stats', 'Communication', 'Learning content', 'Editorial content', 'Domain (coaching/project)', 'Activity'],
  'Lists & Feeds': ['Grids', 'Feeds (chronological)', 'Lists (vertical)', 'Tables'],
  Forms: ['Composite forms'],
  Learning: ['Achievements', 'Competence', 'Goals & progress', 'Quiz & flashcards'],
  Modals: ['Base', 'Booking flow', 'Confirm/Status', 'Celebrations', 'Media'],
  'Auth Family': ['Shell & layout'],
  'Pages & Templates': [],
};

/** Resolve a component's new category + subCategory (fallbacks for unmapped entries). */
const resolveMeta = (entry: ComponentEntry): { category: NewCategory; subCategory: SubCategory } => {
  const mapped = REMAP[entry.name];
  if (mapped) return mapped;
  // Fallback: legacy category mapping
  const legacyToNew: Record<Category, NewCategory> = {
    Core: 'Atoms',
    Feedback: 'Feedback',
    Patterns: 'Cards',
    Learning: 'Learning',
    Content: 'Cards',
    Navigation: 'Navigation',
    Modals: 'Modals',
  };
  return { category: legacyToNew[entry.category] ?? 'Cards', subCategory: 'Other' };
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
    | 'touch';
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
    <div className="flex flex-col gap-3 items-start">
      <Button onClick={() => setOpen(true)}>🎯 Se positionner</Button>
      <p className="m-0 text-caption text-ink-500">
        S'ouvre avant de démarrer un parcours. 3 questions, 5 niveaux.
      </p>
      <PositionnementModal isOpen={open} onClose={() => setOpen(false)} courseTitle="Maîtrise des données" />
    </div>
  );
};

const BookingModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3 items-start">
      <Button onClick={() => setOpen(true)}>📅 Réserver une session</Button>
      <p className="m-0 text-caption text-ink-500">
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
    <div className="flex flex-col gap-3 items-start">
      <div className="flex gap-2 flex-wrap">
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
    <div className="flex gap-3 items-start">
      <Button onClick={() => setOpen(true)}>🎉 Afficher Success</Button>
      <SuccessModal isOpen={open} onClose={() => setOpen(false)} title="Module complété !" message="Vous avez terminé le module avec succès. Continuez sur votre lancée !" buttonText="Continuer" />
    </div>
  );
};

const StreakCelebrationModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-3 items-start">
      <Button onClick={() => setOpen(true)}>🔥 Streak !</Button>
      <StreakCelebrationModal isOpen={open} onClose={() => setOpen(false)} streakCount={14} milestone={14} encouragement="14 jours consécutifs — vous êtes en feu !" />
    </div>
  );
};

const SessionFeedbackModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-3 items-start">
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
    <div className="flex gap-3 items-start flex-wrap">
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
    <div className="flex gap-3 items-start">
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
      <div className="flex gap-2 flex-wrap mb-4">
        <Button size="sm" onClick={() => success('Enregistré avec succès !')}>Success</Button>
        <Button size="sm" variant="secondary" onClick={() => error('Une erreur est survenue')}>Erreur</Button>
        <Button size="sm" variant="secondary" onClick={() => warning('Vérifiez votre connexion')}>Warning</Button>
        <Button size="sm" variant="ghost" onClick={() => info('Mise à jour disponible')}>Info</Button>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div className="flex flex-col gap-3">
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
    <div className="flex flex-col gap-6">
      <div>
        <p className="m-0 mb-3 text-caption font-semibold text-ink-500 uppercase">Pill (défaut)</p>
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
        <p className="m-0 mb-3 text-caption font-semibold text-ink-500 uppercase">Underline</p>
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
    <div className="flex gap-2 flex-wrap">
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
    <div className="flex gap-3 items-start">
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
        <p className="m-0 text-ink-600 text-body-sm">
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
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Ouvrir CelebrationModal
      </Button>
      <CelebrationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Parcours complété !"
        description="Félicitations ! Vous avez terminé le parcours Prompt Engineering avec 92% de réussite."
        actions={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Voir mon badge</Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>Partager</Button>
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
    { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={18} /> },
    { id: 'paths',     label: 'Parcours',         icon: <MapIcon size={18} />, count: '3' },
    { id: 'journal',   label: 'Journal de bord',  icon: <PenLine size={18} /> },
    { id: 'coaching',  label: 'Coaching',         icon: <Video size={18} /> },
    { id: 'veille',    label: 'Veille',           icon: <SparklesIcon size={18} /> },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-caption text-ink-500">
        <button
          type="button"
          onClick={() => setCollapsed(p => !p)}
          className="px-3 py-1 rounded-pill bg-primary-50 text-primary-700 font-semibold border border-primary-200 hover:bg-primary-100"
        >
          {collapsed ? 'Étendre' : 'Réduire'}
        </button>
        <span>← cliquer pour basculer collapsed/expanded</span>
      </div>
      <div className="h-[480px] rounded-xl border border-ink-200 flex bg-white relative">
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
        <div className="flex-1 p-6 bg-gradient-to-br from-ink-50 to-white overflow-hidden rounded-r-xl">
          <p className="text-body-sm text-ink-500">Active : <strong className="text-ink-900">{items.find(i => i.id === active)?.label}</strong></p>
          <p className="text-caption text-ink-400 mt-1">Cliquer sur la carte utilisateur en bas → dropdown glass à droite. Mobile : drawer + hamburger (md:)</p>
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
        <div className="p-4 bg-ink-50 rounded-lg">
          {step === 1 && <p>Étape 1: Informations personnelles</p>}
          {step === 2 && <p>Étape 2: Préférences d\'apprentissage</p>}
          {step === 3 && <p>Étape 3: Vérification et confirmation</p>}
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
        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
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
          <div className="flex flex-col sm:flex-row gap-3">
            <AuthPrimaryButton type="submit">Créer mon compte</AuthPrimaryButton>
            <AuthGhostButton onClick={() => {}}>Retour</AuthGhostButton>
          </div>
          <AuthDivider>ou continuer avec</AuthDivider>
          <div className="flex flex-col gap-3">
            <AuthSocialButton icon={<AuthGoogleIcon />}>Google</AuthSocialButton>
            <AuthSocialButton icon={<AuthLinkedinIcon />}>LinkedIn</AuthSocialButton>
          </div>
          <p className="text-center text-body-sm text-white/75 m-0 mt-1">
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

const COMPONENTS: ComponentEntry[] = [
  /* ---- CORE ------------------------------------------------------------- */
  {
    name: 'Button',
    codeName: 'Button.tsx',
    cssBase: '.btn',
    category: 'Core',
    description: 'Single action trigger. Pill shape, clear hierarchy. One primary per screen. 9 variants : primary, secondary (orange), accent (yellow), ghost (light teal), destructive, **glass** (DARK bg), **glass-light** + **glass-light-ghost** (LIGHT tinted bg), link.',
    keywords: ['cta', 'action', 'primary', 'secondary', 'accent', 'ghost', 'destructive', 'link', 'glass', 'frosted'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div className="hstack">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
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
          <Button trailingIcon={I.arrow} variant="secondary">Continue</Button>
          <Button iconOnly aria-label="Add" variant="accent">{I.plus}</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>

        {/* Glass variants — context-dependent */}
        <div className="flex flex-col gap-stack mt-stack">
          <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">Glass variants — surface matters</p>

          {/* glass = pour fond DARK */}
          <div className="rounded-xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 p-4 flex flex-wrap gap-2">
            <span className="font-body text-caption font-bold text-white/80 self-center mr-2">DARK bg →</span>
            <Button variant="glass" leadingIcon={I.plus}>variant="glass"</Button>
          </div>

          {/* glass-light + glass-light-ghost = pour LIGHT tinted bg (cards EntryCard/SessionCard tinted) */}
          <div className="rounded-xl bg-primary-50/60 border border-primary-100 p-4 flex flex-wrap gap-2">
            <span className="font-body text-caption font-bold text-primary-700 self-center mr-2">LIGHT tinted bg →</span>
            <Button variant="glass-light" leadingIcon={I.plus}>glass-light (filled)</Button>
            <Button variant="glass-light-ghost" trailingIcon={I.arrow}>glass-light-ghost</Button>
          </div>

          <div className="rounded-xl bg-accent-50/60 border border-accent-100 p-4 flex flex-wrap gap-2">
            <span className="font-body text-caption font-bold text-accent-700 self-center mr-2">Sur sun-50 →</span>
            <Button variant="glass-light" leadingIcon={I.plus}>Lire</Button>
            <Button variant="glass-light-ghost" trailingIcon={I.arrow}>Continuer</Button>
          </div>

          {/* Tinted glassy buttons (tone-aware frosted) */}
          <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0 mt-stack">Tinted glassy · tone-aware frosted (sur fond blanc OU même tone)</p>
          <div className="rounded-xl bg-white border border-ink-200 p-4 flex flex-wrap gap-2">
            <span className="font-body text-caption font-bold text-ink-600 self-center mr-2">WHITE bg →</span>
            <Button variant="glass-brand" leadingIcon={I.plus}>glass-brand</Button>
            <Button variant="glass-warm" leadingIcon={I.plus}>glass-warm</Button>
            <Button variant="glass-sun" leadingIcon={I.plus}>glass-sun</Button>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'QuickActionButton',
    codeName: 'ui/QuickActionButton.tsx',
    cssBase: 'Tailwind (no BEM)',
    category: 'Core',
    usedBy: ['Coaching'],
    description: 'Action button compact card-shaped. Icon bubble tone-aware + label + subtitle optionnel + chevron right (anime au hover). 4 tones (primary/warm/sun/accent). Disabled state. À utiliser pour shortcuts / outils / quick links / tile-style CTA dans une section. Plus compact que IconFeatureCard/ActionCard, plus visuel qu\'un Button standard.',
    keywords: ['quick', 'action', 'button', 'card', 'icon', 'tone', 'chevron', 'shortcut', 'tile'],
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
          icon={<SparklesIcon size={18} />}
          label="Action disabled"
          subtitle="Désactivé par défaut"
          disabled
          onClick={() => {}}
        />
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
      <div className="flex flex-col gap-4 max-w-[520px]">
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
    description: 'Main content unit. 13 variants: default, feature, elevated, interactive, glass, glass-brand, glass-warm, glass-dark, minimal, bordered, muted, sunken, tinted. Tone-aware hover sur variant interactive.',
    keywords: ['container', 'surface', 'feature', 'elevated', 'interactive', 'glass', 'minimal', 'tinted', 'tone'],
    render: () => (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
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
              <span className="text-caption text-ink-500">il y a 3 min</span>
              <Button size="sm" variant="ghost">Voir</Button>
            </CardFooter>
          </Card>
          <Card variant="elevated">
            <CardEyebrow>ELEVATED</CardEyebrow>
            <CardTitle>Carte élevée</CardTitle>
            <CardDesc>Ombre moyenne, profondeur accentuée.</CardDesc>
          </Card>
          <Card variant="minimal">
            <CardEyebrow>MINIMAL</CardEyebrow>
            <CardTitle>Carte minimale</CardTitle>
            <CardDesc>Transparent + bordure légère, hover discret.</CardDesc>
          </Card>
        </div>
        {/* Interactive tone-aware */}
        <div className="grid grid-cols-3 gap-4">
          <Card variant="interactive" onClick={() => {}}>
            <CardEyebrow>INTERACTIVE</CardEyebrow>
            <CardTitle>Hover ↑</CardTitle>
            <CardDesc>Lift + border primary au hover.</CardDesc>
          </Card>
          <Card variant="interactive" tone="warm" onClick={() => {}}>
            <CardEyebrow>INTERACTIVE · WARM</CardEyebrow>
            <CardTitle>Hover ↑</CardTitle>
            <CardDesc>Border + shadow orange au hover.</CardDesc>
          </Card>
          <Card variant="interactive" tone="sun" onClick={() => {}}>
            <CardEyebrow>INTERACTIVE · SUN</CardEyebrow>
            <CardTitle>Hover ↑</CardTitle>
            <CardDesc>Border + shadow jaune au hover.</CardDesc>
          </Card>
        </div>
        {/* Tinted */}
        <div className="grid grid-cols-3 gap-4">
          <Card variant="tinted" tone="primary">
            <CardEyebrow>TINTED · PRIMARY</CardEyebrow>
            <CardTitle>Gradient teal</CardTitle>
            <CardDesc>from-primary-50/95 to-primary-100/60.</CardDesc>
          </Card>
          <Card variant="tinted" tone="warm">
            <CardEyebrow>TINTED · WARM</CardEyebrow>
            <CardTitle>Gradient orange</CardTitle>
            <CardDesc>from-secondary-50/95 to-secondary-100/60.</CardDesc>
          </Card>
          <Card variant="tinted" tone="sun">
            <CardEyebrow>TINTED · SUN</CardEyebrow>
            <CardTitle>Gradient jaune</CardTitle>
            <CardDesc>from-accent-50/95 to-accent-100/60.</CardDesc>
          </Card>
        </div>
        {/* Glass family */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 p-1">
            <Card variant="glass">
              <CardEyebrow>GLASS</CardEyebrow>
              <CardTitle>Frosted</CardTitle>
              <CardDesc>Sur fond coloré uniquement.</CardDesc>
            </Card>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 p-1">
            <Card variant="glass-brand">
              <CardEyebrow>GLASS BRAND</CardEyebrow>
              <CardTitle>Teal glass</CardTitle>
              <CardDesc>Overlay primaire.</CardDesc>
            </Card>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-primary-800 to-primary-900 p-1">
            <Card variant="glass-dark">
              <CardEyebrow>GLASS DARK</CardEyebrow>
              <CardTitle>Dark ocean</CardTitle>
              <CardDesc>Sur fond sombre.</CardDesc>
            </Card>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'Badge',
    codeName: 'ui/Badge.tsx',
    cssBase: 'Tailwind',
    category: 'Core',
    description: 'Famille Badge unifiée — 3 exports : Badge (semantic), StatusBadge (état leçon), TrendingBadge (social proof). Tout dans Badge.tsx ; StatusBadge.tsx et TrendingBadge.tsx sont des re-exports.',
    keywords: ['status', 'label', 'tag', 'brand', 'warm', 'sun', 'success', 'danger', 'trending', 'popular', 'new', 'locked', 'completed', 'state'],
    usedBy: ['LessonCard', 'ParcoursCard', 'VeilleCardFeed', 'Dashboard'],
    render: () => (
      <div className="flex flex-col gap-6">
        {/* Badge — sémantique */}
        <div className="flex flex-col gap-2">
          <span className="font-body text-micro font-bold uppercase tracking-widest text-ink-400">Badge — sémantique</span>
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
        <div className="flex flex-col gap-2">
          <span className="font-body text-micro font-bold uppercase tracking-widest text-ink-400">StatusBadge — état leçon</span>
          <div className="hstack flex-wrap gap-3">
            <StatusBadge status="locked" />
            <StatusBadge status="available" />
            <StatusBadge status="in-progress" />
            <StatusBadge status="completed" />
            <StatusBadge status="failed" />
          </div>
          <div className="hstack flex-wrap gap-3">
            <StatusBadge status="locked" showLabel />
            <StatusBadge status="available" showLabel />
            <StatusBadge status="in-progress" showLabel />
            <StatusBadge status="completed" showLabel />
            <StatusBadge status="failed" showLabel />
          </div>
        </div>
        {/* TrendingBadge — social proof */}
        <div className="flex flex-col gap-2">
          <span className="font-body text-micro font-bold uppercase tracking-widest text-ink-400">TrendingBadge — social proof</span>
          <div className="flex flex-wrap gap-3">
            <TrendingBadge type="trending" />
            <TrendingBadge type="popular" />
            <TrendingBadge type="recommended" />
            <TrendingBadge type="featured" />
            <TrendingBadge type="new" />
          </div>
          <div className="flex flex-wrap gap-3">
            <TrendingBadge type="trending" count={42} />
            <TrendingBadge type="popular" count={128} animated={false} />
            <TrendingBadge type="new" size="sm" />
          </div>
        </div>
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
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Avatar size="xs" name="Jeanne Dupont" />
          <Avatar size="sm" name="Paul Martin" />
          <Avatar name="Claire Bernard" />
          <Avatar size="lg" name="Ahmed Ali" />
          <Avatar size="xl" name="Sofia Garcia" />
        </div>
        <div className="flex items-center gap-3">
          <Avatar name="Brand" tint="brand" />
          <Avatar name="Warm" tint="warm" />
          <Avatar name="Sun" tint="sun" />
          <Avatar name="Ink" tint="ink" />
          <Avatar name="JD" status="online" />
          <Avatar name="PM" status="busy" />
          <Avatar name="AW" status="away" />
        </div>
        <div className="flex items-center gap-3">
          <Avatar name="Org Acme" shape="square" tint="brand" size="sm" />
          <Avatar name="Org TLS" shape="square" tint="warm" />
          <Avatar name="Org Sun" shape="square" tint="sun" size="lg" />
          <Avatar name="Léa K" tint="brand" level={12} />
          <Avatar name="Marc D" tint="warm" size="lg" level={47} />
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
      <div className="vstack max-w-[420px]">
        <div className="hstack items-center">
          <Skeleton variant="circle" width={40} height={40} />
          <div className="vstack flex-1 gap-2">
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
    cssBase: 'Tailwind (no BEM)',
    category: 'Patterns',
    usedBy: ['Recherche', 'Veille', 'Sidebar (futur Cmd+K)', 'Journal (search/filter)', 'Courses (search suggestions)'],
    description: 'Search bar with async suggestions, filtering, and multiple interaction patterns. 4 variants (default/filled/ghost/glass) × 3 sizes (sm/default/lg). Features: shortcut badge, clear button, custom leading icon, trailing slot (filter/voice), inline filter chips (filtersSlot), suggestions dropdown (isLoading + suggestions + onSuggestionSelect), custom suggestion renderer.',
    keywords: ['find', 'query', 'filter', 'search', 'input', 'glass', 'trailing', 'suggestions', 'autocomplete', 'async'],
    render: () => {
      const [searchVal, setSearchVal] = React.useState('');
      const [suggestionsOpen, setSuggestionsOpen] = React.useState(false);
      const [isLoading, setIsLoading] = React.useState(false);

      // Mock suggestions based on search input
      const mockSuggestions = searchVal.length > 0
        ? [
            { id: '1', label: 'React Fundamentals', metadata: 'Parcours · 5 modules' },
            { id: '2', label: 'React Advanced Patterns', metadata: 'Parcours · 8 modules' },
            { id: '3', label: 'Testing React Apps', metadata: 'Parcours · 4 modules' },
          ]
        : [];

      return (
        <div className="flex flex-col gap-4 max-w-xl">
          {/* Variants */}
          <Search placeholder="default — Rechercher un parcours…" shortcut="⌘K" />
          <Search variant="filled" placeholder="filled — Rechercher partout…" shortcut="⌘K" />
          <Search variant="ghost" placeholder="ghost — Rechercher…" />
          {/* Glass on colored bg */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-4 rounded-xl">
            <Search variant="glass" placeholder="glass — Rechercher sur fond coloré…" shortcut="⌘K" />
          </div>
          {/* Sizes */}
          <div className="flex flex-col gap-2">
            <Search size="sm" placeholder="sm — compact" />
            <Search size="default" placeholder="default — standard" />
            <Search size="lg" placeholder="lg — large" shortcut="⌘K" />
          </div>

          {/* ⭐ Suggestions dropdown — async search with isLoading + suggestions */}
          <div className="flex flex-col gap-2">
            <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Suggestions dropdown · async search</p>
            <p className="text-caption text-ink-600 m-0">Type "react" to see suggestions dropdown. Integrated loading state, suggestion selection, and custom rendering.</p>
            <Search
              size="default"
              variant="filled"
              placeholder='Tape "react" pour suggestions…'
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
                setSuggestionsOpen(e.target.value.length > 0);
                // Simulate async loading
                if (e.target.value.length > 0) {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 600);
                }
              }}
              isLoading={isLoading}
              suggestions={mockSuggestions}
              suggestionsOpen={suggestionsOpen}
              onSuggestionsOpenChange={setSuggestionsOpen}
              onSuggestionSelect={(suggestion) => {
                setSearchVal(suggestion.label);
                setSuggestionsOpen(false);
              }}
            />
          </div>

          {/* Trailing slot — filter button (drawer collapsible pattern) */}
          <div className="flex flex-col gap-2">
            <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Trailing slot · filter button toggle (chips dans drawer collapsible)</p>
            <Search
              size="default"
              variant="filled"
              placeholder="Search avec filter button toggle…"
              trailing={
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center w-9 h-9 rounded-md bg-white border border-ink-200 text-ink-600 hover:bg-ink-50 hover:border-ink-300 cursor-pointer"
                  aria-label="Filtres"
                >
                  <SlidersHorizontal size={16} />
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent-500 text-white text-[10px] font-bold border border-white">2</span>
                </button>
              }
            />
          </div>

          {/* ⭐ filtersSlot — chips inline visibles dans le wrapper bordé */}
          <div className="flex flex-col gap-2">
            <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">filtersSlot · chips inline visibles (alternative au drawer)</p>
            <p className="text-caption text-ink-600 m-0">Quand on veut que les filtres soient TOUJOURS visibles dans le même bordered wrapper que la search bar.</p>
            <Search
              size="default"
              variant="default"
              placeholder="Search avec filter chips visibles…"
              filtersSlot={
                <>
                  <FilterChip label="Tout" active />
                  <FilterChip label="📰 Actus" />
                  <FilterChip label="🎬 Tutoriels" />
                  <FilterChip label="📂 Dossiers" />
                  <FilterChip label="📚 Le Mag" />
                </>
              }
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
    category: 'Learning',
    usedBy: ['Dashboard (hero pre-Phase 10)', 'LearningPaths (Phase 10 KPI row)', 'Coaching', 'Journal', 'Notifications'],
    description: 'Prominent metric card. Display number + micro label + optional delta + icon. 5 variants (default / elevated / brand / warm / sun) · 3 sizes (sm/md/lg) · square mode for grid layouts.',
    keywords: ['metric', 'kpi', 'stat', 'dashboard', 'square', 'size'],
    render: () => (
      <div className="flex flex-col gap-6">
        {/* Variants with icons */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={<BookOpen size={20} />} label="Parcours complétés" value={12} sub="/24" delta="+3 ce mois" deltaDirection="up" />
          <StatCard variant="elevated" icon={<Clock3 size={20} />} label="Heures d'apprentissage" value="48" sub="h" />
          <StatCard variant="warm" icon={<Flame size={20} />} label="Série actuelle" value={7} sub="jours" delta="Record personnel" deltaDirection="up" />
          <StatCard variant="brand" icon={<Trophy size={20} />} label="Progression moyenne" value={78} sub="%" />
          <StatCard variant="sun" icon={<Zap size={20} />} label="Points XP" value="2 450" delta="+180" deltaDirection="up" />
        </div>
        {/* Sizes */}
        <div className="grid grid-cols-3 gap-4 items-start">
          <StatCard size="sm" label="Petite" value={42} sub="pts" delta="+5" deltaDirection="up" />
          <StatCard size="md" label="Moyenne" value={42} sub="pts" delta="+5" deltaDirection="up" />
          <StatCard size="lg" variant="brand" label="Grande" value={42} sub="pts" delta="+5" deltaDirection="up" />
        </div>
        {/* Square grid */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard square size="sm" label="Streak" value={7} sub="j" />
          <StatCard square variant="elevated" label="Score" value={94} sub="%" />
          <StatCard square variant="warm" label="Série" value={12} />
          <StatCard square size="lg" variant="brand" label="XP" value="1.2k" />
        </div>
      </div>
    ),
  },
  {
    name: 'ProgressBar',
    codeName: 'ProgressBar.tsx',
    cssBase: '.progress',
    category: 'Learning',
    description: 'Linear progress tracking. Sizes sm/md/lg. Fills: brand, warm, gradient. **ProgressRing** : anneau SVG circulaire (sizes 48–100px) disponible via import séparé — utilisé dans profil, badges compétences, ReadingProgressRing dans les headers éditoriaux.',
    keywords: ['progress', 'linear', 'bar', 'percentage', 'ring', 'circle', 'circular', 'svg'],
    render: () => (
      <div className="flex flex-col gap-stack">
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
      <div className="flex flex-col gap-stack">
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
      <div className="py-2 px-4 bg-white border border-ink-200 rounded-lg">
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
    category: 'Patterns',
    usedBy: ['Recherche', 'Veille', 'LearningPaths', 'Coaching'],
    description: 'Grid responsive réutilisable. Layouts: compact (2 col), default (3 col), feature (4 col), autoFit. Breakpoints automatiques mobile/tablette/desktop.',
    keywords: ['grid', 'layout', 'responsive', 'columns', 'cards'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <p className="m-0 text-micro font-bold text-ink-500 uppercase tracking-[0.06em]">layout="default" (3 col)</p>
        <CardGrid layout="default" gapSize="sm">
          {['Module A', 'Module B', 'Module C'].map((t) => (
            <div key={t} className="p-3 bg-primary-50 rounded-lg text-caption text-primary-700 font-semibold border border-primary-100">{t}</div>
          ))}
        </CardGrid>
        <p className="m-0 text-micro font-bold text-ink-500 uppercase tracking-[0.06em]">layout="feature" (4 col)</p>
        <CardGrid layout="feature" gapSize="sm">
          {['Actu', 'Tutoriel', 'Dossier', 'Mag'].map((t) => (
            <div key={t} className="p-3 bg-secondary-50 rounded-lg text-caption text-secondary-600 font-semibold border border-secondary-100">{t}</div>
          ))}
        </CardGrid>
      </div>
    ),
  },
  {
    name: 'InlineProgress',
    codeName: 'patterns/InlineProgress.tsx',
    cssBase: '.inline-progress',
    category: 'Patterns',
    usedBy: ['Positionnement', 'ParcoursCard', 'LearningPathDetail'],
    description: 'Barre de progression embarquée dans les cartes et listes. Tones: primary / warm / sun. Sizes: sm / md. Label en % optionnel.',
    keywords: ['progress', 'inline', 'bar', 'percent', 'completion'],
    render: () => (
      <div className="flex flex-col gap-3 max-w-md">
        {[
          { label: 'Prompt Engineering', value: 92, tone: 'primary' as const },
          { label: 'Leadership',         value: 67, tone: 'warm' as const },
          { label: 'IA Générative',      value: 84, tone: 'sun' as const },
        ].map(({ label, value, tone }) => (
          <div key={label} className="flex items-center gap-3">
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
    category: 'Patterns',
    usedBy: ['ParcoursCard', 'LearningPathDetail', 'Dashboard', 'Journal'],
    description: 'Collection de MetaPill avec 7 tones (default/primary/warm/sun/brand/glass/glass-dark). Layouts horizontal/vertical. 3 sizes (sm/md/lg). Variants glass = frosted effect pour overlays sur surfaces tintées ou gradients saturés.',
    keywords: ['pill', 'chip', 'tag', 'meta', 'group', 'tone', 'glass', 'frosted'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        {/* Tones — light bg */}
        <div className="flex flex-col gap-stack-xs p-4 rounded-xl bg-white border border-ink-200">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Tones</p>
          <MetaPillGroup
            items={[
              { text: 'Default' },
              { text: 'Primary', tone: 'primary' },
              { text: 'Warm', tone: 'warm' },
              { text: 'Sun', tone: 'sun' },
              { text: 'Brand', tone: 'brand' },
            ]}
            size="md"
          />
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-stack-xs p-4 rounded-xl bg-white border border-ink-200">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Sizes (tone primary)</p>
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
        <div className="flex flex-col gap-stack-xs p-4 rounded-xl bg-gradient-to-br from-primary-50 via-primary-100 to-primary-50 border border-primary-200">
          <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">Glass (frosted on light tinted bg)</p>
          <MetaPillGroup
            items={[
              { text: '6 semaines', tone: 'glass' },
              { text: '12 leçons', tone: 'glass' },
              { text: 'Marie Dubois', tone: 'glass' },
            ]}
            size="md"
          />
        </div>

        {/* Glass-dark variant — on saturated dark bg */}
        <div className="flex flex-col gap-stack-xs p-4 rounded-xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 border border-primary-700">
          <p className="text-caption font-bold uppercase tracking-wider text-white/85 m-0">Glass-dark (frosted on saturated gradient — heroes)</p>
          <MetaPillGroup
            items={[
              { text: '6 semaines', tone: 'glass-dark' },
              { text: '12 leçons', tone: 'glass-dark' },
              { text: 'débutant', tone: 'glass-dark' },
            ]}
            size="md"
          />
        </div>
      </div>
    ),
  },

  /* ---- NAVIGATION ------------------------------------------------------- */
  {
    name: 'Sidebar',
    codeName: 'layout/Sidebar.tsx',
    cssBase: 'Tailwind (no BEM)',
    category: 'Navigation',
    description: 'Primary app navigation — flat list (no group labels), active state via teal gradient pill, collapsible (icons only), responsive mobile drawer with backdrop. Bottom user card with optional dropdown trigger.',
    keywords: ['sidebar', 'nav', 'menu', 'shell', 'collapsible', 'drawer'],
    render: () => <SidebarDemo />,
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
    name: 'Dialog Modals',
    codeName: 'modals/ConfirmModal.tsx · modals/SuccessModal.tsx · modals/CancelSessionModal.tsx',
    cssBase: '—',
    category: 'Modals',
    usedBy: ['Billing', 'SubscriptionPayment'],
    description: 'Famille de dialogs de confirmation et feedback. **ConfirmModal** : 4 variantes info/success/warning/danger. **SuccessModal** : célébration check animé + ring pulsé. **CancelSessionModal** : annulation/reprogrammation session coaching avec sélection motif.',
    keywords: ['modal', 'confirm', 'dialog', 'alert', 'danger', 'warning', 'info', 'success', 'cancel', 'session'],
    render: () => (
      <div className="flex flex-col gap-section">
        <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">ConfirmModal — confirmation générique</p>
        <ConfirmModalDemo />
        <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0 mt-stack">SuccessModal — célébration check animé</p>
        <SuccessModalDemo />
        <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0 mt-stack">CancelSessionModal — annulation / reprogrammation</p>
        <CancelSessionModalDemo />
      </div>
    ),
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
      <div className="flex gap-4 items-center flex-wrap">
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
    name: 'CompetenceBadge',
    codeName: 'CompetenceBadge.tsx',
    cssBase: '.comp-badge',
    category: 'Learning',
    showcaseOnly: true,
    description: '4 niveaux de compétence avec code couleur progressif. Niveau 1 = débutant (gris), Niveau 4 = expert (primary vibrant). Utilisé dans profil compétences.',
    keywords: ['competence', 'skill', 'level', 'badge', 'proficiency'],
    render: () => (
      <div className="flex gap-3 flex-wrap">
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
    showcaseOnly: true,
    description: '5 niveaux de maîtrise (Novice → Expert) avec représentation de la taxonomie de Bloom. Progression visuelle par couleur du clair au vif.',
    keywords: ['mastery', 'skill', 'bloom', 'taxonomy', 'level', 'novice', 'expert'],
    render: () => (
      <div className="flex gap-4 flex-wrap">
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
      <div className="flex gap-4 flex-wrap">
        <Achievement icon="🏆" title="Pionnier IA" description="Premier parcours terminé" unlockedAt="15 janv. 2024" variant="unlocked" size="md" />
        <Achievement icon="⚡" title="Streak Master" description="7 jours consécutifs" progress={7} maxProgress={10} variant="in-progress" size="md" />
        <Achievement icon="🌟" title="Mentor" description="Aidez 5 collègues" variant="locked" size="md" />
      </div>
    ),
  },
  {
    name: 'Stepper',
    codeName: 'Stepper.tsx',
    cssBase: '.stepper / .stepper__step',
    category: 'Navigation',
    description: '**Stepper** : indicateur d\'étapes séquentiel horizontal/vertical — états done/current/upcoming. Utilisé dans onboarding, wizards. **Steps** : checklist séquentielle d\'étapes (done/current/upcoming) — différent du stepper car vertical avec descriptions longues.',
    keywords: ['stepper', 'steps', 'progress', 'wizard', 'onboarding', 'sequence', 'checklist', 'task', 'sequential'],
    render: () => {
      const steps = [
        { id: '1', label: 'Positionnement', state: 'done' as const },
        { id: '2', label: 'Parcours', state: 'current' as const },
        { id: '3', label: 'Coaching', state: 'upcoming' as const },
        { id: '4', label: 'Certification', state: 'upcoming' as const },
      ];
      return (
        <div className="flex flex-col gap-section">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Stepper — indicateur horizontal / vertical</p>
          <div className="flex flex-col gap-6">
            <Stepper items={steps} orientation="horizontal" />
            <Stepper items={steps} orientation="vertical" />
          </div>
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0 mt-stack">Steps — checklist séquentielle verticale</p>
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

  /* ---- FEEDBACK --------------------------------------------------------- */
  {
    name: 'Alert',
    codeName: 'Alert.tsx',
    cssBase: '.alert / .alert--*',
    category: 'Feedback',
    description: 'Message contextuel persistant ancré dans la page. 4 variantes sémantiques: info, success, warning, danger. Patterns: banner (défaut) et inline (compact).',
    keywords: ['alert', 'message', 'warning', 'error', 'success', 'info', 'danger', 'banner', 'inline'],
    render: () => (
      <div className="flex flex-col gap-stack">
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
    name: 'CelebrationModal',
    codeName: 'modals/CelebrationModal.tsx',
    cssBase: 'Tailwind + modals.css animations',
    category: 'Modals',
    showcaseOnly: true,
    description: 'Modal de célébration pour milestones (parcours complété, badge débloqué). **CelebrationModal** : confetti + badge + message court. **StreakCelebrationModal** : variante streak (particules feu, streak count, stats semaines/XP).',
    keywords: ['celebration', 'modal', 'milestone', 'achievement', 'parcours', 'badge', 'reward', 'streak', 'flame'],
    render: () => <CelebrationModalDemo />,
  },
  {
    name: 'InlineWin',
    codeName: 'ui/Celebration.tsx',
    cssBase: 'Tailwind (no BEM)',
    category: 'Feedback',
    description: 'Bandeau compact in-flow pour célébration discrète (lesson terminée, milestone intermédiaire). Différent de CelebrationModal qui est interruptif.',
    keywords: ['inline-win', 'win', 'compact', 'banner', 'achievement'],
    render: () => (
      <InlineWin
        title="Lesson terminée !"
        description="Continuez sur votre lancée — il vous reste 3 leçons dans ce module."
      />
    ),
  },

  /* ---- NAVIGATION (additional) ----------------------------------------- */
  {
    name: 'Breadcrumb',
    codeName: 'ui/Breadcrumb.tsx (canonical)',
    cssBase: '.breadcrumb / .breadcrumb__current / .breadcrumb--sticky',
    category: 'Navigation',
    description: 'Fil d\'Ariane unifié. variant="simple" (anchors + séparateur texte) ou variant="nav" (boutons + ChevronRight + pill highlight + ellipsis collapse + icônes).',
    keywords: ['breadcrumb', 'navigation', 'path', 'hierarchy', 'ariane', 'sticky', 'nav'],
    render: () => (
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-caption text-ink-500 mb-2 uppercase tracking-wider">variant="simple" (anchors)</div>
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
            className="mt-2"
          />
        </div>

        <div>
          <div className="text-caption text-ink-500 mb-2 uppercase tracking-wider">variant="nav" (boutons + icônes + ChevronRight)</div>
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
            className="mt-2"
          />
          <div className="text-micro text-ink-400 mt-1">↑ maxVisible=3 → ellipsis automatique</div>
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
          <div className="p-4 text-caption text-ink-500">sticky — blur + border-bottom</div>
        </div>
      </div>
    ),
  },
  {
    name: 'Pagination',
    codeName: 'Pagination.tsx',
    cssBase: '.pager / .pager__dots / .pager-info',
    category: 'Navigation',
    showcaseOnly: false,
    usedBy: ['Leaderboard'],
    description: 'Navigation numérotée pour longues listes. Points de troncature automatiques. Boutons prev/next. Info texte optionnel.',
    keywords: ['pagination', 'pages', 'nav', 'numbered', 'prev', 'next'],
    render: () => <PaginationDemo />,
  },
  {
    name: 'DropdownMenu',
    codeName: 'ui/DropdownMenu.tsx',
    cssBase: 'Tailwind (no BEM)',
    category: 'Navigation',
    usedBy: ['App (Sidebar user menu)'],
    description: 'Menu d\'actions / navigation contextuelle. 2 variants : solid (border + shadow) ou glass (backdrop-blur + ring + soft shadow brand). Sub-composants : DropdownLabel (section header), DropdownItem (avec icon + shortcut kbd + badge demo/pro/new/beta + danger state), DropdownSeparator. Le consommateur gère ouverture/fermeture, positionnement + outside-click + keyboard. Utilisé dans la Sidebar pour le user menu.',
    keywords: ['dropdown', 'menu', 'actions', 'navigation', 'user-menu', 'popover', 'glass', 'a11y'],
    render: () => (
      <div className="flex flex-wrap gap-section items-start">
        {/* Variant solid — actions context menu */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Solid · actions context</p>
          <DropdownMenu variant="solid" style={{ position: 'static' }}>
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
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Glass · user menu (Sidebar)</p>
          <div className="relative bg-gradient-to-br from-primary-50 to-primary-100/40 p-section rounded-2xl">
            <DropdownMenu variant="glass" style={{ position: 'static', minWidth: 260 }}>
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
    name: 'Tag',
    codeName: 'Tag.tsx',
    cssBase: '.tag / .tag--removable',
    category: 'Content',
    description: 'Étiquette de catégorie ou filtre actif. Neutre par défaut, supprimable pour les filtres actifs (bouton ×).',
    keywords: ['tag', 'label', 'category', 'filter', 'removable', 'chip'],
    render: () => (
      <div className="hstack flex-wrap">
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
      <div className="flex flex-col gap-stack">
        <div className="hstack flex-wrap">
          <MetaPill text="Default" />
          <MetaPill text="Primary" tone="primary" />
          <MetaPill text="Warm" tone="warm" />
          <MetaPill text="Sun" tone="sun" />
          <MetaPill text="Brand" tone="brand" />
        </div>
        <div className="hstack flex-wrap">
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
    showcaseOnly: true,
    description: 'Paire label/valeur pour les métadonnées structurées. Sizes: sm/md. Tones: muted (défaut)/brand/warm. Icon optionnel dans le label.',
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
    category: 'Content',
    showcaseOnly: true,
    description: 'Bloc identité utilisateur compact: avatar + nom + rôle + status dot optionnel. Tailles: sm/md/lg. Statuts: online/offline/away.',
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
    category: 'Content',
    usedBy: ['Coaching'],
    description: 'Carte profil DS pour coach/expert/user. Compose <Avatar size="xl"> + <MetaPillGroup tone> + <Button>. 3 variants (default/compact/featured) × 3 tones (primary/warm/sun) × 2 alignments (center/left). Props : avatar/initials, name, role, avatarBadge (overlay slot), rating (Stars + value + count), specialties (pills), contacts (email/phone/linkedin/twitter/website), bio, cta. Featured variant = bordure 2px tone + gradient bg.',
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
    category: 'Content',
    description: 'Tile card carré-arrondi (button-shape). Icônes Lucide stroke 1.75. Auto-layout CENTERED (padding visuel égal 4 côtés). Variants : `iconStyle` (plain/filled/bubble) × `iconSize` (xs/sm/md/lg/xl) × `tone` (brand/warm/sun) × `surface` (card/tinted/glass/frosted) × `square` boolean + mode display/button via présence de `onClick`. Description optionnelle. Title et padding scalent automatiquement avec iconSize. ⚠️ Utiliser dans `<CardGrid layout="square-tiles">` pour les cards square (≥4 items).',
    keywords: ['feature', 'icon', 'card', 'tile', 'button', 'plain', 'filled', 'bubble', 'tone', 'quick action', 'shortcut', 'glass', 'frosted', 'tinted', 'surface', 'square', 'responsive', 'centered'],
    render: () => (
      <div className="flex flex-col gap-section">

        {/* ─── Usage canonique : CardGrid square-tiles + iconSize md (default) ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">⭐ Pattern canonique · <code className="text-caption bg-ink-50 px-1.5 py-0.5 rounded">&lt;CardGrid layout="square-tiles"&gt;</code> · iconSize <strong>md</strong> (default · 32px)</p>
          <CardGrid layout="square-tiles" gapSize="md">
            <IconFeatureCard square tone="brand" iconStyle="plain" icon={<MessageSquare size={32} strokeWidth={1.75} />} title="Coaching" onClick={() => {}} />
            <IconFeatureCard square tone="warm" iconStyle="plain" icon={<MapIcon size={32} strokeWidth={1.75} />} title="Parcours" onClick={() => {}} />
            <IconFeatureCard square tone="sun" iconStyle="plain" icon={<PenLine size={32} strokeWidth={1.75} />} title="Journal" onClick={() => {}} />
            <IconFeatureCard square tone="brand" iconStyle="plain" icon={<SparklesIcon size={32} strokeWidth={1.75} />} title="Veille" onClick={() => {}} />
          </CardGrid>
        </div>

        {/* ─── Version sm (compact tiles) ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">Variante compacte · iconSize <strong>sm</strong> (24px) — pour zones denses (sidebar, hero overlays)</p>
          <CardGrid layout="square-tiles" gapSize="md">
            <IconFeatureCard square tone="brand" iconStyle="plain" iconSize="sm" icon={<MessageSquare size={24} strokeWidth={1.75} />} title="Coaching" onClick={() => {}} />
            <IconFeatureCard square tone="warm" iconStyle="plain" iconSize="sm" icon={<MapIcon size={24} strokeWidth={1.75} />} title="Parcours" onClick={() => {}} />
            <IconFeatureCard square tone="sun" iconStyle="plain" iconSize="sm" icon={<PenLine size={24} strokeWidth={1.75} />} title="Journal" onClick={() => {}} />
            <IconFeatureCard square tone="brand" iconStyle="plain" iconSize="sm" icon={<SparklesIcon size={24} strokeWidth={1.75} />} title="Veille" onClick={() => {}} />
          </CardGrid>
        </div>

        {/* ─── Avec description optionnelle ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">Avec description (feature cards landing/marketing) · md</p>
          <CardGrid layout="square-tiles" gapSize="md">
            <IconFeatureCard tone="brand" iconStyle="plain" icon={<MessageSquare size={32} strokeWidth={1.75} />} title="Coaching" description="Sessions 1:1 personnalisées" onClick={() => {}} />
            <IconFeatureCard tone="warm" iconStyle="plain" icon={<MapIcon size={32} strokeWidth={1.75} />} title="Parcours" description="Apprenez à votre rythme" onClick={() => {}} />
            <IconFeatureCard tone="sun" iconStyle="plain" icon={<PenLine size={32} strokeWidth={1.75} />} title="Journal" description="Notez vos réflexions" onClick={() => {}} />
            <IconFeatureCard tone="brand" iconStyle="plain" icon={<SparklesIcon size={32} strokeWidth={1.75} />} title="Veille" description="Actualités curées" onClick={() => {}} />
          </CardGrid>
        </div>

        {/* ─── iconStyle × tone (matrice compacte 3×3) ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">iconStyle (plain / filled / bubble) × tone (brand / warm / sun) · md</p>
          <div className="grid grid-cols-3 gap-stack">
            <IconFeatureCard square tone="brand" iconStyle="plain" icon={<MessageSquare size={32} strokeWidth={1.75} />} title="Plain · brand" onClick={() => {}} />
            <IconFeatureCard square tone="warm" iconStyle="filled" icon={<Flame size={32} />} title="Filled · warm" onClick={() => {}} />
            <IconFeatureCard square tone="sun" iconStyle="bubble" icon={<Star size={20} strokeWidth={1.75} />} title="Bubble · sun" onClick={() => {}} />
          </div>
        </div>

        {/* ─── iconSize ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">iconSize · xs 20 / sm 24 / md 32 (default) / lg 40 / xl 48 — title scale automatiquement</p>
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
          <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">surface · card / tinted / glass / frosted</p>
          {/* card + tinted sur fond clair */}
          <div className="flex flex-wrap gap-stack">
            <IconFeatureCard square surface="card" tone="brand" iconStyle="plain" iconSize="md" icon={<MessageSquare size={32} strokeWidth={1.75} />} title="card" onClick={() => {}} className="w-[140px]" />
            <IconFeatureCard square surface="tinted" tone="warm" iconStyle="bubble" iconSize="md" icon={<MapIcon size={22} strokeWidth={1.75} />} title="tinted" onClick={() => {}} className="w-[140px]" />
          </div>
          {/* glass + frosted sur fond gradient */}
          <div className="rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 p-stack">
            <div className="flex flex-wrap gap-stack">
              <IconFeatureCard square surface="glass" tone="brand" iconStyle="plain" iconSize="md" icon={<SparklesIcon size={32} strokeWidth={1.75} className="text-white" />} title="glass" onClick={() => {}} className="w-[140px] [&_h3]:text-white" />
              <IconFeatureCard square surface="frosted" tone="sun" iconStyle="plain" iconSize="md" icon={<Star size={32} strokeWidth={1.75} className="text-white" />} title="frosted" onClick={() => {}} className="w-[140px] [&_h3]:text-white" />
            </div>
          </div>
        </div>

        {/* ─── description optionnelle (sans / avec) ─── */}
        <div className="flex flex-col gap-stack">
          <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">description · optionnelle (sans = pure tile · avec = feature card)</p>
          <div className="flex flex-wrap gap-stack items-start">
            <IconFeatureCard square tone="warm" iconStyle="plain" iconSize="md" icon={<Trophy size={32} strokeWidth={1.75} />} title="Sans desc" onClick={() => {}} className="w-[140px]" />
            <IconFeatureCard tone="warm" iconStyle="plain" iconSize="md" icon={<Trophy size={32} strokeWidth={1.75} />} title="Avec desc" description="12 badges cette année" onClick={() => {}} className="w-[180px]" />
          </div>
        </div>
      </div>
    ),
  },

  /* ---- CORE CARDS (additional) ----------------------------------------- */
  {
    name: 'CourseCard',
    codeName: 'CourseCard.tsx',
    cssBase: '.course-card / .course-card--brand/warm/sun',
    category: 'Core',
    showcaseOnly: true,
    description: 'Carte de cours EDTECH avec gradient hero, badge catégorie, progression si inscrit, CTA Enroll/Continue. Tones: brand/warm/sun. Hover: shadow-md + translateY(-2px).',
    keywords: ['course', 'card', 'enroll', 'progress', 'learning', 'edtech', 'category', 'tone'],
    render: () => (
      <div className="grid-2">
        <CourseCard
          title="Prompt Engineering Avancé"
          category="Design"
          tone="warm"
          enrolled={false}
          onEnroll={() => {}}
        />
        <CourseCard
          title="React & Design Systems"
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
    cssBase: 'Tailwind (no BEM) — Card variant="tinted" tone={tone}',
    category: 'Patterns',
    usedBy: ['LearningPaths', 'Dashboard'],
    description: 'Carte de parcours pour catalogues / hubs. Surface tinted gradient (via Card variant="tinted"). 3 tones (primary teal / warm orange / sun yellow). Titre h3 sans truncate + tooltip natif. MetaPills (durée + leçons). Description line-clamp-5 + tooltip natif si plus long. InlineProgress + CTA pill tone-aware (label dynamique selon status). Padding p-8 uniform (32px), gap-stack interne (16px), grid gap-section recommandé (32px). Alignement inter-cards via min-h sur description + flex-1 spacer (progress + CTA toujours en bas). Hover: translateY(-4px) + shadow-lg + radial glow tone-aware. Focus-visible outline tone-aware. A11y: role=button, aria-label, tabIndex, native title tooltips.',
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
    category: 'Learning',
    usedBy: ['Coaching', 'Dashboard'],
    description: 'Card de session coaching (passée ou planifiée). Pattern : title + status badge + meta (coach · date) DIRECTEMENT sous le titre, description (contexte), footer actions (questionnaire / compte-rendu / note / ouvrir). Aligné sur la convention DS Phase 10 : 4 surfaces (card / tinted / glass / frosted) × 3 tones (primary / warm / sun) × interaction effects (hover lift, focus tone-aware). Footer divider tone-aware (subtle sur glass).',
    keywords: ['session', 'coaching', 'meeting', 'past', 'planned', 'surface', 'tinted', 'glass', 'frosted'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Surfaces · card (default) / tinted primary / tinted warm</p>
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

        <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0 mt-stack">Surfaces · glass / frosted (sur fond coloré pour visualiser le blur)</p>
        <div className="rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 p-stack flex flex-col gap-stack">
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
    category: 'Core',
    description: 'Carte de ressource avec icône, type, titre, description, durée, catégorie, CTA. Variantes: default, minimal, with-badge. Tones: primary/warm/sun. **Usage cible Phase 10** : ressources complémentaires de fin d\'étape sur LearningPathDetail (PDF, vidéos externes, liens utiles après les leçons).',
    keywords: ['resource', 'card', 'document', 'article', 'tutorial', 'link', 'badge', 'tone', 'complementary', 'learning-path'],
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
    category: 'Learning',
    description: 'Suivi de progression vers un objectif d\'apprentissage: nom, %, temps restant, indicateur on-track/retard. Tones: primary/warm/success/danger.',
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
    name: 'HeroSection',
    codeName: 'patterns/HeroSection.tsx',
    cssBase: 'Tailwind (no BEM)',
    category: 'Patterns',
    usedBy: ['LearningPathDetail', 'Coaching'],
    description: 'Hero canonique (absorbe DashboardHero + LearningPathHeader). 4 variants × 5 tones × 3 sizes. Props clés : showBackButton+onBack, progress+progressLabel, metadata (pills), kpis (grid KPI), actions, eyebrow. → Pour hero éditorial text-focused sans stats, utiliser EditorialHero.',
    keywords: ['hero', 'section', 'header', 'gradient', 'glass', 'media', 'minimal', 'variants', 'dashboard', 'learning path', 'kpi', 'progress'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        {/* DNA 1 : LearningPath archetype — back btn + progress + metadata pills + KPIs (gradient saturé) */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">
            Archetype « LearningPath » — gradient · lg · back btn · progress · metadata · KPIs
          </p>
          <HeroSection
            variant="gradient"
            tone="primary"
            size="lg"
            showBackButton
            onBack={() => {}}
            eyebrow="Leadership"
            title="Fondamentaux du Leadership"
            description="Apprenez les principes essentiels du leadership moderne et développez vos compétences de management."
            metadata={[
              { icon: <GraduationCap size={14} />, text: 'Marie Dubois' },
              { icon: <Clock3 size={14} />, text: '6 semaines' },
              { icon: <BookOpen size={14} />, text: '12 leçons' },
            ]}
            progress={65}
            progressLabel="8 / 12 leçons complétées"
          />
        </div>

        {/* DNA 2 : Dashboard archetype — gradient + KPIs grid + dual CTA (white primary / glass ghost) */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">
            Archetype « Dashboard » — gradient · KPIs grid · dual CTA
          </p>
          <HeroSection
            variant="gradient"
            tone="warm"
            eyebrow="Bienvenue"
            title="Bonjour Jeanne"
            description="Vous avez progressé de 12% cette semaine — continuez sur votre lancée."
            kpis={[
              { icon: <BookOpen size={20} />, value: 12, label: 'Cours complétés' },
              { icon: <Trophy size={20} />, value: '2 450', label: 'Points XP' },
              { icon: <Flame size={20} />, value: '7j', label: 'Série actuelle' },
            ]}
            actions={
              <>
                <button type="button" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-pill bg-white text-ink-900 font-semibold cursor-pointer hover:-translate-y-0.5 transition-all shadow-md">
                  Continuer mon parcours
                </button>
                <button type="button" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-pill bg-white/15 text-white border border-white/30 font-semibold cursor-pointer hover:bg-white/25 backdrop-blur-sm transition-all">
                  Explorer
                </button>
              </>
            }
          />
        </div>

        {/* DNA 3 : Glass archetype — frosted glass + texte sombre (pour pages secondaires) */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">
            Archetype « Glass » — glass · texte sombre (pages secondaires)
          </p>
          <HeroSection
            variant="glass"
            tone="primary"
            icon={GraduationCap}
            eyebrow="Mon apprentissage"
            title="Mes Parcours"
            description="Reprenez là où vous vous êtes arrêté(e) et explorez vos prochaines étapes."
            size="md"
          />
        </div>

        {/* DNA 4 : Minimal archetype — soft bg + outline (utility pages) */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">
            Archetype « Minimal » — soft bg · outline (pages utilitaires)
          </p>
          <HeroSection
            variant="minimal"
            tone="sun"
            icon={Lightbulb}
            eyebrow="Tip"
            title="Coaching 1-to-1"
            description="Sessions personnalisées avec des experts certifiés."
            size="sm"
          />
        </div>

        {/* DNA 5 : Media archetype — gradient + sparkles décoratives (celebration) */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">
            Archetype « Media » — gradient · sparkles décoratives (milestones / celebrations)
          </p>
          <HeroSection
            variant="media"
            tone="warm"
            icon={Trophy}
            eyebrow="Milestone"
            title="Parcours complété"
            description="Félicitations ! Continuez votre lancée avec le prochain parcours recommandé."
            align="center"
          />
        </div>
      </div>
    ),
  },
  {
    name: 'ActivityFeed',
    codeName: 'patterns/ActivityFeed.tsx',
    cssBase: 'Tailwind (no BEM)',
    category: 'Patterns',
    description: 'Feed d\'activités chronologique. Lucide icons par type, Avatar pour actor, 2 layouts (timeline / cards), groupByDate optionnel. Empty state + load more.',
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-caption font-bold uppercase tracking-wider text-ink-500 mb-3">Layout: timeline + groupByDate</p>
            <ActivityFeed items={items} layout="timeline" groupByDate />
          </div>
          <div>
            <p className="text-caption font-bold uppercase tracking-wider text-ink-500 mb-3">Layout: cards</p>
            <ActivityFeed items={items.slice(0, 3)} layout="cards" />
          </div>
        </div>
      );
    },
  },

  /* ---- TIER 2 EDITORIAL ATOMS (Phase 10) --------------------------------- */
  {
    name: 'AuthorStrip',
    codeName: 'patterns/AuthorStrip.tsx',
    cssBase: 'Tailwind (no BEM)',
    category: 'Patterns',
    usedBy: ['ArticleDetail (Tier 2)', 'MagazineArticle (Tier 2)', 'JournalDetail (Tier 2)', 'EditorialQuoteCallout signature'],
    description: '⭐ Inline author meta strip — avatar + nom + rôle + meta (date, readTime). 2 variants : `compact` (1 ligne) et `expanded` (2 lignes avec rôle visible et meta wrapping). Réutilisable pour toutes les pages éditoriales.',
    keywords: ['author', 'byline', 'meta', 'avatar', 'editorial', 'article', 'strip'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        <div>
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 mb-3">Compact (default)</p>
          <AuthorStrip
            name="Marie Dubois"
            role="Senior Editor TLS"
            meta={[
              { icon: <Calendar size={12} />, text: '12 mai 2026' },
              { icon: <Clock3 size={12} />,    text: '6 min de lecture' },
            ]}
          />
        </div>
        <div>
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 mb-3">Expanded</p>
          <AuthorStrip
            variant="expanded"
            name="Pierre Leclerc"
            role="Lead Pédagogie · The Learning Society"
            meta={[
              { icon: <Calendar size={12} />, text: '8 mai 2026' },
              { icon: <Clock3 size={12} />,    text: '12 min de lecture' },
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
    category: 'Patterns',
    usedBy: ['ArticleDetail (Tier 2)', 'MagazineArticle (Tier 2)', 'Dossier (Tier 2)'],
    description: '⭐ Lead paragraph card glass tone-aware avec gradient accent bar à gauche. Optionnel : eyebrow + icon Quote. 4 tons (brand/warm/sun/neutral). Utilisé en haut d\'un article long sous le hero.',
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
    category: 'Patterns',
    usedBy: ['Dossier (Tier 2)', 'MagazineArticle (Tier 2)'],
    description: '⭐ Glass card horizontale pour "points clés / insights / data findings". Icon-bubble gradient tone-aware + title + description ou metric (big value + label). Layout `horizontal` (default) ou `stacked`.',
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
    category: 'Patterns',
    usedBy: ['WeeklyNewsletter édito (Tier 2)', 'Magazine foreword (Tier 2)', 'Dossier intro thèse (Tier 2)'],
    description: '⭐ Pattern signature : grand guillemet décoratif 3rem en icon-bubble tinted + texte italique multi-paragraphes + signature optionnelle (via AuthorStrip). Pour intros éditoriales hebdo, foreword magazine, intro dossier.',
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
    category: 'Patterns',
    usedBy: ['ArticleDetail (Tier 2)', 'MagazineArticle (Tier 2)', 'Dossier (Tier 2)', 'LessonPlayer (futur)'],
    description: '⭐ 2 sub-composants pilotés par le hook `useReadingProgress(targetRef?)` : (1) `<ReadingProgressBar>` fixed top + gradient tone-aware, (2) `<ReadingProgressRing>` SVG circular 40px avec label %. Passer un ref article pour mesurer le scroll précis ou omettre pour le document entier.',
    keywords: ['reading', 'progress', 'scroll', 'indicator', 'bar', 'ring', 'circular', 'article'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        <div>
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 mb-3">ReadingProgressBar — tones (relative position pour la démo)</p>
          <div className="flex flex-col gap-3">
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
          <p className="text-micro text-ink-400 mt-2">Note : en usage normal, `fixed=true` (défaut) ancre la barre au top du viewport.</p>
        </div>
        <div>
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 mb-3">ReadingProgressRing — 4 tones</p>
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
    category: 'Patterns',
    usedBy: ['Dossier (Tier 2)', 'LessonPlayer (futur)'],
    description: '⭐ Sticky aside navigation avec scroll-spy via IntersectionObserver. Numérotation auto (01, 02…), check icon sur items `completed`, active state coloré (tone-aware), hover translate-x, smooth scroll au clic avec offset configurable.',
    keywords: ['toc', 'table-of-contents', 'sommaire', 'navigation', 'sticky', 'scroll-spy', 'sidebar'],
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
        <div>
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 mb-3">Tone warm (default)</p>
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
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 mb-3">Tone brand</p>
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
    category: 'Patterns',
    usedBy: ['LearningPaths (glass variant in hero Search)', 'Veille (filter type drawer)', 'Recherche (4 types sticky)', 'Notifications (à venir)', 'Listings n-1 (Actus/Tutoriels/Dossiers à venir)'],
    description: '⭐ Refactored Tailwind — barre de filtre horizontale avec pills clickables. Supporte multi-select / single-select, count badges, clear-all, 4 tons, 2 variantes (solid/glass), 2 surfaces (tinted/plain), 2 sizes (sm/md). Pour toolbar inline (Search filtersSlot) ou standalone entre hero et listing. Glass variant idéal pour héros gradients.',
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
              <p className="text-caption font-bold uppercase tracking-wider text-ink-500 mb-3">Single-select · brand · tinted · solid</p>
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
              <p className="text-caption font-bold uppercase tracking-wider text-ink-500 mb-3">Multi-select · warm · plain · with icons</p>
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
              <p className="text-caption font-bold uppercase tracking-wider text-ink-500 mb-3">Multi-select · sun · size sm</p>
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

            <div className="rounded-xl p-6 bg-gradient-to-r from-primary-500 to-primary-700">
              <p className="text-caption font-bold uppercase tracking-wider text-white mb-3">Glass variant · on gradient hero</p>
              <FilterBar
                tone="primary"
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
    category: 'Feedback',
    showcaseOnly: false,
    usedBy: ['Recherche'],
    description: 'Indicateur de chargement animé. Tailles : sm (20px), md (32px), lg (48px). Tones : brand (teal), warm (orange), muted (gris). Utilisé dans Recherche comme trailing slot du SearchInput pendant le debounce.',
    keywords: ['spinner', 'loading', 'loader', 'indicator', 'async', 'wait'],
    render: () => (
      <div className="vstack gap-6">
        <div className="hstack items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
        <div className="hstack items-center gap-6">
          <Spinner size="md" tone="brand" label="Chargement..." />
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
    category: 'Feedback',
    showcaseOnly: true,
    description: 'Badge numérique superposé sur un enfant (icône, avatar). Tones : danger, brand, warm. Max configurable (99 par défaut).',
    keywords: ['notification', 'badge', 'count', 'overlay', 'indicator', 'unread'],
    render: () => (
      <div className="hstack gap-8 items-center flex-wrap">
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
    category: 'Patterns',
    usedBy: ['LearningPathDetail', 'Dashboard', 'Journal'],
    description: 'En-tête de section CANONIQUE. 5 variants (default tinted bubble / solid filled bubble / minimal stroke inline / accent vertical bar / underline) × 4 sizes (xs h5 → lg h2) × 5 tones (primary/warm/sun/accent/neutral). Sub-title, action slot, divider optionnel. ⚠️ Ne pas mettre mb-* sur le wrapper — le parent contrôle le rythme vertical via gap-*.',
    keywords: ['section', 'header', 'title', 'icon', 'h2', 'h3', 'h4', 'action', 'divider', 'variants', 'sizes', 'filled', 'stroke', 'tinted', 'solid', 'minimal', 'accent', 'underline', 'canonical'],
    render: () => (
      <div className="flex flex-col gap-8">
        {/* Variants showcase (size md, tone primary) */}
        <div className="flex flex-col gap-4 p-5 rounded-xl bg-ink-50/50 border border-ink-200">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">5 variants · size md · tone primary</p>
          <SectionHeader variant="default" icon={Calendar} title="Default — tinted bubble" subtitle="bg-{tone}-50 + tone icon (legacy)" />
          <SectionHeader variant="solid" icon={Calendar} title="Solid — filled bubble" subtitle="bg-gradient {tone}-500→700 + white icon (strong CTA)" />
          <SectionHeader variant="minimal" icon={Calendar} title="Minimal — stroke inline" subtitle="No bubble, premium/airy" />
          <SectionHeader variant="accent" icon={Calendar} title="Accent — vertical bar" subtitle="Tone-colored bar before title" />
          <SectionHeader variant="underline" icon={Calendar} title="Underline — accent line" subtitle="Subtle tone underline under title" />
        </div>

        {/* Sizes showcase (variant solid, tone warm) */}
        <div className="flex flex-col gap-4 p-5 rounded-xl bg-secondary-50/30 border border-secondary-200">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">4 sizes · variant solid · tone warm</p>
          <SectionHeader size="xs" variant="solid" tone="warm" icon={Calendar} title="Size xs — h5" />
          <SectionHeader size="sm" variant="solid" tone="warm" icon={Calendar} title="Size sm — h4" />
          <SectionHeader size="md" variant="solid" tone="warm" icon={Calendar} title="Size md — h3 (default)" />
          <SectionHeader size="lg" variant="solid" tone="warm" icon={Calendar} title="Size lg — h2" />
        </div>

        {/* Tones showcase (variant default, size md) */}
        <div className="flex flex-col gap-4 p-5 rounded-xl bg-ink-50/50 border border-ink-200">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">5 tones · variant default</p>
          <SectionHeader variant="default" tone="primary" icon={Calendar} title="Tone primary (teal)" />
          <SectionHeader variant="default" tone="warm" icon={Calendar} title="Tone warm (orange)" />
          <SectionHeader variant="default" tone="sun" icon={Calendar} title="Tone sun (yellow)" />
          <SectionHeader variant="default" tone="accent" icon={Calendar} title="Tone accent" />
          <SectionHeader variant="default" tone="neutral" icon={Calendar} title="Tone neutral (ink)" />
        </div>

        {/* Real usage examples */}
        <div className="flex flex-col gap-4">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Usage examples</p>
          <SectionHeader icon={Calendar} title="Prochaine session" subtitle="Votre prochain rendez-vous de coaching" action={<button className="text-caption text-primary-600 hover:underline">Voir tout →</button>} />
          <SectionHeader icon="⚡" title="Actions rapides" subtitle="ReactNode/emoji icon supporté" />
          <SectionHeader title="Sans icône" subtitle="Section minimale" divider />
        </div>
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
      <div className="vstack gap-3 max-w-[480px]">
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
    category: 'Patterns',
    showcaseOnly: true,
    description: 'En-tête de page CANONIQUE. Eyebrow chip avec icône, titre h1 responsive (clamp), description, actions. Variants: default | tight. Align: left | center.',
    keywords: ['page', 'header', 'eyebrow', 'title', 'description', 'actions', 'h1', 'canonical'],
    render: () => (
      <div className="vstack gap-8">
        <PageHeader
          eyebrow={{ icon: <GraduationCap size={14} />, text: 'Mon parcours' }}
          title="Fondamentaux du Leadership"
          description="Apprenez les principes essentiels du leadership moderne et développez votre style unique."
          actions={<><Button variant="secondary" size="sm">Partager</Button><Button variant="primary" size="sm">Continuer</Button></>}
        />
        <PageHeader title="Tableau de bord" description="Bienvenue, retrouvez votre progression." />
        <PageHeader
          variant="tight"
          title="Réglages"
          description="Compact (variant=tight) pour les pages secondaires."
        />
      </div>
    ),
  },
  {
    name: 'ViewerHeader',
    codeName: 'patterns/ViewerHeader.tsx',
    cssBase: 'Tailwind (no BEM)',
    category: 'Patterns',
    usedBy: ['Positionnement', 'AstucesViewer', 'FlashcardsViewer', 'LessonPlayer', '(target) VideoViewer, ComplementaryContentViewer, VideoReels, JournalDetail'],
    description: 'Sticky toolbar pour pages viewer / reader plein écran. Back btn (gauche) + Title eyebrow/subtitle (centré) + counter "X/Y" + prev/next chevrons + close X (droite). Glass-light backdrop-blur, responsive (back label hidden mobile, title truncate). Phase 14.2a : tone-aware (primary/warm/sun), progress prop optionnelle (barre 0-100 sous le header), touch targets ≥ 44 px.',
    keywords: ['viewer', 'reader', 'toolbar', 'header', 'prev-next', 'navigation', 'back', 'close', 'sticky', 'glass'],
    render: () => (
      <div className="flex flex-col gap-stack-lg">
        {/* Pattern 1 — Viewer with prev/next + counter (FlashcardsViewer style) */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Viewer avec navigation séquentielle (Flashcards / Astuces)</p>
          <div className="rounded-xl overflow-hidden border border-ink-200 bg-ink-50">
            <ViewerHeader
              sticky={false}
              backLabel="Retour"
              onBack={() => {}}
              eyebrow="Module 2"
              title="Carte 3 — Boucle de feedback OKR"
              current={3}
              total={12}
              onPrev={() => {}}
              onNext={() => {}}
              onClose={() => {}}
            />
            <div className="p-8 text-center text-ink-500 text-caption">— Contenu viewer ici —</div>
          </div>
        </div>

        {/* Pattern 2 — Viewer simple title-only (VideoViewer style) */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Viewer simple back + title + close (Video / Article)</p>
          <div className="rounded-xl overflow-hidden border border-ink-200 bg-ink-50">
            <ViewerHeader
              sticky={false}
              backLabel="Retour"
              onBack={() => {}}
              eyebrow="Vidéo · 6 min"
              title="Tendance Leadership 2026 — replay de la conférence"
              subtitle="Publié le 30 avril 2026 par Sophie Martin"
              onClose={() => {}}
            />
            <div className="p-8 text-center text-ink-500 text-caption">— Contenu viewer ici —</div>
          </div>
        </div>

        {/* Pattern 3 — Disabled boundaries (first/last item) */}
        <div className="flex flex-col gap-stack-xs">
          <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Disabled state aux bornes (premier / dernier item)</p>
          <div className="rounded-xl overflow-hidden border border-ink-200 bg-ink-50">
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
            <div className="p-4 text-center text-ink-500 text-caption">— prev disabled —</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'MultiStepForm',
    codeName: 'patterns/MultiStepForm.tsx',
    cssBase: 'MultiStepForm (form progress)',
    category: 'Patterns',
    showcaseOnly: true,
    description: 'Wrapper de formulaire séquentiel: stepper visuel (numéros + labels + état done/active/upcoming), slot enfant pour le contenu de l\'étape, boutons Précédent/Suivant et validation par étape. À utiliser pour onboarding ou wizards de configuration.',
    keywords: ['form', 'multi-step', 'progress', 'navigation', 'wizard'],
    render: () => <MultiStepFormDemo />,
  },
  {
    name: 'PageCard',
    codeName: 'patterns/PageCard.tsx',
    cssBase: 'PageCard (featured card)',
    category: 'Patterns',
    description: 'Tuile composite (thumbnail ou icône, titre, description, status dot animé, badge, CTA hover) pour annuaires de pages, galeries de fonctionnalités. Grille via PageCardGrid (1-4 colonnes responsives).',
    keywords: ['card', 'page', 'featured', 'image', 'content', 'thumbnail', 'directory'],
    render: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
    category: 'Patterns',
    usedBy: ['Veille (via VeilleCardFeed)'],
    description: '⭐ Card éditoriale Veille — **3 sub-composants** exposés depuis VeilleCardFeed : (1) `<VeilleCard>` vertical avec top stripe tone-aware + badge + title + summary + footer auteur/durée + bookmark (pour grid). (2) `<VeilleCardListItem>` horizontal avec icon bubble gradient + content + actions side (pour list). (3) `<FeaturedSpotlight>` hero card horizontal (cover gradient + icon 96px + CTA glass). 3 tones (brand/warm/sun) × 3 surfaces (card/tinted/glass).',
    keywords: ['veille', 'card', 'editorial', 'article', 'tutoriel', 'dossier', 'magazine', 'vertical', 'horizontal', 'featured', 'spotlight'],
    render: () => {
      const sampleItem = { id: 'demo-1', typeLabel: 'Actu', TypeIcon: TrendingUp, tone: 'brand' as const, title: "IA générative en formation : où en sommes-nous en 2026 ?", summary: "Tour d'horizon des nouveaux usages de l'IA dans les parcours de formation, des cas concrets et des limites.", category: 'IA & Pédagogie', author: 'TLS', publishedAt: "Aujourd'hui", readTime: '6 min' };
      const tutoItem = { id: 'demo-2', typeLabel: 'Tutoriel', TypeIcon: Video, tone: 'warm' as const, isVideo: true, title: 'Construire un prompt structuré en 5 étapes', summary: 'Une vidéo pas à pas pour formaliser ses prompts et obtenir des résultats reproductibles.', category: 'Prompt Engineering', author: 'Marie Dubois', publishedAt: 'Hier', readTime: '12 min' };
      const dossierItem = { id: 'demo-3', typeLabel: 'Dossier', TypeIcon: FolderOpen, tone: 'sun' as const, title: "Transformation IA des parcours", summary: "Synthèse approfondie sur l'impact de l'IA sur les dispositifs de formation professionnelle en Europe.", category: 'Management', author: 'McKinsey', publishedAt: 'Il y a 3 jours', readTime: '22 min' };
      return (
        <div className="flex flex-col gap-section">
          {/* 1 — VeilleCard (vertical, grid mode) */}
          <div className="flex flex-col gap-stack">
            <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">1 · <code className="text-micro bg-ink-50 px-1.5 py-0.5 rounded">&lt;VeilleCard&gt;</code> — vertical (grid mode)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack-lg">
              <VeilleCard item={sampleItem} surface="card" isSaved={false} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
              <VeilleCard item={tutoItem} surface="card" isSaved={true} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
              <VeilleCard item={dossierItem} surface="card" isSaved={false} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
            </div>
          </div>

          {/* 2 — VeilleCardListItem (horizontal, list mode) */}
          <div className="flex flex-col gap-stack">
            <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">2 · <code className="text-micro bg-ink-50 px-1.5 py-0.5 rounded">&lt;VeilleCardListItem&gt;</code> — horizontal (list mode)</p>
            <div className="flex flex-col gap-stack">
              <VeilleCardListItem item={sampleItem} surface="card" isSaved={false} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
              <VeilleCardListItem item={tutoItem} surface="card" isSaved={true} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
              <VeilleCardListItem item={dossierItem} surface="card" isSaved={false} showSaveButton={true} onToggleSave={() => {}} onClick={() => {}} />
            </div>
          </div>

          {/* 3 — FeaturedSpotlight (hero horizontal) */}
          <div className="flex flex-col gap-stack">
            <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">3 · <code className="text-micro bg-ink-50 px-1.5 py-0.5 rounded">&lt;FeaturedSpotlight&gt;</code> — hero "À la une"</p>
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
    category: 'Patterns',
    description: '7 proposals de design VeilleCard : **4 verticaux** pour vue grid (A cover, C tinted, D overlay, L glass) + **3 horizontaux** pour vue list (HZ-1 split image, HZ-2 tinted row, HZ-3 compact inbox). Badge catégorie overlaid en top glassy sur les images.',
    keywords: ['veille', 'card', 'vertical', 'horizontal', 'grid', 'list', 'cover', 'tinted', 'overlay', 'glass', 'compact'],
    render: () => {
      const item = { typeLabel: 'Dossier', category: 'Management', title: "Transformation IA des parcours de formation", summary: "Synthèse approfondie sur l'impact de l'IA sur les dispositifs de formation professionnelle en Europe.", author: 'McKinsey', publishedAt: 'Il y a 3 jours', readTime: '22 min' };
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">

          {/* Design A — Cover dominant (current) */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">A · Cover dominant (current default)</p>
            <article className="flex flex-col rounded-2xl bg-white border border-ink-200 overflow-hidden">
              <div className="relative h-32 bg-gradient-to-br from-accent-300 via-accent-500 to-secondary-500">
                <div className="absolute inset-0 flex items-center justify-center"><FolderOpen size={56} strokeWidth={1.25} className="text-white/95" /></div>
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-white/95 backdrop-blur-glass-light text-micro font-bold uppercase text-ink-900 shadow-sm"><FolderOpen size={11} strokeWidth={2.5} /> {item.typeLabel}</span>
              </div>
              <div className="flex flex-col gap-stack-xs p-5">
                <span className="font-body text-micro font-semibold uppercase tracking-wider text-ink-500">{item.category} · {item.publishedAt}</span>
                <h3 className="m-0 font-display text-h4 font-bold text-ink-900 leading-tight">{item.title}</h3>
                <span className="font-body text-caption text-ink-500"><User size={12} className="inline mr-0.5" /> {item.author} · ⏱ {item.readTime}</span>
                <p className="m-0 font-body text-body-sm text-ink-600 leading-relaxed">{item.summary}</p>
                <footer className="flex justify-between items-center pt-stack-xs border-t border-ink-100"><span className="text-caption font-bold text-accent-700">Lire →</span></footer>
              </div>
            </article>
          </div>

          {/* Design C — Tinted full bg */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">C · Tinted full bg · couleur tone-aware en arrière-plan complet</p>
            <article className="flex flex-col rounded-2xl bg-accent-50/70 border border-accent-100 p-5 gap-stack-xs hover:bg-accent-50">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-white/90 text-accent-700 border border-accent-200 text-micro font-bold uppercase tracking-wider"><FolderOpen size={11} strokeWidth={2.5} /> {item.typeLabel}</span>
                <button className="w-8 h-8 rounded-pill bg-white/70 text-ink-500 hover:text-ink-900 flex items-center justify-center"><Bookmark size={14} /></button>
              </div>
              <span className="font-body text-micro font-semibold uppercase tracking-wider text-accent-700">{item.category} · {item.publishedAt}</span>
              <h3 className="m-0 font-display text-h4 font-bold text-ink-900 leading-tight">{item.title}</h3>
              <span className="font-body text-caption text-ink-500"><User size={12} className="inline mr-0.5" /> {item.author} · ⏱ {item.readTime}</span>
              <p className="m-0 font-body text-body-sm text-ink-700 leading-relaxed">{item.summary}</p>
              <footer className="flex justify-between items-center pt-stack-xs border-t border-white/60"><span className="text-caption font-bold text-accent-700">Lire →</span></footer>
            </article>
          </div>

          {/* Design D — Magazine portrait avec title overlay */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">D · Magazine portrait · cover large + title en overlay bottom</p>
            <article className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent-300 via-accent-500 to-secondary-600 h-[280px]">
              <div className="absolute inset-0 flex items-center justify-center opacity-90"><FolderOpen size={84} strokeWidth={1} className="text-white" /></div>
              {/* Gradient overlay bottom for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-white/95 backdrop-blur-glass-light text-micro font-bold uppercase text-ink-900 shadow-sm"><FolderOpen size={11} strokeWidth={2.5} /> {item.typeLabel}</span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col gap-tight">
                <span className="font-body text-micro font-semibold uppercase tracking-wider text-white/80">{item.category} · {item.publishedAt}</span>
                <h3 className="m-0 font-display text-h4 font-bold leading-tight text-white">{item.title}</h3>
                <div className="flex justify-between items-center text-caption text-white/90 mt-tight">
                  <span><User size={12} className="inline" /> {item.author} · ⏱ {item.readTime}</span>
                  <span className="font-bold">Lire →</span>
                </div>
              </div>
            </article>
          </div>

          {/* L — Glass overlay full photo (Apple News style) */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">L · Glass overlay · photo plein cover + panel glass content au bottom (Apple News style)</p>
            <article className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-400 via-accent-500 to-secondary-600 h-[300px] cursor-pointer group">
              <div className="absolute inset-0 flex items-center justify-center opacity-90">
                <FolderOpen size={96} strokeWidth={0.9} className="text-white/85" />
              </div>
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-white/25 backdrop-blur-glass-medium text-white text-micro font-bold uppercase border border-white/30">
                <FolderOpen size={11} strokeWidth={2.5} /> {item.typeLabel}
              </span>
              <button className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-pill bg-white/25 text-white backdrop-blur-glass-medium border border-white/30 hover:bg-white/40">
                <Bookmark size={15} />
              </button>
              <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/85 backdrop-blur-glass-heavy border border-white/60 p-4 flex flex-col gap-1 shadow-lg">
                <span className="font-body text-micro font-bold uppercase tracking-wider text-primary-700">{item.category} · {item.publishedAt}</span>
                <h3 className="m-0 font-display text-body-lg font-bold text-ink-900 leading-tight">{item.title}</h3>
                <div className="flex items-center gap-2 mt-1 font-body text-micro text-ink-600">
                  <User size={11} className="inline shrink-0" /><span>{item.author}</span>
                  <span aria-hidden>·</span>
                  <span>⏱ {item.readTime}</span>
                </div>
              </div>
            </article>
          </div>

          {/* ── SECTION HORIZONTALES (LIST) ─── */}
          <div className="border-t border-ink-100 pt-section">
            <p className="text-body-sm font-bold text-ink-700 mb-section-lg">Designs horizontaux · vue liste</p>
          </div>

          {(() => {
            const hzItems = [
              { typeLabel: 'Actu', Icon: TrendingUp, gradFrom: 'from-primary-400', gradTo: 'to-primary-700', toneText: 'text-primary-700', toneBg: 'bg-primary-50', toneBorder: 'border-primary-200', category: 'IA & Pédagogie', title: "IA générative en formation : où en sommes-nous en 2026 ?", summary: "Tour d'horizon des nouveaux usages de l'IA.", author: 'The Learning Society', publishedAt: "Aujourd'hui", readTime: '6 min' },
              { typeLabel: 'Tutoriel', Icon: Video, gradFrom: 'from-secondary-400', gradTo: 'to-secondary-700', toneText: 'text-secondary-600', toneBg: 'bg-secondary-50', toneBorder: 'border-secondary-200', category: 'Prompt Engineering', title: 'Construire un prompt structuré en 5 étapes', summary: 'Une vidéo pas à pas pour formaliser ses prompts.', author: 'Marie Dubois', publishedAt: 'Hier', readTime: '12 min' },
              { typeLabel: 'Dossier', Icon: FolderOpen, gradFrom: 'from-accent-300', gradTo: 'to-accent-600', toneText: 'text-accent-700', toneBg: 'bg-accent-50', toneBorder: 'border-accent-200', category: 'Management', title: "Transformation IA des parcours de formation", summary: "Synthèse approfondie sur les dispositifs de formation en Europe.", author: 'McKinsey', publishedAt: 'Il y a 3 jours', readTime: '22 min' },
            ];
            return (
        <div className="flex flex-col gap-section">

          {/* HZ-1 — Badge sur l'image, meta sous le titre */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">HZ-1 · Badge catégorie sur l'image · meta sous le titre</p>
            <div className="flex flex-col gap-stack-xs max-w-3xl">
              {hzItems.map((it, idx) => (
                <article key={idx} className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] rounded-2xl bg-white border border-ink-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
                  {/* Image avec badge en overlay bottom */}
                  <div className={`relative bg-gradient-to-br ${it.gradFrom} via-current ${it.gradTo} flex items-center justify-center min-h-[108px] overflow-hidden`}>
                    <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 60%)' }} aria-hidden />
                    <it.Icon size={38} strokeWidth={1.25} className="text-white/90 group-hover:scale-110 transition-transform duration-base" />
                    {/* Badge catégorie — sur l'image en haut, glassy */}
                    <span className="absolute top-2 left-0 right-0 flex justify-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-white/25 backdrop-blur-glass-medium border border-white/40 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                        <it.Icon size={9} strokeWidth={2.5} /> {it.typeLabel}
                      </span>
                    </span>
                  </div>
                  {/* Content : titre → meta → summary */}
                  <div className="flex flex-col justify-center gap-tight p-4">
                    <h3 className="m-0 font-display text-body-sm font-bold text-ink-900 leading-tight line-clamp-2">{it.title}</h3>
                    <div className="flex items-center gap-1.5 font-body text-micro text-ink-400 flex-wrap">
                      <User size={10} className="shrink-0" />
                      <span>{it.author}</span>
                      <span aria-hidden>·</span>
                      <span>{it.category}</span>
                      <span aria-hidden>·</span>
                      <span>{it.publishedAt}</span>
                      <span aria-hidden>·</span>
                      <span>⏱ {it.readTime}</span>
                    </div>
                    <p className="m-0 font-body text-caption text-ink-500 line-clamp-1 hidden sm:block">{it.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* HZ-2 — Tinted row avec badge sur zone icône */}
          <div className="flex flex-col gap-stack-xs">
            <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">HZ-2 · Tinted row · icône + badge catégorie · meta sous titre</p>
            <div className="flex flex-col gap-2 max-w-3xl">
              {hzItems.map((it, idx) => (
                <article key={idx} className={`flex items-center gap-0 rounded-xl ${it.toneBg} border ${it.toneBorder} hover:brightness-95 cursor-pointer transition-all overflow-hidden`}>
                  {/* Zone icône avec badge en dessous */}
                  <div className={`relative flex flex-col items-center justify-center gap-1 w-16 sm:w-20 self-stretch ${it.toneBg} border-r ${it.toneBorder} shrink-0 py-3`}>
                    <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/80 ${it.toneText} shadow-xs`}>
                      <it.Icon size={17} strokeWidth={1.75} />
                    </div>
                    <span className={`font-body text-[9px] font-black uppercase tracking-wider ${it.toneText} opacity-70`}>{it.typeLabel}</span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col gap-tight px-4 py-3">
                    <h3 className="m-0 font-display text-body-sm font-bold text-ink-900 leading-tight line-clamp-1">{it.title}</h3>
                    <div className="flex items-center gap-1.5 font-body text-micro text-ink-500 flex-wrap">
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
            <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">HZ-3 · Compact inbox · badge icône + titre + meta 1 ligne · bookmark</p>
            <div className="flex flex-col rounded-2xl bg-white border border-ink-200 overflow-hidden divide-y divide-ink-100 max-w-3xl">
              {hzItems.map((it, idx) => (
                <article key={idx} className="flex items-center gap-3 px-4 py-3 hover:bg-ink-50 cursor-pointer transition-colors group">
                  {/* Icône + label badge empilés */}
                  <div className={`flex flex-col items-center gap-0.5 shrink-0`}>
                    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${it.toneBg} ${it.toneText}`}>
                      <it.Icon size={16} strokeWidth={2} />
                    </span>
                    <span className={`font-body text-[8px] font-black uppercase tracking-wider ${it.toneText}`}>{it.typeLabel}</span>
                  </div>
                  {/* Title + meta */}
                  <div className="flex-1 min-w-0 flex flex-col gap-tight">
                    <h4 className="m-0 font-display text-body-sm font-bold text-ink-900 truncate group-hover:text-primary-700 transition-colors">{it.title}</h4>
                    <p className="m-0 font-body text-micro text-ink-400 truncate">
                      <User size={9} className="inline mr-0.5" />{it.author} · {it.publishedAt} · ⏱ {it.readTime}
                    </p>
                  </div>
                  <button className="text-ink-300 hover:text-primary-600 shrink-0 transition-colors"><Bookmark size={14} /></button>
                  <ArrowRight size={13} className="text-ink-300 group-hover:text-ink-600 shrink-0 group-hover:translate-x-0.5 transition-all" />
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
    category: 'Patterns',
    usedBy: ['Veille'],
    description: 'Feed éditorial de cartes Veille — pattern v2 Phase 10. **Featured spotlight** (1 item flag `featured: true` → hero horizontal en haut) + **2 layouts** : `grid` (cards verticales 1/2/3 cols, DEFAULT) ou `list` (cards horizontales denses). 3 surfaces (card/tinted/glass), 3 tones par item (brand/warm/sun). Save button bookmark configurable. Loading + empty states.',
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
            <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">Layout <code className="text-micro bg-ink-50 px-1.5 py-0.5 rounded">list</code> (DEFAULT) · cards horizontales denses</p>
            <VeilleCardFeed items={sampleItems.slice(1)} layout="list" savedIds={new Set(['3'])} onItemClick={() => {}} onToggleSave={() => {}} />
          </div>

          <div className="flex flex-col gap-stack">
            <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0">Layout <code className="text-micro bg-ink-50 px-1.5 py-0.5 rounded">grid</code> · cards verticales (à définir)</p>
            <VeilleCardFeed items={sampleItems} savedIds={new Set(['3'])} onItemClick={() => {}} onToggleSave={() => {}} />
          </div>
        </div>
      );
    },
  },
  {
    name: 'EditorialCard',
    codeName: 'learning/ArticleCard.tsx · learning/MagazineCard.tsx · learning/VideoCard.tsx',
    cssBase: 'Tailwind (no BEM)',
    category: 'Learning',
    description: 'Card éditoriale multi-format. **ArticleCard** : actu / tutoriel / dossier — icon bubble tone-aware + eyebrow + title + summary + footer. **MagazineCard** : numéros Magazine TLS — gradient cover + n° filigrane + CTA. **VideoCard** : vidéo thumbnail tone-aware + play overlay + duration badge. 3–4 tones (primary/warm/sun/brand). Wrapper sur `<Card variant="feature">`.',
    keywords: ['article', 'editorial', 'actu', 'tutoriel', 'dossier', 'magazine', 'bookmark', 'tone', 'video', 'thumbnail', 'play'],
    render: () => (
      <div className="flex flex-col gap-section">
        <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">ArticleCard — actu / tutoriel / dossier</p>
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
        <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0 mt-stack">MagazineCard — numéros magazine</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack max-w-5xl">
          <MagazineCard
            title="Tendances EdTech 2026"
            issueNumber={14}
            articleCount={12}
            publishedAt="Mai 2026"
            tone="primary"
            onClick={() => {}}
            onSave={() => {}}
          />
          <MagazineCard
            title="L'IA au cœur de la formation"
            description="56 pages de recherches et analyses."
            issueNumber={13}
            articleCount={8}
            publishedAt="Avril 2026"
            tone="warm"
            isSaved={true}
            onClick={() => {}}
            onSave={() => {}}
          />
          <MagazineCard
            title="Leadership & Soft Skills"
            issueNumber={12}
            articleCount={10}
            publishedAt="Mars 2026"
            tone="sun"
            onClick={() => {}}
            onSave={() => {}}
          />
          <MagazineCard
            title="Futur du travail"
            issueNumber={11}
            articleCount={9}
            publishedAt="Fév. 2026"
            tone="brand"
            onClick={() => {}}
            onSave={() => {}}
          />
        </div>
        <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0 mt-stack">VideoCard — vidéos standalone</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-lg max-w-3xl">
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
    category: 'Learning',
    description: "Bandeau full-bleed newsletter — fond primary-900, headline display + formulaire email inline + lien dernière édition optionnel. Pattern propre à la Veille. Pas de card shell ni de border accent.",
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
    category: 'Learning',
    usedBy: ['Dashboard'],
    description: '⭐ Card chat-bubble (Apple Messages style) pour les prompts d\'invitation à l\'action sur le Dashboard. Icon + label eyebrow + text body + speech bubble tail + hover tinted bg. 7 variants BadgeVariant (brand/warm/sun/info/neutral/success/danger). 2 sizes : `default` (compact grid) ou `featured` (hero dashboard). ⚠️ **Similaire à `JournalEntryCard`** — chat-bubble sibling (l\'un pour CTA prompts, l\'autre pour entries journal). Garder séparés (use cases distincts).',
    keywords: ['prompt', 'chat-bubble', 'speech', 'invitation', 'cta', 'dashboard'],
    render: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack max-w-3xl">
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
    name: 'RankingCard',
    codeName: 'learning/RankingCard.tsx',
    cssBase: 'Tailwind',
    category: 'Learning',
    usedBy: ['Leaderboard'],
    description: '⭐ Card de classement (podium / leaderboard) — rank number en bubble gradient (or/argent/bronze pour top 3) + nom + points + streak flame badge optionnel. ⚠️ **Pas de similar existing** dans le DS — composant spécifique gamification leaderboard. Could be merged with ProfileCard avec variant="rank" futur, mais APIs très différentes.',
    keywords: ['ranking', 'leaderboard', 'podium', 'rank', 'gamification', 'streak'],
    render: () => (
      <div className="flex flex-col gap-stack max-w-md">
        <RankingCard rank={1} name="Sophie Martin" points={2840} streak={12} variant="sun" onViewProfile={() => {}} />
        <RankingCard rank={2} name="Marc Dubois" points={2650} streak={8} onViewProfile={() => {}} />
        <RankingCard rank={3} name="Léa Petit" points={2410} streak={5} onViewProfile={() => {}} />
        <RankingCard rank={42} name="Chloé Mimault" points={1280} streak={7} variant="brand" onViewProfile={() => {}} />
      </div>
    ),
  },
  {
    name: 'TlsLogo',
    codeName: 'ui/TlsLogo.tsx',
    cssBase: 'Tailwind (SVG inline)',
    category: 'Core',
    usedBy: ['Sidebar', 'AuthShell'],
    description: '⭐ Logo officiel The Learning Society — SVG inline avec wordmark + mark. Atom critique réutilisé app-wide (sidebar header + auth pages). ⚠️ **Pas de similar** — composant unique.',
    keywords: ['logo', 'brand', 'mark', 'wordmark', 'tls'],
    render: () => (
      <div className="flex flex-col gap-stack p-stack rounded-xl bg-white border border-ink-200 max-w-md">
        <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0">Sur fond blanc</p>
        <TlsLogo />
        <p className="text-caption font-bold uppercase tracking-wider text-ink-500 m-0 mt-stack">Sur fond brand (gradient)</p>
        <div className="p-stack rounded-lg bg-gradient-brand-deep">
          <TlsLogo />
        </div>
      </div>
    ),
  },
  /* ─── BATCH #2 — composants SANS similarité (Phase 10 audit) ────────────── */
  {
    name: 'Flashcard',
    codeName: 'patterns/Flashcard.tsx',
    cssBase: 'Tailwind (3D transform)',
    category: 'Patterns',
    usedBy: ['FlashcardsViewer'],
    description: '⭐ Card flip 3D (front/back) pour apprentissage actif — révision flashcards. Click → animation 3D flip horizontale. ⚠️ Pas de similar dans le DS.',
    keywords: ['flashcard', 'flip', '3d', 'revision', 'learning', 'memorization'],
    render: () => (
      <div className="max-w-md">
        <Flashcard
          front={<div className="flex items-center justify-center h-full p-6"><p className="text-h3 font-bold text-ink-900 text-center m-0">Qu&apos;est-ce que le leadership transformationnel ?</p></div>}
          back={<div className="flex items-center justify-center h-full p-6"><p className="text-body text-ink-700 text-center m-0 leading-relaxed">Style de leadership qui inspire et motive les collaborateurs à dépasser leurs intérêts personnels pour le bien collectif.</p></div>}
        />
      </div>
    ),
  },
  {
    name: 'QuizQuestionCard',
    codeName: 'patterns/QuizQuestionCard.tsx',
    cssBase: 'Tailwind',
    category: 'Patterns',
    usedBy: ['Positionnement'],
    description: '⭐ Card question quiz avec options multiples (A/B/C/D), feedback correct/incorrect, numérotation N/M. State management : selectedId + answered + showCorrectAnswer. ⚠️ Pas de similar — composant spécifique quiz/évaluation.',
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
    category: 'Patterns',
    description: '⭐ Tableau de données générique — colonnes sortables, alignements, rows custom. Pour vues admin / analytics / liste structurée. ⚠️ Pas de similar — composant unique pour tabular data.',
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
    cssBase: 'Tailwind',
    category: 'Modals',
    description: '⭐ Pattern de rating étoiles (1-5) avec feedback textuel. Pour évaluation session / leçon / contenu. ⚠️ Pas de similar — pattern unique. Note : pas vraiment un modal (pas de isOpen overlay), c\'est un form rating inline à wrapper dans un Modal DS si besoin.',
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
    category: 'Learning',
    usedBy: ['Project (page existante)'],
    description: '⭐ Card projet collaboratif — title + description + status pill (planning/in-progress/completed) + progress bar + tasks completed/total + deadline + team avatars stack. ⚠️ Pas de similar — composant unique pour projets collaboratifs.',
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
    category: 'Navigation',
    description: '⭐ Speed-dial FAB flottant fixed bottom-right/left. Configurable : `actions[]` (label/icon/onClick/tone) + `tone` (FAB) + `position` + `icon`/`closeIcon`. Migré Tailwind + DS (Phase 10). **Retiré de App.tsx prod** — réactivable pour futur chatbot, quick contact, help shortcut. Click main FAB → expand actions vertical stack avec animation filterIn. ⚠️ Pas de similar — composant unique floating speed-dial.',
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
              { label: 'Ask AI', icon: <SparklesIcon size={18} />, onClick: () => alert('AI chat'), tone: 'primary' },
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
    category: 'Patterns',
    usedBy: ['Coaching'],
    description: 'Fond ambient TLS avec 3 blobs flottants (primary teal / warm orange / sun yellow). Pattern décoratif full-page : 3 cercles très flous (blur 80px) qui dérivent lentement (animation float 20s, staggered delays). Position fixed (default) ou absolute, pointer-events-none. 3 intensities : subtle (0.10) / normal (0.15 default) / vivid (0.25). À combiner avec l\'utility token DS `bg-gradient-page-ambient` (teal-50 → white → yellow-50) pour fond premium TLS. Variants : `-warm` (orange) et `-sun` (orange→yellow).',
    keywords: ['blob', 'ambient', 'background', 'decorative', 'gradient', 'float', 'fixed', 'overlay', 'blur'],
    render: () => (
      <div className="flex flex-col gap-stack">
        {/* Default ambient gradient */}
        <div className="relative h-[260px] overflow-hidden rounded-xl bg-gradient-page-ambient border border-ink-200">
          <AmbientBlobs position="absolute" intensity="normal" />
          <div className="relative z-base p-6 flex flex-col items-center justify-center h-full text-center">
            <p className="m-0 font-display text-h3 font-bold text-ink-900">bg-gradient-page-ambient (DEFAULT)</p>
            <p className="m-0 mt-stack-xs font-body text-body text-ink-600 max-w-prose">
              Teal-50 → white → yellow-50 + 3 blobs flottants (float 20s).
            </p>
          </div>
        </div>

        {/* Warm variant */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
          <div className="relative h-[180px] overflow-hidden rounded-xl bg-gradient-page-ambient-warm border border-ink-200">
            <AmbientBlobs position="absolute" intensity="subtle" />
            <div className="relative z-base p-4 flex flex-col items-center justify-center h-full text-center">
              <p className="m-0 font-display text-body-sm font-bold text-ink-900">bg-gradient-page-ambient-warm</p>
              <p className="m-0 mt-tight font-body text-caption text-ink-600">Teal → white → orange</p>
            </div>
          </div>
          <div className="relative h-[180px] overflow-hidden rounded-xl bg-gradient-page-ambient-sun border border-ink-200">
            <AmbientBlobs position="absolute" intensity="subtle" />
            <div className="relative z-base p-4 flex flex-col items-center justify-center h-full text-center">
              <p className="m-0 font-display text-body-sm font-bold text-ink-900">bg-gradient-page-ambient-sun</p>
              <p className="m-0 mt-tight font-body text-caption text-ink-600">Orange → white → yellow</p>
            </div>
          </div>
        </div>

        {/* Brand deep + soft pastels (gradients tokens additionnels) */}
        <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0 mt-stack">Hero & soft pastels — autres gradients tokens DS</p>

        {/* Brand deep (saturated 90°) */}
        <div className="relative h-[140px] overflow-hidden rounded-xl bg-gradient-brand-deep border border-ink-200">
          <div className="relative z-base p-4 flex flex-col items-center justify-center h-full text-center">
            <p className="m-0 font-display text-body font-bold text-white">bg-gradient-brand-deep</p>
            <p className="m-0 mt-tight font-body text-caption text-white/80 font-mono">90deg · primary-950 #164267 → primary-500 #55a1b4</p>
          </div>
        </div>

        {/* Soft pastels (3-stop + 2-stop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
          <div className="relative h-[180px] overflow-hidden rounded-xl bg-gradient-soft-pastel border border-ink-200">
            <div className="relative z-base p-4 flex flex-col items-center justify-center h-full text-center">
              <p className="m-0 font-display text-body-sm font-bold text-ink-900">bg-gradient-soft-pastel</p>
              <p className="m-0 mt-tight font-body text-micro text-ink-600 font-mono">135° · cyan #f0f9ff → mist #f8fbfd → cream #fef3e2</p>
            </div>
          </div>
          <div className="relative h-[180px] overflow-hidden rounded-xl bg-gradient-soft-duo border border-ink-200">
            <div className="relative z-base p-4 flex flex-col items-center justify-center h-full text-center">
              <p className="m-0 font-display text-body-sm font-bold text-ink-900">bg-gradient-soft-duo</p>
              <p className="m-0 mt-tight font-body text-micro text-ink-600 font-mono">135° · cyan #f0f9ff → cream #fef3e2</p>
            </div>
          </div>
        </div>

        {/* Equivalence — utility class vs Tailwind native composition */}
        <p className="text-caption font-bold uppercase tracking-wider text-primary-700 m-0 mt-stack">⚖️ Équivalence — utility DS vs Tailwind natif composé</p>
        <p className="text-caption text-ink-600 m-0">
          Les couleurs sont définies en <code className="text-micro bg-ink-50 px-1.5 py-0.5 rounded">@theme</code> → Tailwind v4 expose <code className="text-micro bg-ink-50 px-1.5 py-0.5 rounded">from-X</code>/<code className="text-micro bg-ink-50 px-1.5 py-0.5 rounded">via-X</code>/<code className="text-micro bg-ink-50 px-1.5 py-0.5 rounded">to-X</code> automatiquement. Les 2 versions ci-dessous rendent <strong>identiquement</strong> :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
          <div className="relative h-[140px] overflow-hidden rounded-xl bg-gradient-page-ambient border border-ink-200">
            <div className="relative z-base p-3 h-full flex flex-col items-center justify-center text-center">
              <p className="m-0 font-mono text-caption text-ink-700"><strong>Utility DS</strong></p>
              <code className="m-0 mt-tight text-micro text-ink-900 bg-white/60 px-2 py-1 rounded">bg-gradient-page-ambient</code>
            </div>
          </div>
          <div className="relative h-[140px] overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 via-white to-accent-50 border border-ink-200">
            <div className="relative z-base p-3 h-full flex flex-col items-center justify-center text-center">
              <p className="m-0 font-mono text-caption text-ink-700"><strong>Tailwind composé</strong></p>
              <code className="m-0 mt-tight text-micro text-ink-900 bg-white/60 px-2 py-1 rounded">bg-gradient-to-br from-primary-50 via-white to-accent-50</code>
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
    category: 'Patterns',
    usedBy: ['Dashboard', 'Journal', 'LearningPaths', 'ArticleDetail', 'MagazineArticle', 'Newsletter', 'WeeklyNewsDetail', 'Project', 'CoachingBookingFlow', 'PreCoachingQuestionnaireResponse', 'Settings'],
    description: 'Bandeau hero éditorial plein-largeur. Tone-aware (default / brand / warm / sun) : default = teinte primary légère + texte ink ; brand = gradient primary-500→700 saturé + texte blanc (Dashboard/Journal) ; warm = gradient secondary saturé + texte blanc (LearningPaths) ; sun = gradient accent. Trailing slot pour KPIs/CTAs.',
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
    category: 'Patterns',
    usedBy: ['ArticleDetail', 'MagazineArticle', 'Newsletter', 'WeeklyNewsDetail', 'Project', 'CoachingBookingFlow', 'PreCoachingQuestionnaireResponse'],
    description: 'Layout 2 colonnes (main 1.4fr + aside 0.8fr) avec aside sticky sur desktop, stack sur mobile. Slot main + slot aside. Option `asideFirst` pour inverser, `staticAside` pour désactiver le sticky.',
    keywords: ['layout', 'editorial', 'sidebar', 'sticky', 'aside', '2-column', 'content'],
    render: () => (
      <EditorialLayout
        staticAside
        main={
          <SectionCard title="Contenu principal">
            <p className="m-0 text-body-sm text-ink-500">
              La colonne principale prend ~1.4fr de l'espace disponible. Elle peut contenir n'importe quel contenu : SectionCard, formulaires, listes, médias.
            </p>
          </SectionCard>
        }
        aside={
          <SectionCard title="Aside">
            <p className="m-0 text-body-sm text-ink-500">
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
    category: 'Patterns',
    usedBy: ['ArticleDetail', 'MagazineArticle', 'Newsletter', 'WeeklyNewsDetail', 'Project', 'CoachingBookingFlow', 'PreCoachingQuestionnaireResponse', 'ResetPassword', 'Billing', 'SubscriptionPayment', 'Positionnement'],
    description: 'Carte de section avec header (titre + icône + description + headerAction), body (children) et footer actions séparé par une bordure. Tone configurable (passé à Card). Utilisé pour structurer les pages éditoriales et content.',
    keywords: ['section', 'card', 'titled', 'content', 'editorial', 'layout'],
    render: () => (
      <SectionCard
        title="À retenir"
        titleIcon={<CheckCircle2 size={18} className="text-primary-600" />}
        description="Points essentiels à mémoriser pour cette section."
        headerAction={<span className="text-caption text-ink-500">3 items</span>}
        actions={
          <>
            <button type="button" className="inline-flex items-center gap-1 text-body-sm text-primary-600 hover:text-primary-700 underline bg-transparent border-0 p-0 cursor-pointer">
              Voir tout
            </button>
          </>
        }
      >
        <ul className="m-0 pl-4 flex flex-col gap-2 text-body-sm text-ink-700 list-disc">
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
    category: 'Patterns',
    usedBy: ['MagazineArticle', 'Newsletter', 'WeeklyNewsDetail', 'CoachingBookingFlow', 'PreCoachingQuestionnaireResponse'],
    description: 'Liste verticale d\'items associés (related/recommended). Items avec titre + description + meta optionnel + icon optionnel. Items cliquables (href ou onClick) avec chevron animé au hover. Utilisé dans les asides éditoriaux.',
    keywords: ['related', 'list', 'cross-link', 'recommendations', 'editorial', 'aside'],
    render: () => (
      <RelatedItemList
        items={[
          { id: '1', title: 'Interview expert', description: 'Vision 2027', meta: 'Interview', onClick: () => {} },
          { id: '2', title: 'Case study', description: 'Déploiement entreprise', meta: 'Étude', onClick: () => {} },
          { id: '3', title: 'Webinaire replay', description: 'IA & pédagogie : retour d\'expérience', meta: 'Vidéo', onClick: () => {} },
        ]}
      />
    ),
  },
  {
    name: 'AuthShell',
    codeName: 'patterns/AuthShell.tsx',
    cssBase: 'AuthShell (branded glass dark auth layout)',
    category: 'Patterns',
    usedBy: ['Login', 'Signup', 'ForgotPassword', 'ResetPassword', 'VerifyEmail', 'MagicLink'],
    description: 'Layout auth full-bleed branded glass dark (gradient teal + blobs ambient). Famille complète de sub-components: AuthField (input + icon + error), AuthPasswordField (eye toggle intégré), AuthPrimaryButton + AuthGhostButton, AuthCheckbox (peer/sr-only glass), AuthDivider, AuthSocialButton, AuthInlineLink, AuthSuccess.',
    keywords: ['auth', 'login', 'signup', 'shell', 'glass-dark', 'AuthField', 'AuthPasswordField', 'AuthPrimaryButton', 'AuthGhostButton', 'AuthCheckbox', 'form', 'aside'],
    render: () => <AuthShellDemo />,
  },
  {
    name: 'ResumeLessonCard',
    codeName: 'patterns/ResumeLessonCard.tsx',
    cssBase: 'ResumeLessonCard (dashboard hero card)',
    category: 'Patterns',
    usedBy: ['Dashboard'],
    description: 'Card hero "Reprendre ta leçon" pour le Dashboard learner-centric. Glass tone-aware (warm/primary/sun) avec eyebrow "Étape X sur Y", titre h1 du parcours, description contextuelle, meta pills (niveau/durée/leçons), progress bar large + CTA pill arrondi. Hero-sized (p-6/8/10 responsive), radial glow au hover.',
    keywords: ['resume', 'reprendre', 'parcours', 'lesson', 'leçon', 'dashboard', 'continue', 'hero'],
    render: () => (
      <ResumeLessonCard
        id="demo-1"
        eyebrow="Étape 2 sur 5"
        parcoursTitle="Devenir prompt designer"
        description="Applications pratiques — Apprends à structurer tes prompts pour des cas concrets de formation. Plus que 8 minutes pour terminer la prochaine leçon."
        progress={40}
        tone="warm"
        duration="3h restantes"
        lessons={5}
        level="intermédiaire"
        onClick={() => {}}
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
      <div className="flex flex-col gap-stack">
        <Divider />
        <Divider label="ou" />
        <Divider label="Compétences" spacing="lg" />
        <div className="flex items-center gap-4 h-20">
          <span className="text-body-sm">Section A</span>
          <Divider orientation="vertical" />
          <span className="text-body-sm">Section B</span>
          <Divider orientation="vertical" />
          <span className="text-body-sm">Section C</span>
        </div>
      </div>
    ),
  },

  // ── MVP — GDPR & Compliance ──────────────────────────────────────────────

  {
    name: 'ConsentBanner',
    codeName: 'patterns/ConsentBanner.tsx',
    cssBase: 'ConsentBanner',
    category: 'Patterns',
    description: 'Bandeau GDPR cookie consent. Position fixed bottom. 3 catégories (nécessaires/analytiques/marketing). Panneau "Personnaliser" expandable. Tous rôles. Module #13bis.',
    keywords: ['consent', 'gdpr', 'rgpd', 'cookies', 'privacy', 'banner', 'compliance', 'ai act'],
    showcaseOnly: false,
    usedBy: [],
    render: () => (
      <div className="relative min-h-[120px] border border-ink-100 rounded-lg overflow-hidden bg-ink-50">
        <p className="p-4 text-caption text-ink-400 italic">ConsentBanner — position fixed bottom dans l'app réelle. Démo statique ci-dessous :</p>
        <div className="relative bg-white/95 border-t border-ink-100 shadow-lg p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1 text-body-sm text-ink-600">
              <span className="font-semibold text-ink-900">The Learning Society respecte votre vie privée</span>
              {' — '}Nous utilisons des cookies pour améliorer votre expérience.
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <button className="px-3 py-1.5 text-caption rounded-md border border-ink-200 text-ink-600 hover:bg-ink-50">Personnaliser</button>
              <button className="px-3 py-1.5 text-caption rounded-md border border-ink-200 text-ink-700 hover:bg-ink-100">Tout refuser</button>
              <button className="px-3 py-1.5 text-caption rounded-pill bg-primary-600 text-white hover:bg-primary-700">Tout accepter</button>
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
    category: 'Learning',
    description: 'Radar SVG 6 axes Dreyfus (1–5). Polygone niveau actuel (bleu) + objectif cible (orange, dashed). Légende intégrée. Clic sur axe → drill-down. 3 tailles. Modules #2 Passeport · #3 Profil · #6 Enterprise · #10 Analytics · #11 Projects.',
    keywords: ['radar', 'compétences', 'dreyfus', 'skills', 'passeport', 'svg', 'chart', 'hso'],
    showcaseOnly: false,
    usedBy: ['Passeport', 'CoachDashboard', 'ManagerCohort', 'PasseportHistorique'],
    render: () => (
      <div className="flex flex-col gap-section items-center">
        <div className="flex flex-wrap gap-8 justify-center items-start">
          <div className="flex flex-col items-center gap-2">
            <span className="text-caption text-ink-500">sm — sans cible</span>
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
          <div className="flex flex-col items-center gap-2">
            <span className="text-caption text-ink-500">md — avec objectifs cibles</span>
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
        <p className="text-caption text-ink-400 text-center max-w-prose">Clic sur les labels d'axes → drill-down (console.log). Échelle Dreyfus 1–5.</p>
      </div>
    ),
  },

  // ── MVP — AI Indicators ──────────────────────────────────────────────────

  {
    name: 'AITransparencyLabel',
    codeName: 'ui/AITransparencyLabel.tsx',
    cssBase: 'AITransparencyLabel',
    category: 'Core',
    description: 'Label "IA" transversal pour marquer tout contenu généré, recommandé ou assisté par l\'IA. 3 variants × 2 sizes. AI Act / Module #13bis. Usage : items recommandés, suggestions coach, chatbot.',
    keywords: ['ai', 'ia', 'transparency', 'label', 'badge', 'generated', 'recommended', 'ai act', 'gdpr'],
    showcaseOnly: false,
    usedBy: ['PerplexityContentDetail', 'ItemRecommendations'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div className="flex flex-wrap gap-3 items-center">
          <AITransparencyLabel variant="recommended" size="sm" />
          <AITransparencyLabel variant="generated" size="sm" />
          <AITransparencyLabel variant="assisted" size="sm" />
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <AITransparencyLabel variant="recommended" size="md" />
          <AITransparencyLabel variant="generated" size="md" />
          <AITransparencyLabel variant="assisted" size="md" />
        </div>
        <div className="flex items-start gap-3 p-4 bg-ink-50 rounded-lg">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-body-sm font-semibold text-ink-900">Prompt Engineering avancé</span>
              <AITransparencyLabel variant="recommended" size="sm" />
            </div>
            <p className="text-caption text-ink-500">Exemple d'usage en contexte — label inline sur une recommandation IA</p>
          </div>
        </div>
      </div>
    ),
  },

  {
    name: 'AIOverrideButton',
    codeName: 'ui/AIOverrideButton.tsx',
    cssBase: 'AIOverrideButton',
    category: 'Core',
    description: 'Bouton "Rejeter cette recommandation" pour Coach/Admin. Peut ouvrir un textarea inline pour collecter la raison du rejet. Module #13bis — transversal IA.',
    keywords: ['ai', 'ia', 'override', 'reject', 'button', 'coach', 'admin', 'feedback'],
    showcaseOnly: false,
    usedBy: [],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div className="flex flex-wrap gap-3 items-center">
          <AIOverrideButton onOverride={(r) => console.log('Override:', r)} />
          <AIOverrideButton label="Override suggestion" size="md" onOverride={(r) => console.log('Override:', r)} />
        </div>
        <div className="border border-ink-100 rounded-lg p-4 flex flex-col gap-3">
          <p className="text-caption text-ink-500 font-medium">Avec raison obligatoire (requireReason=true) :</p>
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
    category: 'Learning',
    description: 'Indicateur de dégradation Dreyfus. Rien affiché si inactif ≤ 90j. Warning orange si 91–180j (pulsant). Danger si > 180j. Module #5 Gamification — badges compétences.',
    keywords: ['atrophie', 'dreyfus', 'inactif', 'badge', 'competence', 'degradation', 'warning', 'gamification'],
    showcaseOnly: false,
    usedBy: ['Gamification', 'CoachEngagement'],
    render: () => (
      <div className="flex flex-col gap-stack">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-caption text-ink-400">≤ 90j :</span>
          <span className="text-caption text-ink-300 italic">(rien affiché)</span>
          <AtrophieIndicator daysSinceActivity={45} />
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-caption text-ink-400">91–180j :</span>
          <AtrophieIndicator daysSinceActivity={94} currentLevel={3} size="sm" />
          <AtrophieIndicator daysSinceActivity={130} currentLevel={2} size="md" />
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-caption text-ink-400">&gt; 180j (critique) :</span>
          <AtrophieIndicator daysSinceActivity={210} currentLevel={4} size="sm" />
          <AtrophieIndicator daysSinceActivity={365} size="md" />
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-caption text-ink-400">Sans label :</span>
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
    category: 'Learning',
    description: 'Grille compétences × apprenants avec codes couleur Dreyfus 1–5. Sticky header. Responsive overflow-x. Module #2 Passeport / #10 Analytics.',
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
    category: 'Core',
    description: 'Carte de travail soumis à corriger. Statut (pending/in-review/corrected/rejected), excerpt, feedback count, actions. Module #4 Coaching — corrections inbox.',
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
    category: 'Patterns',
    description: 'Wizard step-by-step pour tutoriaux guidés. Progress dots tone-aware. Prev/Next/Terminer DS. Skip link. Contrôlé (externalStep) ou autonome (state interne). Module #3 Onboarding.',
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
    cssBase: 'OptionGrid',
    category: 'Patterns',
    description: 'Grille d\'options sélectionnables (icon + label) — single ou multi-select. Tone-aware (brand/warm/sun), 3 layouts (icon-top, icon-left, text-only), responsive 2 → N cols. Remplace les grilles ad-hoc role/secteur/rythme dans Onboarding.',
    keywords: ['select', 'options', 'cards', 'pick', 'choice', 'role', 'sector', 'onboarding', 'radio', 'checkbox'],
    usedBy: ['Onboarding'],
    render: () => {
      const [role, setRole] = React.useState('Manager');
      const [skills, setSkills] = React.useState<string[]>(['Leadership']);
      return (
        <div className="flex flex-col gap-section max-w-2xl">
          <div className="flex flex-col gap-stack">
            <span className="text-caption font-semibold text-ink-500 uppercase tracking-wide">Single-select · tone warm · icon-top</span>
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
            <span className="text-caption font-semibold text-ink-500 uppercase tracking-wide">Multi-select · tone brand · text-only</span>
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
    category: 'Patterns',
    description: 'Sélecteur 5-niveaux Dreyfus (Novice → Expert) pour positionnement compétences. Responsive 1 → 5 cols (fix le pb cramped tablet de la v1). Tone-aware. Levels customisables via prop. Module #4 Phase 14.1.',
    keywords: ['dreyfus', 'level', 'positionnement', 'competence', 'likert', 'self-assessment', 'questionnaire', 'novice', 'expert'],
    usedBy: ['OnboardingQuestionnaire'],
    render: () => {
      const [level, setLevel] = React.useState<number | undefined>(3);
      return (
        <div className="flex flex-col gap-stack max-w-3xl">
          <span className="text-caption font-semibold text-ink-500 uppercase tracking-wide">Tone warm · niveau 3 sélectionné</span>
          <DreyfusLevelSelector tone="warm" value={level} onChange={setLevel} />
        </div>
      );
    },
  },
  {
    name: 'CongratulationsCard',
    codeName: 'patterns/CongratulationsCard.tsx',
    cssBase: 'CongratulationsCard',
    category: 'Patterns',
    description: 'Bloc de célébration de milestone (fin onboarding / parcours / module). Icône large + badge + heading + summary + XP reward optionnel. 4 tones (brand/warm/sun/success).',
    keywords: ['congratulations', 'success', 'celebration', 'milestone', 'completion', 'reward', 'xp', 'onboarding'],
    usedBy: ['OnboardingSuccess'],
    render: () => (
      <div className="flex flex-col items-center max-w-xl mx-auto">
        <CongratulationsCard
          tone="brand"
          badgeLabel="Profil complété !"
          title="Bienvenue sur The Learning Society"
          summary="Ton profil est configuré et ton passeport de compétences est prêt. Tu peux maintenant commencer ton parcours."
          xp={{ earned: 150, current: 150, max: 500, levelLabel: 'Onboarding terminé' }}
        />
      </div>
    ),
  },
  {
    name: 'NextStepsGrid',
    codeName: 'patterns/NextStepsGrid.tsx',
    cssBase: 'NextStepsGrid',
    category: 'Patterns',
    description: 'Grille d\'action cards "et maintenant ?" — chaque card a icon tone-tinted + title + desc + CTA flèche. Tone par-item (mix brand/warm/sun pour varier les next paths). Responsive 1 → 3 cols.',
    keywords: ['next steps', 'actions', 'cta', 'cards', 'onboarding success', 'guide', 'next'],
    usedBy: ['OnboardingSuccess', 'EmptyDashboardState'],
    render: () => (
      <div className="max-w-3xl">
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
    category: 'Patterns',
    description: 'Variante "cold-start" du Dashboard pour les apprenants qui viennent juste de terminer l\'onboarding. Remplace le Dashboard avec mock data par un welcome + NextStepsGrid des 3 actions canoniques.',
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
    category: 'Patterns',
    description: 'Atom carousel/wizard progress indicator. Active dot widened (~3× width) pour communiquer la position. 3 tailles (xs/sm/md) · tone-aware (primary/warm/sun) · onSelect optionnel rend les dots cliquables. Remplace 3 implémentations ad-hoc (LessonPlayer tabs, AstucesViewer dots, FlashcardsViewer dots).',
    keywords: ['progress', 'dots', 'carousel', 'wizard', 'indicator', 'pagination'],
    usedBy: ['LessonNavigation', 'AstucesViewer', 'FlashcardsViewer', 'LessonPlayer'],
    render: () => {
      const [primaryIdx, setPrimaryIdx] = React.useState(2);
      const [warmIdx, setWarmIdx] = React.useState(1);
      const [sunIdx, setSunIdx] = React.useState(3);
      return (
        <div className="flex flex-col gap-stack max-w-xl">
          <div className="flex items-center gap-stack">
            <span className="text-caption text-ink-500 w-24">Primary · md</span>
            <ProgressDots total={5} current={primaryIdx} tone="primary" size="md" onSelect={setPrimaryIdx} />
          </div>
          <div className="flex items-center gap-stack">
            <span className="text-caption text-ink-500 w-24">Warm · sm</span>
            <ProgressDots total={5} current={warmIdx} tone="warm" size="sm" onSelect={setWarmIdx} />
          </div>
          <div className="flex items-center gap-stack">
            <span className="text-caption text-ink-500 w-24">Sun · xs</span>
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
    category: 'Learning',
    description: 'Carte 3D à retournement (flip). Front : image de fond + icône emoji + catégorie pill + titre. Verso : gradient tone-aware + contenu + détails optionnels. Mécanique CSS 3D : perspective 1500px, preserve-3d, rotateY(180deg), backfaceVisibility. Tone-aware (border + gradient).',
    keywords: ['flip', 'card', 'flashcard', '3d', 'rotate', 'learning', 'tone'],
    usedBy: ['FlashcardsViewer'],
    render: () => {
      const [flipped, setFlipped] = React.useState(false);
      const [tone, setTone] = React.useState<'primary' | 'warm' | 'sun'>('primary');
      return (
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          <div className="flex gap-2 justify-center">
            {(['primary', 'warm', 'sun'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={`px-3 py-1.5 rounded-pill text-caption font-semibold transition-colors ${tone === t ? 'bg-primary-500 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <FlipCard
            front={{
              image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1080&q=80',
              icon: '🎯',
              category: 'PROMPT ENGINEERING',
              title: 'Les 4 Piliers du Prompt',
            }}
            back={{
              content: 'RÔLE — CONTEXTE — INSTRUCTION — FORMAT',
              details: 'Ces 4 éléments structurent un prompt clair pour obtenir les meilleurs résultats.',
            }}
            isFlipped={flipped}
            onFlip={() => setFlipped((f) => !f)}
            tone={tone}
          />
          <p className="text-center font-body text-caption text-ink-500">
            {flipped ? 'Verso visible — cliquer pour retourner' : 'Recto — cliquer pour voir la réponse'}
          </p>
        </div>
      );
    },
  },
  {
    name: 'LessonNavigation',
    codeName: 'patterns/LessonNavigation.tsx',
    cssBase: 'LessonNavigation',
    category: 'Patterns',
    description: 'Footer molecule unifié pour LessonPlayer + 4 viewers. Layout : [Précédent] · dots · [Suivant / Terminer]. Tone-aware (primary/warm/sun), responsive (labels masqués mobile, dots gardés), disabled aux bornes. Quand `onFinish` fourni ET current === total → bouton suivant devient "Terminer" avec ✓.',
    keywords: ['navigation', 'lesson', 'prev', 'next', 'finish', 'footer', 'viewer'],
    usedBy: ['LessonPlayer', 'AstucesViewer', 'FlashcardsViewer'],
    render: () => {
      const [pos, setPos] = React.useState(3);
      const total = 7;
      return (
        <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-white shadow-sm border border-ink-100">
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

/* ----------- New semantic spacing tokens (introduced 2026-05-10) ----------- */
const SEMANTIC_SPACING_TOKENS: TokenEntry[] = [
  { name: 'spacing-tight', cssVar: '--spacing-tight', value: '0.125rem (2px)', group: 'Spacing — Semantic', type: 'spacing' },
  { name: 'spacing-stack-xs', cssVar: '--spacing-stack-xs', value: '0.5rem (8px)', group: 'Spacing — Semantic', type: 'spacing' },
  { name: 'spacing-stack', cssVar: '--spacing-stack', value: '1rem (16px)', group: 'Spacing — Semantic', type: 'spacing' },
  { name: 'spacing-stack-lg', cssVar: '--spacing-stack-lg', value: '1.5rem (24px)', group: 'Spacing — Semantic', type: 'spacing' },
  { name: 'spacing-section', cssVar: '--spacing-section', value: '2rem (32px)', group: 'Spacing — Semantic', type: 'spacing' },
  { name: 'spacing-section-lg', cssVar: '--spacing-section-lg', value: '2.5rem (40px)', group: 'Spacing — Semantic', type: 'spacing' },
  { name: 'spacing-page', cssVar: '--spacing-page', value: '3rem (48px)', group: 'Spacing — Semantic', type: 'spacing' },
];

const OPACITY_TOKENS: TokenEntry[] = [
  { name: 'opacity-faint', cssVar: '--opacity-faint', value: '0.05', group: 'Opacity', type: 'opacity' },
  { name: 'opacity-soft', cssVar: '--opacity-soft', value: '0.10', group: 'Opacity', type: 'opacity' },
  { name: 'opacity-tinted', cssVar: '--opacity-tinted', value: '0.15', group: 'Opacity', type: 'opacity' },
  { name: 'opacity-medium', cssVar: '--opacity-medium', value: '0.30', group: 'Opacity', type: 'opacity' },
  { name: 'opacity-disabled', cssVar: '--opacity-disabled', value: '0.50', group: 'Opacity', type: 'opacity' },
  { name: 'opacity-overlay', cssVar: '--opacity-overlay', value: '0.70', group: 'Opacity', type: 'opacity' },
];

const DURATION_TOKENS: TokenEntry[] = [
  { name: 'duration-fast', cssVar: '--duration-fast', value: '150ms', group: 'Duration', type: 'duration' },
  { name: 'duration-base', cssVar: '--duration-base', value: '200ms', group: 'Duration', type: 'duration' },
  { name: 'duration-slow', cssVar: '--duration-slow', value: '300ms', group: 'Duration', type: 'duration' },
  { name: 'duration-glacial', cssVar: '--duration-glacial', value: '600ms', group: 'Duration', type: 'duration' },
];

const EASING_TOKENS: TokenEntry[] = [
  { name: 'ease-standard', cssVar: '--ease-standard', value: 'cubic-bezier(0.4, 0, 0.2, 1)', group: 'Easing', type: 'easing' },
  { name: 'ease-decelerate', cssVar: '--ease-decelerate', value: 'cubic-bezier(0, 0, 0.2, 1)', group: 'Easing', type: 'easing' },
  { name: 'ease-accelerate', cssVar: '--ease-accelerate', value: 'cubic-bezier(0.4, 0, 1, 1)', group: 'Easing', type: 'easing' },
  { name: 'ease-emphasis', cssVar: '--ease-emphasis', value: 'cubic-bezier(0.2, 0, 0, 1.15)', group: 'Easing', type: 'easing' },
];

const CONTAINER_TOKENS: TokenEntry[] = [
  { name: 'container-prose', cssVar: '--container-prose', value: '65ch', group: 'Container max-widths', type: 'container' },
  { name: 'container-content', cssVar: '--container-content', value: '48rem (768px)', group: 'Container max-widths', type: 'container' },
  { name: 'container-page', cssVar: '--container-page', value: '72rem (1152px)', group: 'Container max-widths', type: 'container' },
  { name: 'container-wide', cssVar: '--container-wide', value: '80rem (1280px)', group: 'Container max-widths', type: 'container' },
];

const BLUR_TOKENS: TokenEntry[] = [
  { name: 'blur-glass-light', cssVar: '--blur-glass-light', value: '8px', group: 'Blur (frosted glass)', type: 'blur' },
  { name: 'blur-glass-medium', cssVar: '--blur-glass-medium', value: '16px', group: 'Blur (frosted glass)', type: 'blur' },
  { name: 'blur-glass-heavy', cssVar: '--blur-glass-heavy', value: '24px', group: 'Blur (frosted glass)', type: 'blur' },
  { name: 'blur-glass-ambient', cssVar: '--blur-glass-ambient', value: '60px', group: 'Blur (frosted glass)', type: 'blur' },
];

const SURFACE_TOKENS: TokenEntry[] = [
  { name: 'surface', cssVar: '--color-surface', value: '#ffffff', group: 'Surface', type: 'surface' },
  { name: 'surface-muted', cssVar: '--color-surface-muted', value: '#f9fafb (= ink-50)', group: 'Surface', type: 'surface' },
  { name: 'surface-sunken', cssVar: '--color-surface-sunken', value: '#f3f4f6 (= ink-100)', group: 'Surface', type: 'surface' },
  { name: 'surface-elevated', cssVar: '--color-surface-elevated', value: '#ffffff', group: 'Surface', type: 'surface' },
];

const TOUCH_TARGET_TOKENS: TokenEntry[] = [
  { name: 'touch', cssVar: '--spacing-touch', value: '2.75rem (44px) — Apple HIG / WCAG AA min', group: 'Touch targets', type: 'touch' },
  { name: 'touch-lg', cssVar: '--spacing-touch-lg', value: '3rem (48px) — Material comfortable', group: 'Touch targets', type: 'touch' },
];

const ZINDEX_TOKENS: TokenEntry[] = [
  { name: 'z-base', cssVar: '--z-base', value: '1', group: 'z-index', type: 'zindex' },
  { name: 'z-sticky', cssVar: '--z-sticky', value: '20', group: 'z-index', type: 'zindex' },
  { name: 'z-dropdown', cssVar: '--z-dropdown', value: '30', group: 'z-index', type: 'zindex' },
  { name: 'z-overlay', cssVar: '--z-overlay', value: '40', group: 'z-index', type: 'zindex' },
  { name: 'z-modal', cssVar: '--z-modal', value: '50', group: 'z-index', type: 'zindex' },
  { name: 'z-toast', cssVar: '--z-toast', value: '60', group: 'z-index', type: 'zindex' },
  { name: 'z-tooltip', cssVar: '--z-tooltip', value: '70', group: 'z-index', type: 'zindex' },
];

const ALL_TOKENS: TokenEntry[] = [
  ...COLOR_TOKENS,
  ...SEMANTIC_TOKENS,
  ...ROLE_TOKENS,
  ...TYPOGRAPHY_TOKENS,
  ...SPACING_TOKENS,
  ...SEMANTIC_SPACING_TOKENS,
  ...RADIUS_TOKENS,
  ...SHADOW_TOKENS,
  ...MOTION_TOKENS,
  ...GRADIENT_TOKENS,
  ...OPACITY_TOKENS,
  ...DURATION_TOKENS,
  ...EASING_TOKENS,
  ...CONTAINER_TOKENS,
  ...BLUR_TOKENS,
  ...SURFACE_TOKENS,
  ...TOUCH_TARGET_TOKENS,
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
    // Try to extract a px value either from "16px" or "1rem (16px)"
    const pxMatch = t.value.match(/(\d+)\s*px/);
    const px = pxMatch ? parseInt(pxMatch[1], 10) : (parseInt(t.value, 10) || 0);
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
            <span className="text-micro font-bold text-white drop-shadow">{t.value}</span>
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
            <span className="text-micro font-mono text-ink-600">{t.name}</span>
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

  if (t.type === 'touch') {
    // Static literals → JIT compiles `h-touch w-touch` and `h-touch-lg w-touch-lg`
    const sizeClass = t.name === 'touch-lg' ? 'h-touch-lg w-touch-lg' : 'h-touch w-touch';
    const utility = t.name === 'touch-lg' ? 'h-touch-lg' : 'h-touch';
    return (
      <div className="token-card">
        <div className="h-[88px] rounded-md bg-ink-50 flex items-center justify-center">
          <div className={`${sizeClass} rounded-md bg-primary-500 flex items-center justify-center text-white text-micro font-bold tabular-nums`}>
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
          <span className="relative font-display font-bold text-h4 text-white tabular-nums drop-shadow">{z}</span>
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

const Components: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show back-to-top button once scrolled past hero
  React.useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const q = query.trim().toLowerCase();

  // Components enriched with new meta (category + subCategory)
  const componentsWithMeta = useMemo(
    () => COMPONENTS.map((c) => ({ ...c, _meta: resolveMeta(c) })),
    [],
  );

  const filteredComponents = useMemo(() => {
    if (filter === 'Tokens' || filter === 'Pages & Templates') return [];
    return componentsWithMeta.filter((c) => {
      if (filter !== 'all' && c._meta.category !== filter) return false;
      if (!q) return true;
      const haystack = [
        c.name, c.codeName, c.cssBase, c.description, c._meta.category, c._meta.subCategory, ...c.keywords,
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [q, filter, componentsWithMeta]);

  const filteredTokens = useMemo(() => {
    if (filter !== 'all' && filter !== 'Tokens' && filter !== 'Foundations') return [];
    return ALL_TOKENS.filter((t) => {
      if (!q) return true;
      const haystack = [t.name, t.cssVar, t.value, t.group, t.type].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [q, filter]);

  const filteredPages = useMemo(() => {
    if (filter !== 'all' && filter !== 'Pages & Templates') return [];
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

  // Group by NEW category → subCategory (2 levels)
  const componentsByCategory = useMemo(() => {
    return CATEGORY_ORDER
      .map((cat) => {
        const inCat = filteredComponents.filter((c) => c._meta.category === cat);
        if (inCat.length === 0) return null;
        // Sub-group by subCategory respecting SUBCATEGORY_ORDER
        const subMap = new Map<string, typeof inCat>();
        inCat.forEach((c) => {
          const sub = c._meta.subCategory;
          if (!subMap.has(sub)) subMap.set(sub, []);
          subMap.get(sub)!.push(c);
        });
        const subOrder = SUBCATEGORY_ORDER[cat] ?? [];
        const orderedSubs: Array<readonly [string, typeof inCat]> = [
          ...subOrder.filter((s) => subMap.has(s)).map((s) => [s, subMap.get(s)!] as const),
          // Any subCategory not in the predefined order, appended at the end
          ...Array.from(subMap.entries()).filter(([s]) => !subOrder.includes(s)),
        ];
        return [cat, orderedSubs, inCat.length] as const;
      })
      .filter((x): x is readonly [NewCategory, (readonly [string, typeof componentsWithMeta])[], number] => x !== null);
  }, [filteredComponents, componentsWithMeta]);

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
      {/* -------------------------------- HERO (EditorialHero brand) ---------- */}
      <EditorialHero
        tone="brand"
        eyebrow={{ icon: <SparklesIcon size={12} />, label: `Design System · v1.0.0 · ${lastUpdated}` }}
        title="Components"
        summary={
          <>
            Source :{' '}
            <code className="font-mono text-[0.92em] bg-white/15 text-white px-1.5 py-0.5 rounded-sm border border-white/20">
              src/components/
            </code>{' '}
            — bibliothèque vivante de {COMPONENTS.length} composants React et {ALL_TOKENS.length} tokens,
            organisés en {CATEGORY_ORDER.length} catégories et {totalSubCategories} sous-catégories.
            Cliquez sur une puce pour copier la référence.
          </>
        }
        trailing={
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-stack-xs sm:gap-stack">
            <StatCard
              variant="brand"
              size="sm"
              icon={<Layers size={18} />}
              value={COMPONENTS.length}
              label="Composants"
            />
            <StatCard
              variant="brand"
              size="sm"
              icon={<Palette size={18} />}
              value={ALL_TOKENS.length}
              label="Tokens"
            />
            <StatCard
              variant="brand"
              size="sm"
              icon={<FolderTree size={18} />}
              value={CATEGORY_ORDER.length}
              sub={`/${totalSubCategories}`}
              label="Cats / Sous-cats"
            />
            <StatCard
              variant="brand"
              size="sm"
              icon={<LayoutTemplate size={18} />}
              value={PAGE_TEMPLATES.length}
              label="Pages templates"
            />
          </div>
        }
      />

      {/* -------------------------------- CONTROLS (sticky) ------------------- */}
      <div className="sticky top-0 z-sticky -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 py-3 bg-white/85 backdrop-blur-glass-medium border-b border-ink-200 flex flex-col gap-stack-xs">
        <Search
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="lg"
          placeholder="Rechercher un composant, un token, une classe CSS…"
        />
        <div className="flex flex-wrap gap-stack-xs overflow-x-auto">
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
          {/* ---- Components by category → subCategory ---- */}
          {componentsByCategory.map(([cat, subGroups, total]) => (
            <section key={cat} className="ds-section" id={`cat-${cat.replace(/[^a-z]/gi, '-').toLowerCase()}`}>
              <div className="ds-section__head">
                <h2 className="ds-section__title">{cat}</h2>
                <span className="ds-section__count">{total} composant{total > 1 ? 's' : ''}</span>
              </div>

              {subGroups.map(([subCat, list]) => (
                <div key={subCat} className="flex flex-col gap-stack">
                  {/* Sub-category header (skip if "Other" or single-sub category) */}
                  {subGroups.length > 1 && (
                    <div className="flex items-baseline gap-stack-xs mt-stack-lg first:mt-0 pb-2 border-b border-ink-100">
                      <h3 className="m-0 font-display text-h4 font-semibold text-ink-700">{subCat}</h3>
                      <span className="text-caption text-ink-500">{list.length}</span>
                    </div>
                  )}

                  <div className="ds-component-list">
                    {list.map((c) => (
                      <article key={c.name} className="ds-component">
                        <header className="ds-component__head">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="ds-component__name">{c.name}</h3>
                              {c.showcaseOnly && (
                                <span
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill bg-accent-50 text-accent-800 border border-accent-200 text-micro font-bold uppercase tracking-wider"
                                  title="Disponible dans le Design System mais pas (encore) consommé par une page de l'app"
                                >
                                  Showcase only
                                </span>
                              )}
                            </div>
                            <p className="ds-component__desc">{c.description}</p>
                            {c.usedBy && c.usedBy.length > 0 && (
                              <p className="m-0 mt-1 text-micro text-ink-500">
                                <span className="font-bold uppercase tracking-wider mr-1.5">Used by:</span>
                                {c.usedBy.join(' · ')}
                              </p>
                            )}
                          </div>
                          <div className="ds-component__chips">
                            <CopyChip text={c.codeName} label={`‹${c.codeName}›`} />
                            <CopyChip text={c.cssBase} label={c.cssBase} />
                            <span className="ds-component__cat">{c._meta.category}</span>
                          </div>
                        </header>
                        <div className="ds-component__preview">{c.render()}</div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}

          {/* ---- Pages & Templates ---- */}
          {pagesByFamily.map(([family, pages]) => (
            <section key={family} className="ds-section">
              <div className="ds-section__head">
                <h2 className="ds-section__title">Pages · {family}</h2>
                <span className="ds-section__count">{pages.length} template{pages.length > 1 ? 's' : ''}</span>
              </div>
              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                {pages.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white border border-ink-200 rounded-xl overflow-hidden flex flex-col"
                  >
                    {/* Color header */}
                    <div
                      className="flex items-center gap-3 border-b border-ink-200"
                      style={{ background: p.bg, padding: 'var(--s-5) var(--s-5) var(--s-4)' }}
                    >
                      <span className="text-h2 leading-none">{p.icon}</span>
                      <div>
                        <div
                          className="text-micro font-bold uppercase mb-1"
                          style={{ color: p.color, letterSpacing: '0.07em' }}
                        >
                          {p.family}
                        </div>
                        <div className="text-body font-extrabold text-ink-900 leading-tight">
                          {p.name}
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 flex flex-col gap-3" style={{ padding: 'var(--s-4) var(--s-5)' }}>
                      <p className="text-body-sm text-ink-500 m-0 leading-relaxed">
                        {p.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap" style={{ gap: 'var(--s-1-5)' }}>
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-ink-50 border border-ink-200 rounded-pill text-micro font-semibold text-ink-500"
                            style={{ padding: 'var(--chip-padding-xs)' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Navigate button */}
                      <button
                        type="button"
                        onClick={() => navigate(p.path)}
                        className="mt-auto inline-flex items-center justify-center rounded-pill border-none text-white font-bold text-body-sm cursor-pointer font-body w-full transition-opacity duration-150"
                        style={{
                          gap: 'var(--s-1-5)',
                          padding: 'var(--s-2) var(--s-4-5)',
                          background: p.color,
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

      {/* -------------------------------- BACK-TO-TOP ------------------------- */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Retour en haut de page"
          className="fixed bottom-28 right-10 z-toast w-12 h-12 rounded-pill bg-primary-600 text-white shadow-lg flex items-center justify-center cursor-pointer transition-all duration-base hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15" />
          </svg>
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
