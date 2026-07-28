/**
 * routesManifest — GÉNÉRÉ, NE PAS ÉDITER À LA MAIN.
 *
 * Source : les <Route> de src/App.tsx.
 * Régénérer :  node scripts/gen-routes-manifest.mjs
 *
 * 180 routes au moment de la génération.
 */

export type RouteAudience = 'apprenant' | 'coach' | 'manager' | 'entreprise' | 'marketing' | 'systeme';

export interface RouteEntry {
  /** Chemin absolu, imbrication résolue. */
  path: string;
  /** Composant rendu par la route, tel que lu dans App.tsx. */
  component: string | null;
  /** Premier segment d'URL — sert de regroupement. */
  section: string;
  audience: RouteAudience;
  /** Liens entrants trouvés statiquement. 0 = route non atteignable par l'UI. */
  inbound: number;
  /** Échantillon des fichiers qui pointent dessus. */
  linkedFrom: string[];
}

export const ROUTES: RouteEntry[] = [
  {
    "path": "/_bg-lab",
    "component": "BgLab",
    "section": "_bg-lab",
    "audience": "systeme",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/_card-lab",
    "component": "CardLab",
    "section": "_card-lab",
    "audience": "systeme",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/_design-lab",
    "component": "DesignLab",
    "section": "_design-lab",
    "audience": "systeme",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/*",
    "component": "AppLayout",
    "section": "*",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/account",
    "component": "Account",
    "section": "account",
    "audience": "apprenant",
    "inbound": 7,
    "linkedFrom": [
      "App.tsx",
      "components/modals/BookingModal.tsx",
      "components/patterns/AccountFamilyNav.tsx"
    ]
  },
  {
    "path": "/account/billing",
    "component": "Billing",
    "section": "account",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "components/modals/BookingModal.tsx",
      "components/patterns/AccountFamilyNav.tsx",
      "pages/Billing.tsx"
    ]
  },
  {
    "path": "/account/billing/credits/buy",
    "component": "PurchaseCredits",
    "section": "account",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/Billing.tsx"
    ]
  },
  {
    "path": "/analytics/dashboard",
    "component": "AnalyticsDashboard",
    "section": "analytics",
    "audience": "entreprise",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/api-docs",
    "component": "ApiDocs",
    "section": "api-docs",
    "audience": "systeme",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/assistant",
    "component": "ChatInterface",
    "section": "assistant",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/assistant/history",
    "component": "ChatHistoryPanel",
    "section": "assistant",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/ateliers",
    "component": "AtelierHub",
    "section": "ateliers",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/AtelierWaitlist.tsx"
    ]
  },
  {
    "path": "/ateliers/:id",
    "component": "AtelierDetail",
    "section": "ateliers",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/AtelierWaitlist.tsx"
    ]
  },
  {
    "path": "/ateliers/:id/live",
    "component": "AtelierLive",
    "section": "ateliers",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/AtelierWaitlist.tsx"
    ]
  },
  {
    "path": "/ateliers/:id/presentiel",
    "component": "AtelierPresentiel",
    "section": "ateliers",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/AtelierWaitlist.tsx"
    ]
  },
  {
    "path": "/ateliers/:id/recap",
    "component": "AtelierRecap",
    "section": "ateliers",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/AtelierWaitlist.tsx"
    ]
  },
  {
    "path": "/ateliers/:id/waitlist",
    "component": "AtelierWaitlist",
    "section": "ateliers",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/AtelierWaitlist.tsx"
    ]
  },
  {
    "path": "/auth/forgot-password",
    "component": "ForgotPassword",
    "section": "auth",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/Login.tsx"
    ]
  },
  {
    "path": "/auth/login",
    "component": "Login",
    "section": "auth",
    "audience": "apprenant",
    "inbound": 7,
    "linkedFrom": [
      "pages/AppLanding.tsx",
      "pages/ForgotPassword.tsx",
      "pages/MagicLink.tsx"
    ]
  },
  {
    "path": "/auth/magic-link",
    "component": "MagicLink",
    "section": "auth",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/auth/reset-password",
    "component": "ResetPassword",
    "section": "auth",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/auth/signup",
    "component": "Signup",
    "section": "auth",
    "audience": "apprenant",
    "inbound": 4,
    "linkedFrom": [
      "pages/AppLanding.tsx",
      "pages/Login.tsx",
      "pages/MagicLink.tsx"
    ]
  },
  {
    "path": "/auth/verify-email",
    "component": "VerifyEmail",
    "section": "auth",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/Signup.tsx"
    ]
  },
  {
    "path": "/coach/alertes/stagnation",
    "component": "AlerteStagnation",
    "section": "coach",
    "audience": "coach",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coach/analytics",
    "component": "CoachAnalytics",
    "section": "coach",
    "audience": "coach",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coach/apprenant/:id",
    "component": "CoachLearnerProfile",
    "section": "coach",
    "audience": "coach",
    "inbound": 6,
    "linkedFrom": [
      "pages/CoachApprenants.tsx",
      "pages/CoachDashboard.tsx",
      "pages/CoachHeatmap.tsx"
    ]
  },
  {
    "path": "/coach/apprenant/:id/analytics",
    "component": "FicheApprenantAnalytics",
    "section": "coach",
    "audience": "coach",
    "inbound": 6,
    "linkedFrom": [
      "pages/CoachApprenants.tsx",
      "pages/CoachDashboard.tsx",
      "pages/CoachHeatmap.tsx"
    ]
  },
  {
    "path": "/coach/apprenants",
    "component": "CoachApprenants",
    "section": "coach",
    "audience": "coach",
    "inbound": 1,
    "linkedFrom": [
      "pages/CoachLearnerProfile.tsx"
    ]
  },
  {
    "path": "/coach/calendar",
    "component": "CoachCalendar",
    "section": "coach",
    "audience": "coach",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coach/correction/:id",
    "component": "CoachCorrectionInterface",
    "section": "coach",
    "audience": "coach",
    "inbound": 2,
    "linkedFrom": [
      "pages/CoachCorrectionsQueue.tsx",
      "pages/CoachDashboard.tsx"
    ]
  },
  {
    "path": "/coach/corrections",
    "component": "CoachCorrectionsQueue",
    "section": "coach",
    "audience": "coach",
    "inbound": 1,
    "linkedFrom": [
      "pages/CoachDashboard.tsx"
    ]
  },
  {
    "path": "/coach/dashboard",
    "component": "CoachDashboard",
    "section": "coach",
    "audience": "coach",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coach/engagement",
    "component": "CoachEngagement",
    "section": "coach",
    "audience": "coach",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coach/enterprise-dashboard",
    "component": "CoachEnterpriseDashboard",
    "section": "coach",
    "audience": "coach",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coach/journal",
    "component": "CoachJournal",
    "section": "coach",
    "audience": "coach",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coach/journal/:id",
    "component": "CoachJournalDetail",
    "section": "coach",
    "audience": "coach",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coach/passeport",
    "component": "CoachHeatmap",
    "section": "coach",
    "audience": "coach",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coach/team-dashboard",
    "component": "CoachTeamDashboard",
    "section": "coach",
    "audience": "coach",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coaching",
    "component": "Coaching",
    "section": "coaching",
    "audience": "apprenant",
    "inbound": 16,
    "linkedFrom": [
      "App.tsx",
      "components/layout/BottomNav.tsx",
      "components/patterns/AppBreadcrumb.tsx"
    ]
  },
  {
    "path": "/coaching/booking",
    "component": "CoachingBookingFlow",
    "section": "coaching",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coaching/coach/:id",
    "component": "CoachProfileView",
    "section": "coaching",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coaching/compte-rendu/:id",
    "component": "CoachingCompteRendu",
    "section": "coaching",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "pages/Coaching.tsx",
      "pages/Dashboard.tsx",
      "pages/Journal.tsx"
    ]
  },
  {
    "path": "/coaching/correction/:id",
    "component": "CorrectionDetailLearner",
    "section": "coaching",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coaching/corrections",
    "component": "CoachingCorrections",
    "section": "coaching",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coaching/messages/:coachId",
    "component": "MessagingThread",
    "section": "coaching",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coaching/pre-questionnaire",
    "component": "PreCoachingQuestionnaire",
    "section": "coaching",
    "audience": "apprenant",
    "inbound": 6,
    "linkedFrom": [
      "pages/Coaching.tsx",
      "pages/CoachingBookingFlow.tsx",
      "pages/Components.tsx"
    ]
  },
  {
    "path": "/coaching/pre-questionnaire/response",
    "component": "PreCoachingQuestionnaireResponse",
    "section": "coaching",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/PreCoachingQuestionnaire.tsx"
    ]
  },
  {
    "path": "/coaching/recommendations",
    "component": "ItemRecommendations",
    "section": "coaching",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/coaching/session/:id",
    "component": "CoachingSessionDetail",
    "section": "coaching",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/collaboration",
    "component": "Collaboration",
    "section": "collaboration",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "App.tsx",
      "pages/Components.tsx"
    ]
  },
  {
    "path": "/components",
    "component": "Components",
    "section": "components",
    "audience": "systeme",
    "inbound": 1,
    "linkedFrom": [
      "App.tsx"
    ]
  },
  {
    "path": "/course/:id",
    "component": "CourseDetail",
    "section": "course",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/dashboard",
    "component": "Dashboard",
    "section": "dashboard",
    "audience": "apprenant",
    "inbound": 11,
    "linkedFrom": [
      "pages/Components.tsx",
      "pages/DesignLab.tsx",
      "pages/Error404.tsx"
    ]
  },
  {
    "path": "/dashboard/achievements",
    "component": "DashboardAchievements",
    "section": "dashboard",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/dashboard/competence/:id",
    "component": "DashboardCompetenceDetail",
    "section": "dashboard",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/enterprise",
    "component": "Enterprise",
    "section": "enterprise",
    "audience": "entreprise",
    "inbound": 1,
    "linkedFrom": [
      "App.tsx"
    ]
  },
  {
    "path": "/enterprise/alertes/inactivite",
    "component": "AlerteInactivite",
    "section": "enterprise",
    "audience": "entreprise",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/enterprise/dashboard",
    "component": "EnterpriseAnalyticsDashboard",
    "section": "enterprise",
    "audience": "entreprise",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/enterprise/kpis",
    "component": "EnterpriseKpis",
    "section": "enterprise",
    "audience": "entreprise",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/enterprise/webhooks",
    "component": "WebhooksManagement",
    "section": "enterprise",
    "audience": "entreprise",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/error/404",
    "component": "Error404",
    "section": "error",
    "audience": "systeme",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/error/500",
    "component": "Error500",
    "section": "error",
    "audience": "systeme",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/evenements",
    "component": "EvenementHub",
    "section": "evenements",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/evenements/:id",
    "component": "EvenementDetail",
    "section": "evenements",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/evenements/:id/live",
    "component": "EvenementLive",
    "section": "evenements",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/evenements/:id/recap",
    "component": "EvenementRecap",
    "section": "evenements",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/gamification",
    "component": "Gamification",
    "section": "gamification",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "pages/BadgeDetail.tsx",
      "pages/DashboardAchievements.tsx",
      "pages/ProfileBadgesCompetences.tsx"
    ]
  },
  {
    "path": "/gamification/badge/:id",
    "component": "BadgeDetail",
    "section": "gamification",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "pages/BadgeDetail.tsx",
      "pages/DashboardAchievements.tsx",
      "pages/ProfileBadgesCompetences.tsx"
    ]
  },
  {
    "path": "/gamification/badges",
    "component": "BadgeGallery",
    "section": "gamification",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/BadgeDetail.tsx",
      "pages/DashboardAchievements.tsx"
    ]
  },
  {
    "path": "/gamification/streaks",
    "component": "StreakDetail",
    "section": "gamification",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/gamification/xp",
    "component": "XPDashboard",
    "section": "gamification",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/help",
    "component": "Help",
    "section": "help",
    "audience": "apprenant",
    "inbound": 8,
    "linkedFrom": [
      "App.tsx",
      "pages/HelpArticle.tsx",
      "pages/HelpSearch.tsx"
    ]
  },
  {
    "path": "/help/article/:id",
    "component": "HelpArticle",
    "section": "help",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/HelpArticle.tsx",
      "pages/HelpSearch.tsx"
    ]
  },
  {
    "path": "/help/search",
    "component": "HelpSearch",
    "section": "help",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/help/tickets",
    "component": "HelpTickets",
    "section": "help",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "pages/HelpTicketDetail.tsx",
      "pages/HelpTicketNew.tsx",
      "pages/HelpTickets.tsx"
    ]
  },
  {
    "path": "/help/tickets/:id",
    "component": "HelpTicketDetail",
    "section": "help",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "pages/HelpTicketDetail.tsx",
      "pages/HelpTicketNew.tsx",
      "pages/HelpTickets.tsx"
    ]
  },
  {
    "path": "/help/tickets/new",
    "component": "HelpTicketNew",
    "section": "help",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/HelpTickets.tsx"
    ]
  },
  {
    "path": "/help/tutorials",
    "component": "HelpTutorials",
    "section": "help",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/HelpTutorials.tsx"
    ]
  },
  {
    "path": "/help/tutorials/:id/step/:stepId",
    "component": "HelpTutorialStep",
    "section": "help",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/HelpTutorials.tsx"
    ]
  },
  {
    "path": "/inscription",
    "component": "AppLanding",
    "section": "inscription",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/journal",
    "component": "Journal",
    "section": "journal",
    "audience": "apprenant",
    "inbound": 15,
    "linkedFrom": [
      "App.tsx",
      "components/cards/JournalBubbleCard.tsx",
      "components/cards/JournalEntryCard.tsx"
    ]
  },
  {
    "path": "/journal/detail/:id",
    "component": "JournalDetail",
    "section": "journal",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "components/cards/JournalBubbleCard.tsx",
      "pages/Components.tsx",
      "pages/Journal.tsx"
    ]
  },
  {
    "path": "/journal/free-entry",
    "component": "JournalFreeEntry",
    "section": "journal",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/Components.tsx"
    ]
  },
  {
    "path": "/journal/new-entry",
    "component": "JournalNewEntry",
    "section": "journal",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/Components.tsx",
      "pages/JournalDetail.tsx"
    ]
  },
  {
    "path": "/journal/search",
    "component": "JournalSearch",
    "section": "journal",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/leaderboard",
    "component": "Leaderboard",
    "section": "leaderboard",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "App.tsx",
      "pages/Components.tsx",
      "pages/DashboardAchievements.tsx"
    ]
  },
  {
    "path": "/learning-flow",
    "component": "LearningFlow",
    "section": "learning-flow",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/learning-paths",
    "component": "LearningPaths",
    "section": "learning-paths",
    "audience": "apprenant",
    "inbound": 19,
    "linkedFrom": [
      "App.tsx",
      "components/layout/BottomNav.tsx",
      "components/marketing/FooterMinimal.tsx"
    ]
  },
  {
    "path": "/learning-paths/:id",
    "component": "LearningPathDetail",
    "section": "learning-paths",
    "audience": "apprenant",
    "inbound": 19,
    "linkedFrom": [
      "App.tsx",
      "components/layout/BottomNav.tsx",
      "components/marketing/FooterMinimal.tsx"
    ]
  },
  {
    "path": "/learning-paths/:id/positionnement",
    "component": "Positionnement",
    "section": "learning-paths",
    "audience": "apprenant",
    "inbound": 19,
    "linkedFrom": [
      "App.tsx",
      "components/layout/BottomNav.tsx",
      "components/marketing/FooterMinimal.tsx"
    ]
  },
  {
    "path": "/learning-paths/:pathId/lessons/:lessonId",
    "component": "LessonPlayer",
    "section": "learning-paths",
    "audience": "apprenant",
    "inbound": 19,
    "linkedFrom": [
      "App.tsx",
      "components/layout/BottomNav.tsx",
      "components/marketing/FooterMinimal.tsx"
    ]
  },
  {
    "path": "/learning-space",
    "component": "LearningSpace",
    "section": "learning-space",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "App.tsx",
      "components/modals/CompletionModal.tsx",
      "pages/LearningFlow.tsx"
    ]
  },
  {
    "path": "/lesson/:id/astuces",
    "component": "AstucesViewer",
    "section": "lesson",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/LearningFlow.tsx",
      "pages/LearningPathDetail.tsx"
    ]
  },
  {
    "path": "/lesson/:id/complementary",
    "component": "ComplementaryContentViewer",
    "section": "lesson",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/LearningFlow.tsx",
      "pages/LearningPathDetail.tsx"
    ]
  },
  {
    "path": "/lesson/:id/flashcards",
    "component": "FlashcardsViewer",
    "section": "lesson",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/LearningFlow.tsx",
      "pages/LearningPathDetail.tsx"
    ]
  },
  {
    "path": "/manager/alerts",
    "component": "ManagerAlerts",
    "section": "manager",
    "audience": "manager",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/manager/cohort",
    "component": "ManagerCohort",
    "section": "manager",
    "audience": "manager",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/manager/enterprise",
    "component": "ManagerEnterprise",
    "section": "manager",
    "audience": "manager",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/manager/export",
    "component": "ManagerExport",
    "section": "manager",
    "audience": "manager",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/manager/views/builder",
    "component": "ManagerViewsBuilder",
    "section": "manager",
    "audience": "manager",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/masterclass",
    "component": "MasterclassHub",
    "section": "masterclass",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/MasterclassDetail.tsx",
      "pages/MasterclassSurvey.tsx"
    ]
  },
  {
    "path": "/masterclass/:id",
    "component": "MasterclassDetail",
    "section": "masterclass",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/MasterclassDetail.tsx",
      "pages/MasterclassSurvey.tsx"
    ]
  },
  {
    "path": "/masterclass/:id/live",
    "component": "MasterclassLive",
    "section": "masterclass",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/MasterclassDetail.tsx",
      "pages/MasterclassSurvey.tsx"
    ]
  },
  {
    "path": "/masterclass/:id/replay",
    "component": "MasterclassReplay",
    "section": "masterclass",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/MasterclassDetail.tsx",
      "pages/MasterclassSurvey.tsx"
    ]
  },
  {
    "path": "/masterclass/:id/survey",
    "component": "MasterclassSurvey",
    "section": "masterclass",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/MasterclassDetail.tsx",
      "pages/MasterclassSurvey.tsx"
    ]
  },
  {
    "path": "/messages",
    "component": "Messages",
    "section": "messages",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "App.tsx",
      "pages/Coaching.tsx",
      "pages/Components.tsx"
    ]
  },
  {
    "path": "/monitoring",
    "component": "Navigate",
    "section": "monitoring",
    "audience": "systeme",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/notifications",
    "component": "Notifications",
    "section": "notifications",
    "audience": "apprenant",
    "inbound": 5,
    "linkedFrom": [
      "App.tsx",
      "components/patterns/AccountFamilyNav.tsx",
      "pages/Components.tsx"
    ]
  },
  {
    "path": "/notifications/preferences",
    "component": "NotificationPreferences",
    "section": "notifications",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "components/patterns/AccountFamilyNav.tsx",
      "pages/Notifications.tsx"
    ]
  },
  {
    "path": "/onboarding",
    "component": "OnboardingUnified",
    "section": "onboarding",
    "audience": "apprenant",
    "inbound": 10,
    "linkedFrom": [
      "App.tsx",
      "components/patterns/AppBreadcrumb.tsx",
      "pages/Onboarding.tsx"
    ]
  },
  {
    "path": "/onboarding-preview",
    "component": "OnboardingPreview",
    "section": "onboarding-preview",
    "audience": "systeme",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/onboarding/legacy",
    "component": "Onboarding",
    "section": "onboarding",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/onboarding/payment",
    "component": "SubscriptionPayment",
    "section": "onboarding",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/OnboardingQuestionnaire.tsx",
      "pages/OnboardingUnified.tsx"
    ]
  },
  {
    "path": "/onboarding/questionnaire",
    "component": "OnboardingQuestionnaire",
    "section": "onboarding",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/Onboarding.tsx"
    ]
  },
  {
    "path": "/onboarding/success",
    "component": "OnboardingSuccess",
    "section": "onboarding",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/OnboardingTutorial.tsx"
    ]
  },
  {
    "path": "/onboarding/tutorial",
    "component": "OnboardingTutorial",
    "section": "onboarding",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "pages/OnboardingQuestionnaire.tsx",
      "pages/OnboardingSuccess.tsx",
      "pages/SubscriptionPayment.tsx"
    ]
  },
  {
    "path": "/pages-index",
    "component": "PagesIndex",
    "section": "pages-index",
    "audience": "systeme",
    "inbound": 1,
    "linkedFrom": [
      "App.tsx"
    ]
  },
  {
    "path": "/passeport",
    "component": "Passeport",
    "section": "passeport",
    "audience": "apprenant",
    "inbound": 4,
    "linkedFrom": [
      "components/patterns/EmptyDashboardState.tsx",
      "pages/OnboardingSuccess.tsx",
      "pages/Passeport.tsx"
    ]
  },
  {
    "path": "/passeport/competence/:id",
    "component": "PasseportCompetenceDetail",
    "section": "passeport",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/Passeport.tsx"
    ]
  },
  {
    "path": "/passeport/historique",
    "component": "PasseportHistorique",
    "section": "passeport",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/passeport/jac",
    "component": "PasseportJac",
    "section": "passeport",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/passeport/objectifs",
    "component": "PasseportObjectifs",
    "section": "passeport",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/passeport/roadmap",
    "component": "PasseportRoadmap",
    "section": "passeport",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/profile",
    "component": "Profile",
    "section": "profile",
    "audience": "apprenant",
    "inbound": 7,
    "linkedFrom": [
      "App.tsx",
      "components/patterns/AccountFamilyNav.tsx",
      "pages/Account.tsx"
    ]
  },
  {
    "path": "/profile/badges/competences",
    "component": "ProfileBadgesCompetences",
    "section": "profile",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/BadgeDetail.tsx",
      "pages/Leaderboard.tsx"
    ]
  },
  {
    "path": "/profile/consent",
    "component": "Navigate",
    "section": "profile",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/profile/credits",
    "component": "Navigate",
    "section": "profile",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/profile/credits/buy",
    "component": "Navigate",
    "section": "profile",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/profile/open-badges",
    "component": "OpenBadgesSection",
    "section": "profile",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/profile/privacy",
    "component": "ProfilePrivacy",
    "section": "profile",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "components/patterns/AccountFamilyNav.tsx",
      "pages/Account.tsx",
      "pages/ProfilePrivacy.tsx"
    ]
  },
  {
    "path": "/profile/privacy/delete-account",
    "component": "PrivacyDeleteAccount",
    "section": "profile",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/Account.tsx",
      "pages/ProfilePrivacy.tsx"
    ]
  },
  {
    "path": "/profile/privacy/dsar",
    "component": "PrivacyDsar",
    "section": "profile",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/Account.tsx",
      "pages/ProfilePrivacy.tsx"
    ]
  },
  {
    "path": "/project/:id",
    "component": "Project",
    "section": "project",
    "audience": "apprenant",
    "inbound": 7,
    "linkedFrom": [
      "pages/LearningPathDetail.tsx",
      "pages/Project.tsx",
      "pages/ProjectJac.tsx"
    ]
  },
  {
    "path": "/project/:id/jac",
    "component": "ProjectJac",
    "section": "project",
    "audience": "apprenant",
    "inbound": 7,
    "linkedFrom": [
      "pages/LearningPathDetail.tsx",
      "pages/Project.tsx",
      "pages/ProjectJac.tsx"
    ]
  },
  {
    "path": "/project/:id/passeport",
    "component": "ProjectPasseportFeed",
    "section": "project",
    "audience": "apprenant",
    "inbound": 7,
    "linkedFrom": [
      "pages/LearningPathDetail.tsx",
      "pages/Project.tsx",
      "pages/ProjectJac.tsx"
    ]
  },
  {
    "path": "/project/:id/skill-gaps",
    "component": "ProjectSkillGaps",
    "section": "project",
    "audience": "apprenant",
    "inbound": 7,
    "linkedFrom": [
      "pages/LearningPathDetail.tsx",
      "pages/Project.tsx",
      "pages/ProjectJac.tsx"
    ]
  },
  {
    "path": "/project/:id/task/:taskId",
    "component": "ProjectTask",
    "section": "project",
    "audience": "apprenant",
    "inbound": 7,
    "linkedFrom": [
      "pages/LearningPathDetail.tsx",
      "pages/Project.tsx",
      "pages/ProjectJac.tsx"
    ]
  },
  {
    "path": "/project/:id/team",
    "component": "ProjectTeam",
    "section": "project",
    "audience": "apprenant",
    "inbound": 7,
    "linkedFrom": [
      "pages/LearningPathDetail.tsx",
      "pages/Project.tsx",
      "pages/ProjectJac.tsx"
    ]
  },
  {
    "path": "/projects",
    "component": "ProjectsList",
    "section": "projects",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "pages/LearningFlow.tsx",
      "pages/Project.tsx"
    ]
  },
  {
    "path": "/settings",
    "component": "Navigate",
    "section": "settings",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/veille",
    "component": "Veille",
    "section": "veille",
    "audience": "apprenant",
    "inbound": 18,
    "linkedFrom": [
      "App.tsx",
      "components/layout/BottomNav.tsx",
      "components/patterns/AppBreadcrumb.tsx"
    ]
  },
  {
    "path": "/veille/article/:id",
    "component": "ArticleDetail",
    "section": "veille",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "pages/Components.tsx",
      "pages/Recherche.tsx",
      "pages/WeeklyNewsDetail.tsx"
    ]
  },
  {
    "path": "/veille/dossier/:id",
    "component": "Dossier",
    "section": "veille",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "pages/ArticleDetail.tsx",
      "pages/Components.tsx",
      "pages/WeeklyNewsDetail.tsx"
    ]
  },
  {
    "path": "/veille/magazine",
    "component": "Magazine",
    "section": "veille",
    "audience": "apprenant",
    "inbound": 4,
    "linkedFrom": [
      "components/patterns/AppBreadcrumb.tsx",
      "components/patterns/VeilleFormatShortcutCards.tsx",
      "pages/Components.tsx"
    ]
  },
  {
    "path": "/veille/magazine-article/:id",
    "component": "MagazineArticle",
    "section": "veille",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "pages/Components.tsx",
      "pages/Magazine.tsx",
      "pages/MagazineArticle.tsx"
    ]
  },
  {
    "path": "/veille/newsletter",
    "component": "Newsletter",
    "section": "veille",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "components/patterns/VeilleFormatShortcutCards.tsx",
      "pages/Components.tsx",
      "pages/Veille.tsx"
    ]
  },
  {
    "path": "/veille/perplexity/:id",
    "component": "PerplexityContentDetail",
    "section": "veille",
    "audience": "apprenant",
    "inbound": 1,
    "linkedFrom": [
      "pages/PerplexityContentDetail.tsx"
    ]
  },
  {
    "path": "/veille/video-reels",
    "component": "VideoReels",
    "section": "veille",
    "audience": "apprenant",
    "inbound": 2,
    "linkedFrom": [
      "components/patterns/VeilleFormatShortcutCards.tsx",
      "pages/Components.tsx"
    ]
  },
  {
    "path": "/veille/video-tutorial/:id",
    "component": "VideoTutorial",
    "section": "veille",
    "audience": "apprenant",
    "inbound": 5,
    "linkedFrom": [
      "pages/ArticleDetail.tsx",
      "pages/Components.tsx",
      "pages/Recherche.tsx"
    ]
  },
  {
    "path": "/veille/video/:id",
    "component": "VideoViewer",
    "section": "veille",
    "audience": "apprenant",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/veille/weekly-news/:id",
    "component": "WeeklyNewsDetail",
    "section": "veille",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "pages/ArticleDetail.tsx",
      "pages/Components.tsx",
      "pages/WeeklyNewsletter.tsx"
    ]
  },
  {
    "path": "/veille/weekly-newsletter",
    "component": "WeeklyNewsletter",
    "section": "veille",
    "audience": "apprenant",
    "inbound": 3,
    "linkedFrom": [
      "components/patterns/VeilleFormatShortcutCards.tsx",
      "pages/Components.tsx",
      "pages/Newsletter.tsx"
    ]
  },
  {
    "path": "/website",
    "component": "MarketingLayout",
    "section": "website",
    "audience": "marketing",
    "inbound": 27,
    "linkedFrom": [
      "components/marketing/FooterMinimal.tsx",
      "pages/AppLanding.tsx",
      "pages/marketing/MarketingAccompagnement.tsx"
    ]
  },
  {
    "path": "/website/_v2-jardin",
    "component": "HomeJardinVivantV2",
    "section": "website",
    "audience": "marketing",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/website/accompagnement",
    "component": "MarketingAccompagnement",
    "section": "website",
    "audience": "marketing",
    "inbound": 8,
    "linkedFrom": [
      "pages/marketing/MarketingArticleDetail.tsx",
      "pages/marketing/MarketingContact.tsx",
      "pages/marketing/MarketingDiagnostic.tsx"
    ]
  },
  {
    "path": "/website/cgv-cgu",
    "component": "MarketingCgvCgu",
    "section": "website",
    "audience": "marketing",
    "inbound": 3,
    "linkedFrom": [
      "components/marketing/FooterMinimal.tsx",
      "pages/AppLanding.tsx",
      "pages/marketing/components/MarketingFooter.tsx"
    ]
  },
  {
    "path": "/website/charte-ia",
    "component": "MarketingCharteIA",
    "section": "website",
    "audience": "marketing",
    "inbound": 2,
    "linkedFrom": [
      "components/marketing/FooterMinimal.tsx",
      "pages/marketing/components/MarketingFooter.tsx"
    ]
  },
  {
    "path": "/website/contact",
    "component": "MarketingContact",
    "section": "website",
    "audience": "marketing",
    "inbound": 13,
    "linkedFrom": [
      "pages/AppLanding.tsx",
      "pages/marketing/MarketingAccompagnement.tsx",
      "pages/marketing/MarketingDiagnostic.tsx"
    ]
  },
  {
    "path": "/website/diagnostic",
    "component": "MarketingDiagnostic",
    "section": "website",
    "audience": "marketing",
    "inbound": 5,
    "linkedFrom": [
      "pages/marketing/MarketingEquipe.tsx",
      "pages/marketing/MarketingHome.tsx",
      "pages/marketing/MarketingLearningApp.tsx"
    ]
  },
  {
    "path": "/website/dossiers",
    "component": "Navigate",
    "section": "website",
    "audience": "marketing",
    "inbound": 1,
    "linkedFrom": [
      "pages/marketing/MarketingResources.tsx"
    ]
  },
  {
    "path": "/website/dossiers/:slug",
    "component": "MarketingDossierDetail",
    "section": "website",
    "audience": "marketing",
    "inbound": 1,
    "linkedFrom": [
      "pages/marketing/MarketingResources.tsx"
    ]
  },
  {
    "path": "/website/equipe",
    "component": "MarketingEquipe",
    "section": "website",
    "audience": "marketing",
    "inbound": 2,
    "linkedFrom": [
      "pages/marketing/MarketingHome.tsx",
      "pages/marketing/components/MarketingFooter.tsx"
    ]
  },
  {
    "path": "/website/formation",
    "component": "Navigate",
    "section": "website",
    "audience": "marketing",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/website/guides/:slug",
    "component": "MarketingGuideDetail",
    "section": "website",
    "audience": "marketing",
    "inbound": 2,
    "linkedFrom": [
      "pages/marketing/MarketingGuideDetail.tsx",
      "pages/marketing/MarketingResources.tsx"
    ]
  },
  {
    "path": "/website/learning-app",
    "component": "MarketingLearningApp",
    "section": "website",
    "audience": "marketing",
    "inbound": 12,
    "linkedFrom": [
      "pages/marketing/MarketingAccompagnement.tsx",
      "pages/marketing/MarketingArticleDetail.tsx",
      "pages/marketing/MarketingContact.tsx"
    ]
  },
  {
    "path": "/website/magazine",
    "component": "Navigate",
    "section": "website",
    "audience": "marketing",
    "inbound": 2,
    "linkedFrom": [
      "pages/marketing/MarketingArticleDetail.tsx",
      "pages/marketing/MarketingResources.tsx"
    ]
  },
  {
    "path": "/website/magazine/:slug",
    "component": "MarketingArticleDetail",
    "section": "website",
    "audience": "marketing",
    "inbound": 2,
    "linkedFrom": [
      "pages/marketing/MarketingArticleDetail.tsx",
      "pages/marketing/MarketingResources.tsx"
    ]
  },
  {
    "path": "/website/mentions-legales",
    "component": "MarketingMentionsLegales",
    "section": "website",
    "audience": "marketing",
    "inbound": 3,
    "linkedFrom": [
      "components/marketing/FooterMinimal.tsx",
      "pages/AppLanding.tsx",
      "pages/marketing/components/MarketingFooter.tsx"
    ]
  },
  {
    "path": "/website/methode",
    "component": "MarketingMethode",
    "section": "website",
    "audience": "marketing",
    "inbound": 5,
    "linkedFrom": [
      "pages/marketing/MarketingAccompagnement.tsx",
      "pages/marketing/MarketingContact.tsx",
      "pages/marketing/MarketingError404.tsx"
    ]
  },
  {
    "path": "/website/politique-confidentialite",
    "component": "MarketingPolitiqueConfidentialite",
    "section": "website",
    "audience": "marketing",
    "inbound": 4,
    "linkedFrom": [
      "components/marketing/FooterMinimal.tsx",
      "pages/AppLanding.tsx",
      "pages/marketing/MarketingWaitlist.tsx"
    ]
  },
  {
    "path": "/website/resources",
    "component": "MarketingResources",
    "section": "website",
    "audience": "marketing",
    "inbound": 10,
    "linkedFrom": [
      "pages/marketing/MarketingArticleDetail.tsx",
      "pages/marketing/MarketingDossierDetail.tsx",
      "pages/marketing/MarketingGuideDetail.tsx"
    ]
  },
  {
    "path": "/website/resources/:slug",
    "component": "MarketingArticleDetail",
    "section": "website",
    "audience": "marketing",
    "inbound": 10,
    "linkedFrom": [
      "pages/marketing/MarketingArticleDetail.tsx",
      "pages/marketing/MarketingDossierDetail.tsx",
      "pages/marketing/MarketingGuideDetail.tsx"
    ]
  },
  {
    "path": "/website/ressources",
    "component": "MarketingResources",
    "section": "website",
    "audience": "marketing",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/website/studio",
    "component": "MarketingStudio",
    "section": "website",
    "audience": "marketing",
    "inbound": 2,
    "linkedFrom": [
      "pages/marketing/components/MarketingFooter.tsx",
      "pages/marketing/components/MarketingHeader.tsx"
    ]
  },
  {
    "path": "/website/temoignages",
    "component": "Navigate",
    "section": "website",
    "audience": "marketing",
    "inbound": 0,
    "linkedFrom": []
  },
  {
    "path": "/website/upskilling",
    "component": "MarketingUpskilling",
    "section": "website",
    "audience": "marketing",
    "inbound": 2,
    "linkedFrom": [
      "pages/marketing/components/MarketingFooter.tsx",
      "pages/marketing/components/MarketingHeader.tsx"
    ]
  },
  {
    "path": "/website/videos/:slug",
    "component": "MarketingVideoDetail",
    "section": "website",
    "audience": "marketing",
    "inbound": 2,
    "linkedFrom": [
      "pages/marketing/MarketingResources.tsx",
      "pages/marketing/MarketingVideoDetail.tsx"
    ]
  },
  {
    "path": "/website/vigie",
    "component": "MarketingVigie",
    "section": "website",
    "audience": "marketing",
    "inbound": 4,
    "linkedFrom": [
      "pages/marketing/MarketingHome.tsx",
      "pages/marketing/MarketingMethode.tsx",
      "pages/marketing/components/MarketingFooter.tsx"
    ]
  },
  {
    "path": "/website/waitlist",
    "component": "MarketingWaitlist",
    "section": "website",
    "audience": "marketing",
    "inbound": 1,
    "linkedFrom": [
      "pages/marketing/components/MarketingFooter.tsx"
    ]
  },
  {
    "path": "/website/webinaires/:slug",
    "component": "MarketingWebinaireDetail",
    "section": "website",
    "audience": "marketing",
    "inbound": 2,
    "linkedFrom": [
      "pages/marketing/MarketingResources.tsx",
      "pages/marketing/MarketingWebinaireDetail.tsx"
    ]
  }
];
