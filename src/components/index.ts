/* ============================================================================
 * Core Components
 * ============================================================================ */
export { Button } from './core/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './core/Button';

export { Card, CardEyebrow, CardTitle, CardDesc, CardFooter } from './core/Card';
export type { CardProps, CardVariant } from './core/Card';

export { Input, Field, Checkbox, Radio, Switch } from './core/Input';
export type {
  InputProps,
  FieldProps,
  CheckboxProps,
  RadioProps,
  SwitchProps,
  InputSize,
  InputStatus,
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
export type { SearchProps, SearchSize } from './ui/Search';

export { FilterChip } from './ui/FilterChip';
export type { FilterChipProps } from './ui/FilterChip';

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

export { ProgressRing } from './ui/ProgressRing';
export type { ProgressRingProps } from './ui/ProgressRing';

export { Steps } from './ui/Steps';
export type { StepsProps, StepItem, StepState } from './ui/Steps';

export { Celebration, InlineWin } from './ui/Celebration';
export type { CelebrationProps, InlineWinProps } from './ui/Celebration';

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

/* Sidebar + NavItem live in layout/ because they structure the app shell */
export { Sidebar, SidebarGroup, NavItem } from './layout/Sidebar';
export type {
  SidebarProps,
  SidebarGroupProps,
  NavItemProps,
} from './layout/Sidebar';

export { FloatingNavButton } from './FloatingNavButton';

/* ============================================================================
 * Legacy UI Components (pre-spec, kept for backward compatibility)
 * ============================================================================ */
export { Achievement } from './ui/Achievement';
export { ActionCard } from './ui/ActionCard';
export { GlassCard } from './ui/GlassCard';
export { SurfaceCard } from './ui/SurfaceCard';
export { SectionTitle } from './ui/SectionTitle';
export { MetaPill } from './ui/MetaPill';
export { MetaItem } from './ui/MetaItem';
export { ActivityItem } from './ui/ActivityItem';
export { IconFeatureCard } from './ui/IconFeatureCard';
export { UserInfo } from './ui/UserInfo';
export { TrendingBadge } from './ui/TrendingBadge';
export type { TrendingBadgeProps } from './ui/TrendingBadge';
export { MasteryBadge } from './ui/MasteryBadge';
export type { MasteryBadgeProps } from './ui/MasteryBadge';
export { BackgroundBlobs } from './ui/BackgroundBlobs';
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

export { ToneAwareCard } from './patterns/ToneAwareCard';
export type { ToneAwareCardProps } from './patterns/ToneAwareCard';

export { HeroSection } from './patterns/HeroSection';
export type { HeroSectionProps } from './patterns/HeroSection';

export { ParcoursCard } from './patterns/ParcoursCard';
export type { ParcoursCardProps, ParcoursTone, ParcoursStatus } from './patterns/ParcoursCard';
