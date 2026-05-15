/**
 * Access control helpers — Cahier #01 Phase 16.1.5
 *
 * Gating logic:
 *  - Type A: item prerequisites (must complete itemIds first)
 *  - Type B: competence Dreyfus minimum level
 *  - Tier gating: subscription tier required
 *
 * canAccessItem() returns:
 *  - { allowed: true } if no restrictions
 *  - { allowed: false, reason: 'tier' | 'prerequisite_items' | 'prerequisite_level', details: string }
 */

import type {
  DreyfusLevel,
  Prerequisites,
  SubscriptionTier,
} from '../types/learning';

export interface AccessCheckResult {
  allowed: boolean;
  reason?: 'tier' | 'prerequisite_items' | 'prerequisite_level';
  details?: string;
}

interface AccessCheckContext {
  userSubscriptionTier: SubscriptionTier;
  completedItemIds: Set<string>;
  learnerCompetencyLevels: Record<string, DreyfusLevel>;
}

/**
 * Check if a user can access an item based on:
 * - Subscription tier (tierGate)
 * - Completed prerequisites (itemIds)
 * - Competence Dreyfus levels
 */
export function canAccessItem(
  tierGate: SubscriptionTier[] | undefined,
  prerequisites: Prerequisites | undefined,
  context: AccessCheckContext
): AccessCheckResult {
  // Check tier gating
  if (tierGate && tierGate.length > 0) {
    if (!tierGate.includes(context.userSubscriptionTier)) {
      return {
        allowed: false,
        reason: 'tier',
        details: `Requires one of: ${tierGate.join(', ')}`,
      };
    }
  }

  // Check Type A prerequisites (completed items)
  if (prerequisites?.itemIds && prerequisites.itemIds.length > 0) {
    const missingItems = prerequisites.itemIds.filter(
      (id) => !context.completedItemIds.has(id)
    );
    if (missingItems.length > 0) {
      return {
        allowed: false,
        reason: 'prerequisite_items',
        details: `Complete ${missingItems.length} item(s) first`,
      };
    }
  }

  // Check Type B prerequisites (competence levels)
  if (
    prerequisites?.competencyMinLevel &&
    prerequisites.competencyMinLevel.length > 0
  ) {
    const failedLevels = prerequisites.competencyMinLevel.filter((req) => {
      const userLevel = context.learnerCompetencyLevels[req.competenceId] ?? 0;
      return userLevel < req.minLevel;
    });

    if (failedLevels.length > 0) {
      const missing = failedLevels
        .map(
          (req) =>
            `${req.competenceId} (need D${req.minLevel}, have D${context.learnerCompetencyLevels[req.competenceId] ?? 0})`
        )
        .join(', ');
      return {
        allowed: false,
        reason: 'prerequisite_level',
        details: `Required level: ${missing}`,
      };
    }
  }

  return { allowed: true };
}

/**
 * Human-readable access denial message for UI display
 */
export function getAccessDenialMessage(result: AccessCheckResult): string {
  if (result.allowed) return '';

  switch (result.reason) {
    case 'tier':
      return `Upgrade your subscription to access this content`;
    case 'prerequisite_items':
      return `Complete prerequisite items first (${result.details})`;
    case 'prerequisite_level':
      return `Reach the required competence level (${result.details})`;
    default:
      return 'Access restricted';
  }
}

/**
 * Returns the type of gating for UI badge display
 */
export function getGatingType(
  tierGate: SubscriptionTier[] | undefined,
  prerequisites: Prerequisites | undefined
): 'tier' | 'prerequisite' | 'none' {
  if (tierGate && tierGate.length > 0) return 'tier';
  if (
    prerequisites &&
    ((prerequisites.itemIds && prerequisites.itemIds.length > 0) ||
      (prerequisites.competencyMinLevel &&
        prerequisites.competencyMinLevel.length > 0))
  ) {
    return 'prerequisite';
  }
  return 'none';
}
