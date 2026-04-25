/**
 * Plugin APIs Export
 * All WordPress plugin API wrappers in one place for easy importing
 *
 * Usage:
 *   import { userMgmtAPI, parcoursAPI, coachingAPI, ... } from '@/services/plugins';
 */

// User Management
export { userMgmtAPI } from './userMgmt';

// Learning & Courses
export { parcoursAPI } from './parcours';
export { competencesAPI } from './competences';
export { coachingAPI } from './coaching';

// Content & Progress
export { journalAPI } from './journal';
export { correctionsAPI } from './corrections';
export { monitoringAPI } from './monitoring';

// Collaboration & Projects
export { collaborationAPI } from './collaboration';

// User Experience
export { gamificationAPI } from './gamification';
export { notificationsAPI } from './notifications';
export { onboardingAPI } from './onboarding';
export { analyticsAPI } from './analytics';

// Memberships & Billing
export { membershipsAPI } from './memberships';
export { subscriptionsAPI } from './subscriptions';

// Communications & Integration
export { formsAPI } from './forms';
export { sendGridAPI } from './sendGrid';
export { zapierAPI } from './zapier';

// Payments
export { stripeAPI } from './stripe';

// Content Management
export { acfAPI } from './acf';
export { customPostTypesAPI } from './customPostTypes';

// Error Tracking
export { sentryAPI } from './sentry';

// Type exports intentionally omitted for now: plugin wrappers are still stabilizing.
