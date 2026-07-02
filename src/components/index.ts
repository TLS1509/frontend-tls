/* ============================================================================
 * Core Components
 * ============================================================================ */
export { Button } from './core/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './core/Button';

export { Card, CardEyebrow, CardTitle, CardDesc, CardFooter } from './core/Card';
export type { CardProps, CardVariant } from './core/Card';

export { Input, Checkbox, Radio, Switch } from './core/Input';
export type {
  InputProps,
  CheckboxProps,
  RadioProps,
  SwitchProps,
  InputSize,
  InputStatus,
  InputSurface,
} from './core/Input';

export { FormGroup } from './core/FormGroup';
export type { FormGroupProps } from './core/FormGroup';

export { Select } from './core/Select';
export type { SelectProps, SelectOption, SelectSize, SelectStatus } from './core/Select';

/* ============================================================================
 * UI — Identity & Content
 * ============================================================================ */
export { Badge } from './ui/Badge';
export type { BadgeProps, BadgeVariant } from './ui/Badge';

export { Tag } from './ui/Tag';
export type { TagProps } from './ui/Tag';

export { Avatar, AvatarGroup } from './ui/Avatar';
export type {
  AvatarProps,
  AvatarGroupProps,
  AvatarSize,
  AvatarTint,
  AvatarStatus,
} from './ui/Avatar';

/* ============================================================================
 * UI — Feedback / Patterns
 * ============================================================================ */
export { Alert } from './ui/Alert';
export type { AlertProps, AlertVariant, AlertPattern } from './ui/Alert';

export { Toast } from './ui/Toast';
export type { ToastProps, ToastVariant } from './ui/Toast';

export { Modal } from './ui/Modal';
export type { ModalProps } from './ui/Modal';

export { EmptyState } from './ui/EmptyState';
export type { EmptyStateProps, EmptyStateTone } from './ui/EmptyState';

export { Skeleton } from './ui/Skeleton';
export type { SkeletonProps, SkeletonVariant } from './ui/Skeleton';

export { Search } from './ui/Search';
export type { SearchProps, SearchSize, SearchVariant } from './ui/Search';

export { FilterChip } from './ui/FilterChip';
export type { FilterChipProps, FilterChipTone, FilterChipSize } from './ui/FilterChip';

export { SearchFilters } from './patterns/SearchFilters';
export type {
  SearchFiltersProps,
  SearchFilterAxis,
  SelectFilterAxis,
  ToggleFilterAxis,
  SearchFilterOption,
} from './patterns/SearchFilters';

export { Pagination } from './ui/Pagination';
export type { PaginationProps } from './ui/Pagination';

/* ============================================================================
 * UI — Learning
 * ============================================================================ */
export { Medal } from './ui/Medal';
export type { MedalProps, MedalSize, MedalVariant } from './ui/Medal';

export { CompetenceBadge, LEVEL_LABELS } from './ui/CompetenceBadge';
export type { CompetenceBadgeProps, CompetenceLevel } from './ui/CompetenceBadge';

export { StatCard } from './ui/StatCard';
export type {
  StatCardProps,
  StatCardVariant,
  StatValueColor,
  StatDeltaDirection,
} from './ui/StatCard';

export { ProgressBar } from './ui/ProgressBar';
export type { ProgressBarProps, ProgressSize, ProgressFill } from './ui/ProgressBar';

export { SkillBar } from './ui/SkillBar';
export type { SkillBarProps } from './ui/SkillBar';

export { ProgressRing } from './ui/ProgressRing';
export type { ProgressRingProps } from './ui/ProgressRing';

export { Steps } from './ui/Steps';
export type { StepsProps, StepItem, StepState } from './ui/Steps';

// Celebration (full card) → replaced by CelebrationModal in components/modals/.
// InlineWin remains as a compact in-flow celebration strip.
export { InlineWin } from './ui/Celebration';
export type { InlineWinProps } from './ui/Celebration';

/* ============================================================================
 * UI — Navigation
 * ============================================================================ */
export { Tabs } from './ui/Tabs';
export type { TabsProps, TabItem, TabsVariant } from './ui/Tabs';

export { Stepper } from './ui/Stepper';
export type {
  StepperProps,
  StepperItem,
  StepperState,
  StepperOrientation,
} from './ui/Stepper';

