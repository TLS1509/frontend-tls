# Page Mapping (Routes -> Files)

## Core
- `/dashboard` -> `src/pages/Dashboard.tsx` -> `src/styles/dashboard-modern.css`
- `/learning-paths` -> `src/pages/LearningPaths.tsx` -> `src/styles/learning-paths.css`
- `/learning-paths/:id` -> `src/pages/LearningPathDetail.tsx` -> `src/styles/learning-paths.css`

## Learning Space
- `/learning-space` -> `src/pages/LearningSpace.tsx` -> `src/styles/static-pages.css`
- `/project/:id` -> `src/pages/Project.tsx` -> `src/styles/static-pages.css`
- `/course/:id` -> `src/pages/CourseDetail.tsx` -> `src/styles/figma-missing-pages.css` (+ `static-pages.css`)

## Veille (Hub + Items)
- `/veille` -> `src/pages/Veille.tsx` -> `src/styles/veille.css`
- `/veille/content` -> `src/pages/VeilleContent.tsx` -> `src/styles/static-pages.css`
- `/veille/article/:id` -> `src/pages/ArticleDetail.tsx` -> `src/styles/static-pages.css`
- `/veille/dossier/:id` -> `src/pages/Dossier.tsx` -> `src/styles/static-pages.css`
- `/veille/video-tutorial/:id` -> `src/pages/VideoTutorial.tsx` -> `src/styles/static-pages.css`
- `/veille/video-reels` -> `src/pages/VideoReels.tsx` -> `src/styles/static-pages.css`
- `/veille/magazine` -> `src/pages/Magazine.tsx` -> `src/styles/static-pages.css`
- `/veille/magazine-article/:id` -> `src/pages/MagazineArticle.tsx` -> `src/styles/static-pages.css`
- `/veille/weekly-newsletter` -> `src/pages/WeeklyNewsletter.tsx` -> `src/styles/static-pages.css`
- `/veille/weekly-news/:id` -> `src/pages/WeeklyNewsDetail.tsx` -> `src/styles/static-pages.css`
- `/veille/newsletter` -> `src/pages/Newsletter.tsx` -> `src/styles/static-pages.css`

## Journal
- `/journal` -> `src/pages/Journal.tsx` -> `src/styles/static-pages.css`
- `/journal/detail/:id` -> `src/pages/JournalDetail.tsx` -> `src/styles/static-pages.css`
- `/journal/new-entry` -> `src/pages/JournalNewEntry.tsx` -> `src/styles/static-pages.css`
- `/journal/free-entry` -> `src/pages/JournalFreeEntry.tsx` -> `src/styles/static-pages.css`

## Coaching & Flows
- `/coaching` -> `src/pages/Coaching.tsx` -> `src/styles/feature-pages-modern.css`
- `/coaching/booking` -> `src/pages/CoachingBookingFlow.tsx` -> `src/styles/static-pages.css`
- `/coaching/pre-questionnaire` -> `src/pages/PreCoachingQuestionnaire.tsx` -> `src/styles/static-pages.css`
- `/coaching/pre-questionnaire/response` -> `src/pages/PreCoachingQuestionnaireResponse.tsx` -> `src/styles/static-pages.css`
- `/onboarding` -> `src/pages/Onboarding.tsx` -> `src/styles/static-pages.css`

## Account / Auth
- `/profile` -> `src/pages/Profile.tsx` -> `src/styles/feature-pages-modern.css`
- `/settings` -> `src/pages/Settings.tsx` -> `src/styles/feature-pages-modern.css`
- `/account` -> `src/pages/Account.tsx` -> `src/styles/static-pages.css`
- `/auth/login` -> `src/pages/Login.tsx` -> `src/styles/static-pages.css`
- `/auth/signup` -> `src/pages/Signup.tsx` -> `src/styles/static-pages.css`
- `/auth/forgot-password` -> `src/pages/ForgotPassword.tsx` -> `src/styles/static-pages.css`
- `/auth/reset-password` -> `src/pages/ResetPassword.tsx` -> `src/styles/static-pages.css`

## Social / Other
- `/collaboration` -> `src/pages/Collaboration.tsx` -> `src/styles/feature-pages-modern.css`
- `/notifications` -> `src/pages/Notifications.tsx` -> `src/styles/static-pages.css`
- `/pages-index` -> `src/pages/PagesIndex.tsx` -> `src/styles/pages-index.css`

## Enterprise & support (Figma Make)
- `/enterprise` -> `src/pages/Enterprise.tsx` -> `src/styles/figma-missing-pages.css`
- `/help` -> `src/pages/Help.tsx` -> `src/styles/figma-missing-pages.css`
- `/error/404` -> `src/pages/Error404.tsx` -> `src/styles/figma-missing-pages.css`
- `/error/500` -> `src/pages/Error500.tsx` -> `src/styles/figma-missing-pages.css`

## Pointer les bons fichiers dans Cursor
- Niveau page: `@src/pages/<Page>.tsx`
- Niveau style page: `@src/styles/<style>.css`
- Niveau composant réutilisable: `@src/components/core/*` et `@src/components/ui/*`
