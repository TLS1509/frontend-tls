/**
 * Registre du showcase — la taxonomie et le classement des composants.
 *
 * Extrait de `Components.tsx` le 2026-07-28 (phase 1 du chantier showcase,
 * voir docs/_audits/CHANTIER-SHOWCASE-2026-07-28.md).
 *
 * Pourquoi ce fichier existe : tant que le catalogue vivait en JSX entremêlé au
 * rendu, on ne pouvait ni générer une navigation, ni poser une ancre par
 * composant, ni vérifier la couverture. Ces trois manques ont la même cause.
 * Ici, c'est de la donnée : on peut la parcourir.
 *
 * ⚠️ Ce module ne contient AUCUN rendu et n'importe aucun composant — c'est ce
 * qui permet de le charger sans tirer les 124 imports du showcase.
 */

/** Les 15 catégories du showcase. Taxonomie unique. */
export type Category =
  | 'Foundations'
  | 'Atoms'
  | 'Composites'
  | 'Headers & Sections'
  | 'Feedback'
  | 'Navigation'
  | 'Search & Filters'
  | 'Cards'
  | 'Lists & Feeds'
  | 'Forms'
  | 'Learning'
  | 'Data Visualization'
  | 'Modals'
  | 'Auth Family'
  | 'Pages & Templates';

/** Sous-catégorie : chaîne libre, ordonnée par `SUBCATEGORY_ORDER`. */
export type SubCategory = string;

/** Ordre d'affichage des catégories. */
export const CATEGORY_ORDER: Category[] = [
  'Foundations',
  'Atoms',
  'Composites',
  'Headers & Sections',
  'Feedback',
  'Navigation',
  'Search & Filters',
  'Cards',
  'Lists & Feeds',
  'Forms',
  'Learning',
  'Data Visualization',
  'Modals',
  'Auth Family',
  'Pages & Templates',
];

/**
 * Ordre d'affichage des sous-catégories dans chaque catégorie.
 * Sept entrées ajoutées le 2026-07-28 : elles étaient utilisées par le
 * catalogue mais absentes d'ici, donc leurs composants s'affichaient dans un
 * ordre non défini.
 */
export const SUBCATEGORY_ORDER: Record<Category, string[]> = {
  Foundations: ['Rythme & alignement', 'Design Tokens', 'Layout Primitives', 'Backgrounds'],
  Atoms: ['Form fields', 'Surfaces', 'Identity', 'Status badges', 'Chips & Pills', 'Indicators', 'Decoration'],
  Composites: ['Group wrappers', 'Form groups', 'List composites'],
  'Headers & Sections': ['Heroes', 'Page headers', 'Section headers', 'Section wrappers', 'Section patterns'],
  Feedback: ['Status messages', 'Empty/zero states', 'Celebrations', 'GDPR & Compliance'],
  Navigation: ['Primary nav (app shell)', 'Contextual menus', 'Secondary nav', 'Floating actions'],
  'Search & Filters': ['Search', 'Filter controls', 'Filter composites'],
  Cards: ['Generic', 'KPI & Stats', 'Communication', 'Learning content', 'Editorial content', 'Domain (coaching/project)', 'Activity'],
  'Lists & Feeds': ['Grids', 'Feeds (chronological)', 'Lists (vertical)', 'Tables'],
  Forms: ['Composite forms', 'Inputs'],
  Learning: ['Achievements', 'Competence', 'Goals & progress', 'Quiz & flashcards', 'Viewer content', 'Compétences'],
  'Data Visualization': ['Competency charts', 'Distribution charts', 'Trend charts', 'Composition charts', 'Correlation charts', 'Composite charts', 'Matrix charts', 'Timeline & Events', 'Progress & Gauges', 'Chart utilities'],
  Modals: ['Base', 'Booking flow', 'Confirm/Status', 'Celebrations', 'Media', 'Onboarding'],
  'Auth Family': ['Shell & layout'],
  'Pages & Templates': ['États d\'erreur'],
};