export {
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from './ui/DropdownMenu';
export type {
  DropdownMenuProps,
  DropdownItemProps,
} from './ui/DropdownMenu';

export { Breadcrumb } from './ui/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './ui/Breadcrumb';

/* Sidebar + NavItem + SidebarUserCard live in layout/ — they structure the app shell */
export { Sidebar, SidebarGroup, NavItem, SidebarUserCard } from './layout/Sidebar';
export type {
  SidebarProps,
  SidebarGroupProps,
  NavItemProps,
  SidebarUserCardProps,
} from './layout/Sidebar';

export { FloatingNavButton } from './FloatingNavButton';

/* ============================================================================
 * Layout primitives — structural vocabulary (Container / PageShell / Stack /
 * Cluster / Grid). Own width + spacing rhythm + flow only; never color/type.
 * ============================================================================ */
export { Container, PageShell, Stack, Cluster, Grid } from './layout';
export type {
  ContainerWidth,
  StackAlign,
  ClusterAlign,
  ClusterJustify,
  Space,
} from './layout';

/* ============================================================================
 * UI — Utilities & New Components
 * ============================================================================ */
export { Spinner } from './ui/Spinner';
export type { SpinnerProps } from './ui/Spinner';

export { NotificationBadge } from './ui/NotificationBadge';
export type { NotificationBadgeProps } from './ui/NotificationBadge';

export { Divider } from './ui/Divider';
export type { DividerProps } from './ui/Divider';

// KPICard deprecated → use StatCard directly

export { StatusBadge } from './ui/StatusBadge';
export type { StatusBadgeProps, StatusBadgeStatus } from './ui/StatusBadge';

export { SelectCheckboxFloating } from './ui/SelectCheckboxFloating';
export type { SelectCheckboxFloatingProps, SelectCheckboxFloatingOption } from './ui/SelectCheckboxFloating';

/* ============================================================================
 * Legacy UI Components (pre-spec, kept for backward compatibility)
 * ============================================================================ */
export { Achievement } from './ui/Achievement';
export { ActionCard } from './ui/ActionCard';
// GlassCard deprecated → use <Card variant="glass|glass-brand|glass-warm|glass-dark">
// SurfaceCard deprecated → use <Card variant="default|elevated|glass|bordered|muted|sunken">

export { MetaPill } from './ui/MetaPill';
export { MetaItem } from './ui/MetaItem';
export { ActivityItem } from './ui/ActivityItem';
export { IconFeatureCard } from './ui/IconFeatureCard';
export { UserInfo } from './ui/UserInfo';
export { TrendingBadge } from './ui/TrendingBadge';
export type { TrendingBadgeProps } from './ui/TrendingBadge';
export { MasteryBadge } from './ui/MasteryBadge';
export type { MasteryBadgeProps } from './ui/MasteryBadge';
// BackgroundBlobs supprimé (Phase 10) — utiliser AmbientBlobs (patterns/AmbientBlobs)
export { GoalProgress } from './ui/GoalProgress';
export type { GoalProgressProps } from './ui/GoalProgress';
export { ToastContainer } from './ui/ToastContainer';

/* ============================================================================
 * Patterns & Layouts
 * ============================================================================ */
export { CardGrid } from './patterns/CardGrid';
export type { CardGridProps } from './patterns/CardGrid';

export { MetaPillGroup } from './ui/MetaPillGroup';
export type { MetaPillGroupProps } from './ui/MetaPillGroup';

export { InlineProgress } from './patterns/InlineProgress';
export type { InlineProgressProps } from './patterns/InlineProgress';

export { ViewerProgressTrail } from './patterns/ViewerProgressTrail';
export type { ViewerProgressTrailProps, ViewerProgressStyle, ViewerProgressTone } from './patterns/ViewerProgressTrail';

// ToneAwareCard deprecated → use <Card variant="tinted" tone="primary|warm|sun">


// HeroSection sunset Phase 19.B-2026-05-26 → use PageHero from './patterns/EditorialHero'
// (features absorbées : backLink + progress + meta + trailing slots).

export { ParcoursCard } from './patterns/ParcoursCard';
export type { ParcoursCardProps, ParcoursTone, ParcoursStatus } from './patterns/ParcoursCard';

export { SectionHeader } from './patterns/SectionHeader';

export { PageHeader } from './patterns/PageHeader';

export { ActivityFeed } from './patterns/ActivityFeed';
export type { ActivityFeedProps } from './patterns/ActivityFeed';

export { CoachCardGrid } from './patterns/CoachCardGrid';
export type { CoachCardGridProps } from './patterns/CoachCardGrid';

// DashboardHero + LearningPathHeader deprecated → use PageHero (with backLink + progress slots if needed)

export { LearningPathGrid } from './patterns/LearningPathGrid';
export type { LearningPathGridProps } from './patterns/LearningPathGrid';

export { MultiStepForm } from './patterns/MultiStepForm';
export type { MultiStepFormProps, FormStep } from './patterns/MultiStepForm';

export { PageCard } from './patterns/PageCard';
export type { PageCardItem, PageCardGridProps } from './patterns/PageCard';

export { ResumeLessonCard } from './patterns/ResumeLessonCard';
export type { ResumeLessonCardProps, ResumeLessonTone } from './patterns/ResumeLessonCard';

export { ReaderContextStrip } from './patterns/ReaderContextStrip';
export type { ReaderContextStripProps } from './patterns/ReaderContextStrip';

export { PageHero, EditorialHero } from './patterns/EditorialHero';
export type {
  PageHeroProps,
  PageHeroEyebrow,
  PageHeroMetaItem,
  PageHeroTone,
  // Rétrocompat aliases (same shapes as PageHero*)
  EditorialHeroProps,
  EditorialHeroEyebrow,
  EditorialHeroMetaItem,
  EditorialHeroTone,
} from './patterns/EditorialHero';

export { EditorialLayout } from './patterns/EditorialLayout';
export type { EditorialLayoutProps } from './patterns/EditorialLayout';

export { SectionCard } from './patterns/SectionCard';
export type { SectionCardProps } from './patterns/SectionCard';

export { RelatedItemList } from './patterns/RelatedItemList';
export type { RelatedItemListProps, RelatedItem } from './patterns/RelatedItemList';

export {
  AuthShell,
  AuthDivider,
  AuthSocialButton,
  AuthSuccess,
} from './patterns/AuthShell';
export type {
  AuthShellProps,
  AuthSocialButtonProps,
  AuthSuccessProps,
} from './patterns/AuthShell';

export { ResourceCardGrid } from './patterns/ResourceCardGrid';
export type { ResourceCardGridProps } from './patterns/ResourceCardGrid';

// SettingsSection deprecated → use SectionCard with `actions` footer slot

export { VeilleCardFeed } from './patterns/VeilleCardFeed';
export type { VeilleCardFeedProps } from './patterns/VeilleCardFeed';

export { VeilleFormatShortcutCards } from './patterns/VeilleFormatShortcutCards';
export type {
  VeilleFormatShortcutCardsProps,
  VeilleFormatCard,
} from './patterns/VeilleFormatShortcutCards';

/* ============================================================================
 * Phase 14.1 — Première expérience flow
 * ============================================================================ */

export { OptionGrid } from './patterns/OptionGrid';
export type { OptionGridProps, OptionGridItem, OptionGridTone } from './patterns/OptionGrid';

export { DreyfusLevelSelector, DEFAULT_DREYFUS_LEVELS } from './ui/DreyfusLevelSelector';
export type { DreyfusLevelSelectorProps, DreyfusLevel, DreyfusLevelSelectorTone } from './ui/DreyfusLevelSelector';

export { CongratulationsCard } from './patterns/CongratulationsCard';
export type { CongratulationsCardProps, CongratulationsCardTone, CongratulationsCardXp } from './patterns/CongratulationsCard';

export { NextStepsGrid } from './patterns/NextStepsGrid';
export type { NextStepsGridProps, NextStepItem, NextStepTone } from './patterns/NextStepsGrid';

export { EmptyDashboardState } from './patterns/EmptyDashboardState';
export type { EmptyDashboardStateProps } from './patterns/EmptyDashboardState';

/* ============================================================================
 * Phase 14.2a — Apprenant core (navigation + viewer shell)
 * ============================================================================ */

export { ProgressDots } from './ui/ProgressDots';
export type { ProgressDotsProps, ProgressDotsSize } from './ui/ProgressDots';

export { LessonNavigation } from './patterns/LessonNavigation';
export type { LessonNavigationProps } from './patterns/LessonNavigation';

export {
  LessonProvider,
  useLessonContext,
  resolveAfterLessonRoute,
} from '../lib/lesson-context';
export type {
  LessonContextValue,
  LessonNeighbor,
  LessonProviderProps,
} from '../lib/lesson-context';

/* ============================================================================
 * NEW PATTERNS — Phase 3 Critical Patterns
 * ============================================================================ */

/* Tier 1: Essential Patterns */
export { FormLayout } from './patterns/FormLayout';
export type { FormLayoutProps, FormField, FormSection } from './patterns/FormLayout';

export { DataTable } from './patterns/DataTable';
export type {
  DataTableProps,
  DataTableColumn,
  DataTableRow,
  SortDirection,
} from './patterns/DataTable';

export { LessonCard } from './learning/LessonCard';
export type { LessonCardProps, LessonDifficulty, LessonTone } from './learning/LessonCard';

export { QuizQuestionCard } from './patterns/QuizQuestionCard';
export type { QuizQuestionCardProps, QuizOption } from './patterns/QuizQuestionCard';

export { TabsWithContent } from './patterns/TabsWithContent';
export type { TabsWithContentProps, TabWithContent } from './patterns/TabsWithContent';

/* Tier 2: Important Patterns */
export { Flashcard } from './patterns/Flashcard';
export type { FlashcardProps } from './patterns/Flashcard';

export { RatingModal } from './patterns/RatingModal';
export type { RatingModalProps } from './patterns/RatingModal';

// SearchWithFilters supprimé (Phase 10) — pattern composable :
//   <Search trailing={<button onClick={toggle}>...</button>} /> + <Card>{chips}</Card>
//   Voir Journal.tsx / Veille.tsx pour l'usage canonique.

// BreadcrumbNav deprecated → use <Breadcrumb variant="nav">


export { ActivityTimeline } from './patterns/ActivityTimeline';
export type { ActivityTimelineProps, TimelineItem, TimelineTone } from './patterns/ActivityTimeline';

/* ============================================================================
 * Figma DS — missing UI components (Combobox, QualitativeRating)
 * ============================================================================ */

export { Combobox } from './ui/Combobox';
export type { ComboboxProps, ComboboxOption, ComboboxSize, ComboboxStatus } from './ui/Combobox';

export { QualitativeRating, DEFAULT_QUALITATIVE_OPTIONS } from './ui/QualitativeRating';
export type {
  QualitativeRatingProps,
  QualitativeRatingOption,
  QualitativeRatingTone,
  QualitativeRatingSize,
} from './ui/QualitativeRating';

export { SelectCheckbox } from './ui/SelectCheckbox';
export type { SelectCheckboxProps, SelectCheckboxOption } from './ui/SelectCheckbox';

export { SelectCheckboxCategory } from './ui/SelectCheckboxCategory';
export type { SelectCheckboxCategoryProps, CategoryOption } from './ui/SelectCheckboxCategory';

export { SearchWithSuggestions } from './ui/SearchWithSuggestions';
export type { SearchWithSuggestionsProps, SearchSuggestion } from './ui/SearchWithSuggestions';

export { EtapeAccordion } from './patterns/EtapeAccordion';
export type { EtapeAccordionProps, EtapeAccordionVariant } from './patterns/EtapeAccordion';

export { AuthBackLink } from './patterns/AuthShell';
export type { AuthBackLinkProps } from './patterns/AuthShell';

/* ============================================================================
 * Figma DS — Journal components
 * ============================================================================ */

export { MoodSelector } from './ui/MoodSelector';
export type { MoodLevel, MoodSelectorProps } from './ui/MoodSelector';

export { JournalChatCompose } from './ui/JournalChatCompose';
export type { JournalChatComposeProps } from './ui/JournalChatCompose';

export { StructuredQuestionAccordion } from './ui/StructuredQuestionAccordion';
export type { StructuredQuestion, StructuredQuestionAccordionProps } from './ui/StructuredQuestionAccordion';

export { WritingPromptsAside } from './patterns/WritingPromptsAside';
export type { WritingPrompt, WritingPromptsAsideProps } from './patterns/WritingPromptsAside';

export { JournalTypeTile, JOURNAL_TYPE_ORDER } from './cards/JournalTypeTile';
export { JournalBubbleCard } from './cards/JournalBubbleCard';
export type { JournalBubbleType, JournalBubbleCardProps } from './cards/JournalBubbleCard';
