import React from 'react';
import { HeroSection } from './HeroSection';

/**
 * LearningPathHeader — DEPRECATED thin alias of HeroSection.
 *
 * Kept for backward compatibility. New code should use:
 *   <HeroSection
 *     variant="gradient" tone="primary"
 *     showBackButton onBack={...}
 *     eyebrow="Module 2"
 *     title="Fondamentaux du Leadership"
 *     description="..."
 *     progress={42}
 *     kpis={[{ icon, value, label }]}
 *   />
 *
 * Maps:
 *   category → eyebrow
 *   progress → progress (HeroSection renders the bar + label automatically)
 *   kpis     → kpis (interface unchanged)
 *   showBackButton + onBack → forwarded as-is
 */

export type LearningPathHeaderTone = 'primary' | 'warm' | 'sun';

export interface LearningPathKPI {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface LearningPathHeaderProps {
  title: string;
  category?: string;
  description?: string;
  progress?: number;
  kpis?: LearningPathKPI[];
  tone?: LearningPathHeaderTone;
  onBack?: () => void;
  showBackButton?: boolean;
  className?: string;
}

export const LearningPathHeader: React.FC<LearningPathHeaderProps> = ({
  title,
  category,
  description,
  progress,
  kpis,
  tone = 'primary',
  onBack,
  showBackButton = true,
  className = '',
}) => (
  <HeroSection
    variant="gradient"
    tone={tone}
    size="lg"
    showBackButton={showBackButton}
    onBack={onBack}
    eyebrow={category}
    title={title}
    description={description}
    progress={progress}
    kpis={kpis?.map((k) => ({ icon: k.icon, value: k.value, label: k.label }))}
    className={className}
  />
);

export default LearningPathHeader;