/* ── Ce que le showcase groupe, et ce qu'il n'a pas à montrer ───────────────
 *
 * Le showcase ne suit pas la règle « un export = une entrée » : certaines
 * entrées présentent délibérément plusieurs composants d'un coup (EditorialCard
 * montre ArticleCard + MagazineCard + VideoCard ; AuthShell montre toute sa
 * famille). Sans cette table, le contrôle de couverture compte ces composants
 * comme absents alors qu'ils sont bien à l'écran.
 */
export const COVERED_BY: Record<string, string> = {
  ArticleCard: 'EditorialCard',
  MagazineCard: 'EditorialCard',
  VideoCard: 'EditorialCard',
  StatusBadge: 'Badge',
  Steps: 'Stepper',
  SearchWithSuggestions: 'Search',
  ToastContainer: 'Toast',
  ConfirmModal: 'Modal',
  SuccessModal: 'Modal',
  CancelSessionModal: 'Modal',
  StreakCelebrationModal: 'Modal',
  AuthCheckbox: 'AuthShell',
  AuthDivider: 'AuthShell',
  AuthField: 'AuthShell',
  AuthGhostButton: 'AuthShell',
  AuthGoogleIcon: 'AuthShell',
  AuthInlineLink: 'AuthShell',
  AuthLinkedinIcon: 'AuthShell',
  AuthPasswordField: 'AuthShell',
  AuthPrimaryButton: 'AuthShell',
  AuthSocialButton: 'AuthShell',
  EditorialCardSkeleton: 'SkeletonTemplates',
  NotificationRowSkeleton: 'SkeletonTemplates',
  ParcoursCardSkeleton: 'SkeletonTemplates',
};

/**
 * Composants sans interface, ou explicitement hors vitrine.
 * Les lister ici est une décision, pas un oubli — le contrôle de couverture
 * doit pouvoir faire la différence.
 */
export const NOT_SHOWCASED: Record<string, string> = {
  ProtectedRoute: 'garde de route, ne rend rien',
  ScrollToTop: 'effet de navigation, retourne null',
  DevPanel: 'outil de développement, pas un composant du DS',
  AuthFeature: '@deprecated, aucun consommateur — ne pas encourager son usage',
};

export interface CatalogMeta {
  category: Category;
  subCategory: SubCategory;
}

/**
 * Classement de chaque composant. Clé = nom React.
 * Un composant absent d'ici n'apparaît nulle part dans la navigation.
 */
/**
 * Les fiches de convention.
 *
 * Elles sont classées comme les composants, mais ne décrivent pas un fichier :
 * elles posent une règle transverse — le rythme des titres, le padding d'une
 * carte, le centrage — qu'aucun composant ne porte à lui seul. Le contrôle de
 * couverture doit pouvoir les distinguer, sinon il les signale éternellement
 * comme des entrées fantômes. Une heuristique sur le nom ne suffit pas :
 * « Padding » et « Centrage » ressemblent à des identifiants.
 */
export const CONVENTIONS = new Set([
  'Rythme des titres',
  'Marges et gouttières',
  'Padding',
  'Centrage',
  "Échelle d'icônes",
]);

