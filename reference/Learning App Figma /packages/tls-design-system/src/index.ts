/**
 * @tls/design-system
 * The Learning Society Design System
 *
 * Composants React + Tailwind CSS pour applications TLS
 */

// ========================================
// COMMON COMPONENTS (Core TLS)
// ========================================

export { Button } from './components/common/Button';
export type { ButtonProps } from './components/common/Button';

export { Badge } from './components/common/Badge';
export type { BadgeProps } from './components/common/Badge';

export { Card } from './components/common/Card';

export { GlassCard } from './components/common/GlassCard';

export { SearchBar } from './components/common/SearchBar';

export { SearchBarWithFilters } from './components/common/SearchBarWithFilters';

export { FilterBar } from './components/common/FilterBar';

export { AdvancedFilterBar } from './components/common/AdvancedFilterBar';

export { InfoAlert } from './components/common/InfoAlert';

export { PageContainer } from './components/common/PageContainer';

export { SectionContainer } from './components/common/SectionContainer';

export { SectionHeader } from './components/common/SectionHeader';

export { PageHeaderSimple } from './components/common/PageHeaderSimple';


// ========================================
// UI COMPONENTS (Re-export from ui/ folder)
// ========================================

// Note: UI components are available for direct import from @tls/design-system/dist/components/ui/*
// Common components above are the main exports for typical usage

// Forms
export { Input } from './components/ui/input';
export { Checkbox } from './components/ui/checkbox';
export { Label } from './components/ui/label';

// Navigation
export * from './components/ui/breadcrumb';
export * from './components/ui/tabs';

// Feedback
export * from './components/ui/alert';

// Overlays
export * from './components/ui/dialog';

// Data Display
export * from './components/ui/card';
export * from './components/ui/table';
export { Badge as UIBadge } from './components/ui/badge';

// Layout
export * from './components/ui/accordion';

// TLS Specific
export { default as OptimizedSidebar } from './components/ui/optimized-sidebar';


// ========================================
// TYPES
// ========================================

export * from './types';