export const CATALOG: Record<string, CatalogMeta> = {
  // ── Classées le 2026-07-29 (phase 2) ──────────────────────────────────
  // Ces cinq entrées n'étaient dans aucun classement : elles retombaient sur
  // le repli de l'ancienne taxonomie, qui les rangeait toutes en « Other ».
  InlineWin:            { category: 'Feedback', subCategory: 'Celebrations' },
  JacCard:              { category: 'Learning', subCategory: 'Compétences' },
  NewsletterSignupCard: { category: 'Cards', subCategory: 'Communication' },
  TrendingBadge:        { category: 'Atoms', subCategory: 'Status badges' },
  ViewerProgressTrail:  { category: 'Learning', subCategory: 'Viewer content' },

  // ── Phase 4, lot 3 : squelettes, selects, grilles, charts, divers ─────
  SelectCheckbox:         { category: 'Search & Filters', subCategory: 'Filter controls' },
  SelectCheckboxCategory: { category: 'Search & Filters', subCategory: 'Filter controls' },
  SkeletonGroup:          { category: 'Feedback', subCategory: 'Status messages' },
  StatCardSkeleton:       { category: 'Feedback', subCategory: 'Status messages' },
  ActivityItemSkeleton:   { category: 'Feedback', subCategory: 'Status messages' },
  ResumeLessonSkeleton:   { category: 'Feedback', subCategory: 'Status messages' },
  SelectCheckboxFloating: { category: 'Search & Filters', subCategory: 'Filter controls' },
  CoachRow:               { category: 'Lists & Feeds', subCategory: 'Lists (vertical)' },
  CorrectionStatusBar:    { category: 'Learning', subCategory: 'Competence' },
  ReaderContextStrip:     { category: 'Headers & Sections', subCategory: 'Page headers' },
  ErrorPage:              { category: 'Pages & Templates', subCategory: 'États d\'erreur' },
  CoachCardGrid:          { category: 'Lists & Feeds', subCategory: 'Grids' },
  LearningPathGrid:       { category: 'Lists & Feeds', subCategory: 'Grids' },
  ResourceCardGrid:       { category: 'Lists & Feeds', subCategory: 'Grids' },
  ChartWithExport:        { category: 'Data Visualization', subCategory: 'Chart utilities' },
  ChartDetailModal:       { category: 'Data Visualization', subCategory: 'Chart utilities' },
  CompletionModal:        { category: 'Modals', subCategory: 'Celebrations' },
  AuthSuccess:            { category: 'Auth Family', subCategory: 'Shell & layout' },

  /* ── Les fiches d'arbitrage (2026-09-09) ──────────────────────────────
     Elles ne décrivent pas un composant mais une convention transverse. Elles
     vivent dans Foundations parce que c'est là qu'on va chercher une règle,
     et non dans le fichier d'un composant qui ne la porte qu'en partie. */
  'Rythme des titres':  { category: 'Foundations', subCategory: 'Rythme & alignement' },
  'Marges et gouttières': { category: 'Foundations', subCategory: 'Rythme & alignement' },
  'Padding':            { category: 'Foundations', subCategory: 'Rythme & alignement' },
  'Centrage':           { category: 'Foundations', subCategory: 'Rythme & alignement' },
  "Échelle d'icônes":   { category: 'Foundations', subCategory: 'Rythme & alignement' },

  // ── Phase 4, lot 2 : primitives de layout + PageHero ──────────────────
  PageShell:            { category: 'Foundations', subCategory: 'Layout Primitives' },
  Container:            { category: 'Foundations', subCategory: 'Layout Primitives' },
  Grid:                 { category: 'Foundations', subCategory: 'Layout Primitives' },
  Stack:                { category: 'Foundations', subCategory: 'Layout Primitives' },
  Cluster:              { category: 'Foundations', subCategory: 'Layout Primitives' },
  BottomNav:            { category: 'Navigation', subCategory: 'Primary nav (app shell)' },
  PageHero:             { category: 'Headers & Sections', subCategory: 'Heroes' },

  // ── Phase 4, lot 1 (2026-07-29) ───────────────────────────────────────
  Chip:                 { category: 'Atoms', subCategory: 'Chips & Pills' },
  Tooltip:              { category: 'Feedback', subCategory: 'Status messages' },
  Kbd:                  { category: 'Atoms', subCategory: 'Indicators' },
  SegmentedControl:     { category: 'Navigation', subCategory: 'Secondary nav' },
  SettingsRow:          { category: 'Lists & Feeds', subCategory: 'Lists (vertical)' },
  SelectableOptionCard: { category: 'Cards', subCategory: 'Generic' },
  FloatLabel:           { category: 'Atoms', subCategory: 'Form fields' },

  // ── ATOMS ─────────────────────────────────────────────────────────────
  // Form fields
  Button:               { category: 'Atoms', subCategory: 'Form fields' },
  QuickActionButton:    { category: 'Atoms', subCategory: 'Form fields' },
  Input:                { category: 'Atoms', subCategory: 'Form fields' },
  Checkbox:             { category: 'Atoms', subCategory: 'Form fields' },
  Radio:                { category: 'Atoms', subCategory: 'Form fields' },
  Switch:               { category: 'Atoms', subCategory: 'Form fields' },
  Select:               { category: 'Atoms', subCategory: 'Form fields' },
  Combobox:             { category: 'Search & Filters', subCategory: 'Search' },
  QualitativeRating:    { category: 'Atoms', subCategory: 'Form fields' },
  FormGroup:            { category: 'Atoms', subCategory: 'Form fields' },
  // FormField supprimé (Phase 10) — fusionné dans Input + FormGroup

  // Surfaces
  Card:                 { category: 'Atoms', subCategory: 'Surfaces' },

  // Identity
  Avatar:               { category: 'Atoms', subCategory: 'Identity' },
  UserInfo:             { category: 'Atoms', subCategory: 'Identity' },
  TlsLogo:              { category: 'Atoms', subCategory: 'Identity' },
  TlsLogoLockup:        { category: 'Atoms', subCategory: 'Identity' },

  // Badges (rationalisés en une seule entrée)
  Badge:                { category: 'Atoms', subCategory: 'Status badges' },
  NotificationBadge:    { category: 'Atoms', subCategory: 'Status badges' },

  // Chips / Pills
  Pill:                 { category: 'Atoms', subCategory: 'Chips & Pills' },
  MetaPill:             { category: 'Atoms', subCategory: 'Chips & Pills' },
  MetaItem:             { category: 'Atoms', subCategory: 'Chips & Pills' },
  Tag:                  { category: 'Atoms', subCategory: 'Chips & Pills' },
  FilterChip:           { category: 'Search & Filters', subCategory: 'Filter controls' },
  // 'Filter Pills' supprimé — redondant avec FilterChip

  // Indicators
  ProgressBar:          { category: 'Atoms', subCategory: 'Indicators' },
  InlineProgress:       { category: 'Atoms', subCategory: 'Indicators' },
  ProgressRing:         { category: 'Atoms', subCategory: 'Indicators' },
  Skeleton:             { category: 'Atoms', subCategory: 'Indicators' },
  SkeletonTemplates:    { category: 'Atoms', subCategory: 'Indicators' },
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
  // Phase 19 — Form composites
  RadioGroup:           { category: 'Composites', subCategory: 'Form groups' },
  CheckboxGroup:        { category: 'Composites', subCategory: 'Form groups' },
  FormSection:          { category: 'Composites', subCategory: 'Form groups' },
  InputGroup:           { category: 'Composites', subCategory: 'Form groups' },
  // Phase 19 Tier 2 — List composites
  SimpleTable:          { category: 'Composites', subCategory: 'List composites' },
  PaginatedList:        { category: 'Composites', subCategory: 'List composites' },
  FilteredList:         { category: 'Search & Filters', subCategory: 'Filter composites' },
  // Phase 19 Tier 3 — Form/Step/Grid composites
  StepIndicator:        { category: 'Composites', subCategory: 'Form groups' },
  ModalForm:            { category: 'Composites', subCategory: 'Form groups' },
  FilterableCardGrid:   { category: 'Search & Filters', subCategory: 'Filter composites' },

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
  LearningItemCard:     { category: 'Cards', subCategory: 'Learning content' },

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
  Search:               { category: 'Search & Filters', subCategory: 'Search' },
  SearchFilters:        { category: 'Search & Filters', subCategory: 'Filter composites' },
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
  MessageBubble:        { category: 'Cards', subCategory: 'Communication' },
  ConversationalChat:   { category: 'Lists & Feeds', subCategory: 'Feeds (chronological)' },
  PromptCard:           { category: 'Cards', subCategory: 'Communication' },
  JournalEntryCard:     { category: 'Cards', subCategory: 'Communication' },
  JournalBubbleCard:    { category: 'Cards', subCategory: 'Communication' },
  JournalTypeTile:      { category: 'Cards', subCategory: 'Communication' },
  NotificationCard:     { category: 'Cards', subCategory: 'Communication' },
  // Journal Form components
  MoodSelector:             { category: 'Forms', subCategory: 'Inputs' },
  StructuredQuestionAccordion: { category: 'Forms', subCategory: 'Inputs' },
  JournalChatCompose:       { category: 'Forms', subCategory: 'Inputs' },
  // Journal Patterns
  WritingPromptsAside:      { category: 'Headers & Sections', subCategory: 'Section patterns' },
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
  FilterBar:            { category: 'Search & Filters', subCategory: 'Filter controls' },

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

  // ── FIGMA DS — extracted shared components ────────────────────────────
  AstucesCard:            { category: 'Learning',      subCategory: 'Viewer content' },
  ResourceListItem:       { category: 'Lists & Feeds', subCategory: 'Lists (vertical)' },
  EtapeAccordion:         { category: 'Composites',    subCategory: 'Group wrappers' },
  AuthBackLink:           { category: 'Auth Family',   subCategory: 'Shell & layout' },
  DreyfusSlider:          { category: 'Learning',      subCategory: 'Compétences' },
  BehavioralTileGrid:     { category: 'Learning',      subCategory: 'Viewer content' },
  VeilleFormatShortcutCards: { category: 'Cards',      subCategory: 'Editorial content' },
  VeilleHeroFilterChips:  { category: 'Search & Filters', subCategory: 'Filter controls' },

  // ── HEADERS & SECTIONS — extras ───────────────────────────────────────
  'Card subcomponents': { category: 'Atoms', subCategory: 'Surfaces' },

  // ── DATA VISUALIZATION — Charts & Analytics (Phase 20+) ──────────────────
  RadarChart:           { category: 'Data Visualization', subCategory: 'Competency charts' },
  BarChart:             { category: 'Data Visualization', subCategory: 'Distribution charts' },
  LineChart:            { category: 'Data Visualization', subCategory: 'Trend charts' },
  AreaChart:            { category: 'Data Visualization', subCategory: 'Trend charts' },
  PieChart:             { category: 'Data Visualization', subCategory: 'Composition charts' },
  ScatterChart:         { category: 'Data Visualization', subCategory: 'Correlation charts' },
  ComposedChart:        { category: 'Data Visualization', subCategory: 'Composite charts' },
  HeatmapChart:         { category: 'Data Visualization', subCategory: 'Matrix charts' },
  TimelineChart:        { category: 'Data Visualization', subCategory: 'Timeline & Events' },
  GaugeChart:           { category: 'Data Visualization', subCategory: 'Progress & Gauges' },
  ChartContainer:       { category: 'Data Visualization', subCategory: 'Chart utilities' },
  ChartExportButton:    { category: 'Data Visualization', subCategory: 'Chart utilities' },
};

/* ── Slugs : une URL et une ancre stables pour chaque destination ───────────── */

/** `Headers & Sections` → `headers-sections`. Stable : sert d'URL et d'ancre. */
export const slugify = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const categorySlug = (c: Category): string => slugify(c);

/** Résout un slug d'URL vers sa catégorie, ou `undefined` si inconnu. */
export const categoryFromSlug = (slug: string): Category | undefined =>
  CATEGORY_ORDER.find((c) => categorySlug(c) === slug);

/** Ancre d'un composant dans sa page de catégorie. */
export const componentSlug = (name: string): string => slugify(name);

/** Les composants d'une catégorie, groupés et ordonnés par sous-catégorie. */
export function componentsByCategory(
  category: Category,
): { subCategory: string; names: string[] }[] {
  const bySub = new Map<string, string[]>();
  for (const [name, meta] of Object.entries(CATALOG)) {
    if (meta.category !== category) continue;
    const list = bySub.get(meta.subCategory) ?? [];
    list.push(name);
    bySub.set(meta.subCategory, list);
  }
  const order = SUBCATEGORY_ORDER[category] ?? [];
  const rank = (s: string) => {
    const i = order.indexOf(s);
    return i === -1 ? order.length : i;
  };
  return [...bySub.entries()]
    .sort((a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0]))
    .map(([subCategory, names]) => ({ subCategory, names: names.sort() }));
}

/** Nombre de composants classés — sert au garde-fou de couverture. */
export const CATALOG_SIZE = Object.keys(CATALOG).length;
